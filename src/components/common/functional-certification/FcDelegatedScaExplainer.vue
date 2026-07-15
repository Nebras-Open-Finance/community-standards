<script setup lang="ts">
// Explainer for the Delegated SCA Functional Certification (LFI side). Delegated
// SCA is the IsDelegatedAuthentication overlay on a payment consent — the TPP
// manages the controls, so it is evidenced through Creditor / Risk handling and
// the three beneficiary models rather than ControlParameters scenarios.
import type { FcDelegatedScaArea } from '@/data/functional-certification/types'

const props = defineProps<{ area: FcDelegatedScaArea }>()

const submissionPath = `/tech/lfi-api-hub/production/testing-certification/functional/${props.area.key}/submission`
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
          Functional Certification &mdash; {{ area.label }}
          <span class="ed-doc__read">3 min read</span>
        </h1>
        <p class="ed-doc__lede">
          {{ area.label }} is the <strong>delegated-authentication</strong> overlay on a payment consent,
          certified after Single Instant Payment. The consent carries
          <code>IsDelegatedAuthentication: true</code> with an empty <code>ConsentSchedule</code> — the
          <strong>TPP</strong> defines and manages the payment controls — so there is nothing to evidence
          about <code>ControlParameters</code>. Instead you evidence the payment limit you enforce, your
          Creditor / Risk handling, and one authorised consent for each beneficiary model. This page
          explains the evidence; the portal then builds your submission.
        </p>
        <div class="ed-doc__cta">
          <a class="ed-doc__cta-btn" :href="submissionPath">
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
      title="Evidence for delegated authentication"
      tone="cream"
    >
      <EdProse>
        Under Delegated SCA the customer authorises a consent that hands control of the payments to the
        TPP: <code>IsDelegatedAuthentication</code> is <code>true</code> and the
        <code>ConsentSchedule</code> is empty. Because the TPP sets and manages the controls, your LFI has
        no <code>ControlParameters</code> to store, display, or enforce — so unlike the six Multi-Payment
        types there are no control-parameter scenarios. See the
        <a :href="area.docHref">{{ area.label }} API guide</a> for the delegated-authentication model.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="evidence"
      num="02"
      color="var(--at-gold)"
      eyebrow="What you evidence"
      title="Payment limit, Creditor &amp; Risk, and beneficiary models"
      tone="surface"
    >
      <EdProse>
        {{ area.label }} certification collects three things:
      </EdProse>
      <EdBullets>
        <li>
          <strong>Payment limit</strong> — the maximum AED a single Delegated SCA payment can take on your
          LFI. The TPP manages the consent controls, but your own institutional limit still applies.
        </li>
        <li>
          <strong>Creditor validation &amp; Risk handling</strong> — the Creditor arrives inside the
          encrypted <code>PersonalIdentifiableInformation</code>, so you evidence decrypting it and
          validating the creditor, and that the cleartext <code>Risk</code> object (AERisk) is used in your
          screening. This is the same evidence as Single Instant Payment, re-captured because it may differ
          slightly under delegation.
        </li>
        <li>
          <strong>Beneficiary models</strong> — one authorised pre-production consent for each of
          <strong>Single</strong> (one creditor), <strong>Multiple</strong> (2–10 fixed creditors) and
          <strong>Open</strong> (no creditor fixed at consent; supplied at <code>POST /payments</code>),
          each with the <code>ConsentId</code> and the authorization screen the customer saw.
        </li>
      </EdBullets>

      <EdNote type="note" title="Single Instant Payment first">
        <p>
          {{ area.label }} builds on Single Instant Payment. You will be asked for the JIRA ticket of your
          completed Single Instant Payment certification, so have it to hand.
        </p>
      </EdNote>

      <EdNote type="note" title="Advertise your beneficiary models">
        <p>
          To accept the Multiple and Open beneficiary models you must advertise support for each on your
          Trust Framework authorisation-server entry. The portal shows a reference decrypted PII for each
          model. See the <a :href="area.creditorDocHref">Creditor PII page</a> for the model definitions.
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
        When you have filled in the form and attached your screenshots, the portal generates a single ZIP
        containing a summary document and every screenshot. Attach it to a
        <a href="/support-service-desk">Service Desk</a> certification-evidence ticket. Nothing is sent
        anywhere until you attach it — the submission is built entirely in your browser.
      </EdProse>

      <div class="ed-doc__cta">
        <a class="ed-doc__cta-btn" :href="submissionPath">
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
  color: #fff;
  background: var(--at-navy-deep);
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
