<route lang="yaml">
meta:
  title: Home
  isIndex: true
</route>

<script setup lang="ts">
// Live data fetches all soft-fail; missing files render as em-dashes.

import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

import { articles, ARTICLE_KIND_LABELS } from '@/data/home-articles'
import type { ArticleKind, HomeArticle } from '@/data/home-articles'
import { useSearchModal } from '@/composables/useSearchModal'

const { selectedVersion } = useSelectedVersion()
const { open: openSearch } = useSearchModal()

const kindLabels: Record<ArticleKind, string> = ARTICLE_KIND_LABELS

// ── Theme accents ─────────────────────────────────────────────────────────
const ACCENT = {
  teal:     '#00C2A9',
  gold:     '#B37819',
  navy:     '#00277F',
  navyDeep: '#001738',
  blueDeep: '#0043A6',
  sky:      '#00A2FB',
} as const

// ── Auth-log "is this consent authorised / auth-started?" helpers ─────────
const SUCCESS_PAYMENT_STATUSES = new Set<string>([
  'AcceptedSettlementCompleted',
  'AcceptedCreditSettlementCompleted',
  'AcceptedWithoutPosting',
])

// doConfirm's success response is a 3xx redirect back to the Hub; 2xx is
// kept for resilience.
const CONSENT_AUTH_URL = '/auth/:interactionId/doConfirm'
const CONSENT_SUCCESS_CODES = new Set<string>(['2xx', '3xx'])
const AUTH_START_URL = '/auth'

// ── Log-row shapes (loose by design — these JSON files are external) ─────
interface TrustFrameworkOrg {
  id?: string
  type?: string
  name?: string
  legalName?: string
  isProduction?: boolean
  lfiGoLiveDate?: string
  tppGoLiveDate?: string
}

interface ApiLogRow {
  date?: string
  totalapicalls?: number
  tppresponsecodegroup?: string
  lfinamekey?: string
  tppname?: string
}

interface PaymentLogRow {
  date?: string
  amount?: number
  status?: string
  lfinamekey?: string
}

interface AuthLogRow {
  date?: string
  totalapicalls?: number
  url?: string
  tppresponsecodegroup?: string
}

const tfData      = ref<TrustFrameworkOrg[]>([])
const apiData     = ref<ApiLogRow[]>([])
const paymentData = ref<PaymentLogRow[]>([])
const authData    = ref<AuthLogRow[]>([])

onMounted(async () => {
  const [tf, api, payments, auth] = await Promise.all([
    axios.get<unknown>('/api/trust-framework.json').catch(() => ({ data: [] as unknown })),
    loadApiLog().catch(() => [] as unknown),
    fetch('/api/payments-log.json').then(r => r.json() as Promise<unknown>).catch(() => [] as unknown),
    fetch('/api/auth-log.json').then(r => r.json() as Promise<unknown>).catch(() => [] as unknown),
  ])
  tfData.value = Array.isArray(tf.data) ? (tf.data as TrustFrameworkOrg[]) : []
  apiData.value = Array.isArray(api) ? (api as ApiLogRow[]) : []
  paymentData.value = Array.isArray(payments) ? (payments as PaymentLogRow[]) : []
  authData.value = Array.isArray(auth) ? (auth as AuthLogRow[]) : []
})

function isConsentAuthorised(r: AuthLogRow): boolean {
  return r.url === CONSENT_AUTH_URL
    && typeof r.tppresponsecodegroup === 'string'
    && CONSENT_SUCCESS_CODES.has(r.tppresponsecodegroup)
}

function isAuthStart(r: AuthLogRow): boolean {
  return r.url === AUTH_START_URL && r.tppresponsecodegroup === '2xx'
}

// ── Monthly aggregation helpers ──────────────────────────────────────────
function monthlyTotals<T>(
  rows: readonly T[],
  valueFn: (r: T) => number | undefined,
  dateFn: (r: T) => string | undefined,
): Record<string, number> {
  const byMonth: Record<string, number> = {}
  for (const r of rows) {
    const date = dateFn(r) ?? ''
    const m = date.substring(0, 7)
    if (!m) continue
    byMonth[m] = (byMonth[m] ?? 0) + (valueFn(r) ?? 0)
  }
  return byMonth
}

function monthlySeries<T>(
  rows: readonly T[],
  valueFn: (r: T) => number | undefined,
  dateFn: (r: T) => string | undefined,
): number[] {
  const byMonth = monthlyTotals(rows, valueFn, dateFn)
  return Object.keys(byMonth)
    .sort()
    .map(k => byMonth[k] ?? 0)
}

interface MonthlyWithLabels {
  labels: string[]
  series: number[]
}

const MONTH_SHORT: readonly string[] = [
  'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
  'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC',
]

function monthLabel(m: string | undefined): string {
  if (!m) return ''
  const parts = m.split('-')
  const y = parts[0] ?? ''
  const mm = parts[1] ?? ''
  const idx = parseInt(mm, 10) - 1
  return `${MONTH_SHORT[idx] ?? mm} ${y.slice(2)}`
}

// Thin axis labels to at most N so they fit without collision.
function thinLabels(labels: readonly string[], max = 6): string[] {
  if (labels.length <= max) return labels.map(monthLabel)
  const step = (labels.length - 1) / (max - 1)
  return Array.from({ length: max }, (_, i) => monthLabel(labels[Math.round(i * step)]))
}

// Charts plot only the last few *complete* months. Headline stat values keep
// the full amount — only the plotted line and the growth % are windowed.
const CHART_MONTHS = 4

// The in-progress calendar month (e.g. a few days into June) has partial
// totals that would make a chart line dive at the end. Exclude it from charts
// and growth maths.
function partialMonth(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}

// Monthly {labels, series} with the in-progress current month dropped.
function completeMonthly<T>(
  rows: readonly T[],
  valueFn: (r: T) => number | undefined,
  dateFn: (r: T) => string | undefined,
): MonthlyWithLabels {
  const byMonth = monthlyTotals(rows, valueFn, dateFn)
  const partial = partialMonth()
  const keys = Object.keys(byMonth).sort().filter(k => k !== partial)
  return { labels: keys, series: keys.map(k => byMonth[k] ?? 0) }
}

// Trailing N entries — the window the chart line plots.
function lastMonths<T>(arr: readonly T[], n = CHART_MONTHS): T[] {
  return arr.length <= n ? arr.slice() : arr.slice(arr.length - n)
}

// Average monthly growth: total growth from the first month to the last full
// month, spread across the months it covers (rather than raw month-over-month).
function avgMonthlyPct(series: readonly number[]): number | null {
  if (series.length < 2) return null
  const first = series[0] ?? 0
  const last = series[series.length - 1] ?? 0
  if (first <= 0) return null
  return Math.round(((last / first - 1) * 100) / series.length)
}

function compact(n: number | null | undefined): string {
  if (n == null) return '—'
  if (n >= 1e9) return (n / 1e9).toFixed(1) + 'B'
  if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M'
  if (n >= 1e3) return (n / 1e3).toFixed(1) + 'K'
  return String(n)
}

// Orgs are pre-filtered (active only) and pre-deduped (one entry per id) by
// the upstream pull. An LFI with a tppGoLiveDate is counted as *both* an LFI
// and a TPP.
function lfiOrgs(orgs: readonly TrustFrameworkOrg[]): TrustFrameworkOrg[] {
  return orgs.filter(o => o.type === 'LFI')
}

function tppOrgs(orgs: readonly TrustFrameworkOrg[]): TrustFrameworkOrg[] {
  return orgs.filter(o => o.type === 'TPP' || !!o.tppGoLiveDate)
}

function pad2(n: number): string {
  return String(n).padStart(2, '0')
}

