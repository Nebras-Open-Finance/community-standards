/**
 * dashboardStore.js
 * ─────────────────────────────────────────────────────────────────────────
 * Module-level singleton reactive store.
 *
 * API data is loaded from /api/api-log.json and transformed into the
 * internal row shape expected by the chart components.
 * Payment data is loaded from /api/payments-log.json.
 *
 * Data flow:
 *   fetch('/api/api-log.json')        → transformRow        → rawApiData / rawRtData
 *   fetch('/api/payments-log.json')   → transformPaymentRow → rawPaymentData
 *   filters (state) → filteredXData (computed) → DashboardCharts → DashboardChart
 */

import { reactive, computed, ref } from 'vue'

// ── Transform a raw JSON row into the dashboard row shape ──────────────────
function transformRow(row) {
  const month = (row.date || '').substring(0, 7) // 'YYYY-MM'
  const lfi   = row.lfinamekey || 'Unknown'
  const tpp   = row.tppname || 'Unknown'
  const url   = row.url || ''

  // Extract API family from URL: open-finance/<family>/... (trailing slash optional)
  const familyMatch = url.match(/open-finance\/([^/]+)(?:\/|$)/)
  const family = familyMatch ? familyMatch[1] : 'other'

  // Extract version and endpoint from URL: .../v1.2/<endpoint>
  const versionMatch = url.match(/\/(v\d+\.\d+)(\/.*)?$/)
  const version  = versionMatch ? versionMatch[1] : 'unknown'
  const endpoint = versionMatch?.[2] || (family !== 'other' ? `/${family}` : (url || '/other'))

  const codeGroup = row.tppresponsecodegroup || '2xx'
  const isError   = codeGroup !== '2xx'
  const volume    = row.totalapicalls || 0
  const ttlb      = row.executiontime || 0
  const avgMs     = volume > 0 ? Math.round(ttlb / volume) : 0

  return {
    month,
    day: (row.date || '').substring(0, 10), // 'YYYY-MM-DD'
    lfi,
    tpp,
    family,
    version,
    endpoint,
    volume,
    errors:  isError ? volume : 0,
    status:  isError ? 'error' : 'success',
    // Response time fields (used by RT charts)
    avgMs,
    p50: Math.round(avgMs * 0.85),
    p95: Math.round(avgMs * 1.5),
    p99: Math.round(avgMs * 2.2),
  }
}

// ── Reactive raw API / RT datasets (populated after fetch) ─────────────────
const rawApiData = ref([])
const rawRtData  = ref([])

// ── Transform a raw payment-log row into the dashboard payment shape ────────
const SUCCESS_STATUSES = new Set([
  'AcceptedSettlementCompleted',
  'AcceptedCreditSettlementCompleted',
  'AcceptedWithoutPosting',
])
const FAILED_STATUSES = new Set(['Rejected'])

function transformPaymentRow(row) {
  const date  = row.date || ''
  const month = date.substring(0, 7) || 'unknown'
  const day   = date.substring(0, 10) || 'unknown'

  const lfi              = row.lfinamekey || 'Unknown'
  const tpp              = row.tppname || 'Unknown'
  const consentType      = row.paymentconsenttype || 'Unknown'
  const count            = row.count || 0
  const amount           = row.amount || 0

  const rawStatus = row.status || ''
  let statusGroup
  if (SUCCESS_STATUSES.has(rawStatus))     statusGroup = 'Successful'
  else if (FAILED_STATUSES.has(rawStatus)) statusGroup = 'Failed'
  else                                     statusGroup = 'Pending'

  const successCount = statusGroup === 'Successful' ? count : 0
  const failCount    = statusGroup === 'Failed'     ? count : 0

  return { month, day, lfi, tpp, consentType, count, amount, successCount, failCount, status: statusGroup, rawStatus }
}

// ── Reactive raw payment dataset (populated after fetch) ────────────────────
const rawPaymentData = ref([])

