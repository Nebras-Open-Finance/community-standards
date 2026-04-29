<route lang="yaml">
meta:
  title: "Identity Assurance Claims — OIDC IDA as the response format for customer data"
  description: "Why GET /customer, GET /accounts/{AccountId}/customer, and the CoP query response all share a verifiedClaims envelope derived from OpenID Connect for Identity Assurance 1.0."
  category: Integration
  readTime: "9 min"
  updated: "2026-04-21"
  tags:
    - OIDC IDA
    - Customer Data
    - Ozone Connect
</route>

<script setup lang="ts">
interface Section { id: string; label: string }
interface MetaItem { label: string; value: string }

const sections: Section[] = [
  { id: 'why',       label: 'Why OIDC IDA' },
  { id: 'envelope',  label: 'Envelope' },
  { id: 'endpoints', label: 'Per endpoint' },
  { id: 'shared',    label: 'Shared shape' },
  { id: 'summary',   label: 'Summary' },
]

const meta: MetaItem[] = [
  { label: 'Category', value: 'Integration' },
  { label: 'Read',     value: '9 min' },
  { label: 'Updated',  value: '21 Apr 2026' },
]

const tags: readonly string[] = ['OIDC IDA', 'Customer Data', 'Ozone Connect']

const envelope = `{
  "verifiedClaims": [
    {
      "verification": {
        "trustFramework": "UAE.FI"
      },
      "claims": {
        "identityType": "Person",
        "fullName": "Ahmed Al Mansouri",
        "...": "..."
      }
    }
  ]
}`

const customerExample = `{
  "data": {
    "id": "cust-001",
    "customerCategory": "Retail",
    "verifiedClaims": [
      {
        "verification": { "trustFramework": "UAE.FI" },
        "claims": {
          "identityType": "Person",
          "fullName": "Ahmed Al Mansouri",
          "givenName": "Ahmed",
          "familyName": "Al Mansouri",
          "emiratesId": "784-1985-1234567-1",
          "emiratesIdExpiryDate": "2029-06-15",
          "residentialAddress": {
            "streetAddress": "Building 12, Marina Walk",
            "locality": "Dubai",
            "country": "AE"
          }
        }
      }
    ]
  },
  "meta": {}
}`

const accountCustomerExample = `{
  "data": [
    {
      "id": "cust-001",
      "customerType": "Joint",
      "customerCategory": "Retail",
      "accountRole": "Principal",
      "verifiedClaims": [
        {
          "verification": { "trustFramework": "UAE.FI" },
          "claims": {
            "identityType": "Person",
            "fullName": "Ahmed Al Mansouri",
            "emiratesId": "784-1985-1234567-1",
            "...": "..."
          }
        }
      ]
    },
    {
      "id": "cust-004",
      "customerType": "Joint",
      "customerCategory": "Retail",
      "accountRole": "SecondaryOwner",
      "verifiedClaims": [
        {
          "verification": { "trustFramework": "UAE.FI" },
          "claims": {
            "identityType": "Person",
            "fullName": "Mariam Al Mansouri",
            "emiratesId": "784-1987-7654321-2",
            "...": "..."
          }
        }
      ]
    }
  ],
  "meta": { "totalPages": 1, "totalRecords": 2 }
}`

const copPersonExample = `{
  "data": [
    {
      "id": "cust-001",
      "verifiedClaims": [
        {
          "verification": { "trustFramework": "UAE.FI" },
          "claims": {
            "fullName": "Ahmed Al Mansouri",
            "givenName": "Ahmed",
            "familyName": "Al Mansouri"
          }
        }
      ]
    }
  ],
  "meta": { "totalPages": 1, "totalRecords": 1 }
}`

const copOrgExample = `{
  "data": [
    {
      "id": "cust-002",
      "verifiedClaims": [
        {
          "verification": { "trustFramework": "UAE.FI" },
          "organisationClaims": {
            "name": "Al Mansouri Trading LLC"
          }
        }
      ]
    }
  ],
  "meta": { "totalPages": 1, "totalRecords": 1 }
}`
</script>

