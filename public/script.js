// public/script.js

console.log("Tourbuilder script loading...");

// --- Supabase Client Initialization (FOR AUTHENTICATION ONLY) ---
const SUPABASE_URL = "https://zrsymlevqfhgzajpffmu.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpyc3ltbGV2cWZoZ3phanBmZm11Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ5OTc4OTQsImV4cCI6MjA2MDU3Mzg5NH0.tf1qej5-yFjDYNnGa643bdLfwrRi_AHT-IR6fS71eb8";

let supabase = null;
try {
  if (
    typeof window.supabase === "undefined" ||
    !window.supabase?.createClient
  ) {
    throw new Error("Supabase library not found.");
  }
  supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  console.log("Supabase client initialized successfully (for auth).");
} catch (error) {
  console.error("Error initializing Supabase client:", error);
  document.addEventListener("DOMContentLoaded", () => {
    document.body.innerHTML = `<div style='color: red; background: lightyellow; padding: 20px; text-align: center; font-family: sans-serif;'>
            <h1>Critical Error</h1><p>Could not connect to the authentication service. The application cannot start.</p><p>Error: ${error.message}</p></div>`;
  });
}

// --- Global Element References ---
const authPage = document.getElementById("auth-page");
const loginForm = document.getElementById("login-form");
const signupSection = document.getElementById("signup-section");
const authErrorMessage = document.getElementById("auth-error-message");
const dashboardPage = document.getElementById("dashboard-page");
const companyNameDisplay = document.getElementById("company-name-display");
const dashboardUserName = document.getElementById("dashboard-user-name");
const dashboardUserEmailDisplay = document.getElementById(
  "dashboard-user-email-display"
);
const dashboardLogoutBtn = document.getElementById("dashboard-logout-btn");
const mainAppWrapper = document.getElementById("main-app-wrapper");
const logoutBtn = document.getElementById("logout-btn");
const userEmailDisplay = document.getElementById("user-email-display");
const backToDashboardBtn = document.getElementById("back-to-dashboard-btn");
const availableItemsList = document.getElementById("items-list");
const itineraryArea = document.getElementById("itinerary-area");
const daysContainer = document.getElementById("days-container");
const addDayButton = document.getElementById("add-day-btn");
const undoButton = document.getElementById("undo-btn");
const viewPrintBtn = document.getElementById("view-print-btn");
const exportDocBtn = document.getElementById("export-doc-btn");
const exportPdfBtn = document.getElementById("export-pdf-btn");
const editItineraryDetailsBtn = document.getElementById(
  "edit-itinerary-details-btn"
);
const saveAndCloseItineraryBtn = document.getElementById(
  "save-close-itinerary-btn"
);
const numPeopleInput = document.getElementById("num-people");
const grandTotalCostValue = document.getElementById("grand-total-cost-value");
const grandTotalSellingValue = document.getElementById(
  "grand-total-selling-value"
);
const pendingApprovalPage = document.getElementById("pending-approval-page");
const pendingLogoutBtn = document.getElementById("pending-logout-btn");
const newItineraryModal = document.getElementById("new-itinerary-modal");
const closeModalBtn = newItineraryModal?.querySelector(".close-modal-btn");
const cancelModalBtn = newItineraryModal?.querySelector(".cancel-modal-btn");
const newItineraryForm = document.getElementById("new-itinerary-form");
const itineraryNameInput = document.getElementById("itinerary-name");
const leadPaxNameInput = document.getElementById("lead-pax-name");
const leadPaxEmailInput = document.getElementById("lead-pax-email");
const leadPaxTelInput = document.getElementById("lead-pax-tel");
const clientTypeModalInput = document.getElementById("client-type");
const travelAgentFieldsDiv = document.getElementById("travel-agent-fields");
const b2bClientSelect = document.getElementById("b2b-client-select");
const markupPercentageInput = document.getElementById("markup-percentage");
const itineraryCurrencyInput = document.getElementById("itinerary-currency");
const itineraryCreatorNameInput = document.getElementById(
  "itinerary-creator-name"
);
const numAdultsModalInput = document.getElementById("num-adults-modal");
const numChildrenModalInput = document.getElementById("num-children-modal");
const modalTotalPaxDisplay = document.getElementById("modal-total-pax");
const paxNamesContainer = document.getElementById("pax-names-container");
const sharingOptionInput = document.getElementById("sharing-option");
const destCountryInput = document.getElementById("dest-country");
const destProvinceInput = document.getElementById("dest-province");
const destRegionInput = document.getElementById("dest-region");
const travelStartDateInput = document.getElementById("travel-start-date");
const travelEndDateInput = document.getElementById("travel-end-date");
const itineraryTitleDisplay = document.getElementById(
  "itinerary-title-display"
);
const displayClientName = document.getElementById("display-client-name");
const displayClientContact = document.getElementById("display-client-contact");
const displayClientType = document.getElementById("display-client-type");
const displayB2bClientNameContainer = document.getElementById(
  "display-b2b-client-name-container"
);
const displayB2bClientName = document.getElementById("display-b2b-client-name");
const displayCreator = document.getElementById("display-creator");
const displayUniqueID = document.getElementById("display-unique-id");
const displayCreationDate = document.getElementById("display-creation-date");
const displayStartDateInput = document.getElementById(
  "display-start-date-input"
);
const displayEndDateInput = document.getElementById("display-end-date-input");
const itemSearchInput = document.getElementById("item-search-input");
const dashboardSearchInput = document.getElementById("search-input");
const dashboardSearchBtn = document.getElementById("search-btn");
const dashboardSearchResults = document.getElementById("search-results");
const dashboardCreateNewBtn = document.getElementById(
  "dashboard-create-new-btn"
);
const authTabs = document.querySelector(".auth-tabs");
const mainAppTitle = document.getElementById("main-app-title");
const statusBadge = document.getElementById("status-badge");
const statusSelector = document.getElementById("status-selector");
const loadingOverlay = document.getElementById("loading-overlay");
const loadingMessage = document.getElementById("loading-message");
const grandTotalProfitLossValue = document.getElementById(
  "grand-total-profit-loss-value"
);
const sidebarCurrencySelect = document.getElementById(
  "sidebar-currency-select"
);
const descriptionEditorModal = document.getElementById(
  "description-editor-modal"
);
const descriptionModalTitle = document.getElementById(
  "description-modal-title"
);
const descriptionEditorForm = document.getElementById(
  "description-editor-form"
);
const descriptionTextarea = document.getElementById(
  "item-description-textarea"
);
const editingDayItemIdInput = document.getElementById("editing-day-item-id");
const serviceConfigModal = document.getElementById("service-config-modal");
const serviceConfigForm = document.getElementById("service-config-form");
const serviceConfigTitle = document.getElementById(
  "service-config-modal-title"
);
const serviceStartDayDisplay = document.getElementById(
  "service-start-day-display"
);
const serviceEndDaySelect = document.getElementById("service-end-day-select");
const serviceDaysContainer = document.getElementById(
  "service-days-config-container"
);
const configuringItemInstanceIdInput = document.getElementById(
  "configuring-item-instance-id"
);
const configuringItemIdInput = document.getElementById("configuring-item-id");

// --- State Variables ---
let currentUser = null;
let userProfile = null;
let currentlyDraggedElement = null;
let lastDeletedItemInfo = null;
let dayCounter = 0;
let numberOfPeople = 1;
let currentItineraryName = "Your Itinerary";
let currentClientName = "";
let currentClientEmail = "";
let currentClientTel = "";
let currentClientType = "";
let currentB2bClientId = null;
let currentMarkupPercentage = 20.0;
let currentItineraryCurrency = "USD";
let currentCurrencySymbol = "$";
let allAvailableCurrencies = [];
let currentPaxNames = [];
let travelStartDate = null;
let travelEndDate = null;
let itineraryCreatorName = "";
let itineraryUniqueID = "";
let itineraryCreationDate = null;
let currentlyEditingPriceElement = null;
let currentItineraryRecordId = null;
let paxAdults = 1;
let paxChildren = 0;
let sharingOption = "double";
let destinationInfo = {};
let builderListenersAttached = false;
let dashboardListenersAttached = false;
let allAvailableLibraryItems = [];
let allB2bClients = [];
let isSaving = false;
let isEditingModeForModal = false;
let appDefaultMarkupDirect = 20.0;
let appDefaultMarkupAgentGeneral = 10.0;
let currentItineraryStatus = "quotation";
let activeSession = null;
let configuringItemData = null;

// --- API Helper Function ---
async function fetchWithAuth(url, options = {}) {
  // Use the globally set activeSession, which is guaranteed to be ready.
  if (!activeSession?.access_token) {
    throw new Error("User not authenticated.");
  }

  const headers = {
    ...options.headers,
    // Use the access token from the correct variable.
    Authorization: `Bearer ${activeSession.access_token}`,
    "Content-Type": "application/json",
  };
  if (options.body) options.body = JSON.stringify(options.body);

  const response = await fetch(url, { ...options, headers });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.error || `HTTP error! status: ${response.status}`
    );
  }
  const contentType = response.headers.get("content-type");
  return contentType?.includes("application/json") ? response.json() : {};
}

// --- UI Helper Functions ---
const showPage = (pageToShow) => {
  [authPage, dashboardPage, mainAppWrapper, pendingApprovalPage].forEach(
    (page) => {
      if (page) page.style.display = "none";
    }
  );
  if (pageToShow) {
    pageToShow.style.display =
      pageToShow === authPage || pageToShow === pendingApprovalPage
        ? "flex"
        : "block";
  }
};

const displayAuthError = (message) => {
  if (authErrorMessage) {
    authErrorMessage.textContent = message;
    authErrorMessage.style.display = "block";
  }
};

const clearAuthError = () => {
  if (authErrorMessage) {
    authErrorMessage.textContent = "";
    authErrorMessage.style.display = "none";
  }
};

const showLoadingSpinner = (msg = "Loading...") => {
  if (loadingOverlay && loadingMessage) {
    loadingMessage.textContent = msg;
    loadingOverlay.style.display = "flex";
  }
};
const hideLoadingSpinner = () => {
  if (loadingOverlay) {
    loadingOverlay.style.display = "none";
  }
};

const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
};

const openModal = (mE) => {
  if (mE) {
    mE.style.display = "flex";
    mE.offsetHeight;
    mE.classList.add("modal-active");
  }
};
const closeModal = (mE) => {
  if (mE) {
    mE.classList.remove("modal-active");
    mE.addEventListener(
      "transitionend",
      function h() {
        if (!mE.classList.contains("modal-active")) {
          mE.style.display = "none";
        }
        mE.removeEventListener("transitionend", h);
      },
      { once: true }
    );
  }
};

// --- Registration and Auth UI Rendering ---
const renderInitialRegisterOptions = () => {
  if (!signupSection) return;
  signupSection.innerHTML = `
        <p>Are you a new Tour Operator, or have you been invited to join a team?</p>
        <div class="auth-actions" style="display: flex; flex-direction: column; gap: 10px;">
            <button id="show-operator-register-btn" class="auth-submit-btn">Register a New Company</button>
            <button id="show-consultant-register-btn" class="auth-submit-btn secondary">I Have an Invitation</button>
        </div>
    `;
  document
    .getElementById("show-operator-register-btn")
    ?.addEventListener("click", renderOperatorRegistrationForm);
  document
    .getElementById("show-consultant-register-btn")
    ?.addEventListener("click", renderConsultantRegistrationForm);
};

const renderOperatorRegistrationForm = () => {
  signupSection.innerHTML = `
        <form id="operator-signup-form">
            <h3>Register Your Company</h3>
            <div class="form-group"><label>Company Name *</label><input type="text" id="signup-company-name" required></div>
            <div class="form-group"><label>Your Full Name (Admin) *</label><input type="text" id="signup-contact-person" required></div>
            <div class="form-group"><label>Your Work Email (Admin) *</label><input type="email" id="signup-contact-email" required></div>
            <div class="form-group"><label>Password *</label><input type="password" id="signup-password" minlength="6" required></div>
            <div class="form-group"><label>Company Telephone</label><input type="tel" id="signup-contact-tel"></div>
            <small>This will create a new Tour Operator account and an admin user for it.</small>
            <div class="form-actions">
                <button type="button" id="back-to-register-options" class="auth-submit-btn secondary">Back</button>
                <button type="submit" class="auth-submit-btn">Register Company</button>
            </div>
        </form>
    `;
  document
    .getElementById("operator-signup-form")
    ?.addEventListener("submit", handleOperatorRegistration);
  document
    .getElementById("back-to-register-options")
    ?.addEventListener("click", renderInitialRegisterOptions);
};

const renderConsultantRegistrationForm = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const tokenFromUrl = urlParams.get("token") || "";

  signupSection.innerHTML = `
        <form id="consultant-signup-form">
            <h3>Join Your Team</h3>
            <div class="form-group"><label>Invitation Code *</label><input type="text" id="signup-token" value="${tokenFromUrl}" required></div>
            <div class="form-group"><label>Your Email</label><input type="email" id="signup-email" readonly></div>
            <div class="form-group"><label>Set Your Password *</label><input type="password" id="signup-password" minlength="6" required></div>
            <small>Enter the invitation code you received to join your company's team.</small>
             <div class="form-actions">
                <button type="button" id="back-to-register-options" class="auth-submit-btn secondary">Back</button>
                <button type="submit" class="auth-submit-btn">Complete Registration</button>
            </div>
        </form>
    `;
  const tokenInput = document.getElementById("signup-token");
  if (tokenFromUrl) handleTokenValidation({ target: tokenInput });
  tokenInput.addEventListener("input", handleTokenValidation);
  document
    .getElementById("consultant-signup-form")
    ?.addEventListener("submit", handleConsultantRegistration);
  document
    .getElementById("back-to-register-options")
    ?.addEventListener("click", renderInitialRegisterOptions);
};

