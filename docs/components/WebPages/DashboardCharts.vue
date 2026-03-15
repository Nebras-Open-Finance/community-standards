<!--
  DashboardCharts.vue
  ─────────────────────────────────────────────────────────────────────────
  Reads the active section from the store, looks up the chart configs for
  that section, applies hideIfFiltered rules, and renders a grid of
  DashboardChart components.

  Data flow:
    state.activeSection → CHART_REGISTRY[section] → visibleCharts
    filteredApiData / filteredPaymentData / filteredRtData → dataFor()
    → DashboardChart (config + data)
-->

<template>
  <section class="db-charts">

    <!-- Section header -->
    <div class="db-charts__header">
      <div>
        <h2 class="db-charts__title">{{ meta.title }}</h2>
        <p class="db-charts__desc">{{ meta.description }}</p>
      </div>
      <div class="db-charts__count">
        {{ recordCount.toLocaleString() }} records
      </div>
    </div>

    <!-- Chart grid -->
    <div class="db-charts__grid">
      <DashboardChart
        v-for="chart in visibleCharts"
        :key="chart.id"
        :config="chart"
        :data="dataFor(chart.dataSource)"
      />
    </div>

  </section>
</template>

<script setup>
import { computed } from 'vue'
import {
  state,
  filteredApiData,
  filteredSuccessApiData,
  filteredPaymentData,
  filteredRtData,
  dataForSource,
} from './stores/dashboardStore.js'
import { CHART_REGISTRY, SECTION_META } from './config/dashboardCharts.js'
import DashboardChart from './DashboardChart.vue'

// ── Meta for the active section ──────────────────────────────────────────
const meta = computed(() =>
  SECTION_META[state.activeSection] || { title: '', description: '' }
)

// ── Apply hideIfFiltered / showOnlyIfFiltered rules ──────────────────────
const visibleCharts = computed(() => {
  const configs = CHART_REGISTRY[state.activeSection] || []
  const hasAnyFilter = Object.values(state.filters).some(v => v != null)
  return configs.filter(c => {
    if (c.hideIfFiltered && state.filters[c.hideIfFiltered]) return false
    if (c.showOnlyIfFiltered === true && !hasAnyFilter) return false
    if (typeof c.showOnlyIfFiltered === 'string' && !state.filters[c.showOnlyIfFiltered]) return false
    return true
  })
})

// ── Record count for the section header ──────────────────────────────────
const recordCount = computed(() => {
  const section = state.activeSection
  if (section === 'api-volumes')     return filteredSuccessApiData.value.length
  if (section.startsWith('api'))     return filteredApiData.value.length
  if (section.startsWith('payment')) return filteredPaymentData.value.length
  return filteredRtData.value.length
})

// ── Data accessor (called during render — Vue tracks the reactive deps) ──
function dataFor(source) {
  return dataForSource(source)
}
</script>

<style scoped>
.db-charts {
  padding: 1.5rem;
  flex: 1;
  min-width: 0;
}

/* ── Section header ─────────────────────────────────────────────────────── */
.db-charts__header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.25rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #E8EFF6;
}

.db-charts__title {
  font-family: 'Poppins', sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
  color: #0C1441;
  margin: 0 0 0.15rem;
  letter-spacing: -0.01em;
}

.db-charts__desc {
  font-family: 'Poppins', sans-serif;
  font-size: 0.75rem;
  color: #667085;
  margin: 0;
}

.db-charts__count {
  font-family: 'Poppins', sans-serif;
  font-size: 0.72rem;
  font-weight: 600;
  color: #94a3b8;
  white-space: nowrap;
  flex-shrink: 0;
}

/* ── Grid ───────────────────────────────────────────────────────────────── */
.db-charts__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

@media (max-width: 900px) {
  .db-charts__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .db-charts {
    padding: 1rem;
  }
}
</style>