// ── Transform a raw auth-log row into the dashboard auth shape ──────────────
function transformAuthRow(row) {
  const date  = row.date || ''
  const month = date.substring(0, 7) || 'unknown'
  const day   = date.substring(0, 10) || 'unknown'
  const lfi   = row.lfinamekey || 'Unknown'
  const url   = row.url || ''
  const count = row.totalapicalls || 0

  let type = 'other'
  if (url.endsWith('/doConfirm'))      type = 'doConfirm'
  else if (url.endsWith('/doFail'))    type = 'doFail'
  else if (url === '/auth')            type = 'auth'

  return { month, day, lfi, url, type, count }
}

// ── Reactive raw auth dataset (populated after fetch) ───────────────────────
const rawAuthData = ref([])

// ── Filter options (reactive so dropdowns update after data loads) ──────────
export const filterOptions = reactive({
  lfis:        [],
  tpps:        [],
  months:      [],
  apiFamilies: [],
  paymentLfis:    [],
  paymentTpps:    [],
  paymentMonths:  [],
  authLfis:       [],
  authMonths:     [],
})

// ── Endpoints excluded from response time charts ───────────────────────────
const RT_EXCLUDED_ENDPOINTS = [
  '/account-access-consents',
  '/account-access-consents/:consentId',
  '/payment-consents/:consentId',
  '/auth',
]

// ── Fetch and load real API data ───────────────────────────────────────────
if (typeof window !== 'undefined') {
  fetch('/api/api-log.json')
    .then(r => r.json())
    .then(json => {
      const rows = json.map(transformRow)
      rawApiData.value = rows
      rawRtData.value  = rows.filter(r =>
        r.status === 'success' &&
        !RT_EXCLUDED_ENDPOINTS.includes(r.endpoint)
      )
      filterOptions.lfis        = [...new Set(rows.map(r => r.lfi))].sort()
      filterOptions.tpps        = [...new Set(rows.map(r => r.tpp))].sort()
      filterOptions.months      = [...new Set(rows.map(r => r.month))].sort()
      filterOptions.apiFamilies = [...new Set(rows.map(r => r.family))].sort()
    })
    .catch(err => console.error('[dashboard] Failed to load api-log.json', err))

  fetch('/api/payments-log.json')
    .then(r => r.json())
    .then(json => {
      const rows = json.map(transformPaymentRow)
      rawPaymentData.value = rows
      filterOptions.paymentLfis   = [...new Set(rows.map(r => r.lfi))].filter(v => v !== 'Unknown').sort()
      filterOptions.paymentTpps   = [...new Set(rows.map(r => r.tpp))].filter(v => v !== 'Unknown').sort()
      filterOptions.paymentMonths = [...new Set(rows.map(r => r.month))].filter(v => v !== 'unknown').sort()
    })
    .catch(err => console.error('[dashboard] Failed to load payments-log.json', err))

  fetch('/api/auth-log.json')
    .then(r => r.json())
    .then(json => {
      const rows = json.map(transformAuthRow)
      rawAuthData.value = rows
      filterOptions.authLfis   = [...new Set(rows.map(r => r.lfi))].filter(v => v !== 'Unknown').sort()
      filterOptions.authMonths = [...new Set(rows.map(r => r.month))].filter(v => v !== 'unknown').sort()
    })
    .catch(err => console.error('[dashboard] Failed to load auth-log.json', err))
}

// ── Singleton reactive state ──────────────────────────────────────────────
export const state = reactive({
  filters: { lfi: null, tpp: null, month: null, apiFamily: null },
  activeSection: 'api-volumes',
  sidebarCollapsed: false,
})

// ── Module-level computeds (created once, shared across all callers) ──────
export const filteredApiData = computed(() =>
  rawApiData.value.filter(r =>
    (!state.filters.lfi       || r.lfi    === state.filters.lfi)       &&
    (!state.filters.tpp       || r.tpp    === state.filters.tpp)       &&
    (!state.filters.month     || r.month  === state.filters.month)     &&
    (!state.filters.apiFamily || r.family === state.filters.apiFamily)
  )
)

export const filteredSuccessApiData = computed(() =>
  filteredApiData.value.filter(r => r.status === 'success')
)

export const filteredPaymentData = computed(() =>
  rawPaymentData.value.filter(r =>
    (!state.filters.lfi   || r.lfi   === state.filters.lfi)   &&
    (!state.filters.tpp   || r.tpp   === state.filters.tpp)   &&
    (!state.filters.month || r.month === state.filters.month)
  )
)

