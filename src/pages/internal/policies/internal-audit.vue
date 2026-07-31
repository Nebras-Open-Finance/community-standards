<route lang="yaml">
meta:
  layout: internal
  title: Internal Audit Policy
  next: false
  prev: false
  aside: false
</route>

<script setup lang="ts">
import { useHead } from '@unhead/vue'

useHead({ title: 'Internal Audit Policy · Internal Policies' })

interface Section { id: string; label: string }
interface MetaItem { label: string; value: string }
interface KeyNum { value: string; unit?: string; label: string }

const sections: Section[] = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'governance',   label: 'Governance' },
  { id: 'roles',        label: 'Roles & authorities' },
  { id: 'department',   label: 'The Department' },
  { id: 'methodology',  label: 'Audit methodology' },
  { id: 'review',       label: 'Review & references' },
]

const meta: MetaItem[] = [
  { label: 'Applies to', value: 'Nebras · All staff' },
  { label: 'Classification', value: 'Restricted' },
  { label: 'Version', value: '1.0 · Aug 2025' },
]

const keyNums: KeyNum[] = [
  { value: '3', unit: 'yr', label: 'Policy validity from date of approval' },
  { value: '5', unit: 'yr', label: 'External quality assessment cadence (minimum)' },
  { value: '2', unit: '×', label: 'Maximum target-date extensions per finding' },
]
</script>

