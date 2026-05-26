<route lang="yaml">
meta:
  title: Insurance Data Sharing
  isIndex: true
</route>

<script setup lang="ts">
import { allEndpoints, endpointUrl } from '@/data/endpoints'

// Live-ecosystem mini-feed — LFIs listed in the Nebras directory as exposing
// any Insurance API resource (ApiFamilyType === 'insurance').
const { liveLfis, totalCount: totalLfiCount, loadError } = useLiveLfis(
  ['insurance'],
  4,
)

function initials(name: string): string {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]?.toUpperCase() ?? '').join('')
}

const sectionEndpoints = allEndpoints.filter(
  (e) => e.surface === 'standards' && e.sectionSlug === 'insurance-data-sharing',
)

const insuranceTypes = [
  'Employment', 'Health', 'Home', 'Life', 'Motor', 'Renters', 'Travel',
] as const

const capabilities: { title: string; html: string }[] = [
  {
    title: 'Policy Information',
    html: 'Provides consented access to a customer&rsquo;s insurance policy details &mdash; product, status, dates, sums insured, coverage, exclusions, and policy-holder information. Returned per insurance sector through dedicated <code>/{type}-insurance-policies</code> endpoints.',
  },
  {
    title: 'Customer &amp; Beneficiaries',
    html: 'Returns identity, contact, and beneficiary information held on the policy &mdash; controlled by <code>ReadCustomerBasic</code>, <code>ReadCustomerDetail</code>, and <code>ReadCustomerPaymentDetails</code> permissions and subject to data-minimisation rules.',
  },
  {
    title: 'Premium &amp; Pricing',
    html: 'Premium amounts, discounts, frequency, and VAT components for the policy. When the customer grants <code>ReadInsurancePremium</code>, premium values are returned as an encrypted JWE so they can only be decrypted on the customer&rsquo;s device.',
  },
  {
    title: 'Claims History',
    html: 'When granted <code>ReadCustomerClaims</code>, exposes claims raised against the policy &mdash; status, dates, amounts, and the events that triggered them. Enables switching, broking, and risk-assessment use cases.',
  },
  {
    title: 'Product Information',
    html: 'Structured product detail for the underwritten policy &mdash; cover type, features, terms, and add-ons. Returned under the <code>ReadInsuranceProduct</code> permission.',
  },
]
</script>

