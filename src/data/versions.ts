// Phase 5b-i — version registry, ported from `docs/.vitepress/version.ts`.
//
// The shape and values match the source verbatim; types are tightened so
// strict-mode consumers (the `useSelectedVersion` composable, future TPP/LFI
// version-segment code) can rely on them. Add a new version by appending it
// to the `VERSIONS` tuple — `CURRENT_VERSION` always tracks the last entry.

export const VERSIONS = ['v2.1'] as const

// Type narrowed to the literal members of the tuple — gives downstream code a
// usable union without forcing every consumer to retype the array.
export type Version = (typeof VERSIONS)[number]

// Last entry wins. Asserted as `Version` so the inferred type isn't
// `string | undefined` (the tuple is non-empty by construction).
export const CURRENT_VERSION: Version = VERSIONS[VERSIONS.length - 1] as Version

// Maps each Ozone Connect version to the TPP Standards versions it supports.
// When a new major version is added, also list the prior version(s) it
// dual-runs alongside, e.g. 'v3.0': ['v3.0', 'v2.1'].
export const VERSION_TPP_COMPATIBILITY: Record<Version, readonly Version[]> = {
  'v2.1': ['v2.1'],
}
