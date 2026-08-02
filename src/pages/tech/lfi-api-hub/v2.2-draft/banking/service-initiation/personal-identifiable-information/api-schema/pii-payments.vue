<route lang="yaml">
meta:
  title: PII Schema — Payments (Ozone Connect)
</route>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          LFI &middot; Service Initiation &middot; PII &middot; Schema
        </div>
        <h1 class="ed-doc__title">
          PII Schema &mdash; Payments (Ozone Connect)
        </h1>
        <p class="ed-doc__lede">
          The schema below shows the full structure of the decrypted
          <code>PersonalIdentifiableInformation</code> payload as received with a <strong>payment
          instruction</strong> via Ozone Connect. This is the PII the LFI MUST decrypt and validate
          before processing a payment.
        </p>
        <p class="ed-doc__lede">
          At this stage, <code>DebtorAccount</code> is absent &mdash; the debtor account was fixed
          during consent authorisation. The creditor fields sit directly on <code>Initiation</code>
          as a single creditor (not inside an array). See the <a href="../">Overview</a> for
          decryption steps.
        </p>
      </div>
    </section>

    <section class="ed-doc__schema">
      <div class="ed-doc__inner">
        <RedocWrapper
          spec="/openapi/v2.2-draft/ozone-connect/uae-ozone-connect-bank-service-initiation-openapi.yaml"
          filterSchema="AEBankServiceInitiation.AEDomesticPaymentPIIProperties"
          displayPath="/payment.PersonalIdentifiableInformation"
        />
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
.ed-doc__lede :deep(code) {
  font-family: var(--at-mono);
  font-size: 0.86em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  padding: 0.08em 0.4em;
}
.ed-doc__lede :deep(a) {
  color: var(--at-navy-deep);
  text-decoration: underline;
  text-underline-offset: 3px;
}
.ed-doc__lede :deep(a:hover) { color: var(--at-teal-deep); }

.ed-doc__schema { padding-bottom: 4rem; }

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
}
</style>
