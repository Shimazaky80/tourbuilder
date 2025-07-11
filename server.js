// server.js

// --- 1. SETUP ---
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

// This is now only for rare admin tasks (like user deletion), not for regular request handling.
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

// --- 2. MIDDLEWARE ---
app.use(cors());
app.use(express.json());

// FIX #1: Use an absolute path to reliably serve your static files.
app.use(express.static(path.join(__dirname, "public")));

// FIX #2: Middleware to create a new, isolated Supabase client for each incoming request.
// This prevents database connection deadlocks and auth errors on refresh.
const createSupabaseClient = (req, res, next) => {
  req.supabase = createClient(supabaseUrl, supabaseServiceKey);
  next();
};

// Apply the middleware to all routes so that req.supabase is always available.
app.use(createSupabaseClient);

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Authentication token required." });
  }
  try {
    // Use the dedicated client for this specific request.
    const {
      data: { user },
      error,
    } = await req.supabase.auth.getUser(token);
    if (error || !user) throw new Error("Invalid or expired token.");
    req.user = user;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ error: "Authentication failed: " + error.message });
  }
};

// --- 3. API ROUTES ---
// All API routes MUST be defined *after* the static and Supabase client middleware.

// --- PUBLIC ROUTES ---
app.post("/api/register/tour-operator", async (req, res) => {
  const { companyName, contactPerson, contactEmail, contactTel, password } =
    req.body;
  if (!companyName || !contactEmail || !password) {
    return res.status(400).json({
      error: "Company name, contact email, and password are required.",
    });
  }
  let createdCompanyId = null;
  let createdAuthUserId = null;
  try {
    // Use the request-specific client (req.supabase) for all database operations.
    const { data: operator, error: operatorError } = await req.supabase
      .from("tour_operators")
      .insert({
        company_name: companyName,
        contact_person: contactPerson,
        contact_email: contactEmail,
        contact_tel: contactTel,
      })
      .select("id")
      .single();
    if (operatorError) throw operatorError;
    createdCompanyId = operator.id;

    const { data: authData, error: authError } = await req.supabase.auth.signUp(
      {
        email: contactEmail,
        password: password,
      }
    );
    if (authError) throw authError;
    createdAuthUserId = authData.user.id;

    const { error: profileUpdateError } = await req.supabase
      .from("profiles")
      .update({ tour_operator_id: createdCompanyId, role: "operator_admin" })
      .eq("id", createdAuthUserId);
    if (profileUpdateError) throw profileUpdateError;
    res.status(201).json({
      message:
        "Tour Operator registered successfully. Please check your email to verify your account.",
    });
  } catch (error) {
    console.error("Tour Operator Registration Error:", error);
    if (createdAuthUserId) {
      // Use the dedicated admin client ONLY for privileged operations.
      await supabaseAdmin.auth.admin.deleteUser(createdAuthUserId);
    }
    if (createdCompanyId) {
      await req.supabase
        .from("tour_operators")
        .delete()
        .eq("id", createdCompanyId);
    }
    res.status(500).json({ error: `Registration failed: ${error.message}` });
  }
});

