<route lang="yaml">
meta:
  title: Payments (Service Initiation)
  isIndex: true
</route>

<script setup lang="ts">
// Live-ecosystem mini-feed — LFIs listed in the directory as exposing
// payments. Aligned with `/program/whats-live?family=payment`.
const { liveLfis, totalCount: totalLfiCount, loadError } = useLiveLfis(['payment'], 4)

function initials(name: string): string {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]?.toUpperCase() ?? '').join('')
}

interface CapSub { title: string; hint: string; url: string }
interface CapCard {
  tone: 'gold' | 'teal' | 'navy' | 'violet'
  category: string
  title: string
  desc: string
  url: string | null
  subs: CapSub[]
}

const SI_BASE = '/tech/tpp-standards/v2.1/banking/service-initiation'

function paymentSubs(slug: string): CapSub[] {
  const base = `${SI_BASE}/domestic-payments/${slug}`
  return [
    { title: 'Requirements', hint: 'Validation rules and field-level constraints', url: `${base}/requirements` },
    { title: 'User Experience', hint: 'Step-by-step customer journey', url: `${base}/user-journeys` },
    { title: 'API Guide', hint: 'End-to-end implementation walk-through', url: `${base}/api-guide` },
  ]
}

const cards: CapCard[] = [
  {
    tone: 'gold',
    category: 'Domestic payment',
    title: 'Single Instant Payment',
    desc: 'A one-time payment authorised and submitted in a single flow. Suited to checkout, bill settlement, and any one-known-amount payment to a known recipient.',
    url: null,
    subs: paymentSubs('single-instant-payment'),
  },
  {
    tone: 'gold',
    category: 'Multi-payment consent · On Demand',
    title: 'Variable On Demand',
    desc: 'Variable amounts within agreed limits, triggered on demand. Suited to subscription billing, wallet top-ups, and discretionary recurring charges.',
    url: null,
    subs: paymentSubs('multi-payments/variable-on-demand'),
  },
  {
    tone: 'gold',
    category: 'Multi-payment consent · On Demand',
    title: 'Fixed On Demand',
    desc: 'Fixed per-payment amount, triggered on demand within the consent period.',
    url: null,
    subs: paymentSubs('multi-payments/fixed-on-demand'),
  },
  {
    tone: 'gold',
    category: 'Multi-payment consent · Periodic',
    title: 'Variable Periodic Schedule',
    desc: 'Exactly one payment per calendar period, variable amount per payment. Suited to regular bills.',
    url: null,
    subs: paymentSubs('multi-payments/variable-periodic-schedule'),
  },
  {
    tone: 'gold',
    category: 'Multi-payment consent · Periodic',
    title: 'Fixed Periodic Schedule',
    desc: 'Exactly one payment per calendar period at a fixed amount. Suited to standing payment arrangements.',
    url: null,
    subs: paymentSubs('multi-payments/fixed-periodic-schedule'),
  },
  {
    tone: 'gold',
    category: 'Multi-payment consent · Defined',
    title: 'Variable Defined Schedule',
    desc: 'Payments locked to specific future dates set at consent time, variable amount per payment.',
    url: null,
    subs: paymentSubs('multi-payments/variable-defined-schedule'),
  },
  {
    tone: 'gold',
    category: 'Multi-payment consent · Defined',
    title: 'Fixed Defined Schedule',
    desc: 'Payments locked to specific future dates at fixed amounts. Suited to instalment plans and known future obligations.',
    url: null,
    subs: paymentSubs('multi-payments/fixed-defined-schedule'),
  },
  {
    tone: 'gold',
    category: 'Multi-payment consent · Delegated SCA',
    title: 'Delegated SCA',
    desc: 'Multi-payment flows where strong customer authentication is delegated to the TPP at consent time.',
    url: null,
    subs: paymentSubs('multi-payments/delegated-sca'),
  },
  {
    tone: 'teal',
    category: 'Repayment',
    title: 'Refunds',
    desc: 'Refund initiation against a previously-executed payment consent.',
    url: null,
    subs: [
      { title: 'Requirements', hint: 'Validation rules and field-level constraints', url: `${SI_BASE}/refunds/requirements` },
      { title: 'API Guide', hint: 'End-to-end implementation walk-through', url: `${SI_BASE}/refunds/api-guide` },
    ],
  },
  {
    tone: 'navy',
    category: 'Sensitive data',
    title: 'Personal Identifiable Information',
    desc: 'How creditor and debtor PII is presented and validated across payment consents — encryption, payload structure, and per-LFI validation.',
    url: `${SI_BASE}/personal-identifiable-information/`,
    subs: [],
  },
  {
    tone: 'violet',
    category: 'Approval flow',
    title: 'Multi-Authorization',
    desc: 'Subsequent-authoriser flows for payments requiring approval from more than one customer.',
    url: `${SI_BASE}/multi-authorization`,
    subs: [],
  },
]
</script>

