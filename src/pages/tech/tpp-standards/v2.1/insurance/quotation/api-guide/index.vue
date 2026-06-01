<route lang="yaml">
meta:
  title: Insurance Quotation — API Guide
  isIndex: true
</route>

<script setup lang="ts">
const subscriptionExample = `{
  "Data": {
    "PolicyStartDate": "2026-06-01"
  },
  "Subscription": {
    "Webhook": {
      "Url": "https://tpp.example.ae/webhooks/insurance-quote-events",
      "IsActive": true
    }
  }
}
`

const subscriptionDisableExample = `{
  "Subscription": {
    "Webhook": {
      "IsActive": false
    }
  }
}
`

const pendingCompletionExample = `{
  "QuoteStatus": "ApplicationApproved",
  "BrokerInstructions": [
    {
      "ActionRequired": "Customer must complete premium payment at the LFI-hosted page.",
      "Url": "https://pay.examplelfi.ae/checkout/sess-c93e1f4a"
    }
  ]
}
`

const policyIssuedExample = `{
  "QuoteStatus": "PolicyIssued",
  "Documents": [
    {
      "Type": "Policy Booklet",
      "FileName": "policy-booklet.pdf",
      "ContentType": "application/pdf",
      "Content": "JVBERi0xLjQKJeLjz9MKMyAwI...",
      "HashType": "SHA256",
      "Hash": "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918"
    }
  ]
}
`

const completedExample = `{
  "QuoteStatus": "Completed",
  "PolicyStartDate": "2026-06-01",
  "PolicyEndDate": "2027-05-31",
  "PolicyTerm": "P1Y",
  "Premium": {
    "OneYearPremiumExcludingVAT": { "Currency": "AED", "Amount": "950.00" },
    "VATAmount": { "Currency": "AED", "Amount": "47.50" },
    "TotalOneYearPremium": { "Currency": "AED", "Amount": "997.50" }
  },
  "CustomerPaidInFull": true,
  "PolicyCountrySubDivision": "Dubai",
  "Commission": {
    "CommissionAmount": { "Currency": "AED", "Amount": "47.00" },
    "PaymentMethod": "ThroughAPIHub"
  }
}
`

