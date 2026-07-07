<script setup lang="ts">
// Phase 5b-iii — chart card dispatcher, ported from
// `docs/components/WebPages/DashboardChart.vue`.
//
// Selects the right renderer based on `config.component`:
//   * `volume`        → DashApiVolumeChart (auto-imported)
//   * `rt`            → DashResponseTimeChart (auto-imported)
//   * `error-rate`    → inline bar+line: API calls + error rate %
//   * `error-codes`   → inline doughnut: error code distribution (mock data)
//   * `success-rate`  → inline bar+line: payment count + success rate %
//   * `pay-status`    → inline doughnut: payment status split
//   * `auth-rate`     → inline bar+line: auth volume + conversion %
//   * `rt-ranked`     → ranked list of slowest endpoints
//
// Chart.js is registered once at module scope. SSG-safe because the parent
// `DashboardCharts` is wrapped in <ClientOnly>.

import {
  Chart,
  BarController, BarElement,
  LineController, LineElement, PointElement,
  DoughnutController, ArcElement,
  CategoryScale, LinearScale,
  Tooltip, Legend,
  type ChartConfiguration,
  type TooltipItem,
} from 'chart.js'
import type { ChartConfig } from '@/data/dashboard-charts'
import { state } from '@/stores/dashboard'
import type { AnyRow, ApiRow, PaymentRow, AuthRow } from '@/stores/dashboard'
import { chartTokens, onThemeChange } from '@/composables/useChartTheme'

Chart.register(
  BarController, BarElement,
  LineController, LineElement, PointElement,
  DoughnutController, ArcElement,
  CategoryScale, LinearScale,
  Tooltip, Legend,
)

interface Props {
  config: ChartConfig
  data:   readonly AnyRow[]
}
const props = defineProps<Props>()

const canvasRef = ref<HTMLCanvasElement | null>(null)
let chartInstance: Chart | null = null

const INLINE_TYPES: readonly ChartConfig['component'][] = [
  'error-rate', 'error-codes', 'success-rate', 'pay-status', 'pay-size-dist', 'auth-rate',
]

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
} as const

// Categorical palette for per-LFI stacked series — matches DashApiVolumeChart
// so an LFI reads with the same colour language across the dashboard.
const PALETTE: readonly string[] = [
  '#00277F', '#00C2A9', '#008BE4', '#B37819',
  '#0043A6', '#00A2FB', '#008B78', '#5F6A8F',
]

// Theme-aware chart styling — values are looked up at chart-build time
// (and on every theme toggle) so axis ticks / grid / legend pick up the
// dark palette.
function buildStyle() {
  const t = chartTokens()
  return {
    TOOLTIP: {
      backgroundColor: t.tooltipBg,
      titleColor: t.tooltipTitle,
      bodyColor: t.tooltipBody,
      borderRadius: 0,
      padding: 10,
      titleFont: { family: 'IBM Plex Mono, monospace', size: 10, weight: 500 },
      bodyFont:  { family: 'IBM Plex Mono, monospace', size: 10 },
    },
    AXIS_TICK:  { color: t.axisTick,  font: { family: 'Poppins, sans-serif', size: 10 } },
    AXIS_LABEL: { color: t.axisLabel, font: { family: 'Poppins, sans-serif', size: 10 } },
    AXIS_TITLE: { font: { family: 'IBM Plex Mono, monospace', size: 10, weight: 500 }, color: t.axisTitle },
    GRID:       { color: t.grid },
    LEGEND:     { boxWidth: 10, boxHeight: 10, font: { family: 'Poppins, sans-serif', size: 11 }, color: t.legend },
    POINT_BORDER: t.pointBorder,
    DOUGHNUT_BORDER: t.pointBorder,
  }
}

// Tooltip row for the bar+line combo charts: pads the dataset label to a
// fixed width so the bar's count and the line's % align in a column.
function comboTooltipLabel(ctx: TooltipItem<'bar' | 'line'>): string {
  const width = Math.max(
    ...ctx.chart.data.datasets.map(d => String(d.label ?? '').length),
  )
  const name = String(ctx.dataset.label ?? '').padEnd(width)
  const isRate = ctx.dataset.yAxisID === 'yRate'
  const value = isRate
    ? `${ctx.parsed.y}%`
    : Number(ctx.parsed.y).toLocaleString()
  return `${name}   ${value}`
}

