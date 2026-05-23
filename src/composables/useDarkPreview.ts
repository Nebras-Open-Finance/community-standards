// Dark-mode toggle. Module-level singleton so every component sees the
// same state. The pre-paint script in index.html sets the `dark` class
// on <html> before Vue mounts (reads localStorage, falls back to
// prefers-color-scheme) — this composable just keeps Vue's ref in sync
// with whatever the DOM is already showing and writes back on toggle.

import { ref, type Ref } from 'vue'

const DARK_CLASS = 'dark'
const STORAGE_KEY = 'theme'

function readInitial(): boolean {
  if (typeof document === 'undefined') return false
  return document.documentElement.classList.contains(DARK_CLASS)
}

const enabled: Ref<boolean> = ref(readInitial())

function applyClass(on: boolean): void {
  if (typeof document === 'undefined') return
  document.documentElement.classList.toggle(DARK_CLASS, on)
}

function persist(on: boolean): void {
  if (typeof localStorage === 'undefined') return
  try { localStorage.setItem(STORAGE_KEY, on ? 'dark' : 'light') } catch { /* private mode */ }
}

export interface UseDarkPreview {
  enabled: Ref<boolean>
  toggle: () => void
}

export function useDarkPreview(): UseDarkPreview {
  function toggle(): void {
    enabled.value = !enabled.value
    applyClass(enabled.value)
    persist(enabled.value)
  }
  return { enabled, toggle }
}
