// Module-level singleton — every component on `/metrics` shares the same
// `state` and computed datasets. SSG-safe: `fetch` is guarded by
// `typeof window !== 'undefined'`.

import { reactive, computed, ref, watchEffect, type ComputedRef, type Ref } from 'vue'
import {
  sectionInSector,
  firstSectionOfSector,
  type DataSource,
  type FilterKey,
  type Sector,
} from '@/data/dashboard-charts'

// Loose raw shapes — external JSON may have missing keys. The transform
// functions normalise to safe defaults before anything reactive sees them.
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

export interface DashboardKpis {
  totalApiCalls:  number
  totalApiErrors: number
  errorRate:      string
  avgResponseMs:  number
  totalPayments:  number
  totalAmountAed: number
  successRate:    string
  avgPaymentSize: string
  consentsAuthorized: number
  conversionRate:     string
  momGrowth:          string
  cancellationRate:   string
}

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

// Each filter is a list of selected values. An empty list means "all" —
// no constraint on that dimension.
export interface DashboardFilters {
  lfi:       string[]
  tpp:       string[]
  month:     string[]
  apiFamily: string[]
}

export interface DashboardState {
  filters:              DashboardFilters
  sector:               Sector
  activeSection:        string
  sidebarCollapsed:     boolean
  excludePartialMonths: boolean
}

// YYYY-MM of the current calendar month. Months matching this are still in
// progress, so the default view excludes them to avoid skewed comparisons.
const CURRENT_MONTH = new Date().toISOString().substring(0, 7)

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

const rawApiData:     Ref<ApiRow[]>     = ref<ApiRow[]>([])
const rawRtData:      Ref<ApiRow[]>     = ref<ApiRow[]>([])
const rawPaymentData: Ref<PaymentRow[]> = ref<PaymentRow[]>([])
const rawAuthData:    Ref<AuthRow[]>    = ref<AuthRow[]>([])

// LFI → directory sector ('bank' | 'insurer'), loaded at runtime from the
// build-time map (public/api/lfi-sectors.json, generated from the participants
// directory `lfi_type` flag).
const lfiSectorMap = reactive<Record<string, string>>({})

// Insurers observed in the API log: any LFI that has called the `insurance`
// API family. Banks never call it, so this both confirms directory-listed
// insurers and catches new entrants not yet reflected in the directory map.
const observedInsurerLfis = computed<Set<string>>(() => {
  const s = new Set<string>()
  for (const r of rawApiData.value) if (r.family === 'insurance') s.add(r.lfi)
  return s
})

// Resolve an LFI's sector. Insurance wins from either signal (observed
// insurance traffic or the directory flag); everything else — including keys
// we've never seen — defaults to banking.
export function sectorOf(lfi: string): Sector {
  if (observedInsurerLfis.value.has(lfi)) return 'insurance'
  if (lfiSectorMap[lfi] === 'insurer') return 'insurance'
  return 'banking'
}

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
    })
    .catch(err => console.error('[dashboard] Failed to load api-log.json', err))

  fetch('/api/payments-log.json')
    .then(r => r.json() as Promise<unknown>)
    .then(json => {
      const arr = Array.isArray(json) ? (json as RawPaymentRow[]) : []
      rawPaymentData.value = arr.map(transformPaymentRow)
    })
    .catch(err => console.error('[dashboard] Failed to load payments-log.json', err))

  fetch('/api/auth-log.json')
    .then(r => r.json() as Promise<unknown>)
    .then(json => {
      const arr = Array.isArray(json) ? (json as RawAuthRow[]) : []
      rawAuthData.value = arr.map(transformAuthRow)
    })
    .catch(err => console.error('[dashboard] Failed to load auth-log.json', err))

  // Sector map is best-effort: the family-based fallback in `sectorOf` still
  // classifies insurers from the API log if this file is missing.
  fetch('/api/lfi-sectors.json')
    .then(r => r.json() as Promise<unknown>)
    .then(json => {
      if (json && typeof json === 'object' && !Array.isArray(json)) {
        Object.assign(lfiSectorMap, json as Record<string, string>)
      }
    })
    .catch(() => { /* non-fatal */ })
}

