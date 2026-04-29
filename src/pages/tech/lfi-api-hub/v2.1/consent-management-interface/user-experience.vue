<route lang="yaml">
meta:
  title: Consent Management Interface - User Experience
  next: false
  prev: false
  aside: false
</route>

<script setup lang="ts">
interface CmiPreview {
  label: string
  mode: 'all' | 'data-sharing' | 'payments'
  headerColor: string
}

const previews: CmiPreview[] = [
  { label: 'LFI Connections (Data Sharing and Payments)', mode: 'all', headerColor: 'var(--at-navy-deep)' },
  { label: 'LFI Connections (Data Sharing)', mode: 'data-sharing', headerColor: 'var(--at-teal-deep)' },
  { label: 'LFI Connections (Payments)', mode: 'payments', headerColor: 'var(--at-gold)' },
]

interface CmiExample {
  num: number
  title: string
  src: string
}

const examples: CmiExample[] = [
  {
    num: 1,
    title: 'Dashboard with Consents in use, Consent Details and List of Updates',
    src: '/images/user-experience/consent-management-interface/lfi/1.png',
  },
  {
    num: 2,
    title: 'Dashboard with History of Consents and Consent Details',
    src: '/images/user-experience/consent-management-interface/lfi/2.png',
  },
  {
    num: 3,
    title: 'Dashboard with Consents in use, Consent Details and Payment History',
    src: '/images/user-experience/consent-management-interface/lfi/3.png',
  },
  {
    num: 4,
    title: 'Dashboard with Consents in use, Consent Details and List of Updates',
    src: '/images/user-experience/consent-management-interface/lfi/4.png',
  },
  {
    num: 5,
    title: 'Dashboard with History of Consents, Consent Details and Payment History',
    src: '/images/user-experience/consent-management-interface/lfi/5.png',
  },
]

interface DiffRow {
  area: string
  tppCmi: string
  lfiCmi: string
}

