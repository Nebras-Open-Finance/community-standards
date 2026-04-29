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
 * when the value equals `defaultValue`.
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
