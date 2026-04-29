<route lang="yaml">
meta:
  title: "mtls_endpoint_aliases — what it is and when it matters"
  description: "FYI explainer for the mtls_endpoint_aliases object returned by .well-known/openid-configuration. Today the aliases match the top-level endpoints, but the FAPI 2.0 spec allows them to diverge — preferring the alias keeps your client future-proof."
  category: Security
  readTime: "5 min"
  updated: "2026-04-21"
  tags:
    - mTLS
    - Discovery
    - FAPI 2.0
</route>

<script setup lang="ts">
interface Section { id: string; label: string }
interface MetaItem { label: string; value: string }

const sections: Section[] = [
  { id: 'discovery', label: 'Discovery' },
  { id: 'why',       label: 'Why' },
  { id: 'today',     label: 'Today' },
  { id: 'pattern',   label: 'Safe pattern' },
  { id: 'no-need',   label: "What you don't need" },
]

const meta: MetaItem[] = [
  { label: 'Category', value: 'Security' },
  { label: 'Read',     value: '5 min' },
  { label: 'Updated',  value: '21 Apr 2026' },
]

const tags: readonly string[] = ['mTLS', 'Discovery', 'FAPI 2.0']

const discoveryDoc = `{
  "token_endpoint":                         "https://as1.altareq1.sandbox.apihub.openfinance.ae/token",
  "introspection_endpoint":                 "https://as1.altareq1.sandbox.apihub.openfinance.ae/introspection",
  "revocation_endpoint":                    "https://as1.altareq1.sandbox.apihub.openfinance.ae/token/revoke",
  "pushed_authorization_request_endpoint":  "https://as1.altareq1.sandbox.apihub.openfinance.ae/par",

  "tls_client_certificate_bound_access_tokens": true,

  "mtls_endpoint_aliases": {
    "token_endpoint":                        "https://as1.altareq1.sandbox.apihub.openfinance.ae/token",
    "introspection_endpoint":                "https://as1.altareq1.sandbox.apihub.openfinance.ae/introspection",
    "revocation_endpoint":                   "https://as1.altareq1.sandbox.apihub.openfinance.ae/token/revoke",
    "pushed_authorization_request_endpoint": "https://as1.altareq1.sandbox.apihub.openfinance.ae/par"
  }
}`

const nodeSnippet = `// Prefer the mTLS alias when available, fall back to the top-level endpoint.
const PAR_ENDPOINT =
  discoveryDoc.mtls_endpoint_aliases?.pushed_authorization_request_endpoint
  ?? discoveryDoc.pushed_authorization_request_endpoint

const TOKEN_ENDPOINT =
  discoveryDoc.mtls_endpoint_aliases?.token_endpoint
  ?? discoveryDoc.token_endpoint`

const pythonSnippet = `# Prefer the mTLS alias when available, fall back to the top-level endpoint.
mtls = discovery_doc.get("mtls_endpoint_aliases", {})

par_endpoint   = mtls.get("pushed_authorization_request_endpoint") \\
    or discovery_doc["pushed_authorization_request_endpoint"]

token_endpoint = mtls.get("token_endpoint") \\
    or discovery_doc["token_endpoint"]`
</script>

