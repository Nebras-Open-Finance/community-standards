<route lang="yaml">
meta:
  title: Insurance Quote Status Event — API Guide
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

const ackResponse = `HTTP/1.1 202 Accepted
x-fapi-interaction-id: <echo the received value>`

const examplePendingPayload = `{
  "iss": "https://auth1.[LFICODE].apihub.openfinance.ae",
  "aud": "[CLIENT_ID]",
  "iat": 1713196200,
  "exp": 1713199800,
  "message": {
    "Meta": {
      "EventDateTime": "2026-04-18T10:32:00Z",
      "EventResource": "/motor-insurance-quotes/8a4f2d09-2c5b-4f88-b1b3-1f06f7e91a2e",
      "EventType": "Resource.Updated",
      "QuoteId": "8a4f2d09-2c5b-4f88-b1b3-1f06f7e91a2e"
    },
    "Data": {
      "QuoteStatus": "ApplicationApproved",
      "BrokerInstructions": [
        {
          "ActionRequired": "Customer must complete premium payment at the LFI-hosted page.",
          "Url": "https://pay.examplelfi.ae/checkout/sess-c93e1f4a"
        }
      ]
    }
  }
}
`

const exampleCompletedPayload = `{
  "iss": "https://auth1.[LFICODE].apihub.openfinance.ae",
  "aud": "[CLIENT_ID]",
  "iat": 1713200000,
  "exp": 1713203600,
  "message": {
    "Meta": {
      "EventDateTime": "2026-04-18T11:00:00Z",
      "EventResource": "/motor-insurance-quotes/8a4f2d09-2c5b-4f88-b1b3-1f06f7e91a2e",
      "EventType": "Resource.Updated",
      "QuoteId": "8a4f2d09-2c5b-4f88-b1b3-1f06f7e91a2e"
    },
    "Data": {
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
  }
}
`

