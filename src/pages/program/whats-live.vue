<route lang="yaml">
meta:
  title: In Production
  isIndex: true
</route>

<script setup lang="ts">
const DAYS_WINDOW = 30

// Every participant in the directory feed is deployed in production. The
// directory records commercial go-live as an AuthorisationServer certification:
// a server holding a certified approval whose start date has passed is LIVE to
// customers; the rest are in PRODUCTION TESTING.
const GO_LIVE_PROFILE_TYPE = 'Commercial Go-Live Approval'

const FAMILY_KEYS = [
  'account-information',
  'payment',
  'confirmation',
  'product',
  'atm',
  'insurance',
] as const

type FamilyKey = (typeof FAMILY_KEYS)[number]

// Banking families — everything except the insurance family. These populate the
// LFI (Bank) tab and the TPP filter row.
const BANKING_FAMILIES: readonly FamilyKey[] = [
  'account-information',
  'payment',
  'confirmation',
  'product',
  'atm',
]

// Insurance "types" are NOT distinct ApiFamilyType values in the directory — the
// directory exposes a single `insurance` family. Types are derived from the
// endpoint path prefix (e.g. `/health-insurance-policies` → 'health'). They drive
// the LFI (Insurer) filter chips and the per-type breakdown inside insurer cards.
const INSURANCE_TYPES = ['health', 'motor', 'travel', 'home'] as const
type InsuranceType = (typeof INSURANCE_TYPES)[number]

const INSURANCE_TYPE_LABELS: Record<InsuranceType, string> = {
  health: 'Health',
  motor: 'Motor',
  travel: 'Travel',
  home: 'Home',
}

// Non-type-specific insurance endpoints (e.g. `/insurance-consents`) group here.
const INSURANCE_GENERAL_KEY = 'general'
const INSURANCE_GENERAL_LABEL = 'Consents'

type FamilyFilter = 'all' | FamilyKey | InsuranceType
type Mode = 'lfi-bank' | 'lfi-insurer' | 'tpp'

const FAMILY_LABELS: Record<'all' | FamilyKey, string> = {
  'all': 'All services',
  'account-information': 'Account Information',
  'payment': 'Payment Initiation',
  'confirmation': 'Confirmation of Payee',
  'product': 'Products & Leads',
  'atm': 'ATMs',
  'insurance': 'Insurance',
}

// Maps family keys → URL prefix segment in the API log
const FAMILY_URL_PREFIX: Record<FamilyKey, string> = {
  'account-information': 'account-information',
  'payment': 'payment',
  'confirmation': 'confirmation-of-payee',
  'product': 'product',
  'atm': 'atm',
  'insurance': 'insurance',
}

// Canonical endpoint ordering per family — mirrors the TPP-facing sidebar in
// docs/.vitepress/config/sidebars/tpp.ts so the live ecosystem cards present
// endpoints in the same order developers see them in the docs.
const ENDPOINT_ORDER: Record<FamilyKey, string[]> = {
  'account-information': [
    '/accounts',
    '/accounts/{AccountId}',
    '/accounts/{AccountId}/balances',
    '/accounts/{AccountId}/beneficiaries',
    '/accounts/{AccountId}/direct-debits',
    '/parties',
    '/accounts/{AccountId}/parties',
    '/accounts/{AccountId}/products',
    '/accounts/{AccountId}/scheduled-payments',
    '/accounts/{AccountId}/standing-orders',
    '/accounts/{AccountId}/statements',
    '/accounts/{AccountId}/transactions',
  ],
  'payment': [
    '/payments',
    '/payments/{PaymentId}',
    '/payment-consents/{ConsentId}/refund',
  ],
  'confirmation': [
    '/discovery',
    '/confirmation',
  ],
  'product': [
    '/products',
    '/leads',
  ],
  'atm': [
    '/atms',
  ],
  'insurance': [
    '/insurance-consents',
    '/insurance-consents/{ConsentId}',
    '/health-insurance-policies',
    '/health-insurance-policies/{InsurancePolicyId}',
    '/health-insurance-policies/{InsurancePolicyId}/payment-details',
    '/health-insurance-quotes',
    '/health-insurance-quotes/{QuoteId}',
    '/motor-insurance-policies',
    '/motor-insurance-policies/{InsurancePolicyId}',
    '/motor-insurance-policies/{InsurancePolicyId}/payment-details',
    '/motor-insurance-quotes',
    '/motor-insurance-quotes/{QuoteId}',
    '/travel-insurance-policies',
    '/travel-insurance-policies/{InsurancePolicyId}',
    '/travel-insurance-policies/{InsurancePolicyId}/payment-details',
    '/travel-insurance-quotes',
    '/travel-insurance-quotes/{QuoteId}',
    '/home-insurance-policies',
    '/home-insurance-policies/{InsurancePolicyId}',
    '/home-insurance-policies/{InsurancePolicyId}/payment-details',
    '/home-insurance-quotes',
    '/home-insurance-quotes/{QuoteId}',
  ],
}

// ── Loose external data shapes ─────────────────────────────────────────────
// These describe only the fields we actually read from external JSON; we
// narrow from `unknown` at fetch boundaries.
interface DirectoryEndpoint {
  ApiEndpoint?: string
}

interface DirectoryApiMetadata {
  AccountSubType?: string[]
  OverLimitFees?: string
  SingleInstantPayment?: { Supported?: boolean }
  FixedOnDemand?: { Supported?: boolean }
  FixedPeriodicSchedule?: { Supported?: boolean }
  FixedDefinedSchedule?: { Supported?: boolean }
  VariableOnDemand?: {
    SingleBeneficiarySupported?: boolean
    MultipleBeneficiariesSupported?: boolean
    OpenBeneficiariesSupported?: boolean
  }
  VariablePeriodicSchedule?: { Supported?: boolean }
  VariableDefinedSchedule?: { Supported?: boolean }
  DelegatedAuthentication?: {
    SingleBeneficiarySupported?: boolean
    MultipleBeneficiariesSupported?: boolean
    OpenBeneficiariesSupported?: boolean
  }
}

interface DirectoryResource {
  ApiFamilyType?: string
  ApiVersion?: string
  ApiDiscoveryEndpoints?: DirectoryEndpoint[]
  ApiMetadata?: DirectoryApiMetadata
}

interface DirectoryCertification {
  ProfileType?: string
  CertificationStatus?: string
  Status?: string
  CertificationStartDate?: string
  CertificationExpirationDate?: string
}

interface DirectoryServer {
  AuthorisationServerId?: string
  CustomerFriendlyName?: string
  CustomerFriendlyLogoUri?: string
  Flags?: { AccountType?: string[] }
  ApiResources?: DirectoryResource[]
  AuthorisationServerCertifications?: DirectoryCertification[]
}

interface DirectoryOrg {
  OrganisationId?: string
  OrganisationName?: string
  AuthorisationServers?: DirectoryServer[]
}

interface ApiLogRow {
  date?: string
  tppname?: string
  lfinamekey?: string
  url?: string
  httpmethod?: string
  totalapicalls?: number
}

interface PaymentsLogRow {
  date?: string
  tppname?: string
  lfinamekey?: string
  paymentconsenttype?: string
  count?: number | string
}

// ── Processed UI shapes ───────────────────────────────────────────────────
// One collapsible group of insurance endpoints, keyed by insurance type (plus a
// 'general' group for consents). Only populated for the `insurance` family.
interface InsuranceGroup {
  key: InsuranceType | typeof INSURANCE_GENERAL_KEY
  label: string
  endpoints: string[]
  expanded: boolean
}

interface LfiVersion {
  version: string
  endpoints: string[]
  paymentTypes: string[]
  accountSubTypes: string[]
  // Account Information only: over-limit fee (AED) per over-quota data request.
  // Empty/absent in the directory is normalised to '0'.
  overLimitFees: string
  // Insurance-only: the types offered (for pills) and per-type endpoint groups
  // (for collapsible sub-groups). Empty for banking families.
  insuranceTypes: InsuranceType[]
  insuranceGroups: InsuranceGroup[]
  expanded: boolean
}

interface LfiService {
  familyKey: FamilyKey
  label: string
  versions: LfiVersion[]
  expanded: boolean
}