<template>
  <div class="ed-landing">
    <section class="ed-landing__hero">
      <div class="ed-landing__inner">
        <div class="ed-landing__eyebrow">
          <span class="ed-landing__eyebrow-dash" />
          Insurance &middot; TPP capability
        </div>
        <h1 class="ed-landing__title">
          Insurance Data Sharing
          <span class="ed-landing__read">2 min read</span>
        </h1>
        <p class="ed-landing__lede">
          The Open Finance Insurance Data Sharing capabilities enable secure, consent-driven access to a
          customer&rsquo;s insurance policy data across the UAE&rsquo;s major sectors. These services empower
          licensed third-party providers (TPPs) to deliver policy aggregation, switching support, broking,
          claims assistance, and value-added digital insurance services.
        </p>
        <p class="ed-landing__lede ed-landing__lede--tight">
          All data access operates under explicit customer consent, with granular permission scopes, strict
          expiry controls, and full auditability.
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
            <span class="ed-landing__role-chip">ISP</span>
            <h2 class="ed-landing__role-title">Insurance Service Provider</h2>
          </div>
          <p class="ed-landing__role-body">
            Access to the Insurance Data Sharing APIs requires the
            <strong>ISP</strong> role. This role must be assigned to your application in the
            Trust Framework before making any insurance policy requests. See
            <a href="/tech/tpp-standards/trust-framework/roles">Roles</a>
            for the full list of scopes and grant types this role permits.
          </p>
        </div>

        <div class="ed-landing__caps-head">
          <div class="ed-landing__caps-eyebrow">
            <span class="ed-landing__eyebrow-dash" />
            What Insurance Data Sharing covers
          </div>
        </div>
        <div class="ed-caps">
          <div v-for="cap in capabilities" :key="cap.title" class="ed-cap">
            <h3 class="ed-cap__title" v-html="cap.title" />
            <p class="ed-cap__body" v-html="cap.html" />
          </div>
        </div>
      </div>
    </section>

    <section class="ed-landing__coverage">
      <div class="ed-landing__inner">
        <div class="ed-landing__contents-head">
          <div class="ed-landing__contents-eyebrow">
            <span class="ed-landing__eyebrow-dash" />
            Coverage matrix
          </div>
          <h2 class="ed-landing__contents-title">Insurance types covered</h2>
          <p class="ed-landing__contents-sub">
            Each insurance type has its own pair of endpoints &mdash; a list endpoint and a per-policy
            detail endpoint. An LFI exposes the endpoints for the types it underwrites.
          </p>
        </div>

        <div class="ed-cov ed-cov--insurance" role="table" aria-label="Insurance type endpoint coverage">
          <div class="ed-cov__row ed-cov__row--head" role="row">
            <div class="ed-cov__cell ed-cov__cell--label" role="columnheader">Insurance Type</div>
            <div class="ed-cov__cell" role="columnheader">List policies</div>
            <div class="ed-cov__cell" role="columnheader">Get a policy</div>
          </div>
          <div v-for="t in insuranceTypes" :key="t" class="ed-cov__row" role="row">
            <div class="ed-cov__cell ed-cov__cell--label" role="cell">
              <strong>{{ t }}</strong>
              <code class="ed-cov__path">/{{ t.toLowerCase() }}-insurance-policies</code>
            </div>
            <div class="ed-cov__cell" role="cell"><span class="ed-cov__mark is-yes">GET</span></div>
            <div class="ed-cov__cell" role="cell"><span class="ed-cov__mark is-yes">GET</span></div>
          </div>
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
          <h2 class="ed-landing__live-title">Which LFIs are live for Insurance Data Sharing</h2>
          <p class="ed-landing__live-sub">
            LFIs currently exposing any Insurance API resource in the Open Finance directory.
          </p>
        </div>

        <ClientOnly>
          <div v-if="liveLfis.length" class="ed-landing__live-grid">
            <a
              v-for="lfi in liveLfis"
              :key="lfi.key"
              class="ed-landing__tpp"
              :title="lfi.legalName"
              href="/program/whats-live"
            >
              <div class="ed-landing__tpp-logo">
                <img v-if="lfi.logoUri" :src="lfi.logoUri" :alt="lfi.legalName" />
                <span v-else class="ed-landing__tpp-initials">{{ initials(lfi.name) }}</span>
              </div>
              <div class="ed-landing__tpp-name">{{ lfi.name }}</div>
            </a>
            <a
              v-if="totalLfiCount > liveLfis.length"
              class="ed-landing__tpp ed-landing__tpp--more"
              href="/program/whats-live"
              :title="`See all ${totalLfiCount} LFIs`"
            >
              <span class="ed-landing__tpp-more-dots">&hellip;</span>
              <span class="ed-landing__tpp-more-label">+{{ totalLfiCount - liveLfis.length }} more</span>
            </a>
          </div>
          <p v-else-if="loadError" class="ed-landing__live-empty">
            Live data is currently unavailable.
          </p>
          <p v-else class="ed-landing__live-empty">
            No LFIs are currently exposing Insurance APIs in the directory.
          </p>

          <a
            v-if="totalLfiCount > 0"
            class="ed-landing__live-cta"
            href="/program/whats-live"
          >
            <span v-if="totalLfiCount > liveLfis.length">
              See all {{ totalLfiCount }} LFIs in the live ecosystem
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
            The full set of pages for the Insurance Data Sharing API.
          </p>
        </div>

        <div class="ed-landing__contents-grid">
          <a
            class="ed-link-card"
            href="/tech/tpp-standards/v2.1/insurance/data-sharing/requirements"
            :style="{ '--card-color': 'var(--at-gold, #b08800)' }"
          >
            <span class="ed-link-card__top" />
            <div class="ed-link-card__meta">
              <span class="ed-link-card__cat">Requirements</span>
            </div>
            <h3 class="ed-link-card__title">Insurance Data Sharing &mdash; Requirements</h3>
            <p class="ed-link-card__desc">
              Validation rules and behaviour every Insurance Data Sharing endpoint must follow.
            </p>
            <div class="ed-link-card__foot">
              <span class="ed-link-card__cta">Open</span>
              <span class="ed-link-card__arrow">&rarr;</span>
            </div>
          </a>

          <a
            class="ed-link-card"
            href="/tech/tpp-standards/v2.1/insurance/data-sharing/api-guide/"
            :style="{ '--card-color': 'var(--at-teal)' }"
          >
            <span class="ed-link-card__top" />
            <div class="ed-link-card__meta">
              <span class="ed-link-card__cat">API Guide</span>
            </div>
            <h3 class="ed-link-card__title">Insurance Data Sharing &mdash; API Guide</h3>
            <p class="ed-link-card__desc">
              Implementation walkthrough &mdash; consent, redirect, token exchange, calling the policy
              endpoints, and decrypting the premium JWE.
            </p>
            <div class="ed-link-card__foot">
              <span class="ed-link-card__cta">Open</span>
              <span class="ed-link-card__arrow">&rarr;</span>
            </div>
          </a>

          <a
            class="ed-link-card"
            href="/tech/tpp-standards/v2.1/insurance/data-sharing/user-journeys"
            :style="{ '--card-color': 'var(--at-navy)' }"
          >
            <span class="ed-link-card__top" />
            <div class="ed-link-card__meta">
              <span class="ed-link-card__cat">User Journeys</span>
            </div>
            <h3 class="ed-link-card__title">Insurance Data Sharing &mdash; User Journeys</h3>
            <p class="ed-link-card__desc">
              The end-to-end flows your customer experiences when sharing insurance data through your
              application.
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

