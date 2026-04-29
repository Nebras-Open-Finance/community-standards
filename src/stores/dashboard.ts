// Phase 5b-iii — dashboard reactive store, ported from
// `docs/components/WebPages/stores/dashboardStore.js`.
//
// Module-level singleton: every component on `/metrics` shares the same
// `state` and computed datasets, just like the original. Uses Vue's
// reactive/ref/computed primitives directly — no Pinia introduction (matches
// the "no new state library" hard constraint in the brief).
//
// SSG-safe: the three `fetch(...)` data loads are guarded behind
// `typeof window !== 'undefined'` so the static crawl doesn't try to call
// `fetch` and the module evaluates cleanly server-side.
//
// Strict TypeScript: every shape (raw rows, transformed rows, filters, KPIs)
// is explicit. Loose `string | undefined` on raw inputs because the JSON files
// are external and may have missing keys; the transform functions normalise
// to safe defaults before anything reactive sees them.

import { reactive, computed, ref, type ComputedRef, type Ref } from 'vue'
import type { DataSource, FilterKey } from '@/data/dashboard-charts'

// ── Raw row shapes (loose — JSON inputs are external) ────────────────────
interface RawApiRow {
  date?: string
  lfinamekey?: string
  tppname?: string
  url?: string
  tppresponsecodegroup?: string
  totalapicalls?: number
  executiontime?: number
}

interface RawPaymentRow {
  date?: string
  lfinamekey?: string
  tppname?: string
  paymentconsenttype?: string
  count?: number
  amount?: number
  status?: string
}

interface RawAuthRow {
  date?: string
  lfinamekey?: string
  url?: string
  totalapicalls?: number
}

// ── Transformed row shapes (consumed by chart components) ─────────────────
export interface ApiRow {
  month:    string
  day:      string
  lfi:      string
  tpp:      string
  family:   string
  version:  string
  endpoint: string
  volume:   number
  errors:   number
  status:   'success' | 'error'
  avgMs:    number
  p50:      number
  p95:      number
  p99:      number
}

export type PaymentStatusGroup = 'Successful' | 'Failed' | 'Pending'

export interface PaymentRow {
  month:        string
  day:          string
  lfi:          string
  tpp:          string
  consentType:  string
  count:        number
  amount:       number
  successCount: number
  failCount:    number
  status:       PaymentStatusGroup
  rawStatus:    string
}

export type AuthEndpointType = 'auth' | 'doConfirm' | 'doFail' | 'other'

export interface AuthRow {
  month: string
  day:   string
  lfi:   string
  url:   string
  type:  AuthEndpointType
  count: number
}

// ── KPI summary shape ────────────────────────────────────────────────────
export interface DashboardKpis {
  totalApiCalls:  number
  totalApiErrors: number
  errorRate:      string
  avgResponseMs:  number
  totalPayments:  number
  totalAmountAed: number
  successRate:    string
  avgPaymentSize: string
}

// ── Filter options shape ─────────────────────────────────────────────────
export interface FilterOptions {
  lfis:           string[]
  tpps:           string[]
  months:         string[]
  apiFamilies:    string[]
  paymentLfis:    string[]
  paymentTpps:    string[]
  paymentMonths:  string[]
  authLfis:       string[]
  authMonths:     string[]
}

export interface DashboardFilters {
  lfi:       string | null
  tpp:       string | null
  month:     string | null
  apiFamily: string | null
}

export interface DashboardState {
  filters:          DashboardFilters
  activeSection:    string
  sidebarCollapsed: boolean
}

// ── Constants ────────────────────────────────────────────────────────────
const SUCCESS_STATUSES = new Set<string>([
  'AcceptedSettlementCompleted',
  'AcceptedCreditSettlementCompleted',
  'AcceptedWithoutPosting',
])
const FAILED_STATUSES = new Set<string>(['Rejected'])

const RT_EXCLUDED_ENDPOINTS: readonly string[] = [
  '/account-access-consents',
  '/account-access-consents/:consentId',
  '/payment-consents/:consentId',
  '/auth',
]

