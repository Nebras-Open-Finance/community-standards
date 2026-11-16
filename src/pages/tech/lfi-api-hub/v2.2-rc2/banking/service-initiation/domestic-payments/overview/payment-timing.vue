<route lang="yaml">
meta:
  title: Payment Timing
</route>

<script setup lang="ts">
const patchSubmittedAani = `{
  "paymentResponse.paymentRail": "AANI",
  "paymentResponse.status": "AcceptedSettlementCompleted",
  "paymentResponse.paymentTransactionId": "OFP7d2c1e9a4b6f4c0e8a1b"
}
`

const patchSubmittedFts = `{
  "paymentResponse.paymentRail": "FTS",
  "paymentResponse.status": "AcceptedSettlementCompleted",
  "paymentResponse.paymentTransactionId": "<UAEFTS end-to-end transaction identifier>"
}
`

const patchBookedLfi = `{
  "paymentResponse.paymentRail": "LFI",
  "paymentResponse.status": "AcceptedCreditSettlementCompleted"
}
`

const patchTerminalAani = `{
  "paymentResponse.paymentRail": "AANI",
  "paymentResponse.status": "AcceptedWithoutPosting",
  "paymentResponse.paymentTransactionId": "OFP7d2c1e9a4b6f4c0e8a1b"
}
`

