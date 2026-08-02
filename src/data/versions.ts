export const VERSIONS = ['v2.1', 'v2.2-draft'] as const

export type Version = (typeof VERSIONS)[number]

// The version the site defaults to. Set explicitly — do NOT derive it from
// array position, or adding a draft version silently promotes it.
export const CURRENT_VERSION: Version = 'v2.1'

// Versions that are published for review but not ratified. Draft versions get
// a banner and a dropdown chip, and are excluded from search and the sitemap.
export const DRAFT_VERSIONS: readonly Version[] = ['v2.2-draft']

export function isDraftVersion(v: string): boolean {
  return (DRAFT_VERSIONS as readonly string[]).includes(v)
}

// The version string that appears in the standard itself — consent URNs
// (`urn:openfinanceuae:account-access-consent:v2.2`) and API base paths
// (`/open-finance/account-information/v2.2`).
//
// Deliberately distinct from the documentation route segment: draft-ness is a
// publication state of these docs, not part of the protocol identifier, so
// nothing in the specs changes when a draft is ratified.
export const PROTOCOL_VERSION: Record<Version, string> = {
  'v2.1': 'v2.1',
  'v2.2-draft': 'v2.2',
}

// Which folder in the api-specs repo each version's OpenAPI files come from.
// Read by scripts/fetch-openapi-specs.mjs, which writes them to
// public/openapi/{version}/ under the *local* version key.
//
// TODO: v2.2-draft currently serves the v2.1 specs because api-specs has no
// v2.2 yet (dist/standards tops out at v2.1-errata3). Flip to 'v2.2' once the
// attestations sub-resource lands upstream — see
// supporting/internal_helpers/v2.2-draft-plan.md, phase 3.
export const SPEC_FOLDER: Record<Version, string> = {
  'v2.1': 'v2.1',
  'v2.2-draft': 'v2.1',
}

// Maps each Ozone Connect version to the TPP Standards versions it supports.
// When a new major version is added, also list the prior version(s) it
// dual-runs alongside, e.g. 'v3.0': ['v3.0', 'v2.1'].
export const VERSION_TPP_COMPATIBILITY: Record<Version, readonly Version[]> = {
  'v2.1': ['v2.1'],
  'v2.2-draft': ['v2.2-draft', 'v2.1'],
}
