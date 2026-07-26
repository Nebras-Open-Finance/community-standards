<route lang="yaml">
meta:
  title: Functional Certification — Domestic Payments (TPP)
  isIndex: true
</route>

<script setup lang="ts">
import { domesticPaymentsTppArea as area } from '@/data/functional-certification/domestic-payments-tpp'

const typeCount = area.types.length
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          Testing &amp; Certification &middot; Functional Certification
        </div>
        <h1 class="ed-doc__title">
          Functional Certification &mdash; Domestic Payments
          <span class="ed-doc__read">4 min read</span>
        </h1>
        <p class="ed-doc__lede">
          Functional Certification proves that your TPP initiates domestic payments through the API Hub
          correctly. You tick the payment types you offer, and for each one provide the two objects your
          TPP is responsible for constructing — the <strong>Consent</strong>
          (<code>authorization_details</code>) you send at PAR and the <strong>Risk</strong>
          (<code>AERisk</code>) object you send for fraud scoring. You then evidence each type by
          <strong>making a payment against it on the sandbox Model Bank</strong> and attaching the Postman
          screenshot. This page explains the evidence; the portal then builds your submission for you.
        </p>
        <div class="ed-doc__cta">
          <a class="ed-doc__cta-btn" href="/tech/tpp-standards/production/testing-certification/functional/domestic-payments/submission">
            Start your submission
            <span class="ed-doc__cta-arrow">&nearr;</span>
          </a>
        </div>
      </div>
    </section>

    <EdSectionBand
      id="what"
      num="01"
      color="var(--at-teal)"
      eyebrow="What it is"
      title="Evidence that your payment initiation is correct"
      tone="cream"
    >
      <EdProse>
        Unlike the LFI side — which certifies one payment type per ticket — the TPP side is a single
        Domestic Payments submission covering every type you offer. All {{ typeCount }} UAE Open Finance
        domestic payment types are available: Single Instant Payment, the six Multi-Payment variants, and
        Delegated SCA. You are the party that constructs the consent and the risk signals, so
        certification is about those two objects and a payment made against them — all evidenced from the
        <a :href="area.sandboxEvidenceHref">AlTareq Model Bank</a> sandbox using the
        <a :href="area.postmanGuideHref">Postman collection</a>.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="gather"
      num="02"
      color="var(--at-gold)"
      eyebrow="What you provide"
      title="For each payment type you offer"
      tone="surface"
    >
      <EdBullets>
        <li>
          <strong>Consent object</strong> &mdash; the <code>authorization_details</code> (RAR) entry you
          send at <code>/par</code>, edited in a schema-validated JSON editor. Each type is pre-seeded
          with a valid consent shape you adapt to your proposition.
        </li>
        <li>
          <strong>Risk object</strong> &mdash; the <code>AERisk</code> object you send for fraud scoring,
          also edited against the schema.
        </li>
        <li>
          <strong>A payment against that consent</strong> &mdash; a Postman screenshot of a
          <code>POST /payments</code> made against a consent of that type on the Model Bank.
        </li>
      </EdBullets>

      <EdNote type="note" title="Delegated SCA">
        <p>
          If you certify <strong>Delegated SCA</strong> (<code>IsDelegatedAuthentication: true</code>),
          you perform the customer authentication yourself before each payment. You additionally upload a
          screenshot of that authentication and describe how it populates the
          <code>Authentication</code> section of the Risk object &mdash;
          <code>Risk.DebtorIndicators.Authentication</code> (the factors used, the
          <code>ChallengeOutcome</code>, and the <code>AuthenticationFlow</code>).
        </p>
      </EdNote>

      <EdNote type="note" title="Accounts &amp; Balances, and Refunds">
        <p>
          A payment consent can also carry account and balance reads and a refund-account read. If your
          proposition uses them, tick the matching capability and evidence a balance read
          <strong>before</strong> the payment and a refund read <strong>after</strong> it, each with a
          Postman screenshot.
        </p>
      </EdNote>

      <EdNote type="note" title="Identity comes from SSO">
        <p>
          Your organisation and name are taken from your Sandbox Trust Framework sign-in &mdash; you do
          not type them in. Sign in when the portal prompts you so your submission is attributed to your
          TPP.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="generate"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="What you get"
      title="One ZIP to attach to your ticket"
      tone="cream"
    >
      <EdProse>
        When you have selected your types and attached your evidence, the portal generates a single ZIP
        containing a summary document, the Consent and Risk JSON for each type, and every screenshot.
        Attach that ZIP to a <a href="/support-service-desk">Service Desk</a>
        <strong>{{ area.certType }}</strong> ticket. Nothing is sent anywhere until you attach it &mdash;
        the submission is built entirely in your browser.
      </EdProse>

      <div class="ed-doc__cta">
        <a class="ed-doc__cta-btn" href="/tech/tpp-standards/production/testing-certification/functional/domestic-payments/submission">
          Start your submission
          <span class="ed-doc__cta-arrow">&nearr;</span>
        </a>
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
  font-size: 1.1rem;
  line-height: 1.65;
  margin: 1.75rem 0 0;
  max-width: 50rem;
  color: var(--at-mute-2);
}
.ed-doc__lede :deep(strong) { color: var(--at-navy-deep); font-weight: 600; }
.ed-doc__lede :deep(code) { font-family: var(--at-mono); font-size: 0.86em; background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream)); border: 1px solid var(--at-grid-line); padding: 0.08em 0.4em; }
.ed-doc__lede :deep(a) { color: var(--at-teal-deep); text-decoration: none; border-bottom: 1px solid currentColor; }

.ed-doc__cta { margin-top: 1.5rem; }
.ed-doc__cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-family: var(--at-sans);
  font-size: 1rem;
  font-weight: 600;
  color: var(--at-inverse-fg);
  background: var(--at-inverse-bg);
  text-decoration: none;
  padding: 0.85rem 1.8rem;
  transition: background 0.15s;
}
.ed-doc__cta-btn:hover { background: var(--at-teal-deep); }
.ed-doc__cta-arrow { font-weight: 400; }

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
}
</style>
