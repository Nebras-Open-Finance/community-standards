<route lang="yaml">
meta:
  title: Insurance Quotation — LFI-Led Flow
</route>

<script setup lang="ts">
const policiesPostBody = `{
  "data": {
    "QuoteId": "8a4f2d09-2c5b-4f88-b1b3-1f06f7e91a2e"
  }
}
`

const policyIssuedPatch = `{
  "QuoteStatus": "PolicyIssued",
  "InsurancePolicyId": "pol-2026-000457"
}
`

const completedPatch = `{
  "QuoteStatus": "Completed",
  "PolicyStartDate": "2026-06-01",
  "PolicyEndDate": "2027-05-31",
  "PolicyTerm": "P1Y",
  "Premium": {
    "OneYearPremiumExcludingVAT": { "Currency": "AED", "Amount": "950.00" },
    "VATAmount": { "Currency": "AED", "Amount": "47.50" },
    "TotalOneYearPremium": { "Currency": "AED", "Amount": "997.50" }
  },
  "CustomerPaidInFull": true,
  "PolicyCountrySubDivision": "Dubai"
}
`
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          LFI &middot; Insurance &middot; Quotation &middot; LFI-Led
        </div>
        <h1 class="ed-doc__title">
          LFI-Led Flow
          <span class="ed-doc__read">5 min read</span>
        </h1>
        <p class="ed-doc__lede">
          The TPP creates a quote and hands the customer to your LFI on accept. Your LFI hosts customer
          verification, payment, and document delivery; the TPP&rsquo;s only role after acceptance is to
          observe lifecycle events through the quote-log.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="flow"
      num="01"
      color="var(--at-teal)"
      eyebrow="End-to-end sequence"
      title="LFI-Led flow"
      tone="cream"
    >
      <APIFlowViewer title="Insurance Quotation — LFI-Led Flow">
        <APIFlowsInsuranceQuotationLFILed />
      </APIFlowViewer>
    </EdSectionBand>

    <EdSectionBand
      id="create-quote"
      num="02"
      color="var(--at-gold, #b08800)"
      eyebrow="POST /{type}-insurance-quotes"
      title="Underwrite and return one or more quotes"
      tone="surface"
    >
      <EdProse>
        The Hub validates the TPP&rsquo;s access token, signed request, and schema, then proxies to your
        endpoint with the sector slug in the path. Receive the quote request, run your underwriting,
        and respond with <code>201</code> + <code>data: [...]</code> for one or more quotes, or
        <code>204</code> to decline.
      </EdProse>

      <h3 class="ed-doc__subhead">QuoteId minting</h3>
      <EdProse>
        Mint a unique <code>QuoteId</code> per quote &mdash; UUIDv4 is recommended. Persist it for at
        least the policy retention period of the sector. The <code>QuoteId</code> threads the rest of
        the lifecycle: TPP retrievals, the accept PATCH, policy creation, and every status event you
        emit to the quote-log.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="accept"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="PATCH /{type}-insurance-quotes/{QuoteId}"
      title="Accept the quote &mdash; return 204"
      tone="cream"
    >
      <EdProse>
        For LFI-Led mode, respond <code>204 No Content</code>. You are signalling: the TPP has done its
        part; the LFI will drive everything from here. Then immediately PATCH the quote-log with
        <code>ApplicationPending</code> so the TPP (subscribed or polling) sees the application has been
        registered.
      </EdProse>

      <EdNote type="info" title="Subscription is for the Hub, not for you">
        <p>
          The <code>Subscription.Webhook</code> object on the PATCH body is consumed by the Hub for
          its own event delivery to the TPP. Your LFI MUST NOT act on it &mdash; just emit
          quote-log status updates as normal, and the Hub fans them out.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="hosted-flow"
      num="04"
      color="var(--at-navy)"
      eyebrow="LFI-hosted screens"
      title="Your LFI hosts the customer through to issuance"
      tone="surface"
    >
      <EdProse>
        After PATCH Accept, your LFI presents the customer with the quote summary, KYC capture, and
        payment screens. These are entirely under your control &mdash; the Hub is not in the loop. See
        the <a href="../user-journeys">User Journeys</a> page for the screens you typically host.
      </EdProse>

      <EdProse>
        The TPP&rsquo;s view of progress comes from the quote-log events you emit at each transition.
        You can emit additional intermediate events with <code>BrokerInstructions[].Reason</code>
        explaining customer-facing status the TPP should surface (e.g. "Document upload required",
        "Awaiting payment confirmation").
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="create-policy"
      num="05"
      color="var(--at-teal)"
      eyebrow="POST /{type}-insurance-policies"
      title="Issue the policy"
      tone="cream"
    >
      <EdProse>
        Once your hosted flow completes (KYC passed, payment confirmed), the TPP calls POST to create
        the policy. In LFI-Led mode the body is minimal &mdash; just the originating
        <code>QuoteId</code>:
      </EdProse>

      <EdCode :code="policiesPostBody" lang="json" filename="POST /motor-insurance-policies" />

      <EdProse>
        Run your standard policy issuance. Return <code>201 Created</code>. The
        <code>InsurancePolicyId</code> is delivered to the TPP via the <code>PolicyIssued</code>
        event, not in this response body &mdash; this keeps the API symmetric with TPP-Led mode.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="emit-policy-issued"
      num="06"
      color="var(--at-gold, #b08800)"
      eyebrow="PATCH /insurance-quote-log/{logId}"
      title="Emit PolicyIssued + InsurancePolicyId"
      tone="surface"
    >
      <EdProse>
        Emit a Pending Completion event carrying the issued policy reference. In LFI-Led mode the
        documents stay with your LFI (you have already delivered them to the customer via your hosted
        screens), so only the <code>InsurancePolicyId</code> is needed.
      </EdProse>

      <EdCode :code="policyIssuedPatch" lang="json" filename="PATCH /insurance-quote-log/{logId}" />
    </EdSectionBand>

    <EdSectionBand
      id="emit-completed"
      num="07"
      color="var(--at-violet, #6d28d9)"
      eyebrow="PATCH /insurance-quote-log/{logId}"
      title="Emit Completed and close the lifecycle"
      tone="cream"
    >
      <EdProse>
        After any post-issuance work has settled (commission booked, customer onboarding emails sent),
        emit a final Completed Status event with the finalised premium breakdown and policy term. This
        is the terminal event &mdash; the Hub will reject any subsequent PATCH for this
        <code>logId</code>.
      </EdProse>

      <EdCode :code="completedPatch" lang="json" filename="PATCH /insurance-quote-log/{logId}" />
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
