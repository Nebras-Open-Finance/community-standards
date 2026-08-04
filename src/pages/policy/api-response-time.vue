<route lang="yaml">
meta:
  title: API Response Time Policy
  appliesTo:
    - Licensed Financial Institutions (LFIs)
    - Nebras
  purpose: Defines the 500 ms p95 response-time target for every TPP-facing Open Finance API request that reaches an LFI — measured end to end across TPP → API Hub → Ozone Connect → API Hub → TPP, how the window is attributed between Nebras and the LFI, and the degradation incident process when the target is missed.
  readTime: "8 min"
  updated: "2026-08-04"
</route>

<script setup lang="ts">
interface Section { id: string; label: string }
interface MetaItem { label: string; value: string }
interface KeyNum { value: string; unit?: string; label: string }
interface SeverityRow { severity: string; color: string; description: string }

const sections: Section[] = [
  { id: 'scope',          label: 'Scope' },
  { id: 'target',         label: 'Target' },
  { id: 'window',         label: 'Measured window' },
  { id: 'accountability', label: 'Accountability' },
  { id: 'payments',       label: 'Payments' },
  { id: 'proving',        label: 'Live proving' },
  { id: 'monitoring',     label: 'Monitoring' },
  { id: 'degradation',    label: 'Degradation' },
  { id: 'improvement',    label: 'Improvement' },
]

const meta: MetaItem[] = [
  { label: 'Applies to', value: 'LFIs · Nebras' },
  { label: 'Read',       value: '8 min' },
  { label: 'Updated',    value: '4 Aug 2026' },
]

const keyNums: KeyNum[] = [
  { value: '500', unit: 'ms p95', label: 'Per endpoint, per calendar day' },
  { value: 'TTLB',                label: 'TPP request in, TPP response out' },
]

const severities: SeverityRow[] = [
  {
    severity: 'P1',
    color: '#B33A3A',
    description: "Payment execution p95 exceeds <strong>1,000 ms for 15 minutes</strong> or more; or any API family's p95 exceeds <strong>1,500 ms for 15 minutes</strong> or more",
  },
  {
    severity: 'P2',
    color: 'var(--at-gold)',
    description: 'p95 for a given endpoint exceeds <strong>750 ms for 30 minutes</strong> or more',
  },
  {
    severity: 'P3',
    color: 'var(--at-blue)',
    description: 'p95 for a given endpoint drifts above <strong>500 ms</strong> without meeting the P2 threshold',
  },
]
</script>

