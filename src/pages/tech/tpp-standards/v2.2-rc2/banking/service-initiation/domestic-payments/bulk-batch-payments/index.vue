<route lang="yaml">
meta:
  title: Bulk and Batch Payments
  isIndex: true
</route>

<script setup lang="ts">
const BASE = '/tech/tpp-standards/v2.2-rc2/banking/service-initiation/domestic-payments/bulk-batch-payments'

const accountTypes = [
  { label: 'Bulk and Batch Payments', retail: false, sme: true, corp: true },
]

const pages = [
  { title: 'Requirements', hint: 'Validation rules for the consent, POST /bulk-payments, and the status of each payment', url: `${BASE}/requirements` },
  { title: 'User Experience', hint: 'What the User must be shown when consenting to and authorizing a batch', url: `${BASE}/user-journeys` },
  { title: 'API Guide', hint: 'End-to-end implementation walk-through, from POST /par to the status of each payment', url: `${BASE}/api-guide` },
  { title: 'API Reference', hint: 'POST /bulk-payments, GET /bulk-payments/{BulkPaymentId}, GET /bulk-payments/{BulkPaymentId}/payments/{PaymentId}, and the idempotency lookup', url: `${BASE}/open-api/bulk-payments` },
]
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          TPP · Banking · Service Initiation · Domestic Payments
        </div>
        <h1 class="ed-doc__title">Bulk and Batch Payments</h1>

        <div class="bb-optional" role="note">
          <div class="bb-optional__title">Optional for LFIs in v2.2</div>
          <p class="bb-optional__body">
            In v2.2, delivering Bulk and Batch Payments is <strong>optional</strong> for LFIs. Not every
            LFI will offer it, so a TPP cannot rely on it being available at every LFI it connects to.
          </p>
        </div>

        <p class="ed-doc__lede">
          Bulk and Batch Payments let a TPP pay many creditors under a <strong>single consent and a
          single authorization</strong> &mdash; a payroll run or a supplier payment run, for example. The
          User authorizes the batch once, by its reason, the number of payments and their total. The TPP
          then sends every payment in one signed request to <code>POST /bulk-payments</code>, as a JSON
          array, and the API Hub checks the array against what the User authorized before it reaches the
          LFI.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="what-it-allows"
      num="01"
      color="var(--at-teal)"
      eyebrow="Capability"
      title="What Bulk and Batch Payments allow a TPP to do"
      tone="cream"
    >
      <EdBullets>
        <li>
          <strong>Initiate many domestic payments at once</strong> &mdash; each payment in the batch has
          its own Debtor Account, creditor, amount, purpose code and references, so one batch may draw
          on more than one of the User's accounts.
        </li>
        <li>
          <strong>Ask for one authorization, not one per payment</strong> &mdash; the consent fixes the
          batch's <code>Description</code>, <code>NumberOfTransactions</code> and
          <code>TotalValueOfPayments</code>, and the User authorizes those at their LFI.
        </li>
        <li>
          <strong>Submit the batch in one request</strong> &mdash; the payments are carried in the
          <code>Instructions</code> array of <code>POST /bulk-payments</code>. Nothing is uploaded: a TPP
          that collects the payments as a file, such as a spreadsheet, converts it to the array itself.
        </li>
        <li>
          <strong>Track every payment in the batch</strong> &mdash;
          <code>GET /bulk-payments/{BulkPaymentId}</code> returns each payment with its own
          <code>PaymentId</code> and status, read as for a single payment, and
          <code>GET /bulk-payments/{BulkPaymentId}/payments/{PaymentId}</code> returns one of them. The batch
          itself carries no status of its own.
        </li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="account-types"
      num="02"
      color="var(--at-gold)"
      eyebrow="Coverage"
      title="Supported account types"
      tone="surface"
    >
      <EdProse>
        Bulk and Batch Payments are supported for <strong>SME</strong> and <strong>Corporate</strong>
        customers. They are not supported for <strong>Retail</strong> customers.
      </EdProse>

      <div class="ed-cov" role="table" aria-label="Supported account types">
        <div class="ed-cov__row ed-cov__row--head" role="row">
          <div class="ed-cov__cell ed-cov__cell--label" role="columnheader">Payment type</div>
          <div class="ed-cov__cell" role="columnheader">Retail</div>
          <div class="ed-cov__cell" role="columnheader">SME</div>
          <div class="ed-cov__cell" role="columnheader">Corporate</div>
        </div>
        <div v-for="r in accountTypes" :key="r.label" class="ed-cov__row" role="row">
          <div class="ed-cov__cell ed-cov__cell--label" role="cell">{{ r.label }}</div>
          <div class="ed-cov__cell" role="cell">
            <span :class="['ed-cov__mark', r.retail ? 'is-yes' : 'is-no']">{{ r.retail ? '✓' : '—' }}</span>
          </div>
          <div class="ed-cov__cell" role="cell">
            <span :class="['ed-cov__mark', r.sme ? 'is-yes' : 'is-no']">{{ r.sme ? '✓' : '—' }}</span>
          </div>
          <div class="ed-cov__cell" role="cell">
            <span :class="['ed-cov__mark', r.corp ? 'is-yes' : 'is-no']">{{ r.corp ? '✓' : '—' }}</span>
          </div>
        </div>
      </div>
    </EdSectionBand>

    <EdSectionBand
      id="in-this-section"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="In this section"
      title="Building Bulk and Batch Payments"
      tone="cream"
    >
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Page</th><th>What it covers</th></tr>
          </thead>
          <tbody>
            <tr v-for="p in pages" :key="p.title">
              <td><RouterLink :to="p.url">{{ p.title }}</RouterLink></td>
              <td>{{ p.hint }}</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>
    </EdSectionBand>
  </div>
