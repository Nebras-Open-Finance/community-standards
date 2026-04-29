<route lang="yaml">
meta:
  title: Ozone Connect Response Time Policy
  appliesTo:
    - Licensed Financial Institutions (LFIs)
    - Nebras
  purpose: Defines the 500 ms p95 response-time target each LFI must meet for its Ozone Connect endpoints — what the target covers (especially for payments), how it is measured, monitored, and the degradation incident process when it is missed.
  readTime: "7 min"
  updated: "2026-04-22"
</route>

<script setup lang="ts">
// Phase 4 — Ozone Connect Response Time Policy.
// Ported from `docs/components/WebPages/OzoneConnectResponseTimePolicyPage.vue`.

interface Section { id: string; label: string }
interface MetaItem { label: string; value: string }
interface KeyNum { value: string; unit?: string; label: string }
interface SeverityRow { severity: string; color: string; description: string }

const sections: Section[] = [
  { id: 'scope',       label: 'Scope' },
  { id: 'target',      label: 'Target' },
  { id: 'payments',    label: 'Payments' },
  { id: 'measurement', label: 'Measurement' },
  { id: 'proving',     label: 'Live proving' },
  { id: 'monitoring',  label: 'Monitoring' },
  { id: 'degradation', label: 'Degradation' },
  { id: 'improvement', label: 'Improvement' },
]

const meta: MetaItem[] = [
  { label: 'Applies to', value: 'LFIs · Nebras' },
  { label: 'Read',       value: '7 min' },
  { label: 'Updated',    value: '22 Apr 2026' },
]

const keyNums: KeyNum[] = [
  { value: '500', unit: 'ms p95', label: 'Target per Ozone Connect endpoint' },
  { value: 'TTLB',                label: 'Time to Last Byte measurement' },
]

const severities: SeverityRow[] = [
  {
    severity: 'P1',
    color: '#B33A3A',
    description: "Payment execution p95 exceeds <strong>1,000 ms for 15 minutes</strong> or more; or any Ozone Connect API family's p95 exceeds <strong>1,500 ms for 15 minutes</strong> or more",
  },
  {
    severity: 'P2',
    color: 'var(--at-gold)',
    description: 'p95 for a given Ozone Connect endpoint exceeds <strong>750 ms for 30 minutes</strong> or more',
  },
  {
    severity: 'P3',
    color: 'var(--at-blue)',
    description: 'p95 for a given Ozone Connect endpoint drifts above <strong>500 ms</strong> without meeting the P2 threshold',
  },
]
</script>

