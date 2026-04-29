<route lang="yaml">
meta:
  title: Production Live Proving
</route>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          Production &middot; Live Proving
        </div>
        <h1 class="ed-doc__title">
          Production Live Proving
          <span class="ed-doc__read">2 min read</span>
        </h1>
        <p class="ed-doc__lede">
          Once all certification requirements have been met, TPPs enter the
          <strong>Production Proving Phase</strong> &mdash; a controlled live period where the TPP's
          integration is validated against real production infrastructure before being opened to all
          customers and LFIs.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="buddying"
      num="01"
      color="var(--at-teal)"
      eyebrow="The Buddying Phase"
      title="Validate against a small set of buddy LFIs first"
      tone="cream"
    >
      <EdProse>
        During Production Proving, each TPP is paired with a small set of <strong>buddy LFIs</strong>
        (Authorization Servers). Testing in production is restricted to these buddied LFIs only &mdash;
        the TPP must not make production requests to any LFI or Authorization Server outside of its
        assigned buddy set during this phase.
      </EdProse>

      <EdProse>
        This pairing allows the TPP to validate its end-to-end use case in a controlled real-world
        environment, with LFI teams available to support and investigate any issues that arise.
      </EdProse>

      <EdProse>
        <strong>Expected duration:</strong> 2 weeks to 1 month, depending on the complexity of the
        integration and the number of use cases being validated.
      </EdProse>

      <EdNote type="info" title="Only test users during live proving">
        <p>
          During the buddying phase, all testing must be conducted using <strong>test users only</strong>.
          Real customer accounts must not be used until go-live approval has been granted.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="commercial"
      num="02"
      color="var(--at-gold)"
      eyebrow="Commercial Model"
      title="Live proving is non-commercial"
      tone="surface"
    >
      <EdProse>
        The Production Proving Phase is <strong>non-commercial</strong>. None of the following apply
        until go-live approval is granted:
      </EdProse>

      <EdBullets>
        <li>API Hub fees</li>
        <li>LFI-to-TPP fees</li>
        <li>TPP-to-LFI commissions</li>
        <li>Any other commercial charges</li>
      </EdBullets>

      <EdProse>
        All commercial terms take effect only once Nebras grants go-live approval.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="go-live"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Applying for Go-Live"
      title="Sign-off opens production access to all LFIs and customers"
      tone="cream"
    >
      <EdProse>
        Once the TPP is satisfied that live proving has been completed successfully, it can apply to
        Nebras for <strong>go-live sign-off</strong>.
      </EdProse>

      <EdProse>Go-live approval allows the TPP to:</EdProse>

      <EdBullets>
        <li>Work with all production LFIs, not just the buddied set</li>
        <li>Open their service to all customers</li>
        <li>Operate under the full commercial model</li>
      </EdBullets>

      <EdProse>
        Nebras will review the TPP's live proving activity before granting approval.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="onboarding-new-lfis"
      num="04"
      color="var(--at-navy)"
      eyebrow="After Go-Live"
      title="Onboarding new LFIs after go-live"
      tone="surface"
    >
      <EdProse>
        Given the nature of Open Finance integrations &mdash; where each LFI operates its own
        Authorization Server with its own configuration, supported account types, and capabilities
        &mdash; <strong>each new LFI a TPP onboards requires its own validation period</strong>. TPPs
        should expect to spend time confirming that a newly integrated LFI behaves as expected for their
        use case before directing live customer traffic to it. This should be factored into integration
        and release planning.
      </EdProse>
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
.ed-doc__lede :deep(strong) { color: var(--at-navy-deep); font-weight: 600; }

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
}
</style>
