<script setup lang="ts">
// Phase 5b-iii — line/bar/percentile/histogram response-time chart, ported
// from `docs/components/WebPages/Charts/DashResponseTimeChart.vue`. SSG-safe
// because the parent `DashboardCharts` is wrapped in <ClientOnly>.

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
  type ChartConfiguration,
} from 'chart.js'
import type { AnyRow } from '@/stores/dashboard'

Chart.register(
  BarController, BarElement,
  LineController, LineElement, PointElement,
  CategoryScale, LinearScale,
  Tooltip, Legend,
)

type Mode = 'avg-line' | 'avg-bar' | 'p-percentiles' | 'histogram'

interface Props {
  data:    readonly AnyRow[]
  mode?:   Mode
  groupBy?: string
  title?:  string
}

const props = withDefaults(defineProps<Props>(), {
  mode:    'avg-line',
  groupBy: 'month',
  title:   '',
})

const canvasRef = ref<HTMLCanvasElement | null>(null)
let chart: Chart | null = null

const C_TEAL    = '#00C2A9'
const C_GOLD    = '#B37819'
const C_NAVY_DK = '#001738'
const C_BLUE    = '#008BE4'
const C_BLUE_DK = '#0043A6'
const C_SKY     = '#00A2FB'

const TOOLTIP = {
  backgroundColor: C_NAVY_DK,
  titleColor: '#FAFAF7',
  bodyColor: '#D7DEE8',
  borderRadius: 0,
  padding: 10,
  titleFont: { family: 'IBM Plex Mono, monospace', size: 10, weight: 500 },
  bodyFont: { family: 'Poppins, sans-serif', size: 11 },
} as const

const AXIS_TICK = { color: 'rgba(0,23,56,0.55)', font: { family: 'Poppins, sans-serif', size: 10 } } as const
const AXIS_TITLE = { font: { family: 'IBM Plex Mono, monospace', size: 10, weight: 500 }, color: 'rgba(0,23,56,0.55)' } as const
const GRID = { color: 'rgba(0,39,127,0.06)' } as const

function readField(row: AnyRow, key: string): unknown {
  return (row as unknown as Record<string, unknown>)[key]
}

function getAvgMs(row: AnyRow): number {
  const v = (row as { avgMs?: unknown }).avgMs
  return typeof v === 'number' ? v : 0
}

function getPercentile(row: AnyRow, key: 'p50' | 'p95' | 'p99'): number {
  const v = (row as unknown as Record<string, unknown>)[key]
  return typeof v === 'number' ? v : 0
}

const metaValue = computed<string>(() => {
  if (!props.data.length) return ''
  if (props.mode === 'histogram') return `${props.data.length.toLocaleString()} samples`
  const sum = props.data.reduce((s, r) => s + getAvgMs(r), 0)
  return `${Math.round(sum / props.data.length)}ms avg`
})

function buildAvgLine(): Chart {
  const field = props.groupBy || 'month'
  const byGroup: Record<string, { total: number; n: number }> = {}
  for (const r of props.data) {
    const key = String(readField(r, field) ?? 'unknown')
    const slot = byGroup[key] ?? (byGroup[key] = { total: 0, n: 0 })
    slot.total += getAvgMs(r)
    slot.n += 1
  }
  const labels = Object.keys(byGroup).sort()
  const values = labels.map(m => {
    const slot = byGroup[m]
    return slot ? Math.round(slot.total / slot.n) : 0
  })

  const config: ChartConfiguration<'line'> = {
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
        tooltip: { ...TOOLTIP, callbacks: { label: (ctx) => `${ctx.parsed.y}ms` } },
      },
      scales: {
        y: { beginAtZero: true, grid: GRID, ticks: { ...AXIS_TICK, callback: (v) => `${v}ms` }, title: { display: true, text: 'ms', ...AXIS_TITLE } },
        x: { grid: { display: false }, ticks: { ...AXIS_TICK, color: 'rgba(0,23,56,0.72)' } },
      },
    },
  }
  return new Chart(canvasRef.value!, config)
}