<template>
  <div class="ed-page">
    <EdBackStrip href="/internal/policies/" text="All policies" />

    <EdHero
      eyebrow="Internal · Restricted"
      eyebrow-color="var(--at-navy)"
      title="Internal Audit Policy"
      :meta="meta"
      lede="Nebras Open Finance adopts the three lines of defense model. The Internal Audit Department (the &ldquo;Department&rdquo; or &ldquo;IAD&rdquo;) is established as the <strong>third line of defense</strong>, providing independent assurance and consulting services. This policy defines the Department&rsquo;s purpose, authority, and responsibility, its position within Nebras, and the scope of internal audit activities."
      :key-nums="keyNums"
    />

    <EdInPageNav :sections="sections" />

    <EdSectionBand
      id="introduction"
      num="01"
      color="var(--at-teal)"
      eyebrow="Introduction"
      title="Purpose, glossary, and approval"
      lede="The purpose of the Internal Audit Policy is to define the IAD&rsquo;s purpose, authority, and responsibility, establish its position within Nebras &mdash; including its functional reporting relationship with the Board &mdash; and define the scope of internal audit activities, as well as others&rsquo; responsibilities for providing access and cooperation during audits."
      tone="cream"
    >
      <h3>Reference documents</h3>
      <p>The Internal Audit Policy is established in alignment with the following:</p>
      <EdBullets>
        <li>Audit Committee&rsquo;s Charter.</li>
        <li>Internal Audit Manual.</li>
      </EdBullets>

      <h3>Glossary</h3>
      <EdBullets>
        <li><strong>Nebras Leadership</strong> &mdash; Executive Officers.</li>
        <li><strong>BoD</strong> &mdash; Board of Directors.</li>
        <li><strong>Business Department</strong> &mdash; any organizational department in Nebras.</li>
        <li><strong>HIA</strong> &mdash; Head of Internal Audit.</li>
        <li><strong>IA / IAD</strong> &mdash; Internal Audit / Internal Audit Department.</li>
        <li><strong>Three Lines Model</strong> &mdash; a risk management model with three levels of accountability.</li>
        <li><strong>IPPF</strong> &mdash; International Professional Practice Framework.</li>
      </EdBullets>

      <h3>Approval of the policy</h3>
      <p>The Internal Audit Policy MUST be approved by the Audit Committee of Nebras and SHALL be effective from the date of its approval for a period of three years, or the re-election of Audit Committee members, whichever comes earlier. The Head of Internal Audit reviews the policy periodically to ensure it remains updated. Any revision is deemed invalid unless authorized and formally approved per the authorities of the Audit Committee.</p>
    </EdSectionBand>

    <EdSectionBand
      id="governance"
      num="02"
      color="var(--at-gold)"
      eyebrow="Governance"
      title="Definition, framework, and independence"
      lede="Internal auditing is an independent, objective assurance and advisory service designed to add value and improve Nebras&rsquo;s operations. It helps Management and the Board accomplish their objectives by bringing a systematic, disciplined approach to evaluate and improve the effectiveness of governance, risk management, and control processes."
      tone="surface"
    >
      <h3>International Professional Practice Framework</h3>
      <p>In performing its duties, the IAD adheres to Nebras&rsquo;s policies and procedures as well as the IPPF, which consists of:</p>
      <EdBullets>
        <li><strong>Mandatory guidance</strong> &mdash; Core Principles, Definition, Code of Ethics, and the International Standards for the Professional Practice of Internal Auditing.</li>
        <li><strong>Recommended guidance</strong> &mdash; Implementation Guidance and Supplemental Guidance.</li>
      </EdBullets>

      <h3>Core principles</h3>
      <EdBullets>
        <li>Integrity.</li>
        <li>Competence and due professional care.</li>
        <li>Objective and free from undue influence (independent).</li>
        <li>Aligns with the strategies, objectives, and risks of the organization.</li>
        <li>Appropriately positioned and adequately resourced.</li>
        <li>Quality and continuous improvement.</li>
        <li>Communicates effectively.</li>
        <li>Provides risk-based assurance.</li>
        <li>Insightful, proactive, and future-focused.</li>
        <li>Promotes organizational improvement.</li>
      </EdBullets>

      <h3>Code of ethics</h3>
      <EdBullets>
        <li><strong>Integrity</strong> &mdash; the integrity of Nebras staff establishes trust and provides the basis for reliance on their judgment.</li>
        <li><strong>Objectivity</strong> &mdash; internal auditors exhibit the highest level of professional objectivity, make a balanced assessment of all relevant circumstances, and are not unduly influenced by their own interests or by others.</li>
        <li><strong>Confidentiality</strong> &mdash; respect the value and ownership of information received and do not disclose it without appropriate authority unless there is a legal or professional obligation to do so.</li>
        <li><strong>Competency</strong> &mdash; apply the knowledge, skills, and experience needed in the performance of internal audit services.</li>
      </EdBullets>

      <h3>Independence</h3>
      <p>The Head of Internal Audit has direct and unrestricted access to senior management and the BoD. Internal Audit is managed through dual reporting lines &mdash; functionally to the Audit Committee and administratively to the CEO through a dotted reporting line. The Audit Committee ensures the IAD is an independent function by:</p>
      <EdBullets>
        <li>Approving the internal audit policy.</li>
        <li>Approving the risk-based internal audit plan.</li>
        <li>Approving the internal audit budget and resource plan.</li>
        <li>Receiving communications from the Head of Internal Audit on the activity&rsquo;s performance relative to its plan and other matters.</li>
        <li>Approving decisions regarding the appointment and removal of the Head of Internal Audit.</li>
        <li>Approving the remuneration of the Head of Internal Audit.</li>
      </EdBullets>
      <p>The Department is free from interference in determining the scope of internal auditing, performing work, and reporting results. The Head of Internal Audit MUST disclose any such interference to the Audit Committee and discuss its implications, and MUST confirm the Department&rsquo;s organizational independence to the Audit Committee at least annually.</p>
    </EdSectionBand>

    <EdSectionBand
      id="roles"
      num="03"
      color="var(--at-blue)"
      eyebrow="Roles, responsibilities &amp; authorities"
      title="Who is accountable for what"
      lede="Business departments and process owners are responsible for designing sound internal controls, policies, and procedures. As the third line of defense, the IAD is not responsible for setting policies, designing internal controls, or detecting fraud &mdash; its mandate is to evaluate these systems and provide independent assurance on their efficiency and effectiveness."
      tone="cream"
    >
      <h3>IAD &mdash; roles &amp; responsibilities</h3>
      <EdBullets>
        <li>Assist the Audit Committee in carrying out its responsibilities as stipulated in its Charter.</li>
        <li>Conduct internal audit engagements per the scope of this policy and the risk-based audit plan.</li>
        <li>Provide recommendations to mitigate highlighted risks and support Nebras&rsquo; objectives.</li>
        <li>Support all departments in maintaining effective internal control systems and highlight opportunities for continuous improvement.</li>
        <li>Maintain integrity and objectivity by refraining from administrative and executive responsibilities that would impair independence.</li>
        <li>Review policies and procedures when requested and evaluate controls by identifying, prioritizing, and recording risks and controls.</li>
        <li>Spread awareness about governance, risk assessment, and internal control systems.</li>
        <li>Work to improve the overall efficiency and effectiveness of Nebras&rsquo; internal audit process.</li>
      </EdBullets>

      <h3>IAD &mdash; authorities</h3>
      <p>The IAD is authorized to:</p>
      <EdBullets>
        <li>Have unrestricted access to necessary information, including administrative and financial records, information systems and applications, and employee records to the extent needed to perform audit duties.</li>
        <li>Communicate directly with the chairman and members of the Audit Committee.</li>
        <li>Obtain necessary assistance from any employee or department when needed.</li>
      </EdBullets>
      <p>The Head of Internal Audit and internal audit staff are NOT authorized to:</p>
      <EdBullets>
        <li>Perform any operational duties.</li>
        <li>Design controls or take actions to manage risks.</li>
        <li>Initiate or approve accounting transactions, except those pertaining to IAD activities.</li>
        <li>Have physical custody of assets other than those assigned to the IAD to assist in performing their duties.</li>
      </EdBullets>

      <h3>Nebras Leadership and Business Departments</h3>
      <EdBullets>
        <li>Grant access to information, records, personnel, and physical properties for audits.</li>
        <li>Ensure Nebras Leadership promptly addresses audit findings and recommendations.</li>
        <li>Support auditors in performing their duties effectively.</li>
        <li>Ensure management comments are included in the audit report before reporting to the Audit Committee.</li>
        <li>Monitor the implementation of agreed audit action items within specified timelines.</li>
      </EdBullets>

      <h3>Head of Internal Audit &mdash; roles &amp; responsibilities</h3>
      <p>The Head of Internal Audit is accountable to the Audit Committee at three levels:</p>
      <EdBullets>
        <li><strong>Strategic</strong> &mdash; develop and update the Internal Audit Policy, Protocol, and Manual; set the strategic direction of the IAD; establish and report KPIs; partner with leadership; and align activities with best practice, the IPPF, and the second line of defense.</li>
        <li><strong>Internal auditing</strong> &mdash; review Nebras&rsquo; risk profile, conduct the annual risk assessment, prepare and implement the risk-based audit plan, manage service providers, develop follow-up mechanisms, and supervise IAD staff.</li>
        <li><strong>Reporting</strong> &mdash; report significant control issues and recommendations, evaluate internal control effectiveness, communicate audit results, prepare thematic analyses, submit periodic performance and follow-up reports, and maintain quality assurance and improvement programs.</li>
      </EdBullets>

      <h3>Head of Internal Audit &mdash; authorities</h3>
      <EdBullets>
        <li>Direct the IAD to conduct regular and extraordinary audits to address emerging risks, whether or not part of the audit plan, updating the Audit Committee afterwards.</li>
        <li>Initiate special reviews or investigations as needed, with subsequent update to the Audit Committee.</li>
        <li>Define the scope, objectives, and methodology of audit assignments.</li>
        <li>Determine IAD priorities and recommend adjustments to the timescale and audit plan when needed.</li>
        <li>Decide the risk rating of audit observations and the overall internal control evaluation, using predefined criteria and professional judgment.</li>
        <li>Develop the Internal Audit Manual and protocol in alignment with this policy and other governing documents.</li>
        <li>Develop and approve the risk assessment and scoring mechanism used to prepare the risk-based audit plan.</li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="department"
      num="04"
      color="var(--at-blue-deep)"
      eyebrow="The Internal Audit Department in Nebras"
      title="Scope, planning, services, and assurance"
      lede="The scope of the Internal Audit Department covers the activities of Nebras Open Finance and all its branches or subsidiaries, if any."
      tone="surface"
    >
      <h3>Scope</h3>
      <p>The scope includes, but is not limited to:</p>
      <EdBullets>
        <li>Products, processes, and day-to-day operations.</li>
        <li>Administrative, financial, and investment activities.</li>
        <li>Information technology, information security, and applications.</li>
        <li>Processes adopted by third parties or business partners where contractual agreement supports internal auditing.</li>
      </EdBullets>

      <h3>Annual risk assessment and audit plan</h3>
      <p>The Head of Internal Audit presents the risk-based audit plan to the Audit Committee for input and approval. The plan includes the result of Nebras&rsquo; Enterprise Risk Assessment, the methodology adopted, recommended priorities, areas to be audited over the long and short term, and a proposed timetable for completion. The plan MUST be flexible and may be adjusted during the year based on emerging risks or business requirements; any changes are subsequently reported to the Audit Committee with rationale for noting and approval.</p>

      <h3>Internal audit services</h3>
      <p>Audit services are conducted in conformance with the international standards for the professional practice of internal auditing, and are categorized as follows:</p>
      <EdBullets>
        <li><strong>Assurance services</strong> &mdash; regular audit engagements conducted per the annual audit plan to provide reasonable assurance on the adequacy and effectiveness of internal control.</li>
        <li><strong>Advisory services</strong> &mdash; engagements initiated at Management&rsquo;s request to achieve agreed objectives and scope, such as reviews of specific processes, policies and procedures before implementation, projects, or investigations. These must not impair the Department&rsquo;s independence, and pre-implementation review does not prevent auditors from raising findings during a later audit.</li>
        <li><strong>Special review</strong> &mdash; a review initiated as a result of an audit finding, designed to achieve specific objectives or examine certain irregularities.</li>
      </EdBullets>

      <h3>Using external services</h3>
      <p>The Head of Internal Audit is expected to obtain competent advice and external assistance where internal staff lack the required knowledge, skills, or competencies. Where the Head intends to rely on an outside service provider, they SHALL seek approval from the Audit Committee and assess the provider&rsquo;s competency, independence, and objectivity in relation to the assignment.</p>

      <h3>Periodic reporting</h3>
      <p>The Internal Audit Department submits a periodic report to the Audit Committee and BoD tabulating its achievements, key observations and findings, and emerging risks.</p>

      <h3>Liaison with external auditor</h3>
      <p>Internal auditors should maintain professional relationships with external parties &mdash; consultants, external auditors, the central bank, and others in professional contact with them. The relationship with the external auditor should be a continuing partnership involving open communication, access to internal audit plans and reports, coordination, and minimization of duplication. Nebras&rsquo; Finance Department principally liaises with external auditors on the annual audit and financial statements.</p>

      <h3>Quality assurance and improvement program</h3>
      <p>The IAD maintains a quality assurance and improvement program covering all aspects of its activities, performed through internal and external assessments to confirm conformity with the IPPF and adherence to principles and ethics. Internal assessments MUST be conducted periodically; external assessments MUST be conducted at least once every five years, under the supervision of the Audit Committee.</p>

      <h3>Dispute resolution</h3>
      <p>Where a dispute arises between the IAD and process owners over findings, associated risks, or recommendations, the Head of Internal Audit works closely with Management &mdash; involving the CEO and Nebras&rsquo; leadership &mdash; to reach agreement in the best interest of Nebras. If unresolved, the matter is brought to the Audit Committee, which has the final decision.</p>
    </EdSectionBand>

    <EdSectionBand
      id="methodology"
      num="05"
      color="var(--at-navy)"
      eyebrow="Audit methodology"
      title="How engagements are planned, executed, and reported"
      lede="Nebras&rsquo; internal audit methodology outlines the systematic approach used by the IAD to plan, execute, and report on audit engagements. It is aligned with industry best practices and professional standards to ensure high-quality, impactful audit services."
      tone="cream"
    >
      <EdStages>
        <EdStage num="01" title="Risk-based planning" num-color="var(--at-navy)">
          <p>Engagements are scoped through risk-based audit planning, prioritizing areas by the results of the enterprise risk assessment.</p>
        </EdStage>
        <EdStage num="02" title="Evidence gathering &amp; analysis" num-color="var(--at-navy)">
          <p>Auditors gather and analyse evidence to evaluate the design and operating effectiveness of internal controls.</p>
        </EdStage>
        <EdStage num="03" title="Reporting" num-color="var(--at-navy)">
          <p>Findings are consolidated into comprehensive audit reports, including a control-effectiveness evaluation and risk-rated observations.</p>
        </EdStage>
      </EdStages>

      <h3>Audit frequency</h3>
      <p>Based on the enterprise risk assessment, every department is assessed for inherent risk against predefined criteria and classified as high, medium, or low risk:</p>
      <EdBullets>
        <li><strong>High risk</strong> &mdash; audited every year.</li>
        <li><strong>Medium risk</strong> &mdash; audited once every two years.</li>
        <li><strong>Low risk</strong> &mdash; audited at least once every three years.</li>
      </EdBullets>
      <p>Audit coverage and cycle are presented to the Audit Committee for feedback and approval. Any deviation from the audit cycle MUST be documented and approved by the Audit Committee.</p>

      <h3>Audit rating</h3>
      <p>At the end of each assignment, the IAD evaluates the effectiveness of internal control, and the result forms part of the final audit report. Each observation is ranked with a risk rating based on its implication and likelihood, guiding priorities for corrective action so Management can readily identify the most critical findings.</p>

      <h3>Follow-up on recommendations</h3>
      <p>Audit reports include management&rsquo;s response and corrective action, with a target date for completion. The IAD is responsible for follow-up and for maintaining records for regular reporting to the Audit Committee. A process owner may request a target-date extension a maximum of two times, supported by valid rationale and considering the observation&rsquo;s risk rating. Extensions are reviewed by the IAD and approved as follows:</p>
      <EdExample>
        <EdBullets>
          <li><strong>First-time extension</strong> &mdash; endorsed by the Head of Internal Audit; approved by the CEO.</li>
          <li><strong>Second-time extension</strong> &mdash; endorsed by the Head of Internal Audit and the CEO; approved by the Audit Committee.</li>
        </EdBullets>
      </EdExample>
    </EdSectionBand>

    <EdSectionBand
      id="review"
      num="06"
      color="var(--at-teal-deep)"
      eyebrow="Review &amp; references"
      title="Policy review and governing references"
      tone="surface"
      narrow
    >
      <h3>Policy review</h3>
      <EdBullets>
        <li>The policy is reviewed annually by the Internal Audit Lead and approved by the Board Audit Committee.</li>
        <li>Ad hoc reviews occur in response to regulatory changes, organizational shifts, or audit findings, ensuring ongoing relevance.</li>
      </EdBullets>

      <h3>References</h3>
      <EdBullets>
        <li>CBUAE Internal Audit Regulation.</li>
        <li>Open Finance Regulation.</li>
        <li>Institute of Internal Auditors (IIA) International Standards for the Professional Practice of Internal Auditing.</li>
      </EdBullets>
    </EdSectionBand>

    <EdRelatedCards eyebrow="Read alongside" title="Related policies">
      <EdRelatedCard
        href="/internal/policies/corporate-governance"
        category="Governance & Oversight"
        title="Corporate Governance Policy"
        desc="The governance framework and committee structure within which the Internal Audit Department operates as the third line of defense."
      />
      <EdRelatedCard
        href="/internal/policies/enterprise-risk-management"
        category="Risk, Security & Compliance"
        title="Enterprise Risk Management Policy"
        desc="The enterprise risk assessment that drives risk-based audit planning and audit frequency."
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
