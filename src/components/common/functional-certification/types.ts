// Runtime (form) state for the Functional Certification portal. Distinct from
// the static area config in src/data/functional-certification — this is what the
// LFI fills in and what the generated bundle is built from.

import { CURRENT_VERSION, type Version } from '@/data/versions'

export type EndpointOutcome = 'all-pass' | 'issues' | ''

/**
 * Evidence for one cross-cutting consent-lifecycle operation (see FcConsentOp).
 * Every op takes a Postman screenshot; the cancelled-authorization op also
 * records the `error` and `error_description` the certifier returns on do-fail.
 * Shared by the LFI and TPP portals.
 */
export interface ConsentOpState {
  /** Postman screenshot of the successful call. */
  postman: File | null
  /** OAuth2/OIDC `error` returned on cancel — only used when captureErrorDetails. */
  error: string
  /** Human-readable `error_description` — only used when captureErrorDetails. */
  errorDescription: string
}

export function emptyConsentOpState(): ConsentOpState {
  return { postman: null, error: '', errorDescription: '' }
}

/** Evidence an LFI provides for one selected endpoint. */
export interface EndpointState {
  selected: boolean
  /** Testing Tool HTML output for the Ozone Connect endpoint. */
  testLog: File | null
  /** Whether every test passed, or some failed / were skipped. */
  outcome: EndpointOutcome
  /** Required when outcome is 'issues': why tests failed or were skipped. */
  notes: string
  /** Postman screenshot of a successful call to the TPP-facing equivalent. */
  postman: File | null
  /** Full JSON response body from the TPP-facing equivalent. */
  responseJson: File | null
}

export function emptyEndpointState(): EndpointState {
  return { selected: false, testLog: null, outcome: '', notes: '', postman: null, responseJson: null }
}

/** The non-endpoint form fields. */
export interface FcFormState {
  /** Standards version being certified — chosen from the version dropdown options. */
  version: Version
  /** Customer segments being certified (Retail / SME / Corporate); [] when N/A. */
  segment: string[]
  /** Free-text reviewer comments included in the submission. */
  comments: string
}

export function emptyFormState(): FcFormState {
  return { version: CURRENT_VERSION, segment: [], comments: '' }
}

// ── TPP portal ──────────────────────────────────────────────────────────────
// The TPP flow is the consumer side: it demonstrates a TPP can retrieve data
// from the sandbox Model Bank. Per endpoint, the only evidence is a Postman
// screenshot of a successful retrieval.

export interface TppEndpointState {
  selected: boolean
  /** Postman screenshot showing the data retrieved from the Model Bank. */
  postman: File | null
  /** Optional per-endpoint notes. */
  notes: string
}

export function emptyTppEndpointState(): TppEndpointState {
  return { selected: false, postman: null, notes: '' }
}

export interface FcTppFormState {
  /** Standards version being certified — chosen from the version dropdown options. */
  version: Version
  /** Customer segments being certified (Retail / SME / Corporate); [] when N/A. */
  segment: string[]
  /** Brief write-up of the use case for consuming this data. */
  useCase: string
  /** The authorization_details (RAR) object sent in the consent. */
  rarObject: string
  /** Confirms the RAR permissions align to the selected endpoints. */
  alignmentConfirmed: boolean
  /** Free-text reviewer comments included in the submission. */
  comments: string
}

export function emptyTppFormState(): FcTppFormState {
  return { version: CURRENT_VERSION, segment: [], useCase: '', rarObject: '', alignmentConfirmed: false, comments: '' }
}

// ── Confirmation of Payee portal ─────────────────────────────────────────────
// CoP evidence is per match outcome, per segment — not per endpoint. Each
// scenario records the name + IBAN that was requested, the name the LFI's
// cop-query returned (personal segments carry first/last; business a business
// name), and a Postman screenshot of the TPP-facing /confirmation verdict. The
// not-found scenario returns no name, so it is evidenced by confirming the
// empty 200 / 204 response instead.

export interface CopScenarioState {
  /** Requested name — full name (personal) or business name (business). */
  reqName: string
  /** Requested given/first name (personal segments only; optional per the spec). */
  reqFirstName: string
  /** Requested family/last name (personal segments only; optional per the spec). */
  reqLastName: string
  /** The IBAN the confirmation was requested against. */
  reqIban: string
  /** Name the cop-query returned — full name (personal) or business name (business). */
  resName: string
  /** Returned given/first name (personal segments only). */
  resFirstName: string
  /** Returned family/last name (personal segments only). */
  resLastName: string
  /** Postman screenshot of the TPP-facing /confirmation response showing the verdict. */
  postman: File | null
  /** Not-found only: confirms cop-query returned empty data / the call returned 204. */
  confirmedEmpty: boolean
  /** Optional per-scenario notes. */
  notes: string
}