function buildAvgBar(): Chart {
  const byGroup: Record<string, { total: number; n: number }> = {}
  for (const r of props.data) {
    const key = String(readField(r, props.groupBy) ?? 'Unknown')
    if (!key || key.toLowerCase() === 'unknown') continue
    const slot = byGroup[key] ?? (byGroup[key] = { total: 0, n: 0 })
    slot.total += getAvgMs(r)
    slot.n += 1
  }
  const labels = Object.keys(byGroup).sort()
  const values = labels.map(k => {
    const slot = byGroup[k]
    return slot ? Math.round(slot.total / slot.n) : 0
  })
  const max = values.length ? Math.max(...values) : 0
  const colors = values.map(v => {
    const ratio = max > 0 ? v / max : 0
    if (ratio < 0.4) return C_TEAL
    if (ratio < 0.7) return C_GOLD
    return C_BLUE_DK
  })

  const config: ChartConfiguration<'bar'> = {
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
        tooltip: { ...TOOLTIP, callbacks: { label: (ctx) => `${ctx.parsed.y}ms` } },
      },
      scales: {
        y: { beginAtZero: true, grid: GRID, ticks: { ...AXIS_TICK, callback: (v) => `${v}ms` } },
        x: { grid: { display: false }, ticks: { ...AXIS_TICK, color: 'rgba(0,23,56,0.72)' } },
      },
    },
  }
  return new Chart(canvasRef.value!, config)
}

function buildPercentiles(): Chart {
  const field = props.groupBy || 'month'
  const byGroup: Record<string, { p50: number; p95: number; p99: number; n: number }> = {}
  for (const r of props.data) {
    const key = String(readField(r, field) ?? 'unknown')
    const slot = byGroup[key] ?? (byGroup[key] = { p50: 0, p95: 0, p99: 0, n: 0 })
    slot.p50 += getPercentile(r, 'p50')
    slot.p95 += getPercentile(r, 'p95')
    slot.p99 += getPercentile(r, 'p99')
    slot.n += 1
  }
  const labels = Object.keys(byGroup).sort()

  const mkDs = (k: 'p50' | 'p95' | 'p99', color: string, dash?: number[]) => ({
    type: 'line' as const,
    label: k.toUpperCase(),
    data: labels.map(m => {
      const slot = byGroup[m]
      return slot ? Math.round(slot[k] / slot.n) : 0
    }),
    borderColor: color,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderDash: dash ?? [],
    pointRadius: 3,
    pointBackgroundColor: color,
    pointBorderColor: '#fff',
    pointBorderWidth: 1,
    fill: false,
    tension: 0.3,
  })

  const config: ChartConfiguration<'line'> = {
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
        tooltip: { ...TOOLTIP, callbacks: { label: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.y}ms` } },
      },
      scales: {
        y: { beginAtZero: true, grid: GRID, ticks: { ...AXIS_TICK, callback: (v) => `${v}ms` }, title: { display: true, text: 'ms', ...AXIS_TITLE } },
        x: { grid: { display: false }, ticks: { ...AXIS_TICK, color: 'rgba(0,23,56,0.72)' } },
      },
    },
  }
  return new Chart(canvasRef.value!, config)
}

interface HistogramBucket { label: string; max: number }

function buildHistogram(): Chart {
  const BUCKETS: readonly HistogramBucket[] = [
    { label: '< 100ms',   max: 100      },
    { label: '100–200ms', max: 200      },
    { label: '200–400ms', max: 400      },
    { label: '400–800ms', max: 800      },
    { label: '800ms+',    max: Infinity },
  ]
  const counts: number[] = Array(BUCKETS.length).fill(0) as number[]
  for (const r of props.data) {
    const v = getAvgMs(r)
    const found = BUCKETS.findIndex(b => v < b.max)
    const idx = found >= 0 ? found : BUCKETS.length - 1
    counts[idx] = (counts[idx] ?? 0) + 1
  }

  const config: ChartConfiguration<'bar'> = {
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
        tooltip: { ...TOOLTIP, callbacks: { label: (ctx) => `${Number(ctx.parsed.y).toLocaleString()} requests` } },
      },
      scales: {
        y: { beginAtZero: true, grid: GRID, ticks: AXIS_TICK, title: { display: true, text: 'Requests', ...AXIS_TITLE } },
        x: { grid: { display: false }, ticks: { ...AXIS_TICK, color: 'rgba(0,23,56,0.72)' } },
      },
    },
  }
  return new Chart(canvasRef.value!, config)
}

function render(): void {
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
onBeforeUnmount(() => { chart?.destroy(); chart = null })
</script>

<template>
  <div class="chart-wrap">
    <div class="chart-title">{{ title }}</div>
    <div v-if="metaValue" class="chart-meta">{{ metaValue }}</div>
    <div class="chart-container">
      <canvas ref="canvasRef" />
    </div>
  </div>
</template>

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
