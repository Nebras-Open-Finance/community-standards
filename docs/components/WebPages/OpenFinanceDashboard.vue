<template>
  <div class="db-shell">

    <PageHeader />

    <DashboardNavbar @toggle-sidebar="toggleSidebar" />

    <DashboardSidebar
      :sections="NAV_SECTIONS"
      :active-section="state.activeSection"
      :collapsed="state.sidebarCollapsed"
      @select="setSection"
    />

    <div class="db-shell__body">
      <div class="db-shell__main">
        <DashboardMetricCards />
        <DashboardCharts />
      </div>
    </div>

  </div>
</template>

<script setup>
import { onUnmounted } from 'vue'
import { state, setSection, toggleSidebar, resetFilters } from './stores/dashboardStore.js'
import { NAV_SECTIONS } from './config/dashboardCharts.js'
import PageHeader          from './Components/PageHeader.vue'
import DashboardNavbar      from './DashboardNavbar.vue'
import DashboardSidebar     from './DashboardSidebar.vue'
import DashboardMetricCards from './DashboardMetricCards.vue'
import DashboardCharts      from './DashboardCharts.vue'

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
  margin-left: 240px;
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

@media (max-width: 900px) {
  .db-shell__body {
    flex-direction: column;
    margin-left: 0;
  }
}
</style>
