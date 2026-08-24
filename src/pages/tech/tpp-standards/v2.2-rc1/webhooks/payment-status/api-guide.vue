<route lang="yaml">
meta:
  title: Payment Status Event — API Guide
</route>

<script setup lang="ts">
const subscriptionExample = `{
  "subscription": {
    "Webhook": {
      "IsActive": true,
      "Url": "https://tpp.example.com/webhooks/receiver"
    }
  }
}`

const ackResponse = `HTTP/1.1 202 Accepted
x-fapi-interaction-id: <echo the received value>`

const examplePayload = `{
  "iss": "https://auth1.[LFICODE].apihub.openfinance.ae",
  "aud": "[CLIENT_ID]",
  "iat": 1713196200,
  "exp": 1713199800,
  "message": {
    "Meta": {
      "EventDateTime": "2025-04-15T12:30:00Z",
      "EventResource": "/payment/7130812d-4d81-4c68-8187-6358cfbce521",
      "EventType": "Resource.Updated",
      "ConsentId": "2079bdce-c8e2-42a8-92b5-2732d9695971"
    },
    "Data": {
      "PaymentId": "7130812d-4d81-4c68-8187-6358cfbce521",
      "ConsentId": "2079bdce-c8e2-42a8-92b5-2732d9695971",
      "Status": "AcceptedWithoutPosting",
      "StatusUpdateDateTime": "2025-04-15T12:30:00Z",
      "CreationDateTime": "2025-04-15T12:00:00Z",
      "Instruction": {
        "InstructedAmount": {
          "Amount": "500.00",
          "Currency": "AED"
        }
      },
      "PaymentPurposeCode": "ACM",
      "OpenFinanceBilling": {
        "Type": "PushP2P"
      }
    }
  }
}`
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          Webhooks · Payment Status
        </div>
        <h1 class="ed-doc__title">
          Payment Status Event &mdash; API Guide
          <span class="ed-doc__read">2 min read</span>
        </h1>
        <p class="ed-doc__lede">
          When a payment consent is created with <code>subscription.Webhook.IsActive: true</code>, the API
          Hub monitors that consent for payment status changes. Each time the LFI processes the payment and
          updates its status &mdash; by PATCHing the API Hub &mdash; the Hub delivers a
          <strong>Payment Status Event</strong> to your registered <code>Webhook.Url</code> as a
          JWE-encrypted POST.
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
      <EdProse>Before receiving a Payment Status Event, ensure the following requirements are met:</EdProse>

      <EdBullets>
        <li>
          <strong>Registered <a href="/tech/tpp-standards/trust-framework/application">Application</a></strong>
          &mdash; the application must be created within the Trust Framework and assigned the
          <strong>BDSP role</strong> as defined in
          <a href="/tech/tpp-standards/trust-framework/roles">Roles</a>.
        </li>
        <li>
          <strong>Valid <a href="/tech/tpp-standards/trust-framework/certificates">Encryption Certificate</a></strong>
          &mdash; an active encryption certificate must be issued and registered in the Trust Framework to
          receive the event as an encrypted JWE.
        </li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="how-it-works"
      num="02"
      color="var(--at-gold)"
      eyebrow="How It Works"
      title="Push delivery on every payment status update"
      tone="surface"
    >
      <EdProse>
        When a payment consent is created with <code>subscription.Webhook.IsActive: true</code>, the API
        Hub monitors that consent for payment status changes. Each time the LFI processes the payment and
        updates its status &mdash; by PATCHing the API Hub &mdash; the Hub delivers a Payment Status Event
        to your registered <code>Webhook.Url</code> as a JWE-encrypted POST request.
      </EdProse>

      <EdProse>
        The JWE is encrypted using your public <strong>Encryption Certificate</strong> registered in the
        Trust Framework. You must respond with <code>202 Accepted</code> immediately and decrypt the event
        payload asynchronously.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="sequence-flow"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="API Sequence Flow"
      title="End-to-end payment status update example"
      tone="cream"
    >
      <APIFlowViewer title="Payment Status Event Flow | Example: Status -> AcceptedWithoutPosting">
        <APIFlowPaymentStatusEvent />
      </APIFlowViewer>
    </EdSectionBand>

    <EdSectionBand
      id="step-1"
      num="04"
      color="var(--at-navy)"
      eyebrow="Step 1"
      title="Enable the subscription on your payment consent"
      tone="surface"
    >
      <EdProse>
        Set <code>subscription.Webhook.IsActive</code> to <code>true</code> and provide your webhook URL
        when creating the payment consent PII. The URL must be registered and accessible from the API Hub.
      </EdProse>

      <EdCode :code="subscriptionExample" lang="json" filename="Consent PII subscription block" />

      <EdNote type="tip">
        <p>
          The <code>Webhook.Url</code> must be the URL of your registered webhook endpoint &mdash; the API
          Hub will POST events directly to this address.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="step-2"
      num="05"
      color="var(--at-teal-deep)"
      eyebrow="Step 2"
      title="Receive the event"
      tone="cream"
    >
      <EdProse>
        The Hub delivers the event as an HTTP POST to your <code>Webhook.Url</code>. The request body is a
        JWE compact serialisation string and the <code>Content-Type</code> is <code>application/jwe</code>.
      </EdProse>

      <h3>Request headers you will receive</h3>

      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Header</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>Content-Type</code></td>
              <td><code>application/jwe</code></td>
            </tr>
            <tr>
              <td><code>x-fapi-interaction-id</code></td>
              <td>RFC4122 UUID used as a correlation ID for this event delivery</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>
    </EdSectionBand>

    <EdSectionBand
      id="step-3"
      num="06"
      color="var(--at-gold)"
      eyebrow="Step 3"
      title="Respond with 202 Accepted before processing"
      tone="surface"
    >
      <EdProse>
        You must respond with <code>202 Accepted</code> and an <strong>empty body</strong> before
        performing any processing. The Hub expects an immediate acknowledgement &mdash; do not wait for
        decryption or business logic before responding.
      </EdProse>

      <EdCode :code="ackResponse" lang="http" filename="HTTP response" />

      <EdNote type="warning">
        <p>
          Failure to respond with <code>202</code> promptly may cause the Hub to retry delivery. Process
          the event payload asynchronously after acknowledging receipt.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="step-4"
      num="07"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Step 4"
      title="Decrypt the JWE and verify the inner JWS"
      tone="cream"
    >
      <EdProse>
        The event is a JWE compact serialisation encrypted with your public <strong>Encryption Certificate</strong>.
        The JWE header contains a <code>kid</code> that identifies which of your registered encryption keys
        was used &mdash; decode the header first to select the correct private key, then decrypt.
      </EdProse>

      <EdProse>
        See <a href="/tech/tpp-standards/security/fapi/receiving-events">Receiving Event Notifications</a>
        for the full FAPI-aligned guidance, including key selection by <code>kid</code>, JWS signature
        verification, and required security checks.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="payload-meta"
      num="08"
      color="var(--at-navy)"
      eyebrow="Event Payload — Meta"
      title="Envelope metadata about the event itself"
      tone="surface"
    >
      <EdProse>
        The decrypted and decoded event payload contains the following structure under the
        <code>message</code> claim.
      </EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Field</th>
              <th>Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>EventDateTime</code></td>
              <td>string (date-time)</td>
              <td>When the event was generated</td>
            </tr>
            <tr>
              <td><code>EventResource</code></td>
              <td>string</td>
              <td>The resource URI that triggered the event</td>
            </tr>
            <tr>
              <td><code>EventType</code></td>
              <td>string</td>
              <td>One of: <code>Resource.Created</code>, <code>Resource.Updated</code>, <code>Resource.Deleted</code></td>
            </tr>
            <tr>
              <td><code>ConsentId</code></td>
              <td>string</td>
              <td>The consent identifier associated with the event</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>
    </EdSectionBand>

    <EdSectionBand
      id="payload-data"
      num="09"
      color="var(--at-teal-deep)"
      eyebrow="Event Payload — Data"
      title="A replica of the payment at the time of the change"
      tone="cream"
    >
      <EdProse>
        A replica of the payment resource at the time of the status change, with <code>Status</code> and
        <code>StatusUpdateDateTime</code> updated to reflect the new state. Where the payment was rejected,
        <code>RejectReasonCode</code> will be populated. Where the payment has been processed by the
        underlying rails, <code>PaymentTransactionId</code> will be present.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="example-payload"
      num="10"
      color="var(--at-gold)"
      eyebrow="Example"
      title="Decrypted event payload"
      tone="surface"
    >
      <EdCode :code="examplePayload" lang="json" filename="Decrypted JWS payload" />
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