.ed-landing__hero { background: var(--at-bg-cream); border-bottom: 1px solid var(--at-grid-line); }
.ed-landing__inner { max-width: var(--at-page-max); margin: 0 auto; padding: 4rem 2rem 3rem; }

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
.ed-landing__eyebrow-dash { width: 24px; height: 1px; background: currentColor; }

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
.ed-landing__lede--tight { margin-top: 0.85rem; }

.ed-landing__role {
  background: var(--at-surface);
  border-top: 1px solid var(--at-grid-line);
  padding: 3rem 0 3.5rem;
}
.ed-landing__role .ed-landing__inner { padding-top: 0; padding-bottom: 0; }

.ed-landing__role-card {
  position: relative;
  padding: 2.25rem 2.5rem 2rem;
  background: var(--at-bg-cream);
  border: 1px solid var(--at-grid-line);
}
.ed-landing__role-card::before {
  content: ""; position: absolute;
  top: 0; left: 0; bottom: 0;
  width: 3px; background: #1d4ed8;
}

.ed-landing__role-meta {
  font-family: var(--at-mono);
  font-size: 0.66rem; letter-spacing: 0.16em;
  text-transform: uppercase; font-weight: 700;
  color: #1d4ed8; margin-bottom: 1.1rem;
  display: flex; align-items: center; gap: 0.6rem;
}
.ed-landing__role-tag {
  display: inline-block; font-size: 0.6rem;
  letter-spacing: 0.1em; font-weight: 600; color: var(--at-mute);
  border: 1px solid var(--at-grid-line-2); padding: 0.15rem 0.5rem;
  background: var(--at-surface);
}
.ed-landing__role-head {
  display: flex; align-items: baseline; flex-wrap: wrap; gap: 1rem; margin-bottom: 1rem;
}
.ed-landing__role-chip {
  display: inline-block; font-family: var(--at-mono);
  font-size: 1rem; letter-spacing: 0.08em; font-weight: 700;
  color: #1d4ed8; background: rgba(29, 78, 216, 0.1);
  padding: 0.45rem 0.85rem; align-self: center;
}
.ed-landing__role-title {
  font-family: var(--at-serif);
  font-size: clamp(1.5rem, 2.6vw, 2rem);
  font-weight: 600; letter-spacing: -0.02em;
  line-height: 1.1; margin: 0; color: var(--at-navy-deep);
}
.ed-landing__role-body {
  font-family: var(--at-sans); font-size: 1rem;
  line-height: 1.65; color: var(--at-mute-2);
  margin: 0; max-width: 60rem;
}
.ed-landing__role-body strong { color: var(--at-navy-deep); font-weight: 600; }
.ed-landing__role-body a {
  color: var(--at-teal-deep); text-decoration: none; border-bottom: 1px solid currentColor;
}

