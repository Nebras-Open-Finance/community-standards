<route lang="yaml">
meta:
  title: Debtor Account
</route>

<script setup lang="ts">
const invalidDebtorAccountJson = `{
  "data": {
    "status": "invalid",
    "code": "InvalidDebtorAccount",
    "description": "The supplied DebtorAccount is not recognised at this LFI or cannot be used for payment initiation."
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
          LFI &middot; Banking &middot; Service Initiation &middot; PII
        </div>
        <h1 class="ed-doc__title">
          Debtor Account
          <span class="ed-doc__read">2 min read</span>
        </h1>

        <EdNote type="info" title="Consent validation only">
          <p>
            <code>Initiation.DebtorAccount</code> is only present in the PII the LFI receives at
            <span class="endpoint"><span class="http-method http-method--post">POST</span><code>/consent/action/validate</code></span>
            (consent validation). It is <strong>not part of the PII delivered with a payment
            instruction via Ozone Connect</strong> &mdash; by the time a payment is created, the
            debtor account has been fixed by the consent authorisation journey.
          </p>
        </EdNote>

        <p class="ed-doc__lede">
          When a TPP supplies <code>Initiation.DebtorAccount</code> in the consent PII, the LFI MUST
          validate it during consent validation &mdash;
          <span class="endpoint"><span class="http-method http-method--post">POST</span><code>/consent/action/validate</code></span>.
          At this stage the customer has <strong>not yet authenticated</strong>, so the LFI cannot check
          ownership. The checks are limited to whether the account exists at this LFI, is reachable
          through this API Hub, and is eligible for payment initiation.
        </p>

        <EdNote type="tip" title="Customer-specific checks happen later">
          <p>
            Checks that depend on the authenticated customer &mdash; e.g. whether the
            <code>DebtorAccount</code> supplied by the TPP actually belongs to the user who logs in
            at the LFI &mdash; are covered separately under the authorisation journey. This page
            covers only what the LFI MUST validate before the consent is stored.
          </p>
        </EdNote>
      </div>
    </section>

    <EdSectionBand
      id="validation-requirements"
      num="01"
      color="var(--at-teal)"
      eyebrow="Validation requirements"
      title="What to check after decryption"
      tone="cream"
    >
      <EdProse>
        Perform these checks after <a href="./api-guide/decrypt-pii">decrypting the PII</a> in the
        <span class="endpoint"><span class="http-method http-method--post">POST</span><code>/consent/action/validate</code></span>
        handler:
      </EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr><th>Check</th><th>Rule</th></tr>
          </thead>
          <tbody>
            <tr><td>Schema</td><td><code>DebtorAccount</code> conforms to <code>AEDomesticPaymentPII</code> &mdash; see <a href="./api-schema/pii-par">PII Schema &mdash; Consent</a></td></tr>
            <tr><td>Scheme</td><td><code>SchemeName</code> MUST be <code>IBAN</code></td></tr>
            <tr><td>Account exists</td><td><code>Identification</code> (IBAN) corresponds to an account held at this LFI and reachable through this API Hub</td></tr>
            <tr><td>Payments enabled</td><td>The account is in a state that permits payment initiation (e.g. not blocked, dormant, or closed)</td></tr>
          </tbody>
        </table>
      </EdRefTable>
    </EdSectionBand>

    <EdSectionBand
      id="rejecting-an-invalid-debtor-account"
      num="02"
      color="var(--at-gold)"
      eyebrow="Rejecting an invalid DebtorAccount"
      title="Mark the consent invalid in the validate response"
      tone="surface"
    >
      <EdProse>
        If any check fails, the LFI MUST mark the consent invalid in its
        <span class="endpoint"><span class="http-method http-method--post">POST</span><code>/consent/action/validate</code></span>
        response. The API Hub will then reject the consent back to the TPP.
      </EdProse>

      <EdCode :code="invalidDebtorAccountJson" lang="json" filename="invalid validate response" />

      <EdProse>
        See
        <a href="/tech/lfi-api-hub/v2.2-draft/consent-events/api-guide">Consent Events &amp; Actions
        &mdash; API Guide</a>
        for the full
        <span class="endpoint"><span class="http-method http-method--post">POST</span><code>/consent/action/validate</code></span>
        flow and response schema.
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
  margin: 0 0 1.5rem;
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
.ed-doc__lede :deep(a:hover) { color: var(--at-teal-deep); }

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
}
</style>