<template>
  <div class="ed-landing">
    <section class="ed-landing__hero">
      <div class="ed-landing__inner">
        <div class="ed-landing__eyebrow">
          <span class="ed-landing__eyebrow-dash" />
          Banking · TPP capability
        </div>
        <h1 class="ed-landing__title">
          Payments (Service Initiation)
          <span class="ed-landing__read">2 min read</span>
        </h1>
        <p class="ed-landing__lede">The Open Finance Payment Service Initiation capabilities enable TPPs to initiate payments on behalf of customers under explicit, consent-driven authorisation.</p>
        <p class="ed-landing__lede ed-landing__lede--tight">All payment initiations operate under explicit customer consent. The TPP requests the consent, the customer authorises it at their LFI, and the TPP may then submit payments within the bounds of what was authorised.</p>
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
            <span class="ed-landing__role-chip">BSIP</span>
            <h2 class="ed-landing__role-title">Bank Service Initiation Provider</h2>
          </div>
          <p class="ed-landing__role-body">Access to the Payment Service Initiation APIs requires the <strong>BSIP</strong> role. This role must be assigned to your application in the Trust Framework before making any payment requests. See <a href="/tech/tpp-standards/trust-framework/roles">Roles</a> for the full list of scopes and grant types this role permits. <br><br> Note &mdash; within payments there is the ability to receive a small amount of data sharing permissions. If your consent includes <code>ReadAccountsBasic</code>, <code>ReadAccountsDetail</code>, or <code>ReadBalances</code>, in order to access this functionality you will also need the <strong>BDSP</strong> role.</p>
        </div>
        <div class="ed-landing__caps-head">
          <div class="ed-landing__caps-eyebrow">
            <span class="ed-landing__eyebrow-dash" />
            What's included
          </div>
        </div>
        <h3 class="ed-landing__role-h3">Single Instant Payment</h3>
    <p class="ed-landing__role-body">A one-time payment initiated immediately upon consent authorisation. The TPP specifies a fixed creditor account and amount at consent time; the customer authorises and the payment is submitted in a single flow. Suitable for checkout payments, bill settlement, and any scenario where a single, known amount is being paid to a known recipient.</p>

    <h3 class="ed-landing__role-h3">Multi-Payment Consents</h3>
    <p class="ed-landing__role-body" style="margin-bottom: 1rem;">Multi-payment consents allow a TPP to initiate a series of payments over time under a single customer authorisation. The customer authorises the consent once; the TPP can then submit payments as needed within the rules defined at consent time. There are several variants, each suited to different use cases:</p>

    <div class="ed-cov" role="table" style="grid-template-columns: minmax(12rem, 16rem) repeat(3, 1fr); margin-bottom: 1rem;">
      <div class="ed-cov__row ed-cov__row--head" role="row">
        <div class="ed-cov__cell ed-cov__cell--label">Consent Type</div>
        <div class="ed-cov__cell">Amount</div>
        <div class="ed-cov__cell">Timing</div>
        <div class="ed-cov__cell">Creditor</div>
      </div>
      
      <div class="ed-cov__row" role="row">
        <div class="ed-cov__cell ed-cov__cell--label" style="text-align: left;"><strong>Variable On Demand</strong></div>
        <div class="ed-cov__cell" style="text-align: left;">Variable, within limits</div>
        <div class="ed-cov__cell" style="text-align: left;">On demand</div>
        <div class="ed-cov__cell" style="text-align: left;">1–10 defined, or undefined</div>
      </div>
      <div class="ed-cov__row" role="row">
        <div class="ed-cov__cell ed-cov__cell--label" style="text-align: left;"><strong>Fixed On Demand</strong></div>
        <div class="ed-cov__cell" style="text-align: left;">Fixed per-payment</div>
        <div class="ed-cov__cell" style="text-align: left;">On demand</div>
        <div class="ed-cov__cell" style="text-align: left;">1 defined</div>
      </div>
      <div class="ed-cov__row" role="row">
        <div class="ed-cov__cell ed-cov__cell--label" style="text-align: left;"><strong>Variable Periodic Schedule</strong></div>
        <div class="ed-cov__cell" style="text-align: left;">Variable per payment</div>
        <div class="ed-cov__cell" style="text-align: left;">Fixed schedule (1 per period)</div>
        <div class="ed-cov__cell" style="text-align: left;">1 defined</div>
      </div>
      <div class="ed-cov__row" role="row">
        <div class="ed-cov__cell ed-cov__cell--label" style="text-align: left;"><strong>Fixed Periodic Schedule</strong></div>
        <div class="ed-cov__cell" style="text-align: left;">Fixed per payment</div>
        <div class="ed-cov__cell" style="text-align: left;">Fixed schedule (1 per period)</div>
        <div class="ed-cov__cell" style="text-align: left;">1 defined</div>
      </div>
      <div class="ed-cov__row" role="row">
        <div class="ed-cov__cell ed-cov__cell--label" style="text-align: left;"><strong>Variable Defined Schedule</strong></div>
        <div class="ed-cov__cell" style="text-align: left;">Variable per payment</div>
        <div class="ed-cov__cell" style="text-align: left;">Defined dates</div>
        <div class="ed-cov__cell" style="text-align: left;">1 defined</div>
      </div>
      <div class="ed-cov__row" role="row">
        <div class="ed-cov__cell ed-cov__cell--label" style="text-align: left;"><strong>Fixed Defined Schedule</strong></div>
        <div class="ed-cov__cell" style="text-align: left;">Fixed per payment</div>
        <div class="ed-cov__cell" style="text-align: left;">Defined dates</div>
        <div class="ed-cov__cell" style="text-align: left;">1 defined</div>
      </div>
    </div>

    <p class="ed-landing__role-body" style="margin-bottom: 0.85rem;"><strong>On Demand</strong> types let the TPP trigger payments at any time within the consent's period and limits, making them suitable for subscription billing, wallet top-ups, and discretionary recurring charges.</p>
    <p class="ed-landing__role-body" style="margin-bottom: 0.85rem;"><strong>Periodic Schedule</strong> types enforce exactly one payment per calendar period (e.g. weekly, monthly), making them well suited to regular bills and standing payment arrangements.</p>
    <p class="ed-landing__role-body"><strong>Defined Schedule</strong> types lock payments to specific future dates set at consent time, which is ideal for instalment plans and known future obligations.</p>

    <h3 class="ed-landing__role-h3">Delegated SCA</h3>
    <p class="ed-landing__role-body">Delegated SCA is a variant of multi-payment consent where Strong Customer Authentication is performed by the TPP rather than the LFI. This enables a frictionless in-app payment experience &mdash; the customer authenticates once within the TPP's interface, and the LFI accepts that authentication for subsequent payments. Delegated SCA requires the TPP to hold an explicit delegation from the LFI and is subject to additional requirements. See <a href="/tech/tpp-standards/v2.1/banking/service-initiation/domestic-payments/multi-payments/delegated-sca/requirements">Delegated SCA</a> for details.</p>
      </div>
    </section>

    <section class="ed-landing__live">
      <div class="ed-landing__inner">
        <div class="ed-landing__live-head">
          <div class="ed-landing__live-eyebrow">
            <span class="ed-landing__eyebrow-dash" />
            Live ecosystem
          </div>
          <h2 class="ed-landing__live-title">Which LFIs are live for Payment Initiation</h2>
          <p class="ed-landing__live-sub">LFIs currently accepting payment consents across UAE Open Finance.</p>
        </div>

        <ClientOnly>
          <div v-if="liveLfis.length" class="ed-landing__live-grid">
            <a
              v-for="lfi in liveLfis"
              :key="lfi.key"
              class="ed-landing__tpp"
              :title="lfi.legalName"
              href="/program/whats-live?family=payment"
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
              href="/program/whats-live?family=payment"
              :title="`See all ${totalLfiCount} LFIs`"
            >
              <span class="ed-landing__tpp-more-dots">&hellip;</span>
              <span class="ed-landing__tpp-more-label">+{{ totalLfiCount - liveLfis.length }} more</span>
            </a>
          </div>
          <p v-else-if="loadError" class="ed-landing__live-empty">Live data is currently unavailable.</p>
          <p v-else class="ed-landing__live-empty">No LFIs are currently active for this capability.</p>

          <a
            v-if="totalLfiCount > 0"
            class="ed-landing__live-cta"
            href="/program/whats-live?family=payment"
          >
            <span v-if="totalLfiCount > liveLfis.length">
              See all {{ totalLfiCount }} LFIs in the live ecosystem
            </span>
            <span v-else>View in the live ecosystem dashboard</span>
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
          <p class="ed-landing__contents-sub">The full set of pages for the Payments (Service Initiation) API.</p>
        </div>

        <div class="ed-cap-grid">
          <component
            :is="card.url ? 'a' : 'div'"
            v-for="card in cards"
            :key="card.title"
            :href="card.url || undefined"
            class="ed-cap-card"
            :class="`ed-cap-card--${card.tone}`"
          >
            <span class="ed-cap-card__top" />
            <div class="ed-cap-card__head">
              <div class="ed-cap-card__meta">
                <span class="ed-cap-card__meta-dot" />
                {{ card.category }}
              </div>
              <h3 class="ed-cap-card__title">{{ card.title }}</h3>
              <p class="ed-cap-card__desc">{{ card.desc }}</p>
            </div>
            <ul v-if="card.subs.length" class="ed-cap-card__subs">
              <li v-for="sub in card.subs" :key="sub.url">
                <a :href="sub.url" class="ed-cap-card__sub">
                  <span class="ed-cap-card__sub-marker" />
                  <span class="ed-cap-card__sub-main">
                    <span class="ed-cap-card__sub-title">{{ sub.title }}</span>
                    <span class="ed-cap-card__sub-hint">{{ sub.hint }}</span>
                  </span>
                  <span class="ed-cap-card__sub-arrow" aria-hidden="true">&rarr;</span>
                </a>
              </li>
            </ul>
          </component>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.ed-landing { background: var(--at-bg-cream); color: var(--at-navy-deep); font-family: var(--at-sans); padding-top: 4.25rem; min-height: 100vh; }

