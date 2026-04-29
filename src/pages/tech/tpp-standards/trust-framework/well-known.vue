<route lang="yaml">
meta:
  title: Authorisation Server Discovery (.well-known)
</route>

<script setup lang="ts">
const wellKnownUrl = `https://auth1.[LFICode].apihub.openfinance.ae/.well-known/openid-configuration`

const exampleResponse = `{
  "issuer": "https://auth1.[LFICode].apihub.openfinance.ae",
  ...
  "token_endpoint": "https://as1.[LFICode].apihub.openfinance.ae/token",
  "authorization_endpoint": "https://app.lfi.com/open-finance",
  "registration_endpoint": "https://rs1.[LFICode].apihub.openfinance.ae/tpp-registration",
  "jwks_uri": "https://keystore.directory.openfinance.ae/64e5061d-123f-43c8-9f17-1df9a4600705/application.jwks"
}`
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          TPP · Trust Framework · LFI Discovery
        </div>
        <h1 class="ed-doc__title">
          Authorisation Server Discovery
          <span class="ed-doc__read">2 min read</span>
        </h1>
        <p class="ed-doc__lede">
          The <code>.well-known/openid-configuration</code> endpoint provides a standardized way for Third
          Party Providers (TPPs) to retrieve OAuth 2.0 and OpenID Connect configuration for a Licensed
          Financial Institution (LFI). This allows TPPs to discover authorization, token, and other
          endpoints programmatically, without hardcoding URLs.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="discovery-url"
      num="01"
      color="var(--at-teal)"
      eyebrow="Discovery URL"
      title="The .well-known endpoint format for UAE Open Finance"
      tone="cream"
    >
      <EdProse>For UAE Open Finance, the discovery URL format is:</EdProse>

      <EdCode :code="wellKnownUrl" lang="bash" filename=".well-known URL" />
    </EdSectionBand>

    <EdSectionBand
      id="properties"
      num="02"
      color="var(--at-gold)"
      eyebrow="Properties"
      title="Key fields returned by the discovery endpoint"
      tone="surface"
    >
      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Property</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>issuer</code></td>
              <td>Identifier for the Authorization Server, used in JWT validation.</td>
            </tr>
            <tr>
              <td><code>authorization_endpoint</code></td>
              <td>URL where end-users are redirected to in order to authenticate and authorize access.</td>
            </tr>
            <tr>
              <td><code>token_endpoint</code></td>
              <td>Endpoint to exchange authorization codes or other grants for access tokens.</td>
            </tr>
            <tr>
              <td><code>registration_endpoint</code></td>
              <td>Endpoint for Dynamic Client Registration (DCR) using software statements.</td>
            </tr>
            <tr>
              <td><code>jwks_uri</code></td>
              <td>URL exposing the server's public keys for validating JWT signatures.</td>
            </tr>
            <tr>
              <td><code>pushed_authorization_request_endpoint</code></td>
              <td>Endpoint for submitting signed authorization requests (PAR flow).</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>
    </EdSectionBand>

    <EdSectionBand
      id="example"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Example response"
      title="A typical .well-known JSON document"
      tone="cream"
    >
      <EdCode :code="exampleResponse" lang="json" filename="GET /.well-known/openid-configuration" />
    </EdSectionBand>

    <EdSectionBand
      id="caching"
      num="04"
      color="var(--at-navy)"
      eyebrow="Caching"
      title="Discovery responses are cached"
      tone="surface"
    >
      <EdProse>
        The information returned from <span class="endpoint"><span class="http-method http-method--get">GET</span><code>/.well-known/openid-configuration</code></span> changes
        infrequently and is cached accordingly.
      </EdProse>

      <EdBullets>
        <li><strong>Cache-Control header:</strong> <code>max-age=900</code></li>
        <li><strong>Cache duration:</strong> 15 minutes</li>
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
.ed-doc__lede :deep(code), .ed-doc__lede code {
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
