<script setup lang="ts">
// Phase 5b-iii — bar/stacked-bar chart for the dashboard, ported from
// `docs/components/WebPages/Charts/DashApiVolumeChart.vue`.
//
// Chart.js is registered once at module scope; the canvas is built on mount
// and recycled (data update over destroy/recreate) on prop change. SSG-safe:
// the parent `DashboardCharts` is wrapped in <ClientOnly>, so this component
// never renders during the static crawl.

import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  type ChartData,
  type ChartOptions,
} from 'chart.js'
import type { AnyRow } from '@/stores/dashboard'

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend)

interface Props {
  data:     readonly AnyRow[]
  groupBy?: string
  stackBy?: string
  grouped?: boolean
  valueKey?: string
  title?:   string
}

const props = withDefaults(defineProps<Props>(), {
  groupBy:  'month',
  grouped:  false,
  valueKey: 'volume',
  title:    '',
})

const canvasRef = ref<HTMLCanvasElement | null>(null)
let chart: Chart | null = null

const PALETTE: readonly string[] = [
  '#00277F',
  '#00C2A9',
  '#008BE4',
  '#B37819',
  '#0043A6',
  '#00A2FB',
  '#008B78',
  '#5F6A8F',
]

const TOOLTIP = {
  backgroundColor: '#001738',
  titleColor: '#FAFAF7',
  bodyColor: '#D7DEE8',
  borderRadius: 0,
  padding: 10,
  titleFont: { family: 'IBM Plex Mono, monospace', size: 10, weight: 500 },
  bodyFont: { family: 'Poppins, sans-serif', size: 11 },
} as const

interface Aggregate {
  groupLabels: string[]
  datasets: ChartData<'bar'>['datasets']
}

function readField(row: AnyRow, key: string): unknown {
  return (row as unknown as Record<string, unknown>)[key]
}

function aggregate(
  data: readonly AnyRow[],
  groupBy: string,
  stackBy: string | undefined,
  valueKey: string,
): Aggregate {
  const bucket: Record<string, Record<string, number>> = {}
  const stackKeys = new Set<string>()

  for (const row of data) {
    const gRaw = readField(row, groupBy)
    const gKey = String(gRaw ?? 'Unknown')
    const sRaw = stackBy ? readField(row, stackBy) : undefined
    const sKey = stackBy ? String(sRaw ?? 'Unknown') : '_'
    const vRaw = readField(row, valueKey)
    const val = Number(vRaw) || 0

    if (!gKey || gKey.toLowerCase() === 'unknown' || gKey === '/other') continue
    const slot = bucket[gKey] ?? (bucket[gKey] = {})
    slot[sKey] = (slot[sKey] ?? 0) + val
    stackKeys.add(sKey)
  }

  const groupLabels = Object.keys(bucket).sort()
  const stacks = stackBy ? [...stackKeys].sort() : ['_']

  const datasets = stacks.map((sKey, i) => ({
    label: stackBy ? sKey : props.title,
    data: groupLabels.map(g => bucket[g]?.[sKey] ?? 0),
    backgroundColor: PALETTE[i % PALETTE.length],
    borderColor: PALETTE[i % PALETTE.length],
    borderWidth: 0,
    borderRadius: 0,
    maxBarThickness: 60,
    ...(stackBy && !props.grouped ? { stack: 'stack' } : {}),
  }))

  return { groupLabels, datasets }
}

const total = computed<number>(() =>
  props.data.reduce((s, r) => s + (Number(readField(r, props.valueKey)) || 0), 0),
)

function render(): void {
  if (!canvasRef.value) return
  const { groupLabels, datasets } = aggregate(props.data, props.groupBy, props.stackBy, props.valueKey)

  if (chart) {
    chart.data.labels = groupLabels
    chart.data.datasets = datasets
    chart.update('active')
    return
  }

  const stacked = !!props.stackBy && !props.grouped
  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: !!props.stackBy,
        position: 'bottom',
        labels: {
          boxWidth: 10,
          boxHeight: 10,
          font: { family: 'Poppins, sans-serif', size: 11 },
          color: '#001738',
        },
      },
      tooltip: {
        ...TOOLTIP,
        callbacks: {
          label: (ctx) => `${ctx.dataset.label}: ${Number(ctx.parsed.y).toLocaleString()}`,
        },
      },
    },
    scales: {
      y: {
        stacked,
        beginAtZero: true,
        grid: { color: 'rgba(0,39,127,0.06)' },
        ticks: { color: 'rgba(0,23,56,0.55)', font: { family: 'Poppins, sans-serif', size: 10 } },
        title: {
          display: true,
          text: props.valueKey === 'errors' ? 'Errors' : 'API Calls',
          font: { family: 'IBM Plex Mono, monospace', size: 10, weight: 500 },
          color: 'rgba(0,23,56,0.55)',
        },
      },
      x: {
        stacked,
        grid: { display: false },
        ticks: { color: 'rgba(0,23,56,0.72)', font: { family: 'Poppins, sans-serif', size: 10 } },
      },
    },
  }

  chart = new Chart(canvasRef.value, {
    type: 'bar',
    data: { labels: groupLabels, datasets },
    options,
  })
}

onMounted(render)
watch(() => props.data, render, { deep: false })
onBeforeUnmount(() => { chart?.destroy(); chart = null })
</script>

<template>
  <div class="chart-wrap">
    <div class="chart-title">{{ title }}</div>
    <div v-if="total > 0" class="chart-meta">{{ total.toLocaleString() }} total</div>
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
