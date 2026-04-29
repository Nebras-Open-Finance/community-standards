<route lang="yaml">
meta:
  title: Creditor
</route>

<script setup lang="ts">
const parEntrySample = `{
  "CreditorAgent": { "SchemeName": "BICFI", "Identification": "ADCBAEAA" },
  "Creditor": { "Name": "Ivan England" },
  "CreditorAccount": {
    "SchemeName": "IBAN",
    "Identification": "AE070331234567890123456",
    "Name": { "en": "Ivan David England" }
  },
  "ConfirmationOfPayeeResponse": "eyJhbGci..."
}`

const singleBeneficiarySample = `{
  "Initiation": {
    "Creditor": [
      {
        "Creditor": { "Name": "Ivan England" },
        "CreditorAccount": {
          "SchemeName": "IBAN",
          "Identification": "AE070331234567890123456",
          "Name": { "en": "Ivan David England" }
        },
        "ConfirmationOfPayeeResponse": "eyJhbGci..."
      }
    ]
  }
}`

const multipleBeneficiariesSample = `{
  "Initiation": {
    "Creditor": [
      {
        "Creditor": { "Name": "Ivan England" },
        "CreditorAccount": {
          "SchemeName": "IBAN",
          "Identification": "AE070331234567890123456",
          "Name": { "en": "Ivan David England" }
        }
      },
      {
        "Creditor": { "Name": "Sara Al Zaabi" },
        "CreditorAccount": {
          "SchemeName": "IBAN",
          "Identification": "AE140260123456789012345",
          "Name": { "en": "Sara Al Zaabi" }
        }
      }
    ]
  }
}`

const openBeneficiarySample = `{
  "Initiation": {
    "DebtorAccount": { ... }
    // Creditor array omitted — supplied at payment time
  },
  "Risk": { ... }
}`