// Show the tooltip whenever the cursor is anywhere within a column, not only
// when it's exactly over a bar or point. Used by the bar+line combo charts.
const INTERACTION = { mode: 'index', intersect: false } as const

// ── Type-narrowing accessors (chart configs map data shape to component) ──
function asApiRow(r: AnyRow): ApiRow { return r as ApiRow }
function asPaymentRow(r: AnyRow): PaymentRow { return r as PaymentRow }
function asAuthRow(r: AnyRow): AuthRow { return r as AuthRow }
function readField(row: AnyRow, key: string): unknown {
  return (row as unknown as Record<string, unknown>)[key]
}

// ── Computed summaries ───────────────────────────────────────────────────
const avgErrorRate = computed<string>(() => {
  if (props.config.component !== 'error-rate') return '0.00'
  let vol = 0
  let err = 0
  for (const row of props.data) {
    const r = asApiRow(row)
    if (r.status === 'error') err += r.volume
    else vol += r.volume
  }
  return (vol + err) > 0 ? ((err / (vol + err)) * 100).toFixed(2) : '0.00'
})

interface RankedEndpoint { endpoint: string; avgMs: number }

const slowestEndpoints = computed<RankedEndpoint[]>(() => {
  if (props.config.component !== 'rt-ranked') return []
  const byEndpoint: Record<string, { total: number; n: number }> = {}
  for (const row of props.data) {
    const r = asApiRow(row)
    const key = r.endpoint || r.family
    const slot = byEndpoint[key] ?? (byEndpoint[key] = { total: 0, n: 0 })
    slot.total += r.avgMs
    slot.n += 1
  }
  return Object.entries(byEndpoint)
    .map(([endpoint, { total, n }]) => ({ endpoint, avgMs: Math.round(total / n) }))
    .sort((a, b) => b.avgMs - a.avgMs)
    .slice(0, 8)
})

const topRankedAvgMs = computed<number>(() => slowestEndpoints.value[0]?.avgMs ?? 1)

const authRateSummary = computed<string>(() => {
  if (props.config.component !== 'auth-rate') return ''
  const numeratorType = props.config.props?.numeratorType ?? 'doConfirm'
  let auth = 0
  let confirm = 0
  let fail = 0
  for (const row of props.data) {
    const r = asAuthRow(row)
    if (r.type === 'auth')      auth    += r.count
    if (r.type === 'doConfirm') confirm += r.count
    if (r.type === 'doFail')    fail    += r.count
  }
  // Drop-off is the residual: auths that neither confirmed nor explicitly failed.
  const num = numeratorType === 'doConfirm' ? confirm
            : numeratorType === 'doFail'    ? fail
            : Math.max(0, auth - confirm - fail)
  const rate = auth > 0 ? ((num / auth) * 100).toFixed(1) : '0.0'
  const label = numeratorType === 'doConfirm' ? 'conversion'
              : numeratorType === 'doFail'    ? 'cancellation'
              : 'drop-off'
  return `${rate}% avg ${label} rate`
})

// Payment size bands (AED), keyed off each aggregate row's mean ticket size
// (amount / count). Edges are low-inclusive / high-exclusive (a 100 lands in
// 100 – 1K). The 50K+ band captures anything above 50K but is only drawn when
// such payments exist, so the axis stays clean when there are none.
const SIZE_BANDS: readonly { label: string; max: number }[] = [
  { label: '0 – 100',   max: 100 },
  { label: '100 – 1K',  max: 1_000 },
  { label: '1K – 5K',   max: 5_000 },
  { label: '5K – 10K',  max: 10_000 },
  { label: '10K – 50K', max: 50_000 },
  { label: '50K+',      max: Infinity },
]

const paySizeSummary = computed<string>(() => {
  if (props.config.component !== 'pay-size-dist') return ''
  let payments = 0
  for (const row of props.data) payments += asPaymentRow(row).count
  return `${payments.toLocaleString()} payments`
})

