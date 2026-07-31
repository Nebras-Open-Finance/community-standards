<route lang="yaml">
meta:
  layout: internal
  title: Corporate Governance Policy
  next: false
  prev: false
  aside: false
</route>

<script setup lang="ts">
import { useHead } from '@unhead/vue'

useHead({ title: 'Corporate Governance Policy · Internal Policies' })

interface Section { id: string; label: string }
interface MetaItem { label: string; value: string }
interface KeyNum { value: string; unit?: string; label: string }

const sections: Section[] = [
  { id: 'terms',        label: 'Terms & definitions' },
  { id: 'overview',     label: 'Overview' },
  { id: 'framework',    label: 'Governance framework' },
  { id: 'committees',   label: 'Board committees' },
  { id: 'structure',    label: 'Organization structure' },
  { id: 'conflicts',    label: 'Conflicts & segregation' },
]

const meta: MetaItem[] = [
  { label: 'Applies to', value: 'Nebras' },
  { label: 'Classification', value: 'Restricted' },
  { label: 'Version', value: '1.0 · Sep 2024' },
]

const keyNums: KeyNum[] = [
  { value: '5', unit: 'committees', label: 'Board committees supporting oversight' },
  { value: '3', unit: 'lines', label: 'Three Lines of Defense model' },
]
</script>