const diffRows: DiffRow[] = [
  {
    area: 'Counterparty shown on each card',
    tppCmi: 'Cards show <strong>LFI names</strong> &mdash; the account providers the TPP is connected to.',
    lfiCmi: 'Cards show <strong>TPP names</strong> &mdash; the third party providers connected to the customer&rsquo;s accounts.',
  },
  {
    area: 'Pause / Reactivate',
    tppCmi: 'Customer may pause and later reactivate a consent through the TPP.',
    lfiCmi: 'No Pause or Reactivate &mdash; pausing is a TPP-only concept. The LFI surface offers Cancel only.',
  },
  {
    area: '&ldquo;How we are using your data&rdquo;',
    tppCmi: 'Each Data Sharing detail screen explains, in the TPP&rsquo;s own words, what the data will be used for.',
    lfiCmi: 'Not shown &mdash; the LFI does not consume the data and so cannot describe its purpose.',
  },
  {
    area: 'Subtitle wording',
    tppCmi: '&ldquo;The account providers we are connected to&hellip;&rdquo;',
    lfiCmi: '&ldquo;The third party providers connected to your accounts&hellip;&rdquo;',
  },
  {
    area: '&ldquo;Connect another account&rdquo; CTA',
    tppCmi: 'A primary CTA at the foot of the screen lets the customer start a new connection journey.',
    lfiCmi: 'Not shown &mdash; new connections are initiated from the TPP, not from inside the LFI app.',
  },
  {
    area: 'Empty-state copy',
    tppCmi: '&ldquo;You don&rsquo;t have any consents in this tab. Connect an account to get started.&rdquo;',
    lfiCmi: '&ldquo;You do not have any AlTareq connections in this tab.&rdquo; &mdash; no &ldquo;get started&rdquo; prompt, since the LFI does not initiate the connection.',
  },
]
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          LFI &middot; Consent Management Interface &middot; UX
        </div>
        <h1 class="ed-doc__title">
          Consent Management Interface &mdash; User Experience
          <span class="ed-doc__read">2 min read</span>
        </h1>
        <p class="ed-doc__lede">
          LFIs must provide a consent management interface where customers can see their existing
          connections to third party providers, review status, and manage active consent
          relationships.
        </p>
        <p class="ed-doc__lede ed-doc__lede--tight">
          While you may adapt visual elements such as colour palette, fonts, and styling to align
          with your brand, you must not alter the meaning, clarity, or completeness of the consent
          management content. The representation of <strong>AlTareq</strong> &mdash; including
          logos, naming, and action buttons &mdash; must be preserved. The customer must always be
          able to clearly understand what consents they have granted, what each consent permits,
          and that it is part of the AlTareq ecosystem. Your Consent Management Interface must be
          submitted as part of <strong>CX certification</strong> prior to production, and any
          material changes to a production CMI must be re-submitted for review and approval.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="live-ui-preview"
      num="01"
      color="var(--at-teal)"
      eyebrow="Live UI Preview"
      title="The LFI Connections page across three views"
      tone="cream"
    >
      <EdProse>
        The components below represent the LFI Connections page layout across three views:
        combined, data sharing only, and payments only. Tap any consent card to open its details
        and manage it.
      </EdProse>

      <ClientOnly>
        <div class="ed-doc__previews">
          <figure
            v-for="p in previews"
            :key="p.mode"
            class="ed-doc__preview"
            :style="{ '--cmi-caption-color': p.headerColor }"
          >
            <figcaption class="ed-doc__preview-caption">{{ p.label }}</figcaption>
            <ConsentManagementConnections
              v-if="p.mode === 'all'"
              perspective="lfi"
            />
            <ConsentManagementConnections
              v-else
              perspective="lfi"
              :mode="p.mode"
            />
          </figure>
        </div>
      </ClientOnly>

      <h3 class="ed-doc__sub">Configure simulated connections and watch the previews respond</h3>
      <EdProse>
        Use the editor below to add, remove, and adjust the simulated consents. Every change is
        reflected immediately in the three previews above.
      </EdProse>
      <ConsentConnectionsEditor />
    </EdSectionBand>

    <EdSectionBand
      id="example-screenshots"
      num="02"
      color="var(--at-gold)"
      eyebrow="Examples"
      title="Example Consent Management Interfaces"
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

    <EdSectionBand
      id="vs-tpp"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="How it differs from the TPP CMI"
      title="LFI CMI vs TPP CMI at a glance"
      tone="cream"
    >
      <EdProse>
        The LFI CMI is functionally similar to the
        <a href="/tech/tpp-standards/v2.1/consent/consent-management-interface/user-experience">TPP CMI</a>.
        The differences below reflect the fact that the LFI sees the relationship from the account
        provider&rsquo;s side rather than the third party provider&rsquo;s side.
      </EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Area</th>
              <th>TPP CMI</th>
              <th>LFI CMI</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in diffRows" :key="row.area">
              <td><strong v-html="row.area" /></td>
              <td v-html="row.tppCmi" />
              <td v-html="row.lfiCmi" />
            </tr>
          </tbody>
        </table>
      </EdRefTable>
    </EdSectionBand>
  </div>
</template>

<style scoped>
.ed-doc {
  --at-page-max: 1600px;
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

/* Sub-heading inside section bands */
.ed-doc__sub {
  font-family: var(--at-serif);
  font-size: 1.2rem;
  font-weight: 600;
  letter-spacing: -0.015em;
  color: var(--at-navy-deep);
  margin: 2.5rem 0 0.85rem;
}

/* Live UI previews — three CMI components side-by-side */
.ed-doc__previews {
  display: flex;
  flex-wrap: wrap;
  gap: 2.5rem;
  justify-content: space-around;
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

/* Example screenshots — captioned ImageViewer cards, stacked vertically */
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
  .ed-doc__previews { gap: 1.75rem; }
  .ed-doc__examples { gap: 2rem; }
}
</style>