// ── Inline chart builders ────────────────────────────────────────────────
function destroyChart(): void {
  chartInstance?.destroy()
  chartInstance = null
}

function buildErrorRate(): void {
  const groupBy = props.config.props?.groupBy ?? 'lfi'
  const byGroup: Record<string, { vol: number; err: number }> = {}
  for (const row of props.data) {
    const r = asApiRow(row)
    const key = String(readField(r, groupBy) ?? 'Unknown')
    if (!key || key.toLowerCase() === 'unknown' || key === '/other') continue
    const slot = byGroup[key] ?? (byGroup[key] = { vol: 0, err: 0 })
    slot.vol += r.volume
    slot.err += r.errors
  }
  const labels  = Object.keys(byGroup).sort()
  const volumes = labels.map(k => byGroup[k]?.vol ?? 0)
  const rates   = labels.map(k => {
    const slot = byGroup[k]
    if (!slot || !slot.vol) return 0
    return Number(((slot.err / slot.vol) * 100).toFixed(2))
  })

  const s = buildStyle()
  const config: ChartConfiguration = {
    type: 'bar',
    data: {
      labels,
      datasets: [
        { type: 'bar',  label: 'API Calls',      data: volumes, backgroundColor: ACCENT.navy, borderRadius: 0, maxBarThickness: 50, yAxisID: 'yVol' },
        { type: 'line', label: 'Error Rate (%)', data: rates,   borderColor: ACCENT.gold, backgroundColor: 'rgba(179,120,25,0.08)', borderWidth: 2, pointRadius: 4, pointBackgroundColor: ACCENT.gold, pointBorderColor: s.POINT_BORDER, pointBorderWidth: 1, yAxisID: 'yRate', tension: 0.3, fill: false },
      ],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      interaction: INTERACTION,
      plugins: {
        legend: { display: true, position: 'bottom', labels: s.LEGEND },
        tooltip: { ...s.TOOLTIP, callbacks: { label: comboTooltipLabel } },
      },
      scales: {
        yVol:  { beginAtZero: true, grid: s.GRID, ticks: s.AXIS_TICK, title: { display: true, text: 'API Calls', ...s.AXIS_TITLE } },
        yRate: { beginAtZero: true, position: 'right', grid: { drawOnChartArea: false }, ticks: { ...s.AXIS_TICK, callback: (v) => `${v}%` }, title: { display: true, text: '%', ...s.AXIS_TITLE } },
        x: { grid: { display: false }, ticks: s.AXIS_LABEL },
      },
    },
  }
  chartInstance = new Chart(canvasRef.value!, config)
}

function buildErrorCodes(): void {
  const s = buildStyle()
  const config: ChartConfiguration<'doughnut'> = {
    type: 'doughnut',
    data: {
      labels: ['400 Bad Request', '401 Unauthorized', '403 Forbidden', '429 Rate Limit', '500 Server Error', '503 Unavailable'],
      datasets: [{
        data: [38, 22, 15, 11, 9, 5],
        backgroundColor: [ACCENT.navy, ACCENT.blue, ACCENT.teal, ACCENT.sky, ACCENT.gold, ACCENT.blueDeep],
        borderWidth: 2,
        borderColor: s.DOUGHNUT_BORDER,
      }],
    },
    options: {
      responsive: true, maintainAspectRatio: false, cutout: '65%',
      plugins: { legend: { position: 'right', labels: { ...s.LEGEND, padding: 8 } }, tooltip: s.TOOLTIP },
    },
  }
  chartInstance = new Chart(canvasRef.value!, config)
}

