<route lang="yaml">
meta:
  title: Insurance Quotation
  isIndex: true
</route>

<script setup lang="ts">
const insuranceTypes = [
  'Employment', 'Health', 'Home', 'Life', 'Motor', 'Renters', 'Travel',
] as const

const capabilities: { title: string; html: string }[] = [
  {
    title: 'Quote Creation',
    html: 'Receive a quote request from a TPP on behalf of a customer and return one or more quotes for the named insurance sector. Quotes are sector-specific (Motor, Health, Home, Life, Employment, Renters, Travel) and carry a <code>QuoteId</code> the LFI mints and persists.',
  },
  {
    title: 'New, Renewal &amp; Switch',
    html: 'Each quote request specifies a <code>QuoteType</code> of <code>New</code>, <code>Renewal</code> (the customer is renewing an existing policy with you), or <code>Switch</code> (the customer is moving from an incumbent insurer). See <a href="/tech/lfi-api-hub/v2.2-rc1/insurance/quotation/quote-types">Quote Types</a> for the per-type validation differences.',
  },
  {
    title: 'LFI-Led or TPP-Led',
    html: 'On accept, declare <code>PolicyIssuanceAllowed</code> &mdash; the steps you permit the TPP to handle. In <strong>LFI-Led</strong> mode you host customer verification, payment, and documents. In <strong>TPP-Led</strong> mode the TPP collects KYC and surfaces an LFI-hosted payment URL to the customer.',
  },
  {
    title: 'Status Updates via Quote Log',
    html: 'Emit status events through <a href="/tech/lfi-api-hub/v2.2-rc1/api-hub/consent-manager/open-api/insurance-quote-log-logId"><code>PATCH /insurance-quote-log/{logId}</code></a> for every transition &mdash; <code>ApplicationPending</code>, <code>ApplicationApproved</code>, <code>PolicyIssued</code>, <code>Completed</code>, or any terminal state. The Hub records and (where the TPP subscribed) fans out to webhooks.',
  },
  {
    title: 'No Customer Consent',
    html: 'Insurance Quotation runs on the Client Credentials Grant. There is no per-customer consent journey on the Hub &mdash; the TPP authenticates as itself, and customer authorisation is gathered out-of-band by the TPP or via your hosted screens.',
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
          Insurance Quotation
          <span class="ed-landing__read">3 min read</span>
        </h1>
        <p class="ed-landing__lede">
          The Insurance Quotation capability lets TPPs request quotes, drive the application
          through to policy issuance, and receive real-time status updates &mdash; for every insurance
          sector your LFI underwrites. Your Ozone Connect endpoints execute the quote and policy
          lifecycle; the Hub mediates and fans status events out to subscribed TPPs.
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
            Access to the Insurance Quotation APIs requires TPPs to hold the
            <strong>ISP</strong> role. The API Hub validates the role on every request before proxying
            to your Ozone Connect endpoints. Unlike Insurance Data Sharing, there is <strong>no per-customer
            consent</strong> &mdash; TPPs authenticate with the Client Credentials Grant and act as
            themselves.
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
            Implement the quote and policy endpoints for each insurance sector your LFI underwrites.
            The Hub routes requests by path; sectors you do not offer simply remain unmounted.
          </p>
        </div>

        <div class="ed-cov ed-cov--insurance" role="table" aria-label="Insurance quotation endpoint coverage">
          <div class="ed-cov__row ed-cov__row--head" role="row">
            <div class="ed-cov__cell ed-cov__cell--label" role="columnheader">Insurance Type</div>
            <div class="ed-cov__cell" role="columnheader">Create Quote</div>
            <div class="ed-cov__cell" role="columnheader">Retrieve / Accept Quote</div>
            <div class="ed-cov__cell" role="columnheader">Create Policy</div>
          </div>
          <div v-for="t in insuranceTypes" :key="t" class="ed-cov__row" role="row">
            <div class="ed-cov__cell ed-cov__cell--label" role="cell">
              <strong>{{ t }}</strong>
              <code class="ed-cov__path">/{{ t.toLowerCase() }}-insurance-quotes</code>
            </div>
            <div class="ed-cov__cell" role="cell"><span class="ed-cov__mark is-yes">POST</span></div>
            <div class="ed-cov__cell" role="cell"><span class="ed-cov__mark is-yes">GET / PATCH</span></div>
            <div class="ed-cov__cell" role="cell"><span class="ed-cov__mark is-yes">POST</span></div>
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
            The full set of pages for the Insurance Quotation API on the LFI side.
          </p>
        </div>

        <div class="ed-landing__contents-grid">
          <a
            class="ed-link-card"
            href="/tech/lfi-api-hub/v2.2-rc1/insurance/quotation/requirements"
            :style="{ '--card-color': 'var(--at-gold, #b08800)' }"
          >
            <span class="ed-link-card__top" />
            <div class="ed-link-card__meta">
              <span class="ed-link-card__cat">Requirements</span>
            </div>
            <h3 class="ed-link-card__title">Insurance Quotation &mdash; Requirements</h3>
            <p class="ed-link-card__desc">
              Validation rules and behaviour your Ozone Connect endpoints must follow across the quote,
              accept, and policy creation steps.
            </p>
            <div class="ed-link-card__foot">
              <span class="ed-link-card__cta">Open</span>
              <span class="ed-link-card__arrow">&rarr;</span>
            </div>
          </a>

          <a
            class="ed-link-card"
            href="/tech/lfi-api-hub/v2.2-rc1/insurance/quotation/quote-types"
            :style="{ '--card-color': 'var(--at-violet, #6d28d9)' }"
          >
            <span class="ed-link-card__top" />
            <div class="ed-link-card__meta">
              <span class="ed-link-card__cat">Quote Types</span>
            </div>
            <h3 class="ed-link-card__title">New, Renewal &amp; Switch</h3>
            <p class="ed-link-card__desc">
              The semantic differences between the three <code>QuoteType</code> values and the per-type
              field requirements. Shared explainer referenced from the TPP standards as well.
            </p>
            <div class="ed-link-card__foot">
              <span class="ed-link-card__cta">Open</span>
              <span class="ed-link-card__arrow">&rarr;</span>
            </div>
          </a>

          <a
            class="ed-link-card"
            href="/tech/lfi-api-hub/v2.2-rc1/insurance/quotation/api-guide/"
            :style="{ '--card-color': 'var(--at-teal)' }"
          >
            <span class="ed-link-card__top" />
            <div class="ed-link-card__meta">
              <span class="ed-link-card__cat">API Guide</span>
            </div>
            <h3 class="ed-link-card__title">Insurance Quotation &mdash; API Guide</h3>
            <p class="ed-link-card__desc">
              End-to-end walkthrough of the LFI-Led and TPP-Led flows, status emission via the quote-log,
              and the mapping from each PATCH to the event the Hub fans out.
            </p>
            <div class="ed-link-card__foot">
              <span class="ed-link-card__cta">Open</span>
              <span class="ed-link-card__arrow">&rarr;</span>
            </div>
          </a>

          <a
            class="ed-link-card"
            href="/tech/lfi-api-hub/v2.2-rc1/insurance/quotation/user-journeys"
            :style="{ '--card-color': 'var(--at-navy)' }"
          >
            <span class="ed-link-card__top" />
            <div class="ed-link-card__meta">
              <span class="ed-link-card__cat">User Journeys</span>
            </div>
            <h3 class="ed-link-card__title">Insurance Quotation &mdash; User Journeys</h3>
            <p class="ed-link-card__desc">
              The hosted screens your LFI presents in LFI-Led mode (quote summary, customer verification,
              payment, documents) and the hosted payment URL handed back to the TPP in TPP-Led mode.
            </p>
            <div class="ed-link-card__foot">
              <span class="ed-link-card__cta">Open</span>
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

.ed-landing__role { background: var(--at-surface); border-top: 1px solid var(--at-grid-line); padding: 3rem 0 4rem; }
.ed-landing__role .ed-landing__inner { padding-top: 0; padding-bottom: 0; }
.ed-landing__role-card {
  border: 1px solid var(--at-grid-line); padding: 2rem 1.75rem;
  background: var(--at-bg-cream); margin-bottom: 3rem;
}
.ed-landing__role-meta {
  font-family: var(--at-mono); font-size: 0.62rem; letter-spacing: 0.16em;
  text-transform: uppercase; color: var(--at-mute); display: flex; gap: 0.5rem; margin-bottom: 0.75rem;
}
.ed-landing__role-tag {
  background: var(--at-navy-deep); color: var(--at-bg-cream);
  padding: 0.18em 0.5em; font-weight: 700;
}
.ed-landing__role-head { display: flex; align-items: center; gap: 0.85rem; margin-bottom: 0.85rem; }
.ed-landing__role-chip {
  background: var(--at-teal); color: var(--at-bg-cream);
  font-family: var(--at-mono); font-weight: 700; font-size: 0.85rem;
  padding: 0.25em 0.6em;
}
.ed-landing__role-title {
  font-family: var(--at-serif); font-size: 1.45rem; font-weight: 600;
  margin: 0; color: var(--at-navy-deep);
}
.ed-landing__role-body {
  font-family: var(--at-sans); font-size: 1rem; line-height: 1.6;
  color: var(--at-mute-2); margin: 0;
}
.ed-landing__role-body :deep(code) {
  font-family: var(--at-mono); font-size: 0.86em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line); padding: 0.08em 0.4em;
}

.ed-landing__caps-head {
  margin-bottom: 1.5rem;
}
.ed-landing__caps-eyebrow {
  font-family: var(--at-mono); font-size: 0.68rem; letter-spacing: 0.18em;
  text-transform: uppercase; color: var(--at-teal); display: flex; gap: 0.75rem; align-items: center;
}
.ed-caps {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  gap: 1.25rem;
}
.ed-cap {
  padding: 1.5rem; border: 1px solid var(--at-grid-line); background: var(--at-bg-cream);
}
.ed-cap__title {
  font-family: var(--at-serif); font-size: 1.1rem; font-weight: 600;
  margin: 0 0 0.6rem; color: var(--at-navy-deep);
}
.ed-cap__body {
  font-family: var(--at-sans); font-size: 0.92rem; line-height: 1.6;
  color: var(--at-mute-2); margin: 0;
}
.ed-cap__body :deep(code) {
  font-family: var(--at-mono); font-size: 0.86em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line); padding: 0.08em 0.4em;
}
.ed-cap__body :deep(a) { color: var(--at-navy-deep); text-decoration: underline; text-underline-offset: 3px; }