<template>
  <div class="ed-page">
    <EdBackStrip href="/internal/policies/" text="All policies" />

    <EdHero
      eyebrow="Internal · Restricted"
      eyebrow-color="var(--at-navy)"
      title="Corporate Governance Policy"
      :meta="meta"
      lede="This policy establishes the framework that guides Nebras&rsquo;s governance practices &mdash; defining the structure, processes, and mechanisms by which the entity is governed to ensure <strong>transparency</strong>, <strong>accountability</strong>, and <strong>integrity</strong> across all aspects of its operation of the UAE Open Finance common infrastructure."
      :key-nums="keyNums"
    />

    <EdInPageNav :sections="sections" />

    <EdSectionBand
      id="terms"
      num="01"
      color="var(--at-teal)"
      eyebrow="Terms & definitions"
      title="Key terms used in this policy"
      lede="The following terms carry specific meaning throughout this policy."
      tone="cream"
    >
      <EdBullets>
        <li><strong>Nebras (the organization)</strong> &mdash; an affiliated entity of the Central Bank of the UAE, aimed at operating the UAE Open Finance common infrastructure and supporting a broader Open Data Economy.</li>
        <li><strong>Board of Managers (BoM, or Board)</strong> &mdash; the Board of Managers as defined by the Contract of Establishment of Nebras.</li>
        <li><strong>TPP</strong> &mdash; Third Party Providers providing services based on the data consumed via the API Hub.</li>
        <li><strong>VAS</strong> &mdash; Value-Added Services offered through the API Hub.</li>
        <li><strong>VAS Provider</strong> &mdash; a company providing Value-Added Services for TPPs via the API Hub.</li>
        <li><strong>API Hub</strong> &mdash; the Open Finance API Hub that enables API calls from TPPs to LFIs.</li>
        <li><strong>Risk</strong> &mdash; the effect of uncertainty on objectives, representing the possibility of deviation from intended outcomes. Deviation can be positive (opportunity), negative (threat), or both, and is typically characterized by its sources, potential events, their consequences, and the likelihood of occurrence.</li>
        <li><strong>Risk Appetite</strong> &mdash; the amount and type of risk that Nebras is willing and prepared to accept in pursuit of its objectives at &lsquo;face value&rsquo;, reflecting inherent risk exposure before the analysis and evaluation of any current controls.</li>
        <li><strong>Three Lines of Defense</strong> &mdash; consists of Business (1st Line), Risk and Compliance (2nd Line), and Audit (3rd Line). Business units, support and control functions, and Internal Audit remain independent and segregated from each other to ensure different levels of assurance to the Board of Managers.</li>
        <li><strong>Mitigation or Action Owners</strong> &mdash; those responsible for the implementation of mitigations and/or actions, agreeing on the mitigation design, resourcing, and timeframes prior to implementation.</li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="overview"
      num="02"
      color="var(--at-gold)"
      eyebrow="Overview"
      title="Purpose, scope, and governance of the policy"
      lede="The Corporate Governance Policy defines the structure, processes, and mechanisms by which Nebras is governed, ensuring transparency, accountability, and integrity in all aspects of its operations."
      tone="surface"
    >
      <h3>Purpose</h3>
      <EdBullets>
        <li>Establish clear governance principles that ensure the effective oversight and management of Nebras.</li>
        <li>Promote a culture of transparency, accountability, and ethical conduct in all business activities.</li>
        <li>Safeguard the interests of all stakeholders, including financial institutions, third-party providers (TPPs), regulators, and the broader financial ecosystem.</li>
      </EdBullets>

      <h3>Scope</h3>
      <EdProse>
        <p>This policy applies to all employees, management, Board members, Board committees, and VAS providers of Nebras. It encompasses all departments.</p>
      </EdProse>

      <h3>Governance and review</h3>
      <EdBullets>
        <li>This policy is periodically reviewed and amended by the Nebras Risk and Compliance Department, with the Board&rsquo;s approval, to align with the latest business environment and Nebras&rsquo;s strategic objectives.</li>
        <li>The policy MUST be reviewed if a regulatory change occurs affecting Nebras&rsquo;s activities.</li>
        <li>Where any deviation from this policy or related processes is required, the requester MUST seek risk review and acceptance approval from the Risk and Compliance Department.</li>
      </EdBullets>

      <h3>Compliance</h3>
      <EdBullets>
        <li>Violations of this policy MUST be brought to the attention of the Risk and Compliance Department, and corrective actions taken to remedy non-compliance issues and findings.</li>
        <li>Penalties for disciplinary action are consistent with the severity of the incident(s), as determined by the investigation by the Risk and Compliance Committee.</li>
        <li>If a criminal offence is considered to have been committed, further action &mdash; in consultation with external authorities &mdash; may be taken to assist in prosecution, in alignment with the ERM Policy&rsquo;s procedures on risk and compliance escalation.</li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="framework"
      num="03"
      color="var(--at-blue)"
      eyebrow="Governance framework"
      title="The Board of Managers"
      lede="The Board of Managers holds ultimate responsibility for the strategic direction, governance framework, risk oversight, and overall performance of Nebras."
      tone="cream"
    >
      <h3>Composition</h3>
      <EdProse>
        <p>The Board of Managers is composed of individuals selected for their expertise, experience, and ability to contribute to the strategic oversight of Nebras. The Board includes representatives from the CBUAE, participating banks, insurers, and independent / ecosystem directors to ensure diverse perspectives and comprehensive governance. The number of Board members and their specific roles are defined in the entity&rsquo;s Contract of Establishment.</p>
      </EdProse>

      <h3>Responsibilities</h3>
      <EdBullets>
        <li><strong>Strategic Oversight</strong> &mdash; providing strategic direction, managing decision-making votes, and ensuring alignment with the entity&rsquo;s mission and objectives.</li>
        <li><strong>Risk Management</strong> &mdash; setting the risk appetite and overseeing risk management practices to keep risk levels within appetite. Practices are governed by the risk appetite articulated in the Enterprise Risk Management (ERM) Policy; any deviations from appetite MUST be escalated to the Risk and Compliance Committee for review and approval.</li>
        <li><strong>Performance Evaluation</strong> &mdash; assessing the performance of the entity and its senior management team, in collaboration with the CBUAE team, to ensure alignment with KPIs.</li>
        <li><strong>Regulatory Compliance</strong> &mdash; ensuring the entity adheres to all relevant regulations and standards.</li>
        <li><strong>Financial Management</strong> &mdash; overseeing the entity&rsquo;s financial performance and ensuring alignment with established financial targets and budgets.</li>
      </EdBullets>

      <h3>Meetings</h3>
      <EdProse>
        <p>The Board meets regularly, at least quarterly, or more frequently if required. Meeting agendas and minutes are documented, and decisions are recorded to ensure transparency and accountability.</p>
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="committees"
      num="04"
      color="var(--at-blue-deep)"
      eyebrow="Board committees"
      title="Five committees supporting the Board"
      lede="The Board has established five committees to support its functions and ensure effective oversight in specialized areas. Each committee is responsible for specific aspects of governance, operates under Board-approved terms of reference, and reports directly to the Board."
      tone="surface"
    >
      <h3>Escalation to the Board</h3>
      <EdProse>
        <p>Board Committees MUST escalate matters to the Board of Managers without undue delay where issues are considered material, including but not limited to:</p>
      </EdProse>
      <EdBullets>
        <li>Risk appetite breaches or significant near-breaches.</li>
        <li>Material regulatory non-compliance or supervisory findings.</li>
        <li>Major operational, cyber, data, or technology-related incidents.</li>
        <li>Financial losses or exposures exceeding approved thresholds.</li>
        <li>Matters that may have a material impact on Nebras&rsquo;s strategy, license, reputation, or financial soundness.</li>
      </EdBullets>
      <EdProse>
        <p>The composition of each committee is defined by the Board based on the specific experience required to fulfil its responsibilities.</p>
      </EdProse>

      <h4>Board Strategy Committee</h4>
      <EdBullets>
        <li>Provide guidance on innovative strategies and initiatives supporting Open Finance adoption and development.</li>
        <li>Review financial performance and resource utilization.</li>
        <li>Oversee overall performance to ensure achievement of established strategic objectives.</li>
      </EdBullets>

      <h4>Board Risk and Compliance Committee</h4>
      <EdBullets>
        <li>Ensure the company&rsquo;s compliance with relevant regulations and handle regulatory gaps.</li>
        <li>Oversee the company&rsquo;s risk management processes and controls, and evaluate the effectiveness of mechanisms for identifying, assessing, and monitoring risks.</li>
        <li>Ensure Nebras operates its risk management practices using the Three Lines of Defense model &mdash; (1) Management, (2) Risk Management and Compliance, (3) Internal Audit &mdash; all providing oversight on risk mitigation strategies and compliance activities as described in the ERM Policy.</li>
        <li>Ensure continuous monitoring and review of governance-related risks in accordance with the ERM Policy&rsquo;s monitoring framework.</li>
        <li>Review and recommend the risk appetite statement, risk policies, and tolerance levels to the Board, and monitor adherence to the approved risk appetite.</li>
        <li>Monitor key risks (credit, market, operational, cyber, conduct, compliance, reputational) and emerging risks in the Open Finance ecosystem.</li>
        <li>Oversee compliance function effectiveness, regulatory adherence (CBUAE, data protection laws, AML/CFT), and whistleblowing mechanisms.</li>
        <li>Review periodic risk and compliance reports, including key risk indicators, incident reports, stress testing, incident management, and remediation plans.</li>
        <li>Ensure coordination between risk, compliance, internal audit, and business units.</li>
        <li>Assess third-party, outsourcing, and technology risks related to Open Finance infrastructure.</li>
      </EdBullets>

      <h4>Board Audit Committee</h4>
      <EdBullets>
        <li>Oversee the organization&rsquo;s financial reporting processes, ensuring accuracy, transparency, and compliance with applicable accounting standards and regulations.</li>
        <li>Ensure internal and external audits are conducted independently and thoroughly.</li>
        <li>Facilitate effective communication between the Board, internal auditors, and external auditors.</li>
      </EdBullets>

      <h4>Board Nomination and Remuneration Committee</h4>
      <EdBullets>
        <li>Review the structure of the Board, and identify and recommend suitable candidates for selection as members of the Board and executive management of Nebras.</li>
        <li>Establish clear policies for the compensation and remuneration of the Board and executive management.</li>
        <li>Oversee periodic Board effectiveness and performance evaluations, conducted at least annually, covering the Board, its Committees, and individual members.</li>
        <li>Establish and maintain a structured Board and senior management succession planning framework to ensure continuity, independence, and availability of appropriate skills in line with regulatory expectations.</li>
      </EdBullets>

      <h4>Board Industry Advisory Committee</h4>
      <EdBullets>
        <li>Guide Open Finance framework expansion by providing expertise on emerging trends, innovative use cases, and other development opportunities.</li>
        <li>Promote collaboration among various industry players and enhance the Open Finance ecosystem by identifying new entities that could be onboarded.</li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="structure"
      num="05"
      color="var(--at-navy)"
      eyebrow="Organization structure & responsibilities"
      title="From the Board to functional departments"
      lede="The organizational structure of Nebras is designed to ensure effective governance, clear lines of accountability, independent oversight, and efficient decision-making, in line with regulatory expectations and best practices."
      tone="cream"
    >
      <h3>Executive Management</h3>
      <EdProse>
        <p>The Executive Management Team is responsible for the day-to-day management and operational execution of strategies, policies, and objectives approved by the Board. It is led by the Chief Executive Officer (CEO), who reports directly to the Board.</p>
      </EdProse>
      <EdBullets>
        <li><strong>Chief Executive Officer (CEO)</strong> &mdash; responsible for overall strategic leadership, operational management, and stakeholder relations, ensuring the entity&rsquo;s goals and objectives are achieved.</li>
        <li><strong>Chief Implementation Officer (CIO)</strong> &mdash; leads ecosystem engagement and implementation, including for VAS providers, enabling and increasing adoption of API calls and creating productive partnerships. Governs the industry roll-out of standards, manages industry change, and supports industry comprehension of the standards and business rules.</li>
        <li><strong>Chief Operating Officer (COO)</strong> &mdash; manages daily operations, ensuring process efficiency, resource optimization, and risk mitigation, while driving delivery of key projects and overseeing performance metrics and reporting.</li>
        <li><strong>Chief Technology Officer (CTO)</strong> &mdash; leads the technology strategy, managing the entity&rsquo;s IT infrastructure, innovation, and cybersecurity, while ensuring regulatory compliance and overseeing vendor relationships and technical support.</li>
        <li><strong>Chief Product Officer (CPO)</strong> &mdash; defines and implements the product vision, strategy, and roadmap, ensuring alignment with business goals and market demands, and leads the design, development, and continuous improvement of products and services.</li>
      </EdBullets>

      <h3>Functional departments</h3>
      <EdProse>
        <p>Nebras is organized into functional departments aligned with its operational and strategic objectives. Each department is headed by a member of the Executive Management Team and operates within authorities delegated by the CEO.</p>
      </EdProse>
      <EdBullets>
        <li><strong>Ecosystem Engagement Department</strong> &mdash; builds and maintains relationships with external stakeholders, including financial institutions, fintechs, and other ecosystem participants. Drives collaboration, industry alignment, and onboarding to the platform, and leads outreach to expand the ecosystem and attract new participants and VAS providers.</li>
        <li><strong>Operations Department</strong> &mdash; manages day-to-day activities, ensuring seamless execution of services and operational efficiency, overseeing business processes, service delivery, incident management, and performance tracking. Where functions are outsourced to third parties, it oversees vendor performance, ensures compliance with service level agreements, and manages communications.</li>
        <li><strong>Technology Department</strong> &mdash; leads management, maintenance, and optimization of the entity&rsquo;s technical infrastructure, including the Trust Framework and API Hub, and manages IT security, system architecture, data management, and compliance with technology standards. Coordinates with technology vendors to resolve issues and implement the technology development roadmap.</li>
        <li><strong>Strategy and Product Department</strong> &mdash; responsible for the development and management of Open Finance products, including banking, insurance, and FX, designing new products, refining existing offerings, and aligning product strategies with the overall goals of the entity.</li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="conflicts"
      num="06"
      color="var(--at-teal-deep)"
      eyebrow="Conflicts of interest & segregation of duties"
      title="Protecting the integrity of decision-making"
      lede="A conflict of interest arises when an individual&rsquo;s personal, financial, or other interests could potentially influence or compromise their professional judgment or actions in their role within Nebras."
      tone="surface"
    >
      <h3>Conflicts of interest</h3>
      <EdBullets>
        <li>All Board members, senior management, and employees MUST submit a formal conflict-of-interest declaration upon appointment, on an annual basis, and whenever a material change in circumstances arises.</li>
        <li>Conflict-of-interest declarations are reviewed, documented, and monitored by the Risk and Compliance function.</li>
      </EdBullets>

      <h3>Identification of conflicts</h3>
      <EdProse>
        <p>All individuals within the entity are required to disclose any potential conflicts of interest upon joining and periodically thereafter. These disclosures include:</p>
      </EdProse>
      <EdBullets>
        <li>Financial interests in third-party vendors, financial institutions, or fintech companies participating in the Open Finance platform.</li>
        <li>Relationships with individuals or organizations that may benefit from the entity&rsquo;s decisions or activities.</li>
        <li>Participation in external activities (e.g. directorships, consulting roles) that may influence decision-making.</li>
      </EdBullets>

      <h3>Managing conflicts</h3>
      <EdBullets>
        <li>Individuals with conflicts are required to recuse themselves from relevant discussions and decisions.</li>
        <li>Conflicts are documented, and mitigating actions are outlined by the risk management team.</li>
        <li>If necessary, the Board of Managers intervenes to resolve significant conflicts and ensure fairness.</li>
      </EdBullets>

      <h3>Segregation of duties</h3>
      <EdProse>
        <p>To maintain operational integrity and prevent undue influence, Nebras enforces a clear segregation of duties across all functions &mdash; crucial for reducing the risk of errors, fraud, and bias in decision-making.</p>
      </EdProse>
      <h4>Principles</h4>
      <EdBullets>
        <li><strong>Independence</strong> &mdash; no single individual should have control over multiple stages of critical processes (e.g. financial approvals, procurement, or product development).</li>
        <li><strong>Accountability</strong> &mdash; clear roles and responsibilities are defined, ensuring that checks and balances exist within workflows.</li>
        <li><strong>Transparency</strong> &mdash; all actions and decisions are well-documented and traceable, enabling oversight by internal and external auditors.</li>
      </EdBullets>
      <h4>Implementation</h4>
      <EdBullets>
        <li><strong>Operational controls</strong> &mdash; clear operational boundaries ensure that no individual or team has complete autonomy over critical business processes (e.g. financial transactions, product releases).</li>
        <li><strong>Technology controls</strong> &mdash; access to sensitive systems and data is restricted based on roles and responsibilities. Changes to critical systems (e.g. the API Hub) require approvals from both the Technology and Operations departments.</li>
        <li><strong>Decision-making controls</strong> &mdash; major decisions, such as VAS pricing strategies, partnership agreements, and technology procurement, require approvals from multiple stakeholders, including relevant department heads and the CEO.</li>
      </EdBullets>
    </EdSectionBand>

    <EdRelatedCards eyebrow="Read alongside" title="Related policies">
      <EdRelatedCard
        href="/internal/policies/internal-audit"
        category="Governance & Oversight"
        title="Internal Audit Policy"
        desc="The independent third line of defense providing assurance to the Board of Managers."
      />
      <EdRelatedCard
        href="/internal/policies/enterprise-risk-management"
        category="Risk, Security & Compliance"
        title="Enterprise Risk Management Policy"
        desc="The risk appetite and Three Lines of Defense framework that underpins Board and committee oversight."
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
