<template>
  <div class="chart-wrap">
    <div class="chart-title">{{ title }}</div>
    <div class="chart-meta" v-if="metaValue">{{ metaValue }}</div>
    <div class="chart-container">
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

const props = defineProps({
  data:    { type: Array,  required: true },
  mode:    { type: String, default: 'avg-line' },
  groupBy: { type: String, default: 'month' },
  title:   { type: String, default: '' },
})

const canvasRef = ref(null)
let chart = null

const C_TEAL     = '#00C2A9'
const C_TEAL_DK  = '#008B78'
const C_GOLD     = '#B37819'
const C_NAVY     = '#00277F'
const C_NAVY_DK  = '#001738'
const C_BLUE     = '#008BE4'
const C_BLUE_DK  = '#0043A6'
const C_SKY      = '#00A2FB'

const TOOLTIP = {
  backgroundColor: C_NAVY_DK,
  titleColor: '#FAFAF7',
  bodyColor: '#D7DEE8',
  borderRadius: 0,
  padding: 10,
  titleFont: { family: 'IBM Plex Mono, monospace', size: 10, weight: '500' },
  bodyFont: { family: 'Poppins, sans-serif', size: 11 },
}

const AXIS_TICK = { color: 'rgba(0,23,56,0.55)', font: { family: 'Poppins, sans-serif', size: 10 } }
const AXIS_TITLE = { font: { family: 'IBM Plex Mono, monospace', size: 10, weight: '500' }, color: 'rgba(0,23,56,0.55)' }
const GRID = { color: 'rgba(0,39,127,0.06)' }

const metaValue = computed(() => {
  if (!props.data.length) return ''
  if (props.mode === 'histogram') return `${props.data.length.toLocaleString()} samples`
  const sum = props.data.reduce((s, r) => s + (r.avgMs || 0), 0)
  return `${Math.round(sum / props.data.length)}ms avg`
})

function buildAvgLine() {
  const field = props.groupBy || 'month'
  const byGroup = {}
  for (const r of props.data) {
    const key = r[field] || 'unknown'
    if (!byGroup[key]) byGroup[key] = { total: 0, n: 0 }
    byGroup[key].total += r.avgMs || 0
    byGroup[key].n++
  }
  const labels = Object.keys(byGroup).sort()
  const values = labels.map(m => Math.round(byGroup[m].total / byGroup[m].n))

  return new Chart(canvasRef.value, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Avg Latency',
        data: values,
        borderColor: C_TEAL,
        backgroundColor: 'rgba(0, 194, 169, 0.10)',
        borderWidth: 2,
        pointRadius: 3,
        pointBackgroundColor: C_TEAL,
        pointBorderColor: '#fff',
        pointBorderWidth: 1,
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
        y: { beginAtZero: true, grid: GRID, ticks: { ...AXIS_TICK, callback: v => `${v}ms` }, title: { display: true, text: 'ms', ...AXIS_TITLE } },
        x: { grid: { display: false }, ticks: { ...AXIS_TICK, color: 'rgba(0,23,56,0.72)' } },
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
  const max = Math.max(...values)
  const colors = values.map(v => {
    const ratio = max > 0 ? v / max : 0
    if (ratio < 0.4) return C_TEAL
    if (ratio < 0.7) return C_GOLD
    return C_BLUE_DK
  })

  return new Chart(canvasRef.value, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Avg Latency',
        data: values,
        backgroundColor: colors,
        borderRadius: 0,
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
        y: { beginAtZero: true, grid: GRID, ticks: { ...AXIS_TICK, callback: v => `${v}ms` } },
        x: { grid: { display: false }, ticks: { ...AXIS_TICK, color: 'rgba(0,23,56,0.72)' } },
      },
    },
  })
}

function buildPercentiles() {
  const field = props.groupBy || 'month'
  const byGroup = {}
  for (const r of props.data) {
    const key = r[field] || 'unknown'
    if (!byGroup[key]) byGroup[key] = { p50: 0, p95: 0, p99: 0, n: 0 }
    byGroup[key].p50 += r.p50 || 0
    byGroup[key].p95 += r.p95 || 0
    byGroup[key].p99 += r.p99 || 0
    byGroup[key].n++
  }
  const labels = Object.keys(byGroup).sort()

  const mkDs = (field, color, dash) => ({
    type: 'line',
    label: field.toUpperCase(),
    data: labels.map(m => Math.round(byGroup[m][field] / byGroup[m].n)),
    borderColor: color,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderDash: dash || [],
    pointRadius: 3,
    pointBackgroundColor: color,
    pointBorderColor: '#fff',
    pointBorderWidth: 1,
    fill: false,
    tension: 0.3,
  })

  return new Chart(canvasRef.value, {
    type: 'line',
    data: {
      labels,
      datasets: [
        mkDs('p50', C_TEAL),
        mkDs('p95', C_BLUE, [5, 3]),
        mkDs('p99', C_BLUE_DK, [2, 2]),
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
          labels: { boxWidth: 10, boxHeight: 10, font: { family: 'Poppins, sans-serif', size: 11 }, color: '#001738' },
        },
        tooltip: {
          ...TOOLTIP,
          callbacks: { label: ctx => `${ctx.dataset.label}: ${ctx.parsed.y}ms` },
        },
      },
      scales: {
        y: { beginAtZero: true, grid: GRID, ticks: { ...AXIS_TICK, callback: v => `${v}ms` }, title: { display: true, text: 'ms', ...AXIS_TITLE } },
        x: { grid: { display: false }, ticks: { ...AXIS_TICK, color: 'rgba(0,23,56,0.72)' } },
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
        backgroundColor: [C_TEAL, C_SKY, C_BLUE, C_BLUE_DK, C_GOLD],
        borderRadius: 0,
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
        y: { beginAtZero: true, grid: GRID, ticks: AXIS_TICK, title: { display: true, text: 'Requests', ...AXIS_TITLE } },
        x: { grid: { display: false }, ticks: { ...AXIS_TICK, color: 'rgba(0,23,56,0.72)' } },
      },
    },
  })
}

function render() {
  if (!canvasRef.value) return
  chart?.destroy()
  chart = null
  if (!props.data.length) return

  if (props.mode === 'avg-line')           chart = buildAvgLine()
  else if (props.mode === 'avg-bar')       chart = buildAvgBar()
  else if (props.mode === 'p-percentiles') chart = buildPercentiles()
  else if (props.mode === 'histogram')     chart = buildHistogram()
}

onMounted(render)
watch(() => props.data, render, { deep: false })
onBeforeUnmount(() => { chart?.destroy() })
</script>

<style scoped>
.chart-wrap {
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line);
  border-radius: 0;
  padding: 1.25rem;
  height: 100%;
  box-sizing: border-box;
}

.chart-title {
  font-family: var(--at-mono);
  font-size: 0.65rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--at-mute);
  margin-bottom: 0.35rem;
}

.chart-meta {
  font-family: var(--at-serif);
  font-size: 1.4rem;
  font-weight: 500;
  letter-spacing: -0.03em;
  color: var(--at-navy-deep);
  margin-bottom: 0.85rem;
  line-height: 1.1;
}

.chart-container {
  height: 280px;
  position: relative;
}
</style>
