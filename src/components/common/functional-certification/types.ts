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
