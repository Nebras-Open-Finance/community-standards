<route lang="yaml">
meta:
  title: CMI — Bank Service Initiation User Experience
  next: false
  prev: false
  aside: false
</route>

<script setup lang="ts">
interface CmiExample {
  num: number
  title: string
  src: string
}

const examples: CmiExample[] = [
  {
    num: 1,
    title: 'Payments Active Consents',
    src: '/images/user-experience/consent-management-interface/3.png',
  },
  {
    num: 2,
    title: 'Payments History Tab — Revoked Consent',
    src: '/images/user-experience/consent-management-interface/4.png',
  },
]
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          TPP &middot; CMI &middot; Bank Service Initiation &middot; UX
        </div>
        <h1 class="ed-doc__title">
          Bank Service Initiation &mdash; User Experience
          <span class="ed-doc__read">2 min read</span>
        </h1>
        <p class="ed-doc__lede">
          The TPP Consent Management Interface for Bank Service Initiation (payment) consents. Users
          see their single payments and Flexi Pay (multi-payment) permissions, the payer and payee
          details, and can pause, reactivate, or cancel an active permission at any time.
        </p>
        <p class="ed-doc__lede ed-doc__lede--tight">
          While you may adapt visual elements such as colour palette, fonts, and styling to align
          with your brand, you must not alter the meaning, clarity, or completeness of the consent
          management content. The representation of <strong>AlTareq</strong> &mdash; including
          logos, naming, and action buttons &mdash; must be preserved. Your Consent Management
          Interface must be submitted as part of <strong>CX certification</strong> prior to
          production, and any material changes to a production CMI must be re-submitted for review
          and approval.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="live-ui-preview"
      num="01"
      color="var(--at-teal)"
      eyebrow="Live UI Preview"
      title="AlTareq Connections &mdash; Payments view"
      tone="cream"
    >
      <EdProse>
        The component below shows the AlTareq Connections page filtered to payment consents. Tap
        any consent card to open its details and manage it.
      </EdProse>

      <ClientOnly>
        <div class="ed-doc__previews">
          <figure class="ed-doc__preview">
            <ConsentManagementConnections mode="payments" />
          </figure>
        </div>
      </ClientOnly>

      <h3 class="ed-doc__sub">Configure simulated consents and watch the preview respond</h3>
      <EdProse>
        Use the editor below to add, remove, and adjust the simulated consents. Every change is
        reflected immediately in the preview above.
      </EdProse>
      <ConsentConnectionsEditor mode="payments" />
    </EdSectionBand>

    <EdSectionBand
      id="example-screenshots"
      num="02"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Examples"
      title="Example screens"
      tone="surface"
    >
      <div class="ed-doc__examples">
        <figure
          v-for="ex in examples"
          :key="ex.num"
          class="ed-doc__example"
        >
          <figcaption class="ed-doc__example-caption">
            <span class="ed-doc__example-num">Example {{ ex.num }}</span>
            <span class="ed-doc__example-title">{{ ex.title }}</span>
          </figcaption>
          <ImageViewer :src="ex.src" :alt="ex.title" />
        </figure>
      </div>
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
  font-size: 1.05rem;
  line-height: 1.65;
  margin: 1.75rem 0 0;
  max-width: 70rem;
  color: var(--at-mute-2);
}
.ed-doc__lede--tight { margin-top: 1.25rem; }
.ed-doc__lede :deep(strong) { color: var(--at-navy-deep); font-weight: 600; }

.ed-doc__sub {
  font-family: var(--at-serif);
  font-size: 1.2rem;
  font-weight: 600;
  letter-spacing: -0.015em;
  color: var(--at-navy-deep);
  margin: 2.5rem 0 0.85rem;
}

.ed-doc__previews {
  display: flex;
  flex-wrap: wrap;
  gap: 2.5rem;
  justify-content: center;
  margin-top: 1.5rem;
}
.ed-doc__preview {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.85rem;
  margin: 0;
}
.ed-doc__preview-caption {
  width: 100%;
  max-width: 360px;
  text-align: center;
  padding: 0.55rem 0.85rem;
  background: var(--cmi-caption-color, var(--at-navy-deep));
  border: 1px solid var(--cmi-caption-color, var(--at-grid-line));
  font-family: var(--at-mono);
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-bg-cream);
  line-height: 1.4;
  box-sizing: border-box;
}

.ed-doc__examples {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  margin-top: 1rem;
}
.ed-doc__example {
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}
.ed-doc__example-caption {
  display: flex;
  align-items: baseline;
  gap: 0.85rem;
  flex-wrap: wrap;
  padding-bottom: 0.65rem;
  border-bottom: 1px solid var(--at-grid-line);
}
.ed-doc__example-num {
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-teal-deep);
}
.ed-doc__example-title {
  font-family: var(--at-serif);
  font-size: 1.05rem;
  font-weight: 600;
  letter-spacing: -0.015em;
  color: var(--at-navy-deep);
}

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
  .ed-doc__examples { gap: 2rem; }
}
</style>