.ed-landing__hero { background: var(--at-bg-cream); border-bottom: 1px solid var(--at-grid-line); }
.ed-landing__inner { max-width: var(--at-page-max); margin: 0 auto; padding: 4rem 2rem 3rem; }
.ed-landing__eyebrow { font-family: var(--at-mono); font-size: 0.68rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--at-teal); margin-bottom: 1.25rem; display: flex; align-items: center; gap: 0.75rem; }
.ed-landing__eyebrow-dash { width: 24px; height: 1px; background: currentColor; }
.ed-landing__title { font-family: var(--at-serif); font-size: clamp(2.25rem, 5vw, 3.6rem); font-weight: 600; line-height: 1.02; letter-spacing: -0.03em; margin: 0; display: flex; align-items: baseline; flex-wrap: wrap; gap: 0.85rem; }
.ed-landing__read { font-family: var(--at-mono); font-size: 0.7rem; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 500; color: var(--at-mute); align-self: center; padding-left: 0.6rem; border-left: 1px solid var(--at-grid-line-2); }
.ed-landing__lede { font-family: var(--at-sans); font-size: 1.1rem; line-height: 1.65; margin: 1.75rem 0 0; max-width: 50rem; color: var(--at-mute-2); }
.ed-landing__lede--tight { margin-top: 0.85rem; }

