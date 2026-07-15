<route lang="yaml">
meta:
  title: Functional Certification — Single Instant Payment
  isIndex: true
</route>

<script setup lang="ts">
import { singleInstantPaymentArea } from '@/data/functional-certification/single-instant-payment'
import { CURRENT_VERSION } from '@/data/versions'

const railLabels = singleInstantPaymentArea.rails.map((r) => r.label).join(', ')
const sampleBaseUrl = singleInstantPaymentArea.tppBaseUrlTemplate
  .replace('{LFICODE}', 'LFICODE')
  .replace('{VERSION}', CURRENT_VERSION)
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
          Functional Certification &mdash; Single Instant Payment
          <span class="ed-doc__read">4 min read</span>
        </h1>
        <p class="ed-doc__lede">
          Functional Certification proves that your Ozone Connect Single Instant Payment implementation
          executes a payment correctly end to end: it selects the right rail, reaches the correct
          terminal status for that rail, propagates status to the Consent Manager Payment Log, decrypts
          and validates the Creditor, consumes the Risk object, and honours the account, balance, and
          refund reads a payment consent can carry. This page explains what the evidence is and how to
          produce it; the portal then builds your submission for you.
        </p>
        <div class="ed-doc__cta">
          <a class="ed-doc__cta-btn" href="/tech/lfi-api-hub/production/testing-certification/functional/single-instant-payment/submission">
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
      title="Evidence that a single instant payment executes correctly"
      tone="cream"
    >
      <EdProse>
        Single Instant Payment is the first of the seven UAE Open Finance payment types, and each type
        is certified separately. Your Ozone Connect
        <code>POST /payments</code> returns <code>201</code> with status <code>Pending</code>; your LFI
        then executes the payment on a rail and PATCHes the terminal status to the
        <a :href="singleInstantPaymentArea.paymentStatusDocHref">Consent Manager Payment Log</a>. Because
        your LFI is the only party that sees the raw rail outcome, Functional Certification proves that
        each supported rail reaches the correct terminal status, that timing and rejection are handled,
        and that the encryption-model steps — decrypting the Creditor and consuming the Risk object —
        are performed. All evidence must come from the
        <a :href="singleInstantPaymentArea.sandboxEvidenceHref">AlTareq Model Bank</a> sandbox.
      </EdProse>
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
        You choose the version and segments (Retail / SME / Corporate), declare the rails you support
        ({{ railLabels }}), and state your payment limit. Then have the following ready:
      </EdProse>

      <EdBullets>
        <li>
          <strong>Testing Tool output</strong> &mdash; one HTML report the Testing Tool produces for your
          Ozone Connect <code>POST /payments</code> endpoint, plus a Postman screenshot of a successful
          <code>POST /payments</code> returning <code>201 Pending</code>.
        </li>
        <li>
          <strong>Terminal status per rail</strong> &mdash; for each rail you declare, a Postman
          screenshot evidencing the terminal status it reaches (AANI &rarr;
          <code>AcceptedWithoutPosting</code>; Intra-bank and UAEFTS &rarr;
          <code>AcceptedCreditSettlementCompleted</code>).
        </li>
        <li>
          <strong>AANI timing &amp; a rejection</strong> &mdash; the <code>POST /payments</code>,
          rail-submission, and terminal-PATCH timestamps (with screenshots), and one example of an AANI
          rejection mapped to <code>Rejected</code> with an <code>AANI.&lt;code&gt;</code> reason.
        </li>
        <li>
          <strong>Creditor &amp; Risk</strong> &mdash; screenshots evidencing decryption of the payment
          PII, validation of the Creditor account, and that the Risk object is used in your screening.
        </li>
        <li>
          <strong>Account, balance &amp; refund reads</strong> &mdash; Postman screenshots of
          <code>GET /accounts</code> and <code>GET /accounts/{AccountId}/balances</code> before a
          payment, and <code>GET /payment-consents/{ConsentId}/refund</code> after one, on the same
          payment consent (<code>{{ sampleBaseUrl }}</code>), each with a screenshot of the
          authorisation page the customer authorised that consent on.
        </li>
        <li>
          <strong>Authorisation-screen scenarios</strong> &mdash; screenshots of your authorisation
          page, each with its pre-production ConsentId: the debtor account when the TPP specified it in
          the consent, and each Confirmation of Payee <code>NameMatchIndicator</code> &mdash;
          <code>ConfirmationOfPayee.Yes</code>, <code>ConfirmationOfPayee.Partial</code>, and
          <code>ConfirmationOfPayee.No</code> &mdash; surfaced to the customer.
        </li>
      </EdBullets>

      <EdNote type="note" title="Identity comes from SSO">
        <p>
          Your organisation and name are taken from your Sandbox Trust Framework sign-in &mdash; you do
          not type them in. Sign in when the portal prompts you so your submission is attributed to your
          LFI.
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
        When you have filled in the form and attached your evidence, the portal generates a single ZIP
        containing a summary document, your Testing Tool report, and every screenshot, organised per
        evidence group. Attach that ZIP to a <a href="/support-service-desk">Service Desk</a>
        certification-evidence ticket. Nothing is sent anywhere until you attach it &mdash; the
        submission is built entirely in your browser.
      </EdProse>

      <div class="ed-doc__cta">
        <a class="ed-doc__cta-btn" href="/tech/lfi-api-hub/production/testing-certification/functional/single-instant-payment/submission">
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
