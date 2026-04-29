<route lang="yaml">
meta:
  title: Metrics
</route>

<script setup lang="ts">
// Phase 5b-iii — Metrics dashboard. Inlines the wrapper logic from
// `docs/components/WebPages/OpenFinanceDashboard.vue` (113 lines, small
// enough to absorb directly into the page) and renders the four dashboard
// child components, all auto-registered by unplugin-vue-components from
// `src/components/dashboard/`.
//
// Page chrome (PageHeader / PageFooter) is owned by the default layout — we
// don't render `<PageHeader>` here.
//
// Chart.js needs DOM access (canvas), so the chart-rendering subtree is
// wrapped in `<ClientOnly>` (auto-registered globally by vite-ssg). The
// sidebar + KPI cards render server-side too — they're DOM-only and benefit
// from the SSG paint. CLS is mitigated by `min-height` on the chart row in
// `src/components/dashboard/DashboardCharts.vue`. See R11 in
// supporting/internal_helpers/migration-plan.md.
//
// URL state: the active section is persisted via `useUrlSearchParam`
// (auto-imported from `src/composables/`). `?section=payment-volumes` round-
// trips through `state.activeSection`, with the default value (`api-volumes`)
// removed from the URL by the composable's invariant.

import {
  state,
  setSection,
  resetFilters,
} from '@/stores/dashboard'
import { NAV_SECTIONS } from '@/data/dashboard-charts'

const MOBILE_BREAKPOINT = 959

// All section IDs across `NAV_SECTIONS`. Used as the whitelist for the URL
// search-param so a manually-typed `?section=garbage` is ignored on read.
const ALL_SECTION_IDS: readonly string[] = NAV_SECTIONS.flatMap(g => g.items.map(i => i.id))

// Bind `state.activeSection` to `?section=…` via the shared composable.
// Using a separate `Ref` synced via watchers keeps the store dialect intact
// (mutate `state` directly, never the URL ref). Two-way binding:
//   * URL → store on mount (composable runs `readFromUrl` in `onMounted`)
//   * store → URL on every section change (watcher below)
const sectionParam = useUrlSearchParam<string>('section', 'api-volumes', { allowed: ALL_SECTION_IDS })

// Watcher (URL ref → store): fires when the composable seeds from the URL.
watch(sectionParam.value, (next) => {
  if (next !== state.activeSection) state.activeSection = next
}, { immediate: true })

// Watcher (store → URL ref): fires when the user clicks a sidebar item.
watch(() => state.activeSection, (next) => {
  if (next !== sectionParam.value.value) sectionParam.value.value = next
})

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

// Reset filters when the user navigates away — preserves the original
// OpenFinanceDashboard.vue behaviour (`onUnmounted(() => resetFilters())`).
onUnmounted(() => resetFilters())
</script>

<template>
  <div class="db-shell">

    <DashboardNavbar @toggle-sidebar="onToggleSidebar" />

    <DashboardSidebar
      :sections="NAV_SECTIONS"
      :active-section="state.activeSection"
      :collapsed="state.sidebarCollapsed"
      @select="onSelect"
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
