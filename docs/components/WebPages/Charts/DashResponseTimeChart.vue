<!--
  DashResponseTimeChart.vue
  ─────────────────────────────────────────────────────────────────────────
  Filter-reactive chart component for API response time metrics.

  Modes
  ─────
  • avg-line       — average latency by month (area line chart)
  • avg-bar        — average latency by any group field (bar chart)
  • p-percentiles  — p50 / p95 / p99 multi-line chart by month
  • histogram      — request distribution across latency buckets (bar)

  Usage examples
  ──────────────
  <DashResponseTimeChart :data="filteredRtData" mode="avg-line" title="Avg Latency by Month" />
  <DashResponseTimeChart :data="filteredRtData" mode="avg-bar" group-by="lfi" title="Avg by LFI" />
  <DashResponseTimeChart :data="filteredRtData" mode="p-percentiles" title="p50 / p95 / p99" />
  <DashResponseTimeChart :data="filteredRtData" mode="histogram" title="Distribution" />
-->

<template>
  <div class="rt-wrap">
    <div class="rt-title">{{ title }}</div>
    <div class="rt-meta" v-if="metaValue">{{ metaValue }}</div>
    <div class="rt-container">
      <canvas ref="canvasRef"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import {
  Chart,
  BarController,
  BarElement,
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js'

Chart.register(
  BarController, BarElement,
  LineController, LineElement, PointElement,
  CategoryScale, LinearScale,
  Tooltip, Legend,
)

// ── Props ────────────────────────────────────────────────────────────────
const props = defineProps({
  data:    { type: Array,  required: true },
  mode:    { type: String, default: 'avg-line' }, // avg-line | avg-bar | p-percentiles | histogram
  groupBy: { type: String, default: 'family' },   // used only in avg-bar mode
  title:   { type: String, default: '' },
})

// ── State ────────────────────────────────────────────────────────────────
const canvasRef = ref(null)
let chart = null

// ── Brand colours (align with ConsentDefinedSchedule palette) ────────────
const C_TEAL  = '#36BFD4'
const C_AMBER = '#F59E0B'
const C_RED   = '#EF4444'
const C_NAVY  = '#0C1441'
const C_BLUE  = '#4F8EF7'
const C_ORG   = '#F97316'

const TOOLTIP = {
  backgroundColor: C_NAVY,
  titleColor: '#F4F8FB',
  bodyColor: '#CBD5E1',
  borderRadius: 8,
  padding: 10,
}

// ── Subtitle value (avg latency for most modes) ──────────────────────────
const metaValue = computed(() => {
  if (!props.data.length) return ''
  if (props.mode === 'histogram') return `${props.data.length.toLocaleString()} samples`
  const sum = props.data.reduce((s, r) => s + (r.avgMs || 0), 0)
  return `${Math.round(sum / props.data.length)}ms avg`
})

// ── Chart builders ───────────────────────────────────────────────────────

function buildAvgLine() {
  const byMonth = {}
  for (const r of props.data) {
    if (!byMonth[r.month]) byMonth[r.month] = { total: 0, n: 0 }
    byMonth[r.month].total += r.avgMs || 0
    byMonth[r.month].n++
  }
  const labels = Object.keys(byMonth).sort()
  const values = labels.map(m => Math.round(byMonth[m].total / byMonth[m].n))

  return new Chart(canvasRef.value, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Avg Latency',
        data: values,
        borderColor: C_TEAL,
        backgroundColor: 'rgba(54,191,212,0.07)',
        borderWidth: 2.5,
        pointRadius: 4,
        pointBackgroundColor: C_TEAL,
        fill: true,
        tension: 0.35,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { ...TOOLTIP, callbacks: { label: ctx => `${ctx.parsed.y}ms` } },
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: 'rgba(0,0,0,0.04)' },
          ticks: { callback: v => `${v}ms` },
          title: { display: true, text: 'ms', font: { size: 11 } },
        },
        x: { grid: { display: false } },
      },
    },
  })
}

function buildAvgBar() {
  const byGroup = {}
  for (const r of props.data) {
    const key = String(r[props.groupBy] ?? 'Unknown')
    if (!key || key.toLowerCase() === 'unknown') continue
    if (!byGroup[key]) byGroup[key] = { total: 0, n: 0 }
    byGroup[key].total += r.avgMs || 0
    byGroup[key].n++
  }
  const labels = Object.keys(byGroup).sort()
  const values = labels.map(k => Math.round(byGroup[k].total / byGroup[k].n))
  // Colour bars by value: fastest → teal, slowest → orange-red
  const max = Math.max(...values)
  const colors = values.map(v => {
    const ratio = max > 0 ? v / max : 0
    if (ratio < 0.4) return C_TEAL
    if (ratio < 0.7) return C_AMBER
    return C_RED
  })

  return new Chart(canvasRef.value, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Avg Latency',
        data: values,
        backgroundColor: colors,
        borderRadius: 6,
        maxBarThickness: 60,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { ...TOOLTIP, callbacks: { label: ctx => `${ctx.parsed.y}ms` } },
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: 'rgba(0,0,0,0.04)' },
          ticks: { callback: v => `${v}ms` },
        },
        x: { grid: { display: false } },
      },
    },
  })
}

