<route lang="yaml">
meta:
  title: "Multi-Segment LFIs — How to Structure API Hubs Across Customer Segments"
  description: "When an LFI serves multiple customer segments (e.g. retail and SME) with different authentication endpoints, they need one API Hub per segment but can share a single Ozone Connect — minimising LFI-maintained certificates."
  category: Integration
  readTime: "8 min"
  updated: "2026-04-21"
  tags:
    - API Hub
    - LFI
    - Topology
</route>

<script setup lang="ts">
interface Section { id: string; label: string }
interface MetaItem { label: string; value: string }

const sections: Section[] = [
  { id: 'why',     label: 'Why multiple Hubs' },
  { id: 'model',   label: 'Recommended model' },
  { id: 'certs',   label: 'Certificates' },
  { id: 'routing', label: 'Routing' },
  { id: 'summary', label: 'Summary' },
]

const meta: MetaItem[] = [
  { label: 'Category', value: 'Integration' },
  { label: 'Read',     value: '8 min' },
  { label: 'Updated',  value: '21 Apr 2026' },
]

const tags: readonly string[] = ['API Hub', 'LFI', 'Topology']
</script>

<template>
  <div class="ed-page">
    <EdBackStrip href="/knowledge-base/" text="All knowledge base articles" />

    <EdHero
      eyebrow="Learn · Understand · Build"
      title="Multi-Segment LFIs — How to Structure API Hubs Across Customer Segments"
      :meta="meta"
      lede="Many LFIs serve more than one customer segment &mdash; for example retail, SME, private banking, or corporate. When those segments authenticate their customers in different places, the LFI needs <strong>one API Hub per authentication context</strong>, but can share a single Ozone Connect &mdash; minimising LFI-maintained certificates."
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
      eyebrow="Why multiple Hubs"
      title="Authentication context dictates topology"
      tone="cream"
    >
      <EdProse>The API Hub is more than a proxy &mdash; it acts as the <strong>OIDC Authorization Server</strong> for the LFI within the Open Finance ecosystem. When a TPP drives an end user through an authorization flow, the API Hub is the entity that:</EdProse>
      <EdBullets>
        <li>Exposes the single OIDC <code>/authorize</code> endpoint the TPP redirects the end user to</li>
        <li>Issues the access tokens the TPP uses to call APIs</li>
        <li>Holds the authoritative record of consents</li>
      </EdBullets>

      <EdProse>Because the API Hub must behave as a conformant OIDC Authorization Server, it has <strong>one authorization endpoint</strong> that redirects the end user into the LFI's own authentication experience (see the <a href="/tech/lfi-api-hub/v2.1/consent-journey/api-guide">Consent Journey API Guide</a> and the <a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/auth-endpoint">Authorization Endpoint configuration</a>).</EdProse>

      <EdProse>If retail and SME customers authenticate in different places &mdash; for example, retail customers in the retail mobile app and SME customers in a separate business banking portal &mdash; a single authorization endpoint cannot send an end user to both. Since the Hub mimics a standard Authorization Server, it can only be configured to redirect to one authentication flow.</EdProse>

      <EdProse>In that situation the LFI needs <strong>one API Hub per distinct authentication context</strong>:</EdProse>
      <EdBullets>
        <li>Retail end users &rarr; Retail API Hub &rarr; Retail authentication endpoint</li>
        <li>SME end users &rarr; SME API Hub &rarr; SME authentication endpoint</li>
      </EdBullets>
      <EdProse>The same logic applies to any additional segment (private banking, corporate) that has its own authentication experience.</EdProse>

      <EdNote type="tip" title="When one Hub is enough">
        <p>If all segments authenticate through the same endpoint &mdash; for example, a single unified banking app that handles both retail and SME sign-in &mdash; a single API Hub is sufficient. The need for multiple Hubs is driven by distinct authentication flows, not by the existence of multiple products.</p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="model"
      num="02"
      color="var(--at-gold)"
      eyebrow="Recommended model"
      title="One Trust Framework org, one client, one Ozone Connect"
      tone="surface"
    >
      <EdBullets>
        <li><strong>One Trust Framework organisation</strong> &mdash; the LFI is a single legal entity in the UAE Open Finance ecosystem and is registered as one organisation regardless of how many segments it serves.</li>
        <li><strong>One API Hub deployment per authentication context</strong> &mdash; e.g. one for retail, one for SME. Each Hub has its own authorization endpoint, its own environment-specific onboarding, and its own base URLs.</li>
        <li><strong>One shared <code>C3-hh-cm-client</code> application</strong> &mdash; both Hubs use the same client registration. This means the LFI's client-side identity and signing material is created once and reused.</li>
        <li><strong>One shared Ozone Connect deployment</strong> &mdash; the LFI exposes a single set of Ozone Connect APIs, and routes incoming Hub requests to the correct downstream core using the <code>o3-provider-id</code> header.</li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="certs"
      num="03"
      color="var(--at-blue)"
      eyebrow="Certificate footprint"
      title="The LFI's burden does not grow with extra Hubs"
      tone="cream"
    >
      <h3>LFI-held certificates &mdash; maintained once, shared across Hubs</h3>
      <EdProse>LFI-held certificates live on the LFI's Trust Framework organisation and are held by the LFI. Because both Hubs sit under the same organisation and share the same <code>C3-hh-cm-client</code> application, the LFI maintains <strong>one set</strong> of these certificates:</EdProse>

      <EdRefTable>
        <table>
          <thead><tr><th>Certificate</th><th>Purpose</th><th>Reused across Hubs</th></tr></thead>
          <tbody>
            <tr><td><strong>C3</strong></td><td>LFI client cert used when calling Consent Manager &amp; Headless Heimdall</td><td>✅</td></tr>
            <tr><td><strong>S4</strong></td><td>LFI server cert identifying Ozone Connect to the API Hub</td><td>✅</td></tr>
            <tr><td><strong>Sig4</strong></td><td>LFI JWT Auth signing key (only if <a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/application-layer-auth#jwt-auth">JWT Auth</a> is selected)</td><td>✅</td></tr>
            <tr><td><strong>Enc1</strong></td><td>LFI encryption key used to decrypt PII</td><td>✅</td></tr>
          </tbody>
        </table>
      </EdRefTable>
      <EdProse>See <a href="/tech/lfi-api-hub/v2.1/api-hub/connectivity/">API Hub Connectivity &amp; Certificates</a> for the full certificate model and the existing "Certificate reuse across brands" note.</EdProse>

      <h3>Ozone-held certificates &mdash; additional material added per Hub</h3>
      <EdProse>Each additional API Hub requires its own server-side certificates &mdash; most visibly <strong>S1</strong>, the server transport certificate that identifies the Hub instance to TPPs. These are added to the LFI's Trust Framework organisation so TPPs can validate the Hub's identity, but the private keys are held and maintained by Ozone.</EdProse>
      <EdProse>From the LFI's perspective, these certificates appear under the organisation but require no operational involvement &mdash; the LFI does not generate, store, or rotate the private key material.</EdProse>

      <EdRefTable>
        <table>
          <thead><tr><th>Certificate</th><th>Purpose</th><th>Added per Hub</th><th>Private key held by</th></tr></thead>
          <tbody>
            <tr><td><strong>S1</strong></td><td>Identifies the Hub instance to TPPs</td><td>✅</td><td>Ozone</td></tr>
            <tr><td><strong>S3</strong></td><td>Identifies CM &amp; HH servers to the LFI</td><td>✅</td><td>Ozone</td></tr>
            <tr><td><strong>Sig2</strong></td><td>Signs API Hub responses / <code>id_token</code> to TPPs</td><td>✅</td><td>Ozone</td></tr>
            <tr><td><strong>C4</strong></td><td>Hub client cert when calling Ozone Connect (held in Ozone's org)</td><td>✅</td><td>Ozone</td></tr>
            <tr><td><strong>Sig3</strong></td><td>Signs Hub-side JWT Auth headers (held in Ozone's org, only when JWT Auth is used)</td><td>✅</td><td>Ozone</td></tr>
          </tbody>
        </table>
      </EdRefTable>
      <EdProse>Net effect: the LFI's own certificate maintenance burden does not grow as additional Hubs are added. The one-time set of C3, S4, Sig4, and Enc1 covers every Hub sitting under the organisation.</EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="routing"
      num="04"
      color="var(--at-blue-deep)"
      eyebrow="Single Ozone Connect routing"
      title="o3-provider-id selects the segment"
      tone="surface"
    >
      <APIFlowViewer title="Multi-Segment LFI — Request Routing via o3-provider-id">
        <APIFlowsMultiSegmentApiHubs />
      </APIFlowViewer>

      <EdProse>Because the LFI uses a single shared Ozone Connect deployment, incoming requests from the multiple Hubs arrive at the same set of endpoints. The Ozone Connect layer must identify which Hub the request came from and route internally to the appropriate downstream core (retail core vs SME core, for example).</EdProse>

      <EdProse>The API Hub tells the LFI which Hub the request originated from via the <strong><code>o3-provider-id</code></strong> request header. The value sent on every request <strong>is the LFI Code</strong> for the Hub that originated it &mdash; the same code that forms part of that Hub's TPP-facing and LFI-facing hostnames (see <a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/prerequisites#lfi-code">Prerequisites &mdash; LFI Code</a>). Because each segment Hub is onboarded with its own LFI Code, Ozone Connect can use <code>o3-provider-id</code> directly to identify the segment.</EdProse>

      <EdProse>For example, FAB operates separate retail and business Hubs in production with LFI Codes <code>fabretail</code> and <code>fabbusiness</code> respectively &mdash; Ozone Connect receives those exact values in the <code>o3-provider-id</code> header on each request.</EdProse>

      <EdRefTable>
        <table>
          <thead><tr><th>Request</th><th><code>o3-provider-id</code> value (FAB example)</th><th>LFI action</th></tr></thead>
          <tbody>
            <tr><td>Retail Hub &rarr; Ozone Connect</td><td><code>fabretail</code></td><td>Route to retail core banking system</td></tr>
            <tr><td>Business Hub &rarr; Ozone Connect</td><td><code>fabbusiness</code></td><td>Route to SME / business core banking system</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <h3>Implementation guidance</h3>
      <EdBullets>
        <li>The <code>o3-provider-id</code> value is fixed at onboarding when each Hub's LFI Code is agreed with Nebras. There is no separate configuration step.</li>
        <li>Treat <code>o3-provider-id</code> as the <strong>first branching decision</strong> inside Ozone Connect. All downstream logic (account lookup, customer lookup, payment execution, consent validation) should resolve through the segment's own core.</li>
        <li>Validate the header on every request &mdash; reject calls with a missing or unknown <code>o3-provider-id</code>.</li>
        <li>Keep segment boundaries clean: a consent created via the retail Hub <strong>MUST</strong> be served by the retail core; a consent created via the business Hub <strong>MUST</strong> be served by the business core. Do not allow cross-segment resolution.</li>
        <li><code>o3-provider-id</code> is the supported identifier. <code>o3-aspsp-id</code> is a deprecated alias retained for backward compatibility only &mdash; see the request header tables in each API guide (e.g. <a href="/tech/lfi-api-hub/v2.1/banking/data-sharing/api-guide/">Bank Data Sharing API Guide</a>).</li>
      </EdBullets>
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
          <thead><tr><th>Concern</th><th>Recommendation</th></tr></thead>
          <tbody>
            <tr><td>Trust Framework organisations</td><td>One</td></tr>
            <tr><td>API Hub deployments</td><td>One per distinct authentication context (e.g. retail, SME)</td></tr>
            <tr><td><code>C3-hh-cm-client</code> application</td><td>One, shared</td></tr>
            <tr><td>LFI-held certificates (C3, S4, Sig4, Enc1)</td><td>One set, shared across Hubs</td></tr>
            <tr><td>Ozone-held certificates (S1 etc.)</td><td>Added per Hub; maintained by Ozone</td></tr>
            <tr><td>Ozone Connect</td><td>One deployment, routing on <code>o3-provider-id</code></td></tr>
            <tr><td>Downstream cores</td><td>One per segment, selected by <code>o3-provider-id</code></td></tr>
          </tbody>
        </table>
      </EdRefTable>
      <EdProse>This pattern keeps the LFI's operational and certificate footprint independent of the number of segments served, while still meeting the Open Finance authentication and authorization model for each segment independently.</EdProse>
    </EdSectionBand>

    <EdRelatedCards eyebrow="Related articles" title="Read alongside">
      <EdRelatedCard
        href="/knowledge-base/articles/tpp-context-block"
        category="Integration"
        category-color="var(--at-blue-deep)"
        title="The tpp and decodedSsa Context Blocks"
        desc="What the TPP context object on every Ozone Connect call contains."
      />
      <EdRelatedCard
        href="/knowledge-base/articles/request-headers"
        category="Security"
        category-color="var(--at-blue)"
        title="FAPI Request Headers"
        desc="What x-fapi-interaction-id and the other FAPI headers are for."
      />
    </EdRelatedCards>
  </div>
</template>

<style scoped>
.ed-page { background: var(--at-bg-cream); color: var(--at-navy-deep); font-family: var(--at-sans); padding-top: 4.25rem; }
.ed-tags { display: flex; flex-wrap: wrap; gap: 0.45rem; margin-top: 1.5rem; }
.ed-tag { padding: 0.35rem 0.7rem; background: color-mix(in srgb, var(--at-blue-deep) 12%, transparent); color: var(--at-blue-deep); font-family: var(--at-mono); font-size: 0.62rem; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 700; }
</style>
