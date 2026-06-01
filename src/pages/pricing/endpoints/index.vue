<route lang="yaml">
meta:
  title: Which endpoints are chargeable?
  isIndex: true
</route>

<script setup lang="ts">
import { ENDPOINT_PRICING, type EndpointFamily, type EndpointPricing } from '@/data/endpoint-pricing'

type FilterValue = 'all' | 'chargeable' | 'free'

interface FilterOption {
  value: FilterValue
  label: string
  count: number
}

interface EndpointGroup {
  family: EndpointFamily
  endpoints: EndpointPricing[]
  chargeableCount: number
}

const FAMILY_ORDER: readonly EndpointFamily[] = [
  'Consent & authorization',
  'Data sharing',
  'Service initiation',
  'Quotes',
  'Confirmation of Payee',
  'ATMs, products, leads',
  'Onboarding & directory',
]

const query = ref<string>('')
const filter = ref<FilterValue>('all')

const totalChargeable: number = ENDPOINT_PRICING.filter((e) => e.chargeable).length
const totalFree: number = ENDPOINT_PRICING.length - totalChargeable

const filterOptions = computed<FilterOption[]>(() => [
  { value: 'all', label: 'All', count: ENDPOINT_PRICING.length },
  { value: 'chargeable', label: 'Chargeable', count: totalChargeable },
  { value: 'free', label: 'Not chargeable', count: totalFree },
])

const visibleEndpoints = computed<readonly EndpointPricing[]>(() => {
  const q = query.value.trim().toLowerCase()
  return ENDPOINT_PRICING.filter((endpoint) => {
    if (filter.value === 'chargeable' && !endpoint.chargeable) return false
    if (filter.value === 'free' && endpoint.chargeable) return false
    if (!q) return true
    return (
      endpoint.path.toLowerCase().includes(q) ||
      endpoint.title.toLowerCase().includes(q) ||
      endpoint.method.toLowerCase().includes(q)
    )
  })
})

const groupedEndpoints = computed<EndpointGroup[]>(() => {
  const groups = new Map<EndpointFamily, EndpointPricing[]>()
  for (const endpoint of visibleEndpoints.value) {
    const existing = groups.get(endpoint.family)
    if (existing) {
      existing.push(endpoint)
    } else {
      groups.set(endpoint.family, [endpoint])
    }
  }
  return [...groups.entries()]
    .sort((a, b) => FAMILY_ORDER.indexOf(a[0]) - FAMILY_ORDER.indexOf(b[0]))
    .map(([family, endpoints]) => ({
      family,
      endpoints: endpoints.slice().sort((a, b) => a.path.localeCompare(b.path)),
      chargeableCount: endpoints.filter((e) => e.chargeable).length,
    }))
})
</script>

<template>
  <div class="ed-cep">
    <section class="ed-cep-hero">
      <div class="ed-cep-hero__inner">
        <div class="ed-cep-hero__label">
          <span class="ed-cep-hero__label-dash" />
          AlTareq &middot; Chargeable endpoints
        </div>
        <h1 class="ed-cep-hero__title">Which endpoints are chargeable?</h1>
        <p class="ed-cep-hero__sub">
          Every TPP&#8209;callable endpoint in the UAE Open Finance standards
          is listed below with its API Hub fee status. Chargeable endpoints
          attract the per&#8209;call API Hub fee defined in
          <a href="/pricing/#nebras-api-fees">Fee&nbsp;01</a>; non&#8209;chargeable
          endpoints are served at no API Hub fee. A small number are
          discounted to <strong>0.5&nbsp;fils</strong> when paired with a
          payment within two hours.
        </p>
        <p class="ed-cep-hero__back">
          <a href="/pricing/">&larr; Back to pricing</a>
        </p>
      </div>
    </section>

    <section class="ed-cep-section">
      <div class="ed-cep-section__inner">
        <div class="ed-cep-controls">
          <div class="ed-cep-controls__search">
            <input
              v-model="query"
              type="search"
              placeholder="Search by path, title or method"
              class="ed-cep-controls__input"
              aria-label="Search endpoints"
            />
          </div>
          <div class="ed-cep-controls__filters" role="tablist">
            <button
              v-for="option in filterOptions"
              :key="option.value"
              type="button"
              class="ed-cep-pill"
              :class="{ 'is-active': filter === option.value }"
              :aria-pressed="filter === option.value"
              @click="filter = option.value"
            >
              {{ option.label }}
              <span class="ed-cep-pill__count">{{ option.count }}</span>
            </button>
          </div>
        </div>

        <div v-if="visibleEndpoints.length === 0" class="ed-cep-empty">
          No endpoints match the current filter.
        </div>

        <div
          v-for="group in groupedEndpoints"
          :key="group.family"
          class="ed-cep-group"
        >
          <div class="ed-cep-group__head">
            <span class="ed-cep-group__name">{{ group.family }}</span>
            <span class="ed-cep-group__meta">
              {{ group.chargeableCount }} chargeable &middot;
              {{ group.endpoints.length - group.chargeableCount }} not chargeable
            </span>
          </div>

          <div class="ed-cep-table">
            <div class="ed-cep-table__head">
              <span>Method</span>
              <span>Endpoint</span>
              <span>Status</span>
            </div>
            <a
              v-for="endpoint in group.endpoints"
              :key="endpoint.docPath"
              :href="`/${endpoint.docPath}`"
              class="ed-cep-table__row"
            >
              <span class="ed-cep-method" :class="`is-${endpoint.method.toLowerCase()}`">
                {{ endpoint.method }}
              </span>
              <span class="ed-cep-endpoint">
                <code>{{ endpoint.path }}</code>
                <span class="ed-cep-endpoint__title">{{ endpoint.title }}</span>
              </span>
              <span class="ed-cep-status">
                <span
                  class="ed-cep-status__pill"
                  :class="endpoint.chargeable ? 'is-chargeable' : 'is-free'"
                >
                  {{ endpoint.chargeable ? 'Chargeable' : 'Not chargeable' }}
                </span>
                <span v-if="endpoint.discountable" class="ed-cep-status__note">
                  0.5 fils when paired with a payment
                </span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.ed-cep {
  background: var(--at-bg-cream);
  color: var(--at-navy-deep);
  font-family: var(--at-sans);
  padding-top: 4.25rem;
}

