// Password-gate factory shared by the site's gated spaces (/internal, /biopay).
//
// There is no real security boundary here — the site is a static, prerendered
// bundle with no backend, and the password ships in the client code. A gate only
// keeps its space out of casual sight. Unlock state lives in sessionStorage, so
// it lasts for the browser session and clears on tab close.
//
// Each space passes its own password and its own storage key, so unlocking one
// space does not unlock another.

import { ref, type Ref } from 'vue'

export interface SpaceAuth {
  unlocked: Ref<boolean>
  /** Returns true when the candidate matches and the space is unlocked. */
  unlock: (candidate: string) => boolean
  lock: () => void
}

/**
 * Builds a `useXAuth()` composable for one gated space. The returned function
 * is a module-level singleton: every component that calls it shares one
 * unlock ref, so the gate and the pages behind it stay in step.
 */
export function createSpaceAuth(password: string, storageKey: string): () => SpaceAuth {
  const unlocked: Ref<boolean> = ref(false)
  let hydrated = false

  function hydrate(): void {
    if (hydrated) return
    hydrated = true
    if (typeof window === 'undefined') return
    try {
      if (window.sessionStorage.getItem(storageKey) === '1') unlocked.value = true
    } catch {
      // sessionStorage can throw in private-mode / disabled-storage browsers.
    }
  }

  function unlock(candidate: string): boolean {
    if (candidate !== password) return false
    unlocked.value = true
    try {
      window.sessionStorage.setItem(storageKey, '1')
    } catch {
      // Non-fatal — the in-memory ref still unlocks for this page load.
    }
    return true
  }

  function lock(): void {
    unlocked.value = false
    try {
      window.sessionStorage.removeItem(storageKey)
    } catch {
      // Non-fatal.
    }
  }

  return function useSpaceAuth(): SpaceAuth {
    hydrate()
    return { unlocked, unlock, lock }
  }
}