app.get("/api/invitations/validate/:token", async (req, res) => {
  const { token } = req.params;
  try {
    const { data, error } = await req.supabase
      .from("invitations")
      .select("email_to_invite")
      .eq("invitation_token", token)
      .eq("status", "pending")
      .single();
    if (error || !data) throw new Error("Invalid or expired invitation token.");
    res.json({ email: data.email_to_invite });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

app.post("/api/register/consultant", async (req, res) => {
  const { token, password } = req.body;
  if (!token || !password) {
    return res.status(400).json({ error: "Token and password are required." });
  }
  try {
    const { data: invitation, error: inviteError } = await req.supabase
      .from("invitations")
      .select("*")
      .eq("invitation_token", token)
      .eq("status", "pending")
      .single();
    if (inviteError || !invitation)
      throw new Error("Invalid or expired invitation token.");
    const { data: authData, error: authError } = await req.supabase.auth.signUp(
      {
        email: invitation.email_to_invite,
        password: password,
        options: {
          data: {
            first_name: invitation.first_name,
            last_name: invitation.last_name,
            tour_operator_id: invitation.tour_operator_id,
            role: invitation.role_to_assign,
          },
        },
      }
    );
    if (authError) throw authError;
    const { error: profileUpdateError } = await req.supabase
      .from("profiles")
      .update({ tour_operator_id: invitation.tour_operator_id })
      .eq("id", authData.user.id);
    if (profileUpdateError) throw profileUpdateError;
    await req.supabase
      .from("invitations")
      .update({ status: "accepted", accepted_at: new Date() })
      .eq("id", invitation.id);
    res.status(201).json({
      message: "Consultant registered successfully. You can now log in.",
    });
  } catch (error) {
    console.error("Consultant Registration Error:", error);
    res.status(500).json({ error: `Registration failed: ${error.message}` });
  }
});

// --- PROTECTED ROUTES ---
// ALL subsequent routes now use authMiddleware, which provides req.user,
// and createSupabaseClient, which provides req.supabase.

app.get("/api/profile", authMiddleware, async (req, res) => {
  try {
    const { data, error } = await req.supabase
      .from("profiles")
      .select(
        `id, first_name, last_name, role, tour_operators ( id, company_name )`
      )
      .eq("id", req.user.id)
      .single();
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Could not fetch profile: " + error.message });
  }
});

app.get("/api/initial-data", authMiddleware, async (req, res) => {
  try {
    const { data: profile, error: profileError } = await req.supabase
      .from("profiles")
      .select("tour_operator_id")
      .eq("id", req.user.id)
      .single();
    if (profileError || !profile?.tour_operator_id)
      throw new Error("Could not determine user's company.");

    // Fetching sequentially to avoid any chance of overwhelming the connection pool.
    const clientsResponse = await req.supabase
      .from("clients")
      .select("id, client_name, default_markup")
      .eq("tour_operator_id", profile.tour_operator_id)
      .order("client_name");

    const currenciesResponse = await req.supabase
      .from("app_currencies")
      .select("code, symbol, name, is_default")
      .eq("is_active", true)
      .order("name");

    if (clientsResponse.error) throw clientsResponse.error;
    if (currenciesResponse.error) throw currenciesResponse.error;
    res.json({
      b2bClients: clientsResponse.data,
      currencies: currenciesResponse.data,
    });
  } catch (error) {
    console.error("Error fetching initial data:", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/b2b-clients", authMiddleware, async (req, res) => {
  const { data: profile, error: profileError } = await req.supabase
    .from("profiles")
    .select("tour_operator_id")
    .eq("id", req.user.id)
    .single();

  if (profileError || !profile || !profile.tour_operator_id) {
    return res.status(500).json({ error: "Could not determine user company." });
  }

  try {
    const { data, error } = await req.supabase
      .from("clients")
      .select("id, client_name, default_markup")
      .eq("tour_operator_id", profile.tour_operator_id)
      .order("client_name");

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Could not fetch B2B clients: " + error.message });
  }
});

app.get("/api/itineraries/search", authMiddleware, async (req, res) => {
  const { term } = req.query;
  if (!term) {
    return res.status(400).json({ error: "Search term is required." });
  }
  try {
    const { data, error } = await req.supabase
      .from("itineraries")
      .select("id, itinerary_name, lead_pax_name, unique_id, travel_start_date")
      .eq("user_id", req.user.id)
      .or(
        `itinerary_name.ilike.%${term}%,lead_pax_name.ilike.%${term}%,unique_id.ilike.%${term}%`
      )
      .order("updated_at", { ascending: false })
      .limit(10);
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Could not search itineraries: " + error.message });
  }
});

app.get("/api/itineraries/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const { data, error } = await req.supabase
      .from("itineraries")
      // Revert to the simple, working query.
      .select("*, status, itinerary_days(*, itinerary_day_items(*))")
      .eq("id", id)
      .eq("user_id", req.user.id)
      .single();

    if (error) {
      throw new Error("Itinerary not found or access denied.");
    }

    res.json(data);
  } catch (error) {
    console.error("Error loading single itinerary:", error.message);
    res
      .status(404)
      .json({ error: "Could not load itinerary: " + error.message });
  }
});

app.get("/api/items", authMiddleware, async (req, res) => {
  const { searchTerm, currency } = req.query;
  if (!currency) {
    return res.status(400).json({ error: "Currency parameter is required." });
  }
  try {
    let query = req.supabase
      .from("items")
      .select(
        // Add max_occupancy from items and pricing_model/cost_per_unit from item_rates
        `id, name, description, category, max_occupancy, supplier_id, suppliers!inner(id, name, is_active), item_rates!inner(id, rate_name, pricing_model, cost_per_person, cost_per_unit, currency_code, is_active)`
      )
      .eq("is_active", true)
      .eq("suppliers.is_active", true)
      .eq("item_rates.currency_code", currency)
      .eq("item_rates.is_active", true);
    if (searchTerm) {
      query = query.or(
        `name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,category.ilike.%${searchTerm}%`
      );
    }
    const { data, error } = await query;
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch items: " + error.message });
  }
});

app.post("/api/rates/currencies", authMiddleware, async (req, res) => {
  const { rateIds } = req.body;

  if (!rateIds || !Array.isArray(rateIds) || rateIds.length === 0) {
    return res.json({}); // Return empty object if no IDs are provided
  }

  try {
    const { data, error } = await req.supabase
      .from("item_rates")
      .select("id, currency_code, pricing_model") // <-- ADD pricing_model HERE
      .in("id", rateIds);

    if (error) throw error;

    // Create a map that includes both currency and pricing model
    const currencyMap = Object.fromEntries(
      data.map((r) => [
        r.id,
        { currency_code: r.currency_code, pricing_model: r.pricing_model },
      ])
    );
    res.json(currencyMap);
  } catch (error) {
    console.error("Error fetching currency rates:", error.message);
    res.status(500).json({ error: "Could not fetch currency rates." });
  }
});

app.post("/api/items/metadata", authMiddleware, async (req, res) => {
  const { itemIds } = req.body;

  if (!itemIds || !Array.isArray(itemIds) || itemIds.length === 0) {
    return res.json({});
  }

  try {
    const { data, error } = await req.supabase
      .from("items")
      .select("id, max_occupancy")
      .in("id", itemIds);

    if (error) throw error;

    const itemMetaMap = Object.fromEntries(
      data.map((i) => [i.id, { max_occupancy: i.max_occupancy }])
    );
    res.json(itemMetaMap);
  } catch (error) {
    console.error("Error fetching item metadata:", error.message);
    res.status(500).json({ error: "Could not fetch item metadata." });
  }
});

app.post("/api/itineraries", authMiddleware, async (req, res) => {
  const clientData = req.body;
  const newItinerary = {
    user_id: req.user.id,
    itinerary_name: clientData.itinerary_name,
    lead_pax_name: clientData.lead_pax_name,
    lead_pax_email: clientData.lead_pax_email,
    lead_pax_tel: clientData.lead_pax_tel,
    num_adults: clientData.num_adults,
    num_children: clientData.num_children,
    pax_names: clientData.pax_names,
    sharing_option: clientData.sharing_option,
    destination_country: clientData.destination_country,
    destination_province: clientData.destination_province,
    destination_region: clientData.destination_region,
    travel_start_date: clientData.travel_start_date,
    travel_end_date: clientData.travel_end_date,
    markup_percentage: clientData.markup_percentage,
    currency_code: clientData.currency_code,
    client_id: clientData.client_id || null,
    status: "quotation",
  };
  try {
    const { data, error } = await req.supabase
      .from("itineraries")
      .insert([newItinerary])
      .select("id, unique_id, created_at")
      .single();
    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Could not create itinerary: " + error.message });
  }
});

app.put("/api/itineraries/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { itineraryData, daysData } = req.body;
  try {
    const { error: itineraryUpdateError } = await req.supabase
      .from("itineraries")
      .update(itineraryData)
      .eq("id", id)
      .eq("user_id", req.user.id);
    if (itineraryUpdateError) throw itineraryUpdateError;
    const { error: deleteDaysError } = await req.supabase
      .from("itinerary_days")
      .delete()
      .eq("itinerary_id", id);
    if (deleteDaysError) throw deleteDaysError;
    for (const day of daysData) {
      const { items, ...dayDetails } = day;
      const { data: newDay, error: dayInsertError } = await req.supabase
        .from("itinerary_days")
        .insert([{ ...dayDetails, itinerary_id: id }])
        .select("id")
        .single();
      if (dayInsertError) throw dayInsertError;
      if (items && items.length > 0) {
        const itemsToInsert = items.map((item) => ({
          ...item,
          itinerary_day_id: newDay.id,
        }));
        const { error: itemsInsertError } = await req.supabase
          .from("itinerary_day_items")
          .insert(itemsToInsert);
        if (itemsInsertError) throw itemsInsertError;
      }
    }
    res.status(200).json({ message: "Itinerary saved successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to save itinerary: " + error.message });
  }
});

// --- 4. START SERVER ---
app.listen(port, () => {
  console.log(`Tourbuilder server running at http://localhost:${port}`);
});
