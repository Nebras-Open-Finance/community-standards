<route lang="yaml">
meta:
  title: Functional Certification — Insurance Data Sharing
  isIndex: true
</route>

<script setup lang="ts">
import { insuranceDataSharingTppArea } from '@/data/functional-certification/insurance-data-sharing-tpp'

const consumableCount = insuranceDataSharingTppArea.endpoints.filter((e) => e.tppPath).length
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
          Functional Certification &mdash; Insurance Data Sharing
          <span class="ed-doc__read">3 min read</span>
        </h1>
        <p class="ed-doc__lede">
          Functional Certification proves that your proposition consumes Insurance Data Sharing
          correctly: you request only the permissions your endpoints need, across the insurance sectors
          you support, and you can retrieve that policy data from the AlTareq Model Insurer. This page
          explains what evidence to gather; the portal then builds your submission for you.
        </p>
        <div class="ed-doc__cta">
          <a class="ed-doc__cta-btn" href="/tech/tpp-standards/production/testing-certification/functional/insurance-data-sharing/submission">
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
      title="Evidence that your proposition consumes the data correctly"
      tone="cream"
    >
      <EdProse>
        Functional Certification is one of the mandatory certification areas a TPP must satisfy before
        production access. For Insurance Data Sharing, it demonstrates that your consent requests only
        the permissions your proposition uses, that those permissions align to the endpoints you
        consume, and that you can retrieve the policy data from the
        <a :href="insuranceDataSharingTppArea.sandboxEvidenceHref">AlTareq Model Insurer</a> sandbox.
      </EdProse>

      <EdNote type="note" title="Premium sharing is certified separately">
        <p>
          This area certifies policy retrieval (<code>ReadInsurancePolicies</code>). Consuming the
          encrypted <code>Premium</code> field — a JWE gated by <code>ReadInsurancePremium</code> — has
          its own certification and is out of scope here.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="gather"
      num="02"
      color="var(--at-gold)"
      eyebrow="What you need"
      title="Gather this before you start"
      tone="surface"
    >
      <EdProse>
        The portal covers the {{ consumableCount }} Insurance Data Sharing endpoints available to TPPs —
        a policy-collection and a policy-by-id endpoint per sector. Have the following ready:
      </EdProse>

      <EdBullets>
        <li>
          <strong>Use case</strong> &mdash; a sentence or two on why you consume this data (for example,
          aggregating a customer’s motor and health policies to power a coverage-comparison product).
        </li>
        <li>
          <strong>Your consent (RAR object)</strong> &mdash; the <code>authorization_details</code>
          object you send at <code>/par</code>, and confirmation that its per-sector permissions align
          to the endpoints you consume.
        </li>
        <li>
          <strong>Postman evidence</strong> &mdash; for each endpoint you consume, a screenshot showing
          you retrieved that policy data from the sandbox Model Insurer.
        </li>
      </EdBullets>

      <EdNote type="note" title="Identity comes from SSO">
        <p>
          Your organisation and name are taken from your Sandbox Trust Framework sign-in — you do not
          type them in. Sign in when the portal prompts you so your submission is attributed correctly.
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
        When you have filled in the form and attached your screenshots, the portal generates a single
        ZIP containing a summary document and every screenshot, organised per endpoint. Attach that ZIP
        to a Service Desk ticket with the Certification Type
        <strong>&ldquo;{{ insuranceDataSharingTppArea.certType }}&rdquo;</strong>. Nothing is sent
        anywhere until you attach it — the submission is built entirely in your browser.
      </EdProse>

      <div class="ed-doc__cta">
        <a class="ed-doc__cta-btn" href="/tech/tpp-standards/production/testing-certification/functional/insurance-data-sharing/submission">
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
.ed-doc__lede :deep(a) {
  color: var(--at-teal-deep);
  text-decoration: none;
  border-bottom: 1px solid currentColor;
}

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
