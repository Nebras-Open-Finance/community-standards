<route lang="yaml">
meta:
  title: Insurance Data Sharing — Encrypted Premiums
</route>

<script setup lang="ts">
const cleartextExample = `{
  "Premium": {
    "PremiumAmountExcludingVAT": "950.00",
    "PremiumVATAmount": "47.50",
    "TotalPremiumAmount": "997.50",
    "Currency": "AED",
    "PremiumFrequency": "Annually"
  }
}
`

const jweExample = `{
  "Premium": "eyJhbGciOiJQQkVTMi1IUzUxMitBMjU2S1ciLCJlbmMiOiJBMjU2R0NNIiwicDJzIjoiNGtBWG..."
}
`
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          LFI &middot; Insurance &middot; Data Sharing &middot; API Guide
        </div>
        <h1 class="ed-doc__title">
          Encrypted Premiums
          <span class="ed-doc__read">4 min read</span>
        </h1>
        <p class="ed-doc__lede">
          The <code>Premium</code> field on every insurance policy response is an <code>anyOf</code> of
          a structured cleartext object or a compact JWE string. Your LFI chooses, per policy, which
          shape to return. When you return a JWE, the TPP backend MUST NOT decrypt it &mdash; the
          payload is unwrapped only on the customer&rsquo;s device.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="when-to-encrypt"
      num="01"
      color="var(--at-teal)"
      eyebrow="When to encrypt"
      title="Per-policy LFI choice"
      tone="cream"
    >
      <EdProse>
        Encrypted premiums let your LFI surface commercially sensitive premium values to a
        customer-present TPP experience without the TPP backend ever holding the cleartext. The
        decision is per policy and entirely yours &mdash; the TPP and the API Hub do not influence it.
        Both shapes are valid under the OpenAPI spec, so the TPP is required to handle either on every
        call.
      </EdProse>

      <EdBullets>
        <li>
          <strong>Cleartext</strong> &mdash; appropriate when the premium is non-sensitive or already
          publicly disclosed (e.g. tariff-based products with published rates).
        </li>
        <li>
          <strong>Encrypted (JWE)</strong> &mdash; appropriate for individually underwritten policies
          where the premium reflects pricing decisions you do not want exposed in a TPP&rsquo;s
          server-side analytics, switching pipelines, or third-party data flows.
        </li>
      </EdBullets>

      <EdNote type="info" title="Permission still required">
        <p>
          The Hub only routes the request with <code>Premium</code> in scope when the consent grants
          <code>ReadInsurancePremium</code>. If the permission is absent for the relevant sector, omit
          the <code>Premium</code> field entirely &mdash; do not return an empty object or a placeholder
          JWE.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="cleartext-shape"
      num="02"
      color="var(--at-gold, #b08800)"
      eyebrow="Cleartext shape"
      title="AEInsuranceDataSharingPremiumProperties"
      tone="surface"
    >
      <EdProse>
        Populate the structured object directly under the <code>Premium</code> key. All five fields are
        required by the OpenAPI spec.
      </EdProse>

      <EdCode :code="cleartextExample" lang="json" filename="cleartext Premium" />

      <EdRefTable>
        <table>
          <thead>
            <tr><th>Field</th><th>Type</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>PremiumAmountExcludingVAT</code></td><td>string (amount)</td><td>The Premium Amount excluding any VAT amount.</td></tr>
            <tr><td><code>PremiumVATAmount</code></td><td>string (amount)</td><td>The Premium VAT amount.</td></tr>
            <tr><td><code>TotalPremiumAmount</code></td><td>string (amount)</td><td>The total Premium amount including VAT.</td></tr>
            <tr><td><code>Currency</code></td><td>string (ISO 4217)</td><td>Currency of the premium amounts.</td></tr>
            <tr><td><code>PremiumFrequency</code></td><td>enum</td><td>The payment frequency the calculated Premium has been based on.</td></tr>
          </tbody>
        </table>
      </EdRefTable>
    </EdSectionBand>

    <EdSectionBand
      id="jwe-shape"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Encrypted shape"
      title="AEInsurancePremiumJWE"
      tone="cream"
    >
      <EdProse>
        Encrypt the same structured premium object as a compact JWE and place the resulting string
        directly under the <code>Premium</code> key &mdash; not wrapped in another object.
      </EdProse>

      <EdCode :code="jweExample" lang="json" filename="encrypted Premium" />

      <EdProse>
        The JWE mechanism mirrors Bank Data Sharing&rsquo;s encrypted <code>FinanceRates</code> field
        &mdash; same algorithms, same client-side decryption pattern, same handling obligations on the
        TPP. The customer-side decryption flow is documented for TPPs at
        <a href="/tech/tpp-standards/v2.1/insurance/data-sharing/api-guide/premiums">Encrypted Premiums</a>;
        treat the LFI obligations on this page as the producer-side equivalent.
      </EdProse>

      <EdNote type="warning" title="Do not mix shapes within one response">
        <p>
          A single policy response carries exactly one of the two shapes &mdash; either the cleartext
          object or the JWE string. Do not include both keys, do not embed the JWE inside the
          structured object, and do not return a partially populated structured object alongside a JWE.
        </p>
      </EdNote>
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
.ed-doc__lede :deep(code) {
  font-family: var(--at-mono);
  font-size: 0.86em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  padding: 0.08em 0.4em;
}

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
}
</style>