// --- API Call Handlers ---
const handleOperatorRegistration = async (event) => {
  event.preventDefault();
  clearAuthError();
  const companyName = document.getElementById("signup-company-name").value;
  const contactPerson = document.getElementById("signup-contact-person").value;
  const contactEmail = document.getElementById("signup-contact-email").value;
  const password = document.getElementById("signup-password").value;
  const contactTel = document.getElementById("signup-contact-tel").value;

  try {
    const response = await fetch("/api/register/tour-operator", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        companyName,
        contactPerson,
        contactEmail,
        contactTel,
        password,
      }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    alert(
      "Company registered successfully! Please check your email for a verification link."
    );
    document
      .querySelector('.tab-button[data-target-form="login-section"]')
      .click();
  } catch (error) {
    displayAuthError(error.message);
  }
};

const handleTokenValidation = async (event) => {
  const token = event.target.value.trim();
  const emailInput = document.getElementById("signup-email");
  if (token.length < 36) {
    emailInput.value = "";
    return;
  }
  try {
    const data = await fetch(`/api/invitations/validate/${token}`).then((res) =>
      res.json()
    );
    if (data.error) throw new Error(data.error);
    emailInput.value = data.email;
  } catch (error) {
    emailInput.value = "Invalid or expired token";
    console.error(error.message);
  }
};

const handleConsultantRegistration = async (event) => {
  event.preventDefault();
  clearAuthError();
  const token = document.getElementById("signup-token").value;
  const password = document.getElementById("signup-password").value;

  try {
    const response = await fetch("/api/register/consultant", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    alert(
      "Registration complete! You can now log in with your email and new password."
    );
    document
      .querySelector('.tab-button[data-target-form="login-section"]')
      .click();
  } catch (error) {
    displayAuthError(error.message);
  }
};

const handleLogin = async (event) => {
  event.preventDefault();
  clearAuthError();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  } catch (error) {
    displayAuthError(error.message);
  }
};

const handleLogout = async () => {
  localStorage.removeItem("activeItineraryId"); // Clear the saved ID on logout
  await supabase.auth.signOut();
};

const handleAuthTabSwitch = (event) => {
  const clickedButton = event.target.closest(".tab-button");
  if (!clickedButton) return;
  const targetFormId = clickedButton.dataset.targetForm;
  authTabs
    .querySelectorAll(".tab-button")
    .forEach((btn) => btn.classList.remove("active"));
  document
    .querySelectorAll(".auth-form")
    .forEach((form) => form.classList.remove("active"));
  clickedButton.classList.add("active");
  document.getElementById(targetFormId).classList.add("active");
  clearAuthError();
};

const handleStatusChange = async (event) => {
  const newStatus = event.target.value;
  currentItineraryStatus = newStatus;

  // Update the UI immediately
  updateMetadataDisplay();

  // Save the change to the database
  await saveItinerary(false); // Save silently in the background
  console.log(`Itinerary status updated to: ${newStatus}`);
};

const updateAuthUI = () => {
  // This function populates user details wherever they need to appear.

  // 1. Determine the names to display, with fallbacks.
  const userFullName =
    userProfile?.first_name && userProfile?.last_name
      ? `${userProfile.first_name} ${userProfile.last_name}`
      : currentUser.email;

  const userFirstName =
    userProfile?.first_name || currentUser.email.split("@")[0];

  // 2. Update the Dashboard Header
  if (dashboardUserName) dashboardUserName.textContent = userFirstName;
  if (dashboardUserEmailDisplay)
    dashboardUserEmailDisplay.textContent = userFullName;

  // 3. Update the Itinerary Builder Header
  const mainUserDisplayEl = document.getElementById("user-email-display");
  if (mainUserDisplayEl) mainUserDisplayEl.textContent = userFullName;

  // 4. Update the Company Name on both pages
  const companyName =
    userProfile?.tour_operators?.company_name || "Tourbuilder";
  if (companyNameDisplay) companyNameDisplay.textContent = companyName;
  if (mainAppTitle) mainAppTitle.textContent = companyName;
};

