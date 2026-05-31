<route lang="yaml">
meta:
  title: Payment Status
</route>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          Service Initiation · Domestic Payments · Status
        </div>
        <h1 class="ed-doc__title">
          Payment Status
          <span class="ed-doc__read">5 min read</span>
        </h1>
        <p class="ed-doc__lede">
          Every domestic payment initiated through the API Hub is executed by the LFI in one of three
          modes: <strong>intra-bank</strong> (both debtor and creditor accounts are held at the same LFI,
          so no rail is used), <strong>AANI</strong> (the UAE's instant payment rail, used as the primary
          interbank rail), or <strong>UAEFTS</strong> (the UAE Funds Transfer System, used as the fallback
          interbank rail). Your TPP does not select the execution mode &mdash; the LFI owns that decision.
        </p>
        <p class="ed-doc__lede">
          Your TPP receives status updates for every payment through two complementary mechanisms:
          <strong>event notifications</strong> (the Hub pushes a webhook to your registered endpoint each
          time status changes) and <strong>polling</strong>
          (<span class="endpoint"><span class="http-method http-method--get">GET</span><code>/payments/{paymentId}</code></span>
          on the API Hub). This page covers how to receive status, what each status means, and which
          statuses you can expect for each execution mode.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="how-received"
      num="01"
      color="var(--at-teal)"
      eyebrow="Receiving Status"
      title="How your TPP receives payment status"
      tone="cream"
    >
      <APIFlowViewer title="Payment status retrieval">
        <TPPPaymentStatus />
      </APIFlowViewer>

      <h3>Event notifications (recommended)</h3>

      <EdProse>
        When your consent is created with <code>subscription.Webhook.IsActive: true</code> and a registered
        <code>Webhook.Url</code>, the API Hub pushes a Payment Status Event to your endpoint each time the
        LFI PATCHes a new status to the Hub. Events are delivered as JWE-encrypted POST requests signed
        with your registered Encryption Certificate. Your TPP MUST respond with <code>202 Accepted</code>
        immediately and decrypt the payload asynchronously.
      </EdProse>

      <EdProse>
        Event notifications are the recommended mechanism &mdash; they provide the lowest latency and
        remove the need for your TPP to poll. See the
        <a href="/tech/tpp-standards/v2.1/webhooks/payment-status/api-guide">Payment Status Event API Guide</a>
        for the full event shape, encryption requirements, and retry semantics.
      </EdProse>

      <h3>Polling (fallback)</h3>

      <EdProse>
        Your TPP MAY instead call
        <a href="/tech/tpp-standards/v2.1/banking/service-initiation/open-api/payments-PaymentId" class="endpoint"><span class="http-method http-method--get">GET</span><code>/payments/{paymentId}</code></a>
        on the API Hub to retrieve the current status on demand. Polling is appropriate when:
      </EdProse>

      <EdBullets>
        <li>Your TPP has not registered a webhook endpoint for this consent.</li>
        <li>You need to reconcile a missed or late event.</li>
        <li>You want to confirm the authoritative status before acting on an event payload.</li>
      </EdBullets>

      <EdProse>
        When polling, start shortly after
        <span class="endpoint"><span class="http-method http-method--post">POST</span><code>/payments</code></span>
        to catch immediate pre-rail rejections, back off as time passes, and stop polling once the payment
        reaches a terminal status (<code>AcceptedWithoutPosting</code>,
        <code>AcceptedCreditSettlementCompleted</code>, or <code>Rejected</code>).
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="statuses"
      num="02"
      color="var(--at-gold)"
      eyebrow="Status Enum"
      title="Open Finance payment statuses"
      tone="surface"
    >
      <EdProse>
        The Open Finance payment status enum aligns with ISO 20022
        <code>ExternalPaymentTransactionStatus1Code</code>. Five values are relevant for domestic payments:
      </EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Open Finance status</th>
              <th>ISO 20022</th>
              <th>Meaning</th>
              <th>Terminal?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>Pending</code></td>
              <td><code>PDNG</code></td>
              <td>
                Payment accepted for processing; rail submission or internal execution outstanding. This
                is the initial status returned in the
                <span class="endpoint"><span class="http-method http-method--post">POST</span><code>/payments</code></span>
                response
              </td>
              <td>No</td>
            </tr>
            <tr>
              <td><code>AcceptedSettlementCompleted</code></td>
              <td><code>ACSC</code></td>
              <td>
                Settlement of the debtor account has been completed. Indicates progression but does not
                guarantee the creditor side is complete
              </td>
              <td>No</td>
            </tr>
            <tr>
              <td><code>AcceptedWithoutPosting</code></td>
              <td><code>ACWP</code></td>
              <td>
                The receiving bank has accepted the payment; the originating LFI cannot confirm that the
                credit has posted to the creditor account
              </td>
              <td>Yes (on AANI)</td>
            </tr>
            <tr>
              <td><code>AcceptedCreditSettlementCompleted</code></td>
              <td><code>ACCC</code></td>
              <td>The creditor account has been credited with the funds of the payment</td>
              <td>Yes (on UAEFTS and intra-bank)</td>
            </tr>
            <tr>
              <td><code>Rejected</code></td>
              <td><code>RJCT</code></td>
              <td>
                The payment was rejected, either pre-rail by the LFI or post-rail by AANI or UAEFTS
              </td>
              <td>Yes</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdNote type="info" title="Received status">
        <p>
          The Open Finance enum also includes <code>Received</code> (ISO 20022 <code>RCVD</code>), used
          only for bulk and batch payments where the Hub acknowledges receipt of a file of instructions.
          Bulk and batch payments are not yet documented in v2.1 &mdash; for the domestic single and
          multi-payments covered by this page, you can ignore <code>Received</code>.
        </p>
      </EdNote>

      <EdProse>
        Once a payment reaches a terminal status (<code>AcceptedWithoutPosting</code>,
        <code>AcceptedCreditSettlementCompleted</code>, or <code>Rejected</code>), its status will not
        change again.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="rail-selection"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Execution Modes"
      title="Rail selection and the statuses you can expect"
      tone="cream"
    >
      <EdProse>
        The LFI selects the execution mode on receipt of each
        <span class="endpoint"><span class="http-method http-method--post">POST</span><code>/payments</code></span>.
        The rule is:
      </EdProse>

      <EdBullets>
        <li>
          <strong>Intra-bank</strong> &mdash; if both the debtor and creditor accounts are held at the
          same LFI, the payment is executed internally without a rail.
        </li>
        <li>
          <strong>AANI</strong> &mdash; otherwise, the LFI submits the payment to AANI whenever the
          receiving bank and account are reachable on AANI.
        </li>
        <li>
          <strong>UAEFTS</strong> &mdash; if AANI is unavailable or cannot reach the receiving bank, the
          LFI falls back to UAEFTS. The fall-back is automatic; your TPP and the customer are not involved.
        </li>
      </EdBullets>

      <EdProse>
        If neither rail can reach the receiving bank, the LFI rejects the payment pre-rail before ever
        submitting it. The status set your TPP should expect depends on which mode the LFI chose:
      </EdProse>

      <h3>Intra-bank</h3>

      <EdProse>
        Both accounts are at the same LFI, so the LFI has full visibility of both legs and can confirm
        the creditor has been credited.
      </EdProse>

      <EdBullets>
        <li>
          <strong>Success path:</strong> <code>Pending</code> &rarr;
          <code>AcceptedCreditSettlementCompleted</code>
        </li>
        <li>
          <strong>Rejection path:</strong> <code>Pending</code> &rarr; <code>Rejected</code> (with
          <code>LFI.&lt;reasonCode&gt;</code>)
        </li>
      </EdBullets>

      <h3>AANI</h3>

      <EdProse>
        AANI is the UAE's instant payment rail. It settles within seconds and returns either a positive
        Account Verification Response (the receiving bank has accepted) or a rejection. AANI does not
        expose a credit-posting signal to the originating LFI, so the terminal successful status is
        <code>AcceptedWithoutPosting</code> rather than <code>AcceptedCreditSettlementCompleted</code>.
      </EdProse>

      <EdBullets>
        <li>
          <strong>Success path:</strong> <code>Pending</code> &rarr; <code>AcceptedWithoutPosting</code>
        </li>
        <li>
          <strong>Rejection path:</strong> <code>Pending</code> &rarr; <code>Rejected</code> (with
          <code>AANI.&lt;reasonCode&gt;</code>)
        </li>
      </EdBullets>

      <h3>UAEFTS</h3>

      <EdProse>
        UAEFTS is the UAE Funds Transfer System, operated by the Central Bank. It carries payments over
        ISO 20022 <code>pacs.008</code> messaging and settles through the Central Bank as a centralised
        interbank clearing. Because settlement is centralised, the CB900 Debit Confirmation implicitly
        confirms the creditor side, so the terminal successful status is
        <code>AcceptedCreditSettlementCompleted</code>.
      </EdProse>

      <EdBullets>
        <li>
          <strong>Success path:</strong> <code>Pending</code> &rarr; (optionally
          <code>AcceptedSettlementCompleted</code>) &rarr; <code>AcceptedCreditSettlementCompleted</code>
        </li>
        <li>
          <strong>Rejection path:</strong> <code>Pending</code> &rarr; <code>Rejected</code> (with
          <code>FTS.&lt;reasonCode&gt;</code>)
        </li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="reject-codes"
      num="04"
      color="var(--at-navy)"
      eyebrow="Rejections"
      title="Rejection reason codes"
      tone="surface"
    >
      <EdProse>
        When a payment is rejected, the <code>RejectReasonCode[]</code> array on the payment resource
        carries a namespaced <code>Code</code>. The first segment identifies where the rejection
        originated:
      </EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Prefix</th>
              <th>Source</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>LFI.</code></td>
              <td>
                The LFI rejected the payment pre-rail (fraud, sanctions, account state, insufficient
                funds) or rejected an intra-bank payment that never reached a rail
              </td>
              <td><code>LFI.InsufficientFunds</code></td>
            </tr>
            <tr>
              <td><code>AANI.</code></td>
              <td>AANI rejected the payment on-rail</td>
              <td><code>AANI.AC06</code></td>
            </tr>
            <tr>
              <td><code>FTS.</code></td>
              <td>UAEFTS rejected the payment on-rail</td>
              <td><code>FTS.AC06</code></td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>
        The API Hub relays <code>RejectReasonCode.Code</code> to your TPP verbatim &mdash; it does not
        remap rail codes into a different namespace. Your TPP SHOULD surface an actionable message to
        the customer where the underlying reason is recoverable (for example, insufficient funds), and SHOULD
        log the full code and message for diagnostic purposes.
      </EdProse>

      <h3>Illustrative AANI Reject Reason Codes</h3>

      <EdProse>
        The authoritative list of AANI reason codes is published in the AANI Core Service Interface
        Specification. The codes you will see most often are:
      </EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>AANI code</th>
              <th>Meaning</th>
            </tr>
          </thead>
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
        Where Open Finance defines a Prescriptive Error Code for the underlying condition (for example,
        <code>Consent.TransientAccountAccessFailure</code>), the LFI MAY substitute the prescriptive
        code in place of the raw rail code. Your TPP SHOULD be prepared to handle either form.
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
  color: var(--at-teal-deep);
  text-decoration: none;
  border-bottom: 1px solid currentColor;
}

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
}
</style>
