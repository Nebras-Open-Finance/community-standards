export const VERSIONS = ['v2.1'] as const

export type Version = (typeof VERSIONS)[number]

export const CURRENT_VERSION: Version = VERSIONS[VERSIONS.length - 1] as Version

// Maps each Ozone Connect version to the TPP Standards versions it supports.
// When a new major version is added, also list the prior version(s) it
// dual-runs alongside, e.g. 'v3.0': ['v3.0', 'v2.1'].
export const VERSION_TPP_COMPATIBILITY: Record<Version, readonly Version[]> = {
  'v2.1': ['v2.1'],
}