interface LfiServer {
  key: string
  name: string
  logo: string
  accountTypes: string[]
  services: LfiService[]
  // Commercial Go-Live Approval, when the directory records one. `goLiveDate`
  // is the approval start date; `goLiveScheduled` marks an approval dated in
  // the future (approved, not yet serving). `isLive` is the headline flag — a
  // passed, unexpired approval.
  goLiveDate: Date | null
  goLiveScheduled: boolean
  isLive: boolean
}

// One rendered group of LFI cards — live first, then those still in production
// testing. Grouping lives in the script so the card markup stays
// single-sourced in the template.
interface ServerGroup {
  key: 'live' | 'testing'
  title: string
  note: string
  servers: LfiServer[]
}

interface TppEndpoint {
  key: string
  count: number
}

interface TppVersion {
  version: string
  requests: number
  endpoints: TppEndpoint[]
  expanded: boolean
}

interface TppService {
  familyKey: FamilyKey
  label: string
  versions: TppVersion[]
  expanded: boolean
}

interface TppConsentType {
  type: string
  count: number
}

interface TppCard {
  name: string
  lfis: string[]
  totalRequests: number
  totalPayments: number
  services: TppService[]
  consentTypes: TppConsentType[]
}

// ── State ──────────────────────────────────────────────────────────────────
//
// `mode` and `family` are bound to the URL via the shared `useUrlSearchParam`
// composable (auto-imported from `src/composables/`, extracted in 5b-iii from
// the inline `readFromUrl` / `writeToUrl` pair this file used previously).
// The composable seeds from `window.location.search` on mount and writes via
// `history.replaceState` on change; default values are removed from the URL.
const MODE_OPTIONS: readonly Mode[] = ['lfi-bank', 'lfi-insurer', 'tpp']
const FAMILY_OPTIONS: readonly FamilyFilter[] = [
  'all',
  ...FAMILY_KEYS,
  ...INSURANCE_TYPES,
]

const modeParam = useUrlSearchParam<Mode>('type', 'lfi-bank', { allowed: MODE_OPTIONS })
const familyParam = useUrlSearchParam<FamilyFilter>('family', 'all', { allowed: FAMILY_OPTIONS })

const mode = modeParam.value
const family = familyParam.value

// Any LFI tab (bank or insurer) vs the TPP tab.
const isLfi = computed<boolean>(() => mode.value !== 'tpp')

// Which family filters are valid in a given mode. `family` is shared across
// modes, so switching tabs may leave an out-of-scope value (e.g. 'payment'
// selected, then switch to Insurer) — `setMode` resets to 'all' in that case.
function validFamilies(m: Mode): readonly FamilyFilter[] {
  if (m === 'lfi-insurer') return ['all', ...INSURANCE_TYPES]
  if (m === 'lfi-bank') return ['all', ...BANKING_FAMILIES]
  return ['all', ...FAMILY_KEYS]
}

// Filter chips shown for the active mode.
const filterChips = computed<{ key: FamilyFilter; label: string }[]>(() => {
  if (mode.value === 'lfi-insurer')
    return INSURANCE_TYPES.map((t) => ({ key: t, label: INSURANCE_TYPE_LABELS[t] }))
  const keys = mode.value === 'lfi-bank' ? BANKING_FAMILIES : FAMILY_KEYS
  return keys.map((k) => ({ key: k, label: FAMILY_LABELS[k] }))
})

function filterLabel(f: FamilyFilter): string {
  if (f === 'all') return FAMILY_LABELS.all
  if ((INSURANCE_TYPES as readonly string[]).includes(f))
    return INSURANCE_TYPE_LABELS[f as InsuranceType]
  return FAMILY_LABELS[f as FamilyKey]
}

const activeInsuranceType = computed<InsuranceType | null>(() =>
  (INSURANCE_TYPES as readonly string[]).includes(family.value)
    ? (family.value as InsuranceType)
    : null,
)

const loading = ref<boolean>(true)
const error = ref<string | null>(null)

const processedLfis = ref<LfiServer[]>([])
const apiLog = ref<ApiLogRow[]>([])
const paymentsLog = ref<PaymentsLogRow[]>([])

// ── Lifecycle ──────────────────────────────────────────────────────────────
onMounted(async () => {
  try {
    const [lfiRes, apiRes, payRes] = await Promise.all([
      fetch('https://data.directory.openfinance.ae/participants').then(
        (r) => r.json() as Promise<unknown>,
      ),
      loadApiLog().catch(() => [] as unknown),
      fetch('/api/payments-log.json')
        .then((r) => r.json() as Promise<unknown>)
        .catch(() => [] as unknown),
    ])
    processedLfis.value = processLfis(lfiRes)
    apiLog.value = Array.isArray(apiRes) ? (apiRes as ApiLogRow[]) : []
    paymentsLog.value = Array.isArray(payRes) ? (payRes as PaymentsLogRow[]) : []
  } catch (e: unknown) {
    error.value = e instanceof Error ? e.message : String(e)
  } finally {
    loading.value = false
  }
})

function setMode(m: Mode): void {
  if (!validFamilies(m).includes(family.value)) familyParam.set('all')
  modeParam.set(m)
}
function setFamily(f: FamilyFilter): void {
  familyParam.set(f)
}

// ── TPP service expansion ─────────────────────────────────────────────────
// `filteredTpps` is a computed that returns FRESH plain-JS TppCard objects on
// every recomputation (whenever family or source data changes). Mutating
// `svc.expanded` directly on those plain objects is not tracked by Vue's
// reactivity AND would be lost on the next recomputation. State lives in a
// reactive Set keyed by `${tppName}|${familyKey}` so it both (a) triggers
// re-renders and (b) survives filter changes.
const expandedTppServices = reactive<Set<string>>(new Set<string>())

function isTppServiceExpanded(tppName: string, familyKey: FamilyKey): boolean {
  return expandedTppServices.has(`${tppName}|${familyKey}`)
}
function toggleTppService(tppName: string, familyKey: FamilyKey): void {
  const k = `${tppName}|${familyKey}`
  if (expandedTppServices.has(k)) expandedTppServices.delete(k)
  else expandedTppServices.add(k)
}

// ── LFI processing ─────────────────────────────────────────────────────────
function processLfis(data: unknown): LfiServer[] {
  const out: LfiServer[] = []
  const orgs: DirectoryOrg[] = Array.isArray(data) ? (data as DirectoryOrg[]) : []
  for (const org of orgs) {
    if (!org.AuthorisationServers?.length) continue
    for (const server of org.AuthorisationServers) {
      const serviceMap = new Map<FamilyKey, LfiVersion[]>()
      for (const resource of server.ApiResources || []) {
        const key = resource.ApiFamilyType
        if (!key || !(FAMILY_KEYS as readonly string[]).includes(key)) continue
        const familyKey = key as FamilyKey
        if (!serviceMap.has(familyKey)) serviceMap.set(familyKey, [])

        const rawEndpoints =
          resource.ApiDiscoveryEndpoints?.map((ep) => ep.ApiEndpoint || '') || []
        const normalized = rawEndpoints
          .map((url) => normalizeEndpoint(url, resource.ApiVersion))
          .filter((p, i, arr) => arr.indexOf(p) === i)

        const sortedEndpoints = sortEndpoints(familyKey, normalized)
        serviceMap.get(familyKey)!.push({
          version: resource.ApiVersion || '',
          endpoints: sortedEndpoints,
          paymentTypes:
            familyKey === 'payment' ? getPaymentTypes(resource.ApiMetadata) : [],
          accountSubTypes:
            familyKey === 'account-information'
              ? resource.ApiMetadata?.AccountSubType || []
              : [],
          overLimitFees:
            familyKey === 'account-information'
              ? formatOverLimitFees(resource.ApiMetadata?.OverLimitFees)
              : '',
          insuranceTypes:
            familyKey === 'insurance' ? insuranceTypesOf(sortedEndpoints) : [],
          insuranceGroups:
            familyKey === 'insurance' ? buildInsuranceGroups(sortedEndpoints) : [],
          expanded: false,
        })
      }
      if (serviceMap.size === 0) continue

      const goLive = goLiveOf(server)

      const services: LfiService[] = []
      for (const [familyKey, versions] of serviceMap) {
        services.push({
          familyKey,
          label: FAMILY_LABELS[familyKey],
          versions: versions.sort((a, b) => a.version.localeCompare(b.version)),
          expanded: false,
        })
      }
      services.sort((a, b) => a.label.localeCompare(b.label))

      out.push({
        key: `${org.OrganisationId || org.OrganisationName || ''}::${
          server.AuthorisationServerId || server.CustomerFriendlyName || ''
        }`,
        name: server.CustomerFriendlyName || org.OrganisationName || '',
        logo:
          server.CustomerFriendlyLogoUri ||
          'https://data.directory.openfinance.ae/logos/placeholder-logo.png',
        accountTypes: server.Flags?.AccountType || [],
        services,
        goLiveDate: goLive?.date || null,
        goLiveScheduled: goLive?.scheduled === true,
        isLive: !!goLive && !goLive.scheduled,
      })
    }
  }
  return out
}