// ── Transforms ───────────────────────────────────────────────────────────
function transformApiRow(row: RawApiRow): ApiRow {
  const date = row.date ?? ''
  const month = date.substring(0, 7)
  const lfi = row.lfinamekey ?? 'Unknown'
  const tpp = row.tppname ?? 'Unknown'
  const url = row.url ?? ''

  const familyMatch = url.match(/open-finance\/([^/]+)(?:\/|$)/)
  const family = familyMatch?.[1] ?? 'other'

  const versionMatch = url.match(/\/(v\d+\.\d+)(\/.*)?$/)
  const version  = versionMatch?.[1] ?? 'unknown'
  const endpoint = versionMatch?.[2] ?? (family !== 'other' ? `/${family}` : (url || '/other'))

  const codeGroup = row.tppresponsecodegroup ?? '2xx'
  const isError = codeGroup !== '2xx'
  const volume  = row.totalapicalls ?? 0
  const ttlb    = row.executiontime ?? 0
  const avgMs   = volume > 0 ? Math.round(ttlb / volume) : 0

  return {
    month,
    day: date.substring(0, 10),
    lfi,
    tpp,
    family,
    version,
    endpoint,
    volume,
    errors: isError ? volume : 0,
    status: isError ? 'error' : 'success',
    avgMs,
    p50: Math.round(avgMs * 0.85),
    p95: Math.round(avgMs * 1.5),
    p99: Math.round(avgMs * 2.2),
  }
}

function transformPaymentRow(row: RawPaymentRow): PaymentRow {
  const date  = row.date ?? ''
  const month = date.substring(0, 7) || 'unknown'
  const day   = date.substring(0, 10) || 'unknown'

  const lfi         = row.lfinamekey ?? 'Unknown'
  const tpp         = row.tppname ?? 'Unknown'
  const consentType = row.paymentconsenttype ?? 'Unknown'
  const count       = row.count ?? 0
  const amount      = row.amount ?? 0
  const rawStatus   = row.status ?? ''

  let statusGroup: PaymentStatusGroup
  if (SUCCESS_STATUSES.has(rawStatus))     statusGroup = 'Successful'
  else if (FAILED_STATUSES.has(rawStatus)) statusGroup = 'Failed'
  else                                     statusGroup = 'Pending'

  const successCount = statusGroup === 'Successful' ? count : 0
  const failCount    = statusGroup === 'Failed'     ? count : 0

  return { month, day, lfi, tpp, consentType, count, amount, successCount, failCount, status: statusGroup, rawStatus }
}

function transformAuthRow(row: RawAuthRow): AuthRow {
  const date  = row.date ?? ''
  const month = date.substring(0, 7) || 'unknown'
  const day   = date.substring(0, 10) || 'unknown'
  const lfi   = row.lfinamekey ?? 'Unknown'
  const url   = row.url ?? ''
  const count = row.totalapicalls ?? 0

  let type: AuthEndpointType = 'other'
  if (url.endsWith('/doConfirm'))      type = 'doConfirm'
  else if (url.endsWith('/doFail'))    type = 'doFail'
  else if (url === '/auth')            type = 'auth'

  return { month, day, lfi, url, type, count }
}

// ── Reactive raw datasets (populated after fetch) ────────────────────────
const rawApiData:     Ref<ApiRow[]>     = ref<ApiRow[]>([])
const rawRtData:      Ref<ApiRow[]>     = ref<ApiRow[]>([])
const rawPaymentData: Ref<PaymentRow[]> = ref<PaymentRow[]>([])
const rawAuthData:    Ref<AuthRow[]>    = ref<AuthRow[]>([])

// ── Filter options (reactive — populated after fetch) ────────────────────
export const filterOptions: FilterOptions = reactive({
  lfis:          [] as string[],
  tpps:          [] as string[],
  months:        [] as string[],
  apiFamilies:   [] as string[],
  paymentLfis:   [] as string[],
  paymentTpps:   [] as string[],
  paymentMonths: [] as string[],
  authLfis:      [] as string[],
  authMonths:    [] as string[],
})

