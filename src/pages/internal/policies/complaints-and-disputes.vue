<route lang="yaml">
meta:
  layout: internal
  title: Complaints and Disputes Management Policy
  next: false
  prev: false
  aside: false
</route>

<script setup lang="ts">
import { useHead } from '@unhead/vue'

useHead({ title: 'Complaints and Disputes Management Policy · Internal Policies' })

interface Section { id: string; label: string }
interface MetaItem { label: string; value: string }
interface KeyNum { value: string; unit?: string; label: string }

const sections: Section[] = [
  { id: 'overview',       label: 'Overview' },
  { id: 'scope',          label: 'Scope & definitions' },
  { id: 'categories',     label: 'Categories' },
  { id: 'workflow',       label: 'Workflow' },
  { id: 'slas',           label: 'SLAs & appeals' },
  { id: 'responsibilities', label: 'Responsibilities' },
  { id: 'records',        label: 'Records & monitoring' },
]

const meta: MetaItem[] = [
  { label: 'Applies to', value: 'Nebras · LFIs · TPPs' },
  { label: 'Classification', value: 'Restricted' },
  { label: 'Version', value: '1.0 · Aug 2025' },
]

const keyNums: KeyNum[] = [
  { value: '24', unit: 'h', label: 'Acknowledgment of a raised dispute' },
  { value: '10–15', unit: 'days', label: 'Resolution of empirical disputes' },
  { value: '5', unit: 'yr', label: 'Minimum record retention' },
]
</script>

