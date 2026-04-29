<route lang="yaml">
meta:
  title: Personal Identifiable Information (PII)
  isIndex: true
</route>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          LFI &middot; Banking &middot; Service Initiation &middot; PII
        </div>
        <h1 class="ed-doc__title">
          Personal Identifiable Information (PII)
          <span class="ed-doc__read">2 min read</span>
        </h1>
        <p class="ed-doc__lede">
          Every payment instruction carries sensitive data about who is paying and who is receiving
          the funds &mdash; creditor account details, optional debtor account, and risk indicators.
          This data is collectively referred to as <strong>Personal Identifiable Information
          (PII)</strong>.
        </p>
        <p class="ed-doc__lede">
          PII arrives at the LFI as an <strong>encrypted JWE string</strong> in the
          <code>PersonalIdentifiableInformation</code> field. The API Hub passes the JWE through
          without inspection &mdash; it cannot read or validate the contents. This means:
        </p>
      </div>
    </section>

    <EdSectionBand
      id="hub-cant-inspect"
      num="01"
      color="var(--at-teal)"
      eyebrow="What this implies"
      title="The Hub does not see PII"
      tone="cream"
    >
      <EdBullets>
        <li><strong>The LFI is solely responsible for decrypting and validating PII.</strong></li>
        <li>The PII has <strong>not been schema-validated</strong> by the API Hub.</li>
        <li>The PII content has <strong>not been read or inspected</strong> by any intermediary.</li>
      </EdBullets>

      <EdNote type="warning" title="LFI validation is mandatory">
        <p>
          Unlike other fields in the consent or payment request &mdash; which the API Hub validates
          against the OpenAPI specification before forwarding &mdash; PII is opaque to the API Hub.
          The LFI MUST decrypt, parse, and validate the PII independently against the schema defined
          in the OpenAPI specification. A malformed or invalid PII payload MUST be rejected by the
          LFI.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="when-received"
      num="02"
      color="var(--at-gold)"
      eyebrow="When PII is received"
      title="Two points in the payment lifecycle"
      tone="surface"
    >
      <EdProse>PII is present at <strong>two points</strong> in the payment lifecycle:</EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr><th>Stage</th><th>Source</th><th>Field</th></tr>
          </thead>
          <tbody>
            <tr><td>Consent authorisation</td><td>Consent Manager &rarr; LFI</td><td><code>consent.PersonalIdentifiableInformation</code></td></tr>
            <tr><td>Payment creation</td><td>Ozone Connect &rarr; LFI</td><td><code>payment.PersonalIdentifiableInformation</code></td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>
        The structure of the decrypted PII differs between the two stages &mdash; see
        <a href="/tech/lfi-api-hub/v2.1/banking/service-initiation/personal-identifiable-information/api-schema/pii-par">PII (Consent &mdash; Consent Manager)</a> and
        <a href="/tech/lfi-api-hub/v2.1/banking/service-initiation/personal-identifiable-information/api-schema/pii-payments">PII (Payments &mdash; Ozone Connect)</a> for the full
        schemas.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="why-encrypted"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Why PII is encrypted"
      title="End-to-end confidentiality"
      tone="cream"
    >
      <EdProse>
        Payment consents are stored centrally at the API Hub. Because the API Hub acts as an
        intermediary between TPPs and LFIs, PII is encrypted end-to-end before it leaves the TPP
        &mdash; ensuring that the API Hub, and any other party in transit, cannot read the sensitive
        payment details.
      </EdProse>
      <EdProse>
        The encryption uses the LFI's public encryption key
        (<a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/#enc1-encryption-key">Enc1</a>).
        Only the LFI can decrypt the payload using the corresponding Enc1 private key.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="lfi-responsibilities"
      num="04"
      color="var(--at-navy)"
      eyebrow="LFI responsibilities"
      title="Decrypt, validate, reject"
      tone="surface"
    >
      <EdProse>
        Because the API Hub cannot inspect PII, the LFI takes on additional responsibilities compared
        to other parts of the request:
      </EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr><th>Responsibility</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>Decryption</strong></td><td>Decrypt the JWE using the Enc1 private key &mdash; see <a href="/tech/lfi-api-hub/v2.1/banking/service-initiation/personal-identifiable-information/api-guide/decrypt-pii">How to Decrypt PII</a></td></tr>
            <tr><td><strong>Schema validation</strong></td><td>Validate the decrypted payload against the OpenAPI schema &mdash; no additional properties are permitted</td></tr>
            <tr><td><strong>Field validation</strong></td><td>Verify mandatory fields, IBAN format, BIC consistency, and creditor matching rules &mdash; see <a href="/tech/lfi-api-hub/v2.1/banking/service-initiation/personal-identifiable-information/debtor-account">Debtor Account</a> and <a href="/tech/lfi-api-hub/v2.1/banking/service-initiation/personal-identifiable-information/creditor">Creditor</a></td></tr>
            <tr><td><strong>Rejection</strong></td><td>Mark the consent invalid via <span class="endpoint"><span class="http-method http-method--post">POST</span><code>/consent/action/validate</code></span> if PII is malformed, missing required fields, or fails validation</td></tr>
          </tbody>
        </table>
      </EdRefTable>
    </EdSectionBand>

    <EdSectionBand
      id="structure"
      num="05"
      color="var(--at-teal-deep)"
      eyebrow="Structure of the PII payload"
      title="Initiation and Risk"
      tone="cream"
    >
      <EdProse>The decrypted PII contains two top-level sections:</EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr><th>Property</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>Initiation</code></td><td>Creditor and debtor account details &mdash; structure differs between consent and payment stages</td></tr>
            <tr><td><code>Risk</code></td><td>Fraud and risk indicators about the debtor, transaction, and creditor</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3 class="ed-doc__subhead">At consent validation (<span class="endpoint"><span class="http-method http-method--post">POST</span><code>/consent/action/validate</code></span>)</h3>
      <EdBullets>
        <li><code>Initiation.Creditor</code> is an <strong>array</strong> of 1&ndash;10 creditor entries (or omitted for open beneficiary)</li>
        <li><code>Initiation.DebtorAccount</code> is optionally present</li>
      </EdBullets>

      <h3 class="ed-doc__subhead">At payment time (Ozone Connect payment instruction)</h3>
      <EdBullets>
        <li>Creditor fields sit <strong>directly on <code>Initiation</code></strong> as a single creditor (not an array)</li>
        <li><code>DebtorAccount</code> is <strong>absent</strong> &mdash; the debtor account was fixed during consent authorisation</li>
      </EdBullets>
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

.ed-doc__subhead {
  font-family: var(--at-serif);
  font-size: 1.25rem;
  font-weight: 600;
  letter-spacing: -0.015em;
  color: var(--at-navy-deep);
  margin: 1.75rem 0 0.85rem;
}
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