.ed-landing__role { background: var(--at-surface); border-top: 1px solid var(--at-grid-line); padding: 3rem 0 3.5rem; }
.ed-landing__role .ed-landing__inner { padding-top: 0; padding-bottom: 0; }
.ed-landing__role-card { position: relative; padding: 2.25rem 2.5rem 2rem; background: var(--at-bg-cream); border: 1px solid var(--at-grid-line); }
.ed-landing__role-card::before { content: ""; position: absolute; top: 0; left: 0; bottom: 0; width: 3px; background: #1d4ed8; }
.ed-landing__role-meta { font-family: var(--at-mono); font-size: 0.66rem; letter-spacing: 0.16em; text-transform: uppercase; font-weight: 700; color: #1d4ed8; margin-bottom: 1.1rem; display: flex; align-items: center; gap: 0.6rem; }
.ed-landing__role-tag { display: inline-block; font-size: 0.6rem; letter-spacing: 0.1em; font-weight: 600; color: var(--at-mute); border: 1px solid var(--at-grid-line-2); padding: 0.15rem 0.5rem; background: var(--at-surface); }
.ed-landing__role-head { display: flex; align-items: baseline; flex-wrap: wrap; gap: 1rem; margin-bottom: 1rem; }
.ed-landing__role-chip { display: inline-block; font-family: var(--at-mono); font-size: 1rem; letter-spacing: 0.08em; font-weight: 700; color: #1d4ed8; background: rgba(29, 78, 216, 0.1); padding: 0.45rem 0.85rem; align-self: center; }
.ed-landing__role-title { font-family: var(--at-serif); font-size: clamp(1.5rem, 2.6vw, 2rem); font-weight: 600; letter-spacing: -0.02em; line-height: 1.1; margin: 0; color: var(--at-navy-deep); }
.ed-landing__role-body { font-family: var(--at-sans); font-size: 1rem; line-height: 1.65; color: var(--at-mute-2); margin: 0; max-width: 60rem; }
.ed-landing__role-body strong { color: var(--at-navy-deep); font-weight: 600; }
.ed-landing__role-body :deep(code), .ed-landing__role-body code { font-family: var(--at-mono); font-size: 0.86em; background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream)); border: 1px solid var(--at-grid-line); padding: 0.08em 0.4em; }
.ed-landing__role-body :deep(a), .ed-landing__role-body a { color: var(--at-teal-deep); text-decoration: none; border-bottom: 1px solid currentColor; }
.ed-landing__role-h3 { font-family: var(--at-serif); font-size: 1.15rem; font-weight: 600; letter-spacing: -0.015em; color: var(--at-navy-deep); margin: 1.75rem 0 0.65rem; }

.ed-landing__caps-head { margin: 3rem 0 1.25rem; }
.ed-landing__caps-eyebrow { font-family: var(--at-mono); font-size: 0.68rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--at-teal); display: flex; align-items: center; gap: 0.75rem; }

