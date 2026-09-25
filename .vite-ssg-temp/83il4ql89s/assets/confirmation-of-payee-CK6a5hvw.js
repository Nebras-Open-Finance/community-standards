const OUTCOMES = [
  {
    key: "yes",
    label: "Yes match",
    indicator: "ConfirmationOfPayee.Yes",
    returnsName: true,
    guidance: "Request the name exactly as the account holder is known to you. The API Hub returns ConfirmationOfPayee.Yes."
  },
  {
    key: "partial",
    label: "Partial match",
    indicator: "ConfirmationOfPayee.Partial",
    returnsName: true,
    guidance: "Request a name that is close but not exact — e.g. a missing middle name or a minor spelling variation. The API Hub returns ConfirmationOfPayee.Partial."
  },
  {
    key: "no",
    label: "No match",
    indicator: "ConfirmationOfPayee.No",
    returnsName: true,
    guidance: "Request a name that does not match the account holder. The API Hub returns ConfirmationOfPayee.No."
  },
  {
    key: "not-found",
    label: "Account not found",
    indicator: "",
    returnsName: false,
    guidance: "Request against an IBAN that is not recognised (or that is barred, or whose customer has opted out of CoP). Your cop-query returns HTTP 200 with an empty data object and the TPP-facing call returns HTTP 204 with no body."
  }
];
const SEGMENTS = [
  { key: "Retail", nameType: "personal" },
  { key: "SME", nameType: "business" },
  { key: "Corporate", nameType: "business" }
];
const confirmationOfPayeeArea = {
  kind: "cop",
  key: "confirmation-of-payee",
  label: "Confirmation of Payee",
  apiName: "Confirmation of Payee",
  role: "lfi",
  certType: "LFI Functional Certification Evidence",
  ozoneEndpoint: { method: "POST", path: "/customers/action/cop-query" },
  tppEndpoints: [
    { method: "POST", path: "/confirmation", title: "Confirm the payee name against the account" },
    { method: "POST", path: "/discovery", title: "Discover the LFI that will confirm the payee" }
  ],
  baseUrlTemplate: "https://rs1.{LFICODE}.apihub.openfinance.ae/open-finance/confirmation-of-payee/{VERSION}",
  segments: SEGMENTS,
  outcomes: OUTCOMES,
  requiresTestingTool: true,
  captureResponseName: true,
  sandboxEvidenceHref: "/tech/lfi-api-hub/getting-started/"
};
export {
  confirmationOfPayeeArea as c
};
