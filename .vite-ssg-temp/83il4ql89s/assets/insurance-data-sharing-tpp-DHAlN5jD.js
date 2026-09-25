import { i as insuranceDataSharingEndpoints } from "./insurance-data-sharing-BL4Oizff.js";
const TPP_RS_BASE = "https://rs1.altareq2.sandbox.apihub.openfinance.ae/open-finance/insurance/{VERSION}";
const CONSENT_DOC = "/tech/tpp-standards/v2.1/consent/open-api";
const tppConsentOps = [
  {
    slug: "get-consent-by-id",
    title: "Get consent by ConsentId",
    method: "GET",
    path: "/insurance-consents/{ConsentId}",
    baseUrlTemplate: TPP_RS_BASE,
    scenario: "Retrieve an Insurance Data Sharing consent you staged by its ConsentId and confirm its status.",
    docHref: `${CONSENT_DOC}/insurance-consents-ConsentId`
  },
  {
    slug: "revoke-consent",
    title: "Revoke consent",
    method: "PATCH",
    path: "/insurance-consents/{ConsentId}",
    baseUrlTemplate: TPP_RS_BASE,
    scenario: "Revoke a consent by patching its status to Revoked (RevokedBy TPP.InitiatedByUser).",
    docHref: `${CONSENT_DOC}/patch-insurance-consents-ConsentId`
  }
];
const insuranceDataSharingTppArea = {
  key: "insurance-data-sharing",
  label: "Insurance Data Sharing",
  apiName: "Insurance",
  certType: "TPP Functional Certification Evidence",
  // Sandbox Model Insurer resource server — {VERSION} is substituted by the portal.
  tppBaseUrlTemplate: "https://rs1.altareq2.sandbox.apihub.openfinance.ae/open-finance/insurance/{VERSION}",
  // Insurance has no customer segmentation — omit segments.
  sandboxEvidenceHref: "/tech/tpp-standards/sandbox/model-insurer",
  sandboxName: "AlTareq Model Insurer",
  wellKnownUrl: "https://auth1.altareq2.sandbox.apihub.openfinance.ae/.well-known/openid-configuration",
  endpoints: insuranceDataSharingEndpoints,
  consentOps: tppConsentOps,
  rarEditor: {
    spec: "/openapi/v2.1/standards/uae-authorization-endpoints-openapi.yaml",
    schemaName: "AEInsuranceDataSharingRichAuthorizationRequestsV21.AEInsuranceDataSharingAuthorizationDetailsProperties",
    // A single authorization_details entry the TPP edits to match its own
    // proposition. Insurance permissions are grouped per InsuranceType; the seed
    // requests ReadInsurancePolicies for a couple of sectors (premium is out of
    // scope for this area). Mirrors the seed on the Insurance Data Sharing
    // user-journeys editor so both stay recognisable.
    initialData: {
      type: "urn:openfinanceuae:insurance-consent:v2.1",
      consent: {
        ConsentId: "c1a42378-10ac-46a1-8d20-4e020484216d",
        BaseConsentId: "c2a42378-10ac-46a1-8d20-4e020484216d",
        Permissions: [
          {
            InsuranceType: "Motor",
            Permissions: ["ReadInsurancePolicies"]
          },
          {
            InsuranceType: "Health",
            Permissions: ["ReadInsurancePolicies"]
          }
        ],
        ExpirationDateTime: "2027-06-05T23:59:59.000Z",
        OpenFinanceBilling: {
          Purpose: "QuoteComparison"
        },
        OnBehalfOf: {
          TradingName: "Nebras",
          LegalName: "Nebras Open Finance Ltd",
          IdentifierType: "Other",
          Identifier: "Identifier"
        }
      },
      subscription: {
        Webhook: {
          Url: "https://webhook.site/mock-event-receiver",
          IsActive: false
        }
      }
    }
  }
};
export {
  insuranceDataSharingTppArea as i
};
