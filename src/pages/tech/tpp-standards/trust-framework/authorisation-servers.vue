<route lang="yaml">
meta:
  title: Trust Framework — Authorisation Servers
</route>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          TPP · Trust Framework · LFI Discovery
        </div>
        <h1 class="ed-doc__title">
          Authorisation Servers
          <span class="ed-doc__read">2 min read</span>
        </h1>
        <p class="ed-doc__lede">
          Each <strong>Authorisation Server</strong> represents an <strong>Ozone API Hub</strong> through
          which a Licensed Financial Institution (LFI) exposes its Open Finance APIs. These servers allow
          Third Party Providers (TPPs) to authenticate, request consent, and interact securely with the
          LFI's API ecosystem.
        </p>
        <p class="ed-doc__lede ed-doc__lede--tight">
          Each server object provides both technical and customer-facing metadata, enabling TPPs to
          integrate programmatically while also presenting consistent branding to end-users.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="key-properties"
      num="01"
      color="var(--at-teal)"
      eyebrow="Key Properties"
      title="Fields returned for every Authorisation Server"
      tone="cream"
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
              <td><code>AuthorisationServerId</code></td>
              <td>Unique identifier for this Authorisation Server.</td>
            </tr>
            <tr>
              <td><code>Status</code></td>
              <td>Current status of the server (e.g., Active).</td>
            </tr>
            <tr>
              <td><code>Issuer</code></td>
              <td>Base URL of the Authorization Server used for token validation and JWT verification.</td>
            </tr>
            <tr>
              <td><code>OpenIDDiscoveryDocument</code></td>
              <td>URL of the <code>.well-known/openid-configuration</code> endpoint containing OAuth 2.0 and OpenID Connect metadata. This document provides TPPs with all necessary endpoints for registration, authentication, and token exchange.</td>
            </tr>
            <tr>
              <td><code>CustomerFriendlyName</code></td>
              <td>Display name chosen by the LFI to represent the server to Customers. TPPs should present this to end-users. Example: <code>"ENBDX"</code>.</td>
            </tr>
            <tr>
              <td><code>CustomerFriendlyLogoUri</code></td>
              <td>URL to the logo the LFI considers best for the server. TPPs should use this logo when displaying the server to end-users to maintain consistent branding. Example: <code>https://data.directory.openfinance.ae/logos/.../authorisationservers/...png</code>.</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>
        The <code>CustomerFriendlyLogoUri</code> and <code>CustomerFriendlyName</code> allow TPPs to
        display a consistent user interface for end-users when selecting or authenticating with an
        Authorisation Server. This ensures the server is easily identifiable and trusted by customers.
      </EdProse>

      <EdNote type="tip">
        <p>
          Always use the logo dynamically from <code>CustomerFriendlyLogoUri</code> rather than
          hardcoding, so any updates made by the LFI are automatically reflected.
        </p>
      </EdNote>

      <EdNote type="info" title="OpenIDDiscoveryDocument is a URL, not the document">
        <p>
          <code>OpenIDDiscoveryDocument</code> is the <strong>URL</strong> of the LFI's
          <code>.well-known/openid-configuration</code> endpoint &mdash; it is a pointer, not the
          configuration data itself. To obtain the actual endpoints your application needs (such as
          <code>authorization_endpoint</code>, <code>token_endpoint</code>,
          <code>pushed_authorization_request_endpoint</code>, and <code>registration_endpoint</code>), you
          must make a separate <code>GET</code> request to that URL.
        </p>
      </EdNote>

      <EdProse>
        Additional details about the Discovery endpoint can be found in
        <a href="/tech/tpp-standards/trust-framework/well-known/">Discovery</a>.
      </EdProse>
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
.ed-doc__lede--tight { margin-top: 1.25rem; }
.ed-doc__lede :deep(strong) { color: var(--at-navy-deep); font-weight: 600; }

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
}
</style>