const exampleTerminalPayload = `{
  "iss": "https://auth1.[LFICODE].apihub.openfinance.ae",
  "aud": "[CLIENT_ID]",
  "iat": 1713204000,
  "exp": 1713207600,
  "message": {
    "Meta": {
      "EventDateTime": "2026-04-18T12:00:00Z",
      "EventResource": "/motor-insurance-quotes/8a4f2d09-2c5b-4f88-b1b3-1f06f7e91a2e",
      "EventType": "Resource.Updated",
      "QuoteId": "8a4f2d09-2c5b-4f88-b1b3-1f06f7e91a2e"
    },
    "Data": {
      "QuoteStatus": "CustomerCancelled",
      "Reason": "Customer declined payment at the LFI checkout."
    }
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
          Webhooks · Insurance Quote Status
        </div>
        <h1 class="ed-doc__title">
          Insurance Quote Status Event &mdash; API Guide
          <span class="ed-doc__read">3 min read</span>
        </h1>
        <p class="ed-doc__lede">
          When you accept an insurance quote with a <code>Subscription.Webhook</code> attached, the
          API Hub delivers an <strong>Insurance Quote Status Event</strong> to your registered URL
          each time the LFI emits a quote-log update. Events flow through the full lifecycle from
          <code>ApplicationPending</code> to a terminal state.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="prerequisites"
      num="01"
      color="var(--at-teal)"
      eyebrow="Prerequisites"
      title="What you need before events can be delivered"
      tone="cream"
    >
      <EdProse>Before receiving an Insurance Quote Status Event, ensure the following requirements are met:</EdProse>

      <EdBullets>
        <li>
          <strong>Registered <a href="/tech/tpp-standards/trust-framework/application">Application</a></strong>
          &mdash; the application must be created within the Trust Framework and assigned the
          <strong>ISP</strong> role as defined in
          <a href="/tech/tpp-standards/trust-framework/roles">Roles</a>.
        </li>
        <li>
          <strong>Valid <a href="/tech/tpp-standards/trust-framework/certificates">Encryption Certificate</a></strong>
          &mdash; an active encryption certificate must be issued and registered in the Trust Framework to
          receive the event as an encrypted JWE.
        </li>
        <li>
          <strong>Accepted quote with a <code>Subscription.Webhook</code></strong> &mdash; the webhook
          is registered per-quote on PATCH Accept (see
          <a href="/tech/tpp-standards/v2.2-draft/insurance/quotation/api-guide/">Insurance Quotation API Guide</a>).
        </li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="how-it-works"
      num="02"
      color="var(--at-gold)"
      eyebrow="How It Works"
      title="Push delivery on every quote-log status change"
      tone="surface"
    >
      <EdProse>
        Insurance Quotation does not use a per-customer consent. The webhook subscription is attached
        to the <strong>quote</strong> itself when you PATCH Accept. From that point, every time the
        LFI emits a status to <code>PATCH /insurance-quote-log/{logId}</code>, the Hub delivers an
        Insurance Quote Status Event to your registered <code>Webhook.Url</code> as a JWE-encrypted
        POST.
      </EdProse>

      <EdProse>
        The JWE is encrypted using your public <strong>Encryption Certificate</strong>. You must
        respond with <code>202 Accepted</code> immediately and decrypt the event payload
        asynchronously.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="step-1"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Step 1"
      title="Subscribe on PATCH Accept Quote"
      tone="cream"
    >
      <EdProse>
        Attach a <code>Subscription.Webhook</code> object to the PATCH Accept Quote body. The
        subscription covers the entire lifecycle of the quote &mdash; you do not need to re-subscribe
        for each status. Update or pause delivery mid-flow by PATCHing again with only a
        <code>Subscription</code> object (omit <code>Data</code>).
      </EdProse>

      <EdCode :code="subscriptionExample" lang="json" filename="PATCH /motor-insurance-quotes/{QuoteId} body (decoded)" />
    </EdSectionBand>

    <EdSectionBand
      id="step-2"
      num="04"
      color="var(--at-navy)"
      eyebrow="Step 2"
      title="Receive and acknowledge the event"
      tone="surface"
    >
      <EdProse>
        The Hub POSTs the event to your <code>Webhook.Url</code> with <code>Content-Type:
        application/jwe</code>. Respond <code>202 Accepted</code> with an empty body immediately
        &mdash; process the payload asynchronously.
      </EdProse>

      <EdCode :code="ackResponse" lang="http" filename="HTTP response" />

      <EdNote type="warning">
        <p>
          Failure to respond with <code>202</code> promptly may cause the Hub to retry delivery.
          Treat events as idempotent &mdash; the same event may arrive more than once.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="step-3"
      num="05"
      color="var(--at-teal-deep)"
      eyebrow="Step 3"
      title="Decrypt the JWE and verify the inner JWS"
      tone="cream"
    >
      <EdProse>
        The event is a JWE compact serialisation encrypted with your registered
        <strong>Encryption Certificate</strong>. The JWE header contains a <code>kid</code> that
        identifies which of your keys to use &mdash; decode the header first to select the correct
        private key, then decrypt.
      </EdProse>

      <EdProse>
        See <a href="/tech/tpp-standards/security/fapi/receiving-events">Receiving Event
        Notifications</a> for the full FAPI-aligned guidance: key selection by <code>kid</code>, JWS
        signature verification, and required security checks.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="payload-meta"
      num="06"
      color="var(--at-gold)"
      eyebrow="Event Payload — Meta"
      title="Envelope metadata"
      tone="surface"
    >
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Field</th><th>Type</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><code>EventDateTime</code></td>
              <td>string (date-time)</td>
              <td>When the event was generated.</td>
            </tr>
            <tr>
              <td><code>EventResource</code></td>
              <td>string</td>
              <td>The resource URI that triggered the event &mdash; e.g. <code>/motor-insurance-quotes/{QuoteId}</code>.</td>
            </tr>
            <tr>
              <td><code>EventType</code></td>
              <td>string</td>
              <td>One of: <code>Resource.Created</code>, <code>Resource.Updated</code>, <code>Resource.Deleted</code>.</td>
            </tr>
            <tr>
              <td><code>QuoteId</code></td>
              <td>string (UUID)</td>
              <td>The identifier of the quote the status change applies to.</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>
    </EdSectionBand>

    <EdSectionBand
      id="payload-data"
      num="07"
      color="var(--at-violet, #6d28d9)"
      eyebrow="Event Payload — Data"
      title="One of three event shapes per QuoteStatus"
      tone="cream"
    >
      <EdProse>
        The <code>Data</code> object conforms to one of three schemas drawn from
        <code>AEInsurance.AEInsuranceEvent</code>:
      </EdProse>

      <EdBullets>
        <li>
          <strong>Pending Completion Status</strong> &mdash; <code>QuoteStatus</code> is one of
          <code>ApplicationPending</code>, <code>ApplicationApproved</code>,
          <code>PaymentRequired</code>, <code>PolicyIssued</code>. May include
          <code>BrokerInstructions[]</code> (typically a payment URL) and
          <code>Documents[]</code> (on <code>PolicyIssued</code> in TPP-Led mode).
        </li>
        <li>
          <strong>Completed Status</strong> &mdash; <code>QuoteStatus: Completed</code>. Carries the
          finalised <code>Premium</code>, <code>PolicyTerm</code>, <code>CustomerPaidInFull</code>,
          <code>PolicyCountrySubDivision</code>, and (where applicable) the <code>Commission</code>
          due to the TPP.
        </li>
        <li>
          <strong>Terminal Status</strong> &mdash; <code>QuoteStatus</code> is one of
          <code>Expired</code>, <code>Rejected</code>, <code>CustomerCancelled</code>,
          <code>LFICancelled</code>. May include a <code>Reason</code> string.
        </li>
      </EdBullets>

      <EdProse>
        The full schema is documented in
        <a href="/tech/tpp-standards/v2.2-draft/insurance/quotation/api-guide/#event-schema">Insurance
        Quotation API Guide &mdash; Event Schema</a> and surfaced as an OpenAPI viewer in
        <a href="./open-api">Insurance Quote Status Change Event</a>.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="example-pending"
      num="08"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Example"
      title="Decrypted Pending Completion event (ApplicationApproved)"
      tone="surface"
    >
      <EdCode :code="examplePendingPayload" lang="json" filename="Decrypted JWS payload" />
    </EdSectionBand>

    <EdSectionBand
      id="example-completed"
      num="09"
      color="var(--at-teal)"
      eyebrow="Example"
      title="Decrypted Completed Status event"
      tone="cream"
    >
      <EdCode :code="exampleCompletedPayload" lang="json" filename="Decrypted JWS payload" />
    </EdSectionBand>

    <EdSectionBand
      id="example-terminal"
      num="10"
      color="var(--at-gold)"
      eyebrow="Example"
      title="Decrypted Terminal Status event"
      tone="surface"
    >
      <EdCode :code="exampleTerminalPayload" lang="json" filename="Decrypted JWS payload" />
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
.ed-doc__lede :deep(strong) { color: var(--at-navy-deep); font-weight: 600; }
.ed-doc__lede :deep(code) {
  font-family: var(--at-mono); font-size: 0.86em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line); padding: 0.08em 0.4em;
}
.ed-doc__lede :deep(a) { color: var(--at-teal-deep); text-decoration: none; border-bottom: 1px solid currentColor; }
@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
}
</style>
