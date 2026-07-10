// Shape of a Functional Certification portal "area" — one product family
// (Bank Data Sharing, Bank Service Initiation, Confirmation of Payee, Insurance
// Data Sharing, Insurance Quotation). Each area drives its own explainer page
// and submission portal from a single config object, so adding an area later is
// a config file plus two thin page wrappers — not new component code.

import type { HttpMethod } from '../endpoints/types'

/**
 * One Ozone Connect endpoint a TPP may exercise for this area. Derived from the
 * canonical endpoint registry (src/data/endpoints) and annotated with the
 * consent permissions that grant it and its TPP-facing (API Hub resource
 * server) equivalent path. The `supporting/tests` guard asserts this list stays
 * in lock-step with the fetched Ozone Connect OpenAPI spec.
 */
export interface FcEndpoint {
  /** Stable id — the Ozone Connect registry slug (e.g. 'accounts-AccountId-balances'). */
  slug: string
  method: HttpMethod
  /** Ozone Connect path the LFI implements — e.g. '/accounts/{AccountId}/balances'. */
  ozonePath: string
  /** Human title from the registry. */
  title: string
  /** Consent permission(s) that authorise this endpoint. */
  permissions: string[]
  /**
   * Path of the TPP-facing equivalent under the area's resource-server base
   * (e.g. '/accounts'). Undefined when the Hub exposes no direct TPP-facing
   * equivalent for this endpoint (e.g. Ozone Connect account product config).
   */
  tppPath?: string
}

/**
 * One cross-cutting consent-lifecycle operation an LFI or TPP must demonstrate
 * regardless of which data endpoints it certifies — e.g. retrieving, revoking,
 * suspending, or failing the authorization of a consent. Unlike {@link FcEndpoint}
 * these are declared directly (they act on the consent itself, not on a data
 * resource), so they are not derived from the endpoint registry.
 */
export interface FcConsentOp {
  /** Stable id — evidence folder + summary anchor (e.g. 'get-consent-by-id'). */
  slug: string
  /** Short label — e.g. 'Get consent by ConsentId'. */
  title: string
  method: HttpMethod
  /**
   * The path called, placeholders shown literally — e.g.
   * '/consents/{consentId}/action/revoke'. Not resolved; displayed as guidance.
   */
  path: string
  /**
   * Base URL template for the host this op is called against, with `{LFICODE}`
   * and `{VERSION}` placeholders. Differs from the area's data base URL because
   * consent-lifecycle ops target the API Hub Consent Manager (`cm.*`) or Headless
   * Heimdall (`hh.*`) rather than the resource server.
   */
  baseUrlTemplate: string
  /** One-line description of the scenario the certifier must demonstrate. */
  scenario: string
  /** Route path of the op's API-reference page, for a “see the spec” link. */
  docHref?: string
  /**
   * When true, the evidence block also collects the `error` and
   * `error_description` the certifier returns — used for the cancelled-
   * authorization (Headless Heimdall `doFail`) scenario, where the spec leaves
   * these values free-form and we want the certifier to state what they emit.
   */
  captureErrorDetails?: boolean
}

export interface FcArea {
  /** URL segment / stable key — e.g. 'bank-data-sharing'. */
  key: string
  /** Display label — e.g. 'Bank Data Sharing'. */
  label: string
  /** The API family name — e.g. 'Account Information'. */
  apiName: string
  /** Service Desk Certification Type value for this area's evidence ticket. */
  certType: string
  /**
   * TPP-facing base URL, with `{LFICODE}` and `{VERSION}` placeholders — e.g.
   * 'https://rs1.{LFICODE}.apihub.openfinance.ae/open-finance/account-information/{VERSION}'.
   * The portal substitutes the LFI code and the version selected on the form.
   */
  tppBaseUrlTemplate: string
  /**
   * Customer segments this area is certified per (e.g. Retail / SME / Corporate).
   * Present for banking areas; omit for insurance (no segment).
   */
  segments?: string[]
  /** Route path of the sandbox evidence source (Model Bank). */
  sandboxEvidenceHref: string
  /**
   * Sandbox discovery (`.well-known`) URL for the Model Bank — shown to TPPs as
   * the starting point for retrieving evidence. Optional (LFI areas omit it).
   */
  wellKnownUrl?: string
  /** Endpoints in scope, in presentation order. */
  endpoints: FcEndpoint[]
  /**
   * Cross-cutting consent-lifecycle operations always certified for this area,
   * independent of the endpoints selected — rendered as a fixed "Consent
   * management" evidence group. Omit when an area has none.
   */
  consentOps?: FcConsentOp[]
  /**
   * Config for the schema-validated consent (RAR / authorization_details)
   * editor on the submission form. When present, the portal renders an
   * EditableJson bound to this schema and seed; when omitted, it falls back to a
   * plain textarea. The seed is a single authorization_details entry (an object,
   * not the array) — enough to validate the shape against the OpenAPI schema.
   */
  rarEditor?: {
    /** Path of the OpenAPI spec that defines the schema (served from public/). */
    spec: string
    /** Schema name within the spec's components — e.g. the Bank Data Sharing RAR schema. */
    schemaName: string
    /** Seed object the editor pre-populates and validates against the schema. */
    initialData: Record<string, unknown>
  }
}

