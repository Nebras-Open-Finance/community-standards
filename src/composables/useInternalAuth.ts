// Password gate for the /internal section.
//
// There is no real security boundary here — the site is a static, prerendered
// bundle with no backend, and the password ships in the client code. The gate
// only keeps the internal area out of casual sight. The unlock state lives in
// sessionStorage, so it lasts for the browser session and clears on tab close.

import { ref, type Ref } from 'vue'

/** Shared internal password. Intentionally in source — see note above. */
export const INTERNAL_PASSWORD = 'Draft up the email here just to HSBC. '

const STORAGE_KEY = 'internal-unlocked'

// Module-level singleton: every component shares one unlock ref.
const unlocked: Ref<boolean> = ref(false)
let hydrated = false

function hydrate(): void {
  if (hydrated) return
  hydrated = true
  if (typeof window === 'undefined') return
  try {
    if (window.sessionStorage.getItem(STORAGE_KEY) === '1') unlocked.value = true
  } catch {
    // sessionStorage can throw in private-mode / disabled-storage browsers.
  }
}

export interface UseInternalAuth {
  unlocked: Ref<boolean>
  /** Returns true when the candidate matches and the section is unlocked. */
  unlock: (candidate: string) => boolean
  lock: () => void
}

export function useInternalAuth(): UseInternalAuth {
  hydrate()

  function unlock(candidate: string): boolean {
    if (candidate !== INTERNAL_PASSWORD) return false
    unlocked.value = true
    try {
      window.sessionStorage.setItem(STORAGE_KEY, '1')
    } catch {
      // Non-fatal — the in-memory ref still unlocks for this page load.
    }
    return true
  }

  function lock(): void {
    unlocked.value = false
    try {
      window.sessionStorage.removeItem(STORAGE_KEY)
    } catch {
      // Non-fatal.
    }
  }

  return { unlocked, unlock, lock }
}
