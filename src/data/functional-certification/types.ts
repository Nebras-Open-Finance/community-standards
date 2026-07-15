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

// ── Bank Service Initiation — Payments (per payment type) ─────────────────────
// Payments certification is neither endpoint-based (like Bank Data Sharing) nor
// match-outcome-based (like Confirmation of Payee). It is organised per *payment
// type* — Single Instant Payment first, then the six Multi-Payment variants — and
// each type is its own standalone area (its own explainer page, submission
// portal, and Service Desk ticket). The evidence a Single Instant Payment area
// collects is scenario-shaped: which rails the LFI supports and the terminal
// status each reaches; the POST→rail and POST→terminal-PATCH timings (AANI only);
// the Creditor decryption/validation and Risk handling the encryption model
// requires; and two consent-shape scenarios — account+balance reads before a
// payment, and a refund-account read after one. See FcPaymentArea below.

/**
 * One UAE domestic payment rail an LFI may support for a payment type. The
 * terminal Open Finance status differs per rail (see the Payment Status page):
 * AANI resolves to AcceptedWithoutPosting; intra-bank and UAEFTS resolve to
 * AcceptedCreditSettlementCompleted. `timed` marks the rail whose POST→rail and
 * POST→terminal-PATCH delays are evidenced — only AANI, the primary instant rail.
 */
export interface FcPaymentRail {
  /** Stable key — 'aani' | 'intra-bank' | 'uaefts'. */
  key: string
  /** Display label — 'AANI' | 'Intra-bank' | 'UAEFTS'. */
  label: string
  /** The terminal Open Finance payment status a successful payment reaches on this rail. */
  terminalStatus: string
  /** One-line note on how this rail resolves (shown alongside the terminal status). */
  note: string
  /** Whether this rail's POST→rail and POST→terminal-PATCH delays are evidenced (AANI only). */
  timed: boolean
}

/**
 * One Ozone Connect (or Consent Manager) operation a payment-type area names, for
 * display and for the drift guard. Unlike {@link FcEndpoint} these are declared
 * directly with an absolute base URL template, because a payment area spans two
 * hosts — the resource server (POST/GET payments, refund) and the Consent Manager
 * Payment Log (the terminal-status PATCH) — and is not derived from the registry.
 */
export interface FcPaymentEndpoint {
  slug: string
  method: HttpMethod
  /** The path, placeholders shown literally — e.g. '/payments/{PaymentId}'. */
  path: string
  title: string
  /** Base URL template for the host, with `{LFICODE}`/`{VERSION}` placeholders. */
  baseUrlTemplate: string
  /** Route path of the operation's API-reference page, for a "see the spec" link. */
  docHref?: string
}

/**
 * One authorisation-screen scenario an LFI evidences for a payment type. The
 * customer authorises the payment consent at the LFI, so the LFI is the only
 * party that can screenshot what its authorisation page shows — the debtor
 * account when the TPP specified it in the consent, and each Confirmation of
 * Payee NameMatchIndicator (the AEAccountNameMatchIndicators enum:
 * ConfirmationOfPayee.Yes / .Partial / .No) surfaced to the customer. Each
 * scenario is its own pre-production consent, so each captures a ConsentId and a
 * screenshot of the authorisation page for that consent.
 */
export interface FcPaymentAuthScenario {
  /** Stable key — 'debtor-tpp' | 'cop-yes' | 'cop-partial' | 'cop-no'. */
  key: string
  /** Display label — e.g. 'Debtor account specified at the TPP'. */
  label: string
  /**
   * The `NameMatchIndicator` the API Hub returns for a Confirmation of Payee
   * scenario — e.g. 'ConfirmationOfPayee.Partial'. Omitted for the debtor case.
   */
  indicator?: string
  /** Short instruction shown on the evidence block for how to produce this scenario. */
  guidance: string
}

