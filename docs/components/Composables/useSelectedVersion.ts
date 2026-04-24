import { ref } from 'vue'
import { useRoute } from 'vitepress'
import { VERSIONS, CURRENT_VERSION } from '../../.vitepress/version'

const selectedVersion = ref<string>(CURRENT_VERSION)
let seeded = false

function seedFromRoute() {
  if (seeded) return
  seeded = true
  try {
    const route = useRoute()
    const match = route?.path?.match(/\/v(\d+\.\d+)\//)
    if (match) {
      const candidate = `v${match[1]}`
      if (VERSIONS.includes(candidate)) {
        selectedVersion.value = candidate
      }
    }
  } catch {
    // useRoute() is only valid inside a setup context; fall through to default
  }
}

export function setSelectedVersion(v: string) {
  if (!VERSIONS.includes(v)) return
  selectedVersion.value = v
}

export function resetSelectedVersion() {
  selectedVersion.value = CURRENT_VERSION
  seeded = false
}

export function useSelectedVersion() {
  seedFromRoute()
  return { selectedVersion, setSelectedVersion }
}
