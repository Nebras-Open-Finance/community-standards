<template>
  <div class="ed-le">
    <PageHeader />

    <!-- ═══════════════════════════════════════════════════════════════════
         Masthead
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ed-le-masthead">
      <div class="ed-le-masthead__inner">

        <div class="ed-le-masthead__meta">
          <div class="ed-le-masthead__label">
            <span class="ed-le-masthead__label-dash" />
            Section &middot; Live Ecosystem
          </div>
          <div class="ed-le-masthead__updated">{{ updatedLabel }}</div>
        </div>

        <h1 class="ed-le-masthead__title">
          Open Finance<br/>
          services live today.
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
            :aria-selected="mode === 'lfi' ? 'true' : 'false'"
            class="ed-le-mode__btn"
            :class="{ 'is-active': mode === 'lfi' }"
            @click="setMode('lfi')"
          >
            LFIs
            <span class="ed-le-mode__count">{{ lfiServerCount }}</span>
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

        <nav class="ed-le-filter" aria-label="Filter by service">
          <button
            type="button"
            class="ed-le-filter__btn"
            :class="{ 'is-active': family === 'all' }"
            @click="setFamily('all')"
          >All services</button>
          <button
            v-for="f in FAMILY_KEYS"
            :key="f"
            type="button"
            class="ed-le-filter__btn"
            :class="{ 'is-active': family === f }"
            @click="setFamily(f)"
          >{{ FAMILY_LABELS[f] }}</button>
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
        <template v-else-if="mode === 'lfi'">
          <div v-if="visibleServers.length === 0" class="ed-le-empty">
            <span class="ed-le-empty-kicker">No match</span>
            <h3>No LFIs offering {{ FAMILY_LABELS[family] || 'this service' }} yet.</h3>
            <button class="ed-le-clear" @click="setFamily('all')">Show all services &rarr;</button>
          </div>
          <div v-else class="ed-le-grid">
            <article
              v-for="server in visibleServers"
              :key="server.key"
              class="ed-le-card"
            >
              <header class="ed-le-card__head">
                <div class="ed-le-card__logo">
                  <img :src="server.logo" :alt="server.name" loading="lazy" />
                </div>
                <div class="ed-le-card__title">
                  <h3>{{ server.name }}</h3>
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
                      v{{ svc.versions.map(v => v.version).join(', v') }}
                    </span>
                    <span class="ed-le-chev ed-le-chev--small" :class="{ 'is-open': svc.expanded }">›</span>
                  </button>

                  <div v-if="svc.expanded" class="ed-le-card__service-detail">
                    <div
                      v-for="v in svc.versions"
                      :key="v.version"
                      class="ed-le-card__version"
                    >
                      <div class="ed-le-card__version-head">
                        <span class="ed-le-card__version-label">v{{ v.version }}</span>
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
                    </div>
                  </div>
                </li>
              </ul>
            </article>
          </div>
        </template>

        <!-- TPP cards ────────────────────────────────────────────────── -->
        <template v-else>
          <div v-if="filteredTpps.length === 0" class="ed-le-empty">
            <span class="ed-le-empty-kicker">No match</span>
            <h3>No TPPs consuming {{ FAMILY_LABELS[family] || 'this service' }} in the last {{ DAYS_WINDOW }} days.</h3>
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
                      <div class="ed-le-card__version-head">
                        <span class="ed-le-card__version-label">v{{ v.version }}</span>
                        <span class="ed-le-pill ed-le-pill--meta">
                          {{ formatNumber(v.requests) }} requests
                        </span>
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
            <strong>Live data sources.</strong>
            LFI services come from the Nebras Open Finance directory.
            TPP activity is aggregated from API Hub access logs over a rolling
            {{ DAYS_WINDOW }}-day window. Listed institutions are CBUAE-licensed and
            actively participating in the ecosystem.
          </div>
        </aside>

      </div>
    </section>

    <PageFooter />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import PageHeader from './Components/PageHeader.vue'
import PageFooter from './Components/PageFooter.vue'

// ── Config ─────────────────────────────────────────────────────────────────
const DAYS_WINDOW = 30

const FAMILY_KEYS = [
  'account-information',
  'payment',
  'confirmation',
  'product',
  'atm',
]

const FAMILY_LABELS = {
  'all': 'All services',
  'account-information': 'Account Information',
  'payment': 'Payment Initiation',
  'confirmation': 'Confirmation of Payee',
  'product': 'Products & Leads',
  'atm': 'ATMs',
}

