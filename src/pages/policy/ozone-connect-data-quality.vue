<route lang="yaml">
meta:
  title: Ozone Connect Data Quality Policy
  appliesTo:
    - Licensed Financial Institutions (LFIs)
    - Nebras
  purpose: Defines data quality expectations — required and optional field delivery, accuracy, real-time freshness — for data returned by an LFI's Ozone Connect endpoints, plus the Data Mapping Commitment and the monitoring that holds LFIs to it.
  readTime: "7 min"
  updated: "2026-04-22"
</route>

<script setup lang="ts">
interface Section { id: string; label: string }
interface MetaItem { label: string; value: string }
interface KeyNum { value: string; unit?: string; label: string }

const sections: Section[] = [
  { id: 'scope',          label: 'Scope' },
  { id: 'expectations',   label: 'Expectations' },
  { id: 'mapping',        label: 'Data Mapping' },
  { id: 'proving',        label: 'Live proving' },
  { id: 'monitoring',     label: 'Monitoring' },
  { id: 'improvement',    label: 'Improvement' },
]

const meta: MetaItem[] = [
  { label: 'Applies to', value: 'LFIs · Nebras' },
  { label: 'Read',       value: '7 min' },
  { label: 'Updated',    value: '22 Apr 2026' },
]

const keyNums: KeyNum[] = [
  { value: '100', unit: '%',  label: 'Required-field delivery rate' },
  { value: 'Real',            label: 'Time data freshness' },
]
</script>

