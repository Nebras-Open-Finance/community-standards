<route lang="yaml">
meta:
  title: "Payment PII Encryption — Why It Exists and What It Means for You"
  description: "Why personal identifiable information in payment consents is encrypted end-to-end, what that means for LFI validation responsibility, TPP onboarding care, and how creditor rules differ by payment type."
  category: Security
  readTime: "8 min"
  updated: "2026-04-21"
  tags:
    - PII
    - Encryption
    - JWE
</route>

<script setup lang="ts">
interface Section { id: string; label: string }
interface MetaItem { label: string; value: string }

const sections: Section[] = [
  { id: 'why',      label: 'Why' },
  { id: 'what',     label: 'What' },
  { id: 'lfis',     label: 'For LFIs' },
  { id: 'tpps',     label: 'For TPPs' },
  { id: 'creditor', label: 'Creditor rules' },
]

const meta: MetaItem[] = [
  { label: 'Category', value: 'Security' },
  { label: 'Read',     value: '8 min' },
  { label: 'Updated',  value: '21 Apr 2026' },
]

const tags: readonly string[] = ['PII', 'Encryption', 'JWE']
</script>

<template>
  <div class="ed-page">
    <EdBackStrip href="/knowledge-base/" text="All knowledge base articles" />

    <EdHero
      eyebrow="Learn · Understand · Build"
      title="Payment PII Encryption — Why It Exists and What It Means for You"
      :meta="meta"
      lede="Payment PII &mdash; payer/payee names, account numbers, risk context &mdash; is encrypted <strong>end-to-end</strong> using the LFI's public encryption key before it leaves the TPP. Nebras passes the encrypted blob through but cannot read, inspect, or validate it. Only the LFI, holding the private key, can decrypt and act on the data."
    >
      <template #lede>
        <div class="ed-tags">
          <span v-for="t in tags" :key="t" class="ed-tag">{{ t }}</span>
        </div>
      </template>
    </EdHero>

    <EdInPageNav :sections="sections" />

    <EdSectionBand
      id="why"
      num="01"
      color="var(--at-teal)"
      eyebrow="Why"
      title="The data privacy rationale"
      tone="cream"
    >
      <EdProse>The core reason is <strong>data privacy</strong>: the PII inside a payment consent contains account holder names, IBANs, and other personal details that have no business being visible to any party other than the LFI processing the payment.</EdProse>
      <EdProse>Nebras operates as a central hub holding the consents. Without encryption, Nebras would have visibility into every creditor account, debtor name, and transaction risk indicator across all payment flows on the platform. Encrypting the PII directly to the LFI's key ensures that Nebras acts purely as a routing layer, with no access to the personal data it carries.</EdProse>
      <EdProse>This design also means if the central hub were ever compromised, the PII within payment consents would remain unreadable.</EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="what"
      num="02"
      color="var(--at-gold)"
      eyebrow="What is encrypted"
      title="The PersonalIdentifiableInformation payload"
      tone="surface"
    >
      <EdRefTable>
        <table>
          <thead><tr><th>When</th><th>Where</th><th>Contains</th></tr></thead>
          <tbody>
            <tr><td>Consent creation</td><td><code>POST /par</code> &mdash; inside <code>authorization_details</code></td><td>Debtor account details, creditor account(s), risk indicators</td></tr>
            <tr><td>Each payment request</td><td><code>POST /payments</code></td><td>The specific creditor for that payment, risk indicators</td></tr>
          </tbody>
        </table>
      </EdRefTable>
      <EdProse>Each encryption is fresh &mdash; the TPP re-encrypts a new payload each time, using the LFI's current public key. The two payloads (consent-time and payment-time) are independently validated by the LFI after decryption.</EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="lfis"
      num="03"
      color="var(--at-blue)"
      eyebrow="For LFIs"
      title="You bear full validation responsibility"
      lede="Because Nebras cannot read the PII, <strong>LFIs bear full responsibility for validating it</strong> after decryption."
      tone="cream"
    >
      <EdBullets>
        <li>Confirming that the PII payload conforms to the schema (<code>AEDomesticPaymentPIIProperties</code> for domestic payments).</li>
        <li>Validating mandatory fields &mdash; at minimum <code>CreditorAccount.Identification</code> (a valid UAE IBAN) and at least one of <code>CreditorAccount.Name.en</code> or <code>CreditorAccount.Name.ar</code>.</li>
        <li>Comparing the creditor supplied at <code>POST /payments</code> against the creditor(s) recorded in the consent PII, and rejecting the payment if they do not match.</li>
      </EdBullets>
      <EdProse>A payment rejected at the LFI due to malformed or mismatched PII is not surfaced as an API Hub error &mdash; it appears as a payment-level rejection. LFIs should return clear error responses so that TPPs can diagnose and correct the issue.</EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="tpps"
      num="04"
      color="var(--at-blue-deep)"
      eyebrow="For TPPs"
      title="Errors aren't caught centrally — onboarding care matters"
      tone="surface"
    >
      <EdProse>Because PII validation happens entirely inside the LFI after decryption, errors in the encrypted payload <strong>are not caught centrally</strong>. A consent or payment may be accepted by the API Hub and then rejected by the LFI.</EdProse>

      <EdNote type="important" title="When onboarding with a new LFI, take extra care">
        <p>A successful <code>POST /par</code> response only means the API Hub accepted the request &mdash; it does not mean the LFI successfully decrypted and validated the PII inside it.</p>
      </EdNote>

      <EdBullets>
        <li>Confirm the exact field names, nesting structure, and data types the LFI expects. While the schema is standardised, LFIs may have specific expectations &mdash; for example, BIC format (8 vs 11 characters) or name field encoding.</li>
        <li>Test end-to-end with the LFI before going live.</li>
        <li>Ensure the creditor details you encrypt exactly match what you intend: for single and multiple beneficiary consents, even a minor discrepancy (whitespace, encoding difference) in the account name can cause payment rejection.</li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="creditor"
      num="05"
      color="var(--at-navy)"
      eyebrow="Creditor rules"
      title="Single, multiple, or open beneficiary by payment type"
      lede="The number of creditor entries you may include in the consent PII depends on the payment type. This determines the <strong>beneficiary model</strong> and constrains what creditors can be used at payment time."
      tone="cream"
    >
      <h3>Single-beneficiary payment types</h3>
      <EdProse>The following payment types accept <strong>exactly one creditor entry</strong> in <code>Initiation.Creditor[]</code>. The consent is bound to that single recipient &mdash; all payments under the consent must go to that account.</EdProse>
      <EdBullets>
        <li>Single Instant Payment</li>
        <li>Fixed Defined Schedule</li>
        <li>Variable Defined Schedule</li>
        <li>Fixed On-Demand</li>
        <li>Fixed Periodic Schedule</li>
        <li>Variable Periodic Schedule</li>
      </EdBullets>

      <h3>Flexible beneficiary payment types</h3>
      <EdProse>The following payment types support all three beneficiary models, giving TPPs more flexibility at the cost of additional validation complexity:</EdProse>
      <EdRefTable>
        <table>
          <thead><tr><th>Model</th><th><code>Initiation.Creditor[]</code></th><th>Effect</th></tr></thead>
          <tbody>
            <tr><td><strong>Open beneficiary</strong></td><td>Omitted</td><td>No creditor fixed at consent time &mdash; each <code>POST /payments</code> specifies a fresh creditor</td></tr>
            <tr><td><strong>Single beneficiary</strong></td><td>1 entry</td><td>All payments under the consent go to that one account</td></tr>
            <tr><td><strong>Multiple beneficiaries</strong></td><td>2&ndash;10 entries</td><td>Each payment specifies one of the pre-approved accounts</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>Payment types that support all three models:</EdProse>
      <EdBullets>
        <li><strong>Variable On-Demand</strong></li>
        <li><strong>Delegated SCA</strong></li>
      </EdBullets>

      <EdProse>For multiple and open beneficiary consents the LFI still validates each individual payment's creditor against the same field and IBAN rules &mdash; the flexibility is in who the creditor can be, not in bypassing validation.</EdProse>
      <EdProse>See <a href="/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information/creditor">Creditor</a> for the full matching rules and field validation requirements, and <a href="/tech/tpp-standards/v2.1/banking/service-initiation/personal-identifiable-information/">Personal Identifiable Information</a> for the complete schema reference.</EdProse>
    </EdSectionBand>

    <EdRelatedCards eyebrow="Related articles" title="Read alongside">
      <EdRelatedCard
        href="/knowledge-base/articles/choosing-a-payment-type"
        category="Payments"
        category-color="var(--at-gold)"
        title="Choosing a Payment Type"
        desc="The seven payment shapes and how to pick the right one."
      />
      <EdRelatedCard
        href="/knowledge-base/articles/payment-account-permissions"
        category="Payments"
        category-color="var(--at-gold)"
        title="Account Permissions in a Payment Consent"
        desc="Reading payer accounts and balances under a payment consent."
      />
      <EdRelatedCard
        href="/knowledge-base/articles/consent-identifiers"
        category="Consents"
        category-color="var(--at-teal)"
        title="Consent Identifiers"
        desc="Why end user and account IDs patched onto a consent must be opaque."
      />
    </EdRelatedCards>
  </div>
</template>

<style scoped>
.ed-page { background: var(--at-bg-cream); color: var(--at-navy-deep); font-family: var(--at-sans); padding-top: 4.25rem; }
.ed-tags { display: flex; flex-wrap: wrap; gap: 0.45rem; margin-top: 1.5rem; }
.ed-tag { padding: 0.35rem 0.7rem; background: color-mix(in srgb, var(--at-blue) 12%, transparent); color: var(--at-blue-deep); font-family: var(--at-mono); font-size: 0.62rem; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 700; }
</style>
