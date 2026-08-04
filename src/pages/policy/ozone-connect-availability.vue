<route lang="yaml">
meta:
  title: Ozone Connect Availability Policy
  appliesTo:
    - Licensed Financial Institutions (LFIs)
    - Nebras
  purpose: Sets the 99.5% monthly availability standard for an LFI's Ozone Connect endpoints — including how unavailability is defined, how it is monitored, and the incident, maintenance, and remediation processes that apply when the target is missed.
  readTime: "6 min"
  updated: "2026-04-22"
</route>

<script setup lang="ts">
interface Section { id: string; label: string }
interface MetaItem { label: string; value: string }
interface KeyNum { value: string; unit?: string; label: string }
interface SeverityRow { severity: string; color: string; description: string }

const sections: Section[] = [
  { id: 'scope',       label: 'Scope' },
  { id: 'target',      label: 'Target' },
  { id: 'proving',     label: 'Live proving' },
  { id: 'monitoring',  label: 'Monitoring' },
  { id: 'incidents',   label: 'Incidents' },
  { id: 'maintenance', label: 'Maintenance' },
  { id: 'improvement', label: 'Improvement' },
]

const meta: MetaItem[] = [
  { label: 'Applies to', value: 'LFIs · Nebras' },
  { label: 'Read',       value: '6 min' },
  { label: 'Updated',    value: '22 Apr 2026' },
]

const keyNums: KeyNum[] = [
  { value: '99.5', unit: '%',   label: 'Monthly availability target' },
  { value: '3h 39m',            label: 'Permitted downtime per month' },
]

const severities: SeverityRow[] = [
  {
    severity: 'P1',
    color: '#B33A3A',
    description: 'Complete outage of an API family, or degradation affecting at least <strong>25% of requests</strong>, or any unavailability of payment execution',
  },
  {
    severity: 'P2',
    color: 'var(--at-gold)',
    description: 'Degradation of a single endpoint or API family not meeting the P1 threshold',
  },
  {
    severity: 'P3',
    color: 'var(--at-blue)',
    description: 'Isolated issues affecting a limited number of TPPs or a narrow set of requests',
  },
]
</script>

