// Module-level singletons: every component on the page shares the same ref,
// and the route is read once on first call.

import { computed, ref, type ComputedRef, type Ref } from 'vue'
import { useRoute } from 'vue-router'
import { VERSIONS, CURRENT_VERSION, PROTOCOL_VERSION, type Version } from '@/data/versions'

const selectedVersion: Ref<Version> = ref<Version>(CURRENT_VERSION)
let seeded = false

function isVersion(value: string): value is Version {
  return (VERSIONS as readonly string[]).includes(value)
}

// Match on whole path segments against VERSIONS rather than parsing a version
// shape out of the path. Version identifiers are not all `vN.N` — `v2.2-draft`
// is one — so the list is the only reliable source of truth.
function versionFromPath(path: string): Version | null {
  const segments = path.split('/').filter(Boolean)
  for (const segment of segments) {
    if (isVersion(segment)) return segment
  }
  return null
}

function seedFromRoute(): void {
  if (seeded) return
  seeded = true
  try {
    const route = useRoute()
    const path = route?.path
    if (typeof path !== 'string') return
    const candidate = versionFromPath(path)
    if (candidate) {
      selectedVersion.value = candidate
    }
  } catch {
    // useRoute() is only valid inside a setup context.
  }
}

export function setSelectedVersion(v: string): void {
  if (!isVersion(v)) return
  selectedVersion.value = v
}

export function resetSelectedVersion(): void {
  selectedVersion.value = CURRENT_VERSION
  seeded = false
}

export interface UseSelectedVersion {
  selectedVersion: Ref<Version>
  setSelectedVersion: (v: string) => void
}

export function useSelectedVersion(): UseSelectedVersion {
  seedFromRoute()
  return { selectedVersion, setSelectedVersion }
}

export interface UseRouteVersion {
  /** Version segment of the current route, e.g. `v2.2-draft`. */
  docsVersion: ComputedRef<Version>
  /** Version as it appears in the standard itself, e.g. `v2.2`. */
  protocolVersion: ComputedRef<string>
}

/**
 * The version of the page being viewed, read from the route.
 *
 * Shared components rendered inside a versioned page must follow the page, not
 * the dropdown: the two diverge the moment a reader picks a version while on an
 * unversioned page and then navigates into a versioned one. Pages that have no
 * version segment fall back to CURRENT_VERSION.
 */
export function useRouteVersion(): UseRouteVersion {
  const route = useRoute()
  const docsVersion = computed<Version>(
    () => versionFromPath(route.path) ?? CURRENT_VERSION,
  )
  return {
    docsVersion,
    protocolVersion: computed(() => PROTOCOL_VERSION[docsVersion.value]),
  }
}
