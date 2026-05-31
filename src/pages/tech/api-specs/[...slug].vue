<route lang="yaml">
meta:
  title: API Reference
  isIndex: true
path: /tech/api-specs/:slug(.+)
</route>

<script setup lang="ts">
import {
  endpointUrl,
  getEndpointBySlug,
  getSectionScope,
  sectionUrl,
  type Endpoint,
  type Surface,
} from '@/data/endpoints'

const route = useRoute()

const tail = computed<string>(() => {
  const raw = route.params['slug']
  if (Array.isArray(raw)) return raw.join('/')
  return typeof raw === 'string' ? raw : ''
})

const endpoint = computed(() => getEndpointBySlug(tail.value))
const scope = computed(() => (endpoint.value ? undefined : getSectionScope(tail.value)))

const SURFACE_EYEBROW: Record<Surface, string> = {
  standards: 'TPP · Standards',
  'api-hub': 'API Hub',
  'ozone-connect': 'Ozone Connect',
}

const SURFACE_TITLE: Record<Surface, string> = {
  standards: 'Open Finance Standards',
  'api-hub': 'API Hub',
  'ozone-connect': 'Ozone Connect',
}

const SURFACE_LEDE: Record<Surface, string> = {
  standards:
    'The APIs the API Hub exposes to TPPs — Trust Framework discovery, registration, token exchange, consent, bank data sharing, service initiation, Confirmation of Payee, ATMs, and event notifications.',
  'api-hub':
    'The APIs the API Hub exposes to LFIs during the authorization journey — Headless Heimdall (for delegating end user authentication) and the Consent Manager (for looking up and updating consents).',
  'ozone-connect':
    'The APIs LFIs must implement for the API Hub to call — health check, consent events, bank data sharing, service initiation, Confirmation of Payee, products & leads, and ATMs.',
}

interface ListingGroup {
  label: string
  url?: string
  endpoints: readonly Endpoint[]
}

const heroEyebrow = computed<string>(() => {
  const s = scope.value
  if (!s) return ''
  if (s.kind === 'surface') return 'API Specifications'
  return SURFACE_EYEBROW[s.surface]
})

const heroTitle = computed<string>(() => {
  const s = scope.value
  if (!s) return ''
  if (s.kind === 'surface') return SURFACE_TITLE[s.surface]
  return s.sectionLabel
})

const heroLede = computed<string>(() => {
  const s = scope.value
  if (!s || s.kind !== 'surface') return ''
  return SURFACE_LEDE[s.surface]
})

const groups = computed<ListingGroup[]>(() => {
  const s = scope.value
  if (!s) return []

  if (s.kind === 'surface') {
    const order: string[] = []
    const buckets = new Map<string, { label: string; sectionSlug: string; endpoints: Endpoint[] }>()
    for (const ep of s.endpoints) {
      const key = ep.sectionSlug
      let bucket = buckets.get(key)
      if (!bucket) {
        bucket = { label: ep.section, sectionSlug: ep.sectionSlug, endpoints: [] }
        buckets.set(key, bucket)
        order.push(key)
      }
      bucket.endpoints.push(ep)
    }
    return order.map((key) => {
      const b = buckets.get(key)!
      return {
        label: b.label,
        url: sectionUrl(s.surface, s.version, b.sectionSlug),
        endpoints: b.endpoints,
      }
    })
  }

  // Section scope — group by subsection where present, else a single flat
  // bucket. Empty subsection rows render first as ungrouped leaves.
  const hasSubsections = s.endpoints.some((e) => e.subsection)
  if (!hasSubsections) {
    return [{ label: s.sectionLabel, endpoints: s.endpoints }]
  }

  const order: string[] = []
  const buckets = new Map<string, Endpoint[]>()
  for (const ep of s.endpoints) {
    const key = ep.subsection ?? ''
    const list = buckets.get(key)
    if (list) list.push(ep)
    else {
      buckets.set(key, [ep])
      order.push(key)
    }
  }
  return order.map((key) => ({
    label: key === '' ? 'General' : key,
    endpoints: buckets.get(key)!,
  }))
})
</script>

