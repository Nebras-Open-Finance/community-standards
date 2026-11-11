// The BioPay OpenAPI documents rendered by the pages under the API Reference
// group, imported raw and handed to RedocWrapper via `specText`, which skips
// the fetch and renders the in-memory document.
//
// Both come from api-specs PR #37 (feat/cs-2200, head a41ed77), copied
// byte-for-byte from its `dist/` tree — do not edit them:
//   - Standards (v2.2-alpha1) — the BPIP-facing operation the API Hub serves
//     (dist/standards/v2.2-alpha1/uae-standards-biometric-payments-openapi.yaml)
//   - Ozone Connect (v2.2.1-alpha1) — the operation the API Hub calls on the LFI
//     (dist/ozone-connect/v2.2.x/uae-ozone-connect-biometric-payments-openapi.yaml)
// alpha1 marks them as for the BioPay POC only, not a platform standards release.
//
// Deliberately NOT in public/openapi/: that directory holds specs fetched at
// build time from the canonical api-specs repo, and the PR is not merged. To
// refresh, download both files again from the PR head. Once it merges, fetch
// them through scripts/fetch-openapi-specs.mjs and delete the local copies.

import standardsYaml from './openapi-drafts/biopay/uae-standards-biometric-payments-openapi.yaml?raw'
import ozoneConnectYaml from './openapi-drafts/biopay/uae-ozone-connect-biometric-payments-openapi.yaml?raw'

/** Standards: BPIP → API Hub. */
export const BIOPAY_STANDARDS_SPEC: string = standardsYaml

/** Ozone Connect: API Hub → LFI. */
export const BIOPAY_OZONE_CONNECT_SPEC: string = ozoneConnectYaml
