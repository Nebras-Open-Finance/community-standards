<route lang="yaml">
meta:
  title: Insurance Quotation — TPP-Led Flow
</route>

<script setup lang="ts">
const acceptResponseTPPLed = `{
  "data": {
    "PolicyIssuanceAllowed": {
      "CustomerVerification": true,
      "Payment": true,
      "PolicyDocuments": true
    }
  }
}
`

const submitKycBody = `{
  "Data": {
    "PolicyStartDate": "2026-06-01",
    "PolicyHolder": {
      "EmiratesId": "784-1990-XXXXXXX-X",
      "EmiratesIdExpiryDate": "2030-01-15",
      "FullName": { "en": "Aisha Al Marri" },
      "DateOfBirth": "1990-05-12",
      "Address": {
        "AddressLine": ["Villa 12, Street 5"],
        "PostCode": "12345",
        "TownName": "Dubai",
        "CountrySubDivision": "Dubai",
        "Country": "AE"
      }
    },
    "AdditionalDeclarations": {
      "NoClaimsLastFiveYears": true
    }
  }
}
`

const applicationApprovedEvent = `{
  "QuoteStatus": "ApplicationApproved",
  "BrokerInstructions": [
    {
      "ActionRequired": "Customer must complete premium payment at the LFI-hosted payment page.",
      "Url": "https://pay.examplelfi.ae/checkout/sess-c93e1f4a"
    }
  ]
}
`

const policyIssuedWithDocsEvent = `{
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

const verifyHashNode = `import { createHash } from 'node:crypto'

async function verifyDocument(doc: {
  Content: string
  Hash: string
  HashType: string
}): Promise<boolean> {
  if (doc.HashType !== 'SHA256') {
    throw new Error('Unsupported HashType: ' + doc.HashType)
  }
  const bytes = Buffer.from(doc.Content, 'base64')
  const computed = createHash('sha256').update(bytes).digest('hex')
  return computed === doc.Hash
}
`

const verifyHashPython = `import base64, hashlib

def verify_document(doc: dict) -> bool:
    if doc["HashType"] != "SHA256":
        raise ValueError(f"Unsupported HashType: {doc['HashType']}")
    raw = base64.b64decode(doc["Content"])
    return hashlib.sha256(raw).hexdigest() == doc["Hash"]