.ed-landing__live { background: var(--at-bg-cream); border-top: 1px solid var(--at-grid-line); padding: 3.5rem 0 5rem; }
.ed-landing__live .ed-landing__inner { padding-top: 0; padding-bottom: 0; }
.ed-landing__live-head { margin-bottom: 1.85rem; }
.ed-landing__live-eyebrow { font-family: var(--at-mono); font-size: 0.68rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--at-teal); margin-bottom: 1rem; display: flex; align-items: center; gap: 0.75rem; }
.ed-landing__live-title { font-family: var(--at-serif); font-size: clamp(1.5rem, 2.6vw, 2rem); font-weight: 600; letter-spacing: -0.02em; line-height: 1.1; margin: 0 0 0.6rem; color: var(--at-navy-deep); }
.ed-landing__live-sub { font-family: var(--at-sans); font-size: 0.95rem; line-height: 1.6; color: var(--at-mute-2); margin: 0; }
.ed-landing__live-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(13rem, 1fr)); gap: 0.85rem; }
.ed-landing__tpp { display: flex; align-items: center; gap: 0.85rem; padding: 1rem 1.15rem; background: var(--at-surface); border: 1px solid var(--at-grid-line); min-height: 4.5rem; text-decoration: none; color: inherit; transition: border-color 0.15s ease; }
.ed-landing__tpp:hover { border-color: var(--at-teal-deep); }
.ed-landing__tpp--skel { background: color-mix(in srgb, var(--at-grid-line) 30%, var(--at-surface)); }
.ed-landing__tpp--more { flex-direction: column; justify-content: center; gap: 0.2rem; background: color-mix(in srgb, var(--at-teal-deep) 6%, var(--at-surface)); border-style: dashed; text-align: center; }
.ed-landing__tpp-more-dots { font-family: var(--at-serif); font-size: 1.4rem; letter-spacing: 0.08em; font-weight: 600; color: var(--at-teal-deep); line-height: 1; }
.ed-landing__tpp-more-label { font-family: var(--at-mono); font-size: 0.66rem; letter-spacing: 0.14em; text-transform: uppercase; font-weight: 700; color: var(--at-teal-deep); }
.ed-landing__tpp-logo { flex-shrink: 0; width: 2.5rem; height: 2.5rem; display: flex; align-items: center; justify-content: center; background: var(--at-bg-cream); border: 1px solid var(--at-grid-line); overflow: hidden; }
.ed-landing__tpp-logo img { width: 100%; height: 100%; object-fit: contain; }
.ed-landing__tpp-initials { font-family: var(--at-mono); font-size: 0.78rem; font-weight: 700; color: var(--at-teal-deep); letter-spacing: 0.04em; }
.ed-landing__tpp-name { font-family: var(--at-sans); font-size: 0.92rem; font-weight: 600; color: var(--at-navy-deep); line-height: 1.3; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; line-clamp: 2; -webkit-box-orient: vertical; }
.ed-landing__live-empty { font-family: var(--at-sans); font-size: 0.95rem; color: var(--at-mute-2); margin: 0; }
.ed-landing__live-cta { display: inline-flex; align-items: center; gap: 0.6rem; margin-top: 1.5rem; font-family: var(--at-mono); font-size: 0.82rem; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 700; color: var(--at-teal-deep); text-decoration: none; border-bottom: 1px solid currentColor; padding-bottom: 0.25rem; }
.ed-landing__live-cta-arrow { transition: transform 0.18s ease; }
.ed-landing__live-cta:hover .ed-landing__live-cta-arrow { transform: translateX(3px); }

