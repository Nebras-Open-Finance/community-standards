<script setup lang="ts">
// Site-wide announcement modal. Shown once per browser session on arrival at
// any public page, to surface new content a reader would otherwise have to go
// looking for.
//
// Auto-registered as <SiteAnnouncementModal> via unplugin-vue-components and
// mounted in src/layouts/default.vue.
//
// All copy lives in src/data/site-announcement.ts — this component only decides
// WHETHER to show it, and renders it. See that file for how to run the next one.
//
// Dismissal is per browser session (sessionStorage), keyed by the announcement
// id: dismissing hides it for the rest of the session, and it reappears on the
// reader's next visit until the id changes.
import { ref, computed, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import { useRoute } from 'vue-router'
import { SITE_ANNOUNCEMENT, type AnnouncementItem } from '@/data/site-announcement'
import { useSelectedVersion, routeHasVersionDropdown } from '@/composables/useSelectedVersion'
import { useVersionTour } from '@/composables/useVersionTour'

const route = useRoute()
const { selectedVersion } = useSelectedVersion()
const { wideViewport, startTour } = useVersionTour()

// Internal and developer surfaces are excluded — they are not public content
// and their readers are not the audience for a publication announcement. Kept
// in sync with NOINDEX_RE in src/App.vue and the EXCLUDE list in
// scripts/generate-sitemap.mjs. /internal also uses its own layout, so this is
// belt and braces for anything that later renders under the default layout.
const NON_PUBLIC_RE = [
  /^\/_dev(\/|$)/,
  /^\/internal(\/|$)/,
  /(^|\/)_shared(\/|$)/,
]

const isPublicPage = computed<boolean>(
  () => !NON_PUBLIC_RE.some((re) => re.test(route.path)),
)

const STORAGE_KEY = `at-announcement-dismissed:${SITE_ANNOUNCEMENT.id}`

// Gate on a mounted flag so SSR and the first client render agree (both render
// nothing); the modal only appears after hydration, once sessionStorage can be
// read. Prerendered HTML therefore never contains the modal.
const dismissed = ref(true)
const mounted = ref(false)

const open = computed<boolean>(
  () => mounted.value && SITE_ANNOUNCEMENT.enabled && !dismissed.value && isPublicPage.value,
)

const panelRef = ref<HTMLElement | null>(null)
const dismissRef = ref<HTMLButtonElement | null>(null)
let previouslyFocused: HTMLElement | null = null

function readDismissed(): boolean {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    // Private mode or blocked storage — treat as dismissed rather than showing
    // the modal on every navigation with no way to make it stick.
    return true
  }
}

function dismiss(): void {
  dismissed.value = true
  try {
    sessionStorage.setItem(STORAGE_KEY, '1')
  } catch {
    // Nothing to do — the in-memory flag still hides it for this page view.
  }
}

// Following a link is an acknowledgement, so it dismisses too. RouterLink
// handles the navigation itself.
function onFollow(): void {
  dismiss()
}

// An item offers the guided version switch only where there is a dropdown to
// point at, and only when the reader is not already on the target version —
// otherwise it falls back to its ordinary link.
function canGuide(item: AnnouncementItem): boolean {
  if (!item.switchTo) return false
  if (!wideViewport.value) return false
  if (!routeHasVersionDropdown(route.path)) return false
  return selectedVersion.value !== item.switchTo.version
}

// Close the modal, then hand over to the tour: the reader needs to see the
// header, and the dropdown sits behind this dialog.
function startSwitch(item: AnnouncementItem): void {
  dismiss()
  if (item.switchTo) startTour(item.switchTo.version)
}

function onKeydown(e: KeyboardEvent): void {
  if (!open.value) return
  if (e.key === 'Escape') {
    e.preventDefault()
    dismiss()
    return
  }
  if (e.key !== 'Tab') return
  // Keep focus inside the dialog while it is open.
  const panel = panelRef.value
  if (!panel) return
  const focusable = Array.from(
    panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'),
  ).filter((el) => el.offsetParent !== null)
  const first = focusable[0]
  const last = focusable[focusable.length - 1]
  if (!first || !last) return
  const active = document.activeElement as HTMLElement | null
  if (e.shiftKey && (active === first || !panel.contains(active))) {
    e.preventDefault()
    last.focus()
  } else if (!e.shiftKey && active === last) {
    e.preventDefault()
    first.focus()
  }
}