<template>
  <div class="ed-page">
    <EdBackStrip href="/knowledge-base/" text="All knowledge base articles" />

    <EdHero
      eyebrow="Learn · Understand · Build"
      title="Identity Assurance Claims — OIDC IDA as the response format for customer data"
      :meta="meta"
      lede="Three Ozone Connect endpoints return customer identity data &mdash; <code>GET /customer</code>, <code>GET /accounts/{accountId}/customer</code>, and <code>POST /customers/action/cop-query</code>. All three share the <strong>same response envelope</strong>, derived from <a href='https://openid.net/specs/openid-connect-4-identity-assurance-1_0.html'>OpenID Connect for Identity Assurance 1.0</a>."
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
      eyebrow="Why OIDC IDA"
      title="Customer identity as verified claims"
      tone="cream"
    >
      <EdProse>UAE Open Finance treats customer identity as <strong>verified claims</strong> &mdash; assertions about a person or organisation that the LFI has checked under a known framework. OIDC IDA is the standards-track JSON format for exactly this: claims grouped inside a <code>verifiedClaims</code> object, each group labelled with the <code>verification.trustFramework</code> under which it was verified.</EdProse>

      <EdProse>Reusing IDA across every customer-returning endpoint gives TPPs a single parser and a single mental model &mdash; whether the data comes from a consented account, a Confirmation of Payee lookup, or a direct call for the authenticated PSU's identity, the shape is the same.</EdProse>

      <EdNote type="info" title="From the schema">
        <p><em>Party Identity Assurance (Response) Schema &mdash; Based on the <a href="https://openid.net/specs/openid-connect-4-identity-assurance-1_0.html">OpenID Connect for Identity Assurance 1.0 Specification</a></em></p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="envelope"
      num="02"
      color="var(--at-gold)"
      eyebrow="Shared envelope"
      title="The three-level structure used everywhere"
      tone="surface"
    >
      <EdCode :code="envelope" lang="json" filename="verifiedClaims envelope" />

      <EdRefTable>
        <table>
          <thead><tr><th>Level</th><th>Purpose</th></tr></thead>
          <tbody>
            <tr><td><code>verifiedClaims[]</code></td><td>Array &mdash; allows multiple claim groups for the same subject, each verified under a different framework or evidence path. Most LFIs return a single element</td></tr>
            <tr><td><code>verification</code></td><td>Describes how the claims were verified. <code>trustFramework</code> is the primary discriminator</td></tr>
            <tr><td><code>claims</code></td><td>The actual identity attributes &mdash; name, Emirates ID, address, business name, trade licence, etc.</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3><code>verification.trustFramework</code></h3>
      <EdProse>For UAE Open Finance, the canonical value is <code>UAE.FI</code> &mdash; the Trust Framework under which UAE Licensed Financial Institutions verify customer identity to onboarding standards set by the CBUAE.</EdProse>

      <h3><code>claims</code> &mdash; person vs. organisation</h3>
      <EdProse>The shape of <code>claims</code> depends on whether the subject is a natural person or an organisation. <code>identityType</code> discriminates:</EdProse>

      <EdRefTable>
        <table>
          <thead><tr><th><code>identityType</code></th><th>Used for</th><th>Key claims</th></tr></thead>
          <tbody>
            <tr><td><code>Person</code></td><td>Retail customers</td><td><code>fullName</code>, <code>givenName</code>, <code>familyName</code>, <code>emiratesId</code>, <code>emiratesIdExpiryDate</code>, <code>birthDate</code>, <code>nationality</code>, <code>mobileNumber</code>, <code>email</code>, <code>residentialAddress</code></td></tr>
            <tr><td><code>Organisation</code></td><td>SME / Corporate customers</td><td><code>businessName</code>, <code>tradeLicenceNumber</code>, <code>taxIdentificationNumber</code>, <code>dateOfIncorporation</code>, <code>countryOfIncorporation</code>, <code>corporateAddress</code></td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>LFIs <strong>MUST</strong> populate every claim that exists or is derivable for the subject. The OpenAPI spec marks the minimum required set; holding back optional fields degrades the TPP experience without serving any protection purpose &mdash; the claims have already been released under the authorized consent.</EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="endpoints"
      num="03"
      color="var(--at-blue)"
      eyebrow="Per endpoint"
      title="How each endpoint uses the envelope"
      tone="cream"
    >
      <h3><code>GET /customer</code></h3>
      <EdProse>The record for the PSU who authenticated the consent. The LFI identifies the PSU from the <code>o3-psu-identifier</code> header and returns <strong>one</strong> customer record:</EdProse>
      <EdCode :code="customerExample" lang="json" />
      <EdProse>Single object under <code>data</code>, not an array.</EdProse>

      <h3><code>GET /accounts/{accountId}/customer</code></h3>
      <EdProse>Returns <strong>one record per customer</strong> associated with the account. Joint accounts produce one record per joint holder. Each record carries <code>customerType</code> (<code>Sole</code>, <code>Joint</code>, <code>Delegate</code>) and <code>accountRole</code> (<code>Principal</code>, <code>SecondaryOwner</code>, <code>PowerOfAttorney</code>, etc.) in addition to the shared envelope:</EdProse>
      <EdCode :code="accountCustomerExample" lang="json" />

      <h3><code>POST /customers/action/cop-query</code></h3>
      <EdProse>Returns <strong>one record per customer</strong> on the account being looked up. The schema uses a slightly leaner shape &mdash; only the <code>verifiedClaims</code> envelope with the name-related claims the Hub needs to run the CoP match:</EdProse>
      <EdCode :code="copPersonExample" lang="json" />

      <EdProse>For business accounts, CoP uses <code>verifiedClaims[].organisationClaims.name</code> in place of <code>claims</code>:</EdProse>
      <EdCode :code="copOrgExample" lang="json" />

      <EdProse>The Hub compares these values against the name submitted by the TPP and returns a match verdict to the caller.</EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="shared"
      num="04"
      color="var(--at-blue-deep)"
      eyebrow="Shared shape"
      title="Why the same envelope for CoP as for data sharing"
      tone="surface"
      narrow
    >
      <EdProse>CoP and <code>GET /customer</code> have very different use cases &mdash; a name-match check before a payment vs. the full identity of a consented PSU &mdash; but the shape of the answer is the same because the <strong>question</strong> is the same at its core: "under which trust framework has this institution verified this party's identity, and what are the claims?"</EdProse>
      <EdProse>Having one envelope means LFIs implement one internal mapping from their core banking identity records to OIDC IDA, and that mapping serves every customer-returning endpoint. TPPs parse one format. Auditors review one schema.</EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="summary"
      num="05"
      color="var(--at-navy)"
      eyebrow="Summary"
      title="At a glance"
      tone="cream"
    >
      <EdRefTable>
        <table>
          <thead><tr><th>Aspect</th><th>Rule</th></tr></thead>
          <tbody>
            <tr><td>Response envelope</td><td><code>verifiedClaims[]</code> &rarr; <code>verification</code> + <code>claims</code> (or <code>organisationClaims</code> for CoP businesses)</td></tr>
            <tr><td>Trust framework</td><td><code>UAE.FI</code> for UAE Open Finance</td></tr>
            <tr><td>Person vs. organisation</td><td>Discriminated by <code>identityType</code> (<code>Person</code> / <code>Organisation</code>)</td></tr>
            <tr><td>Field population</td><td>Every claim the LFI holds or can derive <strong>MUST</strong> be populated</td></tr>
            <tr><td>Source specification</td><td><a href="https://openid.net/specs/openid-connect-4-identity-assurance-1_0.html">OpenID Connect for Identity Assurance 1.0</a></td></tr>
          </tbody>
        </table>
      </EdRefTable>
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
        href="/knowledge-base/articles/tpp-context-block"
        category="Integration"
        category-color="var(--at-blue-deep)"
        title="The tpp and decodedSsa Context Blocks"
        desc="What the TPP context object on every Ozone Connect call contains."
      />
    </EdRelatedCards>
  </div>
</template>

<style scoped>
.ed-page { background: var(--at-bg-cream); color: var(--at-navy-deep); font-family: var(--at-sans); padding-top: 4.25rem; }
.ed-tags { display: flex; flex-wrap: wrap; gap: 0.45rem; margin-top: 1.5rem; }
.ed-tag { padding: 0.35rem 0.7rem; background: color-mix(in srgb, var(--at-blue-deep) 12%, transparent); color: var(--at-blue-deep); font-family: var(--at-mono); font-size: 0.62rem; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 700; }
</style>