loadDataIfClient()

export const state: DashboardState = reactive({
  filters: { lfi: [], tpp: [], month: [], apiFamily: [] },
  sector: 'banking',
  activeSection: 'api-volumes',
  sidebarCollapsed: false,
  excludePartialMonths: true,
})

// Filter option lists are scoped to the active sector so the dropdowns only
// offer LFIs/TPPs/months/families that exist within it. Recomputed whenever the
// source data, the sector map, or the selected sector changes.
watchEffect(() => {
  const sec = state.sector
  const api = rawApiData.value.filter(r => sectorOf(r.lfi) === sec)
  filterOptions.lfis        = uniqueSorted(api.map(r => r.lfi))
  filterOptions.tpps        = uniqueSorted(api.map(r => r.tpp))
  filterOptions.months      = uniqueSorted(api.map(r => r.month))
  filterOptions.apiFamilies = uniqueSorted(api.map(r => r.family))

  const pay = rawPaymentData.value.filter(r => sectorOf(r.lfi) === sec)
  filterOptions.paymentLfis   = uniqueSorted(pay.map(r => r.lfi).filter(v => v !== 'Unknown'))
  filterOptions.paymentTpps   = uniqueSorted(pay.map(r => r.tpp).filter(v => v !== 'Unknown'))
  filterOptions.paymentMonths = uniqueSorted(pay.map(r => r.month).filter(v => v !== 'unknown'))

  const auth = rawAuthData.value.filter(r => sectorOf(r.lfi) === sec)
  filterOptions.authLfis   = uniqueSorted(auth.map(r => r.lfi).filter(v => v !== 'Unknown'))
  filterOptions.authMonths = uniqueSorted(auth.map(r => r.month).filter(v => v !== 'unknown'))
})

// Skip when the user has explicitly picked one or more months — their
// selection wins over the partial-month exclusion.
function monthIsAllowed(month: string): boolean {
  if (state.filters.month.length) return state.filters.month.includes(month)
  if (state.excludePartialMonths && month >= CURRENT_MONTH) return false
  return true
}

export const filteredApiData: ComputedRef<ApiRow[]> = computed(() =>
  rawApiData.value.filter(r =>
    sectorOf(r.lfi) === state.sector                                              &&
    (!state.filters.lfi.length       || state.filters.lfi.includes(r.lfi))       &&
    (!state.filters.tpp.length       || state.filters.tpp.includes(r.tpp))       &&
    monthIsAllowed(r.month)                                                       &&
    (!state.filters.apiFamily.length || state.filters.apiFamily.includes(r.family)),
  ),
)

export const filteredSuccessApiData: ComputedRef<ApiRow[]> = computed(() =>
  filteredApiData.value.filter(r => r.status === 'success'),
)

export const filteredPaymentData: ComputedRef<PaymentRow[]> = computed(() =>
  rawPaymentData.value.filter(r =>
    sectorOf(r.lfi) === state.sector                                &&
    (!state.filters.lfi.length || state.filters.lfi.includes(r.lfi)) &&
    (!state.filters.tpp.length || state.filters.tpp.includes(r.tpp)) &&
    monthIsAllowed(r.month),
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
    sectorOf(r.lfi) === state.sector                                &&
    (!state.filters.lfi.length || state.filters.lfi.includes(r.lfi)) &&
    monthIsAllowed(r.month),
  ),
)

export const filteredRtData: ComputedRef<ApiRow[]> = computed(() =>
  rawRtData.value.filter(r =>
    sectorOf(r.lfi) === state.sector                                              &&
    (!state.filters.lfi.length       || state.filters.lfi.includes(r.lfi))       &&
    (!state.filters.tpp.length       || state.filters.tpp.includes(r.tpp))       &&
    monthIsAllowed(r.month)                                                       &&
    (!state.filters.apiFamily.length || state.filters.apiFamily.includes(r.family)),
  ),
)

