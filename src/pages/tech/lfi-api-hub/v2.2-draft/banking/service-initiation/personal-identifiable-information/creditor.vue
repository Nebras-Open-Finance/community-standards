<route lang="yaml">
meta:
  title: Creditor
</route>

<script setup lang="ts">
const invalidConsentJson = `{
  "data": {
    "status": "invalid",
    "code": "InvalidCreditor",
    "description": "Creditor validation failed: <reason>."
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
          Creditor
          <span class="ed-doc__read">2 min read</span>
        </h1>
        <p class="ed-doc__lede">
          At consent validation &mdash;
          <span class="endpoint"><span class="http-method http-method--post">POST</span><code>/consent/action/validate</code></span>
          &mdash; the LFI MUST validate <code>Initiation.Creditor</code> in the decrypted PII against
          three concerns:
        </p>
      </div>
    </section>

    <EdSectionBand
      id="overview"
      num="01"
      color="var(--at-teal)"
      eyebrow="Overview"
      title="Three concerns the LFI MUST check"
      tone="cream"
    >
      <EdBullets>
        <li><strong>Cardinality</strong> &mdash; the shape of <code>Initiation.Creditor</code> matches a beneficiary model permitted by the requested payment type.</li>
        <li><strong>Mandatory fields</strong> &mdash; every entry carries the fields required for a UAE domestic payment.</li>
        <li><strong>Domestic creditor validity</strong> &mdash; each entry names an account reachable on a supported UAE domestic rail.</li>
      </EdBullets>

      <EdProse>
        If any check fails, the LFI MUST mark the consent invalid in its validate response &mdash;
        see <a href="#rejecting-an-invalid-consent">Rejecting an invalid consent</a> below.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="cardinality"
      num="02"
      color="var(--at-gold)"
      eyebrow="Cardinality"
      title="Beneficiary model"
      tone="surface"
    >
      <EdProse>
        The shape of <code>Initiation.Creditor</code> determines the beneficiary model. Three models
        are defined:
      </EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr><th>Beneficiary model</th><th><code>Initiation.Creditor</code></th></tr>
          </thead>
          <tbody>
            <tr><td>Single</td><td>Array of exactly <strong>1 entry</strong></td></tr>
            <tr><td>Multiple</td><td>Array of <strong>2&ndash;10 entries</strong></td></tr>
            <tr><td>Open</td><td>Array <strong>omitted</strong> &mdash; no creditor fixed at consent time</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>
        Each payment type accepts only certain beneficiary models. The LFI MUST reject a consent
        where the cardinality doesn't align with a model permitted for the requested payment type.
        The allowed models are documented on each payment type's Requirements page (e.g.
        <a href="../domestic-payments/multi-payments/variable-on-demand/requirements">Variable On-Demand
        &mdash; Requirements</a>).
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="mandatory-fields"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Mandatory fields"
      title="Required for every creditor entry"
      tone="cream"
    >
      <EdProse>
        For every entry in <code>Initiation.Creditor[]</code>, the following fields MUST be present
        for a UAE domestic payment:
      </EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr><th>Field</th><th>Rule</th></tr>
          </thead>
          <tbody>
            <tr><td><code>CreditorAccount.SchemeName</code></td><td>MUST be <code>"IBAN"</code> &mdash; <code>"AccountNumber"</code> is not valid for domestic payments</td></tr>
            <tr><td><code>CreditorAccount.Identification</code></td><td>MUST be a valid UAE IBAN</td></tr>
            <tr><td><code>CreditorAccount.Name.en</code> OR <code>CreditorAccount.Name.ar</code></td><td>At least one MUST be present</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>
        If any required field is missing, <code>SchemeName</code> is set to
        <code>"AccountNumber"</code>, or the IBAN is invalid, the LFI MUST invalidate the consent.
      </EdProse>
      <EdProse>
        Schema conformance &mdash; including <code>additionalProperties: false</code> at every level
        &mdash; is enforced through the OpenAPI spec. See
        <a href="./api-guide/decrypt-pii">How to Decrypt PII</a> for how to plug the PII schema into
        a validator.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="creditor-agent"
      num="04"
      color="var(--at-navy)"
      eyebrow="CreditorAgent"
      title="BIC derivation rules"
      tone="surface"
    >
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Scenario</th><th>LFI behaviour</th></tr>
          </thead>
          <tbody>
            <tr><td><code>CreditorAgent.Identification</code> not provided</td><td>LFI MUST derive the BIC from the IBAN</td></tr>
            <tr><td><code>CreditorAgent.Identification</code> provided</td><td>MUST be in 8- or 11-character BIC format, and MUST match the BIC derivable from the IBAN</td></tr>
          </tbody>
        </table>
      </EdRefTable>
    </EdSectionBand>

    <EdSectionBand
      id="domestic-creditor-validity"
      num="05"
      color="var(--at-teal-deep)"
      eyebrow="Domestic creditor validity"
      title="Reachability on AANI / UAEFTS"
      tone="cream"
    >
      <EdProse>
        For each entry, the LFI MUST validate that the creditor account is reachable on a supported
        UAE domestic rail &mdash; <strong>AANI</strong> or <strong>UAEFTS</strong>. Where the LFI
        can determine the state of the receiving account, it MUST also check that the account is
        able to receive payments.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="rejecting-an-invalid-consent"
      num="06"
      color="var(--at-teal)"
      eyebrow="Rejecting an invalid consent"
      title="Mark the consent invalid in the validate response"
      tone="surface"
    >
      <EdProse>
        If any check above fails, the LFI MUST mark the consent invalid in its
        <span class="endpoint"><span class="http-method http-method--post">POST</span><code>/consent/action/validate</code></span>
        response. The API Hub will then reject the consent back to the TPP.
      </EdProse>

      <EdCode :code="invalidConsentJson" lang="json" filename="invalid validate response" />

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
.ed-doc__lede :deep(a:hover) { color: var(--at-teal-deep); }

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
}
</style>
