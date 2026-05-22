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
  errataId: string                        // which errata doc this section belongs to, e.g. "v2.1-errata2"
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
    errataId: 'v2.1-errata2',
    version: 'v2.1',
    number: 1,
    title: 'Account Information — Permissions array flattening',
    summary: 'The Permissions field on consent responses is now a flat array of strings (previously a nested array of arrays).',
    description:
      'The Permissions field on consent responses was previously typed as an array of arrays of strings — an array containing a nested array of permission codes. It is now a flat array of strings, matching the normative text and how clients have always populated it on the request side.',
    rationale:
      'The nested-array form was a defect in the published OpenAPI. The v2.1 normative text and every consumer of the response treat Permissions as a flat array of permission codes, and the API Hub already enforces the flat structure. The schema is being corrected to match.',
    effectiveDate: '2026-04-28',
    spec: 'uae-account-information-openapi',
    endpoints: [
      { label: 'GET /account-access-consents', path: '/tech/api-specs/v2.1/tpp/consent/account-access-consents' },
      { label: 'GET /account-access-consents/{ConsentId}', path: '/tech/api-specs/v2.1/tpp/consent/account-access-consents-ConsentId' },
    ],
    schemas: ['AEBankDataSharingConsentPermissionCodes'],
    githubSources: [
      {
        label: 'supporting/breaking-changes/standards/v2.1-errata2/uae-account-information-openapi/breaking-changes.yaml',
        url: `${OZONE}/supporting/breaking-changes/standards/v2.1-errata2/uae-account-information-openapi/breaking-changes.yaml`,
      },
      {
        label: 'dist/standards/v2.1-errata2/uae-account-information-openapi.yaml',
        url: `${OZONE}/dist/standards/v2.1-errata2/uae-account-information-openapi.yaml`,
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
    errataId: 'v2.1-errata2',
    version: 'v2.1',
    number: 2,
    title: 'Account Information — TrustFrameworkCode enum corrected to FI',
    summary: 'The TrustFrameworkCode enum on party responses now declares FI (previously the unemittable Undefined).',
    description:
      'The TrustFrameworkCode enum used by VerifiedClaimVerification.TrustFramework on GET /parties and GET /accounts/{AccountId}/parties previously declared a single value Undefined — a value no conforming LFI could return. The enum has been replaced with FI, matching what Ozone Connect emits on CbuaeVerifiedClaim.verification.trustFramework and what every real response reaching a TPP has always contained.',
    rationale:
      'The v2.1 enum was internally inconsistent with the Ozone Connect spec the Hub proxies from: every real response carried FI while the standards enum declared only Undefined. Formally this is an enum-value removal, but in practice no consumer could have relied on Undefined because no conforming implementation could have produced it. Richer values (UAE Pass digital identity, Emirates ID physical verification) are deferred to v3.0.',
    effectiveDate: '2026-04-28',
    spec: 'uae-account-information-openapi',
    endpoints: [
      { label: 'GET /parties', path: '/tech/api-specs/v2.1/tpp/data-sharing/parties' },
      { label: 'GET /accounts/{AccountId}/parties', path: '/tech/api-specs/v2.1/tpp/data-sharing/accounts-AccountId-parties' },
    ],
    schemas: ['TrustFrameworkCode'],
    githubSources: [
      {
        label: 'supporting/breaking-changes/standards/v2.1-errata2/uae-account-information-openapi/breaking-changes.yaml',
        url: `${OZONE}/supporting/breaking-changes/standards/v2.1-errata2/uae-account-information-openapi/breaking-changes.yaml`,
      },
      {
        label: 'dist/standards/v2.1-errata2/uae-account-information-openapi.yaml',
        url: `${OZONE}/dist/standards/v2.1-errata2/uae-account-information-openapi.yaml`,
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
    errataId: 'v2.1-errata2',
    version: 'v2.1',
    number: 3,
    title: 'Authorization Endpoints — POST /token restructured as oneOf; client_credentials grant added; client_id optional',
    summary: 'POST /token response is now a oneOf across grant types, client_credentials is documented, and client_id is optional to reflect mTLS client authentication.',
    description:
      'Three aligned corrections on POST /token:\n\n' +
      '1. The response body is now defined as a oneOf across three grant-type-specific schemas — AEAuthorizationCodeGrantTokenResponseProperties, AERefreshTokenGrantTokenResponseProperties, and AEClientCredentialsGrantTokenResponseProperties. Previously a single combined schema described the response, which marked fields like id_token and refresh_token as required for every grant even though they are only valid for some.\n\n' +
      '2. The client_credentials grant is now explicitly documented as a supported grant type on POST /token. v2.1 declared only authorization_code and refresh_token, yet the API Hub has always accepted client_credentials — the spec has been brought into line.\n\n' +
      '3. The client_id request parameter is now optional. Under FAPI 2.0 with mTLS client authentication the client is identified by its certificate, so client_id no longer needs to be sent in the request.',
    rationale:
      'All three corrections align the spec with how the API Hub has behaved in production since v2.1 was published. The single-schema response form misrepresented the contract (each grant type returns a different shape); omitting client_credentials hid a supported grant; and requiring client_id contradicted the FAPI 2.0 mTLS profile the Hub has always operated under. This is a documentation-level correction — no behavioural change is being made.',
    effectiveDate: '2026-04-28',
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
        label: 'supporting/breaking-changes/standards/v2.1-errata2/uae-authorization-endpoints-openapi/breaking-changes.yaml',
        url: `${OZONE}/supporting/breaking-changes/standards/v2.1-errata2/uae-authorization-endpoints-openapi/breaking-changes.yaml`,
      },
      {
        label: 'dist/standards/v2.1-errata2/uae-authorization-endpoints-openapi.yaml',
        url: `${OZONE}/dist/standards/v2.1-errata2/uae-authorization-endpoints-openapi.yaml`,
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
    errataId: 'v2.1-errata2',
    version: 'v2.1',
    number: 4,
    title: 'Confirmation of Payee — 204 response description corrected',
    summary: 'The 204 response description on POST /confirmation now reads "IBAN is not recognised" rather than the previous opt-out wording.',
    description:
      'The description of the 204 No Content response on POST /confirmation has been corrected to "IBAN is not recognised". Previously it read "Account holder has opted-out of Confirmation of Payee and no data is returned", which confused the semantics of the status code — 204 is returned when the supplied IBAN is not recognised by the LFI, not when an account holder has opted out.',
    rationale:
      'The opt-out wording misled integrators about when to expect a 204. No opt-out mechanism is defined on this surface; the 204 is the unrecognised-IBAN response and the prose has been aligned with actual behaviour.',
    effectiveDate: '2026-04-28',
    spec: 'uae-confirmation-of-payee-openapi',
    endpoints: [
      { label: 'POST /confirmation', path: '/tech/api-specs/v2.1/tpp/confirmation-of-payee/confirmation' },
    ],
    githubSources: [
      {
        label: 'dist/standards/v2.1-errata2/uae-confirmation-of-payee-openapi.yaml',
        url: `${OZONE}/dist/standards/v2.1-errata2/uae-confirmation-of-payee-openapi.yaml`,
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
    errataId: 'v2.1-errata2',
    version: 'v2.1',
    number: 5,
    title: 'Confirmation of Payee — aud claim tightened from array to single string',
    summary: 'The aud claim on every *BodySigned JWT payload on CoP is now a single string (previously an array of strings).',
    description:
      'The aud (audience) claim on every *BodySigned schema used by POST /confirmation and POST /discovery — AEError400ResponseBodySigned, AEError403ResponseBodySigned, AEError500ResponseBodySigned, DiscoverConfirmationSourceRequestBodySigned, DiscoverConfirmationSourceResponseBodySigned, NameConfirmationRequestBodySigned, and NameConfirmationResponseBodySigned — was previously typed as an array of strings. It is now a single string, matching what every JWT observed on this API actually carries.',
    rationale:
      'Every signed message on this surface has exactly one recipient — a specific authorisation server on requests, and a specific TPP client identifier on responses — so the array-of-strings form was over-modelled. RFC 7519 §4.1.3 permits aud to be a single StringOrURI when the JWT has a single audience. The array-only modelling did not reflect real wire traffic; any consumer strict-validating against it could not have decoded Model Bank responses. The correction brings the spec into line with production behaviour.',
    effectiveDate: '2026-04-28',
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
        label: 'supporting/breaking-changes/standards/v2.1-errata2/uae-confirmation-of-payee-openapi/breaking-changes.yaml',
        url: `${OZONE}/supporting/breaking-changes/standards/v2.1-errata2/uae-confirmation-of-payee-openapi/breaking-changes.yaml`,
      },
      {
        label: 'dist/standards/v2.1-errata2/uae-confirmation-of-payee-openapi.yaml',
        url: `${OZONE}/dist/standards/v2.1-errata2/uae-confirmation-of-payee-openapi.yaml`,
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
    errataId: 'v2.1-errata2',
    version: 'v2.1',
    number: 6,
    title: 'Over-escaped regex patterns — doubled-backslash defect corrected across affected schemas',
    summary: 'Regex patterns published with doubled-backslash YAML escapes — the monetary Amount pattern across five specs, and the rarType and CoP response patterns on Ozone Connect User Operations — have been corrected to their canonical single-backslash form.',
    description:
      'A family of regex patterns carried doubled-backslash YAML-escape artefacts that no JSON-Schema validator would have interpreted as the intended expression. The patterns are corrected to their canonical single-backslash form, matching what every conforming implementation relies on.\n\n' +
      'Monetary Amount (^\\d{1,13}$|^\\d{1,13}\\.\\d{1,5}$): fixed across five specs — uae-fx-service-initiation-openapi, uae-api-hub-consent-manager-openapi, uae-ozone-connect-bank-service-initiation-openapi, uae-ozone-connect-consent-events-actions-openapi, and uae-ozone-connect-user-operations-openapi.\n\n' +
      'rarType (^urn:openfinanceuae:(?:account-access|insurance|service-initiation)-consent:v[0-9]+\\.[0-9]+$): fixed on five rarType occurrences in uae-ozone-connect-user-operations-openapi.\n\n' +
      'CoP response (^.+\\..+\\..+$): fixed on OzoneConnectConsentEventActionAPIs.AEConfirmationOfPayeeResponse in uae-ozone-connect-user-operations-openapi.',
    rationale:
      'The published regexes were non-functional: strict validators either rejected legitimate inputs or accepted any string depending on how they handled the literal backslash sequences. Production systems rely on the canonical single-backslash form; the correction brings every affected pattern into line with that form. The monetary Amount corrections are tracked as OF-6288; the rarType and CoP response corrections roll up under the same v2.1.3 change bullet on User Operations.',
    effectiveDate: '2026-04-28',
    specs: [
      'uae-fx-service-initiation-openapi',
      'uae-api-hub-consent-manager-openapi',
      'uae-ozone-connect-bank-service-initiation-openapi',
      'uae-ozone-connect-consent-events-actions-openapi',
      'uae-ozone-connect-user-operations-openapi',
    ],
    githubSources: [
      {
        label: 'dist/standards/v2.1-errata2/uae-fx-service-initiation-openapi.yaml',
        url: `${OZONE}/dist/standards/v2.1-errata2/uae-fx-service-initiation-openapi.yaml`,
      },
      {
        label: 'dist/api-hub/v2.1.x/uae-api-hub-consent-manager-openapi.yaml',
        url: `${OZONE}/dist/api-hub/v2.1.x/uae-api-hub-consent-manager-openapi.yaml`,
      },
      {
        label: 'dist/ozone-connect/v2.1.x/uae-ozone-connect-bank-service-initiation-openapi.yaml',
        url: `${OZONE}/dist/ozone-connect/v2.1.x/uae-ozone-connect-bank-service-initiation-openapi.yaml`,
      },
      {
        label: 'dist/ozone-connect/v2.1.x/uae-ozone-connect-consent-events-actions-openapi.yaml',
        url: `${OZONE}/dist/ozone-connect/v2.1.x/uae-ozone-connect-consent-events-actions-openapi.yaml`,
      },
      {
        label: 'dist/ozone-connect/v2.1.x/uae-ozone-connect-user-operations-openapi.yaml',
        url: `${OZONE}/dist/ozone-connect/v2.1.x/uae-ozone-connect-user-operations-openapi.yaml`,
      },
    ],
    affectedPaths: [
      // API Hub Consent Manager — operations whose payloads carry the Amount schema
      '/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consents',
      '/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consents-consentId',
      '/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/patch-consents-consentId',
      '/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consent-groups-consentGroupId-consents',
      '/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/payment-log',
      '/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/payment-log-id',
      '/tech/api-specs/v2.1/api-hub/consent-manager/open-api/consents',
      '/tech/api-specs/v2.1/api-hub/consent-manager/open-api/consents-consentId',
      '/tech/api-specs/v2.1/api-hub/consent-manager/open-api/patch-consents-consentId',
      '/tech/api-specs/v2.1/api-hub/consent-manager/open-api/consent-groups-consentGroupId-consents',
      '/tech/api-specs/v2.1/api-hub/consent-manager/open-api/payment-log',
      '/tech/api-specs/v2.1/api-hub/consent-manager/open-api/payment-log-id',
      // Ozone Connect Bank Service Initiation
      '/tech/lfi-api-hub/v2.1/banking/service-initiation/open-api/payments',
      '/tech/lfi-api-hub/v2.1/banking/service-initiation/open-api/payments-PaymentId',
      '/tech/lfi-api-hub/v2.1/banking/service-initiation/open-api/payment-consents-ConsentId-refund',
      '/tech/api-specs/v2.1/ozone-connect/service-initiation/payments',
      '/tech/api-specs/v2.1/ozone-connect/service-initiation/payments-PaymentId',
      '/tech/api-specs/v2.1/ozone-connect/service-initiation/payment-consents-ConsentId-refund',
      // Ozone Connect Consent Events Actions
      '/tech/lfi-api-hub/v2.1/consent-events/open-api/validate',
      '/tech/lfi-api-hub/v2.1/consent-events/open-api/event-op',
      '/tech/api-specs/v2.1/ozone-connect/consent-events/validate',
      '/tech/api-specs/v2.1/ozone-connect/consent-events/event-op',
    ],
  },
  {
    errataId: 'v2.1-errata2',
    version: 'v2.1',
    number: 7,
    title: 'Webhook Template — Permissions array flattening',
    summary: 'The Permissions field on consent webhook payloads is now a flat array of strings, matching §1.',
    description:
      'The Permissions field on consent webhook payloads was previously typed as an array of arrays of strings and is now a flat array of strings. This matches the equivalent correction on the Account Information consent responses (see §1) so the webhook payload and the consent resource share the same Permissions shape.',
    rationale:
      'Webhook payloads must mirror the structure of the underlying consent resource. The nested-array form in the webhook spec was the same defect corrected in §1 and would have caused subscribers parsing strictly against the published schema to fail.',
    effectiveDate: '2026-04-28',
    spec: 'uae-webhook-template-openapi',
    endpoints: [
      { label: 'Consent Status Webhook', path: '/tech/api-specs/v2.1/tpp/webhooks/consent-status' },
      { label: 'Payment Status Webhook', path: '/tech/api-specs/v2.1/tpp/webhooks/payment-status' },
    ],
    githubSources: [
      {
        label: 'supporting/breaking-changes/standards/v2.1-errata2/uae-webhook-template-openapi/breaking-changes.yaml',
        url: `${OZONE}/supporting/breaking-changes/standards/v2.1-errata2/uae-webhook-template-openapi/breaking-changes.yaml`,
      },
      {
        label: 'dist/standards/v2.1-errata2/uae-webhook-template-openapi.yaml',
        url: `${OZONE}/dist/standards/v2.1-errata2/uae-webhook-template-openapi.yaml`,
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
    errataId: 'v2.1-errata2',
    version: 'v2.1',
    number: 8,
    title: 'API Hub Consent Manager — unused AERiskExternalAccountIdentificationCode schema removed',
    summary: 'The unused namespaced AERiskExternalAccountIdentificationCode schema has been removed from the Consent Manager spec.',
    description:
      'The namespaced AEBankServiceInitiationRichAuthorizationRequests.AERiskExternalAccountIdentificationCode schema has been deleted. It duplicated the canonical AERiskExternalAccountIdentificationCode and was never referenced from any other schema.',
    rationale:
      'The duplicated schema was dead weight in the OpenAPI and invited accidental divergence from the canonical definition. Removing it leaves a single source of truth for the type without changing any wire contract.',
    effectiveDate: '2026-04-28',
    spec: 'uae-api-hub-consent-manager-openapi',
    schemas: ['AERiskExternalAccountIdentificationCode'],
    githubSources: [
      {
        label: 'dist/api-hub/v2.1.x/uae-api-hub-consent-manager-openapi.yaml',
        url: `${OZONE}/dist/api-hub/v2.1.x/uae-api-hub-consent-manager-openapi.yaml`,
      },
    ],
    affectedPaths: [
      // Consent Manager — consent operations whose RAR payloads carry risk identifiers
      '/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consents',
      '/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consents-consentId',
      '/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/patch-consents-consentId',
      '/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consent-groups-consentGroupId-consents',
      '/tech/api-specs/v2.1/api-hub/consent-manager/open-api/consents',
      '/tech/api-specs/v2.1/api-hub/consent-manager/open-api/consents-consentId',
      '/tech/api-specs/v2.1/api-hub/consent-manager/open-api/patch-consents-consentId',
      '/tech/api-specs/v2.1/api-hub/consent-manager/open-api/consent-groups-consentGroupId-consents',
    ],
  },
  {
    errataId: 'v2.1-errata2',
    version: 'v2.1',
    number: 9,
    title: 'Ozone Connect Health Check — echo-cert clientCertificate described as mTLS client cert, not server cert',
    summary: 'The clientCertificate.subject description and example on GET /echo-cert now describe the caller’s mTLS client certificate; the issuer example has been refreshed to the Sandbox Trust Framework issuing CA.',
    description:
      'The clientCertificate.subject and clientCertificate.issuer descriptions and examples on the HealthCheckCertResponse schema (GET /echo-cert) have been corrected. The subject previously read "The subject of the certificate, which should equate to a DNS name." with an example of CN = auth.open-finance-apihub.ae — prose that described a server certificate rather than the client certificate the endpoint actually echoes. The description now states that the field carries the Distinguished Name of the client certificate presented by the caller during the mTLS handshake, and that for Open Finance UAE callers the OU contains the caller’s organisation ID from the Trust Framework directory. The example has been updated to a representative Open Finance UAE client-cert DN (C=UK, O=OZONE FINANCIAL TECHNOLOGY LIMITED, OU=<organisation-id>), and the issuer example has been refreshed to the Sandbox Trust Framework issuing CA for symmetry. The schema shape is unchanged.',
    rationale:
      'The endpoint echoes the client certificate the server received during the mTLS handshake, but the published prose and example described a DNS-in-CN server certificate. In the Open Finance UAE trust framework the caller’s identity is carried in the OU as the Trust Framework organisation ID, not in the CN as a DNS name — so the example would have misled integrators inspecting /echo-cert output during onboarding. The correction is documentation-only; no wire contract has changed.',
    effectiveDate: '2026-04-28',
    spec: 'uae-ozone-connect-health-check-openapi',
    endpoints: [
      { label: 'GET /echo-cert', path: '/tech/api-specs/v2.1/ozone-connect/health-check/echo-cert' },
    ],
    schemas: ['HealthCheckCertResponse'],
    githubSources: [
      {
        label: 'dist/ozone-connect/v2.1.x/uae-ozone-connect-health-check-openapi.yaml',
        url: `${OZONE}/dist/ozone-connect/v2.1.x/uae-ozone-connect-health-check-openapi.yaml`,
      },
    ],
    affectedPaths: [
      '/tech/api-specs/v2.1/ozone-connect/health-check/echo-cert',
      '/tech/lfi-api-hub/v2.1/health-check/open-api/echo-cert',
    ],
  },
  {
    errataId: 'v2.1-errata2',
    version: 'v2.1',
    number: 10,
    title: 'Ozone Connect Bank Data Sharing — meta block added to GET /accounts/{AccountId}/statements',
    summary: 'The GET /accounts/{AccountId}/statements response now carries an optional meta block with firstAvailableDateTime and lastAvailableDateTime, letting LFIs advertise the date range of available statement data on the account.',
    description:
      'The GET /accounts/{AccountId}/statements response on Ozone Connect Bank Data Sharing has been extended with an optional meta block. The block composes the shared Meta schema via allOf and adds two date-time properties — firstAvailableDateTime and lastAvailableDateTime — carrying the first and last date-times for which the LFI can return statement data on the account.',
    rationale:
      'Statement history depth varies across LFIs and across accounts within an LFI. Without a response-level signal, consumers have to discover the available range by probing. Surfacing the range on the response lets the Hub (and, downstream, TPPs) bound requests to data that is known to exist. The addition is backward-compatible: meta is optional and existing consumers that ignore it see no change.',
    effectiveDate: '2026-04-28',
    spec: 'uae-ozone-connect-bank-data-sharing-openapi',
    endpoints: [
      { label: 'GET /accounts/{AccountId}/statements', path: '/tech/api-specs/v2.1/ozone-connect/data-sharing/accounts-AccountId-statements' },
    ],
    githubSources: [
      {
        label: 'dist/ozone-connect/v2.1.x/uae-ozone-connect-bank-data-sharing-openapi.yaml',
        url: `${OZONE}/dist/ozone-connect/v2.1.x/uae-ozone-connect-bank-data-sharing-openapi.yaml`,
      },
    ],
    affectedPaths: [
      '/tech/api-specs/v2.1/ozone-connect/data-sharing/accounts-AccountId-statements',
      '/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-statements',
    ],
  },
  {
    errataId: 'v2.1-errata2',
    version: 'v2.1',
    number: 11,
    title: 'Risk object — nested schemas tightened to match the Standards definition',
    summary:
      'The Risk object on the payment-initiation surfaces now rejects undeclared properties throughout its nested objects; the SupplementaryData blocks remain open extension points and AddressLine items are bounded.',
    description:
      'Three aligned corrections bring the Risk object on the payment-initiation surfaces into line with the Standards definition:\n\n' +
      '1. AERisk and its nested indicator objects — AEDebtorIndicators, AETransactionIndicators, AECreditorIndicators and their inline sub-objects — now carry additionalProperties: false throughout. On the Payments side (uae-bank-initiation-openapi) and on Ozone Connect these objects were silently permissive: a TPP could send undeclared properties to POST /payments, POST /file-payments or POST /payment-consents and have them accepted, even though the equivalent objects on the PAR side (uae-authorization-endpoints-openapi) have always rejected them. The strictness is now uniform.\n\n' +
      '2. The SupplementaryData blocks inside AEDebtorIndicators, AETransactionIndicators and AECreditorIndicators are explicitly open extension points — additionalProperties: false is not applied to them, so consumer-specific fields may be carried there. Where a stray additionalProperties: false had been applied to a SupplementaryData block it has been removed.\n\n' +
      '3. AddressLine items inside the AEAddress schema, reached via the Creditor address on the Risk object, are now bounded with minLength: 1 and maxLength: 70 — matching the constraints already enforced on the Payments side.',
    rationale:
      'The Risk object is the input to risk and fraud scoring, so the same object must validate identically wherever it is sent. In v2.1 it did not: PAR rejected undeclared properties while POST /payments accepted them, so a TPP could not reuse one Risk payload across both surfaces with confidence. The corrections make the Risk schema uniform across PAR, the Payment API, the API Hub Consent Manager and Ozone Connect. Formally this is a request-body tightening — a TPP that has been sending extra, undeclared properties in Risk to the Payments surfaces will now receive validation errors; the remedy is to remove those properties or move them under the relevant SupplementaryData block, which remains open. The change is sign-posted in the breaking-changes records for the affected specs and enforced by a new Risk-parity test.',
    effectiveDate: 'To be confirmed on merge to main',
    specs: [
      'uae-authorization-endpoints-openapi',
      'uae-bank-initiation-openapi',
      'uae-api-hub-consent-manager-openapi',
      'uae-ozone-connect-bank-service-initiation-openapi',
      'uae-ozone-connect-consent-events-actions-openapi',
    ],
    schemas: [
      'AERisk',
      'AEDebtorIndicators',
      'AETransactionIndicators',
      'AECreditorIndicators',
      'AEAddress',
    ],
    githubSources: [
      {
        label: 'supporting/breaking-changes/standards/v2.1-errata2/uae-bank-initiation-openapi/breaking-changes.yaml',
        url: `${OZONE}/supporting/breaking-changes/standards/v2.1-errata2/uae-bank-initiation-openapi/breaking-changes.yaml`,
      },
      {
        label: 'supporting/breaking-changes/api-hub/v2.1.x/uae-api-hub-consent-manager-openapi/breaking-changes.yaml',
        url: `${OZONE}/supporting/breaking-changes/api-hub/v2.1.x/uae-api-hub-consent-manager-openapi/breaking-changes.yaml`,
      },
      {
        label: 'dist/standards/v2.1-errata2/uae-authorization-endpoints-openapi.yaml',
        url: `${OZONE}/dist/standards/v2.1-errata2/uae-authorization-endpoints-openapi.yaml`,
      },
      {
        label: 'dist/standards/v2.1-errata2/uae-bank-initiation-openapi.yaml',
        url: `${OZONE}/dist/standards/v2.1-errata2/uae-bank-initiation-openapi.yaml`,
      },
      {
        label: 'dist/api-hub/v2.1.x/uae-api-hub-consent-manager-openapi.yaml',
        url: `${OZONE}/dist/api-hub/v2.1.x/uae-api-hub-consent-manager-openapi.yaml`,
      },
      {
        label: 'dist/ozone-connect/v2.1.x/uae-ozone-connect-bank-service-initiation-openapi.yaml',
        url: `${OZONE}/dist/ozone-connect/v2.1.x/uae-ozone-connect-bank-service-initiation-openapi.yaml`,
      },
      {
        label: 'dist/ozone-connect/v2.1.x/uae-ozone-connect-consent-events-actions-openapi.yaml',
        url: `${OZONE}/dist/ozone-connect/v2.1.x/uae-ozone-connect-consent-events-actions-openapi.yaml`,
      },
    ],
    relatedStandards: [
      { label: 'Banking — Service Initiation', path: '/tech/tpp-standards/v2.1/banking/service-initiation/' },
    ],
    affectedPaths: [
      // Standards — PAR and payment consent creation/modification
      '/tech/api-specs/v2.1/tpp/consent/par',
      '/tech/api-specs/v2.1/tpp/consent/payment-consents',
      '/tech/api-specs/v2.1/tpp/consent/payment-consents-ConsentId',
      '/tech/api-specs/v2.1/tpp/consent/patch-payment-consents-ConsentId',
      '/tech/api-specs/v2.1/tpp/service-initiation/payments',
      '/tech/tpp-standards/v2.1/consent/open-api/par',
      '/tech/tpp-standards/v2.1/consent/open-api/payment-consents',
      '/tech/tpp-standards/v2.1/consent/open-api/payment-consents-ConsentId',
      '/tech/tpp-standards/v2.1/consent/open-api/patch-payment-consents-ConsentId',
      '/tech/tpp-standards/v2.1/banking/service-initiation/open-api/payments',
      // API Hub Consent Manager — consent operations carrying the Risk object
      '/tech/api-specs/v2.1/api-hub/consent-manager/open-api/consents',
      '/tech/api-specs/v2.1/api-hub/consent-manager/open-api/consents-consentId',
      '/tech/api-specs/v2.1/api-hub/consent-manager/open-api/patch-consents-consentId',
      '/tech/api-specs/v2.1/api-hub/consent-manager/open-api/consent-groups-consentGroupId-consents',
      '/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consents',
      '/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consents-consentId',
      '/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/patch-consents-consentId',
      '/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consent-groups-consentGroupId-consents',
      // Ozone Connect — Service Initiation and Consent Events
      '/tech/api-specs/v2.1/ozone-connect/service-initiation/payments',
      '/tech/api-specs/v2.1/ozone-connect/consent-events/validate',
      '/tech/api-specs/v2.1/ozone-connect/consent-events/event-op',
      '/tech/lfi-api-hub/v2.1/banking/service-initiation/open-api/payments',
      '/tech/lfi-api-hub/v2.1/consent-events/open-api/validate',
      '/tech/lfi-api-hub/v2.1/consent-events/open-api/event-op',
    ],
  },
  {
    errataId: 'v2.1-errata2',
    version: 'v2.1',
    number: 12,
    title: 'Risk object — AccountType enum corrected to Retail / SME / Corporate',
    summary:
      'The AccountType enum on the Risk object’s Creditor indicators is now Retail / SME / Corporate, replacing a divergent product-category enum; the Ozone Connect AEAccountTypeCode gains SME.',
    description:
      'The AccountType field on the Risk object’s Creditor indicators has been aligned with the Standards definition.\n\n' +
      'On uae-authorization-endpoints-openapi and uae-api-hub-consent-manager-openapi the inline AEBankServiceInitiationRichAuthorizationRequests.AECreditorIndicators.AccountType enum previously declared a product-category list — CurrentAccount, Savings, CreditCard, Mortgage and Finance — that did not match the Standards PAR and Payments definitions. It now declares Retail, SME and Corporate.\n\n' +
      'On uae-ozone-connect-consent-events-actions-openapi and uae-bank-initiation-openapi the AEAccountTypeCode enum, which previously declared only Retail and Corporate, now also declares SME.',
    rationale:
      'The AccountType value on the Risk object classifies the creditor account and feeds risk scoring. The product-category enum (CurrentAccount, Savings and so on) was a defect — it diverged from the Retail / SME / Corporate classification used everywhere else the Risk object is defined, so a Risk payload valid on one surface was invalid on another. Adding SME to the Ozone Connect AEAccountTypeCode completes the same alignment. Replacing the product-category values is formally an enum-value removal, but no conforming consumer could have relied on them: the API Hub validates the Risk object against the Standards enum, so a request carrying CurrentAccount or Savings would already have been rejected. Adding SME is purely additive.',
    effectiveDate: 'To be confirmed on merge to main',
    specs: [
      'uae-authorization-endpoints-openapi',
      'uae-bank-initiation-openapi',
      'uae-api-hub-consent-manager-openapi',
      'uae-ozone-connect-consent-events-actions-openapi',
    ],
    schemas: ['AECreditorIndicators', 'AEAccountTypeCode'],
    githubSources: [
      {
        label: 'dist/standards/v2.1-errata2/uae-authorization-endpoints-openapi.yaml',
        url: `${OZONE}/dist/standards/v2.1-errata2/uae-authorization-endpoints-openapi.yaml`,
      },
      {
        label: 'dist/standards/v2.1-errata2/uae-bank-initiation-openapi.yaml',
        url: `${OZONE}/dist/standards/v2.1-errata2/uae-bank-initiation-openapi.yaml`,
      },
      {
        label: 'dist/api-hub/v2.1.x/uae-api-hub-consent-manager-openapi.yaml',
        url: `${OZONE}/dist/api-hub/v2.1.x/uae-api-hub-consent-manager-openapi.yaml`,
      },
      {
        label: 'dist/ozone-connect/v2.1.x/uae-ozone-connect-consent-events-actions-openapi.yaml',
        url: `${OZONE}/dist/ozone-connect/v2.1.x/uae-ozone-connect-consent-events-actions-openapi.yaml`,
      },
    ],
    relatedStandards: [
      { label: 'Banking — Service Initiation', path: '/tech/tpp-standards/v2.1/banking/service-initiation/' },
    ],
    affectedPaths: [
      '/tech/api-specs/v2.1/tpp/consent/par',
      '/tech/api-specs/v2.1/tpp/consent/payment-consents',
      '/tech/api-specs/v2.1/tpp/consent/payment-consents-ConsentId',
      '/tech/api-specs/v2.1/tpp/consent/patch-payment-consents-ConsentId',
      '/tech/tpp-standards/v2.1/consent/open-api/par',
      '/tech/tpp-standards/v2.1/consent/open-api/payment-consents',
      '/tech/tpp-standards/v2.1/consent/open-api/payment-consents-ConsentId',
      '/tech/tpp-standards/v2.1/consent/open-api/patch-payment-consents-ConsentId',
      '/tech/api-specs/v2.1/api-hub/consent-manager/open-api/consents',
      '/tech/api-specs/v2.1/api-hub/consent-manager/open-api/consents-consentId',
      '/tech/api-specs/v2.1/api-hub/consent-manager/open-api/patch-consents-consentId',
      '/tech/api-specs/v2.1/api-hub/consent-manager/open-api/consent-groups-consentGroupId-consents',
      '/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consents',
      '/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consents-consentId',
      '/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/patch-consents-consentId',
      '/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consent-groups-consentGroupId-consents',
      '/tech/api-specs/v2.1/ozone-connect/consent-events/validate',
      '/tech/api-specs/v2.1/ozone-connect/consent-events/event-op',
      '/tech/lfi-api-hub/v2.1/consent-events/open-api/validate',
      '/tech/lfi-api-hub/v2.1/consent-events/open-api/event-op',
    ],
  },
  {
    errataId: 'v2.1-errata2',
    version: 'v2.1',
    number: 13,
    title: 'Account Information — AESupplementaryData opened as an extension point',
    summary:
      'The AESupplementaryData schema on Bank Data Sharing responses is now an open object, so LFIs may carry implementation-specific fields that strict validation previously rejected.',
    description:
      'The AESupplementaryData schema in uae-account-information-openapi was previously defined as a closed empty object — properties: {} with additionalProperties: false — so any field an LFI placed in a SupplementaryData block would fail strict schema validation. The empty-object constraints have been removed, leaving an open object that accepts implementation-specific properties. AESupplementaryData is carried by the Transaction, Beneficiary and Standing Order resources on the Bank Data Sharing responses.',
    rationale:
      'SupplementaryData is by definition an extension point — "additional information that cannot be captured in the structured fields". Modelling it as a closed empty object contradicted that purpose: a strict validator would reject any LFI response that actually used it. Opening the schema aligns it with the SupplementaryData blocks on the payment-initiation surfaces (see §11) and with how the field has always been intended to work. The change is backward-compatible: consumers that ignored SupplementaryData see no difference.',
    effectiveDate: 'To be confirmed on merge to main',
    spec: 'uae-account-information-openapi',
    endpoints: [
      { label: 'GET /accounts/{AccountId}/transactions', path: '/tech/api-specs/v2.1/tpp/data-sharing/accounts-AccountId-transactions' },
      { label: 'GET /accounts/{AccountId}/beneficiaries', path: '/tech/api-specs/v2.1/tpp/data-sharing/accounts-AccountId-beneficiaries' },
      { label: 'GET /accounts/{AccountId}/standing-orders', path: '/tech/api-specs/v2.1/tpp/data-sharing/accounts-AccountId-standing-orders' },
    ],
    schemas: ['AESupplementaryData'],
    githubSources: [
      {
        label: 'dist/standards/v2.1-errata2/uae-account-information-openapi.yaml',
        url: `${OZONE}/dist/standards/v2.1-errata2/uae-account-information-openapi.yaml`,
      },
    ],
    relatedStandards: [
      { label: 'Banking — Data Sharing', path: '/tech/tpp-standards/v2.1/banking/data-sharing/' },
    ],
    affectedPaths: [
      '/tech/api-specs/v2.1/tpp/data-sharing/accounts-AccountId-transactions',
      '/tech/api-specs/v2.1/tpp/data-sharing/accounts-AccountId-beneficiaries',
      '/tech/api-specs/v2.1/tpp/data-sharing/accounts-AccountId-standing-orders',
      '/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-transactions',
      '/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-beneficiaries',
      '/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-standing-orders',
    ],
  },
  {
    errataId: 'v2.1-errata2',
    version: 'v2.1',
    number: 14,
    title: 'API Hub Consent Manager — ReadStatements and ReadProductFinanceRates added to the permission set',
    summary:
      'The AEAccountAccessConsentPermissionCodes enum in the Consent Manager now includes ReadStatements and ReadProductFinanceRates, matching the v2.1 Standards Bank Data Sharing permission set.',
    description:
      'Two permission codes — ReadStatements and ReadProductFinanceRates — have been added to the AEAccountAccessConsentPermissionCodes enum in uae-api-hub-consent-manager-openapi. Both are defined in the v2.1 Standards Bank Data Sharing permission set but were missing from the Consent Manager copy of the enum.',
    rationale:
      'The Consent Manager must accept every permission code from all supported Standards versions — it is the surface through which LFIs see the consent. With ReadStatements and ReadProductFinanceRates absent, a consent legitimately granting access to statement or product-finance-rate data could not be represented faithfully in the Consent Manager. Adding the codes is additive and corrects the omission.',
    effectiveDate: 'To be confirmed on merge to main',
    spec: 'uae-api-hub-consent-manager-openapi',
    schemas: ['AEAccountAccessConsentPermissionCodes'],
    endpoints: [
      { label: 'POST /consents', path: '/tech/api-specs/v2.1/api-hub/consent-manager/open-api/consents' },
      { label: 'PATCH /consents/{consentId}', path: '/tech/api-specs/v2.1/api-hub/consent-manager/open-api/patch-consents-consentId' },
    ],
    githubSources: [
      {
        label: 'dist/api-hub/v2.1.x/uae-api-hub-consent-manager-openapi.yaml',
        url: `${OZONE}/dist/api-hub/v2.1.x/uae-api-hub-consent-manager-openapi.yaml`,
      },
    ],
    relatedStandards: [
      { label: 'Banking — Data Sharing', path: '/tech/tpp-standards/v2.1/banking/data-sharing/' },
    ],
    affectedPaths: [
      '/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consents',
      '/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consents-consentId',
      '/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/patch-consents-consentId',
      '/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consent-groups-consentGroupId-consents',
      '/tech/api-specs/v2.1/api-hub/consent-manager/open-api/consents',
      '/tech/api-specs/v2.1/api-hub/consent-manager/open-api/consents-consentId',
      '/tech/api-specs/v2.1/api-hub/consent-manager/open-api/patch-consents-consentId',
      '/tech/api-specs/v2.1/api-hub/consent-manager/open-api/consent-groups-consentGroupId-consents',
    ],
  },
  {
    errataId: 'v2.1-errata2',
    version: 'v2.1',
    number: 15,
    title: 'API Hub Consent Manager — consent-update schemas closed to unknown properties',
    summary:
      'The three per-consent-type schemas behind the PATCH /consents/{consentId} request body now set additionalProperties: false, enforcing the field separation between consent types.',
    description:
      'The PATCH /consents/{consentId} request body is an anyOf of one schema per consent type — Bank Data Sharing, Bank Service Initiation and Insurance Data Sharing. The three ConsentManager.AE*ConsentUpdateProperties schemas behind that anyOf now each set additionalProperties: false. Previously they were open, so a field belonging to one consent type could be patched onto another without error.',
    rationale:
      'Without additionalProperties: false on each branch, the anyOf did not enforce the per-consent-type separation it described — a payment-only field such as ExchangeRate could be patched onto an insurance consent and be silently accepted. Closing each branch makes the schema reject cross-type field combinations, so validation matches the intent of the per-type modelling. The change is recorded in the Consent Manager breaking-changes file.',
    effectiveDate: 'To be confirmed on merge to main',
    spec: 'uae-api-hub-consent-manager-openapi',
    endpoints: [
      { label: 'PATCH /consents/{consentId}', path: '/tech/api-specs/v2.1/api-hub/consent-manager/open-api/patch-consents-consentId' },
    ],
    schemas: [
      'ConsentManager.AEBankDataSharingConsentUpdateProperties',
      'ConsentManager.AEBankServiceInitiationConsentUpdateProperties',
      'ConsentManager.AEInsuranceDataSharingConsentUpdateProperties',
    ],
    githubSources: [
      {
        label: 'supporting/breaking-changes/api-hub/v2.1.x/uae-api-hub-consent-manager-openapi/breaking-changes.yaml',
        url: `${OZONE}/supporting/breaking-changes/api-hub/v2.1.x/uae-api-hub-consent-manager-openapi/breaking-changes.yaml`,
      },
      {
        label: 'dist/api-hub/v2.1.x/uae-api-hub-consent-manager-openapi.yaml',
        url: `${OZONE}/dist/api-hub/v2.1.x/uae-api-hub-consent-manager-openapi.yaml`,
      },
    ],
    affectedPaths: [
      '/tech/api-specs/v2.1/api-hub/consent-manager/open-api/patch-consents-consentId',
      '/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/patch-consents-consentId',
    ],
  },
  {
    errataId: 'v2.1-errata2',
    version: 'v2.1',
    number: 16,
    title: 'API Hub Consent Manager — payment-log reject reason code casing reverted',
    summary:
      'The payment-log reject reason code reverts to lower-case — rejectReasonCode at the top level and code / message inside CbuaePaymentLogRejectReasonCode — matching the v2.0.x Consent Manager contract.',
    description:
      'The reject reason code on the payment log has been reverted to its v2.0.x casing. The top-level property is rejectReasonCode (not RejectReasonCode) on both the GET /payment-log response and the PATCH /payment-log/{id} request body, and the code and message fields inside each CbuaePaymentLogRejectReasonCode item are lower-case again (not Code and Message).',
    rationale:
      'The PascalCase variants — RejectReasonCode, Code and Message — were introduced in error and broke LFIs built against the v2.0.x payment-log contract, which has always used the lower-case names. Reverting restores compatibility with those implementations; no LFI had built against the short-lived PascalCase form.',
    effectiveDate: 'To be confirmed on merge to main',
    spec: 'uae-api-hub-consent-manager-openapi',
    endpoints: [
      { label: 'GET /payment-log', path: '/tech/api-specs/v2.1/api-hub/consent-manager/open-api/payment-log' },
      { label: 'PATCH /payment-log/{id}', path: '/tech/api-specs/v2.1/api-hub/consent-manager/open-api/payment-log-id' },
    ],
    schemas: ['CbuaePaymentLogRejectReasonCode'],
    githubSources: [
      {
        label: 'dist/api-hub/v2.1.x/uae-api-hub-consent-manager-openapi.yaml',
        url: `${OZONE}/dist/api-hub/v2.1.x/uae-api-hub-consent-manager-openapi.yaml`,
      },
    ],
    affectedPaths: [
      '/tech/api-specs/v2.1/api-hub/consent-manager/open-api/payment-log',
      '/tech/api-specs/v2.1/api-hub/consent-manager/open-api/payment-log-id',
      '/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/payment-log',
      '/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/payment-log-id',
    ],
  },
  {
    errataId: 'v2.1-errata2',
    version: 'v2.1',
    number: 17,
    title: 'Ozone Connect Bank Data Sharing — GET /accounts/{accountId}/products scoped to the account',
    summary:
      'The GET /accounts/{accountId}/products description now states the endpoint returns the products linked to the account in the path, not every product at the financial institution.',
    description:
      'The description of GET /accounts/{accountId}/products on Ozone Connect Bank Data Sharing has been corrected. It previously stated that the API "must return all the products that are provided by the financial institution", which implied an institution-wide product catalogue. It now states that the API must return the products linked to the account identified by the accountId path parameter, and that an account with no linked products returns a 200 with an empty data array.',
    rationale:
      'The endpoint is account-scoped — the accountId path parameter identifies a single account — but the description implied it returned the institution’s entire product range. The wording would have misled LFIs into implementing an institution-wide catalogue at an account-scoped path. The correction is documentation-only; no wire contract has changed.',
    effectiveDate: 'To be confirmed on merge to main',
    spec: 'uae-ozone-connect-bank-data-sharing-openapi',
    endpoints: [
      { label: 'GET /accounts/{AccountId}/products', path: '/tech/api-specs/v2.1/ozone-connect/data-sharing/accounts-AccountId-products' },
    ],
    githubSources: [
      {
        label: 'dist/ozone-connect/v2.1.x/uae-ozone-connect-bank-data-sharing-openapi.yaml',
        url: `${OZONE}/dist/ozone-connect/v2.1.x/uae-ozone-connect-bank-data-sharing-openapi.yaml`,
      },
    ],
    relatedStandards: [
      { label: 'Banking — Data Sharing', path: '/tech/tpp-standards/v2.1/banking/data-sharing/' },
    ],
    affectedPaths: [
      '/tech/api-specs/v2.1/ozone-connect/data-sharing/accounts-AccountId-products',
      '/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-products',
    ],
  },
]

function normalise(path: string): string {
  let p = path.replace(/\.html$/, '')
  if (p.length > 1 && p.endsWith('/')) p = p.slice(0, -1)
  return p
}

export function anchorFor(section: ErrataSection): string {
  return `${section.errataId}-section-${section.number}`
}

export function errataPageUrl(section: ErrataSection): string {
  return `/tech/release-notes-and-erratas/erratas/${section.version}/#${anchorFor(section)}`
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

export const errataVersions: string[] = [
  ...new Set(ERRATA_SECTIONS.map((s) => s.version)),
].sort()
