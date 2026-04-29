<route lang="yaml">
meta:
  title: "OnBehalfOf — When to Use It and When Not To"
  description: "When to populate OnBehalfOf in PAR requests, which consent types support it, and how payment (service initiation) consents handle merchant identity via creditor fields instead."
  category: Consents
  readTime: "5 min"
  updated: "2026-04-21"
  tags:
    - Consents
    - OnBehalfOf
    - Data Sharing
</route>

<script setup lang="ts">
// Phase 5 — OnBehalfOf article. Ported from
// `docs/components/WebPages/KbOnBehalfOfArticle.vue`.

interface Section { id: string; label: string }
interface MetaItem { label: string; value: string }

const sections: Section[] = [
  { id: 'when',      label: 'When to use' },
  { id: 'object',    label: 'The object' },
  { id: 'where',     label: 'Where it applies' },
  { id: 'payments',  label: 'Payments' },
  { id: 'examples',  label: 'Examples' },
  { id: 'checklist', label: 'Checklist' },
]

const meta: MetaItem[] = [
  { label: 'Category', value: 'Consents' },
  { label: 'Read',     value: '5 min' },
  { label: 'Updated',  value: '21 Apr 2026' },
]

const tags: readonly string[] = ['Consents', 'OnBehalfOf', 'Data Sharing']

const objectShape = `{
  "TradingName": "string",
  "LegalName": "string",
  "IdentifierType": "string",
  "Identifier": "string"
}`

const dataSharingExample = `{
  "type": "urn:openfinanceuae:bank-data-sharing-consent:v2.1",
  "consent": {
    "Permissions": ["ReadAccountsBasic", "ReadBalances"],
    "ExpirationDateTime": "2026-02-21T12:00:00+00:00",
    "OnBehalfOf": {
      "TradingName": "Acme Aggregation Ltd",
      "LegalName": "Acme Aggregation Limited",
      "IdentifierType": "Other",
      "Identifier": "AA-TPP-12345"
    }
  }
}`

const paymentExample = `{
  "type": "urn:openfinanceuae:bank-service-initiation-consent:v2.1",
  "consent": {
    "PersonalIdentifiableInformation": {
      "Initiation": {
        "Creditor": {
          "Name": "Example Merchant Ltd"
        },
        "CreditorAccount": {
          "Name": {
            "en": "Example Merchant",
            "ar": "مثال التاجر"
          }
        }
      }
    }
  }
}`
</script>

