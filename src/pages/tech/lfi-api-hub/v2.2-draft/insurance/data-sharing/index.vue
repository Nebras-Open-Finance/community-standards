<route lang="yaml">
meta:
  title: Insurance Data Sharing
  isIndex: true
</route>

<script setup lang="ts">
import { allEndpoints, endpointUrl } from '@/data/endpoints'

// The endpoint registry spans every version, so listings are scoped to the
// version segment of this page's route.
const { docsVersion } = useRouteVersion()

const sectionEndpoints = computed(() =>
  allEndpoints.filter(
    (e) =>
      e.surface === 'ozone-connect'
      && e.sectionSlug === 'insurance-data-sharing'
      && e.version === docsVersion.value,
  ),
)

const insuranceTypes = [
  'Employment', 'Health', 'Home', 'Life', 'Motor', 'Renters', 'Travel',
] as const

const capabilities: { title: string; html: string }[] = [
  {
    title: 'Policy Information',
    html: 'Expose policy details &mdash; product, status, dates, sums insured, coverage, exclusions, and policy-holder information &mdash; through one pair of endpoints per insurance sector you underwrite.',
  },
  {
    title: 'Customer &amp; Beneficiaries',
    html: 'Return identity, contact, and beneficiary information held on each policy when the TPP holds the matching <code>ReadCustomer*</code> permission, subject to data-minimisation rules.',
  },
  {
    title: 'Encrypted Premium',
    html: 'When the TPP holds <code>ReadInsurancePremium</code>, the <code>Premium</code> field MUST be returned as a JWE so it is only decryptable on the customer&rsquo;s device. The cleartext premium never traverses the TPP backend.',
  },
  {
    title: 'Claims History',
    html: 'When the TPP holds <code>ReadCustomerClaims</code>, expose claims raised against the policy &mdash; status, dates, amounts, and triggering events &mdash; to support switching, broking, and risk-assessment use cases.',
  },
  {
    title: 'Product Information',
    html: 'Structured product detail for the underwritten policy &mdash; cover type, features, terms, and add-ons. Returned when the consent includes <code>ReadInsuranceProduct</code>.',
  },
]
</script>

<template>
  <div class="ed-landing">
    <section class="ed-landing__hero">
      <div class="ed-landing__inner">
        <div class="ed-landing__eyebrow">
          <span class="ed-landing__eyebrow-dash" />
          Insurance &middot; LFI capability
        </div>
        <h1 class="ed-landing__title">
          Insurance Data Sharing
          <span class="ed-landing__read">2 min read</span>
        </h1>
        <p class="ed-landing__lede">
          The Open Finance Insurance Data Sharing capabilities let your LFI expose a customer&rsquo;s
          policy data to consented TPPs across the UAE&rsquo;s major insurance sectors. Implementation
          mirrors Bank Data Sharing: the API Hub validates consent, proxies requests to your Ozone
          Connect server, and returns the response to the TPP.
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
            Access to the Insurance Data Sharing APIs requires TPPs to hold the
            <strong>ISP</strong> role. The API Hub validates the role on every request before proxying
            it to your Ozone Connect endpoints.
          </p>
        </div>

        <div class="ed-landing__caps-head">
          <div class="ed-landing__caps-eyebrow">
            <span class="ed-landing__eyebrow-dash" />
            What your Ozone Connect endpoints expose
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
            Implement the endpoint pair for each insurance sector your LFI underwrites. The Hub routes
            requests by path; sectors you do not offer simply remain unmounted.
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

    <section class="ed-landing__contents">
      <div class="ed-landing__inner">
        <div class="ed-landing__contents-head">
          <div class="ed-landing__contents-eyebrow">
            <span class="ed-landing__eyebrow-dash" />
            Section contents
          </div>
          <h2 class="ed-landing__contents-title">Browse this section</h2>
          <p class="ed-landing__contents-sub">
            The full set of pages for the Insurance Data Sharing API on the LFI side.
          </p>
        </div>

        <div class="ed-landing__contents-grid">
          <a
            class="ed-link-card"
            href="/tech/lfi-api-hub/v2.2-draft/insurance/data-sharing/requirements"
            :style="{ '--card-color': 'var(--at-gold, #b08800)' }"
          >
            <span class="ed-link-card__top" />
            <div class="ed-link-card__meta">
              <span class="ed-link-card__cat">Requirements</span>
            </div>
            <h3 class="ed-link-card__title">Insurance Data Sharing &mdash; Requirements</h3>
            <p class="ed-link-card__desc">
              Validation rules and behaviour your Ozone Connect endpoints must follow.
            </p>
            <div class="ed-link-card__foot">
              <span class="ed-link-card__cta">Open</span>
              <span class="ed-link-card__arrow">&rarr;</span>
            </div>
          </a>

          <a
            class="ed-link-card"
            href="/tech/lfi-api-hub/v2.2-draft/insurance/data-sharing/api-guide/"
            :style="{ '--card-color': 'var(--at-teal)' }"
          >
            <span class="ed-link-card__top" />
            <div class="ed-link-card__meta">
              <span class="ed-link-card__cat">API Guide</span>
            </div>
            <h3 class="ed-link-card__title">Insurance Data Sharing &mdash; API Guide</h3>
            <p class="ed-link-card__desc">
              How your Ozone Connect server receives, processes, and responds to Insurance Data Sharing
              requests proxied by the API Hub.
            </p>
            <div class="ed-link-card__foot">
              <span class="ed-link-card__cta">Open</span>
              <span class="ed-link-card__arrow">&rarr;</span>
            </div>
          </a>

          <a
            class="ed-link-card"
            href="/tech/lfi-api-hub/v2.2-draft/insurance/data-sharing/user-journeys"
            :style="{ '--card-color': 'var(--at-navy)' }"
          >
            <span class="ed-link-card__top" />
            <div class="ed-link-card__meta">
              <span class="ed-link-card__cat">User Journeys</span>
            </div>
            <h3 class="ed-link-card__title">Insurance Data Sharing &mdash; User Journeys</h3>
            <p class="ed-link-card__desc">
              The end-to-end customer flow when sharing insurance data &mdash; from the TPP consent
              screen through your LFI&rsquo;s authorisation pages and back.
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
              OpenAPI reference for the <code>{{ ep.method }} {{ ep.path }}</code> Ozone Connect
              endpoint.
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
  .ed-landing__contents, .ed-landing__coverage { padding: 2.5rem 0 3.5rem; }
  .ed-landing__role-card { padding: 1.5rem 1.5rem 1.35rem; }
  .ed-cov { grid-template-columns: 1fr; }
  .ed-cov__cell--label { border-right: 0; }
}
</style>