// The directory serves certification dates as DD/MM/YYYY.
function parseDirectoryDate(value: string | undefined): Date | null {
  const m = String(value || '').match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/)
  if (!m) return null
  const d = new Date(Date.UTC(Number(m[3]), Number(m[2]) - 1, Number(m[1])))
  return Number.isNaN(d.getTime()) ? null : d
}

// Earliest certified, unexpired Commercial Go-Live Approval on a server.
// Returns null when the server has never been approved for go-live.
function goLiveOf(server: DirectoryServer): { date: Date; scheduled: boolean } | null {
  const now = Date.now()
  let earliest: Date | null = null
  for (const cert of server.AuthorisationServerCertifications || []) {
    if (cert.ProfileType !== GO_LIVE_PROFILE_TYPE) continue
    if ((cert.CertificationStatus || cert.Status || '') !== 'Certified') continue
    const start = parseDirectoryDate(cert.CertificationStartDate)
    if (!start) continue
    const expiry = parseDirectoryDate(cert.CertificationExpirationDate)
    if (expiry && expiry.getTime() < now) continue
    if (!earliest || start.getTime() < earliest.getTime()) earliest = start
  }
  if (!earliest) return null
  return { date: earliest, scheduled: earliest.getTime() > now }
}

const GO_LIVE_DATE_FORMAT = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
})

function formatGoLive(d: Date | null): string {
  return d ? GO_LIVE_DATE_FORMAT.format(d) : ''
}

// Strip everything up to and including the /v{version}/ segment, leaving the
// path-after-version (e.g. ".../account-information/v2.1/parties" → "/parties").
// Falls back to a generic /vX.Y/ regex if the exact version isn't found, then
// to the original string.
function normalizeEndpoint(url: string, version: string | undefined): string {
  const s = String(url || '')
  if (version) {
    const marker = `/v${version}/`
    const idx = s.indexOf(marker)
    if (idx >= 0) return '/' + s.slice(idx + marker.length)
  }
  const match = s.match(/\/v\d[\d.]*\/(.*)$/i)
  return match ? '/' + match[1] : s
}

function sortEndpoints(familyKey: FamilyKey, endpoints: string[]): string[] {
  const order = ENDPOINT_ORDER[familyKey] || []
  return [...endpoints].sort((a, b) => {
    const ai = order.indexOf(a)
    const bi = order.indexOf(b)
    if (ai === -1 && bi === -1) return a.localeCompare(b)
    if (ai === -1) return 1
    if (bi === -1) return -1
    return ai - bi
  })
}

// Map an insurance endpoint to its type via the path prefix, e.g.
// `/motor-insurance-policies` → 'motor'. Returns null for non-type-specific
// endpoints like `/insurance-consents`.
function insuranceTypeOf(endpoint: string): InsuranceType | null {
  const m = endpoint.match(/^\/(health|motor|travel|home)-insurance-/)
  return m ? (m[1] as InsuranceType) : null
}

// Distinct insurance types present in a set of endpoints, in canonical order.
function insuranceTypesOf(endpoints: string[]): InsuranceType[] {
  const present = new Set<InsuranceType>()
  for (const ep of endpoints) {
    const t = insuranceTypeOf(ep)
    if (t) present.add(t)
  }
  return INSURANCE_TYPES.filter((t) => present.has(t))
}

// Group insurance endpoints into per-type collapsible groups (canonical type
// order, with the non-type-specific 'general' group last).
function buildInsuranceGroups(endpoints: string[]): InsuranceGroup[] {
  const byType = new Map<InsuranceType | typeof INSURANCE_GENERAL_KEY, string[]>()
  for (const ep of endpoints) {
    const key = insuranceTypeOf(ep) || INSURANCE_GENERAL_KEY
    if (!byType.has(key)) byType.set(key, [])
    byType.get(key)!.push(ep)
  }
  const groups: InsuranceGroup[] = []
  for (const t of INSURANCE_TYPES) {
    if (byType.has(t))
      groups.push({ key: t, label: INSURANCE_TYPE_LABELS[t], endpoints: byType.get(t)!, expanded: false })
  }
  if (byType.has(INSURANCE_GENERAL_KEY))
    groups.push({
      key: INSURANCE_GENERAL_KEY,
      label: INSURANCE_GENERAL_LABEL,
      endpoints: byType.get(INSURANCE_GENERAL_KEY)!,
      expanded: false,
    })
  return groups
}

// Normalise the account-information over-limit fee: an empty or absent value in
// the directory is displayed as '0'.
function formatOverLimitFees(v: string | undefined): string {
  const s = (v || '').trim()
  return s === '' ? '0' : s
}

// The supported beneficiary models for a consent type that carries the
// Open/Single/Multiple beneficiary flags (Variable On-Demand, Delegated SCA),
// in directory-declared order.
function beneficiaryModes(
  m:
    | {
        SingleBeneficiarySupported?: boolean
        MultipleBeneficiariesSupported?: boolean
        OpenBeneficiariesSupported?: boolean
      }
    | undefined,
): string[] {
  if (!m) return []
  const modes: string[] = []
  if (m.OpenBeneficiariesSupported) modes.push('Open')
  if (m.SingleBeneficiarySupported) modes.push('Single')
  if (m.MultipleBeneficiariesSupported) modes.push('Multiple')
  return modes
}

function getPaymentTypes(meta: DirectoryApiMetadata | undefined): string[] {
  if (!meta) return []
  const types: string[] = []
  if (meta.SingleInstantPayment?.Supported) types.push('Single Instant')
  if (meta.FixedOnDemand?.Supported) types.push('Fixed On-Demand')
  if (meta.FixedPeriodicSchedule?.Supported) types.push('Fixed Periodic')
  if (meta.FixedDefinedSchedule?.Supported) types.push('Fixed Defined Schedule')
  const vod = beneficiaryModes(meta.VariableOnDemand)
  if (vod.length) types.push(`Variable On-Demand · ${vod.join(', ')}`)
  if (meta.VariablePeriodicSchedule?.Supported) types.push('Variable Periodic')
  if (meta.VariableDefinedSchedule?.Supported)
    types.push('Variable Defined Schedule')
  const dsca = beneficiaryModes(meta.DelegatedAuthentication)
  if (dsca.length) types.push(`Delegated SCA · ${dsca.join(', ')}`)
  return types
}

function isBankingFamily(k: FamilyKey): boolean {
  return (BANKING_FAMILIES as readonly string[]).includes(k)
}
function serverHasBanking(s: LfiServer): boolean {
  return s.services.some((svc) => isBankingFamily(svc.familyKey))
}
function serverInsuranceService(s: LfiServer): LfiService | undefined {
  return s.services.find((svc) => svc.familyKey === 'insurance')
}
function serverInsuranceTypes(s: LfiServer): InsuranceType[] {
  const svc = serverInsuranceService(s)
  if (!svc) return []
  const present = new Set<InsuranceType>()
  for (const v of svc.versions) for (const t of v.insuranceTypes) present.add(t)
  return INSURANCE_TYPES.filter((t) => present.has(t))
}

// Unfiltered sector totals — drive the tab counts so they stay stable as the
// filter row changes.
const bankServers = computed<LfiServer[]>(() =>
  processedLfis.value.filter(serverHasBanking),
)
const insurerServers = computed<LfiServer[]>(() =>
  processedLfis.value.filter((s) => !!serverInsuranceService(s)),
)