export interface FcPaymentArea {
  /** Discriminator so pages/components can tell a payment area apart. */
  kind: 'payment'
  /** URL segment / stable key — 'single-instant-payment'. */
  key: string
  /** Display label — 'Single Instant Payment'. */
  label: string
  /** API family name — 'Bank Service Initiation'. */
  apiName: string
  /** The `Type` value this area certifies — e.g. 'SingleInstantPayment'. */
  paymentType: string
  /** Which side certifies — 'lfi' for now (TPP payments certification is separate). */
  role: 'lfi'
  /** Service Desk Certification Type value for this area's evidence ticket. */
  certType: string
  /**
   * TPP-facing payments base URL, with `{LFICODE}`/`{VERSION}` placeholders — e.g.
   * 'https://rs1.{LFICODE}.apihub.openfinance.ae/open-finance/payment/{VERSION}'.
   */
  tppBaseUrlTemplate: string
  /**
   * TPP-facing account-information base URL — the account + balance reads a
   * payment consent can carry (ReadAccountsBasic/Detail/ReadBalances) are served
   * from here, not the payments base.
   */
  accountInfoBaseUrlTemplate: string
  /** Customer segments this type is certified per (Retail / SME / Corporate). */
  segments: string[]
  /** Ozone Connect endpoints in scope, plus the Consent Manager Payment Log PATCH. */
  endpoints: FcPaymentEndpoint[]
  /** Rails the LFI may declare support for; each fixes its terminal status. */
  rails: FcPaymentRail[]
  /**
   * Authorisation-screen scenarios the LFI evidences — the debtor account when
   * specified at the TPP, and each Confirmation of Payee name-match outcome shown
   * on the authorisation page. Each is its own pre-production consent.
   */
  authScreenScenarios: FcPaymentAuthScenario[]
  /** Route path of the sandbox evidence source (Model Bank). */
  sandboxEvidenceHref: string
  /** Route path of the Payment Status reference page (rails ↔ terminal statuses). */
  paymentStatusDocHref: string
  /** Route path of the payment-account-permissions article (data-sharing on a payment). */
  accountPermsDocHref: string
  /** Route path of the Refunds API guide. */
  refundsDocHref: string
}

// ── Bank Service Initiation — Multi-Payment types + Delegated SCA ─────────────
// The six Multi-Payment variants (Fixed/Variable × OnDemand/PeriodicSchedule/
// DefinedSchedule) and the Delegated SCA overlay are certified after Single
// Instant Payment, and — unlike SIP — the evidence is entirely about the
// *consent*: the LFI proves it ingests, displays on its authorization screen, and
// will enforce the ControlParameters. Each type is a standalone area (own page +
// ticket) but they share one config shape, one portal, and one summary builder.
// Two consent scenarios are evidenced per type: one with every optional control
// parameter set (cumulative caps, per-period controls), and one with only the
// required minimum. See FcMultiPaymentArea below.

/** One consent scenario an LFI evidences — all optional controls set, or only the required minimum. */
export interface FcConsentScenario {
  /** Stable key — 'all-set' | 'optional-not-set'. */
  key: 'all-set' | 'optional-not-set'
  /** Display label — e.g. 'All control parameters set'. */
  label: string
  /** What this scenario proves and how to construct the consent. */
  guidance: string
  /** Pretty-printed example ControlParameters JSON for this scenario (guidance only). */
  example: string
}

export interface FcMultiPaymentArea {
  /** Discriminator so pages/components can tell a multi-payment area apart. */
  kind: 'multi-payment'
  /** URL segment / stable key — e.g. 'variable-on-demand'. */
  key: string
  /** Display label — e.g. 'Variable On-Demand'. */
  label: string
  /** API family name — 'Bank Service Initiation'. */
  apiName: string
  /** The `Type` value this area certifies — e.g. 'VariableOnDemand'; 'DelegatedSCA' for the overlay. */
  paymentType: string
  /** True for the Delegated SCA overlay (IsDelegatedAuthentication), which layers on a multi-payment. */
  isDelegatedSca?: boolean
  /** Which side certifies — 'lfi' for now. */
  role: 'lfi'
  /** Service Desk Certification Type value for this area's evidence ticket. */
  certType: string
  /** TPP-facing payments base URL, with `{LFICODE}`/`{VERSION}` placeholders. */
  tppBaseUrlTemplate: string
  /** Customer segments this type is certified per (Retail / SME / Corporate). */
  segments: string[]
  /** ControlParameters this type always carries (required), for the explainer. */
  requiredControls: string[]
  /** Optional ControlParameters — present in the all-set scenario, omitted in the other. */
  optionalControls: string[]
  /** Route path of this type's API guide. */
  docHref: string
  /** Route path of the sandbox evidence source (Model Bank). */
  sandboxEvidenceHref: string
  /** The two consent scenarios evidenced (all-set, optional-not-set). */
  scenarios: FcConsentScenario[]
  /**
   * Beneficiary-model evidence, present only where a payment type supports more
   * than the Single beneficiary model (Variable On-Demand). When set, the portal
   * additionally collects — per model — a consent evidencing that beneficiary
   * shape: the ConsentId, (for Multiple) the `Initiation.Creditor` array, and the
   * authorization screen. Omitted for types that only accept a single beneficiary.
   */
  beneficiaryModels?: FcBeneficiaryModel[]
  /** Route path of the Creditor PII page (beneficiary-model definitions). Set with beneficiaryModels. */
  creditorDocHref?: string
}

