<route lang="yaml">
meta:
  title: ATMs
  isIndex: true
</route>

<script setup lang="ts">
import { allEndpoints, endpointUrl } from '@/data/endpoints'

// The endpoint registry spans every version, so listings are scoped to the
// version segment of this page's route.
const { docsVersion } = useRouteVersion()

// Live-ecosystem mini-feed for the ATMs landing page. Fetches the same two
// data sources the full Live Ecosystem page (`/program/whats-live`) uses:
//   * /api/trust-framework.json     — org directory (logos, type)
//   * the API log via loadApiLog() — TPP usage (which TPPs called what)
// Filters api-log to ATM-family rows, derives a unique list of consuming
// TPPs, joins each to its directory entry for the logo, and renders the
// first few. Wrapped in <ClientOnly> so SSG doesn't try to fetch at build
// time.

// Endpoints in this section, sourced from the API specs registry.
const sectionEndpoints = computed(() =>
  allEndpoints.filter(
    (e) =>
      e.surface === 'ozone-connect'
      && e.sectionSlug === 'atms'
      && e.version === docsVersion.value,
  ),
)

// Live-ecosystem mini-feed — TPPs that called ATM endpoints in the last 30
// days. Aligned with `/program/whats-live?family=atm&type=tpp`.
const { liveTpps, totalCount: totalTppCount, loadError } = useLiveTpps(['atm'], 4)

function initials(name: string): string {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]?.toUpperCase() ?? '').join('')
}
</script>

