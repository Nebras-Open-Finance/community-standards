<!--
  DashboardChart.vue
  ─────────────────────────────────────────────────────────────────────────
  Config-driven chart renderer. Receives a single chart config object and
  a pre-filtered data array. Switches on config.component to render the
  correct chart type.

  Supported component values:
    'volume'       → DashApiVolumeChart
    'rt'           → DashResponseTimeChart
    'error-rate'   → inline bar+line (API calls + error rate %)
    'error-codes'  → inline doughnut (HTTP error code distribution)
    'success-rate' → inline bar+line (payment count + success rate %)
    'pay-status'   → inline doughnut (payment status split)
    'rt-ranked'    → ranked list of slowest endpoints
-->

<template>
  <!-- ── Delegated chart components ───────────────────────────────────── -->
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

  <!-- ── Inline canvas: Error Rate ────────────────────────────────────── -->
  <div v-else-if="config.component === 'error-rate'" class="chart-card">
    <div class="chart-card__title">{{ config.title }}</div>
    <div class="chart-card__meta">{{ avgErrorRate }}% avg error rate</div>
    <div class="chart-card__canvas">
      <canvas ref="canvasRef"></canvas>
    </div>
  </div>

  <!-- ── Inline canvas: Error Codes ───────────────────────────────────── -->
  <div v-else-if="config.component === 'error-codes'" class="chart-card">
    <div class="chart-card__title">{{ config.title }}</div>
    <div class="chart-card__canvas">
      <canvas ref="canvasRef"></canvas>
    </div>
  </div>

  <!-- ── Inline canvas: Success Rate ──────────────────────────────────── -->
  <div v-else-if="config.component === 'success-rate'" class="chart-card">
    <div class="chart-card__title">{{ config.title }}</div>
    <div class="chart-card__canvas">
      <canvas ref="canvasRef"></canvas>
    </div>
  </div>

  <!-- ── Inline canvas: Payment Status ────────────────────────────────── -->
  <div v-else-if="config.component === 'pay-status'" class="chart-card">
    <div class="chart-card__title">{{ config.title }}</div>
    <div class="chart-card__canvas">
      <canvas ref="canvasRef"></canvas>
    </div>
  </div>

  <!-- ── Ranked list: Slowest Endpoints ───────────────────────────────── -->
  <div v-else-if="config.component === 'rt-ranked'" class="chart-card">
    <div class="chart-card__title">{{ config.title }}</div>
    <div class="ranked-list">
      <div
        v-for="(item, idx) in slowestEndpoints"
        :key="item.endpoint"
        class="ranked-row"
      >
        <span class="rank-num">{{ idx + 1 }}</span>
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

// ── Props ────────────────────────────────────────────────────────────────
const props = defineProps({
  config: { type: Object, required: true },
  data:   { type: Array,  required: true },
})

// ── Canvas + chart instance ──────────────────────────────────────────────
const canvasRef = ref(null)
let chartInstance = null

const INLINE_TYPES = ['error-rate', 'error-codes', 'success-rate', 'pay-status']

const TOOLTIP = {
  backgroundColor: '#0C1441',
  titleColor: '#F4F8FB',
  bodyColor: '#CBD5E1',
  borderRadius: 8,
  padding: 10,
}

// ── Derived values ───────────────────────────────────────────────────────
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

// ── Chart builders ───────────────────────────────────────────────────────
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
        { type: 'bar',  label: 'API Calls',      data: volumes, backgroundColor: '#36BFD4', borderRadius: 6, maxBarThickness: 50, yAxisID: 'yVol' },
        { type: 'line', label: 'Error Rate (%)',  data: rates,   borderColor: '#EF4444', backgroundColor: 'rgba(239,68,68,0.07)', borderWidth: 2, pointRadius: 4, pointBackgroundColor: '#EF4444', yAxisID: 'yRate', tension: 0.3, fill: false },
      ],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: true, position: 'bottom', labels: { boxWidth: 12, font: { size: 11 } } }, tooltip: TOOLTIP },
      scales: {
        yVol:  { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.04)' }, title: { display: true, text: 'API Calls', font: { size: 11 } } },
        yRate: { beginAtZero: true, position: 'right', grid: { drawOnChartArea: false }, title: { display: true, text: '%', font: { size: 11 } }, ticks: { callback: v => `${v}%` } },
        x: { grid: { display: false } },
      },
    },
  })
}

