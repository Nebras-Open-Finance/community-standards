<route lang="yaml">
meta:
  title: Trust Framework — Creating an API Resource
</route>

<script setup lang="ts">
interface CarouselImage { src: string; alt: string; title: string }

const images1: CarouselImage[] = [
  { src: new URL('/images/raidiam/add-api/1.png', import.meta.url).href, alt: 'Step 1', title: 'Click into your organisation' },
  { src: new URL('/images/raidiam/add-api/2.png', import.meta.url).href, alt: 'Step 2', title: 'Click into Servers' },
  { src: new URL('/images/raidiam/add-api/3.png', import.meta.url).href, alt: 'Step 3', title: 'Click into the Server we are adding the APIs to' },
  { src: new URL('/images/raidiam/add-api/4.png', import.meta.url).href, alt: 'Step 4', title: 'Click API Resources' },
  { src: new URL('/images/raidiam/add-api/5.png', import.meta.url).href, alt: 'Step 5', title: 'Click + New API Resource' },
]

const images2: CarouselImage[] = [
  { src: new URL('/images/raidiam/add-api/6.png', import.meta.url).href, alt: 'Step 1', title: 'Select API Family' },
  { src: new URL('/images/raidiam/add-api/7.png', import.meta.url).href, alt: 'Step 2', title: 'Set API Version' },
  { src: new URL('/images/raidiam/add-api/8.png', import.meta.url).href, alt: 'Step 3', title: 'Click Save — the resource appears in Active API Resources' },
]