<template>
  <div class="ed-page">
    <EdBackStrip href="/policy/" text="All policies" />

    <EdHero
      eyebrow="Operate · Measure · Improve"
      title="API Response Time Policy"
      :meta="meta"
      lede="Defines the response time the ecosystem is expected to deliver on every TPP request that reaches an LFI &mdash; what customers actually feel when they check a balance, confirm a payee, or authorise a payment."
      :key-nums="keyNums"
    />

    <EdInPageNav :sections="sections" />

    <EdSectionBand
      id="scope"
      num="01"
      color="var(--at-teal)"
      eyebrow="Scope"
      title="Where this policy applies"
      lede="Applies to every TPP-facing Open Finance API request in production that results in a corresponding request to the LFI's Ozone Connect, across every API family an LFI has enabled."
      tone="cream"
    >
      <EdProse>The subject of this policy is the <strong>request as the TPP experiences it</strong> &mdash; not any single hop within it. A request that is fast on one leg and slow on another is a slow request, and is measured as such.</EdProse>

      <EdProse>A request is in scope where the API Hub calls Ozone Connect to serve it. Requests the API Hub answers entirely on its own are out of scope, because there is no LFI segment for the end-to-end figure to say anything about.</EdProse>

      <h3>Out of scope</h3>
      <EdBullets>
        <li>Requests the API Hub serves without calling Ozone Connect &mdash; consent reads, authorisation, and token endpoints among them. The Hub's performance on these is managed by Nebras outside this policy.</li>
        <li>Sandbox or non-production environments</li>
        <li>The public internet between the TPP and the API Hub, and anything happening inside the TPP's own systems</li>
        <li>Time taken by the LFI to complete fraud, sanctions, and compliance screening of a payment after the API response has been returned</li>
        <li>Time taken by the underlying payment rail to process and settle a payment (for example Aani), governed by the applicable scheme rules</li>
        <li>Time a customer spends completing authentication at the LFI &mdash; measured separately under the Consent Journey requirements</li>
      </EdBullets>

      <EdCallout color="var(--at-teal)">
        <p>Nothing else is excluded. In particular, there is <strong>no exclusion for time spent calling an external service</strong> &mdash; whether that call is made by the API Hub or by the LFI, and whether the service is the Trust Framework, a core banking platform, or any other dependency. Dependency latency is response time.</p>
      </EdCallout>
    </EdSectionBand>

    <EdSectionBand
      id="target"
      num="02"
      color="var(--at-gold)"
      eyebrow="Response time target"
      title="500 ms p95 per endpoint, per calendar day"
      lede="Every endpoint is expected to return to the TPP within a <strong>p95 response time of 500 ms or better</strong>. A single target keeps the policy simple to reason about, and reflects the reality that customers expect comparable responsiveness whether they are checking a balance, retrieving transactions, confirming a payee, or initiating a payment consent."
      tone="surface"
    >
      <h3>Endpoints in scope (examples)</h3>
      <EdBullets>
        <li><strong>Bank Data Sharing</strong> &mdash; <code>GET /accounts</code>, <code>GET /accounts/{accountId}/balances</code>, <code>GET /accounts/{accountId}/transactions</code>, <code>GET /accounts/{accountId}/standing-orders</code>, <code>GET /accounts/{accountId}/beneficiaries</code>, and other account-scoped reads</li>
        <li><strong>Service Initiation</strong> &mdash; <code>POST /payments</code>, <code>POST /payment-consents</code>, <code>POST /payment-consents/{consentId}/file</code>, <code>POST /payment-consents/{consentId}/refund</code>, <code>GET /payments/{paymentId}</code></li>
        <li><strong>Confirmation of Payee</strong> &mdash; <code>POST /customers/action/cop-query</code></li>
        <li><strong>Products and Leads</strong> &mdash; <code>GET /products</code>, <code>POST /leads</code></li>
        <li><strong>Insurance, FX, Account Opening, ATM, User Operations, and Consent Events</strong> &mdash; all endpoints under the corresponding API families</li>
      </EdBullets>
      <EdProse>This target aligns with the 500 ms average response time published in the Availability, Performance and Usage Benchmarks standard. Holding each endpoint to this p95 figure &mdash; rather than only an average &mdash; ensures the customer experience remains consistent across the long tail of requests, not just on average.</EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="window"
      num="03"
      color="var(--at-blue-deep)"
      eyebrow="Measured window"
      title="TPP → API Hub → Ozone Connect → API Hub → TPP"
      lede="Response time is measured as <strong>Time to Last Byte (TTLB)</strong> at the API Hub resource server: the clock starts when the API Hub receives the first byte of the TPP's request, and stops when the last byte of the response is written back to the TPP. Everything in between is inside the window."
      tone="cream"
    >
      <EdStages>
        <EdStage num="01" title="TPP → API Hub — clock starts" num-color="var(--at-blue-deep)">
          <p>The request arrives at the API Hub resource server (<code>rs1.{lfiCode}.apihub.openfinance.ae</code>). Measurement begins here, which is why the public internet between the TPP and the Hub falls outside the window.</p>
        </EdStage>

        <EdStage num="02" title="API Hub processing — inbound" num-color="var(--at-blue-deep)">
          <p>mTLS and DPoP verification, access token validation, consent validation, OpenAPI schema enforcement, and request enrichment with the customer, account, and TPP information the LFI needs. <strong>Any call the Hub makes to an external service while handling the request &mdash; including the Trust Framework &mdash; is inside the window.</strong></p>
        </EdStage>

        <EdStage num="03" title="API Hub → Ozone Connect → API Hub" num-color="var(--at-blue-deep)">
          <p>Both network legs, plus everything Ozone Connect does in between. <strong>The LFI's own onward calls are inside the window too</strong> &mdash; to its core banking platform, to internal authorisation or decisioning services, and to any external service it depends on. No portion of the elapsed time is deducted for a slow dependency.</p>
        </EdStage>

        <EdStage num="04" title="API Hub → TPP — clock stops" num-color="var(--at-blue-deep)">
          <p>Response normalisation and error mapping, until the last byte is written to the TPP.</p>
        </EdStage>
      </EdStages>

      <EdCallout color="var(--at-blue-deep)">
        <p>The measurement is taken <strong>as observed</strong>. There is no mechanism for either Nebras or an LFI to exclude a downstream system from its figures. Where a dependency is the cause of a missed target, the owning party is expected to address it &mdash; by caching, by moving the call off the request path, or by working with the provider &mdash; rather than to treat it as an exclusion.</p>
      </EdCallout>
    </EdSectionBand>

    <EdSectionBand
      id="accountability"
      num="04"
      color="var(--at-navy)"
      eyebrow="Accountability"
      title="One target, two owners"
      lede="The 500 ms p95 is a single number measured on a single request, and both Nebras and the LFI are accountable for meeting it. Because the API Hub records the timing of each segment, a breach can be attributed to the party whose segment caused it."
      tone="surface"
    >
      <h3>Nebras owns the API Hub segment</h3>
      <EdBullets>
        <li>Hub processing on the way in and on the way out (stages 02 and 04 above)</li>
        <li>Every call the Hub makes to an external service while handling the request, including the Trust Framework</li>
        <li>The Hub's network legs to and from Ozone Connect</li>
      </EdBullets>

      <h3>The LFI owns the Ozone Connect segment</h3>
      <EdBullets>
        <li>Everything from the request arriving at Ozone Connect to the last byte of its response leaving (stage 03 above)</li>
        <li>Every onward call Ozone Connect makes while handling the request, to internal or external systems alike</li>
      </EdBullets>

      <EdCallout color="var(--at-navy)">
        <p>Attribution is settled by the API Hub's per-segment timing record. LFIs see their own segment in the Admin Portal through the <strong>LFI Performance</strong> report, which reports response times with API Hub processing removed; the Performance report alongside it reports the end-to-end figure this policy targets. <strong>Neither party may attribute a breach to the other in place of that record.</strong> Where a breach spans both segments, remediation is planned jointly.</p>
      </EdCallout>
    </EdSectionBand>

    <EdSectionBand
      id="payments"
      num="05"
      color="var(--at-blue)"
      eyebrow="Payments"
      title="What 500 ms covers for POST /payments"
      lede="For <code>POST /payments</code>, the 500 ms target applies to the API response returned to the TPP &mdash; the point at which the payment request has been received and accepted for onward processing. It does <strong>not</strong> require the LFI to have completed screening or settlement within 500 ms."
      tone="cream"
    >
      <EdProse>Payment processing spans three distinct phases, each with its own expectation:</EdProse>

      <EdStages>
        <EdStage num="01" title="API response — 500 ms p95 (this policy)" num-color="var(--at-blue)">
          <p>The LFI acknowledges the payment request and returns an initial payment status, which the API Hub maps and returns to the TPP. This is the point at which the TPP knows the request is in the LFI's hands and can show the customer an appropriate in-progress state.</p>
        </EdStage>

        <EdStage num="02" title="Fraud, sanctions, and compliance screening — up to 3 seconds" num-color="var(--at-blue)">
          <p>Screening runs after the API response has been returned. Once screening is complete, the LFI updates the payment status accordingly &mdash; either progressing the payment to the rail or rejecting it with the appropriate reason.</p>
        </EdStage>

        <EdStage num="03" title="Rail execution — payment scheme rules" num-color="var(--at-blue)">
          <p>For domestic instant payments this is subject to the <strong>Aani scheme rules</strong> (3 seconds per payment end-to-end, as set out in the Availability, Performance and Usage Benchmarks standard). The LFI's obligations toward the scheme operator are defined by the scheme and sit outside this policy.</p>
        </EdStage>
      </EdStages>

      <EdProse>The same structure &mdash; fast API acknowledgement followed by asynchronous processing &mdash; applies to other service initiation endpoints such as <code>POST /payment-consents/{consentId}/file</code> and the refund and FX endpoints. In every case, the 500 ms target in this policy refers only to the API response time.</EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="proving"
      num="06"
      color="var(--at-navy)"
      eyebrow="Live proving"
      title="Proving the target before go-live"
      tone="surface"
    >
      <EdProse>Before an LFI is signed off as compliant with this policy and approved to go live on the ecosystem, the LFI must complete a <strong>live proving period</strong> with one or more TPPs.</EdProse>
      <EdBullets>
        <li>During the proving period, the LFI operates its Ozone Connect endpoints against real TPP traffic in production</li>
        <li>The 500 ms p95 target must be demonstrably met across all in-scope endpoints over the proving period, measured on the full TPP-facing request</li>
        <li>Nebras reviews the results and confirms, or withholds, sign-off before the LFI is approved for general availability</li>
      </EdBullets>
      <EdProse>An LFI that does not meet the target during proving remains in proving until it does, with Nebras support where required. Where the API Hub segment is the cause, Nebras remediates it and the proving period is not counted against the LFI. This requirement applies equally to initial go-live and to any subsequent major version go-live.</EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="monitoring"
      num="07"
      color="var(--at-teal-deep)"
      eyebrow="Monitoring & intervention"
      title="Continuous, central observation"
      lede="Nebras actively monitors response times in real time, using the API Hub's own logs of every TPP request. Response times are tracked continuously, per endpoint, against the 500 ms p95 target, with the API Hub and Ozone Connect segments recorded separately."
      tone="cream"
    >
      <EdProse>LFIs are expected to review their own response times, including the segment timings the API Hub reports back to them.</EdProse>

      <h3>When the target is persistently missed</h3>
      <EdProse>"Persistently" is assessed in the round, but typically means any of:</EdProse>
      <EdBullets>
        <li>Missing the 500 ms p95 target for the same endpoint in <strong>three consecutive calendar months</strong></li>
        <li><strong>Three or more P1 or P2 degradations</strong> in a rolling 90-day window</li>
        <li>Failure to deliver remediation actions agreed in a previous review</li>
      </EdBullets>
      <EdProse>Engagement may include a formal review meeting, a written remediation plan with owners and dates, enhanced (typically weekly) reporting, and escalation to the relevant regulatory authority where non-compliance is persistent or where the interests of customers or TPPs require it. Where the attributed cause sits in the API Hub segment, the same expectations fall on Nebras.</EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="degradation"
      num="08"
      color="var(--at-navy-deep)"
      eyebrow="Performance degradation"
      title="A sustained breach is functionally an incident"
      lede="Even if the service is technically still responding, a sustained breach of the response time target is treated as an incident. Severity is assessed on the TPP-facing figure; the obligations below fall on the party that owns the attributed segment."
      tone="surface"
    >
      <h3>Severity definitions</h3>
      <EdSeverityTable :rows="severities" />

      <h3>Obligations during a P1 or P2 degradation</h3>
      <EdStages>
        <EdStage num="01" title="Acknowledge promptly">
          <p>For <strong>P1</strong>, within <strong>15 minutes</strong> of the owning party becoming aware. For <strong>P2</strong>, within <strong>1 hour</strong>.</p>
        </EdStage>
        <EdStage num="02" title="Notify the other party">
          <p>Through the agreed incident channel. Where the LFI owns the cause, it notifies Nebras; where the API Hub segment is the cause, Nebras notifies the affected LFIs.</p>
        </EdStage>
        <EdStage num="03" title="Provide regular status updates">
          <p>For <strong>P1</strong>, at least every <strong>30 minutes</strong> until performance is restored. For <strong>P2</strong>, at least every <strong>2 hours</strong>.</p>
        </EdStage>
        <EdStage num="04" title="Declare resolved">
          <p>Only once performance has been stable within target for a reasonable observation period (typically 30 minutes).</p>
        </EdStage>
      </EdStages>

      <EdCallout color="var(--at-navy-deep)">
        <p>Nebras takes responsibility for cascading status information to affected TPPs through its own communication channels, whichever segment the degradation sits in. <strong>LFIs are not expected to communicate directly with TPPs during degradation incidents.</strong></p>
      </EdCallout>

      <h3>Post-incident review</h3>
      <EdProse>For every P1 degradation &mdash; and for any P2 that recurs within 30 days &mdash; the party that owns the attributed cause is expected to provide a post-incident review within <strong>five business days</strong> of resolution. Where the cause spans both segments, the review is produced jointly. The review should cover:</EdProse>
      <EdBullets>
        <li>A factual timeline of the degradation</li>
        <li>The root cause, including any capacity, data-growth, or dependency factors</li>
        <li>The customer and TPP impact</li>
        <li>The remediation already applied</li>
        <li>Any further actions that will be taken to prevent recurrence, with owners and dates</li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="improvement"
      num="09"
      color="var(--at-gold)"
      eyebrow="Continuous improvement"
      title="A minimum, not an aspiration"
      tone="cream"
      narrow
    >
      <EdProse>Customer experience improves continuously as response times fall. Nebras and LFIs alike are expected to:</EdProse>
      <EdBullets>
        <li>Track response times against target across every endpoint, not just in aggregate, and at segment level as well as end to end</li>
        <li>Pay attention to trends at <strong>p99</strong> even where p95 remains within target &mdash; p99 is an early warning of capacity or data-growth issues</li>
        <li>Review monthly response time reports with their engineering and operations leadership</li>
        <li>Invest in the capacity, caching, and downstream tuning required to keep pace with volume growth</li>
        <li>Keep dependency calls off the request path wherever the data allows it to be cached or pre-fetched</li>
        <li>Participate in ecosystem-wide reviews convened by Nebras to share practices for keeping Open Finance services fast</li>
      </EdBullets>
    </EdSectionBand>

    <EdRelatedCards eyebrow="Read alongside" title="Related policies">
      <EdRelatedCard
        href="/policy/ozone-connect-availability"
        category="LFIs · Nebras"
        category-color="var(--at-teal)"
        title="Ozone Connect Availability Policy"
        desc="The 99.5% monthly availability standard for the LFI's Ozone Connect endpoints."
      />
      <EdRelatedCard
        href="/policy/ozone-connect-data-quality"
        category="LFIs · Nebras"
        category-color="var(--at-teal)"
        title="Ozone Connect Data Quality Policy"
        desc="Required and optional field delivery, accuracy, and freshness expectations."
      />
    </EdRelatedCards>
  </div>
</template>

<style scoped>
.ed-page {
  background: var(--at-bg-cream);
  color: var(--at-navy-deep);
  font-family: var(--at-sans);
  padding-top: 4.25rem;
}
</style>