// --- Itinerary Builder Logic ---
const formatDate = (d) => {
  if (!d || !(d instanceof Date)) return "";
  try {
    return d.toISOString().split("T")[0];
  } catch (e) {
    return "";
  }
};
const parseDateString = (ds) => {
  if (!ds || !/^\d{4}-\d{2}-\d{2}$/.test(ds)) return null;
  try {
    const p = ds.split("-");
    const y = parseInt(p[0], 10),
      m = parseInt(p[1], 10) - 1,
      d = parseInt(p[2], 10);
    if (isNaN(y) || isNaN(m) || isNaN(d)) return null;
    const dt = new Date(Date.UTC(y, m, d));
    if (
      dt.getUTCFullYear() === y &&
      dt.getUTCMonth() === m &&
      dt.getUTCDate() === d
    )
      return dt;
    return null;
  } catch (e) {
    return null;
  }
};
const addDays = (d, dys) => {
  if (!d || !(d instanceof Date) || isNaN(dys)) return null;
  try {
    const r = new Date(d);
    r.setUTCDate(r.getUTCDate() + dys);
    return r;
  } catch (e) {
    return null;
  }
};
const formatDisplayDate = (d) => {
  if (!d || !(d instanceof Date)) return "N/A";
  try {
    return d.toLocaleDateString(navigator.language || "en-US", {
      timeZone: "UTC",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch (e) {
    return "Invalid Date";
  }
};
const formatDisplayDateTime = (d) => {
  if (!d || !(d instanceof Date)) return "N/A";
  try {
    return d.toLocaleString(navigator.language || "en-US", {
      timeZone: "UTC",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  } catch (e) {
    return "Invalid Date";
  }
};
const formatCurrency = (amount, currencyCodeOrSymbol = null) => {
  let symbolToUse = currentCurrencySymbol;
  const targetCurrencyCode =
    currencyCodeOrSymbol || currentItineraryCurrency || "USD";
  if (currencyCodeOrSymbol) {
    const foundCurrency = allAvailableCurrencies.find(
      (c) => c.code === targetCurrencyCode || c.symbol === targetCurrencyCode
    );
    if (foundCurrency) {
      symbolToUse = foundCurrency.symbol;
    } else if (
      allAvailableCurrencies.every((c) => c.symbol !== targetCurrencyCode)
    ) {
      symbolToUse = targetCurrencyCode;
    }
  }
  let numberToFormat = Number(amount);
  if (isNaN(numberToFormat)) return `${symbolToUse}NaN`;
  return numberToFormat
    .toLocaleString("en-US", {
      style: "currency",
      currency: targetCurrencyCode || "USD",
      currencyDisplay: "symbol",
    })
    .replace(targetCurrencyCode, symbolToUse);
};
let dropIndicatorElement = null;
const getDropIndicator = () => {
  if (!dropIndicatorElement) {
    dropIndicatorElement = document.createElement("div");
    dropIndicatorElement.className = "drop-indicator";
    dropIndicatorElement.setAttribute("aria-hidden", "true");
  }
  return dropIndicatorElement;
};
const removeDropIndicator = () => {
  const i = daysContainer?.querySelector(".drop-indicator");
  i?.remove();
  dropIndicatorElement = null;
};
const createDeleteButton = () => {
  const b = document.createElement("button");
  b.textContent = "✕";
  b.className = "delete-item-btn";
  b.title = "Delete item";
  return b;
};

const updateAddDayButtonState = () => {
  if (!addDayButton) return;
  if (!travelEndDate) {
    addDayButton.disabled = false;
    return;
  }
  const eDs = daysContainer?.querySelectorAll(".day") ?? [];
  if (eDs.length === 0) {
    addDayButton.disabled =
      travelStartDate &&
      travelEndDate &&
      new Date(travelStartDate) > new Date(travelEndDate);
    return;
  }
  const lDE = eDs[eDs.length - 1];
  const lDI = lDE?.querySelector(".day-date-input");
  const lDV = lDI?.value;
  if (!lDV) {
    addDayButton.disabled = false;
    return;
  }
  const lD = parseDateString(lDV);
  if (lD && travelEndDate) {
    const lUD = Date.UTC(
      lD.getUTCFullYear(),
      lD.getUTCMonth(),
      lD.getUTCDate()
    );
    const eUD = Date.UTC(
      travelEndDate.getUTCFullYear(),
      travelEndDate.getUTCMonth(),
      travelEndDate.getUTCDate()
    );
    addDayButton.disabled = lUD >= eUD;
  } else {
    addDayButton.disabled = false;
  }
};

const updateMetadataDisplay = () => {
  if (itineraryTitleDisplay)
    itineraryTitleDisplay.textContent = currentItineraryName || "Itinerary";
  if (displayClientName)
    displayClientName.textContent = currentClientName || "N/A";
  let contactInfo = [currentClientEmail, currentClientTel]
    .filter(Boolean)
    .join(" / ");
  if (displayClientContact)
    displayClientContact.textContent = contactInfo || "N/A";

  let clientTypeDisplayValue = "N/A";
  if (currentClientType === "direct")
    clientTypeDisplayValue = "Direct Traveller";
  else if (currentClientType === "agent")
    clientTypeDisplayValue = "Travel Agent/B2B";
  if (displayClientType) displayClientType.textContent = clientTypeDisplayValue;

  if (
    currentClientType === "agent" &&
    currentB2bClientId &&
    allB2bClients.length > 0
  ) {
    const agent = allB2bClients.find((a) => a.id === currentB2bClientId);
    if (agent && displayB2bClientName) {
      displayB2bClientName.textContent = agent.client_name;
      if (displayB2bClientNameContainer)
        displayB2bClientNameContainer.style.display = "";
    } else {
      if (displayB2bClientNameContainer)
        displayB2bClientNameContainer.style.display = "none";
    }
  } else {
    if (displayB2bClientNameContainer)
      displayB2bClientNameContainer.style.display = "none";
  }

  if (displayCreator)
    displayCreator.textContent = itineraryCreatorName || "N/A";

  // *** THIS IS THE CRUCIAL FIX ***
  // Ensure we are using the correct state variable to update the UI.
  if (displayUniqueID) displayUniqueID.textContent = itineraryUniqueID || "N/A";

  // --- ADD/UPDATE THIS BLOCK ---
  if (statusBadge) {
    statusBadge.textContent = currentItineraryStatus;
    statusBadge.className = `status-badge status-${currentItineraryStatus}`;
  }
  if (statusSelector) {
    statusSelector.value = currentItineraryStatus;
  }
  // --- END OF BLOCK ---

  if (displayCreationDate)
    displayCreationDate.textContent = itineraryCreationDate
      ? formatDisplayDateTime(new Date(itineraryCreationDate))
      : "N/A";

  // WITH THIS NEW BLOCK:
  if (displayStartDateInput) {
    const tripStartDateStr = travelStartDate ? formatDate(travelStartDate) : "";
    const today = formatDate(new Date());
    displayStartDateInput.value = tripStartDateStr;

    // The min date is either its original start date (if in the past) or today.
    displayStartDateInput.min =
      tripStartDateStr && tripStartDateStr < today ? tripStartDateStr : today;
    displayStartDateInput.max = travelEndDate ? formatDate(travelEndDate) : "";
  }
  if (displayEndDateInput) {
    displayEndDateInput.value = travelEndDate ? formatDate(travelEndDate) : "";
    displayEndDateInput.min = travelStartDate
      ? formatDate(travelStartDate)
      : "";
  }
  updateAddDayButtonState();
  const totalPax = (paxAdults || 0) + (paxChildren || 0);
  if (numPeopleInput) numPeopleInput.value = totalPax > 0 ? totalPax : 1;
};

const saveItinerary = async (showAlert = true) => {
  // VALIDATION: Manually check for any occupancy warnings on the page before saving.
  const allWarningElements = document.querySelectorAll(".item-warning");
  let firstFoundWarning = null;

  for (const warningElement of allWarningElements) {
    if (warningElement.textContent.trim() !== "") {
      firstFoundWarning = warningElement;
      break; // Stop at the first warning found
    }
  }

  if (firstFoundWarning) {
    alert(
      "Cannot save. Please resolve all occupancy warnings before continuing."
    );
    firstFoundWarning.scrollIntoView({ behavior: "smooth", block: "center" });
    // Ensure the element is clearly visible after scrolling
    firstFoundWarning
      .closest(".itinerary-item")
      ?.classList.add("warning-focus");
    setTimeout(() => {
      firstFoundWarning
        .closest(".itinerary-item")
        ?.classList.remove("warning-focus");
    }, 2500);
    return; // Stop the save process
  }

  if (isSaving || !currentItineraryRecordId || !currentUser) {
    return;
  }
  isSaving = true;
  if (showAlert) showLoadingSpinner("Saving...");

  try {
    const itineraryData = {
      itinerary_name: currentItineraryName,
      lead_pax_name: currentClientName,
      lead_pax_email: currentClientEmail,
      lead_pax_tel: currentClientTel,
      num_adults: paxAdults,
      num_children: paxChildren,
      pax_names: JSON.stringify(currentPaxNames),
      sharing_option: sharingOption,
      destination_country: destinationInfo.country,
      destination_province: destinationInfo.province,
      destination_region: destinationInfo.region,
      travel_start_date: formatDate(travelStartDate),
      travel_end_date: formatDate(travelEndDate),
      markup_percentage: currentMarkupPercentage,
      currency_code: currentItineraryCurrency,
      client_id: currentB2bClientId,
      status: currentItineraryStatus,
    };

    const daysData = [];
    const dayElements = daysContainer.querySelectorAll(".day");
    dayElements.forEach((dayEl, dayIndex) => {
      const dayNumber = parseInt(dayEl.dataset.dayNumber || dayIndex + 1);
      const dayDateInput = dayEl.querySelector(".day-date-input");
      const dayDate = dayDateInput ? parseDateString(dayDateInput.value) : null;
      const items = [];
      const itemElements = dayEl.querySelectorAll(".itinerary-item");
      itemElements.forEach((itemEl, itemIndex) => {
        const isOverridden = itemEl.dataset.sellingPriceOverridden === "true";
        const sellingPrice = parseFloat(itemEl.dataset.sellingPrice) || 0;

        items.push({
          id: itemEl.dataset.dbId || undefined,
          itinerary_day_id: dayEl.dataset.dbId || undefined,
          item_rate_id: itemEl.dataset.itemRateId || null,
          item_text: itemEl.dataset.displayText,
          item_price_per_person: parseFloat(itemEl.dataset.costPrice) || 0,
          selling_price_per_person_override: isOverridden ? sellingPrice : null,
          item_order: itemIndex + 1,
          custom_item_description: itemEl.dataset.customDescription || null,
          library_item_id: itemEl.dataset.libraryItemId || null,
          service_config_id: itemEl.dataset.serviceConfigId || null,
        });
      });
      daysData.push({
        id: dayEl.dataset.dbId || undefined,
        day_number: dayNumber,
        day_date: dayDate ? formatDate(dayDate) : null,
        items: items,
      });
    });

    const url = `/api/itineraries/${currentItineraryRecordId}`;

    const responseData = await fetchWithAuth(url, {
      method: "PUT",
      body: { itineraryData, daysData },
    });

    if (responseData && responseData.savedDays) {
      responseData.savedDays.forEach((savedDay) => {
        const dayEl = document.querySelector(
          `.day[data-day-number="${savedDay.day_number}"]`
        );
        if (dayEl && !dayEl.dataset.dbId) {
          dayEl.dataset.dbId = savedDay.id;
          console.log(
            `Day ${savedDay.day_number} updated with new DB ID: ${savedDay.id}`
          );
        }
      });
    }

    if (showAlert) console.log("Itinerary saved via backend.");
  } catch (error) {
    console.error("Error saving itinerary via backend:", error);
    if (showAlert) alert(`Save failed: ${error.message}`);
  } finally {
    if (showAlert) hideLoadingSpinner();
    isSaving = false;
  }
};

const loadItinerary = async (itineraryDbId) => {
  if (!currentUser || !itineraryDbId) return false;
  showLoadingSpinner("Loading itinerary...");
  try {
    const idat = await fetchWithAuth(`/api/itineraries/${itineraryDbId}`);
    if (!idat) throw new Error("Itinerary data is null.");

    // --- All State Updates ---
    currentItineraryRecordId = idat.id;
    localStorage.setItem("activeItineraryId", idat.id);
    currentItineraryStatus = idat.status || "quotation";
    currentItineraryName = idat.itinerary_name;
    currentClientName = idat.lead_pax_name;
    currentClientEmail = idat.lead_pax_email;
    currentClientTel = idat.lead_pax_tel;
    currentB2bClientId = idat.client_id || null;
    currentClientType = currentB2bClientId ? "agent" : "direct";
    currentItineraryCurrency = idat.currency_code || "USD";
    const loadedCurrencyObj = allAvailableCurrencies.find(
      (c) => c.code === currentItineraryCurrency
    );
    currentCurrencySymbol = loadedCurrencyObj ? loadedCurrencyObj.symbol : "$";
    currentMarkupPercentage =
      parseFloat(idat.markup_percentage) ||
      (currentClientType === "agent"
        ? appDefaultMarkupAgentGeneral
        : appDefaultMarkupDirect);
    paxAdults = idat.num_adults || 1;
    paxChildren = idat.num_children || 0;
    numberOfPeople = paxAdults + paxChildren > 0 ? paxAdults + paxChildren : 1;

    try {
      currentPaxNames =
        typeof idat.pax_names === "string"
          ? JSON.parse(idat.pax_names)
          : idat.pax_names || [];
    } catch (e) {
      currentPaxNames = [];
    }

    sharingOption = idat.sharing_option;
    destinationInfo = {
      country: idat.destination_country,
      province: idat.destination_province,
      region: idat.destination_region,
    };
    travelStartDate = idat.travel_start_date
      ? parseDateString(idat.travel_start_date)
      : null;
    travelEndDate = idat.travel_end_date
      ? parseDateString(idat.travel_end_date)
      : null;
    itineraryUniqueID = idat.unique_id;
    itineraryCreationDate = idat.created_at
      ? new Date(idat.created_at)
      : new Date();
    itineraryCreatorName =
      [userProfile?.first_name, userProfile?.last_name]
        .filter(Boolean)
        .join(" ") ||
      currentUser?.email ||
      "";

    // --- Data Fetching Logic ---
    const allItems = idat.itinerary_days.flatMap((d) => d.itinerary_day_items);
    const libraryItemIds = [
      ...new Set(allItems.map((i) => i.library_item_id).filter(Boolean)),
    ];
    const dayItemIds = allItems.map((i) => i.id);

    const allRateIds = [...new Set(allItems.map((i) => i.item_rate_id))];
    // We need to fetch configs first to find out if there are *other* rate IDs we need
    const serviceConfigMap =
      dayItemIds.length > 0
        ? await fetchWithAuth("/api/service-configs/bulk", {
            method: "POST",
            body: { dayItemIds },
          })
        : {};

    Object.values(serviceConfigMap)
      .flat()
      .forEach((config) => {
        if (!allRateIds.includes(config.item_rate_id)) {
          allRateIds.push(config.item_rate_id);
        }
      });

    const [itemMetaMap, rateMetaMap] = await Promise.all([
      libraryItemIds.length > 0
        ? fetchWithAuth("/api/items/metadata", {
            method: "POST",
            body: { itemIds: libraryItemIds },
          })
        : Promise.resolve({}),
      allRateIds.length > 0
        ? fetchWithAuth("/api/rates/metadata", {
            method: "POST",
            body: { rateIds: allRateIds.filter(Boolean) },
          })
        : Promise.resolve({}),
    ]);

    // --- Rebuild the UI ---
    daysContainer.innerHTML = "";
    dayCounter = 0;
    const ddat = (idat.itinerary_days || []).sort(
      (a, b) => a.day_number - b.day_number
    );
    ddat.forEach((d) => {
      dayCounter = Math.max(dayCounter, d.day_number);
      const newDayElement = createDayElement(
        d.day_number,
        d.day_date ? formatDate(parseDateString(d.day_date)) : null
      );
      newDayElement.dataset.dbId = d.id;

      const dayItemsList = newDayElement.querySelector(".day-items-list");
      const itdat = (d.itinerary_day_items || []).sort(
        (a, b) => a.item_order - b.item_order
      );
      itdat.forEach((itm) => {
        const itemElement = document.createElement("div");
        const itemMeta = itemMetaMap[itm.library_item_id] || {};
        let rateMeta = rateMetaMap[itm.item_rate_id] || {};
        const serviceConfigs = serviceConfigMap[itm.id] || [];

        let finalCost = 0;
        if (serviceConfigs.length > 0) {
          serviceConfigs.forEach((config) => {
            const configRateMeta = rateMetaMap[config.item_rate_id];
            if (configRateMeta) {
              finalCost +=
                configRateMeta.cost_per_unit ||
                configRateMeta.cost_per_person ||
                0;
            }
          });
          rateMeta = rateMetaMap[serviceConfigs[0].item_rate_id] || {};
        } else {
          finalCost =
            itm.item_price_per_person ||
            rateMeta?.cost_per_unit ||
            rateMeta?.cost_per_person ||
            0;
        }

        configureItineraryItem(itemElement, {
          cost: finalCost,
          selling_price_per_person_override:
            itm.selling_price_per_person_override,
          displayText: itm.item_text,
          db_id: itm.id,
          item_rate_id: itm.item_rate_id,
          library_item_id: itm.library_item_id,
          currencyCode: rateMeta?.currency_code,
          pricingModel: rateMeta?.pricing_model,
          maxOccupancy: itemMeta.max_occupancy,
          subCategory: itemMeta.sub_category,
          serviceConfigs: serviceConfigs,
        });

        dayItemsList.appendChild(itemElement);
      });

      daysContainer.appendChild(newDayElement);
    });

    populateSidebarCurrencyDropdown();
    await fetchAndDisplayAvailableItems(itemSearchInput.value.trim());
    updateGrandTotal();
    updateMetadataDisplay();
    updateServiceDayHighlights();
    showPage(mainAppWrapper);
    if (!builderListenersAttached) attachBuilderListeners();

    console.log(`Itinerary '${currentItineraryName}' loaded from backend.`);
    return true;
  } catch (error) {
    console.error("Error loading itinerary from backend:", error);
    alert(`Failed to load itinerary: ${error.message}`);
    showPage(dashboardPage);
    return false;
  } finally {
    hideLoadingSpinner();
  }
};

const createDayElement = (dN, dDS = null) => {
  const dId = `day-${dN}`;
  const dDv = document.createElement("div");
  dDv.className = "day";
  dDv.id = dId;
  dDv.dataset.dayNumber = dN;
  const hDv = document.createElement("div");
  hDv.className = "day-header";
  const tDDv = document.createElement("div");
  tDDv.className = "day-header-title-date";
  const h3 = document.createElement("h3");
  h3.textContent = `Day ${dN}`;
  const dIn = document.createElement("input");
  dIn.type = "date";
  dIn.className = "day-date-input";
  dIn.ariaLabel = `Date for Day ${dN}`;
  if (dDS) dIn.value = dDS;
  else if (travelStartDate) {
    const cD = addDays(new Date(travelStartDate), dN - 1);
    dIn.value = cD ? formatDate(cD) : "";
  } else {
    dIn.value = formatDate(new Date());
  }
  tDDv.appendChild(h3);
  tDDv.appendChild(dIn);
  const rBtn = document.createElement("button");
  rBtn.className = "remove-day-btn";
  rBtn.textContent = "Remove Day";
  rBtn.title = `Remove Day ${dN}`;
  hDv.appendChild(tDDv);
  hDv.appendChild(rBtn);
  const iLDv = document.createElement("div");
  iLDv.className = "day-items-list";
  dDv.appendChild(hDv);
  dDv.appendChild(iLDv);
  return dDv;
};

const updateSubsequentDayDates = (cDE) => {
  if (!cDE) return;
  const dIn = cDE.querySelector(".day-date-input");
  let cD = parseDateString(dIn?.value);
  if (!cD) return;
  let currDE = cDE.nextElementSibling;
  while (currDE?.classList.contains("day")) {
    cD = addDays(cD, 1);
    if (!cD) break;
    const nDI = currDE.querySelector(".day-date-input");
    if (nDI) {
      nDI.value = formatDate(cD);
      if (travelStartDate) nDI.min = formatDate(travelStartDate);
      if (travelEndDate) nDI.max = formatDate(travelEndDate);
    }
    currDE = currDE.nextElementSibling;
  }
  saveItinerary();
};

function updateItemFinancialsDisplay(itemElement) {
  if (!itemElement) return;

  itemElement.querySelector(".item-warning")?.remove();
  itemElement.classList.remove("warning", "is-service-item");

  const currencyCode =
    itemElement.dataset.currencyCode || currentItineraryCurrency;
  const pricingModel = itemElement.dataset.pricingModel || "per_person";
  const maxOccupancy = itemElement.dataset.maxOccupancy
    ? parseInt(itemElement.dataset.maxOccupancy)
    : null;
  const subCategory = itemElement.dataset.subCategory;
  const serviceConfigs = JSON.parse(itemElement.dataset.serviceConfigs || "[]");

  const costPerBase = parseFloat(itemElement.dataset.costPrice) || 0;
  const totalPax = (paxAdults || 0) + (paxChildren || 0) || 1;

  const itemMarkupInput = itemElement.querySelector(".item-markup-input");
  const itemMarkup = itemElement.dataset.itemMarkup;

  let effectiveMarkup;
  if (itemMarkup !== "" && itemMarkup !== undefined) {
    effectiveMarkup = parseFloat(itemMarkup);
    itemMarkupInput.value = effectiveMarkup.toFixed(2);
  } else {
    effectiveMarkup = parseFloat(currentMarkupPercentage);
    itemMarkupInput.value = "";
    itemMarkupInput.placeholder = effectiveMarkup.toFixed(2);
  }

  let sellingPricePerBase = parseFloat(itemElement.dataset.sellingPrice) || 0;
  if (itemElement.dataset.sellingPriceOverridden !== "true") {
    sellingPricePerBase = costPerBase * (1 + effectiveMarkup / 100);
    itemElement.dataset.sellingPrice = sellingPricePerBase.toFixed(2);
  }

  let totalCost = 0;
  let totalSell = 0;
  let displayUnitText = "pp";

  if (pricingModel === "per_unit") {
    displayUnitText = "per unit";
    totalCost = costPerBase;
    totalSell = sellingPricePerBase;
  } else {
    displayUnitText = "pp";
    totalCost = costPerBase * totalPax;
    totalSell = sellingPricePerBase * totalPax;
  }

  const itemCategory = itemElement.dataset.itemType;
  if (
    ["Transfer", "Safari", "Activity", "Vehicle"].includes(itemCategory) &&
    maxOccupancy
  ) {
    if (totalPax > maxOccupancy) {
      const warningDiv = document.createElement("div");
      warningDiv.className = "item-warning";
      warningDiv.textContent = `Warning: Occupancy (${maxOccupancy}) exceeded for ${totalPax} people. Click to fix.`;
      itemElement
        .querySelector(".item-details")
        .insertBefore(warningDiv, itemElement.querySelector(".item-pricing"));
      itemElement.classList.add("warning");
    }
  }

  // --- THIS IS THE DEFINITIVE FIX ---
  const configBtn = itemElement.querySelector(".configure-service-btn");
  if (subCategory === "Guide" || subCategory === "Driver") {
    itemElement.classList.add("is-service-item");
    if (configBtn) configBtn.style.display = "inline-block";
  } else {
    if (configBtn) configBtn.style.display = "none";
  }
  // --- END OF FIX ---

  const costDisplaySpan = itemElement.querySelector(".item-cost-display");
  const sellingPriceValueSpan = itemElement.querySelector(
    ".selling-price-value"
  );
  const totalItemCostSpan = itemElement.querySelector(".total-item-cost");
  const totalItemSellingSpan = itemElement.querySelector(".total-item-selling");

  const costPriceSpan = costDisplaySpan.querySelector(".editable-cost-price");
  const costSuffixSpan = costDisplaySpan.querySelector(".cost-suffix");
  if (costPriceSpan)
    costPriceSpan.textContent = formatCurrency(costPerBase, currencyCode);
  if (costSuffixSpan) costSuffixSpan.textContent = ` ${displayUnitText}`;

  if (sellingPriceValueSpan) {
    const perPersonSellEquivalent = totalPax > 0 ? totalSell / totalPax : 0;
    sellingPriceValueSpan.textContent = formatCurrency(
      perPersonSellEquivalent,
      currencyCode
    );
  }

  if (totalItemCostSpan)
    totalItemCostSpan.textContent = `Total Cost: ${formatCurrency(
      totalCost,
      currencyCode
    )}`;
  if (totalItemSellingSpan)
    totalItemSellingSpan.textContent = `Total Sell: ${formatCurrency(
      totalSell,
      currencyCode
    )}`;
}

const updateAllItemFinancialDisplays = () => {
  daysContainer
    ?.querySelectorAll(".itinerary-item")
    .forEach(updateItemFinancialsDisplay);
};

const configureItineraryItem = (itemElement, sourceData = {}) => {
  if (!itemElement) return;

  const serviceConfigs = sourceData.serviceConfigs || [];

  itemElement.classList.remove("draggable-item");
  itemElement.classList.add("itinerary-item");
  itemElement.draggable = true;

  const costPrice = parseFloat(
    sourceData.cost || sourceData.price || sourceData.cost_per_person || "0"
  );
  const displayText =
    (sourceData.displayText || sourceData.item_text) ?? "(Untitled Item)";

  itemElement.dataset.costPrice = costPrice.toFixed(2);
  itemElement.dataset.displayText = displayText;
  itemElement.dataset.currencyCode =
    sourceData.currencyCode || currentItineraryCurrency;
  itemElement.dataset.libraryItemId =
    sourceData.itemId || sourceData.library_item_id || "";
  itemElement.dataset.itemRateId =
    sourceData.itemRateId || sourceData.item_rate_id || "";
  itemElement.dataset.dbId = sourceData.db_id || "";
  itemElement.dataset.instanceId = `inst-${Date.now()}-${Math.random()
    .toString(36)
    .substr(2, 5)}`;
  itemElement.dataset.itemType = sourceData.itemType || "other";
  itemElement.dataset.subCategory = sourceData.subCategory || "";
  itemElement.dataset.pricingModel = sourceData.pricingModel || "per_person";
  itemElement.dataset.maxOccupancy = sourceData.maxOccupancy || "0";
  itemElement.dataset.itemMarkup = sourceData.itemMarkup ?? "";
  itemElement.dataset.serviceConfigs = JSON.stringify(serviceConfigs);

  let initialSellingPrice = parseFloat(
    sourceData.selling_price_per_person_override
  );
  if (isNaN(initialSellingPrice) || initialSellingPrice === null) {
    const itineraryMarkup = parseFloat(currentMarkupPercentage) || 0;
    initialSellingPrice = costPrice * (1 + itineraryMarkup / 100);
    itemElement.dataset.sellingPriceOverridden = "false";
  } else {
    itemElement.dataset.sellingPriceOverridden = "true";
  }
  itemElement.dataset.sellingPrice = initialSellingPrice.toFixed(2);

  itemElement.innerHTML = `
    <div class="item-details">
      <span class="item-text">${displayText.replace(/</g, "<")}</span>
      <div class="item-warning"></div>
      <div class="item-pricing">
        <span class="item-cost-display"> Cost: <span class="editable-cost-price" title="Double-click to edit cost price">$0.00</span> <span class="edit-icon" aria-hidden="true">✎</span> <span class="cost-suffix">pp</span> </span> 
        <span class="item-markup-container"> <input type="number" class="item-markup-input" min="0" step="0.01" title="Item-specific markup %" />% </span> 
        <span class="item-selling-display"> Sell: <span class="selling-price-value">$0.00</span> pp </span>
      </div>
      <div class="item-actions">
        <button class="edit-description-btn" title="Edit custom description">📝 Edit Description</button>
      </div>
    </div>
    <div class="item-totals">
      <span class="total-item-cost">Total Cost: $0.00</span>
      <span class="total-item-selling">Total Sell: $0.00</span>
      <button class="delete-item-btn" title="Delete item">✕</button>
    </div>`;

  itemElement.addEventListener("dragstart", handleDragStart);
  itemElement.addEventListener("dragend", handleDragEnd);
  itemElement.classList.remove("is-editing");
  itemElement.classList.remove("is-editing-price");
  updateItemFinancialsDisplay(itemElement);
};

const updateGrandTotal = () => {
  const wholesaleTotalsByCurrency = {};
  const sellingTotalsByCurrency = {};
  const totalPax = (paxAdults || 0) + (paxChildren || 0) || 1;

  // 1. Group totals by currency, respecting the pricing model
  daysContainer?.querySelectorAll(".itinerary-item").forEach((itemEl) => {
    const currencyCode =
      itemEl.dataset.currencyCode || currentItineraryCurrency;
    const pricingModel = itemEl.dataset.pricingModel || "per_person";
    const costPerBase = parseFloat(itemEl.dataset.costPrice) || 0;

    // Get the base selling price from the item's dataset
    let sellingPricePerBase = parseFloat(itemEl.dataset.sellingPrice) || 0;

    let itemTotalCost = 0;
    let itemTotalSell = 0;

    // THIS IS THE CORRECTED LOGIC
    if (pricingModel === "per_unit") {
      // For unit-priced items, the total is just the base price.
      itemTotalCost = costPerBase;
      itemTotalSell = sellingPricePerBase;
    } else {
      // For per-person items, multiply by the number of travelers.
      itemTotalCost = costPerBase * totalPax;
      itemTotalSell = sellingPricePerBase * totalPax;
    }

    if (!wholesaleTotalsByCurrency[currencyCode]) {
      wholesaleTotalsByCurrency[currencyCode] = 0;
      sellingTotalsByCurrency[currencyCode] = 0;
    }

    wholesaleTotalsByCurrency[currencyCode] += itemTotalCost;
    sellingTotalsByCurrency[currencyCode] += itemTotalSell;
  });

  // 2. Build the display strings (This part is already correct)
  let wholesaleHtml = "";
  let sellingHtml = "";
  let profitLossHtml = "";

  const currencyOrder = [
    currentItineraryCurrency,
    ...Object.keys(wholesaleTotalsByCurrency).filter(
      (c) => c !== currentItineraryCurrency
    ),
  ];
  const processedCurrencies = new Set();

  currencyOrder.forEach((code) => {
    if (
      wholesaleTotalsByCurrency[code] === undefined ||
      processedCurrencies.has(code)
    )
      return;

    const wholesaleAmount = wholesaleTotalsByCurrency[code];
    const sellingAmount = sellingTotalsByCurrency[code];
    const profitLossAmount = sellingAmount - wholesaleAmount;

    wholesaleHtml += `<div>${formatCurrency(wholesaleAmount, code)}</div>`;
    sellingHtml += `<div>${formatCurrency(sellingAmount, code)}</div>`;

    const profitClass = profitLossAmount >= 0 ? "profit" : "loss";
    profitLossHtml += `<div class="${profitClass}">${formatCurrency(
      profitLossAmount,
      code
    )}</div>`;

    processedCurrencies.add(code);
  });

  // 3. Update the DOM
  if (grandTotalCostValue) {
    grandTotalCostValue.innerHTML =
      wholesaleHtml || formatCurrency(0, currentItineraryCurrency);
  }
  if (grandTotalSellingValue) {
    grandTotalSellingValue.innerHTML =
      sellingHtml || formatCurrency(0, currentItineraryCurrency);
  }
  if (grandTotalProfitLossValue) {
    grandTotalProfitLossValue.innerHTML =
      profitLossHtml ||
      `<div class="profit">${formatCurrency(
        0,
        currentItineraryCurrency
      )}</div>`;
  }
};

// --- Adding the New, Athoritative Function to add the Configure Service button ---
const updateServiceDayHighlights = () => {
  // First, reset all service items by removing any existing buttons
  daysContainer
    .querySelectorAll(".configure-service-btn")
    .forEach((btn) => btn.remove());

  const serviceItemGroups = {};

  // Find and group all service items by their library ID
  daysContainer
    .querySelectorAll(
      '.itinerary-item[data-sub-category="Guide"], .itinerary-item[data-sub-category="Driver"]'
    )
    .forEach((itemEl) => {
      const libId = itemEl.dataset.libraryItemId;
      if (!libId) return;
      if (!serviceItemGroups[libId]) {
        serviceItemGroups[libId] = [];
      }
      const dayNum = parseInt(itemEl.closest(".day").dataset.dayNumber);
      serviceItemGroups[libId].push({ element: itemEl, day: dayNum });
    });

  // For each group, find the one on the earliest day and add the button
  for (const libId in serviceItemGroups) {
    const group = serviceItemGroups[libId];
    if (group.length === 0) continue;

    // Sort by day number to ensure we find the absolute first one
    group.sort((a, b) => a.day - b.day);
    const firstServiceItem = group[0].element;

    // Add the button only to this first item if it doesn't already have one
    if (!firstServiceItem.querySelector(".configure-service-btn")) {
      const configBtn = document.createElement("button");
      configBtn.className = "configure-service-btn";
      configBtn.title = "Configure multi-day service options";
      configBtn.textContent = "⚙️ Configure Service";
      firstServiceItem.querySelector(".item-actions").appendChild(configBtn);
    }
  }
};

const handleDragStart = (event) => {
  if (
    event.target.closest(".delete-item-btn") ||
    event.target.closest(".is-editing") ||
    event.target.closest(".is-editing-price")
  ) {
    event.preventDefault();
    return;
  }
  if (event.target.matches(".draggable-item, .itinerary-item")) {
    currentlyDraggedElement = event.target;
    setTimeout(() => {
      currentlyDraggedElement?.classList.add("dragging");
    }, 0);
    try {
      event.dataTransfer.setData(
        "text/plain",
        event.target.dataset.itemId ||
          event.target.dataset.instanceId ||
          "unknown"
      );
      event.dataTransfer.effectAllowed = "move";
    } catch (e) {
      currentlyDraggedElement = null;
      event.preventDefault();
    }
  } else {
    event.preventDefault();
  }
};
const handleDragEnd = (event) => {
  if (currentlyDraggedElement) {
    currentlyDraggedElement.classList.remove("dragging");
  }
  currentlyDraggedElement = null;
  removeDropIndicator();
};
const handleDragOver = (event) => {
  event.preventDefault();
  const dropZone = event.target.closest(".day-items-list");
  if (!dropZone || !currentlyDraggedElement) return;
  event.dataTransfer.dropEffect = "move";
  const indicator = getDropIndicator();
  removeDropIndicator();
  const dropTargetItem = event.target.closest(".itinerary-item:not(.dragging)");
  if (dropTargetItem) {
    const rect = dropTargetItem.getBoundingClientRect();
    const isAbove = event.clientY < rect.top + rect.height / 2;
    dropZone.insertBefore(
      indicator,
      isAbove ? dropTargetItem : dropTargetItem.nextSibling
    );
  } else if (dropZone.contains(event.target)) {
    const allItemsInZone = [
      ...dropZone.querySelectorAll(".itinerary-item:not(.dragging)"),
    ];
    let closestAbove = null;
    let minDistanceAbove = Infinity;
    allItemsInZone.forEach((child) => {
      const box = child.getBoundingClientRect();
      const distance = box.top - event.clientY;
      if (distance > 0 && distance < minDistanceAbove) {
        minDistanceAbove = distance;
        closestAbove = child;
      }
    });
    if (closestAbove) {
      dropZone.insertBefore(indicator, closestAbove);
    } else {
      dropZone.appendChild(indicator);
    }
  }
};
const handleDragEnter = (event) => {
  event.preventDefault();
  const dropZone = event.target.closest(".day-items-list");
  if (dropZone && currentlyDraggedElement && event.target === dropZone) {
    dropZone.classList.add("drag-over");
  }
};
const handleDragLeave = (event) => {
  const dropZone = event.target.closest(".day-items-list");
  if (
    dropZone &&
    currentlyDraggedElement &&
    !dropZone.contains(event.relatedTarget) &&
    event.target === dropZone
  ) {
    dropZone.classList.remove("drag-over");
    removeDropIndicator();
  }
};
const handleDrop = async (event) => {
  event.preventDefault();
  removeDropIndicator();
  const dropZone = event.target.closest(".day-items-list");
  if (!dropZone || !currentlyDraggedElement) {
    if (currentlyDraggedElement)
      currentlyDraggedElement.classList.remove("dragging");
    currentlyDraggedElement = null;
    return;
  }
  dropZone.classList.remove("drag-over");

  const sourceIsSidebar = currentlyDraggedElement.closest(
    "#available-items-panel"
  );
  let elementToAdd;

  // THIS IS THE DEFINITIVE FIX
  const targetDayElement = dropZone.closest(".day");
  if (!targetDayElement.dataset.dbId) {
    console.log("Target day is new. Saving itinerary first...");
    showLoadingSpinner("Saving Day...");
    await saveItinerary(false); // This now updates the day element's dbId
    hideLoadingSpinner();
  }

  if (sourceIsSidebar) {
    const itemData = {
      price: currentlyDraggedElement.dataset.price,
      displayText: currentlyDraggedElement.dataset.displayText,
      itemId: currentlyDraggedElement.dataset.itemId,
      itemRateId: currentlyDraggedElement.dataset.itemRateId,
      itemType: currentlyDraggedElement.dataset.itemType,
      currencyCode: sidebarCurrencySelect.value,
      pricingModel: currentlyDraggedElement.dataset.pricingModel,
      maxOccupancy: currentlyDraggedElement.dataset.maxOccupancy,
      subCategory: currentlyDraggedElement.dataset.subCategory,
    };

    if (itemData.subCategory === "Guide" || itemData.subCategory === "Driver") {
      openServiceConfigModal(itemData, targetDayElement);
      currentlyDraggedElement = null;
      return;
    } else {
      elementToAdd = document.createElement("div");
      configureItineraryItem(elementToAdd, itemData);
    }
  } else {
    elementToAdd = currentlyDraggedElement;
  }

  let droppedOnItem = event.target.closest(".itinerary-item:not(.dragging)");
  if (droppedOnItem && droppedOnItem.parentNode === dropZone) {
    const rect = droppedOnItem.getBoundingClientRect();
    if (event.clientY < rect.top + rect.height / 2) {
      dropZone.insertBefore(elementToAdd, droppedOnItem);
    } else {
      dropZone.insertBefore(elementToAdd, droppedOnItem.nextSibling);
    }
  } else {
    dropZone.appendChild(elementToAdd);
  }

  updateGrandTotal();
  updateServiceDayHighlights();
  saveItinerary();
  currentlyDraggedElement = null;
};

const handleAddDayClick = () => {
  try {
    if (!travelStartDate || !travelEndDate) {
      alert("Please set main travel dates first.");
      return;
    }
    const existingDays = daysContainer.querySelectorAll(".day");
    let lastDayDate = null;
    if (existingDays.length > 0) {
      const lastDay = existingDays[existingDays.length - 1];
      const lastDateInput = lastDay.querySelector(".day-date-input");
      lastDayDate = parseDateString(lastDateInput?.value);
    } else {
      lastDayDate = addDays(new Date(travelStartDate), -1);
    }
    if (!lastDayDate) {
      alert("Cannot determine date for new day.");
      return;
    }
    const nextDayDate = addDays(lastDayDate, 1);
    if (travelEndDate && nextDayDate > travelEndDate) {
      alert(
        `Cannot add day beyond travel end date (${formatDisplayDate(
          travelEndDate
        )}).`
      );
      addDayButton.disabled = true;
      return;
    }
    let maxDayNum = 0;
    existingDays.forEach((day) => {
      const num = parseInt(day.dataset.dayNumber);
      if (!isNaN(num) && num > maxDayNum) maxDayNum = num;
    });
    dayCounter = maxDayNum + 1;
    const newDay = createDayElement(dayCounter, formatDate(nextDayDate));
    if (!newDay) return;
    daysContainer.appendChild(newDay);
    newDay.scrollIntoView({ behavior: "smooth", block: "nearest" });
    saveItinerary();
  } catch (error) {
    console.error("Error in handleAddDayClick:", error);
  }
};
const handleDaysContainerChange = (event) => {
  const target = event.target;
  if (target.classList.contains("day-date-input")) {
    const dayElement = target.closest(".day");
    updateSubsequentDayDates(dayElement);
  } else if (target.classList.contains("item-markup-input")) {
    const itemElement = target.closest(".itinerary-item");
    if (itemElement) {
      itemElement.dataset.itemMarkup = target.value;
      // When markup changes, we must reset the selling price override flag
      itemElement.dataset.sellingPriceOverridden = "false";
      updateItemFinancialsDisplay(itemElement);
      updateGrandTotal();
      saveItinerary();
    }
  }
};
const handleMainDateChange = (event) => {
  if (!displayStartDateInput || !displayEndDateInput) return;

  const oldStartDate = travelStartDate;
  const oldEndDate = travelEndDate;

  // Calculate duration based on the previous valid state
  let durationInNights = -1;
  if (oldStartDate && oldEndDate && oldEndDate >= oldStartDate) {
    durationInNights = Math.round(
      (oldEndDate.getTime() - oldStartDate.getTime()) / (1000 * 60 * 60 * 24)
    );
  }

  const newStartDate = parseDateString(displayStartDateInput.value);

  if (!newStartDate) {
    // If the date is cleared or invalid, revert to the previous valid state and stop
    displayStartDateInput.value = oldStartDate ? formatDate(oldStartDate) : "";
    return;
  }

  // Update the global state for the start date
  travelStartDate = newStartDate;

  // Calculate the new end date, preserving duration if it was valid
  if (durationInNights >= 0) {
    travelEndDate = addDays(newStartDate, durationInNights);
  } else {
    // If no valid duration existed, set the end date to the new start date
    travelEndDate = new Date(newStartDate);
  }

  // Update the UI from the new global state and save
  resquenceDayDates();
  updateMetadataDisplay(); // This will correctly set the input values and constraints
  saveItinerary(false); // Save silently
};

const resquenceDayDates = () => {
  if (!travelStartDate) return;

  let currentDate = new Date(travelStartDate);
  const dayElements = daysContainer.querySelectorAll(".day");

  dayElements.forEach((dayEl) => {
    const dateInput = dayEl.querySelector(".day-date-input");
    if (dateInput) {
      if (!travelEndDate || currentDate <= travelEndDate) {
        dateInput.value = formatDate(currentDate);
      } else {
        dateInput.value = "";
      }
    }
    currentDate = addDays(currentDate, 1);
  });
  updateAddDayButtonState();
};

const handleDoubleClick = (event) => {
  const targetElement = event.target;
  const itemElement = targetElement.closest(".itinerary-item");
  if (!itemElement || itemElement.classList.contains("is-editing")) return;

  // Only allow editing for the cost price now
  if (targetElement.classList.contains("editable-cost-price")) {
    enterPriceEditMode(itemElement, targetElement, "cost");
  }
};

const handleNumPeopleChange = (event) => {
  const newTotalPax = parseInt(event.target.value);
  if (!isNaN(newTotalPax) && newTotalPax >= 1) {
    paxAdults = newTotalPax;
    paxChildren = 0;
    numberOfPeople = newTotalPax;
    updateAllItemFinancialDisplays();
    updateGrandTotal();
    saveItinerary();
  } else {
    event.target.value = numberOfPeople;
  }
};
const handleDaysContainerClick = (event) => {
  const target = event.target;

  if (target.classList.contains("edit-description-btn")) {
    const itemElement = target.closest(".itinerary-item");
    if (itemElement) {
      openDescriptionEditor(itemElement);
    }
    return; // Stop further execution
  } else if (target.classList.contains("configure-service-btn")) {
    const clickedItemEl = target.closest(".itinerary-item");
    const startDayEl = clickedItemEl.closest(".day");
    const libraryItemId = clickedItemEl.dataset.libraryItemId;

    if (!libraryItemId) return;

    // Find all items that are part of this service run
    const serviceItemsToRemove = [];
    let currentDay = startDayEl;
    while (currentDay) {
      const serviceItemInDay = currentDay.querySelector(
        `.itinerary-item[data-library-item-id="${libraryItemId}"]`
      );
      if (serviceItemInDay) {
        serviceItemsToRemove.push(serviceItemInDay);
      } else {
        // Stop when we hit a day without this service item
        break;
      }
      currentDay = currentDay.nextElementSibling;
    }

    if (
      confirm(
        "This will replace the current service run. Are you sure you want to re-configure it?"
      )
    ) {
      // Remove all the old items from the itinerary
      serviceItemsToRemove.forEach((item) => item.remove());

      // Prepare data from the *original* item to open the modal fresh
      const itemData = {
        displayText: clickedItemEl.dataset.displayText,
        itemId: clickedItemEl.dataset.libraryItemId,
        subCategory: clickedItemEl.dataset.subCategory,
        // Other necessary data could be added here if needed
      };

      // Open the modal to start the configuration process over
      openServiceConfigModal(itemData, startDayEl);
    }
    return;
  }

  if (target.classList.contains("remove-day-btn")) {
    const dayToRemove = event.target.closest(".day");
    if (dayToRemove) {
      const dayTitle =
        dayToRemove.querySelector("h3")?.textContent || dayToRemove.id;
      if (confirm(`Remove ${dayTitle}?`)) {
        dayToRemove.remove();
        updateGrandTotal();
        updateServiceDayHighlights();
        saveItinerary();
      }
    }
  } else if (target.classList.contains("delete-item-btn")) {
    const itemToDelete = target.closest(".itinerary-item");
    if (itemToDelete) {
      itemToDelete.remove();
      updateGrandTotal();
      saveItinerary();
    }
  } else if (target.classList.contains("item-warning")) {
    const itemEl = event.target.closest(".itinerary-item");
    if (!itemEl) return;

    if (itemEl.querySelector(".item-replacement-container")) return;

    const currentItemId = itemEl.dataset.libraryItemId;
    const currentCurrency = itemEl.dataset.currencyCode;
    const totalPax = (paxAdults || 0) + (paxChildren || 0) || 1;

    // THIS IS THE CORRECTED LOGIC
    // 1. Find the original library item to get its exact supplierName
    const originalItem = allAvailableLibraryItems.find(
      (item) => item.itemId === currentItemId
    );
    if (!originalItem) {
      target.textContent = "Could not find original item data.";
      return;
    }
    const supplierName = originalItem.supplierName;

    // 2. Now filter using the correct supplierName
    const replacementOptions = allAvailableLibraryItems.filter(
      (item) =>
        item.supplierName === supplierName &&
        item.currencyCode === currentCurrency &&
        (item.maxOccupancy === null || item.maxOccupancy >= totalPax) &&
        item.itemId !== currentItemId
    );

    if (replacementOptions.length > 0) {
      const container = document.createElement("div");
      container.className = "item-replacement-container";

      const label = document.createElement("label");
      label.textContent = "Choose a suitable replacement:";

      const select = document.createElement("select");
      select.className = "item-replacement-select";
      select.innerHTML = `<option value="">Select a vehicle...</option>`;

      replacementOptions.forEach((opt) => {
        select.innerHTML += `<option value="${opt.itemRateId}">${
          opt.itemName
        } (Max: ${opt.maxOccupancy || "N/A"}) - ${formatCurrency(
          opt.cost,
          opt.currencyCode
        )}</option>`;
      });

      select.addEventListener("change", handleItemReplacement);

      container.appendChild(label);
      container.appendChild(select);
      target.innerHTML = "";
      target.appendChild(container);
    } else {
      target.textContent = "No suitable replacements found in this currency.";
    }
  }
};

const handleItemReplacement = async (event) => {
  const selectElement = event.target;
  const selectedOption = selectElement.options[selectElement.selectedIndex];
  const oldItemElement = selectElement.closest(".itinerary-item");

  if (!selectedOption.value || !oldItemElement) return;

  showLoadingSpinner("Replacing item...");
  try {
    const newItemData = allAvailableLibraryItems.find(
      (item) => item.itemRateId === selectedOption.value
    );
    if (!newItemData) throw new Error("Could not find replacement item data.");

    // Create a new element with the replacement data
    const newItemElement = document.createElement("div");
    configureItineraryItem(newItemElement, {
      price: newItemData.cost,
      displayText: `${newItemData.supplierName} - ${newItemData.itemName}`,
      itemId: newItemData.itemId,
      itemRateId: newItemData.itemRateId,
      itemType: newItemData.category,
      currencyCode: newItemData.currencyCode,
      pricingModel: newItemData.pricingModel,
      maxOccupancy: newItemData.maxOccupancy,
    });

    // Replace the old item with the new one in the DOM
    oldItemElement.parentNode.replaceChild(newItemElement, oldItemElement);

    // THIS IS THE FIX: Re-run all display logic on the entire page
    updateAllItemFinancialDisplays();

    updateGrandTotal();
    await saveItinerary(false);
  } catch (error) {
    console.error("Error replacing item:", error);
    alert(`Could not replace item: ${error.message}`);
  } finally {
    hideLoadingSpinner();
  }
};

const openDescriptionEditor = async (itemElement) => {
  const dayItemDbId = itemElement.dataset.dbId;
  const displayText = itemElement.dataset.displayText;

  descriptionModalTitle.textContent = `Edit Description for: ${displayText}`;
  editingDayItemIdInput.value = dayItemDbId;

  // For now, we'll just use a data attribute on the element itself
  // We will sync with the database in the next step
  const currentDescription = itemElement.dataset.customDescription || "";
  descriptionTextarea.value = currentDescription;

  openModal(descriptionEditorModal);
};

const handleSaveDescription = async (event) => {
  event.preventDefault();
  showLoadingSpinner("Saving...");
  try {
    const dayItemDbId = editingDayItemIdInput.value;
    const newDescription = descriptionTextarea.value;

    if (!dayItemDbId) {
      // This handles items that haven't been saved to the DB yet
      const itemElement = document.querySelector(
        `[data-instance-id="${editingDayItemIdInput.value}"]`
      );
      if (itemElement) {
        itemElement.dataset.customDescription = newDescription;
        console.log(
          "Custom description for new item updated locally. Will be saved with itinerary."
        );
      }
    } else {
      // This handles existing items by calling the new API endpoint
      await fetchWithAuth(`/api/itinerary-item/${dayItemDbId}/description`, {
        method: "PUT",
        body: { customDescription: newDescription },
      });
      // Also update the local dataset to keep things in sync
      const itemElement = document.querySelector(
        `[data-db-id="${dayItemDbId}"]`
      );
      if (itemElement) {
        itemElement.dataset.customDescription = newDescription;
      }
    }

    closeModal(descriptionEditorModal);
  } catch (error) {
    console.error("Error saving description:", error);
    alert(`Failed to save description: ${error.message}`);
  } finally {
    hideLoadingSpinner();
  }
};

const handleModalDateChange = () => {
  const startDateValue = travelStartDateInput.value;
  const endDateValue = travelEndDateInput.value;

  const startDate = parseDateString(startDateValue);

  if (startDate) {
    // Set the minimum selectable date for the end date picker
    travelEndDateInput.min = startDateValue;

    const endDate = parseDateString(endDateValue);
    // If the end date is now before the start date, reset the end date to match
    if (endDate && endDate < startDate) {
      travelEndDateInput.value = startDateValue;
    }
  }
};

const calculateServiceCost = (serviceConfigs, ratesMap) => {
  let totalCost = 0;
  if (!serviceConfigs || !ratesMap) return 0;

  serviceConfigs.forEach((config) => {
    const rateData = ratesMap[config.item_rate_id];
    if (rateData) {
      // This assumes the cost is always in cost_per_unit for services
      totalCost += parseFloat(
        rateData.cost_per_unit || rateData.cost_per_person || 0
      );
    }
  });
  return totalCost;
};

const openServiceConfigModal = (itemData, startDayElement) => {
  configuringItemData = itemData; // Store the raw data from the sidebar item
  const startDayNum = parseInt(startDayElement.dataset.dayNumber);

  serviceConfigTitle.textContent = `Configure: ${itemData.displayText}`;
  serviceStartDayDisplay.value = `Day ${startDayNum}`;

  // These will be used when we save the configuration
  configuringItemIdInput.value = itemData.itemId;

  // Populate the "End Day" dropdown, starting from the current day
  const allDayElements = Array.from(daysContainer.querySelectorAll(".day"));
  serviceEndDaySelect.innerHTML = "";
  allDayElements.forEach((dayEl) => {
    const dayNum = parseInt(dayEl.dataset.dayNumber);
    if (dayNum >= startDayNum) {
      const option = document.createElement("option");
      option.value = dayNum;
      option.textContent = `Day ${dayNum}`;
      // Select the start day by default
      if (dayNum === startDayNum) {
        option.selected = true;
      }
      serviceEndDaySelect.appendChild(option);
    }
  });

  // Initial call to generate the rows based on default selection
  generateServiceDayRows();
  openModal(serviceConfigModal);
};

const generateServiceDayRows = async () => {
  const startDay = parseInt(serviceStartDayDisplay.value.replace("Day ", ""));
  const endDay = parseInt(serviceEndDaySelect.value);
  const itemId = configuringItemIdInput.value;

  showLoadingSpinner("Fetching rates...");
  try {
    // THIS IS THE FIX: Call the new, dedicated API endpoint
    const availableRates = await fetchWithAuth(`/api/items/${itemId}/rates`);

    serviceDaysContainer.innerHTML = "";
    for (let i = startDay; i <= endDay; i++) {
      const dayElement = document.querySelector(`.day[data-day-number="${i}"]`);
      const dayDate = dayElement
        ? dayElement.querySelector(".day-date-input").value
        : "";

      const dayRow = document.createElement("div");
      dayRow.className = "service-day-row";
      dayRow.dataset.dayNumber = i;

      const rateOptionsHtml = availableRates
        .filter((rate) => rate.rate_type) // Ensure we only show rates with a type
        .map((rate) => {
          // Reconstruct the item data needed for the next step
          const fullRateData = {
            itemId: rate.items.id,
            itemName: rate.items.name,
            supplierName: rate.items.suppliers.name,
            category: rate.items.category,
            subCategory: rate.items.sub_category,
            maxOccupancy: rate.items.max_occupancy,
            itemRateId: rate.id,
            rate_name: rate.rate_name,
            cost: rate.cost_per_person || rate.cost_per_unit,
            pricingModel: rate.pricing_model,
            rate_type: rate.rate_type,
            currencyCode: rate.currency_code,
          };
          return `<option value="${rate.id}" data-rate-data='${JSON.stringify(
            fullRateData
          )}'>${rate.rate_name || rate.rate_type}</option>`;
        })
        .join("");

      dayRow.innerHTML = `
        <label>Day ${i} (${dayDate})</label>
        <div class="conflict-warning-container"></div>
        <select class="rate-type-select">
          <option value="">Select rate...</option>
          ${rateOptionsHtml}
        </select>
      `;
      serviceDaysContainer.appendChild(dayRow);
    }
  } catch (error) {
    console.error("Failed to generate service day rows:", error);
    serviceDaysContainer.innerHTML = `<p style="color: red; padding: 1rem;">Error fetching rates. Please try again.</p>`;
  } finally {
    hideLoadingSpinner();
  }
};

const handleConfirmService = async (event) => {
  event.preventDefault();
  showLoadingSpinner("Saving Service...");

  try {
    const startDayNum = parseInt(
      serviceStartDayDisplay.value.replace("Day ", "")
    );

    // 1. Collect all day configurations from the modal
    const dayRows = serviceDaysContainer.querySelectorAll(".service-day-row");
    const configurations = [];
    for (const row of dayRows) {
      const dayNumber = parseInt(row.dataset.dayNumber);
      const rateSelect = row.querySelector(".rate-type-select");
      const rateId = rateSelect.value;
      if (!rateId) {
        throw new Error(`Please select a rate for Day ${dayNumber}.`);
      }
      const rateData = JSON.parse(
        rateSelect.options[rateSelect.selectedIndex].dataset.rateData
      );
      configurations.push({ dayNumber, rateData });
    }

    // 2. THIS IS THE FIX: Loop through each configuration and add a full, independent item to each day
    for (const config of configurations) {
      const targetDayElement = document.querySelector(
        `.day[data-day-number="${config.dayNumber}"]`
      );
      if (targetDayElement) {
        if (!targetDayElement.dataset.dbId) {
          await saveItinerary(false); // Save if the target day is new
        }

        const dropZone = targetDayElement.querySelector(".day-items-list");
        const serviceElement = document.createElement("div");

        // Use the specific rate data for THIS day to create a complete item
        configureItineraryItem(serviceElement, {
          cost: config.rateData.cost,
          displayText: `${config.rateData.supplierName} - ${config.rateData.itemName} (${config.rateData.rate_name})`,
          itemId: config.rateData.itemId,
          itemRateId: config.rateData.itemRateId,
          itemType: config.rateData.category,
          subCategory: config.rateData.subCategory,
          currencyCode: config.rateData.currencyCode,
          pricingModel: config.rateData.pricingModel,
          maxOccupancy: config.rateData.maxOccupancy,
        });

        dropZone.appendChild(serviceElement);
      }
    }

    // 3. Update UI and save the entire itinerary at once
    updateServiceDayHighlights();
    updateAllItemFinancialDisplays();
    updateGrandTotal();
    saveItinerary();
  } catch (error) {
    console.error("Error confirming service:", error);
    alert(`Error: ${error.message}`);
  } finally {
    hideLoadingSpinner();
    closeModal(serviceConfigModal);
  }
};

const enterPriceEditMode = (itemElement, priceSpan, priceType) => {
  if (
    !itemElement ||
    !priceSpan ||
    itemElement.classList.contains("is-editing-price")
  )
    return;
  itemElement.classList.add("is-editing-price");
  itemElement.draggable = false;

  const isCost = priceType === "cost";
  const currentPrice =
    parseFloat(itemElement.dataset[isCost ? "costPrice" : "sellingPrice"]) || 0;

  const input = document.createElement("input");
  input.type = "number";
  input.className = "editing-selling-price-input"; // The class works for both
  input.value = currentPrice.toFixed(2);
  input.min = "0";
  input.step = "0.01";
  input.ariaLabel = `Edit ${priceType} price`;

  const parentOfSpan = priceSpan.parentNode;
  parentOfSpan.replaceChild(input, priceSpan);
  input.focus();
  input.select();

  const exitAndSave = (save) => {
    let savedChange = false;
    if (save) {
      const newPrice = parseFloat(input.value);
      const costPrice = isCost
        ? newPrice
        : parseFloat(itemElement.dataset.costPrice) || 0;
      const sellingPrice = isCost
        ? parseFloat(itemElement.dataset.sellingPrice) || 0
        : newPrice;

      if (!isNaN(newPrice) && (isCost || newPrice >= costPrice)) {
        const oldPrice = parseFloat(
          (itemElement.dataset[isCost ? "costPrice" : "sellingPrice"] =
            newPrice.toFixed(2))
        );
        if (isCost) {
          // THIS IS THE FIX: Recalculate selling price when cost changes
          const itineraryMarkup = parseFloat(currentMarkupPercentage) || 0;
          const newSellingPrice = newPrice * (1 + itineraryMarkup / 100);
          itemElement.dataset.sellingPrice = newSellingPrice.toFixed(2);
          itemElement.dataset.sellingPriceOverridden = "false"; // Reset override flag
        } else {
          itemElement.dataset.sellingPriceOverridden = "true";
        }
      } else {
        alert(
          isCost
            ? "Cost must be a valid number."
            : `Selling price must be a number and cannot be less than cost price (${formatCurrency(
                costPrice
              )}).`
        );
      }
    }

    if (input.parentNode) {
      input.parentNode.replaceChild(priceSpan, input);
    }
    itemElement.classList.remove("is-editing-price");
    itemElement.draggable = true;
    updateItemFinancialsDisplay(itemElement);
    if (savedChange) saveItinerary();
  };

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      exitAndSave(true);
    } else if (e.key === "Escape") {
      e.preventDefault();
      exitAndSave(false);
    }
  });
  input.addEventListener("blur", () =>
    setTimeout(() => {
      if (document.body.contains(input) && document.activeElement !== input)
        exitAndSave(true);
    }, 150)
  );
};

const handleShowCreateModal = async () => {
  isEditingModeForModal = false;
  newItineraryForm.reset();
  document.querySelector("#new-itinerary-modal #modal-title").textContent =
    "Create New Itinerary";
  document.querySelector(
    "#new-itinerary-modal .create-itinerary-btn"
  ).textContent = "Create Itinerary";
  paxNamesContainer.innerHTML = "";
  handlePaxNumChangeModal();
  await fetchAndPopulateB2bClients();
  populateCurrencyDropdown();
  handleClientTypeChangeInModal();

  // ADD THIS BLOCK
  const today = formatDate(new Date());
  travelStartDateInput.min = today;
  travelEndDateInput.min = today;
  // END OF BLOCK

  openModal(newItineraryModal);
};

const handleShowEditModal = async () => {
  if (!currentItineraryRecordId) {
    alert("No active itinerary to edit.");
    return;
  }
  isEditingModeForModal = true;

  // Update modal title and button text for editing
  document.querySelector("#new-itinerary-modal #modal-title").textContent =
    "Edit Itinerary Details";
  document.querySelector(
    "#new-itinerary-modal .create-itinerary-btn"
  ).textContent = "Save Changes";

  // Populate dynamic dropdowns first
  await fetchAndPopulateB2bClients();
  populateCurrencyDropdown();

  // Pre-fill all form fields with current itinerary data
  itineraryNameInput.value = currentItineraryName;
  leadPaxNameInput.value = currentClientName;
  leadPaxEmailInput.value = currentClientEmail;
  leadPaxTelInput.value = currentClientTel;
  clientTypeModalInput.value = currentClientType;
  b2bClientSelect.value = currentB2bClientId || "";
  markupPercentageInput.value = currentMarkupPercentage.toFixed(2);
  itineraryCurrencyInput.value = currentItineraryCurrency;
  numAdultsModalInput.value = paxAdults;
  numChildrenModalInput.value = paxChildren;
  sharingOptionInput.value = sharingOption;
  destCountryInput.value = destinationInfo.country || "";
  destProvinceInput.value = destinationInfo.province || "";
  destRegionInput.value = destinationInfo.region || "";
  travelStartDateInput.value = formatDate(travelStartDate);
  travelEndDateInput.value = formatDate(travelEndDate);

  // Trigger UI updates within the modal
  handleClientTypeChangeInModal(); // This shows/hides the B2B client field
  handlePaxNumChangeModal(); // This updates pax total and generates name fields with pre-filled names

  // ADD THIS BLOCK
  const today = formatDate(new Date());
  const tripStartDateStr = travelStartDateInput.value;

  // The min date for an existing trip is either its original start date (if in the past) or today.
  travelStartDateInput.min =
    tripStartDateStr && tripStartDateStr < today ? tripStartDateStr : today;
  // The end date must always be on or after the start date.
  travelEndDateInput.min = tripStartDateStr || today;
  // END OF BLOCK

  openModal(newItineraryModal);
};
const handleCloseModal = () => {
  if (newItineraryModal) closeModal(newItineraryModal);
  isEditingModeForModal = false;
};
const handlePaxNumChangeModal = () => {
  const a = parseInt(numAdultsModalInput?.value) || 0;
  const c = parseInt(numChildrenModalInput?.value) || 0;
  let t = a + c;
  if (numAdultsModalInput && a < 0) {
    numAdultsModalInput.value = "0";
  }
  if (numChildrenModalInput && c < 0) {
    numChildrenModalInput.value = "0";
  }
  if (
    !isEditingModeForModal &&
    t === 0 &&
    (parseInt(numAdultsModalInput?.value) || 0) === 0
  ) {
    t = 1;
    if (numAdultsModalInput) numAdultsModalInput.value = "1";
  } else if (isEditingModeForModal && t === 0) {
  }
  if (modalTotalPaxDisplay) modalTotalPaxDisplay.textContent = t;
  generatePaxNameFields(t);
};
const generatePaxNameFields = (nP) => {
  if (!paxNamesContainer) return;
  paxNamesContainer.innerHTML = "";
  if (nP <= 0 && !isEditingModeForModal) nP = 1;
  if (nP <= 0 && isEditingModeForModal) return;
  for (let i = 1; i <= nP; i++) {
    const grp = document.createElement("div");
    grp.className = "pax-input-group";
    const lbl = document.createElement("label");
    lbl.htmlFor = `modal-pax-name-${i}`;
    lbl.textContent = `Pax ${i} Name:`;
    const inp = document.createElement("input");
    inp.type = "text";
    inp.id = `modal-pax-name-${i}`;
    inp.placeholder = `Full Name`;
    inp.required = true;
    if (isEditingModeForModal && currentPaxNames && currentPaxNames[i - 1])
      inp.value = currentPaxNames[i - 1];
    grp.appendChild(lbl);
    grp.appendChild(inp);
    paxNamesContainer.appendChild(grp);
  }
};
const generateItineraryHTML = () => {
  return `<html><body><h1>Itinerary (Preview)</h1></body></html>`;
};
const handleViewPrint = () => {
  console.log("View/Print clicked. (TODO)");
};
const handleExportDoc = () => {
  console.log("Export DOC clicked. (TODO)");
};
const handleExportPdf = () => {
  console.log("Export PDF clicked. (TODO)");
};
const handleUndoClick = () => {
  console.log("Undo clicked.");
};

const handleSearchItineraries = async () => {
  if (!currentUser) return;
  const searchTerm = dashboardSearchInput?.value.trim();
  if (!searchTerm) {
    dashboardSearchResults.innerHTML =
      "<p>Enter a search term (ID, Name, Client).</p>";
    return;
  }
  showLoadingSpinner("Searching itineraries...");
  dashboardSearchResults.innerHTML = "<p>Searching...</p>";
  try {
    const data = await fetchWithAuth(
      `/api/itineraries/search?term=${encodeURIComponent(searchTerm)}`
    );
    if (data.length === 0) {
      dashboardSearchResults.innerHTML = "<p>No itineraries found.</p>";
    } else {
      const ul = document.createElement("ul");
      ul.style.cssText = "list-style-type:none; padding:0;";
      data.forEach((itinerary) => {
        const li = document.createElement("li");
        li.style.cssText =
          "padding:8px; border-bottom:1px solid var(--border-light); cursor:pointer;";
        li.innerHTML = `<span style="font-weight:bold;">${
          itinerary.itinerary_name
        } (Client: ${itinerary.lead_pax_name || "N/A"}, ID: ${
          itinerary.unique_id
        })</span>
                                <span style="font-size:0.9em; color:var(--text-dark-secondary); margin-left:10px;"> - Starts: ${
                                  itinerary.travel_start_date
                                    ? formatDisplayDate(
                                        parseDateString(
                                          itinerary.travel_start_date
                                        )
                                      )
                                    : "N/A"
                                }</span>`;
        li.addEventListener("click", () => loadItinerary(itinerary.id));
        ul.appendChild(li);
      });
      dashboardSearchResults.innerHTML = "";
      dashboardSearchResults.appendChild(ul);
    }
  } catch (error) {
    console.error("Error searching itineraries:", error);
    dashboardSearchResults.innerHTML = `<p class="error-message">Search Error: ${error.message}</p>`;
  } finally {
    hideLoadingSpinner();
  }
};

const handleSaveAndCloseItinerary = async () => {
  await saveItinerary();
  localStorage.removeItem("activeItineraryId"); // Clear the saved ID
  showPage(dashboardPage);
};

const handleCreateItinerary = async (event) => {
  event.preventDefault();
  if (!currentUser) {
    alert("Not logged in.");
    return;
  }
  const actionVerb = isEditingModeForModal ? "Updating" : "Creating";
  showLoadingSpinner(`${actionVerb} itinerary...`);

  const itn = itineraryNameInput?.value.trim();
  const ldn = leadPaxNameInput?.value.trim();
  const lde = leadPaxEmailInput?.value.trim();
  const ldt = leadPaxTelInput?.value.trim();
  const sct = clientTypeModalInput?.value;
  const cnv = itineraryCreatorNameInput?.value.trim();
  let tpa = parseInt(numAdultsModalInput?.value) || 0;
  let tpc = parseInt(numChildrenModalInput?.value) || 0;
  let totPaxNames = tpa + tpc;
  if (!isEditingModeForModal && totPaxNames === 0) {
    tpa = 1;
    totPaxNames = 1;
  }
  const tso = sharingOptionInput?.value || "double";
  const tdi = {
    country: destCountryInput?.value.trim(),
    province: destProvinceInput?.value.trim(),
    region: destRegionInput?.value.trim(),
  };
  const sds = travelStartDateInput?.value;
  const eds = travelEndDateInput?.value;
  const tpn = [];
  for (let i = 1; i <= totPaxNames; i++) {
    const ip = document.getElementById(`modal-pax-name-${i}`);
    tpn.push(ip?.value.trim() || "");
  }
  const selCurrency = itineraryCurrencyInput.value;
  const selB2bClientId =
    sct === "agent" && b2bClientSelect ? b2bClientSelect.value : null;

  const finalMarkup = parseFloat(markupPercentageInput.value);

  if (!sct || !itn || !ldn || !lde || !sds || !eds) {
    alert("Please fill all required fields (*)");
    hideLoadingSpinner();
    return;
  }
  const sdo = parseDateString(travelStartDateInput?.value);
  const edo = parseDateString(travelEndDateInput?.value);
  if (!sdo || !edo || edo < sdo) {
    alert("Please enter valid travel dates.");
    hideLoadingSpinner();
    return;
  }

  currentItineraryName = itn;
  currentClientName = ldn;
  currentClientEmail = lde;
  currentClientTel = ldt;
  currentClientType = sct;
  paxAdults = tpa;
  paxChildren = tpc;
  numberOfPeople = paxAdults + paxChildren > 0 ? paxAdults + paxChildren : 1;
  currentPaxNames = tpn;
  travelStartDate = sdo;
  travelEndDate = edo;
  sharingOption = tso;
  destinationInfo = tdi;
  currentMarkupPercentage = finalMarkup;
  currentB2bClientId = selB2bClientId;
  currentItineraryCurrency = selCurrency;
  const selCurrObj = allAvailableCurrencies.find(
    (c) => c.code === currentItineraryCurrency
  );
  currentCurrencySymbol = selCurrObj ? selCurrObj.symbol : "$";
  if (!isEditingModeForModal) {
    itineraryCreatorName =
      cnv ||
      [userProfile?.first_name, userProfile?.last_name]
        .filter(Boolean)
        .join(" ") ||
      currentUser?.email ||
      "";
  }

  try {
    if (isEditingModeForModal) {
      handleCloseModal(newItineraryModal);
      updateMetadataDisplay();
      await saveItinerary(false);
      alert("Itinerary details updated successfully.");
    } else {
      const itineraryPayload = {
        itinerary_name: currentItineraryName,
        lead_pax_name: currentClientName,
        lead_pax_email: currentClientEmail,
        lead_pax_tel: currentClientTel,
        num_adults: paxAdults,
        num_children: paxChildren,
        pax_names: JSON.stringify(currentPaxNames),
        sharing_option: sharingOption,
        destination_country: destinationInfo.country,
        destination_province: destinationInfo.province,
        destination_region: destinationInfo.region,
        travel_start_date: formatDate(travelStartDate),
        travel_end_date: formatDate(travelEndDate),
        markup_percentage: currentMarkupPercentage,
        currency_code: currentItineraryCurrency,
        client_id: currentB2bClientId,
      };
      const data = await fetchWithAuth("/api/itineraries", {
        method: "POST",
        body: itineraryPayload,
      });

      currentItineraryRecordId = data.id;
      itineraryUniqueID = data.unique_id;
      itineraryCreationDate = data.created_at
        ? new Date(data.created_at)
        : new Date();

      daysContainer.innerHTML = "";
      dayCounter = 0;
      const dayDiff =
        Math.ceil(
          Math.abs(travelEndDate - travelStartDate) / (1000 * 60 * 60 * 24)
        ) + 1;
      for (let i = 0; i < dayDiff; i++) {
        dayCounter++;
        const dayDate = addDays(travelStartDate, i);
        const newDayElement = createDayElement(dayCounter, formatDate(dayDate));
        daysContainer.appendChild(newDayElement);
      }

      handleCloseModal(newItineraryModal);
      updateMetadataDisplay();
      updateGrandTotal();

      // *** THIS IS THE CORRECTED LOGIC ***
      // First, show the main builder page
      showPage(mainAppWrapper);
      // Then, fetch the items for the sidebar based on the new itinerary's currency
      await fetchAndDisplayAvailableItems();

      await saveItinerary(false);
      alert("Itinerary created successfully.");
    }
  } catch (error) {
    console.error(`Error ${actionVerb} itinerary:`, error);
    alert(`Failed to ${actionVerb.toLowerCase()} itinerary: ${error.message}`);
  } finally {
    hideLoadingSpinner();
    isEditingModeForModal = false;
  }
};

const populateCurrencyDropdown = () => {
  if (!itineraryCurrencyInput) {
    return;
  }
  itineraryCurrencyInput.innerHTML = "";
  if (allAvailableCurrencies.length === 0) {
    itineraryCurrencyInput.innerHTML =
      '<option value="USD" selected>$ (US Dollar)</option>';
    return;
  }
  allAvailableCurrencies.forEach((curr) => {
    const opt = document.createElement("option");
    opt.value = curr.code;
    opt.textContent = `${curr.symbol} (${curr.name})`;
    itineraryCurrencyInput.appendChild(opt);
  });
};

const populateSidebarCurrencyDropdown = () => {
  if (!sidebarCurrencySelect) return;
  sidebarCurrencySelect.innerHTML = "";
  if (allAvailableCurrencies.length === 0) {
    sidebarCurrencySelect.innerHTML =
      '<option value="USD">$ (US Dollar)</option>';
    return;
  }
  allAvailableCurrencies.forEach((curr) => {
    const opt = document.createElement("option");
    opt.value = curr.code;
    opt.textContent = `${curr.symbol} (${curr.name})`;
    // Set the itinerary's main currency as the default selection
    if (curr.code === currentItineraryCurrency) {
      opt.selected = true;
    }
    sidebarCurrencySelect.appendChild(opt);
  });
};

const handleClientTypeChangeInModal = () => {
  if (!clientTypeModalInput || !travelAgentFieldsDiv || !markupPercentageInput)
    return;
  const selectedType = clientTypeModalInput.value;
  if (selectedType === "agent") {
    travelAgentFieldsDiv.style.display = "block";
    b2bClientSelect.required = true;
    markupPercentageInput.value = appDefaultMarkupAgentGeneral.toFixed(2);
  } else {
    travelAgentFieldsDiv.style.display = "none";
    b2bClientSelect.required = false;
    b2bClientSelect.value = "";
    markupPercentageInput.value = appDefaultMarkupDirect.toFixed(2);
  }
};

async function fetchAndPopulateB2bClients() {
  try {
    allB2bClients = await fetchWithAuth("/api/b2b-clients");
    b2bClientSelect.innerHTML = '<option value="">Select B2B Client</option>';
    allB2bClients.forEach((client) => {
      const option = document.createElement("option");
      option.value = client.id;
      option.textContent = client.client_name;
      if (
        client.default_markup !== null &&
        client.default_markup !== undefined
      ) {
        option.dataset.markup = client.default_markup;
      }
      b2bClientSelect.appendChild(option);
    });
  } catch (error) {
    console.error("Failed to fetch B2B clients:", error);
    b2bClientSelect.innerHTML =
      '<option value="">Error loading clients</option>';
  }
}

const handleB2bClientSelection = (event) => {
  const selectedOption = event.target.options[event.target.selectedIndex];
  const markup = selectedOption.dataset.markup;
  if (markup) {
    markupPercentageInput.value = parseFloat(markup).toFixed(2);
  } else {
    markupPercentageInput.value = appDefaultMarkupAgentGeneral.toFixed(2);
  }
};

const fetchAndDisplayAvailableItems = async (searchTerm = "") => {
  if (!availableItemsList || !sidebarCurrencySelect) return;
  if (!currentUser) {
    availableItemsList.innerHTML =
      "<p>Please log in to see available items.</p>";
    return;
  }

  const selectedCurrencyCode = sidebarCurrencySelect.value;
  if (!selectedCurrencyCode) {
    availableItemsList.innerHTML =
      "<p>Select a currency to view available items.</p>";
    return;
  }

  const currencyForDisplay = allAvailableCurrencies.find(
    (c) => c.code === selectedCurrencyCode
  );
  const symbolForThisFetch = currencyForDisplay
    ? currencyForDisplay.symbol
    : selectedCurrencyCode;

  availableItemsList.innerHTML = `<p>Loading items for ${symbolForThisFetch} ${selectedCurrencyCode}...</p>`;

  try {
    const url = `/api/items?currency=${selectedCurrencyCode}&searchTerm=${encodeURIComponent(
      searchTerm
    )}`;
    const fetchedItems = await fetchWithAuth(url);

    const processedForDisplay = [];
    if (fetchedItems) {
      fetchedItems.forEach((item) => {
        if (item.suppliers && item.item_rates && item.item_rates.length > 0) {
          let chosenRate =
            item.item_rates.find((r) => r.rate_name === "Standard") ||
            item.item_rates[0];
          if (chosenRate) {
            processedForDisplay.push({
              itemId: item.id,
              itemName: item.name,
              supplierName: item.suppliers.name,
              category: item.category,
              subCategory: item.sub_category, // <-- Add this
              maxOccupancy: item.max_occupancy,
              itemRateId: chosenRate.id,
              cost: chosenRate.cost_per_person || chosenRate.cost_per_unit,
              pricingModel: chosenRate.pricing_model,
              currencyCode: chosenRate.currency_code,
            });
          }
        }
      });
    }
    allAvailableLibraryItems = processedForDisplay;

    availableItemsList.innerHTML = "";
    if (processedForDisplay.length > 0) {
      processedForDisplay.forEach((itemData) => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "draggable-item";
        itemDiv.draggable = true;

        const displayText = `${itemData.supplierName} - ${itemData.itemName}`;
        itemDiv.dataset.displayText = displayText;
        itemDiv.dataset.itemId = itemData.itemId;
        itemDiv.dataset.itemRateId = itemData.itemRateId;
        itemDiv.dataset.itemType = itemData.category || "other";
        itemDiv.dataset.price = (itemData.cost || "0").toString();
        itemDiv.dataset.pricingModel = itemData.pricingModel || "per_person";
        itemDiv.dataset.maxOccupancy = itemData.maxOccupancy || "0";
        // THIS IS THE CRITICAL ADDITION
        itemDiv.dataset.subCategory = itemData.subCategory || "";

        let priceSuffix =
          itemData.pricingModel === "per_unit" ? " per unit" : " pp";
        itemDiv.innerHTML = `${displayText} <span style="color: var(--price-color); font-weight: 500;">(${symbolForThisFetch}${itemData.cost}${priceSuffix})</span>`;

        itemDiv.addEventListener("dragstart", handleDragStart);
        itemDiv.addEventListener("dragend", handleDragEnd);
        availableItemsList.appendChild(itemDiv);
      });
    } else if (itemSearchInput.value.trim()) {
      availableItemsList.innerHTML = `<p>No items match your search for ${symbolForThisFetch} ${selectedCurrencyCode}.</p>`;
    } else {
      availableItemsList.innerHTML = `<p>No items available for ${symbolForThisFetch} ${selectedCurrencyCode}.</p>`;
    }
  } catch (error) {
    console.error("Error fetching items from backend:", error);
    availableItemsList.innerHTML = `<p style="color:var(--accent-red);">${error.message}</p>`;
    allAvailableLibraryItems = [];
  }
};

// --- Main App Initialization and Auth Handling ---
const updateDashboardUI = () => {
  if (!userProfile) return;
  companyNameDisplay.textContent =
    userProfile.tour_operators?.company_name || "Tourbuilder";
  dashboardUserName.textContent = userProfile.first_name || "User";
  dashboardUserEmailDisplay.textContent = currentUser.email;

  const manageTeamAction = document.getElementById("manage-team-action");
  const container = document.getElementById("dashboard-actions-container");
  if (userProfile.role === "operator_admin" && !manageTeamAction) {
    const manageCard = document.createElement("div");
    manageCard.className = "action-card";
    manageCard.id = "manage-team-action";
    manageCard.innerHTML = `<h3>Manage Team</h3><p>Invite new consultants and manage your team.</p><button id="manage-team-btn" class="dashboard-btn">Manage</button>`;
    container.appendChild(manageCard);
  } else if (userProfile.role !== "operator_admin" && manageTeamAction) {
    manageTeamAction.remove();
  }
};

const initializeApp = () => {
  console.log("--- Tourbuilder App Initializing ---");
  if (!supabase) return;

  attachStaticListeners();
  renderInitialRegisterOptions();

  supabase.auth.onAuthStateChange(async (event, session) => {
    console.log(`Auth state changed. Event: ${event}`);

    const previousUserId = currentUser?.id;
    const newUserId = session?.user?.id;

    if (event === "INITIAL_SESSION" || previousUserId !== newUserId) {
      showLoadingSpinner("Processing authentication...");
      currentUser = session?.user || null;
      activeSession = session; //

      try {
        if (currentUser) {
          // Fetch initial data sequentially to prevent server race conditions on refresh.
          const profileData = await fetchWithAuth("/api/profile");
          const initialData = await fetchWithAuth("/api/initial-data");

          userProfile = profileData;
          allB2bClients = initialData.b2bClients || [];
          allAvailableCurrencies = initialData.currencies || [];

          if (!userProfile) throw new Error("Could not fetch user profile.");

          updateAuthUI();

          // This is the key logic for persisting the view
          const lastViewedItineraryId =
            localStorage.getItem("activeItineraryId");

          if (lastViewedItineraryId) {
            // If an itinerary was being viewed, load it directly
            await loadItinerary(lastViewedItineraryId);
          } else {
            // Otherwise, show the default logged-in page (the dashboard)
            showPage(dashboardPage);
          }

          if (!dashboardListenersAttached) attachDashboardListeners();
        } else {
          // User is logged out
          userProfile = null;
          localStorage.removeItem("activeItineraryId"); // Clear on logout
          showPage(authPage);
          renderInitialRegisterOptions();
          dashboardListenersAttached = false;
          builderListenersAttached = false;
        }
      } catch (error) {
        console.error("Error during auth state change:", error);
        await handleLogout();
      } finally {
        hideLoadingSpinner();
      }
    }
  });
};

const attachStaticListeners = () => {
  loginForm.addEventListener("submit", handleLogin);
  dashboardLogoutBtn.addEventListener("click", handleLogout);
  logoutBtn.addEventListener("click", handleLogout);
  pendingLogoutBtn.addEventListener("click", handleLogout);
  authTabs?.querySelectorAll(".tab-button").forEach((button) => {
    button.addEventListener("click", handleAuthTabSwitch);
  });
};

const attachDashboardListeners = () => {
  if (dashboardListenersAttached) return;
  dashboardCreateNewBtn.addEventListener("click", handleShowCreateModal);
  backToDashboardBtn.addEventListener("click", () => showPage(dashboardPage));
  dashboardSearchBtn.addEventListener("click", handleSearchItineraries);
  const debouncedSearch = debounce(handleSearchItineraries, 300);
  dashboardSearchInput.addEventListener("input", debouncedSearch);
  dashboardListenersAttached = true;
  console.log("Dashboard listeners attached.");
  if (!builderListenersAttached) attachBuilderListeners();
};

const attachBuilderListeners = () => {
  if (builderListenersAttached) return;
  addDayButton.addEventListener("click", handleAddDayClick);
  undoButton.addEventListener("click", handleUndoClick);
  viewPrintBtn.addEventListener("click", handleViewPrint);
  exportDocBtn.addEventListener("click", handleExportDoc);
  exportPdfBtn.addEventListener("click", handleExportPdf);
  editItineraryDetailsBtn.addEventListener("click", handleShowEditModal);
  saveAndCloseItineraryBtn.addEventListener(
    "click",
    handleSaveAndCloseItinerary
  );
  numPeopleInput.addEventListener("change", handleNumPeopleChange);
  daysContainer.addEventListener("dragover", handleDragOver);
  daysContainer.addEventListener("dragenter", handleDragEnter);
  daysContainer.addEventListener("dragleave", handleDragLeave);
  daysContainer.addEventListener("drop", handleDrop);
  daysContainer.addEventListener("change", handleDaysContainerChange);
  daysContainer.addEventListener("dblclick", handleDoubleClick);
  daysContainer.addEventListener("click", handleDaysContainerClick);
  displayStartDateInput.addEventListener("change", handleMainDateChange);
  displayEndDateInput.addEventListener("change", handleMainDateChange);
  closeModalBtn.addEventListener("click", handleCloseModal);
  cancelModalBtn.addEventListener("click", handleCloseModal);
  newItineraryModal.addEventListener("click", (e) => {
    if (e.target === newItineraryModal) handleCloseModal();
  });
  newItineraryForm.addEventListener("submit", handleCreateItinerary);
  numAdultsModalInput.addEventListener("input", handlePaxNumChangeModal);
  numChildrenModalInput.addEventListener("input", handlePaxNumChangeModal);
  itemSearchInput.addEventListener(
    "input",
    debounce(() => fetchAndDisplayAvailableItems(itemSearchInput.value), 300)
  );
  clientTypeModalInput.addEventListener(
    "change",
    handleClientTypeChangeInModal
  );
  itineraryCurrencyInput.addEventListener("change", () => {});
  b2bClientSelect.addEventListener("change", handleB2bClientSelection);
  statusSelector.addEventListener("change", handleStatusChange); // <-- ADD THIS LINE
  // ADD THESE TWO LINES
  populateSidebarCurrencyDropdown();
  sidebarCurrencySelect.addEventListener("change", () =>
    fetchAndDisplayAvailableItems(itemSearchInput.value)
  );
  // ADD THESE NEW LISTENERS
  descriptionEditorModal
    .querySelector(".close-modal-btn")
    .addEventListener("click", () => closeModal(descriptionEditorModal));
  descriptionEditorModal
    .querySelector(".cancel-modal-btn")
    .addEventListener("click", () => closeModal(descriptionEditorModal));
  descriptionEditorForm.addEventListener("submit", handleSaveDescription);

  descriptionEditorForm.addEventListener("submit", handleSaveDescription);

  // ADD THESE NEW LISTENERS FOR THE SERVICE CONFIG MODAL
  serviceConfigModal
    .querySelector(".close-modal-btn")
    .addEventListener("click", () => closeModal(serviceConfigModal));
  serviceConfigModal
    .querySelector(".cancel-modal-btn")
    .addEventListener("click", () => closeModal(serviceConfigModal));
  serviceEndDaySelect.addEventListener("change", generateServiceDayRows);
  serviceConfigForm.addEventListener("submit", handleConfirmService);

  // ADD THESE TWO LINES FOR THE MODAL DATE PICKERS
  travelStartDateInput.addEventListener("change", handleModalDateChange);
  travelEndDateInput.addEventListener("change", handleModalDateChange);

  builderListenersAttached = true;
  console.log("Builder listeners attached.");
};

document.addEventListener("DOMContentLoaded", initializeApp);
