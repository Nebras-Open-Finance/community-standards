// The BioPay OpenAPI documents rendered by the pages under the API Reference
// group, imported raw and handed to RedocWrapper via `specText`, which skips
// the fetch and renders the in-memory document.
//
// Both come from api-specs PR #37 (feat/cs-2200, head 08b499b), copied
// byte-for-byte from its `dist/` tree:
//   - Standards — the BPIP-facing operation the API Hub serves
//     (dist/standards/v2.2-rc2/uae-standards-biometric-payments-openapi.yaml)
//   - Ozone Connect — the operation the API Hub calls on the LFI
//     (dist/ozone-connect/v2.2.x/uae-ozone-connect-biometric-payments-openapi.yaml)
//
// Deliberately NOT in public/openapi/: that directory holds specs fetched at
// build time from the canonical api-specs repo, and the PR is not merged.
//
// One local change from the PR, in both files: AEPaymentToken is a 36-character
// UUID (8-4-4-4-12, minLength/maxLength 36) instead of the PR's
// ^[A-Za-z0-9_-]{32}$. Raise it on PR #37 so upstream matches, then refresh
// these files from the PR. Once it merges, fetch them through
// scripts/fetch-openapi-specs.mjs and delete the local copies.

import standardsYaml from './openapi-drafts/biopay/uae-standards-biometric-payments-openapi.yaml?raw'
import ozoneConnectYaml from './openapi-drafts/biopay/uae-ozone-connect-biometric-payments-openapi.yaml?raw'

/** Standards: BPIP → API Hub. */
export const BIOPAY_STANDARDS_SPEC: string = standardsYaml

/** Ozone Connect: API Hub → LFI. */
export const BIOPAY_OZONE_CONNECT_SPEC: string = ozoneConnectYaml
