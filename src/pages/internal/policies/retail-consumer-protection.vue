<route lang="yaml">
meta:
  layout: internal
  title: Retail Consumer Protection Policy
  next: false
  prev: false
  aside: false
</route>

<script setup lang="ts">
import { useHead } from '@unhead/vue'

useHead({ title: 'Retail Consumer Protection Policy · Internal Policies' })

interface Section { id: string; label: string }
interface MetaItem { label: string; value: string }

const sections: Section[] = [
  { id: 'overview',        label: 'Overview' },
  { id: 'scope',           label: 'Scope & definitions' },
  { id: 'principles',      label: 'Principles' },
  { id: 'role',            label: 'Role & standards' },
  { id: 'liability',       label: 'Liability & model' },
  { id: 'monitoring',      label: 'Monitoring' },
  { id: 'responsibilities', label: 'Responsibilities & training' },
  { id: 'review',          label: 'Reporting & enforcement' },
]

const meta: MetaItem[] = [
  { label: 'Applies to', value: 'Nebras · LFIs · TPPs' },
  { label: 'Classification', value: 'Restricted' },
  { label: 'Version', value: '1.0 · Aug 2025' },
]
</script>

<template>
  <div class="ed-page">
    <EdBackStrip href="/internal/policies/" text="All policies" />

    <EdHero
      eyebrow="Internal · Restricted"
      eyebrow-color="var(--at-teal)"
      title="Retail Consumer Protection Policy"
      :meta="meta"
      lede="Nebras operates as the national API Hub and Trust Framework operator, facilitating secure data sharing and transaction initiation between LFIs and TPPs <strong>without direct consumer interaction</strong>. This policy sets out Nebras&rsquo;s indirect role in supporting transparent, clear, and fair retail customer experiences through standards that align with CBUAE mandates."
    />

    <EdInPageNav :sections="sections" />

    <EdSectionBand
      id="overview"
      num="01"
      color="var(--at-teal)"
      eyebrow="Overview"
      title="Nebras's indirect relationship with retail consumers"
      lede="Established under the CBUAE Open Finance Regulation 2025 (Notice No. 4046/2025, Circular No. 03/2025), Nebras supports fair retail customer experiences through its standards. LFIs and TPPs hold the primary responsibility for consumer protection obligations under the Consumer Protection Regulation 2020."
      tone="cream"
    >
      <h3>This policy aims to</h3>
      <EdBullets>
        <li>Define Nebras&rsquo;s role in supporting transparent, fair, and secure consumer experiences &mdash; with a focus on indirect support for retail customers.</li>
        <li>Ensure alignment with the CBUAE Consumer Protection Regulation 2020 (fairness, transparency, and disclosure) and the Open Finance Regulation 2025.</li>
        <li>Establish procedures for monitoring ecosystem compliance and managing consumer-related complaints.</li>
        <li>Clarify that Nebras does not assume liability for consumer protection, which remains with LFIs and TPPs under CBUAE supervision.</li>
        <li>Promote equitable access to services, sustainability through low-cost models, and user-friendly processes for retail customers.</li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="scope"
      num="02"
      color="var(--at-gold)"
      eyebrow="Scope & definitions"
      title="What this policy applies to"
      lede="This policy applies to all Nebras activities involving the API Hub, the Trust Framework, and the Standards &mdash; including rules for API consent flows, data portability, TPP certification, and other processes impacting retail users. It covers all company activity but does not extend to direct consumer interactions, as Nebras operates as the centralised infrastructure operator."
      tone="surface"
    >
      <h3>Definitions</h3>
      <EdBullets>
        <li><strong>Consumer / retail customer</strong> &mdash; the end user of financial products or services offered by LFIs and TPPs, as defined in the Consumer Protection Regulation 2020.</li>
        <li><strong>Empirical dispute</strong> &mdash; an issue verifiable through API Hub data or logs (e.g. technical failures, erroneous transactions).</li>
        <li><strong>Non-empirical dispute</strong> &mdash; a subjective or fraud-related issue, escalated to the CBUAE or to LFIs and TPPs.</li>
        <li><strong>Key Facts Sheets</strong> &mdash; mandatory TPP disclosures detailing product/service terms, risks, and fees, per the Open Finance Regulation 2025.</li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="principles"
      num="03"
      color="var(--at-blue)"
      eyebrow="Principles"
      title="Principles of retail consumer protection"
      lede="Nebras adheres to the following principles to indirectly support retail consumer protection."
      tone="cream"
    >
      <EdBullets>
        <li><strong>Transparency</strong> &mdash; ensure standards (e.g. consent flows) provide clear information to consumers via LFIs and TPPs.</li>
        <li><strong>Fairness</strong> &mdash; promote equitable access to Open Finance services without discrimination.</li>
        <li><strong>Security</strong> &mdash; mandate secure communication and authentication protocols under the Open Finance Regulation.</li>
        <li><strong>Accountability</strong> &mdash; reinforce that LFIs and TPPs are accountable for consumer protection compliance, with Nebras supporting through standards and monitoring.</li>
        <li><strong>Sustainability</strong> &mdash; support low-cost service provision and widespread distribution via commercial models.</li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="role"
      num="04"
      color="var(--at-blue-deep)"
      eyebrow="Role & standards"
      title="Nebras's role and the standards that support retail CX"
      tone="surface"
    >
      <h3>Nebras's role in the ecosystem</h3>
      <EdBullets>
        <li>Sets technical, CX, and operational standards to facilitate secure data sharing and transaction initiation.</li>
        <li>Does not interact directly with consumers or have access to their data, ensuring neutrality per the Open Finance Regulation 2025.</li>
        <li>Provides indirect support for retail customers by establishing standards that enhance transparency and fairness in consumer-facing processes managed by LFIs and TPPs.</li>
      </EdBullets>

      <h3>Standards supporting retail consumer experience</h3>
      <EdBullets>
        <li><strong>API consent flows</strong> &mdash; clear, user-friendly, secure consent mechanisms for data sharing and transaction initiation.</li>
        <li><strong>Data portability</strong> &mdash; seamless, secure data transfer between LFIs and TPPs.</li>
        <li><strong>TPP certification</strong> &mdash; functional and CX certifications that verify TPP compliance.</li>
        <li><strong>Zero-cost data sharing</strong> &mdash; low-cost retail services enabled by data sharing within normal volume bounds at no cost, per Nebras&rsquo;s commercial model.</li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="liability"
      num="05"
      color="var(--at-navy)"
      eyebrow="Liability & commercial model"
      title="Where liability sits"
      tone="cream"
    >
      <EdBullets>
        <li>Nebras enables zero-cost data sharing within normal volumes to support sustainable, low-cost retail services.</li>
        <li>LFIs and TPPs retain full liability for consumer protection and any issues arising from Open Finance activities, per the Open Finance Regulation 2025. Nebras does not assume any direct liability.</li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="monitoring"
      num="06"
      color="var(--at-teal-deep)"
      eyebrow="Monitoring & compliance"
      title="How compliance is monitored"
      tone="surface"
    >
      <EdBullets>
        <li><strong>API monitoring</strong> &mdash; continuous tracking of API activity, including logs, to detect anomalies (e.g. consent breaches, unauthorised access).</li>
        <li><strong>TPP certification</strong> &mdash; ongoing reviews of functional and CX certification to ensure adherence to standards.</li>
        <li><strong>Risk assessments</strong> &mdash; conducted for new or revised standards per the Enterprise Risk Management Policy.</li>
        <li><strong>Escalation</strong> &mdash; non-compliance by LFIs or TPPs is reported to the CBUAE for supervisory action.</li>
        <li>Annual compliance reviews verify alignment with the retail support principles.</li>
      </EdBullets>

      <h3>Complaint and dispute handling</h3>
      <EdBullets>
        <li>All complaints, including those from LFI/TPP customers relating to retail experiences, are processed through Nebras&rsquo;s dispute management system via TPP/LFI logging.</li>
        <li>All processes and SLAs are held within the Nebras Interaction Guide.</li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="responsibilities"
      num="07"
      color="var(--at-teal)"
      eyebrow="Responsibilities & training"
      title="Accountability and awareness"
      tone="cream"
    >
      <h3>Responsibilities and accountability</h3>
      <EdBullets>
        <li><strong>Board Risk &amp; Compliance Committee</strong> &mdash; oversees policy implementation and compliance.</li>
        <li><strong>CEO</strong> &mdash; ensures standards align with CBUAE regulations.</li>
        <li><strong>Executive officers</strong> &mdash; develop and maintain standards impacting retail customer experiences.</li>
        <li><strong>Risk and Compliance Lead</strong> &mdash; monitors ecosystem risks, assesses retail impacts, and oversees compliance.</li>
        <li><strong>Operations team</strong> &mdash; manages complaint workflows.</li>
        <li><strong>All staff</strong> &mdash; report potential issues promptly to supervisors or the Risk Lead.</li>
      </EdBullets>

      <h3>Training and awareness</h3>
      <EdBullets>
        <li>Annual training for all staff on Nebras policies, the CBUAE Consumer Protection Regulation, and the Open Finance Regulation.</li>
        <li>Topics: Nebras&rsquo;s indirect role in retail support, complaint handling, API monitoring procedures, and retail CX standards.</li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="review"
      num="08"
      color="var(--at-gold)"
      eyebrow="Reporting & enforcement"
      title="Monitoring, reporting, review, and enforcement"
      tone="surface"
      narrow
    >
      <EdBullets>
        <li><strong>Monitoring</strong> &mdash; quarterly reviews of API logs and certification outcomes, with annual compliance reviews focused on retail impacts.</li>
        <li><strong>Reporting</strong> &mdash; an annual report to the Board Risk &amp; Compliance Committee on disputes, compliance, and ecosystem issues.</li>
        <li><strong>Review</strong> &mdash; annual policy review, or ad hoc if triggered by CBUAE regulation changes, business needs, or incidents. Exceptions are approved by the Board.</li>
        <li><strong>Enforcement</strong> &mdash; internal violations (e.g. failure to report issues) may lead to disciplinary action; systemic ecosystem issues, including those affecting retail customers, are reported to the CBUAE for enforcement under the Open Finance Regulation.</li>
      </EdBullets>
    </EdSectionBand>

    <EdRelatedCards eyebrow="Read alongside" title="Related policies">
      <EdRelatedCard
        href="/internal/policies/complaints-and-disputes"
        category="Customers & Conduct"
        title="Complaints and Disputes Management Policy"
        desc="The structured process for raising, assessing, resolving, and escalating complaints and disputes."
      />
      <EdRelatedCard
        href="/internal/policies/marketing-and-advertising"
        category="Customers & Conduct"
        title="Marketing and Advertising Policy"
        desc="Standards for accurate, fair, and compliant marketing and advertising."
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
