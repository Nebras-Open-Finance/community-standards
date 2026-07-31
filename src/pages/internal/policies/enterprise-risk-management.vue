<route lang="yaml">
meta:
  layout: internal
  title: Enterprise Risk Management Policy
  next: false
  prev: false
  aside: false
</route>

<script setup lang="ts">
import { useHead } from '@unhead/vue'

useHead({ title: 'Enterprise Risk Management Policy · Internal Policies' })

interface Section { id: string; label: string }
interface MetaItem { label: string; value: string }
interface KeyNum { value: string; unit?: string; label: string }

const sections: Section[] = [
  { id: 'overview',    label: 'Overview' },
  { id: 'categories',  label: 'Risk categories & KRIs' },
  { id: 'governance',  label: 'Three Lines model' },
  { id: 'framework',   label: 'Framework & identification' },
  { id: 'assessment',  label: 'Assessment & scoring' },
  { id: 'controls',    label: 'Controls & residual risk' },
  { id: 'mitigation',  label: 'Mitigation, reporting & monitoring' },
  { id: 'segregation', label: 'Segregation of Duty' },
]

const meta: MetaItem[] = [
  { label: 'Applies to', value: 'Nebras' },
  { label: 'Classification', value: 'Restricted' },
  { label: 'Version', value: '1.0 · Feb 2026' },
]

const keyNums: KeyNum[] = [
  { value: '3', unit: 'lines', label: 'Lines of defence in the governance model' },
  { value: '13', label: 'Defined risk categories' },
  { value: '8', label: 'Core principles of risk management' },
]
</script>