export function emptyCopScenarioState(): CopScenarioState {
  return {
    reqName: '',
    reqFirstName: '',
    reqLastName: '',
    reqIban: '',
    resName: '',
    resFirstName: '',
    resLastName: '',
    postman: null,
    confirmedEmpty: false,
    notes: '',
  }
}

export interface CopFormState {
  /** Standards version being certified — chosen from the version dropdown options. */
  version: Version
  /** Segments being certified (Retail / SME / Corporate); each drives its scenarios. */
  segment: string[]
  /** Single Testing Tool HTML report for the cop-query endpoint (LFI). */
  testingTool: File | null
  /** Free-text reviewer comments included in the submission. */
  comments: string
}

export function emptyCopFormState(): CopFormState {
  return { version: CURRENT_VERSION, segment: [], testingTool: null, comments: '' }
}

// ── Payments (Single Instant Payment) portal ─────────────────────────────────
// A payment area's evidence is scenario-shaped, not per-endpoint: the LFI
// declares the rails it supports and evidences each rail's terminal status, times
// the AANI POST→rail and POST→terminal windows, evidences Creditor decryption /
// validation and Risk handling, and evidences two consent-shape scenarios — the
// account + balance reads a payment consent can carry before the payment, and the
// refund-account read after it. See src/data/functional-certification/types.ts
// (FcPaymentArea) for the config side.

/** Evidence that a supported rail reaches its terminal status. */
export interface PaymentRailState {
  /** Whether the LFI supports (and is certifying) this rail. */
  supported: boolean
  /** Postman screenshot evidencing the terminal status on this rail. */
  postman: File | null
}

export function emptyPaymentRailState(): PaymentRailState {
  return { supported: false, postman: null }
}

/**
 * AANI timing evidence — the two delays the LFI measures for the instant rail.
 * Timestamps are captured as text (ISO or as shown in Postman/logs) alongside a
 * screenshot; the portal restates them and the derived deltas in the summary.
 */
export interface PaymentTimingState {
  /** Timestamp the POST /payments 201 (status Pending) was returned. */
  postTimestamp: string
  /** Timestamp the payment was submitted to the AANI rail. */
  railSubmitTimestamp: string
  /** Screenshot evidencing the rail submission (and its timestamp). */
  railSubmitScreenshot: File | null
  /** Timestamp the terminal-status PATCH to the Payment Log was made. */
  terminalPatchTimestamp: string
  /** Screenshot evidencing the terminal-status PATCH (and its timestamp). */
  terminalPatchScreenshot: File | null
}

export function emptyPaymentTimingState(): PaymentTimingState {
  return {
    postTimestamp: '',
    railSubmitTimestamp: '',
    railSubmitScreenshot: null,
    terminalPatchTimestamp: '',
    terminalPatchScreenshot: null,
  }
}

/**
 * AANI rejection example — one payment rejected on the AANI rail, evidencing that
 * the LFI maps the rail outcome to the Rejected status with a correctly
 * namespaced AANI.<code> reason (not transposed into the LFI. namespace).
 */
export interface PaymentAaniRejectState {
  /** The AANI-namespaced reject reason code relayed — e.g. AANI.AM04. */
  rejectCode: string
  /** Postman screenshot showing Rejected with the AANI.<code> reason. */
  postman: File | null
}

export function emptyPaymentAaniRejectState(): PaymentAaniRejectState {
  return { rejectCode: '', postman: null }
}

/**
 * Creditor validation and Risk handling — driven by the encryption model. The
 * Creditor account arrives inside the encrypted PersonalIdentifiableInformation,
 * so the LFI evidences decrypting it and validating the creditor; the cleartext
 * Risk object (AERisk) is evidenced as received and used in screening.
 */
export interface PaymentCreditorRiskState {
  /** Screenshot evidencing decryption of the payment PII. */
  decryptScreenshot: File | null
  /** Screenshot evidencing Creditor validation (reachability / CoP confirmation). */
  creditorScreenshot: File | null
  /**
   * Write-up of the fields and validations the LFI places on the TPP when
   * validating the Creditor — anything beyond the OpenAPI spec (e.g. always
   * requiring the IBAN).
   */
  creditorValidationText: string
  /** Screenshot evidencing the Risk object is received and used in fraud/screening. */
  riskScreenshot: File | null
  /** Write-up of any Risk-object validations the LFI performs beyond the OpenAPI spec. */
  riskValidationText: string
}

export function emptyPaymentCreditorRiskState(): PaymentCreditorRiskState {
  return {
    decryptScreenshot: null,
    creditorScreenshot: null,
    creditorValidationText: '',
    riskScreenshot: null,
    riskValidationText: '',
  }
}