const patchTerminalRejected = `{
  "paymentResponse.paymentRail": "AANI",
  "paymentResponse.status": "Rejected",
  "paymentResponse.paymentTransactionId": "OFP7d2c1e9a4b6f4c0e8a1b",
  "paymentResponse.rejectReasonCode": [
    {
      "code": "AANI.AM04",
      "message": "Payment request cannot be executed as insufficient funds at debtor account."
    }
  ]
}
`
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          LFI · Banking · Service Initiation · Domestic Payments
        </div>
        <h1 class="ed-doc__title">
          Payment Timing
          <span class="ed-doc__read">8 min read</span>
        </h1>
        <p class="ed-doc__lede">
          This page defines the sequence and timing your LFI MUST follow for every domestic payment,
          from the API Hub&rsquo;s call to your Ozone Connect
          <a href="/tech/lfi-api-hub/v2.2-rc2/banking/service-initiation/open-api/payments" class="endpoint"><span class="http-method http-method--post">POST</span><code>/payments</code></a>
          endpoint through to the terminal status recorded on the API Hub. It applies to Single Instant
          Payment and to every multi-payment type.
        </p>
        <p class="ed-doc__lede">
          Three obligations are timed. Your LFI validates the request and returns <code>201</code>.
          Within <strong>3 seconds</strong> of that <code>201</code>, it screens the payment, submits it
          to the rail, and PATCHes <code>AcceptedSettlementCompleted</code> to the API Hub. When the rail
          responds, it PATCHes the terminal status <strong>immediately</strong>. The TPP-facing view of
          the same timeline is in the TPP Standards
          <a href="/tech/tpp-standards/v2.2-rc2/banking/service-initiation/domestic-payments/overview/payment-timing">Payment
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
      <APIFlowViewer title="Domestic payment timing — LFI">
        <PaymentTimingLfi />
      </APIFlowViewer>

      <EdProse>
        The clock for the timed stages starts when your Ozone Connect returns the <code>201</code> to
        the API Hub. That moment is <strong>T0</strong> in the table below.
      </EdProse>

      <EdRefTable>
        <table>
          <thead><tr><th>#</th><th>Stage</th><th>When</th><th>What your LFI does</th><th>Status on the API Hub</th></tr></thead>
          <tbody>
            <tr>
              <td>1</td>
              <td><a href="#responding-to-post-payments">Respond to <code>POST /payments</code></a></td>
              <td>Synchronous, ending at T0</td>
              <td>Runs the synchronous validations, creates the payment record, and returns <code>201</code></td>
              <td><code>Pending</code></td>
            </tr>
            <tr>
              <td>2</td>
              <td><a href="#screen-submit-patch">Screen, submit, PATCH</a></td>
              <td>By T0 + 3 s</td>
              <td>Routes the payment, runs fraud screening, transaction monitoring and AML checks, submits the payment to the rail, and immediately PATCHes <code>AcceptedSettlementCompleted</code></td>
              <td><code>AcceptedSettlementCompleted</code></td>
            </tr>
            <tr>
              <td>3</td>
              <td><a href="#rail-response">Rail response</a></td>
              <td>Immediately on receipt of the rail&rsquo;s response</td>
              <td>PATCHes the terminal status</td>
              <td><code>AcceptedWithoutPosting</code> (AANI), <code>AcceptedCreditSettlementCompleted</code> (UAEFTS), or <code>Rejected</code></td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>
        A payment booked on your LFI&rsquo;s own ledger, where the debtor and creditor accounts are both
        held at your LFI, has no rail and no hand-off to report. Stages 2 and 3 collapse into one: see
        <a href="#intra-bank">Intra-bank payments</a>.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="responding-to-post-payments"
      num="02"
      color="var(--at-gold)"
      eyebrow="Stage 1 · Synchronous"
      title="Responding to POST /payments"
      tone="surface"
    >
      <EdProse>
        By the time the API Hub calls your Ozone Connect
        <span class="endpoint"><span class="http-method http-method--post">POST</span><code>/payments</code></span>,
        it has already validated the TPP&rsquo;s access token, confirmed the consent is
        <code>Authorized</code>, checked the payment against the consent&rsquo;s control parameters, and
        validated the request against the OpenAPI schema. Your LFI relies on the API Hub for those checks
        and does not repeat them.
      </EdProse>

      <EdProse>
        Your LFI MUST then run the following checks before it creates the payment record. Each failure
        is returned synchronously, as an error response to the API Hub. No payment record is created and
        nothing is PATCHed.
      </EdProse>

      <EdRefTable>
        <table>
          <thead><tr><th>Check</th><th>Applies to</th><th>On failure</th></tr></thead>
          <tbody>
            <tr><td>Decrypt the payment PII (<code>PersonalIdentifiableInformation</code>)</td><td>All</td><td><code>400</code> <code>JWE.DecryptionError</code></td></tr>
            <tr><td>Validate the decrypted PII against the payment-time PII schema</td><td>All</td><td><code>400</code> <code>Body.InvalidFormat</code></td></tr>
            <tr><td>The creditor matches the creditor authorised on the consent</td><td>All</td><td><code>400</code> <code>Consent.FailsControlParameters</code></td></tr>
            <tr><td>The debtor account has sufficient available funds</td><td>All</td><td><code>400</code> <code>GenericError</code></td></tr>
            <tr><td>The debtor account is not <code>Inactive</code>, <code>Dormant</code>, or <code>Suspended</code></td><td>All</td><td><code>403</code> <code>Consent.AccountTemporarilyBlocked</code></td></tr>
            <tr><td>The debtor account is not <code>Closed</code>, <code>Deceased</code>, or <code>Unclaimed</code></td><td>All</td><td><code>403</code> <code>Consent.PermanentAccountAccessFailure</code></td></tr>
            <tr><td><code>x-fapi-customer-ip-address</code> is present and a valid IP address</td><td>Single Instant Payment, Delegated SCA</td><td><code>400</code> <code>Body.InvalidFormat</code></td></tr>
            <tr><td>No identical payment is already <code>Pending</code> under the consent</td><td>Delegated SCA, Fixed On Demand, Variable On Demand</td><td><code>409</code> <code>Payment.DuplicateInFlight</code></td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>
        The authoritative rules, including the type-specific checks not listed here, are on each payment
        type&rsquo;s Requirements page &mdash; for example
        <a href="/tech/lfi-api-hub/v2.2-rc2/banking/service-initiation/domestic-payments/single-instant-payment/requirements#payment-execution">Single
        Instant Payment &mdash; Payment Execution</a>.
      </EdProse>

      <EdProse>
        If every check passes, your LFI creates the payment record and returns <code>201</code> with the
        LFI-assigned <code>id</code> and <code>status: Pending</code>. The <code>201</code> means the
        payment record exists. It does not mean the payment has been screened or submitted. Returning it
        marks <strong>T0</strong>, and the 3-second window in the next stage starts.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="screen-submit-patch"
      num="03"
      color="var(--at-teal-deep)"
      eyebrow="Stage 2 · T0 to T0 + 3 s"
      title="Screen, submit to the rail, PATCH AcceptedSettlementCompleted"
      tone="cream"
    >
      <EdNote type="warning" title="The 3-second rule">
        <p>
          Within <strong>3 seconds</strong> of returning the <code>201</code>, your LFI MUST complete its
          fraud screening, transaction monitoring and AML checks, MUST submit the payment to the rail,
          and MUST immediately call
          <a href="/tech/lfi-api-hub/v2.2-rc2/api-hub/consent-manager/open-api/payment-log-id" class="endpoint"><span class="http-method http-method--patch">PATCH</span><code>/payment-log/{id}</code></a>
          with <code>paymentResponse.status: AcceptedSettlementCompleted</code>.
        </p>
      </EdNote>

      <EdProse>Within the window, your LFI works through four steps in order:</EdProse>

      <EdRefTable>
        <table>
          <thead><tr><th>#</th><th>Step</th><th>What your LFI does</th></tr></thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Route</td>
              <td>
                Select the rail. Settle over UAEFTS when <code>UseFTS</code> is <code>true</code>;
                otherwise submit to AANI, falling back to UAEFTS where your routing rules require it.
                Assign the payment&rsquo;s <code>paymentTransactionId</code>. On AANI this is the pacs.008
                <code>TxId</code> your LFI assigns, and it MUST start with <code>OFP</code>. On UAEFTS it is
                the payment&rsquo;s UAEFTS transaction identifier. Every PATCH on AANI and UAEFTS carries
                both <code>paymentRail</code> and <code>paymentTransactionId</code>, so routing comes first.
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Screen</td>
              <td>Run your fraud screening, transaction monitoring and AML checks on the payment.</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Submit</td>
              <td>Submit the payment to the rail (pacs.008 to AANI or UAEFTS).</td>
            </tr>
            <tr>
              <td>4</td>
              <td>PATCH</td>
              <td>
                Immediately on submission, PATCH <code>AcceptedSettlementCompleted</code> with
                <code>paymentRail</code> and <code>paymentTransactionId</code>. Do not wait for any
                response from the rail &mdash; not the AANI <code>pacs.002</code>, and not the UAEFTS ACK.
              </td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>
        The <code>AcceptedSettlementCompleted</code> PATCH is mandatory on AANI and UAEFTS. It is how the
        API Hub, and through it the TPP, learns that the payment has cleared your LFI&rsquo;s checks and
        been handed to the rail. It is <strong>not terminal</strong>: a second PATCH always follows in
        <a href="#rail-response">Stage 3</a>.
      </EdProse>

      <h3 class="ed-doc__subhead">Example PATCH bodies</h3>
      <EdCode :code="patchSubmittedAani" lang="json" filename="handed to AANI" />
      <EdCode :code="patchSubmittedFts" lang="json" filename="handed to UAEFTS" />
      <EdCode :code="patchBookedLfi" lang="json" filename="booked on the LFI's own ledger" />

      <h3 id="intra-bank" class="ed-doc__subhead">Intra-bank payments</h3>
      <EdProse>
        Where the debtor and creditor accounts are both held at your LFI, the payment is booked on your
        own ledger and never reaches a rail. The same 3-second window applies. Within 3 seconds of
        returning the <code>201</code>, your LFI MUST complete its screening, book the payment, and
        immediately PATCH <code>AcceptedCreditSettlementCompleted</code> with
        <code>paymentRail: LFI</code>. That status is terminal, so no second PATCH follows.
        <code>paymentTransactionId</code> is not sent on <code>LFI</code>.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="rail-response"
      num="04"
      color="var(--at-navy)"
      eyebrow="Stage 3 · On the rail's response"
      title="PATCH the terminal status immediately"
      tone="surface"
    >
      <EdProse>
        How long AANI or UAEFTS takes to respond is set by that rail&rsquo;s own scheme rules, not by
        the Open Finance standards. The payment stays at <code>AcceptedSettlementCompleted</code> until
        the rail responds. Your LFI MUST then PATCH the terminal status <strong>immediately</strong> on
        receiving the response:
      </EdProse>

      <EdRefTable>
        <table>
          <thead><tr><th>Rail</th><th>Rail response</th><th>PATCH <code>paymentResponse.status</code></th><th>Notes</th></tr></thead>
          <tbody>
            <tr><td>AANI</td><td>Positive Account Verification Response (<code>pacs.002</code> accepted)</td><td><code>AcceptedWithoutPosting</code></td><td>Terminal</td></tr>
            <tr><td>AANI</td><td><code>pacs.002</code> rejection</td><td><code>Rejected</code></td><td>Terminal. <code>rejectReasonCode[].code</code> in the <code>AANI.</code> namespace</td></tr>
            <tr><td>UAEFTS</td><td>ACK</td><td>&mdash;</td><td>Technical acceptance only. No PATCH; the status remains <code>AcceptedSettlementCompleted</code></td></tr>
            <tr><td>UAEFTS</td><td>CB900 Debit Confirmation</td><td><code>AcceptedCreditSettlementCompleted</code></td><td>Terminal</td></tr>
            <tr><td>UAEFTS</td><td>NAK</td><td><code>Rejected</code></td><td>Terminal. <code>rejectReasonCode[].code</code> in the <code>FTS.</code> namespace</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>
        Every terminal PATCH on AANI and UAEFTS carries the same <code>paymentRail</code> and
        <code>paymentTransactionId</code> as the <code>AcceptedSettlementCompleted</code> PATCH before
        it. A <code>Rejected</code> PATCH also carries <code>rejectReasonCode</code>, whose
        <code>message</code> MUST be sanitised for relay to the TPP. The per-rail mapping is in
        <a href="/tech/lfi-api-hub/v2.2-rc2/banking/service-initiation/domestic-payments/overview/payment-status">Payment
        Status</a>.
      </EdProse>

      <h3 class="ed-doc__subhead">Example PATCH bodies</h3>
      <EdCode :code="patchTerminalAani" lang="json" filename="AANI accepted" />
      <EdCode :code="patchTerminalRejected" lang="json" filename="AANI rejected" />
    </EdSectionBand>

    <EdSectionBand
      id="delivering-the-patch"
      num="05"
      color="var(--at-gold)"
      eyebrow="Delivery"
      title="What &ldquo;immediately&rdquo; requires"
      tone="cream"
    >
      <EdProse>
        Both PATCHes are sent as soon as the triggering event occurs: submission to the rail for the
        first, and receipt of the rail&rsquo;s response for the second. In particular, your LFI MUST NOT:
      </EdProse>

      <EdBullets>
        <li>batch status updates across payments, or hold them for a scheduled job;</li>
        <li>defer a PATCH until the TPP polls <span class="endpoint"><span class="http-method http-method--get">GET</span><code>/payments/{paymentId}</code></span>;</li>
        <li>skip the <code>AcceptedSettlementCompleted</code> PATCH because the rail has already responded &mdash; send it first, then the terminal status;</li>
        <li>send any further status once a terminal status has been PATCHed.</li>
      </EdBullets>

      <EdProse>
        PATCH delivery is durable. Retry a transient failure (<code>5xx</code>, connection error, or
        timeout) with exponential backoff until it is accepted. Do not retry a <code>4xx</code>; raise it
        for operational investigation. Your Ozone Connect
        <a href="/tech/lfi-api-hub/v2.2-rc2/banking/service-initiation/open-api/payments-PaymentId" class="endpoint"><span class="http-method http-method--get">GET</span><code>/payments/{paymentId}</code></a>
        MUST return the status most recently PATCHed, so the push and pull views of the payment stay
        consistent.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="summary"
      num="06"
      color="var(--at-teal)"
      eyebrow="Summary"
      title="PATCH obligations by rail"
      tone="surface"
    >
      <EdRefTable>
        <table>
          <thead><tr><th><code>paymentRail</code></th><th>By T0 + 3 s</th><th>Immediately on the rail&rsquo;s response</th></tr></thead>
          <tbody>
            <tr><td><code>AANI</code></td><td>Submit, then PATCH <code>AcceptedSettlementCompleted</code></td><td>PATCH <code>AcceptedWithoutPosting</code> or <code>Rejected</code></td></tr>
            <tr><td><code>FTS</code></td><td>Submit, then PATCH <code>AcceptedSettlementCompleted</code></td><td>PATCH <code>AcceptedCreditSettlementCompleted</code> or <code>Rejected</code> (no PATCH on ACK)</td></tr>
            <tr><td><code>LFI</code></td><td>Book, then PATCH <code>AcceptedCreditSettlementCompleted</code></td><td>&mdash; (no rail)</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>
        The field-level contract for each PATCH is in the
        <a href="/tech/lfi-api-hub/v2.2-rc2/api-hub/consent-manager/open-api/payment-log-id">PATCH
        <code>/payment-log/{id}</code></a> API reference. This requirement is recorded in the
        <a href="/tech/release-notes-and-erratas/changelog/v2.2-rc2/#v2.1-to-v2.2-change-17">v2.2
        changelog &sect;17</a>.
      </EdProse>
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
  color: var(--at-navy-deep);
  text-decoration: underline;
  text-underline-offset: 3px;
}

.ed-doc__subhead {
  font-family: var(--at-serif);
  font-size: 1.25rem;
  font-weight: 600;
  letter-spacing: -0.015em;
  color: var(--at-navy-deep);
  margin: 1.75rem 0 0.85rem;
  scroll-margin-top: calc(var(--at-header-height) + 1rem);
}

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
}
</style>