function buildErrorCodes() {
  chartInstance = new Chart(canvasRef.value, {
    type: 'doughnut',
    data: {
      labels: ['400 Bad Request', '401 Unauthorized', '403 Forbidden', '429 Rate Limit', '500 Server Error', '503 Unavailable'],
      datasets: [{ data: [38, 22, 15, 11, 9, 5], backgroundColor: ['#36BFD4','#4F8EF7','#F59E0B','#F97316','#EF4444','#8B5CF6'], borderWidth: 0 }],
    },
    options: {
      responsive: true, maintainAspectRatio: false, cutout: '65%',
      plugins: { legend: { position: 'right', labels: { boxWidth: 12, font: { size: 11 }, padding: 8 } }, tooltip: TOOLTIP },
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
        { type: 'bar',  label: 'Payment Count',   data: counts, backgroundColor: '#10B981', borderRadius: 6, maxBarThickness: 50, yAxisID: 'yCount' },
        { type: 'line', label: 'Success Rate (%)', data: rates,  borderColor: '#36BFD4', borderWidth: 2, pointRadius: 4, pointBackgroundColor: '#36BFD4', yAxisID: 'yRate', tension: 0.3, fill: false },
      ],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: true, position: 'bottom', labels: { boxWidth: 12, font: { size: 11 } } }, tooltip: TOOLTIP },
      scales: {
        yCount: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.04)' }, title: { display: true, text: 'Count', font: { size: 11 } } },
        yRate:  { beginAtZero: false, min: 80, max: 100, position: 'right', grid: { drawOnChartArea: false }, title: { display: true, text: '%', font: { size: 11 } }, ticks: { callback: v => `${v}%` } },
        x: { grid: { display: false } },
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
  const COLORS = { Successful: '#10B981', Pending: '#F59E0B', Failed: '#EF4444' }
  const labels = Object.keys(statusMap)

  chartInstance = new Chart(canvasRef.value, {
    type: 'doughnut',
    data: {
      labels,
      datasets: [{ data: labels.map(k => statusMap[k]), backgroundColor: labels.map(k => COLORS[k] || '#94A3B8'), borderWidth: 0 }],
    },
    options: {
      responsive: true, maintainAspectRatio: false, cutout: '65%',
      plugins: { legend: { position: 'right', labels: { boxWidth: 12, font: { size: 11 }, padding: 10 } }, tooltip: TOOLTIP },
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
/* ── Chart card shell ───────────────────────────────────────────────────── */
.chart-card {
  background: #fff;
  border: 1px solid #E8EFF6;
  border-radius: 12px;
  padding: 1.25rem;
  height: 100%;
  box-sizing: border-box;
}

.chart-card__title {
  font-family: 'Poppins', sans-serif;
  font-size: 0.72rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: #667085;
  margin-bottom: 0.2rem;
}

.chart-card__meta {
  font-family: 'Poppins', sans-serif;
  font-size: 1.3rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  color: #0C1441;
  margin-bottom: 0.75rem;
}

.chart-card__canvas {
  height: 280px;
  position: relative;
}

/* ── Ranked list ────────────────────────────────────────────────────────── */
.ranked-list {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  margin-top: 0.75rem;
}

.ranked-row {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
}

.rank-num {
  min-width: 1.2rem;
  padding-top: 1px;
  font-family: 'Poppins', sans-serif;
  font-size: 0.65rem;
  font-weight: 700;
  color: #36BFD4;
  text-align: center;
  flex-shrink: 0;
}

.rank-content {
  flex: 1;
  min-width: 0;
}

.rank-top {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 0.5rem;
  margin-bottom: 4px;
}

.rank-label {
  font-family: 'Courier New', monospace;
  font-size: 0.74rem;
  color: #0C1441;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.rank-value {
  font-family: 'Poppins', sans-serif;
  font-size: 0.74rem;
  font-weight: 600;
  color: #36BFD4;
  white-space: nowrap;
  flex-shrink: 0;
}

.rank-bar-track {
  height: 3px;
  background: #EEF4FB;
  border-radius: 999px;
  overflow: hidden;
}

.rank-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #36BFD4 0%, #4F8EF7 100%);
  border-radius: 999px;
  transition: width 0.4s ease;
}
</style>
