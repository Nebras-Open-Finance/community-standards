<template>
  <DashApiVolumeChart
    v-if="config.component === 'volume'"
    :data="data"
    v-bind="config.props"
    :title="config.title"
  />

  <DashResponseTimeChart
    v-else-if="config.component === 'rt'"
    :data="data"
    v-bind="config.props"
    :title="config.title"
  />

  <div v-else-if="config.component === 'error-rate'" class="chart-card">
    <div class="chart-card__title">{{ config.title }}</div>
    <div class="chart-card__meta">{{ avgErrorRate }}% avg error rate</div>
    <div class="chart-card__canvas">
      <canvas ref="canvasRef"></canvas>
    </div>
  </div>

  <div v-else-if="config.component === 'error-codes'" class="chart-card">
    <div class="chart-card__title">{{ config.title }}</div>
    <div class="chart-card__canvas">
      <canvas ref="canvasRef"></canvas>
    </div>
  </div>

  <div v-else-if="config.component === 'success-rate'" class="chart-card">
    <div class="chart-card__title">{{ config.title }}</div>
    <div class="chart-card__canvas">
      <canvas ref="canvasRef"></canvas>
    </div>
  </div>

  <div v-else-if="config.component === 'pay-status'" class="chart-card">
    <div class="chart-card__title">{{ config.title }}</div>
    <div class="chart-card__canvas">
      <canvas ref="canvasRef"></canvas>
    </div>
  </div>

  <div v-else-if="config.component === 'auth-rate'" class="chart-card">
    <div class="chart-card__title">{{ config.title }}</div>
    <div class="chart-card__meta">{{ authRateSummary }}</div>
    <div class="chart-card__canvas">
      <canvas ref="canvasRef"></canvas>
    </div>
  </div>

  <div v-else-if="config.component === 'rt-ranked'" class="chart-card">
    <div class="chart-card__title">{{ config.title }}</div>
    <div class="ranked-list">
      <div
        v-for="(item, idx) in slowestEndpoints"
        :key="item.endpoint"
        class="ranked-row"
      >
        <span class="rank-num">{{ String(idx + 1).padStart(2, '0') }}</span>
        <div class="rank-content">
          <div class="rank-top">
            <span class="rank-label">{{ item.endpoint }}</span>
            <span class="rank-value">{{ item.avgMs }}ms</span>
          </div>
          <div class="rank-bar-track">
            <div
              class="rank-bar-fill"
              :style="{ width: `${(item.avgMs / slowestEndpoints[0].avgMs) * 100}%` }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import {
  Chart,
  BarController, BarElement,
  LineController, LineElement, PointElement,
  DoughnutController, ArcElement,
  CategoryScale, LinearScale,
  Tooltip, Legend,
} from 'chart.js'

import DashApiVolumeChart from './Charts/DashApiVolumeChart.vue'
import DashResponseTimeChart from './Charts/DashResponseTimeChart.vue'

Chart.register(
  BarController, BarElement,
  LineController, LineElement, PointElement,
  DoughnutController, ArcElement,
  CategoryScale, LinearScale,
  Tooltip, Legend,
)

const props = defineProps({
  config: { type: Object, required: true },
  data:   { type: Array,  required: true },
})

const canvasRef = ref(null)
let chartInstance = null

const INLINE_TYPES = ['error-rate', 'error-codes', 'success-rate', 'pay-status', 'auth-rate']

const ACCENT = {
  teal:     '#00C2A9',
  tealDeep: '#008B78',
  gold:     '#B37819',
  navy:     '#00277F',
  navyDeep: '#001738',
  blue:     '#008BE4',
  sky:      '#00A2FB',
  blueDeep: '#0043A6',
  mute:     'rgba(0,23,56,0.45)',
}

const TOOLTIP = {
  backgroundColor: ACCENT.navyDeep,
  titleColor: '#FAFAF7',
  bodyColor: '#D7DEE8',
  borderRadius: 0,
  padding: 10,
  titleFont: { family: 'IBM Plex Mono, monospace', size: 10, weight: '500' },
  bodyFont: { family: 'Poppins, sans-serif', size: 11 },
}