function buildSuccessRate(): void {
  const byLfi: Record<string, { count: number; success: number }> = {}
  for (const row of props.data) {
    const r = asPaymentRow(row)
    if (!r.lfi || r.lfi.toLowerCase() === 'unknown') continue
    const slot = byLfi[r.lfi] ?? (byLfi[r.lfi] = { count: 0, success: 0 })
    slot.count   += r.count
    slot.success += r.successCount
  }
  const labels = Object.keys(byLfi).sort()
  const counts = labels.map(k => byLfi[k]?.count ?? 0)
  const rates  = labels.map(k => {
    const slot = byLfi[k]
    if (!slot || !slot.count) return 0
    return Number(((slot.success / slot.count) * 100).toFixed(1))
  })

  const s = buildStyle()
  const config: ChartConfiguration = {
    type: 'bar',
    data: {
      labels,
      datasets: [
        { type: 'bar',  label: 'Payment Count',    data: counts, backgroundColor: ACCENT.navy, borderRadius: 0, maxBarThickness: 50, yAxisID: 'yCount' },
        { type: 'line', label: 'Success Rate (%)', data: rates,  borderColor: ACCENT.teal, borderWidth: 2, pointRadius: 4, pointBackgroundColor: ACCENT.teal, pointBorderColor: s.POINT_BORDER, pointBorderWidth: 1, yAxisID: 'yRate', tension: 0.3, fill: false },
      ],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      interaction: INTERACTION,
      plugins: {
        legend: { display: true, position: 'bottom', labels: s.LEGEND },
        tooltip: { ...s.TOOLTIP, callbacks: { label: comboTooltipLabel } },
      },
      scales: {
        yCount: { beginAtZero: true, grid: s.GRID, ticks: s.AXIS_TICK, title: { display: true, text: 'Count', ...s.AXIS_TITLE } },
        yRate:  { beginAtZero: false, min: 80, max: 100, position: 'right', grid: { drawOnChartArea: false }, ticks: { ...s.AXIS_TICK, callback: (v) => `${v}%` }, title: { display: true, text: '%', ...s.AXIS_TITLE } },
        x: { grid: { display: false }, ticks: s.AXIS_LABEL },
      },
    },
  }
  chartInstance = new Chart(canvasRef.value!, config)
}

function buildPayStatus(): void {
  const statusMap: Record<string, number> = {}
  for (const row of props.data) {
    const r = asPaymentRow(row)
    const status = r.status || 'Unknown'
    statusMap[status] = (statusMap[status] ?? 0) + r.count
  }
  const COLORS: Record<string, string> = {
    Successful: ACCENT.teal,
    Pending:    ACCENT.gold,
    Failed:     ACCENT.blueDeep,
  }
  const labels = Object.keys(statusMap)

  const s = buildStyle()
  const config: ChartConfiguration<'doughnut'> = {
    type: 'doughnut',
    data: {
      labels,
      datasets: [{
        data: labels.map(k => statusMap[k] ?? 0),
        backgroundColor: labels.map(k => COLORS[k] ?? ACCENT.mute),
        borderWidth: 2,
        borderColor: s.DOUGHNUT_BORDER,
      }],
    },
    options: {
      responsive: true, maintainAspectRatio: false, cutout: '65%',
      plugins: { legend: { position: 'right', labels: { ...s.LEGEND, padding: 10 } }, tooltip: s.TOOLTIP },
    },
  }
  chartInstance = new Chart(canvasRef.value!, config)
}

