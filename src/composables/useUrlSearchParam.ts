// Phase 5b-iii — shared URL search-parameter composable.
//
// Extracted from the inline `readFromUrl` / `writeToUrl` pair previously
// duplicated in `pages/program/whats-live.vue` (and intended for the dashboard
// in `pages/metrics.vue`). Centralises three behaviours every consumer used:
//
//   1. Hydration-safe seed from `window.location.search` on mount.
//   2. Two-way binding via a returned `Ref<T>`: writes to the ref propagate to
//      the URL via `history.replaceState` (no full navigation).
//   3. Optional whitelist (`allowed`) — values not in the whitelist are
//      ignored on read and treated as the default on write (parameter is
//      removed from the URL when the value equals the default).
//
// SSG-safe: every `window` access is guarded behind `typeof window`. During
// the static crawl the ref simply holds `defaultValue` — the real seed runs
// on hydration in `onMounted`.
//
// Auto-imported via `unplugin-auto-import` (see `vite.config.ts`
// `dirs: ['src/composables']`); call sites do not import it directly.

import { ref, watch, onMounted, type Ref } from 'vue'

export interface UseUrlSearchParamOptions<T extends string> {
  /** Optional whitelist — values outside this list are coerced to the default. */
  allowed?: readonly T[]
}

export interface UseUrlSearchParam<T extends string> {
  value: Ref<T>
  set: (next: T) => void
}

/**
 * Bind a single URL search-parameter to a `Ref<T>`. Writes to the ref are
 * mirrored into the URL via `history.replaceState`; the parameter is removed
 * when the value equals `defaultValue` (keeps the canonical URL clean).
 *
 * Generic constrained to `string` because URL search-param values are always
 * strings; callers narrow with the `allowed` whitelist.
 */
export function useUrlSearchParam<T extends string>(
  key: string,
  defaultValue: T,
  options: UseUrlSearchParamOptions<T> = {},
): UseUrlSearchParam<T> {
  const { allowed } = options
  const value: Ref<T> = ref(defaultValue) as Ref<T>

  function isAllowed(candidate: string): candidate is T {
    if (!allowed) return true
    return (allowed as readonly string[]).includes(candidate)
  }

  function readFromUrl(): void {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    const raw = params.get(key)
    if (raw === null) return
    if (isAllowed(raw)) value.value = raw
  }

  function writeToUrl(next: T): void {
    if (typeof window === 'undefined') return
    const url = new URL(window.location.href)
    if (next === defaultValue) {
      url.searchParams.delete(key)
    } else {
      url.searchParams.set(key, next)
    }
    window.history.replaceState({}, '', url.toString())
  }

  onMounted(readFromUrl)

  watch(value, (next) => writeToUrl(next))

  function set(next: T): void {
    if (!isAllowed(next)) return
    value.value = next
  }

  return { value, set }
}