const AXIS_TICK  = { color: 'rgba(0,23,56,0.55)', font: { family: 'Poppins, sans-serif', size: 10 } }
const AXIS_LABEL = { color: 'rgba(0,23,56,0.72)', font: { family: 'Poppins, sans-serif', size: 10 } }
const AXIS_TITLE = { font: { family: 'IBM Plex Mono, monospace', size: 10, weight: '500' }, color: 'rgba(0,23,56,0.55)' }
const GRID       = { color: 'rgba(0,39,127,0.06)' }
const LEGEND     = { boxWidth: 10, boxHeight: 10, font: { family: 'Poppins, sans-serif', size: 11 }, color: ACCENT.navyDeep }

const avgErrorRate = computed(() => {
  const vol = props.data.filter(r => r.status !== 'error').reduce((s, r) => s + (r.volume || 0), 0)
  const err = props.data.filter(r => r.status === 'error').reduce((s, r) => s + (r.volume || 0), 0)
  return (vol + err) > 0 ? ((err / (vol + err)) * 100).toFixed(2) : '0.00'
})

const slowestEndpoints = computed(() => {
  if (props.config.component !== 'rt-ranked') return []
  const byEndpoint = {}
  for (const r of props.data) {
    const key = r.endpoint || r.family
    if (!byEndpoint[key]) byEndpoint[key] = { endpoint: key, total: 0, n: 0 }
    byEndpoint[key].total += r.avgMs || 0
    byEndpoint[key].n++
  }
  return Object.values(byEndpoint)
    .map(e => ({ endpoint: e.endpoint, avgMs: Math.round(e.total / e.n) }))
    .sort((a, b) => b.avgMs - a.avgMs)
    .slice(0, 8)
})

function destroyChart() {
  chartInstance?.destroy()
  chartInstance = null
}

function buildErrorRate() {
  const groupBy = props.config.props?.groupBy || 'lfi'
  const byGroup = {}
  for (const r of props.data) {
    const key = String(r[groupBy] ?? 'Unknown')
    if (!key || key.toLowerCase() === 'unknown' || key === '/other') continue
    if (!byGroup[key]) byGroup[key] = { vol: 0, err: 0 }
    byGroup[key].vol += r.volume || 0
    byGroup[key].err += r.errors || 0
  }
  const labels  = Object.keys(byGroup).sort()
  const volumes = labels.map(k => byGroup[k].vol)
  const rates   = labels.map(k => byGroup[k].vol ? +((byGroup[k].err / byGroup[k].vol) * 100).toFixed(2) : 0)

  chartInstance = new Chart(canvasRef.value, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        { type: 'bar',  label: 'API Calls',       data: volumes, backgroundColor: ACCENT.navy, borderRadius: 0, maxBarThickness: 50, yAxisID: 'yVol' },
        { type: 'line', label: 'Error Rate (%)',  data: rates,   borderColor: ACCENT.gold, backgroundColor: 'rgba(179,120,25,0.08)', borderWidth: 2, pointRadius: 4, pointBackgroundColor: ACCENT.gold, pointBorderColor: '#fff', pointBorderWidth: 1, yAxisID: 'yRate', tension: 0.3, fill: false },
      ],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: true, position: 'bottom', labels: LEGEND }, tooltip: TOOLTIP },
      scales: {
        yVol:  { beginAtZero: true, grid: GRID, ticks: AXIS_TICK, title: { display: true, text: 'API Calls', ...AXIS_TITLE } },
        yRate: { beginAtZero: true, position: 'right', grid: { drawOnChartArea: false }, ticks: { ...AXIS_TICK, callback: v => `${v}%` }, title: { display: true, text: '%', ...AXIS_TITLE } },
        x: { grid: { display: false }, ticks: AXIS_LABEL },
      },
    },
  })
}

function buildErrorCodes() {
  chartInstance = new Chart(canvasRef.value, {
    type: 'doughnut',
    data: {
      labels: ['400 Bad Request', '401 Unauthorized', '403 Forbidden', '429 Rate Limit', '500 Server Error', '503 Unavailable'],
      datasets: [{
        data: [38, 22, 15, 11, 9, 5],
        backgroundColor: [ACCENT.navy, ACCENT.blue, ACCENT.teal, ACCENT.sky, ACCENT.gold, ACCENT.blueDeep],
        borderWidth: 2,
        borderColor: '#FAFAF7',
      }],
    },
    options: {
      responsive: true, maintainAspectRatio: false, cutout: '65%',
      plugins: { legend: { position: 'right', labels: { ...LEGEND, padding: 8 } }, tooltip: TOOLTIP },
    },
  })
}

