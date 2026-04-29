<route lang="yaml">
meta:
  title: Trust Framework — Creating an Application
</route>

<script setup lang="ts">
interface CarouselImage { src: string; alt: string; title: string; tagline?: string }

const images1: CarouselImage[] = [
  { src: new URL('/images/raidiam/add-application/click-org.png', import.meta.url).href, alt: 'Step 1', title: 'Click into your organisation' },
  { src: new URL('/images/raidiam/add-application/click-app.png', import.meta.url).href, alt: 'Step 2', title: 'Click into applications' },
  { src: new URL('/images/raidiam/add-application/new-app.png', import.meta.url).href, alt: 'Step 3', title: 'Click + New Application' },
]

const images2: CarouselImage[] = [
  { src: new URL('/images/raidiam/add-application/role.png', import.meta.url).href, alt: 'Step 4', title: 'Select the roles of the Application', tagline: 'Note roles that can be selected for an Application are inherited from the organisation.' },
]

const images3: CarouselImage[] = [
  { src: new URL('/images/raidiam/add-application/client.png', import.meta.url).href, alt: 'Step 5', title: 'Provide the details of the client', tagline: 'Client Name, Client Logo & Software Version & Federation Entity Management Type' },
]

const images4: CarouselImage[] = [
  { src: new URL('/images/raidiam/add-application/auth.png', import.meta.url).href, alt: 'Step 6', title: 'Provide user authentication details', tagline: 'More information on <a href="/tech/tpp-standards/trust-framework/redirect-uri/">Redirect URIs</a>' },
]

