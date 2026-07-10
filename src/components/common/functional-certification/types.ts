// Runtime (form) state for the Functional Certification portal. Distinct from
// the static area config in src/data/functional-certification — this is what the
// LFI fills in and what the generated bundle is built from.

import { CURRENT_VERSION, type Version } from '@/data/versions'

export type EndpointOutcome = 'all-pass' | 'issues' | ''

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