const images3: CarouselImage[] = [
  { src: new URL('/images/raidiam/add-api/10.png', import.meta.url).href, alt: 'Step 1', title: 'Click the actions menu and select Add API Discovery Endpoints' },
  { src: new URL('/images/raidiam/add-api/11.png', import.meta.url).href, alt: 'Step 2', title: 'Enter the API Base URL and click Generate Endpoints' },
  { src: new URL('/images/raidiam/add-api/12.png', import.meta.url).href, alt: 'Step 3', title: 'API Base URL format — https://rs1.{LFICODE}.apihub.openfinance.ae' },
  { src: new URL('/images/raidiam/add-api/14.png', import.meta.url).href, alt: 'Step 4', title: 'Tick all supported endpoints | the example shown is v2.1 account-information with all endpoints ticked' },
  { src: new URL('/images/raidiam/add-api/13.png', import.meta.url).href, alt: 'Step 5', title: 'Confirm all endpoints are correct and click Save' },
]
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          LFI · Trust Framework · Servers · API Resources
        </div>
        <h1 class="ed-doc__title">
          Creating an API Resource
          <span class="ed-doc__read">3 min read</span>
        </h1>
        <p class="ed-doc__lede">
          This walkthrough covers registering an API resource under your server. You must have a
          <a href="/tech/lfi-api-hub/trust-framework/servers/creating">server already created</a> before
          following these steps.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="walkthrough"
      num="01"
      color="var(--at-teal)"
      eyebrow="Walkthrough"
      title="Register an API family on your server"
      tone="cream"
    >
      <ol class="ed-doc__steps">
        <li>
          <h3>Navigate to your Authorisation Server</h3>
          <ol class="ed-doc__substeps">
            <li>Sign in to the Trust Framework directory.</li>
            <li>Navigate to your <strong>Organisation</strong>.</li>
            <li>Click into the Server we are adding the APIs to.</li>
            <li>Open the <strong>API Resources</strong> section.</li>
            <li>Click <strong>+ New API Resource</strong>.</li>
          </ol>
          <ClientOnly>
            <Carousel :images="images1" />
          </ClientOnly>
        </li>

        <li>
          <h3>Create the API Resource</h3>
          <ol class="ed-doc__substeps">
            <li>
              From the <strong>API Family</strong> dropdown, select the family that corresponds to the API
              you are registering. The following API families are available:
              <ul>
                <li><strong>Account Information</strong> (<code>account-information</code>) &mdash; banking data sharing</li>
                <li><strong>Payment Initiation</strong> (<code>payment</code>) &mdash; domestic single and multi-payments</li>
                <li><strong>Confirmation of Payee</strong> (<code>confirmation</code>) &mdash; payee name verification</li>
                <li><strong>ATM</strong> (<code>atm</code>) &mdash; ATM location data</li>
                <li><strong>Products &amp; Leads</strong> (<code>product</code>) &mdash; product catalogue and lead generation</li>
              </ul>
              For full details on what each family contains, including the endpoints and their mappings,
              see the <a href="/tech/lfi-api-hub/trust-framework/servers/api/">API Resources Overview</a>.
            </li>
            <li>Set the <strong>API Version</strong> (e.g. <code>2.1</code>).</li>
            <li>Click <strong>Save</strong>. The resource now appears in your <strong>Active API Resources</strong> list.</li>
          </ol>
          <ClientOnly>
            <Carousel :images="images2" />
          </ClientOnly>
          <EdProse>
            If your institution offers multiple API families (e.g. both data sharing and payment
            initiation), repeat Steps 1&ndash;2 for each family. Each family MUST be registered as a
            separate API resource.
          </EdProse>
        </li>

        <li>
          <h3>Add API Discovery Endpoints</h3>
          <EdProse>
            Once your API resource is saved, you MUST add the discovery endpoints so that TPPs can
            discover and call your APIs.
          </EdProse>
          <ol class="ed-doc__substeps">
            <li>Click the actions menu on the API resource and select <strong>+ Add API Discovery Endpoints</strong>.</li>
            <li>
              Enter the <strong>API Base URL</strong>. The format is always your API Hub resource server:
              <EdRefTable>
                <table>
                  <thead>
                    <tr>
                      <th>Environment</th>
                      <th>Base URL</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Pre-production</td>
                      <td><code>https://rs1.{lfiCode}.preprod.apihub.openfinance.ae</code></td>
                    </tr>
                    <tr>
                      <td>Production</td>
                      <td><code>https://rs1.{lfiCode}.apihub.openfinance.ae</code></td>
                    </tr>
                  </tbody>
                </table>
              </EdRefTable>
              Replace <code>{lfiCode}</code> with your institution's LFI code.
            </li>
            <li>Click <strong>Generate Endpoints</strong>. The system will populate the list of available endpoints for this API family.</li>
            <li>Tick all the endpoints you support. Check all endpoints are correct, then click <strong>Save</strong>.</li>
          </ol>

          <EdNote type="info" title="API Hub Default Endpoints">
            <p>
              Some endpoints are served directly by the API Hub and do not call your Ozone Connect server
              &mdash; for example, <code>/account-information/v2.1/account-access-consents</code>. These
              endpoints MUST always remain ticked. See the
              <a href="/tech/lfi-api-hub/trust-framework/servers/api/">API Resources Overview</a> for which
              endpoints are marked as <strong>API Hub default</strong>.
            </p>
          </EdNote>

          <ClientOnly>
            <Carousel :images="images3" />
          </ClientOnly>

          <EdProse>
            The endpoints are now published to your server entry in the Trust Framework. TPPs can discover
            them via the
            <a href="/tech/tpp-standards/trust-framework/api-discovery">API Discovery</a> process.
          </EdProse>
        </li>
      </ol>
    </EdSectionBand>

    <EdSectionBand
      id="verifying"
      num="02"
      color="var(--at-gold)"
      eyebrow="Verifying Registration"
      title="Confirm the entry via the Trust Framework API"
      tone="surface"
    >
      <EdProse>
        You can verify that your API resource is correctly registered by calling the Trust Framework API:
      </EdProse>

      <EdProse>
        <a href="/tech/lfi-api-hub/trust-framework/api/api-resources" class="endpoint"><span class="http-method http-method--get">GET</span><code>/organisations/{OrganisationId}/authorisationservers/{AuthorisationServerId}/apiresources</code></a>
      </EdProse>

      <EdProse>
        This returns the list of API resources associated with your authorisation server, as they would
        appear to a TPP querying the directory.
      </EdProse>
    </EdSectionBand>
  </div>
