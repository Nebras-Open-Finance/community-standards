<route lang="yaml">
meta:
  title: Sandbox — Model Insurer — Quotation
</route>

<script setup lang="ts">
// Sandbox Model Insurer — Quotation walkthrough. Explains how to get a quote
// returned from the Model Insurer (altareq2) and how to drive the Insurance
// Quotation happy path (Create → Accept → Create Policy, plus KYC on TPP-Led
// flows). Reference values and message requirements below are confirmed against
// the live altareq2 sandbox.

const SECTORS = [
  { sector: 'Motor', endpoint: '/motor-insurance-quotes', available: 'cbuae-motor-2.1-01', pending: 'cbuae-motor-2.1-02' },
  { sector: 'Health', endpoint: '/health-insurance-quotes', available: 'cbuae-health-2.1-01', pending: 'cbuae-health-2.1-02' },
  { sector: 'Employment', endpoint: '/employment-insurance-quotes', available: 'cbuae-employment-2.1-01', pending: 'cbuae-employment-2.1-02' },
  { sector: 'Home', endpoint: '/home-insurance-quotes', available: 'cbuae-home-2.1-01', pending: 'cbuae-home-2.1-02' },
  { sector: 'Life', endpoint: '/life-insurance-quotes', available: 'cbuae-life-2.1-01', pending: 'cbuae-life-2.1-02' },
  { sector: 'Renters', endpoint: '/renters-insurance-quotes', available: 'cbuae-renters-2.1-01', pending: 'cbuae-renters-2.1-02' },
  { sector: 'Travel', endpoint: '/travel-insurance-quotes', available: 'cbuae-travel-2.1-01', pending: 'cbuae-travel-2.1-02' },
]

const createBody = `POST /open-finance/insurance/v2.1/motor-insurance-quotes
Host: rs1.altareq2.sandbox.apihub.openfinance.ae
Authorization: Bearer {client-credentials token, scope: insurance}
Content-Type: application/json

{
  "Data": {
    "QuoteReference": "cbuae-motor-2.1-01",
    "QuoteType": "New",
    "CustomerId": "CUST-2024-001",
    "PolicyIssuanceRequest": { "CustomerVerification": false, "Payment": false, "PolicyDocuments": false },
    "VehicleDetails": { "Make": "Toyota", "Model": "Camry", "ModelYear": "2023", "Trim": "SE", "BodyType": "Saloon", "Specification": "GCC", "NoOfPassengersIncDriver": 5, "EngineProperties": { "EngineType": "InternalCombustionEngine", "EngineCapacity": "2500", "CylinderCapacity": "4" } },
    "MainDriver": { "DateOfBirth": "1990-05-15", "Gender": "Male", "Nationality": "ARE", "DrivingLicenseHistory": { "TimeDrivingInUAE": "P3Y" }, "MotorClaims": { "MotorClaimInLast24Months": false, "NoClaimsCertificate": "2Years" } },
    "Policy": { "PolicyStartDate": "2026-04-15", "PolicyEndDate": "2027-04-14", "RegistrationType": "New", "Takaful": false, "CarUsage": "Private", "CarValuation": { "Amount": "75000.00", "Currency": "AED" } },
    "CarRegistration": { "EmirateOfRegistration": "Dubai", "DateOfFirstRegistration": "2023-06-15" }
  }
}`

const availableResponse = `201 Created

{
  "Data": [
    {
      "QuoteId": "cd96bc4d-9ba7-43ff-a577-c88bdb8cce73",
      "QuoteStatus": "Available",
      "QuoteReference": "cbuae-motor-2.1-01",
      "CreationDateTime": "2026-04-05T10:43:07Z",
      "Premium": {
        "PremiumAmountExcludingVAT": { "Amount": "100.00", "Currency": "AED" },
        "VATAmount": { "Amount": "5.00", "Currency": "AED" },
        "TotalPremiumAmount": { "Amount": "105.00", "Currency": "AED" },
        "PaymentFrequency": "Annually"
      },
      "Commission": { "CommissionAmount": { "Amount": "100.00", "Currency": "AED" }, "PaymentMethod": "DirectToTPP" }
    }
  ],
  "Links": { "Self": "https://rs1.altareq2.sandbox.apihub.openfinance.ae/open-finance/insurance/v2.1/motor-insurance-quotes" },
  "Meta": {}
}`

const acceptMessage = `// Signed as a request object (application/jwt) and sent as the PATCH body.
{
  "aud": ["https://auth1.altareq2.sandbox.apihub.openfinance.ae"],
  "iss": "{your client_id}",
  "iat": 1775385600,
  "exp": 1775385900,
  "nbf": 0,
  "message": {
    "Data": {
      "QuoteReference": "cbuae-motor-2.1-01",
      "QuoteStatus": "ApplicationPending",
      "QuoteCreationDateTime": "2026-04-05T10:43:07Z",   // = the quote's CreationDateTime
      "InsuranceSubType": "Comprehensive Basic",          // chosen by the TPP
      "Premium": { "...": "echoed from the quote" },
      "Commission": { "PaymentMethod": "DirectToTPP" },   // CommissionPercentage removed
      "CustomerSalary": "Over4K"                           // required for Health; optional elsewhere
    }
  }
}`