.ed-landing__coverage { background: var(--at-bg-cream); padding: 3rem 0 4rem; border-top: 1px solid var(--at-grid-line); }
.ed-landing__coverage .ed-landing__inner { padding-top: 0; padding-bottom: 0; }

.ed-cov {
  display: grid; grid-template-columns: 1.5fr 1fr 1.4fr 1fr;
  border: 1px solid var(--at-grid-line); background: var(--at-surface);
}
.ed-cov__row { display: contents; }
.ed-cov__cell {
  padding: 0.85rem 1rem; border-bottom: 1px solid var(--at-grid-line);
  font-family: var(--at-sans); font-size: 0.9rem; line-height: 1.5;
}
.ed-cov__row:last-child .ed-cov__cell { border-bottom: 0; }
.ed-cov__row--head .ed-cov__cell {
  background: var(--at-navy-deep); color: var(--at-bg-cream);
  font-family: var(--at-mono); font-size: 0.66rem;
  letter-spacing: 0.14em; text-transform: uppercase; font-weight: 700;
}
.ed-cov__cell--label { border-right: 1px solid var(--at-grid-line); display: flex; flex-direction: column; gap: 0.2rem; }
.ed-cov__path { font-family: var(--at-mono); font-size: 0.78rem; color: var(--at-mute); }
.ed-cov__mark { font-family: var(--at-mono); font-size: 0.8rem; font-weight: 700; color: var(--at-teal-deep); }