const images5: CarouselImage[] = [
  { src: new URL('/images/raidiam/add-application/webhook.png', import.meta.url).href, alt: 'Step 7', title: 'Optional add an API Webhook URI', tagline: 'Note the Client ID, as it will be required for all requests made by this client.' },
]
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          TPP · Trust Framework · Applications
        </div>
        <h1 class="ed-doc__title">
          Creating an Application
          <span class="ed-doc__read">3 min read</span>
        </h1>
        <p class="ed-doc__lede">
          Step-by-step walkthrough for creating a new Application in the Trust Framework Directory.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="walkthrough"
      num="01"
      color="var(--at-teal)"
      eyebrow="Walkthrough"
      title="From + New Application to a registered Client ID"
      tone="cream"
    >
      <ol class="ed-doc__steps">
        <li>
          <h3>Navigate to '+ New Application'</h3>
          <ol class="ed-doc__substeps">
            <li>Navigate to your organisation.</li>
            <li>Open the <strong>Applications</strong> section.</li>
            <li>Click <strong>+ New Application</strong>.</li>
          </ol>
          <ClientOnly>
            <Carousel :images="images1" />
          </ClientOnly>
        </li>

        <li>
          <h3>Select the application roles</h3>
          <ol class="ed-doc__substeps">
            <li>Select the roles for your application. Roles define what the application is permitted to do. You can assign multiple roles, but only roles that are already assigned to your organisation are available for selection.</li>
          </ol>

          <EdNote type="warning" title="Choose roles carefully — they can't be changed later">
            <p>
              The roles you select here determine what this application is permitted to do. Once the
              application has been <strong>registered with an LFI</strong>, editing its roles in the Trust
              Framework has no effect. If the roles later need to change, you must disable the existing
              application, create a new one with the correct roles, and register it again. Make sure the
              selected roles (<code>BSIP</code>, <code>BDSP</code>, <code>ISP</code>) match the app's
              intended functionality before continuing.
            </p>
          </EdNote>

          <ClientOnly>
            <Carousel :images="images2" />
          </ClientOnly>
        </li>

        <li>
          <h3>Provide the Client Details</h3>
          <ol class="ed-doc__substeps">
            <li><strong>Client Name</strong> &mdash; enter a clear, human-readable name that identifies this application (e.g. <code>My TPP – Production</code>). This name may be visible to users during consent flows.</li>
            <li><strong>Software Version</strong> &mdash; enter the version of your software (e.g. <code>1.0.0</code>). Use a consistent versioning scheme so you can distinguish between releases in the directory.</li>
            <li><strong>Logo</strong> &mdash; upload a clear, recognisable logo. This image is shown to users on the redirect screen when returning from an LFI, so it should accurately represent the application to a User.</li>
            <li><strong>Federation</strong> &mdash; we recommend setting <strong>Federation</strong> to <strong>Enabled</strong> and <strong>Federation Entity Management Type</strong> to <strong>Managed</strong>. This allows the Trust Framework to automatically publish and maintain your application's federation metadata, so LFIs can discover and validate your client without manual configuration.</li>
          </ol>
          <ClientOnly>
            <Carousel :images="images3" />
          </ClientOnly>
        </li>

        <li>
          <h3>Provide the Redirect URI</h3>
          <ol class="ed-doc__substeps">
            <li>
              Enter the <strong>Redirect URI</strong> &mdash; the HTTPS endpoint(s) in your application
              that the LFI will redirect the user back to after authentication or authorisation. The
              <code>redirect_uri</code> sent in the
              <a href="/tech/tpp-standards/security/fapi/request-jwt#payload-claims">PAR request</a> must
              exactly match one of the values registered here.
            </li>
          </ol>

          <EdNote type="info">
            <p>
              You can register multiple redirect URIs if your application requires them (e.g. separate URIs
              for different environments). See
              <a href="/tech/tpp-standards/trust-framework/redirect-uri">Redirect URIs</a> for full guidance.
            </p>
          </EdNote>

          <ClientOnly>
            <Carousel :images="images4" />
          </ClientOnly>
        </li>

        <li>
          <h3>Add Webhook URIs (optional)</h3>
          <EdProse>
            If your application will receive event notifications via webhooks (e.g. consent or payment
            status updates), enter one or more <strong>API Webhook URIs</strong>. These work in the same
            way as redirect URIs &mdash; multiple values are allowed, and the
            <code>subscription.Webhook.Url</code> in each consent must exactly match one of the values
            registered here. If you are not using webhooks, leave this field blank. See
            <a href="/tech/tpp-standards/v2.1/webhooks/">Webhooks</a> for full guidance.
          </EdProse>
          <ClientOnly>
            <Carousel :images="images5" />
          </ClientOnly>
        </li>

        <li>
          <h3>Finish creating the application</h3>
          <ol class="ed-doc__substeps">
            <li>Click through to <strong>Create</strong> and register the application.</li>
          </ol>
        </li>
      </ol>
    </EdSectionBand>

    <EdSectionBand
      id="your-client-id"
      num="02"
      color="var(--at-gold)"
      eyebrow="Your Client ID"
      title="The UUID assigned when the application is created"
      tone="surface"
    >
      <EdProse>
        Once your application is created, the Trust Framework assigns it a <strong>Client ID</strong>
        &mdash; a UUID that permanently identifies this application. You will use this value as
        <code>client_id</code>, <code>iss</code>, and <code>sub</code> in every JWT you sign, including
        Client Assertions and Request JWTs. Keep a note of it.
      </EdProse>

      <ImageViewer
        src="/images/raidiam/client_id_spotlight.png"
        alt="Client ID location in the Trust Framework application detail page"
      />

      <EdNote type="tip" title="Where to find it later">
        <p>
          Your Client ID is always visible on the application detail page in the Trust Framework
          Directory. If you need to retrieve it again, navigate to your Organisation &rarr; Applications
          &rarr; select the application.
        </p>
      </EdNote>
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
  letter-spacing: 0.04em;
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
.ed-doc__substeps :deep(a),
.ed-doc__substeps a { color: var(--at-teal-deep); text-decoration: none; border-bottom: 1px solid currentColor; }

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
  .ed-doc__steps > li { padding-left: 2.75rem; }
  .ed-doc__steps > li::before { width: 2rem; height: 2rem; font-size: 0.75rem; }
}
</style>
