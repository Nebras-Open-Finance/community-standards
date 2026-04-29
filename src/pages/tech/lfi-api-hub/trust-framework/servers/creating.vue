<route lang="yaml">
meta:
  title: Trust Framework — Creating a Server
</route>

<script setup lang="ts">
interface CarouselImage { src: string; alt: string; title: string }

const images1: CarouselImage[] = [
  { src: new URL('/images/raidiam/add-server/1.png', import.meta.url).href, alt: 'Step 1', title: 'Click into your organisation' },
  { src: new URL('/images/raidiam/add-server/2.png', import.meta.url).href, alt: 'Step 2', title: 'Click into Servers' },
  { src: new URL('/images/raidiam/add-server/3.png', import.meta.url).href, alt: 'Step 3', title: 'Click + New Server' },
]

const images2: CarouselImage[] = [
  { src: new URL('/images/raidiam/add-server/4.png', import.meta.url).href, alt: 'Step 1', title: 'Enter Customer Friendly Server Name' },
  { src: new URL('/images/raidiam/add-server/5.png', import.meta.url).href, alt: 'Step 2', title: 'Enter Issuer it will be formatted - https://auth1.{LFICODE}.apihub.openfinance.ae' },
  { src: new URL('/images/raidiam/add-server/6.png', import.meta.url).href, alt: 'Step 3', title: 'Enter the Description' },
]
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
          Creating a Server
          <span class="ed-doc__read">3 min read</span>
        </h1>
        <p class="ed-doc__lede">
          This walkthrough covers publishing your API Hub as a server in the Trust Framework. You MUST
          complete this before registering API resources or being discoverable by TPPs.
        </p>

        <EdNote type="info" title="Prerequisites">
          <p>Before creating a server:</p>
          <ul>
            <li>Your organisation MUST be onboarded to the Trust Framework with the necessary admin permissions. See <a href="/tech/lfi-api-hub/trust-framework/onboarding">Onboarding</a> if you have not yet completed this step.</li>
            <li>Your API Hub MUST be provisioned and you MUST have received your <a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/">environment-specific configuration</a>, including your well-known discovery document URI.</li>
          </ul>
        </EdNote>
      </div>
    </section>

    <EdSectionBand
      id="walkthrough"
      num="01"
      color="var(--at-teal)"
      eyebrow="Walkthrough"
      title="From + New Server to a published Authorisation Server"
      tone="cream"
    >
      <ol class="ed-doc__steps">
        <li>
          <h3>Obtain Your Issuer</h3>
          <EdProse>
            Before creating the server entry, retrieve the <code>issuer</code> value from your API Hub's
            well-known discovery document. The discovery document URI is provided as part of your
            <a href="/tech/lfi-api-hub/v2.1/api-hub/onboarding/environment-specific/">environment-specific onboarding configuration</a>.
          </EdProse>
          <EdProse>
            Open the discovery document URI in a browser or HTTP client and locate the <code>issuer</code>
            field. You will need this value in Step 3.
          </EdProse>
        </li>

        <li>
          <h3>Navigate to your Organisation</h3>
          <ol class="ed-doc__substeps">
            <li>Sign in to the Trust Framework directory.</li>
          </ol>

          <EdNote type="warning" title="Environment Mapping">
            <p>Ensure you are creating the server in the correct Trust Framework environment:</p>
            <ul>
              <li><strong>Pre-production</strong> API Hub &rarr; <strong>Sandbox</strong> Trust Framework (<code>web.sandbox.directory.openfinance.ae</code>)</li>
              <li><strong>Production</strong> API Hub &rarr; <strong>Production</strong> Trust Framework (<code>web.directory.openfinance.ae</code>)</li>
            </ul>
          </EdNote>

          <ol class="ed-doc__substeps" start="2">
            <li>Navigate to your <strong>Organisation</strong>.</li>
            <li>Open the <strong>Auth Servers</strong> section.</li>
            <li>Click <strong>+ New Server</strong>.</li>
          </ol>

          <ClientOnly>
            <Carousel :images="images1" />
          </ClientOnly>
        </li>

        <li>
          <h3>Provide the Server Details</h3>
          <EdProse>
            Fill in the required fields. These values are published in the directory and are visible to
            TPPs.
          </EdProse>

          <EdRefTable>
            <table>
              <thead>
                <tr>
                  <th>Field</th>
                  <th>Guidance</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Customer Friendly Server Name</strong></td>
                  <td>A public-facing name that reflects the brand this API Hub supports (e.g. <code>Acme Bank Retail</code> or <code>Acme Bank Business</code>). If your institution operates multiple API Hubs for different brands, each MUST have a distinct name.</td>
                </tr>
                <tr>
                  <td><strong>Issuer</strong></td>
                  <td>The <code>issuer</code> value from your API Hub's well-known discovery document, obtained in Step 1.</td>
                </tr>
                <tr>
                  <td><strong>Description</strong></td>
                  <td>A short description of the Open Finance service (e.g. <code>Open Finance APIs for Demo Bank's retail customers</code>).</td>
                </tr>
              </tbody>
            </table>
          </EdRefTable>

          <ClientOnly>
            <Carousel :images="images2" />
          </ClientOnly>
        </li>

        <li>
          <h3>Set the Account Type</h3>
          <EdProse>Indicate the account type(s) supported by this server:</EdProse>
          <EdBullets>
            <li><strong>Retail</strong> &mdash; personal and individual customer accounts</li>
            <li><strong>SME</strong> &mdash; small and medium enterprise accounts</li>
            <li><strong>Corporate</strong> &mdash; corporate and institutional accounts</li>
          </EdBullets>
          <EdProse>
            This allows TPPs to identify which server to use when requesting access to a specific category
            of accounts.
          </EdProse>
          <ImageViewer src="/images/raidiam/add-server/7.png" alt="Account types selection" />
        </li>

        <li>
          <h3>Upload the Logo</h3>
          <EdProse>
            Upload a logo for this server entry. The logo MUST match the brand that this API Hub supports.
          </EdProse>
          <EdProse>
            If your institution has multiple API Hubs (e.g. one for retail and one for business), each
            server MUST use the logo corresponding to its specific brand. This logo is displayed to TPPs
            and PSUs during consent and authorisation journeys.
          </EdProse>
          <ImageViewer src="/images/raidiam/add-server/8.png" alt="Logo upload" />
        </li>

        <li>
          <h3>Save the Server</h3>
          <ol class="ed-doc__substeps">
            <li>Skip <strong>Additional Details</strong> and <strong>Server Validity</strong> sections.</li>
            <li>Click <strong>Save</strong> to register the server.</li>
            <li>Your Server now appears in the Server section of your Organisation.</li>
          </ol>
          <ImageViewer src="/images/raidiam/add-server/9.png" alt="Server saved" />
        </li>
      </ol>

      <EdNote type="tip" title="Finding your Authorisation Server ID">
        <p>
          After creation, your Authorisation Server ID is visible on the server detail page. It is also
          discoverable to TPPs via the
          <a href="/tech/tpp-standards/trust-framework/api-discovery">API Discovery</a> process.
        </p>
      </EdNote>
    </EdSectionBand>

    <section class="ed-doc__contents">
      <div class="ed-doc__inner">
        <div class="ed-doc__contents-head">
          <div class="ed-doc__contents-eyebrow">
            <span class="ed-doc__eyebrow-dash" />
            Next Steps
          </div>
          <h2 class="ed-doc__contents-title">Add API resources to your server</h2>
          <p class="ed-doc__contents-sub">With your server published, describe the APIs your institution exposes by registering API resources.</p>
        </div>

        <div class="ed-doc__contents-grid">
          <a class="ed-link-card" href="/tech/lfi-api-hub/trust-framework/servers/api/" :style="{ '--card-color': 'var(--at-teal)' }">
            <span class="ed-link-card__top" />
            <div class="ed-link-card__meta"><span class="ed-link-card__cat">Sub-section</span></div>
            <h3 class="ed-link-card__title">API Resources — Overview</h3>
            <p class="ed-link-card__desc">What API resources are, how they relate to API families, and how they tie into your server entry.</p>
            <div class="ed-link-card__foot"><span class="ed-link-card__cta">Open</span><span class="ed-link-card__arrow">&rarr;</span></div>
          </a>
          <a class="ed-link-card" href="/tech/lfi-api-hub/trust-framework/servers/api/creating" :style="{ '--card-color': 'var(--at-gold, #b08800)' }">
            <span class="ed-link-card__top" />
            <div class="ed-link-card__meta"><span class="ed-link-card__cat">Walkthrough</span></div>
            <h3 class="ed-link-card__title">Creating an API Resource</h3>
            <p class="ed-link-card__desc">Step-by-step walkthrough of registering an API family on your server.</p>
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

.ed-doc__steps {
  list-style: none;
  counter-reset: ed-step;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}
.ed-doc__steps > li {
  counter-increment: ed-step;
  position: relative;
  padding-left: 3.5rem;
  min-height: 2.5rem;
}
.ed-doc__steps > li::before {
  content: counter(ed-step, decimal-leading-zero);
  position: absolute;
  left: 0;
  top: 0;
  width: 2.5rem;
  height: 2.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--at-navy-deep);
  color: var(--at-bg-cream);
  font-family: var(--at-mono);
  font-size: 0.85rem;
  font-weight: 700;
}
.ed-doc__steps > li > h3 {
  font-family: var(--at-serif);
  font-size: 1.25rem;
  font-weight: 600;
  letter-spacing: -0.015em;
  color: var(--at-navy-deep);
  margin: 0.25rem 0 0.85rem;
}

