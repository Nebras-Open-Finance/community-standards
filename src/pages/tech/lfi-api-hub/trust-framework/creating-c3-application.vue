<route lang="yaml">
meta:
  title: Trust Framework — Creating the C3-hh-cm-client Application
</route>

<script setup lang="ts">
interface CarouselImage { src: string; alt: string; title: string; tagline?: string }

const images1: CarouselImage[] = [
  { src: new URL('/images/raidiam/add-application/click-org.png', import.meta.url).href, alt: 'Step 1', title: 'Click into your organisation' },
  { src: new URL('/images/raidiam/add-application/click-app.png', import.meta.url).href, alt: 'Step 2', title: 'Click into applications' },
  { src: new URL('/images/raidiam/add-application/new-app.png', import.meta.url).href, alt: 'Step 3', title: 'Click + New Application' },
]

const images2: CarouselImage[] = [
  { src: new URL('/images/raidiam/add-application/lfi-role.png', import.meta.url).href, alt: 'Step 4', title: 'Select the LFI role', tagline: 'Assign the LFI role only. Roles available are inherited from the organisation.' },
]

const images3: CarouselImage[] = [
  { src: new URL('/images/raidiam/add-application/client.png', import.meta.url).href, alt: 'Step 5', title: 'Provide the details of the client', tagline: 'Client Name, Client Logo & Software Version & Federation Entity Management Type' },
]

const images4: CarouselImage[] = [
  { src: new URL('/images/raidiam/add-application/auth.png', import.meta.url).href, alt: 'Step 6', title: 'Provide a redirect URI', tagline: 'A value is required but will not be used — any valid HTTPS URI is acceptable.' },
]
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          LFI · Trust Framework · Applications
        </div>
        <h1 class="ed-doc__title">
          Creating the C3-hh-cm-client Application
          <span class="ed-doc__read">2 min read</span>
        </h1>
        <p class="ed-doc__lede">
          The C3-hh-cm-client is the LFI-side application used to make requests to the API Hub. This
          walkthrough covers creating that application in the Trust Framework Directory.
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

          <EdNote type="danger" title="LFI role only">
            <p>Assign the <strong>LFI role only</strong> to this client. It must not be assigned any TPP roles.</p>
          </EdNote>

          <ol class="ed-doc__substeps">
            <li>Select the <strong>LFI role</strong>. This client is used solely to make requests to the API Hub on behalf of your LFI and must not be assigned TPP roles.</li>
          </ol>
          <ClientOnly>
            <Carousel :images="images2" />
          </ClientOnly>
        </li>

        <li>
          <h3>Provide the Client Details</h3>
          <ol class="ed-doc__substeps">
            <li><strong>Client Name</strong> &mdash; enter a clear name that identifies this client as your C3-hh-cm-client (e.g. <code>C3-hh-cm-client</code>).</li>
            <li><strong>Software Version</strong> &mdash; enter a version for your software (e.g. <code>1.0.0</code>).</li>
            <li><strong>Logo</strong> &mdash; a logo is required by the form. Because this client is never used in a user-facing redirect flow, the logo will not be displayed to end users; any valid image will suffice.</li>
            <li><strong>Federation</strong> &mdash; we recommend setting <strong>Federation</strong> to <strong>Enabled</strong> and <strong>Federation Entity Management Type</strong> to <strong>Managed</strong>. This allows the Trust Framework to automatically publish and maintain your application's federation metadata, so the API Hub can discover and validate your client without manual configuration.</li>
          </ol>
          <ClientOnly>
            <Carousel :images="images3" />
          </ClientOnly>
        </li>

        <li>
          <h3>Provide the Redirect URI</h3>
          <ol class="ed-doc__substeps">
            <li>A redirect URI is required by the form. Because this client is never used in an authorisation flow with an end user, it will not be called; any valid HTTPS URI will suffice (e.g. <code>https://localhost/callback</code>).</li>
          </ol>
          <ClientOnly>
            <Carousel :images="images4" />
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
        <code>client_id</code>, <code>iss</code>, and <code>sub</code> in every JWT &mdash; keep a note of
        it.
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
.ed-doc { background: var(--at-bg-cream); color: var(--at-navy-deep); font-family: var(--at-sans); padding-top: 4.25rem; min-height: 100vh; }
.ed-doc__hero { background: var(--at-bg-cream); border-bottom: 1px solid var(--at-grid-line); }
.ed-doc__inner { max-width: var(--at-page-max); margin: 0 auto; padding: 4rem 2rem 3rem; }

.ed-doc__eyebrow { font-family: var(--at-mono); font-size: 0.68rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--at-teal); margin-bottom: 1.25rem; display: flex; align-items: center; gap: 0.75rem; }
.ed-doc__eyebrow-dash { width: 24px; height: 1px; background: currentColor; }

.ed-doc__title { font-family: var(--at-serif); font-size: clamp(2.25rem, 5vw, 3.6rem); font-weight: 600; line-height: 1.02; letter-spacing: -0.03em; margin: 0; display: flex; align-items: baseline; flex-wrap: wrap; gap: 0.85rem; }
.ed-doc__read { font-family: var(--at-mono); font-size: 0.7rem; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 500; color: var(--at-mute); align-self: center; padding-left: 0.6rem; border-left: 1px solid var(--at-grid-line-2); }

.ed-doc__lede { font-family: var(--at-sans); font-size: 1.1rem; line-height: 1.65; margin: 1.75rem 0 0; max-width: 50rem; color: var(--at-mute-2); }
.ed-doc__lede :deep(strong), .ed-doc__lede strong { color: var(--at-navy-deep); font-weight: 600; }

.ed-doc__steps { list-style: none; counter-reset: ed-step; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 2.5rem; }
.ed-doc__steps > li { counter-increment: ed-step; position: relative; padding-left: 3.5rem; min-height: 2.5rem; }
.ed-doc__steps > li::before { content: counter(ed-step, decimal-leading-zero); position: absolute; left: 0; top: 0; width: 2.5rem; height: 2.5rem; display: inline-flex; align-items: center; justify-content: center; background: var(--at-navy-deep); color: var(--at-bg-cream); font-family: var(--at-mono); font-size: 0.85rem; font-weight: 700; }
.ed-doc__steps > li > h3 { font-family: var(--at-serif); font-size: 1.25rem; font-weight: 600; letter-spacing: -0.015em; color: var(--at-navy-deep); margin: 0.25rem 0 0.85rem; }

.ed-doc__substeps { font-family: var(--at-sans); font-size: 1rem; line-height: 1.7; margin: 0.5rem 0 1rem 1.4rem; padding: 0; color: var(--at-mute-2); }
.ed-doc__substeps li { margin: 0.4rem 0; }
.ed-doc__substeps :deep(strong), .ed-doc__substeps strong { color: var(--at-navy-deep); font-weight: 600; }
.ed-doc__substeps :deep(code), .ed-doc__substeps code { font-family: var(--at-mono); font-size: 0.86em; background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream)); border: 1px solid var(--at-grid-line); padding: 0.08em 0.4em; }

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
  .ed-doc__steps > li { padding-left: 2.75rem; }
  .ed-doc__steps > li::before { width: 2rem; height: 2rem; font-size: 0.75rem; }
}
</style>