// The API log's `tppname` is a free-text caller name — it also carries LFIs
// that call APIs without holding a TPP registration. Map it back to the
// directory (by legal name or short name, case-insensitively) so "active
// TPPs" can never exceed the number of registered TPPs, and so an org logged
// under both of its names is still counted once.
function tppIdsByName(orgs: readonly TrustFrameworkOrg[]): Map<string, string> {
  const byName = new Map<string, string>()
  for (const o of tppOrgs(orgs)) {
    const id = o.id ?? o.legalName ?? o.name ?? ''
    if (!id) continue
    if (o.legalName) byName.set(o.legalName.toUpperCase(), id)
    if (o.name) byName.set(o.name.toUpperCase(), id)
  }
  return byName
}

// ── Last-updated label (max date across the ticker's data sources) ───────
const lastUpdatedLabel = computed<string>(() => {
  let max = ''
  const sources: readonly { date?: string }[][] = [apiData.value, paymentData.value, authData.value]
  for (const rows of sources) {
    for (const r of rows) {
      if (r.date && r.date > max) max = r.date
    }
  }
  if (!max) return '—'
  const parts = max.split('-')
  const y = parts[0] ?? ''
  const m = parts[1] ?? ''
  const d = parts[2] ?? ''
  const idx = parseInt(m, 10) - 1
  return `${parseInt(d, 10)} ${MONTH_SHORT[idx] ?? m} ${y}`
})

// ── Live ticker — volume rows (sparkline) + participant rows (counts) ────
interface TickerCell {
  label: string
  value: string
  delta: string
  color: string
  series: number[]
}

const tickerCells = computed<TickerCell[]>(() => {
  // Totals keep the full amount (incl. the in-progress month); the sparkline
  // and growth % use only complete months.
  const apiTotal      = monthlySeries(apiData.value, r => r.totalapicalls, r => r.date).reduce((s, v) => s + v, 0)
  const apiComplete   = completeMonthly(apiData.value, r => r.totalapicalls, r => r.date)
  const apiDelta      = avgMonthlyPct(apiComplete.series)

  const paySuccess = paymentData.value.filter(r =>
    typeof r.status === 'string' && SUCCESS_PAYMENT_STATUSES.has(r.status) && !!r.lfinamekey,
  )
  const payTotal      = monthlySeries(paySuccess, r => r.amount, r => r.date).reduce((s, v) => s + v, 0)
  const payComplete   = completeMonthly(paySuccess, r => r.amount, r => r.date)
  const payDelta      = avgMonthlyPct(payComplete.series)

  return [
    {
      label: 'API Calls',
      value: compact(apiTotal),
      delta: apiDelta != null ? `${apiDelta >= 0 ? '↑' : '↓'} ${Math.abs(apiDelta)}% / mo` : '—',
      color: ACCENT.teal,
      series: lastMonths(apiComplete.series),
    },
    {
      label: 'Payments (AED)',
      value: compact(payTotal),
      delta: payDelta != null ? `${payDelta >= 0 ? '↑' : '↓'} ${Math.abs(payDelta)}% / mo` : '—',
      color: ACCENT.gold,
      series: lastMonths(payComplete.series),
    },
  ]
})

// Participant counts are nested sets: live ⊆ production ⊆ onboarded.
// "Live" is driven by the go-live date field, not by isProduction alone.
interface ParticipantRow {
  label: string
  color: string
  stats: { label: string, value: string }[]
}

const participantRows = computed<ParticipantRow[]>(() => {
  const lfis = lfiOrgs(tfData.value)
  const tpps = tppOrgs(tfData.value)

  return [
    {
      label: 'LFIs',
      color: ACCENT.navy,
      stats: [
        { label: 'Live',       value: pad2(lfis.filter(o => !!o.lfiGoLiveDate).length) },
        { label: 'Production', value: pad2(lfis.filter(o => o.isProduction === true).length) },
        { label: 'Onboarded',  value: pad2(lfis.length) },
      ],
    },
    {
      label: 'TPPs',
      color: ACCENT.blueDeep,
      stats: [
        { label: 'Live',       value: pad2(tpps.filter(o => !!o.tppGoLiveDate).length) },
        { label: 'Production', value: pad2(tpps.filter(o => o.isProduction === true).length) },
        { label: 'Onboarded',  value: pad2(tpps.length) },
      ],
    },
  ]
})

// ── Story charts (big sparklines — same MiniChart style as hero ticker) ──
interface StoryChart {
  label: string
  value: string
  delta: string
  deltaColor: string
  color: string
  series: number[]
  labels: string[]
}

function fmtDelta(d: number | null): string {
  if (d == null) return '—'
  return `${d >= 0 ? '↑' : '↓'} ${Math.abs(d)}% / mo avg`
}

const storyCharts = computed<StoryChart[]>(() => {
  const consentSuccess = authData.value.filter(isConsentAuthorised)
  // Headline total keeps the full amount; the chart line and growth % use
  // only complete months.
  const consentsTotal    = monthlySeries(consentSuccess, r => r.totalapicalls, r => r.date).reduce((s, v) => s + v, 0)
  const consentsComplete = completeMonthly(consentSuccess, r => r.totalapicalls, r => r.date)
  const consentsDelta    = avgMonthlyPct(consentsComplete.series)

  const confByMonth  = monthlyTotals(authData.value.filter(isConsentAuthorised), r => r.totalapicalls, r => r.date)
  const startByMonth = monthlyTotals(authData.value.filter(isAuthStart),         r => r.totalapicalls, r => r.date)
  const partial      = partialMonth()
  // Complete months only for the rate line + growth; full months for the
  // headline overall rate.
  const rateMonths   = Object.keys(startByMonth).sort().filter(m => m !== partial)
  const rateSeries   = rateMonths.map(m => {
    const s = startByMonth[m] ?? 0
    return s > 0 ? ((confByMonth[m] ?? 0) / s) * 100 : 0
  })
  const totalStarts = Object.values(startByMonth).reduce((s, v) => s + v, 0)
  const totalConf   = Object.values(confByMonth).reduce((s, v) => s + v, 0)
  const overallRate = totalStarts > 0 ? (totalConf / totalStarts) * 100 : null
  // Average percentage-point change per month across complete months.
  const ratePpDelta = rateSeries.length >= 2
    ? ((rateSeries[rateSeries.length - 1] ?? 0) - (rateSeries[0] ?? 0)) / rateSeries.length
    : null

  return [
    {
      label: 'Consents Authorised · by Month',
      value: consentsTotal.toLocaleString(),
      delta: fmtDelta(consentsDelta),
      deltaColor: consentsDelta != null && consentsDelta < 0 ? '#B33A3A' : ACCENT.teal,
      color: ACCENT.teal,
      series: lastMonths(consentsComplete.series),
      labels: thinLabels(lastMonths(consentsComplete.labels)),
    },
    {
      label: 'Consent Success Rate · by Month',
      value: overallRate == null ? '—' : `${overallRate.toFixed(1)}%`,
      delta: ratePpDelta == null
        ? '—'
        : `${ratePpDelta >= 0 ? '↑' : '↓'} ${Math.abs(ratePpDelta).toFixed(1)}pp / mo avg`,
      deltaColor: ratePpDelta != null && ratePpDelta < 0 ? '#B33A3A' : ACCENT.sky,
      color: ACCENT.sky,
      series: lastMonths(rateSeries),
      labels: thinLabels(lastMonths(rateMonths)),
    },
  ]
})

// ── Story-in-numbers KPIs ────────────────────────────────────────────────
interface HeroKpi {
  label: string
  value: string
  desc: string
  color: string
}