</template>

<style scoped>
.ed-doc {
  background: var(--at-bg-cream);
  color: var(--at-navy-deep);
  font-family: var(--at-sans);
  padding-top: 4.25rem;
  min-height: 100vh;
}

.ed-doc__hero { background: var(--at-bg-cream); border-bottom: 1px solid var(--at-grid-line); }
.ed-doc__inner { max-width: var(--at-page-max); margin: 0 auto; padding: 4rem 2rem 3rem; }

.ed-doc__eyebrow {
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
.ed-doc__eyebrow-dash { width: 24px; height: 1px; background: currentColor; }

.ed-doc__title {
  font-family: var(--at-serif);
  font-size: clamp(2.25rem, 5vw, 3.6rem);
  font-weight: 600;
  line-height: 1.02;
  letter-spacing: -0.03em;
  margin: 0;
}

.ed-doc__lede {
  font-family: var(--at-sans);
  font-size: 1.1rem;
  line-height: 1.65;
  margin: 1.75rem 0 0;
  max-width: 50rem;
  color: var(--at-mute-2);
}
.ed-doc__lede :deep(strong) { color: var(--at-navy-deep); font-weight: 600; }
.ed-doc__lede :deep(code) {
  font-family: var(--at-mono);
  font-size: 0.86em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  padding: 0.08em 0.4em;
}

/* ── Optional-for-LFIs notice (mirrors .ed-req-callout--warning) ─────── */
.bb-optional {
  --callout-accent: #b08800;
  margin: 1.75rem 0 0;
  max-width: 50rem;
  padding: 1rem 1.15rem;
  border-left: 3px solid var(--callout-accent);
  background: color-mix(in srgb, var(--callout-accent) 8%, var(--at-bg-cream));
}
.bb-optional__title {
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--callout-accent);
  margin-bottom: 0.5rem;
}
.bb-optional__body {
  font-family: var(--at-sans);
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--at-navy-deep);
  margin: 0;
}
.bb-optional__body strong { font-weight: 600; }

/* ── Account-type matrix (mirrors .ed-cov on the Bank Data Sharing overview) ── */
.ed-cov {
  display: grid;
  grid-template-columns: minmax(14rem, 22rem) repeat(3, 1fr);
  border: 1px solid var(--at-grid-line);
  background: var(--at-surface);
  max-width: 56rem;
}
.ed-cov__row { display: contents; }
.ed-cov__cell {
  padding: 0.75rem 0.95rem;
  border-bottom: 1px solid var(--at-grid-line);
  font-family: var(--at-sans); font-size: 0.9rem;
  text-align: center; color: var(--at-navy-deep);
}
.ed-cov__row:last-child .ed-cov__cell { border-bottom: 0; }
.ed-cov__cell--label { text-align: left; border-right: 1px solid var(--at-grid-line); }
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
}
.ed-cov__mark.is-no {
  font-family: var(--at-mono); color: var(--at-mute);
}

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
  .ed-cov { grid-template-columns: 1fr; }
  .ed-cov__cell--label { border-right: 0; }
}
</style>