.ed-landing__contents { background: var(--at-bg-cream); border-top: 1px solid var(--at-grid-line); padding: 3.5rem 0 5rem; }
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
  display: flex; flex-direction: column;
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line);
  padding: 2rem 1.75rem 1.5rem;
  text-decoration: none; color: inherit;
  transition: border-color 0.2s ease, transform 0.2s ease;
}
.ed-link-card:hover { border-color: var(--card-color, var(--at-navy)); transform: translateY(-2px); }
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
}
.ed-link-card__cat { font-weight: 700; color: var(--card-color, var(--at-navy)); }
.ed-link-card__title {
  font-family: var(--at-serif); font-size: 1.3rem;
  font-weight: 500; line-height: 1.2; letter-spacing: -0.02em;
  color: var(--at-navy-deep); margin: 0 0 0.85rem;
}
.ed-link-card__desc {
  font-family: var(--at-sans); font-size: 0.95rem;
  line-height: 1.6; color: var(--at-mute-2); margin: 0 0 1.1rem;
  flex: 1;
}
.ed-link-card__desc :deep(code) {
  font-family: var(--at-mono); font-size: 0.82em;
  background: rgba(0, 39, 127, 0.06); padding: 0.08em 0.35em; color: var(--at-navy-deep);
}
.ed-link-card__foot {
  display: flex; align-items: center; justify-content: space-between;
  padding-top: 0.95rem; border-top: 1px solid var(--at-grid-line);
  font-family: var(--at-mono); font-size: 0.66rem;
  letter-spacing: 0.14em; text-transform: uppercase; font-weight: 700; color: var(--at-mute);
}
.ed-link-card__arrow { color: var(--card-color, var(--at-navy)); transition: transform 0.2s ease; }
.ed-link-card:hover .ed-link-card__arrow { transform: translateX(4px); }

@media (max-width: 720px) {
  .ed-landing__inner { padding: 2.75rem 1.25rem 2rem; }
  .ed-cov { grid-template-columns: 1fr; }
}
</style>
