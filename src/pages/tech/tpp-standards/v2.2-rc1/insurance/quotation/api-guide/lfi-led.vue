<route lang="yaml">
meta:
  title: Insurance Quotation — LFI-Led Flow
</route>

<script setup lang="ts">
const tokenRequest = `POST /token HTTP/1.1
Host: as1.[LFICODE].apihub.openfinance.ae
Content-Type: application/x-www-form-urlencoded

grant_type=client_credentials
&scope=insurance
&client_assertion_type=urn%3Aietf%3Aparams%3Aoauth%3Aclient-assertion-type%3Ajwt-bearer
&client_assertion=eyJhbGciOiJQUzI1NiIsImtpZCI6...
`

const createQuoteBody = `{
  "Data": {
    "QuoteReference": "tpp-ref-2026-04-001",
    "QuoteType": "New",
    "Policy": {
      "StartDate": "2026-06-01",
      "Term": "P1Y"
    },
    "Vehicle": {
      "RegistrationNumber": "A 12345",
      "Emirate": "Dubai",
      "Make": "Toyota",
      "Model": "Camry",
      "YearOfManufacture": 2022
    },
    "PolicyHolder": {
      "EmiratesId": "784-1990-XXXXXXX-X",
      "DateOfBirth": "1990-05-12"
    }
  }
}
`

const createQuoteResponse = `{
  "data": [
    {
      "QuoteStatus": "Available",
      "QuoteId": "8a4f2d09-2c5b-4f88-b1b3-1f06f7e91a2e",
      "QuoteReference": "tpp-ref-2026-04-001",
      "CreationDateTime": "2026-04-18T10:14:23Z",
      "ExpirationDateTime": "2026-05-18T10:14:23Z",
      "PlanName": "Comprehensive Plus",
      "PolicyIssuanceAllowed": {
        "CustomerVerification": false,
        "Payment": false,
        "PolicyDocuments": false
      },
      "Premium": {
        "TotalOneYearPremium": { "Currency": "AED", "Amount": "997.50" }
      }
    }
  ]
}
`

const acceptBody = `{
  "Data": {
    "PolicyStartDate": "2026-06-01"
  },
  "Subscription": {
    "Webhook": {
      "Url": "https://tpp.example.ae/webhooks/insurance-quote-events",
      "IsActive": true
    }
  }
}
`