.ed-landing__coverage { background: var(--at-bg-cream); border-top: 1px solid var(--at-grid-line); padding: 3.5rem 0 4rem; }
.ed-landing__coverage .ed-landing__inner { padding-top: 0; padding-bottom: 0; }
.ed-cov__h3 { font-family: var(--at-serif); font-size: 1.15rem; font-weight: 600; letter-spacing: -0.015em; color: var(--at-navy-deep); margin: 1.75rem 0 0.85rem; }
.ed-cov__h3:first-of-type { margin-top: 0; }
.ed-cov { display: grid; grid-template-columns: minmax(14rem, 22rem) repeat(3, 1fr); border: 1px solid var(--at-grid-line); background: var(--at-surface); }
.ed-cov--endpoints { grid-template-columns: minmax(14rem, 22rem) repeat(5, 1fr); }
.ed-cov__row { display: contents; }
.ed-cov__cell { padding: 0.75rem 0.95rem; border-bottom: 1px solid var(--at-grid-line); font-family: var(--at-sans); font-size: 0.9rem; text-align: center; color: var(--at-navy-deep); }
.ed-cov__row:last-child .ed-cov__cell { border-bottom: 0; }
.ed-cov__cell--label { text-align: left; border-right: 1px solid var(--at-grid-line); }
.ed-cov__cell--label code { font-family: var(--at-mono); font-size: 0.85em; color: var(--at-navy-deep); background: none; border: 0; padding: 0; }
.ed-cov__row--head .ed-cov__cell { background: var(--at-navy-deep); font-family: var(--at-mono); font-size: 0.66rem; letter-spacing: 0.16em; text-transform: uppercase; font-weight: 700; color: var(--at-bg-cream); border-bottom: 0; padding-top: 0.7rem; padding-bottom: 0.7rem; }
.ed-cov__row--head .ed-cov__cell + .ed-cov__cell { border-left: 1px solid rgba(250, 250, 247, 0.18); }
.ed-cov__mark.is-yes { font-family: var(--at-mono); font-weight: 700; color: var(--at-teal-deep); }
.ed-cov__mark.is-no { font-family: var(--at-mono); color: var(--at-mute); }

