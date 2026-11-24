<route lang="yaml">
meta:
  title: Bulk and Batch Payments
  isIndex: true
</route>

<script setup lang="ts">
const BASE = '/tech/lfi-api-hub/v2.2-rc2/banking/service-initiation/domestic-payments/bulk-batch-payments'

const accountTypes = [
  { label: 'Bulk and Batch Payments', retail: false, sme: true, corp: true },
]

const pages = [
  { title: 'Requirements', hint: 'Consent validation, authorization, and the checks on each payment in a batch', url: `${BASE}/requirements` },
  { title: 'User Experience', hint: 'What the Authorization Page must show for a batch', url: `${BASE}/user-journeys` },
  { title: 'API Guide', hint: 'Implementing consent validation, Ozone Connect POST /bulk-payments and the status reads', url: `${BASE}/api-guide` },
  { title: 'API Reference', hint: 'Ozone Connect POST /bulk-payments, GET /bulk-payments/{bulkPaymentId} and GET /bulk-payments/{bulkPaymentId}/payments/{paymentId}', url: `${BASE}/open-api/bulk-payments` },
]
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          LFI · Banking · Service Initiation · Domestic Payments
        </div>
        <h1 class="ed-doc__title">Bulk and Batch Payments</h1>

        <BulkBatchOptionalNotice />

        <p class="ed-doc__lede">
          Bulk and Batch Payments let a TPP pay many creditors under a <strong>single consent and a single
          authorization</strong> &mdash; a payroll run or a supplier payment run, for example. The User
          authorizes the batch once at your LFI, by its reason, the number of payments and their total. The
          TPP then sends every payment in one request; the API Hub checks the batch against the consent and
          calls your Ozone Connect <code>POST /bulk-payments</code> with all of them.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="what-the-lfi-does"
      num="01"
      color="var(--at-teal)"
      eyebrow="Capability"
      title="What an LFI implements for Bulk and Batch Payments"
      tone="cream"
    >
      <EdBullets>
        <li>
          <strong>Validate the consent</strong> &mdash; on <code>POST /consent/action/validate</code>. A Bulk
          and Batch consent carries no Debtor Account or Creditor; its PII holds only the batch's
          <code>Risk</code> block.
        </li>
        <li>
          <strong>Authorize the batch</strong> &mdash; show the User the batch's <code>Description</code>,
          number of payments and total. There is no account selection: each payment names its own Debtor
          Account.
        </li>
        <li>
          <strong>Execute every payment in the batch</strong> &mdash; on Ozone Connect
          <code>POST /bulk-payments</code>, the Bulk and Batch counterpart of <code>POST /payments</code>. Each payment carries its
          own Debtor Account, creditor, amount, purpose code and references, so one batch may draw on more
          than one of the User's accounts.
        </li>
        <li>
          <strong>Treat each payment on its own</strong> &mdash; each payment is validated, screened and
          settled on its own rail, and has its own <code>PaymentId</code>. A payment that fails a check is
          rejected on its own; the rest of the batch proceeds.
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
      title="Implementing Bulk and Batch Payments"
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
