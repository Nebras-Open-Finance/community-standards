<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  families: {
    type: Array,
    default: () => ['account-information', 'payment', 'confirmation', 'product', 'atm']
  },
  days: {
    type: Number,
    default: 30
  }
})

const tpps = ref([])
const loading = ref(true)
const error = ref(null)

const paymentOnly = computed(
  () => props.families.length === 1 && props.families[0] === 'payment'
)

// Maps the family keys used by LiveAPIs (and the prop) to the URL prefix
// segment in api-log.json. e.g. 'confirmation' -> 'confirmation-of-payee'.
const familyUrlPrefix = {
  'account-information': 'account-information',
  'payment': 'payment',
  'confirmation': 'confirmation-of-payee',
  'product': 'product',
  'atm': 'atm',
}

const familyLabels = {
  'account-information': 'Account Information',
  'payment': 'Payment Initiation',
  'confirmation': 'Confirmation of Payee',
  'product': 'Products & Leads',
  'atm': 'ATM',
}

const prettifyConsentType = (s) =>
  String(s).replace(/([a-z])([A-Z])/g, '$1 $2')

onMounted(async () => {
  try {
    const url = paymentOnly.value ? '/api/payments-log.json' : '/api/api-log.json'
    const response = await fetch(url)
    const data = await response.json()
    tpps.value = paymentOnly.value ? processPayments(data) : processData(data)
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
})

function processPayments(data) {
  const latestMs = data.reduce((max, row) => {
    const t = Date.parse(row.date)
    return t > max ? t : max
  }, 0)
  const cutoffMs = latestMs - (props.days - 1) * 24 * 60 * 60 * 1000

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

  return Array.from(tppMap.values())
    .map((tpp) => ({
      ...tpp,
      lfis: Array.from(tpp.lfis).sort(),
      consentTypes: Array.from(tpp.consentTypes.entries())
        .map(([type, count]) => ({ type, count }))
        .sort((a, b) => b.count - a.count),
    }))
    .sort((a, b) => b.totalPayments - a.totalPayments)
}

function processData(data) {
  const allowedPrefixes = props.families
    .map(f => familyUrlPrefix[f])
    .filter(Boolean)

  // Determine the latest date in the dataset, then keep rows within the
  // rolling window of `props.days` ending on that date.
  const latestMs = data.reduce((max, row) => {
    const t = Date.parse(row.date)
    return t > max ? t : max
  }, 0)
  const cutoffMs = latestMs - (props.days - 1) * 24 * 60 * 60 * 1000

  const tppMap = new Map()

  for (const row of data) {
    if (!row.tppname || !row.tppname.trim()) continue

    const ts = Date.parse(row.date)
    if (ts < cutoffMs) continue

    const parts = row.url.split('/')
    if (parts[0] !== 'open-finance') continue

    const urlFamily = parts[1]
    const version = parts[2]
    const endpointPath = '/' + parts.slice(3).join('/')

    if (!allowedPrefixes.includes(urlFamily)) continue

    const familyKey = Object.keys(familyUrlPrefix)
      .find(k => familyUrlPrefix[k] === urlFamily)
    const serviceName = familyLabels[familyKey]

    if (!tppMap.has(row.tppname)) {
      tppMap.set(row.tppname, {
        name: row.tppname,
        services: {},
        lfis: new Set(),
        totalRequests: 0,
        expanded: false,
      })
    }
    const tpp = tppMap.get(row.tppname)
    tpp.lfis.add(row.lfinamekey)
    tpp.totalRequests += row.totalapicalls

    if (!tpp.services[serviceName]) {
      tpp.services[serviceName] = {}
    }
    if (!tpp.services[serviceName][version]) {
      tpp.services[serviceName][version] = {
        version,
        endpoints: new Map(),
        requests: 0,
        expanded: false,
      }
    }
    const versionEntry = tpp.services[serviceName][version]
    versionEntry.requests += row.totalapicalls
    const endpointKey = `${row.httpmethod} ${endpointPath}`
    versionEntry.endpoints.set(
      endpointKey,
      (versionEntry.endpoints.get(endpointKey) || 0) + row.totalapicalls
    )
  }

  return Array.from(tppMap.values())
    .map(tpp => ({
      ...tpp,
      lfis: Array.from(tpp.lfis).sort(),
      services: Object.fromEntries(
        Object.entries(tpp.services).map(([name, versions]) => [
          name,
          Object.values(versions)
            .map(v => ({
              ...v,
              endpoints: Array.from(v.endpoints.entries())
                .map(([key, count]) => ({ key, count }))
                .sort((a, b) => b.count - a.count),
            }))
            .sort((a, b) => a.version.localeCompare(b.version)),
        ])
      ),
    }))
    .sort((a, b) => b.totalRequests - a.totalRequests)
}

const introText = computed(() => {
  if (paymentOnly.value) {
    return `The following TPPs have initiated payments in the last ${props.days} days:`
  }
  const labels = props.families.map(f => familyLabels[f]).filter(Boolean)
  if (labels.length === 0 || labels.length === Object.keys(familyLabels).length) {
    return `The following TPPs currently consume live Open Finance services (last ${props.days} days):`
  }
  const joined = labels.length === 1
    ? labels[0]
    : labels.slice(0, -1).join(', ') + ' and ' + labels[labels.length - 1]
  return `The following TPPs currently consume live ${joined} services (last ${props.days} days):`
})

const formatNumber = (n) => Number(n).toLocaleString()

const toggleTPP = (tpp) => { tpp.expanded = !tpp.expanded }
const toggleVersion = (v) => { v.expanded = !v.expanded }
</script>

<template>
  <div class="tpp-list">
    <h2 class="tpp-intro">{{ introText }}</h2>

    <div v-if="loading" class="tpp-empty">Loading…</div>
    <div v-else-if="error" class="tpp-empty">Could not load API log: {{ error }}</div>
    <div v-else-if="tpps.length === 0" class="tpp-empty">No TPP activity in the selected window.</div>

    <div v-else-if="paymentOnly" class="tpp-table payment-mode">
      <div class="tpp-table-header">
        <span>TPP</span>
        <span>LFIs Consumed</span>
        <span>Payment Types</span>
        <span class="text-right">Payments</span>
        <span></span>
      </div>

      <template v-for="tpp in tpps" :key="tpp.name">
        <div class="tpp-row" @click="toggleTPP(tpp)" :class="{ 'is-expanded': tpp.expanded }">
          <span class="tpp-name">{{ tpp.name }}</span>
          <span class="tpp-lfis">
            <span v-for="lfi in tpp.lfis" :key="lfi" class="badge badge-lfi">{{ lfi }}</span>
          </span>
          <span class="tpp-services">
            <span v-for="ct in tpp.consentTypes" :key="ct.type" class="badge badge-consent-type">
              {{ prettifyConsentType(ct.type) }}
            </span>
          </span>
          <span class="tpp-requests">{{ formatNumber(tpp.totalPayments) }}</span>
          <span class="toggle-icon" :class="{ 'is-open': tpp.expanded }">›</span>
        </div>

        <div v-if="tpp.expanded" class="tpp-detail">
          <div class="detail-service">
            <div class="detail-service-name">Payments by consent type</div>
            <ul class="endpoints">
              <li v-for="ct in tpp.consentTypes" :key="ct.type">
                <code>{{ prettifyConsentType(ct.type) }}</code>
                <span class="endpoint-count">{{ formatNumber(ct.count) }}</span>
              </li>
            </ul>
          </div>
        </div>
      </template>
    </div>

    <div v-else class="tpp-table">
      <div class="tpp-table-header">
        <span>TPP</span>
        <span>LFIs Consumed</span>
        <span>Services</span>
        <span>Versions</span>
        <span class="text-right">Requests</span>
        <span></span>
      </div>

      <template v-for="tpp in tpps" :key="tpp.name">
        <div class="tpp-row" @click="toggleTPP(tpp)" :class="{ 'is-expanded': tpp.expanded }">
          <span class="tpp-name">{{ tpp.name }}</span>
          <span class="tpp-lfis">
            <span v-for="lfi in tpp.lfis" :key="lfi" class="badge badge-lfi">{{ lfi }}</span>
          </span>
          <span class="tpp-services">
            <span v-for="(_, key) in tpp.services" :key="key" class="badge badge-service">{{ key }}</span>
          </span>
          <span class="tpp-versions">
            <span
              v-for="v in [...new Set(Object.values(tpp.services).flat().map(s => s.version))].sort()"
              :key="v"
              class="badge badge-version"
            >{{ v }}</span>
          </span>
          <span class="tpp-requests">{{ formatNumber(tpp.totalRequests) }}</span>
          <span class="toggle-icon" :class="{ 'is-open': tpp.expanded }">›</span>
        </div>

        <div v-if="tpp.expanded" class="tpp-detail">
          <div v-for="(versions, key) in tpp.services" :key="key" class="detail-service">
            <div class="detail-service-name">{{ key }}</div>
            <div v-for="version in versions" :key="version.version" class="detail-version">
              <div class="detail-version-header" @click.stop="toggleVersion(version)">
                <span class="version-label">{{ version.version }}</span>
                <span class="badge badge-meta">{{ formatNumber(version.requests) }} requests</span>
                <span class="toggle-icon small" :class="{ 'is-open': version.expanded }">›</span>
              </div>
              <ul v-if="version.expanded" class="endpoints">
                <li v-for="ep in version.endpoints" :key="ep.key">
                  <code>{{ ep.key }}</code>
                  <span class="endpoint-count">{{ formatNumber(ep.count) }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.tpp-intro {
  font-size: 1.35rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 0.75rem;
  border-top: none;
  padding-top: 0;
}

.tpp-empty {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  padding: 0.75rem 0;
}

.tpp-table {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  font-size: 0.85rem;
}

.tpp-table-header {
  display: grid;
  grid-template-columns: 1.5fr 2fr 2fr 5rem 5rem 1.5rem;
  gap: 0.5rem;
  padding: 0.4rem 0.75rem;
  background: var(--vp-c-bg-soft);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--vp-c-text-2);
  border-bottom: 1px solid var(--vp-c-divider);
}

.tpp-row {
  display: grid;
  grid-template-columns: 1.5fr 2fr 2fr 5rem 5rem 1.5rem;
  align-items: center;
  padding: 0.4rem 0.75rem;
  cursor: pointer;
  border-bottom: 1px solid var(--vp-c-divider);
  transition: background 0.15s;
  gap: 0.5rem;
}

.tpp-row:last-child {
  border-bottom: none;
}

.tpp-row:hover,
.tpp-row.is-expanded {
  background: var(--vp-c-bg-soft);
}

.tpp-name {
  font-weight: 500;
  color: var(--vp-c-text-1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tpp-lfis,
.tpp-services {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.tpp-versions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.2rem;
}

.tpp-requests {
  text-align: right;
  font-variant-numeric: tabular-nums;
  color: var(--vp-c-text-1);
  font-weight: 500;
}

.text-right {
  text-align: right;
}

.badge {
  display: inline-block;
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 500;
  white-space: nowrap;
}

.badge-lfi {
  background: var(--vp-c-indigo-soft);
  color: var(--vp-c-indigo-1);
}

.badge-service {
  background: var(--vp-c-green-soft);
  color: var(--vp-c-green-1);
}

.badge-version {
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  border: 1px solid var(--vp-c-divider);
  font-weight: 400;
}

.badge-consent-type {
  background: var(--vp-c-yellow-soft);
  color: var(--vp-c-yellow-1);
}

.tpp-table.payment-mode .tpp-table-header,
.tpp-table.payment-mode .tpp-row {
  grid-template-columns: 1.5fr 2fr 2fr 5rem 1.5rem;
}

.toggle-icon {
  font-size: 1rem;
  transition: transform 0.15s;
  color: var(--vp-c-text-3);
  justify-self: end;
}

.toggle-icon.small {
  font-size: 0.85rem;
}

.toggle-icon.is-open {
  transform: rotate(90deg);
}

.tpp-detail {
  padding: 0.5rem 0.75rem 0.75rem 1.5rem;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.detail-service {
  min-width: 240px;
  flex: 1;
}

.detail-service-name {
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--vp-c-text-2);
  margin-bottom: 0.25rem;
}

.detail-version-header {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.3rem;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--vp-c-brand);
  padding: 0.15rem 0;
}

.version-label {
  flex-shrink: 0;
}

.badge-meta {
  background: var(--vp-c-purple-soft);
  color: var(--vp-c-purple-1);
  font-size: 0.65rem;
  font-weight: 500;
}

.detail-version-header:hover {
  color: var(--vp-c-brand-dark);
}

.endpoints {
  list-style: none;
  padding: 0;
  margin: 0.25rem 0 0 0;
}

.endpoints li {
  padding: 0.15rem 0;
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  align-items: baseline;
}

.endpoints code {
  font-family: var(--vp-font-family-mono);
  font-size: 0.72rem;
  color: var(--vp-code-color);
  word-break: break-all;
}

.endpoint-count {
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
  font-variant-numeric: tabular-nums;
  flex-shrink: 0;
}
</style>
