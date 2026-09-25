const AREAS = {
  dataSharing: "Data Sharing",
  serviceInitiation: "Service Initiation",
  confirmationOfPayee: "Confirmation of Payee",
  consent: "Consent",
  tokens: "Tokens & Authorization",
  productsLeads: "Products & Leads",
  atms: "ATMs",
  sandbox: "Sandbox"
};
const API_HUB_RELEASES = [
  // ─────────────────────────────────────────────────────────────────────────
  // 2026.22.0 — 6 July 2026
  // ─────────────────────────────────────────────────────────────────────────
  {
    release: "2026.22.0",
    effectiveDate: "2026-07-06",
    number: 1,
    title: "Mandatory paymentId field restored on Consent Manager GET /payment-log responses",
    summary: "GET /payment-log responses now consistently return the mandatory paymentId field defined by the API contract.",
    description: "Added the mandatory paymentId field to Consent Manager GET /payment-log responses.\n\nPreviously, the paymentId field was omitted from GET /payment-log responses even though it is defined as mandatory in the API contract, which could cause response deserialization failures in consuming applications. paymentId is now returned consistently in accordance with the specification.",
    impact: "Applications consuming GET /payment-log can once again rely on paymentId being present, and may remove any workaround introduced for the missing field. Applies to Consent Manager v6, v7, and v8.",
    audience: "Both",
    areas: [AREAS.consent, AREAS.serviceInitiation],
    sections: [
      { label: "Consent Manager", path: "api-hub/consent-manager/", target: "lfi" }
    ],
    endpoints: [
      { label: "GET /payment-log", path: "api-hub/consent-manager/open-api/payment-log", target: "lfi" }
    ]
  },
  {
    release: "2026.22.0",
    effectiveDate: "2026-07-06",
    number: 2,
    title: "Consent revocation in non-revocable states now returns HTTP 400",
    summary: "Revoking a consent that cannot be revoked in its current state now returns an HTTP 400 business rule error instead of a no-op HTTP 204.",
    description: "Improved validation and error handling for consent revocation requests in the Consent Manager.\n\nPreviously, a revocation request for a consent in a non-revocable state could return a successful HTTP 204 even though no action was performed and the consent status was unchanged. Such requests now return an HTTP 400 with a business rule validation error, giving API consumers clearer and more accurate feedback.",
    impact: "Consumers that treated HTTP 204 as confirmation of revocation MUST now handle an HTTP 400 business rule error when a consent cannot be revoked in its current state. Applies to Consent Manager v6, v7, and v8.",
    audience: "Both",
    areas: [AREAS.consent],
    sections: [
      { label: "Consent Manager", path: "api-hub/consent-manager/", target: "lfi" }
    ],
    endpoints: [
      { label: "POST /consents/{ConsentId}/action/revoke", path: "api-hub/consent-manager/open-api/consents-consentId-action-revoke", target: "lfi" },
      { label: "POST /consent-groups/{ConsentGroupId}/consents/action/revoke", path: "api-hub/consent-manager/open-api/consent-groups-consentGroupId-consents-action-revoke", target: "lfi" }
    ]
  },
  {
    release: "2026.22.0",
    effectiveDate: "2026-07-06",
    number: 3,
    title: "Resolved HTTP 500 on PATCH /consents in Consent Manager v2025.47",
    summary: "Valid PATCH /consents requests on Consent Manager version v2025.47 no longer fail with an HTTP 500 schema validation error.",
    description: "Resolved a schema validation issue affecting PATCH /consents in Consent Manager API version v2025.47.\n\nPreviously, valid PATCH /consents requests could fail with an HTTP 500 error due to a fault in the endpoint schema validation, while the same requests succeeded on earlier API versions. The validation logic has been fixed so consent update requests are processed successfully on v2025.47.",
    impact: "Consent update requests on Consent Manager v2025.47 are now processed successfully. No consumer changes are required. Applies to Consent Manager v6, v7, and v8.",
    audience: "Both",
    areas: [AREAS.consent],
    sections: [
      { label: "Consent Manager", path: "api-hub/consent-manager/", target: "lfi" }
    ],
    endpoints: [
      { label: "PATCH /consents/{ConsentId}", path: "api-hub/consent-manager/open-api/patch-consents-consentId", target: "lfi" }
    ]
  },
  {
    release: "2026.22.0",
    effectiveDate: "2026-07-06",
    number: 4,
    title: "OAuth token endpoint error responses aligned with RFC 6749",
    summary: "error_description values from the token endpoint now contain only RFC 6749-permitted characters, fixing FAPI conformance failures.",
    description: "Updated the OAuth token endpoint error responses to comply with RFC 6749 error formatting requirements.\n\nPreviously, error_description values could contain unsupported characters such as double quotes, causing FAPI conformance tests to fail even though the underlying error response was correct. error_description values now contain only the characters permitted by RFC 6749 Section 5.2, improving standards compliance and FAPI conformance.",
    impact: "TPPs and conformance suites parsing token endpoint errors receive RFC 6749-compliant error_description values. No TPP changes are required. Applies to the Sandbox and TPP Interface across v1.2, v2.0, and v2.1.",
    audience: "TPP",
    areas: [AREAS.tokens],
    sections: [
      { label: "Tokens & Assertions", path: "security/tokens", versioned: false }
    ],
    endpoints: [
      { label: "POST /token", path: "security/tokens/open-api/token", versioned: false }
    ]
  },
  // ─────────────────────────────────────────────────────────────────────────
  // 2026.19.0 — 9 June 2026 (Production; Pre-Production 2 June 2026)
  // ─────────────────────────────────────────────────────────────────────────
  {
    release: "2026.19.0",
    effectiveDate: "2026-06-09",
    number: 1,
    title: "Mandatory x-fapi-customer-ip-address header on Product API endpoints",
    summary: "GET /products and POST /leads now reject requests that omit the x-fapi-customer-ip-address header.",
    description: "The API Hub now enforces mandatory validation of the x-fapi-customer-ip-address header on the Product API endpoints.\n\nRequests to GET /products and POST /leads that omit this header now receive an HTTP 400 response, bringing the Hub into line with the v2.1 specification.",
    impact: "TPPs calling GET /products or POST /leads MUST send the x-fapi-customer-ip-address header. Calls that previously omitted it will be rejected with HTTP 400. Applies to the Sandbox and TPP Interface, v2.1.",
    audience: "TPP",
    areas: [AREAS.productsLeads],
    sections: [
      { label: "Products & Leads", path: "banking/products-leads/" }
    ],
    endpoints: [
      { label: "GET /products", path: "banking/products-leads/open-api/products" },
      { label: "POST /leads", path: "banking/products-leads/open-api/leads" }
    ]
  },
  {
    release: "2026.19.0",
    effectiveDate: "2026-06-09",
    number: 2,
    title: "Corrected Model Bank transaction payloads for GET /transactions",
    summary: "The Sandbox Model Bank no longer returns invalid null-valued CreditorAccount fields on transaction responses.",
    description: "Corrected the Sandbox Model Bank transaction response payloads for GET /accounts/{AccountId}/transactions to align with the v2.1 API specification.\n\nInvalid null-valued CreditorAccount fields have been removed. CreditorAccount is now returned only when valid values are available.",
    impact: "TPPs testing Account Information flows in the Sandbox receive spec-compliant transaction payloads. Applies to the Sandbox, v2.1. Production behaviour is unchanged.",
    audience: "TPP",
    areas: [AREAS.dataSharing, AREAS.sandbox],
    sections: [
      { label: "Bank Data Sharing", path: "banking/data-sharing" }
    ],
    endpoints: [
      { label: "GET /accounts/{AccountId}/transactions", path: "banking/data-sharing/open-api/accounts-AccountId-transactions" }
    ]
  },
  {
    release: "2026.19.0",
    effectiveDate: "2026-06-09",
    number: 3,
    title: "Resolved 500 error for corporate Confirmation of Payee requests",
    summary: "Corporate Confirmation of Payee requests where organisationClaims.name lacks a fullName value now return HTTP 200.",
    description: "Resolved a 500 internal server error affecting corporate Confirmation of Payee requests where organisationClaims.name lacked a corresponding fullName value.\n\nCorporate Confirmation of Payee flows now return the expected HTTP 200 status.",
    impact: "TPPs running corporate Confirmation of Payee checks are no longer affected by the 500 error. Applies to the Sandbox and TPP Interface across v1.2, v2.0, and v2.1.",
    audience: "TPP",
    areas: [AREAS.confirmationOfPayee],
    sections: [
      { label: "Confirmation of Payee", path: "banking/confirmation-of-payee" }
    ],
    endpoints: [
      { label: "POST /customers/action/cop-query", path: "banking/confirmation-of-payee/open-api/confirmation" }
    ]
  },
  {
    release: "2026.19.0",
    effectiveDate: "2026-06-09",
    number: 4,
    title: "60-second authorisation code expiry for FAPI 2.0 profiles",
    summary: "Authorisation codes not exchanged within 60 seconds now return an invalid_grant error.",
    description: "Implemented 60-second authorisation code expiry enforcement for FAPI 2.0 profiles.\n\nAuthorisation codes that are not exchanged within 60 seconds now return an invalid_grant error, bringing the Hub into compliance with FAPI 2.0 security requirements.",
    impact: "TPPs MUST ensure their token exchange completes within 60 seconds of receiving the authorisation code. Applies to the Sandbox and TPP Interface across v1.2, v2.0, and v2.1.",
    audience: "TPP",
    areas: [AREAS.tokens],
    sections: [
      { label: "Tokens & Assertions", path: "security/tokens", versioned: false }
    ],
    endpoints: [
      { label: "POST /token", path: "security/tokens/open-api/token", versioned: false }
    ]
  },
  {
    release: "2026.19.0",
    effectiveDate: "2026-06-09",
    number: 5,
    title: "Meta object support added to Statements API responses",
    summary: "Statements responses now include a Meta object with TotalPages and, where available, date-range fields.",
    description: "Added Meta object support to Statements API responses.\n\nResponses now include TotalPages and, where available, FirstAvailableDateTime and LastAvailableDateTime, aligning with the v2.1 specification.",
    impact: "TPPs consuming Statements responses can rely on the Meta object for pagination and date-range information. No TPP changes are required. Applies to the Sandbox and TPP Interface across v1.2, v2.0, and v2.1.",
    audience: "TPP",
    areas: [AREAS.dataSharing],
    sections: [
      { label: "Bank Data Sharing", path: "banking/data-sharing" }
    ],
    endpoints: [
      { label: "GET /accounts/{AccountId}/statements", path: "banking/data-sharing/open-api/accounts-AccountId-statements" }
    ]
  },
  {
    release: "2026.19.0",
    effectiveDate: "2026-06-09",
    number: 6,
    title: "Resolved consent expiry status update failures",
    summary: "Duplicate key errors during consent processing no longer prevent expired consents from being updated.",
    description: "Resolved consent processing failures that affected consent expiry status updates.\n\nDuplicate key errors raised during consent processing no longer prevent expired consents from being updated to the correct status.",
    impact: "Consents now transition to expired status reliably. No TPP or LFI action is required. Applies to the Sandbox and TPP Interface across v1.2, v2.0, and v2.1.",
    audience: "Both",
    areas: [AREAS.consent],
    sections: [
      { label: "Consent — API Guide", path: "consent/api-guide" }
    ]
  },
  {
    release: "2026.19.0",
    effectiveDate: "2026-06-09",
    number: 7,
    title: "Improved Sandbox data consistency across Account Information APIs",
    summary: "Intermittent 500 errors, empty responses, and missing fields in the Sandbox Account Information APIs have been resolved.",
    description: "Improved API Hub Sandbox data consistency across the Account Information APIs.\n\nResolved intermittent 500 errors, empty response objects, missing AccountSubType values, and null DebtorAccount or CreditorAccount objects, supporting more reliable integration and UAT testing.",
    impact: "TPPs running UAT against the Sandbox Account Information APIs see more consistent and reliable responses. Applies to the Sandbox across v1.2, v2.0, and v2.1. Production behaviour is unchanged.",
    audience: "TPP",
    areas: [AREAS.dataSharing, AREAS.sandbox],
    sections: [
      { label: "Bank Data Sharing", path: "banking/data-sharing" }
    ]
  },
  {
    release: "2026.19.0",
    effectiveDate: "2026-06-09",
    number: 8,
    title: "idToken handling removed from Admin and Hub Portal flows",
    summary: "Admin Portal and Hub Portal flows no longer use idToken handling, aligning with FAPI 2.0 compliant behaviour.",
    description: "Removed idToken handling from the Admin Portal and Hub Portal flows.\n\nThe implementation has been aligned with Raidiam for FAPI 2.0 compliant behaviour.",
    impact: "Participants relying on the previous portal token handling logic may need to adjust. Applies to the Admin Portal.",
    audience: "Both",
    areas: [AREAS.tokens]
  },
  {
    release: "2026.19.0",
    effectiveDate: "2026-06-09",
    number: 9,
    title: "Resolved 500 error in Confirmation of Payee name masking",
    summary: "Confirmation of Payee requests with single-character name parts, such as initials, now return HTTP 200.",
    description: "Resolved a 500 error in the Confirmation of Payee endpoint caused by name masking logic failing on single-character name parts, such as initials.\n\nValid responses are now returned with an HTTP 200 status.",
    impact: "TPPs running Confirmation of Payee checks against names that include initials are no longer affected by the 500 error. Applies to the Sandbox and TPP Interface across v1.2, v2.0, and v2.1.",
    audience: "TPP",
    areas: [AREAS.confirmationOfPayee],
    sections: [
      { label: "Confirmation of Payee", path: "banking/confirmation-of-payee" }
    ],
    endpoints: [
      { label: "POST /customers/action/cop-query", path: "banking/confirmation-of-payee/open-api/confirmation" }
    ]
  },
  // ─────────────────────────────────────────────────────────────────────────
  // 2026.13.1 — 20 April 2026
  // ─────────────────────────────────────────────────────────────────────────
  {
    release: "2026.13.1",
    effectiveDate: "2026-04-20",
    number: 1,
    title: "Refresh token support for multi-authorization on Single Instant Payments",
    summary: "TPPs can now use the refresh token issued at initial authorization to submit a Single Instant Payment after all authorizers complete.",
    description: "Added refresh token support to the Single Instant Payment flow when used under Multi-Authorization.\n\nPreviously, the access token issued at initial authorization expired after 10 minutes. In a multi-authorization journey the final authorizer can act much later than this, so by the time the consent reached Status=Authorized the TPP no longer held a valid access token to call POST /payments. This effectively blocked Single Instant Payments from being used with multi-authorization consents.\n\nTPPs can now use the refresh token issued at initial authorization to obtain a fresh access token and submit the payment once all authorizers have completed their step.",
    impact: "TPPs intending to use Single Instant Payments under multi-authorization consents must implement refresh token handling. TPPs that only use single-authorizer SIP are unaffected.",
    audience: "TPP",
    areas: [AREAS.serviceInitiation, AREAS.tokens],
    sections: [
      { label: "Tokens & Assertions", path: "security/tokens", versioned: false },
      { label: "Single Instant Payment", path: "banking/service-initiation/domestic-payments/single-instant-payment/api-guide" },
      { label: "Multi Authorization", path: "banking/service-initiation/multi-authorization" }
    ],
    endpoints: [
      { label: "POST /token", path: "security/tokens/open-api/token", versioned: false },
      { label: "POST /payments", path: "banking/service-initiation/open-api/payments" }
    ]
  },
  {
    release: "2026.13.1",
    effectiveDate: "2026-04-20",
    number: 2,
    title: "Corrected response mapping for GET /beneficiaries",
    summary: "The response for GET /accounts/{AccountId}/beneficiaries now preserves the full AEBeneficiary payload sent by the LFI.",
    description: "Corrected the response mapping for GET /accounts/{AccountId}/beneficiaries to align with the TPP-facing specification.\n\nPreviously, fields such as CreditorAccount and AccountHolderName were dropped from the response sent to the TPP, even though the LFI returned them on its Ozone Connect endpoint. The mapping between Ozone Connect responses and TPP-facing responses has been corrected so the full AEBeneficiary payload is preserved.",
    impact: "TPPs now receive the complete AEBeneficiary record — including CreditorAccount, AccountHolderName, AccountHolderShortName, Reference, CreditorAgent, and SupplementaryData — as defined in the spec. No TPP changes are required to consume the additional fields.",
    audience: "TPP",
    areas: [AREAS.dataSharing],
    sections: [
      { label: "Bank Data Sharing", path: "banking/data-sharing" }
    ],
    endpoints: [
      { label: "GET /accounts/{AccountId}/beneficiaries", path: "banking/data-sharing/open-api/accounts-AccountId-beneficiaries" }
    ]
  },
  {
    release: "2026.13.1",
    effectiveDate: "2026-04-20",
    number: 3,
    title: "Corrected response mapping for GET /standing-orders",
    summary: "The response for GET /accounts/{AccountId}/standing-orders now preserves the full standing order payload sent by the LFI.",
    description: "Corrected the response mapping for GET /accounts/{AccountId}/standing-orders to align with the TPP-facing specification.\n\nPreviously, fields such as CreditorAccount and AccountHolderName were dropped from the response sent to the TPP, even though the LFI returned them on its Ozone Connect endpoint. The mapping between Ozone Connect responses and TPP-facing responses has been corrected so the full standing order payload is preserved.",
    impact: "TPPs now receive CreditorAccount, AccountHolderName, and the other standing order fields as defined in the spec. No TPP changes are required to consume the additional fields.",
    audience: "TPP",
    areas: [AREAS.dataSharing],
    sections: [
      { label: "Bank Data Sharing", path: "banking/data-sharing" }
    ],
    endpoints: [
      { label: "GET /accounts/{AccountId}/standing-orders", path: "banking/data-sharing/open-api/accounts-AccountId-standing-orders" }
    ]
  },
  {
    release: "2026.13.1",
    effectiveDate: "2026-04-20",
    number: 4,
    title: "Corrected Sandbox Model Bank behaviour for pre-populated Debtor Account",
    summary: "A valid pre-populated DebtorAccount is now accepted by the Sandbox Model Bank during the authorisation journey.",
    description: "Corrected Sandbox Model Bank behaviour when the TPP supplies a valid Initiation.DebtorAccount in the PAR request for a Single Instant Payment or Multi Payment consent.\n\nPreviously, the Sandbox Model Bank incorrectly rejected the consent during the authorisation journey even when the supplied DebtorAccount was a valid IBAN held by the test end user. This deviated from the Debtor Account validation rules — a valid pre-populated account should be accepted and used as the source account for the payment.\n\nThe Sandbox Model Bank now accepts a valid pre-populated DebtorAccount and proceeds with the consent journey as specified.",
    impact: "TPPs testing pre-populated DebtorAccount flows in the Sandbox can now exercise both Single Instant Payment and Multi Payment journeys end-to-end. Production behaviour is unchanged.",
    audience: "TPP",
    areas: [AREAS.serviceInitiation, AREAS.sandbox],
    sections: [
      { label: "Debtor Account", path: "banking/service-initiation/personal-identifiable-information/debtor-account" },
      { label: "Single Instant Payment", path: "banking/service-initiation/domestic-payments/single-instant-payment/api-guide" },
      { label: "Variable On Demand", path: "banking/service-initiation/domestic-payments/multi-payments/variable-on-demand/api-guide" }
    ]
  },
  {
    release: "2026.13.1",
    effectiveDate: "2026-04-20",
    number: 5,
    title: "Account Information v2.1 consent response schema tightening",
    summary: "Consent response validation has been tightened to enforce the flat Permissions structure defined by v2.1.",
    description: "Tightened response validation for Account Access Consent endpoints to bring the API Hub in line with the v2.1 specification.\n\nPreviously, the API Hub permitted an additional array nested inside the Permissions field on consent responses. This was never valid per the spec, but the loose validation allowed it through. Validation has now been tightened to remove the extra array and enforce the strict Permissions structure defined in the spec.",
    impact: "No real-world impact — this is a validation tightening on a malformed structure that was technically possible to send before. Functional behaviour and the documented schema are unchanged.",
    audience: "TPP",
    areas: [AREAS.consent, AREAS.dataSharing],
    sections: [
      { label: "Consent — API Guide", path: "consent/api-guide" }
    ],
    endpoints: [
      { label: "GET /account-access-consents", path: "consent/open-api/account-access-consents" },
      { label: "GET /account-access-consents/{ConsentId}", path: "consent/open-api/account-access-consents-ConsentId" }
    ]
  },
  // ─────────────────────────────────────────────────────────────────────────
  // 2026.07.0 — 11 March 2026
  // ─────────────────────────────────────────────────────────────────────────
  {
    release: "2026.07.0",
    effectiveDate: "2026-03-11",
    number: 1,
    title: "V2.1 Banking API families enabled end-to-end",
    summary: "Every v2.1 Banking endpoint is live in the API Hub and available for TPPs and LFIs to integrate against.",
    description: "Every Banking endpoint defined in v2.1 of the UAE Open Finance standard is now live in the API Hub and available for TPPs and LFIs to integrate and test against. This covers:\n\n- Data Sharing — accounts, balances, transactions, beneficiaries, standing orders, scheduled payments, direct debits, statements, customer, and product endpoints.\n- Service Initiation — Single Instant Payment, all Multi Payment variants (variable/fixed × on-demand/periodic/defined schedules), refunds, multi-authorization, and PII handling.\n- Confirmation of Payee — POST /customers/action/cop-query.\n- Products & Leads — GET /products, POST /leads.\n- ATMs — GET /atm.\n\nThe release spans all three layers required for an end-to-end v2.1 journey:\n\n- TPP-facing standards exposed by the API Hub at the rs1.* resource server.\n- Ozone Connect endpoints that LFIs implement to serve data and execute payments.\n- API Hub Consent Manager updates needed to support the v2.1 consent and payment lifecycle.\n\nThe full request/response mapping between Ozone Connect and the TPP-facing standards is in place for every endpoint in the families above.",
    impact: "TPPs can begin integrating against any v2.1 Banking endpoint through the API Hub. LFIs can implement, deploy, and certify their Ozone Connect endpoints against the live Hub.",
    audience: "Both",
    areas: [
      AREAS.dataSharing,
      AREAS.serviceInitiation,
      AREAS.confirmationOfPayee,
      AREAS.productsLeads,
      AREAS.atms
    ],
    sections: [
      { label: "Bank Data Sharing", path: "banking/data-sharing" },
      { label: "Service Initiation", path: "banking/service-initiation/" },
      { label: "Confirmation of Payee", path: "banking/confirmation-of-payee" },
      { label: "Products & Leads", path: "banking/products-leads/" },
      { label: "ATMs", path: "banking/atms" }
    ]
  }
];
function yearOf$1(release) {
  return release.split(".")[0] ?? "";
}
function anchorFor$1(entry) {
  const safeRelease = entry.release.replace(/\./g, "-");
  return `release-${safeRelease}-${entry.number}`;
}
const apiHubYears = [
  ...new Set(API_HUB_RELEASES.map((e) => yearOf$1(e.release)))
].sort();
const TRUST_FRAMEWORK_CATEGORIES = [
  "New Features",
  "Enhancements",
  "Bug Fixes"
];
const TRUST_FRAMEWORK_RELEASES = [
  // ─────────────────────────────────────────────────────────────────────────
  // 2.5.0 — release date to be confirmed (planned)
  // ─────────────────────────────────────────────────────────────────────────
  {
    release: "2.5.0",
    effectiveDate: "2026",
    planned: true,
    number: 1,
    category: "New Features",
    title: "Cross-client application and certificate management scope",
    description: "A new directory:software:organisation:application:management scope lets a software client programmatically create, update, suspend, and delete other clients within the same organisation, supporting automated onboarding workflows."
  },
  {
    release: "2.5.0",
    effectiveDate: "2026",
    planned: true,
    number: 2,
    category: "Enhancements",
    title: "Expanded search, filtering, and sorting across Directory resources",
    description: "Directory API endpoints now support filtering, sorting, and partial-match search across organisations, contacts, authority claims, domain users, API resources, certifications, applications, and administrators."
  },
  {
    release: "2.5.0",
    effectiveDate: "2026",
    planned: true,
    number: 3,
    category: "Enhancements",
    title: "Unified Documents view",
    description: "The Documents page has been redesigned into a single scrollable view, replacing the previous two-tab layout. Pending signatures and signing history are combined into collapsible sections."
  },
  {
    release: "2.5.0",
    effectiveDate: "2026",
    planned: true,
    number: 4,
    category: "Enhancements",
    title: "Sortable audit table columns",
    description: "Audit table columns can now be sorted directly from the UI."
  },
  {
    release: "2.5.0",
    effectiveDate: "2026",
    planned: true,
    number: 5,
    category: "Bug Fixes",
    title: "Sign button on deleted documents",
    description: "Resolved an error when using the sign button on deleted documents."
  },
  {
    release: "2.5.0",
    effectiveDate: "2026",
    planned: true,
    number: 6,
    category: "Bug Fixes",
    title: "Authority role claim domain validation",
    description: "Fixed domain status validation when adding authority role claims."
  },
  {
    release: "2.5.0",
    effectiveDate: "2026",
    planned: true,
    number: 7,
    category: "Bug Fixes",
    title: "Organisation search clear button and filters",
    description: "Corrected the organisation search clear button and filter persistence."
  },
  {
    release: "2.5.0",
    effectiveDate: "2026",
    planned: true,
    number: 8,
    category: "Bug Fixes",
    title: "Terms & Conditions signers dropdown",
    description: "Fixed the Terms & Conditions signers dropdown to reflect the actual signer count."
  },
  {
    release: "2.5.0",
    effectiveDate: "2026",
    planned: true,
    number: 9,
    category: "Bug Fixes",
    title: "Clients endpoint page size validation",
    description: "Improved page size validation on the clients endpoint."
  },
  {
    release: "2.5.0",
    effectiveDate: "2026",
    planned: true,
    number: 10,
    category: "Bug Fixes",
    title: "Federation entity management type field",
    description: "Restored selectability of the type field in federation entity management."
  },
  {
    release: "2.5.0",
    effectiveDate: "2026",
    planned: true,
    number: 11,
    category: "Bug Fixes",
    title: "Reference Data flags creation date",
    description: "Corrected the creation date displayed for Reference Data flags."
  },
  {
    release: "2.5.0",
    effectiveDate: "2026",
    planned: true,
    number: 12,
    category: "Bug Fixes",
    title: "Token endpoint error handling",
    description: "Fixed token endpoint 500 errors on account lookup and short credential values."
  },
  // ─────────────────────────────────────────────────────────────────────────
  // 2.4.0 — 7 July 2026
  // ─────────────────────────────────────────────────────────────────────────
  {
    release: "2.4.0",
    effectiveDate: "2026-07-07",
    number: 1,
    category: "New Features",
    title: "Date-based sorting for the audit log endpoint",
    description: "The audit log endpoint now fully implements the sort parameter, letting consumers retrieve audit records ordered by date and rely on deterministic ordering when querying audit history."
  },
  {
    release: "2.4.0",
    effectiveDate: "2026-07-07",
    number: 2,
    category: "New Features",
    title: "External document links and regulatory document types for organisations",
    description: "Organisations can now register and manage links to external documents. A new Regulatory Documents tab, with dedicated API endpoints, captures a document type, a validated HTTPS URI, and an optional description, while a Regulatory Document Types tab in Reference Data lets administrators manage the available types. Read-only users see the list without edit controls. The feature is disabled by default and can be enabled per request."
  },
  {
    release: "2.4.0",
    effectiveDate: "2026-07-07",
    number: 3,
    category: "New Features",
    title: "Certificate Authorities management in Reference Data",
    description: "A new Certificate Authorities section in Reference Data provides full root CA lifecycle management: create, view, update, enable, and disable root CAs via PEM upload or paste. A unified wizard auto-detects the certificate type (root only, root with intermediate, or intermediate referencing an existing root) and visualises the trust chain as an interactive node graph. Administrators can edit a Root CA name or an Intermediate CA chain name directly, and the Intermediates tab supports View, Enable, and Disable with confirmation dialogs. The wizard resumes from the intermediates step on retry without re-creating the root CA, hierarchical mTLS trust constraints are enforced, and validation covers duplicate detection, invalid file formats, and required contact fields."
  },
  {
    release: "2.4.0",
    effectiveDate: "2026-07-07",
    number: 4,
    category: "New Features",
    title: "Audit log visibility for organisations",
    description: "Organisation records now expose an audit trail, consistent with the audit functionality already available for applications. Users with appropriate permissions can review a chronological history of changes made to an organisation."
  },
  {
    release: "2.4.0",
    effectiveDate: "2026-07-07",
    number: 5,
    category: "New Features",
    title: "Organisation name on the /clients endpoint",
    description: "The /clients endpoint response now includes an organisation_name field, populated from the organisation record, allowing identity providers to display the organisation name associated with a client and supporting distributor and representative model use cases."
  },
  {
    release: "2.4.0",
    effectiveDate: "2026-07-07",
    number: 6,
    category: "New Features",
    title: "Audit history for certificates, organisation roles, and domains",
    description: "Audit history is now available for application certificates (navigable by application and by certificate, identified by key type and KID), organisation roles (navigable by role name), and organisation domains (navigable by domain name)."
  },
  {
    release: "2.4.0",
    effectiveDate: "2026-07-07",
    number: 7,
    category: "New Features",
    title: "grant_id returned by the token endpoint",
    description: "The /token endpoint response now includes a grant_id field for code exchange and refresh token flows, allowing TPPs to retrieve user consents even after tokens are revoked. It is included by default and can be disabled per environment via grant_id_in_token_response=false; existing token response structures and flows are unaffected."
  },
  {
    release: "2.4.0",
    effectiveDate: "2026-07-07",
    number: 8,
    category: "New Features",
    title: "Generic grant revocation endpoint with soft-delete",
    description: "A new generic grant revocation endpoint operates independently of specific consent flows. Grants are soft-deleted on revocation, preserving history and the revocation reason (for example TPP-initiated, refresh token reuse, or session end), with configurable TTL-based expiry — access tokens have a 1-hour lifetime while refresh tokens and grants have a 100-year lifetime. A migration is required to create or drop TTL indexes depending on the soft-deletion configuration."
  },
  {
    release: "2.4.0",
    effectiveDate: "2026-07-07",
    number: 9,
    category: "New Features",
    title: "Audit endpoint support for server certification and server roles",
    description: 'The audit API now supports the authorisationServerCertification resource type alongside server roles and API resources, queryable with the standard actionType, organisationId, resourceId, performedBy, and date-range parameters. Requests using the server certification resource type previously returned a "resource type not implemented" error.'
  },
  {
    release: "2.4.0",
    effectiveDate: "2026-07-07",
    number: 10,
    category: "Enhancements",
    title: "DELETE replaces PUT for removing server resources",
    description: "The Directory UI now uses HTTP DELETE when removing authorisation servers, API resources, and server certifications, replacing the previous behaviour of calling PUT with a status of Inactive. The change is internal to the UI and requires no action from API consumers or integrators."
  },
  {
    release: "2.4.0",
    effectiveDate: "2026-07-07",
    number: 11,
    category: "Enhancements",
    title: "Responsive wizard layout across device sizes",
    description: "Multi-step wizards now adapt to screen size: step numbers only on mobile, step numbers with hover tooltips on small laptops, and full step labels on larger screens."
  },
  {
    release: "2.4.0",
    effectiveDate: "2026-07-07",
    number: 12,
    category: "Enhancements",
    title: "Bound domain IDs in Authority deactivation errors",
    description: "When deactivating an Authority still bound to active authorisation domain mappings, the API error response now includes the IDs of all bound domains, allowing administrators to identify and remove the relevant mappings before retrying."
  },
  {
    release: "2.4.0",
    effectiveDate: "2026-07-07",
    number: 13,
    category: "Enhancements",
    title: "API auto-fill uses endpoint regex format",
    description: "API auto-fill now fetches the registered endpoint regex format for the relevant API family rather than the API family version, so auto-populated values more accurately reflect the expected endpoint structure."
  },
  {
    release: "2.4.0",
    effectiveDate: "2026-07-07",
    number: 14,
    category: "Bug Fixes",
    title: "Invalid UUID path segments return 400 not 500",
    description: "Path segments expected to be UUIDs — authorisation server ID, software statement ID, and domain user ID — now return a clean 400 Bad Request instead of an unhandled 500 Internal Server Error."
  },
  {
    release: "2.4.0",
    effectiveDate: "2026-07-07",
    number: 15,
    category: "Bug Fixes",
    title: "No reactivation email for already-active users",
    description: "Setting an organisation administrator to Active via PUT no longer triggers a reactivation email when the user is already active; the API now suppresses the email when no state change has occurred."
  },
  {
    release: "2.4.0",
    effectiveDate: "2026-07-07",
    number: 16,
    category: "Bug Fixes",
    title: "Cleared optional fields no longer submitted as empty strings",
    description: "When creating an authorisation server, optional fields that were edited and then cleared are now omitted from the request payload rather than submitted as empty strings, which previously caused an API error."
  },
  {
    release: "2.4.0",
    effectiveDate: "2026-07-07",
    number: 17,
    category: "Bug Fixes",
    title: "Concurrent duplicate user creation handled correctly",
    description: "A race condition that could cause duplicate key violations when multiple requests initialised the same user simultaneously is now handled correctly, returning a 400 Bad Request instead of an unhandled server error."
  },
  {
    release: "2.4.0",
    effectiveDate: "2026-07-07",
    number: 18,
    category: "Bug Fixes",
    title: "Audit entries generated for updated API resources",
    description: "Updates to API Resources now consistently produce audit entries retrievable via the audit API; previously no audit records were created, causing the audit endpoint to return empty results."
  },
  {
    release: "2.4.0",
    effectiveDate: "2026-07-07",
    number: 19,
    category: "Bug Fixes",
    title: "Flags included in replicated directory snapshots",
    description: "Flag values are now correctly returned for organisations, authorisation servers, and software statements in directory snapshot data replicated to Open Finance consumers, in line with the published API specification."
  },
  {
    release: "2.4.0",
    effectiveDate: "2026-07-07",
    number: 20,
    category: "Bug Fixes",
    title: "Accurate API error messages in IDP configuration",
    description: "When creating an IDP configuration fails, the UI now displays the meaningful error returned by the API rather than a generic message, giving administrators clear guidance on what to correct."
  },
  // ─────────────────────────────────────────────────────────────────────────
  // 2.3.0 — 8 June 2026
  // ─────────────────────────────────────────────────────────────────────────
  {
    release: "2.3.0",
    effectiveDate: "2026-06-08",
    number: 1,
    category: "New Features",
    title: "Application change history and audit comparison",
    description: "Applications now include an audit history view that supports comparing versions side by side. When non-sequential versions are compared, the interface warns that intermediate changes may not be reflected in the diff. Tabs for certificates, flags, and roles are present and marked as coming soon."
  },
  {
    release: "2.3.0",
    effectiveDate: "2026-06-08",
    number: 2,
    category: "New Features",
    title: "Filter Authorisation Servers by active status",
    description: "The Authorisation Servers list page now includes a Show active servers only toggle, mirroring the equivalent filter already available on the Applications list."
  },
  {
    release: "2.3.0",
    effectiveDate: "2026-06-08",
    number: 3,
    category: "New Features",
    title: "Audit view resource navigation",
    description: "The audit view now includes a primary switcher that lets users move between resources and their associated audit items."
  },
  {
    release: "2.3.0",
    effectiveDate: "2026-06-08",
    number: 4,
    category: "Enhancements",
    title: "Responsive filter layouts",
    description: "Filter controls now collapse into a filter count icon on smaller screens, keeping filtering accessible on mobile without crowding the layout."
  },
  {
    release: "2.3.0",
    effectiveDate: "2026-06-08",
    number: 5,
    category: "Enhancements",
    title: "Email format validation during registration",
    description: "User registration now validates email format, with invalid formats rejected at the API level."
  },
  {
    release: "2.3.0",
    effectiveDate: "2026-06-08",
    number: 6,
    category: "Enhancements",
    title: "Flexible query parameter syntax in search",
    description: "Search endpoints now accept both repeated query parameters and comma-separated values for the same parameter."
  },
  {
    release: "2.3.0",
    effectiveDate: "2026-06-08",
    number: 7,
    category: "Enhancements",
    title: "Service Desk contact visibility",
    description: "The Service Desk scope now retrieves contacts across all visibility levels."
  },
  {
    release: "2.3.0",
    effectiveDate: "2026-06-08",
    number: 8,
    category: "Enhancements",
    title: "Expanded global search criteria",
    description: "Global search now supports organisation registration numbers and parent organisation IDs as search criteria."
  },
  {
    release: "2.3.0",
    effectiveDate: "2026-06-08",
    number: 9,
    category: "Bug Fixes",
    title: "Premature success modals in Application wizards",
    description: "Fixed an issue where success modals could appear before an Application wizard step had completed."
  },
  {
    release: "2.3.0",
    effectiveDate: "2026-06-08",
    number: 10,
    category: "Bug Fixes",
    title: "Domain user role validation feedback",
    description: "Fixed enable/disable role validation for Domain Users, with clearer error messaging."
  },
  {
    release: "2.3.0",
    effectiveDate: "2026-06-08",
    number: 11,
    category: "Bug Fixes",
    title: "Simulator consent flow message contrast",
    description: "Corrected low-contrast informational messages in the simulator consent flows."
  },
  {
    release: "2.3.0",
    effectiveDate: "2026-06-08",
    number: 12,
    category: "Bug Fixes",
    title: '"Family complete" flag for Open Data APIs',
    description: "Fixed evaluation of the Family complete flag for Open Data API families."
  },
  {
    release: "2.3.0",
    effectiveDate: "2026-06-08",
    number: 13,
    category: "Bug Fixes",
    title: "Authority list sorting",
    description: "Repaired sorting on the authority list."
  },
  {
    release: "2.3.0",
    effectiveDate: "2026-06-08",
    number: 14,
    category: "Bug Fixes",
    title: "Duplicate network requests",
    description: "Eliminated duplicate network requests issued on certain pages."
  },
  {
    release: "2.3.0",
    effectiveDate: "2026-06-08",
    number: 15,
    category: "Bug Fixes",
    title: "Certificate table layout",
    description: "Corrected certificate table alignment and column responsiveness."
  },
  {
    release: "2.3.0",
    effectiveDate: "2026-06-08",
    number: 16,
    category: "Bug Fixes",
    title: "Domain Mapping disable error visibility",
    description: "Fixed visibility of the error shown when disabling a Domain Mapping that is still in use."
  },
  {
    release: "2.3.0",
    effectiveDate: "2026-06-08",
    number: 17,
    category: "Bug Fixes",
    title: "IDP Configuration field toggles",
    description: "Resolved an issue with field toggle behaviour on the IDP Configuration screen."
  },
  // ─────────────────────────────────────────────────────────────────────────
  // 2.2.0 — 2 June 2026
  // ─────────────────────────────────────────────────────────────────────────
  {
    release: "2.2.0",
    effectiveDate: "2026-06-02",
    number: 1,
    category: "New Features",
    title: "Directory version display",
    description: "The current directory version is now shown in the UI via the profile menu. Selecting Versions opens a modal displaying the active release version with direct links to the Release Notes and API documentation."
  },
  {
    release: "2.2.0",
    effectiveDate: "2026-06-02",
    number: 2,
    category: "New Features",
    title: "Server roles",
    description: "Authorisation Servers now include a dedicated Roles tab. The tab surfaces associated domains, roles, and authorities, and allows administrators to add and manage server roles directly from the server detail view."
  },
  {
    release: "2.2.0",
    effectiveDate: "2026-06-02",
    number: 3,
    category: "New Features",
    title: "Improved OTP validation in onboarding",
    description: "The onboarding verification flow now separates email and phone OTP validation into distinct steps. Email validation runs first, followed by phone where applicable. Phone OTP is skipped when not configured in the environment."
  },
  {
    release: "2.2.0",
    effectiveDate: "2026-06-02",
    number: 4,
    category: "New Features",
    title: "New scope for audit log access across organisations",
    description: "A new directory:software:audit scope supports automated retrieval of audit logs via client credentials, without a human user account. Organisation Administrators can use an Application with this scope to query audit endpoints programmatically."
  },
  {
    release: "2.2.0",
    effectiveDate: "2026-06-02",
    number: 5,
    category: "Enhancements",
    title: "Disabled action icons when unavailable",
    description: "Action icons on Organisation, Server, and Application cards are now visually disabled when unavailable. A tooltip clarifies why the action is inactive or permission-restricted."
  },
  {
    release: "2.2.0",
    effectiveDate: "2026-06-02",
    number: 6,
    category: "Enhancements",
    title: "Updated toggle design",
    description: "Toggle controls across the Directory have been updated to align with the design system."
  },
  {
    release: "2.2.0",
    effectiveDate: "2026-06-02",
    number: 7,
    category: "Enhancements",
    title: "Responsive search bar",
    description: "The global search bar now scales responsively across screen sizes, adapting on mobile and dynamically adjusting on larger displays."
  },
  {
    release: "2.2.0",
    effectiveDate: "2026-06-02",
    number: 8,
    category: "Enhancements",
    title: "Paginated certification types dropdown",
    description: "The Certification Type and Certification Type Variant dropdowns now support auto-complete and pagination, improving usability when working with a large number of certification types."
  },
  {
    release: "2.2.0",
    effectiveDate: "2026-06-02",
    number: 9,
    category: "Enhancements",
    title: "Scroll-to-error behaviour in dialogs",
    description: "Forms within dialogs now scroll to the first invalid field when validation fails, while preserving error summary visibility."
  },
  {
    release: "2.2.0",
    effectiveDate: "2026-06-02",
    number: 10,
    category: "Bug Fixes",
    title: "Improved global search feedback",
    description: 'Fixed an issue where typing in the global search bar briefly displayed "No results for…" before the search completed. The interface now correctly shows a "Searching…" state during queries.'
  },
  {
    release: "2.2.0",
    effectiveDate: "2026-06-02",
    number: 11,
    category: "Bug Fixes",
    title: "API metadata schema duplication across API families",
    description: "Fixed an issue where configuring API resource metadata at the authorisation server level incorrectly applied the same schema to multiple distinct API Families. Each API Family now reflects its own configured metadata schema."
  },
  {
    release: "2.2.0",
    effectiveDate: "2026-06-02",
    number: 12,
    category: "Bug Fixes",
    title: "API resources metadata permissions",
    description: "Fixed an issue preventing organisation users with appropriate type access from updating API resource metadata on an Authorisation Server."
  },
  // ─────────────────────────────────────────────────────────────────────────
  // 2.1.0 — 2 April 2026
  // ─────────────────────────────────────────────────────────────────────────
  {
    release: "2.1.0",
    effectiveDate: "2026-04-02",
    number: 1,
    category: "New Features",
    title: "New Application details experience",
    description: "The Application Details page has been redesigned for a clearer, more structured layout. Key information such as flags and core application details is shown prominently at the top, while detailed sections are collapsed by default."
  },
  {
    release: "2.1.0",
    effectiveDate: "2026-04-02",
    number: 2,
    category: "New Features",
    title: "Identity Provider (IDP) creation wizard",
    description: "A new guided wizard simplifies creating Identity Providers. The wizard provides clearer visual feedback during configuration and consolidates IDP and IDP version creation into a single flow."
  },
  {
    release: "2.1.0",
    effectiveDate: "2026-04-02",
    number: 3,
    category: "New Features",
    title: "Federation visibility for applications",
    description: "Applications participating in a federation now display clear visual indicators. A Federated tag is shown on the application page, and a collapsible section provides visibility into the federation hierarchy — the current entity, the parent entity, and the trust anchor."
  },
  {
    release: "2.1.0",
    effectiveDate: "2026-04-02",
    number: 4,
    category: "Enhancements",
    title: "API Families configuration clarity",
    description: "Additional helpers and contextual guidance have been added to the API Families configuration screens, helping users understand certification types and configuration requirements during creation."
  },
  {
    release: "2.1.0",
    effectiveDate: "2026-04-02",
    number: 5,
    category: "Enhancements",
    title: "Improved mobile navigation",
    description: "The sidebar on mobile now opens as a partial overlay rather than a full-screen panel, allowing users to keep context with the underlying page."
  },
  {
    release: "2.1.0",
    effectiveDate: "2026-04-02",
    number: 6,
    category: "Enhancements",
    title: "Prepopulated configuration fields",
    description: "Selected configuration forms now support prepopulated values, reducing manual input and improving consistency when creating new resources."
  },
  {
    release: "2.1.0",
    effectiveDate: "2026-04-02",
    number: 7,
    category: "Enhancements",
    title: "Improved endpoint generation in wizards",
    description: "Endpoint generation in the API resource wizard now correctly produces patterns based on the actual API version and properly handles version numbers and dot notation."
  },
  {
    release: "2.1.0",
    effectiveDate: "2026-04-02",
    number: 8,
    category: "Bug Fixes",
    title: "Application assertion confirmation",
    description: 'The "Generating Assertion" confirmation dialog no longer appears when generating an assertion for an already-locked application.'
  },
  {
    release: "2.1.0",
    effectiveDate: "2026-04-02",
    number: 9,
    category: "Bug Fixes",
    title: "Domain mapping validation feedback",
    description: "Disabling a Domain Mapping that is still in use now surfaces the API error to the user."
  },
  {
    release: "2.1.0",
    effectiveDate: "2026-04-02",
    number: 10,
    category: "Bug Fixes",
    title: "Authorisation Server IDP configuration button",
    description: "The Add IDP Configuration button is now correctly disabled when the Authorisation Server is inactive."
  },
  {
    release: "2.1.0",
    effectiveDate: "2026-04-02",
    number: 11,
    category: "Bug Fixes",
    title: "Suspended application deletion",
    description: "Suspended applications can now be deleted directly from the Application Details page."
  },
  {
    release: "2.1.0",
    effectiveDate: "2026-04-02",
    number: 12,
    category: "Bug Fixes",
    title: "Domain Users page refresh",
    description: "Updates to Domain User information are now reflected immediately, without requiring a page refresh."
  },
  {
    release: "2.1.0",
    effectiveDate: "2026-04-02",
    number: 13,
    category: "Bug Fixes",
    title: "Flag confirmation dialog text",
    description: 'Corrected wording in the Disable Flag confirmation dialog (previously said "certification" instead of "flag").'
  },
  {
    release: "2.1.0",
    effectiveDate: "2026-04-02",
    number: 14,
    category: "Bug Fixes",
    title: "API Family endpoint validation",
    description: "Resolved several issues including duplicate endpoint definitions, incorrect version handling for generated endpoints, and improved validation when defining endpoint patterns."
  },
  {
    release: "2.1.0",
    effectiveDate: "2026-04-02",
    number: 15,
    category: "Bug Fixes",
    title: "Reference Data role validation",
    description: "Fixed an issue preventing creation of Authorisation Domain Roles when the description exceeded the allowed character limit."
  },
  // ─────────────────────────────────────────────────────────────────────────
  // 2.0.0 — 19 February 2026
  // ─────────────────────────────────────────────────────────────────────────
  {
    release: "2.0.0",
    effectiveDate: "2026-02-19",
    number: 1,
    category: "New Features",
    title: "API Families configuration via Reference Data",
    description: "API Families can now be configured through Reference Data, allowing ecosystem operators to centrally manage which API families are available and giving participants a clear view of supported APIs."
  },
  {
    release: "2.0.0",
    effectiveDate: "2026-02-19",
    number: 2,
    category: "New Features",
    title: "Certificate description field",
    description: "Certificates now support a Description field to help identify their purpose. The description can be set during certificate creation and updated later, improving clarity for participants managing certificates across multiple environments."
  },
  {
    release: "2.0.0",
    effectiveDate: "2026-02-19",
    number: 3,
    category: "New Features",
    title: "Authorisation Server details experience",
    description: "A redesigned Authorisation Server details page introduces a clearer, more structured layout. Key information such as flags and core server details is easier to identify, with sections grouped and collapsed by default."
  },
  {
    release: "2.0.0",
    effectiveDate: "2026-02-19",
    number: 4,
    category: "New Features",
    title: "Federation endpoint visibility",
    description: "Federation details now display all relevant federation endpoints rather than only the Fetch endpoint, improving transparency when configuring, validating, and troubleshooting federation integrations."
  },
  {
    release: "2.0.0",
    effectiveDate: "2026-02-19",
    number: 5,
    category: "Enhancements",
    title: "Authority organisation context",
    description: "Authorities now clearly indicate which Organisation they belong to when viewed under Reference Data. Where applicable, an Organisation tag links directly to the associated Organisation. Legacy Authorities include an explanation of their previous creation model."
  },
  {
    release: "2.0.0",
    effectiveDate: "2026-02-19",
    number: 6,
    category: "Enhancements",
    title: "Role type clarity",
    description: "The UI now clearly explains the difference between Federation roles and Directory roles, including how metadata behaves differently between them. This reduces confusion when role metadata does not propagate for Federation roles."
  },
  {
    release: "2.0.0",
    effectiveDate: "2026-02-19",
    number: 7,
    category: "Enhancements",
    title: "Layout and usability improvements",
    description: "A unified layout with improved spacing, pagination, and visual consistency has been applied across Organisations, Authorisation Mapping, Domain Users, Terms & Conditions, and Audit History."
  },
  {
    release: "2.0.0",
    effectiveDate: "2026-02-19",
    number: 8,
    category: "Enhancements",
    title: "Organisation creation flow standardisation",
    description: 'The legacy "New Organisation" button has been removed. The guided Organisation creation wizard is now the standard method for creating Organisations.'
  },
  {
    release: "2.0.0",
    effectiveDate: "2026-02-19",
    number: 9,
    category: "Enhancements",
    title: "Standardised enable / disable terminology",
    description: "Action labels across the Directory have been standardised to Enable / Disable for clarity and consistency when managing resources."
  },
  {
    release: "2.0.0",
    effectiveDate: "2026-02-19",
    number: 10,
    category: "Enhancements",
    title: "Terms & Conditions management",
    description: "Data Administrator users can now manage the Participant Terms & Conditions Signing required? setting when editing Organisations."
  },
  {
    release: "2.0.0",
    effectiveDate: "2026-02-19",
    number: 11,
    category: "Enhancements",
    title: "Logo upload experience",
    description: "Logo uploads now display an image preview before saving. Drag-and-drop uploads are consistently supported across Organisations, Servers, and Applications."
  },
  {
    release: "2.0.0",
    effectiveDate: "2026-02-19",
    number: 12,
    category: "Bug Fixes",
    title: "Missing actions for approved IDP versions",
    description: "Fixed missing actions for approved IDP versions."
  },
  {
    release: "2.0.0",
    effectiveDate: "2026-02-19",
    number: 13,
    category: "Bug Fixes",
    title: "Organisation ID regeneration during creation",
    description: "Fixed Organisation ID regeneration issues during the Organisation creation flow."
  },
  {
    release: "2.0.0",
    effectiveDate: "2026-02-19",
    number: 14,
    category: "Bug Fixes",
    title: "Duplicate backend requests on Reference Data pages",
    description: "Eliminated unnecessary duplicate backend requests on Reference Data pages."
  },
  {
    release: "2.0.0",
    effectiveDate: "2026-02-19",
    number: 15,
    category: "Bug Fixes",
    title: "Authorisation Server configuration validation",
    description: "Improved validation when configuring Authorisation Servers to prevent invalid configurations."
  },
  {
    release: "2.0.0",
    effectiveDate: "2026-02-19",
    number: 16,
    category: "Bug Fixes",
    title: "Flag management and configuration visibility",
    description: "Resolved issues affecting flag management and configuration visibility across the UI."
  },
  {
    release: "2.0.0",
    effectiveDate: "2026-02-19",
    number: 17,
    category: "Bug Fixes",
    title: "Icon visibility across the UI",
    description: "Corrected icon visibility issues across the UI for improved visual consistency."
  },
  {
    release: "2.0.0",
    effectiveDate: "2026-02-19",
    number: 18,
    category: "Bug Fixes",
    title: "Federations page reachability",
    description: "The Federations page is no longer reachable when Federations are disabled in the ecosystem."
  },
  {
    release: "2.0.0",
    effectiveDate: "2026-02-19",
    number: 19,
    category: "Bug Fixes",
    title: "Backend calls when editing Applications",
    description: "Reduced unnecessary backend calls when editing Applications."
  },
  {
    release: "2.0.0",
    effectiveDate: "2026-02-19",
    number: 20,
    category: "Bug Fixes",
    title: "My Organisations filter",
    description: "Resolved filtering issues when using the My Organisations filter."
  },
  {
    release: "2.0.0",
    effectiveDate: "2026-02-19",
    number: 21,
    category: "Bug Fixes",
    title: "Document signing dialog placeholder text",
    description: "Corrected placeholder text displayed in document signing dialogs."
  },
  {
    release: "2.0.0",
    effectiveDate: "2026-02-19",
    number: 22,
    category: "Bug Fixes",
    title: "Required-field indicators in Application configuration",
    description: "Added missing required-field indicators in Application configuration screens."
  },
  {
    release: "2.0.0",
    effectiveDate: "2026-02-19",
    number: 23,
    category: "Bug Fixes",
    title: "General stability and reliability improvements",
    description: "General stability, consistency, and reliability improvements across the Directory UI."
  }
];
function yearOf(entry) {
  return entry.effectiveDate.slice(0, 4);
}
function anchorFor(entry) {
  const safeRelease = entry.release.replace(/\./g, "-");
  return `release-${safeRelease}-${entry.number}`;
}
const trustFrameworkYears = [
  ...new Set(TRUST_FRAMEWORK_RELEASES.map((e) => yearOf(e)))
].sort();
const API_HUB_YEARS = apiHubYears;
const TRUST_FRAMEWORK_YEARS = trustFrameworkYears;
const latestApiHubYear = API_HUB_YEARS.at(-1) ?? "2026";
const latestTrustFrameworkYear = TRUST_FRAMEWORK_YEARS.at(-1) ?? "2026";
export {
  API_HUB_RELEASES as A,
  TRUST_FRAMEWORK_RELEASES as T,
  latestTrustFrameworkYear as a,
  anchorFor$1 as b,
  yearOf as c,
  TRUST_FRAMEWORK_CATEGORIES as d,
  anchorFor as e,
  latestApiHubYear as l,
  yearOf$1 as y
};