<template>
  <div class="ed-api-endpoint">
    <template v-if="endpoint">
      <section class="ed-api-endpoint__hero">
        <div class="ed-api-endpoint__hero-inner">
          <div class="ed-api-endpoint__hero-label">
            <span class="ed-api-endpoint__hero-label-dash" />
            {{ SURFACE_EYEBROW[endpoint.surface] }} &middot; {{ endpoint.section }}
          </div>
          <h1 class="ed-api-endpoint__hero-title">
            {{ endpoint.title }}
            <span class="ed-api-endpoint__hero-badge">{{ endpoint.version }}</span>
          </h1>
          <div class="ed-api-endpoint__hero-meta">
            <span :class="['http-badge', `http-${endpoint.method.toLowerCase()}`]">{{ endpoint.method }}</span>
            <code class="ed-api-endpoint__hero-path">{{ endpoint.path }}</code>
          </div>
        </div>
      </section>

      <section class="ed-api-endpoint__body">
        <div class="ed-api-endpoint__body-inner">
          <RedocWrapper v-bind="endpoint.redoc" />
        </div>
      </section>
    </template>

    <template v-else-if="scope">
      <section class="ed-api-listing__hero">
        <div class="ed-api-listing__hero-inner">
          <div class="ed-api-listing__hero-label">
            <span class="ed-api-listing__hero-label-dash" />
            {{ heroEyebrow }}
          </div>
          <h1 class="ed-api-listing__hero-title">
            {{ heroTitle }}
            <span class="ed-api-listing__hero-badge">{{ scope.version }}</span>
          </h1>
          <p v-if="heroLede" class="ed-api-listing__hero-sub">{{ heroLede }}</p>
        </div>
      </section>

      <section class="ed-api-listing__body">
        <div class="ed-api-listing__body-inner">
          <div v-for="group in groups" :key="group.label" class="ed-api-listing__group">
            <div class="ed-api-listing__group-head">
              <h2 class="ed-api-listing__group-title">
                <a v-if="group.url" :href="group.url" class="ed-api-listing__group-link">
                  {{ group.label }}
                  <span class="ed-api-listing__group-link-arrow">&rarr;</span>
                </a>
                <template v-else>{{ group.label }}</template>
              </h2>
              <span class="ed-api-listing__group-count">
                {{ group.endpoints.length }} endpoint{{ group.endpoints.length === 1 ? '' : 's' }}
              </span>
            </div>

            <div class="ed-api-listing__rows">
              <a
                v-for="ep in group.endpoints"
                :key="endpointUrl(ep)"
                :href="endpointUrl(ep)"
                class="ed-api-listing__row"
              >
                <span :class="['http-badge', `http-${ep.method.toLowerCase()}`]">{{ ep.method }}</span>
                <code class="ed-api-listing__row-path">{{ ep.path }}</code>
                <span class="ed-api-listing__row-title">{{ ep.title }}</span>
                <span class="ed-api-listing__row-arrow">&rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </template>

    <section v-else class="ed-api-endpoint__missing">
      <div class="ed-api-endpoint__missing-inner">
        <h1>Endpoint not found</h1>
        <p>
          No registered API spec matches <code>{{ tail }}</code>.
        </p>
        <router-link to="/tech/api-specs/" class="ed-api-endpoint__back">
          &larr; Back to API Specifications
        </router-link>
      </div>
    </section>
  </div>
</template>

<style scoped>
.ed-api-endpoint {
  --api-page-max: 1600px;
  background: var(--at-bg-cream);
  color: var(--at-navy-deep);
  font-family: var(--at-sans);
  padding-top: 4.25rem;
  min-height: 100vh;
}