/* ─── Hero ──────────────────────────────────────────────────────────────── */
.ed-cep-hero {
  background: var(--at-bg-cream);
  border-bottom: 1px solid var(--at-grid-line);
}

.ed-cep-hero__inner {
  max-width: var(--at-page-max);
  margin: 0 auto;
  padding: 4.5rem 2rem 3rem;
}

.ed-cep-hero__label {
  font-family: var(--at-mono);
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--at-teal);
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.ed-cep-hero__label-dash {
  width: 24px;
  height: 1px;
  background: currentColor;
}

.ed-cep-hero__title {
  font-family: var(--at-serif);
  font-size: clamp(2.25rem, 5vw, 3.5rem);
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.03em;
  margin: 0;
  color: var(--at-navy-deep);
}

.ed-cep-hero__sub {
  font-family: var(--at-sans);
  font-size: 1.1rem;
  line-height: 1.6;
  margin: 1.5rem 0 1rem;
  max-width: 50rem;
  color: var(--at-mute-2);
}

.ed-cep-hero__sub strong { color: var(--at-navy-deep); font-weight: 600; }
.ed-cep-hero__sub a { color: var(--at-teal); text-decoration: underline; }

.ed-cep-hero__back {
  margin: 1.5rem 0 0;
  font-family: var(--at-mono);
  font-size: 0.78rem;
  letter-spacing: 0.06em;
}

.ed-cep-hero__back a {
  color: var(--at-mute-2);
  text-decoration: none;
}

.ed-cep-hero__back a:hover { color: var(--at-navy-deep); }

/* ─── Section ───────────────────────────────────────────────────────────── */
.ed-cep-section {
  padding: 3rem 0 5rem;
  background: var(--at-surface);
  border-top: 1px solid var(--at-grid-line);
}

.ed-cep-section__inner {
  max-width: var(--at-page-max);
  margin: 0 auto;
  padding: 0 2rem;
}

/* ─── Controls (search + filter pills) ──────────────────────────────────── */
.ed-cep-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
  align-items: center;
  margin-bottom: 2.25rem;
}

.ed-cep-controls__search { flex: 1 1 18rem; }

.ed-cep-controls__input {
  width: 100%;
  padding: 0.65rem 0.9rem;
  font-family: var(--at-sans);
  font-size: 0.95rem;
  color: var(--at-navy-deep);
  background: var(--at-bg-cream);
  border: 1px solid var(--at-grid-line);
  outline: none;
  transition: border-color 0.15s ease;
}

.ed-cep-controls__input:focus { border-color: var(--at-teal); }

.ed-cep-controls__filters {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.ed-cep-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.45rem 0.9rem;
  font-family: var(--at-mono);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--at-mute-2);
  background: var(--at-bg-cream);
  border: 1px solid var(--at-grid-line);
  cursor: pointer;
  transition: color 0.15s ease, border-color 0.15s ease, background 0.15s ease;
}

