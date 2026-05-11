// Module-level singleton state for the global search modal.
// PageHeader.vue owns the SearchModal mount; any component (e.g. the homepage
// hero CTA) can call `openSearchModal()` to surface it.

import { ref, type Ref } from 'vue'

const isOpen: Ref<boolean> = ref(false)
const everOpened: Ref<boolean> = ref(false)

export function openSearchModal(): void {
  everOpened.value = true
  isOpen.value = true
}

export function closeSearchModal(): void {
  isOpen.value = false
}

export interface UseSearchModal {
  isOpen: Ref<boolean>
  everOpened: Ref<boolean>
  open: () => void
  close: () => void
  toggle: () => void
}

export function useSearchModal(): UseSearchModal {
  return {
    isOpen,
    everOpened,
    open: openSearchModal,
    close: closeSearchModal,
    toggle: () => {
      if (isOpen.value) closeSearchModal()
      else openSearchModal()
    },
  }
}