function uniqueSorted<T>(values: readonly T[]): T[] {
  return [...new Set(values)].sort()
}

function loadDataIfClient(): void {
  if (typeof window === 'undefined') return

  fetch('/api/api-log.json')
    .then(r => r.json() as Promise<unknown>)
    .then(json => {
      const arr = Array.isArray(json) ? (json as RawApiRow[]) : []
      const rows = arr.map(transformApiRow)
      rawApiData.value = rows
      rawRtData.value = rows.filter(r =>
        r.status === 'success' && !RT_EXCLUDED_ENDPOINTS.includes(r.endpoint),
      )
      filterOptions.lfis        = uniqueSorted(rows.map(r => r.lfi))
      filterOptions.tpps        = uniqueSorted(rows.map(r => r.tpp))
      filterOptions.months      = uniqueSorted(rows.map(r => r.month))
      filterOptions.apiFamilies = uniqueSorted(rows.map(r => r.family))
    })
    .catch(err => console.error('[dashboard] Failed to load api-log.json', err))

  fetch('/api/payments-log.json')
    .then(r => r.json() as Promise<unknown>)
    .then(json => {
      const arr = Array.isArray(json) ? (json as RawPaymentRow[]) : []
      const rows = arr.map(transformPaymentRow)
      rawPaymentData.value = rows
      filterOptions.paymentLfis   = uniqueSorted(rows.map(r => r.lfi).filter(v => v !== 'Unknown'))
      filterOptions.paymentTpps   = uniqueSorted(rows.map(r => r.tpp).filter(v => v !== 'Unknown'))
      filterOptions.paymentMonths = uniqueSorted(rows.map(r => r.month).filter(v => v !== 'unknown'))
    })
    .catch(err => console.error('[dashboard] Failed to load payments-log.json', err))

  fetch('/api/auth-log.json')
    .then(r => r.json() as Promise<unknown>)
    .then(json => {
      const arr = Array.isArray(json) ? (json as RawAuthRow[]) : []
      const rows = arr.map(transformAuthRow)
      rawAuthData.value = rows
      filterOptions.authLfis   = uniqueSorted(rows.map(r => r.lfi).filter(v => v !== 'Unknown'))
      filterOptions.authMonths = uniqueSorted(rows.map(r => r.month).filter(v => v !== 'unknown'))
    })
    .catch(err => console.error('[dashboard] Failed to load auth-log.json', err))
}

loadDataIfClient()

// ── Singleton reactive state ─────────────────────────────────────────────
export const state: DashboardState = reactive({
  filters: { lfi: null, tpp: null, month: null, apiFamily: null },
  activeSection: 'api-volumes',
  sidebarCollapsed: false,
})

// ── Filtered computeds (created once, shared across all callers) ─────────
export const filteredApiData: ComputedRef<ApiRow[]> = computed(() =>
  rawApiData.value.filter(r =>
    (!state.filters.lfi       || r.lfi    === state.filters.lfi)       &&
    (!state.filters.tpp       || r.tpp    === state.filters.tpp)       &&
    (!state.filters.month     || r.month  === state.filters.month)     &&
    (!state.filters.apiFamily || r.family === state.filters.apiFamily),
  ),
)

export const filteredSuccessApiData: ComputedRef<ApiRow[]> = computed(() =>
  filteredApiData.value.filter(r => r.status === 'success'),
)

export const filteredPaymentData: ComputedRef<PaymentRow[]> = computed(() =>
  rawPaymentData.value.filter(r =>
    (!state.filters.lfi   || r.lfi   === state.filters.lfi)   &&
    (!state.filters.tpp   || r.tpp   === state.filters.tpp)   &&
    (!state.filters.month || r.month === state.filters.month),
  ),
)

export const filteredSuccessPaymentData: ComputedRef<PaymentRow[]> = computed(() =>
  filteredPaymentData.value.filter(r =>
    r.status === 'Successful' && r.lfi !== 'Unknown',
  ),
)