const createPolicyMessage = `// Signed as a request object (application/jwt).
{
  "aud": ["https://auth1.altareq2.sandbox.apihub.openfinance.ae"],
  "iss": "{your client_id}",
  "iat": 1775385600, "exp": 1775385900, "nbf": 0,
  "message": { "Data": { "QuoteId": "cd96bc4d-9ba7-43ff-a577-c88bdb8cce73" } }
}`
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          TPP · Sandbox · Model Insurer · Quotation
        </div>
        <h1 class="ed-doc__title">
          Model Insurer &mdash; Quotation
          <span class="ed-doc__read">4 min read</span>
        </h1>
        <p class="ed-doc__lede">
          The <a href="/tech/tpp-standards/sandbox/model-insurer/">Model Insurer</a> supports the Insurance
          Quotation journeys &mdash; New, Renewal and Switch &mdash; across every sector it underwrites. This
          page explains the one thing you need to get a quote <em>returned</em>, and then how to progress that
          quote along the happy path as far as a TPP can drive it.
        </p>
        <p class="ed-doc__lede ed-doc__lede--tight">
          The Quotation requests in the <a href="/tech/tpp-standards/v2.1/getting-started/postman">Insurance v2.1
          Postman collection</a> are pre-configured with the reference values and messages described here, so you
          can run the flow end to end without editing anything.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="quote-reference"
      num="01"
      color="var(--at-teal)"
      eyebrow="Getting a quote returned"
      title="Use a recognised QuoteReference"
      lede="The Model Insurer returns a quote only for a fixed set of QuoteReference values. Every other reference is a well-formed request that the insurer simply declines to quote."
      tone="cream"
    >
      <EdProse>
        Create a quote with a <code>client_credentials</code> access token (scope <code>insurance</code>) and set
        <code>Data.QuoteReference</code> to one of the values below. The <code>-01</code> reference returns an
        <strong>Available</strong> quote (a priced quote you can accept); the <code>-02</code> reference returns a
        <strong>Pending</strong> quote (the insurer will price it asynchronously).
      </EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Sector</th>
              <th>Endpoint</th>
              <th>Available (<code>-01</code>)</th>
              <th>Pending (<code>-02</code>)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in SECTORS" :key="row.sector">
              <td>{{ row.sector }}</td>
              <td><code>POST {{ row.endpoint }}</code></td>
              <td><code>{{ row.available }}</code></td>
              <td><code>{{ row.pending }}</code></td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdNote type="important" title="Any other reference returns 204">
        A create request that is otherwise valid but carries an unrecognised <code>QuoteReference</code> (for
        example <code>QTE-2024-001</code>) returns <strong>204 No Content</strong> &mdash; the insurer has declined
        to quote, and no quote resource is created. If the request body itself is invalid you get a
        <strong>400</strong> instead; fix the body before assuming the reference is wrong.
      </EdNote>

      <EdProse>A full create request for an Available Motor quote:</EdProse>
      <EdCode :code="createBody" lang="http" filename="Create quote — request" />
      <EdCode :code="availableResponse" lang="json" filename="Create quote — 201 response (abridged)" />
    </EdSectionBand>

    <EdSectionBand
      id="happy-path"
      num="02"
      color="var(--at-gold)"
      eyebrow="The happy path"
      title="Create, accept, and issue a policy"
      lede="Every call below is made to the API Hub resource server (rs1.) with the same client-credentials token. The sequence is identical for New, Renewal and Switch, and for every sector."
      tone="surface"
    >
      <EdStages>
        <EdStage num="01" title="Create the quote" num-color="var(--at-gold)">
          <p>
            <code>POST /&lt;sector&gt;-insurance-quotes</code> with a recognised <code>-01</code> reference &rarr;
            <strong>201</strong>. Keep the <code>QuoteId</code> and the whole quote object from the response &mdash;
            the Accept message is built from it.
          </p>
        </EdStage>
        <EdStage num="02" title="Retrieve the quote" num-color="var(--at-gold)">
          <p>
            <code>GET /&lt;sector&gt;-insurance-quotes/{QuoteId}</code> &rarr; <strong>200</strong>. Optional, but it
            confirms the <code>QuoteStatus</code> before you accept.
          </p>
        </EdStage>
        <EdStage num="03" title="Accept the quote" num-color="var(--at-gold)">
          <p>
            <code>PATCH /&lt;sector&gt;-insurance-quotes/{QuoteId}</code> with a signed request object whose
            <code>message.Data.QuoteStatus</code> is <code>ApplicationPending</code> &rarr; <strong>200</strong>.
            The quote now reads <code>ApplicationPending</code>. See
            <a href="#accept-message">Building the Accept message</a> for the fields it must carry.
          </p>
        </EdStage>
        <EdStage num="04" title="Capture KYC (TPP-Led only)" num-color="var(--at-gold)">
          <p>
            On TPP-Led flows, <code>PATCH …/{QuoteId}</code> again with <code>QuoteStatus</code>
            <code>KYCCaptured</code> and a <code>Documents</code> array &rarr; <strong>200</strong>. LFI-Led flows
            skip this step.
          </p>
        </EdStage>
        <EdStage num="05" title="Create the policy" num-color="var(--at-gold)">
          <p>
            <code>POST /&lt;sector&gt;-insurance-policies</code> with a signed request object carrying the
            <code>QuoteId</code> &rarr; <strong>201</strong>, returning an <code>InsurancePolicyId</code>.
          </p>
        </EdStage>
      </EdStages>

      <EdProse><code>ApplicationPending</code> and <code>KYCCaptured</code> are the two statuses a TPP sets directly
      on a quote; see <a href="#lfi-side">What the LFI does next</a> for everything after that.</EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="accept-message"
      num="03"
      color="var(--at-teal)"
      eyebrow="Building the Accept message"
      title="The Accept-Quote message, field by field"
      lede="The PATCH body is a PS256-signed request object (application/jwt) wrapping a message. Build the message from the quote the insurer returned, not from hard-coded values — the fields must agree with that quote."
      tone="cream"
    >
      <EdCode :code="acceptMessage" lang="javascript" filename="Accept-Quote request object" />

      <EdProse>The <code>message.Data</code> object must satisfy all of these:</EdProse>
      <EdBullets>
        <li><code>QuoteReference</code> &mdash; the reference you quoted on.</li>
        <li><code>QuoteStatus</code> &mdash; <code>ApplicationPending</code> to accept (or <code>KYCCaptured</code> on the KYC step).</li>
        <li><code>QuoteCreationDateTime</code> &mdash; copy the quote's <code>CreationDateTime</code> value.</li>
        <li><code>InsuranceSubType</code> &mdash; a sub-type string chosen by the TPP (the quote does not supply one), e.g. <code>Comprehensive Basic</code>.</li>
        <li><code>Premium</code> &mdash; echo the <code>Premium</code> object from the quote.</li>
        <li><code>Commission</code> &mdash; echo the quote's <code>Commission</code>, <strong>without</strong> <code>CommissionPercentage</code> (that property is not allowed in this message).</li>
        <li><code>CustomerSalary</code> (<code>Under4K</code> | <code>Over4K</code>) &mdash; <strong>required for Health</strong>; accepted and optional for the other sectors.</li>
      </EdBullets>

      <EdNote type="tip" title="TPP-Led flows carry PolicyIssuanceRequest">
        If your Create Quote set <code>PolicyIssuanceRequest</code> (the TPP-Led flows set its flags to
        <code>true</code>), carry the same object through on the Accept and KYC messages.
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="lfi-side"
      num="04"
      color="var(--at-gold)"
      eyebrow="What the LFI does next"
      title="Statuses beyond ApplicationPending and KYCCaptured"
      lede="A TPP drives a quote only as far as ApplicationPending / KYCCaptured, and can then create the policy. The remaining lifecycle is the insurer's to drive."
      tone="surface"
    >
      <EdProse>
        The later quote statuses &mdash; <code>ApplicationApproved</code>, <code>PaymentRequired</code>,
        <code>PolicyIssued</code>, <code>Completed</code> and the terminal states &mdash; are set by the LFI, which
        patches the quote through the API Hub Consent Manager
        (<code>PATCH /&lt;cm-version&gt;/insurance-quote-log/{QuoteId}</code>). In the Model Insurer sandbox those
        updates are performed by the insurer, not by the TPP: your transport certificate authenticates you as a
        TPP, so the quote-log endpoint is not yours to call.
      </EdProse>
      <EdProse>
        For TPP functional testing this means the happy path you exercise is <strong>Create &rarr; Accept
        (&rarr; KYC) &rarr; Create Policy</strong>. The create-policy response returns the
        <code>InsurancePolicyId</code> the insurer allocated for the issued policy.
      </EdProse>
      <EdCode :code="createPolicyMessage" lang="javascript" filename="Create-policy request object" />
    </EdSectionBand>

    <EdSectionBand
      id="postman"
      num="05"
      color="var(--at-teal)"
      eyebrow="Postman"
      title="Running it from the collection"
      tone="cream"
    >
      <EdProse>
        In the <a href="/tech/tpp-standards/v2.1/getting-started/postman">Insurance v2.1 Postman collection</a>,
        under <strong>Insurance v2.1 &rarr; Quotation</strong>, each sector has New, Renewal and Switch flows in
        both LFI-Led and TPP-Led variants. Every Create Quote is set to the sector's Available reference, and the
        Accept and KYC steps build their messages from the returned quote. Run a flow top to bottom to go from
        create through to an issued policy; the <code>LFI-API Hub</code> steps shown in each flow illustrate the
        insurer-side quote-log updates described above.
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
.ed-doc__lede--tight { margin-top: 1.25rem; }
.ed-doc__lede :deep(a), .ed-doc__lede a {
  color: var(--at-teal-deep);
  text-decoration: none;
  border-bottom: 1px solid currentColor;
}
.ed-doc__lede :deep(code), .ed-doc__lede code {
  font-family: var(--at-mono);
  font-size: 0.86em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  padding: 0.08em 0.4em;
}

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
}
</style>