function buildPaySizeDist(): void {
  // Each row is an aggregate of `count` payments totalling `amount` AED, so the
  // true per-payment spread is unknown — we bucket every row by its mean ticket
  // size (amount / count) and add its count to that band, per LFI. An
  // approximation of the underlying distribution, weighted by payment count.
  //
  // Stacking rule: with exactly one LFI selected (filter 2) a single series is
  // enough, so we drop the stack. With no LFI selected, or several, we stack one
  // series per LFI so the size mix per bank is visible.
  const stackByLfi = state.filters.lfi.length !== 1

  // bandsByLfi[lfi][bandIndex] = payment count
  const bandsByLfi: Record<string, number[]> = {}
  for (const row of props.data) {
    const r = asPaymentRow(row)
    if (r.count <= 0 || r.amount <= 0) continue
    if (!r.lfi || r.lfi.toLowerCase() === 'unknown') continue
    const mean = r.amount / r.count
    const found = SIZE_BANDS.findIndex(b => mean < b.max)
    const band = found === -1 ? SIZE_BANDS.length - 1 : found
    const arr = bandsByLfi[r.lfi] ?? (bandsByLfi[r.lfi] = SIZE_BANDS.map(() => 0))
    arr[band] = (arr[band] ?? 0) + r.count
  }

  // Column set: the first five bands always show; the trailing 50K+ band appears
  // only when a payment lands there, so the axis stays clean when there are none.
  const bandTotals = SIZE_BANDS.map((_, i) =>
    Object.values(bandsByLfi).reduce((sum, arr) => sum + (arr[i] ?? 0), 0),
  )
  const ALWAYS_SHOWN = SIZE_BANDS.length - 1
  const shownBands = SIZE_BANDS
    .map((_, i) => i)
    .filter(i => i < ALWAYS_SHOWN || (bandTotals[i] ?? 0) > 0)
  const labels = shownBands.map(i => SIZE_BANDS[i]!.label)

  const lfis = Object.keys(bandsByLfi).sort()

  const datasets = (stackByLfi && lfis.length > 1)
    ? lfis.map((lfi, i) => ({
        label: lfi,
        data: shownBands.map(bi => bandsByLfi[lfi]?.[bi] ?? 0),
        backgroundColor: PALETTE[i % PALETTE.length],
        borderColor: PALETTE[i % PALETTE.length],
        borderWidth: 0,
        borderRadius: 0,
        maxBarThickness: 80,
        stack: 'stack',
      }))
    : [{
        label: 'Payments',
        data: shownBands.map(i => bandTotals[i] ?? 0),
        backgroundColor: ACCENT.navy,
        borderWidth: 0,
        borderRadius: 0,
        maxBarThickness: 80,
      }]

  const stacked = datasets.length > 1

  const s = buildStyle()
  const config: ChartConfiguration<'bar'> = {
    type: 'bar',
    data: { labels, datasets },
    options: {
      responsive: true, maintainAspectRatio: false,
      interaction: INTERACTION,
      plugins: {
        legend: { display: stacked, position: 'bottom', labels: s.LEGEND },
        tooltip: {
          ...s.TOOLTIP,
          callbacks: {
            label: (ctx) => stacked
              ? `  ${String(ctx.dataset.label ?? '')}   ${Number(ctx.parsed.y).toLocaleString()}`
              : `  ${Number(ctx.parsed.y).toLocaleString()} payments`,
          },
        },
      },
      scales: {
        y: { stacked, beginAtZero: true, grid: s.GRID, ticks: s.AXIS_TICK, title: { display: true, text: 'Payment Count', ...s.AXIS_TITLE } },
        x: { stacked, grid: { display: false }, ticks: s.AXIS_LABEL, title: { display: true, text: 'Mean Ticket Size (AED)', ...s.AXIS_TITLE } },
      },
    },
  }
  chartInstance = new Chart(canvasRef.value!, config)
}