<template>
  <div class="ed-page">
    <EdBackStrip href="/policy/" text="All policies" />

    <EdHero
      eyebrow="Operate · Measure · Improve"
      title="Ozone Connect Availability Policy"
      :meta="meta"
      lede="Sets the availability standard LFIs are expected to deliver for their Ozone Connect endpoints &mdash; the LFI-operated services the API Hub calls to fulfil TPP requests."
      :key-nums="keyNums"
    />

    <EdInPageNav :sections="sections" />

    <EdSectionBand
      id="scope"
      num="01"
      color="var(--at-teal)"
      eyebrow="Scope"
      title="Where this policy applies"
      lede="Applies to all Ozone Connect endpoints operated by an LFI in production, across every API family the LFI has enabled (Bank Data, Service Initiation, Confirmation of Payee, Insurance, FX, Account Opening, ATM, and any future additions)."
      tone="cream"
    >
      <h3>Out of scope</h3>
      <EdBullets>
        <li>Sandbox or non-production environments</li>
        <li>Downtime caused by the API Hub, the TPP, or the broader internet</li>
        <li>Downtime caused by upstream payment rails (for example Aani) where the issue is demonstrably outside the LFI's control</li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="target"
      num="02"
      color="var(--at-gold)"
      eyebrow="Availability target"
      title="99.5% availability per calendar month"
      lede="Each LFI is expected to deliver <strong>99.5% availability</strong> across its Ozone Connect endpoints, equating to no more than approximately 3 hours and 39 minutes of downtime per month — enough headroom to absorb planned releases and genuinely unforeseen issues, while still delivering a reliable service to customers and TPPs."
      tone="surface"
    >
      <EdProse>This target aligns with the end-to-end availability benchmark published in the Availability, Performance and Usage Benchmarks standard. Because the API Hub itself is engineered for very high availability, the LFI's Ozone Connect availability is the dominant factor in the end-to-end figure.</EdProse>

      <h3>How unavailability is defined</h3>
      <EdProse>A request to Ozone Connect is treated as a failure where:</EdProse>
      <EdBullets>
        <li>Ozone Connect returns a <strong>5xx response</strong></li>
        <li>The TLS connection cannot be established</li>
        <li>The response is not received within the API Hub's upstream timeout</li>
        <li>Ozone Connect rejects valid Hub traffic below the capacity the LFI has agreed to sustain</li>
      </EdBullets>
      <EdProse>Client errors (4xx responses attributable to the TPP or to an invalid request) are not counted against availability.</EdProse>

      <EdCallout color="var(--at-gold)">
        <p><strong>Partial outages count.</strong> An outage affecting only <code>POST /payments</code>, only one API family, or only a subset of TPPs is still an outage for the purposes of this policy.</p>
      </EdCallout>
    </EdSectionBand>

    <EdSectionBand
      id="proving"
      num="03"
      color="var(--at-blue)"
      eyebrow="Live proving"
      title="Proving the target before go-live"
      tone="cream"
    >
      <EdProse>Before an LFI is signed off as compliant with this policy and approved to go live on the ecosystem, the LFI must complete a <strong>live proving period</strong> with one or more TPPs.</EdProse>
      <EdBullets>
        <li>During the proving period, the LFI operates its Ozone Connect endpoints against real TPP traffic in production</li>
        <li>The 99.5% availability target defined in this policy must be demonstrably met over the proving period</li>
        <li>Nebras reviews the results and confirms, or withholds, sign-off before the LFI is approved for general availability</li>
      </EdBullets>
      <EdProse>An LFI that does not meet the target during proving remains in proving until it does, with Nebras support where required. This requirement applies equally to initial go-live and to any subsequent major version go-live.</EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="monitoring"
      num="04"
      color="var(--at-blue-deep)"
      eyebrow="Monitoring & intervention"
      title="Continuous, central observation"
      lede="Nebras actively monitors every LFI's Ozone Connect availability in real time, using the API Hub's own logs of every request made to the LFI."
      tone="surface"
    >
      <EdProse>LFIs are expected to review their own Ozone Connect availability.</EdProse>

      <h3>When the target is missed</h3>
      <EdProse>Where an LFI falls below the 99.5% target in any calendar month, or where the monitoring surfaces a pattern of repeated incidents, Nebras will engage directly with the LFI. This engagement may include:</EdProse>
      <EdBullets>
        <li>A formal review meeting between Nebras and the LFI's engineering and operations leadership</li>
        <li>A written remediation plan, agreed with Nebras, setting out specific actions, owners, and target dates</li>
        <li>Enhanced reporting &mdash; typically weekly &mdash; until the LFI is consistently meeting the target</li>
        <li>Escalation to the relevant regulatory authority where non-compliance is persistent or where the interests of customers or TPPs require it</li>
      </EdBullets>
      <EdProse>Nebras will act proportionately. A single month below target that is attributable to a well-understood, remediated incident will normally require only a post-incident review. Repeated shortfalls, or shortfalls without a credible remediation plan, will attract progressively firmer engagement.</EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="incidents"
      num="05"
      color="var(--at-navy)"
      eyebrow="Incident communication"
      title="Severity, acknowledgement, and updates"
      tone="cream"
    >
      <h3>Severity definitions</h3>
      <EdSeverityTable :rows="severities" />

      <h3>LFI obligations during an incident</h3>
      <EdStages>
        <EdStage num="01" title="Acknowledge promptly">
          <p>For <strong>P1</strong> incidents, acknowledgement is expected within <strong>15 minutes</strong> of the LFI becoming aware. For <strong>P2</strong>, within <strong>1 hour</strong>. For <strong>P3</strong>, within the next business day.</p>
        </EdStage>
        <EdStage num="02" title="Notify Nebras">
          <p>Nebras operates a dedicated incident channel for each LFI. Incidents are not to be reported by email alone.</p>
        </EdStage>
        <EdStage num="03" title="Provide regular status updates">
          <p>For <strong>P1</strong>, updates at least every <strong>30 minutes</strong> until service is restored. For <strong>P2</strong>, at least every <strong>2 hours</strong>.</p>
        </EdStage>
        <EdStage num="04" title="Declare resolved">
          <p>Only once service has been stable for a reasonable observation period (typically 15 minutes for P1, 30 minutes for P2).</p>
        </EdStage>
      </EdStages>

      <EdCallout color="var(--at-navy)">
        <p>Nebras takes responsibility for cascading incident information to affected TPPs through its own communication channels. <strong>LFIs are not expected to communicate directly with TPPs during incidents.</strong></p>
      </EdCallout>

      <h3>Post-incident review</h3>
      <EdProse>For every P1 incident &mdash; and for any P2 incident that recurs within 30 days &mdash; the LFI is expected to provide a post-incident review to Nebras within <strong>five business days</strong> of resolution. The review should cover:</EdProse>
      <EdBullets>
        <li>A factual timeline of the incident</li>
        <li>The root cause</li>
        <li>The customer and TPP impact</li>
        <li>The remediation already applied</li>
        <li>Any further actions the LFI will take to prevent recurrence, with owners and dates</li>
      </EdBullets>
      <EdProse>Nebras may share anonymised learnings from post-incident reviews across the ecosystem where doing so would help other LFIs avoid similar issues.</EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="maintenance"
      num="06"
      color="var(--at-teal-deep)"
      eyebrow="Planned maintenance"
      title="Zero-downtime first; planned downtime counts against target"
      tone="surface"
    >
      <EdProse>LFIs are expected to deliver changes to their production services without downtime wherever possible. Where planned downtime is genuinely unavoidable:</EdProse>
      <EdBullets>
        <li>Nebras and TPPs must be notified through the Nebras portal at least <strong>72 hours in advance</strong></li>
        <li>The maintenance window must fall during a low-traffic period, typically between <strong>02:00 and 05:00 Gulf Standard Time</strong></li>
        <li>The window must be kept as short as the change requires</li>
      </EdBullets>

      <EdCallout color="#B33A3A">
        <p><strong>Planned maintenance is not excluded from the availability calculation.</strong> Downtime during an announced maintenance window still counts toward the LFI's monthly availability figure. This is deliberate: the policy is intended to encourage investment in zero-downtime deployment practices, not to create a permitted quota of offline time.</p>
      </EdCallout>
    </EdSectionBand>

    <EdSectionBand
      id="improvement"
      num="07"
      color="var(--at-gold)"
      eyebrow="Continuous improvement"
      title="A minimum, not an aspiration"
      tone="cream"
      narrow
    >
      <EdProse>Meeting the 99.5% target is a minimum expectation rather than an aspiration. LFIs are expected to treat availability as an ongoing discipline and, in particular, to:</EdProse>
      <EdBullets>
        <li>Track recurring causes of unavailability and address them at source</li>
        <li>Review monthly availability reports with their engineering and operations leadership</li>
        <li>Invest in the monitoring, alerting, and on-call capabilities required to detect and recover from incidents quickly</li>
        <li>Participate in ecosystem-wide reviews convened by Nebras to share practices and identify common causes of unavailability</li>
      </EdBullets>
    </EdSectionBand>

    <EdRelatedCards eyebrow="Read alongside" title="Related policies">
      <EdRelatedCard
        href="/policy/api-response-time"
        category="LFIs · Nebras"
        category-color="var(--at-teal)"
        title="API Response Time Policy"
        desc="The 500 ms p95 standard, measured end to end across the whole TPP-facing request."
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