// Filtered servers for the active LFI tab.
const visibleServers = computed<LfiServer[]>(() => {
  if (mode.value === 'lfi-insurer') {
    const t = activeInsuranceType.value
    return insurerServers.value.filter(
      (s) => !t || serverInsuranceTypes(s).includes(t),
    )
  }
  if (mode.value === 'lfi-bank') {
    return bankServers.value.filter(
      (s) =>
        family.value === 'all' ||
        s.services.some((svc) => svc.familyKey === family.value),
    )
  }
  return []
})

function visibleServices(server: LfiServer): LfiService[] {
  if (mode.value === 'lfi-insurer') {
    const svc = serverInsuranceService(server)
    return svc ? [svc] : []
  }
  const banking = server.services.filter((svc) => isBankingFamily(svc.familyKey))
  return family.value === 'all'
    ? banking
    : banking.filter((svc) => svc.familyKey === family.value)
}

// Insurance groups within a version, filtered to the active type when one is
// selected (the 'general'/consents group always shows).
function visibleInsuranceGroups(v: LfiVersion): InsuranceGroup[] {
  const t = activeInsuranceType.value
  if (!t) return v.insuranceGroups
  return v.insuranceGroups.filter(
    (g) => g.key === t || g.key === INSURANCE_GENERAL_KEY,
  )
}

// Headline numbers count live participants only — the tab counts are the
// unfiltered live totals per sector, the masthead count respects the active
// filter.
const lfiServerCount = computed<number>(
  () => visibleServers.value.filter((s) => s.isLive).length,
)
const bankServerCount = computed<number>(
  () => bankServers.value.filter((s) => s.isLive).length,
)
const insurerServerCount = computed<number>(
  () => insurerServers.value.filter((s) => s.isLive).length,
)

const sectorNoun = computed<string>(() =>
  mode.value === 'lfi-insurer' ? 'Insurers' : 'Banks',
)

// Live cards sort by go-live date (earliest first); production-testing cards
// sort by name.
const serverGroups = computed<ServerGroup[]>(() => {
  const live = visibleServers.value
    .filter((s) => s.isLive)
    .sort((a, b) => (a.goLiveDate?.getTime() || 0) - (b.goLiveDate?.getTime() || 0))
  const testing = visibleServers.value
    .filter((s) => !s.isLive)
    .sort((a, b) => a.name.localeCompare(b.name))

  const groups: ServerGroup[] = []
  if (live.length)
    groups.push({
      key: 'live',
      title: 'Live',
      note: `${sectorNoun.value} holding a Commercial Go-Live Approval in the directory — fully live to all customers and all licensed, live TPPs.`,
      servers: live,
    })
  if (testing.length)
    groups.push({
      key: 'testing',
      title: 'Production testing',
      note: `${sectorNoun.value} deployed and serving these APIs in the production environment, working towards Commercial Go-Live Approval. Not yet open to all customers and all TPPs.`,
      servers: testing,
    })
  return groups
})

// ── TPP processing ─────────────────────────────────────────────────────────
// Payment family uses a richer payment-specific log; everything else uses the
// generic API log. The toggle stays consistent regardless of the active mode,
// so the TPP-tab count always reflects what users would see if they switched.
const paymentOnly = computed<boolean>(() => family.value === 'payment')

const filteredTpps = computed<TppCard[]>(() =>
  paymentOnly.value
    ? processPayments(paymentsLog.value)
    : processApiLog(apiLog.value),
)

const tppCount = computed<number>(() => filteredTpps.value.length)

interface TppApiAccumulator {
  name: string
  familyVersions: Map<FamilyKey, Map<string, { requests: number; endpoints: Map<string, number> }>>
  lfis: Set<string>
  totalRequests: number
}

function processApiLog(data: ApiLogRow[]): TppCard[] {
  if (!Array.isArray(data) || data.length === 0) return []

  const allowedPrefixes: string[] =
    family.value === 'all'
      ? Object.values(FAMILY_URL_PREFIX)
      : [FAMILY_URL_PREFIX[family.value as FamilyKey]].filter(Boolean)

  const latestMs = data.reduce<number>((max, row) => {
    const t = Date.parse(row.date || '')
    return t > max ? t : max
  }, 0)
  const cutoffMs = latestMs - (DAYS_WINDOW - 1) * 24 * 60 * 60 * 1000

  const tppMap = new Map<string, TppApiAccumulator>()

  for (const row of data) {
    if (!row.tppname || !row.tppname.trim()) continue
    const ts = Date.parse(row.date || '')
    if (ts < cutoffMs) continue

    const parts = (row.url || '').split('/')
    if (parts[0] !== 'open-finance') continue

    const urlFamily = parts[1] || ''
    const version = parts[2] || ''
    const endpointPath = '/' + parts.slice(3).join('/')
    if (!urlFamily || !allowedPrefixes.includes(urlFamily)) continue

    const familyKey = (Object.keys(FAMILY_URL_PREFIX) as FamilyKey[]).find(
      (k) => FAMILY_URL_PREFIX[k] === urlFamily,
    )
    if (!familyKey) continue

    if (!tppMap.has(row.tppname)) {
      tppMap.set(row.tppname, {
        name: row.tppname,
        familyVersions: new Map(),
        lfis: new Set(),
        totalRequests: 0,
      })
    }
    const tpp = tppMap.get(row.tppname)!
    if (row.lfinamekey) tpp.lfis.add(row.lfinamekey)
    tpp.totalRequests += row.totalapicalls || 0

    if (!tpp.familyVersions.has(familyKey))
      tpp.familyVersions.set(familyKey, new Map())
    const versions = tpp.familyVersions.get(familyKey)!
    if (!versions.has(version)) {
      versions.set(version, { requests: 0, endpoints: new Map() })
    }
    const ve = versions.get(version)!
    ve.requests += row.totalapicalls || 0
    const epKey = `${row.httpmethod || ''} ${endpointPath}`
    ve.endpoints.set(epKey, (ve.endpoints.get(epKey) || 0) + (row.totalapicalls || 0))
  }

  return [...tppMap.values()]
    .map<TppCard>((t) => ({
      name: t.name,
      lfis: [...t.lfis].sort(),
      totalRequests: t.totalRequests,
      totalPayments: 0,
      consentTypes: [],
      services: FAMILY_KEYS.filter((k) => t.familyVersions.has(k)).map<TppService>(
        (k) => ({
          familyKey: k,
          label: FAMILY_LABELS[k],
          versions: [...t.familyVersions.get(k)!.entries()]
            .map<TppVersion>(([version, payload]) => ({
              version,
              requests: payload.requests,
              endpoints: sortTppEndpoints(
                k,
                [...payload.endpoints.entries()].map<TppEndpoint>(([key, count]) => ({
                  key,
                  count,
                })),
              ),
              expanded: false,
            }))
            .sort((a, b) => a.version.localeCompare(b.version)),
          expanded: false,
        }),
      ),
    }))
    .sort((a, b) => b.totalRequests - a.totalRequests)
}

function sortTppEndpoints(
  familyKey: FamilyKey,
  endpoints: TppEndpoint[],
): TppEndpoint[] {
  const order = ENDPOINT_ORDER[familyKey] || []
  return [...endpoints].sort((a, b) => {
    const aPath = a.key.split(' ').slice(1).join(' ')
    const bPath = b.key.split(' ').slice(1).join(' ')
    const ai = order.indexOf(aPath)
    const bi = order.indexOf(bPath)
    if (ai === -1 && bi === -1) return b.count - a.count
    if (ai === -1) return 1
    if (bi === -1) return -1
    return ai - bi
  })
}

interface TppPaymentAccumulator {
  name: string
  lfis: Set<string>
  consentTypes: Map<string, number>
  totalPayments: number
}