.ed-cep-pill:hover { color: var(--at-navy-deep); border-color: var(--at-navy); }

.ed-cep-pill.is-active {
  color: var(--at-bg-cream);
  background: var(--at-navy-deep);
  border-color: var(--at-navy-deep);
}

.ed-cep-pill__count {
  font-family: var(--at-mono);
  font-size: 0.7rem;
  font-weight: 700;
  opacity: 0.85;
}

.ed-cep-empty {
  padding: 2rem;
  text-align: center;
  font-family: var(--at-sans);
  color: var(--at-mute-2);
  background: var(--at-bg-cream);
  border: 1px dashed var(--at-grid-line-2);
}

/* ─── Group ─────────────────────────────────────────────────────────────── */
.ed-cep-group { margin-bottom: 2.5rem; }
.ed-cep-group:last-child { margin-bottom: 0; }

.ed-cep-group__head {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.85rem;
  margin-bottom: 0.75rem;
  padding: 0 0.15rem;
}

.ed-cep-group__name {
  font-family: var(--at-mono);
  font-size: 0.7rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-teal);
}

.ed-cep-group__meta {
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.11em;
  text-transform: uppercase;
  color: var(--at-mute);
  font-weight: 500;
}

/* ─── Table ─────────────────────────────────────────────────────────────── */
.ed-cep-table {
  border: 1px solid var(--at-grid-line);
  background: var(--at-bg-cream);
}

.ed-cep-table__head {
  display: grid;
  grid-template-columns: 5rem 1fr 14rem;
  gap: 1.25rem;
  padding: 0.75rem 1.25rem;
  background: rgba(0, 39, 127, 0.04);
  border-bottom: 1px solid var(--at-grid-line);
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-navy-deep);
}

.ed-cep-table__row {
  display: grid;
  grid-template-columns: 5rem 1fr 14rem;
  gap: 1.25rem;
  padding: 0.95rem 1.25rem;
  border-bottom: 1px solid var(--at-grid-line);
  align-items: center;
  text-decoration: none;
  color: inherit;
  transition: background 0.15s ease;
}

.ed-cep-table__row:last-child { border-bottom: none; }
.ed-cep-table__row:hover { background: rgba(0, 39, 127, 0.03); }

.ed-cep-method {
  font-family: var(--at-mono);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  padding: 0.25rem 0.5rem;
  text-align: center;
  color: var(--at-bg-cream);
  background: var(--at-mute);
  width: fit-content;
}

.ed-cep-method.is-get { background: var(--at-teal); }
.ed-cep-method.is-post { background: var(--at-blue-deep); }
.ed-cep-method.is-patch { background: var(--at-gold); }
.ed-cep-method.is-put { background: var(--at-gold); }
.ed-cep-method.is-delete { background: #b1361f; }

.ed-cep-endpoint {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
}

.ed-cep-endpoint code {
  font-family: var(--at-mono);
  font-size: 0.92rem;
  color: var(--at-navy-deep);
  font-weight: 600;
  background: transparent;
  padding: 0;
  word-break: break-all;
}

.ed-cep-endpoint__title {
  font-family: var(--at-sans);
  font-size: 0.85rem;
  color: var(--at-mute-2);
  line-height: 1.4;
}

.ed-cep-status {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.4rem;
}

.ed-cep-status__pill {
  display: inline-block;
  padding: 0.28rem 0.65rem;
  font-family: var(--at-mono);
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 700;
}

.ed-cep-status__pill.is-chargeable {
  color: var(--at-bg-cream);
  background: var(--at-navy-deep);
}

.ed-cep-status__pill.is-free {
  color: var(--at-mute-2);
  background: rgba(0, 0, 0, 0.06);
}

.ed-cep-status__note {
  font-family: var(--at-sans);
  font-size: 0.78rem;
  color: var(--at-gold);
  font-style: italic;
  line-height: 1.3;
}

/* ─── Responsive ────────────────────────────────────────────────────────── */
@media (max-width: 720px) {
  .ed-cep-hero__inner { padding: 3rem 1.25rem 2rem; }
  .ed-cep-section { padding: 2.5rem 0 3.5rem; }
  .ed-cep-section__inner { padding: 0 1.25rem; }
  .ed-cep-table__head { display: none; }
  .ed-cep-table__row {
    grid-template-columns: auto 1fr;
    grid-template-areas:
      'method endpoint'
      'status status';
    gap: 0.75rem 1rem;
    padding: 1rem 1rem;
  }
  .ed-cep-method { grid-area: method; align-self: start; }
  .ed-cep-endpoint { grid-area: endpoint; }
  .ed-cep-status {
    grid-area: status;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
  }
}
</style>