const heroKpis = computed<HeroKpi[]>(() => {
  const consentsAuthorised = authData.value
    .filter(isConsentAuthorised)
    .reduce((s, r) => s + (r.totalapicalls ?? 0), 0)

  const authStarts = authData.value
    .filter(isAuthStart)
    .reduce((s, r) => s + (r.totalapicalls ?? 0), 0)
  const successRate = authStarts > 0 ? (consentsAuthorised / authStarts) * 100 : null

  // Unique LFIs/TPPs that sent or received *any* API call in the trailing
  // 30 days, anchored to the latest date in the log (data may lag real
  // time). Callers are restricted to registered TPPs — see tppNameKeys().
  let activeLfis = 0
  let activeTpps = 0
  const registeredTpps = tppIdsByName(tfData.value)
  if (apiData.value.length > 0) {
    const first = apiData.value[0]
    const initial = first?.date ?? ''
    const maxDate = apiData.value.reduce(
      (m, r) => (r.date && r.date > m ? r.date : m),
      initial,
    )
    if (maxDate) {
      const d = new Date(maxDate + 'T00:00:00Z')
      d.setUTCDate(d.getUTCDate() - 30)
      const windowStart = d.toISOString().substring(0, 10)
      const lfiSet = new Set<string>()
      const tppSet = new Set<string>()
      for (const r of apiData.value) {
        if (r.date && r.date >= windowStart) {
          if (r.lfinamekey) lfiSet.add(r.lfinamekey)
          const tppId = r.tppname ? registeredTpps.get(r.tppname.toUpperCase()) : undefined
          if (tppId) tppSet.add(tppId)
        }
      }
      activeLfis = lfiSet.size
      activeTpps = tppSet.size
    }
  }

  return [
    {
      label: 'Consents Authorised',
      value: consentsAuthorised.toLocaleString(),
      desc:  'Successful customer authorisations',
      color: ACCENT.teal,
    },
    {
      label: 'Consent Success Rate',
      value: successRate == null ? '—' : `${successRate.toFixed(1)}%`,
      desc:  'Customers completing authorisation',
      color: ACCENT.sky,
    },
    {
      label: 'LFIs Serving Traffic · 30d',
      value: String(activeLfis).padStart(2, '0'),
      desc:  'Received API traffic in the last 30 days',
      color: ACCENT.navy,
    },
    {
      label: 'TPPs Making Requests · 30d',
      value: String(activeTpps).padStart(2, '0'),
      desc:  'Sent API requests in the last 30 days',
      color: ACCENT.blueDeep,
    },
  ]
})

// ── Docs split ───────────────────────────────────────────────────────────
interface DocsItem {
  title: string
  desc: string
  href: string
}

interface DocsCol {
  tag: string
  title: string
  sub: string
  tone: 'teal' | 'gold'
  badge: string
  cta: string
  ctaLabel: string
  items: DocsItem[]
}

const docsCols = computed<DocsCol[]>(() => [
  {
    tag: 'FOR TPPs',
    title: 'Third Party Providers',
    sub: 'Build on Open Finance',
    tone: 'teal',
    badge: `Standards ${selectedVersion.value}`,
    cta: '/tech/tpp-standards/',
    ctaLabel: 'TPP',
    items: [
      { title: 'Getting Started',         desc: 'Sandbox, Postman, first API call.',        href: `/tech/tpp-standards/${selectedVersion.value}/getting-started/` },
      { title: 'Consent',                 desc: 'Create, manage, and revoke consents.',      href: `/tech/tpp-standards/${selectedVersion.value}/consent/` },
      { title: 'Security & FAPI',         desc: 'FAPI profile, tokens, signing, events.',    href: '/tech/tpp-standards/security/fapi/' },
      { title: 'Banking APIs',            desc: 'Accounts, payments, CoP, products, ATMs.',  href: `/tech/tpp-standards/${selectedVersion.value}/banking/` },
      { title: 'Insurance APIs',          desc: 'Policy data sharing and quotation.',        href: `/tech/tpp-standards/${selectedVersion.value}/insurance/` },
      { title: 'Testing & Certification', desc: 'Conformance, then go live.',                href: '/tech/tpp-standards/production/testing-certification/overview' },
    ],
  },
  {
    tag: 'FOR LFIs',
    title: 'Licensed Financial Institutions',
    sub: 'Power Open Finance',
    tone: 'gold',
    badge: 'Integration Guide',
    cta: '/tech/lfi-api-hub/',
    ctaLabel: 'LFI',
    items: [
      { title: 'Integration Journey',     desc: 'Step-by-step onboarding.',                   href: '/tech/lfi-api-hub/getting-started/' },
      { title: 'Trust Framework',         desc: 'Organisations, users, certificates, C3 client.', href: '/tech/lfi-api-hub/trust-framework/' },
      { title: 'API Hub',                 desc: 'Connectivity, Heimdall, Consent Manager.',   href: `/tech/lfi-api-hub/${selectedVersion.value}/api-hub/` },
      { title: 'Ozone Connect',           desc: 'Accounts, payments & data endpoints you build.', href: `/tech/lfi-api-hub/${selectedVersion.value}/banking/` },
      { title: 'Consent Journey',         desc: 'Authenticate & authorise the customer (SCA).', href: `/tech/lfi-api-hub/${selectedVersion.value}/consent-journey/api-guide` },
      { title: 'Testing & Certification', desc: 'Certification and live proving.',             href: '/tech/lfi-api-hub/production/testing-certification/overview' },
    ],
  },
])

// ── Program ────────────────────────────────────────────────────────────────
interface ProgramCard {
  category: string
  color: string
  title: string
  desc: string
  url: string
  tags?: readonly string[]
}

const programCards: readonly ProgramCard[] = [
  {
    category: 'Support',
    color: 'var(--at-teal)',
    title: 'Service Desk',
    desc: 'Raise onboarding, certification, and support tickets, and track them through to resolution.',
    url: '/support-service-desk',
    tags: ['Onboarding', 'Certification', 'Support'],
  },
  {
    category: 'Pricing',
    color: 'var(--at-gold)',
    title: 'Commercial Model',
    desc: 'The charging structure for Open Finance &mdash; per-call fees, discounts, and an interactive cost calculator.',
    url: '/pricing/',
    tags: ['Fees', 'Calculator'],
  },
  {
    category: 'Governance',
    color: 'var(--at-blue)',
    title: 'Policies',
    desc: 'The operational policies you commit to as a participant &mdash; availability, response time, data quality, and version management.',
    url: '/policy/',
    tags: ['SLAs', 'Operational'],
  },
  {
    category: 'Participants',
    color: 'var(--at-blue-deep)',
    title: 'Document Repository',
    desc: 'Production documents and endpoint details published by each live LFI and TPP in the ecosystem.',
    url: '/doc-repository/',
    tags: ['LFI docs', 'TPP docs'],
  },
  {
    category: 'Adoption',
    color: 'var(--at-navy)',
    title: 'Live Ecosystem',
    desc: 'Who&rsquo;s live and what&rsquo;s running in production &mdash; participants, APIs, and recent activity.',
    url: '/program/whats-live',
    tags: ['Production', 'Activity'],
  },
]

function programTagBg(cssVar: string): string {
  return `color-mix(in srgb, ${cssVar} 10%, transparent)`
}

// ── Articles ─────────────────────────────────────────────────────────────
const featuredArticle = computed<HomeArticle | null>(() => articles[0] ?? null)
const sidebarArticles = computed<HomeArticle[]>(() => articles.slice(1, 3))
const bodyArticles    = computed<HomeArticle[]>(() => articles.slice(3, 9))

// ── Community section ────────────────────────────────────────────────────
const SUPPORT_EMAIL = 'support@nebrasopenfinance.ae'
const communityOrg = 'Nebras-Open-Finance'

