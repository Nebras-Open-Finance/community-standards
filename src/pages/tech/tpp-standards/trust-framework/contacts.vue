<route lang="yaml">
meta:
  title: Trust Framework — Contacts
</route>

<script setup lang="ts">
interface CarouselImage { src: string; alt: string; title: string }

const images1: CarouselImage[] = [
  { src: new URL('/images/raidiam/add-contact/1.png', import.meta.url).href, alt: 'Step 1', title: 'Contacts Section' },
  { src: new URL('/images/raidiam/add-contact/2.png', import.meta.url).href, alt: 'Step 2', title: 'Add Contact' },
]
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          TPP · Trust Framework · Contacts
        </div>
        <h1 class="ed-doc__title">
          Contacts
          <span class="ed-doc__read">2 min read</span>
        </h1>
        <p class="ed-doc__lede">
          Organisation Contacts allow Organisations to register specific personnel contact information
          within the Trust Framework, ensuring that participants from other Organisations can easily reach
          the appropriate departments when needed.
        </p>

        <EdNote type="warning">
          <p>The contact details registered here are visible to other participants outside your organisation.</p>
        </EdNote>
      </div>
    </section>

    <EdSectionBand
      id="contact-types"
      num="01"
      color="var(--at-teal)"
      eyebrow="Contact Types"
      title="Each contact must be assigned one of these categories"
      tone="cream"
    >
      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><strong>Security</strong></td><td>Security incidents, vulnerability disclosures, and certificate issues</td></tr>
            <tr><td><strong>Billing</strong></td><td>Commercial and billing enquiries</td></tr>
            <tr><td><strong>Incident</strong></td><td>Operational incidents and service disruptions</td></tr>
            <tr><td><strong>Technical</strong></td><td>Technical integration and API support</td></tr>
            <tr><td><strong>Business</strong></td><td>General business and partnership enquiries</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>
        Each contact requires an <strong>email address</strong> and a <strong>phone number</strong>.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="adding"
      num="02"
      color="var(--at-gold)"
      eyebrow="Adding an Organisation Contact"
      title="Step-by-step in the Trust Framework portal"
      tone="surface"
    >
      <ol class="ed-doc__substeps">
        <li>Log in to the Trust Framework and navigate to your organisation.</li>
        <li>Navigate to the <strong>Contacts</strong> section of your organisation.</li>
        <li>Click <strong>+ New Contact</strong>.</li>
        <li>Select the Contact Type and enter the email address and phone number of the contact.</li>
        <li>Save the contact.</li>
      </ol>

      <ClientOnly>
        <Carousel :images="images1" />
      </ClientOnly>
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

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
}
</style>