function buildAuthRate(): void {
  const groupBy = props.config.props?.groupBy ?? 'lfi'
  const numeratorType = props.config.props?.numeratorType ?? 'doConfirm'
  const rateLabel = numeratorType === 'doConfirm' ? 'Conversion Rate (%)'
                  : numeratorType === 'doFail'    ? 'Cancellation Rate (%)'
                  : 'Drop-off Rate (%)'
  const lineColor = numeratorType === 'doConfirm' ? ACCENT.teal
                  : numeratorType === 'doFail'    ? ACCENT.gold
                  : ACCENT.navy

  const byGroup: Record<string, { auth: number; confirm: number; fail: number }> = {}
  for (const row of props.data) {
    const r = asAuthRow(row)
    const key = String(readField(r, groupBy) ?? 'Unknown')
    if (!key || key.toLowerCase() === 'unknown') continue
    const slot = byGroup[key] ?? (byGroup[key] = { auth: 0, confirm: 0, fail: 0 })
    if (r.type === 'auth')      slot.auth    += r.count
    if (r.type === 'doConfirm') slot.confirm += r.count
    if (r.type === 'doFail')    slot.fail    += r.count
  }
  // Drop-off is the residual: auths that neither confirmed nor explicitly failed.
  const numerator = (slot: { auth: number; confirm: number; fail: number }): number =>
    numeratorType === 'doConfirm' ? slot.confirm
    : numeratorType === 'doFail'  ? slot.fail
    : Math.max(0, slot.auth - slot.confirm - slot.fail)
  const labels = Object.keys(byGroup).sort()
  const authCounts = labels.map(k => byGroup[k]?.auth ?? 0)
  const rates = labels.map(k => {
    const slot = byGroup[k]
    if (!slot || !slot.auth) return 0
    return Number(((numerator(slot) / slot.auth) * 100).toFixed(1))
  })

  const s = buildStyle()
  const config: ChartConfiguration = {
    type: 'bar',
    data: {
      labels,
      datasets: [
        { type: 'bar',  label: 'Auth Requests', data: authCounts, backgroundColor: ACCENT.blueDeep, borderRadius: 0, maxBarThickness: 50, yAxisID: 'yCount' },
        { type: 'line', label: rateLabel, data: rates, borderColor: lineColor, borderWidth: 2, pointRadius: 4, pointBackgroundColor: lineColor, pointBorderColor: s.POINT_BORDER, pointBorderWidth: 1, yAxisID: 'yRate', tension: 0.3, fill: false },
      ],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      interaction: INTERACTION,
      plugins: {
        legend: { display: true, position: 'bottom', labels: s.LEGEND },
        tooltip: { ...s.TOOLTIP, callbacks: { label: comboTooltipLabel } },
      },
      scales: {
        yCount: { beginAtZero: true, grid: s.GRID, ticks: s.AXIS_TICK, title: { display: true, text: 'Auth Requests', ...s.AXIS_TITLE } },
        yRate:  { beginAtZero: true, max: 100, position: 'right', grid: { drawOnChartArea: false }, ticks: { ...s.AXIS_TICK, callback: (v) => `${v}%` }, title: { display: true, text: '%', ...s.AXIS_TITLE } },
        x: { grid: { display: false }, ticks: s.AXIS_LABEL },
      },
    },
  }
  chartInstance = new Chart(canvasRef.value!, config)
}

function buildInlineChart(): void {
  if (!canvasRef.value) return
  destroyChart()
  switch (props.config.component) {
    case 'error-rate':   buildErrorRate(); break
    case 'error-codes':  buildErrorCodes(); break
    case 'success-rate': buildSuccessRate(); break
    case 'pay-status':   buildPayStatus(); break
    case 'pay-size-dist': buildPaySizeDist(); break
    case 'auth-rate':    buildAuthRate(); break
    default: /* not an inline type */ break
  }
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

// Rebuild on theme toggle so axis/grid/legend colours pick up the new palette.
onThemeChange(() => {
  if (INLINE_TYPES.includes(props.config.component)) {
    buildInlineChart()
  }
})

onBeforeUnmount(destroyChart)
</script>

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
      <canvas ref="canvasRef" />
    </div>
  </div>

  <div v-else-if="config.component === 'error-codes'" class="chart-card">
    <div class="chart-card__title">{{ config.title }}</div>
    <div class="chart-card__canvas">
      <canvas ref="canvasRef" />
    </div>
  </div>

  <div v-else-if="config.component === 'success-rate'" class="chart-card">
    <div class="chart-card__title">{{ config.title }}</div>
    <div class="chart-card__canvas">
      <canvas ref="canvasRef" />
    </div>
  </div>

  <div v-else-if="config.component === 'pay-status'" class="chart-card">
    <div class="chart-card__title">{{ config.title }}</div>
    <div class="chart-card__canvas">
      <canvas ref="canvasRef" />
    </div>
  </div>

  <div v-else-if="config.component === 'pay-size-dist'" class="chart-card">
    <div class="chart-card__title">{{ config.title }}</div>
    <div class="chart-card__meta">{{ paySizeSummary }}</div>
    <div class="chart-card__canvas">
      <canvas ref="canvasRef" />
    </div>
  </div>

  <div v-else-if="config.component === 'auth-rate'" class="chart-card">
    <div class="chart-card__title">{{ config.title }}</div>
    <div class="chart-card__meta">{{ authRateSummary }}</div>
    <div class="chart-card__canvas">
      <canvas ref="canvasRef" />
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
              :style="{ width: `${(item.avgMs / topRankedAvgMs) * 100}%` }"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

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

/* ── Ranked list ───────────────────────────────────────────────────────── */
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