.ed-doc__substeps {
  font-family: var(--at-sans);
  font-size: 1rem;
  line-height: 1.7;
  margin: 0.5rem 0 1rem 1.4rem;
  padding: 0;
  color: var(--at-mute-2);
}
.ed-doc__substeps li { margin: 0.4rem 0; }
.ed-doc__substeps :deep(strong),
.ed-doc__substeps strong { color: var(--at-navy-deep); font-weight: 600; }
.ed-doc__substeps :deep(code),
.ed-doc__substeps code {
  font-family: var(--at-mono);
  font-size: 0.86em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  padding: 0.08em 0.4em;
}

.ed-doc__contents { background: var(--at-surface); border-top: 1px solid var(--at-grid-line); padding: 3.5rem 0 4rem; }
.ed-doc__contents .ed-doc__inner { padding-top: 0; padding-bottom: 0; }
.ed-doc__contents-head { margin-bottom: 1.85rem; }
.ed-doc__contents-eyebrow { font-family: var(--at-mono); font-size: 0.68rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--at-teal); margin-bottom: 1rem; display: flex; align-items: center; gap: 0.75rem; }
.ed-doc__contents-title { font-family: var(--at-serif); font-size: clamp(1.5rem, 2.6vw, 2rem); font-weight: 600; letter-spacing: -0.02em; line-height: 1.1; margin: 0 0 0.6rem; color: var(--at-navy-deep); }
.ed-doc__contents-sub { font-family: var(--at-sans); font-size: 0.95rem; line-height: 1.6; color: var(--at-mute-2); margin: 0; }
.ed-doc__contents-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(22.5rem, 1fr)); gap: 1.25rem; }

.ed-link-card { position: relative; display: flex; flex-direction: column; background: var(--at-bg-cream); border: 1px solid var(--at-grid-line); padding: 2rem 1.75rem 1.5rem; text-decoration: none; color: inherit; transition: border-color 0.2s ease, transform 0.2s ease; }
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
  .ed-doc__steps > li { padding-left: 2.75rem; }
  .ed-doc__steps > li::before { width: 2rem; height: 2rem; font-size: 0.75rem; }
  .ed-doc__contents { padding: 2.5rem 0 3.5rem; }
}
</style>
