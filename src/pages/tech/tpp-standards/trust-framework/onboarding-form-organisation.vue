<route lang="yaml">
meta:
  title: Organisation Details Form
</route>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <a class="ed-doc__back" href="/tech/tpp-standards/trust-framework/onboarding">
          <span class="ed-doc__back-arrow" aria-hidden="true">&larr;</span>
          Onboarding
        </a>
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          TPP · Trust Framework · Onboarding
        </div>
        <h1 class="ed-doc__title">
          Organisation Details Form
          <span class="ed-doc__read">2 min read</span>
        </h1>
        <p class="ed-doc__lede">
          Complete this form and attach it to your
          <a href="/tech/tpp-standards/trust-framework/onboarding#requesting-sandbox-onboarding">sandbox onboarding request email</a>.
        </p>
      </div>
    </section>

    <section class="ed-doc__form-band">
      <div class="ed-doc__inner">
        <OnboardingOrganisationForm />
      </div>
    </section>
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

.ed-doc__back {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--at-mono);
  font-size: 0.7rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--at-mute-2);
  text-decoration: none;
  margin-bottom: 1.5rem;
  transition: color 0.15s ease;
}
.ed-doc__back:hover { color: var(--at-teal-deep); }
.ed-doc__back-arrow { font-size: 1rem; line-height: 1; }

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
.ed-doc__lede :deep(a) {
  color: var(--at-teal-deep);
  text-decoration: none;
  border-bottom: 1px solid currentColor;
}

.ed-doc__form-band {
  background: var(--at-surface);
  border-top: 1px solid var(--at-grid-line);
  padding: 3rem 0 4rem;
}
.ed-doc__form-band .ed-doc__inner { padding-top: 0; padding-bottom: 0; }

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
}
</style>