// Body scroll lock while the dialog is open, restored on close/unmount.
let previousOverflow = ''

watch(open, (isOpen) => {
  if (typeof document === 'undefined') return
  if (isOpen) {
    previouslyFocused = document.activeElement as HTMLElement | null
    previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    void nextTick(() => dismissRef.value?.focus())
  } else {
    document.body.style.overflow = previousOverflow
    previouslyFocused?.focus?.()
    previouslyFocused = null
  }
})

onMounted(() => {
  dismissed.value = readDismissed()
  mounted.value = true
  document.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeydown)
  if (typeof document !== 'undefined') document.body.style.overflow = previousOverflow
})
</script>

<template>
  <Teleport to="body">
    <Transition name="at-ann-fade">
      <div v-if="open" class="at-ann-overlay" @click.self="dismiss">
        <div
          ref="panelRef"
          class="at-ann"
          role="dialog"
          aria-modal="true"
          aria-labelledby="at-ann-title"
          aria-describedby="at-ann-lede"
        >
          <button
            type="button"
            class="at-ann__close"
            aria-label="Close announcement"
            @click="dismiss"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              aria-hidden="true"
            >
              <path d="M5 5l14 14M19 5L5 19" />
            </svg>
          </button>

          <div class="at-ann__eyebrow">
            <span class="at-ann__dash" />
            {{ SITE_ANNOUNCEMENT.eyebrow }}
          </div>

          <h2 id="at-ann-title" class="at-ann__title">{{ SITE_ANNOUNCEMENT.title }}</h2>
          <p id="at-ann-lede" class="at-ann__lede">{{ SITE_ANNOUNCEMENT.lede }}</p>

          <ul class="at-ann__list">
            <li v-for="item in SITE_ANNOUNCEMENT.items" :key="item.path" class="at-ann__item">
              <span class="at-ann__tag">{{ item.tag }}</span>
              <div class="at-ann__body">
                <h3 class="at-ann__item-title">{{ item.title }}</h3>
                <p class="at-ann__summary">{{ item.summary }}</p>
                <div class="at-ann__actions">
                  <RouterLink :to="item.path" class="at-ann__link" @click="onFollow">
                    {{ item.linkLabel }}
                    <span aria-hidden="true">&rarr;</span>
                  </RouterLink>
                  <button
                    v-if="canGuide(item)"
                    type="button"
                    class="at-ann__link at-ann__link--button"
                    @click="startSwitch(item)"
                  >
                    {{ item.switchTo?.label }}
                    <span aria-hidden="true">&rarr;</span>
                  </button>
                </div>
              </div>
            </li>
          </ul>

          <button ref="dismissRef" type="button" class="at-ann__btn" @click="dismiss">
            {{ SITE_ANNOUNCEMENT.dismissLabel }}
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.at-ann-overlay {
  position: fixed;
  inset: 0;
  background: rgba(11, 15, 26, 0.55);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  /* Above the search overlay's 100000 so it is never rendered behind chrome. */
  z-index: 100010;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 1.25rem;
  overflow-y: auto;
}

.at-ann {
  position: relative;
  width: 100%;
  max-width: 40rem;
  max-height: calc(100vh - 6rem);
  overflow-y: auto;
  box-sizing: border-box;
  padding: 2.25rem 2.25rem 2rem;
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line-2);
  border-top: 3px solid var(--at-teal-deep);
  box-shadow: 0 24px 60px rgba(0, 23, 56, 0.28);
  font-family: var(--at-sans);
}

.at-ann__close {
  position: absolute;
  top: 0.9rem;
  right: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  padding: 0;
  color: var(--at-mute);
  background: transparent;
  border: 0;
  cursor: pointer;
  transition: color 0.16s;
}
.at-ann__close:hover { color: var(--at-navy-deep); }
.at-ann__close:focus-visible { outline: 2px solid var(--at-teal); outline-offset: 2px; }

