const FAMILY_KEYS = [
  "account-information",
  "payment",
  "confirmation",
  "product",
  "atm",
  "insurance"
];
const FAMILY_URL_PREFIX = {
  "account-information": "account-information",
  "payment": "payment",
  "confirmation": "confirmation-of-payee",
  "product": "product",
  "atm": "atm",
  "insurance": "insurance"
};
const LIVE_TPP_DAYS_WINDOW = 30;
const DIRECTORY_PARTICIPANTS_URL = "https://data.directory.openfinance.ae/participants";
const TRUST_FRAMEWORK_PROXY_URL = "/api/trust-framework.json";
const PLACEHOLDER_LOGO_URL = "https://data.directory.openfinance.ae/logos/placeholder-logo.png";
export {
  DIRECTORY_PARTICIPANTS_URL as D,
  FAMILY_KEYS as F,
  LIVE_TPP_DAYS_WINDOW as L,
  PLACEHOLDER_LOGO_URL as P,
  TRUST_FRAMEWORK_PROXY_URL as T,
  FAMILY_URL_PREFIX as a
};