<template>
  <div class="ed-page">
    <EdBackStrip href="/policy/" text="All policies" />

    <EdHero
      eyebrow="Operate · Measure · Improve"
      title="Ozone Connect Response Time Policy"
      :meta="meta"
      lede="Defines the response times LFIs are expected to meet for their Ozone Connect endpoints &mdash; what customers actually feel when they check a balance, confirm a payee, or authorise a payment."
      :key-nums="keyNums"
    />

    <EdInPageNav :sections="sections" />

    <EdSectionBand
      id="scope"
      num="01"
      color="var(--at-teal)"
      eyebrow="Scope"
      title="Where this policy applies"
      lede="Applies to all Ozone Connect endpoints operated by an LFI in production, across every API family the LFI has enabled."
      tone="cream"
    >
      <h3>Out of scope</h3>
      <EdBullets>
        <li>Endpoints operated by the API Hub itself (such as consent reads, authorisation, and token endpoints)</li>
        <li>Sandbox or non-production environments</li>
        <li>Latency attributable to the API Hub, the TPP, or the broader internet</li>
        <li>Time taken by the LFI to complete fraud, sanctions, and compliance screening of a payment after the API response has been returned</li>
        <li>Time taken by the underlying payment rail to process and settle a payment (for example Aani), governed by the applicable scheme rules</li>
        <li>Time a customer spends completing authentication at the LFI &mdash; measured separately under the Consent Journey requirements</li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="target"
      num="02"
      color="var(--at-gold)"
      eyebrow="Response time target"
      title="500 ms p95 per endpoint, per calendar day"
      lede="Each LFI is expected to meet a <strong>p95 response time of 500 ms or better</strong> for its Ozone Connect endpoints. A single target keeps the policy simple to reason about, and reflects the reality that customers expect comparable responsiveness whether they are checking a balance, retrieving transactions, confirming a payee, or initiating a payment consent."
      tone="surface"
    >
      <h3>Endpoints in scope (examples)</h3>
      <EdBullets>
        <li><strong>Bank Data Sharing</strong> &mdash; <code>GET /accounts</code>, <code>GET /accounts/{accountId}/balances</code>, <code>GET /accounts/{accountId}/transactions</code>, <code>GET /accounts/{accountId}/standing-orders</code>, <code>GET /accounts/{accountId}/beneficiaries</code>, and other account-scoped reads</li>
        <li><strong>Service Initiation</strong> &mdash; <code>POST /payments</code>, <code>POST /payment-consents</code>, <code>POST /payment-consents/{consentId}/file</code>, <code>POST /payment-consents/{consentId}/refund</code>, <code>GET /payments/{paymentId}</code></li>
        <li><strong>Confirmation of Payee</strong> &mdash; <code>POST /customers/action/cop-query</code></li>
        <li><strong>Products and Leads</strong> &mdash; <code>GET /products</code>, <code>POST /leads</code></li>
        <li><strong>Insurance, FX, Account Opening, ATM, User Operations, and Consent Events</strong> &mdash; all endpoints under the corresponding Ozone Connect API families</li>
      </EdBullets>
      <EdProse>This target aligns with the 500 ms average response time published in the Availability, Performance and Usage Benchmarks standard. Holding each Ozone Connect endpoint to this p95 figure &mdash; rather than only an average &mdash; ensures the customer experience remains consistent across the long tail of requests, not just on average.</EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="payments"
      num="03"
      color="var(--at-blue)"
      eyebrow="Payments"
      title="What 500 ms covers for POST /payments"
      lede="For <code>POST /payments</code>, the 500 ms target applies to the Ozone Connect API response &mdash; the point at which the LFI acknowledges the payment request has been received and accepted for onward processing. It does <strong>not</strong> require the LFI to have completed screening or settlement within 500 ms."
      tone="cream"
    >
      <EdProse>Payment processing spans three distinct phases, each with its own expectation:</EdProse>

      <EdStages>
        <EdStage num="01" title="API response — 500 ms p95 (this policy)" num-color="var(--at-blue)">
          <p>The LFI acknowledges the payment request and returns an initial payment status. This is the point at which the TPP knows the request is in the LFI's hands and can show the customer an appropriate in-progress state.</p>
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
      id="measurement"
      num="04"
      color="var(--at-blue-deep)"
      eyebrow="Measurement"
      title="How response time is measured"
      tone="surface"
      narrow
    >
      <EdCallout color="var(--at-blue-deep)">
        <p>Response time is measured as <strong>Time to Last Byte (TTLB)</strong>: the elapsed time from the moment the API Hub issues the request to Ozone Connect until the final byte of the response is received by the Hub. This isolates the LFI's contribution from anything happening on the TPP side or the public internet.</p>
      </EdCallout>
    </EdSectionBand>

    <EdSectionBand
      id="proving"
      num="05"
      color="var(--at-navy)"
      eyebrow="Live proving"
      title="Proving the target before go-live"
      tone="cream"
    >
      <EdProse>Before an LFI is signed off as compliant with this policy and approved to go live on the ecosystem, the LFI must complete a <strong>live proving period</strong> with one or more TPPs.</EdProse>
      <EdBullets>
        <li>During the proving period, the LFI operates its Ozone Connect endpoints against real TPP traffic in production</li>
        <li>The 500 ms p95 response time target must be demonstrably met across all in-scope Ozone Connect endpoints over the proving period</li>
        <li>Nebras reviews the results and confirms, or withholds, sign-off before the LFI is approved for general availability</li>
      </EdBullets>
      <EdProse>An LFI that does not meet the target during proving remains in proving until it does, with Nebras support where required. This requirement applies equally to initial go-live and to any subsequent major version go-live.</EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="monitoring"
      num="06"
      color="var(--at-teal-deep)"
      eyebrow="Monitoring & intervention"
      title="Continuous, central observation"
      lede="Nebras actively monitors every LFI's Ozone Connect response times in real time, using the API Hub's own logs of every request made to the LFI. Response times are tracked continuously, per endpoint, against the 500 ms p95 target."
      tone="surface"
    >
      <EdProse>LFIs are expected to review their own Ozone Connect response times.</EdProse>

      <h3>When the target is persistently missed</h3>
      <EdProse>"Persistently" is assessed in the round, but typically means any of:</EdProse>
      <EdBullets>
        <li>Missing the 500 ms p95 target for the same endpoint in <strong>three consecutive calendar months</strong></li>
        <li><strong>Three or more P1 or P2 degradations</strong> in a rolling 90-day window</li>
        <li>Failure to deliver remediation actions agreed in a previous review</li>
      </EdBullets>
      <EdProse>Engagement may include a formal review meeting, a written remediation plan with owners and dates, enhanced (typically weekly) reporting, and escalation to the relevant regulatory authority where non-compliance is persistent or where the interests of customers or TPPs require it.</EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="degradation"
      num="07"
      color="var(--at-navy-deep)"
      eyebrow="Performance degradation"
      title="A sustained breach is functionally an incident"
      lede="Even if the service is technically still responding, a sustained breach of the response time target is treated as an incident."
      tone="cream"
    >
      <h3>Severity definitions</h3>
      <EdSeverityTable :rows="severities" />

      <h3>LFI obligations during a P1 or P2 degradation</h3>
      <EdStages>
        <EdStage num="01" title="Acknowledge promptly">
          <p>For <strong>P1</strong>, within <strong>15 minutes</strong> of the LFI becoming aware. For <strong>P2</strong>, within <strong>1 hour</strong>.</p>
        </EdStage>
        <EdStage num="02" title="Notify Nebras">
          <p>Through the agreed incident channel.</p>
        </EdStage>
        <EdStage num="03" title="Provide regular status updates">
          <p>For <strong>P1</strong>, at least every <strong>30 minutes</strong> until performance is restored. For <strong>P2</strong>, at least every <strong>2 hours</strong>.</p>
        </EdStage>
        <EdStage num="04" title="Declare resolved">
          <p>Only once performance has been stable within target for a reasonable observation period (typically 30 minutes).</p>
        </EdStage>
      </EdStages>

      <EdCallout color="var(--at-navy-deep)">
        <p>Nebras takes responsibility for cascading status information to affected TPPs through its own communication channels. <strong>LFIs are not expected to communicate directly with TPPs during degradation incidents.</strong></p>
      </EdCallout>

      <h3>Post-incident review</h3>
      <EdProse>For every P1 degradation &mdash; and for any P2 that recurs within 30 days &mdash; the LFI is expected to provide a post-incident review to Nebras within <strong>five business days</strong> of resolution. The review should cover:</EdProse>
      <EdBullets>
        <li>A factual timeline of the degradation</li>
        <li>The root cause, including any capacity, data-growth, or dependency factors</li>
        <li>The customer and TPP impact</li>
        <li>The remediation already applied</li>
        <li>Any further actions the LFI will take to prevent recurrence, with owners and dates</li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="improvement"
      num="08"
      color="var(--at-gold)"
      eyebrow="Continuous improvement"
      title="A minimum, not an aspiration"
      tone="surface"
      narrow
    >
      <EdProse>Customer experience improves continuously as response times fall. LFIs are expected to:</EdProse>
      <EdBullets>
        <li>Track response times against target across every endpoint, not just in aggregate</li>
        <li>Pay attention to trends at <strong>p99</strong> even where p95 remains within target &mdash; p99 is an early warning of capacity or data-growth issues</li>
        <li>Review monthly response time reports with their engineering and operations leadership</li>
        <li>Invest in the capacity, caching, and downstream tuning required to keep pace with volume growth</li>
        <li>Participate in ecosystem-wide reviews convened by Nebras to share practices for keeping Open Finance services fast</li>
      </EdBullets>
    </EdSectionBand>

    <EdRelatedCards eyebrow="Read alongside" title="Related policies">
      <EdRelatedCard
        href="/policy/ozone-connect-availability"
        category="LFIs · Nebras"
        category-color="var(--at-teal)"
        title="Ozone Connect Availability Policy"
        desc="The 99.5% monthly availability standard for the same endpoints."
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