<template>
  <div class="ed-page">
    <EdBackStrip href="/policy/" text="All policies" />

    <EdHero
      eyebrow="Operate · Measure · Improve"
      title="Ozone Connect Data Quality Policy"
      :meta="meta"
      lede="Defines the data quality expectations for data returned by an LFI's Ozone Connect endpoints &mdash; completeness, accuracy, and timeliness. The value of Open Finance to customers and TPPs depends on these properties holding."
      :key-nums="keyNums"
    />

    <EdInPageNav :sections="sections" />

    <EdSectionBand
      id="scope"
      num="01"
      color="var(--at-teal)"
      eyebrow="Scope"
      title="Endpoints whose role is to return data"
      lede="Applies to the <strong>response payloads of Ozone Connect endpoints that return data</strong> &mdash; that is, endpoints whose role is to provide information back to the TPP about customers, accounts, products, or services."
      tone="cream"
    >
      <h3>In scope (examples)</h3>
      <EdBullets>
        <li>Bank Data Sharing reads (<code>GET /accounts</code>, <code>GET /accounts/{accountId}/balances</code>, <code>GET /accounts/{accountId}/transactions</code>, and related endpoints)</li>
        <li>Products and Leads reads (<code>GET /products</code>, and the data returned after lead creation)</li>
        <li>Insurance policy and related data reads</li>
        <li>Any future Ozone Connect endpoint whose primary purpose is to return data about a customer, account, product, or service</li>
      </EdBullets>

      <h3>Out of scope</h3>
      <EdBullets>
        <li>Action and initiation endpoints that do not return domain data (for example <code>POST /payments</code>, <code>POST /customers/action/cop-query</code>, and similar). These are governed by the <a href="/policy/ozone-connect-availability">Availability Policy</a> and the <a href="/policy/ozone-connect-response-time">Response Time Policy</a>, not this one.</li>
        <li>Internal system data that is not part of the published Ozone Connect OpenAPI specifications</li>
      </EdBullets>

      <EdProse>Where a data-returning endpoint is involved in a service initiation flow (for example returning payment status data), the data quality expectations in this policy apply to the data fields in the response.</EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="expectations"
      num="02"
      color="var(--at-gold)"
      eyebrow="Delivery expectations"
      title="Required, optional, accurate, current"
      lede="The Ozone Connect OpenAPI specifications define, for each in-scope endpoint, the fields that may appear in a response and which of those fields are required. LFIs are expected to deliver data against those specifications as follows."
      tone="surface"
    >
      <EdCompareCards>
        <EdCompareCard
          accent="#B33A3A"
          kicker="Required fields"
          example="MUST be present"
        >
          <ul>
            <li>Fields marked as required in the Ozone Connect OpenAPI specification <strong>must</strong> be delivered on every response where the endpoint returns data for the relevant resource</li>
            <li>A required field is required because TPPs and downstream use cases cannot function reliably without it</li>
            <li>Missing or null required fields are treated as a <strong>data quality defect</strong> regardless of the underlying cause in the LFI's systems</li>
          </ul>
        </EdCompareCard>

        <EdCompareCard
          accent="var(--at-teal)"
          kicker="Optional fields"
          example="MUST if data exists"
        >
          <ul>
            <li>Fields that are optional in the spec <strong>must</strong> be delivered whenever the underlying data exists in the LFI's systems and can be mapped to the specification</li>
            <li>"Exists and can be mapped" means the data is held by the LFI in some form, and there is a reasonable mapping from the LFI's internal representation to the specified field</li>
            <li>LFIs are not expected to invent data they do not hold, but are expected to deliver data they do hold</li>
          </ul>
        </EdCompareCard>
      </EdCompareCards>

      <h3>Accuracy</h3>
      <EdProse>Data returned on in-scope responses <strong>must</strong> match the LFI's system of record. Values that are present must be correct &mdash; amounts, identifiers, dates, statuses, names, and every other specified field.</EdProse>
      <EdBullets>
        <li><strong>Field values</strong> &mdash; the value returned is the value held in the LFI's systems</li>
        <li><strong>Units and formats</strong> &mdash; currency, precision, date-time format, status enumerations, and identifiers conform to the specification</li>
        <li><strong>Relationships between fields</strong> &mdash; values that relate to one another remain consistent (for example available balance consistent with booked and pending movements)</li>
      </EdBullets>
      <EdProse>Defects in accuracy are treated with the same severity as missing required fields.</EdProse>

      <h3>Real-time data</h3>
      <EdProse>Data returned on in-scope responses <strong>must</strong> reflect the current state of the LFI's systems at the time of the request. TPPs and their customers act on what they see; stale data breaks that trust.</EdProse>
      <EdBullets>
        <li>Data must be sourced from systems that reflect the current position of the customer, account, product, or service</li>
        <li>Where caching is used in the LFI's implementation, it must be bounded such that the data returned remains current for the purpose of the endpoint</li>
        <li>End-of-day or overnight batch propagation is <strong>not acceptable</strong> for any in-scope field unless explicitly recorded in the Data Mapping Commitment and agreed with Nebras</li>
      </EdBullets>
      <EdProse>Where an LFI operates processes that cause transient divergence (for example end-of-day cutover windows), these must be disclosed to Nebras and communicated to TPPs through the standard incident and maintenance channels defined in the <a href="/policy/ozone-connect-availability">Availability Policy</a>.</EdProse>

      <h3>Forward commitment</h3>
      <EdProse>LFIs are expected to progressively align their internal systems so that more optional fields can be delivered, more accurately, and more current, over time. The objective is for every LFI to converge on delivering the full specified data set, accurately and in real time, wherever the data realistically exists in the banking estate.</EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="mapping"
      num="03"
      color="var(--at-blue)"
      eyebrow="Data Mapping Commitment"
      title="The reference point for ongoing monitoring"
      tone="cream"
    >
      <EdProse>As part of onboarding to the ecosystem, each LFI provides a <strong>Data Mapping Commitment</strong> that records, for each in-scope endpoint and field, whether the LFI will deliver that field, on what basis, and with what freshness. This commitment is the reference point for Nebras's ongoing monitoring of data quality.</EdProse>
      <EdBullets>
        <li>Reviewed and updated when the LFI makes material changes to its core systems, when new Ozone Connect endpoints or fields are introduced, or when Nebras identifies gaps through monitoring</li>
        <li>LFIs are accountable for delivering against their Data Mapping Commitment. <strong>Under-delivery against the commitment is treated as a data quality defect.</strong></li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="proving"
      num="04"
      color="var(--at-blue-deep)"
      eyebrow="Live proving"
      title="Proving data quality before go-live"
      tone="surface"
    >
      <EdProse>Before an LFI is signed off as compliant with this policy and approved to go live on the ecosystem, the LFI must complete a <strong>live proving period</strong> with one or more TPPs.</EdProse>
      <EdBullets>
        <li>The LFI operates its Ozone Connect endpoints against real TPP traffic in production</li>
        <li>Field presence, accuracy, and real-time behaviour are observed across the proving period and compared against the LFI's Data Mapping Commitment and the specification</li>
        <li>Nebras reviews the results and confirms, or withholds, sign-off before the LFI is approved for general availability</li>
      </EdBullets>
      <EdProse>An LFI that does not demonstrably meet the expectations of this policy during proving remains in proving until it does, with Nebras support where required. This requirement applies equally to initial go-live and to any subsequent major version go-live.</EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="monitoring"
      num="05"
      color="var(--at-navy)"
      eyebrow="Monitoring & intervention"
      title="Continuous, central observation"
      lede="Nebras actively monitors the data returned by every LFI's Ozone Connect endpoints, using the API Hub's own logs and the schema validation performed on every response. Field-level presence, consistency, and freshness are observed centrally, in real time."
      tone="cream"
    >
      <h3>What is monitored</h3>
      <EdBullets>
        <li><strong>Required field presence</strong> &mdash; the rate at which required fields are delivered on in-scope responses</li>
        <li><strong>Optional field presence</strong> &mdash; the rate at which optional fields are delivered, measured against the LFI's Data Mapping Commitment</li>
        <li><strong>Accuracy and consistency</strong> &mdash; signals that indicate data divergence from the LFI's system of record, including internal inconsistencies in the response and divergence from expected formats</li>
        <li><strong>Freshness</strong> &mdash; signals that indicate data is not reflecting current state, including staleness patterns across endpoints</li>
        <li><strong>Peer benchmarks</strong> &mdash; each LFI's delivery is compared against similar LFIs in the ecosystem, so that outliers are visible</li>
      </EdBullets>

      <h3>When delivery falls short</h3>
      <EdProse>Where monitoring shows that an LFI is not delivering in line with the specification or its Data Mapping Commitment, or is materially behind its peer group on the same fields, Nebras will engage directly with the LFI. That engagement may include:</EdProse>
      <EdBullets>
        <li>Reviewing the specific fields, records, or time windows in question and the underlying cause</li>
        <li>Updating the Data Mapping Commitment where a field is genuinely not available in the LFI's systems</li>
        <li>Agreeing remediation plans and timelines where a field is available but not being delivered, or is being delivered incorrectly or with delay</li>
        <li>Escalating persistent or material non-delivery to the relevant regulatory authority where appropriate</li>
      </EdBullets>
      <EdProse>LFIs must provide Nebras with any information required to support this process, including mappings, field-level definitions, and roadmap commitments where relevant.</EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="improvement"
      num="06"
      color="var(--at-teal-deep)"
      eyebrow="Continuous improvement"
      title="Quality should improve over the life of the ecosystem"
      tone="surface"
      narrow
    >
      <EdProse>Data quality is expected to improve over the life of the ecosystem, not hold steady. LFIs are expected to:</EdProse>
      <EdBullets>
        <li>Treat gaps identified through Nebras's monitoring as inputs into their own technology roadmaps</li>
        <li>Prioritise closing data gaps that affect multiple TPP use cases or that place the LFI behind its peer group</li>
        <li>Communicate planned improvements to Nebras so that ecosystem expectations can be set accordingly</li>
      </EdBullets>
      <EdProse>Nebras will periodically publish anonymised ecosystem-wide views of data quality so that LFIs and TPPs share a common picture of where the ecosystem is strong and where it needs to improve.</EdProse>
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
        href="/policy/ozone-connect-response-time"
        category="LFIs · Nebras"
        category-color="var(--at-teal)"
        title="Ozone Connect Response Time Policy"
        desc="The 500 ms p95 latency standard for the same endpoints."
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
