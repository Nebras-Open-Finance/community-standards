<route lang="yaml">
meta:
  title: Functional Evidence — Confirmation of Payee
</route>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          Testing &amp; Certification &middot; Functional Evidence
        </div>
        <h1 class="ed-doc__title">
          Functional Evidence &mdash; Confirmation of Payee
        </h1>
        <p class="ed-doc__lede">
          Documented evidence that your Confirmation of Payee proposition handles match outcomes,
          mismatch responses, and account-not-found cases correctly, and presents results to the customer in
          line with Nebras requirements.
        </p>
      </div>
    </section>

    <div class="ed-doc__intro">
      <div class="ed-doc__inner">
        <CertificationTicketBanner cert-type="TPP Functional Certification Evidence" />
      </div>
    </div>

    <div class="ed-doc__inner">
      <EdNote type="note" title="Coming soon">
        <p>
          The Functional Evidence template for Confirmation of Payee is being prepared. In the meantime,
          refer to the
          <a href="/tech/tpp-standards/production/testing-certification/functional/bank-data-sharing">Bank Data Sharing
          template</a> for the structure your submission will follow, and contact the Open Finance team
          via the <a href="/support-service-desk">Service Desk</a> if you need to submit Confirmation of
          Payee evidence before this page is published.
        </p>
      </EdNote>
    </div>
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

.ed-doc__intro { background: var(--at-bg-cream); border-bottom: 1px solid var(--at-grid-line); }
.ed-doc__intro .ed-doc__inner { padding: 2rem 2rem 2.5rem; }

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

.ed-doc__lede {
  font-family: var(--at-sans);
  font-size: 1.1rem;
  line-height: 1.65;
  margin: 1.75rem 0 0;
  max-width: 50rem;
  color: var(--at-mute-2);
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
