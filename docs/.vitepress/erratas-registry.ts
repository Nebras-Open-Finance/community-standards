// Single source of truth for errata items.
// - The ErrataUpdateBanner component uses `affectedPaths` to decide whether to show a banner.
// - The ErrataSections component renders the body of each errata page from this file.
//
// To add a new errata: append an entry below and (if the errata page doesn't yet exist)
// create a thin markdown shim at docs/tech/release-notes-and-erratas/erratas/{version}/{errataId}.md
// that just mounts <ErrataSections errata-id="..." />.

export interface ErrataEndpoint {
  label: string           // e.g. "GET /account-access-consents"
  path: string            // internal route path
}

export interface ErrataGitHubSource {
  label: string           // displayed text, typically the repo-relative file path
  url: string             // full github URL
}

export interface ErrataRelatedStandard {
  label: string           // e.g. "Banking — Data Sharing"
  path: string            // internal route path
}

export interface ErrataSection {
  errataId: string                        // which errata doc this section belongs to, e.g. "v2.1-errata1"
  version: string                         // spec version the errata corrects, e.g. "v2.1"
  number: number                          // section number within the errata (1, 2, 3, …)
  title: string                           // heading text without the number, e.g. "Account Information — Permissions array flattening"
  summary: string                         // one-line description shown in the banner
  description: string                     // prose — what changed (plain text, \n\n for paragraph breaks)
  rationale: string                       // prose — why the change was required
  effectiveDate: string                   // e.g. "To be confirmed on merge to main"
  spec?: string                           // OpenAPI spec name, e.g. "uae-account-information-openapi"
  specs?: string[]                        // multiple specs when a single logical change spans several OpenAPI files
  endpoints?: ErrataEndpoint[]
  schemas?: string[]
  githubSources?: ErrataGitHubSource[]
  relatedStandards?: ErrataRelatedStandard[]
  affectedPaths: string[]                 // page paths that should display the banner
}

const OZONE = 'https://github.com/Nebras-Open-Finance/api-specs/blob/ozone'