<template>
  <div class="ed-landing">
    <section class="ed-landing__hero">
      <div class="ed-landing__inner">
        <div class="ed-landing__eyebrow">
          <span class="ed-landing__eyebrow-dash" />
          Banking · LFI capability
        </div>
        <h1 class="ed-landing__title">
          ATMs
          <span class="ed-landing__read">2 min read</span>
        </h1>
        <p class="ed-landing__lede">
          The ATM API allows LFIs to publish ATM location and service data to TPPs.
          It is a read-only, public-data API &mdash; no consent or user redirect
          is required.
        </p>
      </div>
    </section>

    <section class="ed-landing__role">
      <div class="ed-landing__inner">
        <div class="ed-landing__role-card">
          <div class="ed-landing__role-meta">
            <span class="ed-landing__role-tag">Access control</span>
            Required role
          </div>
          <div class="ed-landing__role-head">
            <span class="ed-landing__role-chip">BDSP</span>
            <h2 class="ed-landing__role-title">Bank Data Sharing Provider</h2>
          </div>
          <p class="ed-landing__role-body">
            Access to the ATM API requires TPPs to hold the
            <strong>BDSP</strong> role. The API Hub validates the role on every
            request before proxying it to the LFI.
          </p>
        </div>
      </div>
    </section>

    <section class="ed-landing__live">
      <div class="ed-landing__inner">
        <div class="ed-landing__live-head">
          <div class="ed-landing__live-eyebrow">
            <span class="ed-landing__eyebrow-dash" />
            Live ecosystem
          </div>
          <h2 class="ed-landing__live-title">Who's consuming ATM data</h2>
          <p class="ed-landing__live-sub">
            TPPs currently calling the ATM API across UAE Open Finance.
          </p>
        </div>

        <ClientOnly>
          <div v-if="liveTpps.length" class="ed-landing__live-grid">
            <a
              v-for="tpp in liveTpps"
              :key="tpp.name"
              class="ed-landing__tpp"
              :title="tpp.legalName"
              href="/program/whats-live?type=tpp&amp;family=atm"
            >
              <div class="ed-landing__tpp-logo">
                <img v-if="tpp.logoUri" :src="tpp.logoUri" :alt="tpp.legalName" />
                <span v-else class="ed-landing__tpp-initials">{{ initials(tpp.name) }}</span>
              </div>
              <div class="ed-landing__tpp-name">{{ tpp.name }}</div>
            </a>
            <a
              v-if="totalTppCount > liveTpps.length"
              class="ed-landing__tpp ed-landing__tpp--more"
              href="/program/whats-live?type=tpp&amp;family=atm"
              :title="`See all ${totalTppCount} TPPs`"
            >
              <span class="ed-landing__tpp-more-dots">&hellip;</span>
              <span class="ed-landing__tpp-more-label">+{{ totalTppCount - liveTpps.length }} more</span>
            </a>
          </div>
          <p v-else-if="loadError" class="ed-landing__live-empty">
            Live data is currently unavailable.
          </p>
          <p v-else class="ed-landing__live-empty">
            No TPPs are currently consuming the ATM API.
          </p>

          <a
            v-if="totalTppCount > 0"
            class="ed-landing__live-cta"
            href="/program/whats-live?type=tpp&amp;family=atm"
          >
            <span v-if="totalTppCount > liveTpps.length">
              See all {{ totalTppCount }} TPPs in the live ecosystem
            </span>
            <span v-else>
              View in the live ecosystem dashboard
            </span>
            <span class="ed-landing__live-cta-arrow" aria-hidden="true">&rarr;</span>
          </a>

          <template #placeholder>
            <div class="ed-landing__live-grid">
              <div v-for="i in 4" :key="i" class="ed-landing__tpp ed-landing__tpp--skel" />
            </div>
          </template>
        </ClientOnly>
      </div>
    </section>

    <section class="ed-landing__contents">
      <div class="ed-landing__inner">
        <div class="ed-landing__contents-head">
          <div class="ed-landing__contents-eyebrow">
            <span class="ed-landing__eyebrow-dash" />
            Section contents
          </div>
          <h2 class="ed-landing__contents-title">Browse this section</h2>
          <p class="ed-landing__contents-sub">
            The full set of pages for the ATMs API.
          </p>
        </div>

        <div class="ed-landing__contents-grid">
          <a
            class="ed-link-card"
            href="/tech/lfi-api-hub/v2.2-rc1/banking/atms/requirements"
            :style="{ '--card-color': 'var(--at-gold, #b08800)' }"
          >
            <span class="ed-link-card__top" />
            <div class="ed-link-card__meta">
              <span class="ed-link-card__cat">Requirements</span>
            </div>
            <h3 class="ed-link-card__title">ATMs &mdash; Requirements</h3>
            <p class="ed-link-card__desc">
              Validation rules and behaviour your Ozone Connect ATM endpoint must follow.
            </p>
            <div class="ed-link-card__foot">
              <span class="ed-link-card__cta">Open</span>
              <span class="ed-link-card__arrow">&rarr;</span>
            </div>
          </a>

          <a
            class="ed-link-card"
            href="/tech/lfi-api-hub/v2.2-rc1/banking/atms/api-guide"
            :style="{ '--card-color': 'var(--at-teal)' }"
          >
            <span class="ed-link-card__top" />
            <div class="ed-link-card__meta">
              <span class="ed-link-card__cat">API Guide</span>
            </div>
            <h3 class="ed-link-card__title">ATMs &mdash; API Guide</h3>
            <p class="ed-link-card__desc">
              Implementation notes, payload structure, and worked examples.
            </p>
            <div class="ed-link-card__foot">
              <span class="ed-link-card__cta">Open</span>
              <span class="ed-link-card__arrow">&rarr;</span>
            </div>
          </a>

          <a
            v-for="ep in sectionEndpoints"
            :key="ep.slug"
            class="ed-link-card"
            :href="endpointUrl(ep)"
            :style="{ '--card-color': 'var(--at-blue-deep, #1d4ed8)' }"
          >
            <span class="ed-link-card__top" />
            <div class="ed-link-card__meta">
              <span class="ed-link-card__cat">Endpoint</span>
              <span class="http-badge" :class="`http-${ep.method.toLowerCase()}`">{{ ep.method }}</span>
              <code class="ed-link-card__path">{{ ep.path }}</code>
            </div>
            <h3 class="ed-link-card__title">{{ ep.title }}</h3>
            <p class="ed-link-card__desc">
              OpenAPI reference for the <code>{{ ep.method }} {{ ep.path }}</code> endpoint.
            </p>
            <div class="ed-link-card__foot">
              <span class="ed-link-card__cta">Open spec</span>
              <span class="ed-link-card__arrow">&rarr;</span>
            </div>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.ed-landing {
  background: var(--at-bg-cream);
  color: var(--at-navy-deep);
  font-family: var(--at-sans);
  padding-top: 4.25rem;
  min-height: 100vh;
}

/* ── Hero ───────────────────────────────────────────────────────────── */
.ed-landing__hero {
  background: var(--at-bg-cream);
  border-bottom: 1px solid var(--at-grid-line);
}

.ed-landing__inner {
  max-width: var(--at-page-max);
  margin: 0 auto;
  padding: 4rem 2rem 3rem;
}

.ed-landing__eyebrow {
  font-family: var(--at-mono);
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--at-teal);
  margin-bottom: 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.ed-landing__eyebrow-dash {
  width: 24px; height: 1px; background: currentColor;
}

