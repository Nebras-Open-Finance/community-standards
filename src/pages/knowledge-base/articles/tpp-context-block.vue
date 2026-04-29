<route lang="yaml">
meta:
  title: "The tpp and decodedSsa Context Blocks on Ozone Connect Calls"
  description: "Every call the API Hub makes to your Ozone Connect endpoints carries a tpp object identifying the calling TPP, plus its decoded Software Statement Assertion. This article explains what each field is, why it's there, and the operational reasons an LFI might want to use it — even though none are required for payment execution."
  category: Integration
  readTime: "7 min"
  updated: "2026-04-21"
  tags:
    - TPP
    - SSA
    - Context
</route>

<script setup lang="ts">
interface Section { id: string; label: string }
interface MetaItem { label: string; value: string }

const sections: Section[] = [
  { id: 'ignore', label: 'Safe to ignore' },
  { id: 'useful', label: 'When useful' },
  { id: 'tpp',    label: 'tpp object' },
  { id: 'ssa',    label: 'decodedSsa' },
  { id: 'avoid',  label: "What not to do" },
  { id: 'where',  label: 'Where it appears' },
]

const meta: MetaItem[] = [
  { label: 'Category', value: 'Integration' },
  { label: 'Read',     value: '7 min' },
  { label: 'Updated',  value: '21 Apr 2026' },
]

const tags: readonly string[] = ['TPP', 'SSA', 'Context']
</script>

