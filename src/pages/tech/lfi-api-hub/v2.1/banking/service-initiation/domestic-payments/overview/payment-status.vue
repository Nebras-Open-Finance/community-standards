<route lang="yaml">
meta:
  title: Payment Status
</route>

<script setup lang="ts">
const patchBodyExample = `{
  "data": {
    "paymentId": "pmt-20260418-00023",
    "consentId": "cns-20260418-00011",
    "paymentTransactionId": "AANI-TX-7F4D0C1E",
    "status": "AcceptedWithoutPosting",
    "statusUpdateDateTime": "2026-04-18T10:14:22.845Z"
  }
}
`

const patchRejectedExample = `{
  "data": {
    "paymentId": "pmt-20260418-00023",
    "consentId": "cns-20260418-00011",
    "status": "Rejected",
    "statusUpdateDateTime": "2026-04-18T10:14:22.845Z",
    "rejectReasonCode": [
      {
        "code": "AANI.AM04",
        "message": "Insufficient funds at the receiving bank"
      }
    ]
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
          LFI · Banking · Service Initiation · Domestic Payments
        </div>
        <h1 class="ed-doc__title">
          Payment Status
          <span class="ed-doc__read">7 min read</span>
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
          <a href="/tech/lfi-api-hub/v2.1/api-hub/consent-manager/">Consent Manager</a> section.
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
        <a href="/tech/lfi-api-hub/v2.1/banking/service-initiation/open-api/payments">Ozone Connect
        Bank Service Initiation OpenAPI</a> and aligns with ISO 20022
        <code>ExternalPaymentTransactionStatus1Code</code>. Six values are in scope:
      </EdProse>

      <EdRefTable>
        <table>
          <thead><tr><th>Open Finance status</th><th>ISO 20022</th><th>Meaning</th></tr></thead>
          <tbody>
            <tr><td><code>Pending</code></td><td><code>PDNG</code></td><td>Payment accepted for processing; further checks or rail submission outstanding</td></tr>
            <tr><td><code>AcceptedSettlementCompleted</code></td><td><code>ACSC</code></td><td>Settlement of the debtor account has been completed &mdash; a payment-processing state</td></tr>
            <tr><td><code>AcceptedWithoutPosting</code></td><td><code>ACWP</code></td><td>The receiving bank has accepted the payment but your LFI cannot confirm the creditor account has been credited &mdash; a settlement state</td></tr>
            <tr><td><code>AcceptedCreditSettlementCompleted</code></td><td><code>ACCC</code></td><td>The creditor account has been credited with the funds of the payment</td></tr>
            <tr><td><code>Rejected</code></td><td><code>RJCT</code></td><td>The payment was rejected, either pre-rail by your LFI or post-rail by AANI / UAEFTS</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>
        <code>Pending</code> is the initial status your Ozone Connect
        <a href="/tech/lfi-api-hub/v2.1/banking/service-initiation/open-api/payments" class="endpoint"><span class="http-method http-method--post">POST</span><code>/payments</code></a>
        response returns &mdash; your LFI does <strong>not</strong> PATCH a payment to
        <code>Pending</code>. PATCH is only used to transition away from <code>Pending</code> to a
        terminal status. The statuses your LFI PATCHes for a domestic payment are therefore
        <code>AcceptedWithoutPosting</code>, <code>AcceptedCreditSettlementCompleted</code>, and
        <code>Rejected</code>. <code>AcceptedSettlementCompleted</code> is available in the enum but
        is rarely written in isolation on AANI or UAEFTS, where debtor settlement and the
        receiving-side outcome resolve in a single rail response.
      </EdProse>

      <EdNote type="info" title="Received status">
        <p>
          The Open Finance enum also includes a sixth value, <code>Received</code> (ISO 20022
          <code>RCVD</code>), used only for bulk and batch payments where the Hub acknowledges receipt
          of a file of instructions before processing individual payments. Bulk and batch payments are
          not yet documented in v2.1 &mdash; for the domestic single and multi-payments covered by this
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
        Your LFI MUST only reject a payment pre-rail for reachability reasons once both rails have
        been ruled out &mdash; that is, when the receiving bank is reachable on neither AANI nor
        UAEFTS. Set <code>RejectReasonCode.Code = LFI.&lt;reasonCode&gt;</code> (for example,
        <code>LFI.CreditorBankNotReachable</code>).
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
            <tr><td>Internal rejection (screening, insufficient funds, account state, etc.)</td><td><code>Rejected</code></td><td>Set <code>RejectReasonCode.Code</code> to <code>LFI.&lt;reasonCode&gt;</code> &mdash; there is no rail namespace to fall back to</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>
        Intra-bank payments have no <code>paymentTransactionId</code> assigned by a rail. If your
        internal core assigns an end-to-end reference, you MAY include it as
        <code>paymentTransactionId</code>; otherwise omit the field.
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
        <AaniStatusMapping />
      </APIFlowViewer>

      <EdProse>
        AANI is the UAE's instant payment rail. An AANI payment either clears to terminal success
        within seconds and returns a positive <strong>Account Verification Response</strong> (an ISO
        20022 <code>pacs.002</code> message with an accepted status), or is rejected by the receiving
        bank with an AANI Reject Reason Code drawn from the AANI Core Service Interface Specification.
      </EdProse>

      <EdProse>
        While the payment is in flight to AANI and awaiting a response, the status remains
        <code>Pending</code> &mdash; your LFI does not need to PATCH anything until the AANI response
        arrives. The events that trigger a PATCH are:
      </EdProse>

      <EdRefTable>
        <table>
          <thead><tr><th>AANI response</th><th>New Open Finance status</th><th>Notes</th></tr></thead>
          <tbody>
            <tr><td>Positive Account Verification Response (<code>pacs.002</code> accepted)</td><td><code>AcceptedWithoutPosting</code></td><td>Terminal for AANI</td></tr>
            <tr><td><code>pacs.002</code> rejection</td><td><code>Rejected</code></td><td>Set <code>RejectReasonCode.Code</code> to <code>AANI.&lt;reasonCode&gt;</code> (for example <code>AANI.AM04</code>)</td></tr>
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
        Once AANI assigns an end-to-end transaction identifier, include it as
        <code>paymentTransactionId</code> on the next
        <span class="endpoint"><span class="http-method http-method--patch">PATCH</span><code>/payment-log/{paymentId}</code></span>.
        Once set, <code>paymentTransactionId</code> MUST NOT change.
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
        &mdash; without transposing it to a different namespace. Where Open Finance defines a
        Prescriptive Error Code for the underlying condition (e.g.
        <code>Consent.TransientAccountAccessFailure</code>), prefer the prescriptive code.
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
        <FtsStatusMapping />
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
        ACK on its own is technical acceptance within the <code>Pending</code> state &mdash; it does
        <strong>not</strong> trigger a PATCH, and the payment remains <code>Pending</code> until CB900
        or NAK arrives. The events that trigger a PATCH are:
      </EdProse>

      <EdRefTable>
        <table>
          <thead><tr><th>UAEFTS response</th><th>New Open Finance status</th><th>Notes</th></tr></thead>
          <tbody>
            <tr><td>CB900 Debit Confirmation</td><td><code>AcceptedCreditSettlementCompleted</code></td><td>Terminal for UAEFTS</td></tr>
            <tr><td>NAK received</td><td><code>Rejected</code></td><td>Set <code>RejectReasonCode.Code</code> to <code>FTS.&lt;reasonCode&gt;</code></td></tr>
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
        Every <code>Rejected</code> status carries a <code>RejectReasonCode[]</code> array. The first
        segment of each <code>Code</code> is a namespace that identifies <strong>where</strong> the
        rejection originated:
      </EdProse>

      <EdRefTable>
        <table>
          <thead><tr><th>Rejected by</th><th><code>RejectReasonCode.Code</code> prefix</th><th>Example</th></tr></thead>
          <tbody>
            <tr><td>LFI &mdash; pre-rail screening (fraud, sanctions, account state, insufficient funds) or an intra-bank payment that never reaches a rail</td><td><code>LFI.</code></td><td><code>LFI.InsufficientFunds</code></td></tr>
            <tr><td>AANI</td><td><code>AANI.</code></td><td><code>AANI.AC06</code></td></tr>
            <tr><td>UAEFTS</td><td><code>FTS.</code></td><td><code>FTS.AC06</code></td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdNote type="danger">
        <p>
          Your LFI MUST NOT transpose a rail-originated reason code into the <code>LFI.</code>
          namespace, and MUST NOT transpose an LFI-originated rejection into an <code>AANI.</code> or
          <code>FTS.</code> namespace. The prefix is critical for TPP diagnostics and downstream
          reconciliation.
        </p>
      </EdNote>

      <EdProse>
        The <code>LFI.</code> namespace is correct in two cases: when your LFI has rejected an
        interbank payment <strong>before</strong> it reaches AANI or UAEFTS, and when an intra-bank
        payment is rejected internally (since no rail is ever involved). Once a payment has been
        submitted to AANI or UAEFTS, any subsequent rejection MUST carry the <code>AANI.</code> or
        <code>FTS.</code> prefix respectively, even if your LFI observed the failure first.
      </EdProse>

      <EdProse>
        Where a Prescriptive Error Code is defined (e.g.
        <code>Consent.TransientAccountAccessFailure</code>), prefer the prescriptive code over a raw
        rail code. The OpenAPI <code>RejectReasonCode.Code</code> pattern
        <code>^[A-Za-z]+\.[A-Za-z0-9]+$</code> allows either.
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
      <EdProse>
        Your LFI MUST PATCH the <strong>terminal</strong> Open Finance status for the payment &mdash;
        <code>AcceptedWithoutPosting</code>, <code>AcceptedCreditSettlementCompleted</code>, or
        <code>Rejected</code> as appropriate for the execution mode. This is the only mandatory PATCH
        in the lifecycle.
      </EdProse>

      <h3 class="ed-doc__subhead">What your LFI MAY PATCH</h3>
      <EdProse>
        If your LFI observes an intermediate execution event that cleanly maps to an Open Finance
        status other than the terminal one &mdash; for example, debtor-account settlement
        (<code>AcceptedSettlementCompleted</code>) on a rail or internal path that exposes it &mdash;
        your LFI MAY PATCH that intermediate status. It is not a requirement, and the Hub will relay
        whichever statuses it receives to the TPP.
      </EdProse>

      <EdProse>
        Tables in the AANI, UAEFTS, and intra-bank sections above list the events you SHOULD PATCH.
        Additional intermediate PATCHes are permitted provided every status you PATCH is a valid Open
        Finance status value and the ordering respects the lifecycle (you cannot PATCH back from a
        terminal status).
      </EdProse>

      <h3 class="ed-doc__subhead">How to PATCH</h3>
      <EdProse>On each PATCH-triggering event, your LFI MUST immediately:</EdProse>
      <EdBullets>
        <li>Map the outcome to the new Open Finance status.</li>
        <li>
          Call
          <a href="/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/payment-log" class="endpoint"><span class="http-method http-method--patch">PATCH</span><code>/payment-log/{paymentId}</code></a>
          on the API Hub Consent Manager with the new <code>status</code>, a current
          <code>statusUpdateDateTime</code>, <code>paymentTransactionId</code> (once assigned by the
          rail, if applicable), and any <code>rejectReasonCode</code>.
        </li>
        <li>
          Update the response your Ozone Connect
          <a href="/tech/lfi-api-hub/v2.1/banking/service-initiation/open-api/payments" class="endpoint"><span class="http-method http-method--get">GET</span><code>/payments/{paymentId}</code></a>
          endpoint returns so that push and pull views of the payment are consistent.
        </li>
      </EdBullets>

      <EdProse>
        Your LFI MUST NOT batch status updates or defer them waiting for TPP polling. The Hub relays
        the new status to the TPP via webhook events as soon as it receives the PATCH.
      </EdProse>

      <h3 class="ed-doc__subhead">Example PATCH body</h3>
      <EdCode :code="patchBodyExample" lang="json" filename="PATCH /payment-log/{paymentId}" />

      <h3 class="ed-doc__subhead">Example rejected PATCH body</h3>
      <EdCode :code="patchRejectedExample" lang="json" filename="rejected PATCH body" />
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
