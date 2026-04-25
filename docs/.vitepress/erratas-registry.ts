// Single source of truth for errata items.
// - The ErrataUpdateBanner component uses `affectedPaths` to decide whether to show a banner.
// - ErratasPage renders every section for a version, grouped by errataId, with anchors
//   produced by anchorFor(). Deep-links go to /erratas/{version}/#{anchor}.

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
    title: 'Over-escaped regex patterns — doubled-backslash defect corrected across affected schemas',
    summary: 'Regex patterns published with doubled-backslash YAML escapes — the monetary Amount pattern across five specs, and the rarType and CoP response patterns on Ozone Connect User Operations — have been corrected to their canonical single-backslash form.',
    description:
      'A family of regex patterns carried doubled-backslash YAML-escape artefacts that no JSON-Schema validator would have interpreted as the intended expression. The patterns are corrected to their canonical single-backslash form, matching what every conforming implementation relies on.\n\n' +
      'Monetary Amount (^\\d{1,13}$|^\\d{1,13}\\.\\d{1,5}$): fixed across five specs — uae-fx-service-initiation-openapi, uae-api-hub-consent-manager-openapi, uae-ozone-connect-bank-service-initiation-openapi, uae-ozone-connect-consent-events-actions-openapi, and uae-ozone-connect-user-operations-openapi.\n\n' +
      'rarType (^urn:openfinanceuae:(?:account-access|insurance|service-initiation)-consent:v[0-9]+\\.[0-9]+$): fixed on five rarType occurrences in uae-ozone-connect-user-operations-openapi.\n\n' +
      'CoP response (^.+\\..+\\..+$): fixed on OzoneConnectConsentEventActionAPIs.AEConfirmationOfPayeeResponse in uae-ozone-connect-user-operations-openapi.',
    rationale:
      'The published regexes were non-functional: strict validators either rejected legitimate inputs or accepted any string depending on how they handled the literal backslash sequences. Production systems rely on the canonical single-backslash form; the correction brings every affected pattern into line with that form. The monetary Amount corrections are tracked as OF-6288; the rarType and CoP response corrections roll up under the same v2.1.3 change bullet on User Operations.',
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
    errataId: 'v2.1-errata1',
    version: 'v2.1',
    number: 9,
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
    errataId: 'v2.1-errata1',
    version: 'v2.1',
    number: 10,
    title: 'Ozone Connect Bank Data Sharing — meta block added to GET /accounts/{AccountId}/statements',
    summary: 'The GET /accounts/{AccountId}/statements response now carries an optional meta block with firstAvailableDateTime and lastAvailableDateTime, letting LFIs advertise the date range of available statement data on the account.',
    description:
      'The GET /accounts/{AccountId}/statements response on Ozone Connect Bank Data Sharing has been extended with an optional meta block. The block composes the shared Meta schema via allOf and adds two date-time properties — firstAvailableDateTime and lastAvailableDateTime — carrying the first and last date-times for which the LFI can return statement data on the account.',
    rationale:
      'Statement history depth varies across LFIs and across accounts within an LFI. Without a response-level signal, consumers have to discover the available range by probing. Surfacing the range on the response lets the Hub (and, downstream, TPPs) bound requests to data that is known to exist. The addition is backward-compatible: meta is optional and existing consumers that ignore it see no change.',
    effectiveDate: 'To be confirmed on merge to main.',
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
]

// Normalise a route path for comparison: strip trailing slash (except for root) and .html suffix.
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
