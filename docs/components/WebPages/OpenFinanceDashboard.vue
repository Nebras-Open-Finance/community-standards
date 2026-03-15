<template>
  <div class="db-shell">

    <PageHeader />

    <!-- ── Top navbar (title + global filters) ──────────────────────── -->
    <DashboardNavbar @toggle-sidebar="toggleSidebar" />
    <DashboardSidebar
      :sections="NAV_SECTIONS"
      :active-section="state.activeSection"
      :collapsed="state.sidebarCollapsed"
      @select="setSection"
    />
    <!-- ── App body: sidebar + main content ─────────────────────────── -->
    <div class="db-shell__body">

      <!-- Dark sidebar -->


      <!-- Scrollable content column -->
      <div class="db-shell__main">

        <!-- KPI summary cards -->
        <DashboardMetricCards />

        <!-- Chart grid for the active section -->
        <DashboardCharts />

      </div>

    </div>

  </div>
</template>

<script setup>
import { state, setSection, toggleSidebar } from './stores/dashboardStore.js'
import { NAV_SECTIONS } from './config/dashboardCharts.js'
import PageHeader from './Components/PageHeader.vue'
import DashboardNavbar      from './DashboardNavbar.vue'
import DashboardSidebar     from './DashboardSidebar.vue'
import DashboardMetricCards from './DashboardMetricCards.vue'
import DashboardCharts      from './DashboardCharts.vue'
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

/* ── Root shell ─────────────────────────────────────────────────────────── */
.db-shell {
  font-family: 'Poppins', sans-serif;
  background: #f1f5f9;
  min-height: 100vh;
  display: flex;
  flex-direction: column;

}

/* ── Body: sidebar + main ───────────────────────────────────────────────── */
.db-shell__body {
  display: flex;
  align-items: flex-start;
  flex: 1;
  min-height: 0;
  margin-left: 240px;
}

/* ── Main content column ────────────────────────────────────────────────── */
.db-shell__main {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0;
  overflow-x: hidden;
    margin-top: 5rem;
}

/* ── Responsive ─────────────────────────────────────────────────────────── */
@media (max-width: 768px) {
  .db-shell__body {
    flex-direction: column;
  }
}
</style>
