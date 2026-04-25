<template>
  <div class="db-shell">

    <PageHeader />

    <DashboardNavbar @toggle-sidebar="toggleSidebar" />

    <DashboardSidebar
      :sections="NAV_SECTIONS"
      :active-section="state.activeSection"
      :collapsed="state.sidebarCollapsed"
      @select="onSelect"
    />

    <div
      class="db-shell__scrim"
      :class="{ 'is-visible': !state.sidebarCollapsed }"
      @click="toggleSidebar"
    ></div>

    <div class="db-shell__body">
      <div class="db-shell__main">
        <DashboardMetricCards />
        <DashboardCharts />
      </div>
    </div>

  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import { state, setSection, toggleSidebar, resetFilters } from './stores/dashboardStore.js'
import { NAV_SECTIONS } from './config/dashboardCharts.js'
import PageHeader          from './Components/PageHeader.vue'
import DashboardNavbar      from './DashboardNavbar.vue'
import DashboardSidebar     from './DashboardSidebar.vue'
import DashboardMetricCards from './DashboardMetricCards.vue'
import DashboardCharts      from './DashboardCharts.vue'

const MOBILE_BREAKPOINT = 959

onMounted(() => {
  if (typeof window !== 'undefined' && window.innerWidth <= MOBILE_BREAKPOINT) {
    state.sidebarCollapsed = true
  }
})

function onSelect(id) {
  setSection(id)
  if (typeof window !== 'undefined' && window.innerWidth <= MOBILE_BREAKPOINT) {
    state.sidebarCollapsed = true
  }
}

onUnmounted(() => resetFilters())
</script>

<style scoped>
.db-shell {
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
  margin-left: 449px;
}

.db-shell__main {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0;
  overflow-x: hidden;
  margin-top: 5rem;
}

.db-shell__scrim {
  display: none;
}

@media (max-width: 959px) {
  .db-shell__body {
    flex-direction: column;
    margin-left: 0;
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