.ed-landing__caps-head { margin: 3rem 0 1.25rem; }
.ed-landing__caps-eyebrow {
  font-family: var(--at-mono); font-size: 0.68rem;
  letter-spacing: 0.18em; text-transform: uppercase;
  color: var(--at-teal); display: flex; align-items: center; gap: 0.75rem;
}
.ed-caps {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  gap: 1.5rem 2rem;
}
.ed-cap { padding: 1.5rem 0 0; border-top: 1px solid var(--at-grid-line); }
.ed-cap__title {
  font-family: var(--at-serif); font-size: 1.15rem;
  font-weight: 600; letter-spacing: -0.015em;
  color: var(--at-navy-deep); margin: 0 0 0.65rem;
}
.ed-cap__body {
  font-family: var(--at-sans); font-size: 0.95rem;
  line-height: 1.6; color: var(--at-mute-2); margin: 0;
}
.ed-cap__body :deep(code) {
  font-family: var(--at-mono); font-size: 0.82em;
  background: rgba(0, 39, 127, 0.06); padding: 0.08em 0.35em; color: var(--at-navy-deep);
}

.ed-landing__coverage {
  background: var(--at-bg-cream);
  border-top: 1px solid var(--at-grid-line);
  padding: 3.5rem 0 4rem;
}
.ed-landing__coverage .ed-landing__inner { padding-top: 0; padding-bottom: 0; }

.ed-cov {
  display: grid;
  grid-template-columns: minmax(18rem, 26rem) repeat(2, 1fr);
  border: 1px solid var(--at-grid-line);
  background: var(--at-surface);
}
.ed-cov__row { display: contents; }
.ed-cov__cell {
  padding: 0.85rem 0.95rem;
  border-bottom: 1px solid var(--at-grid-line);
  font-family: var(--at-sans); font-size: 0.9rem;
  text-align: center; color: var(--at-navy-deep);
}
.ed-cov__row:last-child .ed-cov__cell { border-bottom: 0; }
.ed-cov__cell--label {
  text-align: left;
  border-right: 1px solid var(--at-grid-line);
  display: flex; flex-direction: column; gap: 0.25rem;
}
.ed-cov__path {
  font-family: var(--at-mono); font-size: 0.78em;
  color: var(--at-mute-2);
}
.ed-cov__row--head .ed-cov__cell {
  background: var(--at-navy-deep);
  font-family: var(--at-mono); font-size: 0.66rem;
  letter-spacing: 0.16em; text-transform: uppercase; font-weight: 700;
  color: var(--at-bg-cream); border-bottom: 0;
  padding-top: 0.7rem; padding-bottom: 0.7rem;
}
.ed-cov__row--head .ed-cov__cell + .ed-cov__cell {
  border-left: 1px solid rgba(250, 250, 247, 0.18);
}
.ed-cov__mark.is-yes {
  font-family: var(--at-mono); font-weight: 700; color: var(--at-teal-deep);
  font-size: 0.78rem; letter-spacing: 0.04em;
}