.at-ann__eyebrow {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  font-family: var(--at-mono);
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--at-teal-deep);
  margin-bottom: 1rem;
}
.at-ann__dash { width: 24px; height: 1px; background: currentColor; }

.at-ann__title {
  font-family: var(--at-serif);
  font-size: 1.55rem;
  font-weight: 600;
  line-height: 1.18;
  letter-spacing: -0.02em;
  color: var(--at-navy-deep);
  margin: 0 0 0.7rem;
}

.at-ann__lede {
  font-size: 0.92rem;
  line-height: 1.6;
  color: var(--at-mute-2);
  margin: 0 0 1.6rem;
}

.at-ann__list {
  list-style: none;
  margin: 0 0 1.75rem;
  padding: 0;
  border-top: 1px solid var(--at-grid-line);
}

.at-ann__item {
  display: flex;
  gap: 1rem;
  padding: 1.1rem 0;
  border-bottom: 1px solid var(--at-grid-line);
}

.at-ann__tag {
  flex-shrink: 0;
  align-self: flex-start;
  font-family: var(--at-mono);
  font-size: 0.66rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--at-navy-deep);
  background: var(--at-bg-paper);
  border: 1px solid var(--at-grid-line-2);
  padding: 0.22rem 0.5rem;
}

.at-ann__body { min-width: 0; }

.at-ann__item-title {
  font-family: var(--at-sans);
  font-size: 0.98rem;
  font-weight: 600;
  line-height: 1.3;
  color: var(--at-navy-deep);
  margin: 0 0 0.35rem;
}

.at-ann__summary {
  font-size: 0.86rem;
  line-height: 1.6;
  color: var(--at-mute-2);
  margin: 0 0 0.6rem;
}

/* An item carries one or two actions: always its link, plus the guided version
   switch where there is a dropdown to point at. Wraps rather than truncating —
   both labels carry a version identifier and must stay readable. */
.at-ann__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem 1.25rem;
}

.at-ann__link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--at-mono);
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-teal-deep);
  text-decoration: none;
  border-bottom: 1px solid currentColor;
  padding-bottom: 1px;
}
.at-ann__link:hover { color: var(--at-navy-deep); }
.at-ann__link:focus-visible { outline: 2px solid var(--at-teal); outline-offset: 3px; }

/* The guided version switch is a button, not a link — it starts the tour rather
   than navigating. Reset the UA button styling so it matches its sibling. */
.at-ann__link--button {
  background: none;
  border: 0;
  border-bottom: 1px solid currentColor;
  padding: 0 0 1px;
  cursor: pointer;
}

.at-ann__btn {
  width: 100%;
  padding: 0.7rem 1rem;
  font-family: var(--at-mono);
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-bg-cream);
  background: var(--at-navy-deep);
  border: 0;
  cursor: pointer;
  transition: background 0.16s;
}
.at-ann__btn:hover { background: var(--at-teal-deep); }
.at-ann__btn:focus-visible { outline: 2px solid var(--at-teal); outline-offset: 2px; }

.at-ann-fade-enter-active,
.at-ann-fade-leave-active { transition: opacity 0.18s ease; }
.at-ann-fade-enter-from,
.at-ann-fade-leave-to { opacity: 0; }

.at-ann-fade-enter-active .at-ann { transition: transform 0.22s ease; }
.at-ann-fade-enter-from .at-ann { transform: translateY(8px); }

@media (max-width: 700px) {
  .at-ann-overlay { padding: 1.5rem 0.75rem; }
  .at-ann { padding: 1.9rem 1.25rem 1.5rem; }
  .at-ann__title { font-size: 1.3rem; }
}

@media (prefers-reduced-motion: reduce) {
  .at-ann-fade-enter-active,
  .at-ann-fade-leave-active,
  .at-ann-fade-enter-active .at-ann { transition: none; }
  .at-ann-fade-enter-from .at-ann { transform: none; }
}
</style>