// Maps family keys → URL prefix segment in api-log.json
const FAMILY_URL_PREFIX = {
  'account-information': 'account-information',
  'payment': 'payment',
  'confirmation': 'confirmation-of-payee',
  'product': 'product',
  'atm': 'atm',
}

// Canonical endpoint ordering per family — mirrors the TPP-facing sidebar in
// docs/.vitepress/config/sidebars/tpp.ts so the live ecosystem cards present
// endpoints in the same order developers see them in the docs.
const ENDPOINT_ORDER = {
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
}

// ── State ──────────────────────────────────────────────────────────────────
const mode = ref('lfi')        // 'lfi' | 'tpp'
const family = ref('all')      // 'all' | one of FAMILY_KEYS
const loading = ref(true)
const error = ref(null)

const processedLfis = ref([])  // [{ key, name, logo, accountTypes, services: [...] }]
const apiLog = ref([])         // raw api-log.json
const paymentsLog = ref([])    // raw payments-log.json

// ── Lifecycle ──────────────────────────────────────────────────────────────
onMounted(async () => {
  readFromUrl()
  try {
    const [lfiRes, apiRes, payRes] = await Promise.all([
      fetch('https://data.directory.openfinance.ae/participants').then(r => r.json()),
      fetch('/api/api-log.json').then(r => r.json()).catch(() => []),
      fetch('/api/payments-log.json').then(r => r.json()).catch(() => []),
    ])
    processedLfis.value = processLfis(lfiRes)
    apiLog.value = apiRes
    paymentsLog.value = payRes
  } catch (e) {
    error.value = e.message || String(e)
  } finally {
    loading.value = false
  }
})

watch([mode, family], writeToUrl)

// ── URL <-> state sync ─────────────────────────────────────────────────────
function readFromUrl() {
  if (typeof window === 'undefined') return
  const params = new URLSearchParams(window.location.search)
  const t = params.get('type')
  if (t === 'lfi' || t === 'tpp') mode.value = t
  const f = params.get('family')
  if (f === 'all' || FAMILY_KEYS.includes(f)) family.value = f
}

function writeToUrl() {
  if (typeof window === 'undefined') return
  const url = new URL(window.location.href)
  const sp = url.searchParams
  mode.value === 'lfi' ? sp.delete('type') : sp.set('type', mode.value)
  family.value === 'all' ? sp.delete('family') : sp.set('family', family.value)
  window.history.replaceState({}, '', url.toString())
}

function setMode(m) { mode.value = m }
function setFamily(f) { family.value = f }

// ── LFI processing ─────────────────────────────────────────────────────────
function processLfis(data) {
  const out = []
  for (const org of (data || [])) {
    if (!org.AuthorisationServers?.length) continue
    for (const server of org.AuthorisationServers) {
      const serviceMap = new Map()
      for (const resource of (server.ApiResources || [])) {
        const key = resource.ApiFamilyType
        if (!FAMILY_KEYS.includes(key)) continue
        if (!serviceMap.has(key)) serviceMap.set(key, [])

        const rawEndpoints = resource.ApiDiscoveryEndpoints?.map(ep => ep.ApiEndpoint) || []
        const normalized = rawEndpoints
          .map(url => normalizeEndpoint(url, resource.ApiVersion))
          .filter((p, i, arr) => arr.indexOf(p) === i)

        serviceMap.get(key).push({
          version: resource.ApiVersion,
          endpoints: sortEndpoints(key, normalized),
          paymentTypes: key === 'payment' ? getPaymentTypes(resource.ApiMetadata) : [],
          accountSubTypes: key === 'account-information'
            ? (resource.ApiMetadata?.AccountSubType || [])
            : [],
          expanded: false,
        })
      }
      if (serviceMap.size === 0) continue

      const services = []
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
        key: `${org.OrganisationId || org.OrganisationName}::${server.AuthorisationServerId || server.CustomerFriendlyName}`,
        name: server.CustomerFriendlyName || org.OrganisationName,
        logo: server.CustomerFriendlyLogoUri || 'https://data.directory.openfinance.ae/logos/placeholder-logo.png',
        accountTypes: server.Flags?.AccountType || [],
        services,
      })
    }
  }
  return out
}

// Strip everything up to and including the /v{version}/ segment, leaving the
// path-after-version (e.g. ".../account-information/v2.1/parties" → "/parties").
// Falls back to a generic /vX.Y/ regex if the exact version isn't found, then
// to the original string.
function normalizeEndpoint(url, version) {
  const s = String(url || '')
  if (version) {
    const marker = `/v${version}/`
    const idx = s.indexOf(marker)
    if (idx >= 0) return '/' + s.slice(idx + marker.length)
  }
  const match = s.match(/\/v\d[\d.]*\/(.*)$/i)
  return match ? '/' + match[1] : s
}