function processPayments(data: PaymentsLogRow[]): TppCard[] {
  if (!Array.isArray(data) || data.length === 0) return []

  const latestMs = data.reduce<number>((max, row) => {
    const t = Date.parse(row.date || '')
    return t > max ? t : max
  }, 0)
  const cutoffMs = latestMs - (DAYS_WINDOW - 1) * 24 * 60 * 60 * 1000

  const tppMap = new Map<string, TppPaymentAccumulator>()

  for (const row of data) {
    if (!row.tppname || !row.tppname.trim()) continue
    const ts = Date.parse(row.date || '')
    if (ts < cutoffMs) continue
    const count = Number(row.count) || 0

    if (!tppMap.has(row.tppname)) {
      tppMap.set(row.tppname, {
        name: row.tppname,
        lfis: new Set(),
        consentTypes: new Map(),
        totalPayments: 0,
      })
    }
    const tpp = tppMap.get(row.tppname)!
    if (row.lfinamekey) tpp.lfis.add(row.lfinamekey)
    tpp.totalPayments += count

    const type = row.paymentconsenttype || 'Unknown'
    tpp.consentTypes.set(type, (tpp.consentTypes.get(type) || 0) + count)
  }

  return [...tppMap.values()]
    .map<TppCard>((t) => ({
      name: t.name,
      lfis: [...t.lfis].sort(),
      totalRequests: 0,
      totalPayments: t.totalPayments,
      services: [],
      consentTypes: [...t.consentTypes.entries()]
        .map<TppConsentType>(([type, count]) => ({ type, count }))
        .sort((a, b) => b.count - a.count),
    }))
    .sort((a, b) => b.totalPayments - a.totalPayments)
}

// ── Display helpers ────────────────────────────────────────────────────────
// Latest row date in the active TPP log — null when there's nothing loaded.
function latestDateFrom(log: { date?: string }[]): Date | null {
  if (!Array.isArray(log) || log.length === 0) return null
  let max = 0
  for (const row of log) {
    const t = Date.parse(row.date || '')
    if (t > max) max = t
  }
  return max > 0 ? new Date(max) : null
}

const updatedLabel = computed<string>(() => {
  if (loading.value) return 'LOADING…'
  if (isLfi.value) return 'LIVE FROM DIRECTORY'
  const d = latestDateFrom(paymentOnly.value ? paymentsLog.value : apiLog.value)
  if (!d) return 'NO DATA'
  const formatted = d
    .toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
    .toUpperCase()
  return `UPDATED ${formatted}`
})

const summaryCount = computed<number | string>(() => {
  if (loading.value) return '—'
  return isLfi.value ? lfiServerCount.value : tppCount.value
})

const summaryUnit = computed<string>(() => {
  if (mode.value === 'lfi-bank') {
    const n = lfiServerCount.value
    return n === 1 ? 'live bank' : 'live banks'
  }
  if (mode.value === 'lfi-insurer') {
    const n = lfiServerCount.value
    return n === 1 ? 'live insurer' : 'live insurers'
  }
  const n = tppCount.value
  return n === 1 ? 'TPP live' : 'TPPs live'
})

const summarySub = computed<string>(() => {
  if (mode.value === 'lfi-bank') {
    const familyText =
      family.value === 'all' ? 'Open Finance' : filterLabel(family.value)
    return `Banks running ${familyText} in the production environment. Those holding a Commercial Go-Live Approval are fully live to all customers and all licensed, live TPPs; the rest are in production testing. Data pulled directly from the Nebras Open Finance directory.`
  }
  if (mode.value === 'lfi-insurer') {
    const typeText = activeInsuranceType.value
      ? `${INSURANCE_TYPE_LABELS[activeInsuranceType.value]} insurance`
      : 'insurance'
    return `Insurers running ${typeText} in the production environment. Those holding a Commercial Go-Live Approval are fully live to all customers and all licensed, live TPPs; the rest are in production testing. Data pulled directly from the Nebras Open Finance directory.`
  }
  const familyText =
    family.value === 'all' ? 'Open Finance' : filterLabel(family.value)
  if (paymentOnly.value) {
    return `Third-party providers who have initiated payments in production through the API Hub in the last ${DAYS_WINDOW} days, broken down by consent type.`
  }
  return `Third-party providers consuming ${familyText} in production through the API Hub in the last ${DAYS_WINDOW} days.`
})

const formatNumber = (n: number): string => Number(n).toLocaleString()
const prettifyConsentType = (s: string): string =>
  String(s).replace(/([a-z])([A-Z])/g, '$1 $2')
</script>