function buildPercentiles() {
  const byMonth = {}
  for (const r of props.data) {
    if (!byMonth[r.month]) byMonth[r.month] = { p50: 0, p95: 0, p99: 0, n: 0 }
    byMonth[r.month].p50 += r.p50 || 0
    byMonth[r.month].p95 += r.p95 || 0
    byMonth[r.month].p99 += r.p99 || 0
    byMonth[r.month].n++
  }
  const labels = Object.keys(byMonth).sort()

  const mkDs = (field, color, dash) => ({
    type: 'line',
    label: field.toUpperCase(),
    data: labels.map(m => Math.round(byMonth[m][field] / byMonth[m].n)),
    borderColor: color,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderDash: dash || [],
    pointRadius: 3,
    pointBackgroundColor: color,
    fill: false,
    tension: 0.3,
  })

  return new Chart(canvasRef.value, {
    type: 'line',
    data: {
      labels,
      datasets: [
        mkDs('p50', C_TEAL),
        mkDs('p95', C_AMBER, [5, 3]),
        mkDs('p99', C_RED,   [2, 2]),
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
          labels: { boxWidth: 12, font: { size: 11 } },
        },
        tooltip: {
          ...TOOLTIP,
          callbacks: { label: ctx => `${ctx.dataset.label}: ${ctx.parsed.y}ms` },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: 'rgba(0,0,0,0.04)' },
          ticks: { callback: v => `${v}ms` },
          title: { display: true, text: 'ms', font: { size: 11 } },
        },
        x: { grid: { display: false } },
      },
    },
  })
}

function buildHistogram() {
  const BUCKETS = [
    { label: '< 100ms',   max: 100      },
    { label: '100–200ms', max: 200      },
    { label: '200–400ms', max: 400      },
    { label: '400–800ms', max: 800      },
    { label: '800ms+',    max: Infinity },
  ]
  const counts = Array(BUCKETS.length).fill(0)
  for (const r of props.data) {
    const v = r.avgMs || 0
    const idx = BUCKETS.findIndex(b => v < b.max)
    counts[idx >= 0 ? idx : BUCKETS.length - 1]++
  }

  return new Chart(canvasRef.value, {
    type: 'bar',
    data: {
      labels: BUCKETS.map(b => b.label),
      datasets: [{
        label: 'Requests',
        data: counts,
        backgroundColor: [C_TEAL, C_BLUE, C_AMBER, C_ORG, C_RED],
        borderRadius: 6,
        maxBarThickness: 70,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          ...TOOLTIP,
          callbacks: { label: ctx => `${ctx.parsed.y.toLocaleString()} requests` },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: 'rgba(0,0,0,0.04)' },
          title: { display: true, text: 'Requests', font: { size: 11 } },
        },
        x: { grid: { display: false } },
      },
    },
  })
}

// ── Render dispatcher ────────────────────────────────────────────────────
function render() {
  if (!canvasRef.value) return
  chart?.destroy()
  chart = null
  if (!props.data.length) return

  if (props.mode === 'avg-line')       chart = buildAvgLine()
  else if (props.mode === 'avg-bar')   chart = buildAvgBar()
  else if (props.mode === 'p-percentiles') chart = buildPercentiles()
  else if (props.mode === 'histogram') chart = buildHistogram()
}

onMounted(render)
watch(() => props.data, render, { deep: false })
onBeforeUnmount(() => { chart?.destroy() })
</script>

<style scoped>
.rt-wrap {
  background: #fff;
  border: 1px solid #E8EFF6;
  border-radius: 12px;
  padding: 1.25rem;
  height: 100%;
  box-sizing: border-box;
}

.rt-title {
  font-family: 'Poppins', sans-serif;
  font-size: 0.72rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: #667085;
  margin-bottom: 0.2rem;
}

.rt-meta {
  font-family: 'Poppins', sans-serif;
  font-size: 1.35rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  color: #0C1441;
  margin-bottom: 0.75rem;
}

.rt-container {
  height: 280px;
  position: relative;
}
</style>