`
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          TPP &middot; Insurance &middot; Quotation &middot; TPP-Led
        </div>
        <h1 class="ed-doc__title">
          TPP-Led Flow
          <span class="ed-doc__read">8 min read</span>
        </h1>
        <p class="ed-doc__lede">
          You collect quote inputs, KYC, and surface the LFI&rsquo;s hosted payment URL to the customer
          inside your own app. Document delivery also lives with you. The LFI handles underwriting,
          payment hosting, and policy issuance; your TPP is the customer-facing surface for everything
          else.
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
      id="quote"
      num="02"
      color="var(--at-gold, #b08800)"
      eyebrow="Steps 1&ndash;2 &mdash; Token &amp; Quote"
      title="Same as LFI-Led for quote creation"
      tone="surface"
    >
      <EdProse>
        Obtain a Client Credentials token (<code>insurance</code> scope) and POST the quote request
        exactly as in <a href="./lfi-led">LFI-Led</a>. The mode is not declared on Create Quote &mdash;
        it&rsquo;s determined by the LFI&rsquo;s response to PATCH Accept.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="accept"
      num="03"
      color="var(--at-blue-deep, #1d4ed8)"
      eyebrow="Step 3 &mdash; PATCH Accept Quote"
      title="Accept and discover PolicyIssuanceAllowed"
      tone="cream"
    >
      <EdProse>
        Customer picks a quote; PATCH it with the accept data and your <code>Subscription.Webhook</code>.
        The LFI&rsquo;s response signals whether the flow is TPP-Led: a <code>200</code> response with
        <code>data.PolicyIssuanceAllowed</code> means you are responsible for the steps listed as
        <code>true</code>.
      </EdProse>

      <EdCode :code="acceptResponseTPPLed" lang="json" filename="200 response (TPP-Led)" />

      <EdProse>
        All three flags <code>true</code> is the full TPP-Led mode. You MUST honour the declaration
        &mdash; do not perform a step set to <code>false</code> even if you can technically do so.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="kyc"
      num="04"
      color="var(--at-navy)"
      eyebrow="Step 4 &mdash; PATCH Submit KYC"
      title="Collect KYC and submit to the LFI"
      tone="surface"
    >
      <EdProse>
        After <code>ApplicationPending</code> arrives, collect the customer&rsquo;s KYC in your app (see
        <a href="../user-journeys#tpp-led-kyc">User Journeys &mdash; KYC capture</a> for the screens to
        present). Submit by PATCHing the same quote endpoint a second time with the gathered data.
      </EdProse>

      <EdCode :code="submitKycBody" lang="json" filename="PATCH /motor-insurance-quotes/{QuoteId} (Submit KYC, decoded)" />

      <EdProse>
        The body conforms to the sector&rsquo;s accept-quote schema. Required fields vary by sector
        &mdash; consult the <a href="../open-api/patch-motor-insurance-quotes-QuoteId">OpenAPI spec</a>.
        If KYC fails, you receive <code>400</code> with a descriptive message; surface it to the customer
        and allow retry.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="payment-redirect"
      num="05"
      color="var(--at-violet, #6d28d9)"
      eyebrow="Step 5 &mdash; ApplicationApproved event"
      title="Redirect the customer to the LFI-hosted payment URL"
      tone="cream"
    >
      <EdProse>
        The LFI processes KYC asynchronously and, on success, emits <code>ApplicationApproved</code>
        with a <code>BrokerInstructions[].Url</code> pointing at its hosted payment page.
      </EdProse>

      <EdCode :code="applicationApprovedEvent" lang="json" filename="ApplicationApproved event" />

      <EdProse>
        Redirect the customer to <code>BrokerInstructions[0].Url</code>. They pay on the LFI&rsquo;s
        page; the LFI redirects them back to a return URL you nominated when configuring your
        webhook or out-of-band with the LFI.
      </EdProse>

      <EdNote type="warning" title="Single-use URL">
        <p>
          Do not cache, log, or replay the URL. If the customer abandons and returns, request a fresh
          URL by asking the LFI to re-emit (typically via your support process or by re-triggering the
          flow). The LFI will emit a new <code>PaymentRequired</code> event.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="create-policy"
      num="06"
      color="var(--at-teal)"
      eyebrow="Step 6 &mdash; POST Create Policy"
      title="Issue the policy"
      tone="surface"
    >
      <EdProse>
        After payment confirmation (which you can correlate with the customer&rsquo;s return from the
        LFI&rsquo;s payment page or by waiting for the LFI&rsquo;s next status event), call POST
        <code>/{type}-insurance-policies</code> with the <code>QuoteId</code>. The body is similar to
        the KYC submission but represents the formal policy creation request.
      </EdProse>

      <EdProse>
        The LFI runs its issuance and responds <code>201</code>. The <code>InsurancePolicyId</code> and
        policy documents arrive in the subsequent <code>PolicyIssued</code> event &mdash; not in this
        response body.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="documents"
      num="07"
      color="var(--at-gold, #b08800)"
      eyebrow="Step 7 &mdash; PolicyIssued event"
      title="Verify and surface documents to the customer"
      tone="cream"
    >
      <EdProse>
        In TPP-Led mode the <code>PolicyIssued</code> event carries every customer-facing document the
        LFI would normally deliver itself. Verify each <code>Hash</code> against the decoded
        <code>Content</code> before presenting to the customer.
      </EdProse>

      <EdCode :code="policyIssuedWithDocsEvent" lang="json" filename="PolicyIssued event with Documents" />

      <h3 class="ed-doc__subhead">Hash verification</h3>
      <EdCode :code="verifyHashNode" lang="ts" filename="Node — SHA-256 verification" />
      <EdCode :code="verifyHashPython" lang="python" filename="Python — SHA-256 verification" />

      <EdNote type="danger" title="Do not deliver mismatches">
        <p>
          If a document&rsquo;s computed hash does not match the supplied <code>Hash</code>, treat the
          document as corrupt or tampered. Do not surface it to the customer. Log the
          <code>x-fapi-interaction-id</code> from the event delivery, raise a support ticket including
          that ID and the <code>QuoteId</code>, and request the LFI re-emit the event.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="completion"
      num="08"
      color="var(--at-navy)"
      eyebrow="Step 8 &mdash; Completed event"
      title="Surface final policy state and reconcile commission"
      tone="surface"
    >
      <EdProse>
        On <code>Completed</code>, finalise the policy in your records, surface it as live to the
        customer, and reconcile any commission against the event&rsquo;s <code>Commission</code> block.
        <code>PaymentMethod: ThroughAPIHub</code> means the Hub will route payment to you; the
        commission and timing are governed by the
        <a href="/pricing/">AlTareq Commercial and Pricing Model</a>.
      </EdProse>

      <EdProse>
        No further events follow. You can let the subscription lapse, or explicitly PATCH the quote
        with <code>IsActive: false</code> if you prefer to clean up &mdash; though no further events
        would be sent regardless.
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