interface CommunityStats {
  openPRs: number | null
  openIssues: number | null
  contributors: number | null
  recentCommits: number | null
}

const communityStats = ref<CommunityStats>({
  openPRs: null,
  openIssues: null,
  contributors: null,
  recentCommits: null,
})

onMounted(async () => {
  try {
    const res = await fetch('/api/github-stats.json')
    if (!res.ok) return
    const d: unknown = await res.json()
    if (!d || typeof d !== 'object') return
    const obj = d as Record<string, unknown>
    const num = (key: string): number | null =>
      typeof obj[key] === 'number' ? (obj[key] as number) : null
    communityStats.value = {
      openPRs:       num('openPRs'),
      openIssues:    num('openIssues'),
      contributors:  num('contributors'),
      recentCommits: num('recentCommits'),
    }
  } catch {
    // soft-fail: dashes render until data arrives
  }
})

function fmtStat(n: number | null): string {
  return n == null ? '—' : String(n)
}

interface CommunityStatRow {
  label: string
  value: string
}

const communityStatRows = computed<CommunityStatRow[]>(() => [
  { label: 'Open pull requests',      value: fmtStat(communityStats.value.openPRs) },
  { label: 'Open issues & erratas',   value: fmtStat(communityStats.value.openIssues) },
  { label: 'Contributors · all time', value: fmtStat(communityStats.value.contributors) },
  { label: 'Commits · last 30d', value: fmtStat(communityStats.value.recentCommits) },
])

interface CommunityItem {
  title: string
  desc: string
}

const communityDrafts: readonly CommunityItem[] = [
  {
    title: 'Machine-readable specification',
    desc: 'The standard, as code. OpenAPI + JSON Schema + an executable conformance suite, so "compliant" means something a CI pipeline can prove.',
  },
  {
    title: 'Bulk & Batch Payments',
    desc: 'One consent, many payments. Payroll, supplier runs, and recurring disbursements without re-prompting the customer for every transfer.',
  },
  {
    title: 'International Payments, reimagined',
    desc: 'A ground-up redesign of the cross-border flow — FX transparency, beneficiary verification, and SWIFT/instant rails treated as first-class citizens.',
  },
]

const communityWays: readonly CommunityItem[] = [
  { title: 'File an errata',             desc: 'Spot an error or ambiguity in the published specs? Open an issue.' },
  { title: 'Improve the docs',           desc: 'Clarify integration guides, add examples, fix typos — every PR counts.' },
  { title: 'Share implementation notes', desc: 'What tripped you up? How did you test? Document it for the next team.' },
]
</script>

