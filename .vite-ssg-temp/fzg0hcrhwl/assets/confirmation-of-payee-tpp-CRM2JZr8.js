const OUTCOMES = [
  {
    key: "yes",
    label: "Full match",
    indicator: "ConfirmationOfPayee.Yes",
    returnsName: true,
    guidance: "Submit the payee name exactly as the Model Bank account holder is known. The API Hub returns ConfirmationOfPayee.Yes."
  },
  {
    key: "no",
    label: "No match",
    indicator: "ConfirmationOfPayee.No",
    returnsName: true,
    guidance: "Submit a payee name that does not match the Model Bank account holder. The API Hub returns ConfirmationOfPayee.No."
  }
];
const SEGMENTS = [
  { key: "Retail", nameType: "personal" },
  { key: "SME", nameType: "business" },
  { key: "Corporate", nameType: "business" }
];
const confirmationOfPayeeTppArea = {
  kind: "cop",
  key: "confirmation-of-payee",
  label: "Confirmation of Payee",
  apiName: "Confirmation of Payee",
  role: "tpp",
  certType: "TPP Functional Certification Evidence",
  // The TPP does not implement cop-query; kept for type completeness only.
  ozoneEndpoint: { method: "POST", path: "/customers/action/cop-query" },
  tppEndpoints: [
    { method: "POST", path: "/confirmation", title: "Confirm the payee name against the account" },
    { method: "POST", path: "/discovery", title: "Discover the LFI that will confirm the payee" }
  ],
  // Sandbox Model Bank resource server — {VERSION} is substituted by the portal.
  baseUrlTemplate: "https://rs1.altareq1.sandbox.apihub.openfinance.ae/open-finance/confirmation-of-payee/{VERSION}",
  segments: SEGMENTS,
  outcomes: OUTCOMES,
  requiresTestingTool: false,
  captureResponseName: false,
  sandboxEvidenceHref: "/tech/tpp-standards/sandbox/model-bank",
  wellKnownUrl: "https://auth1.altareq1.sandbox.apihub.openfinance.ae/.well-known/openid-configuration"
};
export {
  confirmationOfPayeeTppArea as c
};