export const ERRATA_SECTIONS: ErrataSection[] = [
  {
    errataId: 'v2.1-errata1',
    version: 'v2.1',
    number: 1,
    title: 'Account Information — Permissions array flattening',
    summary: 'The Permissions field on consent responses is now a flat array of strings (previously a nested array of arrays).',
    description:
      'The Permissions field on consent responses was previously typed as an array of arrays of strings — an array containing a nested array of permission codes. It is now a flat array of strings, matching the normative text and how clients have always populated it on the request side.',
    rationale:
      'The nested-array form was a defect in the published OpenAPI. The v2.1 normative text and every consumer of the response treat Permissions as a flat array of permission codes, and the API Hub already enforces the flat structure. The schema is being corrected to match.',
    effectiveDate: 'To be confirmed on merge to main.',
    spec: 'uae-account-information-openapi',
    endpoints: [
      { label: 'GET /account-access-consents', path: '/tech/api-specs/v2.1/tpp/consent/account-access-consents' },
      { label: 'GET /account-access-consents/{ConsentId}', path: '/tech/api-specs/v2.1/tpp/consent/account-access-consents-ConsentId' },
    ],
    schemas: ['AEBankDataSharingConsentPermissionCodes'],
    githubSources: [
      {
        label: 'supporting/breaking-changes/standards/v2.1-errata1/uae-account-information-openapi/breaking-changes.yaml',
        url: `${OZONE}/supporting/breaking-changes/standards/v2.1-errata1/uae-account-information-openapi/breaking-changes.yaml`,
      },
      {
        label: 'dist/standards/v2.1-errata1/uae-account-information-openapi.yaml',
        url: `${OZONE}/dist/standards/v2.1-errata1/uae-account-information-openapi.yaml`,
      },
    ],
    relatedStandards: [
      { label: 'Banking — Data Sharing', path: '/tech/tpp-standards/v2.1/banking/data-sharing/' },
    ],
    affectedPaths: [
      '/tech/api-specs/v2.1/tpp/consent/account-access-consents',
      '/tech/api-specs/v2.1/tpp/consent/account-access-consents-ConsentId',
      '/tech/tpp-standards/v2.1/consent/open-api/account-access-consents',
      '/tech/tpp-standards/v2.1/consent/open-api/account-access-consents-ConsentId',
    ],
  },
  {
    errataId: 'v2.1-errata1',
    version: 'v2.1',
    number: 2,
    title: 'Account Information — TrustFrameworkCode enum corrected to FI',
    summary: 'The TrustFrameworkCode enum on party responses now declares FI (previously the unemittable Undefined).',
    description:
      'The TrustFrameworkCode enum used by VerifiedClaimVerification.TrustFramework on GET /parties and GET /accounts/{AccountId}/parties previously declared a single value Undefined — a value no conforming LFI could produce on the wire. The enum has been replaced with FI, matching what Ozone Connect emits on CbuaeVerifiedClaim.verification.trustFramework and what every real response reaching a TPP has always contained.',
    rationale:
      'The v2.1 enum was internally inconsistent with the Ozone Connect spec the Hub proxies from: every real response carried FI while the standards enum declared only Undefined. Formally this is an enum-value removal, but in practice no consumer could have relied on Undefined because no conforming implementation could have produced it. Richer values (UAE Pass digital identity, Emirates ID physical verification) are deferred to v3.0.',
    effectiveDate: 'To be confirmed on merge to main.',
    spec: 'uae-account-information-openapi',
    endpoints: [
      { label: 'GET /parties', path: '/tech/api-specs/v2.1/tpp/data-sharing/parties' },
      { label: 'GET /accounts/{AccountId}/parties', path: '/tech/api-specs/v2.1/tpp/data-sharing/accounts-AccountId-parties' },
    ],
    schemas: ['TrustFrameworkCode'],
    githubSources: [
      {
        label: 'supporting/breaking-changes/standards/v2.1-errata1/uae-account-information-openapi/breaking-changes.yaml',
        url: `${OZONE}/supporting/breaking-changes/standards/v2.1-errata1/uae-account-information-openapi/breaking-changes.yaml`,
      },
      {
        label: 'dist/standards/v2.1-errata1/uae-account-information-openapi.yaml',
        url: `${OZONE}/dist/standards/v2.1-errata1/uae-account-information-openapi.yaml`,
      },
    ],
    relatedStandards: [
      { label: 'Banking — Data Sharing', path: '/tech/tpp-standards/v2.1/banking/data-sharing/' },
    ],
    affectedPaths: [
      '/tech/api-specs/v2.1/tpp/data-sharing/parties',
      '/tech/api-specs/v2.1/tpp/data-sharing/accounts-AccountId-parties',
      '/tech/tpp-standards/v2.1/banking/data-sharing/open-api/parties',
      '/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-parties',
    ],
  },
  {
    errataId: 'v2.1-errata1',
    version: 'v2.1',
    number: 3,
    title: 'Authorization Endpoints — POST /token restructured as oneOf; client_credentials grant added; client_id optional',
    summary: 'POST /token response is now a oneOf across grant types, client_credentials is documented, and client_id is optional to reflect mTLS client authentication.',
    description:
      'Three aligned corrections on POST /token:\n\n' +
      '1. The response body is now defined as a oneOf across three grant-type-specific schemas — AEAuthorizationCodeGrantTokenResponseProperties, AERefreshTokenGrantTokenResponseProperties, and AEClientCredentialsGrantTokenResponseProperties. Previously a single combined schema described the response, which marked fields like id_token and refresh_token as required for every grant even though they are only valid for some.\n\n' +
      '2. The client_credentials grant is now explicitly documented as a supported grant type on POST /token. v2.1 declared only authorization_code and refresh_token, yet the API Hub has always accepted client_credentials — the spec has been brought into line.\n\n' +
      '3. The client_id request parameter is now optional. Under FAPI 2.0 with mTLS client authentication the client is identified by its certificate, so client_id is not required on the wire.',
    rationale:
      'All three corrections align the spec with how the API Hub has behaved in production since v2.1 was published. The single-schema response form misrepresented the contract (each grant type returns a different shape); omitting client_credentials hid a supported grant; and requiring client_id contradicted the FAPI 2.0 mTLS profile the Hub has always operated under. This is a documentation-level correction — no behavioural change is being made.',
    effectiveDate: 'To be confirmed on merge to main.',
    spec: 'uae-authorization-endpoints-openapi',
    endpoints: [
      { label: 'POST /token', path: '/tech/api-specs/v2.1/tpp/token/token' },
    ],
    schemas: [
      'AEAuthorizationCodeGrantTokenResponseProperties',
      'AERefreshTokenGrantTokenResponseProperties',
      'AEClientCredentialsGrantTokenResponseProperties',
    ],
    githubSources: [
      {
        label: 'supporting/breaking-changes/standards/v2.1-errata1/uae-authorization-endpoints-openapi/breaking-changes.yaml',
        url: `${OZONE}/supporting/breaking-changes/standards/v2.1-errata1/uae-authorization-endpoints-openapi/breaking-changes.yaml`,
      },
      {
        label: 'dist/standards/v2.1-errata1/uae-authorization-endpoints-openapi.yaml',
        url: `${OZONE}/dist/standards/v2.1-errata1/uae-authorization-endpoints-openapi.yaml`,
      },
    ],
    relatedStandards: [
      { label: 'Banking — Service Initiation', path: '/tech/tpp-standards/v2.1/banking/service-initiation/' },
    ],
    affectedPaths: [
      '/tech/api-specs/v2.1/tpp/token/token',
      '/tech/tpp-standards/security/tokens/open-api/token',
    ],
  },
  {
    errataId: 'v2.1-errata1',
    version: 'v2.1',
    number: 4,
    title: 'Confirmation of Payee — 204 response description corrected',
    summary: 'The 204 response description on POST /confirmation now reads "IBAN is not recognised" rather than the previous opt-out wording.',
    description:
      'The description of the 204 No Content response on POST /confirmation has been corrected to "IBAN is not recognised". Previously it read "Account holder has opted-out of Confirmation of Payee and no data is returned", which confused the semantics of the status code — 204 is returned when the supplied IBAN is not recognised by the LFI, not when an account holder has opted out.',
    rationale:
      'The opt-out wording misled integrators about when to expect a 204. No opt-out mechanism is defined on this surface; the 204 is the unrecognised-IBAN response and the prose has been aligned with actual behaviour.',
    effectiveDate: 'To be confirmed on merge to main.',
    spec: 'uae-confirmation-of-payee-openapi',
    endpoints: [
      { label: 'POST /confirmation', path: '/tech/api-specs/v2.1/tpp/confirmation-of-payee/confirmation' },
    ],
    githubSources: [
      {
        label: 'dist/standards/v2.1-errata1/uae-confirmation-of-payee-openapi.yaml',
        url: `${OZONE}/dist/standards/v2.1-errata1/uae-confirmation-of-payee-openapi.yaml`,
      },
    ],
    relatedStandards: [
      { label: 'Banking — Confirmation of Payee', path: '/tech/tpp-standards/v2.1/banking/confirmation-of-payee/' },
    ],
    affectedPaths: [
      '/tech/api-specs/v2.1/tpp/confirmation-of-payee/confirmation',
      '/tech/tpp-standards/v2.1/banking/confirmation-of-payee/open-api/confirmation',
    ],
  },
  {
    errataId: 'v2.1-errata1',
    version: 'v2.1',
    number: 5,
    title: 'Confirmation of Payee — aud claim tightened from array to single string',
    summary: 'The aud claim on every *BodySigned JWT payload on CoP is now a single string (previously an array of strings).',
    description:
      'The aud (audience) claim on every *BodySigned schema used by POST /confirmation and POST /discovery — AEError400ResponseBodySigned, AEError403ResponseBodySigned, AEError500ResponseBodySigned, DiscoverConfirmationSourceRequestBodySigned, DiscoverConfirmationSourceResponseBodySigned, NameConfirmationRequestBodySigned, and NameConfirmationResponseBodySigned — was previously typed as an array of strings. It is now a single string, matching what every JWT observed on this API actually carries.',
    rationale:
      'Every signed message on this surface has exactly one recipient — a specific authorisation server on requests, and a specific TPP client identifier on responses — so the array-of-strings form was over-modelled. RFC 7519 §4.1.3 permits aud to be a single StringOrURI when the JWT has a single audience. The array-only modelling did not reflect real wire traffic; any consumer strict-validating against it could not have decoded Model Bank responses. The correction brings the spec into line with production behaviour.',
    effectiveDate: 'To be confirmed on merge to main.',
    spec: 'uae-confirmation-of-payee-openapi',
    endpoints: [
      { label: 'POST /confirmation', path: '/tech/api-specs/v2.1/tpp/confirmation-of-payee/confirmation' },
      { label: 'POST /discovery', path: '/tech/api-specs/v2.1/tpp/confirmation-of-payee/discovery' },
    ],
    schemas: [
      'AEError400ResponseBodySigned',
      'AEError403ResponseBodySigned',
      'AEError500ResponseBodySigned',
      'DiscoverConfirmationSourceRequestBodySigned',
      'DiscoverConfirmationSourceResponseBodySigned',
      'NameConfirmationRequestBodySigned',
      'NameConfirmationResponseBodySigned',
    ],
    githubSources: [
      {
        label: 'supporting/breaking-changes/standards/v2.1-errata1/uae-confirmation-of-payee-openapi/breaking-changes.yaml',
        url: `${OZONE}/supporting/breaking-changes/standards/v2.1-errata1/uae-confirmation-of-payee-openapi/breaking-changes.yaml`,
      },
      {
        label: 'dist/standards/v2.1-errata1/uae-confirmation-of-payee-openapi.yaml',
        url: `${OZONE}/dist/standards/v2.1-errata1/uae-confirmation-of-payee-openapi.yaml`,
      },
    ],
    relatedStandards: [
      { label: 'Banking — Confirmation of Payee', path: '/tech/tpp-standards/v2.1/banking/confirmation-of-payee/' },
    ],
    affectedPaths: [
      '/tech/api-specs/v2.1/tpp/confirmation-of-payee/confirmation',
      '/tech/api-specs/v2.1/tpp/confirmation-of-payee/discovery',
      '/tech/tpp-standards/v2.1/banking/confirmation-of-payee/open-api/confirmation',
      '/tech/tpp-standards/v2.1/banking/confirmation-of-payee/open-api/discovery',
    ],
  },
  {
    errataId: 'v2.1-errata1',
    version: 'v2.1',
    number: 6,
    title: 'Monetary Amount pattern — double-escaped regex corrected across five specs',
    summary: 'The Amount monetary regex, previously published with doubled backslashes, is corrected to ^\\d{1,13}$|^\\d{1,13}\\.\\d{1,5}$ across the affected specs.',
    description:
      'The monetary Amount schema carried a doubled-backslash pattern (a YAML-escape artefact) that no JSON-Schema validator would have interpreted as the intended numeric regex. The pattern is corrected to ^\\d{1,13}$|^\\d{1,13}\\.\\d{1,5}$ — matching the canonical regex used by every conforming implementation.\n\n' +
      'The correction spans five specs that each carried the same defect: uae-fx-service-initiation-openapi, uae-api-hub-consent-manager-openapi, uae-ozone-connect-bank-service-initiation-openapi, uae-ozone-connect-consent-events-actions-openapi, and uae-ozone-connect-user-operations-openapi.',
    rationale:
      'The published regex was non-functional: strict validators either rejected every amount or accepted any string depending on how they handled the literal backslash sequences. Production systems rely on the canonical single-backslash form; the correction brings every Amount definition on these five specs into line with that canonical form, tracked as OF-6288.',
    effectiveDate: 'To be confirmed on merge to main.',
    specs: [
      'uae-fx-service-initiation-openapi',
      'uae-api-hub-consent-manager-openapi',
      'uae-ozone-connect-bank-service-initiation-openapi',
      'uae-ozone-connect-consent-events-actions-openapi',
      'uae-ozone-connect-user-operations-openapi',
    ],
    githubSources: [
      {
        label: 'dist/standards/v2.1-errata1/uae-fx-service-initiation-openapi.yaml',
        url: `${OZONE}/dist/standards/v2.1-errata1/uae-fx-service-initiation-openapi.yaml`,
      },
      {
        label: 'dist/api-hub/v2.1.x-errata1/uae-api-hub-consent-manager-openapi.yaml',
        url: `${OZONE}/dist/api-hub/v2.1.x-errata1/uae-api-hub-consent-manager-openapi.yaml`,
      },
      {
        label: 'dist/ozone-connect/v2.1.x-errata1/uae-ozone-connect-bank-service-initiation-openapi.yaml',
        url: `${OZONE}/dist/ozone-connect/v2.1.x-errata1/uae-ozone-connect-bank-service-initiation-openapi.yaml`,
      },
      {
        label: 'dist/ozone-connect/v2.1.x-errata1/uae-ozone-connect-consent-events-actions-openapi.yaml',
        url: `${OZONE}/dist/ozone-connect/v2.1.x-errata1/uae-ozone-connect-consent-events-actions-openapi.yaml`,
      },
      {
        label: 'dist/ozone-connect/v2.1.x-errata1/uae-ozone-connect-user-operations-openapi.yaml',
        url: `${OZONE}/dist/ozone-connect/v2.1.x-errata1/uae-ozone-connect-user-operations-openapi.yaml`,
      },
    ],
    affectedPaths: [],
  },
  {
    errataId: 'v2.1-errata1',
    version: 'v2.1',
    number: 7,
    title: 'Webhook Template — Permissions array flattening',
    summary: 'The Permissions field on consent webhook payloads is now a flat array of strings, matching §1.',
    description:
      'The Permissions field on consent webhook payloads was previously typed as an array of arrays of strings and is now a flat array of strings. This matches the equivalent correction on the Account Information consent responses (see §1) so the webhook payload and the consent resource share the same Permissions shape.',
    rationale:
      'Webhook payloads must mirror the structure of the underlying consent resource. The nested-array form in the webhook spec was the same defect corrected in §1 and would have caused subscribers parsing strictly against the published schema to fail.',
    effectiveDate: 'To be confirmed on merge to main.',
    spec: 'uae-webhook-template-openapi',
    endpoints: [
      { label: 'Consent Status Webhook', path: '/tech/api-specs/v2.1/tpp/webhooks/consent-status' },
      { label: 'Payment Status Webhook', path: '/tech/api-specs/v2.1/tpp/webhooks/payment-status' },
    ],
    githubSources: [
      {
        label: 'supporting/breaking-changes/standards/v2.1-errata1/uae-webhook-template-openapi/breaking-changes.yaml',
        url: `${OZONE}/supporting/breaking-changes/standards/v2.1-errata1/uae-webhook-template-openapi/breaking-changes.yaml`,
      },
      {
        label: 'dist/standards/v2.1-errata1/uae-webhook-template-openapi.yaml',
        url: `${OZONE}/dist/standards/v2.1-errata1/uae-webhook-template-openapi.yaml`,
      },
    ],
    relatedStandards: [
      { label: 'Webhooks', path: '/tech/tpp-standards/v2.1/webhooks/' },
    ],
    affectedPaths: [
      '/tech/api-specs/v2.1/tpp/webhooks/consent-status',
      '/tech/api-specs/v2.1/tpp/webhooks/payment-status',
      '/tech/tpp-standards/v2.1/webhooks/consent-status/open-api',
      '/tech/tpp-standards/v2.1/webhooks/payment-status/open-api',
    ],
  },
  {
    errataId: 'v2.1-errata1',
    version: 'v2.1',
    number: 8,
    title: 'API Hub Consent Manager — unused AERiskExternalAccountIdentificationCode schema removed',
    summary: 'The unused namespaced AERiskExternalAccountIdentificationCode schema has been removed from the Consent Manager spec.',
    description:
      'The namespaced AEBankServiceInitiationRichAuthorizationRequests.AERiskExternalAccountIdentificationCode schema has been deleted. It duplicated the canonical AERiskExternalAccountIdentificationCode and was never referenced from any other schema.',
    rationale:
      'The duplicated schema was dead weight in the OpenAPI and invited accidental divergence from the canonical definition. Removing it leaves a single source of truth for the type without changing any wire contract.',
    effectiveDate: 'To be confirmed on merge to main.',
    spec: 'uae-api-hub-consent-manager-openapi',
    schemas: ['AERiskExternalAccountIdentificationCode'],
    githubSources: [
      {
        label: 'dist/api-hub/v2.1.x-errata1/uae-api-hub-consent-manager-openapi.yaml',
        url: `${OZONE}/dist/api-hub/v2.1.x-errata1/uae-api-hub-consent-manager-openapi.yaml`,
      },
    ],
    affectedPaths: [],
  },
  {
    errataId: 'v2.1-errata1',
    version: 'v2.1',
    number: 9,
    title: 'API Hub Consent Manager — AEExternalAccountTypeCode collapsed into AEAccountTypeCode; SME added',
    summary: 'The duplicate AEExternalAccountTypeCode enum has been folded into AEAccountTypeCode, which now declares [Retail, SME, Corporate].',
    description:
      'Two overlapping AccountType enums have been consolidated. AEAccountTypeCode (previously [Retail, Corporate], referenced by the stored consentBody) and AEExternalAccountTypeCode (previously [Retail, SME, Corporate], referenced by the RAR request body) are now a single AEAccountTypeCode declaring [Retail, SME, Corporate]. The RAR request body has been repointed to AEAccountTypeCode.',
    rationale:
      'The split caused internal inconsistency — a RAR request carrying AccountType: SME validated against the request schema but failed against the consentBody schema in the same payload. Collapsing the two and adopting SME on the canonical enum lets a single AccountType value flow through the whole consent lifecycle cleanly.',
    effectiveDate: 'To be confirmed on merge to main.',
    spec: 'uae-api-hub-consent-manager-openapi',
    schemas: ['AEAccountTypeCode'],
    githubSources: [
      {
        label: 'dist/api-hub/v2.1.x-errata1/uae-api-hub-consent-manager-openapi.yaml',
        url: `${OZONE}/dist/api-hub/v2.1.x-errata1/uae-api-hub-consent-manager-openapi.yaml`,
      },
    ],
    affectedPaths: [],
  },
  {
    errataId: 'v2.1-errata1',
    version: 'v2.1',
    number: 10,
    title: 'API Hub Consent Manager — duplicate OnBehalfOf collapsed into AEOnBehalfOf',
    summary: 'The unprefixed OnBehalfOf schema has been folded into the canonical AEOnBehalfOf.',
    description:
      'Two structurally equivalent OnBehalfOf schemas have been consolidated. The unprefixed OnBehalfOf (used only by the Insurance RAR) has been deleted, and the Insurance RAR repointed to the canonical AEOnBehalfOf already used by Bank Data Sharing and the consent body paths. Both carried the same TradingName / LegalName / IdentifierType / Identifier shape and the same IdentifierType: [Other] constraint.',
    rationale:
      'Two definitions of the same shape invited silent drift between the Bank and Insurance RAR contracts. The collapse eliminates that risk without changing any wire contract.',
    effectiveDate: 'To be confirmed on merge to main.',
    spec: 'uae-api-hub-consent-manager-openapi',
    schemas: ['AEOnBehalfOf'],
    githubSources: [
      {
        label: 'dist/api-hub/v2.1.x-errata1/uae-api-hub-consent-manager-openapi.yaml',
        url: `${OZONE}/dist/api-hub/v2.1.x-errata1/uae-api-hub-consent-manager-openapi.yaml`,
      },
    ],
    affectedPaths: [],
  },
  {
    errataId: 'v2.1-errata1',
    version: 'v2.1',
    number: 11,
    title: 'Consent Manager & Consent Events Actions — duplicate EventNotification and Amount schemas collapsed',
    summary: 'Two pairs of duplicate schemas have been consolidated on the canonical AE-prefixed definitions.',
    description:
      'Two pairs of structurally identical schemas have been consolidated across the Consent Manager and the Ozone Connect Consent Events Actions spec:\n\n' +
      '- EventNotification (the Webhook subscription shape — Webhook.Url + Webhook.IsActive) has been folded into AEEventNotification. The Data Sharing, Insurance, and Service Initiation AuthorizationDetails schemas have been repointed.\n\n' +
      '- Amount (monetary-amount string pattern) has been folded into AEActiveOrHistoricAmount. The Service Initiation RemittanceAmount has been repointed.',
    rationale:
      'Carrying two definitions of the same shape in each spec invited silent drift between the families that referenced each side. The collapse leaves a single canonical AE-prefixed definition per concept across both specs.',
    effectiveDate: 'To be confirmed on merge to main.',
    specs: [
      'uae-api-hub-consent-manager-openapi',
      'uae-ozone-connect-consent-events-actions-openapi',
    ],
    schemas: ['AEEventNotification', 'AEActiveOrHistoricAmount'],
    githubSources: [
      {
        label: 'dist/api-hub/v2.1.x-errata1/uae-api-hub-consent-manager-openapi.yaml',
        url: `${OZONE}/dist/api-hub/v2.1.x-errata1/uae-api-hub-consent-manager-openapi.yaml`,
      },
      {
        label: 'dist/ozone-connect/v2.1.x-errata1/uae-ozone-connect-consent-events-actions-openapi.yaml',
        url: `${OZONE}/dist/ozone-connect/v2.1.x-errata1/uae-ozone-connect-consent-events-actions-openapi.yaml`,
      },
    ],
    affectedPaths: [],
  },
  {
    errataId: 'v2.1-errata1',
    version: 'v2.1',
    number: 12,
    title: 'Ozone Connect User Operations — duplicate AEAddressItem and Amount schemas collapsed',
    summary: 'Two pairs of duplicate schemas under the OzoneConnectConsentEventActionAPIs namespace have been consolidated.',
    description:
      'Two pairs of structurally identical schemas under the OzoneConnectConsentEventActionAPIs namespace have been consolidated:\n\n' +
      '- AEAddressItem (array-of-postal-address) has been folded into AEAddress. Debtor.PostalAddress and Creditor.PostalAddress have been repointed.\n\n' +
      '- Amount (monetary-amount string pattern) has been folded into AEActiveOrHistoricAmount.',
    rationale:
      'Two definitions of the same shape in the same spec invited silent drift. The collapse leaves a single canonical definition per concept.',
    effectiveDate: 'To be confirmed on merge to main.',
    spec: 'uae-ozone-connect-user-operations-openapi',
    schemas: ['AEAddress', 'AEActiveOrHistoricAmount'],
    githubSources: [
      {
        label: 'dist/ozone-connect/v2.1.x-errata1/uae-ozone-connect-user-operations-openapi.yaml',
        url: `${OZONE}/dist/ozone-connect/v2.1.x-errata1/uae-ozone-connect-user-operations-openapi.yaml`,
      },
    ],
    affectedPaths: [],
  },
  {
    errataId: 'v2.1-errata1',
    version: 'v2.1',
    number: 13,
    title: 'Ozone Connect Health Check — echo-cert clientCertificate described as mTLS client cert, not server cert',
    summary: 'The clientCertificate.subject description and example on GET /echo-cert now describe the caller’s mTLS client certificate; the issuer example has been refreshed to the Sandbox Trust Framework issuing CA.',
    description:
      'The clientCertificate.subject and clientCertificate.issuer descriptions and examples on the HealthCheckCertResponse schema (GET /echo-cert) have been corrected. The subject previously read "The subject of the certificate, which should equate to a DNS name." with an example of CN = auth.open-finance-apihub.ae — prose that described a server certificate rather than the client certificate the endpoint actually echoes. The description now states that the field carries the Distinguished Name of the client certificate presented by the caller during the mTLS handshake, and that for Open Finance UAE callers the OU contains the caller’s organisation ID from the Trust Framework directory. The example has been updated to a representative Open Finance UAE client-cert DN (C=UK, O=OZONE FINANCIAL TECHNOLOGY LIMITED, OU=<organisation-id>), and the issuer example has been refreshed to the Sandbox Trust Framework issuing CA for symmetry. The schema shape is unchanged.',
    rationale:
      'The endpoint echoes the client certificate the server received during the mTLS handshake, but the published prose and example described a DNS-in-CN server certificate. In the Open Finance UAE trust framework the caller’s identity is carried in the OU as the Trust Framework organisation ID, not in the CN as a DNS name — so the example would have misled integrators inspecting /echo-cert output during onboarding. The correction is documentation-only; no wire contract has changed.',
    effectiveDate: 'To be confirmed on merge to main.',
    spec: 'uae-ozone-connect-health-check-openapi',
    endpoints: [
      { label: 'GET /echo-cert', path: '/tech/api-specs/v2.1/ozone-connect/health-check/echo-cert' },
    ],
    schemas: ['HealthCheckCertResponse'],
    githubSources: [
      {
        label: 'dist/ozone-connect/v2.1.x-errata1/uae-ozone-connect-health-check-openapi.yaml',
        url: `${OZONE}/dist/ozone-connect/v2.1.x-errata1/uae-ozone-connect-health-check-openapi.yaml`,
      },
    ],
    affectedPaths: [
      '/tech/api-specs/v2.1/ozone-connect/health-check/echo-cert',
      '/tech/lfi-api-hub/v2.1/health-check/open-api/echo-cert',
    ],
  },
]

// Normalise a route path for comparison: strip trailing slash (except for root) and .html suffix.
function normalise(path: string): string {
  let p = path.replace(/\.html$/, '')
  if (p.length > 1 && p.endsWith('/')) p = p.slice(0, -1)
  return p
}

export function anchorFor(section: ErrataSection): string {
  return `section-${section.number}`
}

export function errataPageUrl(section: ErrataSection): string {
  return `/tech/release-notes-and-erratas/erratas/${section.version}/${section.errataId}#${anchorFor(section)}`
}

export function sectionsFor(errataId: string): ErrataSection[] {
  return ERRATA_SECTIONS
    .filter((s) => s.errataId === errataId)
    .sort((a, b) => a.number - b.number)
}

export function errataForPath(path: string): ErrataSection[] {
  const target = normalise(path)
  return ERRATA_SECTIONS.filter((s) => s.affectedPaths.some((p) => normalise(p) === target))
}