<template>
  <div class="ed-home">

    <!-- ═══════════════════════════════════════════════════════════════════
         HERO — editorial masthead
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ed-hero">
      <div class="ed-hero__inner">
        <div class="ed-hero__grid">

          <div class="ed-hero__lede">
            <div class="ed-hero__label">
              <span class="ed-hero__label-dash" />
              The UAE Open Finance Community
            </div>
            <h1 class="ed-hero__title">
              Building open<br/>
              <span class="ed-hero__title-italic">finance,</span><br/>
              together.
            </h1>
            <p class="ed-hero__sub">
              Insights, tools, and live ecosystem data for everyone building on &mdash; and
              powering &mdash; the UAE&rsquo;s Open Finance framework. Community-driven and
              open source. <strong>Not official.</strong>
            </p>
            <div class="ed-hero__cta-row">
              <a class="ed-btn ed-btn--ink" href="/tech/tpp-standards/">Open Finance Standards</a>
              <a class="ed-btn ed-btn--ink" href="/tech/lfi-api-hub/">LFI Integration Guide</a>
              <button type="button" class="ed-btn ed-btn--ghost ed-btn--search" @click="openSearch">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <circle cx="10" cy="10" r="7" />
                  <path d="M21 21l-6-6" />
                </svg>
                Search Docs
              </button>
            </div>
          </div>

          <!-- Right — live ticker -->
          <aside class="ed-ticker">
            <div class="ed-ticker__header">
              <span class="ed-ticker__dot" />
              Live Ecosystem &middot; Updated {{ lastUpdatedLabel }}
            </div>
            <div
              v-for="t in tickerCells"
              :key="t.label"
              class="ed-ticker__row"
            >
              <div class="ed-ticker__cell">
                <div class="ed-ticker__label">{{ t.label }}</div>
                <div class="ed-ticker__value">{{ t.value }}</div>
              </div>
              <div class="ed-ticker__delta" :style="{ color: t.color }">{{ t.delta }}</div>
              <div class="ed-ticker__spark">
                <MiniChart :data="t.series" :color="t.color" type="area" :height="40" />
              </div>
            </div>
            <div
              v-for="p in participantRows"
              :key="p.label"
              class="ed-ticker__row ed-ticker__row--counts"
            >
              <div class="ed-ticker__label">{{ p.label }}</div>
              <div class="ed-ticker__counts">
                <div v-for="s in p.stats" :key="s.label" class="ed-ticker__count">
                  <div class="ed-ticker__value">{{ s.value }}</div>
                  <div class="ed-ticker__count-label" :style="{ color: p.color }">{{ s.label }}</div>
                </div>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </section>

    <!-- Trust-framework logo strip -->
    <OrganizationScroller />

    <!-- ═══════════════════════════════════════════════════════════════════
         § 01 — The story, in numbers.
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ed-section">
      <div class="ed-section__inner">
        <header class="ed-section__head">
          <div class="ed-section__head-left">
            <span class="ed-section__mark">&sect; 01</span>
            <h2 class="ed-section__title">
              The story,<br/>in numbers.
            </h2>
          </div>
          <p class="ed-section__intro">
            Key metrics tracking adoption and expansion of the CBUAE Open Finance
            framework. Every call, every payment, every consent &mdash; counted and open.
            Visit the <a href="/metrics">metrics dashboard</a> for the full picture.
          </p>
        </header>

        <div class="ed-kpis">
          <div
            v-for="k in heroKpis"
            :key="k.label"
            class="ed-kpi"
          >
            <span class="ed-kpi__accent" :style="{ background: k.color }" />
            <div class="ed-kpi__label">{{ k.label }}</div>
            <div class="ed-kpi__value">{{ k.value }}</div>
            <div class="ed-kpi__desc">{{ k.desc }}</div>
          </div>
        </div>

        <div class="ed-chart-row">
          <div
            v-for="c in storyCharts"
            :key="c.label"
            class="ed-story-chart"
          >
            <div class="ed-story-chart__head">
              <span class="ed-story-chart__accent" :style="{ background: c.color }" />
              <span class="ed-story-chart__label">{{ c.label }}</span>
            </div>
            <div class="ed-story-chart__value">{{ c.value }}</div>
            <div class="ed-story-chart__delta" :style="{ color: c.deltaColor }">{{ c.delta }}</div>
            <MiniChart :data="c.series" :color="c.color" type="area" :height="200" />
            <div v-if="c.labels.length" class="ed-story-chart__axis">
              <span v-for="(l, i) in c.labels" :key="i">{{ l }}</span>
            </div>
          </div>
        </div>

        <a href="/metrics" class="ed-more-link">
          Explore all metrics <span>&rarr;</span>
        </a>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         § 02 — Developer documentation.
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ed-section ed-section--paper">
      <div class="ed-section__inner">
        <header class="ed-section__head">
          <div class="ed-section__head-left">
            <span class="ed-section__mark ed-section__mark--gold">&sect; 02</span>
            <h2 class="ed-section__title">
              Developer<br/>documentation.
            </h2>
          </div>
          <p class="ed-section__intro">
            Technical documentation for every participant &mdash; whether you&rsquo;re
            <strong>building on top of</strong> Open Finance or
            <strong>powering it</strong>.
          </p>
        </header>

        <div class="ed-docs">
          <div
            v-for="col in docsCols"
            :key="col.tag"
            class="ed-docs__col"
            :class="col.tone === 'gold' ? 'ed-docs__col--gold' : 'ed-docs__col--teal'"
          >
            <div class="ed-docs__col-head">
              <div>
                <div class="ed-docs__col-kicker">{{ col.tag }}</div>
                <h3 class="ed-docs__col-title">{{ col.title }}</h3>
                <p class="ed-docs__col-sub">{{ col.sub }}</p>
              </div>
              <span class="ed-docs__col-badge">{{ col.badge }}</span>
            </div>
            <a
              v-for="(item, i) in col.items"
              :key="item.title"
              :href="item.href"
              class="ed-docs__row"
            >
              <span class="ed-docs__num">0{{ i + 1 }}</span>
              <div>
                <div class="ed-docs__row-title">{{ item.title }}</div>
                <div class="ed-docs__row-desc">{{ item.desc }}</div>
              </div>
              <span class="ed-docs__arrow">&rarr;</span>
            </a>
            <a :href="col.cta" class="ed-docs__cta">View full {{ col.ctaLabel }} docs &rarr;</a>
          </div>
        </div>

        <!-- API specifications — source of truth -->
        <a href="/tech/api-specs/" class="ed-docs__specs">
          <div class="ed-docs__specs-text">
            <div class="ed-docs__specs-label">OpenAPI YAML specs</div>
            <div class="ed-docs__specs-title">Browse the full API specifications</div>
            <div class="ed-docs__specs-sub">
              Every endpoint, schema, and example &mdash; the OpenAPI specs that define
              UAE Open Finance.
            </div>
          </div>
          <span class="ed-docs__specs-cta">View API specs <span>&rarr;</span></span>
        </a>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         § 03 — The programme.
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ed-section">
      <div class="ed-section__inner">
        <header class="ed-section__head">
          <div class="ed-section__head-left">
            <span class="ed-section__mark ed-section__mark--navy">&sect; 03</span>
            <h2 class="ed-section__title">
              The<br/>programme.
            </h2>
          </div>
          <p class="ed-section__intro">
            Everything beyond the specs &mdash; how to get help, what it costs, the
            policies you operate under, and who&rsquo;s already live in the ecosystem.
          </p>
        </header>

        <div class="ed-program">
          <a
            v-for="card in programCards"
            :key="card.title"
            :href="card.url"
            class="ed-program-card"
            :style="{ '--card-color': card.color }"
          >
            <span class="ed-program-card__top" :style="{ background: card.color }" />

            <div class="ed-program-card__meta">
              <span class="ed-program-card__cat" :style="{ color: card.color }">
                {{ card.category }}
              </span>
            </div>

            <h3 class="ed-program-card__title" v-html="card.title" />
            <p class="ed-program-card__desc" v-html="card.desc" />

            <div v-if="card.tags && card.tags.length" class="ed-program-card__tags">
              <span
                v-for="tag in card.tags"
                :key="tag"
                class="ed-program-card__tag"
                :style="{ background: programTagBg(card.color), color: card.color }"
              >{{ tag }}</span>
            </div>

            <div class="ed-program-card__foot">
              <span class="ed-program-card__cta">Open section</span>
              <span class="ed-program-card__arrow" :style="{ color: card.color }">&rarr;</span>
            </div>
          </a>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         § 04 — Community & contributions.
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ed-section ed-section--paper">
      <div class="ed-section__inner">
        <header class="ed-section__head">
          <div class="ed-section__head-left">
            <span class="ed-section__mark ed-section__mark--navy">&sect; 04</span>
            <h2 class="ed-section__title">
              Community<br/>
              <span class="ed-section__title-italic">&amp;</span> contributions.
            </h2>
          </div>
          <p class="ed-section__intro">
            This site is community-driven and open source &mdash; built by the LFIs,
            TPPs, and Hub operator working within the ecosystem. Every contribution
            makes the framework more legible for everyone.
          </p>
        </header>

        <div class="ed-community__grid">
          <!-- Col 1: GitHub activity -->
          <div class="ed-community__card">
            <div class="ed-community__card-head">
              <div class="ed-community__kicker ed-community__kicker--teal">
                github &middot; nebras-open-finance
              </div>
              <h3 class="ed-community__card-title">Contribute to docs &amp; standards</h3>
            </div>
            <div class="ed-community__stats">
              <div
                v-for="s in communityStatRows"
                :key="s.label"
                class="ed-community__stat"
              >
                <div class="ed-community__stat-label">{{ s.label }}</div>
                <div class="ed-community__stat-value">{{ s.value }}</div>
              </div>
            </div>
            <a
              :href="`https://github.com/${communityOrg}`"
              class="ed-community__link ed-community__link--teal"
              target="_blank"
              rel="noopener"
            >
              View on GitHub <span>&rarr;</span>
            </a>
          </div>

          <!-- Col 2: Drafting — what we're building next -->
          <div class="ed-community__card">
            <div class="ed-community__card-head">
              <div class="ed-community__kicker ed-community__kicker--blue">drafting</div>
              <h3 class="ed-community__card-title">What&rsquo;s next&hellip;</h3>
            </div>
            <div class="ed-community__list">
              <div
                v-for="(d, i) in communityDrafts"
                :key="d.title"
                class="ed-community__item"
              >
                <div class="ed-community__item-num ed-community__item-num--blue">0{{ i + 1 }}</div>
                <div>
                  <div class="ed-community__item-title">{{ d.title }}</div>
                  <div class="ed-community__item-desc">{{ d.desc }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Col 3: How to participate -->
          <div class="ed-community__card ed-community__card--accent">
            <div class="ed-community__card-head">
              <div class="ed-community__kicker ed-community__kicker--gold">get involved</div>
              <h3 class="ed-community__card-title">How to participate</h3>
            </div>
            <div class="ed-community__list">
              <div
                v-for="(w, i) in communityWays"
                :key="w.title"
                class="ed-community__item"
              >
                <div class="ed-community__item-num ed-community__item-num--gold">0{{ i + 1 }}</div>
                <div>
                  <div class="ed-community__item-title">{{ w.title }}</div>
                  <div class="ed-community__item-desc">{{ w.desc }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Reach-out CTA -->
        <a :href="`mailto:${SUPPORT_EMAIL}`" class="ed-community__reachout">
          <div class="ed-community__reachout-text">
            <div class="ed-community__reachout-label">First time here?</div>
            <div class="ed-community__reachout-title">
              Not sure how to get started? No worries &mdash; just ask.
            </div>
            <div class="ed-community__reachout-sub">
              Email <span class="ed-community__reachout-email">{{ SUPPORT_EMAIL }}</span>
              and we&rsquo;ll point you in the right direction.
            </div>
          </div>
          <span class="ed-community__reachout-cta">Email us <span>&rarr;</span></span>
        </a>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         § 05 — Articles & press.
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ed-section">
      <div class="ed-section__inner">
        <header class="ed-section__head">
          <div class="ed-section__head-left">
            <span class="ed-section__mark ed-section__mark--blue">&sect; 05</span>
            <h2 class="ed-section__title">
              Articles<br/>
              <span class="ed-section__title-italic">&amp;</span> press.
            </h2>
          </div>
          <p class="ed-section__intro">
            Coverage of AlTareq across the region&rsquo;s financial press, and from the
            ecosystem participants themselves.
          </p>
        </header>

        <div v-if="featuredArticle" class="ed-articles">
          <ArticleLink
            variant="feature"
            :link="featuredArticle.link"
            :title="featuredArticle.title"
            :date="featuredArticle.dateLabel"
            :text="featuredArticle.text"
            :image-src="featuredArticle.imageSrc"
            :kind="kindLabels[featuredArticle.kind]"
            :source="featuredArticle.source"
          />

          <ArticleLink
            v-for="a in sidebarArticles"
            :key="a.id"
            variant="compact"
            :link="a.link"
            :title="a.title"
            :date="a.dateLabel"
            :text="a.text"
            :image-src="a.imageSrc"
            :kind="kindLabels[a.kind]"
            :source="a.source"
          />
        </div>

        <div class="ed-articles-grid">
          <ArticleLink
            v-for="a in bodyArticles"
            :key="a.id"
            :link="a.link"
            :title="a.title"
            :date="a.dateLabel"
            :text="a.text"
            :image-src="a.imageSrc"
            :kind="kindLabels[a.kind]"
            :source="a.source"
          />
        </div>

        <a href="/news" class="ed-more-link">
          All articles <span>&rarr;</span>
        </a>
      </div>
    </section>

  </div>
</template>

<style scoped>
.ed-home {
  background: var(--at-bg-cream);
  color: var(--at-navy-deep);
  font-family: var(--at-sans);
  padding-top: 4.25rem;
}

/* ─── Hero ──────────────────────────────────────────────────────────────── */
.ed-hero {
  background: var(--at-bg-cream);
  border-bottom: 1px solid var(--at-grid-line);
}

.ed-hero__inner {
  max-width: var(--at-page-max);
  margin: 0 auto;
  padding: 4.5rem 2rem 3rem;
}

.ed-hero__grid {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 4rem;
  align-items: start;
}

.ed-hero__label {
  font-family: var(--at-mono);
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--at-teal);
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.ed-hero__label-dash {
  width: 24px;
  height: 1px;
  background: currentColor;
}

.ed-hero__title {
  font-family: var(--at-serif);
  font-size: clamp(3rem, 7.6vw, 5.25rem);
  font-weight: 600;
  line-height: 0.96;
  letter-spacing: -0.035em;
  margin: 0;
  color: var(--at-navy-deep);
}

.ed-hero__title-italic {
  font-style: italic;
  font-weight: 400;
}

.ed-hero__sub {
  font-family: var(--at-sans);
  font-size: 1.15rem;
  line-height: 1.55;
  margin: 2.25rem 0 0;
  max-width: 34rem;
  color: var(--at-mute-2);
}

.ed-hero__sub strong { color: var(--at-navy-deep); font-weight: 600; }

.ed-hero__cta-row {
  margin-top: 2.25rem;
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.ed-btn {
  display: inline-flex;
  align-items: center;
  padding: 0.9rem 1.35rem;
  font-family: var(--at-sans);
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  text-decoration: none;
  border-radius: 0;
  transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
}

.ed-btn--ink {
  background: var(--at-navy-deep);
  color: var(--at-bg-cream);
  border: 1px solid var(--at-navy-deep);
}
.ed-btn--ink:hover { background: var(--at-navy); border-color: var(--at-navy); }

.ed-btn--ghost {
  background: transparent;
  color: var(--at-navy-deep);
  border: 1px solid var(--at-grid-line-2);
}
.ed-btn--ghost:hover { background: var(--at-navy-deep); color: var(--at-bg-cream); border-color: var(--at-navy-deep); }

.ed-btn--search {
  gap: 0.5rem;
  font: inherit;
  font-family: var(--at-sans);
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  cursor: pointer;
}

/* ─── Live ticker ──────────────────────────────────────────────────────── */
.ed-ticker {
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line);
}

.ed-ticker__header {
  padding: 1rem 1.25rem;
  border-bottom: 1px solid var(--at-grid-line);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--at-mono);
  font-size: 0.68rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--at-navy);
}