export const filteredSuccessPaymentData = computed(() =>
  filteredPaymentData.value.filter(r =>
    r.status === 'Successful' && r.lfi !== 'Unknown'
  )
)

export const filteredAllPaymentData = computed(() =>
  filteredPaymentData.value.filter(r => r.lfi !== 'Unknown')
)

export const filteredAuthData = computed(() =>
  rawAuthData.value.filter(r =>
    (!state.filters.lfi   || r.lfi   === state.filters.lfi)   &&
    (!state.filters.month || r.month === state.filters.month)
  )
)

export const filteredRtData = computed(() =>
  rawRtData.value.filter(r =>
    (!state.filters.lfi       || r.lfi    === state.filters.lfi)       &&
    (!state.filters.tpp       || r.tpp    === state.filters.tpp)       &&
    (!state.filters.month     || r.month  === state.filters.month)     &&
    (!state.filters.apiFamily || r.family === state.filters.apiFamily)
  )
)

export const kpis = computed(() => {
  // ── API metrics ────────────────────────────────────────────────────────
  const successRows = filteredApiData.value.filter(r => r.status === 'success')
  const errorRows   = filteredApiData.value.filter(r => r.status === 'error')
  const totalVol    = successRows.reduce((s, r) => s + (r.volume || 0), 0)
  const totalErr    = errorRows.reduce((s, r) => s + (r.volume || 0), 0)

  const rtRows   = filteredRtData.value
  const avgRtMs  = rtRows.length
    ? Math.round(rtRows.reduce((s, r) => s + (r.avgMs || 0), 0) / rtRows.length)
    : 0

  // ── Payment metrics (successful payments only, excluding unknown LFI) ───
  const successData      = filteredSuccessPaymentData.value
  const allPaymentData   = filteredPaymentData.value.filter(r => r.lfi !== 'Unknown')
  const totalPayments    = successData.reduce((s, r) => s + (r.count  || 0), 0)
  const totalAmountAed   = successData.reduce((s, r) => s + (r.amount || 0), 0)
  const allPaymentCount  = allPaymentData.reduce((s, r) => s + (r.count || 0), 0)
  const successRate      = allPaymentCount > 0
    ? ((totalPayments / allPaymentCount) * 100).toFixed(1)
    : '0.0'
  const avgPaymentSize   = totalPayments > 0
    ? (totalAmountAed / totalPayments).toFixed(2)
    : '0.00'

  return {
    // API
    totalApiCalls: totalVol + totalErr,
    totalApiErrors: totalErr,
    errorRate: (totalVol + totalErr) > 0
      ? ((totalErr / (totalVol + totalErr)) * 100).toFixed(1)
      : '0.0',
    avgResponseMs: avgRtMs,
    // Payment
    totalPayments,
    totalAmountAed,
    successRate,
    avgPaymentSize,
  }
})

// ── Mutation helpers ──────────────────────────────────────────────────────
export function setFilter(key, value) {
  state.filters[key] = value || null
}

export function resetFilters() {
  state.filters.lfi       = null
  state.filters.tpp       = null
  state.filters.month     = null
  state.filters.apiFamily = null
}

export function setSection(id) {
  state.activeSection = id
}

export function toggleSidebar() {
  state.sidebarCollapsed = !state.sidebarCollapsed
}

// ── Data accessor (returns current .value for a given source key) ─────────
export function dataForSource(source) {
  if (source === 'api')             return filteredApiData.value
  if (source === 'api-success')     return filteredSuccessApiData.value
  if (source === 'payment')         return filteredPaymentData.value
  if (source === 'payment-success') return filteredSuccessPaymentData.value
  if (source === 'payment-all')     return filteredAllPaymentData.value
  if (source === 'rt')              return filteredRtData.value
  if (source === 'auth')            return filteredAuthData.value
  return []
}

// ── Composable bundle ─────────────────────────────────────────────────────
export function useDashboardStore() {
  return {
    state,
    filterOptions,
    filteredApiData,
    filteredPaymentData,
    filteredRtData,
    kpis,
    setFilter,
    resetFilters,
    setSection,
    toggleSidebar,
    dataForSource,
  }
}