// ── Confirmation of Payee (scenario-based) ────────────────────────────────────
// CoP certification is not endpoint-based like Bank Data Sharing: there is a
// single Ozone Connect endpoint (`POST /customers/action/cop-query`) and the
// name-match verdict (Yes / Partial / No) is computed by the API Hub, not the
// LFI. So evidence is organised per *match outcome* rather than per endpoint. A
// submission proves each outcome for each selected segment, capturing the
// name + IBAN that was requested and — for the LFI — the name its cop-query
// returned, plus a Postman screenshot of the TPP-facing `/confirmation` verdict.

/** Whether a segment's account holders are matched by a personal or business name. */
export type CopNameType = 'personal' | 'business'

/** A customer segment and the name shape its Confirmation of Payee evidence uses. */
export interface CopSegment {
  /** Stable key / display label — 'Retail' | 'SME' | 'Corporate'. */
  key: string
  /** Personal segments carry a full/given/family name; business segments a business name. */
  nameType: CopNameType
}

/** One name-match outcome the submission must evidence. */
export interface CopOutcome {
  /** Stable key — 'yes' | 'partial' | 'no' | 'not-found'. */
  key: string
  /** Display label — e.g. 'Yes match'. */
  label: string
  /**
   * The `NameMatchIndicator` value the API Hub returns for this outcome, or ''
   * for the not-found case (the TPP-facing call returns 204 with no body).
   */
  indicator: string
  /**
   * Whether the LFI's cop-query returns an account-holder name for this outcome.
   * False for not-found — cop-query returns 200 with an empty data object.
   */
  returnsName: boolean
  /** Short instruction shown on the evidence block for how to produce this outcome. */
  guidance: string
}

export interface FcCopArea {
  /** Discriminator so pages/components can tell a CoP area from an endpoint area. */
  kind: 'cop'
  /** URL segment / stable key — 'confirmation-of-payee'. */
  key: string
  /** Display label — 'Confirmation of Payee'. */
  label: string
  /** API family name — 'Confirmation of Payee'. */
  apiName: string
  /** Which side is certifying — drives labels and whether response names are captured. */
  role: 'lfi' | 'tpp'
  /** Service Desk Certification Type value for this area's evidence ticket. */
  certType: string
  /** The single Ozone Connect endpoint the LFI implements. */
  ozoneEndpoint: { method: string; path: string }
  /** TPP-facing endpoints exercised through the API Hub. */
  tppEndpoints: { method: string; path: string; title: string }[]
  /**
   * TPP-facing base URL with `{LFICODE}` and `{VERSION}` placeholders — e.g.
   * 'https://rs1.{LFICODE}.apihub.openfinance.ae/open-finance/confirmation-of-payee/{VERSION}'.
   */
  baseUrlTemplate: string
  /** Segments the LFI may certify; each fixes the name type of its scenarios. */
  segments: CopSegment[]
  /** Match outcomes evidenced for every selected segment, in presentation order. */
  outcomes: CopOutcome[]
  /** Whether a single Testing Tool report for cop-query is required (LFI). */
  requiresTestingTool: boolean
  /** Whether each scenario captures the name the cop-query returned (LFI only). */
  captureResponseName: boolean
  /** Route path of the sandbox evidence source (Model Bank). */
  sandboxEvidenceHref: string
  /** Sandbox discovery (`.well-known`) URL for the Model Bank. Optional (LFI omits). */
  wellKnownUrl?: string
}