<template>
  <div class="ed-page">
    <EdBackStrip href="/internal/policies/" text="All policies" />

    <EdHero
      eyebrow="Internal · Restricted"
      eyebrow-color="var(--at-teal)"
      title="Complaints and Disputes Management Policy"
      :meta="meta"
      lede="Nebras facilitates the resolution of complaints and disputes across the Open Finance ecosystem by leveraging its position as API Hub operator &mdash; resolving <strong>empirical</strong> (verifiable) issues internally and escalating <strong>non-empirical</strong> (subjective or fraud-related) matters to the CBUAE."
      :key-nums="keyNums"
    />

    <EdInPageNav :sections="sections" />

    <EdSectionBand
      id="overview"
      num="01"
      color="var(--at-teal)"
      eyebrow="Overview"
      title="Purpose of this policy"
      lede="Nebras resolves verifiable issues using API Hub logs and data, and consults or escalates subjective and complex matters to the relevant parties &mdash; LFIs, TPPs, and ultimately the CBUAE &mdash; to ensure fair and efficient handling that promotes trust in the ecosystem."
      tone="cream"
    >
      <h3>This policy aims to</h3>
      <EdBullets>
        <li>Provide a clear, structured process for raising, assessing, resolving, and escalating complaints and disputes.</li>
        <li>Align with the CBUAE Consumer Protection Regulations and Open Finance Regulation.</li>
        <li>Enhance ecosystem integrity through timely resolutions and learning from disputes to improve standards.</li>
        <li>Clarify Nebras&rsquo;s review and empirical-decisioning role &mdash; responsibility for consumer disputes lies with LFIs and TPPs, and subjective or fraud-case decisions reside with the CBUAE.</li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="scope"
      num="02"
      color="var(--at-gold)"
      eyebrow="Scope & definitions"
      title="What this policy covers"
      lede="This policy covers all types of complaints and disputes related to ecosystem activity."
      tone="surface"
    >
      <EdBullets>
        <li>TPP failings against regulations or standards.</li>
        <li>LFI failings against regulations or standards.</li>
        <li>Operational or technical failures in the API Hub (or Trust Framework) by Nebras.</li>
        <li>Consumer protection issues directly or indirectly impacting retail users via LFIs&rsquo; or TPPs&rsquo; Open Finance activity.</li>
      </EdBullets>

      <h3>Definitions</h3>
      <EdBullets>
        <li><strong>Empirical dispute</strong> &mdash; an issue that can be objectively verified using API Hub data, logs, or records (e.g. system errors or transaction mismatches), including submitted evidence from TPPs and LFIs.</li>
        <li><strong>Non-empirical dispute</strong> &mdash; a subjective, fraud-related, or complex issue requiring adjudication by the regulator, plus any case involving a failing of Nebras in its regulatory role.</li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="categories"
      num="03"
      color="var(--at-blue)"
      eyebrow="Dispute categories"
      title="How disputes are classified"
      lede="As set out in the Nebras Interaction Guide, disputes fall into the following categories."
      tone="cream"
    >
      <EdBullets>
        <li><strong>Technical issues</strong> &mdash; system downtime or API failures, to be filed within 2 hours of occurrence for priority handling.</li>
        <li><strong>Erroneous transactions</strong> &mdash; mismatches in data sharing or initiation, verifiable via logs.</li>
        <li><strong>Non-delivery of goods/services</strong> &mdash; disputes arising from failed Open Finance-enabled services.</li>
        <li><strong>Transaction disputes</strong> &mdash; conflicts over payment initiations or consents.</li>
        <li><strong>Other disputes</strong> &mdash; miscellaneous issues, such as standards compliance or ecosystem access.</li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="workflow"
      num="04"
      color="var(--at-blue-deep)"
      eyebrow="Dispute management workflow"
      title="From intake to closure"
      tone="surface"
    >
      <EdStages>
        <EdStage num="01" title="Raising a dispute" num-color="var(--at-blue-deep)">
          <p>Cases are received via the online portal, dedicated email, or telephone hotline, with acknowledgment sent within <strong>24 hours</strong>.</p>
        </EdStage>
        <EdStage num="02" title="Assessment" num-color="var(--at-blue-deep)">
          <p>The Operations team classifies the dispute, gathering initial evidence from API logs and Nebras systems.</p>
        </EdStage>
        <EdStage num="03" title="Further gathering from parties" num-color="var(--at-blue-deep)">
          <p>LFIs and TPPs may be asked to submit additional evidence into the process to support reaching a conclusion.</p>
        </EdStage>
        <EdStage num="04" title="Resolution" num-color="var(--at-blue-deep)">
          <p>Disputes with an empirical basis are resolved by Nebras, supported by data and fact-based evidence. Subjective or fraud-based cases &mdash; and cases relating to Nebras failings &mdash; are escalated to the CBUAE.</p>
        </EdStage>
        <EdStage num="05" title="Closure" num-color="var(--at-blue-deep)">
          <p>All parties are formally notified of outcomes, with reasons provided and feedback solicited for process improvement.</p>
        </EdStage>
      </EdStages>
    </EdSectionBand>

    <EdSectionBand
      id="slas"
      num="05"
      color="var(--at-navy)"
      eyebrow="SLAs & appeals"
      title="Service levels and the right to appeal"
      tone="cream"
    >
      <h3>Service level agreements</h3>
      <EdBullets>
        <li>Initial acknowledgment within <strong>1 business day</strong>.</li>
        <li>Resolution for empirical disputes within <strong>10–15 days</strong>.</li>
        <li>Non-empirical referrals within <strong>5 days</strong>.</li>
      </EdBullets>

      <h3>Appeals</h3>
      <EdBullets>
        <li>For empirical resolutions, appeals are submitted to the CEO within <strong>7 days</strong>.</li>
        <li>Non-empirical appeals go directly to the CBUAE.</li>
        <li>Appeals are processed and decided within <strong>7 business days</strong>, with written notification.</li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="responsibilities"
      num="06"
      color="var(--at-teal-deep)"
      eyebrow="Responsibilities"
      title="Who does what"
      tone="surface"
    >
      <EdBullets>
        <li><strong>Operations team</strong> &mdash; handles intake, assessment, resolution workflows, and initial communications.</li>
        <li><strong>CEO</strong> &mdash; reviews and decides on empirical disputes, ensuring impartiality.</li>
        <li><strong>Board Risk &amp; Compliance Committee</strong> &mdash; provides oversight, reviews policy effectiveness, and escalates systemic issues.</li>
        <li><strong>All staff</strong> &mdash; forward any disputes received to the Operations team and maintain confidentiality.</li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="records"
      num="07"
      color="var(--at-teal)"
      eyebrow="Records & monitoring"
      title="Documentation, recordkeeping, and review"
      tone="cream"
      narrow
    >
      <h3>Documentation and recordkeeping</h3>
      <EdBullets>
        <li>All disputes are logged in a secure, centralised database, including intake details, evidence, resolutions, and communications.</li>
        <li>Records are retained for a minimum of <strong>5 years</strong>, compliant with data protection laws, and accessible for audits or regulatory inquiries.</li>
      </EdBullets>

      <h3>Monitoring and reporting</h3>
      <EdBullets>
        <li>Bi-annual reviews of SLA compliance, dispute trends, and resolution rates are conducted by the Operations Lead.</li>
        <li>Reports are submitted to the Board Risk &amp; Compliance Committee, highlighting patterns for potential ecosystem improvements or policy updates.</li>
      </EdBullets>
    </EdSectionBand>

    <EdRelatedCards eyebrow="Read alongside" title="Related policies">
      <EdRelatedCard
        href="/internal/policies/retail-consumer-protection"
        category="Customers & Conduct"
        title="Retail Consumer Protection Policy"
        desc="Nebras's indirect role in supporting fair, transparent, and secure retail consumer experiences."
      />
      <EdRelatedCard
        href="/internal/policies/enterprise-risk-management"
        category="Risk, Security & Compliance"
        title="Enterprise Risk Management Policy"
        desc="The risk framework under which systemic dispute patterns are assessed and escalated."
      />
    </EdRelatedCards>
  </div>
</template>

<style scoped>
.ed-page {
  background: var(--at-bg-cream);
  color: var(--at-navy-deep);
  font-family: var(--at-sans);
}
</style>