function buildSuccessRate() {
  const byLfi = {}
  for (const r of props.data) {
    if (!r.lfi || r.lfi.toLowerCase() === 'unknown') continue
    if (!byLfi[r.lfi]) byLfi[r.lfi] = { count: 0, success: 0 }
    byLfi[r.lfi].count   += r.count   || 0
    byLfi[r.lfi].success += r.successCount || 0
  }
  const labels = Object.keys(byLfi).sort()
  const counts = labels.map(k => byLfi[k].count)
  const rates  = labels.map(k => byLfi[k].count ? +((byLfi[k].success / byLfi[k].count) * 100).toFixed(1) : 0)

  chartInstance = new Chart(canvasRef.value, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        { type: 'bar',  label: 'Payment Count',    data: counts, backgroundColor: ACCENT.navy, borderRadius: 0, maxBarThickness: 50, yAxisID: 'yCount' },
        { type: 'line', label: 'Success Rate (%)', data: rates,  borderColor: ACCENT.teal, borderWidth: 2, pointRadius: 4, pointBackgroundColor: ACCENT.teal, pointBorderColor: '#fff', pointBorderWidth: 1, yAxisID: 'yRate', tension: 0.3, fill: false },
      ],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: true, position: 'bottom', labels: LEGEND }, tooltip: TOOLTIP },
      scales: {
        yCount: { beginAtZero: true, grid: GRID, ticks: AXIS_TICK, title: { display: true, text: 'Count', ...AXIS_TITLE } },
        yRate:  { beginAtZero: false, min: 80, max: 100, position: 'right', grid: { drawOnChartArea: false }, ticks: { ...AXIS_TICK, callback: v => `${v}%` }, title: { display: true, text: '%', ...AXIS_TITLE } },
        x: { grid: { display: false }, ticks: AXIS_LABEL },
      },
    },
  })
}

function buildPayStatus() {
  const statusMap = {}
  for (const r of props.data) {
    const s = r.status || 'Unknown'
    statusMap[s] = (statusMap[s] || 0) + (r.count || 0)
  }
  const COLORS = { Successful: ACCENT.teal, Pending: ACCENT.gold, Failed: ACCENT.blueDeep }
  const labels = Object.keys(statusMap)

  chartInstance = new Chart(canvasRef.value, {
    type: 'doughnut',
    data: {
      labels,
      datasets: [{
        data: labels.map(k => statusMap[k]),
        backgroundColor: labels.map(k => COLORS[k] || ACCENT.mute),
        borderWidth: 2,
        borderColor: '#FAFAF7',
      }],
    },
    options: {
      responsive: true, maintainAspectRatio: false, cutout: '65%',
      plugins: { legend: { position: 'right', labels: { ...LEGEND, padding: 10 } }, tooltip: TOOLTIP },
    },
  })
}

const authRateSummary = computed(() => {
  if (props.config.component !== 'auth-rate') return ''
  const numeratorType = props.config.props?.numeratorType || 'doConfirm'
  let num = 0, den = 0
  for (const r of props.data) {
    if (r.type === 'auth') den += r.count || 0
    if (r.type === numeratorType) num += r.count || 0
  }
  const rate = den > 0 ? ((num / den) * 100).toFixed(1) : '0.0'
  const label = numeratorType === 'doConfirm' ? 'conversion' : 'cancellation'
  return `${rate}% avg ${label} rate`
})

