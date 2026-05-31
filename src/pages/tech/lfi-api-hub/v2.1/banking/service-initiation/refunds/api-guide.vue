<route lang="yaml">
meta:
  title: Payment Refunds — API Guide
</route>

<script setup lang="ts">
const exampleResponse = `{
  "data": {
    "consentId": "con-7f4a9b2c-1d3e-4f5a-b6c7-8d9e0f1a2b3c",
    "refundAccount": {
      "schemeName": "IBAN",
      "identification": "AE070331234567890123456",
      "name": {
        "en": "Ibrahim Al Suwaidi"
      }
    }
  },
  "meta": {}
}
`
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          LFI · Banking · Service Initiation · Refunds
        </div>
        <h1 class="ed-doc__title">
          Payment Refunds &mdash; API Guide
          <span class="ed-doc__read">2 min read</span>
        </h1>
        <p class="ed-doc__lede">
          The Payment Refunds endpoint lets the API Hub retrieve the debtor's payment account details
          from your LFI after a payment has been made. The TPP uses those details to initiate a refund
          back to the original payer. This endpoint does <strong>not</strong> execute the refund itself
          &mdash; it only returns the account details needed to initiate one.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="sequence-flow"
      num="01"
      color="var(--at-gold)"
      eyebrow="API Sequence Flow"
      title="End-to-end refund account retrieval"
      tone="cream"
    >
      <APIFlowViewer title="Payment Refunds API Flow">
        <APIFlowsRefunds />
      </APIFlowViewer>
    </EdSectionBand>

    <EdSectionBand
      id="get-refund"
      num="02"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="GET /payment-consents/{consentId}/refund"
      title="Return the debtor's refund account"
      tone="surface"
    >
      <div class="ed-doc__endpoint">
        <span class="http-badge http-get">GET</span>
        <code class="ed-doc__endpoint-path">/payment-consents/{consentId}/refund</code>
      </div>

      <h3 class="ed-doc__subhead">Request headers</h3>
      <EdRefTable>
        <table>
          <thead><tr><th>Header</th><th>Required</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>o3-provider-id</code></td><td>Yes</td><td>Identifier for your LFI registered in the Hub</td></tr>
            <tr><td><code>o3-aspsp-id</code></td><td>Yes <em>(deprecated)</em></td><td>Deprecated alias for <code>o3-provider-id</code>. Will be removed in a future version &mdash; use <code>o3-provider-id</code></td></tr>
            <tr><td><code>o3-caller-org-id</code></td><td>Yes</td><td>Organisation ID of the TPP making the underlying request</td></tr>
            <tr><td><code>o3-caller-client-id</code></td><td>Yes</td><td>OIDC client ID of the TPP application</td></tr>
            <tr><td><code>o3-caller-software-statement-id</code></td><td>Yes</td><td>Software statement ID of the TPP application</td></tr>
            <tr><td><code>o3-api-uri</code></td><td>Yes</td><td>The parameterised URL of the API being called by the TPP</td></tr>
            <tr><td><code>o3-api-operation</code></td><td>Yes</td><td>The HTTP method of the operation carried out by the TPP (e.g. <code>GET</code>)</td></tr>
            <tr><td><code>o3-ozone-interaction-id</code></td><td>Yes</td><td>Hub-generated interaction ID. Equals <code>o3-caller-interaction-id</code> if the TPP provided one</td></tr>
            <tr><td><code>o3-caller-interaction-id</code></td><td>No</td><td>Interaction ID passed in by the TPP, if present</td></tr>
            <tr><td><code>o3-psu-identifier</code></td><td>Yes</td><td>Base64-encoded representation of the customer identifier JSON object</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3 class="ed-doc__subhead">Path parameters</h3>
      <EdRefTable>
        <table>
          <thead><tr><th>Parameter</th><th>Required</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>consentId</code></td><td>Yes</td><td>The consent ID of the original payment consent</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3 class="ed-doc__subhead">Response</h3>
      <EdProse><code>Content-Type: application/json</code></EdProse>
      <EdProse>
        Return <code>200</code> with the debtor's refund account details. The Hub wraps the response in
        a signed JWS before returning it to the TPP &mdash; your LFI returns plain JSON.
      </EdProse>

      <h4 class="ed-doc__subhead ed-doc__subhead--small"><code>200</code> &mdash; Refund account found</h4>
      <EdProse>
        Return the debtor's account details under <code>data.refundAccount</code>. The
        <code>refundAccount</code> object is required and must contain the debtor's IBAN and name.
      </EdProse>
      <EdCode :code="exampleResponse" lang="json" filename="200 OK" />

      <h5 class="ed-doc__subhead ed-doc__subhead--xs"><code>data.refundAccount</code></h5>
      <EdRefTable>
        <table>
          <thead><tr><th>Field</th><th>Type</th><th>Required</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>schemeName</code></td><td>string</td><td>Yes</td><td>Account identifier scheme &mdash; always <code>IBAN</code></td></tr>
            <tr><td><code>identification</code></td><td>string</td><td>Yes</td><td>The debtor's IBAN</td></tr>
            <tr><td><code>name</code></td><td>object</td><td>Yes</td><td>The account holder name</td></tr>
            <tr><td><code>name.en</code></td><td>string</td><td>Yes</td><td>Account holder name in English (max 70 characters)</td></tr>
            <tr><td><code>name.ar</code></td><td>string</td><td>No</td><td>Account holder name in Arabic (max 70 characters)</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h4 class="ed-doc__subhead ed-doc__subhead--small">Error responses</h4>
      <EdProse>All error bodies must include <code>errorCode</code> and <code>errorMessage</code>.</EdProse>

      <h5 class="ed-doc__subhead ed-doc__subhead--xs"><code>403</code> &mdash; Forbidden</h5>
      <EdRefTable>
        <table>
          <thead><tr><th><code>errorCode</code></th><th><code>errorMessage</code></th><th>When to use</th></tr></thead>
          <tbody>
            <tr><td><code>Consent.AccountTemporarilyBlocked</code></td><td><code>The debtor account is blocked from receiving payments.</code></td><td>The account is blocked from receiving payments for a temporary reason &mdash; e.g. account status is <code>Suspended</code>, or the account is otherwise unable to receive a credit transaction refund on a transient basis</td></tr>
            <tr><td><code>Consent.PermanentAccountAccessFailure</code></td><td><code>The debtor account is blocked from receiving payments.</code></td><td>The account is blocked from receiving payments permanently &mdash; e.g. account status is <code>Closed</code>, <code>Deceased</code>, or <code>Unclaimed</code></td></tr>
          </tbody>
        </table>
      </EdRefTable>
    </EdSectionBand>

    <EdSectionBand
      id="api-reference"
      num="03"
      color="var(--at-teal)"
      eyebrow="API Reference"
      title="Full request and response schema"
      tone="cream"
    >
      <EdProse>
        See the
        <a href="/tech/lfi-api-hub/v2.1/banking/service-initiation/open-api/payment-consents-ConsentId-refund">GET
        <code>/payment-consents/{consentId}/refund</code> API Reference</a> for the full request and
        response schema.
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

.ed-doc__endpoint {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  margin: 0.5rem 0 1.5rem;
}
.ed-doc__endpoint-path {
  font-family: var(--at-mono);
  font-size: 0.95rem;
  background: var(--at-surface);
  padding: 0.35rem 0.6rem;
  border: 1px solid var(--at-grid-line);
  color: var(--at-navy-deep);
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
.ed-doc__subhead--xs { font-size: 0.95rem; margin-top: 1.25rem; font-family: var(--at-sans); font-weight: 600; }
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
