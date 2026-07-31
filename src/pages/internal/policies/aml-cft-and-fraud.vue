<route lang="yaml">
meta:
  layout: internal
  title: AML/CFT and Fraud Policy
  next: false
  prev: false
  aside: false
</route>

<script setup lang="ts">
import { useHead } from '@unhead/vue'

useHead({ title: 'AML/CFT and Fraud Policy · Internal Policies' })

interface Section { id: string; label: string }
interface MetaItem { label: string; value: string }
interface KeyNum { value: string; unit?: string; label: string }

const sections: Section[] = [
  { id: 'overview',     label: 'Overview' },
  { id: 'roles',        label: 'Roles' },
  { id: 'requirements', label: 'AML/CFT requirements' },
  { id: 'procedures',   label: 'AML/CFT procedures' },
  { id: 'prevention',   label: 'Fraud preventive controls' },
  { id: 'detection',    label: 'Fraud detection' },
  { id: 'assessment',   label: 'Fraud risk assessment' },
  { id: 'incidents',    label: 'Incidents & coordination' },
  { id: 'governance',   label: 'Monitoring & review' },
]

const meta: MetaItem[] = [
  { label: 'Applies to', value: 'Nebras · LFIs · TPPs' },
  { label: 'Classification', value: 'Restricted' },
  { label: 'Version', value: '1.0 · Aug 2025' },
]

const keyNums: KeyNum[] = [
  { value: '5', unit: 'yr', label: 'Payment and entity record retention' },
  { value: '24', unit: 'h', label: 'Compliance review of a reported incident' },
  { value: '5', unit: 'days', label: 'Root Cause Analysis completion' },
]
</script>

