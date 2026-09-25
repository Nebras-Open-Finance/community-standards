const OZONE = "https://github.com/Nebras-Open-Finance/api-specs/blob/ozone";
const ERRATA_SECTIONS = [
  {
    errataId: "v2.1-errata2",
    version: "v2.1",
    number: 1,
    title: "Account Information — Permissions array flattening",
    summary: "The Permissions field on consent responses is now a flat array of strings (previously a nested array of arrays).",
    description: "The Permissions field on consent responses was previously typed as an array of arrays of strings — an array containing a nested array of permission codes. It is now a flat array of strings, matching the normative text and how clients have always populated it on the request side.",
    rationale: "The nested-array form was a defect in the published OpenAPI. The v2.1 normative text and every consumer of the response treat Permissions as a flat array of permission codes, and the API Hub already enforces the flat structure. The schema is being corrected to match.",
    effectiveDate: "2026-04-28",
    spec: "uae-account-information-openapi",
    endpoints: [
      { label: "GET /account-access-consents", path: "/tech/api-specs/v2.1/tpp/consent/account-access-consents" },
      { label: "GET /account-access-consents/{ConsentId}", path: "/tech/api-specs/v2.1/tpp/consent/account-access-consents-ConsentId" }
    ],
    schemas: ["AEBankDataSharingConsentPermissionCodes"],
    githubSources: [
      {
        label: "supporting/breaking-changes/standards/v2.1-errata2/uae-account-information-openapi/breaking-changes.yaml",
        url: `${OZONE}/supporting/breaking-changes/standards/v2.1-errata2/uae-account-information-openapi/breaking-changes.yaml`
      },
      {
        label: "dist/standards/v2.1-errata2/uae-account-information-openapi.yaml",
        url: `${OZONE}/dist/standards/v2.1-errata2/uae-account-information-openapi.yaml`
      }
    ],
    relatedStandards: [
      { label: "Banking — Data Sharing", path: "/tech/tpp-standards/v2.1/banking/data-sharing/" }
    ],
    affectedPaths: [
      "/tech/api-specs/v2.1/tpp/consent/account-access-consents",
      "/tech/api-specs/v2.1/tpp/consent/account-access-consents-ConsentId",
      "/tech/tpp-standards/v2.1/consent/open-api/account-access-consents",
      "/tech/tpp-standards/v2.1/consent/open-api/account-access-consents-ConsentId"
    ]
  },
  {
    errataId: "v2.1-errata2",
    version: "v2.1",
    number: 2,
    title: "Account Information — TrustFrameworkCode enum corrected to FI",
    summary: "The TrustFrameworkCode enum on party responses now declares FI (previously the unemittable Undefined).",
    description: "The TrustFrameworkCode enum used by VerifiedClaimVerification.TrustFramework on GET /parties and GET /accounts/{AccountId}/parties previously declared a single value Undefined — a value no conforming LFI could return. The enum has been replaced with FI, matching what Ozone Connect emits on CbuaeVerifiedClaim.verification.trustFramework and what every real response reaching a TPP has always contained.",
    rationale: "The v2.1 enum was internally inconsistent with the Ozone Connect spec the Hub proxies from: every real response carried FI while the standards enum declared only Undefined. Formally this is an enum-value removal, but in practice no consumer could have relied on Undefined because no conforming implementation could have produced it. Richer values (UAE Pass digital identity, Emirates ID physical verification) are deferred to v3.0.",
    effectiveDate: "2026-04-28",
    spec: "uae-account-information-openapi",
    endpoints: [
      { label: "GET /parties", path: "/tech/api-specs/v2.1/tpp/data-sharing/parties" },
      { label: "GET /accounts/{AccountId}/parties", path: "/tech/api-specs/v2.1/tpp/data-sharing/accounts-AccountId-parties" }
    ],
    schemas: ["TrustFrameworkCode"],
    githubSources: [
      {
        label: "supporting/breaking-changes/standards/v2.1-errata2/uae-account-information-openapi/breaking-changes.yaml",
        url: `${OZONE}/supporting/breaking-changes/standards/v2.1-errata2/uae-account-information-openapi/breaking-changes.yaml`
      },
      {
        label: "dist/standards/v2.1-errata2/uae-account-information-openapi.yaml",
        url: `${OZONE}/dist/standards/v2.1-errata2/uae-account-information-openapi.yaml`
      }
    ],
    relatedStandards: [
      { label: "Banking — Data Sharing", path: "/tech/tpp-standards/v2.1/banking/data-sharing/" }
    ],
    affectedPaths: [
      "/tech/api-specs/v2.1/tpp/data-sharing/parties",
      "/tech/api-specs/v2.1/tpp/data-sharing/accounts-AccountId-parties",
      "/tech/tpp-standards/v2.1/banking/data-sharing/open-api/parties",
      "/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-parties"
    ]
  },
  {
    errataId: "v2.1-errata2",
    version: "v2.1",
    number: 3,
    title: "Authorization Endpoints — POST /token restructured as oneOf; client_credentials grant added; client_id optional",
    summary: "POST /token response is now a oneOf across grant types, client_credentials is documented, and client_id is optional to reflect mTLS client authentication.",
    description: "Three aligned corrections on POST /token:\n\n1. The response body is now defined as a oneOf across three grant-type-specific schemas — AEAuthorizationCodeGrantTokenResponseProperties, AERefreshTokenGrantTokenResponseProperties, and AEClientCredentialsGrantTokenResponseProperties. Previously a single combined schema described the response, which marked fields like id_token and refresh_token as required for every grant even though they are only valid for some.\n\n2. The client_credentials grant is now explicitly documented as a supported grant type on POST /token. v2.1 declared only authorization_code and refresh_token, yet the API Hub has always accepted client_credentials — the spec has been brought into line.\n\n3. The client_id request parameter is now optional. Under FAPI 2.0 with mTLS client authentication the client is identified by its certificate, so client_id no longer needs to be sent in the request.",
    rationale: "All three corrections align the spec with how the API Hub has behaved in production since v2.1 was published. The single-schema response form misrepresented the contract (each grant type returns a different shape); omitting client_credentials hid a supported grant; and requiring client_id contradicted the FAPI 2.0 mTLS profile the Hub has always operated under. This is a documentation-level correction — no behavioural change is being made.",
    effectiveDate: "2026-04-28",
    spec: "uae-authorization-endpoints-openapi",
    endpoints: [
      { label: "POST /token", path: "/tech/api-specs/v2.1/tpp/token/token" }
    ],
    schemas: [
      "AEAuthorizationCodeGrantTokenResponseProperties",
      "AERefreshTokenGrantTokenResponseProperties",
      "AEClientCredentialsGrantTokenResponseProperties"
    ],
    githubSources: [
      {
        label: "supporting/breaking-changes/standards/v2.1-errata2/uae-authorization-endpoints-openapi/breaking-changes.yaml",
        url: `${OZONE}/supporting/breaking-changes/standards/v2.1-errata2/uae-authorization-endpoints-openapi/breaking-changes.yaml`
      },
      {
        label: "dist/standards/v2.1-errata2/uae-authorization-endpoints-openapi.yaml",
        url: `${OZONE}/dist/standards/v2.1-errata2/uae-authorization-endpoints-openapi.yaml`
      }
    ],
    relatedStandards: [
      { label: "Banking — Service Initiation", path: "/tech/tpp-standards/v2.1/banking/service-initiation/" }
    ],
    affectedPaths: [
      "/tech/api-specs/v2.1/tpp/token/token",
      "/tech/tpp-standards/security/tokens/open-api/token"
    ]
  },
  {
    errataId: "v2.1-errata2",
    version: "v2.1",
    number: 4,
    title: "Confirmation of Payee — 204 response description corrected",
    summary: 'The 204 response description on POST /confirmation now reads "IBAN is not recognised" rather than the previous opt-out wording.',
    description: 'The description of the 204 No Content response on POST /confirmation has been corrected to "IBAN is not recognised". Previously it read "Account holder has opted-out of Confirmation of Payee and no data is returned", which confused the semantics of the status code — 204 is returned when the supplied IBAN is not recognised by the LFI, not when an account holder has opted out.',
    rationale: "The opt-out wording misled integrators about when to expect a 204. No opt-out mechanism is defined on this surface; the 204 is the unrecognised-IBAN response and the prose has been aligned with actual behaviour.",
    effectiveDate: "2026-04-28",
    spec: "uae-confirmation-of-payee-openapi",
    endpoints: [
      { label: "POST /confirmation", path: "/tech/api-specs/v2.1/tpp/confirmation-of-payee/confirmation" }
    ],
    githubSources: [
      {
        label: "dist/standards/v2.1-errata2/uae-confirmation-of-payee-openapi.yaml",
        url: `${OZONE}/dist/standards/v2.1-errata2/uae-confirmation-of-payee-openapi.yaml`
      }
    ],
    relatedStandards: [
      { label: "Banking — Confirmation of Payee", path: "/tech/tpp-standards/v2.1/banking/confirmation-of-payee/" }
    ],
    affectedPaths: [
      "/tech/api-specs/v2.1/tpp/confirmation-of-payee/confirmation",
      "/tech/tpp-standards/v2.1/banking/confirmation-of-payee/open-api/confirmation"
    ]
  },
  {
    errataId: "v2.1-errata2",
    version: "v2.1",
    number: 5,
    title: "Confirmation of Payee — aud claim tightened from array to single string",
    summary: "The aud claim on every *BodySigned JWT payload on CoP is now a single string (previously an array of strings).",
    description: "The aud (audience) claim on every *BodySigned schema used by POST /confirmation and POST /discovery — AEError400ResponseBodySigned, AEError403ResponseBodySigned, AEError500ResponseBodySigned, DiscoverConfirmationSourceRequestBodySigned, DiscoverConfirmationSourceResponseBodySigned, NameConfirmationRequestBodySigned, and NameConfirmationResponseBodySigned — was previously typed as an array of strings. It is now a single string, matching what every JWT observed on this API actually carries.",
    rationale: "Every signed message on this surface has exactly one recipient — a specific authorisation server on requests, and a specific TPP client identifier on responses — so the array-of-strings form was over-modelled. RFC 7519 §4.1.3 permits aud to be a single StringOrURI when the JWT has a single audience. The array-only modelling did not reflect real wire traffic; any consumer strict-validating against it could not have decoded Model Bank responses. The correction brings the spec into line with production behaviour.",
    effectiveDate: "2026-04-28",
    spec: "uae-confirmation-of-payee-openapi",
    endpoints: [
      { label: "POST /confirmation", path: "/tech/api-specs/v2.1/tpp/confirmation-of-payee/confirmation" },
      { label: "POST /discovery", path: "/tech/api-specs/v2.1/tpp/confirmation-of-payee/discovery" }
    ],
    schemas: [
      "AEError400ResponseBodySigned",
      "AEError403ResponseBodySigned",
      "AEError500ResponseBodySigned",
      "DiscoverConfirmationSourceRequestBodySigned",
      "DiscoverConfirmationSourceResponseBodySigned",
      "NameConfirmationRequestBodySigned",
      "NameConfirmationResponseBodySigned"
    ],
    githubSources: [
      {
        label: "supporting/breaking-changes/standards/v2.1-errata2/uae-confirmation-of-payee-openapi/breaking-changes.yaml",
        url: `${OZONE}/supporting/breaking-changes/standards/v2.1-errata2/uae-confirmation-of-payee-openapi/breaking-changes.yaml`
      },
      {
        label: "dist/standards/v2.1-errata2/uae-confirmation-of-payee-openapi.yaml",
        url: `${OZONE}/dist/standards/v2.1-errata2/uae-confirmation-of-payee-openapi.yaml`
      }
    ],
    relatedStandards: [
      { label: "Banking — Confirmation of Payee", path: "/tech/tpp-standards/v2.1/banking/confirmation-of-payee/" }
    ],
    affectedPaths: [
      "/tech/api-specs/v2.1/tpp/confirmation-of-payee/confirmation",
      "/tech/api-specs/v2.1/tpp/confirmation-of-payee/discovery",
      "/tech/tpp-standards/v2.1/banking/confirmation-of-payee/open-api/confirmation",
      "/tech/tpp-standards/v2.1/banking/confirmation-of-payee/open-api/discovery"
    ]
  },
  {
    errataId: "v2.1-errata2",
    version: "v2.1",
    number: 6,
    title: "Over-escaped regex patterns — doubled-backslash defect corrected across affected schemas",
    summary: "Regex patterns published with doubled-backslash YAML escapes — the monetary Amount pattern across five specs, and the rarType and CoP response patterns on Ozone Connect User Operations — have been corrected to their canonical single-backslash form.",
    description: "A family of regex patterns carried doubled-backslash YAML-escape artefacts that no JSON-Schema validator would have interpreted as the intended expression. The patterns are corrected to their canonical single-backslash form, matching what every conforming implementation relies on.\n\nMonetary Amount (^\\d{1,13}$|^\\d{1,13}\\.\\d{1,5}$): fixed across five specs — uae-fx-service-initiation-openapi, uae-api-hub-consent-manager-openapi, uae-ozone-connect-bank-service-initiation-openapi, uae-ozone-connect-consent-events-actions-openapi, and uae-ozone-connect-user-operations-openapi.\n\nrarType (^urn:openfinanceuae:(?:account-access|insurance|service-initiation)-consent:v[0-9]+\\.[0-9]+$): fixed on five rarType occurrences in uae-ozone-connect-user-operations-openapi.\n\nCoP response (^.+\\..+\\..+$): fixed on OzoneConnectConsentEventActionAPIs.AEConfirmationOfPayeeResponse in uae-ozone-connect-user-operations-openapi.\n\nNote on naming: uae-ozone-connect-user-operations-openapi was renamed to uae-ozone-connect-caap-operations-openapi on 26 May 2026, after this errata took effect. The spec named above is the one now published as CAAP Operations; the corrections themselves are unchanged.",
    rationale: "The published regexes were non-functional: strict validators either rejected legitimate inputs or accepted any string depending on how they handled the literal backslash sequences. Production systems rely on the canonical single-backslash form; the correction brings every affected pattern into line with that form. The monetary Amount corrections are tracked as OF-6288; the rarType and CoP response corrections roll up under the same v2.1.3 change bullet on User Operations.",
    effectiveDate: "2026-04-28",
    specs: [
      "uae-fx-service-initiation-openapi",
      "uae-api-hub-consent-manager-openapi",
      "uae-ozone-connect-bank-service-initiation-openapi",
      "uae-ozone-connect-consent-events-actions-openapi",
      "uae-ozone-connect-user-operations-openapi"
    ],
    githubSources: [
      {
        // FX was not republished at v2.1-errata2 — the Amount correction shipped in the
        // same 2026-04-28 batch but under the standards v2.1-errata1 folder.
        label: "dist/standards/v2.1-errata1/uae-fx-service-initiation-openapi.yaml",
        url: `${OZONE}/dist/standards/v2.1-errata1/uae-fx-service-initiation-openapi.yaml`
      },
      {
        label: "dist/api-hub/v2.1.x/uae-api-hub-consent-manager-openapi.yaml",
        url: `${OZONE}/dist/api-hub/v2.1.x/uae-api-hub-consent-manager-openapi.yaml`
      },
      {
        label: "dist/ozone-connect/v2.1.x/uae-ozone-connect-bank-service-initiation-openapi.yaml",
        url: `${OZONE}/dist/ozone-connect/v2.1.x/uae-ozone-connect-bank-service-initiation-openapi.yaml`
      },
      {
        label: "dist/ozone-connect/v2.1.x/uae-ozone-connect-consent-events-actions-openapi.yaml",
        url: `${OZONE}/dist/ozone-connect/v2.1.x/uae-ozone-connect-consent-events-actions-openapi.yaml`
      },
      {
        // Published as uae-ozone-connect-user-operations-openapi when this errata took
        // effect; renamed upstream to uae-ozone-connect-caap-operations-openapi on
        // 2026-05-26, so the link points at the current filename.
        label: "dist/ozone-connect/v2.1.x/uae-ozone-connect-caap-operations-openapi.yaml",
        url: `${OZONE}/dist/ozone-connect/v2.1.x/uae-ozone-connect-caap-operations-openapi.yaml`
      }
    ],
    affectedPaths: [
      // API Hub Consent Manager — operations whose payloads carry the Amount schema
      "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consents",
      "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consents-consentId",
      "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/patch-consents-consentId",
      "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consent-groups-consentGroupId-consents",
      "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/payment-log",
      "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/payment-log-id",
      "/tech/api-specs/v2.1/api-hub/consent-manager/open-api/consents",
      "/tech/api-specs/v2.1/api-hub/consent-manager/open-api/consents-consentId",
      "/tech/api-specs/v2.1/api-hub/consent-manager/open-api/patch-consents-consentId",
      "/tech/api-specs/v2.1/api-hub/consent-manager/open-api/consent-groups-consentGroupId-consents",
      "/tech/api-specs/v2.1/api-hub/consent-manager/open-api/payment-log",
      "/tech/api-specs/v2.1/api-hub/consent-manager/open-api/payment-log-id",
      // Ozone Connect Bank Service Initiation
      "/tech/lfi-api-hub/v2.1/banking/service-initiation/open-api/payments",
      "/tech/lfi-api-hub/v2.1/banking/service-initiation/open-api/payments-PaymentId",
      "/tech/lfi-api-hub/v2.1/banking/service-initiation/open-api/payment-consents-ConsentId-refund",
      "/tech/api-specs/v2.1/ozone-connect/service-initiation/payments",
      "/tech/api-specs/v2.1/ozone-connect/service-initiation/payments-PaymentId",
      "/tech/api-specs/v2.1/ozone-connect/service-initiation/payment-consents-ConsentId-refund",
      // Ozone Connect Consent Events Actions
      "/tech/lfi-api-hub/v2.1/consent-events/open-api/validate",
      "/tech/lfi-api-hub/v2.1/consent-events/open-api/event-op",
      "/tech/api-specs/v2.1/ozone-connect/consent-events/validate",
      "/tech/api-specs/v2.1/ozone-connect/consent-events/event-op"
    ]
  },
  {
    errataId: "v2.1-errata2",
    version: "v2.1",
    number: 7,
    title: "Webhook Template — Permissions array flattening",
    summary: "The Permissions field on consent webhook payloads is now a flat array of strings, matching §1.",
    description: "The Permissions field on consent webhook payloads was previously typed as an array of arrays of strings and is now a flat array of strings. This matches the equivalent correction on the Account Information consent responses (see §1) so the webhook payload and the consent resource share the same Permissions shape.",
    rationale: "Webhook payloads must mirror the structure of the underlying consent resource. The nested-array form in the webhook spec was the same defect corrected in §1 and would have caused subscribers parsing strictly against the published schema to fail.",
    effectiveDate: "2026-04-28",
    spec: "uae-webhook-template-openapi",
    endpoints: [
      { label: "Consent Status Webhook", path: "/tech/api-specs/v2.1/tpp/webhooks/consent-status" },
      { label: "Payment Status Webhook", path: "/tech/api-specs/v2.1/tpp/webhooks/payment-status" }
    ],
    githubSources: [
      {
        label: "supporting/breaking-changes/standards/v2.1-errata2/uae-webhook-template-openapi/breaking-changes.yaml",
        url: `${OZONE}/supporting/breaking-changes/standards/v2.1-errata2/uae-webhook-template-openapi/breaking-changes.yaml`
      },
      {
        label: "dist/standards/v2.1-errata2/uae-webhook-template-openapi.yaml",
        url: `${OZONE}/dist/standards/v2.1-errata2/uae-webhook-template-openapi.yaml`
      }
    ],
    relatedStandards: [
      { label: "Webhooks", path: "/tech/tpp-standards/v2.1/webhooks/" }
    ],
    affectedPaths: [
      "/tech/api-specs/v2.1/tpp/webhooks/consent-status",
      "/tech/api-specs/v2.1/tpp/webhooks/payment-status",
      "/tech/tpp-standards/v2.1/webhooks/consent-status/open-api",
      "/tech/tpp-standards/v2.1/webhooks/payment-status/open-api"
    ]
  },
  {
    errataId: "v2.1-errata2",
    version: "v2.1",
    number: 8,
    title: "API Hub Consent Manager — unused AERiskExternalAccountIdentificationCode schema removed",
    summary: "The unused namespaced AERiskExternalAccountIdentificationCode schema has been removed from the Consent Manager spec.",
    description: "The namespaced AEBankServiceInitiationRichAuthorizationRequests.AERiskExternalAccountIdentificationCode schema has been deleted. It duplicated the canonical AERiskExternalAccountIdentificationCode and was never referenced from any other schema.",
    rationale: "The duplicated schema was dead weight in the OpenAPI and invited accidental divergence from the canonical definition. Removing it leaves a single source of truth for the type without changing any wire contract.",
    effectiveDate: "2026-04-28",
    spec: "uae-api-hub-consent-manager-openapi",
    schemas: ["AERiskExternalAccountIdentificationCode"],
    githubSources: [
      {
        label: "dist/api-hub/v2.1.x/uae-api-hub-consent-manager-openapi.yaml",
        url: `${OZONE}/dist/api-hub/v2.1.x/uae-api-hub-consent-manager-openapi.yaml`
      }
    ],
    affectedPaths: [
      // Consent Manager — consent operations whose RAR payloads carry risk identifiers
      "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consents",
      "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consents-consentId",
      "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/patch-consents-consentId",
      "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consent-groups-consentGroupId-consents",
      "/tech/api-specs/v2.1/api-hub/consent-manager/open-api/consents",
      "/tech/api-specs/v2.1/api-hub/consent-manager/open-api/consents-consentId",
      "/tech/api-specs/v2.1/api-hub/consent-manager/open-api/patch-consents-consentId",
      "/tech/api-specs/v2.1/api-hub/consent-manager/open-api/consent-groups-consentGroupId-consents"
    ]
  },
  {
    errataId: "v2.1-errata2",
    version: "v2.1",
    number: 9,
    title: "Ozone Connect Health Check — echo-cert clientCertificate described as mTLS client cert, not server cert",
    summary: "The clientCertificate.subject description and example on GET /echo-cert now describe the caller’s mTLS client certificate; the issuer example has been refreshed to the Sandbox Trust Framework issuing CA.",
    description: 'The clientCertificate.subject and clientCertificate.issuer descriptions and examples on the HealthCheckCertResponse schema (GET /echo-cert) have been corrected. The subject previously read "The subject of the certificate, which should equate to a DNS name." with an example of CN = auth.open-finance-apihub.ae — prose that described a server certificate rather than the client certificate the endpoint actually echoes. The description now states that the field carries the Distinguished Name of the client certificate presented by the caller during the mTLS handshake, and that for Open Finance UAE callers the OU contains the caller’s organisation ID from the Trust Framework directory. The example has been updated to a representative Open Finance UAE client-cert DN (C=UK, O=OZONE FINANCIAL TECHNOLOGY LIMITED, OU=<organisation-id>), and the issuer example has been refreshed to the Sandbox Trust Framework issuing CA for symmetry. The schema shape is unchanged.',
    rationale: "The endpoint echoes the client certificate the server received during the mTLS handshake, but the published prose and example described a DNS-in-CN server certificate. In the Open Finance UAE trust framework the caller’s identity is carried in the OU as the Trust Framework organisation ID, not in the CN as a DNS name — so the example would have misled integrators inspecting /echo-cert output during onboarding. The correction is documentation-only; no wire contract has changed.",
    effectiveDate: "2026-04-28",
    spec: "uae-ozone-connect-health-check-openapi",
    endpoints: [
      { label: "GET /echo-cert", path: "/tech/api-specs/v2.1/ozone-connect/health-check/echo-cert" }
    ],
    schemas: ["HealthCheckCertResponse"],
    githubSources: [
      {
        label: "dist/ozone-connect/v2.1.x/uae-ozone-connect-health-check-openapi.yaml",
        url: `${OZONE}/dist/ozone-connect/v2.1.x/uae-ozone-connect-health-check-openapi.yaml`
      }
    ],
    affectedPaths: [
      "/tech/api-specs/v2.1/ozone-connect/health-check/echo-cert",
      "/tech/lfi-api-hub/v2.1/health-check/open-api/echo-cert"
    ]
  },
  {
    errataId: "v2.1-errata2",
    version: "v2.1",
    number: 10,
    title: "Ozone Connect Bank Data Sharing — meta block added to GET /accounts/{AccountId}/statements",
    summary: "The GET /accounts/{AccountId}/statements response now carries an optional meta block with firstAvailableDateTime and lastAvailableDateTime, letting LFIs advertise the date range of available statement data on the account.",
    description: "The GET /accounts/{AccountId}/statements response on Ozone Connect Bank Data Sharing has been extended with an optional meta block. The block composes the shared Meta schema via allOf and adds two date-time properties — firstAvailableDateTime and lastAvailableDateTime — carrying the first and last date-times for which the LFI can return statement data on the account.",
    rationale: "Statement history depth varies across LFIs and across accounts within an LFI. Without a response-level signal, consumers have to discover the available range by probing. Surfacing the range on the response lets the Hub (and, downstream, TPPs) bound requests to data that is known to exist. The addition is backward-compatible: meta is optional and existing consumers that ignore it see no change.",
    effectiveDate: "2026-04-28",
    spec: "uae-ozone-connect-bank-data-sharing-openapi",
    endpoints: [
      { label: "GET /accounts/{AccountId}/statements", path: "/tech/api-specs/v2.1/ozone-connect/data-sharing/accounts-AccountId-statements" }
    ],
    githubSources: [
      {
        label: "dist/ozone-connect/v2.1.x/uae-ozone-connect-bank-data-sharing-openapi.yaml",
        url: `${OZONE}/dist/ozone-connect/v2.1.x/uae-ozone-connect-bank-data-sharing-openapi.yaml`
      }
    ],
    affectedPaths: [
      "/tech/api-specs/v2.1/ozone-connect/data-sharing/accounts-AccountId-statements",
      "/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-statements"
    ]
  },
  {
    errataId: "v2.1-errata2",
    version: "v2.1",
    number: 11,
    title: "Risk object — nested schemas tightened to match the Standards definition",
    summary: "The Risk object on the payment-initiation surfaces now rejects undeclared properties throughout its nested objects; the SupplementaryData blocks remain open extension points and AddressLine items are bounded.",
    description: "Three aligned corrections bring the Risk object on the payment-initiation surfaces into line with the Standards definition:\n\n1. AERisk and its nested indicator objects — AEDebtorIndicators, AETransactionIndicators, AECreditorIndicators and their inline sub-objects — now carry additionalProperties: false throughout. On the Payments side (uae-bank-initiation-openapi) and on Ozone Connect these objects were silently permissive: a TPP could send undeclared properties to POST /payments, POST /file-payments or POST /payment-consents and have them accepted, even though the equivalent objects on the PAR side (uae-authorization-endpoints-openapi) have always rejected them. The strictness is now uniform.\n\n2. The SupplementaryData blocks inside AEDebtorIndicators, AETransactionIndicators and AECreditorIndicators are explicitly open extension points — additionalProperties: false is not applied to them, so consumer-specific fields may be carried there. Where a stray additionalProperties: false had been applied to a SupplementaryData block it has been removed.\n\n3. AddressLine items inside the AEAddress schema, reached via the Creditor address on the Risk object, are now bounded with minLength: 1 and maxLength: 70 — matching the constraints already enforced on the Payments side.",
    rationale: "The Risk object is the input to risk and fraud scoring, so the same object must validate identically wherever it is sent. In v2.1 it did not: PAR rejected undeclared properties while POST /payments accepted them, so a TPP could not reuse one Risk payload across both surfaces with confidence. The corrections make the Risk schema uniform across PAR, the Payment API, the API Hub Consent Manager and Ozone Connect. Formally this is a request-body tightening — a TPP that has been sending extra, undeclared properties in Risk to the Payments surfaces will now receive validation errors; the remedy is to remove those properties or move them under the relevant SupplementaryData block, which remains open. The change is sign-posted in the breaking-changes records for the affected specs and enforced by a new Risk-parity test.",
    effectiveDate: "2026-05-22",
    specs: [
      "uae-authorization-endpoints-openapi",
      "uae-bank-initiation-openapi",
      "uae-api-hub-consent-manager-openapi",
      "uae-ozone-connect-bank-service-initiation-openapi",
      "uae-ozone-connect-consent-events-actions-openapi"
    ],
    schemas: [
      "AERisk",
      "AEDebtorIndicators",
      "AETransactionIndicators",
      "AECreditorIndicators",
      "AEAddress"
    ],
    githubSources: [
      {
        label: "supporting/breaking-changes/standards/v2.1-errata2/uae-bank-initiation-openapi/breaking-changes.yaml",
        url: `${OZONE}/supporting/breaking-changes/standards/v2.1-errata2/uae-bank-initiation-openapi/breaking-changes.yaml`
      },
      {
        label: "supporting/breaking-changes/api-hub/v2.1.x/uae-api-hub-consent-manager-openapi/breaking-changes.yaml",
        url: `${OZONE}/supporting/breaking-changes/api-hub/v2.1.x/uae-api-hub-consent-manager-openapi/breaking-changes.yaml`
      },
      {
        label: "dist/standards/v2.1-errata2/uae-authorization-endpoints-openapi.yaml",
        url: `${OZONE}/dist/standards/v2.1-errata2/uae-authorization-endpoints-openapi.yaml`
      },
      {
        label: "dist/standards/v2.1-errata2/uae-bank-initiation-openapi.yaml",
        url: `${OZONE}/dist/standards/v2.1-errata2/uae-bank-initiation-openapi.yaml`
      },
      {
        label: "dist/api-hub/v2.1.x/uae-api-hub-consent-manager-openapi.yaml",
        url: `${OZONE}/dist/api-hub/v2.1.x/uae-api-hub-consent-manager-openapi.yaml`
      },
      {
        label: "dist/ozone-connect/v2.1.x/uae-ozone-connect-bank-service-initiation-openapi.yaml",
        url: `${OZONE}/dist/ozone-connect/v2.1.x/uae-ozone-connect-bank-service-initiation-openapi.yaml`
      },
      {
        label: "dist/ozone-connect/v2.1.x/uae-ozone-connect-consent-events-actions-openapi.yaml",
        url: `${OZONE}/dist/ozone-connect/v2.1.x/uae-ozone-connect-consent-events-actions-openapi.yaml`
      }
    ],
    relatedStandards: [
      { label: "Banking — Service Initiation", path: "/tech/tpp-standards/v2.1/banking/service-initiation/" }
    ],
    affectedPaths: [
      // Standards — PAR and payment consent creation/modification
      "/tech/api-specs/v2.1/tpp/consent/par",
      "/tech/api-specs/v2.1/tpp/consent/payment-consents",
      "/tech/api-specs/v2.1/tpp/consent/payment-consents-ConsentId",
      "/tech/api-specs/v2.1/tpp/consent/patch-payment-consents-ConsentId",
      "/tech/api-specs/v2.1/tpp/service-initiation/payments",
      "/tech/tpp-standards/v2.1/consent/open-api/par",
      "/tech/tpp-standards/v2.1/consent/open-api/payment-consents",
      "/tech/tpp-standards/v2.1/consent/open-api/payment-consents-ConsentId",
      "/tech/tpp-standards/v2.1/consent/open-api/patch-payment-consents-ConsentId",
      "/tech/tpp-standards/v2.1/banking/service-initiation/open-api/payments",
      // API Hub Consent Manager — consent operations carrying the Risk object
      "/tech/api-specs/v2.1/api-hub/consent-manager/open-api/consents",
      "/tech/api-specs/v2.1/api-hub/consent-manager/open-api/consents-consentId",
      "/tech/api-specs/v2.1/api-hub/consent-manager/open-api/patch-consents-consentId",
      "/tech/api-specs/v2.1/api-hub/consent-manager/open-api/consent-groups-consentGroupId-consents",
      "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consents",
      "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consents-consentId",
      "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/patch-consents-consentId",
      "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consent-groups-consentGroupId-consents",
      // Ozone Connect — Service Initiation and Consent Events
      "/tech/api-specs/v2.1/ozone-connect/service-initiation/payments",
      "/tech/api-specs/v2.1/ozone-connect/consent-events/validate",
      "/tech/api-specs/v2.1/ozone-connect/consent-events/event-op",
      "/tech/lfi-api-hub/v2.1/banking/service-initiation/open-api/payments",
      "/tech/lfi-api-hub/v2.1/consent-events/open-api/validate",
      "/tech/lfi-api-hub/v2.1/consent-events/open-api/event-op"
    ]
  },
  {
    errataId: "v2.1-errata2",
    version: "v2.1",
    number: 12,
    title: "Risk object — AccountType enum corrected to Retail / SME / Corporate",
    summary: "The AccountType enum on the Risk object’s Creditor indicators is now Retail / SME / Corporate, replacing a divergent product-category enum; the Ozone Connect AEAccountTypeCode gains SME.",
    description: "The AccountType field on the Risk object’s Creditor indicators has been aligned with the Standards definition.\n\nOn uae-authorization-endpoints-openapi and uae-api-hub-consent-manager-openapi the inline AEBankServiceInitiationRichAuthorizationRequests.AECreditorIndicators.AccountType enum previously declared a product-category list — CurrentAccount, Savings, CreditCard, Mortgage and Finance — that did not match the Standards PAR and Payments definitions. It now declares Retail, SME and Corporate.\n\nOn uae-ozone-connect-consent-events-actions-openapi and uae-bank-initiation-openapi the AEAccountTypeCode enum, which previously declared only Retail and Corporate, now also declares SME.",
    rationale: "The AccountType value on the Risk object classifies the creditor account and feeds risk scoring. The product-category enum (CurrentAccount, Savings and so on) was a defect — it diverged from the Retail / SME / Corporate classification used everywhere else the Risk object is defined, so a Risk payload valid on one surface was invalid on another. Adding SME to the Ozone Connect AEAccountTypeCode completes the same alignment. Replacing the product-category values is formally an enum-value removal, but no conforming consumer could have relied on them: the API Hub validates the Risk object against the Standards enum, so a request carrying CurrentAccount or Savings would already have been rejected. Adding SME is purely additive.",
    effectiveDate: "2026-05-22",
    specs: [
      "uae-authorization-endpoints-openapi",
      "uae-bank-initiation-openapi",
      "uae-api-hub-consent-manager-openapi",
      "uae-ozone-connect-consent-events-actions-openapi"
    ],
    schemas: ["AECreditorIndicators", "AEAccountTypeCode"],
    githubSources: [
      {
        label: "dist/standards/v2.1-errata2/uae-authorization-endpoints-openapi.yaml",
        url: `${OZONE}/dist/standards/v2.1-errata2/uae-authorization-endpoints-openapi.yaml`
      },
      {
        label: "dist/standards/v2.1-errata2/uae-bank-initiation-openapi.yaml",
        url: `${OZONE}/dist/standards/v2.1-errata2/uae-bank-initiation-openapi.yaml`
      },
      {
        label: "dist/api-hub/v2.1.x/uae-api-hub-consent-manager-openapi.yaml",
        url: `${OZONE}/dist/api-hub/v2.1.x/uae-api-hub-consent-manager-openapi.yaml`
      },
      {
        label: "dist/ozone-connect/v2.1.x/uae-ozone-connect-consent-events-actions-openapi.yaml",
        url: `${OZONE}/dist/ozone-connect/v2.1.x/uae-ozone-connect-consent-events-actions-openapi.yaml`
      }
    ],
    relatedStandards: [
      { label: "Banking — Service Initiation", path: "/tech/tpp-standards/v2.1/banking/service-initiation/" }
    ],
    affectedPaths: [
      "/tech/api-specs/v2.1/tpp/consent/par",
      "/tech/api-specs/v2.1/tpp/consent/payment-consents",
      "/tech/api-specs/v2.1/tpp/consent/payment-consents-ConsentId",
      "/tech/api-specs/v2.1/tpp/consent/patch-payment-consents-ConsentId",
      "/tech/tpp-standards/v2.1/consent/open-api/par",
      "/tech/tpp-standards/v2.1/consent/open-api/payment-consents",
      "/tech/tpp-standards/v2.1/consent/open-api/payment-consents-ConsentId",
      "/tech/tpp-standards/v2.1/consent/open-api/patch-payment-consents-ConsentId",
      "/tech/api-specs/v2.1/api-hub/consent-manager/open-api/consents",
      "/tech/api-specs/v2.1/api-hub/consent-manager/open-api/consents-consentId",
      "/tech/api-specs/v2.1/api-hub/consent-manager/open-api/patch-consents-consentId",
      "/tech/api-specs/v2.1/api-hub/consent-manager/open-api/consent-groups-consentGroupId-consents",
      "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consents",
      "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consents-consentId",
      "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/patch-consents-consentId",
      "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consent-groups-consentGroupId-consents",
      "/tech/api-specs/v2.1/ozone-connect/consent-events/validate",
      "/tech/api-specs/v2.1/ozone-connect/consent-events/event-op",
      "/tech/lfi-api-hub/v2.1/consent-events/open-api/validate",
      "/tech/lfi-api-hub/v2.1/consent-events/open-api/event-op"
    ]
  },
  {
    errataId: "v2.1-errata2",
    version: "v2.1",
    number: 13,
    title: "Account Information — AESupplementaryData opened as an extension point",
    summary: "The AESupplementaryData schema on Bank Data Sharing responses is now an open object, so LFIs may carry implementation-specific fields that strict validation previously rejected.",
    description: "The AESupplementaryData schema in uae-account-information-openapi was previously defined as a closed empty object — properties: {} with additionalProperties: false — so any field an LFI placed in a SupplementaryData block would fail strict schema validation. The empty-object constraints have been removed, leaving an open object that accepts implementation-specific properties. AESupplementaryData is carried by the Transaction, Beneficiary and Standing Order resources on the Bank Data Sharing responses.",
    rationale: 'SupplementaryData is by definition an extension point — "additional information that cannot be captured in the structured fields". Modelling it as a closed empty object contradicted that purpose: a strict validator would reject any LFI response that actually used it. Opening the schema aligns it with the SupplementaryData blocks on the payment-initiation surfaces (see §11) and with how the field has always been intended to work. The change is backward-compatible: consumers that ignored SupplementaryData see no difference.',
    effectiveDate: "2026-05-22",
    spec: "uae-account-information-openapi",
    endpoints: [
      { label: "GET /accounts/{AccountId}/transactions", path: "/tech/api-specs/v2.1/tpp/data-sharing/accounts-AccountId-transactions" },
      { label: "GET /accounts/{AccountId}/beneficiaries", path: "/tech/api-specs/v2.1/tpp/data-sharing/accounts-AccountId-beneficiaries" },
      { label: "GET /accounts/{AccountId}/standing-orders", path: "/tech/api-specs/v2.1/tpp/data-sharing/accounts-AccountId-standing-orders" }
    ],
    schemas: ["AESupplementaryData"],
    githubSources: [
      {
        label: "dist/standards/v2.1-errata2/uae-account-information-openapi.yaml",
        url: `${OZONE}/dist/standards/v2.1-errata2/uae-account-information-openapi.yaml`
      }
    ],
    relatedStandards: [
      { label: "Banking — Data Sharing", path: "/tech/tpp-standards/v2.1/banking/data-sharing/" }
    ],
    affectedPaths: [
      "/tech/api-specs/v2.1/tpp/data-sharing/accounts-AccountId-transactions",
      "/tech/api-specs/v2.1/tpp/data-sharing/accounts-AccountId-beneficiaries",
      "/tech/api-specs/v2.1/tpp/data-sharing/accounts-AccountId-standing-orders",
      "/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-transactions",
      "/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-beneficiaries",
      "/tech/tpp-standards/v2.1/banking/data-sharing/open-api/accounts-AccountId-standing-orders"
    ]
  },
  {
    errataId: "v2.1-errata2",
    version: "v2.1",
    number: 14,
    title: "API Hub Consent Manager — ReadStatements and ReadProductFinanceRates added to the permission set",
    summary: "The AEAccountAccessConsentPermissionCodes enum in the Consent Manager now includes ReadStatements and ReadProductFinanceRates, matching the v2.1 Standards Bank Data Sharing permission set.",
    description: "Two permission codes — ReadStatements and ReadProductFinanceRates — have been added to the AEAccountAccessConsentPermissionCodes enum in uae-api-hub-consent-manager-openapi. Both are defined in the v2.1 Standards Bank Data Sharing permission set but were missing from the Consent Manager copy of the enum.",
    rationale: "The Consent Manager must accept every permission code from all supported Standards versions — it is the surface through which LFIs see the consent. With ReadStatements and ReadProductFinanceRates absent, a consent legitimately granting access to statement or product-finance-rate data could not be represented faithfully in the Consent Manager. Adding the codes is additive and corrects the omission.",
    effectiveDate: "2026-05-22",
    spec: "uae-api-hub-consent-manager-openapi",
    schemas: ["AEAccountAccessConsentPermissionCodes"],
    endpoints: [
      { label: "POST /consents", path: "/tech/api-specs/v2.1/api-hub/consent-manager/open-api/consents" },
      { label: "PATCH /consents/{consentId}", path: "/tech/api-specs/v2.1/api-hub/consent-manager/open-api/patch-consents-consentId" }
    ],
    githubSources: [
      {
        label: "dist/api-hub/v2.1.x/uae-api-hub-consent-manager-openapi.yaml",
        url: `${OZONE}/dist/api-hub/v2.1.x/uae-api-hub-consent-manager-openapi.yaml`
      }
    ],
    relatedStandards: [
      { label: "Banking — Data Sharing", path: "/tech/tpp-standards/v2.1/banking/data-sharing/" }
    ],
    affectedPaths: [
      "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consents",
      "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consents-consentId",
      "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/patch-consents-consentId",
      "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consent-groups-consentGroupId-consents",
      "/tech/api-specs/v2.1/api-hub/consent-manager/open-api/consents",
      "/tech/api-specs/v2.1/api-hub/consent-manager/open-api/consents-consentId",
      "/tech/api-specs/v2.1/api-hub/consent-manager/open-api/patch-consents-consentId",
      "/tech/api-specs/v2.1/api-hub/consent-manager/open-api/consent-groups-consentGroupId-consents"
    ]
  },
  {
    errataId: "v2.1-errata2",
    version: "v2.1",
    number: 15,
    title: "API Hub Consent Manager — consent-update schemas closed to unknown properties",
    summary: "The three per-consent-type schemas behind the PATCH /consents/{consentId} request body now set additionalProperties: false, enforcing the field separation between consent types.",
    description: "The PATCH /consents/{consentId} request body is an anyOf of one schema per consent type — Bank Data Sharing, Bank Service Initiation and Insurance Data Sharing. The three ConsentManager.AE*ConsentUpdateProperties schemas behind that anyOf now each set additionalProperties: false. Previously they were open, so a field belonging to one consent type could be patched onto another without error.",
    rationale: "Without additionalProperties: false on each branch, the anyOf did not enforce the per-consent-type separation it described — a payment-only field such as ExchangeRate could be patched onto an insurance consent and be silently accepted. Closing each branch makes the schema reject cross-type field combinations, so validation matches the intent of the per-type modelling. The change is recorded in the Consent Manager breaking-changes file.",
    effectiveDate: "2026-05-22",
    spec: "uae-api-hub-consent-manager-openapi",
    endpoints: [
      { label: "PATCH /consents/{consentId}", path: "/tech/api-specs/v2.1/api-hub/consent-manager/open-api/patch-consents-consentId" }
    ],
    schemas: [
      "ConsentManager.AEBankDataSharingConsentUpdateProperties",
      "ConsentManager.AEBankServiceInitiationConsentUpdateProperties",
      "ConsentManager.AEInsuranceDataSharingConsentUpdateProperties"
    ],
    githubSources: [
      {
        label: "supporting/breaking-changes/api-hub/v2.1.x/uae-api-hub-consent-manager-openapi/breaking-changes.yaml",
        url: `${OZONE}/supporting/breaking-changes/api-hub/v2.1.x/uae-api-hub-consent-manager-openapi/breaking-changes.yaml`
      },
      {
        label: "dist/api-hub/v2.1.x/uae-api-hub-consent-manager-openapi.yaml",
        url: `${OZONE}/dist/api-hub/v2.1.x/uae-api-hub-consent-manager-openapi.yaml`
      }
    ],
    affectedPaths: [
      "/tech/api-specs/v2.1/api-hub/consent-manager/open-api/patch-consents-consentId",
      "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/patch-consents-consentId"
    ]
  },
  {
    errataId: "v2.1-errata2",
    version: "v2.1",
    number: 16,
    title: "API Hub Consent Manager — payment-log reject reason code casing reverted",
    summary: "The payment-log reject reason code reverts to lower-case — rejectReasonCode at the top level and code / message inside CbuaePaymentLogRejectReasonCode — matching the v2.0.x Consent Manager contract.",
    description: "The reject reason code on the payment log has been reverted to its v2.0.x casing. The top-level property is rejectReasonCode (not RejectReasonCode) on both the GET /payment-log response and the PATCH /payment-log/{id} request body, and the code and message fields inside each CbuaePaymentLogRejectReasonCode item are lower-case again (not Code and Message).",
    rationale: "The PascalCase variants — RejectReasonCode, Code and Message — were introduced in error and broke LFIs built against the v2.0.x payment-log contract, which has always used the lower-case names. Reverting restores compatibility with those implementations; no LFI had built against the short-lived PascalCase form.",
    effectiveDate: "2026-05-22",
    spec: "uae-api-hub-consent-manager-openapi",
    endpoints: [
      { label: "GET /payment-log", path: "/tech/api-specs/v2.1/api-hub/consent-manager/open-api/payment-log" },
      { label: "PATCH /payment-log/{id}", path: "/tech/api-specs/v2.1/api-hub/consent-manager/open-api/payment-log-id" }
    ],
    schemas: ["CbuaePaymentLogRejectReasonCode"],
    githubSources: [
      {
        label: "dist/api-hub/v2.1.x/uae-api-hub-consent-manager-openapi.yaml",
        url: `${OZONE}/dist/api-hub/v2.1.x/uae-api-hub-consent-manager-openapi.yaml`
      }
    ],
    affectedPaths: [
      "/tech/api-specs/v2.1/api-hub/consent-manager/open-api/payment-log",
      "/tech/api-specs/v2.1/api-hub/consent-manager/open-api/payment-log-id",
      "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/payment-log",
      "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/payment-log-id"
    ]
  },
  {
    errataId: "v2.1-errata2",
    version: "v2.1",
    number: 17,
    title: "Ozone Connect Bank Data Sharing — GET /accounts/{accountId}/products scoped to the account",
    summary: "The GET /accounts/{accountId}/products description now states the endpoint returns the products linked to the account in the path, not every product at the financial institution.",
    description: 'The description of GET /accounts/{accountId}/products on Ozone Connect Bank Data Sharing has been corrected. It previously stated that the API "must return all the products that are provided by the financial institution", which implied an institution-wide product catalogue. It now states that the API must return the products linked to the account identified by the accountId path parameter, and that an account with no linked products returns a 200 with an empty data array.',
    rationale: "The endpoint is account-scoped — the accountId path parameter identifies a single account — but the description implied it returned the institution’s entire product range. The wording would have misled LFIs into implementing an institution-wide catalogue at an account-scoped path. The correction is documentation-only; no wire contract has changed.",
    effectiveDate: "2026-05-22",
    spec: "uae-ozone-connect-bank-data-sharing-openapi",
    endpoints: [
      { label: "GET /accounts/{AccountId}/products", path: "/tech/api-specs/v2.1/ozone-connect/data-sharing/accounts-AccountId-products" }
    ],
    githubSources: [
      {
        label: "dist/ozone-connect/v2.1.x/uae-ozone-connect-bank-data-sharing-openapi.yaml",
        url: `${OZONE}/dist/ozone-connect/v2.1.x/uae-ozone-connect-bank-data-sharing-openapi.yaml`
      }
    ],
    relatedStandards: [
      { label: "Banking — Data Sharing", path: "/tech/tpp-standards/v2.1/banking/data-sharing/" }
    ],
    affectedPaths: [
      "/tech/api-specs/v2.1/ozone-connect/data-sharing/accounts-AccountId-products",
      "/tech/lfi-api-hub/v2.1/banking/data-sharing/open-api/accounts-AccountId-products"
    ]
  },
  {
    errataId: "v2.1-errata1",
    version: "v2.1",
    number: 1,
    title: "Insurance — Quote read responses restructured as a per-status discriminated oneOf",
    summary: "The GET quote-by-id response on every insurance line is now a discriminator-driven oneOf keyed on QuoteStatus, so each status declares only the fields valid for it; the flat AEInsuranceQuoteStatusCodes enum has been removed.",
    description: 'The GET quote-by-id response on every insurance line was previously a single object — AEInsuranceQuoteReadResponseProperties for the Employment, Home, Life, Motor, Renters and Travel lines, and AEHealthInsuranceQuoteReadResponseProperties for Health — whose QuoteStatus referenced the shared AEInsuranceQuoteStatusCodes enum. Every status therefore advertised the same field set.\n\nEach response is now a oneOf across twelve per-status schemas — Pending, Available, ApplicationApproved, ApplicationPending, Completed, CustomerCancelled, Expired, KYCCaptured, LFICancelled, PaymentRequired, PolicyIssued and Rejected — with a discriminator on QuoteStatus. The fields common to every status moved into a new base schema, AEInsuranceQuoteProperties (and AEHealthInsuranceQuoteProperties for Health), which each status variant composes via allOf.\n\nThe Pending variant is modelled distinctly: it requires only QuoteId and QuoteReference and carries a new PremiumTargetDateTime — the target time, within 24 hours of quote-resource creation, by which the insurer will generate the premium — reflecting that a pending quote does not yet carry premium data. The shared AEInsuranceQuoteStatusCodes enum has been removed; the status set is now expressed through the discriminator mapping, and the two values it declared that are absent from that mapping, UnderwritingCompleted and Issued, are no longer part of the set. The InsurancePlanName description was also simplified, dropping the "if the quote status is Pending this data may not be available" note now that the Pending shape expresses that structurally.',
    rationale: "The single-object form could not express that a quote carries different data at different points in its lifecycle: a Pending quote has no premium yet, whereas a PolicyIssued quote does. Modelling every status against one schema forced a lowest-common-denominator field set and pushed the distinctions into prose. The per-status discriminated oneOf lets each status declare exactly the fields valid for it, and lets a consumer branch on QuoteStatus to decode the correct shape.",
    effectiveDate: "2026-04-10",
    spec: "uae-insurance-openapi",
    endpoints: [
      { label: "GET /employment-insurance-quotes/{QuoteId}", path: "/tech/tpp-standards/v2.1/insurance/quotation/open-api/get-employment-insurance-quotes-QuoteId" },
      { label: "GET /health-insurance-quotes/{QuoteId}", path: "/tech/tpp-standards/v2.1/insurance/quotation/open-api/get-health-insurance-quotes-QuoteId" },
      { label: "GET /home-insurance-quotes/{QuoteId}", path: "/tech/tpp-standards/v2.1/insurance/quotation/open-api/get-home-insurance-quotes-QuoteId" },
      { label: "GET /life-insurance-quotes/{QuoteId}", path: "/tech/tpp-standards/v2.1/insurance/quotation/open-api/get-life-insurance-quotes-QuoteId" },
      { label: "GET /motor-insurance-quotes/{QuoteId}", path: "/tech/tpp-standards/v2.1/insurance/quotation/open-api/get-motor-insurance-quotes-QuoteId" },
      { label: "GET /renters-insurance-quotes/{QuoteId}", path: "/tech/tpp-standards/v2.1/insurance/quotation/open-api/get-renters-insurance-quotes-QuoteId" },
      { label: "GET /travel-insurance-quotes/{QuoteId}", path: "/tech/tpp-standards/v2.1/insurance/quotation/open-api/get-travel-insurance-quotes-QuoteId" }
    ],
    schemas: [
      "AEInsuranceQuoteReadResponseProperties",
      "AEHealthInsuranceQuoteReadResponseProperties",
      "AEInsuranceQuoteProperties",
      "AEHealthInsuranceQuoteProperties",
      "AEInsuranceQuoteStatusCodes"
    ],
    githubSources: [
      {
        label: "dist/standards/v2.1-errata1/uae-insurance-openapi.yaml",
        url: `${OZONE}/dist/standards/v2.1-errata1/uae-insurance-openapi.yaml`
      }
    ],
    relatedStandards: [
      { label: "Insurance — Quotation", path: "/tech/tpp-standards/v2.1/insurance/quotation/" }
    ],
    affectedPaths: [
      "/tech/tpp-standards/v2.1/insurance/quotation/open-api/get-employment-insurance-quotes-QuoteId",
      "/tech/tpp-standards/v2.1/insurance/quotation/open-api/get-health-insurance-quotes-QuoteId",
      "/tech/tpp-standards/v2.1/insurance/quotation/open-api/get-home-insurance-quotes-QuoteId",
      "/tech/tpp-standards/v2.1/insurance/quotation/open-api/get-life-insurance-quotes-QuoteId",
      "/tech/tpp-standards/v2.1/insurance/quotation/open-api/get-motor-insurance-quotes-QuoteId",
      "/tech/tpp-standards/v2.1/insurance/quotation/open-api/get-renters-insurance-quotes-QuoteId",
      "/tech/tpp-standards/v2.1/insurance/quotation/open-api/get-travel-insurance-quotes-QuoteId",
      "/tech/lfi-api-hub/v2.1/insurance/quotation/open-api/get-employment-insurance-quotes-QuoteId",
      "/tech/lfi-api-hub/v2.1/insurance/quotation/open-api/get-health-insurance-quotes-QuoteId",
      "/tech/lfi-api-hub/v2.1/insurance/quotation/open-api/get-home-insurance-quotes-QuoteId",
      "/tech/lfi-api-hub/v2.1/insurance/quotation/open-api/get-life-insurance-quotes-QuoteId",
      "/tech/lfi-api-hub/v2.1/insurance/quotation/open-api/get-motor-insurance-quotes-QuoteId",
      "/tech/lfi-api-hub/v2.1/insurance/quotation/open-api/get-renters-insurance-quotes-QuoteId",
      "/tech/lfi-api-hub/v2.1/insurance/quotation/open-api/get-travel-insurance-quotes-QuoteId"
    ]
  },
  {
    errataId: "v2.1-errata3",
    version: "v2.1",
    number: 1,
    title: "Service Initiation — International Creditor restructured into Individual and Organization variants (SWIFT SR2026)",
    summary: "The international Creditor on the Bank Service Initiation RAR is now a oneOf of an Individual and an Organization variant, discriminated by IdentityType, carrying the structured beneficiary attributes required for cross-border payments. Domestic Creditor schemas are unchanged.",
    description: "As part of the SWIFT SR2026 alignment for cross-border payments, the international Creditor party on the Bank Service Initiation Rich Authorization Request was restructured from a single flat object — carrying only Name and PostalAddress — into a oneOf of an Individual variant and an Organization variant, discriminated by IdentityType. AEInternationalCreditorParty composes the two new variant schemas, AEInternationalIndividualCreditor and AEInternationalOrganisationCreditor.\n\nThe variants add the structured beneficiary attributes required for cross-border payments: an object-valued Name (name parts), RelationshipToSender, DateOfBirth, Nationality, SourceOfFunds / SourceOfIncome, identity Evidence, and organisation identifiers such as AnyBIC and LEI. Domestic Creditor schemas are unchanged.\n\nThe restructure is applied consistently across every surface that carries the Creditor in a RAR payload: PAR (uae-authorization-endpoints), the Payment API (uae-bank-initiation), the API Hub Consent Manager, and Ozone Connect (Bank Service Initiation and Consent Events). On PAR the Creditor is modelled as an array, so oasdiff reports the change as a property type change; on the Payments side it is a single object, so oasdiff reports it as removal of the previous flat Creditor.Name and Creditor.PostalAddress — both classifications describe the same restructure.",
    rationale: "The flat international Creditor object could not carry the beneficiary detail that cross-border (SWIFT SR2026) payments require. Splitting it into discriminated Individual and Organization variants lets each carry exactly the attributes valid for that party type. The change is backward-compatible in practice: the previously valid flat Creditor (Name and PostalAddress) maps onto the new variants, which retain those properties — a TPP must now set IdentityType and send a valid Individual or Organization object, but loses no previously accepted data.",
    effectiveDate: "2026-07-08",
    specs: [
      "uae-authorization-endpoints-openapi",
      "uae-bank-initiation-openapi",
      "uae-api-hub-consent-manager-openapi",
      "uae-ozone-connect-bank-service-initiation-openapi",
      "uae-ozone-connect-consent-events-actions-openapi"
    ],
    schemas: [
      "AEBankServiceInitiationRichAuthorizationRequests.AEInternationalCreditorParty",
      "AEBankServiceInitiationRichAuthorizationRequests.AEInternationalIndividualCreditor",
      "AEBankServiceInitiationRichAuthorizationRequests.AEInternationalOrganisationCreditor",
      "AEBankServiceInitiationRichAuthorizationRequests.AEInternationalCreditorName",
      "AEBankServiceInitiationRichAuthorizationRequests.AEInternationalCreditorNameComponent",
      "AEBankServiceInitiationRichAuthorizationRequests.AEInternationalCreditorEvidence"
    ],
    githubSources: [
      {
        label: "supporting/breaking-changes/standards/v2.1-errata3/uae-authorization-endpoints-openapi/breaking-changes.yaml",
        url: `${OZONE}/supporting/breaking-changes/standards/v2.1-errata3/uae-authorization-endpoints-openapi/breaking-changes.yaml`
      },
      {
        label: "supporting/breaking-changes/standards/v2.1-errata3/uae-bank-initiation-openapi/breaking-changes.yaml",
        url: `${OZONE}/supporting/breaking-changes/standards/v2.1-errata3/uae-bank-initiation-openapi/breaking-changes.yaml`
      },
      {
        label: "dist/standards/v2.1-errata3/uae-authorization-endpoints-openapi.yaml",
        url: `${OZONE}/dist/standards/v2.1-errata3/uae-authorization-endpoints-openapi.yaml`
      },
      {
        label: "dist/standards/v2.1-errata3/uae-bank-initiation-openapi.yaml",
        url: `${OZONE}/dist/standards/v2.1-errata3/uae-bank-initiation-openapi.yaml`
      }
    ],
    relatedStandards: [
      { label: "Banking — Service Initiation", path: "/tech/tpp-standards/v2.1/banking/service-initiation/" }
    ],
    affectedPaths: [
      "/tech/api-specs/v2.1/tpp/consent/par",
      "/tech/api-specs/v2.1/tpp/consent/payment-consents",
      "/tech/api-specs/v2.1/tpp/consent/payment-consents-ConsentId",
      "/tech/api-specs/v2.1/tpp/consent/patch-payment-consents-ConsentId",
      "/tech/api-specs/v2.1/tpp/service-initiation/payments",
      "/tech/tpp-standards/v2.1/consent/open-api/par",
      "/tech/tpp-standards/v2.1/consent/open-api/payment-consents",
      "/tech/tpp-standards/v2.1/consent/open-api/payment-consents-ConsentId",
      "/tech/tpp-standards/v2.1/consent/open-api/patch-payment-consents-ConsentId",
      "/tech/tpp-standards/v2.1/banking/service-initiation/open-api/payments",
      "/tech/api-specs/v2.1/api-hub/consent-manager/open-api/consents",
      "/tech/api-specs/v2.1/api-hub/consent-manager/open-api/consents-consentId",
      "/tech/api-specs/v2.1/api-hub/consent-manager/open-api/patch-consents-consentId",
      "/tech/api-specs/v2.1/api-hub/consent-manager/open-api/consent-groups-consentGroupId-consents",
      "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consents",
      "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consents-consentId",
      "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/patch-consents-consentId",
      "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consent-groups-consentGroupId-consents",
      "/tech/api-specs/v2.1/ozone-connect/service-initiation/payments",
      "/tech/api-specs/v2.1/ozone-connect/consent-events/validate",
      "/tech/api-specs/v2.1/ozone-connect/consent-events/event-op",
      "/tech/lfi-api-hub/v2.1/banking/service-initiation/open-api/payments",
      "/tech/lfi-api-hub/v2.1/consent-events/open-api/validate",
      "/tech/lfi-api-hub/v2.1/consent-events/open-api/event-op"
    ]
  },
  {
    errataId: "v2.1-errata3",
    version: "v2.1",
    number: 2,
    title: "Service Initiation — International Creditor Agent address aligned onto shared AEInternationalAddress (TownName required, max 70)",
    summary: "The international Creditor Agent PostalAddress now references the shared AEInternationalAddress used by the Creditor, which makes TownName required and tightens its maxLength from 140 to 70. The Creditor Agent address itself remains optional.",
    description: "As part of the same SWIFT SR2026 work, the international Creditor Agent PostalAddress was aligned onto the same address schema as the international Creditor. Both now reference a single shared AEInternationalAddress (renamed from AEInternationalCreditorAddress); the Creditor Agent previously referenced the legacy AEAddress.\n\nRelative to AEAddress, the shared AEInternationalAddress makes TownName required and tightens its maxLength from 140 to 70 — the ISO 20022 PostalAddress27 Max70Text bound. The Creditor Agent PostalAddress itself remains optional (only SchemeName and Identification are required on the Creditor Agent), so a BIC-only agent is unaffected.\n\nThe change applies on the same surfaces as the Creditor restructure — PAR, Payments, the API Hub Consent Manager, and Ozone Connect.",
    rationale: "ISO 20022 models both a party address (Cdtr) and a financial-institution address (CdtrAgt/FinInstnId) with the same PostalAddress27 type, so a single shared AEInternationalAddress is the more standards-faithful design and removes the divergence between the two international address shapes. Impact: a TPP that supplies an international Creditor Agent address must now include TownName and keep it within 70 characters.",
    effectiveDate: "2026-07-08",
    specs: [
      "uae-authorization-endpoints-openapi",
      "uae-bank-initiation-openapi",
      "uae-api-hub-consent-manager-openapi",
      "uae-ozone-connect-bank-service-initiation-openapi",
      "uae-ozone-connect-consent-events-actions-openapi"
    ],
    schemas: [
      "AEBankServiceInitiationRichAuthorizationRequests.AEInternationalAddress",
      "AEBankServiceInitiationRichAuthorizationRequests.AEInternationalCreditorAgentProperties"
    ],
    githubSources: [
      {
        label: "supporting/breaking-changes/standards/v2.1-errata3/uae-authorization-endpoints-openapi/breaking-changes.yaml",
        url: `${OZONE}/supporting/breaking-changes/standards/v2.1-errata3/uae-authorization-endpoints-openapi/breaking-changes.yaml`
      },
      {
        label: "supporting/breaking-changes/standards/v2.1-errata3/uae-bank-initiation-openapi/breaking-changes.yaml",
        url: `${OZONE}/supporting/breaking-changes/standards/v2.1-errata3/uae-bank-initiation-openapi/breaking-changes.yaml`
      },
      {
        label: "dist/standards/v2.1-errata3/uae-authorization-endpoints-openapi.yaml",
        url: `${OZONE}/dist/standards/v2.1-errata3/uae-authorization-endpoints-openapi.yaml`
      },
      {
        label: "dist/standards/v2.1-errata3/uae-bank-initiation-openapi.yaml",
        url: `${OZONE}/dist/standards/v2.1-errata3/uae-bank-initiation-openapi.yaml`
      }
    ],
    relatedStandards: [
      { label: "Banking — Service Initiation", path: "/tech/tpp-standards/v2.1/banking/service-initiation/" }
    ],
    affectedPaths: [
      "/tech/api-specs/v2.1/tpp/consent/par",
      "/tech/api-specs/v2.1/tpp/consent/payment-consents",
      "/tech/api-specs/v2.1/tpp/consent/payment-consents-ConsentId",
      "/tech/api-specs/v2.1/tpp/consent/patch-payment-consents-ConsentId",
      "/tech/api-specs/v2.1/tpp/service-initiation/payments",
      "/tech/tpp-standards/v2.1/consent/open-api/par",
      "/tech/tpp-standards/v2.1/consent/open-api/payment-consents",
      "/tech/tpp-standards/v2.1/consent/open-api/payment-consents-ConsentId",
      "/tech/tpp-standards/v2.1/consent/open-api/patch-payment-consents-ConsentId",
      "/tech/tpp-standards/v2.1/banking/service-initiation/open-api/payments",
      "/tech/api-specs/v2.1/api-hub/consent-manager/open-api/consents",
      "/tech/api-specs/v2.1/api-hub/consent-manager/open-api/consents-consentId",
      "/tech/api-specs/v2.1/api-hub/consent-manager/open-api/patch-consents-consentId",
      "/tech/api-specs/v2.1/api-hub/consent-manager/open-api/consent-groups-consentGroupId-consents",
      "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consents",
      "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consents-consentId",
      "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/patch-consents-consentId",
      "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consent-groups-consentGroupId-consents",
      "/tech/api-specs/v2.1/ozone-connect/service-initiation/payments",
      "/tech/api-specs/v2.1/ozone-connect/consent-events/validate",
      "/tech/api-specs/v2.1/ozone-connect/consent-events/event-op",
      "/tech/lfi-api-hub/v2.1/banking/service-initiation/open-api/payments",
      "/tech/lfi-api-hub/v2.1/consent-events/open-api/validate",
      "/tech/lfi-api-hub/v2.1/consent-events/open-api/event-op"
    ]
  },
  {
    errataId: "v2.1-errata3",
    version: "v2.1",
    number: 3,
    title: 'Service Initiation — Debtor and Creditor References constrained to the ISO 20022 / SWIFT "x" character set (OFP-003)',
    summary: "Adopted from proposal OFP-003. The free-text Debtor and Creditor References now carry a character-set pattern — letters, digits, space and / ? : ( ) . , ' + - . Length and free-text-first behaviour are unchanged.",
    description: `Per OFP-003 ("Define an allowed character set for Debtor and Creditor References"), a character-set pattern is added to the current free-text (35-character) branch of the Debtor and Creditor References: ^[A-Za-z0-9 \\/?:().,'+-]+$ — the ISO 20022 / SWIFT "x" set. The allowed characters are A–Z, a–z, 0–9, space, and / ? : ( ) . , ' + -. Everything else is rejected, including @ # % & * _ = " ! ; < >, accented Latin, Arabic and any other script.

The constraint is applied identically wherever the free-text reference is defined: the Bank Service Initiation Rich Authorization Request carried in authorization_details on POST /par, POST /payments and POST /file-payments on the Payment API, the API Hub Consent Manager, and Ozone Connect (Bank Service Initiation and Consent Events). It validates the characters only, not the structure — minLength 1 and maxLength 35 are unchanged, both fields remain optional, and the deprecated structured (120-character) reference variants are untouched.

The API Hub enforces the pattern at PAR as well as at payment submission, so a reference outside the set is rejected at consent creation rather than at execution. The Hub does not sanitise, transliterate or strip: a value within the set is forwarded to the LFI unchanged.`,
    rationale: "In v2.1 these references were relaxed from the old structured pattern to plain free text, with no character validation at all. An LFI therefore could not know which characters it would be handed, and each institution was left to guess what its systems can store — a reference carrying Arabic script, accented Latin or symbols such as @ or # could reach a core banking system unable to hold it, and truncation or substitution at the LFI breaks reconciliation for the customer. OFP-003 reintroduces a single uniform character set: the one the underlying payment rails already use.\n\nImpact: a TPP that sends a reference containing a character outside the set now receives a request-validation error from the API Hub. The remedy is to sanitise or transliterate the reference to the agreed set before submission.",
    effectiveDate: "2026-08-21",
    specs: [
      "uae-authorization-endpoints-openapi",
      "uae-bank-initiation-openapi",
      "uae-api-hub-consent-manager-openapi",
      "uae-ozone-connect-bank-service-initiation-openapi",
      "uae-ozone-connect-consent-events-actions-openapi"
    ],
    endpoints: [
      { label: "POST /par", path: "/tech/api-specs/v2.1/tpp/consent/par" },
      { label: "POST /payments", path: "/tech/api-specs/v2.1/tpp/service-initiation/payments" }
    ],
    schemas: [
      "AECreditorReference",
      "AEDebtorReference",
      "AEBankServiceInitiation.AECreditorReference",
      "AEBankServiceInitiation.AEDebtorReference",
      "AEServiceInitiationCreditorReference",
      "AEServiceInitiationDebtorReference"
    ],
    githubSources: [
      {
        label: "supporting/breaking-changes/standards/v2.1-errata3/uae-authorization-endpoints-openapi/breaking-changes.yaml",
        url: `${OZONE}/supporting/breaking-changes/standards/v2.1-errata3/uae-authorization-endpoints-openapi/breaking-changes.yaml`
      },
      {
        label: "supporting/breaking-changes/standards/v2.1-errata3/uae-bank-initiation-openapi/breaking-changes.yaml",
        url: `${OZONE}/supporting/breaking-changes/standards/v2.1-errata3/uae-bank-initiation-openapi/breaking-changes.yaml`
      },
      {
        label: "dist/standards/v2.1-errata3/uae-authorization-endpoints-openapi.yaml",
        url: `${OZONE}/dist/standards/v2.1-errata3/uae-authorization-endpoints-openapi.yaml`
      },
      {
        label: "dist/standards/v2.1-errata3/uae-bank-initiation-openapi.yaml",
        url: `${OZONE}/dist/standards/v2.1-errata3/uae-bank-initiation-openapi.yaml`
      },
      {
        label: "dist/api-hub/v2.1.x/uae-api-hub-consent-manager-openapi.yaml",
        url: `${OZONE}/dist/api-hub/v2.1.x/uae-api-hub-consent-manager-openapi.yaml`
      },
      {
        label: "dist/ozone-connect/v2.1.x/uae-ozone-connect-bank-service-initiation-openapi.yaml",
        url: `${OZONE}/dist/ozone-connect/v2.1.x/uae-ozone-connect-bank-service-initiation-openapi.yaml`
      },
      {
        label: "dist/ozone-connect/v2.1.x/uae-ozone-connect-consent-events-actions-openapi.yaml",
        url: `${OZONE}/dist/ozone-connect/v2.1.x/uae-ozone-connect-consent-events-actions-openapi.yaml`
      }
    ],
    relatedStandards: [
      { label: "Banking — Service Initiation", path: "/tech/tpp-standards/v2.1/banking/service-initiation/" },
      { label: "OFP-003 — Define an allowed character set for Debtor and Creditor References", path: "/proposals/ofp-003/" }
    ],
    affectedPaths: [
      "/tech/api-specs/v2.1/tpp/consent/par",
      "/tech/api-specs/v2.1/tpp/consent/payment-consents",
      "/tech/api-specs/v2.1/tpp/consent/payment-consents-ConsentId",
      "/tech/api-specs/v2.1/tpp/consent/patch-payment-consents-ConsentId",
      "/tech/api-specs/v2.1/tpp/service-initiation/payments",
      "/tech/tpp-standards/v2.1/consent/open-api/par",
      "/tech/tpp-standards/v2.1/consent/open-api/payment-consents",
      "/tech/tpp-standards/v2.1/consent/open-api/payment-consents-ConsentId",
      "/tech/tpp-standards/v2.1/consent/open-api/patch-payment-consents-ConsentId",
      "/tech/tpp-standards/v2.1/banking/service-initiation/open-api/payments",
      "/tech/api-specs/v2.1/api-hub/consent-manager/open-api/consents",
      "/tech/api-specs/v2.1/api-hub/consent-manager/open-api/consents-consentId",
      "/tech/api-specs/v2.1/api-hub/consent-manager/open-api/patch-consents-consentId",
      "/tech/api-specs/v2.1/api-hub/consent-manager/open-api/consent-groups-consentGroupId-consents",
      "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consents",
      "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consents-consentId",
      "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/patch-consents-consentId",
      "/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/consent-groups-consentGroupId-consents",
      "/tech/api-specs/v2.1/ozone-connect/service-initiation/payments",
      "/tech/api-specs/v2.1/ozone-connect/consent-events/validate",
      "/tech/api-specs/v2.1/ozone-connect/consent-events/event-op",
      "/tech/lfi-api-hub/v2.1/banking/service-initiation/open-api/payments",
      "/tech/lfi-api-hub/v2.1/consent-events/open-api/validate",
      "/tech/lfi-api-hub/v2.1/consent-events/open-api/event-op"
    ]
  },
  {
    errataId: "v2.1-errata3",
    version: "v2.1",
    number: 4,
    title: "Service Initiation — idempotency-key query response corrected to the signed envelope",
    summary: "The 200 response to the idempotency-key query on GET /payments is now declared as AEIdempotencyKeyQuerySigned — the standard AEJwt envelope with the payload under message — matching what the API Hub has always returned.",
    description: "The idempotency-key query — GET /payments (and GET /file-payments) with an x-idempotency-key header, used to recover the resource created by an earlier request — declared its 200 response as the bare AEIdempotencyKeyQuery object. It is now declared as a new AEIdempotencyKeyQuerySigned schema: the standard signed envelope used throughout the Payment API, composing AEJwt with a required message property carrying AEIdempotencyKeyQuery.\n\nData and Links are unchanged; they are now correctly shown nested under message inside the signed envelope. This was the only response in the spec left unwrapped — every other response already declares a Signed envelope (AEPaymentConsentResponseSigned, AEPaymentIdResponseSigned, AEFilePaymentIdResponseSigned, and the error responses), and the endpoint has always been served under the application/jwt media type, which a bare object could never have satisfied.",
    rationale: "The API Hub has always returned this response as a signed JWT. The unwrapped declaration was an omission in the specification, not a description of a different contract, so the errata corrects the specification to match the behaviour.\n\nImpact: none for a TPP built against the API Hub's actual behaviour — Data and Links are where they have always been, under message, after verifying the JWT. A TPP built literally against the previous written specification would never have worked against the Hub. The correction is inherited unchanged by v2.2, so there is no v2.1-to-v2.2 delta.",
    effectiveDate: "2026-08-21",
    spec: "uae-bank-initiation-openapi",
    endpoints: [
      { label: "GET /payments (idempotency key query)", path: "/tech/api-specs/v2.1/tpp/service-initiation/payments-idempotency" }
    ],
    schemas: ["AEIdempotencyKeyQuerySigned", "AEIdempotencyKeyQuery"],
    githubSources: [
      {
        label: "supporting/breaking-changes/standards/v2.1-errata3/uae-bank-initiation-openapi/breaking-changes.yaml",
        url: `${OZONE}/supporting/breaking-changes/standards/v2.1-errata3/uae-bank-initiation-openapi/breaking-changes.yaml`
      },
      {
        label: "dist/standards/v2.1-errata3/uae-bank-initiation-openapi.yaml",
        url: `${OZONE}/dist/standards/v2.1-errata3/uae-bank-initiation-openapi.yaml`
      }
    ],
    relatedStandards: [
      { label: "Banking — Service Initiation", path: "/tech/tpp-standards/v2.1/banking/service-initiation/" }
    ],
    affectedPaths: [
      "/tech/api-specs/v2.1/tpp/service-initiation/payments-idempotency",
      "/tech/tpp-standards/v2.1/banking/service-initiation/open-api/payments-idempotency"
    ]
  },
  {
    errataId: "v2.1-errata3",
    version: "v2.1",
    number: 5,
    title: "Ozone Connect — ReadStatements and ReadProductFinanceRates added to the Consent Events and CAAP Operations permission sets (extends v2.1-errata2 §14)",
    summary: "Extends v2.1-errata2 §14. The two permission codes added to the API Hub Consent Manager are now also declared on the Ozone Connect permission enums, so a consent carrying either code can be forwarded to the LFI.",
    description: "v2.1-errata2 §14 added ReadStatements and ReadProductFinanceRates to AEAccountAccessConsentPermissionCodes in the API Hub Consent Manager. The LFI-facing enums that mirror it still omitted both codes, so a consent the Hub accepted failed validation at the LFI the moment it was forwarded on a consent event.\n\nBoth enums now declare the full v2.1 Standards Bank Data Sharing permission set: AEAccountAccessConsentPermissionCodes on uae-ozone-connect-consent-events-actions-openapi (spec version v2.1.6 to v2.1.7) and OzoneConnectConsentEventActionAPIs.AEAccountAccessConsentPermissionCodes on uae-ozone-connect-caap-operations-openapi (v2.1.4 to v2.1.5).\n\nThe change is additive — no existing permission code is removed or renamed, and an LFI that does not support statement or product-finance-rate data is unaffected, since the codes only appear on consents that request them.",
    rationale: "A permission code is only usable if every surface along the chain declares it: the Standards Bank Data Sharing permission set, the Consent Manager that stores the consent, and the Ozone Connect enums the Hub forwards it through. Correcting the Consent Manager alone (v2.1-errata2 §14) left the last hop broken, so the omission is completed here rather than restated. Parity across the three surfaces is now enforced by the permission-code parity test in the api-specs repository.",
    effectiveDate: "2026-08-21",
    specs: [
      "uae-ozone-connect-consent-events-actions-openapi",
      "uae-ozone-connect-caap-operations-openapi"
    ],
    schemas: [
      "AEAccountAccessConsentPermissionCodes",
      "OzoneConnectConsentEventActionAPIs.AEAccountAccessConsentPermissionCodes"
    ],
    endpoints: [
      { label: "POST /consents/actions/validate", path: "/tech/api-specs/v2.1/ozone-connect/consent-events/validate" },
      { label: "POST /consents/actions/event-op", path: "/tech/api-specs/v2.1/ozone-connect/consent-events/event-op" },
      { label: "POST /consents/actions/validate (CAAP)", path: "/tech/api-specs/v2.1/ozone-connect/caap/consent-actions-validate" }
    ],
    githubSources: [
      {
        label: "dist/ozone-connect/v2.1.x/uae-ozone-connect-consent-events-actions-openapi.yaml",
        url: `${OZONE}/dist/ozone-connect/v2.1.x/uae-ozone-connect-consent-events-actions-openapi.yaml`
      },
      {
        label: "dist/ozone-connect/v2.1.x/uae-ozone-connect-caap-operations-openapi.yaml",
        url: `${OZONE}/dist/ozone-connect/v2.1.x/uae-ozone-connect-caap-operations-openapi.yaml`
      },
      {
        label: "dist/api-hub/v2.1.x/uae-api-hub-consent-manager-openapi.yaml",
        url: `${OZONE}/dist/api-hub/v2.1.x/uae-api-hub-consent-manager-openapi.yaml`
      }
    ],
    relatedStandards: [
      { label: "Banking — Data Sharing", path: "/tech/tpp-standards/v2.1/banking/data-sharing/" }
    ],
    affectedPaths: [
      "/tech/api-specs/v2.1/ozone-connect/consent-events/validate",
      "/tech/api-specs/v2.1/ozone-connect/consent-events/event-op",
      "/tech/api-specs/v2.1/ozone-connect/caap/consent-actions-validate",
      "/tech/lfi-api-hub/v2.1/consent-events/open-api/validate",
      "/tech/lfi-api-hub/v2.1/consent-events/open-api/event-op",
      "/tech/lfi-api-hub/v2.1/caap/open-api/consent-actions-validate"
    ]
  }
];
function anchorFor(section) {
  return `${section.errataId}-section-${section.number}`;
}
function errataPageUrl(section) {
  return `/tech/release-notes-and-erratas/erratas/${section.version}/#${anchorFor(section)}`;
}
const errataVersions = [
  ...new Set(ERRATA_SECTIONS.map((s) => s.version))
].sort();
export {
  ERRATA_SECTIONS as E,
  anchorFor as a,
  errataPageUrl as b,
  errataVersions as e
};