<template>
  <div class="ed-le">

    <!-- ═══════════════════════════════════════════════════════════════════
         Masthead
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ed-le-masthead">
      <div class="ed-le-masthead__inner">

        <div class="ed-le-masthead__meta">
          <div class="ed-le-masthead__label">
            <span class="ed-le-masthead__label-dash" />
            Section &middot; In Production
          </div>
          <div class="ed-le-masthead__updated">{{ updatedLabel }}</div>
        </div>

        <h1 class="ed-le-masthead__title">
          Open Finance<br/>
          in production today.
        </h1>

        <div class="ed-le-masthead__count">
          {{ summaryCount }} <span class="ed-le-masthead__count-unit">{{ summaryUnit }}</span>
        </div>
      </div>

      <p class="ed-le-masthead__sub">
        {{ summarySub }}
      </p>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         Mode + filter controls
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ed-le-controls">
      <div class="ed-le-controls__inner">
        <div class="ed-le-mode" role="tablist" aria-label="View by participant type">
          <button
            type="button"
            role="tab"
            :aria-selected="mode === 'lfi-bank' ? 'true' : 'false'"
            class="ed-le-mode__btn"
            :class="{ 'is-active': mode === 'lfi-bank' }"
            @click="setMode('lfi-bank')"
          >
            LFI (Bank)
            <span class="ed-le-mode__count">{{ bankServerCount }}</span>
          </button>
          <button
            type="button"
            role="tab"
            :aria-selected="mode === 'lfi-insurer' ? 'true' : 'false'"
            class="ed-le-mode__btn"
            :class="{ 'is-active': mode === 'lfi-insurer' }"
            @click="setMode('lfi-insurer')"
          >
            LFI (Insurer)
            <span class="ed-le-mode__count">{{ insurerServerCount }}</span>
          </button>
          <button
            type="button"
            role="tab"
            :aria-selected="mode === 'tpp' ? 'true' : 'false'"
            class="ed-le-mode__btn"
            :class="{ 'is-active': mode === 'tpp' }"
            @click="setMode('tpp')"
          >
            TPPs
            <span class="ed-le-mode__count">{{ tppCount }}</span>
          </button>
        </div>

        <nav
          class="ed-le-filter"
          :aria-label="mode === 'lfi-insurer' ? 'Filter by insurance type' : 'Filter by service'"
        >
          <button
            type="button"
            class="ed-le-filter__btn"
            :class="{ 'is-active': family === 'all' }"
            @click="setFamily('all')"
          >{{ mode === 'lfi-insurer' ? 'All types' : 'All services' }}</button>
          <button
            v-for="chip in filterChips"
            :key="chip.key"
            type="button"
            class="ed-le-filter__btn"
            :class="{ 'is-active': family === chip.key }"
            @click="setFamily(chip.key)"
          >{{ chip.label }}</button>
        </nav>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         Body
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ed-le-body">
      <div class="ed-le-body__inner">

        <div v-if="loading" class="ed-le-loading">
          <div class="ed-le-spinner" />
          Loading live data&hellip;
        </div>

        <div v-else-if="error" class="ed-le-empty">
          <span class="ed-le-empty-kicker">Error</span>
          <h3>Could not load live data</h3>
          <p>{{ error }}</p>
        </div>

        <!-- LFI cards ────────────────────────────────────────────────── -->
        <template v-else-if="isLfi">
          <div v-if="visibleServers.length === 0" class="ed-le-empty">
            <span class="ed-le-empty-kicker">No match</span>
            <h3 v-if="mode === 'lfi-insurer'">
              No insurers offering {{ family === 'all' ? 'insurance' : filterLabel(family) }} yet.
            </h3>
            <h3 v-else>No banks offering {{ family === 'all' ? 'this service' : filterLabel(family) }} yet.</h3>
            <button class="ed-le-clear" @click="setFamily('all')">
              {{ mode === 'lfi-insurer' ? 'Show all types' : 'Show all services' }} &rarr;
            </button>
          </div>

          <template v-else>
          <section
            v-for="group in serverGroups"
            :key="group.key"
            class="ed-le-group"
            :class="`ed-le-group--${group.key}`"
          >
            <header class="ed-le-group__head">
              <h2 class="ed-le-group__title">
                <span
                  v-if="group.key === 'live'"
                  class="ed-le-group__star"
                  aria-hidden="true"
                >&#9733;</span>
                {{ group.title }}
                <span class="ed-le-group__count">{{ group.servers.length }}</span>
              </h2>
              <p class="ed-le-group__note">{{ group.note }}</p>
            </header>

            <div class="ed-le-grid">
            <article
              v-for="server in group.servers"
              :key="server.key"
              class="ed-le-card"
              :class="{ 'ed-le-card--live': server.isLive }"
            >
              <header class="ed-le-card__head">
                <div class="ed-le-card__logo">
                  <img :src="server.logo" :alt="server.name" loading="lazy" />
                </div>
                <div class="ed-le-card__title">
                  <h3>{{ server.name }}</h3>
                  <div
                    v-if="server.goLiveDate"
                    class="ed-le-card__golive"
                    :class="{ 'is-scheduled': server.goLiveScheduled }"
                  >
                    <span class="ed-le-card__golive-star" aria-hidden="true">&#9733;</span>
                    <span>
                      {{ server.goLiveScheduled ? 'Go-live approved for' : 'Live since' }}
                      {{ formatGoLive(server.goLiveDate) }}
                    </span>
                  </div>
                  <div class="ed-le-card__types">
                    <span
                      v-for="t in server.accountTypes"
                      :key="t"
                      class="ed-le-pill ed-le-pill--type"
                    >{{ t }}</span>
                  </div>
                </div>
              </header>

              <ul class="ed-le-card__services">
                <li
                  v-for="svc in visibleServices(server)"
                  :key="svc.familyKey"
                  class="ed-le-card__service"
                  :class="{ 'is-expanded': svc.expanded }"
                >
                  <button
                    type="button"
                    class="ed-le-card__service-head"
                    :aria-expanded="svc.expanded ? 'true' : 'false'"
                    @click="svc.expanded = !svc.expanded"
                  >
                    <span class="ed-le-card__service-name">{{ svc.label }}</span>
                    <span class="ed-le-card__service-versions">
                      {{ svc.versions.map(v => v.version).join(', ') }}
                    </span>
                    <span class="ed-le-chev ed-le-chev--small" :class="{ 'is-open': svc.expanded }">›</span>
                  </button>

                  <div v-if="svc.expanded" class="ed-le-card__service-detail">
                    <div
                      v-for="v in svc.versions"
                      :key="v.version"
                      class="ed-le-card__version"
                    >
                      <!-- Banking families: payment/subtype pills + flat endpoint list -->
                      <template v-if="svc.familyKey !== 'insurance'">
                        <div class="ed-le-card__version-head">
                          <span class="ed-le-card__version-label">{{ v.version }}</span>
                          <span
                            v-for="t in v.paymentTypes"
                            :key="`pt-${t}`"
                            class="ed-le-pill ed-le-pill--meta"
                          >{{ t }}</span>
                          <span
                            v-for="t in v.accountSubTypes"
                            :key="`ast-${t}`"
                            class="ed-le-pill ed-le-pill--subtype"
                          >{{ t }}</span>
                          <span
                            v-if="svc.familyKey === 'account-information'"
                            class="ed-le-pill ed-le-pill--meta"
                          >Over-limit fee: AED {{ v.overLimitFees }}</span>
                        </div>
                        <button
                          v-if="v.endpoints.length"
                          type="button"
                          class="ed-le-card__endpoints-toggle"
                          :aria-expanded="v.expanded ? 'true' : 'false'"
                          @click="v.expanded = !v.expanded"
                        >
                          <span class="ed-le-chev ed-le-chev--small" :class="{ 'is-open': v.expanded }">›</span>
                          {{ v.expanded ? 'Hide' : 'Show' }} endpoints ({{ v.endpoints.length }})
                        </button>
                        <ul v-if="v.expanded" class="ed-le-card__endpoints">
                          <li v-for="ep in v.endpoints" :key="ep">
                            <code>{{ ep }}</code>
                          </li>
                        </ul>
                      </template>

                      <!-- Insurance: type pills + per-type collapsible groups -->
                      <template v-else>
                        <div class="ed-le-card__version-head">
                          <span class="ed-le-card__version-label">{{ v.version }}</span>
                          <span
                            v-for="t in v.insuranceTypes"
                            :key="`it-${t}`"
                            class="ed-le-pill ed-le-pill--subtype"
                          >{{ INSURANCE_TYPE_LABELS[t] }}</span>
                        </div>
                        <div
                          v-for="g in visibleInsuranceGroups(v)"
                          :key="g.key"
                          class="ed-le-card__ins-group"
                        >
                          <button
                            type="button"
                            class="ed-le-card__endpoints-toggle"
                            :aria-expanded="g.expanded ? 'true' : 'false'"
                            @click="g.expanded = !g.expanded"
                          >
                            <span class="ed-le-chev ed-le-chev--small" :class="{ 'is-open': g.expanded }">›</span>
                            {{ g.label }} ({{ g.endpoints.length }})
                          </button>
                          <ul v-if="g.expanded" class="ed-le-card__endpoints">
                            <li v-for="ep in g.endpoints" :key="ep">
                              <code>{{ ep }}</code>
                            </li>
                          </ul>
                        </div>
                      </template>
                    </div>
                  </div>
                </li>
              </ul>
            </article>
            </div>
          </section>
          </template>
        </template>

        <!-- TPP cards ────────────────────────────────────────────────── -->
        <template v-else>
          <div v-if="filteredTpps.length === 0" class="ed-le-empty">
            <span class="ed-le-empty-kicker">No match</span>
            <h3>No TPPs consuming {{ family === 'all' ? 'this service' : filterLabel(family) }} in the last {{ DAYS_WINDOW }} days.</h3>
            <button class="ed-le-clear" @click="setFamily('all')">Show all services &rarr;</button>
          </div>

          <div v-else class="ed-le-grid">
            <article
              v-for="tpp in filteredTpps"
              :key="tpp.name"
              class="ed-le-card ed-le-card--tpp"
            >
              <header class="ed-le-card__head ed-le-card__head--tpp">
                <div class="ed-le-card__title">
                  <div class="ed-le-card__kicker">TPP</div>
                  <h3>{{ tpp.name }}</h3>
                </div>
                <div class="ed-le-card__total">
                  <div class="ed-le-card__total-num">
                    {{ formatNumber(paymentOnly ? tpp.totalPayments : tpp.totalRequests) }}
                  </div>
                  <div class="ed-le-card__total-unit">
                    {{ paymentOnly ? 'payments' : 'requests' }}
                  </div>
                </div>
              </header>

              <div class="ed-le-card__lfis">
                <div class="ed-le-card__lfis-label">Consumed at</div>
                <div class="ed-le-card__lfis-pills">
                  <span
                    v-for="lfi in tpp.lfis"
                    :key="lfi"
                    class="ed-le-pill ed-le-pill--lfi"
                  >{{ lfi }}</span>
                </div>
              </div>

              <!-- Standard mode: services with versions and endpoint counts -->
              <ul v-if="!paymentOnly" class="ed-le-card__services">
                <li
                  v-for="svc in tpp.services"
                  :key="svc.familyKey"
                  class="ed-le-card__service"
                  :class="{ 'is-expanded': isTppServiceExpanded(tpp.name, svc.familyKey) }"
                >
                  <button
                    type="button"
                    class="ed-le-card__service-head"
                    :aria-expanded="isTppServiceExpanded(tpp.name, svc.familyKey) ? 'true' : 'false'"
                    @click="toggleTppService(tpp.name, svc.familyKey)"
                  >
                    <span class="ed-le-card__service-name">{{ svc.label }}</span>
                    <span class="ed-le-card__service-versions">
                      {{ svc.versions.map(v => v.version).join(', ') }}
                    </span>
                    <span class="ed-le-chev ed-le-chev--small" :class="{ 'is-open': isTppServiceExpanded(tpp.name, svc.familyKey) }">›</span>
                  </button>

                  <div v-if="isTppServiceExpanded(tpp.name, svc.familyKey)" class="ed-le-card__service-detail">
                    <div
                      v-for="v in svc.versions"
                      :key="v.version"
                      class="ed-le-card__version"
                    >
                      <div class="ed-le-card__version-head">
                        <span class="ed-le-card__version-label">{{ v.version }}</span>
                        <span class="ed-le-pill ed-le-pill--meta">
                          {{ formatNumber(v.requests) }} requests
                        </span>
                      </div>
                      <ul v-if="v.endpoints.length" class="ed-le-card__endpoints">
                        <li v-for="ep in v.endpoints" :key="ep.key">
                          <code>{{ ep.key }}</code>
                          <span class="ed-le-card__endpoint-count">{{ formatNumber(ep.count) }}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
              </ul>

              <!-- Payment-only mode: consent type breakdown -->
              <ul v-else class="ed-le-card__services">
                <li
                  v-for="ct in tpp.consentTypes"
                  :key="ct.type"
                  class="ed-le-card__service ed-le-card__service--static"
                >
                  <span class="ed-le-card__service-name">{{ prettifyConsentType(ct.type) }}</span>
                  <span class="ed-le-card__endpoint-count">{{ formatNumber(ct.count) }}</span>
                </li>
              </ul>
            </article>
          </div>
        </template>

        <!-- Source note -->
        <aside class="ed-le-source">
          <div class="ed-le-source__icon" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 2" stroke-linecap="round" />
            </svg>
          </div>
          <div class="ed-le-source__text">
            <strong>How live status is determined.</strong>
            Every LFI listed here is deployed in the production environment —
            services and certifications come from the Nebras Open Finance
            production directory. An LFI is marked live once its authorisation
            server holds a certified <em>Commercial Go-Live Approval</em>; the
            approval start date is the go-live date shown on the card.
            Everything else is in production testing. TPP activity is aggregated
            from production API Hub access logs over a rolling
            {{ DAYS_WINDOW }}-day window. All listed institutions are
            CBUAE-licensed.
          </div>
        </aside>

      </div>
    </section>
  </div>