function buildAuthRate() {
  const groupBy = props.config.props?.groupBy || 'lfi'
  const numeratorType = props.config.props?.numeratorType || 'doConfirm'
  const rateLabel = numeratorType === 'doConfirm' ? 'Conversion Rate (%)' : 'Cancellation Rate (%)'
  const lineColor = numeratorType === 'doConfirm' ? ACCENT.teal : ACCENT.gold

  const byGroup = {}
  for (const r of props.data) {
    const key = String(r[groupBy] ?? 'Unknown')
    if (!key || key.toLowerCase() === 'unknown') continue
    if (!byGroup[key]) byGroup[key] = { auth: 0, num: 0 }
    if (r.type === 'auth') byGroup[key].auth += r.count || 0
    if (r.type === numeratorType) byGroup[key].num += r.count || 0
  }
  const labels = Object.keys(byGroup).sort()
  const authCounts = labels.map(k => byGroup[k].auth)
  const rates = labels.map(k => byGroup[k].auth ? +((byGroup[k].num / byGroup[k].auth) * 100).toFixed(1) : 0)

  chartInstance = new Chart(canvasRef.value, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        { type: 'bar',  label: 'Auth Requests', data: authCounts, backgroundColor: ACCENT.blueDeep, borderRadius: 0, maxBarThickness: 50, yAxisID: 'yCount' },
        { type: 'line', label: rateLabel, data: rates, borderColor: lineColor, borderWidth: 2, pointRadius: 4, pointBackgroundColor: lineColor, pointBorderColor: '#fff', pointBorderWidth: 1, yAxisID: 'yRate', tension: 0.3, fill: false },
      ],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: true, position: 'bottom', labels: LEGEND }, tooltip: TOOLTIP },
      scales: {
        yCount: { beginAtZero: true, grid: GRID, ticks: AXIS_TICK, title: { display: true, text: 'Auth Requests', ...AXIS_TITLE } },
        yRate:  { beginAtZero: true, max: 100, position: 'right', grid: { drawOnChartArea: false }, ticks: { ...AXIS_TICK, callback: v => `${v}%` }, title: { display: true, text: '%', ...AXIS_TITLE } },
        x: { grid: { display: false }, ticks: AXIS_LABEL },
      },
    },
  })
}

function buildInlineChart() {
  if (!canvasRef.value) return
  destroyChart()
  const type = props.config.component
  if (type === 'error-rate')   buildErrorRate()
  if (type === 'error-codes')  buildErrorCodes()
  if (type === 'success-rate') buildSuccessRate()
  if (type === 'pay-status')   buildPayStatus()
  if (type === 'auth-rate')    buildAuthRate()
}

onMounted(async () => {
  if (INLINE_TYPES.includes(props.config.component)) {
    await Promise.resolve()
    buildInlineChart()
  }
})

watch(() => props.data, async () => {
  if (INLINE_TYPES.includes(props.config.component)) {
    await Promise.resolve()
    buildInlineChart()
  }
})

onBeforeUnmount(destroyChart)
</script>

<style scoped>
.chart-card {
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line);
  border-radius: 0;
  padding: 1.25rem;
  height: 100%;
  box-sizing: border-box;
}

.chart-card__title {
  font-family: var(--at-mono);
  font-size: 0.65rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--at-mute);
  margin-bottom: 0.35rem;
}

.chart-card__meta {
  font-family: var(--at-serif);
  font-size: 1.4rem;
  font-weight: 500;
  letter-spacing: -0.03em;
  color: var(--at-navy-deep);
  margin-bottom: 0.85rem;
  line-height: 1.1;
}

.chart-card__canvas {
  height: 280px;
  position: relative;
}

/* ── Ranked list ────────────────────────────────────────────────────────── */
.ranked-list {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  margin-top: 0.75rem;
}

.ranked-row {
  display: flex;
  align-items: flex-start;
  gap: 0.7rem;
}

.rank-num {
  min-width: 1.4rem;
  padding-top: 1px;
  font-family: var(--at-mono);
  font-size: 0.65rem;
  font-weight: 600;
  color: var(--at-teal);
  letter-spacing: 0.1em;
  text-align: left;
  flex-shrink: 0;
}

.rank-content { flex: 1; min-width: 0; }

.rank-top {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 0.5rem;
  margin-bottom: 5px;
}

.rank-label {
  font-family: var(--at-mono);
  font-size: 0.72rem;
  color: var(--at-navy-deep);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.rank-value {
  font-family: var(--at-serif);
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--at-teal-deep);
  white-space: nowrap;
  flex-shrink: 0;
  letter-spacing: -0.01em;
}

.rank-bar-track {
  height: 2px;
  background: var(--at-grid-line);
  overflow: hidden;
}

.rank-bar-fill {
  height: 100%;
  background: var(--at-gradient);
  transition: width 0.4s ease;
}
</style>
