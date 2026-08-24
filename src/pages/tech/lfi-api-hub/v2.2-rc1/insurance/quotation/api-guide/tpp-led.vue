<route lang="yaml">
meta:
  title: Insurance Quotation — TPP-Led Flow
</route>

<script setup lang="ts">
const acceptResponse = `{
  "data": {
    "PolicyIssuanceAllowed": {
      "CustomerVerification": true,
      "Payment": true,
      "PolicyDocuments": true
    }
  }
}
`

const applicationApprovedPatch = `{
  "QuoteStatus": "ApplicationApproved",
  "BrokerInstructions": [
    {
      "ActionRequired": "Customer must complete premium payment at the LFI-hosted payment page.",
      "Url": "https://pay.examplelfi.ae/checkout/sess-c93e1f4a"
    }
  ]
}
`

const policyIssuedWithDocsPatch = `{
  "QuoteStatus": "PolicyIssued",
  "Documents": [
    {
      "Type": "Policy Booklet",
      "FileName": "policy-booklet.pdf",
      "ContentType": "application/pdf",
      "Content": "JVBERi0xLjQKJeLjz9MKMyAwI...",
      "HashType": "SHA256",
      "Hash": "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918"
    },
    {
      "Type": "Terms & Conditions",
      "FileName": "terms.pdf",
      "ContentType": "application/pdf",
      "Content": "JVBERi0xLjQKJeLjz9MKMyAwI...",
      "HashType": "SHA256",
      "Hash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
    }
  ]
}
`
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          LFI &middot; Insurance &middot; Quotation &middot; TPP-Led
        </div>
        <h1 class="ed-doc__title">
          TPP-Led Flow
          <span class="ed-doc__read">7 min read</span>
        </h1>
        <p class="ed-doc__lede">
          The TPP collects KYC in its own UI and surfaces an LFI-hosted payment URL to the customer.
          Your LFI is responsible for underwriting, premium pricing, payment hosting, and policy
          document generation &mdash; but customer interaction outside the payment page lives entirely
          with the TPP.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="flow"
      num="01"
      color="var(--at-teal)"
      eyebrow="End-to-end sequence"
      title="TPP-Led flow"
      tone="cream"
    >
      <APIFlowViewer title="Insurance Quotation — TPP-Led Flow">
        <APIFlowsInsuranceQuotationTPPLed />
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
        Create Quote behaves identically to LFI-Led mode &mdash; mint a <code>QuoteId</code>, run
        underwriting, return <code>201</code> with the quote details (or <code>204</code> to decline).
        The mode forks on PATCH Accept, not on Create.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="accept"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="PATCH /{type}-insurance-quotes/{QuoteId}"
      title="Accept the quote &mdash; return PolicyIssuanceAllowed"
      tone="cream"
    >
      <EdProse>
        Respond <code>200</code> with <code>data.PolicyIssuanceAllowed</code> declaring which steps
        the TPP may perform. All three booleans are required.
      </EdProse>

      <EdCode :code="acceptResponse" lang="json" filename="200 OK response" />

      <EdProse>
        Immediately after responding, PATCH the quote-log with
        <code>QuoteStatus: ApplicationPending</code> so the TPP knows the application has been
        registered. The TPP will then collect KYC in its own UI.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="submit-kyc"
      num="04"
      color="var(--at-navy)"
      eyebrow="PATCH /{type}-insurance-quotes/{QuoteId} (second call)"
      title="Receive the TPP's KYC submission"
      tone="surface"
    >
      <EdProse>
        The TPP submits the collected KYC by PATCHing the same quote endpoint again. The body conforms
        to the sector\'s accept-quote request schema (<code>AEInsurance.AE{Type}InsuranceQuoteAcceptQuoteRequestProperties</code>).
        Validate it as you would a direct application: Emirates ID checks, sanctions screening, any
        sector-specific underwriting confirmations.
      </EdProse>

      <EdProse>
        If KYC fails, respond <code>400</code> with a descriptive <code>errorMessage</code>; the TPP
        will surface the error to the customer and let them retry. If KYC passes, respond
        <code>200</code> (no body) and proceed to issue the payment URL.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="emit-application-approved"
      num="05"
      color="var(--at-gold, #b08800)"
      eyebrow="PATCH /insurance-quote-log/{logId}"
      title="Emit ApplicationApproved + BrokerInstructions.Url"
      tone="cream"
    >
      <EdProse>
        Generate a single-use payment URL on your LFI-hosted payment surface and emit a Pending
        Completion event:
      </EdProse>

      <EdCode :code="applicationApprovedPatch" lang="json" filename="PATCH /insurance-quote-log/{logId}" />

      <EdProse>
        The TPP will redirect the customer to this URL. Customer payment is collected on your LFI&rsquo;s
        page &mdash; the TPP never sees the card details. After payment success, your LFI redirects the
        customer back to the URL the TPP supplied (typically as part of its webhook subscription or
        out-of-band registration).
      </EdProse>

      <EdNote type="warning" title="Single-use, time-bound">
        <p>
          Invalidate the URL after first redemption or after a session window of 15&ndash;30 minutes.
          The TPP MUST NOT cache or replay it. If the customer abandons and returns later, you can
          emit a fresh <code>PaymentRequired</code> event with a new URL.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="create-policy"
      num="06"
      color="var(--at-violet, #6d28d9)"
      eyebrow="POST /{type}-insurance-policies"
      title="Issue the policy from the KYC + payment-confirmed quote"
      tone="surface"
    >
      <EdProse>
        Once payment is confirmed, the TPP calls POST to create the policy. The body carries the
        originating <code>QuoteId</code> plus any additional data your LFI requires (most KYC was
        already submitted via the second PATCH). Issue the policy and respond <code>201</code>.
      </EdProse>

      <EdProse>
        If the TPP retries with the same <code>QuoteId</code>, return the same policy reference &mdash;
        policy creation MUST be idempotent.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="emit-policy-issued"
      num="07"
      color="var(--at-teal)"
      eyebrow="PATCH /insurance-quote-log/{logId}"
      title="Emit PolicyIssued + Documents"
      tone="cream"
    >
      <EdProse>
        In TPP-Led mode the TPP is the document delivery channel &mdash; your LFI MUST NOT email or
        post documents to the customer directly. Attach every customer-facing document (Policy
        Booklet, Terms &amp; Conditions, IPID, etc.) as base64-encoded <code>Documents</code> entries
        with SHA-256 hashes for integrity verification.
      </EdProse>

      <EdCode :code="policyIssuedWithDocsPatch" lang="json" filename="PATCH /insurance-quote-log/{logId}" />

      <EdProse>
        Documents MUST be PDFs (<code>application/pdf</code>) or images (<code>image/jpeg</code>,
        <code>image/png</code>). The TPP verifies each <code>Hash</code> against the decoded
        <code>Content</code> before surfacing to the customer.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="emit-completed"
      num="08"
      color="var(--at-navy)"
      eyebrow="PATCH /insurance-quote-log/{logId}"
      title="Emit Completed and close the lifecycle"
      tone="surface"
    >
      <EdProse>
        Same as LFI-Led: emit a final Completed Status event with the finalised premium breakdown,
        policy term, and (where applicable) the <code>Commission</code> due to the TPP. The Hub rejects
        any subsequent PATCH for this <code>logId</code>.
      </EdProse>

      <EdProse>
        <code>Commission.PaymentMethod</code> controls how the LFI pays the TPP: <code>DirectToTPP</code>
        for direct bilateral settlement, or <code>ThroughAPIHub</code> for Hub-routed payment.
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
.ed-doc__subhead {
  font-family: var(--at-serif); font-size: 1.2rem; font-weight: 600;
  letter-spacing: -0.015em; color: var(--at-navy-deep); margin: 1.75rem 0 0.85rem;
}
@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
}
</style>