// ── Bank Service Initiation — Beneficiary model (within a payment type) ───────
// A Variable On-Demand consent can be authorised against one of three beneficiary
// models, fixed by the cardinality of the decrypted PII's `Initiation.Creditor`:
// Single (exactly 1 entry), Multiple (2–10 entries), or Open (the array omitted —
// no creditor fixed at consent time; the creditor is supplied and validated at
// POST /payments instead). See the Creditor PII page for the model definitions.
// Single is implied by a plain consent, so the Variable On-Demand area additionally
// evidences the Multiple and Open models as required evidence: for each, a reference
// decrypted PII payload the LFI works against, the pre-production ConsentId, (for
// Multiple) the `Initiation.Creditor` array carried on the consent, and a screenshot
// of the authorization screen the customer saw. Attached to FcMultiPaymentArea via
// `beneficiaryModels`.

export interface FcBeneficiaryModel {
  /** Stable key — 'multiple' | 'open'. */
  key: 'multiple' | 'open'
  /** Display label — e.g. 'Multiple Beneficiaries'. */
  label: string
  /** One-line description of the model, shown on the evidence group. */
  description: string
  /**
   * The Trust Framework `ApiMetadata` flag the LFI must advertise to accept this
   * beneficiary model — e.g. 'ApiMetadata.VariableOnDemand.MultipleBeneficiariesSupported'.
   */
  trustFrameworkFlag: string
  /**
   * Pretty-printed reference decrypted PII payload shown to the LFI — the
   * `Initiation` shape for this model (a 2–10 entry `Creditor` array for Multiple,
   * or `Creditor` omitted for Open). Guidance only; the LFI evidences its own consent.
   */
  referencePii: string
  /**
   * Whether the LFI submits the consent-time `Initiation.Creditor` array. True for
   * Multiple (2–10 entries fixed at consent); false for Open (no creditor at
   * consent — the reference PII shows the array omitted).
   */
  collectsCreditorArray: boolean
}

// ── Bank Service Initiation — Delegated SCA ───────────────────────────────────
// Delegated SCA is the IsDelegatedAuthentication overlay on a payment consent:
// the consent carries IsDelegatedAuthentication: true with an empty
// ConsentSchedule, so the TPP defines and manages the payment controls. Unlike
// the six Multi-Payment types there are therefore no ControlParameters scenarios
// to evidence. What the LFI proves instead is scenario-shaped: the payment limit
// it enforces for Delegated SCA; its Creditor decryption / validation and Risk
// handling (the same encryption-model evidence as Single Instant Payment — it may
// differ slightly under delegation); and one authorised pre-production consent for
// each of the three beneficiary models — Single, Multiple, and Open — with the
// ConsentId and the authorization screen the customer saw. See FcDelegatedScaArea.

/** One beneficiary model a Delegated SCA consent may be authorised against. */
export interface FcDelegatedScaBeneficiary {
  /** Stable key — 'single' | 'multiple' | 'open'. */
  key: 'single' | 'multiple' | 'open'
  /** Display label — e.g. 'Multiple Beneficiaries'. */
  label: string
  /** One-line description of the model, shown on the evidence group. */
  description: string
  /**
   * Pretty-printed reference decrypted PII payload showing the `Initiation` shape
   * for this model — a single Creditor entry (Single), a 2–10 entry array
   * (Multiple), or the array omitted (Open). Guidance only; the LFI evidences its
   * own consent.
   */
  referencePii: string
  /**
   * The Trust Framework `ApiMetadata` flag the LFI must advertise to accept this
   * beneficiary model, when one applies — omitted for Single (the default model
   * every LFI supports).
   */
  trustFrameworkFlag?: string
}

export interface FcDelegatedScaArea {
  /** Discriminator so pages/components can tell a Delegated SCA area apart. */
  kind: 'delegated-sca'
  /** URL segment / stable key — 'delegated-sca'. */
  key: 'delegated-sca'
  /** Display label — 'Delegated SCA'. */
  label: string
  /** API family name — 'Bank Service Initiation'. */
  apiName: string
  /** The value shown for the payment type — 'DelegatedSCA' (IsDelegatedAuthentication). */
  paymentType: string
  /** Which side certifies — 'lfi' for now. */
  role: 'lfi'
  /** Service Desk Certification Type value for this area's evidence ticket. */
  certType: string
  /** TPP-facing payments base URL, with `{LFICODE}`/`{VERSION}` placeholders. */
  tppBaseUrlTemplate: string
  /** Customer segments this type is certified per (Retail / SME / Corporate). */
  segments: string[]
  /** Route path of the Delegated SCA API guide. */
  docHref: string
  /** Route path of the Creditor PII page (beneficiary-model definitions). */
  creditorDocHref: string
  /** Route path of the sandbox evidence source (Model Bank). */
  sandboxEvidenceHref: string
  /** The three beneficiary models evidenced (single, multiple, open). */
  beneficiaries: FcDelegatedScaBeneficiary[]
}