const paymentTimeSample = `{
  "Initiation": {
    "CreditorAgent": { "SchemeName": "BICFI", "Identification": "ADCBAEAA" },
    "Creditor": { "Name": "Ivan England" },
    "CreditorAccount": {
      "SchemeName": "IBAN",
      "Identification": "AE070331234567890123456",
      "Name": { "en": "Ivan David England" }
    },
    "ConfirmationOfPayeeResponse": "eyJhbGci..."
  },
  "Risk": { ... }
}`
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          Service Initiation &middot; PII &middot; Creditor
        </div>
        <h1 class="ed-doc__title">
          Creditor
          <span class="ed-doc__read">4 min read</span>
        </h1>
        <p class="ed-doc__lede">
          Creditor data is submitted as part of the PII payload at two points in the payment lifecycle. The
          structure is <strong>different</strong> at each stage.
        </p>

        <EdRefTable>
          <table>
            <thead>
              <tr>
                <th>Stage</th>
                <th>Endpoint</th>
                <th>Structure</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Consent staging</td>
                <td><span class="endpoint"><span class="http-method http-method--post">POST</span><code>/par</code></span></td>
                <td><code>Initiation.Creditor</code> &mdash; an <strong>array</strong> of creditor entries</td>
              </tr>
              <tr>
                <td>Payment creation</td>
                <td><span class="endpoint"><span class="http-method http-method--post">POST</span><code>/payments</code></span></td>
                <td><code>Initiation.CreditorAccount</code>, <code>Initiation.CreditorAgent</code>, <code>Initiation.Creditor</code>, <code>Initiation.ConfirmationOfPayeeResponse</code> &mdash; <strong>flat fields</strong> on <code>Initiation</code></td>
              </tr>
            </tbody>
          </table>
        </EdRefTable>
      </div>
    </section>

    <EdSectionBand
      id="consent-time"
      num="01"
      color="var(--at-teal)"
      eyebrow="Creditor at consent time — POST /par"
      title="Initiation.Creditor — array of creditor entries"
      tone="cream"
    >
      <EdProse>
        At consent staging, creditor data lives in <code>Initiation.Creditor</code> &mdash; an array of
        creditor entry objects. Each entry has the structure:
      </EdProse>
      <EdCode :code="parEntrySample" lang="json" filename="Creditor entry — POST /par" />

      <EdProse>
        The number of entries in the array determines the beneficiary model, which constrains which payment
        types are available.
      </EdProse>

      <h3>Single Beneficiary (1 entry)</h3>
      <EdProse>
        The <code>Creditor</code> array contains exactly <strong>one entry</strong>. The consent is bound to
        that creditor &mdash; every payment made under this consent must go to that account.
      </EdProse>
      <EdCode :code="singleBeneficiarySample" lang="json" filename="Single beneficiary" />
      <EdProse><strong>Supported payment types:</strong></EdProse>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Payment Type</th></tr>
          </thead>
          <tbody>
            <tr><td>Single Instant Payment &mdash; domestic</td></tr>
            <tr><td>Single Instant Payment &mdash; international</td></tr>
            <tr><td>Fixed Defined Schedule multi-payment</td></tr>
            <tr><td>Variable Defined Schedule multi-payment</td></tr>
            <tr><td>Fixed Periodic Schedule multi-payment</td></tr>
            <tr><td>Variable Periodic Schedule multi-payment</td></tr>
            <tr><td>Fixed On-Demand multi-payment</td></tr>
            <tr><td>Variable On-Demand multi-payment</td></tr>
            <tr><td>Delegated SCA (<code>IsDelegatedAuthentication: true</code>)</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3>Multiple Beneficiaries (2&ndash;10 entries)</h3>
      <EdProse>
        The <code>Creditor</code> array contains between <strong>2 and 10 entries</strong>. The consent
        authorises payments to any one of the listed creditors &mdash; each individual payment specifies which
        one.
      </EdProse>
      <EdCode :code="multipleBeneficiariesSample" lang="json" filename="Multiple beneficiaries" />
      <EdProse><strong>Supported payment types:</strong></EdProse>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Payment Type</th></tr>
          </thead>
          <tbody>
            <tr><td>Variable On-Demand multi-payment</td></tr>
            <tr><td>Delegated SCA (<code>IsDelegatedAuthentication: true</code>)</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3>Open Beneficiary (array omitted)</h3>
      <EdProse>
        The <code>Creditor</code> array is <strong>not provided</strong>. No beneficiary is fixed at consent
        time &mdash; the creditor is supplied with each
        <span class="endpoint"><span class="http-method http-method--post">POST</span><code>/payments</code></span>
        call.
      </EdProse>
      <EdCode :code="openBeneficiarySample" lang="json" filename="Open beneficiary" />
      <EdProse><strong>Supported payment types:</strong></EdProse>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Payment Type</th></tr>
          </thead>
          <tbody>
            <tr><td>Variable On-Demand multi-payment</td></tr>
            <tr><td>Delegated SCA (<code>IsDelegatedAuthentication: true</code>)</td></tr>
          </tbody>
        </table>
      </EdRefTable>
    </EdSectionBand>

    <EdSectionBand
      id="payment-time"
      num="02"
      color="var(--at-gold)"
      eyebrow="Creditor at payment time — POST /payments"
      title="Flat fields on Initiation — single AEDomesticCreditor"
      tone="surface"
    >
      <EdProse>
        At payment creation, the <code>Initiation</code> object in the PII payload <strong>is</strong> a single
        <code>AEDomesticCreditor</code> &mdash; the creditor fields are flat properties of
        <code>Initiation</code>, not nested inside an array.
      </EdProse>
      <EdCode :code="paymentTimeSample" lang="json" filename="Creditor — POST /payments" />

      <EdNote type="warning" title="Note on naming">
        <p>
          <code>Initiation.Creditor</code> at
          <span class="endpoint"><span class="http-method http-method--post">POST</span><code>/payments</code></span>
          is the <strong>party identity object</strong> (<code>{ Name, PostalAddress }</code>) &mdash; not the
          array that appears at
          <span class="endpoint"><span class="http-method http-method--post">POST</span><code>/par</code></span>.
          The two uses of the word <code>Creditor</code> refer to different things.
        </p>
      </EdNote>

      <h3>Matching the authorised creditor</h3>
      <EdProse>
        The creditor supplied at
        <span class="endpoint"><span class="http-method http-method--post">POST</span><code>/payments</code></span>
        must correspond to one of the creditors authorised on the consent. The rule depends on the beneficiary
        model:
      </EdProse>
      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Consent model</th>
              <th>Creditor at POST /par</th>
              <th>Requirement at POST /payments</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Single beneficiary</td>
              <td>1 entry in <code>Initiation.Creditor[]</code></td>
              <td>Must exactly match that entry &mdash; same IBAN and account name</td>
            </tr>
            <tr>
              <td>Multiple beneficiaries</td>
              <td>2&ndash;10 entries in <code>Initiation.Creditor[]</code></td>
              <td>Must exactly match one entry from the pre-approved list</td>
            </tr>
            <tr>
              <td>Open beneficiary</td>
              <td><code>Initiation.Creditor[]</code> omitted</td>
              <td>Any valid creditor &mdash; no consent-time match required</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdNote type="warning" title="Creditor must match the consent">
        <p>
          For Single and Multiple Beneficiary consents, the LFI validates that the
          <code>CreditorAccount.Identification</code> (IBAN) at
          <span class="endpoint"><span class="http-method http-method--post">POST</span><code>/payments</code></span>
          matches a creditor entry from the authorised consent. A mismatch will result in the payment being
          rejected.
        </p>
      </EdNote>

      <EdNote type="info" title="Open beneficiary: first appearance at POST /payments">
        <p>
          For Open Beneficiary consents, this is where the creditor details appear for the first time. The LFI
          validates the supplied creditor against the same mandatory field and IBAN rules that apply at consent
          time &mdash; there is no consent-time entry to match against.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="entry-schema"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Creditor entry schema"
      title="The shape of each creditor entry — applies to both stages"
      tone="cream"
    >
      <EdProse>
        The following schema applies to <strong>each entry in <code>Initiation.Creditor[]</code></strong> at
        <span class="endpoint"><span class="http-method http-method--post">POST</span><code>/par</code></span>,
        and to the <strong>flat fields on <code>Initiation</code></strong> at
        <span class="endpoint"><span class="http-method http-method--post">POST</span><code>/payments</code></span>.
      </EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Field</th>
              <th>Type</th>
              <th>Required</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><code>CreditorAccount.SchemeName</code></td><td>enum</td><td>Yes</td><td>Always <code>IBAN</code> for domestic payments</td></tr>
            <tr><td><code>CreditorAccount.Identification</code></td><td>string</td><td>Yes</td><td>The IBAN of the creditor account</td></tr>
            <tr><td><code>CreditorAccount.Name.en</code></td><td>string</td><td>Yes*</td><td>Account holder name in English</td></tr>
            <tr><td><code>CreditorAccount.Name.ar</code></td><td>string</td><td>Yes*</td><td>Account holder name in Arabic</td></tr>
            <tr><td><code>CreditorAccount.TradingName</code></td><td>object</td><td>No</td><td>Trading brand name, if applicable</td></tr>
            <tr><td><code>CreditorAccount.Type</code></td><td>enum</td><td>No</td><td>Account type: <code>Individual</code>, <code>Merchant</code>, <code>Business</code>, <code>Charity</code>, <code>GovernmentBody</code>, <code>Other</code></td></tr>
            <tr><td><code>Creditor.Name</code></td><td>string</td><td>No</td><td>Full legal name of the payment recipient</td></tr>
            <tr><td><code>Creditor.PostalAddress</code></td><td>object</td><td>No</td><td>Postal address of the payment recipient</td></tr>
            <tr><td><code>CreditorAgent.SchemeName</code></td><td>enum</td><td>No</td><td><code>BICFI</code> or <code>Other</code></td></tr>
            <tr><td><code>CreditorAgent.Identification</code></td><td>string</td><td>No</td><td>BIC/SWIFT code or payment scheme identifier</td></tr>
            <tr><td><code>ConfirmationOfPayeeResponse</code></td><td>string (JWS)</td><td>No</td><td>The full JWS returned by the CoP <code>/confirmation</code> endpoint, if CoP was performed</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>
        *At least one of <code>Name.en</code> or <code>Name.ar</code> must be present.
      </EdProse>

      <EdNote type="tip" title="Confirmation of Payee">
        <p>
          Where Confirmation of Payee has been performed for a creditor, include the full JWS response string
          in <code>ConfirmationOfPayeeResponse</code>. This gives the LFI confidence that the creditor account
          details have been verified. See
          <a href="/tech/tpp-standards/v2.1/banking/confirmation-of-payee/api-guide">Confirmation of Payee API
          Guide</a> for how to obtain the CoP response.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="validation"
      num="04"
      color="var(--at-navy)"
      eyebrow="Validation requirements — domestic payments"
      title="Rules the LFI applies after decrypting the PII"
      tone="surface"
    >
      <EdProse>
        These requirements apply at <strong>both
        <span class="endpoint"><span class="http-method http-method--post">POST</span><code>/par</code></span>
        and
        <span class="endpoint"><span class="http-method http-method--post">POST</span><code>/payments</code></span></strong>:
      </EdProse>
      <EdBullets>
        <li>At <span class="endpoint"><span class="http-method http-method--post">POST</span><code>/par</code></span>: each entry in the <code>Initiation.Creditor[]</code> array is validated independently.</li>
        <li>At <span class="endpoint"><span class="http-method http-method--post">POST</span><code>/payments</code></span>: the flat creditor fields on <code>Initiation</code> are validated.</li>
      </EdBullets>
      <EdProse>
        Because PII is encrypted using the LFI's public key, <strong>Nebras cannot validate it</strong>. All
        validation is performed by the LFI after decryption. A consent or payment that fails LFI validation
        will be rejected.
      </EdProse>

      <h3>1. Schema conformance</h3>
      <EdProse>
        The decrypted PII must conform exactly to the schema defined in the OpenAPI specification
        (<code>AEDomesticPaymentPII</code> for
        <span class="endpoint"><span class="http-method http-method--post">POST</span><code>/par</code></span>,
        <code>AEDomesticPaymentPIIProperties</code> for
        <span class="endpoint"><span class="http-method http-method--post">POST</span><code>/payments</code></span>).
        No additional properties are permitted.
      </EdProse>

      <h3>2. Mandatory fields</h3>
      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Field</th>
              <th>Requirement</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>CreditorAccount.Name.en</code> <strong>or</strong> <code>CreditorAccount.Name.ar</code></td>
              <td>At least one must be present</td>
            </tr>
            <tr>
              <td><code>CreditorAccount.SchemeName</code></td>
              <td>Must be <code>"IBAN"</code> &mdash; <code>"AccountNumber"</code> is not valid for domestic payments</td>
            </tr>
            <tr>
              <td><code>CreditorAccount.Identification</code></td>
              <td>Must be a valid UAE IBAN</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3>3. CreditorAgent &mdash; BIC derivation and validation</h3>
      <EdProse>
        The <code>CreditorAgent.Identification</code> field identifies the creditor's bank. LFIs apply the
        following rules:
      </EdProse>
      <EdBullets>
        <li><strong>If <code>CreditorAgent</code> is not provided</strong> &mdash; the LFI must derive the BIC from the IBAN.</li>
        <li><strong>If <code>CreditorAgent.Identification</code> is provided</strong> &mdash; the LFI must accept both 8-character and 11-character BIC formats. The LFI must not reject a valid BIC solely because of its length. Where AANI requires an 8-character BIC and an 11-character BIC is received, the LFI must validate that the 8-character truncation is consistent with the IBAN before submitting. In all cases, the LFI must validate that the provided BIC matches the BIC derivable from the IBAN.</li>
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
  color: var(--at-teal-deep);
  text-decoration: none;
  border-bottom: 1px solid currentColor;
}

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
}
</style>
