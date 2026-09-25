import { b as bankDataSharingEndpoints } from "./bank-data-sharing-BzvFCI2T.js";
const TPP_RS_BASE = "https://rs1.altareq1.sandbox.apihub.openfinance.ae/open-finance/account-information/{VERSION}";
const CONSENT_DOC = "/tech/tpp-standards/v2.1/consent/open-api";
const tppConsentOps = [
  {
    slug: "get-consent-by-id",
    title: "Get consent by ConsentId",
    method: "GET",
    path: "/account-access-consents/{ConsentId}",
    baseUrlTemplate: TPP_RS_BASE,
    scenario: "Retrieve a Bank Data Sharing consent you staged by its ConsentId and confirm its status.",
    docHref: `${CONSENT_DOC}/account-access-consents-ConsentId`
  },
  {
    slug: "revoke-consent",
    title: "Revoke consent",
    method: "PATCH",
    path: "/account-access-consents/{ConsentId}",
    baseUrlTemplate: TPP_RS_BASE,
    scenario: "Revoke a consent by patching its status to Revoked (RevokedBy TPP.InitiatedByUser).",
    docHref: `${CONSENT_DOC}/patch-account-access-consents-ConsentId`
  }
];
const bankDataSharingTppArea = {
  key: "bank-data-sharing",
  label: "Bank Data Sharing",
  apiName: "Account Information",
  certType: "TPP Functional Certification Evidence",
  // Sandbox Model Bank resource server — {VERSION} is substituted by the portal.
  tppBaseUrlTemplate: "https://rs1.altareq1.sandbox.apihub.openfinance.ae/open-finance/account-information/{VERSION}",
  segments: ["Retail", "SME", "Corporate"],
  sandboxEvidenceHref: "/tech/tpp-standards/sandbox/model-bank",
  wellKnownUrl: "https://auth1.altareq1.sandbox.apihub.openfinance.ae/.well-known/openid-configuration",
  endpoints: bankDataSharingEndpoints,
  consentOps: tppConsentOps,
  rarEditor: {
    spec: "/openapi/v2.1/standards/uae-authorization-endpoints-openapi.yaml",
    schemaName: "AEBankDataSharingRichAuthorizationRequestsV21.AEBankDataSharingAuthorizationDetailsProperties",
    // A single authorization_details entry the TPP edits to match its own
    // proposition. Mirrors the seed on the Bank Data Sharing user-journeys
    // editor so both stay recognisable.
    initialData: {
      type: "urn:openfinanceuae:account-access-consent:v2.1",
      consent: {
        ConsentId: "b8f42378-10ac-46a1-8d20-4e020484216d",
        Permissions: [
          "ReadAccountsBasic",
          "ReadAccountsDetail",
          "ReadBalances",
          "ReadBeneficiariesBasic",
          "ReadBeneficiariesDetail",
          "ReadTransactionsBasic",
          "ReadTransactionsDetail",
          "ReadProduct",
          "ReadScheduledPaymentsBasic",
          "ReadScheduledPaymentsDetail",
          "ReadDirectDebits",
          "ReadStandingOrdersBasic",
          "ReadStandingOrdersDetail",
          "ReadStatements",
          "ReadPartyUser",
          "ReadPartyUserIdentity",
          "ReadParty",
          "ReadProductFinanceRates"
        ],
        ExpirationDateTime: "2027-06-05T23:59:59.000Z",
        OpenFinanceBilling: {
          UserType: "Retail",
          Purpose: "AccountAggregation"
        },
        OnBehalfOf: {
          TradingName: "Nebras",
          LegalName: "Nebras Open Finance Ltd",
          IdentifierType: "Other",
          Identifier: "Identifier"
        },
        BaseConsentId: "b9f42378-10ac-46a1-8d20-4e020484216d",
        AccountType: ["Retail"],
        AccountSubType: ["CurrentAccount", "Savings"],
        FromDate: "2025-03-01",
        ToDate: "2025-03-31"
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
  bankDataSharingTppArea as b
};
