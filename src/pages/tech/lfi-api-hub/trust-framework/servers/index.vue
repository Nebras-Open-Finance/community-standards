<route lang="yaml">
meta:
  title: Trust Framework — Servers
  isIndex: true
</route>

<script setup lang="ts">
const tree = `Organisation
└── Server (API Hub)
    ├── API Resource  (Banking Data Sharing)
    ├── API Resource  (Payment Initiation)
    └── API Resource  (Confirmation of Payee)`
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          LFI · Trust Framework · Servers
        </div>
        <h1 class="ed-doc__title">
          Servers
          <span class="ed-doc__read">3 min read</span>
        </h1>
        <p class="ed-doc__lede">
          A <strong>Server</strong> in the Trust Framework represents your LFI's <strong>API Hub</strong>
          &mdash; the centralised platform that acts as the OIDC Authorisation Server, Resource Server, and
          Open Finance Gateway for your institution. Each API Hub instance is provisioned by the platform
          and is the entry point through which TPPs discover and interact with your Open Finance APIs.
        </p>
        <p class="ed-doc__lede ed-doc__lede--tight">
          As an LFI you MUST publish your API Hub as a server to the Trust Framework and associate your
          <a href="/tech/lfi-api-hub/trust-framework/servers/api/">API Resources</a> with it so that TPPs
          can discover the endpoints you expose via
          <a href="/tech/tpp-standards/trust-framework/open-api/participants" class="endpoint"><span class="http-method http-method--get">GET</span><code>/participants</code></a>.
        </p>

        <EdNote type="warning" title="Environment Mapping">
          <p>
            You MUST publish your <strong>pre-production</strong> API Hub to the
            <strong>Sandbox Trust Framework</strong> and your <strong>production</strong> API Hub to the
            <strong>Production Trust Framework</strong>.
          </p>
        </EdNote>
      </div>
    </section>

    <EdSectionBand
      id="what-does-server-represent"
      num="01"
      color="var(--at-teal)"
      eyebrow="What Does a Server Represent?"
      title="The directory record TPPs use to find and call your API Hub"
      tone="cream"
    >
      <EdProse>
        Within the Trust Framework, a server entry is a directory record that represents your API Hub. It
        tells TPPs:
      </EdProse>

      <EdBullets>
        <li><strong>Where to send users</strong> for authentication and consent (the API Hub's authorisation endpoint)</li>
        <li><strong>Where to obtain tokens</strong> (the API Hub's token endpoint)</li>
        <li><strong>What APIs you expose</strong> and at which base URLs (via your registered <a href="/tech/lfi-api-hub/trust-framework/servers/api/">API Resources</a>)</li>
        <li><strong>How to validate identity</strong> (via the API Hub's JWKS URI and OIDC discovery document)</li>
      </EdBullets>

      <EdProse>
        When a TPP initiates an authorisation code flow, it queries the Trust Framework directory to
        locate the correct server (API Hub) for the institution it wants to interact with.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="discovery-uri"
      num="02"
      color="var(--at-gold)"
      eyebrow="API Hub Discovery URI"
      title="How the well-known URI is obtained"
      tone="surface"
    >
      <EdProse>
        When your API Hub is provisioned, the platform provides you with a <strong>well-known discovery
        document URI</strong>. This URI is unique to your institution and environment. It exposes your API
        Hub's <code>authorization_endpoint</code>, <code>token_endpoint</code>, <code>jwks_uri</code>,
        <code>issuer</code>, and supported parameters.
      </EdProse>

      <EdProse>
        You will receive this URI as part of your
        <a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/">environment-specific onboarding configuration</a>.
      </EdProse>

      <EdProse>
        The <code>issuer</code> value from the discovery document is a required field when creating your
        server entry in the Trust Framework.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="required-information"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Required Information"
      title="Fields you must supply when creating a server"
      tone="cream"
    >
      <EdProse>To create a server in the Trust Framework, you MUST provide:</EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Field</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Customer Friendly Server Name</strong></td>
              <td>A public-facing name for your institution's Open Finance service, displayed in TPP-facing portals and consent screens. This MUST reflect the brand that the API Hub supports (see <a href="#logo-and-branding">Logo</a> below).</td>
            </tr>
            <tr>
              <td><strong>Issuer</strong></td>
              <td>The <code>issuer</code> value from your API Hub's well-known discovery document.</td>
            </tr>
            <tr>
              <td><strong>Description</strong></td>
              <td>A short description of your institution's Open Finance offering.</td>
            </tr>
            <tr>
              <td><strong>Logo</strong></td>
              <td>Your institution's logo for this API Hub instance (see <a href="#logo-and-branding">Logo and Branding</a> below).</td>
            </tr>
            <tr>
              <td><strong>Account Type</strong></td>
              <td>The account type(s) supported by this server: <strong>Retail</strong>, <strong>SME</strong>, or <strong>Corporate</strong> (see <a href="#account-types">Account Types</a> below).</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>
    </EdSectionBand>

    <EdSectionBand
      id="logo-and-branding"
      num="04"
      color="var(--at-navy)"
      eyebrow="Logo and Branding"
      title="Match the brand that the API Hub supports"
      tone="surface"
    >
      <EdProse>
        The logo you provide MUST match the brand that the API Hub supports. If your institution operates
        multiple API Hubs &mdash; for example, one for retail banking and one for business banking &mdash;
        each server entry MUST use the logo corresponding to that specific brand.
      </EdProse>

      <EdProse>
        This ensures that TPPs and PSUs see the correct branding during consent and authorisation
        journeys.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="account-types"
      num="05"
      color="var(--at-teal-deep)"
      eyebrow="Account Types"
      title="Retail, SME, or Corporate"
      tone="cream"
    >
      <EdProse>
        Each server MUST indicate the account type(s) it supports. This allows TPPs to identify which
        server to use when requesting access to a specific category of accounts.
      </EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Account Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Retail</strong></td>
              <td>Personal and individual customer accounts.</td>
            </tr>
            <tr>
              <td><strong>SME</strong></td>
              <td>Small and medium enterprise accounts.</td>
            </tr>
            <tr>
              <td><strong>Corporate</strong></td>
              <td>Corporate and institutional accounts.</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>
        An institution MAY register multiple servers if it operates separate API Hubs for different
        account types or brands.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="relationship-to-api-resources"
      num="06"
      color="var(--at-gold)"
      eyebrow="Relationship to API Resources"
      title="A server is the parent of one or more API resources"
      tone="surface"
    >
      <EdProse>
        A server acts as the parent for one or more <strong>API Resources</strong>. Each API resource
        entry associates a specific API family (e.g. banking data sharing, payment initiation) with the
        scopes your implementation supports.
      </EdProse>

      <EdCode :code="tree" lang="plaintext" filename="Hierarchy" />

      <EdProse>
        TPPs retrieving your directory entry will see both the server endpoints and the list of API
        resources, giving them everything they need to dynamically register and call your APIs.
      </EdProse>
    </EdSectionBand>

    <section class="ed-doc__contents">
      <div class="ed-doc__inner">
        <div class="ed-doc__contents-head">
          <div class="ed-doc__contents-eyebrow">
            <span class="ed-doc__eyebrow-dash" />
            Next Steps
          </div>
          <h2 class="ed-doc__contents-title">Continue setting up your server</h2>
        </div>

        <div class="ed-doc__contents-grid">
          <a class="ed-link-card" href="/tech/lfi-api-hub/trust-framework/servers/creating" :style="{ '--card-color': 'var(--at-teal)' }">
            <span class="ed-link-card__top" />
            <div class="ed-link-card__meta"><span class="ed-link-card__cat">Walkthrough</span></div>
            <h3 class="ed-link-card__title">Creating a Server</h3>
            <p class="ed-link-card__desc">Step-by-step walkthrough of registering your API Hub as a server in the Trust Framework Directory.</p>
            <div class="ed-link-card__foot"><span class="ed-link-card__cta">Open</span><span class="ed-link-card__arrow">&rarr;</span></div>
          </a>
          <a class="ed-link-card" href="/tech/lfi-api-hub/trust-framework/servers/api/" :style="{ '--card-color': 'var(--at-gold, #b08800)' }">
            <span class="ed-link-card__top" />
            <div class="ed-link-card__meta"><span class="ed-link-card__cat">Sub-section</span></div>
            <h3 class="ed-link-card__title">API Resources</h3>
            <p class="ed-link-card__desc">What API resources are, how they relate to API families, and how to configure them on your server.</p>
            <div class="ed-link-card__foot"><span class="ed-link-card__cta">Open</span><span class="ed-link-card__arrow">&rarr;</span></div>
          </a>
        </div>
      </div>
    </section>
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
.ed-doc__lede--tight { margin-top: 1rem; }
.ed-doc__lede :deep(strong) { color: var(--at-navy-deep); font-weight: 600; }
.ed-doc__lede :deep(code), .ed-doc__lede code {
  font-family: var(--at-mono);
  font-size: 0.86em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  padding: 0.08em 0.4em;
}

.ed-doc__contents { background: var(--at-surface); border-top: 1px solid var(--at-grid-line); padding: 3.5rem 0 4rem; }
.ed-doc__contents .ed-doc__inner { padding-top: 0; padding-bottom: 0; }
.ed-doc__contents-head { margin-bottom: 1.85rem; }
.ed-doc__contents-eyebrow {
  font-family: var(--at-mono);
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--at-teal);
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.ed-doc__contents-title {
  font-family: var(--at-serif);
  font-size: clamp(1.5rem, 2.6vw, 2rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.1;
  margin: 0;
  color: var(--at-navy-deep);
}
.ed-doc__contents-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(22.5rem, 1fr));
  gap: 1.25rem;
}

.ed-link-card {
  position: relative;
  display: flex;
  flex-direction: column;
  background: var(--at-bg-cream);
  border: 1px solid var(--at-grid-line);
  padding: 2rem 1.75rem 1.5rem;
  text-decoration: none;
  color: inherit;
  transition: border-color 0.2s ease, transform 0.2s ease;
}
.ed-link-card:hover { border-color: var(--card-color, var(--at-navy)); transform: translateY(-2px); }
.ed-link-card__top { position: absolute; top: 0; left: 0; width: 48px; height: 3px; background: var(--card-color, var(--at-navy)); }
.ed-link-card__meta { display: flex; align-items: center; gap: 0.65rem; margin-bottom: 0.85rem; font-family: var(--at-mono); font-size: 0.62rem; letter-spacing: 0.12em; text-transform: uppercase; flex-wrap: wrap; }
.ed-link-card__cat { font-weight: 700; color: var(--card-color, var(--at-navy)); }
.ed-link-card__title { font-family: var(--at-serif); font-size: 1.4rem; font-weight: 500; line-height: 1.2; letter-spacing: -0.02em; color: var(--at-navy-deep); margin: 0 0 0.85rem; }
.ed-link-card__desc { font-family: var(--at-sans); font-size: 0.92rem; line-height: 1.6; color: var(--at-mute-2); margin: 0 0 1.1rem; flex: 1; }
.ed-link-card__foot { display: flex; align-items: center; justify-content: space-between; padding-top: 0.85rem; border-top: 1px solid var(--at-grid-line); font-family: var(--at-mono); font-size: 0.66rem; letter-spacing: 0.14em; text-transform: uppercase; font-weight: 700; color: var(--at-mute); }
.ed-link-card__arrow { color: var(--card-color, var(--at-navy)); transition: transform 0.2s ease; }
.ed-link-card:hover .ed-link-card__arrow { transform: translateX(4px); }

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
  .ed-doc__contents { padding: 2.5rem 0 3.5rem; }
}
</style>
