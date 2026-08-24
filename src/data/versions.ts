export const VERSIONS = ['v2.1', 'v2.2-rc1'] as const

export type Version = (typeof VERSIONS)[number]

// The version the site defaults to. Set explicitly — do NOT derive it from
// array position, or adding a draft version silently promotes it.
export const CURRENT_VERSION: Version = 'v2.1'

// Versions that are published for review but not ratified. Draft versions get
// a banner and a dropdown chip, and are excluded from search and the sitemap.
export const DRAFT_VERSIONS: readonly Version[] = ['v2.2-rc1']

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
  'v2.2-rc1': 'v2.2',
}

// Which folder(s) in the api-specs repo each version's OpenAPI files come from,
// most-preferred first. Read by scripts/fetch-openapi-specs.mjs, which writes
// the resolved set to public/openapi/{version}/ under the *local* version key.
//
// Resolution is per file, not per version: the first folder in the chain that
// publishes a given spec wins. A version that has only partly landed upstream
// therefore falls back to the previous version's latest errata for the specs it
// has not republished — v2.2-rc1 publishes five of the standards documents and
// borrows the rest from v2.1-errata3.
//
// A borrowed file still carries the source version's consent URNs and base
// paths, so the fetch script uplifts those to PROTOCOL_VERSION for this version.
// Folder naming is not uniform upstream: standards uses `v2.2-rc1`, api-hub and
// ozone-connect use `v2.2.x`. Both belong to the v2.2 release and the script
// matches on the release, so one chain entry covers every category.
export const SPEC_FOLDER: Record<Version, readonly string[]> = {
  'v2.1': ['v2.1'],
  'v2.2-rc1': ['v2.2-rc1', 'v2.1'],
}

// Which field-map export each version reads, as a directory under public/api/.
// The directory holds `index.json` (meta, coverage, one entry per endpoint) and
// `resources/<slug>.json` (the field records for one endpoint).
//
// The map is generated outside this repo and dropped in whole — see the Field
// Mapping pages under each Ozone Connect capability. A version with no export of
// its own points at the one whose specs it serves, mirroring SPEC_FOLDER above,
// so adding a real v2.2 export later is a drop-in with no code change.
export const FIELD_MAP_DIR: Record<Version, string> = {
  'v2.1': 'field-map/v2.1',
  'v2.2-rc1': 'field-map/v2.1',
}

// Maps each Ozone Connect version to the TPP Standards versions it supports.
// When a new major version is added, also list the prior version(s) it
// dual-runs alongside, e.g. 'v3.0': ['v3.0', 'v2.1'].
export const VERSION_TPP_COMPATIBILITY: Record<Version, readonly Version[]> = {
  'v2.1': ['v2.1'],
  'v2.2-rc1': ['v2.2-rc1', 'v2.1'],
}
