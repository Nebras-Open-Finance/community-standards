<route lang="yaml">
meta:
  title: Payment Status
</route>

<script setup lang="ts">
const patchSubmittedExample = `{
  "paymentResponse.paymentRail": "AANI",
  "paymentResponse.status": "AcceptedSettlementCompleted",
  "paymentResponse.paymentTransactionId": "OFP7d2c1e9a4b6f4c0e8a1b"
}
`

const patchBodyExample = `{
  "paymentResponse.paymentRail": "AANI",
  "paymentResponse.status": "AcceptedWithoutPosting",
  "paymentResponse.paymentTransactionId": "OFP7d2c1e9a4b6f4c0e8a1b"
}
`

const patchRejectedExample = `{
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
          Payment Status
          <span class="ed-doc__read">8 min read</span>
        </h1>
        <p class="ed-doc__lede">
          Every domestic payment initiated through the API Hub is executed in one of three modes:
          <strong>intra-bank</strong> (both debtor and creditor accounts are held at your LFI, so no
          rail is used), or one of the two domestic payment rails &mdash; <strong>AANI</strong> (the
          UAE's instant payment rail) and <strong>UAEFTS</strong> (the UAE Funds Transfer System).
          Your LFI is the only party that sees the raw execution outcome, so your LFI MUST map that
          outcome to an Open Finance payment status and propagate it to the Hub via the Consent
          Manager Payment Log.
        </p>
        <p class="ed-doc__lede">
          This page covers both concerns: how your LFI selects an execution mode, and how outcomes
          from each mode map to Open Finance statuses. For the consent lifecycle, see the
          <a href="/tech/lfi-api-hub/v2.2-rc2/api-hub/consent-manager/">Consent Manager</a> section.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="open-finance-payment-statuses"
      num="01"
      color="var(--at-teal)"
      eyebrow="Payment Statuses"
      title="Open Finance payment statuses"
      tone="cream"
    >
      <EdProse>
        The Open Finance payment status enum is defined in the
        <a href="/tech/lfi-api-hub/v2.2-rc2/banking/service-initiation/open-api/payments">Ozone Connect
        Bank Service Initiation OpenAPI</a> and aligns with ISO 20022
        <code>ExternalPaymentTransactionStatus1Code</code>. Six values are in scope:
      </EdProse>

      <EdRefTable>
        <table>
          <thead><tr><th>Open Finance status</th><th>ISO 20022</th><th>Meaning</th></tr></thead>
          <tbody>
            <tr><td><code>Pending</code></td><td><code>PDNG</code></td><td>Payment accepted for processing; further checks or rail submission outstanding</td></tr>
            <tr><td><code>AcceptedSettlementCompleted</code></td><td><code>ACSC</code></td><td>Your LFI has submitted the payment to AANI or UAEFTS and is awaiting the rail&rsquo;s response &mdash; not terminal</td></tr>
            <tr><td><code>AcceptedWithoutPosting</code></td><td><code>ACWP</code></td><td>The receiving bank has accepted the payment but your LFI cannot confirm the creditor account has been credited &mdash; a settlement state</td></tr>
            <tr><td><code>AcceptedCreditSettlementCompleted</code></td><td><code>ACCC</code></td><td>The creditor account has been credited with the funds of the payment</td></tr>
            <tr><td><code>Rejected</code></td><td><code>RJCT</code></td><td>The payment was rejected, either by your LFI before submission or by AANI / UAEFTS</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>
        <code>Pending</code> is the initial status your Ozone Connect
        <a href="/tech/lfi-api-hub/v2.2-rc2/banking/service-initiation/open-api/payments" class="endpoint"><span class="http-method http-method--post">POST</span><code>/payments</code></a>
        response returns &mdash; your LFI does <strong>not</strong> PATCH a payment to
        <code>Pending</code>. On AANI and UAEFTS your LFI PATCHes twice:
        <code>AcceptedSettlementCompleted</code> immediately on submitting the payment to the rail,
        within 3 seconds of returning the <code>201</code>, and then the terminal status &mdash;
        <code>AcceptedWithoutPosting</code>, <code>AcceptedCreditSettlementCompleted</code>, or
        <code>Rejected</code> &mdash; immediately on the rail&rsquo;s response. Both PATCHes are
        mandatory. For an intra-bank payment there is no hand-off, and your LFI PATCHes the terminal
        status once. The sequence and timing are set out in
        <a href="/tech/lfi-api-hub/v2.2-rc2/banking/service-initiation/domestic-payments/overview/payment-timing">Payment
        Timing</a>.
      </EdProse>

      <EdNote type="info" title="Received status">
        <p>
          The Open Finance enum also includes a sixth value, <code>Received</code> (ISO 20022
          <code>RCVD</code>), used only for bulk and batch payments where the Hub acknowledges receipt
          of a file of instructions before processing individual payments. Bulk and batch payments are
          not yet documented in v2.2 &mdash; for the domestic single and multi-payments covered by this
          page, you can ignore <code>Received</code>.
        </p>
      </EdNote>

      <EdProse>
        Once a payment reaches a terminal status (<code>AcceptedWithoutPosting</code>,
        <code>AcceptedCreditSettlementCompleted</code>, or <code>Rejected</code>), your LFI MUST NOT
        transition it to a different value.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="rail-selection"
      num="02"
      color="var(--at-gold)"
      eyebrow="Rail Selection"
      title="Rail selection"
      tone="surface"
    >
      <EdProse>
        Your LFI is responsible for choosing the execution mode for every domestic payment. The API
        Hub does not select a rail on your behalf, and the TPP and customer are not involved in the
        decision. Apply the following logic on receipt of
        <span class="endpoint"><span class="http-method http-method--post">POST</span><code>/payments</code></span>:
      </EdProse>

      <EdBullets>
        <li><strong>Intra-bank</strong> &mdash; if both the debtor and creditor accounts are held at your LFI, execute the payment internally. No rail is used, and your LFI has end-to-end visibility of both legs.</li>
        <li><strong>AANI</strong> &mdash; otherwise, submit the payment to AANI as the primary rail whenever the receiving bank and receiving account are reachable on AANI.</li>
        <li><strong>UAEFTS</strong> &mdash; if AANI is unavailable or the receiving bank cannot receive via AANI, fall back to UAEFTS. The fall-back is automatic and MUST NOT require TPP or customer intervention.</li>
      </EdBullets>

      <EdProse>
        Your LFI MUST only reject a payment for reachability reasons once both rails have been ruled
        out &mdash; that is, when the receiving bank is reachable on neither AANI nor UAEFTS. As with
        any rejection raised before submission, it is reported against the rail the payment was routed
        to and carries that rail&rsquo;s namespace &mdash; see
        <a href="#rejection-code-prefixes">Rejection code prefixes</a>.
      </EdProse>

      <EdProse>
        Routing comes first in the post-<code>201</code> sequence. Every PATCH on AANI and UAEFTS
        carries <code>paymentRail</code> and <code>paymentTransactionId</code>, so your LFI selects the
        rail and assigns the identifier before it screens the payment. Screening and submission then
        complete within 3 seconds of the <code>201</code> &mdash; see
        <a href="/tech/lfi-api-hub/v2.2-rc2/banking/service-initiation/domestic-payments/overview/payment-timing">Payment
        Timing</a>.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="intra-bank-payments"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Intra-bank"
      title="Intra-bank payments"
      tone="cream"
    >
      <EdProse>
        When the debtor account and creditor account are both held at your LFI, there is no interbank
        rail involved &mdash; the payment is executed by an internal debit-and-credit within your core
        banking system. Your LFI has full visibility of both legs, so the payment can reach the most
        specific Open Finance terminal status: <code>AcceptedCreditSettlementCompleted</code>.
      </EdProse>

      <EdProse>The events that trigger a PATCH are:</EdProse>

      <EdRefTable>
        <table>
          <thead><tr><th>Intra-bank outcome</th><th>New Open Finance status</th><th>Notes</th></tr></thead>
          <tbody>
            <tr><td>Debtor debit and creditor credit both posted</td><td><code>AcceptedCreditSettlementCompleted</code></td><td>Terminal for intra-bank &mdash; your LFI knows the funds have definitely landed in the creditor account</td></tr>
            <tr><td>Internal rejection (screening, insufficient funds, account state, etc.)</td><td><code>Rejected</code></td><td>Set <code>rejectReasonCode[].code</code> to <code>LFI.&lt;reasonCode&gt;</code> &mdash; the only namespace accepted with <code>paymentRail: LFI</code></td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>
        Every PATCH for an intra-bank payment carries <code>paymentRail: LFI</code>. There is no
        hand-off to a rail, so <code>AcceptedSettlementCompleted</code> does not apply. Within 3 seconds
        of returning the <code>201</code>, your LFI MUST complete its screening, book the payment, and
        immediately PATCH <code>AcceptedCreditSettlementCompleted</code>. Intra-bank payments have no
        <code>paymentTransactionId</code>, and the field is not accepted on <code>LFI</code>, so omit it.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="aani-status-mapping"
      num="04"
      color="var(--at-navy)"
      eyebrow="AANI"
      title="AANI status mapping"
      tone="surface"
    >
      <APIFlowViewer title="AANI status mapping">
        <AaniPatchSequence />
      </APIFlowViewer>

      <EdProse>
        AANI is the UAE's instant payment rail. An AANI payment either clears to terminal success
        within seconds and returns a positive <strong>Account Verification Response</strong> (an ISO
        20022 <code>pacs.002</code> message with an accepted status), or is rejected by the receiving
        bank with an AANI Reject Reason Code drawn from the AANI Core Service Interface Specification.
      </EdProse>

      <EdProse>
        Immediately on submitting the payment to AANI &mdash; within 3 seconds of returning the
        <code>201</code> &mdash; your LFI MUST PATCH <code>AcceptedSettlementCompleted</code>. It does
        not wait for the AANI response. The payment then remains at
        <code>AcceptedSettlementCompleted</code> until AANI responds, and your LFI MUST PATCH the
        terminal status immediately when it does. The events that trigger a PATCH are:
      </EdProse>

      <EdRefTable>
        <table>
          <thead><tr><th>Event</th><th>New Open Finance status</th><th>Notes</th></tr></thead>
          <tbody>
            <tr><td>Payment submitted to AANI (<code>pacs.008</code> sent)</td><td><code>AcceptedSettlementCompleted</code></td><td>Mandatory. Not terminal</td></tr>
            <tr><td>Positive Account Verification Response (<code>pacs.002</code> accepted)</td><td><code>AcceptedWithoutPosting</code></td><td>Terminal for AANI</td></tr>
            <tr><td><code>pacs.002</code> rejection</td><td><code>Rejected</code></td><td>Terminal. Set <code>rejectReasonCode[].code</code> to <code>AANI.&lt;reasonCode&gt;</code> (for example <code>AANI.AM04</code>)</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdNote type="warning">
        <p>
          <code>AcceptedWithoutPosting</code> is the terminal status for successful AANI payments.
          Your LFI MUST NOT infer <code>AcceptedCreditSettlementCompleted</code> from an AANI Account
          Verification Response &mdash; AANI does not confirm credit posting at the receiving bank to
          the originating LFI.
        </p>
      </EdNote>

      <EdProse>
        Include <code>paymentTransactionId</code> on every
        <span class="endpoint"><span class="http-method http-method--patch">PATCH</span><code>/payment-log/{id}</code></span>,
        including the first. On AANI it is the pacs.008 <code>TxId</code> your LFI assigned to the
        payment, not an identifier issued by AANI, and it MUST start with <code>OFP</code>. Once set,
        <code>paymentTransactionId</code> MUST NOT change.
      </EdProse>

      <h3 class="ed-doc__subhead">Illustrative AANI Reject Reason Codes</h3>
      <EdProse>
        The full list of 40 codes is maintained in the AANI Core Service Interface Specification. The
        codes you will see most often are:
      </EdProse>

      <EdRefTable>
        <table>
          <thead><tr><th>AANI code</th><th>Meaning</th></tr></thead>
          <tbody>
            <tr><td><code>AC06</code></td><td>Blocked Account</td></tr>
            <tr><td><code>AC07</code></td><td>Closed Creditor Account Number</td></tr>
            <tr><td><code>AM04</code></td><td>Insufficient Funds</td></tr>
            <tr><td><code>AM14</code></td><td>Amount Exceeds Agreed Limit</td></tr>
            <tr><td><code>UCRD</code></td><td>Unknown Creditor</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>
        Your LFI MUST relay the code in the <code>AANI.</code> namespace &mdash; <code>AANI.AM04</code>
        &mdash; without transposing it to a different namespace. A PATCH with
        <code>paymentRail: AANI</code> accepts only codes matching <code>^AANI\.[A-Za-z0-9]+$</code>.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="uaefts-status-mapping"
      num="05"
      color="var(--at-teal-deep)"
      eyebrow="UAEFTS"
      title="UAEFTS status mapping"
      tone="cream"
    >
      <APIFlowViewer title="UAEFTS status mapping">
        <FtsPatchSequence />
      </APIFlowViewer>

      <EdProse>
        UAEFTS is the UAE Funds Transfer System, the Central Bank of the UAE's domestic interbank funds
        transfer rail. UAEFTS carries payment messages using the ISO 20022 <code>pacs.008</code> schema
        and returns the following acknowledgements:
      </EdProse>

      <EdBullets>
        <li><strong>ACK</strong> &mdash; UAEFTS has accepted the message after technical validation</li>
        <li><strong>NAK</strong> &mdash; UAEFTS has rejected the message with an FTS reason code</li>
        <li><strong>CB900</strong> &mdash; Debit Confirmation: settlement through the Central Bank has completed, the debtor account has been debited, and the corresponding credit to the receiving bank has been settled</li>
      </EdBullets>

      <EdProse>
        Because UAEFTS settles through the Central Bank as a centralised interbank clearing, a CB900
        implicitly confirms that the creditor side of the payment has been settled as well. The
        terminal successful status for a UAEFTS payment is therefore
        <code>AcceptedCreditSettlementCompleted</code>.
      </EdProse>

      <EdProse>
        Immediately on submitting the payment to UAEFTS &mdash; within 3 seconds of returning the
        <code>201</code> &mdash; your LFI MUST PATCH <code>AcceptedSettlementCompleted</code>, carrying
        the payment&rsquo;s UAEFTS transaction identifier as <code>paymentTransactionId</code>. ACK is
        technical acceptance only: it does <strong>not</strong> trigger a PATCH, and the payment remains
        at <code>AcceptedSettlementCompleted</code> until CB900 or NAK arrives. Your LFI MUST then PATCH
        the terminal status immediately. The events that trigger a PATCH are:
      </EdProse>

      <EdRefTable>
        <table>
          <thead><tr><th>Event</th><th>New Open Finance status</th><th>Notes</th></tr></thead>
          <tbody>
            <tr><td>Payment submitted to UAEFTS (<code>pacs.008</code> sent)</td><td><code>AcceptedSettlementCompleted</code></td><td>Mandatory. Not terminal</td></tr>
            <tr><td>CB900 Debit Confirmation</td><td><code>AcceptedCreditSettlementCompleted</code></td><td>Terminal for UAEFTS</td></tr>
            <tr><td>NAK received</td><td><code>Rejected</code></td><td>Terminal. Set <code>rejectReasonCode[].code</code> to <code>FTS.&lt;reasonCode&gt;</code></td></tr>
          </tbody>
        </table>
      </EdRefTable>
    </EdSectionBand>

    <EdSectionBand
      id="rejection-code-prefixes"
      num="06"
      color="var(--at-teal)"
      eyebrow="Reject Codes"
      title="Rejection code prefixes"
      tone="surface"
    >
      <EdProse>
        Every <code>Rejected</code> PATCH carries a <code>rejectReasonCode[]</code> array. The first
        segment of each <code>code</code> is a namespace, and from v2.2 the namespace follows the
        <code>paymentRail</code> named on the PATCH &mdash; not the system in which the check failed:
      </EdProse>

      <EdRefTable>
        <table>
          <thead><tr><th><code>paymentRail</code></th><th>Covers</th><th><code>code</code> pattern</th><th>Example</th></tr></thead>
          <tbody>
            <tr><td><code>AANI</code></td><td>A payment routed to AANI, whether AANI rejected it or your LFI rejected it before submission (screening, for example)</td><td><code>^AANI\.[A-Za-z0-9]+$</code></td><td><code>AANI.AC06</code></td></tr>
            <tr><td><code>FTS</code></td><td>A payment routed to UAEFTS, whether UAEFTS rejected it or your LFI rejected it before submission</td><td><code>^FTS\.[A-Za-z0-9]+$</code></td><td><code>FTS.AC06</code></td></tr>
            <tr><td><code>LFI</code></td><td>A payment booked on your LFI&rsquo;s own ledger &mdash; every rejection is your LFI&rsquo;s own</td><td><code>^LFI\.[A-Za-z0-9]+$</code></td><td><code>LFI.InsufficientFunds</code></td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdNote type="danger">
        <p>
          A <code>code</code> from any other namespace does not validate against the PATCH body for the
          rail named. In particular, a rejection your LFI raises before submitting a payment routed to
          AANI or UAEFTS MUST carry the <code>AANI.</code> or <code>FTS.</code> prefix, not
          <code>LFI.</code>. The prefix is relayed to the TPP verbatim and is critical for TPP
          diagnostics and downstream reconciliation.
        </p>
      </EdNote>

      <EdProse>
        On <code>AANI</code> and <code>FTS</code>, a <code>Rejected</code> PATCH also carries
        <code>paymentTransactionId</code>, as every PATCH on those rails does.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="propagating-status-to-the-hub"
      num="07"
      color="var(--at-gold)"
      eyebrow="Propagation"
      title="Propagating status to the Hub"
      tone="cream"
    >
      <EdProse>
        The initial <code>Pending</code> status is set by the 201 response your Ozone Connect
        <span class="endpoint"><span class="http-method http-method--post">POST</span><code>/payments</code></span>
        endpoint returns &mdash; no PATCH is required at that point.
      </EdProse>

      <h3 class="ed-doc__subhead">What your LFI MUST PATCH</h3>
      <EdRefTable>
        <table>
          <thead><tr><th><code>paymentRail</code></th><th>On submission to the rail (within 3 s of the <code>201</code>)</th><th>On the rail&rsquo;s response</th></tr></thead>
          <tbody>
            <tr><td><code>AANI</code></td><td><code>AcceptedSettlementCompleted</code></td><td><code>AcceptedWithoutPosting</code> or <code>Rejected</code></td></tr>
            <tr><td><code>FTS</code></td><td><code>AcceptedSettlementCompleted</code></td><td><code>AcceptedCreditSettlementCompleted</code> or <code>Rejected</code></td></tr>
            <tr><td><code>LFI</code></td><td colspan="2"><code>AcceptedCreditSettlementCompleted</code> on booking, within 3 s of the <code>201</code> &mdash; terminal, no rail</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>
        Every PATCH in this table is mandatory. Your LFI MUST NOT PATCH any status other than those
        listed for the rail, and MUST NOT PATCH anything after a terminal status. The full sequence,
        including what happens between the <code>201</code> and submission, is in
        <a href="/tech/lfi-api-hub/v2.2-rc2/banking/service-initiation/domestic-payments/overview/payment-timing">Payment
        Timing</a>.
      </EdProse>

      <h3 class="ed-doc__subhead">How to PATCH</h3>
      <EdProse>On each PATCH-triggering event, your LFI MUST immediately:</EdProse>
      <EdBullets>
        <li>Map the outcome to the new Open Finance status.</li>
        <li>
          Call
          <a href="/tech/lfi-api-hub/v2.2-rc2/api-hub/consent-manager/open-api/payment-log-id" class="endpoint"><span class="http-method http-method--patch">PATCH</span><code>/payment-log/{id}</code></a>
          on the API Hub Consent Manager with <code>paymentResponse.paymentRail</code>, the new
          <code>paymentResponse.status</code>, <code>paymentResponse.paymentTransactionId</code> (on
          <code>AANI</code> and <code>FTS</code>), and, for <code>Rejected</code> only,
          <code>paymentResponse.rejectReasonCode</code>.
        </li>
        <li>
          Update the response your Ozone Connect
          <a href="/tech/lfi-api-hub/v2.2-rc2/banking/service-initiation/open-api/payments" class="endpoint"><span class="http-method http-method--get">GET</span><code>/payments/{paymentId}</code></a>
          endpoint returns so that push and pull views of the payment are consistent.
        </li>
      </EdBullets>

      <EdProse>
        Your LFI MUST NOT batch status updates or defer them waiting for TPP polling. The Hub relays
        the new status to the TPP via webhook events as soon as it receives the PATCH.
      </EdProse>

      <h3 class="ed-doc__subhead">Example PATCH bodies</h3>
      <EdCode :code="patchSubmittedExample" lang="json" filename="PATCH /payment-log/{id} — submitted to AANI" />
      <EdCode :code="patchBodyExample" lang="json" filename="PATCH /payment-log/{id} — AANI accepted" />
      <EdCode :code="patchRejectedExample" lang="json" filename="PATCH /payment-log/{id} — AANI rejected" />
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
}
.ed-doc__subhead--small { font-size: 1.05rem; margin-top: 1.5rem; }
.ed-doc__subhead :deep(code) {
  font-family: var(--at-mono);
  font-size: 0.8em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  padding: 0.08em 0.4em;
}

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
}
</style>