.ed-landing__contents { background: var(--at-surface); border-top: 1px solid var(--at-grid-line); padding: 3.5rem 0 4rem; }
.ed-landing__contents .ed-landing__inner { padding-top: 0; padding-bottom: 0; }
.ed-landing__contents-head { margin-bottom: 1.85rem; }
.ed-landing__contents-eyebrow { font-family: var(--at-mono); font-size: 0.68rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--at-teal); margin-bottom: 1rem; display: flex; align-items: center; gap: 0.75rem; }
.ed-landing__contents-title { font-family: var(--at-serif); font-size: clamp(1.5rem, 2.6vw, 2rem); font-weight: 600; letter-spacing: -0.02em; line-height: 1.1; margin: 0 0 0.6rem; color: var(--at-navy-deep); }
.ed-landing__contents-sub { font-family: var(--at-sans); font-size: 0.95rem; line-height: 1.6; color: var(--at-mute-2); margin: 0; }
.ed-landing__contents-sub :deep(a), .ed-landing__contents-sub a { color: var(--at-teal-deep); text-decoration: none; border-bottom: 1px solid currentColor; }
.ed-landing__contents-sub :deep(code), .ed-landing__contents-sub code { font-family: var(--at-mono); font-size: 0.86em; background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream)); border: 1px solid var(--at-grid-line); padding: 0.08em 0.4em; }
.ed-landing__contents-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(22.5rem, 1fr)); gap: 1.25rem; }

/* ─── Capability cards ──────────────────────────────────────────────────── */
.ed-cap-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr)); gap: 1.25rem; }

.ed-cap-card { position: relative; display: flex; flex-direction: column; background: var(--at-bg-cream); border: 1px solid var(--at-grid-line); transition: border-color 0.2s ease, box-shadow 0.2s ease; }
.ed-cap-card:hover { border-color: var(--cap-color, var(--at-navy)); }
a.ed-cap-card { text-decoration: none; color: inherit; }
a.ed-cap-card:hover .ed-cap-card__title { color: var(--cap-color); }
a.ed-cap-card:focus-visible { outline: none; box-shadow: 0 0 0 2px color-mix(in srgb, var(--cap-color) 45%, transparent); }

