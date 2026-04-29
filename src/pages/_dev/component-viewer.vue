<script setup lang="ts">
// Rolling review page used during the .md migration. As each component is
// signed off, replace the body of this page with the next component being
// reviewed. The route stays stable at /_dev/component-viewer.
//
// Components are auto-registered via unplugin-vue-components — no imports.
//
// Signed off so far:
//   - APIFlowViewer                    (2026-04-27)
//   - ImageViewer                      (2026-04-27)
//   - Carousel                         (2026-04-27)
//   - FormInput                        (2026-04-27)
//   - FormInputPhoneNumber             (2026-04-27)
//   - OnboardingAdminForm              (2026-04-27)
//   - InfoTooltip                      (2026-04-27)
//   - TPPPostmanScriptBuilder          (2026-04-27)
//   - AccountEditor                    (2026-04-27)
//   - ConsentConnectionsEditor         (2026-04-27)
//   - EditableJson                     (2026-04-27)
//   - PermissionsReference             (2026-04-27)
//   - ServiceInitiationPermissionText  (2026-04-27)
//   - COPPiiBlock                      (2026-04-27)
//   - OnboardingOrganisationForm       (2026-04-27)
//   - WordDocDownload                  (2026-04-27)
//   - ConsentAuthLayout                (2026-04-27)
</script>

<template>
  <main class="page">
    <header class="page__hero">
      <span class="page__eyebrow">
        <span class="page__eyebrow-dash" />
        Component review
      </span>
      <h1 class="page__title">ConsentAuthLayout</h1>
      <p class="page__lede">
        Re-review with realistic content slotted in. Left panel hosts a TPP
        consent screen mock; right panel hosts the matching LFI authorisation
        screen. The teal connector node + dashed rails sit between them on
        wide viewports to signal the cross-party authentication hop.
      </p>
    </header>

    <section class="page__body">

      <h2 class="page__h2">Bank Data Sharing</h2>
      <p class="page__note">
        Real <code>ConsentBankDataSharing</code> + <code>AuthorizationBankDataSharing</code>
        mocks slotted into the layout. Swap to <code>ConsentSingleInstantPayment</code> /
        <code>AuthorizationSingleInstantPayment</code> below to see the
        payment-flow variant.
      </p>
      <ConsentAuthLayout>
        <template #consent><ConsentBankDataSharing /></template>
        <template #auth><AuthorizationBankDataSharing /></template>
      </ConsentAuthLayout>

      <h2 class="page__h2">Single Instant Payment</h2>
      <p class="page__note">
        Same chrome, different mock pair. Confirms the layout adapts to
        whatever content the slots receive.
      </p>
      <ConsentAuthLayout>
        <template #consent><ConsentSingleInstantPayment /></template>
        <template #auth><AuthorizationSingleInstantPayment /></template>
      </ConsentAuthLayout>

    </section>
  </main>
</template>

<style scoped>
.page {
  font-family: var(--at-sans);
  color: var(--at-navy-deep);
  background: var(--at-surface);
  min-height: 100vh;
}

.page__hero {
  background: var(--at-bg-cream);
  border-bottom: 1px solid var(--at-grid-line);
  padding: 3rem 2rem 2.5rem;
  max-width: var(--at-page-max);
  margin: 0 auto;
}

.page__eyebrow {
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--at-teal-deep);
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 1rem;
}
.page__eyebrow-dash { width: 22px; height: 1px; background: currentColor; }

.page__title {
  font-family: var(--at-serif);
  font-size: clamp(2.25rem, 4.5vw, 3rem);
  font-weight: 600;
  line-height: 1.05;
  letter-spacing: -0.03em;
  margin: 0;
  color: var(--at-navy-deep);
}

.page__lede {
  font-family: var(--at-serif);
  font-size: 1.15rem;
  line-height: 1.55;
  color: var(--at-navy-deep);
  margin: 1.25rem 0 0;
  max-width: 50rem;
}
.page__lede code,
.page__note code {
  font-family: var(--at-mono);
  font-size: 0.86em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  color: var(--at-navy-deep);
  padding: 0.08em 0.4em;
}

.page__body {
  max-width: var(--at-page-max);
  margin: 0 auto;
  padding: 2.5rem 2rem 4rem;
}

.page__h2 {
  font-family: var(--at-serif);
  font-size: 1.4rem;
  font-weight: 600;
  letter-spacing: -0.015em;
  color: var(--at-navy-deep);
  margin: 3rem 0 0.5rem;
}
.page__h2:first-of-type { margin-top: 0; }

.page__note {
  font-family: var(--at-sans);
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--at-mute-2);
  margin: 0 0 1rem;
  max-width: 50rem;
}

@media (max-width: 720px) {
  .page__hero { padding: 2rem 1.25rem 1.75rem; }
  .page__body { padding: 2rem 1.25rem 3rem; }
}
</style>
