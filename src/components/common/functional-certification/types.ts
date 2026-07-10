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
  /** LFI code used to build the TPP-facing resource-server URLs (e.g. 'adcb'). */
  lfiCode: string
  /** Optional implementation notes for the reviewer. */
  implementationNotes: string
  /** Free-text reviewer comments included in the submission. */
  comments: string
}

export function emptyFormState(): FcFormState {
  return { version: CURRENT_VERSION, lfiCode: '', implementationNotes: '', comments: '' }
}
