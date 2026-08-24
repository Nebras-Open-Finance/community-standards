<script setup lang="ts">
import { watch, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { VERSIONS, isDraftVersion, type Version } from '@/data/versions'
import { routeHasVersionDropdown } from '@/composables/useSelectedVersion'
import { useVersionTour } from '@/composables/useVersionTour'

const route = useRoute()
const router = useRouter()

const { selectedVersion, setSelectedVersion } = useSelectedVersion()

const showVersion = computed<boolean>(() => routeHasVersionDropdown(route.path))

const isOpen = ref<boolean>(false)
const dropdownEl = ref<HTMLElement | null>(null)
const btnEl = ref<HTMLButtonElement | null>(null)

// Guided switch, started from the site announcement modal. This component owns
// the rendering because it is the only one that knows where the dropdown sits.
const { tourTarget, tourActive, endTour } = useVersionTour()

const inTour = computed<boolean>(() => tourActive.value && showVersion.value)

// Two steps: get the menu open, then get the target version picked.
const coachText = computed<string>(() =>
  isOpen.value ? `Now choose ${tourTarget.value}` : 'Open the version menu',
)

function selectVersion(v: Version): void {
  isOpen.value = false
  endTour()
  const oldVersion = selectedVersion.value
  setSelectedVersion(v)
  if (!oldVersion || v === oldVersion) return
  if (route.path.includes(`/${oldVersion}/`)) {
    const newPath = route.path.replace(`/${oldVersion}/`, `/${v}/`)
    void router.push(newPath)
  }
}

function handleOutsideClick(e: MouseEvent): void {
  const target = e.target
  if (!(target instanceof Node)) return
  if (dropdownEl.value && !dropdownEl.value.contains(target)) {
    isOpen.value = false
  }
}

function handleTourKeydown(e: KeyboardEvent): void {
  if (inTour.value && e.key === 'Escape') endTour()
}

// Navigating away abandons the tour — the reader has moved on, and the dropdown
// may not even exist on the new route.
watch(() => route.path, () => endTour())

// Move focus to the button the tour is pointing at, so "Open the version menu"
// means something to a keyboard user. nextTick so this lands after the
// announcement modal has finished restoring focus on its way out.
watch(inTour, (active) => {
  if (active) void nextTick(() => btnEl.value?.focus())
})

onMounted(() => {
  document.addEventListener('click', handleOutsideClick, true)
  document.addEventListener('keydown', handleTourKeydown)
})
onUnmounted(() => {
  document.removeEventListener('click', handleOutsideClick, true)
  document.removeEventListener('keydown', handleTourKeydown)
})
</script>

<template>
  <div v-if="showVersion" ref="dropdownEl" class="vd-wrap" :class="{ open: isOpen, tour: inTour }">
    <!-- Tour scrim. Sits below the header's own z-index, so the header stays
         crisp and clickable while the page behind it dims. Teleported so it is
         not clipped by the header. -->
    <Teleport to="body">
      <Transition name="vd-scrim-fade">
        <div v-if="inTour" class="vd-scrim" @click="endTour" />
      </Transition>
    </Teleport>

    <div v-if="inTour" class="vd-coach" role="status" aria-live="polite">
      <span class="vd-coach__text">{{ coachText }}</span>
      <button type="button" class="vd-coach__skip" @click.stop="endTour">Skip</button>
    </div>

    <button
      ref="btnEl"
      type="button"
      class="vd-btn"
      :class="{ 'is-pulsing': inTour && !isOpen }"
      :aria-expanded="isOpen ? 'true' : 'false'"
      @click.stop="isOpen = !isOpen"
    >
      {{ selectedVersion }}
      <svg class="vd-chevron" xmlns="http://www.w3.org/2000/svg" width="12" height="12"
        viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
        stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="m6 9 6 6 6-6" />
      </svg>
    </button>

    <div class="vd-menu" role="listbox">
      <button
        v-for="v in VERSIONS"
        :key="v"
        type="button"
        role="option"
        class="vd-item"
        :class="{ active: v === selectedVersion, 'is-tour-pick': inTour && v === tourTarget }"
        :aria-selected="v === selectedVersion ? 'true' : 'false'"
        @click="selectVersion(v)"
      >
        <span class="vd-label">
          {{ v }}
          <span v-if="isDraftVersion(v)" class="vd-draft">rc</span>
        </span>
        <svg v-if="v === selectedVersion" class="vd-check" xmlns="http://www.w3.org/2000/svg"
          width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.vd-wrap::before {
  margin-right: 14px;
  margin-left: 4px;
  width: 1px;
  height: 24px;
  background-color: var(--at-grid-line-2);
  content: "";
}

.vd-wrap {
  position: relative;
  display: inline-flex;
  align-items: center;
}

.vd-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 14px;
  font-family: var(--at-mono);
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--at-navy-deep);
  background: none;
  border: 0;
  border-radius: 0;
  cursor: pointer;
  white-space: nowrap;
  transition: color 0.15s, background 0.15s;
  user-select: none;
}