</template>

<style scoped>
.ed-le {
  background: var(--at-bg-cream);
  color: var(--at-navy-deep);
  font-family: var(--at-sans);
  padding-top: 4.25rem;
}

/* ── Masthead ──────────────────────────────────────────────────────────── */
.ed-le-masthead {
  border-bottom: 2px solid var(--at-navy-deep);
  padding: 4rem 2rem 2.5rem;
}

.ed-le-masthead__inner {
  max-width: var(--at-page-max);
  margin: 0 auto;
  display: grid;
  grid-template-columns: 280px 1fr auto;
  gap: 4rem;
  align-items: end;
}

.ed-le-masthead__meta {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.ed-le-masthead__label {
  font-family: var(--at-mono);
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--at-teal);
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.ed-le-masthead__label-dash {
  width: 24px;
  height: 1px;
  background: currentColor;
}

.ed-le-masthead__updated {
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.14em;
  color: var(--at-mute);
}

.ed-le-masthead__title {
  font-family: var(--at-serif);
  font-weight: 500;
  font-size: clamp(2.5rem, 5.5vw, 4.5rem);
  line-height: 0.98;
  letter-spacing: -0.03em;
  margin: 0;
  color: var(--at-navy-deep);
}

.ed-le-masthead__count {
  font-family: var(--at-serif);
  font-size: clamp(2.25rem, 4vw, 3rem);
  font-weight: 500;
  line-height: 1;
  color: var(--at-navy-deep);
  text-align: right;
}

.ed-le-masthead__count-unit {
  display: block;
  font-family: var(--at-mono);
  font-size: 0.65rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--at-mute);
  margin-top: 0.5rem;
  font-weight: 400;
}

.ed-le-masthead__sub {
  max-width: 720px;
  margin: 1.75rem auto 0;
  font-size: 1rem;
  line-height: 1.6;
  color: var(--at-mute-2);
}

/* ── Controls ──────────────────────────────────────────────────────────── */
.ed-le-controls {
  border-bottom: 1px solid var(--at-grid-line);
  background: var(--at-surface);
}

.ed-le-controls__inner {
  max-width: var(--at-page-max);
  margin: 0 auto;
  padding: 1.25rem 2rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.ed-le-mode {
  display: inline-flex;
  border: 1px solid var(--at-grid-line-2);
  background: var(--at-bg-cream);
}

.ed-le-mode__btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.55rem 1.1rem;
  font-family: var(--at-mono);
  font-size: 0.7rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--at-mute-2);
  background: transparent;
  border: 0;
  cursor: pointer;
  transition: color 0.15s, background 0.15s;
}

.ed-le-mode__btn + .ed-le-mode__btn {
  border-left: 1px solid var(--at-grid-line-2);
}

.ed-le-mode__btn:hover {
  color: var(--at-navy-deep);
}

.ed-le-mode__btn.is-active {
  background: var(--at-navy-deep);
  color: var(--at-bg-cream);
}

.ed-le-mode__count {
  font-family: var(--at-mono);
  font-size: 0.62rem;
  padding: 0.1rem 0.45rem;
  background: rgba(0, 23, 56, 0.08);
  color: inherit;
  border-radius: 999px;
}

.ed-le-mode__btn.is-active .ed-le-mode__count {
  background: rgba(255, 255, 255, 0.18);
}

.ed-le-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.ed-le-filter__btn {
  padding: 0.45rem 0.85rem;
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--at-mute-2);
  background: transparent;
  border: 1px solid var(--at-grid-line-2);
  cursor: pointer;
  transition: color 0.15s, background 0.15s, border-color 0.15s;
}

.ed-le-filter__btn:hover {
  color: var(--at-teal-deep);
  border-color: var(--at-teal);
}

.ed-le-filter__btn.is-active {
  background: var(--at-teal);
  border-color: var(--at-teal);
  color: var(--at-surface);
}

/* ── Body ──────────────────────────────────────────────────────────────── */
.ed-le-body {
  padding: 3rem 2rem 5rem;
}

.ed-le-body__inner {
  max-width: var(--at-page-max);
  margin: 0 auto;
}

/* Loading + empty states */
.ed-le-loading {
  text-align: center;
  padding: 4rem 1rem;
  font-family: var(--at-mono);
  font-size: 0.7rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--at-mute);
}

.ed-le-spinner {
  width: 36px;
  height: 36px;
  border: 2px solid rgba(0, 194, 169, 0.25);
  border-top-color: var(--at-teal);
  border-radius: 50%;
  animation: ed-le-spin 0.8s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes ed-le-spin { to { transform: rotate(360deg); } }

.ed-le-empty {
  text-align: center;
  padding: 4rem 1rem;
}

.ed-le-empty-kicker {
  display: inline-block;
  font-family: var(--at-mono);
  font-size: 0.6rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--at-mute);
  margin-bottom: 0.75rem;
}

.ed-le-empty h3 {
  font-family: var(--at-serif);
  font-size: 1.5rem;
  font-weight: 500;
  margin: 0 0 1rem;
  color: var(--at-navy-deep);
}

.ed-le-empty p {
  color: var(--at-mute-2);
  margin: 0 0 1rem;
}

.ed-le-clear {
  font-family: var(--at-mono);
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--at-teal-deep);
  background: transparent;
  border: 0;
  cursor: pointer;
  padding: 0.4rem 0;
}

.ed-le-clear:hover { color: var(--at-navy-deep); }

/* ── LFI groups (live vs production testing) ───────────────────────────── */
.ed-le-group + .ed-le-group {
  margin-top: 3rem;
  padding-top: 2.5rem;
  border-top: 1px solid var(--at-grid-line-2);
}

.ed-le-group__head {
  margin-bottom: 1.5rem;
}

.ed-le-group__title {
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
  font-family: var(--at-serif);
  font-size: 1.5rem;
  font-weight: 500;
  letter-spacing: -0.01em;
  margin: 0 0 0.5rem;
  color: var(--at-navy-deep);
}

.ed-le-group--testing .ed-le-group__title {
  color: var(--at-mute-2);
}

.ed-le-group__star {
  color: var(--at-teal-deep);
  font-size: 1.1rem;
}

.ed-le-group__count {
  font-family: var(--at-mono);
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  padding: 0.15rem 0.5rem;
  background: rgba(0, 39, 127, 0.08);
  color: var(--at-navy-deep);
  font-variant-numeric: tabular-nums;
}

.ed-le-group__note {
  max-width: 640px;
  margin: 0;
  font-size: 0.88rem;
  line-height: 1.55;
  color: var(--at-mute-2);
}