.ed-ticker__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--at-teal);
  box-shadow: 0 0 0 3px rgba(0, 194, 169, 0.2);
}

.ed-ticker__row {
  padding: 1.15rem 1.25rem;
  border-bottom: 1px solid var(--at-grid-line);
  display: grid;
  grid-template-columns: 1.2fr 1fr 1.3fr;
  align-items: center;
  gap: 1rem;
}

.ed-ticker__row:last-child { border-bottom: 0; }

/* Participant rows: label on top, three counts across the full block. */
.ed-ticker__row--counts {
  display: block;
}

.ed-ticker__counts {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 0.35rem;
}

.ed-ticker__count-label {
  font-family: var(--at-mono);
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-top: 0.15rem;
}

.ed-ticker__label {
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--at-mute);
}

.ed-ticker__value {
  font-family: var(--at-serif);
  font-size: 2rem;
  font-weight: 500;
  letter-spacing: -0.02em;
  color: var(--at-navy-deep);
  line-height: 1.1;
  margin-top: 0.15rem;
}

.ed-ticker__delta {
  font-family: var(--at-mono);
  font-size: 0.75rem;
  font-weight: 600;
}

.ed-ticker__spark { width: 100%; }

/* ─── Section shell ────────────────────────────────────────────────────── */
.ed-section {
  padding: 6rem 0;
  background: var(--at-bg-cream);
  border-bottom: 1px solid var(--at-grid-line);
}

.ed-section--paper {
  background: var(--at-bg-paper);
}

.ed-section__inner {
  max-width: var(--at-page-max);
  margin: 0 auto;
  padding: 0 2rem;
}

.ed-section__head {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 4rem;
  margin-bottom: 3.5rem;
}

.ed-section__mark {
  font-family: var(--at-mono);
  font-size: 0.7rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--at-teal);
  display: block;
}

.ed-section__mark--gold { color: var(--at-gold); }
.ed-section__mark--blue { color: var(--at-blue); }
.ed-section__mark--navy { color: var(--at-navy); }

.ed-section__title {
  font-family: var(--at-serif);
  font-size: 2.75rem;
  font-weight: 500;
  line-height: 1;
  letter-spacing: -0.025em;
  margin: 0.75rem 0 0;
  color: var(--at-navy-deep);
  white-space: nowrap;
}

.ed-section__title-italic {
  font-style: italic;
  font-weight: 400;
}

.ed-section__intro {
  font-family: var(--at-sans);
  font-size: 1.05rem;
  line-height: 1.6;
  color: var(--at-mute-2);
  margin: 0;
  max-width: 40rem;
  align-self: end;
}

.ed-section__intro a { color: var(--at-navy-deep); text-decoration: underline; text-underline-offset: 3px; }
.ed-section__intro strong { color: var(--at-navy-deep); font-weight: 600; }

/* ─── KPIs ─────────────────────────────────────────────────────────────── */
.ed-kpis {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-top: 1px solid var(--at-navy-deep);
  border-left: 1px solid var(--at-grid-line);
}

.ed-kpi {
  padding: 2rem 1.75rem 1.75rem;
  border-right: 1px solid var(--at-grid-line);
  border-bottom: 1px solid var(--at-grid-line);
  background: var(--at-surface);
  position: relative;
  min-height: 11rem;
  display: flex;
  flex-direction: column;
}

.ed-kpi__accent {
  position: absolute;
  top: 0;
  left: 0;
  height: 3px;
  width: 36px;
}

.ed-kpi__label {
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--at-mute);
  margin-bottom: 1.5rem;
}

.ed-kpi__value {
  font-family: var(--at-serif);
  font-size: 2.8rem;
  font-weight: 500;
  letter-spacing: -0.03em;
  color: var(--at-navy-deep);
  line-height: 1;
}

.ed-kpi__desc {
  font-family: var(--at-sans);
  font-size: 0.82rem;
  color: var(--at-mute);
  margin-top: 0.75rem;
}