export const kpis: ComputedRef<DashboardKpis> = computed(() => {
  const successRows = filteredApiData.value.filter(r => r.status === 'success')
  const errorRows   = filteredApiData.value.filter(r => r.status === 'error')
  const totalVol    = successRows.reduce((s, r) => s + r.volume, 0)
  const totalErr    = errorRows.reduce((s, r) => s + r.volume, 0)

  const rtRows  = filteredRtData.value
  const avgRtMs = rtRows.length
    ? Math.round(rtRows.reduce((s, r) => s + r.avgMs, 0) / rtRows.length)
    : 0

  // Payment metrics: successful only, excluding unknown LFI.
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

  // Auth metrics: derived from filteredAuthData by endpoint type.
  const authData       = filteredAuthData.value
  const authCount      = authData.filter(r => r.type === 'auth').reduce((s, r) => s + r.count, 0)
  const doConfirmCount = authData.filter(r => r.type === 'doConfirm').reduce((s, r) => s + r.count, 0)
  const doFailCount    = authData.filter(r => r.type === 'doFail').reduce((s, r) => s + r.count, 0)

  const conversionRate = authCount > 0
    ? ((doConfirmCount / authCount) * 100).toFixed(1)
    : '0.0'
  const cancellationRate = authCount > 0
    ? ((doFailCount / authCount) * 100).toFixed(1)
    : '0.0'

  // MoM growth in consents authorized: latest two months containing doConfirm
  // activity within the current filter scope.
  const doConfirmMonths = uniqueSorted(
    authData.filter(r => r.type === 'doConfirm' && r.month !== 'unknown').map(r => r.month),
  )
  let momGrowth = '0.0'
  if (doConfirmMonths.length >= 2) {
    const latest = doConfirmMonths[doConfirmMonths.length - 1]
    const prior  = doConfirmMonths[doConfirmMonths.length - 2]
    const latestCount = authData
      .filter(r => r.type === 'doConfirm' && r.month === latest)
      .reduce((s, r) => s + r.count, 0)
    const priorCount = authData
      .filter(r => r.type === 'doConfirm' && r.month === prior)
      .reduce((s, r) => s + r.count, 0)
    if (priorCount > 0) {
      const pct = ((latestCount - priorCount) / priorCount) * 100
      momGrowth = `${pct >= 0 ? '+' : ''}${pct.toFixed(1)}`
    }
  }

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
    consentsAuthorized: doConfirmCount,
    conversionRate,
    momGrowth,
    cancellationRate,
  }
})

// Add `value` to a filter if absent, remove it if present. Mutates in place
// so the reactive array notifies dependent computeds.
export function toggleFilter(key: FilterKey, value: string): void {
  const values = state.filters[key]
  const i = values.indexOf(value)
  if (i === -1) values.push(value)
  else          values.splice(i, 1)
}

// Clear every selected value for a single filter.
export function clearFilter(key: FilterKey): void {
  state.filters[key] = []
}

export function resetFilters(): void {
  state.filters.lfi          = []
  state.filters.tpp          = []
  state.filters.month        = []
  state.filters.apiFamily    = []
  state.excludePartialMonths = true
}

export function setSection(id: string): void {
  state.activeSection = id
}

// Switch sector. LFI/TPP selections don't carry across sectors, so clear the
// filters, and fall back to the sector's first section if the active one isn't
// available there (e.g. leaving a Payments view for Insurance).
export function setSector(sector: Sector): void {
  if (state.sector === sector) return
  state.sector = sector
  resetFilters()
  if (!sectionInSector(state.activeSection, sector)) {
    state.activeSection = firstSectionOfSector(sector)
  }
}

export function toggleSidebar(): void {
  state.sidebarCollapsed = !state.sidebarCollapsed
}

// Wide union — chart components narrow at the call site via the `dataSource`
// discriminator.
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