<template>
  <div class="ed-page">
    <EdBackStrip href="/knowledge-base/" text="All knowledge base articles" />

    <EdHero
      eyebrow="Learn · Understand · Build"
      title="The tpp and decodedSsa Context Blocks on Ozone Connect Calls"
      :meta="meta"
      lede="Every request the API Hub forwards to your Ozone Connect endpoints carries a <code>tpp</code> object identifying the calling TPP, plus its decoded Software Statement Assertion (<code>decodedSsa</code>). None are required for payment execution &mdash; the Hub has already authenticated the TPP and validated entitlement &mdash; but the fields are passed through as <strong>context</strong> for audit logs, fraud signals, customer-facing display, compliance reports, and support investigations."
    >
      <template #lede>
        <div class="ed-tags">
          <span v-for="t in tags" :key="t" class="ed-tag">{{ t }}</span>
        </div>
      </template>
    </EdHero>

    <EdInPageNav :sections="sections" />

    <EdSectionBand
      id="ignore"
      num="01"
      color="var(--at-teal)"
      eyebrow="Safe to ignore"
      title="When you don't need to do anything"
      lede="The default position is: <strong>safely ignore everything in <code>tpp</code> and <code>decodedSsa</code></strong>. The Hub has already done the work that protects the LFI."
      tone="cream"
    >
      <EdBullets>
        <li>Verified the TPP's mTLS transport certificate against the Trust Framework directory</li>
        <li>Verified the TPP's signing certificate against the SSA's <code>jwks_uri</code></li>
        <li>Confirmed the TPP's role (<code>BSIP</code>, <code>BDSP</code>, etc.) entitles it to call this endpoint</li>
        <li>Confirmed the consent referenced by the request belongs to this TPP</li>
      </EdBullets>
      <EdProse>If your LFI's payment processing logic does not look at <code>tpp</code> or <code>decodedSsa</code>, no rule is being broken. They are passed through so the LFI <strong>can</strong> consume them when it has a reason to &mdash; they are not a validation surface.</EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="useful"
      num="02"
      color="var(--at-gold)"
      eyebrow="When useful"
      title="Use cases per field"
      tone="surface"
    >
      <EdRefTable>
        <table>
          <thead><tr><th>Use case</th><th>What you'd read</th></tr></thead>
          <tbody>
            <tr><td><strong>Audit log enrichment</strong> &mdash; labelling each Ozone Connect call with the human-readable identity of the TPP that triggered it</td><td><code>tpp.tppName</code>, <code>tpp.tppId</code>, <code>decodedSsa.client_name</code></td></tr>
            <tr><td><strong>Customer-facing display</strong> &mdash; surfacing the TPP brand in app history (e.g. "Payment initiated by Mario Money")</td><td><code>decodedSsa.client_name</code>, <code>decodedSsa.logo_uri</code>, <code>decodedSsa.client_uri</code></td></tr>
            <tr><td><strong>Fraud and risk signals</strong> &mdash; feeding TPP identity, organisation, and roles into your scoring model</td><td><code>tpp.clientId</code>, <code>tpp.orgId</code>, <code>decodedSsa.roles</code>, <code>decodedSsa.organisation_id</code></td></tr>
            <tr><td><strong>Compliance / regulatory reporting</strong> &mdash; producing per-TPP volume and value reports for the CBUAE</td><td><code>tpp.tppId</code>, <code>tpp.tppName</code>, <code>tpp.softwareStatementId</code></td></tr>
            <tr><td><strong>Support investigations</strong> &mdash; correlating an incident to a specific TPP application without round-tripping through Nebras</td><td><code>tpp.softwareStatementId</code>, <code>decodedSsa.client_id</code></td></tr>
            <tr><td><strong>Privacy / right-to-be-forgotten</strong> &mdash; pinning the directory record at the moment of the call so the LFI can prove what was advertised about the TPP at that point in time</td><td><code>tpp.directoryRecord</code></td></tr>
          </tbody>
        </table>
      </EdRefTable>
    </EdSectionBand>

    <EdSectionBand
      id="tpp"
      num="03"
      color="var(--at-blue)"
      eyebrow="The tpp object"
      title="Field reference"
      tone="cream"
    >
      <EdRefTable>
        <table>
          <thead><tr><th>Field</th><th>Type</th><th>Required</th><th>Description</th><th>Example</th></tr></thead>
          <tbody>
            <tr><td><code>clientId</code></td><td>string</td><td>Yes</td><td>The OIDC client identifier issued to the TPP by the Trust Framework. Stable for the life of the TPP application.</td><td><code>1675793e-d6e3-4954-96c8-acb9aaa83c53</code></td></tr>
            <tr><td><code>orgId</code></td><td>string</td><td>Yes</td><td>The organisation identifier issued to the TPP's parent organisation by the Trust Framework. One organisation may own many <code>clientId</code>s.</td><td><code>a1b2c3d4-e5f6-7890-abcd-ef0123456789</code></td></tr>
            <tr><td><code>tppId</code></td><td>string</td><td>Yes</td><td>The identifier the API Hub uses internally to uniquely identify the TPP. Useful when raising support cases with Nebras.</td><td><code>fdd6e0ac-ba7a-4bc4-a986-c45c5daaaf00</code></td></tr>
            <tr><td><code>tppName</code></td><td>string</td><td>Yes</td><td>The TPP's registered name as recorded in the Trust Framework.</td><td><code>Example TPP</code></td></tr>
            <tr><td><code>softwareStatementId</code></td><td>string</td><td>Yes</td><td>The identifier of the specific software statement (i.e. the registered application) being used. A single <code>clientId</code> may have multiple software statements over time.</td><td><code>XvAjPeeYZAdWwrFF..</code></td></tr>
            <tr><td><code>directoryRecord</code></td><td>string</td><td>No</td><td>The full TPP directory record retrieved from the CBUAE Trust Framework directory at the time of the call, encoded as a Base64 string. Only present when the Hub fetched it for this request.</td><td><code>eyJhbW91bnQiOiIxMDAuMDAi..</code></td></tr>
            <tr><td><code>decodedSsa</code></td><td>object</td><td>Yes</td><td>The decoded Software Statement Assertion &mdash; see the next section.</td><td>&mdash;</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3><code>clientId</code> vs <code>tppId</code> vs <code>softwareStatementId</code></h3>
      <EdProse>These three identifiers commonly cause confusion. The mental model:</EdProse>
      <EdBullets>
        <li><strong><code>clientId</code></strong> &mdash; issued by the Trust Framework when the TPP registers an OIDC client. This is the value the TPP uses as <code>iss</code> and <code>sub</code> on its client assertions, and what the API Hub records against tokens.</li>
        <li><strong><code>softwareStatementId</code></strong> &mdash; issued by the Trust Framework when the TPP registers a <em>specific application</em> (the SSA). One <code>clientId</code> typically has one active SSA, but the SSA can be re-issued (for example after rotating keys) without a new <code>clientId</code>.</li>
        <li><strong><code>tppId</code></strong> &mdash; the Hub's internal identifier. Use this when raising tickets with Nebras; use <code>clientId</code> or <code>softwareStatementId</code> when correlating with anything published in the Trust Framework.</li>
      </EdBullets>
      <EdProse>For audit logging, log all three. They cost nothing to store and answer different questions later.</EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="ssa"
      num="04"
      color="var(--at-blue-deep)"
      eyebrow="The decodedSsa object"
      title="Field reference"
      lede="The Software Statement Assertion is a JWT signed by the Trust Framework that asserts a TPP's identity, the public key set used to verify its requests, and the OAuth metadata for its registered application. The Hub verifies the SSA's signature on every request and forwards the decoded claims under <code>decodedSsa</code>."
      tone="surface"
    >
      <EdRefTable>
        <table>
          <thead><tr><th>Field</th><th>Type</th><th>Required</th><th>Description</th><th>Example</th></tr></thead>
          <tbody>
            <tr><td><code>client_id</code></td><td>string</td><td>Yes</td><td>Globally unique TPP client identifier issued by the Trust Framework. Matches <code>tpp.clientId</code>.</td><td><code>1675793e-d6e3-4954-96c8-acb9aaa83c53</code></td></tr>
            <tr><td><code>client_name</code></td><td>string</td><td>No</td><td>Human-readable name of the client as the TPP wants it displayed to end users during authorization flows. Suitable for surfacing in customer-facing app history.</td><td><code>Example TPP</code></td></tr>
            <tr><td><code>client_uri</code></td><td>string</td><td>No</td><td>Home page URI of the TPP's client application. Suitable for linking from a "Connected apps" screen.</td><td><code>https://example.com</code></td></tr>
            <tr><td><code>logo_uri</code></td><td>string</td><td>No</td><td>URL of the TPP's logo. Suitable for inline display next to historical activity.</td><td><code>https://example.com/logo.png</code></td></tr>
            <tr><td><code>jwks_uri</code></td><td>string</td><td>No</td><td>URL where the TPP's JSON Web Key Set is hosted. The Hub uses this to verify the TPP's signed requests; the LFI does <strong>not</strong> need to fetch it.</td><td><code>https://example.com/jwks.json</code></td></tr>
            <tr><td><code>redirect_uris</code></td><td>array of string</td><td>No</td><td>The OAuth redirect endpoints registered for this client. Useful for a sanity check during incident response &mdash; never call them directly from the LFI.</td><td><code>["https://example.com/callback"]</code></td></tr>
            <tr><td><code>roles</code></td><td>array of string</td><td>No</td><td>The Open Finance roles the TPP is entitled to. The presence of <code>BSIP</code> (payment initiation), <code>BDSP</code> (data sharing), etc. tells you what categories of API the TPP can call.</td><td><code>["BSIP", "BDSP"]</code></td></tr>
            <tr><td><code>sector_identifier_uri</code></td><td>string</td><td>No</td><td>OIDC sector identifier URI used for pairwise subject identifiers. Rarely consumed by an LFI.</td><td><code>https://example.com/sector</code></td></tr>
            <tr><td><code>application_type</code></td><td>string</td><td>No</td><td>OAuth application type &mdash; <code>web</code> or <code>native</code>. Can feed into device-aware fraud rules.</td><td><code>web</code></td></tr>
            <tr><td><code>organisation_id</code></td><td>string</td><td>No</td><td>Identifier of the organisation that owns the client. Matches <code>tpp.orgId</code>.</td><td><code>org-1234</code></td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdNote type="tip" title="Display fields are TPP-controlled">
        <p><code>client_name</code>, <code>client_uri</code>, and <code>logo_uri</code> are values the TPP set when it registered the SSA. They are signed by the Trust Framework, so they have not been tampered with in transit, but the LFI is trusting that the Trust Framework's onboarding controls are sufficient for these to be safe to display to customers. Treat them as trusted display strings, not as authoritative identifiers &mdash; use <code>client_id</code> / <code>tpp.tppId</code> for anything that needs to be a primary key.</p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="avoid"
      num="05"
      color="var(--at-navy)"
      eyebrow="What not to do"
      title="What an LFI should not do with these fields"
      tone="cream"
    >
      <EdBullets>
        <li><strong>Do not re-authenticate the TPP.</strong> The Hub has already verified the SSA's signature, the TPP's mTLS certificate, and the consent ownership. There is no scenario where re-fetching <code>jwks_uri</code> from the LFI side adds security.</li>
        <li><strong>Do not enforce role checks the Hub already enforces.</strong> If <code>decodedSsa.roles</code> does not include the role required for the endpoint, the request would not have reached your Ozone Connect surface in the first place.</li>
        <li><strong>Do not call any URI in the SSA from the LFI.</strong> <code>client_uri</code>, <code>redirect_uris</code>, <code>sector_identifier_uri</code>, and <code>jwks_uri</code> are TPP-controlled URLs. The only system that should fetch them is the API Hub.</li>
        <li><strong>Do not reject requests for missing optional fields.</strong> Optional means optional; the TPP may legitimately not have set them at registration time.</li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="where"
      num="06"
      color="var(--at-teal-deep)"
      eyebrow="Where it appears"
      title="Identical across every Ozone Connect endpoint"
      tone="surface"
      narrow
    >
      <EdProse>The same <code>tpp</code> and <code>decodedSsa</code> blocks are present on every Ozone Connect endpoint the API Hub calls &mdash; including all payment-initiation endpoints (Single Instant Payment and every Multi-Payment variant), data-sharing endpoints, and consent-action callbacks. The schema is identical across all of them. If your LFI builds a single helper to extract and log this block, the same helper will work everywhere.</EdProse>
    </EdSectionBand>

    <EdRelatedCards eyebrow="Related articles" title="Read alongside">
      <EdRelatedCard
        href="/knowledge-base/articles/multi-segment-api-hubs"
        category="Integration"
        category-color="var(--at-blue-deep)"
        title="Multi-Segment API Hubs"
        desc="How segments share an Ozone Connect via o3-provider-id."
      />
      <EdRelatedCard
        href="/knowledge-base/articles/identity-assurance-claims"
        category="Integration"
        category-color="var(--at-blue-deep)"
        title="Identity Assurance Claims"
        desc="The OIDC IDA envelope used for customer-returning endpoints."
      />
    </EdRelatedCards>
  </div>
</template>

<style scoped>
.ed-page { background: var(--at-bg-cream); color: var(--at-navy-deep); font-family: var(--at-sans); padding-top: 4.25rem; }
.ed-tags { display: flex; flex-wrap: wrap; gap: 0.45rem; margin-top: 1.5rem; }
.ed-tag { padding: 0.35rem 0.7rem; background: color-mix(in srgb, var(--at-blue-deep) 12%, transparent); color: var(--at-blue-deep); font-family: var(--at-mono); font-size: 0.62rem; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 700; }
</style>