.ed-landing__title {
  font-family: var(--at-serif);
  font-size: clamp(2.25rem, 5vw, 3.6rem);
  font-weight: 600;
  line-height: 1.02;
  letter-spacing: -0.03em;
  margin: 0;
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.85rem;
}

.ed-landing__read {
  font-family: var(--at-mono);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 500;
  color: var(--at-mute);
  align-self: center;
  padding-left: 0.6rem;
  border-left: 1px solid var(--at-grid-line-2);
}

.ed-landing__lede {
  font-family: var(--at-sans);
  font-size: 1.1rem;
  line-height: 1.65;
  margin: 1.75rem 0 0;
  max-width: 50rem;
  color: var(--at-mute-2);
}

/* ── Required role (full width) ────────────────────────────────────── */
.ed-landing__role {
  background: var(--at-surface);
  border-top: 1px solid var(--at-grid-line);
  padding: 3rem 0 3.5rem;
}

.ed-landing__role .ed-landing__inner {
  padding-top: 0;
  padding-bottom: 0;
}

.ed-landing__role-card {
  position: relative;
  padding: 2.25rem 2.5rem 2rem;
  background: var(--at-bg-cream);
  border: 1px solid var(--at-grid-line);
}
.ed-landing__role-card::before {
  content: "";
  position: absolute;
  top: 0; left: 0; bottom: 0;
  width: 3px;
  background: #1d4ed8;
}

.ed-landing__role-meta {
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-weight: 700;
  color: #1d4ed8;
  margin-bottom: 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.ed-landing__role-tag {
  display: inline-block;
  font-size: 0.6rem;
  letter-spacing: 0.1em;
  font-weight: 600;
  color: var(--at-mute);
  border: 1px solid var(--at-grid-line-2);
  padding: 0.15rem 0.5rem;
  background: var(--at-surface);
}

.ed-landing__role-head {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
}

.ed-landing__role-chip {
  display: inline-block;
  font-family: var(--at-mono);
  font-size: 1rem;
  letter-spacing: 0.08em;
  font-weight: 700;
  color: #1d4ed8;
  background: rgba(29, 78, 216, 0.1);
  padding: 0.45rem 0.85rem;
  align-self: center;
}

.ed-landing__role-title {
  font-family: var(--at-serif);
  font-size: clamp(1.5rem, 2.6vw, 2rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.1;
  margin: 0;
  color: var(--at-navy-deep);
}

.ed-landing__role-body {
  font-family: var(--at-sans);
  font-size: 1rem;
  line-height: 1.65;
  color: var(--at-mute-2);
  margin: 0;
  max-width: 60rem;
}
.ed-landing__role-body strong { color: var(--at-navy-deep); font-weight: 600; }

/* ── Section contents (link cards) ─────────────────────────────────── */
.ed-landing__contents {
  background: var(--at-surface);
  border-top: 1px solid var(--at-grid-line);
  padding: 3.5rem 0 4rem;
}

.ed-landing__contents .ed-landing__inner {
  padding-top: 0;
  padding-bottom: 0;
}

.ed-landing__contents-head {
  margin-bottom: 1.85rem;
}

.ed-landing__contents-eyebrow {
  font-family: var(--at-mono);
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--at-teal);
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.ed-landing__contents-title {
  font-family: var(--at-serif);
  font-size: clamp(1.5rem, 2.6vw, 2rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.1;
  margin: 0 0 0.6rem;
  color: var(--at-navy-deep);
}

.ed-landing__contents-sub {
  font-family: var(--at-sans);
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--at-mute-2);
  margin: 0;
}

.ed-landing__contents-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(22.5rem, 1fr));
  gap: 1.25rem;
}

/* Mirrors `.ed-tpp-card` on /tech/tpp-standards. */
.ed-link-card {
  position: relative;
  display: flex;
  flex-direction: column;
  background: var(--at-bg-cream);
  border: 1px solid var(--at-grid-line);
  padding: 2rem 1.75rem 1.5rem;
  text-decoration: none;
  color: inherit;
  transition: border-color 0.2s ease, transform 0.2s ease;
}

.ed-link-card:hover {
  border-color: var(--card-color, var(--at-navy));
  transform: translateY(-2px);
}

.ed-link-card__top {
  position: absolute;
  top: 0;
  left: 0;
  width: 48px;
  height: 3px;
  background: var(--card-color, var(--at-navy));
}

.ed-link-card__meta {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  margin-bottom: 0.85rem;
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  flex-wrap: wrap;
}

.ed-link-card__cat {
  font-weight: 700;
  color: var(--card-color, var(--at-navy));
}

