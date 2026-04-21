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

const props = defineProps({
  data:     { type: Array,  required: true },
  groupBy:  { type: String, default: 'month' },
  stackBy:  { type: String, default: null },
  grouped:  { type: Boolean, default: false },
  valueKey: { type: String, default: 'volume' },
  title:    { type: String, default: '' },
})

const canvasRef = ref(null)
let chart = null

const PALETTE = [
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
  titleFont: { family: 'IBM Plex Mono, monospace', size: 10, weight: '500' },
  bodyFont: { family: 'Poppins, sans-serif', size: 11 },
}

function aggregate(data, groupBy, stackBy, valueKey) {
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
    borderWidth: 0,
    borderRadius: 0,
    maxBarThickness: 60,
    ...(stackBy && !props.grouped ? { stack: 'stack' } : {}),
  }))

  return { groupLabels, datasets }
}

const total = computed(() =>
  props.data.reduce((s, r) => s + (Number(r[props.valueKey]) || 0), 0)
)

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
            label: ctx => `${ctx.dataset.label}: ${ctx.parsed.y.toLocaleString()}`,
          },
        },
      },
      scales: {
        y: {
          stacked: !!props.stackBy && !props.grouped,
          beginAtZero: true,
          grid: { color: 'rgba(0,39,127,0.06)' },
          ticks: { color: 'rgba(0,23,56,0.55)', font: { family: 'Poppins, sans-serif', size: 10 } },
          title: {
            display: true,
            text: props.valueKey === 'errors' ? 'Errors' : 'API Calls',
            font: { family: 'IBM Plex Mono, monospace', size: 10, weight: '500' },
            color: 'rgba(0,23,56,0.55)',
          },
        },
        x: {
          stacked: !!props.stackBy && !props.grouped,
          grid: { display: false },
          ticks: { color: 'rgba(0,23,56,0.72)', font: { family: 'Poppins, sans-serif', size: 10 } },
        },
      },
    },
  })
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
