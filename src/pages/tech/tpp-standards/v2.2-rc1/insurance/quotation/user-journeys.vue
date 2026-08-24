<route lang="yaml">
meta:
  title: Insurance Quotation — User Journeys
  next: false
  prev: false
  aside: false
</route>

<script setup lang="ts">
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          Insurance &middot; Quotation &middot; TPP screens
        </div>
        <h1 class="ed-doc__title">
          User Journeys
          <span class="ed-doc__read">4 min read</span>
        </h1>
        <p class="ed-doc__lede">
          The customer-facing flow in your TPP application, broken down by mode. Insurance Quotation
          has no Hub-mediated consent journey &mdash; the screens below are entirely yours to design
          (LFI-Led: minimal handoff; TPP-Led: full application capture before redirect to the LFI for
          payment).
        </p>
      </div>
    </section>

    <EdSectionBand
      id="quote-collection"
      num="01"
      color="var(--at-teal)"
      eyebrow="Step 1 &mdash; Quote collection"
      title="Gather inputs and request quotes"
      tone="cream"
    >
      <EdProse>
        Regardless of mode, you collect the data needed to request quotes in your own UI: sector,
        <code>QuoteType</code>, sector-specific risk data (vehicle, property, trip, etc.), and customer
        identifiers. POST <code>/{type}-insurance-quotes</code> may return one or more quotes from
        each LFI; present them so the customer can compare and choose.
      </EdProse>

      <h3 class="ed-doc__subhead">Screens in your app</h3>
      <EdBullets>
        <li>
          <strong>Quote inputs</strong> &mdash; collect sector, <code>QuoteType</code>, and
          sector-specific risk inputs. Validate locally before submission.
        </li>
        <li>
          <strong>Quote comparison</strong> &mdash; render the returned quotes. Surface premium,
          coverage, exclusions, and any sector-specific selling points. Indicate which LFI declined
          (received <code>204</code>) so the customer is not left wondering.
        </li>
        <li>
          <strong>Quote acceptance</strong> &mdash; the customer picks one quote. Confirm the
          selection before sending the PATCH Accept Quote.
        </li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="accept"
      num="02"
      color="var(--at-gold, #b08800)"
      eyebrow="Step 2 &mdash; Accept &amp; subscribe"
      title="Subscribe to events when accepting the quote"
      tone="surface"
    >
      <EdProse>
        PATCH <code>/{type}-insurance-quotes/{QuoteId}</code> carries both the accept payload and
        (optionally) a <code>Subscription.Webhook</code> object. Subscribe at accept time so you receive
        every subsequent status change &mdash; <code>ApplicationPending</code> through
        <code>Completed</code> &mdash; on your webhook endpoint without polling.
      </EdProse>

      <h3 class="ed-doc__subhead">Where the flow forks</h3>
      <EdBullets>
        <li>
          <strong>LFI-Led mode</strong> &mdash; the response is <code>204</code>. The customer is
          handed to the LFI for KYC, payment, and document delivery. Your app waits for status events
          (or returns control to the customer with a "we\'ll let you know when your policy is ready"
          screen).
        </li>
        <li>
          <strong>TPP-Led mode</strong> &mdash; the response is <code>200</code> with
          <code>PolicyIssuanceAllowed</code> declaring you handle <code>CustomerVerification</code>,
          <code>Payment</code>, and/or <code>PolicyDocuments</code>. Continue in your app with KYC
          capture.
        </li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="tpp-led-kyc"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Step 3 (TPP-Led only) &mdash; KYC"
      title="Collect customer verification in your app"
      tone="cream"
    >
      <EdProse>
        For TPP-Led quotes where <code>PolicyIssuanceAllowed.CustomerVerification: true</code>, your
        app collects the customer\'s KYC data &mdash; Emirates ID, address, occupation, etc., per the
        sector\'s accept-quote schema &mdash; and submits it via a second PATCH on the same quote
        endpoint.
      </EdProse>

      <h3 class="ed-doc__subhead">Screens in your app</h3>
      <EdBullets>
        <li>
          <strong>Identity capture</strong> &mdash; Emirates ID front/back scan or manual entry. UAE
          PASS integration is encouraged where available.
        </li>
        <li>
          <strong>Declarations</strong> &mdash; any sector-specific declarations the LFI requires
          (claims history, smoking status for Life/Health, named drivers for Motor, etc.).
        </li>
        <li>
          <strong>Review &amp; submit</strong> &mdash; surface the gathered data for the customer to
          confirm before transmission. This submission is treated as the customer\'s instruction to
          proceed.
        </li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="payment-redirect"
      num="04"
      color="var(--at-violet, #6d28d9)"
      eyebrow="Step 4 (TPP-Led only) &mdash; Payment redirect"
      title="Redirect the customer to the LFI-hosted payment URL"
      tone="surface"
    >
      <EdProse>
        After the LFI emits <code>ApplicationApproved</code> on the quote-log (delivered to your
        webhook or visible via polling), the event carries a <code>BrokerInstructions.Url</code>. This
        is the LFI\'s hosted payment page. Redirect the customer to it; payment is collected by the
        LFI.
      </EdProse>

      <h3 class="ed-doc__subhead">Screens in your app</h3>
      <EdBullets>
        <li>
          <strong>Handoff confirmation</strong> &mdash; a short screen explaining the customer is
          being taken to the insurer\'s secure payment page. Show the LFI brand so the customer
          recognises where they\'re going.
        </li>
        <li>
          <strong>Return landing</strong> &mdash; the LFI redirects the customer back to a URL you
          control after payment. Show a "your policy is being finalised" state until the
          <code>PolicyIssued</code> / <code>Completed</code> events arrive.
        </li>
      </EdBullets>

      <EdNote type="warning" title="Single-use URL">
        <p>
          The <code>BrokerInstructions.Url</code> is single-use and time-bound. Do not store, log, or
          replay it. If the customer abandons and returns later, request a fresh URL from the LFI
          (typically via a new <code>PaymentRequired</code> event) rather than reusing the stale one.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="documents"
      num="05"
      color="var(--at-teal)"
      eyebrow="Step 5 &mdash; Policy delivery"
      title="Surface the policy and documents to the customer"
      tone="cream"
    >
      <EdProse>
        On <code>PolicyIssued</code>, you receive the policy reference and (in TPP-Led mode) the
        full set of policy documents as base64-encoded <code>Documents</code> entries. Verify each
        document\'s SHA-256 hash, then present them to the customer.
      </EdProse>

      <h3 class="ed-doc__subhead">Screens in your app</h3>
      <EdBullets>
        <li>
          <strong>Policy summary</strong> &mdash; the issued policy with key terms surfaced (sums
          insured, premium, coverage dates, beneficiaries). In LFI-Led mode you receive an
          <code>InsurancePolicyId</code>; in TPP-Led mode the documents themselves are authoritative.
        </li>
        <li>
          <strong>Document downloads</strong> &mdash; Policy Booklet, Terms &amp; Conditions, IPID,
          etc. Allow the customer to download each PDF and offer to email them on demand.
        </li>
        <li>
          <strong>Lifecycle hooks</strong> &mdash; surface "manage your policy" links that take the
          customer back to the LFI (or your own broker-of-record surface) for claims, mid-term
          adjustments, and renewal.
        </li>
      </EdBullets>
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
.ed-doc__subhead {
  font-family: var(--at-serif); font-size: 1.2rem; font-weight: 600;
  letter-spacing: -0.015em; color: var(--at-navy-deep); margin: 1.75rem 0 0.85rem;
}
@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
}
</style>
