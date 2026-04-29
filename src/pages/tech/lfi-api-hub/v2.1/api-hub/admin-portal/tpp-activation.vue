<route lang="yaml">
meta:
  title: TPP Management & Activation
</route>

<script setup lang="ts">
interface CarouselImage { src: string; alt: string; title: string }

const images1: CarouselImage[] = [
  { src: new URL('/images/ozone/admin-portal/1.png', import.meta.url).href, alt: 'Step 1', title: 'Go to TPP Management > TPP List > Click on the TPP name. If it is not active, click Activate.' },
  { src: new URL('/images/ozone/admin-portal/2.png', import.meta.url).href, alt: 'Step 2', title: 'Click on the Activate TPP button' },
  { src: new URL('/images/ozone/admin-portal/3.png', import.meta.url).href, alt: 'Step 3', title: 'Click on Activate TPP to confirm' },
]

const images2: CarouselImage[] = [
  { src: new URL('/images/ozone/admin-portal/4.png', import.meta.url).href, alt: 'Step 1', title: 'Go to TPP Management > Software Statement > Click on the Software Statement name. If it is not active, click Activate.' },
  { src: new URL('/images/ozone/admin-portal/5.png', import.meta.url).href, alt: 'Step 2', title: 'Click on the Activate button' },
  { src: new URL('/images/ozone/admin-portal/6.png', import.meta.url).href, alt: 'Step 3', title: 'Click on Activate to confirm' },
]

const images3: CarouselImage[] = [
  { src: new URL('/images/ozone/admin-portal/7.png', import.meta.url).href, alt: 'Step 1', title: 'Go to TPP Management > Clients > Click on the Client name. If it is not active, click Activate.' },
  { src: new URL('/images/ozone/admin-portal/8.png', import.meta.url).href, alt: 'Step 2', title: 'Click on the Activate button' },
  { src: new URL('/images/ozone/admin-portal/9.png', import.meta.url).href, alt: 'Step 3', title: 'Click on Activate to confirm' },
]
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          LFI · API Hub · Admin Portal · TPP Management
        </div>
        <h1 class="ed-doc__title">
          TPP Management &amp; Activation
          <span class="ed-doc__read">3 min read</span>
        </h1>
        <p class="ed-doc__lede">
          The <strong>TPP Management</strong> section of the Admin Portal is where you manage all TPPs that
          have registered with your API Hub. It contains three sub-sections: <strong>TPP List</strong>,
          <strong>Software Statements</strong>, and <strong>Clients</strong>.
        </p>
        <p class="ed-doc__lede ed-doc__lede--tight">
          All three levels &mdash; TPP, software statement, and client &mdash; MUST be active for a TPP to
          make API requests. If any one of the three is blocked, the TPP's requests will be rejected.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="viewing-tpps"
      num="01"
      color="var(--at-teal)"
      eyebrow="Viewing registered TPPs"
      title="Browse the TPP list"
      tone="cream"
    >
      <EdProse>
        The TPP List shows every TPP organisation that has registered with your API Hub. Each TPP entry
        represents an organisation from the Trust Framework. A single TPP organisation may have multiple
        software statements (applications) and multiple clients.
      </EdProse>

      <EdNote type="info" title="Nebras and Ozone internal clients">
        <p>
          You will see TPP entries for <strong>Nebras</strong> and <strong>Ozone</strong> with active
          clients against them. These are used internally to validate and monitor your API Hub &mdash;
          they MUST remain active. If any of these clients' requests are causing issues, contact Nebras
          before blocking them.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="activating-tpp"
      num="02"
      color="var(--at-gold)"
      eyebrow="Activating a TPP"
      title="Three steps in strict order"
      tone="surface"
    >
      <EdProse>
        After a TPP has registered with you &mdash; after the <code>/tpp-registration</code> endpoint is
        called successfully (for detail on how a TPP registers, see
        <a href="/tech/tpp-standards/registration/api-guide">Registration API Guide</a>) &mdash; the TPP is
        not automatically granted access. The LFI MUST activate the TPP within the Admin Portal for access
        to be granted.
      </EdProse>

      <EdProse>
        The activation is done in three steps and <strong>MUST be performed in this order.</strong>
      </EdProse>

      <h3>Step 1 &mdash; Activate the TPP</h3>
      <ClientOnly>
        <Carousel :images="images1" />
      </ClientOnly>

      <h3>Step 2 &mdash; Activate the Software Statement</h3>
      <ClientOnly>
        <Carousel :images="images2" />
      </ClientOnly>

      <h3>Step 3 &mdash; Activate the Client</h3>
      <ClientOnly>
        <Carousel :images="images3" />
      </ClientOnly>
    </EdSectionBand>

    <EdSectionBand
      id="blocking-tpp"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Blocking a TPP"
      title="Block at TPP, software statement, or client level"
      tone="cream"
    >
      <EdProse>
        In certain circumstances, Nebras may instruct an LFI to block a TPP &mdash; for example, if a TPP
        is consistently sending malformed requests and is unresponsive to communications. Blocking can be
        applied at any of the three levels:
      </EdProse>

      <EdBullets>
        <li><strong>Block the client</strong> &mdash; immediately stops requests from that specific client</li>
        <li><strong>Block the software statement</strong> &mdash; stops all clients under that software statement</li>
        <li><strong>Block the TPP</strong> &mdash; stops all software statements and clients for the entire TPP organisation</li>
      </EdBullets>

      <EdProse>
        To block, navigate to the relevant entity (TPP, software statement, or client), open its detail
        page, and click <strong>Block</strong>.
      </EdProse>

      <EdProse>
        To restore access, open the blocked entity and click <strong>Activate</strong>.
      </EdProse>

      <EdNote type="warning" title="Do not block without instruction">
        <p>
          Do NOT block a TPP, software statement, or client without explicit instruction from Nebras. If
          you observe issues with a specific TPP's traffic, raise it with Nebras first. In cases where the
          Central Bank revokes a TPP's licence, Nebras will remove the TPP from the ecosystem centrally
          &mdash; no LFI action is required.
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
.ed-doc__lede--tight { margin-top: 1rem; }
.ed-doc__lede :deep(strong) { color: var(--at-navy-deep); font-weight: 600; }
.ed-doc__lede :deep(code) {
  font-family: var(--at-mono);
  font-size: 0.86em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  padding: 0.08em 0.4em;
}
.ed-doc__lede :deep(a) {
  color: var(--at-teal-deep);
  text-decoration: none;
  border-bottom: 1px solid currentColor;
}

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
}
</style>