/** The account + balance reads carried on the payment consent, before the payment. */
export interface PaymentDataSharingState {
  /** The pre-production ConsentId this scenario was run against. */
  consentId: string
  /** Postman: successful GET /accounts (ReadAccountsBasic / ReadAccountsDetail). */
  accountsPostman: File | null
  /** Postman: successful GET /accounts/{AccountId}/balances (ReadBalances). */
  balancesPostman: File | null
  /** Postman: the subsequent successful POST /payments. */
  postPaymentsPostman: File | null
  /** Screenshot of the authorisation page for this consent. */
  authScreenshot: File | null
}

export function emptyPaymentDataSharingState(): PaymentDataSharingState {
  return {
    consentId: '',
    accountsPostman: null,
    balancesPostman: null,
    postPaymentsPostman: null,
    authScreenshot: null,
  }
}

/** The refund-account read carried on the payment consent, after the payment. */
export interface PaymentRefundState {
  /** The pre-production ConsentId this scenario was run against. */
  consentId: string
  /** Postman: the successful POST /payments. */
  postPaymentsPostman: File | null
  /** Postman: successful GET /payment-consents/{ConsentId}/refund (ReadRefundAccount). */
  refundPostman: File | null
  /** Screenshot of the authorisation page for this consent. */
  authScreenshot: File | null
}

export function emptyPaymentRefundState(): PaymentRefundState {
  return { consentId: '', postPaymentsPostman: null, refundPostman: null, authScreenshot: null }
}

/**
 * One authorisation-screen scenario's evidence (see FcPaymentAuthScenario) — the
 * debtor-account-at-TPP case and each Confirmation of Payee outcome. Every
 * scenario is its own pre-production consent, so each carries a ConsentId and a
 * screenshot of the authorisation page for that consent.
 */
export interface PaymentAuthScenarioState {
  /** The pre-production ConsentId this authorisation screen belongs to. */
  consentId: string
  /** Screenshot of the authorisation page for this scenario. */
  screenshot: File | null
}

export function emptyPaymentAuthScenarioState(): PaymentAuthScenarioState {
  return { consentId: '', screenshot: null }
}

export interface PaymentFormState {
  /** Standards version being certified — chosen from the version dropdown options. */
  version: Version
  /** Segments being certified (Retail / SME / Corporate). */
  segment: string[]
  /** Maximum amount, in AED, a single payment can take on this LFI (parity limit). */
  paymentLimit: string
  /** Optional Postman screenshot of a payment rejected for exceeding the limit. */
  limitScreenshot: File | null
  /** Testing Tool HTML report for the Ozone Connect POST /payments endpoint. */
  testingTool: File | null
  /** Postman: successful POST /payments returning 201 with status Pending. */
  postPaymentsPostman: File | null
  /** Free-text reviewer comments included in the submission. */
  comments: string
}

export function emptyPaymentFormState(): PaymentFormState {
  return {
    version: CURRENT_VERSION,
    segment: [],
    paymentLimit: '',
    limitScreenshot: null,
    testingTool: null,
    postPaymentsPostman: null,
    comments: '',
  }
}

// ── Multi-Payment types + Delegated SCA portal ───────────────────────────────
// These certs are consent-focused: for each type the LFI evidences two
// pre-production consents (all optional control parameters set, and only the
// required minimum). Each scenario captures the ConsentId, the consent details,
// and a screenshot of the authorization screen linked to that consent.

export interface ConsentScenarioState {
  /** The pre-production ConsentId for this scenario. */
  consentId: string
  /** The consent details — the ControlParameters / authorization_details, pasted as JSON. */
  consentDetails: string
  /** Screenshot of the authorization screen linked to this consent. */
  authScreenshot: File | null
}

export function emptyConsentScenarioState(): ConsentScenarioState {
  return { consentId: '', consentDetails: '', authScreenshot: null }
}

export interface MultiPaymentFormState {
  /** Standards version being certified — chosen from the version dropdown options. */
  version: Version
  /** Segments being certified (Retail / SME / Corporate). */
  segment: string[]
  /** JIRA ticket number of this LFI's completed Single Instant Payment certification. */
  sipJiraTicket: string
  /** Optional Testing Tool HTML report for the Ozone Connect payment endpoints. */
  testingTool: File | null
  /** Free-text reviewer comments included in the submission. */
  comments: string
}

export function emptyMultiPaymentFormState(): MultiPaymentFormState {
  return { version: CURRENT_VERSION, segment: [], sipJiraTicket: '', testingTool: null, comments: '' }
}

// ── Beneficiary-model evidence (within the Variable On-Demand portal) ─────────
// The Variable On-Demand area additionally evidences the Multiple and Open
// beneficiary models. Each model evidences a single consent of that beneficiary
// shape: the pre-production ConsentId, (for Multiple) the consent-time
// `Initiation.Creditor` array, and a screenshot of the authorization screen. See
// src/data/functional-certification/types.ts (FcBeneficiaryModel) for the config.