export const filteredAllPaymentData: ComputedRef<PaymentRow[]> = computed(() =>
  filteredPaymentData.value.filter(r => r.lfi !== 'Unknown'),
)

export const filteredAuthData: ComputedRef<AuthRow[]> = computed(() =>
  rawAuthData.value.filter(r =>
    (!state.filters.lfi   || r.lfi   === state.filters.lfi)   &&
    (!state.filters.month || r.month === state.filters.month),
  ),
)

export const filteredRtData: ComputedRef<ApiRow[]> = computed(() =>
  rawRtData.value.filter(r =>
    (!state.filters.lfi       || r.lfi    === state.filters.lfi)       &&
    (!state.filters.tpp       || r.tpp    === state.filters.tpp)       &&
    (!state.filters.month     || r.month  === state.filters.month)     &&
    (!state.filters.apiFamily || r.family === state.filters.apiFamily),
  ),
)

export const kpis: ComputedRef<DashboardKpis> = computed(() => {
  // ── API metrics ─────────────────────────────────────────────────────
  const successRows = filteredApiData.value.filter(r => r.status === 'success')
  const errorRows   = filteredApiData.value.filter(r => r.status === 'error')
  const totalVol    = successRows.reduce((s, r) => s + r.volume, 0)
  const totalErr    = errorRows.reduce((s, r) => s + r.volume, 0)

  const rtRows  = filteredRtData.value
  const avgRtMs = rtRows.length
    ? Math.round(rtRows.reduce((s, r) => s + r.avgMs, 0) / rtRows.length)
    : 0

  // ── Payment metrics (successful, excluding unknown LFI) ─────────────
  const successData    = filteredSuccessPaymentData.value
  const allPaymentData = filteredPaymentData.value.filter(r => r.lfi !== 'Unknown')
  const totalPayments  = successData.reduce((s, r) => s + r.count, 0)
  const totalAmountAed = successData.reduce((s, r) => s + r.amount, 0)
  const allPaymentCount = allPaymentData.reduce((s, r) => s + r.count, 0)
  const successRate     = allPaymentCount > 0
    ? ((totalPayments / allPaymentCount) * 100).toFixed(1)
    : '0.0'
  const avgPaymentSize = totalPayments > 0
    ? (totalAmountAed / totalPayments).toFixed(2)
    : '0.00'

  return {
    totalApiCalls:  totalVol + totalErr,
    totalApiErrors: totalErr,
    errorRate: (totalVol + totalErr) > 0
      ? ((totalErr / (totalVol + totalErr)) * 100).toFixed(1)
      : '0.0',
    avgResponseMs: avgRtMs,
    totalPayments,
    totalAmountAed,
    successRate,
    avgPaymentSize,
  }
})

// ── Mutation helpers ─────────────────────────────────────────────────────
export function setFilter(key: FilterKey, value: string | null): void {
  state.filters[key] = value || null
}

export function resetFilters(): void {
  state.filters.lfi       = null
  state.filters.tpp       = null
  state.filters.month     = null
  state.filters.apiFamily = null
}

export function setSection(id: string): void {
  state.activeSection = id
}

export function toggleSidebar(): void {
  state.sidebarCollapsed = !state.sidebarCollapsed
}

// ── Data accessor (returns current .value for a given source key) ────────
//
// Returns a wide union (`ApiRow[] | PaymentRow[] | AuthRow[]`); chart
// components narrow at the call site via the `dataSource` discriminator.
export type AnyRow = ApiRow | PaymentRow | AuthRow

export function dataForSource(source: DataSource): AnyRow[] {
  switch (source) {
    case 'api':             return filteredApiData.value
    case 'api-success':     return filteredSuccessApiData.value
    case 'payment':         return filteredPaymentData.value
    case 'payment-success': return filteredSuccessPaymentData.value
    case 'payment-all':     return filteredAllPaymentData.value
    case 'rt':              return filteredRtData.value
    case 'auth':            return filteredAuthData.value
  }
}