.ed-cap-card--gold { --cap-color: var(--at-gold); }
.ed-cap-card--teal { --cap-color: var(--at-teal); }
.ed-cap-card--navy { --cap-color: var(--at-navy); }
.ed-cap-card--violet { --cap-color: #5b21b6; }

.ed-cap-card__top { position: absolute; top: 0; left: 0; width: 56px; height: 3px; background: var(--cap-color); z-index: 1; }

.ed-cap-card__head { padding: 1.85rem 1.6rem 1.25rem; flex: 1; }

.ed-cap-card__meta { display: flex; align-items: center; gap: 0.6rem; font-family: var(--at-mono); font-size: 0.62rem; letter-spacing: 0.14em; text-transform: uppercase; font-weight: 700; color: var(--cap-color); margin-bottom: 0.85rem; }
.ed-cap-card__meta-dot { width: 7px; height: 7px; background: var(--cap-color); border-radius: 50%; box-shadow: 0 0 0 3px color-mix(in srgb, var(--cap-color) 18%, transparent); flex-shrink: 0; }

.ed-cap-card__title { font-family: var(--at-serif); font-size: 1.35rem; font-weight: 500; letter-spacing: -0.02em; line-height: 1.15; color: var(--at-navy-deep); margin: 0 0 0.65rem; transition: color 0.15s ease; }
.ed-cap-card__desc { font-family: var(--at-sans); font-size: 0.92rem; line-height: 1.55; color: var(--at-mute-2); margin: 0; }

.ed-cap-card__subs { list-style: none; margin: 0; padding: 0 1.6rem 0.5rem; display: flex; flex-direction: column; }
.ed-cap-card__sub { display: flex; align-items: center; gap: 0.75rem; padding: 0.7rem 0.55rem; margin: 0 -0.55rem; border-top: 1px solid var(--at-grid-line); text-decoration: none; color: inherit; transition: background 0.15s ease; }
.ed-cap-card__sub:hover { background: color-mix(in srgb, var(--cap-color) 7%, transparent); }
.ed-cap-card__sub:focus-visible { outline: none; background: color-mix(in srgb, var(--cap-color) 10%, transparent); box-shadow: inset 0 0 0 2px color-mix(in srgb, var(--cap-color) 45%, transparent); }
.ed-cap-card__sub-marker { width: 6px; height: 6px; background: var(--cap-color); border-radius: 50%; flex-shrink: 0; opacity: 0.5; transition: opacity 0.15s ease, transform 0.15s ease; }
.ed-cap-card__sub:hover .ed-cap-card__sub-marker { opacity: 1; transform: scale(1.2); }
.ed-cap-card__sub-main { display: flex; flex-direction: column; gap: 0.15rem; flex: 1; min-width: 0; }
.ed-cap-card__sub-title { font-family: var(--at-sans); font-size: 0.92rem; font-weight: 600; color: var(--at-navy-deep); }
.ed-cap-card__sub-hint { font-family: var(--at-sans); font-size: 0.78rem; color: var(--at-mute); line-height: 1.4; }
.ed-cap-card__sub-arrow { font-family: var(--at-mono); font-size: 0.95rem; color: var(--cap-color); flex-shrink: 0; opacity: 0; transform: translateX(-4px); transition: opacity 0.15s ease, transform 0.15s ease; }
.ed-cap-card__sub:hover .ed-cap-card__sub-arrow { opacity: 1; transform: translateX(0); }

.ed-link-card { position: relative; display: flex; flex-direction: column; background: var(--at-bg-cream); border: 1px solid var(--at-grid-line); padding: 2rem 1.75rem 1.5rem; text-decoration: none; color: inherit; transition: border-color 0.2s ease, transform 0.2s ease; }
.ed-link-card:hover { border-color: var(--card-color, var(--at-navy)); transform: translateY(-2px); }
.ed-link-card__top { position: absolute; top: 0; left: 0; width: 48px; height: 3px; background: var(--card-color, var(--at-navy)); }
.ed-link-card__meta { display: flex; align-items: center; gap: 0.65rem; margin-bottom: 0.85rem; font-family: var(--at-mono); font-size: 0.62rem; letter-spacing: 0.12em; text-transform: uppercase; flex-wrap: wrap; }
.ed-link-card__cat { font-weight: 700; color: var(--card-color, var(--at-navy)); }
.ed-link-card__path { font-family: var(--at-mono); font-size: 0.78rem; font-weight: 500; letter-spacing: -0.005em; text-transform: none; color: var(--at-navy-deep); background: none; padding: 0; }
.ed-link-card__title { font-family: var(--at-serif); font-size: 1.4rem; font-weight: 500; line-height: 1.2; letter-spacing: -0.02em; color: var(--at-navy-deep); margin: 0 0 0.85rem; }
.ed-link-card__desc { font-family: var(--at-sans); font-size: 0.92rem; line-height: 1.6; color: var(--at-mute-2); margin: 0 0 1.1rem; flex: 1; }
.ed-link-card__desc :deep(code) { font-family: var(--at-mono); font-size: 0.82em; background: rgba(0, 39, 127, 0.06); padding: 0.08em 0.35em; color: var(--at-navy-deep); }
.ed-link-card__foot { display: flex; align-items: center; justify-content: space-between; padding-top: 0.85rem; border-top: 1px solid var(--at-grid-line); font-family: var(--at-mono); font-size: 0.66rem; letter-spacing: 0.14em; text-transform: uppercase; font-weight: 700; color: var(--at-mute); }
.ed-link-card__arrow { color: var(--card-color, var(--at-navy)); transition: transform 0.2s ease; }
.ed-link-card:hover .ed-link-card__arrow { transform: translateX(4px); }

@media (max-width: 720px) {
  .ed-landing__inner { padding: 2.75rem 1.25rem 2rem; }
  .ed-landing__role { padding: 2rem 0 2.25rem; }
  .ed-landing__live, .ed-landing__contents, .ed-landing__coverage { padding: 2.5rem 0 3.5rem; }
  .ed-landing__role-card { padding: 1.5rem 1.5rem 1.35rem; }
  .ed-cov, .ed-cov--endpoints { grid-template-columns: 1fr; }
  .ed-cov__cell--label { border-right: 0; }
}
</style>