/* LFI grid */
.ed-le-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

.ed-le-card {
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line);
  padding: 1.5rem;
  transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
}

.ed-le-card:hover {
  transform: translateY(-2px);
  border-color: var(--at-grid-line-2);
  box-shadow: 0 8px 28px rgba(0, 39, 127, 0.08);
}

.ed-le-card__head {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid var(--at-grid-line);
}

.ed-le-card__logo {
  flex-shrink: 0;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--at-bg-paper);
  border: 1px solid var(--at-grid-line);
  overflow: hidden;
}

.ed-le-card__logo img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.ed-le-card__title {
  flex: 1;
  min-width: 0;
}

.ed-le-card__title h3 {
  font-family: var(--at-serif);
  font-size: 1.1rem;
  font-weight: 500;
  margin: 0 0 0.4rem;
  color: var(--at-navy-deep);
  letter-spacing: -0.01em;
}

.ed-le-card__types {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
}

/* Commercial Go-Live Approval badge */
.ed-le-card--live {
  border-left: 3px solid var(--at-teal);
}

.ed-le-card__golive {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  margin-bottom: 0.45rem;
  padding: 0.15rem 0.5rem 0.15rem 0.35rem;
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  background: color-mix(in srgb, var(--at-teal) 16%, transparent);
  color: var(--at-teal-deep);
}

.ed-le-card__golive.is-scheduled {
  background: color-mix(in srgb, var(--at-gold) 14%, transparent);
  color: var(--at-gold);
}

.ed-le-card__golive-star {
  font-size: 0.8rem;
  line-height: 1;
}

.ed-le-card__services {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
}

.ed-le-card__service {
  border-bottom: 1px solid var(--at-grid-line);
}

.ed-le-card__service:last-child { border-bottom: 0; }

.ed-le-card__service-head {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto 1.25rem;
  gap: 0.6rem;
  align-items: center;
  padding: 0.55rem 0;
  background: transparent;
  border: 0;
  cursor: pointer;
  text-align: left;
  font: inherit;
  color: inherit;
}

.ed-le-card__service-head:hover .ed-le-card__service-name {
  color: var(--at-teal-deep);
}

.ed-le-card__service-name {
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--at-navy-deep);
  transition: color 0.15s;
}

.ed-le-card__service-versions {
  font-family: var(--at-mono);
  font-size: 0.7rem;
  color: var(--at-mute);
  letter-spacing: 0.04em;
}

.ed-le-card__service-detail {
  padding: 0.5rem 0 0.85rem 0.25rem;
  border-top: 1px dashed var(--at-grid-line);
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.ed-le-card__version + .ed-le-card__version {
  padding-top: 0.6rem;
  border-top: 1px dashed var(--at-grid-line);
}

.ed-le-card__version-head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.35rem;
  margin-bottom: 0.4rem;
}

.ed-le-card__version-label {
  font-family: var(--at-mono);
  font-size: 0.68rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--at-navy-deep);
  padding: 0.15rem 0.4rem;
  background: var(--at-bg-paper);
  border: 1px solid var(--at-grid-line);
  margin-right: 0.25rem;
}

.ed-le-card__endpoints-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  background: transparent;
  border: 0;
  padding: 0.2rem 0;
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--at-teal-deep);
  cursor: pointer;
}

.ed-le-card__endpoints-toggle:hover { color: var(--at-navy-deep); }

.ed-le-card__ins-group + .ed-le-card__ins-group { margin-top: 0.25rem; }

.ed-le-card__endpoints {
  list-style: none;
  margin: 0.3rem 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.ed-le-card__endpoints li {
  padding: 0.15rem 0;
}

.ed-le-card__endpoints code {
  font-family: var(--at-mono);
  font-size: 0.7rem;
  color: var(--at-navy-deep);
  background: transparent;
  word-break: break-all;
}

/* ── Pills ─────────────────────────────────────────────────────────────── */
.ed-le-pill {
  display: inline-block;
  padding: 0.15rem 0.55rem;
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  background: rgba(0, 39, 127, 0.08);
  color: var(--at-navy-deep);
  white-space: nowrap;
}

.ed-le-pill--type {
  background: rgba(0, 39, 127, 0.08);
  color: var(--at-navy-deep);
}

.ed-le-pill--lfi {
  background: rgba(0, 39, 127, 0.08);
  color: var(--at-navy-deep);
}

.ed-le-pill--service {
  background: color-mix(in srgb, var(--at-teal) 18%, transparent);
  color: var(--at-teal-deep);
}

.ed-le-pill--version {
  background: var(--at-bg-paper);
  color: var(--at-mute-2);
  border: 1px solid var(--at-grid-line);
}

.ed-le-pill--consent {
  background: rgba(179, 120, 25, 0.12);
  color: var(--at-gold);
}

.ed-le-pill--meta {
  background: color-mix(in srgb, var(--at-blue) 12%, transparent);
  color: var(--at-blue-deep);
}

.ed-le-pill--subtype {
  background: color-mix(in srgb, var(--at-gold) 14%, transparent);
  color: var(--at-gold);
}

/* Chevron — shared between LFI and TPP cards */
.ed-le-chev {
  font-size: 1rem;
  color: var(--at-mute);
  transition: transform 0.15s;
  justify-self: end;
}

.ed-le-chev--small { font-size: 0.85rem; }
.ed-le-chev.is-open { transform: rotate(90deg); }

/* ── TPP card variant ──────────────────────────────────────────────────── */
.ed-le-card__head--tpp {
  align-items: stretch;
}

.ed-le-card__kicker {
  font-family: var(--at-mono);
  font-size: 0.6rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--at-mute);
  margin-bottom: 0.3rem;
}

.ed-le-card__total {
  text-align: right;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.ed-le-card__total-num {
  font-family: var(--at-serif);
  font-size: 1.85rem;
  font-weight: 500;
  letter-spacing: -0.02em;
  color: var(--at-navy-deep);
  line-height: 1;
  font-variant-numeric: tabular-nums;
}

.ed-le-card__total-unit {
  font-family: var(--at-mono);
  font-size: 0.6rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--at-mute);
  margin-top: 0.35rem;
}

.ed-le-card__lfis {
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--at-grid-line);
}

.ed-le-card__lfis-label {
  font-family: var(--at-mono);
  font-size: 0.6rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--at-mute);
  margin-bottom: 0.45rem;
}

.ed-le-card__lfis-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
}

.ed-le-card__service--static {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 0.6rem;
  align-items: baseline;
  padding: 0.55rem 0;
}

.ed-le-card__endpoint-count {
  font-family: var(--at-mono);
  font-size: 0.72rem;
  font-weight: 500;
  color: var(--at-navy-deep);
  font-variant-numeric: tabular-nums;
  flex-shrink: 0;
}

.ed-le-card__endpoints li {
  display: flex;
  justify-content: space-between;
  gap: 0.6rem;
  align-items: baseline;
}

/* ── Source note ───────────────────────────────────────────────────────── */
.ed-le-source {
  display: flex;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  margin-top: 3rem;
  background: color-mix(in srgb, var(--at-teal) 8%, transparent);
  border: 1px solid color-mix(in srgb, var(--at-teal) 25%, transparent);
}

.ed-le-source__icon {
  flex-shrink: 0;
  color: var(--at-teal-deep);
}

.ed-le-source__text {
  font-size: 0.9rem;
  line-height: 1.55;
  color: var(--at-mute-2);
}

.ed-le-source__text strong {
  color: var(--at-navy-deep);
  font-weight: 600;
}

/* ── Responsive ────────────────────────────────────────────────────────── */
@media (max-width: 960px) {
  .ed-le-masthead {
    padding: 3rem 1.5rem 2rem;
  }

  .ed-le-masthead__inner {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .ed-le-masthead__count {
    text-align: left;
  }

  .ed-le-controls__inner {
    padding: 1rem 1.5rem;
    gap: 1.25rem;
  }

  .ed-le-body {
    padding: 2rem 1.5rem 4rem;
  }

  .ed-le-card__total-num { font-size: 1.5rem; }
}

@media (max-width: 640px) {
  .ed-le-grid { grid-template-columns: 1fr; }
}
</style>