.ed-link-card__path {
  font-family: var(--at-mono);
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: -0.005em;
  text-transform: none;
  color: var(--at-navy-deep);
  background: none;
  padding: 0;
}

.ed-link-card__title {
  font-family: var(--at-serif);
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: var(--at-navy-deep);
  margin: 0 0 0.85rem;
}

.ed-link-card__desc {
  font-family: var(--at-sans);
  font-size: 0.92rem;
  line-height: 1.6;
  color: var(--at-mute-2);
  margin: 0 0 1.1rem;
  flex: 1;
}
.ed-link-card__desc :deep(code) {
  font-family: var(--at-mono);
  font-size: 0.82em;
  background: rgba(0, 39, 127, 0.06);
  padding: 0.08em 0.35em;
  color: var(--at-navy-deep);
}

.ed-link-card__foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 0.85rem;
  border-top: 1px solid var(--at-grid-line);
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-mute);
}

.ed-link-card__arrow {
  color: var(--card-color, var(--at-navy));
  transition: transform 0.2s ease;
}

.ed-link-card:hover .ed-link-card__arrow {
  transform: translateX(4px);
}

/* ── Live ecosystem ────────────────────────────────────────────────── */
.ed-landing__live {
  background: var(--at-bg-cream);
  border-top: 1px solid var(--at-grid-line);
  padding: 3.5rem 0 5rem;
}

.ed-landing__live .ed-landing__inner {
  padding-top: 0;
  padding-bottom: 0;
}

.ed-landing__live-head {
  margin-bottom: 1.85rem;
}

.ed-landing__live-eyebrow {
  font-family: var(--at-mono);
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--at-teal);
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.ed-landing__live-title {
  font-family: var(--at-serif);
  font-size: clamp(1.5rem, 2.6vw, 2rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.1;
  margin: 0 0 0.6rem;
  color: var(--at-navy-deep);
}

.ed-landing__live-sub {
  font-family: var(--at-sans);
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--at-mute-2);
  margin: 0;
}

.ed-landing__live-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(13rem, 1fr));
  gap: 0.85rem;
}

.ed-landing__tpp {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 1rem 1.15rem;
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line);
  min-height: 4.5rem;
  text-decoration: none;
  color: inherit;
  transition: border-color 0.15s ease;
}
.ed-landing__tpp:hover {
  border-color: var(--at-teal-deep);
}

.ed-landing__tpp--skel {
  background: color-mix(in srgb, var(--at-grid-line) 30%, var(--at-surface));
}

.ed-landing__tpp--more {
  flex-direction: column;
  justify-content: center;
  gap: 0.2rem;
  background: color-mix(in srgb, var(--at-teal-deep) 6%, var(--at-surface));
  border-style: dashed;
  text-align: center;
}
.ed-landing__tpp-more-dots {
  font-family: var(--at-serif);
  font-size: 1.4rem;
  letter-spacing: 0.08em;
  font-weight: 600;
  color: var(--at-teal-deep);
  line-height: 1;
}
.ed-landing__tpp-more-label {
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-teal-deep);
}

.ed-landing__tpp-logo {
  flex-shrink: 0;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--at-bg-cream);
  border: 1px solid var(--at-grid-line);
  overflow: hidden;
}
.ed-landing__tpp-logo img {
  width: 100%; height: 100%; object-fit: contain;
}
.ed-landing__tpp-initials {
  font-family: var(--at-mono);
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--at-teal-deep);
  letter-spacing: 0.04em;
}

.ed-landing__tpp-name {
  font-family: var(--at-sans);
  font-size: 0.92rem;
  font-weight: 600;
  color: var(--at-navy-deep);
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}

.ed-landing__live-empty {
  font-family: var(--at-sans);
  font-size: 0.95rem;
  color: var(--at-mute-2);
  margin: 0;
}

.ed-landing__live-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  margin-top: 1.5rem;
  font-family: var(--at-mono);
  font-size: 0.82rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-teal-deep);
  text-decoration: none;
  border-bottom: 1px solid currentColor;
  padding-bottom: 0.25rem;
}

.ed-landing__live-cta-arrow {
  transition: transform 0.18s ease;
}
.ed-landing__live-cta:hover .ed-landing__live-cta-arrow {
  transform: translateX(3px);
}

@media (max-width: 720px) {
  .ed-landing__inner { padding: 2.75rem 1.25rem 2rem; }
  .ed-landing__role { padding: 2rem 0 2.25rem; }
  .ed-landing__live { padding: 2.5rem 0 3.5rem; }
  .ed-landing__role-card { padding: 1.5rem 1.5rem 1.35rem; }
}
</style>
