const insurancePermissionDescriptions = {
  ReadInsurancePolicies: "Your policy number, type, status, start and end dates, sums insured, and coverage.",
  ReadCustomerBasic: "Your name, contact details, and the people named on the policy.",
  ReadCustomerDetail: "Your name, date of birth, Emirates ID, nationality, address, contact details, and people named on the policy.",
  ReadInsuranceProduct: "The insurance product underwriting your policy — cover type, features, add-ons, terms, and exclusions.",
  ReadInsurancePremium: "Provides the details of the premium paid or being paid, along with confirmation of future renewal premiums when applicable. In some cases, your insurer may protect this information by sending it in a locked format and issue you a code (via SMS or email). You'll need to enter this code within our service so that we can show you premium details.",
  ReadCustomerPaymentDetails: "The bank account or card used to pay your premium, plus payment frequency.",
  ReadCustomerClaims: "Claims raised on your policy — status, dates, amounts, and the events that triggered them."
};
const insurancePermissionGroups = [
  { permission: "ReadInsurancePolicies", label: "Policy details" },
  { permission: "ReadCustomerBasic", label: "Basic customer details" },
  { permission: "ReadCustomerDetail", label: "Detailed customer details" },
  { permission: "ReadInsuranceProduct", label: "Product information" },
  { permission: "ReadInsurancePremium", label: "Premium details" },
  { permission: "ReadCustomerPaymentDetails", label: "Payment details" },
  { permission: "ReadCustomerClaims", label: "Claim details" }
];
const insuranceTypeLabels = {
  Employment: "Employment Insurance",
  Health: "Health Insurance",
  Home: "Home Insurance",
  Life: "Life Insurance",
  Motor: "Motor Insurance",
  Renters: "Renters Insurance",
  Travel: "Travel Insurance"
};
const ACTIVE_STATUSES = [
  "New",
  "Renewed",
  "InForce",
  "PaidUp"
];
const INACTIVE_STATUSES = [
  "Expired",
  "Lapsed",
  "Cancelled",
  "Surrendered",
  "Converted",
  "DeathClaim",
  "RiderClaim"
];
const ALL_STATUSES = [
  ...ACTIVE_STATUSES,
  ...INACTIVE_STATUSES
];
const STATUS_LABELS = {
  New: "New",
  Renewed: "Renewed",
  InForce: "In Force",
  PaidUp: "Paid Up",
  Expired: "Expired",
  Lapsed: "Lapsed",
  Cancelled: "Cancelled",
  Surrendered: "Surrendered",
  Converted: "Converted",
  DeathClaim: "Death Claim",
  RiderClaim: "Rider Claim"
};
function insurancePolicyStatusGroup(status) {
  return ACTIVE_STATUSES.includes(status) ? "active" : "inactive";
}
export {
  ALL_STATUSES as A,
  STATUS_LABELS as S,
  insurancePermissionGroups as a,
  insurancePermissionDescriptions as b,
  insurancePolicyStatusGroup as c,
  insuranceTypeLabels as i
};