.vd-btn:hover {
  color: var(--at-teal-deep);
  background: rgba(0, 194, 169, 0.08);
}

.vd-chevron {
  transition: transform 0.18s ease;
  opacity: 0.7;
}

.open .vd-chevron {
  transform: rotate(180deg);
}

.vd-menu {
  position: absolute;
  top: calc(100% + 0.6rem);
  right: 0;
  min-width: 140px;
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line-2);
  border-radius: 0;
  box-shadow: 0 14px 40px rgba(0, 23, 56, 0.14);
  padding: 0.35rem;
  z-index: 100000;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-4px);
  transition: opacity 0.16s ease, transform 0.16s ease, visibility 0.16s;
}

.open .vd-menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.vd-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
  padding: 0.6rem 0.75rem;
  font-family: var(--at-serif);
  font-size: 0.95rem;
  font-weight: 500;
  letter-spacing: normal;
  text-transform: none;
  color: var(--at-navy-deep);
  background: none;
  border: 0;
  border-bottom: 1px solid var(--at-grid-line);
  border-radius: 0;
  cursor: pointer;
  text-align: left;
  transition: background 0.12s, color 0.12s;
}

.vd-item:last-child {
  border-bottom: 0;
}

.vd-item:hover {
  background: rgba(0, 194, 169, 0.08);
}

.vd-item.active {
  color: var(--at-teal-deep);
}

.vd-check {
  flex-shrink: 0;
  color: var(--at-teal-deep);
}

.vd-label {
  display: inline-flex;
  align-items: center;
  gap: 7px;
}

.vd-draft {
  font-family: var(--at-mono);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #7c2d12;
  background: #fde68a;
  padding: 0.12rem 0.35rem;
}

/* ── Guided tour ─────────────────────────────────────────────────────────
   Started from the site announcement modal. See useVersionTour.ts. */

.vd-scrim {
  position: fixed;
  inset: 0;
  background: rgba(11, 15, 26, 0.5);
  /* Below .ed-header (99999) so the header — and this dropdown inside it —
     stays undimmed and takes clicks normally. Clicking the scrim gives up. */
  z-index: 99990;
}

.vd-scrim-fade-enter-active,
.vd-scrim-fade-leave-active { transition: opacity 0.2s ease; }
.vd-scrim-fade-enter-from,
.vd-scrim-fade-leave-to { opacity: 0; }

/* The button is only ~90px wide and the menu drops below it, so the callout
   sits to the left, vertically centred on the button. That position stays
   valid whether the menu is open or closed. */
.vd-coach {
  position: absolute;
  top: 50%;
  right: calc(100% + 12px);
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: max-content;
  max-width: 17rem;
  padding: 0.55rem 0.75rem;
  background: var(--at-navy-deep);
  border-left: 3px solid var(--at-teal);
  box-shadow: 0 10px 30px rgba(0, 23, 56, 0.32);
  z-index: 100001;
}

/* Arrow pointing right, at the dropdown button. */
.vd-coach::after {
  position: absolute;
  top: 50%;
  left: 100%;
  width: 0;
  height: 0;
  border: 6px solid transparent;
  border-left-color: var(--at-navy-deep);
  transform: translateY(-50%);
  content: "";
}

.vd-coach__text {
  font-family: var(--at-sans);
  font-size: 0.82rem;
  font-weight: 500;
  line-height: 1.35;
  color: var(--at-inverse-fg);
  white-space: nowrap;
}

.vd-coach__skip {
  flex-shrink: 0;
  font-family: var(--at-mono);
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(250, 250, 247, 0.6);
  background: none;
  border: 0;
  padding: 0.15rem 0;
  cursor: pointer;
  transition: color 0.15s;
}
.vd-coach__skip:hover { color: var(--at-inverse-fg); }
.vd-coach__skip:focus-visible { outline: 2px solid var(--at-teal); outline-offset: 2px; }

/* Step 1 — draw the eye to the closed button. */
.vd-btn.is-pulsing {
  color: var(--at-teal-deep);
  animation: vd-pulse 1.6s ease-out infinite;
}

@keyframes vd-pulse {
  0%   { box-shadow: 0 0 0 0 rgba(0, 194, 169, 0.55); }
  70%  { box-shadow: 0 0 0 10px rgba(0, 194, 169, 0); }
  100% { box-shadow: 0 0 0 0 rgba(0, 194, 169, 0); }
}

/* Step 2 — once the menu is open, mark the option to pick. */
.vd-item.is-tour-pick {
  background: rgba(0, 194, 169, 0.14);
  box-shadow: inset 3px 0 0 var(--at-teal-deep);
}

@media (prefers-reduced-motion: reduce) {
  .vd-btn.is-pulsing { animation: none; box-shadow: 0 0 0 3px rgba(0, 194, 169, 0.45); }
  .vd-scrim-fade-enter-active,
  .vd-scrim-fade-leave-active { transition: none; }
}
</style>