function sortEndpoints(familyKey, endpoints) {
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

function getPaymentTypes(meta) {
  if (!meta) return []
  const types = []
  if (meta.SingleInstantPayment?.Supported) types.push('Single Instant')
  if (meta.FixedOnDemand?.Supported) types.push('Fixed On-Demand')
  if (meta.FixedPeriodicSchedule?.Supported) types.push('Fixed Periodic')
  if (meta.FixedDefinedSchedule?.Supported) types.push('Fixed Defined Schedule')
  if (meta.VariableOnDemand?.SingleBeneficiarySupported
      || meta.VariableOnDemand?.MultipleBeneficiariesSupported
      || meta.VariableOnDemand?.OpenBeneficiariesSupported) types.push('Variable On-Demand')
  if (meta.VariablePeriodicSchedule?.Supported) types.push('Variable Periodic')
  if (meta.VariableDefinedSchedule?.Supported) types.push('Variable Defined Schedule')
  if (meta.DelegatedAuthentication?.SingleBeneficiarySupported
      || meta.DelegatedAuthentication?.MultipleBeneficiariesSupported
      || meta.DelegatedAuthentication?.OpenBeneficiariesSupported) types.push('Delegated SCA')
  return types
}

const visibleServers = computed(() =>
  processedLfis.value.filter(s =>
    family.value === 'all' || s.services.some(svc => svc.familyKey === family.value),
  ),
)

function visibleServices(server) {
  return family.value === 'all'
    ? server.services
    : server.services.filter(svc => svc.familyKey === family.value)
}

const lfiServerCount = computed(() => visibleServers.value.length)

// ── TPP processing ─────────────────────────────────────────────────────────
// Payment family uses a richer payment-specific log; everything else uses the
// generic API log. The toggle stays consistent regardless of the active mode,
// so the TPP-tab count always reflects what users would see if they switched.
const paymentOnly = computed(() => family.value === 'payment')

const filteredTpps = computed(() =>
  paymentOnly.value ? processPayments(paymentsLog.value) : processApiLog(apiLog.value),
)

const tppCount = computed(() => filteredTpps.value.length)

function processApiLog(data) {
  if (!Array.isArray(data) || data.length === 0) return []

  const allowedPrefixes = family.value === 'all'
    ? Object.values(FAMILY_URL_PREFIX)
    : [FAMILY_URL_PREFIX[family.value]].filter(Boolean)

  const latestMs = data.reduce((max, row) => {
    const t = Date.parse(row.date)
    return t > max ? t : max
  }, 0)
  const cutoffMs = latestMs - (DAYS_WINDOW - 1) * 24 * 60 * 60 * 1000

  // TPP → familyKey → version → { requests, endpoints: Map<key, count> }
  const tppMap = new Map()

  for (const row of data) {
    if (!row.tppname || !row.tppname.trim()) continue
    const ts = Date.parse(row.date)
    if (ts < cutoffMs) continue

    const parts = (row.url || '').split('/')
    if (parts[0] !== 'open-finance') continue

    const urlFamily = parts[1]
    const version = parts[2]
    const endpointPath = '/' + parts.slice(3).join('/')
    if (!allowedPrefixes.includes(urlFamily)) continue

    const familyKey = Object.keys(FAMILY_URL_PREFIX).find(k => FAMILY_URL_PREFIX[k] === urlFamily)
    if (!familyKey) continue

    if (!tppMap.has(row.tppname)) {
      tppMap.set(row.tppname, {
        name: row.tppname,
        familyVersions: new Map(),
        lfis: new Set(),
        totalRequests: 0,
      })
    }
    const tpp = tppMap.get(row.tppname)
    tpp.lfis.add(row.lfinamekey)
    tpp.totalRequests += row.totalapicalls || 0

    if (!tpp.familyVersions.has(familyKey)) tpp.familyVersions.set(familyKey, new Map())
    const versions = tpp.familyVersions.get(familyKey)
    if (!versions.has(version)) {
      versions.set(version, { requests: 0, endpoints: new Map() })
    }
    const ve = versions.get(version)
    ve.requests += row.totalapicalls || 0
    const epKey = `${row.httpmethod} ${endpointPath}`
    ve.endpoints.set(epKey, (ve.endpoints.get(epKey) || 0) + (row.totalapicalls || 0))
  }

  return [...tppMap.values()]
    .map(t => ({
      name: t.name,
      lfis: [...t.lfis].sort(),
      totalRequests: t.totalRequests,
      services: FAMILY_KEYS
        .filter(k => t.familyVersions.has(k))
        .map(k => ({
          familyKey: k,
          label: FAMILY_LABELS[k],
          versions: [...t.familyVersions.get(k).entries()]
            .map(([version, payload]) => ({
              version,
              requests: payload.requests,
              endpoints: sortTppEndpoints(k, [...payload.endpoints.entries()]
                .map(([key, count]) => ({ key, count }))),
              expanded: false,
            }))
            .sort((a, b) => a.version.localeCompare(b.version)),
          expanded: false,
        })),
    }))
    .sort((a, b) => b.totalRequests - a.totalRequests)
}

function sortTppEndpoints(familyKey, endpoints) {
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

function processPayments(data) {
  if (!Array.isArray(data) || data.length === 0) return []

  const latestMs = data.reduce((max, row) => {
    const t = Date.parse(row.date)
    return t > max ? t : max
  }, 0)
  const cutoffMs = latestMs - (DAYS_WINDOW - 1) * 24 * 60 * 60 * 1000

  const tppMap = new Map()

  for (const row of data) {
    if (!row.tppname || !row.tppname.trim()) continue
    const ts = Date.parse(row.date)
    if (ts < cutoffMs) continue
    const count = Number(row.count) || 0

    if (!tppMap.has(row.tppname)) {
      tppMap.set(row.tppname, {
        name: row.tppname,
        lfis: new Set(),
        consentTypes: new Map(),
        totalPayments: 0,
        expanded: false,
      })
    }
    const tpp = tppMap.get(row.tppname)
    tpp.lfis.add(row.lfinamekey)
    tpp.totalPayments += count

    const type = row.paymentconsenttype || 'Unknown'
    tpp.consentTypes.set(type, (tpp.consentTypes.get(type) || 0) + count)
  }

  return [...tppMap.values()]
    .map(t => ({
      ...t,
      lfis: [...t.lfis].sort(),
      consentTypes: [...t.consentTypes.entries()]
        .map(([type, count]) => ({ type, count }))
        .sort((a, b) => b.count - a.count),
    }))
    .sort((a, b) => b.totalPayments - a.totalPayments)
}

// ── Display helpers ────────────────────────────────────────────────────────
// Latest row date in the active TPP log — null when there's nothing loaded.
function latestDateFrom(log) {
  if (!Array.isArray(log) || log.length === 0) return null
  let max = 0
  for (const row of log) {
    const t = Date.parse(row.date)
    if (t > max) max = t
  }
  return max > 0 ? new Date(max) : null
}

const updatedLabel = computed(() => {
  if (loading.value) return 'LOADING…'
  if (mode.value === 'lfi') return 'LIVE FROM DIRECTORY'
  const d = latestDateFrom(paymentOnly.value ? paymentsLog.value : apiLog.value)
  if (!d) return 'NO DATA'
  const formatted = d.toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  }).toUpperCase()
  return `UPDATED ${formatted}`
})

