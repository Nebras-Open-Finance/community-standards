<!--
  DashApiVolumeChart.vue
  ─────────────────────────────────────────────────────────────────────────
  Example of how filter-reactive charts work in the dashboard:

  1. The PARENT (OpenFinanceDashboard) holds the central filter state and
     computes `filteredApiData` from the raw mock data by applying all
     active filters (LFI, TPP, month, API family).

  2. The PARENT passes the already-filtered array down as the `:data` prop.

  3. This component watches `data` and re-renders the Chart.js chart
     whenever the array reference changes.

  4. The chart NEVER queries filters directly — it only knows about `data`.
     Grouping/stacking is controlled by the `groupBy` and `stackBy` props.

  Usage examples:
    <!-- Stacked bar: months on X, API family as stacks -->
    <DashApiVolumeChart :data="filteredApiData" group-by="month" stack-by="family" title="Volume by Month" />

    <!-- Simple bar: one bar per LFI (hidden when filters.lfi is set) -->
    <DashApiVolumeChart v-if="!filters.lfi" :data="filteredApiData" group-by="lfi" title="Volume by LFI" />

    <!-- Errors: success/error stacked -->
    <DashApiVolumeChart :data="filteredApiData" group-by="month" value-key="errors" title="Errors by Month" />
-->

<template>
  <div class="chart-wrap">
    <div class="chart-title">{{ title }}</div>
    <div class="chart-meta" v-if="total > 0">{{ total.toLocaleString() }} total</div>
    <div class="chart-container">
      <canvas ref="canvasRef"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted, onBeforeUnmount } from 'vue'
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js'

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend)

// ── Props ────────────────────────────────────────────────────────────────
const props = defineProps({
  /** Pre-filtered data array from the parent dashboard */
  data: { type: Array, required: true },

  /**
   * Which field to use as X-axis categories.
   * One of: 'month' | 'lfi' | 'tpp' | 'version' | 'family'
   */
  groupBy: { type: String, default: 'month' },

  /**
   * Optional: which field to use for stacked series.
   * One of: 'family' | 'lfi' | 'tpp' | null
   */
  stackBy: { type: String, default: null },

  /**
   * Which numeric field to sum.
   * One of: 'volume' | 'errors'
   */
  valueKey: { type: String, default: 'volume' },

  title: { type: String, default: '' },
})

// ── State ────────────────────────────────────────────────────────────────
const canvasRef = ref(null)
let chart = null

const PALETTE = [
  '#4F46E5', '#10B981', '#F59E0B', '#3B82F6',
  '#EC4899', '#8B5CF6', '#F97316', '#14B8A6',
]

// ── Aggregation ──────────────────────────────────────────────────────────
function aggregate(data, groupBy, stackBy, valueKey) {
  // bucket[groupKey][stackKey] = summed value
  const bucket = {}
  const stackKeys = new Set()

  for (const row of data) {
    const gKey = String(row[groupBy] ?? 'Unknown')
    const sKey = stackBy ? String(row[stackBy] ?? 'Unknown') : '_'
    const val = Number(row[valueKey]) || 0

    if (!gKey || gKey.toLowerCase() === 'unknown' || gKey === '/other') continue
    if (!bucket[gKey]) bucket[gKey] = {}
    bucket[gKey][sKey] = (bucket[gKey][sKey] || 0) + val
    stackKeys.add(sKey)
  }

  const groupLabels = Object.keys(bucket).sort()
  const stacks = stackBy ? [...stackKeys].sort() : ['_']

  const datasets = stacks.map((sKey, i) => ({
    label: stackBy ? sKey : props.title,
    data: groupLabels.map(g => bucket[g]?.[sKey] || 0),
    backgroundColor: PALETTE[i % PALETTE.length],
    borderColor: PALETTE[i % PALETTE.length],
    borderWidth: 1,
    borderRadius: 6,
    maxBarThickness: 60,
    ...(stackBy ? { stack: 'stack' } : {}),
  }))

  return { groupLabels, datasets }
}

// ── Total for subtitle ───────────────────────────────────────────────────
const total = computed(() =>
  props.data.reduce((s, r) => s + (Number(r[props.valueKey]) || 0), 0)
)

// ── Chart lifecycle ──────────────────────────────────────────────────────
function render() {
  if (!canvasRef.value) return
  const { groupLabels, datasets } = aggregate(props.data, props.groupBy, props.stackBy, props.valueKey)

  if (chart) {
    chart.data.labels = groupLabels
    chart.data.datasets = datasets
    chart.update('active')
    return
  }

  chart = new Chart(canvasRef.value, {
    type: 'bar',
    data: { labels: groupLabels, datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: !!props.stackBy,
          position: 'bottom',
          labels: { boxWidth: 12, font: { size: 11 } },
        },
        tooltip: {
          backgroundColor: '#1F2937',
          titleColor: '#F3F4F6',
          bodyColor: '#D1D5DB',
          callbacks: {
            label: ctx => `${ctx.dataset.label}: ${ctx.parsed.y.toLocaleString()}`,
          },
        },
      },
      scales: {
        y: {
          stacked: !!props.stackBy,
          beginAtZero: true,
          grid: { color: 'rgba(0,0,0,0.05)' },
          title: {
            display: true,
            text: props.valueKey === 'errors' ? 'Errors' : 'API Calls',
            font: { size: 11 },
          },
        },
        x: {
          stacked: !!props.stackBy,
          grid: { display: false },
        },
      },
    },
  })
}

onMounted(render)

// ── React to filtered data changes ───────────────────────────────────────
// This is the key: whenever the parent re-computes filteredApiData (because
// a filter changed), `data` prop changes and this watch fires.
watch(() => props.data, render, { deep: false })

onBeforeUnmount(() => { chart?.destroy() })
</script>

<style scoped>
.chart-wrap {
  background: var(--vp-c-bg, #fff);
  border: 1px solid var(--vp-c-divider, #e2e8f0);
  border-radius: 12px;
  padding: 1.25rem;
  height: 100%;
  box-sizing: border-box;
}

.chart-title {
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: var(--vp-c-text-2, #94a3b8);
  margin-bottom: 0.2rem;
}

.chart-meta {
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  color: var(--vp-c-text-1, #1e293b);
  margin-bottom: 0.75rem;
}

.chart-container {
  height: 280px;
  position: relative;
}
</style>