const terminalExample = `{
  "QuoteStatus": "CustomerCancelled",
  "Reason": "Customer declined payment at the LFI checkout."
}
`
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          TPP &middot; Insurance &middot; Quotation
        </div>
        <h1 class="ed-doc__title">
          Insurance Quotation &mdash; API Guide
          <span class="ed-doc__read">8 min read</span>
        </h1>
        <p class="ed-doc__lede">
          End-to-end walkthrough of the Insurance Quotation flow from the TPP perspective. The flow
          runs on the Client Credentials Grant &mdash; no per-customer consent journey. After accepting
          a quote, you can subscribe to webhook events to receive status updates without polling.
          This page covers the subscription mechanism and the full event schema; the per-mode pages
          walk through the specific call sequences.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="modes"
      num="01"
      color="var(--at-teal)"
      eyebrow="Two flow variants"
      title="Pick the mode you're implementing"
      tone="cream"
    >
      <div class="ed-doc__cards">
        <a class="ed-doc__card" href="./lfi-led">
          <span class="ed-doc__card-cat">LFI-Led</span>
          <h3 class="ed-doc__card-title">The LFI hosts the customer through completion</h3>
          <p class="ed-doc__card-desc">
            Single-PATCH accept flow. Your app collects quote inputs, the LFI hosts everything from
            acceptance through to issuance. You observe progress via webhook events or polling.
          </p>
          <span class="ed-doc__card-arrow">Open &rarr;</span>
        </a>
        <a class="ed-doc__card" href="./tpp-led">
          <span class="ed-doc__card-cat">TPP-Led</span>
          <h3 class="ed-doc__card-title">You collect KYC; the LFI hosts only payment</h3>
          <p class="ed-doc__card-desc">
            Two-PATCH flow. You submit KYC, the LFI returns a payment URL via webhook event, you
            redirect the customer to pay, then deliver documents in your app.
          </p>
          <span class="ed-doc__card-arrow">Open &rarr;</span>
        </a>
      </div>
    </EdSectionBand>

    <EdSectionBand
      id="subscription"
      num="02"
      color="var(--at-gold, #b08800)"
      eyebrow="Webhook subscription"
      title="Subscribe to events on PATCH Accept Quote"
      tone="surface"
    >
      <EdProse>
        When you PATCH a quote to accept it, you can attach a <code>Subscription.Webhook</code> object
        to register for event notifications. The Hub will POST status events to your registered URL
        whenever the LFI emits a quote-log update. Subscribing once on accept covers the entire
        lifecycle &mdash; you do not need to re-subscribe for each status. The webhook delivery surface
        is documented in
        <a href="/tech/tpp-standards/v2.1/webhooks/insurance-status/api-guide">Insurance Quote Status
        Event &mdash; API Guide</a>, with the OpenAPI schema at
        <a href="/tech/tpp-standards/v2.1/webhooks/insurance-status/open-api">Insurance Quote Status
        Change Event</a>.
      </EdProse>

      <EdCode :code="subscriptionExample" lang="json" filename="PATCH /motor-insurance-quotes/{QuoteId}" />

      <h3 class="ed-doc__subhead">Subscription object</h3>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Field</th><th>Type</th><th>Required</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><code>Webhook.Url</code></td>
              <td>string (HTTPS URL)</td>
              <td>On first registration</td>
              <td>Your HTTPS endpoint that will receive event POSTs. Must match <code>^https://.+</code>.</td>
            </tr>
            <tr>
              <td><code>Webhook.IsActive</code></td>
              <td>boolean</td>
              <td>Always</td>
              <td><code>true</code> enables delivery; <code>false</code> pauses without removing the URL.</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3 class="ed-doc__subhead">Updating the subscription mid-lifecycle</h3>
      <EdProse>
        You can PATCH the quote again at any time with only a <code>Subscription</code> object to
        update or pause webhook delivery. Omit the <code>Data</code> field; the LFI will not treat
        this as a re-acceptance.
      </EdProse>

      <EdCode :code="subscriptionDisableExample" lang="json" filename="PATCH (subscription-only)" />

      <EdNote type="tip" title="Polling fallback">
        <p>
          If you do not register a webhook, poll <code>GET /{type}-insurance-quotes/{QuoteId}</code>
          to retrieve the current status. Do not exceed one request per minute under normal load
          &mdash; the Hub may rate-limit aggressive polling. Webhooks are strongly preferred.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="event-schema"
      num="03"
      color="var(--at-violet, #6d28d9)"
      eyebrow="Insurance Quote Event Schema"
      title="The three event shapes you must handle"
      tone="cream"
    >
      <EdProse>
        Every event delivered to your webhook conforms to one of three schemas, drawn from the API Hub
        Consent Manager spec. The <code>QuoteStatus</code> field identifies which schema applies.
      </EdProse>

      <h3 class="ed-doc__subhead">1. Pending Completion Status</h3>
      <EdProse>
        Sent when the quote is making progress but not yet final. <code>QuoteStatus</code> is one of:
        <code>ApplicationPending</code>, <code>ApplicationApproved</code>, <code>PaymentRequired</code>,
        <code>PolicyIssued</code>.
      </EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr><th>Field</th><th>Required</th><th>Notes</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><code>QuoteStatus</code></td>
              <td>Always</td>
              <td>One of the pending-completion enum values above.</td>
            </tr>
            <tr>
              <td><code>BrokerInstructions[]</code></td>
              <td>When LFI requires TPP action</td>
              <td>Each entry: <code>ActionRequired</code> (text), <code>Reason</code> (text), <code>Url</code> (e.g. payment URL).</td>
            </tr>
            <tr>
              <td><code>Documents[]</code></td>
              <td>On <code>PolicyIssued</code> in TPP-Led mode</td>
              <td>Base64-encoded policy documents with SHA-256 hashes. See "Documents" below.</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdCode :code="pendingCompletionExample" lang="json" filename="Pending Completion event (ApplicationApproved)" />

      <h3 class="ed-doc__subhead">2. Completed Status</h3>
      <EdProse>
        Final event for a successful flow. <code>QuoteStatus: Completed</code>. Carries the finalised
        premium, policy term, and commission information. No further events follow.
      </EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr><th>Field</th><th>Required</th><th>Notes</th></tr>
          </thead>
          <tbody>
            <tr><td><code>QuoteStatus</code></td><td>Always</td><td>Always <code>"Completed"</code>.</td></tr>
            <tr><td><code>PolicyTerm</code></td><td>Always</td><td>ISO 8601 duration, e.g. <code>P1Y</code>, <code>P2Y3M</code>.</td></tr>
            <tr><td><code>Premium</code></td><td>Always</td><td>Object with <code>OneYearPremiumExcludingVAT</code>, <code>VATAmount</code>, <code>TotalOneYearPremium</code>, and (optionally) <code>TotalPolicyPremium</code>.</td></tr>
            <tr><td><code>CustomerPaidInFull</code></td><td>Always</td><td>Boolean indicating full payment was received.</td></tr>
            <tr><td><code>PolicyCountrySubDivision</code></td><td>Always</td><td>UAE Emirate where the policy was issued.</td></tr>
            <tr><td><code>PolicyStartDate</code> / <code>PolicyEndDate</code></td><td>Recommended</td><td>ISO 8601 date.</td></tr>
            <tr><td><code>CustomerSalary</code></td><td>Required for Health</td><td><code>Under4K</code> or <code>Over4K</code> (AED/month).</td></tr>
            <tr><td><code>Commission</code></td><td>When TPP commission applies</td><td><code>CommissionAmount</code> + <code>PaymentMethod</code> (<code>DirectToTPP</code> or <code>ThroughAPIHub</code>).</td></tr>
            <tr><td><code>Documents[]</code></td><td>Optional</td><td>Final policy documents if not already delivered on <code>PolicyIssued</code>.</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdCode :code="completedExample" lang="json" filename="Completed Status event" />

      <h3 class="ed-doc__subhead">3. Terminal Status</h3>
      <EdProse>
        Negative terminal events. <code>QuoteStatus</code> is one of: <code>Expired</code>,
        <code>Rejected</code>, <code>CustomerCancelled</code>, <code>LFICancelled</code>.
        No further events follow.
      </EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr><th>Field</th><th>Required</th><th>Notes</th></tr>
          </thead>
          <tbody>
            <tr><td><code>QuoteStatus</code></td><td>Always</td><td>One of the four terminal enum values.</td></tr>
            <tr><td><code>Reason</code></td><td>Optional</td><td>Free-text (1&ndash;1000 chars) explaining the termination &mdash; surface to the customer where helpful.</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdCode :code="terminalExample" lang="json" filename="Terminal Status event" />

      <h3 class="ed-doc__subhead">PolicyIssued with documents (TPP-Led)</h3>
      <EdCode :code="policyIssuedExample" lang="json" filename="PolicyIssued event with Documents[]" />
    </EdSectionBand>

    <EdSectionBand
      id="documents"
      num="04"
      color="var(--at-navy)"
      eyebrow="Document handling"
      title="Verifying and surfacing policy documents"
      tone="surface"
    >
      <EdProse>
        In TPP-Led mode, the <code>PolicyIssued</code> event carries every customer-facing document
        the LFI would normally deliver itself. Your TPP becomes the document delivery channel &mdash;
        the LFI will not email or post the documents.
      </EdProse>

      <h3 class="ed-doc__subhead">Document object</h3>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Field</th><th>Notes</th></tr>
          </thead>
          <tbody>
            <tr><td><code>Type</code></td><td>Document category (e.g. "Policy Booklet", "Terms &amp; Conditions", "IPID"). Free-text.</td></tr>
            <tr><td><code>FileName</code></td><td>Original file name with extension. No path components.</td></tr>
            <tr><td><code>ContentType</code></td><td>One of <code>application/pdf</code>, <code>image/jpeg</code>, <code>image/png</code>.</td></tr>
            <tr><td><code>Content</code></td><td>Base64-encoded file bytes.</td></tr>
            <tr><td><code>HashType</code></td><td>Always <code>SHA256</code>.</td></tr>
            <tr><td><code>Hash</code></td><td>SHA-256 of the raw file bytes (decoded <code>Content</code>). Required for integrity verification.</td></tr>
            <tr><td><code>AdditionalInformation</code></td><td>Optional free text (max 1000 chars).</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3 class="ed-doc__subhead">Verification</h3>
      <EdProse>
        Before surfacing a document to the customer, decode <code>Content</code>, compute its SHA-256,
        and compare against <code>Hash</code>. Mismatches indicate corruption or tampering &mdash; do
        not deliver. Log the <code>x-fapi-interaction-id</code> from the event delivery and raise a
        support ticket including that ID and the <code>QuoteId</code>.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="webhook-verification"
      num="05"
      color="var(--at-teal)"
      eyebrow="Webhook security"
      title="Verify event signatures before acting"
      tone="cream"
    >
      <EdProse>
        Events delivered to your webhook are signed by the Hub. You MUST verify the signature on every
        event before applying it. See <a href="/tech/tpp-standards/security/fapi/receiving-events">Receiving
        Event Notifications</a> for the signature scheme.
      </EdProse>

      <EdProse>
        The Hub may redeliver an event after a transient delivery failure. Treat events as idempotent
        &mdash; apply the latest <code>QuoteStatus</code> for the <code>QuoteId</code>, do not count
        events. Tracking by <code>QuoteId</code> + <code>QuoteStatus</code> + event timestamp is
        sufficient to dedupe.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="quote-types"
      num="06"
      color="var(--at-violet, #6d28d9)"
      eyebrow="Per-quote-type rules"
      title="New, Renewal, and Switch differences"
      tone="surface"
    >
      <EdProse>
        The semantic differences between <code>New</code>, <code>Renewal</code>, and
        <code>Switch</code> &mdash; and the per-type field requirements &mdash; are documented in the
        shared <a href="/tech/lfi-api-hub/v2.1/insurance/quotation/quote-types">Quote Types</a>
        explainer. Read it before issuing Renewal or Switch quotes; both require referencing a prior
        policy retrieved through Insurance Data Sharing under a customer consent.
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
  font-family: var(--at-mono); font-size: 0.68rem; letter-spacing: 0.18em;
  text-transform: uppercase; color: var(--at-teal); margin-bottom: 1.25rem;
  display: flex; align-items: center; gap: 0.75rem;
}
.ed-doc__eyebrow-dash { width: 24px; height: 1px; background: currentColor; }
.ed-doc__title {
  font-family: var(--at-serif); font-size: clamp(2.25rem, 5vw, 3.6rem);
  font-weight: 600; line-height: 1.02; letter-spacing: -0.03em; margin: 0;
  display: flex; align-items: baseline; flex-wrap: wrap; gap: 0.85rem;
}
.ed-doc__read {
  font-family: var(--at-mono); font-size: 0.7rem; letter-spacing: 0.1em;
  text-transform: uppercase; font-weight: 500; color: var(--at-mute);
  align-self: center; padding-left: 0.6rem; border-left: 1px solid var(--at-grid-line-2);
}
.ed-doc__lede {
  font-family: var(--at-sans); font-size: 1.1rem; line-height: 1.65;
  margin: 1.75rem 0 0; max-width: 50rem; color: var(--at-mute-2);
}
.ed-doc__subhead {
  font-family: var(--at-serif); font-size: 1.2rem; font-weight: 600;
  letter-spacing: -0.015em; color: var(--at-navy-deep); margin: 1.75rem 0 0.85rem;
}

