<route lang="yaml">
meta:
  title: Payment Timing
</route>

<script setup lang="ts">
const eventSubmitted = `{
  "Data": {
    "PaymentId": "5ff155ea-853f-480c-ac74-1eaed7c1201f",
    "PaymentRail": "AANI",
    "PaymentTransactionId": "OFP7d2c1e9a4b6f4c0e8a1b",
    "Status": "AcceptedSettlementCompleted"
  }
}
`

const eventTerminal = `{
  "Data": {
    "PaymentId": "5ff155ea-853f-480c-ac74-1eaed7c1201f",
    "PaymentRail": "AANI",
    "PaymentTransactionId": "OFP7d2c1e9a4b6f4c0e8a1b",
    "Status": "AcceptedWithoutPosting"
  }
}
`
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          Service Initiation · Domestic Payments · Timing
        </div>
        <h1 class="ed-doc__title">
          Payment Timing
          <span class="ed-doc__read">6 min read</span>
        </h1>
        <p class="ed-doc__lede">
          This page sets out what your TPP receives after it calls
          <a href="/tech/tpp-standards/v2.2-rc2/banking/service-initiation/open-api/payments" class="endpoint"><span class="http-method http-method--post">POST</span><code>/payments</code></a>
          on the API Hub, and when. It applies to Single Instant Payment and to every multi-payment type.
        </p>
        <p class="ed-doc__lede">
          A domestic payment moves through three statuses. <code>Pending</code> comes back on the
          <code>201</code>. <code>AcceptedSettlementCompleted</code> follows within
          <strong>3 seconds</strong> of the LFI&rsquo;s <code>201</code>, once the LFI has handed the
          payment to the rail. The terminal status follows when the rail responds. The LFI-side
          obligations behind this timeline are in the LFI Integration Guide
          <a href="/tech/lfi-api-hub/v2.2-rc2/banking/service-initiation/domestic-payments/overview/payment-timing">Payment
          Timing</a> page.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="timeline"
      num="01"
      color="var(--at-teal)"
      eyebrow="Timeline"
      title="The timeline at a glance"
      tone="cream"
    >
      <APIFlowViewer title="Domestic payment timing — TPP">
        <PaymentTimingTpp />
      </APIFlowViewer>

      <EdRefTable>
        <table>
          <thead><tr><th>#</th><th>Stage</th><th>When</th><th>What your TPP receives</th><th><code>Status</code></th></tr></thead>
          <tbody>
            <tr>
              <td>1</td>
              <td><a href="#submitting">Submit the payment</a></td>
              <td>Synchronous</td>
              <td><code>201</code> on <code>POST /payments</code>, or an error response</td>
              <td><code>Pending</code></td>
            </tr>
            <tr>
              <td>2</td>
              <td><a href="#handed-to-the-rail">Handed to the rail</a></td>
              <td>Within 3 seconds of the LFI&rsquo;s <code>201</code>, plus API Hub relay time</td>
              <td>A payment status event</td>
              <td><code>AcceptedSettlementCompleted</code></td>
            </tr>
            <tr>
              <td>3</td>
              <td><a href="#terminal-status">Rail outcome</a></td>
              <td>When the rail responds &mdash; set by the AANI or UAEFTS scheme rules</td>
              <td>A payment status event</td>
              <td><code>AcceptedWithoutPosting</code>, <code>AcceptedCreditSettlementCompleted</code>, or <code>Rejected</code></td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>
        A payment between two accounts at the same LFI is booked on that LFI&rsquo;s own ledger, so it
        has no rail and no hand-off. Its first status after <code>Pending</code> is the terminal
        <code>AcceptedCreditSettlementCompleted</code>, which arrives within the same 3-second window.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="submitting"
      num="02"
      color="var(--at-gold)"
      eyebrow="Stage 1 · Synchronous"
      title="Submitting POST /payments"
      tone="surface"
    >
      <EdProse>
        The <code>POST /payments</code> request is validated in two places before your TPP receives a
        response. Either can reject it synchronously, in which case no payment resource is created:
      </EdProse>

      <EdRefTable>
        <table>
          <thead><tr><th>Validated by</th><th>Checks</th></tr></thead>
          <tbody>
            <tr>
              <td>API Hub</td>
              <td>The access token, the consent status, the payment against the consent&rsquo;s control parameters (<code>ConsentId</code>, <code>Instruction.Amount</code>, <code>PaymentPurposeCode</code>, references, <code>OpenFinanceBilling</code>), and the request against the OpenAPI schema</td>
            </tr>
            <tr>
              <td>LFI</td>
              <td>Decryption and schema of the payment PII, the creditor against the creditor authorised on the consent, available funds, and the state of the debtor account. Some payment types add checks &mdash; for example <code>x-fapi-customer-ip-address</code> on Single Instant Payment, or a duplicate in-flight check on the on-demand types</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>
        If both pass, your TPP receives <code>201 Created</code> with <code>Status: Pending</code> and the
        LFI-assigned <code>PaymentId</code>. <code>PaymentRail</code> and
        <code>PaymentTransactionId</code> may be absent at this point, because the LFI routes the payment
        after it responds.
      </EdProse>

      <EdNote type="info" title="If the response never arrives">
        <p>
          If your TPP does not receive a response to <code>POST /payments</code> &mdash; because of a
          network error or a timeout &mdash; do not submit a new payment with a new
          <code>x-idempotency-key</code>. Look the payment up with
          <a href="/tech/tpp-standards/v2.2-rc2/banking/service-initiation/open-api/payments-idempotency" class="endpoint"><span class="http-method http-method--get">GET</span><code>/payments</code></a>
          and the same <code>x-idempotency-key</code>. If a payment was created, the response points to it.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="handed-to-the-rail"
      num="03"
      color="var(--at-teal-deep)"
      eyebrow="Stage 2 · Within 3 seconds"
      title="AcceptedSettlementCompleted: handed to the rail"
      tone="cream"
    >
      <EdProse>
        Within 3 seconds of returning its <code>201</code> to the API Hub, the LFI MUST complete its
        fraud screening, transaction monitoring and AML checks, submit the payment to AANI or UAEFTS, and
        PATCH <code>AcceptedSettlementCompleted</code> to the API Hub. The API Hub relays that status to
        your TPP as a payment status event and returns it on
        <a href="/tech/tpp-standards/v2.2-rc2/banking/service-initiation/open-api/payments-PaymentId" class="endpoint"><span class="http-method http-method--get">GET</span><code>/payments/{PaymentId}</code></a>.
      </EdProse>

      <EdProse>
        The 3-second figure is measured at the LFI, from its <code>201</code> to the API Hub. Your TPP
        receives the event after the API Hub has relayed it, so allow for that relay time when you set
        expectations or timeouts.
      </EdProse>

      <EdProse>
        <code>AcceptedSettlementCompleted</code> means the payment has cleared the LFI&rsquo;s checks and
        been handed to the rail. From this point <code>PaymentRail</code> and
        <code>PaymentTransactionId</code> are present. It is <strong>not terminal</strong>: the
        rail&rsquo;s outcome follows, and the payment can still be rejected at that stage. Your TPP SHOULD
        present the payment to the customer as submitted or in progress, not as completed.
      </EdProse>

      <EdCode :code="eventSubmitted" lang="json" filename="payment status event — decrypted, abridged" />
    </EdSectionBand>

    <EdSectionBand
      id="terminal-status"
      num="04"
      color="var(--at-navy)"
      eyebrow="Stage 3 · Rail-dependent"
      title="The terminal status"
      tone="surface"
    >
      <EdProse>
        The LFI PATCHes the terminal status as soon as the rail responds. How long the rail takes is set
        by the AANI and UAEFTS scheme rules, not by the Open Finance standards, so there is no fixed upper
        bound on this stage.
      </EdProse>

      <EdRefTable>
        <table>
          <thead><tr><th><code>PaymentRail</code></th><th>Success</th><th>Failure</th></tr></thead>
          <tbody>
            <tr><td><code>AANI</code></td><td><code>AcceptedWithoutPosting</code></td><td><code>Rejected</code>, <code>RejectReasonCode</code> in the <code>AANI.</code> namespace</td></tr>
            <tr><td><code>FTS</code></td><td><code>AcceptedCreditSettlementCompleted</code></td><td><code>Rejected</code>, <code>RejectReasonCode</code> in the <code>FTS.</code> namespace</td></tr>
            <tr><td><code>LFI</code></td><td><code>AcceptedCreditSettlementCompleted</code></td><td><code>Rejected</code>, <code>RejectReasonCode</code> in the <code>LFI.</code> namespace</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>
        Only <code>Rejected</code> means the payment failed. Your TPP SHOULD NOT treat a payment as
        failed because it is still at <code>AcceptedSettlementCompleted</code> after some time. The
        payment is with the rail, and a customer prompted to pay again could pay twice.
      </EdProse>

      <EdCode :code="eventTerminal" lang="json" filename="payment status event — decrypted, abridged" />

      <EdProse>
        What each status means, and the full set of reject reason codes, are in
        <a href="/tech/tpp-standards/v2.2-rc2/banking/service-initiation/domestic-payments/overview/payment-status">Payment
        Status</a>.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="receiving-status"
      num="05"
      color="var(--at-gold)"
      eyebrow="Receiving Status"
      title="Events and polling against the timeline"
      tone="cream"
    >
      <EdProse>
        With a webhook registered on the consent, the API Hub sends a payment status event each time the
        LFI PATCHes a new status: once for <code>AcceptedSettlementCompleted</code>, and once for the
        terminal status. See the
        <a href="/tech/tpp-standards/v2.2-rc2/webhooks/payment-status/api-guide">Payment Status Event
        API Guide</a>.
      </EdProse>

      <EdProse>If your TPP polls instead, align the polling with the timeline:</EdProse>

      <EdBullets>
        <li>Make the first poll about 3 seconds after the <code>201</code>. The payment will normally be at <code>AcceptedSettlementCompleted</code>, or at its terminal status if it was booked on the LFI&rsquo;s own ledger.</li>
        <li>After that, back off. The remaining wait depends on the rail.</li>
        <li>Stop polling once the payment reaches <code>AcceptedWithoutPosting</code>, <code>AcceptedCreditSettlementCompleted</code>, or <code>Rejected</code>. A terminal status does not change.</li>
      </EdBullets>
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
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.85rem;
}
.ed-doc__read {
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
.ed-doc__lede :deep(a) {
  color: var(--at-teal-deep);
  text-decoration: none;
  border-bottom: 1px solid currentColor;
}

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
}
</style>