<template>
  <div class="ed-page">
    <EdBackStrip href="/internal/policies/" text="All policies" />

    <EdHero
      eyebrow="Internal · Restricted"
      eyebrow-color="var(--at-blue)"
      title="Enterprise Risk Management Policy"
      :meta="meta"
      lede="Nebras&rsquo;s Enterprise Risk Management framework establishes how risk is identified, assessed, mitigated, and monitored across <strong>strategic, tactical, and operational</strong> levels &mdash; anchored in a Three Lines model, a defined risk appetite and tolerance, and a culture of accountability and continuous improvement."
      :key-nums="keyNums"
    />

    <EdInPageNav :sections="sections" />

    <!-- 01 OVERVIEW -->
    <EdSectionBand
      id="overview"
      num="01"
      color="var(--at-teal)"
      eyebrow="Overview"
      title="Purpose, scope, and governance of the ERM Policy"
      lede="The ERM Policy outlines the framework and processes for identifying, assessing, managing, and monitoring risks associated with Nebras&rsquo;s operations and strategic objectives, promoting a proactive culture of awareness, accountability, and continuous improvement."
      tone="cream"
    >
      <h3>Purpose</h3>
      <p>Built on the definition of risk as &ldquo;the possibility of a deviation from an intended outcome or objective&rdquo;, the policy embeds ERM throughout Nebras as supporting guardrails against uncertainty. It aims to:</p>
      <EdBullets>
        <li><strong>Define risk appetite and tolerance residually</strong> &mdash; articulate the amount and type of risk Nebras is willing to accept after applying all current controls.</li>
        <li><strong>Identify risks</strong> that could impact operations, finances, reputation, and regulatory compliance.</li>
        <li><strong>Assess risks</strong> by likelihood and potential impact to prioritise management effort.</li>
        <li><strong>Mitigate risks</strong> through strategies that minimise or eliminate adverse effects.</li>
        <li><strong>Monitor risks</strong> and the effectiveness of risk management strategies.</li>
        <li><strong>Promote accountability</strong>, <strong>enhance decision-making</strong>, and <strong>ensure compliance</strong> with relevant laws, regulations, and standards.</li>
      </EdBullets>

      <h3>Scope</h3>
      <p>The policy applies to all activities, processes, and stakeholders associated with Nebras, spanning operational, financial, compliance, strategic, technology, third-party, reputational, and environmental and social risk areas.</p>

      <h3>The eight core principles</h3>
      <p>To embed the policy and strengthen risk maturity, Nebras articulates eight principles centred on value creation and protection:</p>
      <EdBullets>
        <li><strong>Integrated</strong> &mdash; risk management forms an integral part of all activities, embedded into strategic, tactical, operational, and project objectives.</li>
        <li><strong>Structured and comprehensive</strong> &mdash; a formalised internal risk structure delivers consistent, comparable results.</li>
        <li><strong>Proportionate</strong> &mdash; ERM processes are customised to Nebras&rsquo;s internal and external context.</li>
        <li><strong>Inclusive</strong> &mdash; timely involvement of internal and external stakeholders informs the ERM landscape.</li>
        <li><strong>Agile</strong> &mdash; ERM anticipates, detects, and responds to emerging and changing risks, remaining open to continual review.</li>
        <li><strong>Best available information</strong> &mdash; inputs draw on historical, current, and forward-looking information, acknowledging limitations and uncertainties.</li>
        <li><strong>Human and company culture factors</strong> &mdash; behaviour and culture significantly influence ERM; adequate awareness and training are ensured.</li>
        <li><strong>Continued improvement</strong> &mdash; ERM is refined through learning, experience, and feedback aligned to best practice.</li>
      </EdBullets>

      <h3>Audience</h3>
      <p>All Nebras Board members and staff, including permanent and temporary employees, consultants, interns, and authorised third-party staff.</p>

      <h3>Exceptions, review, compliance, and reporting</h3>
      <EdBullets>
        <li><strong>Exceptions</strong> MUST be explicitly approved by the Board Risk and Compliance Committee, are valid for a specific period, are reassessed and re-approved as necessary, and are noted by the Board of Managers.</li>
        <li><strong>Annual review</strong> &mdash; the policy is reviewed and amended annually by the CEO and Risk department, tabled to the Board Risk and Compliance Committee, and submitted to the Board of Managers for final approval.</li>
        <li><strong>Compliance</strong> &mdash; violations are raised to the Operations and Risk Lead; corrective and disciplinary action is proportionate to severity and aligned with HR policy. Any deviation requires risk review and acceptance approval from the Operations and Risk Lead.</li>
        <li><strong>Reporting</strong> &mdash; the Risk function reports quarterly to the CEO, Board of Managers, and Board Risk and Compliance Committee on the status of risk management and any non-compliance.</li>
      </EdBullets>
    </EdSectionBand>

    <!-- 02 RISK CATEGORIES & KRIs -->
    <EdSectionBand
      id="categories"
      num="02"
      color="var(--at-gold)"
      eyebrow="Key risks faced by Nebras"
      title="Risk categories and Key Risk Indicators"
      lede="Risks originate from many avenues, allocated into thirteen categories &mdash; each with its own residual risk appetite and tolerance threshold, formulated by evaluating Nebras&rsquo;s business context against the ERM Risk Matrix."
      tone="surface"
    >
      <h3>The thirteen risk categories</h3>
      <div class="ed-table-wrap">
        <table class="ed-table">
          <thead>
            <tr><th>Category</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td>Compliance</td><td>Consequences of non-compliance with laws, regulations, and contractual obligations &mdash; penalties, fines, sanctions, reputational damage, and in extreme cases criminal prosecution, licence revocation, or closure.</td></tr>
            <tr><td>Data &amp; Information Security</td><td>Unauthorised access, leakage, alteration, mismanagement, or loss of data, and the use of inaccurate, incomplete, or misleading information in decision-making.</td></tr>
            <tr><td>Cybersecurity</td><td>Inability to protect Nebras&rsquo;s computers, networks, programs, and data from unauthorised access, attacks, or exploitation by external actors, internal parties, or system and human vulnerabilities.</td></tr>
            <tr><td>Legal</td><td>Legal disputes, claims, or proceedings arising from interpretation, application, or non-compliance with laws, regulations, and contracts, including litigation, arbitration, and regulatory investigations.</td></tr>
            <tr><td>Fraud</td><td>Collusion and corruption, failure of declaration, falsified outcomes, fraudulent signatories, manipulation of recruitment, misappropriation of funds, and unauthorised transactions.</td></tr>
            <tr><td>Operational</td><td>Operational disruptions or losses caused by flawed or failed policies, processes, systems, or human errors.</td></tr>
            <tr><td>Sharia Non-Compliance</td><td>Data model limitations that result in inaccurate or incomplete representation of product features and structures from LFIs to TPPs and customers (e.g. Shari&rsquo;ah-required terminology or structures not sufficiently supported).</td></tr>
            <tr><td>Technology</td><td>System architecture and design, change control, infrastructure breakdown, integration, legacy support, single points of failure, and storage capacity constraints.</td></tr>
            <tr><td>Reputational</td><td>Harm to Nebras&rsquo;s reputation, image, or brand causing loss of trust or loyalty from stakeholders, customers, and the wider community.</td></tr>
            <tr><td>Financial</td><td>Impacts on revenue, performance, stability, and sustainability, including inadequate financial planning and external factors such as product adoption, market volatility, and economic conditions.</td></tr>
            <tr><td>External events</td><td>Risks from the external environment, assessed via PESTLE (Political, Economic, Socio-Economic, Technological, Legislative, Environmental), outside Nebras&rsquo;s immediate control.</td></tr>
            <tr><td>People</td><td>Risks from culture, employment practices, key-person dependencies, lack of resources, and succession planning.</td></tr>
            <tr><td>Outsourcing</td><td>Risks arising from reliance on third-party service providers, including their day-to-day operations on behalf of Nebras.</td></tr>
          </tbody>
        </table>
      </div>

      <EdNote>
        <p>Residual appetite and tolerance are set per category. Where explicitly stated in this policy: <strong>Compliance</strong> carries a <strong>Low</strong> residual risk appetite and a <strong>Low&ndash;Medium</strong> residual tolerance; <strong>Financial</strong> carries a <strong>Low&ndash;Medium</strong> residual appetite and a <strong>Medium</strong> residual tolerance. The full set of thresholds is elaborated in the Operational Risk Management Framework (ORMF).</p>
      </EdNote>

      <h3>Risk appetite framework and KRIs</h3>
      <p>Nebras maintains a Risk Appetite Framework combining qualitative statements and quantitative thresholds for each category. It is designed to give clear guidance on acceptable exposure, enable monitoring through Key Risk Indicators (KRIs), and support proactive, risk-based decision-making.</p>
      <EdBullets>
        <li><strong>Quantitative thresholds</strong> set measurable limits (e.g. financial exposure limits, downtime thresholds, incident frequency).</li>
        <li><strong>Qualitative thresholds</strong> define conditions under which exposure is deemed unacceptable (e.g. regulatory breaches, reputational damage, control failures).</li>
      </EdBullets>

      <p>KRIs are measurable metrics that act as early-warning signals across risk categories. The KRI process runs through five stages:</p>
      <EdBullets>
        <li><strong>Identification</strong> &mdash; KRIs are identified per category through collaboration between the Risk function, business units, and stakeholders.</li>
        <li><strong>Definition</strong> &mdash; each KRI is defined with purpose, measurement criteria, and data sources, and MUST be SMART (specific, measurable, achievable, relevant, time-bound).</li>
        <li><strong>Thresholds and tolerances</strong> &mdash; aligned with Nebras&rsquo;s appetite and tolerance statements to trigger escalation or additional mitigation.</li>
        <li><strong>Monitoring and reporting</strong> &mdash; KRIs are monitored regularly, with significant trends, breaches, or anomalies reported to the Board Risk and Compliance Committee and the Board of Managers.</li>
        <li><strong>Review and update</strong> &mdash; KRIs are reviewed periodically to remain relevant to emerging risks.</li>
      </EdBullets>
      <p>KRIs are never an exhaustive list; they are documented and actively managed within the <strong>Risk Register</strong>, which serves as the central repository for tracking, monitoring, and updating them. The Risk function maintains the Register and ensures designated owners review and update their KRIs.</p>
    </EdSectionBand>

    <!-- 03 THREE LINES MODEL -->
    <EdSectionBand
      id="governance"
      num="03"
      color="var(--at-blue)"
      eyebrow="Risk management governance"
      title="The Three Lines model"
      lede="Risk governance is anchored in the Three Lines model, ensuring business units, control functions, and Internal Audit remain independent and segregated to provide differentiated assurance to the Board of Managers."
      tone="cream"
    >
      <EdStages>
        <EdStage num="1st" title="Business units &mdash; own and manage risk" num-color="var(--at-blue)">
          <p>Operational units &mdash; Ecosystem Engagement, Technology, Strategy and Product, and Operations. They identify and assess risks inherent in their activities, deploy and comply with key controls, build and monitor technical controls for automation, and transparently communicate risks.</p>
        </EdStage>
        <EdStage num="2nd" title="Risk function &mdash; oversee and challenge" num-color="var(--at-blue)">
          <p>Risk and compliance functions reinforce the first line: implementing a permanent control system, challenging operational units on risk identification and evaluation, carrying out independent second-level controls, fostering a culture of risk and ethics, and reporting regularly on the risk profile to the Board Risk and Compliance Committee and the Board of Managers.</p>
        </EdStage>
        <EdStage num="3rd" title="Audit &mdash; independent assurance" num-color="var(--at-blue)">
          <p>Internal Audit and External Audit operate objectively and independently, reporting directly to the Board of Managers. They provide assurance on the degree of control over operations and technology, help achieve objectives by assessing risk management and compliance, and periodically check compliance and the effectiveness of permanent controls.</p>
        </EdStage>
      </EdStages>

      <h3>Roles and responsibilities</h3>
      <EdBullets>
        <li><strong>Board of Managers</strong> &mdash; aligns the ERM policy with strategy and regulation, approves the policy, risk appetite, and tolerance, reviews risk reports, and holds the Committee and executive management accountable.</li>
        <li><strong>Board Risk and Compliance Committee</strong> &mdash; endorses and recommends policies for Board approval, oversees identification, assessment, and mitigation of risks, monitors exposure, and guides the Risk function.</li>
        <li><strong>CEO</strong> &mdash; establishes a culture of risk awareness, ensures governance mechanisms monitor risk, oversees risk processes, supports employees, and sets best-practice standards.</li>
        <li><strong>Risk function</strong> &mdash; leads implementation of the framework, coordinates activities, conducts assessments, establishes controls and mitigation plans, reports to the Committee and Board, and delivers training.</li>
        <li><strong>Business unit department heads</strong> &mdash; own risk within their departments, integrate risk practices into decision-making, communicate risks to the Risk function, and implement mitigation plans.</li>
        <li><strong>All employees</strong> &mdash; adhere to policies and procedures, report potential risks or incidents, participate in training, and maintain awareness of the risks in their roles.</li>
      </EdBullets>
    </EdSectionBand>

    <!-- 04 FRAMEWORK & IDENTIFICATION -->
    <EdSectionBand
      id="framework"
      num="04"
      color="var(--at-blue-deep)"
      eyebrow="Risk management framework"
      title="The risk management cycle: objectives and identification"
      lede="The framework creates a shared understanding of risk and how to manage it, ensuring accepted risks stay within appetite, policy, and strategic objectives &mdash; and protecting customer and stakeholder safety. It runs as a continuous cycle."
      tone="surface"
    >
      <EdStages>
        <EdStage num="01" title="Identify" num-color="var(--at-blue-deep)">
          <p>Systematically recognise, analyse, and document potential risks through horizon scanning and an annual review of the risk taxonomy.</p>
        </EdStage>
        <EdStage num="02" title="Assess" num-color="var(--at-blue-deep)">
          <p>Comprehend the nature and level of each risk, scoring impact and likelihood both before (inherent) and after (residual) controls.</p>
        </EdStage>
        <EdStage num="03" title="Mitigate" num-color="var(--at-blue-deep)">
          <p>Select and implement strategies to modify likelihood, consequence, or both, and record mitigation action plans.</p>
        </EdStage>
        <EdStage num="04" title="Monitor" num-color="var(--at-blue-deep)">
          <p>Track progress against objectives, re-evaluate risks, and confirm controls remain adequate and effective.</p>
        </EdStage>
      </EdStages>

      <h3>Risk identification</h3>
      <p>The Risk function works with all teams to formally identify risks, considering tangible and intangible sources; causes and events; threats and opportunities; vulnerabilities and capabilities; changes in the external and internal context; indicators of emerging risk; the nature and value of assets; consequences on objectives; limitations of knowledge; time-related factors; and the biases, assumptions, and beliefs of those involved.</p>
      <p>Each identified risk is classified into one risk category. Where a risk spans several categories, the <strong>predominant</strong> category is recorded on the Risk Register, with further consequences explored as needed. Categories, types, and scenarios are recorded in the risk taxonomy, and each risk is described by:</p>
      <EdBullets>
        <li>The <strong>event</strong> that causes the risk to materialise;</li>
        <li>The immediate <strong>consequence</strong> of that event occurring; and</li>
        <li>The key indicators (KRIs) that monitor whether the risk has occurred or is materialising.</li>
      </EdBullets>
      <p>Because each captured risk matters at business-unit level but requires prioritisation for senior management and the Board, prioritisation is achieved through the risk assessment.</p>
    </EdSectionBand>

    <!-- 05 ASSESSMENT & SCORING -->
    <EdSectionBand
      id="assessment"
      num="05"
      color="var(--at-navy)"
      eyebrow="Risk assessment"
      title="Scoring impact and likelihood"
      lede="Risk evaluation scores each risk across two criteria &mdash; impact and likelihood &mdash; using qualitative, quantitative, or combined techniques, so the most important risks are treated first."
      tone="cream"
    >
      <p>Assessment considers the likelihood of events and consequences, the nature and magnitude of consequences, complexity and connectivity, time-related factors and volatility, and the effectiveness of existing controls. Impact is tied to indicators such as financial impact on revenue, failure to meet regulatory requirements, long-term negative media coverage and market-share loss, prosecution and fines, retention or loss of senior leaders, and impacts on employees or stakeholders including customers and suppliers.</p>

      <h3>Impact scale</h3>
      <div class="ed-table-wrap">
        <table class="ed-table">
          <thead>
            <tr><th>Level</th><th>Rating</th><th>Possible impact</th></tr>
          </thead>
          <tbody>
            <tr><td>5</td><td>Severe</td><td>Severe financial loss; severe loss of confidentiality, integrity, or availability; complete and prolonged IT interruption with no foreseeable resolution; total failure to meet critical objectives and regulatory requirements; severe, irreversible reputation loss requiring Board intervention.</td></tr>
            <tr><td>4</td><td>Major</td><td>Major financial loss; significant loss of confidentiality, integrity, or availability; extensive long-term IT interruption; failure to meet key objectives or regulatory requirements; major reputation loss requiring Executive Management attention.</td></tr>
            <tr><td>3</td><td>Moderate</td><td>Considerable financial loss; considerable impact on confidentiality, integrity, or availability; disruption longer than the Recovery Time Objective (RTO); considerable project disruption; limited reputation loss requiring some management attention.</td></tr>
            <tr><td>2</td><td>Minor</td><td>Minor financial loss; considerable impact on confidentiality, integrity, or availability; disruption longer than identified RTOs; some objectives not met; minor reputation loss unlikely to affect stakeholders.</td></tr>
            <tr><td>1</td><td>Negligible</td><td>Minor impacts on confidentiality, integrity, or availability; minor disruption to business or IT services at departmental level; minor business disruption.</td></tr>
          </tbody>
        </table>
      </div>

      <h3>Likelihood scale</h3>
      <p>Likelihood estimation accounts for existing controls: implemented controls make occurrence less likely, while absent, incompletely implemented, or undocumented controls increase it. Objective records of past events are used where available; otherwise stakeholder and employee interviews inform a first impression.</p>
      <div class="ed-table-wrap">
        <table class="ed-table">
          <thead>
            <tr><th>#</th><th>Descriptor</th><th>Frequency</th><th>Probability</th></tr>
          </thead>
          <tbody>
            <tr><td>5</td><td>Almost Certain</td><td>Every year or more</td><td>60&ndash;100%</td></tr>
            <tr><td>4</td><td>Likely</td><td>Once every 1&ndash;2 years</td><td>30&ndash;59%</td></tr>
            <tr><td>3</td><td>Possible</td><td>Once every 2&ndash;5 years</td><td>10&ndash;29%</td></tr>
            <tr><td>2</td><td>Unlikely</td><td>Once every 5&ndash;10 years</td><td>6&ndash;9%</td></tr>
            <tr><td>1</td><td>Rare</td><td>Less than once every 10 years</td><td>0&ndash;5%</td></tr>
          </tbody>
        </table>
      </div>

      <h3>Heat map</h3>
      <p>A heat map visualises the risk score and prioritises risks. Each risk is assessed on likelihood and impact both before (inherent) and after (residual) controls. Separate assessments are undertaken for new products or material changes, and outputs are reported to the Board Risk and Compliance Committee and Board and form the basis for regulatory reporting.</p>
      <div class="ed-table-wrap">
        <table class="ed-table ed-heat">
          <thead>
            <tr><th>Likelihood &darr; / Impact &rarr;</th><th>Negligible</th><th>Minor</th><th>Moderate</th><th>Major</th><th>Severe</th></tr>
          </thead>
          <tbody>
            <tr><th>Almost Certain</th><td>Low&ndash;Med</td><td>Medium</td><td>Med&ndash;High</td><td>High</td><td>High</td></tr>
            <tr><th>Likely</th><td>Low</td><td>Low&ndash;Med</td><td>Medium</td><td>Med&ndash;High</td><td>High</td></tr>
            <tr><th>Possible</th><td>Low</td><td>Low&ndash;Med</td><td>Medium</td><td>Med&ndash;High</td><td>Med&ndash;High</td></tr>
            <tr><th>Unlikely</th><td>Low</td><td>Low&ndash;Med</td><td>Low&ndash;Med</td><td>Medium</td><td>Med&ndash;High</td></tr>
            <tr><th>Rare</th><td>Low</td><td>Low</td><td>Low&ndash;Med</td><td>Medium</td><td>Medium</td></tr>
          </tbody>
        </table>
      </div>

      <EdNote>
        <p>The impact and likelihood matrices provide a high-level, standardised reference. Granular financial thresholds per impact level, risk-category-specific criteria, and tolerable exposure levels aligned to appetite are further defined within the Operational Risk Management Framework (ORMF).</p>
      </EdNote>
    </EdSectionBand>

    <!-- 06 CONTROLS & RESIDUAL RISK -->
    <EdSectionBand
      id="controls"
      num="06"
      color="var(--at-teal-deep)"
      eyebrow="Control landscape"
      title="Controls and residual risk calculation"
      lede="Once a risk is assessed inherently, the current control landscape is defined. Controls are recorded in the Risk Register and assessed for adequacy of design and effectiveness of operation."
      tone="surface"
    >
      <h3>Control definition</h3>
      <p>A control is a measure, policy, process, system configuration, or activity that manages a risk by reducing its likelihood, impact, or both. Controls may be:</p>
      <EdBullets>
        <li><strong>Preventive</strong> &mdash; designed to stop a risk event from occurring.</li>
        <li><strong>Detective</strong> &mdash; designed to identify and respond to a risk event should it occur.</li>
        <li><strong>Corrective</strong> &mdash; designed to restore a process or reduce consequences after a risk event.</li>
      </EdBullets>
      <p>Each control is assessed on <strong>design adequacy</strong> (whether it is appropriately designed for the risk) and <strong>operating effectiveness</strong> (whether it functions consistently and as intended). Together these determine the strength of the control environment and influence the residual risk.</p>

      <h3>Residual risk calculation</h3>
      <p>Residual risk is the level of risk that remains after the mitigating effect of existing controls. Nebras determines it through five steps:</p>
      <EdStages>
        <EdStage num="01" title="Identify inherent risk" num-color="var(--at-teal-deep)">
          <p>Establish the level of risk before any controls (likelihood &times; impact).</p>
        </EdStage>
        <EdStage num="02" title="Assess existing controls" num-color="var(--at-teal-deep)">
          <p>Evaluate the adequacy and effectiveness of each relevant control.</p>
        </EdStage>
        <EdStage num="03" title="Determine control impact" num-color="var(--at-teal-deep)">
          <p>Adjust inherent risk according to how much the controls reduce likelihood and/or impact.</p>
        </EdStage>
        <EdStage num="04" title="Calculate residual risk" num-color="var(--at-teal-deep)">
          <p>Derive the remaining level of risk after applying the control assessments.</p>
        </EdStage>
        <EdStage num="05" title="Compare against appetite" num-color="var(--at-teal-deep)">
          <p>If residual risk exceeds appetite or tolerance, additional mitigation actions MUST be identified and implemented.</p>
        </EdStage>
      </EdStages>
      <p>Residual risk is documented for each entry in the Risk Register and is subject to ongoing monitoring, review, and update in accordance with the ERM framework.</p>
    </EdSectionBand>

    <!-- 07 MITIGATION, REPORTING & MONITORING -->
    <EdSectionBand
      id="mitigation"
      num="07"
      color="var(--at-teal)"
      eyebrow="Mitigation, reporting & monitoring"
      title="Treating, reporting, and monitoring risk"
      lede="Risk mitigation is an iterative process of formulating, planning, implementing, and assessing strategies, then deciding whether the remaining risk is acceptable &mdash; and if not, taking further action."
      tone="cream"
    >
      <h3>Mitigation strategies</h3>
      <p>Selecting the most appropriate strategy balances benefits against cost, effort, and disadvantages. Strategies are not mutually exclusive and may involve:</p>
      <EdBullets>
        <li>Avoiding the risk by not starting or continuing the activity.</li>
        <li>Taking or increasing the risk to pursue an opportunity.</li>
        <li>Removing the risk source.</li>
        <li>Affecting the likelihood, or the consequences, via mitigation.</li>
        <li>Sharing the risk (e.g. through contracts or insurance).</li>
        <li>Retaining or tolerating the risk by informed decision.</li>
      </EdBullets>
      <p>A mitigation action plan is put in place when current controls are ineffective, require improvement, or do not exist. Each action records who is doing what. Controls and mitigations can span more than one risk and be cross-divisional. Where ownership lies outside Nebras, further controls may be needed and stakeholder communication is crucial. If no strategy sufficiently modifies a risk, it is recorded and kept under review, with residual risk documented and monitored.</p>

      <h3>Risk responses</h3>
      <EdBullets>
        <li><strong>Risk acceptance / tolerance</strong> &mdash; a Risk Owner may tolerate a residual risk within tolerance levels. If it falls outside tolerance, a formal approval form goes to the Risk function, subject to review by the Operations and Risk Lead and CEO; CEO-approved acceptance is noted by the Board Risk and Compliance Committee. Accepted risks remain on the register and are monitored quarterly.</li>
        <li><strong>Risk avoidance</strong> &mdash; completely eliminates the possibility of the risk occurring; the most difficult response but with the greatest beneficial impact.</li>
        <li><strong>Risk reduction</strong> &mdash; implements further mitigation to reduce likelihood, impact, or both.</li>
        <li><strong>Risk transfer</strong> &mdash; hands risk to a willing third party (e.g. insurance or outsourcing); liability may remain with Nebras where contractors cap their liability.</li>
      </EdBullets>

      <h3>Risk reporting</h3>
      <p>The process and its outcomes are documented and reported to communicate activities, inform decision-making, improve risk management, and assist stakeholder interaction. Timely, accurate reporting of risk-limit breaches is ensured, with significant breaches escalated and remediation action plans agreed. The Board Risk and Compliance Committee meets quarterly, and the Board receives an overview of new and changing risk profiles (via heatmap), any activity outside approved appetite, significant findings, and summarised assessment outcomes.</p>

      <h3>Risk monitoring</h3>
      <p>Two systems of monitoring operate: <strong>regular monitoring</strong> of effectiveness and emerging risks, technological advances, and regulatory change; and an <strong>annual review</strong> of assessment findings, mitigation strategies, and control measures. For risks not marked &ldquo;Accepted&rdquo;, the accountable risk owner assesses at least quarterly whether KRIs and key controls are within tolerance, how likelihood or impact has changed, control effectiveness, and any new or emerging risks &mdash; signed off by the accountable risk owner.</p>
    </EdSectionBand>

    <!-- 08 SEGREGATION OF DUTY -->
    <EdSectionBand
      id="segregation"
      num="08"
      color="var(--at-gold)"
      eyebrow="Segregation of Duty"
      title="Preventing end-to-end control by any single role"
      lede="The Segregation of Duty framework prevents fraud, errors, and conflicts of interest by enforcing clear delineations of responsibility across critical processes, aligned with CBUAE Risk Management Regulation and AML/CFT Guidelines."
      tone="surface"
    >
      <h3>Principles and scope</h3>
      <p>Segregation of Duty applies to all Nebras operations, systems, and processes under the ERM Policy &mdash; particularly financial controls, API Hub management, data access, and compliance &mdash; and extends to all staff, Board members, contractors, and third-party vendors. Its principles are:</p>
      <EdBullets>
        <li><strong>Separation of incompatible duties</strong> &mdash; no single individual can initiate, execute, and approve a transaction or activity.</li>
        <li><strong>Prevention of end-to-end control</strong> &mdash; no individual or role controls an entire process (e.g. both data access and compliance monitoring).</li>
        <li><strong>Transparency and accountability</strong> &mdash; all actions are traceable to specific roles, documented in process workflows.</li>
      </EdBullets>

      <h3>System design and enforcement</h3>
      <EdBullets>
        <li><strong>System design</strong> &mdash; Nebras systems are architected to enforce Segregation of Duty, using Role-Based Access Control (RBAC) and automated workflows that assign initiation, verification, and logging to distinct roles.</li>
        <li><strong>Access controls</strong> &mdash; RBAC is implemented across all systems, with permissions reviewed quarterly.</li>
        <li><strong>Access logs</strong> &mdash; all access and activity is logged, monitored for unauthorised attempts, and audited regularly.</li>
        <li><strong>Internal audits</strong> &mdash; the Internal Audit team verifies compliance during annual and risk-based audits of high-risk areas.</li>
        <li><strong>Automated alerts</strong> &mdash; systems generate alerts for detected overlaps or unauthorised access, escalating to the Risk and Compliance Lead.</li>
      </EdBullets>

      <h3>Exception handling</h3>
      <p>Temporary exceptions (e.g. staffing constraints requiring role overlaps) MUST be approved in writing by the CEO with documented justification, time-bound to a maximum of <strong>30 days</strong> unless extended by the Board, and mitigated with additional controls such as enhanced monitoring or secondary approvals by Internal Audit or Risk. All exceptions are logged and reviewed during audits.</p>

      <h3>Critical processes</h3>
      <EdBullets>
        <li><strong>Financial controls</strong> &mdash; separate roles for initiating payments, approving transactions, and reconciling accounts.</li>
        <li><strong>Compliance and audit</strong> &mdash; risk assessment and compliance monitoring are independent from operational execution.</li>
      </EdBullets>

      <h3>Implementation, training, and monitoring</h3>
      <EdBullets>
        <li><strong>Implementation</strong> &mdash; led by the Risk and Compliance Lead with IT support, completed within <strong>60 days</strong> of policy approval.</li>
        <li><strong>Training</strong> &mdash; mandatory for all staff and contractors at onboarding and annually, with completion tracked and non-compliance escalated to the CEO within 7 days. The chapter is communicated to all staff within 30 days of approval.</li>
        <li><strong>Monitoring</strong> &mdash; quarterly reviews of access logs and role assignments; annual audits reported to the Board Audit Committee; detected violations reported to the CEO within 48 hours; continuous real-time alerts with monthly summaries.</li>
        <li><strong>Documentation</strong> &mdash; all related records are held in a secure, centralised database, retained for a minimum of <strong>5 years</strong>, with detailed role-to-process mappings for traceability.</li>
      </EdBullets>

      <EdNote>
        <p>While this policy establishes the principles of Segregation of Duties, detailed role-to-process mappings and RACI matrices &mdash; covering user access management, financial transactions and payment processing, and vendor onboarding and outsourcing &mdash; are maintained within the ORMF and supporting procedures, reviewed at least annually.</p>
      </EdNote>
    </EdSectionBand>

    <EdRelatedCards eyebrow="Read alongside" title="Related policies">
      <EdRelatedCard
        href="/internal/policies/business-continuity"
        category="Risk, Security & Compliance"
        title="Business Continuity Policy"
        desc="How Nebras sustains critical operations and recovers from disruption within defined recovery objectives."
      />
      <EdRelatedCard
        href="/internal/policies/internal-audit"
        category="Governance & Oversight"
        title="Internal Audit Policy"
        desc="The independent third-line assurance function that evaluates the effectiveness of risk management and controls."
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

.ed-table-wrap {
  overflow-x: auto;
  margin: 1.25rem 0;
}

.ed-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
  line-height: 1.5;
}

.ed-table th,
.ed-table td {
  border: 1px solid var(--at-border, rgba(20, 40, 70, 0.15));
  padding: 0.6rem 0.75rem;
  text-align: left;
  vertical-align: top;
}

.ed-table thead th {
  background: var(--at-navy);
  color: #fff;
  font-weight: 600;
}

.ed-table tbody tr:nth-child(even) {
  background: rgba(20, 40, 70, 0.035);
}

.ed-heat th {
  background: rgba(20, 40, 70, 0.06);
  font-weight: 600;
  white-space: nowrap;
}

.ed-heat thead th {
  background: var(--at-navy);
  color: #fff;
}

.ed-heat td {
  text-align: center;
  white-space: nowrap;
}
</style>
