// Guided tour that walks a reader through switching version in the header.
//
// Started from the site announcement modal (see SiteAnnouncementModal.vue) and
// rendered by VersionDropdown.vue, which is the only component that knows where
// the dropdown actually is. Module-level singletons, so the two communicate
// without being anywhere near each other in the tree.
//
// The tour deliberately does NOT switch the version itself — it dims the page,
// highlights the dropdown, and asks the reader to make the change, so they know
// how to do it again.

import { computed, ref, type ComputedRef, type Ref } from 'vue'
import type { Version } from '@/data/versions'

/** The version the tour is steering towards, or null when no tour is running. */
const tourTarget = ref<Version | null>(null)

// The header only renders the version dropdown from 960px up (`.ed-nav` is
// display:none below that, and the mobile drawer has no version control). There
// is nothing to point at on a narrow viewport, so the tour must not be offered.
const WIDE_QUERY = '(min-width: 960px)'
const wideViewport = ref(false)
let mediaWatched = false

function watchViewport(): void {
  if (mediaWatched || typeof window === 'undefined' || !window.matchMedia) return
  mediaWatched = true
  const mq = window.matchMedia(WIDE_QUERY)
  wideViewport.value = mq.matches
  // Never removed: the singleton lives for the lifetime of the page, and the
  // listener is what keeps `wideViewport` honest across a resize.
  mq.addEventListener('change', (e) => {
    wideViewport.value = e.matches
    if (!e.matches) endVersionTour()
  })
}

export function startVersionTour(v: Version): void {
  tourTarget.value = v
}

export function endVersionTour(): void {
  tourTarget.value = null
}

export interface UseVersionTour {
  tourTarget: Ref<Version | null>
  /** True while a tour is running and the dropdown is wide enough to exist. */
  tourActive: ComputedRef<boolean>
  /** Whether the viewport is wide enough for the header to show the dropdown. */
  wideViewport: Ref<boolean>
  startTour: (v: Version) => void
  endTour: () => void
}

export function useVersionTour(): UseVersionTour {
  watchViewport()
  return {
    tourTarget,
    tourActive: computed(() => tourTarget.value !== null && wideViewport.value),
    wideViewport,
    startTour: startVersionTour,
    endTour: endVersionTour,
  }
}