<template>
  <div class="ed-page">
    <EdBackStrip href="/internal/policies/" text="All policies" />

    <EdHero
      eyebrow="Internal · Restricted"
      eyebrow-color="var(--at-blue)"
      title="AML/CFT and Fraud Policy"
      :meta="meta"
      lede="Nebras operates the UAE Open Finance API Hub &mdash; it does <strong>not</strong> hold customer funds, maintain client accounts, or conduct customer-facing transactions. Its AML/CFT role is therefore <strong>limited</strong>, confined to the regulatory fee collection service, and complements rather than replaces the primary obligations of LFIs, TPPs, and their commercial banking partners. Alongside this, Nebras enforces robust fraud prevention and detection controls with a zero-tolerance approach."
      :key-nums="keyNums"
    />

    <EdInPageNav :sections="sections" />

    <EdSectionBand
      id="overview"
      num="01"
      color="var(--at-teal)"
      eyebrow="Introduction"
      title="Purpose, scope, and Nebras&rsquo;s limited role"
      lede="Established as a regulated API Hub operator under the Central Bank of the UAE (CBUAE), Nebras Open Finance LLC enables secure data sharing and controlled transaction initiation. Its activities complement &mdash; not replace &mdash; the AML/CFT responsibilities of LFIs and TPPs."
      tone="cream"
    >
      <EdNote>
        <p>Nebras maintains a limited AML/CFT role, confined strictly to its regulatory fee collection service. It does <strong>not</strong> conduct customer-facing financial transactions, does <strong>not</strong> maintain client funds, and does <strong>not</strong> perform transaction monitoring, sanctions screening, or file Suspicious Activity Reports (SARs). AML/CFT compliance relating to customer transactions remains the responsibility of regulated LFIs, TPPs, and their banking partners.</p>
      </EdNote>

      <h3>Purpose</h3>
      <EdBullets>
        <li>Define Nebras&rsquo;s limited AML/CFT obligations within the Open Finance framework.</li>
        <li>Ensure compliance with CBUAE AML/CFT Guidelines, Open Finance Regulation, and international best practices for fraud prevention.</li>
        <li>Clarify that Nebras maintains robust controls to prevent, detect, and respond to fraud, even though it does not perform transaction monitoring, sanctions screening, or file SARs.</li>
        <li>Outline controls governing AML/CFT and fraud &mdash; due diligence, anomaly escalation, incident management, and risk handling associated with the collection service for regulatory fees between TPPs and LFIs.</li>
        <li>Assign roles and responsibilities across Nebras for the implementation and oversight of AML/CFT and fraud prevention processes.</li>
      </EdBullets>

      <h3>Scope, audience, and goals</h3>
      <EdBullets>
        <li><strong>Scope</strong> &mdash; all Nebras staff, contractors, Board members, and authorized third parties; all activities involving the API Hub, Trust Framework, Open Finance Standards, and the collection of regulatory fees from LFIs and TPPs; and all LFIs and TPPs connected to Nebras in their interactions with the platform.</li>
        <li><strong>Audience</strong> &mdash; all Nebras employees, temporary staff, consultants, and authorized service partners.</li>
        <li><strong>Goals</strong> &mdash; ensure compliance with relevant AML/CFT and fraud-related legal and regulatory requirements; articulate Nebras&rsquo;s limited AML/CFT role; ensure all collected payments follow applicable financial crime and fraud controls through licensed banking partners; and strengthen oversight of anomalies, escalation mechanisms, and fraud incident management.</li>
      </EdBullets>

      <h3>Key terms</h3>
      <EdBullets>
        <li><strong>API Hub</strong> &mdash; the Open Finance hub that enables API calls from TPPs to LFIs.</li>
        <li><strong>Collection Service</strong> &mdash; Nebras&rsquo;s mechanism for collecting regulatory fees from LFIs and TPPs through commercial banking partners; all payments are subject to the partners&rsquo; AML and financial crime controls.</li>
        <li><strong>Anomaly</strong> &mdash; any irregularity detected within collection service payments requiring escalation.</li>
        <li><strong>Regulated Parties</strong> &mdash; LFIs and TPPs licensed and screened by CBUAE.</li>
        <li><strong>Due Diligence</strong> &mdash; the assessment of a service provider&rsquo;s capability, financial stability, operational controls, technology, and risk posture before onboarding.</li>
      </EdBullets>

      <h3>Exceptions</h3>
      <EdProse>
        <p>Any exception to this policy MUST be approved explicitly by the Board Risk &amp; Compliance Committee and reassessed when necessary.</p>
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="roles"
      num="02"
      color="var(--at-gold)"
      eyebrow="Roles and responsibilities"
      title="Who owns what"
      lede="Accountability for AML/CFT and fraud controls is distributed from the Board through to individual employees."
      tone="surface"
    >
      <EdBullets>
        <li><strong>Board Risk and Compliance Committee</strong> &mdash; approves this policy and oversees its implementation; ensures an appropriate governance framework with clearly defined roles, responsibilities, and accountability; and ensures senior management maintains the systems, controls, and resources needed to comply with regulatory expectations.</li>
        <li><strong>The CEO</strong> &mdash; ensures alignment with CBUAE AML/CFT and fraud regulations, enforces organization-wide compliance with this policy, and ensures adequate resources and oversight mechanisms are in place.</li>
        <li><strong>Risk and Compliance Lead</strong> &mdash; establishes controls for AML/CFT and fraud exposures linked to the collection service, reviews collection service data for anomalies, escalates concerns to the CEO or CBUAE where required, reports material risks to the Board Risk &amp; Compliance Committee, and updates the policy with regulatory changes.</li>
        <li><strong>Operations Team</strong> &mdash; records payments, flags irregularities, and supports quarterly reviews.</li>
        <li><strong>Nebras Employees</strong> &mdash; report suspicious behaviours or irregularities to Compliance and support compliance with this policy.</li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="requirements"
      num="03"
      color="var(--at-blue)"
      eyebrow="AML/CFT requirements"
      title="Regulatory expectations and exposure oversight"
      lede="Nebras maintains a governance framework that meets its AML/CFT obligations without assuming the regulatory responsibilities of LFIs and TPPs."
      tone="cream"
    >
      <h3>Regulatory and compliance expectations</h3>
      <EdBullets>
        <li>Nebras&rsquo;s limited AML/CFT role MUST NOT replace or dilute the primary obligations of LFIs and TPPs under UAE regulations.</li>
        <li>AML/CFT compliance relating to customer transactions remains the responsibility of regulated LFIs, TPPs, and their banking partners.</li>
        <li>The fee-collection service is operated so it does not compromise Nebras&rsquo;s ability to oversee its operational environment.</li>
        <li>All payment flows are routed exclusively through regulated commercial banking partners that apply AML, sanctions, and financial crime screening in line with UAE requirements.</li>
        <li>Nebras does not engage with, onboard, or facilitate entities that are not duly licensed or screened by the CBUAE.</li>
      </EdBullets>

      <h3>Assessing AML/CFT exposure within the collection service</h3>
      <EdBullets>
        <li>The nature and structure of the fee-collection activity &mdash; and any associated financial crime exposure &mdash; are periodically assessed at a risk-based level.</li>
        <li>The regulatory status of all LFIs and TPPs is validated through CBUAE prior to any interaction or onboarding.</li>
        <li>Commercial banking partners supporting the collection service demonstrate credible AML, sanctions, and due-diligence controls consistent with UAE regulatory expectations.</li>
        <li>The environment is monitored for potential indicators of AML/CFT concerns, including irregular payment patterns, repeated disputes, unexpected sources of funds, and any anomalies identified through Nebras&rsquo;s internal risk-monitoring frameworks.</li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="procedures"
      num="04"
      color="var(--at-blue-deep)"
      eyebrow="AML/CFT procedures"
      title="Due diligence and payment processing controls"
      tone="surface"
    >
      <h3>Due diligence</h3>
      <EdBullets>
        <li>Verify LFI/TPP licensing status via CBUAE before onboarding.</li>
        <li>Collect basic entity and authorized signatory details.</li>
      </EdBullets>

      <h3>Payment processing controls</h3>
      <EdBullets>
        <li>Record regulatory fee payments in an internal ledger.</li>
        <li>Monitor for anomalies such as irregular or delayed payments, unexpected payment sources, and repeated disputes or reversals.</li>
        <li>Escalate anomalies promptly.</li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="prevention"
      num="05"
      color="var(--at-navy)"
      eyebrow="Fraud preventive controls"
      title="Onboarding, access governance, and settlement"
      lede="Preventive controls centre on maker&ndash;checker discipline across onboarding, access provisioning, and fee settlement."
      tone="cream"
    >
      <h3>TPP &amp; LFI onboarding controls</h3>
      <EdBullets>
        <li>Verify licensing status from official CBUAE sources before granting TPP access.</li>
        <li>Ensure no technical credentials are provisioned before Compliance signs off.</li>
        <li>Maintain onboarding checklists with mandatory maker&ndash;checker approval.</li>
      </EdBullets>

      <h3>TPP and LFI access governance</h3>
      <EdBullets>
        <li>All access provisioning, modification, or revocation MUST follow a maker&ndash;checker approval flow.</li>
        <li>Access is granted only after verifying valid role justification, user identity, and active employment or contract.</li>
        <li>Quarterly access reviews MUST be conducted by Compliance and Technology.</li>
      </EdBullets>

      <h3>Fee calculation &amp; settlement controls</h3>
      <EdBullets>
        <li>All fee-related activities MUST follow a maker&ndash;checker process: the maker (Operations) prepares fee schedules, invoices, and reconciliations; the checker (Finance) verifies accuracy and approves.</li>
        <li>Exceptions &mdash; such as disputes or incorrect amounts &mdash; MUST be escalated to Nebras Management.</li>
        <li>Monthly reconciliation between system-generated logs and collected fees.</li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="detection"
      num="06"
      color="var(--at-teal-deep)"
      eyebrow="Fraud detection controls"
      title="Monitoring, anomaly detection, and red flags"
      lede="Audit logging and continuous monitoring MUST be enabled for all system-critical actions."
      tone="surface"
    >
      <h3>System integrity and unauthorized access monitoring</h3>
      <EdBullets>
        <li>Access changes and privilege escalations.</li>
        <li>API credential issuance and potential misuse.</li>
        <li>TPP onboarding activities.</li>
        <li>Attempts to grant access to unlicensed entities.</li>
        <li>Attempts originating outside the consent parameters or Trust Framework, including requests that cannot be reconciled to an approved Trust Framework role.</li>
        <li>Role changes executed outside the defined approval workflow.</li>
      </EdBullets>
      <EdProse>
        <p>Compliance and Technology MUST jointly review these controls to ensure system integrity. Audit logs MUST be reviewed at least monthly, and alerts related to unauthorized or anomalous activity MUST be reviewed within one business day.</p>
      </EdProse>

      <h3>Fee anomaly detection</h3>
      <EdBullets>
        <li>Sudden changes in expected fee patterns.</li>
        <li>Duplicate or missing settlement transactions.</li>
        <li>Irregularities in LFI/TPP usage logs.</li>
      </EdBullets>
      <EdProse>
        <p>Any anomaly MUST be escalated to Compliance immediately.</p>
      </EdProse>

      <EdNote>
        <h4>Red flags for operational fraud</h4>
        <EdBullets>
          <li>Bypassing maker&ndash;checker steps.</li>
          <li>Unexplained role changes.</li>
          <li>Credential issuance not logged.</li>
          <li>Inconsistent TPP licensing evidence.</li>
          <li>Manual overrides without justification.</li>
        </EdBullets>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="assessment"
      num="07"
      color="var(--at-teal)"
      eyebrow="Fraud risk assessment"
      title="A documented methodology aligned with ERM"
      lede="Nebras maintains a documented fraud risk assessment methodology aligned with the Enterprise Risk Management (ERM) framework. Fraud risks are identified, assessed, monitored, and reported as part of the organization&rsquo;s risk management cycle."
      tone="cream"
    >
      <h3>The fraud risk assessment shall</h3>
      <EdBullets>
        <li>Identify inherent fraud risks relevant to Nebras&rsquo;s activities, including regulatory fee collection, system access, data integrity, third-party interactions, and internal operations.</li>
        <li>Assess fraud risks based on likelihood and impact, consistent with the risk evaluation methodology defined in the ERM Policy.</li>
        <li>Identify existing preventive and detective controls and evaluate residual fraud risk.</li>
        <li>Define risk ownership and required mitigation actions for material fraud risks.</li>
        <li>Be reviewed at least annually, or upon the occurrence of material incidents or changes to Nebras&rsquo;s operating environment.</li>
      </EdBullets>
      <EdProse>
        <p>Material fraud risks and assessment outcomes are reported to the Board Risk and Compliance Committee as part of regular ERM reporting.</p>
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="incidents"
      num="08"
      color="var(--at-gold)"
      eyebrow="Incident management"
      title="Reporting, escalation, and regulatory coordination"
      lede="All employees MUST immediately report any suspected fraud to Compliance through the designated reporting channel, using the standardized fraud incident reporting template."
      tone="surface"
    >
      <h3>Escalation flow</h3>
      <EdStages>
        <EdStage num="01" title="Internal reporting" num-color="var(--at-gold)">
          <p>Employees immediately report suspected fraud to Compliance through the designated channel, using the standardized fraud incident reporting template.</p>
        </EdStage>
        <EdStage num="02" title="Compliance review" num-color="var(--at-gold)">
          <p>Compliance reviews the reported incident within <strong>24 hours</strong>.</p>
        </EdStage>
        <EdStage num="03" title="Investigation" num-color="var(--at-gold)">
          <p>Technology and/or Finance conduct the investigation, depending on the incident type.</p>
        </EdStage>
        <EdStage num="04" title="Root Cause Analysis" num-color="var(--at-gold)">
          <p>A Root Cause Analysis (RCA) is completed within <strong>5 business days</strong>.</p>
        </EdStage>
        <EdStage num="05" title="Remediation to closure" num-color="var(--at-gold)">
          <p>All remediation actions are formally documented and tracked to closure.</p>
        </EdStage>
      </EdStages>

      <h3>Regulatory coordination and consumer protection</h3>
      <EdBullets>
        <li>Nebras does not carry AML or financial crime reporting obligations; these remain the responsibility of LFIs and TPPs.</li>
        <li>Nebras reports only internal operational fraud incidents when required under applicable UAE regulatory expectations.</li>
        <li><strong>Transparency</strong> &mdash; standards and consent flows provide transparency and security for end users.</li>
        <li><strong>Redress</strong> &mdash; LFIs and TPPs are responsible for handling consumer complaints and disputes.</li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="governance"
      num="09"
      color="var(--at-blue)"
      eyebrow="Monitoring, training and review"
      title="Recordkeeping, oversight, and enforcement"
      tone="cream"
      narrow
    >
      <h3>Record keeping</h3>
      <EdProse>
        <p>Nebras maintains payment and entity records for five (5) years, consistent with CBUAE guidelines.</p>
      </EdProse>

      <h3>Monitoring, training, and reporting</h3>
      <EdBullets>
        <li>Quarterly reviews of collection service payments, with ongoing oversight from the Risk Lead and Senior Management.</li>
        <li>Annual AML/CFT training covering Nebras&rsquo;s limited AML/CFT role, the responsibilities of LFIs and TPPs, identifying anomalies within the collection service, and escalation processes; non-compliance is reported to the Compliance Department.</li>
        <li>Annual compliance summaries to the Board Risk &amp; Compliance Committee, with immediate escalation of significant anomalies to the CEO and CBUAE.</li>
      </EdBullets>

      <h3>Policy review and enforcement</h3>
      <EdBullets>
        <li>Annual review, or earlier if regulatory updates require; exceptions require Board Committee approval.</li>
        <li><strong>LFIs/TPPs</strong> &mdash; non-compliance or systemic issues are escalated to CBUAE in line with Open Finance Regulation.</li>
        <li><strong>Nebras staff</strong> &mdash; violations of this policy may result in disciplinary action aligned with HR procedures.</li>
      </EdBullets>
    </EdSectionBand>

    <EdRelatedCards eyebrow="Read alongside" title="Related policies">
      <EdRelatedCard
        href="/internal/policies/enterprise-risk-management"
        category="Risk, Security & Compliance"
        title="Enterprise Risk Management Policy"
        desc="The ERM framework under which fraud risks are identified, assessed, and reported to the Board Risk & Compliance Committee."
      />
      <EdRelatedCard
        href="/internal/policies/complaints-and-disputes"
        category="Customers & Conduct"
        title="Complaints and Disputes Management Policy"
        desc="How Nebras resolves empirical disputes and escalates fraud-related and subjective matters to the CBUAE."
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