/* ─── Chart panels ─────────────────────────────────────────────────────── */
.ed-chart-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 1rem;
}

.ed-story-chart {
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line);
  padding: 1.75rem 1.75rem 1.5rem;
  display: flex;
  flex-direction: column;
}

.ed-story-chart__head {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  margin-bottom: 0.85rem;
}

.ed-story-chart__accent {
  width: 22px;
  height: 3px;
  display: inline-block;
}

.ed-story-chart__label {
  font-family: var(--at-mono);
  font-size: 0.68rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--at-mute);
}

.ed-story-chart__value {
  font-family: var(--at-serif);
  font-size: 2.4rem;
  font-weight: 500;
  letter-spacing: -0.025em;
  color: var(--at-navy-deep);
  line-height: 1;
}

.ed-story-chart__delta {
  font-family: var(--at-mono);
  font-size: 0.72rem;
  font-weight: 600;
  margin: 0.55rem 0 1.25rem;
}

.ed-story-chart__axis {
  display: flex;
  justify-content: space-between;
  margin-top: 0.75rem;
  padding-top: 0.65rem;
  border-top: 1px solid var(--at-grid-line);
  font-family: var(--at-mono);
  font-size: 0.6rem;
  letter-spacing: 0.1em;
  color: var(--at-mute);
}

/* ─── Dev docs split ───────────────────────────────────────────────────── */
.ed-docs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line);
}

.ed-docs__col {
  padding: 2.5rem 2.25rem;
  display: flex;
  flex-direction: column;
}

.ed-docs__col:first-child {
  border-right: 1px solid var(--at-grid-line);
}

.ed-docs__col-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid var(--at-grid-line);
  margin-bottom: 1.5rem;
}

.ed-docs__col-kicker {
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.14em;
  font-weight: 600;
  margin-bottom: 0.4rem;
}

.ed-docs__col--teal .ed-docs__col-kicker { color: var(--at-teal-deep); }
.ed-docs__col--gold .ed-docs__col-kicker { color: var(--at-gold); }

.ed-docs__col-title {
  font-family: var(--at-serif);
  font-size: 1.45rem;
  font-weight: 500;
  letter-spacing: -0.02em;
  margin: 0;
  color: var(--at-navy-deep);
}

.ed-docs__col-sub {
  font-family: var(--at-sans);
  font-size: 0.82rem;
  color: var(--at-mute);
  margin: 0.2rem 0 0;
}

.ed-docs__col-badge {
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.1em;
  font-weight: 600;
  padding: 0.3rem 0.6rem;
  flex-shrink: 0;
}

.ed-docs__col--teal .ed-docs__col-badge {
  background: rgba(0, 194, 169, 0.1);
  color: var(--at-teal-deep);
}

.ed-docs__col--gold .ed-docs__col-badge {
  background: rgba(179, 120, 25, 0.1);
  color: var(--at-gold);
}

.ed-docs__row {
  display: grid;
  grid-template-columns: 2rem 1fr auto;
  gap: 1rem;
  align-items: baseline;
  padding: 1.1rem 0;
  border-bottom: 1px solid var(--at-grid-line);
  text-decoration: none;
  color: inherit;
  transition: background 0.12s;
}

.ed-docs__row:hover {
  background: var(--at-bg-paper);
  margin: 0 -0.75rem;
  padding: 1.1rem 0.75rem;
}

.ed-docs__row:last-of-type { border-bottom: none; }

.ed-docs__num {
  font-family: var(--at-mono);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.06em;
}

.ed-docs__col--teal .ed-docs__num { color: var(--at-teal-deep); }
.ed-docs__col--gold .ed-docs__num { color: var(--at-gold); }

.ed-docs__row-title {
  font-family: var(--at-serif);
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--at-navy-deep);
  letter-spacing: -0.01em;
  margin-bottom: 0.2rem;
}

.ed-docs__row-desc {
  font-family: var(--at-sans);
  font-size: 0.82rem;
  color: var(--at-mute);
  line-height: 1.45;
}

.ed-docs__arrow {
  font-family: var(--at-mono);
  font-size: 1.1rem;
  transition: transform 0.2s;
}

.ed-docs__col--teal .ed-docs__arrow { color: var(--at-teal-deep); }
.ed-docs__col--gold .ed-docs__arrow { color: var(--at-gold); }
.ed-docs__row:hover .ed-docs__arrow { transform: translateX(3px); }

.ed-docs__cta {
  margin-top: 1.75rem;
  align-self: flex-start;
  font-family: var(--at-mono);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none;
  padding-bottom: 0.35rem;
  border-bottom: 1px solid currentColor;
}

.ed-docs__col--teal .ed-docs__cta { color: var(--at-teal-deep); }
.ed-docs__col--gold .ed-docs__cta { color: var(--at-gold); }

/* ─── API specs banner ─────────────────────────────────────────────────── */
.ed-docs__specs {
  margin-top: 1rem;
  padding: 1.75rem 2rem;
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line);
  border-left: 3px solid var(--at-teal);
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 2.5rem;
  text-decoration: none;
  color: inherit;
  transition: background 0.15s ease;
}

.ed-docs__specs:hover { background: var(--at-bg-paper); }

.ed-docs__specs-label {
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--at-teal-deep);
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.ed-docs__specs-title {
  font-family: var(--at-serif);
  font-size: 1.45rem;
  font-weight: 500;
  letter-spacing: -0.02em;
  color: var(--at-navy-deep);
  line-height: 1.25;
  margin-bottom: 0.5rem;
}

.ed-docs__specs-sub {
  font-family: var(--at-sans);
  font-size: 0.92rem;
  color: var(--at-mute-2);
  line-height: 1.55;
  max-width: 42rem;
}

.ed-docs__specs-cta {
  font-family: var(--at-sans);
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  white-space: nowrap;
  padding: 0.85rem 1.4rem;
  background: var(--at-navy-deep);
  color: var(--at-bg-cream);
  display: inline-flex;
  gap: 0.4rem;
}

.ed-docs__specs:hover .ed-docs__specs-cta { background: var(--at-navy); }

@media (max-width: 640px) {
  .ed-docs__specs { grid-template-columns: 1fr; gap: 1.25rem; }
  .ed-docs__specs-cta { justify-self: start; }
}

/* ─── Programme cards (shared .ed-tpp-card pattern) ────────────────────── */
.ed-program {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(22.5rem, 1fr));
  gap: 1.25rem;
}

.ed-program-card {
  position: relative;
  display: flex;
  flex-direction: column;
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line);
  padding: 2rem 1.75rem 1.5rem;
  text-decoration: none;
  color: inherit;
  transition: border-color 0.2s ease, transform 0.2s ease;
}

.ed-program-card:hover {
  border-color: var(--card-color, var(--at-navy));
  transform: translateY(-2px);
}

.ed-program-card__top {
  position: absolute;
  top: 0;
  left: 0;
  width: 48px;
  height: 3px;
}

.ed-program-card__meta {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  margin-bottom: 0.85rem;
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.ed-program-card__cat { font-weight: 700; }

.ed-program-card__title {
  font-family: var(--at-serif);
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: var(--at-navy-deep);
  margin: 0 0 0.85rem;
}

.ed-program-card__desc {
  font-family: var(--at-sans);
  font-size: 0.92rem;
  line-height: 1.6;
  color: var(--at-mute-2);
  margin: 0 0 1.1rem;
  flex: 1;
}

.ed-program-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 1rem;
}

.ed-program-card__tag {
  padding: 0.28rem 0.6rem;
  font-family: var(--at-mono);
  font-size: 0.58rem;
  letter-spacing: 0.08em;
  font-weight: 600;
  text-transform: uppercase;
}

