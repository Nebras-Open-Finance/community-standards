<route lang="yaml">
meta:
  title: CAAP - Pricing
</route>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          LFI · CAAP · Pricing
        </div>
        <h1 class="ed-doc__title">
          Pricing
          <span class="ed-doc__read">2 min read</span>
        </h1>
        <p class="ed-doc__lede">
          CAAP is a Nebras-operated service offered to LFIs as an alternative to building their own
          authentication, consent authorisation, and consent management interface. This page describes
          how CAAP is charged and what is included.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="commercials"
      num="01"
      color="var(--at-teal)"
      eyebrow="Commercial terms"
      title="To be confirmed"
      tone="cream"
    >
      <EdNote type="warning" title="Pricing not yet published">
        <p>
          CAAP commercial terms are being finalised between Nebras and the participating LFIs.
          This page is a placeholder; the published pricing will appear here once agreed. In the
          meantime, LFIs evaluating CAAP should contact Nebras via the Service Desk for an
          indicative quote.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="what-is-included"
      num="02"
      color="var(--at-gold)"
      eyebrow="What CAAP includes"
      title="Scope of the CAAP service"
      tone="surface"
    >
      <EdProse>
        For LFIs that adopt CAAP, the following are delivered by Nebras as part of the CAAP service:
      </EdProse>

      <EdBullets>
        <li>The end user-facing authentication and consent authorisation experience &mdash; web and (where applicable) mobile.</li>
        <li>The end user-facing consent management interface, including consent review and revocation.</li>
        <li>Integration with the API Hub&apos;s <a href="/tech/lfi-api-hub/v2.2-draft/api-hub/headless-heimdall/">Headless Heimdall</a> and <a href="/tech/lfi-api-hub/v2.2-draft/api-hub/consent-manager/">Consent Manager</a> &mdash; the LFI does not call these directly.</li>
        <li>Language and accessibility support for the CAAP screens.</li>
        <li>Operational support, monitoring, and incident management for the CAAP service.</li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="what-is-not-included"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="What CAAP does not include"
      title="Still the LFI's responsibility"
      tone="cream"
    >
      <EdProse>
        CAAP does not change the LFI&apos;s responsibility to deliver the Ozone Connect APIs that
        underpin the Open Finance services it offers to TPPs. The following remain in scope for the
        LFI regardless of whether CAAP is adopted:
      </EdProse>

      <EdBullets>
        <li>The Ozone Connect endpoints for <a href="/tech/lfi-api-hub/v2.2-draft/banking/data-sharing/">Bank Data Sharing</a>, <a href="/tech/lfi-api-hub/v2.2-draft/banking/service-initiation/">Bank Service Initiation</a>, <a href="/tech/lfi-api-hub/v2.2-draft/insurance/">Insurance Data Sharing</a>, Products &amp; Leads, Confirmation of Payee, and ATMs.</li>
        <li>The LFI&apos;s <a href="/tech/lfi-api-hub/v2.2-draft/consent-events">Consent Events</a> handlers for receiving consent lifecycle notifications from the API Hub.</li>
        <li>The new <strong>CAAP Operations</strong> endpoints documented in this section &mdash; user verification, registration, PII decryption, consent validation, and the CAAP-specific accounts and insurance policy GETs.</li>
        <li>Underlying LFI infrastructure: authentication systems, customer records, account systems, payment rails, fraud and risk checks.</li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="next-steps"
      num="04"
      color="var(--at-navy)"
      eyebrow="Next steps"
      title="Indicating CAAP adoption"
      tone="surface"
    >
      <EdProse>
        LFIs declare whether they intend to adopt CAAP when completing the
        <a href="/tech/lfi-api-hub/v2.2-draft/api-hub/onboarding/prerequisites">Prerequisites Questionnaire</a>.
        Reach out via the Service Desk to discuss commercials and the implementation plan for the
        CAAP Operations APIs.
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
.ed-doc__lede :deep(strong) { color: var(--at-navy-deep); font-weight: 600; }
.ed-doc__lede :deep(a) { color: var(--at-teal-deep); text-decoration: none; border-bottom: 1px solid currentColor; }
@media (max-width: 720px) { .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; } }
</style>
