<script setup lang="ts">
// Shared explainer for a Multi-Payment type Functional Certification. Driven by
// the area config so all six types render the same page from their own data.
import type { FcMultiPaymentArea } from '@/data/functional-certification/types'

const props = defineProps<{ area: FcMultiPaymentArea }>()

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
          {{ area.label }} is one of the six Multi-Payment types, certified after Single Instant
          Payment. Its certification is about the <strong>consent</strong>: you prove your LFI ingests,
          displays on its authorization screen, and will enforce the
          <code>ControlParameters</code> — both with every optional control set and with only the
          required minimum. This page explains the evidence; the portal then builds your submission.
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
      title="Evidence that your consent handling is correct"
      tone="cream"
    >
      <EdProse>
        A {{ area.label }} consent (<code>Type: {{ area.paymentType }}</code>) is a long-lived
        multi-payment consent whose <code>ControlParameters.ConsentSchedule.MultiPayment</code> carries
        the payment schedule and its limits. Your LFI does not decide these — the TPP sets them and the
        customer authorizes them — but you MUST store them, show them on your authorization screen, and
        enforce them on every payment. Certification proves this for two consents: one with every
        optional control parameter populated, and one with only the required minimum. See the
        <a :href="area.docHref">{{ area.label }} API guide</a> for the full model.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="controls"
      num="02"
      color="var(--at-gold)"
      eyebrow="Control parameters"
      title="Required and optional controls"
      tone="surface"
    >
      <EdProse>
        For {{ area.label }} the ControlParameters break down as:
      </EdProse>
      <EdBullets>
        <li><strong>Required (always present):</strong> {{ area.requiredControls.join(', ') }}.</li>
        <li><strong>Optional (set in one consent, omitted in the other):</strong> {{ area.optionalControls.join(', ') }}.</li>
      </EdBullets>
      <EdProse>
        You will provide, for each of the two consents, the pre-production <code>ConsentId</code>, the
        consent details (the <code>ControlParameters</code> / authorization_details), and a screenshot
        of the authorization screen the customer saw for that consent.
      </EdProse>

      <EdNote type="note" title="Single Instant Payment first">
        <p>
          {{ area.label }} builds on Single Instant Payment. You will be asked for the JIRA ticket of
          your completed Single Instant Payment certification, so have it to hand.
        </p>
      </EdNote>

      <EdNote v-if="area.beneficiaryModels?.length" type="note" title="Beneficiary models">
        <p>
          {{ area.label }} also accepts more than a single beneficiary. Alongside the control-parameter
          scenarios, you will evidence one consent for each beneficiary model —
          <strong>Multiple Beneficiaries</strong> (2–10 fixed creditors) and
          <strong>Open Beneficiaries</strong> (no creditor fixed at consent; the creditor is supplied at
          <code>POST /payments</code>). The portal shows a reference PII for each, and you must advertise
          support for each model in the Trust Framework.
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
        When you have filled in the form and attached your authorization-screen screenshots, the portal
        generates a single ZIP containing a summary document and every screenshot. Attach it to a
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
