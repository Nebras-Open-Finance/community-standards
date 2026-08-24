import { o as ozoneConnectEndpoints } from "../main.mjs";
const CONSENT_MANAGER_BASE = "https://cm.{LFICODE}.apihub.openfinance.ae";
const HEIMDALL_BASE = "https://hh.{LFICODE}.apihub.openfinance.ae";
const CM_DOC = "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api";
const HH_DOC = "/tech/lfi-api-hub/v2.1/api-hub/headless-heimdall/open-api";
const lfiConsentOps = [
  {
    slug: "get-consent-by-id",
    title: "Get consent by ConsentId",
    method: "GET",
    path: "/consents/{consentId}",
    baseUrlTemplate: CONSENT_MANAGER_BASE,
    scenario: "Retrieve a single consent from the API Hub Consent Manager by its consentId and confirm its status.",
    docHref: `${CM_DOC}/consents-consentId`
  },
  {
    slug: "get-consents-by-psu",
    title: "Get consents by end user",
    method: "GET",
    path: "/psu/{userId}/consents",
    baseUrlTemplate: CONSENT_MANAGER_BASE,
    scenario: "Retrieve every consent associated with an end user from the Consent Manager, matched on the psuIdentifiers.userId.",
    docHref: `${CM_DOC}/psu-userId-consents`
  },
  {
    slug: "revoke-consent",
    title: "Revoke consent",
    method: "POST",
    path: "/consents/{consentId}/action/revoke",
    baseUrlTemplate: CONSENT_MANAGER_BASE,
    scenario: "Revoke a consent via the Consent Manager revoke action (revokedBy LFI or LFI.InitiatedByUser) — this also revokes the associated access and refresh tokens.",
    docHref: `${CM_DOC}/consents-consentId-action-revoke`
  },
  {
    slug: "suspend-consent",
    title: "Suspend consent",
    method: "PATCH",
    path: "/consents/{consentId}",
    baseUrlTemplate: CONSENT_MANAGER_BASE,
    scenario: "Suspend a consent by patching its status to Suspended on the Consent Manager (pending further enquiries).",
    docHref: `${CM_DOC}/patch-consents-consentId`
  },
  {
    slug: "cancelled-authorization",
    title: "Cancelled authorization (do-fail)",
    method: "POST",
    path: "/auth/{interactionId}/doFail",
    baseUrlTemplate: HEIMDALL_BASE,
    scenario: "End an authorization interaction with a failure on Headless Heimdall when the customer cancels — returning the error and error_description the API Hub relays back to the TPP.",
    docHref: `${HH_DOC}/auth-interactionId-doFail`,
    captureErrorDetails: true
  }
];
const ANNOTATIONS = {
  "/accounts": { permissions: ["ReadAccountsBasic", "ReadAccountsDetail"], tppPath: "/accounts" },
  "/accounts/{AccountId}": { permissions: ["ReadAccountsBasic", "ReadAccountsDetail"], tppPath: "/accounts/{AccountId}" },
  "/accounts/{AccountId}/balances": { permissions: ["ReadBalances"], tppPath: "/accounts/{AccountId}/balances" },
  "/accounts/{AccountId}/beneficiaries": { permissions: ["ReadBeneficiariesBasic", "ReadBeneficiariesDetail"], tppPath: "/accounts/{AccountId}/beneficiaries" },
  "/customer": { permissions: ["ReadPartyUser", "ReadPartyUserIdentity"], tppPath: "/parties" },
  "/accounts/{AccountId}/customer": { permissions: ["ReadParty"], tppPath: "/accounts/{AccountId}/parties" },
  "/accounts/{AccountId}/direct-debits": { permissions: ["ReadDirectDebits"], tppPath: "/accounts/{AccountId}/direct-debits" },
  "/accounts/{AccountId}/products": { permissions: ["ReadProduct", "ReadProductFinanceRates"] },
  "/accounts/{AccountId}/scheduled-payments": { permissions: ["ReadScheduledPaymentsBasic", "ReadScheduledPaymentsDetail"], tppPath: "/accounts/{AccountId}/scheduled-payments" },
  "/accounts/{AccountId}/standing-orders": { permissions: ["ReadStandingOrdersBasic", "ReadStandingOrdersDetail"], tppPath: "/accounts/{AccountId}/standing-orders" },
  "/accounts/{AccountId}/statements": { permissions: ["ReadStatements"], tppPath: "/accounts/{AccountId}/statements" },
  "/accounts/{AccountId}/transactions": { permissions: ["ReadTransactionsBasic", "ReadTransactionsDetail"], tppPath: "/accounts/{AccountId}/transactions" }
};
const bankDataSharingEndpoints = ozoneConnectEndpoints.filter((e) => e.sectionSlug === "data-sharing" && e.version === "v2.1").map((e) => {
  const ann = ANNOTATIONS[e.path];
  if (!ann) {
    throw new Error(
      `[functional-certification] Bank Data Sharing endpoint ${e.path} has no permission annotation. Add it to ANNOTATIONS in src/data/functional-certification/bank-data-sharing.ts.`
    );
  }
  return {
    slug: e.slug,
    method: e.method,
    ozonePath: e.path,
    title: e.title,
    permissions: ann.permissions,
    ...ann.tppPath ? { tppPath: ann.tppPath } : {}
  };
});
const bankDataSharingArea = {
  key: "bank-data-sharing",
  label: "Bank Data Sharing",
  apiName: "Account Information",
  certType: "LFI Functional Certification Evidence",
  tppBaseUrlTemplate: "https://rs1.{LFICODE}.apihub.openfinance.ae/open-finance/account-information/{VERSION}",
  segments: ["Retail", "SME", "Corporate"],
  sandboxEvidenceHref: "/tech/lfi-api-hub/getting-started/",
  endpoints: bankDataSharingEndpoints,
  consentOps: lfiConsentOps
};
export {
  bankDataSharingArea as a,
  bankDataSharingEndpoints as b
};