/* ── Live ecosystem ────────────────────────────────────────────────── */
.ed-landing__live {
  background: var(--at-surface);
  border-top: 1px solid var(--at-grid-line);
  padding: 3.5rem 0 4rem;
}
.ed-landing__live .ed-landing__inner { padding-top: 0; padding-bottom: 0; }

.ed-landing__live-head { margin-bottom: 1.85rem; }
.ed-landing__live-eyebrow {
  font-family: var(--at-mono); font-size: 0.68rem;
  letter-spacing: 0.18em; text-transform: uppercase;
  color: var(--at-teal); margin-bottom: 1rem;
  display: flex; align-items: center; gap: 0.75rem;
}
.ed-landing__live-title {
  font-family: var(--at-serif);
  font-size: clamp(1.5rem, 2.6vw, 2rem);
  font-weight: 600; letter-spacing: -0.02em;
  line-height: 1.1; margin: 0 0 0.6rem; color: var(--at-navy-deep);
}
.ed-landing__live-sub {
  font-family: var(--at-sans); font-size: 0.95rem;
  line-height: 1.6; color: var(--at-mute-2); margin: 0;
}
.ed-landing__live-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(13rem, 1fr));
  gap: 0.85rem;
}
.ed-landing__tpp {
  display: flex; align-items: center; gap: 0.85rem;
  padding: 1rem 1.15rem; background: var(--at-bg-cream);
  border: 1px solid var(--at-grid-line); min-height: 4.5rem;
  text-decoration: none; color: inherit;
  transition: border-color 0.15s ease;
}
.ed-landing__tpp:hover { border-color: var(--at-teal-deep); }
.ed-landing__tpp--skel {
  background: color-mix(in srgb, var(--at-grid-line) 30%, var(--at-bg-cream));
}
.ed-landing__tpp--more {
  flex-direction: column;
  justify-content: center;
  gap: 0.2rem;
  background: color-mix(in srgb, var(--at-teal-deep) 6%, var(--at-bg-cream));
  border-style: dashed;
  text-align: center;
}
.ed-landing__tpp-more-dots {
  font-family: var(--at-serif); font-size: 1.4rem;
  letter-spacing: 0.08em; font-weight: 600;
  color: var(--at-teal-deep); line-height: 1;
}
.ed-landing__tpp-more-label {
  font-family: var(--at-mono); font-size: 0.66rem;
  letter-spacing: 0.14em; text-transform: uppercase;
  font-weight: 700; color: var(--at-teal-deep);
}
.ed-landing__tpp-logo {
  flex-shrink: 0; width: 2.5rem; height: 2.5rem;
  display: flex; align-items: center; justify-content: center;
  background: var(--at-surface); border: 1px solid var(--at-grid-line); overflow: hidden;
}
.ed-landing__tpp-logo img { width: 100%; height: 100%; object-fit: contain; }
.ed-landing__tpp-initials {
  font-family: var(--at-mono); font-size: 0.78rem; font-weight: 700;
  color: var(--at-teal-deep); letter-spacing: 0.04em;
}
.ed-landing__tpp-name {
  font-family: var(--at-sans); font-size: 0.92rem; font-weight: 600;
  color: var(--at-navy-deep); line-height: 1.3;
  overflow: hidden; text-overflow: ellipsis;
  display: -webkit-box; -webkit-line-clamp: 2; line-clamp: 2; -webkit-box-orient: vertical;
}
.ed-landing__live-empty {
  font-family: var(--at-sans); font-size: 0.95rem;
  color: var(--at-mute-2); margin: 0;
}
.ed-landing__live-cta {
  display: inline-flex; align-items: center; gap: 0.6rem;
  margin-top: 1.5rem; font-family: var(--at-mono);
  font-size: 0.82rem; letter-spacing: 0.1em; text-transform: uppercase;
  font-weight: 700; color: var(--at-teal-deep);
  text-decoration: none; border-bottom: 1px solid currentColor; padding-bottom: 0.25rem;
}
.ed-landing__live-cta-arrow { transition: transform 0.18s ease; }
.ed-landing__live-cta:hover .ed-landing__live-cta-arrow { transform: translateX(3px); }