<template>
  <div class="ed-page">
    <EdBackStrip href="/knowledge-base/" text="All knowledge base articles" />

    <EdHero
      eyebrow="Learn · Understand · Build"
      title="OnBehalfOf — When to Use It and When Not To"
      :meta="meta"
      lede="<code>OnBehalfOf</code> appears in <strong>Bank Data Sharing</strong> and <strong>Insurance Data Sharing</strong> PAR schemas to declare that the TPP is acting on behalf of another regulated entity. For <strong>Bank Service Initiation (payment) PARs</strong>, <code>OnBehalfOf</code> is not used &mdash; the payment recipient is represented via creditor fields instead."
    >
      <template #lede>
        <div class="ed-tags">
          <span v-for="t in tags" :key="t" class="ed-tag">{{ t }}</span>
        </div>
      </template>
    </EdHero>

    <EdInPageNav :sections="sections" />

    <EdSectionBand
      id="when"
      num="01"
      color="var(--at-teal)"
      eyebrow="When to use"
      title="Acting for another regulated entity"
      tone="cream"
    >
      <EdProse>Populate <code>OnBehalfOf</code> when the caller (TPP) is requesting authorisation for <strong>bank or insurance data sharing only</strong>, but is doing so on behalf of another legal or regulated entity:</EdProse>
      <EdBullets>
        <li>A TPP provides technology services to an LFI and stages the PAR on behalf of that LFI.</li>
        <li>A licensed aggregator or reseller acts as the technical integration layer for another regulated entity.</li>
      </EdBullets>
      <EdProse>If the TPP is representing itself (no other regulated entity is involved), <code>OnBehalfOf</code> is not required.</EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="object"
      num="02"
      color="var(--at-gold)"
      eyebrow="The object"
      title="Field shape"
      tone="surface"
    >
      <EdCode :code="objectShape" lang="json" />

      <EdRefTable>
        <table>
          <thead><tr><th>Field</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>TradingName</code></td><td>The trading name of the entity being represented.</td></tr>
            <tr><td><code>LegalName</code></td><td>The registered legal name of the entity.</td></tr>
            <tr><td><code>IdentifierType</code></td><td>Identifier scheme &mdash; currently <code>"Other"</code> in the published schema.</td></tr>
            <tr><td><code>Identifier</code></td><td>The identifier value for the represented entity.</td></tr>
          </tbody>
        </table>
      </EdRefTable>
    </EdSectionBand>

    <EdSectionBand
      id="where"
      num="03"
      color="var(--at-blue)"
      eyebrow="Where it applies"
      title="Per consent type"
      tone="cream"
    >
      <EdRefTable>
        <table>
          <thead><tr><th>Consent type</th><th>OnBehalfOf supported?</th><th>Notes</th></tr></thead>
          <tbody>
            <tr><td>Bank Data Sharing</td><td>Yes</td><td>Declare the legal entity the TPP is acting for within the rich authorisation request.</td></tr>
            <tr><td>Insurance Data Sharing</td><td>Yes</td><td>References a common <code>AEOnBehalfOf</code> object &mdash; same intent and fields.</td></tr>
            <tr><td>Bank Service Initiation (payments)</td><td><strong>No</strong></td><td>Not used. Merchant identity is carried via the creditor fields in the payment consent.</td></tr>
          </tbody>
        </table>
      </EdRefTable>
    </EdSectionBand>

    <EdSectionBand
      id="payments"
      num="04"
      color="var(--at-blue-deep)"
      eyebrow="Payments"
      title="Use creditor fields instead"
      tone="surface"
    >
      <EdProse>For payment consents, the user must be shown who the payment is going to. This information is provided via the creditor fields in the payment consent &mdash; not via <code>OnBehalfOf</code>.</EdProse>
      <EdProse>Populate the creditor fields so the LFI can display the recipient (merchant/payee) to the user:</EdProse>
      <EdBullets>
        <li>Prefer <strong><code>Creditor.Name</code></strong> when it is provided.</li>
        <li>If <code>Creditor.Name</code> is not present, fall back to <strong><code>CreditorAccount.Name.en</code></strong> or <strong><code>CreditorAccount.Name.ar</code></strong> as applicable.</li>
      </EdBullets>
      <EdProse>This ensures the user sees a meaningful recipient name when authorising the payment.</EdProse>

      <EdNote type="warning">
        <p>Do not attempt to carry merchant identity in an <code>OnBehalfOf</code> object for payment consents &mdash; it is not part of the service initiation schema and will be ignored or rejected.</p>
      </EdNote>

      <h3>Merchant Name on the authorisation page</h3>
      <EdProse>If the TPP populates <code>Risk.CreditorIndicators.MerchantDetails.MerchantName</code> in the PII payload, the LFI <strong>must</strong> reflect this on the authorisation page by displaying the merchant name in the permission header:</EdProse>

      <EdNote type="info" title="With MerchantName">
        <p><strong>[TPP trading name] needs your permission on-behalf of [MerchantName] to make the payment below:</strong></p>
      </EdNote>

      <EdProse>When <code>MerchantName</code> is not present, the standard wording is shown:</EdProse>

      <EdNote type="info" title="Without MerchantName">
        <p><strong>[TPP trading name] needs your permission to make the payment below:</strong></p>
      </EdNote>

      <EdProse>This allows TPPs acting as a payment facilitator or aggregator on behalf of a sub-merchant to surface that merchant's identity clearly to the user at the point of authorisation.</EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="examples"
      num="05"
      color="var(--at-navy)"
      eyebrow="Examples"
      title="Concrete payloads"
      tone="cream"
    >
      <h3>Bank Data Sharing PAR (with OnBehalfOf)</h3>
      <EdProse>Use this structure when the TPP is staging the PAR on behalf of another regulated entity:</EdProse>
      <EdCode :code="dataSharingExample" lang="json" filename="Bank Data Sharing PAR" />

      <h3>Bank Service Initiation PAR (payment) — creditor fields for merchant identity</h3>
      <EdProse>Use the creditor fields to identify the payment recipient &mdash; not <code>OnBehalfOf</code>:</EdProse>
      <EdCode :code="paymentExample" lang="json" filename="Bank Service Initiation PAR" />

      <EdNote type="info">
        <p>In production, <code>PersonalIdentifiableInformation</code> is a JWE encrypted with the LFI's encryption key. The structure above shows the decrypted payload for illustration.</p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="checklist"
      num="06"
      color="var(--at-teal-deep)"
      eyebrow="Implementation checklist"
      title="Practical rules of thumb"
      tone="surface"
      narrow
    >
      <EdBullets>
        <li>If acting on behalf of another regulated entity, include <code>OnBehalfOf</code> in <strong>Bank Data Sharing</strong> or <strong>Insurance Data Sharing</strong> PARs.</li>
        <li>For payment consents, populate <strong><code>Creditor.Name</code></strong> &mdash; or <strong><code>CreditorAccount.Name.en</code></strong> / <strong><code>CreditorAccount.Name.ar</code></strong> if <code>Creditor.Name</code> is not available &mdash; so the LFI can display the recipient to the user.</li>
        <li>If the TPP is acting as a payment facilitator for a sub-merchant, populate <strong><code>Risk.CreditorIndicators.MerchantDetails.MerchantName</code></strong> in the PII payload so the LFI can display the merchant name on the authorisation page.</li>
        <li>Do <strong>not</strong> use <code>OnBehalfOf</code> in service initiation (payment) PARs.</li>
      </EdBullets>
    </EdSectionBand>

    <EdRelatedCards eyebrow="Related articles" title="Read alongside">
      <EdRelatedCard
        href="/knowledge-base/articles/consent-identifiers"
        category="Consents"
        category-color="var(--at-teal)"
        title="Consent Identifiers"
        desc="Why PSU and account IDs patched onto a consent must be opaque."
      />
      <EdRelatedCard
        href="/knowledge-base/articles/pii-encryption"
        category="Security"
        category-color="var(--at-blue)"
        title="Payment PII Encryption"
        desc="Why PII in payment consents is encrypted end-to-end."
      />
    </EdRelatedCards>
  </div>
</template>

<style scoped>
.ed-page { background: var(--at-bg-cream); color: var(--at-navy-deep); font-family: var(--at-sans); padding-top: 4.25rem; }
.ed-tags { display: flex; flex-wrap: wrap; gap: 0.45rem; margin-top: 1.5rem; }
.ed-tag { padding: 0.35rem 0.7rem; background: color-mix(in srgb, var(--at-teal) 12%, transparent); color: var(--at-teal-deep); font-family: var(--at-mono); font-size: 0.62rem; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 700; }
</style>
