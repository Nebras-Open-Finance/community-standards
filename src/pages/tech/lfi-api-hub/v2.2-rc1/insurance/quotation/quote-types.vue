<route lang="yaml">
meta:
  title: Quote Types — New, Renewal, Switch
</route>

<script setup lang="ts">
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          Insurance &middot; Quotation &middot; Shared explainer
        </div>
        <h1 class="ed-doc__title">
          Quote Types
          <span class="ed-doc__read">4 min read</span>
        </h1>
        <p class="ed-doc__lede">
          Every quote request carries a <code>QuoteType</code> of <code>New</code>, <code>Renewal</code>,
          or <code>Switch</code>. The three values determine what data the TPP MUST supply, what the LFI
          MAY assume about the customer, and how the resulting policy relates to any prior policy.
          This page is the single source of truth referenced from both the LFI Integration Guide and
          TPP Standards.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="new"
      num="01"
      color="var(--at-teal)"
      eyebrow="QuoteType: New"
      title="New &mdash; first-time policy"
      tone="cream"
    >
      <EdProse>
        The customer has no existing policy of this sector that the quote is intended to replace or
        continue. The TPP supplies the customer\'s demographic and risk-relevant data inline; the LFI
        underwrites from scratch.
      </EdProse>

      <h3 class="ed-doc__subhead">What the TPP must supply</h3>
      <EdBullets>
        <li>
          A unique <code>QuoteReference</code> &mdash; TPP-generated, used by the TPP to thread the
          quote through its own systems. Distinct from <code>QuoteId</code>, which the LFI mints.
        </li>
        <li>
          Sector-specific risk data (vehicle for Motor, property address for Home, trip details for
          Travel, salary band for Health, etc.).
        </li>
        <li>
          Customer identifying data sufficient for the LFI to KYC and underwrite (Emirates ID, date
          of birth, etc.).
        </li>
      </EdBullets>

      <h3 class="ed-doc__subhead">What the LFI may assume</h3>
      <EdBullets>
        <li>No prior policy history with this LFI for this customer at this sector.</li>
        <li>
          The LFI MUST run its full new-business underwriting process &mdash; risk scoring, screening,
          pricing &mdash; from the supplied data alone.
        </li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="renewal"
      num="02"
      color="var(--at-gold, #b08800)"
      eyebrow="QuoteType: Renewal"
      title="Renewal &mdash; continuing with the same insurer"
      tone="surface"
    >
      <EdProse>
        The customer holds an existing policy with <strong>this LFI</strong> at the same sector and
        wishes to renew it. The TPP references the prior policy so the LFI can carry forward
        underwriting context (no-claims discount, established risk profile, customer history) rather
        than re-underwriting from scratch.
      </EdProse>

      <h3 class="ed-doc__subhead">What the TPP must supply</h3>
      <EdBullets>
        <li>
          The <code>InsurancePolicyId</code> of the prior policy at this LFI, retrieved through Insurance
          Data Sharing under a customer consent. The TPP MUST have held a valid consent at the time of
          the policy retrieval &mdash; the LFI MAY refuse to renew where it cannot evidence prior data
          sharing.
        </li>
        <li>
          Any data the customer wishes to update at renewal (address change, vehicle change,
          beneficiary update, etc.).
        </li>
        <li>
          The same <code>QuoteReference</code> shape as for <code>New</code>.
        </li>
      </EdBullets>

      <h3 class="ed-doc__subhead">What the LFI may assume</h3>
      <EdBullets>
        <li>The customer is already known &mdash; KYC may be lighter-touch.</li>
        <li>
          The prior policy\'s claims history, no-claims discount, and risk rating may be carried
          forward where appropriate.
        </li>
        <li>
          The LFI MAY decline to renew where its underwriting appetite has changed &mdash; <code>204</code>
          is the correct response, not a <code>201</code> with adverse pricing.
        </li>
      </EdBullets>

      <EdNote type="info" title="Renewal vs Switch">
        <p>
          <code>Renewal</code> always references a policy held at <strong>this LFI</strong>. If the
          customer is moving from a different insurer, the correct <code>QuoteType</code> is
          <code>Switch</code>.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="switch"
      num="03"
      color="var(--at-violet, #6d28d9)"
      eyebrow="QuoteType: Switch"
      title="Switch &mdash; moving from a different insurer"
      tone="cream"
    >
      <EdProse>
        The customer holds an existing policy at a <strong>different LFI</strong> (the incumbent) and
        wishes to move. The TPP supplies enough information about the incumbent policy for the LFI to
        price competitively and, where applicable, coordinate the switch (handing back NCD, avoiding
        double-coverage).
      </EdProse>

      <h3 class="ed-doc__subhead">What the TPP must supply</h3>
      <EdBullets>
        <li>
          The incumbent policy\'s details &mdash; insurer name, policy number, sums insured, premium,
          renewal date &mdash; retrieved through Insurance Data Sharing against the incumbent under a
          customer consent.
        </li>
        <li>
          The customer\'s demographic and risk data, the same way as for <code>New</code>. Switching
          does not exempt the new LFI from underwriting.
        </li>
        <li>
          Any switch-specific instructions (effective date, overlap window).
        </li>
      </EdBullets>

      <h3 class="ed-doc__subhead">What the LFI may assume</h3>
      <EdBullets>
        <li>
          Claims history from the incumbent is <strong>declared</strong>, not authoritative &mdash;
          the LFI MUST run its own screening and, where required, request additional declarations.
        </li>
        <li>
          The incumbent policy is not yet cancelled. The LFI MAY make policy issuance contingent on
          the customer cancelling the incumbent within the policy effective date.
        </li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="declining"
      num="04"
      color="var(--at-navy)"
      eyebrow="Declining to quote"
      title="When the LFI cannot fulfil the requested QuoteType"
      tone="surface"
    >
      <EdProse>
        If the LFI does not offer a particular combination of sector and quote type (e.g. switching is
        not supported for Travel, or the LFI does not renew expired policies older than 30 days), the
        Create Quote endpoint MUST return <code>204</code> with an empty body. <strong>Do not return
        <code>201</code> with no quotes</strong> &mdash; a <code>201</code> implies success and breaks
        the TPP\'s ability to surface a "no quote available" outcome cleanly to the customer.
      </EdProse>

      <EdProse>
        The set of supported sector + quote type combinations SHOULD be published in the LFI\'s Trust
        Framework metadata so TPPs can predict declines rather than discovering them via 204 responses.
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
  font-family: var(--at-mono); font-size: 0.68rem; letter-spacing: 0.18em;
  text-transform: uppercase; color: var(--at-teal); margin-bottom: 1.25rem;
  display: flex; align-items: center; gap: 0.75rem;
}
.ed-doc__eyebrow-dash { width: 24px; height: 1px; background: currentColor; }
.ed-doc__title {
  font-family: var(--at-serif); font-size: clamp(2.25rem, 5vw, 3.6rem);
  font-weight: 600; line-height: 1.02; letter-spacing: -0.03em; margin: 0;
  display: flex; align-items: baseline; flex-wrap: wrap; gap: 0.85rem;
}
.ed-doc__read {
  font-family: var(--at-mono); font-size: 0.7rem; letter-spacing: 0.1em;
  text-transform: uppercase; font-weight: 500; color: var(--at-mute);
  align-self: center; padding-left: 0.6rem; border-left: 1px solid var(--at-grid-line-2);
}
.ed-doc__lede {
  font-family: var(--at-sans); font-size: 1.1rem; line-height: 1.65;
  margin: 1.75rem 0 0; max-width: 50rem; color: var(--at-mute-2);
}
.ed-doc__lede :deep(code) {
  font-family: var(--at-mono); font-size: 0.86em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line); padding: 0.08em 0.4em;
}
.ed-doc__subhead {
  font-family: var(--at-serif); font-size: 1.2rem; font-weight: 600;
  letter-spacing: -0.015em; color: var(--at-navy-deep); margin: 1.75rem 0 0.85rem;
}
@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
}
</style>