.ed-landing__contents {
  background: var(--at-bg-cream);
  border-top: 1px solid var(--at-grid-line);
  padding: 3.5rem 0 4rem;
}
.ed-landing__contents .ed-landing__inner { padding-top: 0; padding-bottom: 0; }

.ed-landing__contents-head { margin-bottom: 1.85rem; }
.ed-landing__contents-eyebrow {
  font-family: var(--at-mono); font-size: 0.68rem;
  letter-spacing: 0.18em; text-transform: uppercase;
  color: var(--at-teal); margin-bottom: 1rem;
  display: flex; align-items: center; gap: 0.75rem;
}
.ed-landing__contents-title {
  font-family: var(--at-serif);
  font-size: clamp(1.5rem, 2.6vw, 2rem);
  font-weight: 600; letter-spacing: -0.02em;
  line-height: 1.1; margin: 0 0 0.6rem; color: var(--at-navy-deep);
}
.ed-landing__contents-sub {
  font-family: var(--at-sans); font-size: 0.95rem;
  line-height: 1.6; color: var(--at-mute-2); margin: 0;
}
.ed-landing__contents-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(22.5rem, 1fr));
  gap: 1.25rem;
}

.ed-link-card {
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
.ed-link-card:hover {
  border-color: var(--card-color, var(--at-navy));
  transform: translateY(-2px);
}
.ed-link-card__top {
  position: absolute; top: 0; left: 0;
  width: 48px; height: 3px;
  background: var(--card-color, var(--at-navy));
}
.ed-link-card__meta {
  display: flex; align-items: center; gap: 0.65rem;
  margin-bottom: 0.85rem;
  font-family: var(--at-mono); font-size: 0.62rem;
  letter-spacing: 0.12em; text-transform: uppercase;
  flex-wrap: wrap;
}
.ed-link-card__cat { font-weight: 700; color: var(--card-color, var(--at-navy)); }
.ed-link-card__path {
  font-family: var(--at-mono); font-size: 0.78rem;
  font-weight: 500; letter-spacing: -0.005em; text-transform: none;
  color: var(--at-navy-deep); background: none; padding: 0;
}
.ed-link-card__title {
  font-family: var(--at-serif); font-size: 1.4rem;
  font-weight: 500; line-height: 1.2; letter-spacing: -0.02em;
  color: var(--at-navy-deep); margin: 0 0 0.85rem;
}
.ed-link-card__desc {
  font-family: var(--at-sans); font-size: 0.92rem; line-height: 1.6;
  color: var(--at-mute-2); margin: 0 0 1.1rem; flex: 1;
}
.ed-link-card__desc :deep(code) {
  font-family: var(--at-mono); font-size: 0.82em;
  background: rgba(0, 39, 127, 0.06); padding: 0.08em 0.35em; color: var(--at-navy-deep);
}
.ed-link-card__foot {
  display: flex; align-items: center; justify-content: space-between;
  padding-top: 0.85rem; border-top: 1px solid var(--at-grid-line);
  font-family: var(--at-mono); font-size: 0.66rem;
  letter-spacing: 0.14em; text-transform: uppercase; font-weight: 700; color: var(--at-mute);
}
.ed-link-card__arrow {
  color: var(--card-color, var(--at-navy));
  transition: transform 0.2s ease;
}
.ed-link-card:hover .ed-link-card__arrow { transform: translateX(4px); }

@media (max-width: 720px) {
  .ed-landing__inner { padding: 2.75rem 1.25rem 2rem; }
  .ed-landing__role { padding: 2rem 0 2.25rem; }
  .ed-landing__live, .ed-landing__contents, .ed-landing__coverage { padding: 2.5rem 0 3.5rem; }
  .ed-landing__role-card { padding: 1.5rem 1.5rem 1.35rem; }
  .ed-cov { grid-template-columns: 1fr; }
  .ed-cov__cell--label { border-right: 0; }
}
</style>