/* ─── Hero ──────────────────────────────────────────────────────────────── */
.ed-api-endpoint__hero {
  background: var(--at-bg-cream);
  border-bottom: 1px solid var(--at-grid-line);
}

.ed-api-endpoint__hero-inner {
  max-width: var(--api-page-max);
  margin: 0 auto;
  padding: 4.5rem 2rem 3.5rem;
}

.ed-api-endpoint__hero-label {
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

.ed-api-endpoint__hero-label-dash {
  width: 24px;
  height: 1px;
  background: currentColor;
}

.ed-api-endpoint__hero-title {
  font-family: var(--at-serif);
  font-size: clamp(2.25rem, 5vw, 3.5rem);
  font-weight: 600;
  line-height: 1.02;
  letter-spacing: -0.03em;
  margin: 0;
  color: var(--at-navy-deep);
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.85rem;
}

.ed-api-endpoint__hero-badge {
  font-family: var(--at-mono);
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--at-teal);
  background: rgba(0, 194, 169, 0.12);
  padding: 0.35rem 0.7rem;
  align-self: center;
}

.ed-api-endpoint__hero-meta {
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.ed-api-endpoint__hero-path {
  font-family: var(--at-mono);
  font-size: 0.95rem;
  color: var(--at-navy-deep);
  background: var(--at-surface);
  padding: 0.35rem 0.6rem;
  border: 1px solid var(--at-grid-line);
}

/* ─── Body (Redoc) ──────────────────────────────────────────────────────── */
.ed-api-endpoint__body {
  padding: 1rem 0 5rem;
  background: var(--at-surface);
  border-top: 1px solid var(--at-grid-line);
}

.ed-api-endpoint__body-inner {
  max-width: var(--api-page-max);
  margin: 0 auto;
  padding: 0 2rem;
}

/* ─── Missing ───────────────────────────────────────────────────────────── */
.ed-api-endpoint__missing {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 4.25rem);
  padding: 3rem 1.5rem;
}

.ed-api-endpoint__missing-inner {
  max-width: 32rem;
  text-align: center;
}

.ed-api-endpoint__missing h1 {
  font-family: var(--at-serif);
  font-size: 1.75rem;
  font-weight: 500;
  margin: 0 0 0.85rem;
  color: var(--at-navy-deep);
}

.ed-api-endpoint__missing p {
  font-family: var(--at-sans);
  font-size: 0.95rem;
  color: var(--at-mute-2);
  margin: 0 0 1.5rem;
}

.ed-api-endpoint__missing code {
  font-family: var(--at-mono);
  background: var(--at-surface);
  padding: 0.1em 0.4em;
  border-radius: 0;
  color: var(--at-navy-deep);
}

.ed-api-endpoint__back {
  display: inline-block;
  font-family: var(--at-mono);
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--at-teal-deep);
  text-decoration: none;
  border-bottom: 1px solid currentColor;
}

.ed-api-endpoint__back:hover {
  color: var(--at-navy-deep);
}

@media (max-width: 640px) {
  .ed-api-endpoint__hero-inner { padding: 3rem 1.25rem 2.5rem; }
  .ed-api-endpoint__body-inner { padding: 0 1.25rem; }
}

/* ─── Listing (surface / section index) ─────────────────────────────────── */
.ed-api-listing__hero {
  background: var(--at-bg-cream);
  border-bottom: 1px solid var(--at-grid-line);
}

.ed-api-listing__hero-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 4.5rem 2rem 3rem;
}

.ed-api-listing__hero-label {
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

.ed-api-listing__hero-label-dash {
  width: 24px;
  height: 1px;
  background: currentColor;
}

.ed-api-listing__hero-title {
  font-family: var(--at-serif);
  font-size: clamp(2.25rem, 5vw, 3.5rem);
  font-weight: 600;
  line-height: 1.02;
  letter-spacing: -0.03em;
  margin: 0;
  color: var(--at-navy-deep);
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.85rem;
}

.ed-api-listing__hero-badge {
  font-family: var(--at-mono);
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--at-teal);
  background: rgba(0, 194, 169, 0.12);
  padding: 0.35rem 0.7rem;
  align-self: center;
}