export interface BeneficiaryModelState {
  /** The pre-production ConsentId evidenced for this beneficiary model. */
  consentId: string
  /**
   * The consent-time `Initiation.Creditor` array, pasted as JSON. Only collected
   * for the Multiple model; the Open model omits the array (nothing to paste).
   */
  creditorArray: string
  /** Screenshot of the authorization screen the customer saw for this consent. */
  authScreenshot: File | null
}

export function emptyBeneficiaryModelState(): BeneficiaryModelState {
  return { consentId: '', creditorArray: '', authScreenshot: null }
}

// ── Delegated SCA portal ─────────────────────────────────────────────────────
// Delegated SCA is consent-focused but distinct from the six Multi-Payment types:
// the TPP manages the ControlParameters (IsDelegatedAuthentication: true, empty
// ConsentSchedule), so there are no control-parameter scenarios. The LFI states
// the payment limit it enforces, re-evidences the Creditor / Risk handling from
// Single Instant Payment (it may differ under delegation — reuses
// PaymentCreditorRiskState above), and evidences one authorised consent for each
// beneficiary model — Single, Multiple, Open — each captured as a ConsentId and an
// authorization-screen screenshot (reuses PaymentAuthScenarioState above). See
// src/data/functional-certification/types.ts (FcDelegatedScaArea).

export interface DelegatedScaFormState {
  /** Standards version being certified — chosen from the version dropdown options. */
  version: Version
  /** Segments being certified (Retail / SME / Corporate). */
  segment: string[]
  /** Maximum amount, in AED, a single Delegated SCA payment can take on this LFI. */
  paymentLimit: string
  /** Optional Postman screenshot of a payment rejected for exceeding the limit. */
  limitScreenshot: File | null
  /** JIRA ticket number of this LFI's completed Single Instant Payment certification. */
  sipJiraTicket: string
  /** Optional Testing Tool HTML report for the Ozone Connect payment endpoints. */
  testingTool: File | null
  /** Free-text reviewer comments included in the submission. */
  comments: string
}

export function emptyDelegatedScaFormState(): DelegatedScaFormState {
  return {
    version: CURRENT_VERSION,
    segment: [],
    paymentLimit: '',
    limitScreenshot: null,
    sipJiraTicket: '',
    testingTool: null,
    comments: '',
  }
}

// ── Domestic Payments — TPP (consumer) portal ────────────────────────────────
// One area covering every domestic payment type. The TPP ticks the types it
// offers and, for each, provides the two objects it constructs — the Consent
// (authorization_details / RAR) and the Risk (AERisk) object, both edited in a
// schema-validated JSON editor — plus a Postman example of a payment made against
// a consent of that type. Delegated SCA additionally evidences the TPP's own
// pre-payment authentication and how it manifests in Risk.DebtorIndicators.
// Authentication. See src/data/functional-certification/types.ts (FcTppPaymentArea).

export interface TppPaymentTypeState {
  /** Whether the TPP offers (and is certifying) this payment type. */
  selected: boolean
  /** The Consent (authorization_details) JSON — seeded from the type, edited in-place. */
  consentJson: string
  /** The Risk (AERisk) JSON — seeded from the type, edited in-place. */
  riskJson: string
  /** Postman screenshot of a payment initiated against a consent of this type. */
  paymentPostman: File | null
  /** Delegated SCA only — screenshot of the authentication the TPP performs before a payment. */
  authScreenshot: File | null
  /** Delegated SCA only — how that authentication maps to Risk.DebtorIndicators.Authentication. */
  authExplanation: string
}

export function emptyTppPaymentTypeState(): TppPaymentTypeState {
  return {
    selected: false,
    consentJson: '',
    riskJson: '',
    paymentPostman: null,
    authScreenshot: null,
    authExplanation: '',
  }
}

/** Evidence for one optional capability (accounts/balances before, refunds after). */
export interface TppPaymentCapabilityState {
  /** Whether the TPP uses (and is evidencing) this capability. */
  used: boolean
  /** Postman screenshot of the successful call(s) to the capability's endpoints. */
  postman: File | null
}

export function emptyTppPaymentCapabilityState(): TppPaymentCapabilityState {
  return { used: false, postman: null }
}

export interface PaymentTppFormState {
  /** Standards version being certified — chosen from the version dropdown options. */
  version: Version
  /** Brief write-up of the use case for offering domestic payments. */
  useCase: string
  /** Free-text reviewer comments included in the submission. */
  comments: string
}

export function emptyPaymentTppFormState(): PaymentTppFormState {
  return { version: CURRENT_VERSION, useCase: '', comments: '' }
}
