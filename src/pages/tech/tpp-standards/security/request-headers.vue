<route lang="yaml">
meta:
  title: Request Headers
</route>

<script setup lang="ts">
const interactionIdTabs = [
  {
    label: 'Node.js',
    lang: 'javascript',
    code: `import { v4 as uuidv4 } from 'uuid'
const interactionId = uuidv4()
// e.g. "7b5b4e3c-1d2a-4f5e-8c3b-9a0d6e2f1b4c"`,
  },
  {
    label: 'Python',
    lang: 'python',
    code: `import uuid
interaction_id = str(uuid.uuid4())
# e.g. "7b5b4e3c-1d2a-4f5e-8c3b-9a0d6e2f1b4c"`,
  },
] as const
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          Security · FAPI · HTTP headers
        </div>
        <h1 class="ed-doc__title">
          Request Headers
          <span class="ed-doc__read">3 min read</span>
        </h1>
        <p class="ed-doc__lede">
          These headers apply to all authenticated API calls made in the UAE Open Finance ecosystem. They
          are defined by the
          <a href="https://openid.net/specs/fapi-2_0-security-profile.html">FAPI 2.0 Security Profile</a>
          and the UAE Open Finance standard.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="header-reference"
      num="01"
      color="var(--at-teal)"
      eyebrow="Header Reference"
      title="At-a-glance summary of every supported header"
      tone="cream"
    >
      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Header</th>
              <th>Level</th>
              <th>Applies To</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>x-fapi-interaction-id</code></td>
              <td>Recommended</td>
              <td>All endpoints</td>
            </tr>
            <tr>
              <td><code>x-fapi-customer-ip-address</code></td>
              <td>Conditional</td>
              <td>All endpoints</td>
            </tr>
            <tr>
              <td><code>x-fapi-auth-date</code></td>
              <td>Conditional</td>
              <td>Data Sharing, Service Initiation, Confirmation of Payee</td>
            </tr>
            <tr>
              <td><code>x-customer-user-agent</code></td>
              <td>Optional</td>
              <td>Data Sharing, Service Initiation, Confirmation of Payee</td>
            </tr>
            <tr>
              <td><code>x-idempotency-key</code></td>
              <td>Required</td>
              <td><a href="/tech/tpp-standards/v2.1/banking/service-initiation/open-api/payments">POST /payments</a></td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>
    </EdSectionBand>

    <EdSectionBand
      id="interaction-id"
      num="02"
      color="var(--at-gold)"
      eyebrow="x-fapi-interaction-id"
      title="UUID v4 correlation ID for end-to-end tracing"
      tone="surface"
    >
      <EdProse>
        A UUID v4 correlation identifier that links a request to its response and enables end-to-end
        traceability across the ecosystem.
      </EdProse>

      <EdBullets>
        <li><strong>Format:</strong> UUID v4 (RFC 4122), e.g. <code>7b5b4e3c-1d2a-4f5e-8c3b-9a0d6e2f1b4c</code></li>
        <li><strong>Level:</strong> Recommended on all requests. TPPs SHOULD include this header on every outbound call.</li>
        <li><strong>LFI behaviour:</strong> The API Hub echoes the value verbatim in the <code>x-fapi-interaction-id</code> response header. If the header is absent, the API Hub generates a UUID and returns it in the response.</li>
      </EdBullets>

      <EdProse>
        TPPs should log the interaction ID alongside every outbound request and its response. This enables
        correlation of issues across TPP systems, the API Hub and the LFI systems, and Nebras support.
      </EdProse>

      <EdNote type="warning" title="UUID v4 format is strictly required">
        <p>
          The API Hub validates the format of <code>x-fapi-interaction-id</code>. If the value is not a
          valid UUID v4, <strong>the request will not fail</strong>, but the interaction ID will be
          silently discarded and will not be stored at the API Hub. This means the ID cannot be used for
          tracing or support &mdash; the value in your logs will not match anything on the API Hub side.
        </p>
      </EdNote>

      <EdCodeGroup :tabs="interactionIdTabs" />

      <EdProse>
        Do not use any format that does not conform to RFC 4122 UUID v4. Even values that look similar (e.g.
        GUIDs or UUIDs without hyphens) will be discarded.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="customer-ip"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="x-fapi-customer-ip-address"
      title="IP address of the customer's device at request time"
      tone="cream"
    >
      <EdProse>The IP address of the customer's device at the time of the request.</EdProse>

      <EdBullets>
        <li><strong>Format:</strong> IPv4 or IPv6 string, e.g. <code>192.168.1.1</code> or <code>2001:db8::1</code></li>
        <li><strong>Level:</strong> Required when the customer is present in an active PSU-facing session. Required on all Product and Leads endpoints regardless of session context.</li>
      </EdBullets>

      <EdProse>
        Where the TPP cannot determine the customer's IP address (e.g. in a server-to-server background
        call), this header should be omitted.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="auth-date"
      num="04"
      color="var(--at-navy)"
      eyebrow="x-fapi-auth-date"
      title="Last time the customer authenticated with the TPP"
      tone="surface"
    >
      <EdProse>The date and time at which the customer last authenticated with the TPP.</EdProse>

      <EdBullets>
        <li><strong>Format:</strong> RFC 7231 HTTP-date, e.g. <code>Sun, 10 Sep 2023 19:43:31 UTC</code></li>
        <li><strong>Level:</strong> Required when the customer is present in an active PSU-facing session (i.e. the request is being made on behalf of a customer who is currently logged in). Optional for background/automated calls.</li>
      </EdBullets>

      <EdNote type="tip">
        <p>
          This header informs the LFI's fraud and risk controls. Omitting it during a PSU-facing session
          may cause the LFI to treat the call as a background operation, which can affect consent and
          session handling.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="user-agent"
      num="05"
      color="var(--at-teal-deep)"
      eyebrow="x-customer-user-agent"
      title="The customer's browser or app user-agent string"
      tone="cream"
    >
      <EdProse>The user-agent string of the customer's browser or application.</EdProse>

      <EdBullets>
        <li><strong>Format:</strong> Standard HTTP User-Agent string, e.g. <code>Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X)</code></li>
        <li><strong>Level:</strong> Optional. Recommended where the customer is accessing the TPP via a browser or native application.</li>
      </EdBullets>

      <EdProse>
        This header supports LFI fraud detection and device fingerprinting. It should reflect the
        customer's actual device, not the TPP's server.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="idempotency-key"
      num="06"
      color="var(--at-gold)"
      eyebrow="x-idempotency-key"
      title="Exactly-once processing for payment initiation"
      tone="surface"
    >
      <EdProse>A unique key that guarantees exactly-once processing of payment initiation requests.</EdProse>

      <EdBullets>
        <li><strong>Format:</strong> String, maximum 40 characters, no whitespace &mdash; pattern <code>^(\S*)$</code></li>
        <li><strong>Level:</strong> Required on all <span class="endpoint"><span class="http-method http-method--post">POST</span><code>/payments</code></span> requests.</li>
        <li><strong>Scope:</strong> Unique per consent. The same key must not be reused across different consents.</li>
      </EdBullets>

      <h3>Rules</h3>
      <EdBullets>
        <li>If the API Hub receives a <span class="endpoint"><span class="http-method http-method--post">POST</span><code>/payments</code></span> request with an <code>x-idempotency-key</code> it has already processed for the same consent, it must return the original response without re-processing the payment.</li>
        <li>TPPs must not change the request body when replaying a request with the same idempotency key.</li>
        <li>TPPs must preserve the idempotency key when retrying after a network failure or timeout. Do not generate a new key for a retry &mdash; this would create a duplicate payment.</li>
        <li>The API Hub echoes the <code>x-idempotency-key</code> in the response header.</li>
      </EdBullets>

      <EdNote type="warning">
        <p>
          If a TPP generates a new <code>x-idempotency-key</code> on retry after a timeout, it risks
          creating a duplicate payment. The correct behaviour on retry is to resend the original key with
          the original request body.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="message-signing"
      num="07"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Message Signing"
      title="Request signing is handled separately"
      tone="cream"
    >
      <EdProse>
        Request signing (<code>x-jws-signature</code>) is handled separately. Refer to
        <a href="/tech/tpp-standards/security/fapi/message-signing">Message Signing</a> for requirements
        and implementation guidance.
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
