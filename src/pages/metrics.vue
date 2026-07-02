<route lang="yaml">
meta:
  title: Metrics
</route>

<script setup lang="ts">
// Chart.js needs canvas DOM access, so the chart subtree is wrapped in
// `<ClientOnly>`. CLS is mitigated by `min-height` on the chart row in
// `src/components/dashboard/DashboardCharts.vue`.

import {
  state,
  setSection,
  setSector,
  resetFilters,
} from '@/stores/dashboard'
import {
  SECTOR_NAV,
  SECTORS,
  sectionInSector,
  firstSectionOfSector,
  type NavSection,
  type Sector,
} from '@/data/dashboard-charts'

const MOBILE_BREAKPOINT = 959

// Sections shown in the sidebar depend on the active sector.
const sections = computed<readonly NavSection[]>(() => SECTOR_NAV[state.sector])

// Whitelists for the URL search-params so garbage values are ignored on read.
const SECTOR_IDS: readonly Sector[] = SECTORS.map((s) => s.id)
const ALL_SECTION_IDS: readonly string[] = [
  ...new Set(Object.values(SECTOR_NAV).flatMap((g) => g.flatMap((s) => s.items.map((i) => i.id)))),
]

// Bind `state.sector`/`state.activeSection` to `?sector=…`/`?section=…`. The
// store stays the source of truth — mutate `state` (via setters) directly.
const sectorParam = useUrlSearchParam<Sector>('sector', 'banking', { allowed: SECTOR_IDS })
const sectionParam = useUrlSearchParam<string>('section', 'api-volumes', { allowed: ALL_SECTION_IDS })

watch(sectorParam.value, (next) => {
  if (next !== state.sector) setSector(next)
}, { immediate: true })

watch(() => state.sector, (next) => {
  if (next !== sectorParam.value.value) sectorParam.value.value = next
})

watch(sectionParam.value, (next) => {
  if (next !== state.activeSection) state.activeSection = next
}, { immediate: true })

watch(() => state.activeSection, (next) => {
  if (next !== sectionParam.value.value) sectionParam.value.value = next
})

// Reconcile an out-of-sector section arriving from the URL, e.g.
// `?sector=insurance&section=payment-status` (Payments is banking-only).
if (!sectionInSector(state.activeSection, state.sector)) {
  state.activeSection = firstSectionOfSector(state.sector)
}

onMounted(() => {
  if (typeof window !== 'undefined' && window.innerWidth <= MOBILE_BREAKPOINT) {
    state.sidebarCollapsed = true
  }
})

function onToggleSidebar(): void {
  state.sidebarCollapsed = !state.sidebarCollapsed
}

function onSelect(id: string): void {
  setSection(id)
  if (typeof window !== 'undefined' && window.innerWidth <= MOBILE_BREAKPOINT) {
    state.sidebarCollapsed = true
  }
}

// Keep the drawer open after switching sector so the user can pick a section
// within it (the section list changes with the sector).
function onSelectSector(id: Sector): void {
  setSector(id)
}

onUnmounted(() => resetFilters())
</script>

<template>
  <div class="db-shell">

    <DashboardNavbar @toggle-sidebar="onToggleSidebar" />

    <DashboardSidebar
      :sections="sections"
      :active-section="state.activeSection"
      :sector="state.sector"
      :collapsed="state.sidebarCollapsed"
      @select="onSelect"
      @select-sector="onSelectSector"
    />

    <div
      class="db-shell__scrim"
      :class="{ 'is-visible': !state.sidebarCollapsed }"
      @click="onToggleSidebar"
    />

    <div class="db-shell__body">
      <div class="db-shell__main">
        <DashboardMetricCards />
        <ClientOnly>
          <DashboardCharts />
          <template #placeholder>
            <!-- Reserve height to prevent CLS while the client mounts. -->
            <div class="db-shell__chart-placeholder" />
          </template>
        </ClientOnly>
      </div>
    </div>

  </div>
</template>

<style scoped>
.db-shell {
  /* Cancel the global `html { zoom: 0.9 }` (src/styles/base.css) for this page
     only, so it renders at a true 100%. Chart.js maps mouse events in real CSS
     pixels but the browser reports a canvas's measured size and its event
     coordinates in different scales under CSS zoom — that mismatch drifts the
     chart hover/tooltip across the x-axis. 1/0.9 ≈ 1.1111 restores 1:1. */
  zoom: 1.1111111;

  /* Wider than the global --at-page-max (1280px) for this page only; the
     navbar and main content both key off this so they stay aligned. */
  --db-page-max: 1600px;
  font-family: var(--at-sans);
  background: var(--at-bg-cream);
  color: var(--at-navy-deep);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.db-shell__body {
  display: flex;
  align-items: flex-start;
  flex: 1;
  min-height: 0;
}

.db-shell__main {
  flex: 1;
  min-width: 0;
  width: 100%;
  max-width: var(--db-page-max);
  margin: 1rem auto 0;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  gap: 0;
  overflow-x: hidden;
}

.db-shell__scrim {
  display: none;
}

/*
 * Reserve approximate chart-grid height so the page doesn't jump when
 * <ClientOnly> swaps the placeholder for the rendered grid. 800px covers
 * two rows of the 360px-min chart cells plus the header.
 */
.db-shell__chart-placeholder {
  min-height: 800px;
}

@media (max-width: 640px) {
  .db-shell__main {
    padding: 0 1.25rem;
  }
}

@media (max-width: 959px) {
  .db-shell__body {
    flex-direction: column;
  }

  .db-shell__scrim {
    display: block;
    position: fixed;
    inset: 4.25rem 0 0 0;
    background: rgba(0, 0, 0, 0.35);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.25s;
    z-index: 9;
  }

  .db-shell__scrim.is-visible {
    opacity: 1;
    pointer-events: auto;
  }
}
</style>
