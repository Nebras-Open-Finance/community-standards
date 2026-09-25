// The draft BioPay OpenAPI document, imported raw and shared by every page
// under an API Reference group. It is handed to RedocWrapper via `specText`,
// which skips the fetch and renders the in-memory document — the same pattern
// the OFP proposal schema pages use.
//
// Deliberately NOT in public/openapi/: that directory holds specs fetched at
// build time from the canonical api-specs repo. This document is a proposal
// that lives with the site until (and unless) it is published upstream.

import biopaySpecYaml from './openapi-drafts/biopay-icp-schema.yaml?raw'

export const BIOPAY_SPEC: string = biopaySpecYaml
