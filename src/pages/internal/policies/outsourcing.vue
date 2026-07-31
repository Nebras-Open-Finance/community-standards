<route lang="yaml">
meta:
  layout: internal
  title: Outsourcing Policy
  next: false
  prev: false
  aside: false
</route>

<script setup lang="ts">
import { useHead } from '@unhead/vue'

useHead({ title: 'Outsourcing Policy · Internal Policies' })

interface Section { id: string; label: string }
interface MetaItem { label: string; value: string }

const sections: Section[] = [
  { id: 'overview',     label: 'Overview' },
  { id: 'scope',        label: 'Scope & definitions' },
  { id: 'requirement',  label: 'Requirement & materiality' },
  { id: 'roles',        label: 'Roles & responsibilities' },
  { id: 'lifecycle',    label: 'Outsourcing lifecycle' },
  { id: 'agreement',    label: 'Due diligence & the agreement' },
  { id: 'termination',  label: 'Termination & exit' },
]

const meta: MetaItem[] = [
  { label: 'Applies to', value: 'All Nebras staff' },
  { label: 'Classification', value: 'Restricted' },
  { label: 'Version', value: '1.0 · Feb 2025' },
]
</script>

<template>
  <div class="ed-page">
    <EdBackStrip href="/internal/policies/" text="All policies" />

    <EdHero
      eyebrow="Internal · Restricted"
      eyebrow-color="var(--at-navy)"
      title="Outsourcing Policy"
      :meta="meta"
      lede="As Nebras progressively shifts from internal resources to outsourced resources and services, this policy establishes the standards, governance, and processes that govern outsourcing across all operations &mdash; framing how the organisation identifies, mitigates, and manages the risks that arise when activities are delivered by an Outsourcing Service Provider."
    />

    <EdInPageNav :sections="sections" />

    <EdSectionBand
      id="overview"
      num="01"
      color="var(--at-teal)"
      eyebrow="Overview"
      title="Purpose and objectives"
      lede="Although outsourcing can offer various advantages, it also heightens Nebras&rsquo;s vulnerability to multiple risks. This policy provides a framework that guides employees to safeguard and manage those risks while outsourcing activities to service providers."
      tone="cream"
    >
      <EdProse>
        <p>Established in 2025 as part of the UAE&rsquo;s national financial infrastructure strategy, Nebras plays a pivotal role in shaping the financial landscape of the UAE. As it strives to develop and operate best-in-class financial products and services, adherence to a robust outsourcing policy is imperative. The policy reflects a commitment to proactively identify and mitigate potential risks, implement industry-led practices, and foster a culture of vigilance and accountability among employees.</p>
      </EdProse>

      <h3>This policy aims to</h3>
      <EdBullets>
        <li>Develop a framework to manage the risks arising from outsourcing activities.</li>
        <li>Establish an effective governance structure with preventive and detective controls to mitigate risks arising out of outsourcing.</li>
        <li>Stipulate guidelines for activities that could be outsourced, and for assigning materiality to an Outsourcing Service Provider.</li>
        <li>Provide broad guidelines for onboarding, monitoring, and exiting the agreement with an Outsourcing Service Provider.</li>
        <li>Assign roles and responsibilities within Nebras for the implementation and management of the policy.</li>
      </EdBullets>

      <h3>Goals</h3>
      <EdProse>
        <p>The goal of this policy is to provide guidance and direction on the outsourcing of Nebras&rsquo;s activities to service providers. It is also Nebras&rsquo;s intention to ensure that its outsourced activities comply with relevant laws, regulations, and standards.</p>
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="scope"
      num="02"
      color="var(--at-gold)"
      eyebrow="Scope & definitions"
      title="Scope, audience, and key terms"
      lede="Outsourcing is a contractual relationship between Nebras and an Outsourcing Service Provider, which may or may not be subject to regulation. In this setup the provider executes a process, service, or activity &mdash; directly or via sub-outsourcing &mdash; that would normally be conducted by Nebras itself."
      tone="surface"
    >
      <h3>Audience</h3>
      <EdProse>
        <p>All Nebras staff, including permanent employees, temporary employees, consultants, interns, and authorised third-party staff members.</p>
      </EdProse>

      <h3>Definitions</h3>
      <EdBullets>
        <li><strong>Board</strong> &mdash; the Nebras Board of Managers, responsible for governance and oversight of outsourcing activities.</li>
        <li><strong>Confidential Information</strong> &mdash; sensitive or proprietary information, including customer data, operational data, system details, or documents processed by a service provider.</li>
        <li><strong>Due Diligence</strong> &mdash; the assessment conducted to evaluate an Outsourcing Service Provider&rsquo;s capability, financial stability, operational controls, technology, and risk posture before onboarding.</li>
        <li><strong>Exit Strategy</strong> &mdash; the set of procedures ensuring that Nebras can smoothly transition away from a service provider upon termination without disrupting operations.</li>
        <li><strong>Material Outsourcing</strong> &mdash; outsourcing arrangements where failure or disruption could significantly affect Nebras&rsquo;s operational continuity, regulatory obligations, or reputation.</li>
        <li><strong>Nebras</strong> &mdash; an affiliated entity of the Central Bank of the UAE, aimed at operating the UAE Open Finance common infrastructure and supporting a broader Open Data Economy.</li>
        <li><strong>Outsourcing</strong> &mdash; a contractual arrangement in which an external service provider performs a function, activity, or process on behalf of Nebras.</li>
        <li><strong>Outsourcing Agreement</strong> &mdash; a legally binding contract between Nebras and an Outsourcing Service Provider detailing scope, performance standards, confidentiality, SLAs, and termination conditions.</li>
        <li><strong>Outsourcing Service Provider</strong> &mdash; a third-party entity engaged to perform outsourced functions or services for Nebras.</li>
        <li><strong>Risk Assessment</strong> &mdash; identification and evaluation of risks associated with outsourcing, including regulatory, financial, operational, and reputational risks.</li>
        <li><strong>RCC (Risk and Compliance Committee)</strong> &mdash; committee overseeing the implementation of the Outsourcing Policy, reviewing outsourcing risks, incidents, and compliance effectiveness.</li>
        <li><strong>SLA</strong> &mdash; Service Level Agreement.</li>
        <li><strong>Sub-Outsourcing</strong> &mdash; an Outsourcing Service Provider delegating part or all of the outsourced activity to another third party.</li>
      </EdBullets>

      <EdNote>
        <p>All exceptions to this policy MUST be explicitly approved by the Risk and Compliance Committee. An exception is valid for a specific time and MUST be reassessed and re-approved when necessary. Related risk-management, outsourcing awareness, and communication-management arrangements are set out in the Nebras Information Security Policy.</p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="requirement"
      num="03"
      color="var(--at-blue)"
      eyebrow="Requirement of outsourcing"
      title="Regulatory obligations and materiality"
      lede="Outsourcing a function does not reduce Nebras&rsquo;s responsibilities: Nebras remains ultimately accountable for the outsourced function and for the risks it carries."
      tone="cream"
    >
      <h3>Regulatory and compliance requirements</h3>
      <EdBullets>
        <li>Nebras MUST ensure that the Outsourcing Service Provider maintains the same high level of care in delivering services as Nebras would have exercised had the activity not been outsourced, and MUST refrain from engaging any provider that could harm its reputation.</li>
        <li>Whether the provider is based in the UAE or overseas, the outsourcing process MUST NOT hinder or disrupt Nebras&rsquo;s capacity to effectively supervise and manage its operations.</li>
        <li>Unless it is a group company, the provider MUST NOT be owned or controlled by any director, key managerial personnel, or approver involved in the outsourcing arrangement. This requirement may be waived only with the consent of the Board or a Board-level Committee, with proper disclosure, oversight, and monitoring, and the Board MUST ensure that no conflicts of interest arise.</li>
      </EdBullets>

      <h3>Assessment of need and attendant risks</h3>
      <EdProse>
        <p>The Nebras team MUST assess the necessity of outsourcing through a thorough evaluation of the associated benefits, risks, and the presence of adequate processes to mitigate those risks. The team will:</p>
      </EdProse>
      <EdBullets>
        <li>Assess the necessity for outsourcing by evaluating the critical nature of the activity in question.</li>
        <li>Establish the expectations and desired outcomes associated with outsourcing.</li>
        <li>Identify the key success factors and conduct a cost-benefit analysis.</li>
        <li>Select the appropriate outsourcing model.</li>
      </EdBullets>

      <h3>Material outsourcing classification criteria</h3>
      <EdProse>
        <p>An outsourcing arrangement MUST be classified as Material where one or more of the following criteria are met:</p>
      </EdProse>
      <EdBullets>
        <li>The outsourced activity supports a critical or time-sensitive service or process as identified through the Business Impact Analysis (BIA), including processes with defined RTO or MTPD requirements.</li>
        <li>Failure or disruption of the outsourced service may result in material regulatory non-compliance, breach of licence conditions, or legal obligations.</li>
        <li>The arrangement involves access to or processing of Confidential or Restricted information, including operational, system, customer, or financial data.</li>
        <li>Disruption of the service may cause significant financial loss, operational disruption, or reputational impact to Nebras.</li>
        <li>The service has limited substitutability, where alternative providers cannot be reasonably engaged within an acceptable timeframe.</li>
        <li>The arrangement is assessed as high-risk under the Enterprise Risk Management (ERM) risk assessment methodology.</li>
      </EdBullets>
      <EdProse>
        <p>Outsourcing arrangements classified as Material MUST be subject to enhanced governance, approval, monitoring, and exit planning requirements.</p>
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="roles"
      num="04"
      color="var(--at-blue-deep)"
      eyebrow="Roles & responsibilities"
      title="Who governs outsourcing"
      lede="The Board and Senior Management are ultimately responsible for outsourcing activities and for managing the risks inherent in them. Committees of the Board and Senior Management are responsible for the business function as well as the oversight and assurance functions in respect of outsourcing."
      tone="surface"
    >
      <h3>Board</h3>
      <EdBullets>
        <li>Establish a framework for the approval of outsourcing activities based on risk assessment and materiality.</li>
        <li>Formulate policies to assess the risks and significance of both current and potential outsourcing agreements.</li>
        <li>Implement an appropriate administrative structure to support the outsourcing processes.</li>
      </EdBullets>

      <h3>Chief Executive Officer</h3>
      <EdBullets>
        <li>Accept and endorse the overall responsibility of outsourcing.</li>
        <li>Enforce organisation-wide outsourcing policy implementation across Nebras.</li>
        <li>Oversee and monitor compliance with the outsourcing policy.</li>
        <li>Enforce outsourcing accountability throughout the organisation.</li>
      </EdBullets>

      <h3>Senior Management</h3>
      <EdBullets>
        <li>Develop outsourcing policies and procedures, and assess the risks and significance of all current and potential agreements under a framework aligned with the enterprise-wide risk management strategy approved by the Board.</li>
        <li>Conduct prior assessments of potential agreements and regular evaluations of existing ones, focusing on performance reviews, criticality, and associated risks.</li>
        <li>Identify outsourcing risks as they emerge, and monitor, mitigate, manage, and report these risks to the Board or Executive Committee promptly.</li>
        <li>Ensure appropriate business continuity plans are established for realistic disruptive scenarios &mdash; including the exit of any third-party service provider &mdash; and that these plans are tested regularly.</li>
        <li>Oversee third-party operations to ensure data confidentiality and timely resolution of customer complaints.</li>
        <li>Periodically verify compliance with relevant legislation, regulations, Board-approved policies, and performance standards, reporting findings to the Board or Executive Committee.</li>
        <li>Develop the necessary capacity and skill sets within the organisation to effectively oversee outsourced activities.</li>
      </EdBullets>

      <h3>Nebras COO</h3>
      <EdBullets>
        <li>Assist Senior Management in the identification, measurement, monitoring, mitigation, and management of outsourcing risks.</li>
        <li>Maintain a centralised database of all outsourcing agreements, accessible for review by the Board, Senior Management, and other relevant stakeholders.</li>
        <li>Oversee and supervise outsourced activities to ensure providers adhere to performance standards and deliver uninterrupted services, while reporting to Senior Management, coordinating periodic due diligence, and addressing concerns.</li>
        <li>Develop the documentation for contractual agreements, including service level management, vendor operation monitoring, key risk indicators, and classification of vendors by assessed risk level.</li>
      </EdBullets>

      <h3>Risk and Compliance Committee</h3>
      <EdBullets>
        <li>Supervise and ensure the implementation of the Outsourcing Policy.</li>
        <li>Conduct periodic reviews of outsourcing processes, risk assessments, audit reports, incident reports, and their corrective actions.</li>
        <li>Review and approve the outsourcing policies and procedures periodically, and discuss outsourcing strategic directions.</li>
      </EdBullets>

      <h3>Nebras employees</h3>
      <EdBullets>
        <li>Actively participate in outsourcing awareness training sessions and activities.</li>
        <li>Apply best practices in daily work activities.</li>
        <li>Report incidents, breaches, or suspicious activities to the appropriate channels.</li>
        <li>Provide feedback on the effectiveness of awareness training materials and delivery methods.</li>
      </EdBullets>

      <EdNote>
        <p>The COO reports quarterly to the Risk and Compliance Committee, the CEO, and the Board of Managers on the details and status of outsourcing, along with any non-compliance documented against the approved policy.</p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="lifecycle"
      num="05"
      color="var(--at-navy)"
      eyebrow="Outsourcing lifecycle"
      title="From assessment to exit"
      lede="Each outsourcing arrangement moves through a defined lifecycle, with materiality determining the depth of governance applied at every stage."
      tone="cream"
    >
      <EdStages>
        <EdStage num="01" title="Assess the need" num-color="var(--at-navy)">
          <p>Evaluate the criticality of the activity, expected outcomes, key success factors, and a cost-benefit analysis, then select the appropriate outsourcing model and confirm materiality.</p>
        </EdStage>
        <EdStage num="02" title="Due diligence" num-color="var(--at-navy)">
          <p>Conduct thorough due diligence across qualitative, quantitative, financial, operational, legal, and reputational aspects, seeking independent evaluations and market insights where feasible, and select the provider through a risk assessment framework.</p>
        </EdStage>
        <EdStage num="03" title="Execute the agreement" num-color="var(--at-navy)">
          <p>Proceed only after a legally binding written agreement, reviewed by the COO, is executed in the standard format &mdash; any modification requires explicit approval and amendments are documented as supplements.</p>
        </EdStage>
        <EdStage num="04" title="Monitor and reassess" num-color="var(--at-navy)">
          <p>Regularly monitor and assess the provider, and perform periodic reassessments &mdash; at least annually, or more frequently for elevated risk, material incidents, regulatory expectations, or significant changes in operations, ownership, or control &mdash; with enhanced focus on Material arrangements.</p>
        </EdStage>
        <EdStage num="05" title="Exit and transition" num-color="var(--at-navy)">
          <p>On termination, establish a suitable handover procedure for data and processes in collaboration with the provider, ensuring minimal disruption to Nebras&rsquo;s operations while preserving its reputation.</p>
        </EdStage>
      </EdStages>
    </EdSectionBand>

    <EdSectionBand
      id="agreement"
      num="06"
      color="var(--at-teal-deep)"
      eyebrow="Due diligence & the agreement"
      title="Selecting providers and structuring contracts"
      lede="Due diligence evaluates a provider&rsquo;s ability to meet the requirements of the outsourcing agreement, and the agreement itself codifies the standards, controls, and rights that protect Nebras throughout the arrangement."
      tone="surface"
    >
      <h3>Due diligence of the provider</h3>
      <EdBullets>
        <li>Assess the provider&rsquo;s experience and proven ability to implement and support operations.</li>
        <li>Assess financial stability and the capacity to meet obligations even in challenging circumstances.</li>
        <li>Consider business reputation, organisational culture, compliance history, and any existing or potential legal issues.</li>
        <li>Consider external influences such as the political, economic, social, and legal landscape of the provider&rsquo;s operating jurisdiction.</li>
        <li>Evaluate technology, infrastructure reliability, internal controls, audit coverage, reporting and monitoring processes, data backup strategies, business continuity planning, and disaster recovery.</li>
        <li>Review existing controls, requirements, and contractual provisions designed to ensure data protection.</li>
        <li>Assess the ability to uphold confidentiality, particularly where the provider interacts with multiple clients.</li>
        <li>Assess the capacity to enforce contractual agreements and associated rights, including those related to data storage, protection, and confidentiality.</li>
      </EdBullets>
      <EdProse>
        <p>Nebras will engage in contractual agreements exclusively with providers operating under jurisdictions that ensure the enforceability of contracts and the rights afforded to Nebras. Periodic reassessments MUST include evaluation of service performance, financial stability, risk profile, compliance with contractual obligations, information security posture, and business continuity capabilities, with outcomes documented and used to determine remediation, continued suitability, escalation, or exit decisions.</p>
      </EdProse>

      <EdNote>
        <p>The due diligence assessment MUST be presented to the Board Committee for approval.</p>
      </EdNote>

      <h3>Important aspects of the agreement</h3>
      <EdBullets>
        <li>Details of the activity being outsourced, including service and performance standards, extending to sub-contractors where applicable.</li>
        <li>A clause requiring Nebras&rsquo;s prior approval or consent before the provider onboards sub-contractors for all or part of an outsourced activity.</li>
        <li>Nebras&rsquo;s access to all data, books, records, logs, alerts, and business premises relevant to the outsourced activity.</li>
        <li>Regular monitoring and assessment of the provider so that any necessary corrective measure can be taken immediately.</li>
        <li>Deliverables, including SLAs, to measure the quality and quantity of service levels.</li>
        <li>The nature of the legal and regulatory relationship between the parties, addressing risks and mitigation strategies identified at the risk evaluation and due diligence stages.</li>
        <li>Controls for maintaining confidentiality of data, incorporating the provider&rsquo;s liability to Nebras in the event of any breach.</li>
        <li>Clearly defined roles and responsibilities and suitable indemnification clauses; any limitation-of-liability consideration is assessed in consultation with the legal team.</li>
        <li>The resolution process, events of default, indemnities, remedies, recourse, contingency plans for business continuity, and testing requirements.</li>
        <li>A clause making the provider contractually liable for the performance and risk management practices of its sub-contractors.</li>
        <li>The provider&rsquo;s obligation to comply with directions issued by Nebras in relation to the outsourced activities.</li>
        <li>Nebras&rsquo;s termination rights, including the ability to transfer the arrangement to another provider if necessary.</li>
        <li>A non-disclosure agreement covering information retained by the provider.</li>
        <li>An explicit right of audit and access clause granting Nebras, its internal and external auditors, and any relevant regulatory or supervisory authority unrestricted access to the provider&rsquo;s premises, systems, data, records, personnel, and sub-contractors.</li>
        <li>A requirement for the provider to maintain documented exit and transition plans and to participate in periodic exit testing and contingency simulations &mdash; including simulated termination, provider failure, or service disruption scenarios &mdash; as reasonably requested by Nebras.</li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="termination"
      num="07"
      color="var(--at-teal)"
      eyebrow="Termination & exit"
      title="Ending the arrangement safely"
      lede="Every termination &mdash; early or otherwise &mdash; MUST preserve business continuity, data confidentiality, and Nebras&rsquo;s reputation through a controlled handover."
      tone="cream"
      narrow
    >
      <EdBullets>
        <li>The agreement MUST incorporate a termination clause with a specified minimum notice period, ensuring business continuity during and after termination while outsourced services continue.</li>
        <li>The obligation to maintain the confidentiality of customer information MUST persist even after the contract has expired or been terminated by either party.</li>
        <li>The agreement MUST include provisions on data privacy, data protection, and the secure removal or destruction of data, hardware, and all records, both digital and physical.</li>
        <li>The provider MUST fully cooperate with Nebras and any new provider(s) to facilitate a seamless transition, and MUST NOT delete, purge, revoke, alter, or modify any data during the transition period unless specifically instructed in writing by the Central Bank or Nebras.</li>
        <li>The contract MUST outline the conditions for default termination or an early exit option, covering scenarios such as a change in ownership of the provider, insolvency or liquidation, and judicial indictment, whether in the UAE or elsewhere.</li>
        <li>In every instance of termination, a suitable handover procedure for data and processes MUST be established in collaboration with the provider, ensuring minimal disruption to the continuity of Nebras&rsquo;s operations.</li>
      </EdBullets>
    </EdSectionBand>

    <EdRelatedCards eyebrow="Read alongside" title="Related policies">
      <EdRelatedCard
        href="/internal/policies/procurement"
        category="Governance & Oversight"
        title="Procurement Policy"
        desc="How providers are sourced and selected before an outsourcing arrangement is entered into."
      />
      <EdRelatedCard
        href="/internal/policies/enterprise-risk-management"
        category="Risk, Security & Compliance"
        title="Enterprise Risk Management Policy"
        desc="The ERM methodology under which outsourcing arrangements are risk-assessed and classified as Material."
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