.ed-api-listing__hero-sub {
  font-family: var(--at-sans);
  font-size: 1.05rem;
  line-height: 1.6;
  margin: 1.5rem 0 0;
  max-width: 48rem;
  color: var(--at-mute-2);
}

.ed-api-listing__body {
  padding: 2.5rem 0 5rem;
  background: var(--at-surface);
  border-top: 1px solid var(--at-grid-line);
}

.ed-api-listing__body-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.ed-api-listing__group-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  padding-bottom: 0.85rem;
  margin-bottom: 0.75rem;
  border-bottom: 1px solid var(--at-grid-line);
}

.ed-api-listing__group-title {
  font-family: var(--at-serif);
  font-size: 1.35rem;
  font-weight: 500;
  letter-spacing: -0.02em;
  margin: 0;
  color: var(--at-navy-deep);
}

.ed-api-listing__group-link {
  color: inherit;
  text-decoration: none;
  display: inline-flex;
  align-items: baseline;
  gap: 0.5rem;
  transition: color 0.18s;
}

.ed-api-listing__group-link:hover { color: var(--at-teal-deep); }

.ed-api-listing__group-link-arrow {
  font-family: var(--at-mono);
  font-size: 0.85rem;
  color: var(--at-mute);
  transition: transform 0.18s, color 0.18s;
}

.ed-api-listing__group-link:hover .ed-api-listing__group-link-arrow {
  transform: translateX(3px);
  color: var(--at-teal-deep);
}

.ed-api-listing__group-count {
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--at-mute);
  font-weight: 600;
}

.ed-api-listing__rows {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--at-grid-line);
  background: var(--at-bg-cream);
}

.ed-api-listing__row {
  display: grid;
  grid-template-columns: auto auto 1fr auto;
  align-items: center;
  gap: 1rem;
  padding: 0.85rem 1.1rem;
  text-decoration: none;
  color: inherit;
  border-bottom: 1px solid var(--at-grid-line);
  transition: background 0.15s, color 0.15s;
}

.ed-api-listing__row:last-child { border-bottom: none; }

.ed-api-listing__row:hover {
  background: var(--at-surface);
}

.ed-api-listing__row .http-badge {
  font-size: 0.7rem;
  font-weight: 700;
  margin-right: 0;
  min-width: 3.25rem;
}

.ed-api-listing__row-path {
  font-family: var(--at-mono);
  font-size: 0.85rem;
  color: var(--at-navy-deep);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.ed-api-listing__row-title {
  font-family: var(--at-sans);
  font-size: 0.9rem;
  color: var(--at-mute-2);
  line-height: 1.4;
}

.ed-api-listing__row-arrow {
  font-family: var(--at-mono);
  font-size: 0.95rem;
  color: var(--at-mute);
  transition: transform 0.18s, color 0.18s;
}

.ed-api-listing__row:hover .ed-api-listing__row-arrow {
  transform: translateX(3px);
  color: var(--at-teal-deep);
}

@media (max-width: 760px) {
  .ed-api-listing__hero-inner { padding: 3rem 1.25rem 2rem; }
  .ed-api-listing__body { padding: 2rem 0 4rem; }
  .ed-api-listing__body-inner { padding: 0 1.25rem; gap: 2rem; }
  .ed-api-listing__row {
    grid-template-columns: auto 1fr auto;
    grid-template-areas:
      "method path arrow"
      "title  title arrow";
    row-gap: 0.4rem;
  }
  .ed-api-listing__row .http-badge { grid-area: method; }
  .ed-api-listing__row-path { grid-area: path; }
  .ed-api-listing__row-title { grid-area: title; }
  .ed-api-listing__row-arrow { grid-area: arrow; align-self: center; }
}
</style>
