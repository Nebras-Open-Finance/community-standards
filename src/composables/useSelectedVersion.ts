// Module-level singletons: every component on the page shares the same ref,
// and the route is read once on first call.

import { ref, type Ref } from 'vue'
import { useRoute } from 'vue-router'
import { VERSIONS, CURRENT_VERSION, type Version } from '@/data/versions'

const selectedVersion: Ref<Version> = ref<Version>(CURRENT_VERSION)
let seeded = false

function isVersion(value: string): value is Version {
  return (VERSIONS as readonly string[]).includes(value)
}

function seedFromRoute(): void {
  if (seeded) return
  seeded = true
  try {
    const route = useRoute()
    const path = route?.path
    if (typeof path !== 'string') return
    const match = path.match(/\/v(\d+\.\d+)\//)
    if (!match) return
    const candidate = `v${match[1]}`
    if (isVersion(candidate)) {
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