const policyIssuedEvent = `{
  "QuoteStatus": "PolicyIssued",
  "InsurancePolicyId": "pol-2026-000457"
}
`
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          TPP &middot; Insurance &middot; Quotation &middot; LFI-Led
        </div>
        <h1 class="ed-doc__title">
          LFI-Led Flow
          <span class="ed-doc__read">6 min read</span>
        </h1>
        <p class="ed-doc__lede">
          You collect quote inputs in your app and hand the customer to the LFI on accept. The LFI hosts
          customer verification, payment, and document delivery. Your role after acceptance is to observe
          status events &mdash; either via webhook subscription or polling &mdash; and surface progress
          to the customer.
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
      id="token"
      num="02"
      color="var(--at-gold, #b08800)"
      eyebrow="Step 1 &mdash; Client credentials"
      title="Obtain an access token"
      tone="surface"
    >
      <EdProse>
        Authenticate with the Client Credentials Grant using a signed client assertion. Request the
        <code>insurance</code> scope.
      </EdProse>

      <EdCode :code="tokenRequest" lang="http" filename="POST /token" />

      <EdProse>
        The returned <code>access_token</code> is valid for all Insurance Quotation calls until expiry.
        There is no per-customer token in this flow.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="create-quote"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Step 2 &mdash; POST /{type}-insurance-quotes"
      title="Request a quote"
      tone="cream"
    >
      <EdProse>
        Send the quote request as an <code>application/jwt</code> signed Request JWT. The body carries
        a <code>QuoteReference</code> you generate (for your own tracking), a <code>QuoteType</code> of
        <code>New</code>, <code>Renewal</code>, or <code>Switch</code>, and sector-specific risk and
        policy holder data.
      </EdProse>

      <EdCode :code="createQuoteBody" lang="json" filename="POST /motor-insurance-quotes (decoded JWT body)" />

      <EdProse>
        The LFI returns <code>201</code> with one or more quotes, or <code>204</code> if it declines to
        quote. Each entry includes a <code>QuoteId</code> (LFI-minted) you use for subsequent calls.
      </EdProse>

      <EdCode :code="createQuoteResponse" lang="json" filename="201 response" />

      <EdNote type="info" title="QuoteId vs QuoteReference">
        <p>
          <code>QuoteId</code> is the LFI&rsquo;s identifier &mdash; required for every subsequent call.
          <code>QuoteReference</code> is your own tracking identifier, echoed back by the LFI so you can
          correlate quotes to your internal session. Persist both.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="accept"
      num="04"
      color="var(--at-navy)"
      eyebrow="Step 3 &mdash; PATCH Accept Quote"
      title="Accept and subscribe to events"
      tone="surface"
    >
      <EdProse>
        Customer picks a quote in your UI. PATCH the chosen <code>QuoteId</code> with the accept data
        and a <code>Subscription.Webhook</code> object if you want event notifications. Send as a signed
        <code>application/jwt</code>.
      </EdProse>

      <EdCode :code="acceptBody" lang="json" filename="PATCH /motor-insurance-quotes/{QuoteId} (decoded)" />

      <EdProse>
        In LFI-Led mode the LFI responds <code>204 No Content</code>. The customer is now in the LFI&rsquo;s
        hosted journey. Your app should surface a "your application is being processed" state and wait
        for the first event.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="handoff"
      num="05"
      color="var(--at-violet, #6d28d9)"
      eyebrow="Step 4 &mdash; Customer handoff"
      title="Redirect the customer to the LFI"
      tone="cream"
    >
      <EdProse>
        The mechanism for handing the customer off depends on the LFI &mdash; typically a hosted
        application URL returned at quote creation time or out-of-band. From this point until the
        <code>PolicyIssued</code> event, the customer interacts with the LFI&rsquo;s screens, not yours.
      </EdProse>

      <EdProse>
        Your app receives <code>ApplicationPending</code> (and any interim status updates the LFI emits)
        through the webhook. Surface them in the customer&rsquo;s timeline so they can re-enter your app
        and see where their application has reached.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="receive-events"
      num="06"
      color="var(--at-teal)"
      eyebrow="Step 5 &mdash; Receive lifecycle events"
      title="Handle the status sequence"
      tone="surface"
    >
      <EdProse>
        Events arrive at your webhook in this typical order:
      </EdProse>

      <EdBullets>
        <li><code>ApplicationPending</code> &mdash; LFI has registered the application.</li>
        <li>(optional intermediate events with <code>BrokerInstructions</code>) &mdash; LFI surfacing status the customer needs to see.</li>
        <li><code>PolicyIssued</code> &mdash; carries the <code>InsurancePolicyId</code>.</li>
        <li><code>Completed</code> &mdash; finalised premium, term, and commission. Terminal event.</li>
      </EdBullets>

      <EdProse>
        Verify each event&rsquo;s signature and dedupe by <code>QuoteId</code>. The <code>PolicyIssued</code>
        event in LFI-Led mode carries only <code>InsurancePolicyId</code> &mdash; the LFI has delivered
        the policy documents directly to the customer through its hosted journey.
      </EdProse>

      <EdCode :code="policyIssuedEvent" lang="json" filename="PolicyIssued event (LFI-Led)" />
    </EdSectionBand>

    <EdSectionBand
      id="create-policy"
      num="07"
      color="var(--at-gold, #b08800)"
      eyebrow="Step 6 &mdash; POST /{type}-insurance-policies"
      title="Issue the policy"
      tone="cream"
    >
      <EdProse>
        After the customer has progressed through the LFI&rsquo;s hosted KYC and payment, your app calls
        POST to formally create the policy resource. In LFI-Led mode the body is minimal &mdash; just
        the <code>QuoteId</code>. The LFI runs its issuance and responds <code>201 Created</code>.
      </EdProse>

      <EdProse>
        The final <code>InsurancePolicyId</code> arrives via the <code>PolicyIssued</code> webhook event,
        not in this response body. Retries are safe: the LFI is required to return the same policy
        reference for the same <code>QuoteId</code>.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="completion"
      num="08"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Step 7 &mdash; Completed"
      title="Surface the final policy to the customer"
      tone="surface"
    >
      <EdProse>
        On the <code>Completed</code> event, finalise the customer-facing timeline: policy is live,
        documents are with the customer (delivered by the LFI), and any commission owed is being
        processed via <code>Commission.PaymentMethod</code>.
      </EdProse>

      <EdProse>
        Manage subscription lifecycle in your own systems &mdash; you can let the subscription lapse
        (it&rsquo;s tied to the <code>QuoteId</code>) or PATCH with <code>IsActive: false</code> if you
        explicitly want to stop delivery (for example, before deprovisioning a webhook URL).
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
@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
}
</style>