// ── Bank Service Initiation — TPP (consumer) side, all payment types in one area ─
// The TPP side of payments certification is a single "Domestic Payments" area, not
// one area per type: the TPP ticks the payment types it offers, and for each one
// provides the two objects it is responsible for constructing — the Consent
// (authorization_details / RAR) it sends at PAR, and the Risk (AERisk) object it
// sends for fraud scoring — plus a Postman example of a payment made against a
// consent of that type. Delegated SCA additionally evidences the authentication the
// TPP performs itself and how it populates Risk.DebtorIndicators.Authentication.
// Separately, a TPP may declare it uses the account/balance reads a payment consent
// can carry (evidenced before the payment) and/or Refunds (evidenced after it). See
// FcTppPaymentArea below and src/data/functional-certification/domestic-payments-tpp.ts.

/** One domestic payment type a TPP can certify it offers. */
export interface FcTppPaymentType {
  /** URL/stable key — e.g. 'variable-on-demand'. */
  key: string
  /** Display label — e.g. 'Variable On-Demand'. */
  label: string
  /** The `Type` this consent carries — e.g. 'VariableOnDemand'; 'DelegatedSCA' for the overlay. */
  paymentType: string
  /** True for Delegated SCA (IsDelegatedAuthentication: true) — adds the TPP-side SCA evidence. */
  isDelegatedSca?: boolean
  /** One-line summary of the consent shape, shown on the type's evidence block. */
  summary: string
  /** Route path of this type's TPP API guide. */
  docHref: string
  /** Name of the Postman collection request that initiates a payment for this type. */
  postmanRequest: string
  /**
   * Seed authorization_details (Consent / RAR) object the editor pre-populates.
   * A single authorization_details entry, valid against `consentEditor.schemaName`.
   */
  consentSeed: Record<string, unknown>
  /** Seed AERisk object the editor pre-populates, valid against `riskEditor.schemaName`. */
  riskSeed: Record<string, unknown>
}

/**
 * An optional capability a TPP may declare on top of initiating payments — the
 * account + balance reads a payment consent can carry (evidenced *before* the
 * payment) or Refunds (evidenced *after* it). Each is evidenced by a Postman
 * screenshot of a successful call to the TPP-facing endpoint(s) it names.
 */
export interface FcTppPaymentCapability {
  /** Stable key — 'accounts-balances' | 'refunds'. */
  key: string
  /** Display label — e.g. 'Accounts & Balances'. */
  label: string
  /** When in the payment lifecycle this is evidenced. */
  timing: 'before' | 'after'
  /** One-line description shown on the toggle and the evidence block. */
  description: string
  /** TPP-facing base URL for these endpoints, with `{VERSION}` placeholder. */
  baseUrlTemplate: string
  /** The TPP-facing endpoints exercised, with the consent permission that grants each. */
  endpoints: { method: HttpMethod; path: string; permission: string }[]
  /** Route path of the relevant API guide. */
  docHref: string
}

export interface FcTppPaymentArea {
  /** Discriminator so pages/components can tell a TPP payment area apart. */
  kind: 'payment-tpp'
  /** URL/stable key — 'domestic-payments'. */
  key: string
  /** Display label — 'Domestic Payments'. */
  label: string
  /** API family name — 'Bank Service Initiation'. */
  apiName: string
  /** Which side certifies — 'tpp'. */
  role: 'tpp'
  /** Service Desk Certification Type value for this area's evidence ticket. */
  certType: string
  /** TPP-facing payments base URL (sandbox Model Bank), with `{VERSION}` placeholder. */
  tppBaseUrlTemplate: string
  /** Sandbox discovery (`.well-known`) URL for the Model Bank. */
  wellKnownUrl?: string
  /** Route path of the sandbox evidence source (Model Bank). */
  sandboxEvidenceHref: string
  /** Route path of the Postman guide, for a "get the collection" link. */
  postmanGuideHref: string
  /** OpenAPI spec + schema name for the schema-validated Consent editor. */
  consentEditor: { spec: string; schemaName: string }
  /** OpenAPI spec + schema name for the schema-validated Risk editor. */
  riskEditor: { spec: string; schemaName: string }
  /** The eight domestic payment types a TPP can certify, in presentation order. */
  types: FcTppPaymentType[]
  /** Optional capabilities the TPP may additionally declare (accounts/balances, refunds). */
  capabilities: FcTppPaymentCapability[]
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