.ed-program-card__foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1rem;
  border-top: 1px solid var(--at-grid-line);
}

.ed-program-card__cta {
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--at-mute);
}

.ed-program-card__arrow {
  font-family: var(--at-mono);
  font-size: 1rem;
  transition: transform 0.2s;
}

.ed-program-card:hover .ed-program-card__arrow { transform: translateX(4px); }
.ed-program-card:hover .ed-program-card__cta { color: var(--at-navy-deep); }

/* ─── Articles ─────────────────────────────────────────────────────────── */
.ed-articles {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.ed-articles > :nth-child(1) { grid-row: span 2; }

.ed-articles-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
}

/* ─── Community section ────────────────────────────────────────────────── */
.ed-community__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line);
}

.ed-community__card {
  padding: 2.25rem 2rem;
  border-right: 1px solid var(--at-grid-line);
  display: flex;
  flex-direction: column;
}

.ed-community__card:last-child { border-right: none; }

.ed-community__card--accent { background: var(--at-bg-paper); }

.ed-community__card-head {
  margin-bottom: 1.75rem;
  padding-bottom: 1.1rem;
  border-bottom: 1px solid var(--at-grid-line);
}

.ed-community__kicker {
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 600;
  margin-bottom: 0.55rem;
}

.ed-community__kicker--teal { color: var(--at-teal-deep); }
.ed-community__kicker--gold { color: var(--at-gold); }
.ed-community__kicker--blue { color: var(--at-blue-deep); }

.ed-community__card-title {
  font-family: var(--at-serif);
  font-size: 1.4rem;
  font-weight: 500;
  letter-spacing: -0.02em;
  line-height: 1.2;
  color: var(--at-navy-deep);
  margin: 0;
}

/* Stats list (col 1) */
.ed-community__stats {
  flex: 1;
  margin-bottom: 1.5rem;
}

.ed-community__stat {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: baseline;
  padding: 0.9rem 0;
  border-bottom: 1px solid var(--at-grid-line);
}

.ed-community__stat:last-child { border-bottom: none; }

.ed-community__stat-label {
  font-family: var(--at-sans);
  font-size: 0.85rem;
  color: var(--at-mute-2);
}

.ed-community__stat-value {
  font-family: var(--at-mono);
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--at-navy-deep);
}

/* Drafts + Ways (col 2 + col 3) — share the same item layout */
.ed-community__list {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
}

.ed-community__item {
  display: grid;
  grid-template-columns: 1.75rem 1fr;
  gap: 0.85rem;
  align-items: start;
}

.ed-community__item-num {
  font-family: var(--at-mono);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  padding-top: 0.18rem;
}

.ed-community__item-num--blue { color: var(--at-blue-deep); }
.ed-community__item-num--gold { color: var(--at-gold); }

.ed-community__item-title {
  font-family: var(--at-serif);
  font-size: 1.05rem;
  font-weight: 500;
  letter-spacing: -0.01em;
  color: var(--at-navy-deep);
  margin-bottom: 0.25rem;
}

.ed-community__item-desc {
  font-family: var(--at-sans);
  font-size: 0.82rem;
  line-height: 1.55;
  color: var(--at-mute);
}

/* GitHub link at bottom of col 1 */
.ed-community__link {
  margin-top: auto;
  align-self: flex-start;
  font-family: var(--at-mono);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none;
  padding-bottom: 0.35rem;
  border-bottom: 1px solid currentColor;
}

.ed-community__link--teal { color: var(--at-teal-deep); }

/* Reach-out CTA (replaces event banner) */
.ed-community__reachout {
  margin-top: 2rem;
  padding: 1.75rem 2rem;
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line);
  border-left: 3px solid var(--at-gold);
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 2.5rem;
  text-decoration: none;
  color: inherit;
  transition: background 0.15s ease;
}

.ed-community__reachout:hover { background: var(--at-bg-paper); }

.ed-community__reachout-label {
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--at-gold);
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.ed-community__reachout-title {
  font-family: var(--at-serif);
  font-size: 1.45rem;
  font-weight: 500;
  letter-spacing: -0.02em;
  color: var(--at-navy-deep);
  line-height: 1.25;
  margin-bottom: 0.5rem;
}

.ed-community__reachout-sub {
  font-family: var(--at-sans);
  font-size: 0.92rem;
  color: var(--at-mute-2);
  line-height: 1.55;
}

.ed-community__reachout-email {
  font-family: var(--at-mono);
  font-size: 0.85rem;
  color: var(--at-navy-deep);
  font-weight: 600;
}

.ed-community__reachout-cta {
  font-family: var(--at-sans);
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  white-space: nowrap;
  padding: 0.85rem 1.4rem;
  background: var(--at-navy-deep);
  color: var(--at-bg-cream);
  display: inline-flex;
  gap: 0.4rem;
}

.ed-community__reachout:hover .ed-community__reachout-cta {
  background: var(--at-navy);
}

/* Attribution */
.ed-community__attribution {
  margin: 2rem auto 0;
  padding-top: 1.75rem;
  border-top: 1px solid var(--at-grid-line);
  font-family: var(--at-sans);
  font-style: italic;
  font-size: 0.85rem;
  line-height: 1.65;
  color: var(--at-mute);
  max-width: 45rem;
  text-align: center;
}

/* ─── More link ────────────────────────────────────────────────────────── */
.ed-more-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--at-sans);
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--at-navy-deep);
  text-decoration: none;
  padding: 0.7rem 0;
  margin-top: 1.5rem;
  border-bottom: 1px solid var(--at-navy-deep);
}

.ed-more-link:hover { color: var(--at-teal-deep); border-bottom-color: var(--at-teal-deep); }
.ed-more-link span { font-weight: 600; }

/* ─── Responsive ───────────────────────────────────────────────────────── */
@media (max-width: 1024px) {
  .ed-hero__grid { grid-template-columns: 1fr; gap: 3rem; }
  .ed-section__head { grid-template-columns: 1fr; gap: 1.5rem; }
  .ed-section__intro { align-self: start; }
  .ed-kpis { grid-template-columns: repeat(2, 1fr); }
  .ed-chart-row { grid-template-columns: 1fr; }
  .ed-docs { grid-template-columns: 1fr; }
  .ed-docs__col:first-child { border-right: 0; border-bottom: 1px solid var(--at-grid-line); }
  .ed-program { grid-template-columns: repeat(2, 1fr); }
  .ed-community__grid { grid-template-columns: 1fr; }
  .ed-community__card { border-right: 0; border-bottom: 1px solid var(--at-grid-line); }
  .ed-community__card:last-child { border-bottom: 0; }
  .ed-community__reachout { grid-template-columns: 1fr; gap: 1.25rem; }
  .ed-community__reachout-cta { justify-self: start; }
  .ed-articles { grid-template-columns: 1fr; }
  .ed-articles > :nth-child(1) { grid-row: auto; }
  .ed-articles-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 640px) {
  .ed-hero__inner { padding: 3rem 1.25rem 2rem; }
  .ed-section { padding: 4rem 0; }
  .ed-section__inner { padding: 0 1.25rem; }
  .ed-section__title { font-size: 2rem; }
  .ed-kpis { grid-template-columns: 1fr; }
  .ed-kpi__value { font-size: 2.2rem; }
  .ed-program { grid-template-columns: 1fr; }
  .ed-articles-grid { grid-template-columns: 1fr; }
  .ed-community__card { padding: 1.75rem 1.25rem; }
  .ed-community__reachout { padding: 1.5rem 1.25rem; }
  .ed-ticker__row { grid-template-columns: 1.2fr 1fr; }
  .ed-ticker__spark { grid-column: span 2; }
}
</style>