<template>
  <div class="ed-page">
    <EdBackStrip href="/knowledge-base/" text="All knowledge base articles" />

    <EdHero
      eyebrow="Learn · Understand · Build"
      title="mtls_endpoint_aliases — What It Is and When It Matters"
      :meta="meta"
      lede="An FYI explainer for the <code>mtls_endpoint_aliases</code> object returned by <code>.well-known/openid-configuration</code>. Today the aliases match the top-level endpoints, but the FAPI 2.0 spec allows them to diverge &mdash; preferring the alias keeps your client future-proof."
    >
      <template #lede>
        <div class="ed-tags">
          <span v-for="t in tags" :key="t" class="ed-tag">{{ t }}</span>
        </div>
      </template>
    </EdHero>

    <EdInPageNav :sections="sections" />

    <EdNote type="info" title="Low priority — informational">
      <p>This is an FYI article. On the current sandbox the values inside <code>mtls_endpoint_aliases</code> are identical to the top-level endpoints, so a TPP that ignores this object will work today. The article exists so that the day an LFI separates the two, you already know what to look for.</p>
    </EdNote>

    <EdSectionBand
      id="discovery"
      num="01"
      color="var(--at-teal)"
      eyebrow="Discovery"
      title="What discovery returns"
      lede="The LFI's <code>.well-known/openid-configuration</code> includes both top-level endpoints and a parallel <code>mtls_endpoint_aliases</code> object:"
      tone="cream"
    >
      <EdCode :code="discoveryDoc" lang="json" filename=".well-known/openid-configuration" />
    </EdSectionBand>

    <EdSectionBand
      id="why"
      num="02"
      color="var(--at-gold)"
      eyebrow="Why the aliases exist"
      title="An operational option for splitting mTLS surfaces"
      tone="surface"
    >
      <EdProse><code>mtls_endpoint_aliases</code> comes from <a href="https://datatracker.ietf.org/doc/html/rfc8705#section-5">RFC 8705 §5</a> &mdash; <em>OAuth 2.0 Mutual-TLS Client Authentication and Certificate-Bound Access Tokens</em>.</EdProse>
      <EdProse>The motivation is operational: an Authorization Server may want to offer the same logical endpoint at two URLs &mdash; one that requires mTLS and one that does not. For example, the introspection endpoint may be reachable without mTLS for some operations but bound to a different host for the cert-bound flows.</EdProse>
      <EdProse>When <code>tls_client_certificate_bound_access_tokens: true</code> is set (as it is in UAE Open Finance), all token-related calls &mdash; <code>/par</code>, <code>/token</code>, <code>/introspection</code>, <code>/revocation</code> &mdash; must be made with your transport certificate so the issued token can be cryptographically bound to the cert. The aliases let the AS publish a separate URL set for those mTLS-bound calls if it ever needs to.</EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="today"
      num="03"
      color="var(--at-blue)"
      eyebrow="Today"
      title="Why this is currently a non-issue"
      tone="cream"
      narrow
    >
      <EdProse>In UAE Open Finance today, the values inside <code>mtls_endpoint_aliases</code> are <strong>identical</strong> to the top-level values. Posting your PAR or token request to either URL works equivalently and produces the same cert-bound token.</EdProse>
      <EdProse>The two only diverge if an LFI deliberately splits its mTLS surface from its non-mTLS surface &mdash; a configuration change that is not currently planned.</EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="pattern"
      num="04"
      color="var(--at-blue-deep)"
      eyebrow="Safe pattern"
      title="Future-proof with an alias-fallback"
      lede="If you want to be future-proof with no runtime cost, prefer the aliased endpoint when you have your client cert attached:"
      tone="surface"
    >
      <EdCode :code="nodeSnippet" lang="typescript" filename="Node.js" />
      <EdCode :code="pythonSnippet" lang="python" filename="Python" />

      <EdProse>The same pattern applies to <code>introspection_endpoint</code> and <code>revocation_endpoint</code>.</EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="no-need"
      num="05"
      color="var(--at-navy)"
      eyebrow="What you don't need"
      title="Where the aliases don't apply"
      tone="cream"
      narrow
    >
      <EdBullets>
        <li>The <code>authorization_endpoint</code> is browser-driven (the PSU is redirected there) &mdash; it is not an mTLS call and does not appear in <code>mtls_endpoint_aliases</code>. Always use the top-level value.</li>
        <li>You do not need to call discovery twice or maintain two endpoint sets in code. One discovery fetch with the alias-fallback pattern above is enough.</li>
      </EdBullets>
    </EdSectionBand>

    <EdRelatedCards eyebrow="Further reading" title="Related references">
      <EdRelatedCard
        href="https://datatracker.ietf.org/doc/html/rfc8705#section-5"
        category="RFC"
        category-color="var(--at-mute)"
        title="RFC 8705 §5"
        desc="Metadata for Mutual-TLS Endpoint Aliases."
      />
      <EdRelatedCard
        href="/tech/tpp-standards/trust-framework/api-discovery"
        category="TPP Standards"
        category-color="var(--at-blue)"
        title="API Discovery"
        desc="How to fetch and consume the LFI's well-known configuration."
      />
      <EdRelatedCard
        href="/tech/tpp-standards/security/fapi/request-jwt"
        category="TPP Standards"
        category-color="var(--at-blue)"
        title="Preparing the Request JWT"
        desc="Building the JAR sent to /par."
      />
    </EdRelatedCards>
  </div>
</template>

<style scoped>
.ed-page { background: var(--at-bg-cream); color: var(--at-navy-deep); font-family: var(--at-sans); padding-top: 4.25rem; }
.ed-tags { display: flex; flex-wrap: wrap; gap: 0.45rem; margin-top: 1.5rem; }
.ed-tag { padding: 0.35rem 0.7rem; background: color-mix(in srgb, var(--at-blue) 12%, transparent); color: var(--at-blue-deep); font-family: var(--at-mono); font-size: 0.62rem; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 700; }
</style>