.ed-doc__cards {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(22rem, 1fr));
  gap: 1.25rem; margin-top: 1.5rem;
}
.ed-doc__card {
  display: block; padding: 1.5rem; background: var(--at-bg-cream);
  border: 1px solid var(--at-grid-line); text-decoration: none; color: inherit;
  transition: border-color 0.2s ease, transform 0.2s ease;
}
.ed-doc__card:hover { border-color: var(--at-teal); transform: translateY(-2px); }
.ed-doc__card-cat {
  display: inline-block; font-family: var(--at-mono); font-size: 0.62rem;
  letter-spacing: 0.16em; text-transform: uppercase; font-weight: 700;
  color: var(--at-teal-deep); margin-bottom: 0.65rem;
}
.ed-doc__card-title {
  font-family: var(--at-serif); font-size: 1.15rem; font-weight: 600;
  margin: 0 0 0.5rem; color: var(--at-navy-deep);
}
.ed-doc__card-desc {
  font-family: var(--at-sans); font-size: 0.92rem; line-height: 1.55;
  color: var(--at-mute-2); margin: 0 0 1rem;
}
.ed-doc__card-arrow {
  font-family: var(--at-mono); font-size: 0.66rem; letter-spacing: 0.14em;
  text-transform: uppercase; font-weight: 700; color: var(--at-teal-deep);
}

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
}
</style>