</template>

<style scoped>
.ed-doc { background: var(--at-bg-cream); color: var(--at-navy-deep); font-family: var(--at-sans); padding-top: 4.25rem; min-height: 100vh; }
.ed-doc__hero { background: var(--at-bg-cream); border-bottom: 1px solid var(--at-grid-line); }
.ed-doc__inner { max-width: var(--at-page-max); margin: 0 auto; padding: 4rem 2rem 3rem; }

.ed-doc__eyebrow { font-family: var(--at-mono); font-size: 0.68rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--at-teal); margin-bottom: 1.25rem; display: flex; align-items: center; gap: 0.75rem; }
.ed-doc__eyebrow-dash { width: 24px; height: 1px; background: currentColor; }

.ed-doc__title { font-family: var(--at-serif); font-size: clamp(2.25rem, 5vw, 3.6rem); font-weight: 600; line-height: 1.02; letter-spacing: -0.03em; margin: 0; display: flex; align-items: baseline; flex-wrap: wrap; gap: 0.85rem; }
.ed-doc__read { font-family: var(--at-mono); font-size: 0.7rem; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 500; color: var(--at-mute); align-self: center; padding-left: 0.6rem; border-left: 1px solid var(--at-grid-line-2); }

.ed-doc__lede { font-family: var(--at-sans); font-size: 1.1rem; line-height: 1.65; margin: 1.75rem 0 0; max-width: 50rem; color: var(--at-mute-2); }
.ed-doc__lede :deep(a) { color: var(--at-teal-deep); text-decoration: none; border-bottom: 1px solid currentColor; }

.ed-doc__steps {
  list-style: none;
  counter-reset: ed-step;
  padding: 0; margin: 0;
  display: flex; flex-direction: column; gap: 2.5rem;
}
.ed-doc__steps > li { counter-increment: ed-step; position: relative; padding-left: 3.5rem; min-height: 2.5rem; }
.ed-doc__steps > li::before {
  content: counter(ed-step, decimal-leading-zero);
  position: absolute; left: 0; top: 0;
  width: 2.5rem; height: 2.5rem;
  display: inline-flex; align-items: center; justify-content: center;
  background: var(--at-navy-deep); color: var(--at-bg-cream);
  font-family: var(--at-mono); font-size: 0.85rem; font-weight: 700;
}
.ed-doc__steps > li > h3 { font-family: var(--at-serif); font-size: 1.25rem; font-weight: 600; letter-spacing: -0.015em; color: var(--at-navy-deep); margin: 0.25rem 0 0.85rem; }

.ed-doc__substeps { font-family: var(--at-sans); font-size: 1rem; line-height: 1.7; margin: 0.5rem 0 1rem 1.4rem; padding: 0; color: var(--at-mute-2); }
.ed-doc__substeps li { margin: 0.4rem 0; }
.ed-doc__substeps :deep(strong), .ed-doc__substeps strong { color: var(--at-navy-deep); font-weight: 600; }
.ed-doc__substeps :deep(code), .ed-doc__substeps code { font-family: var(--at-mono); font-size: 0.86em; background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream)); border: 1px solid var(--at-grid-line); padding: 0.08em 0.4em; }
.ed-doc__substeps :deep(a), .ed-doc__substeps a { color: var(--at-teal-deep); text-decoration: none; border-bottom: 1px solid currentColor; }
.ed-doc__substeps :deep(ul), .ed-doc__substeps ul { margin: 0.4rem 0 0.4rem 1.2rem; padding: 0; }

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
  .ed-doc__steps > li { padding-left: 2.75rem; }
  .ed-doc__steps > li::before { width: 2rem; height: 2rem; font-size: 0.75rem; }
}
</style>