const summaryCount = computed(() => {
  if (loading.value) return '—'
  return mode.value === 'lfi' ? lfiServerCount.value : tppCount.value
})

const summaryUnit = computed(() => {
  const n = mode.value === 'lfi' ? lfiServerCount.value : tppCount.value
  if (mode.value === 'lfi') return n === 1 ? 'LFI live' : 'LFIs live'
  return n === 1 ? 'TPP active' : 'TPPs active'
})

const summarySub = computed(() => {
  const familyText = family.value === 'all' ? 'Open Finance' : FAMILY_LABELS[family.value]
  if (mode.value === 'lfi') {
    return `Licensed financial institutions currently offering live ${familyText} services through the API Hub. Data pulled directly from the Nebras Open Finance directory.`
  }
  if (paymentOnly.value) {
    return `Third-party providers who have initiated payments through the API Hub in the last ${DAYS_WINDOW} days, broken down by consent type.`
  }
  return `Third-party providers consuming live ${familyText} services through the API Hub in the last ${DAYS_WINDOW} days.`
})

const formatNumber = (n) => Number(n).toLocaleString()
const prettifyConsentType = (s) => String(s).replace(/([a-z])([A-Z])/g, '$1 $2')
</script>

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
  font-size: 0.7rem;
  color: var(--at-mute);
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
