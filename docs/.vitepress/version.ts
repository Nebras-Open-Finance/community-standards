// Add new versions here as they are released. The last entry is the current version.
export const VERSIONS = ['v2.1']
export const CURRENT_VERSION = VERSIONS[VERSIONS.length - 1]

// Maps each Ozone Connect version to the TPP Standards versions it supports.
// When a new major version is added, also list the prior version(s) it dual-runs alongside.
// e.g. 'v3.0': ['v3.0', 'v2.1']
export const VERSION_TPP_COMPATIBILITY: Record<string, string[]> = {
  'v2.1': ['v2.1'],
}
