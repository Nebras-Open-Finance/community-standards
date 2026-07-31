<route lang="yaml">
meta:
  layout: internal
  title: Human Resources Policy
  next: false
  prev: false
  aside: false
</route>

<script setup lang="ts">
import { useHead } from '@unhead/vue'

useHead({ title: 'Human Resources Policy · Internal Policies' })

interface Section { id: string; label: string }
interface MetaItem { label: string; value: string }
interface KeyNum { value: string; unit?: string; label: string }

const sections: Section[] = [
  { id: 'overview',       label: 'Overview & values' },
  { id: 'recruitment',    label: 'Recruitment & onboarding' },
  { id: 'working-hours',  label: 'Working hours & attendance' },
  { id: 'leave',          label: 'Leave & holidays' },
  { id: 'compensation',   label: 'Compensation & benefits' },
  { id: 'performance',    label: 'Performance & development' },
  { id: 'conduct',        label: 'Conduct & ethics' },
  { id: 'grievance',      label: 'Grievance & disciplinary' },
  { id: 'end-of-service', label: 'End of service' },
  { id: 'whistleblowing', label: 'Whistleblowing & disclosure' },
]

const meta: MetaItem[] = [
  { label: 'Applies to', value: 'Nebras' },
  { label: 'Classification', value: 'Restricted' },
  { label: 'Version', value: '1.0 · Apr 2024' },
]

const keyNums: KeyNum[] = [
  { value: '30', unit: 'days', label: 'Annual leave entitlement per year' },
  { value: '6', unit: 'mo', label: 'Standard probationary period' },
  { value: '90', unit: 'days', label: 'Maternity leave, full pay' },
]
</script>

<template>
  <div class="ed-page">
    <EdBackStrip href="/internal/policies/" text="All policies" />

    <EdHero
      eyebrow="Internal · Restricted"
      eyebrow-color="var(--at-gold)"
      title="Human Resources Policy"
      :meta="meta"
      lede="The Nebras Open Finance HR Policies and Procedures Manual sets out how the company recruits, rewards, develops, and manages its people &mdash; observing UAE Federal Decree-Law No. 33 of 2021 (the Labour Law) in letter and spirit. Where this manual and the Labour Law diverge, the <strong>legislation prevails</strong>; where an employment contract offers terms no less beneficial than the law, the <strong>contract prevails</strong>."
      :key-nums="keyNums"
    />

    <EdInPageNav :sections="sections" />

    <!-- 01 -->
    <EdSectionBand
      id="overview"
      num="01"
      color="var(--at-teal)"
      eyebrow="Overview & values"
      title="Purpose, applicability, and culture"
      lede="The manual documents Nebras&rsquo;s HR policies and procedures, serves as the reference for consistent application, and supports compliance monitoring. It applies to all staff, secondees, and personnel of Nebras Open Finance and its subsidiaries."
      tone="cream"
    >
      <h3>Governing principles</h3>
      <EdBullets>
        <li>The manual is developed along the guidelines of the UAE Labour Law (Federal Decree-Law No. 33 of 2021, effective 2 February 2022), as amended.</li>
        <li>In case of inconsistency between the manual and the Labour Law, the <strong>legislation takes precedence</strong>.</li>
        <li>In case of inconsistency between the manual and an employment contract, the <strong>employment contract takes precedence</strong>, provided it is not less beneficial than prescribed by law.</li>
        <li>Where a situation is not covered by the manual, the UAE Labour Law is consulted.</li>
        <li>The manual is under the supervision of the CEO; amendments follow the Delegation of Authority, and superseded versions are retained for reference. Queries are registered with the Head of HR.</li>
      </EdBullets>

      <h3>Organisation &amp; Emiratisation</h3>
      <EdBullets>
        <li>Nebras runs a delayered structure &mdash; a CEO at the top with CXOs reporting to the CEO. The structure remains evolutionary and is normally reviewed on a two-year cycle, with changes justified by a business case.</li>
        <li>Corporate-level structural changes (positions reporting to the CEO and all Functional Heads) require <strong>Board of Managers</strong> approval; changes below Functional Head require <strong>CEO</strong> approval.</li>
        <li>Nebras supports the UAE&rsquo;s nationalisation initiatives, designing roles suitable for UAE Nationals with a strategic target workforce composition of <strong>50&ndash;60% UAE Nationals</strong>.</li>
      </EdBullets>

      <EdNote>
        <p>Key terms used throughout: <strong>EOSB</strong> (End of Service Benefits), <strong>Dependants</strong> (immediate family on a Nebras employee&rsquo;s sponsorship), <strong>Point of origin</strong> (the employee&rsquo;s country of origin as stated in their contract), <strong>MOH</strong> (Ministry of Health), and <strong>UAEN</strong> (UAE National).</p>
      </EdNote>
    </EdSectionBand>

    <!-- 02 -->
    <EdSectionBand
      id="recruitment"
      num="02"
      color="var(--at-gold)"
      eyebrow="Recruitment & onboarding"
      title="Workforce planning through confirmation of service"
      lede="Human Resources is treated as the company&rsquo;s most valuable, non-duplicable asset. Staffing follows a structured process aligned to the strategic business plan, with preference given to UAE Nationals consistent with nationalisation directives."
      tone="surface"
    >
      <EdStages>
        <EdStage num="01" title="Workforce planning" num-color="var(--at-gold)">
          <p>In November the CEO issues a workforce-planning format to Managers and Department Heads. Department Heads finalise requirements and draft job descriptions (reviewed and approved by HR); HR consolidates the total requirement, obtains approval, and initiates recruitment.</p>
        </EdStage>
        <EdStage num="02" title="Sourcing &amp; screening" num-color="var(--at-gold)">
          <p>Internal candidates are considered first. Candidates are sourced through agencies as appropriate (executive search for grades 1&ndash;3; Central Bank HR may assist for Nationals). HR screens applications and shortlists via online or in-person interviews.</p>
        </EdStage>
        <EdStage num="03" title="Selection interview" num-color="var(--at-gold)">
          <p>Shortlisted candidates attend a focused interview with the Department Head or manager to assess function-specific competence. Feedback and the order of choice are returned to HR. Selection panels vary by grade, with senior roles reporting to the CEO cleared by the Board of Managers.</p>
        </EdStage>
        <EdStage num="04" title="Appointment" num-color="var(--at-gold)">
          <p>HR prepares the appointment letter for CEO signature. Every appointment is conditional on a satisfactory medical, completion of visa and immigration formalities, proof of resignation from the previous employer, attested educational certificates, and reference/experience letters.</p>
        </EdStage>
        <EdStage num="05" title="Onboarding &amp; checks" num-color="var(--at-gold)">
          <p>Pre-employment background checks are mandatory and tailored to role and seniority &mdash; covering sanctions/PEP/security, criminal records, financial history, and professional references. Results are reviewed by HR, the hiring manager, and (where issues arise) the CEO and relevant Board committee, and recorded in the employee file. Board members are reviewed and approved by CBUAE supervision.</p>
        </EdStage>
      </EdStages>

      <h3>Probation &amp; confirmation</h3>
      <EdBullets>
        <li>New employees are placed on probation for <strong>six months</strong>. Confirmation may exceptionally occur earlier, but no earlier than <strong>three months</strong> from commencement.</li>
        <li>Towards the end of probation, HR obtains a performance review from the Department Head; a confirmation letter is then issued &mdash; signed by HR for grades 7&ndash;8 and by the CEO for all other grades.</li>
        <li>Maternity leave may be granted during probation; the probationary period is extended by the equivalent number of days on return.</li>
      </EdBullets>

      <h3>Transfers</h3>
      <EdBullets>
        <li>Inter-department transfers require a minimum of <strong>1 year</strong> in the current assignment, a last performance score of at least <strong>4</strong>, and Department Head agreement; UAE Nationals are given preference.</li>
        <li>Intra-departmental transfers are decided by the Department Head with written agreement from the Head of HR.</li>
        <li>Overseas joiners receive relocation support, one-way passage, and up to one month&rsquo;s hotel accommodation; family residence visa processing fees are borne by the company.</li>
      </EdBullets>
    </EdSectionBand>

    <!-- 03 -->
    <EdSectionBand
      id="working-hours"
      num="03"
      color="var(--at-blue)"
      eyebrow="Working hours & attendance"
      title="Hours, overtime, remote work, and missions"
      lede="Working-hours policy follows the Federal Labour Law while supporting operational needs and employee wellbeing."
      tone="cream"
    >
      <h3>Standard hours</h3>
      <EdBullets>
        <li>Standard working time is <strong>8 hours/day</strong>, <strong>4.5 hours on Friday</strong>, totalling <strong>36.5 hours/week</strong> (Labour Law Art. 17). The eight daily hours may be scheduled between 07:30 and 21:00 depending on the role.</li>
        <li>During the holy month of Ramadan, working hours are reduced by at least <strong>two hours</strong>, or as instructed by the Federal Government.</li>
        <li>Shift arrangements are prepared by the Direct Supervisor with HR and CEO approval. Work on weekly days off or public holidays requires prior Department Head approval, with HR informed in advance.</li>
      </EdBullets>

      <h3>Overtime</h3>
      <EdBullets>
        <li>Overtime is payable to employees in grades <strong>7&ndash;8</strong>, subject to: more than half an hour worked per day; not exceeding <strong>11.5 hours/week</strong>; calculated at basic salary on a pro-rata basis; and capped at <strong>AED 2,000/month</strong>.</li>
        <li>Total working hours including overtime MUST NOT exceed <strong>144 hours over any 3-week period</strong> &mdash; a maximum of 11.5 overtime hours in a week. The statutory overtime cap is 2 hours/day (Art. 19), paid at basic + 25% (daytime) or basic + 50%, or a compensatory rest day, for night/holiday work.</li>
      </EdBullets>

      <h3>Flexible &amp; remote work</h3>
      <EdBullets>
        <li>Employees may work remotely up to a defined number of days per year &mdash; intended to allow one remote day a week, normally on a Friday. Additional remote work may be agreed with the Direct Supervisor.</li>
        <li>Additional remote work requires a written request at least <strong>two weeks</strong> in advance with justification; the supervisor decides in writing, and agreed performance metrics ensure productivity is maintained.</li>
      </EdBullets>

      <h3>Attendance &amp; official missions</h3>
      <EdBullets>
        <li>Employees unable to report on time for a valid reason MUST inform their immediate superior and submit a leave application on return. Persistent lateness is treated as misconduct.</li>
        <li>Nebras may delegate employees to official missions inside or outside the UAE; missions outside the UAE require CEO approval. Employees remain bound by the code of conduct and MUST respect local laws and customs.</li>
        <li>A UAEN female employee is provided one air ticket for a family member to accompany her on overseas missions, in the same travel class, for first- or second-degree relatives with supporting documents.</li>
      </EdBullets>
    </EdSectionBand>

    <!-- 04 -->
    <EdSectionBand
      id="leave"
      num="04"
      color="var(--at-blue-deep)"
      eyebrow="Leave & holidays"
      title="Leave entitlements and public holidays"
      lede="The company provides several types of leave so employees can rest and return replenished. Public holidays apply as announced by the Federal Government; the CEO circulates upcoming holidays and their duration."
      tone="surface"
    >
      <div class="table-wrap">
        <table class="leave-table">
          <thead>
            <tr><th scope="col">Leave type</th><th scope="col">Entitlement</th><th scope="col">Key conditions</th></tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Annual leave</th>
              <td>30 working days/year (Art. 29)</td>
              <td>Pro-rated for mid-year joiners; does not accrue during unpaid leave or disciplinary suspension; the Direct Supervisor responds to requests within 15 days.</td>
            </tr>
            <tr>
              <th scope="row">Short-term sick leave</th>
              <td>10 calendar days/year</td>
              <td>Defined as up to 5 days; 2&ndash;5 days require a medical certificate; a single day may be approved without a certificate up to 3 times/year; Friday plus the following Monday counts as 4 days.</td>
            </tr>
            <tr>
              <th scope="row">Long-term sick leave</th>
              <td>Up to 90 days/year</td>
              <td>Defined as more than 7 consecutive days; validated by the MOH Medical Committee; beyond 3 months the MOH may extend by six months or recommend termination for lack of medical fitness.</td>
            </tr>
            <tr>
              <th scope="row">Maternity leave</th>
              <td>90 consecutive calendar days, full pay</td>
              <td>Plus one nursing hour per working day for 18 months; the employee informs her supervisor at least 3 months before the expected date; may combine with annual leave.</td>
            </tr>
            <tr>
              <th scope="row">Paternity leave</th>
              <td>10 working days, full pay</td>
              <td>Taken consecutively or intermittently within 6 months of birth; birth certificate submitted in support.</td>
            </tr>
            <tr>
              <th scope="row">Compassionate leave</th>
              <td>10 working days (first-degree); 5 working days (second-degree)</td>
              <td>Full pay on bereavement of a family member; may be taken consecutively or over two intervals; documentation may be requested.</td>
            </tr>
            <tr>
              <th scope="row">Study &amp; examination leave (UAEN)</th>
              <td>15 days/year, plus one hour early daily</td>
              <td>Once a year; programme not exceeding 4 years, accredited by the Ministry of Higher Education; may extend one further year on academic justification.</td>
            </tr>
            <tr>
              <th scope="row">Hajj leave</th>
              <td>Once during employment</td>
              <td>Limited to 2 employees/year on a first-come, first-served basis; proof required on return; unused portion cannot be cashed.</td>
            </tr>
            <tr>
              <th scope="row">Iddah leave</th>
              <td>4 months and 10 days, paid</td>
              <td>Muslim female employee, from the date of the husband&rsquo;s death, per Islamic Sharia; death certificate submitted; cannot be deferred or cashed.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>Availing and accumulation</h3>
      <EdBullets>
        <li>Employees submit tentative annual-leave dates at the start of the year for consolidation into an annual leave plan ensuring fairness and adequate coverage.</li>
        <li>Unused annual leave may be carried forward by no more than <strong>8 days</strong>; leave is not cashed during employment, only at end of service (exceptional further accumulation needs Management approval).</li>
        <li>Unauthorised absence for <strong>seven consecutive days</strong> entitles the company to terminate services. Employees recalled during annual leave have unused days credited back.</li>
        <li>Sick leave taken during annual leave counts as annual leave; if illness extends beyond it, sick leave begins on the scheduled return date subject to a satisfactory medical report.</li>
      </EdBullets>
    </EdSectionBand>

    <!-- 05 -->
    <EdSectionBand
      id="compensation"
      num="05"
      color="var(--at-navy)"
      eyebrow="Compensation & benefits"
      title="Pay, allowances, and benefits"
      lede="Compensation is guided by internal equity and external competitiveness, underpinned by a Board-approved job-evaluation methodology that ranks roles by relative value &mdash; evaluating the job, not the jobholder."
      tone="cream"
    >
      <h3>Pay structure &amp; cycle</h3>
      <EdBullets>
        <li>Total fixed pay is split <strong>Basic Salary (50%) + Consolidated Allowance (50%)</strong>.</li>
        <li>Fixed pay is processed on the <strong>26th</strong> of each month (or the last working day before, if the 26th is a non-working day).</li>
        <li>Variable pay is finalised and disbursed between <strong>10 January and 28 February</strong> each year, subject to Board approval.</li>
      </EdBullets>

      <h3>UAE National allowances</h3>
      <EdBullets>
        <li>Child allowance of <strong>AED 600</strong> per child per month, per the family book.</li>
        <li>UAE National premium allowance by grade: grades 1&ndash;2 &mdash; AED 10,000; grades 3&ndash;4 &mdash; AED 8,000; grades 5&ndash;6 &mdash; AED 6,000; grades 7&ndash;8 &mdash; AED 4,000.</li>
      </EdBullets>

      <h3>Benefits</h3>
      <EdBullets>
        <li><strong>Health insurance</strong> &mdash; covers self and dependants (spouse and 3 children up to age 18 or visa validity); grades 1&ndash;2 in category A, grades 3&ndash;8 in category B. Double insurance is not permitted; UAE Nationals receive a Thiqa Top-Up plan.</li>
        <li><strong>Group life &amp; personal accident</strong> &mdash; all employees are covered (no dependants enrolled).</li>
        <li><strong>Pension</strong> &mdash; UAE Nationals are enrolled with GPSSA: employer contributes <strong>15%</strong> and the employee <strong>5%</strong> of pensionable salary; GCC Nationals follow their home-country scheme.</li>
        <li><strong>Education allowance</strong> &mdash; per child per annum for up to 3 children aged 3&ndash;18 (no cap for UAE Nationals): grade 1 &mdash; AED 65,000; grades 2&ndash;4 &mdash; AED 50,000; grades 5&ndash;6 &mdash; AED 40,000; grades 7&ndash;8 &mdash; AED 30,000.</li>
        <li><strong>Housing loan</strong> &mdash; grades 1&ndash;2 are eligible for an interest-free loan up to AED 120,000 per 6 months, repaid over 6 months; fully repayable on resignation.</li>
        <li><strong>Annual leave airfare</strong> &mdash; IATA rate for employee, spouse, and up to 3 children under 18 with valid UAE residency; business class for grades 1&ndash;2, economy for grades 3&ndash;8.</li>
        <li><strong>Relocation</strong> &mdash; international joiners receive one-way passage and hotel accommodation up to 30 nights; grades 1&ndash;3 receive a relocation allowance of one Basic Allowance up to AED 25,000.</li>
      </EdBullets>

      <h3>Short-term incentives &amp; merit</h3>
      <EdBullets>
        <li>The Board sets the annual bonus pool; incentives are a function of individual performance rating and total fixed monthly pay.</li>
        <li>Employees hired on/before 1 January with no active warning qualify for the bonus; those hired between 2 January and 1 July are pro-rated; those hired after 1 July are not eligible. Graduate trainees are not eligible; employees on military service receive a default 3.00 rating.</li>
        <li>Annual merit increases are at Board discretion, based on performance, position in scale, and cost-of-living/market inflation.</li>
      </EdBullets>
    </EdSectionBand>

    <!-- 06 -->
    <EdSectionBand
      id="performance"
      num="06"
      color="var(--at-teal-deep)"
      eyebrow="Performance & development"
      title="Performance management, promotion, and learning"
      lede="The Performance Management Process (PMP) cascades strategic goals to individual SMART objectives, applicable to all levels. Core-competency development carries 20% weighting in the outcome."
      tone="surface"
    >
      <h3>Performance categories</h3>
      <EdBullets>
        <li>Reviews culminate in a category from <strong>5 &ndash; Outstanding</strong>, 4 &ndash; Exceeds Expectation, 3 &ndash; Meeting All Expectations, 2 &ndash; Below Expectation, to <strong>1 &ndash; Unsatisfactory</strong>.</li>
        <li>Distribution follows a normal (bell-curve) pattern &mdash; indicatively 5/10/70/10/5% across the five levels &mdash; applied flexibly given the small organisation.</li>
        <li>At least one interim review is conducted during the year, with objectives agreed and signed by appraiser and appraisee.</li>
      </EdBullets>

      <h3>Performance Improvement Plan (PIP)</h3>
      <EdBullets>
        <li>An <strong>Unsatisfactory</strong> rating renders the employee liable for immediate discontinuation of service; a <strong>Below Expectation</strong> rating triggers a PIP.</li>
        <li>The PIP is developed by the line manager with the employee, normally over <strong>3 months</strong>, reviewed monthly. It may extend a further 3 months; failure to improve within the extended period leads to termination.</li>
        <li>An underperformer may not transfer to another department until the PIP is completed satisfactorily. Employees who wilfully refuse to perform undergo counselling rather than a PIP.</li>
      </EdBullets>

      <h3>Promotion &amp; succession</h3>
      <EdBullets>
        <li>Promotions are planned career moves to <strong>vacant</strong> positions only, requiring consistent average PMP scores over the relevant tenure, no active warning, and the potential to hold higher responsibilities. Employees are not promoted to the same grade as their line manager.</li>
        <li>Promotion increments apply to total fixed salary at <strong>10% / 15% / 20%</strong> of gross (by average PMP-score band), or the new grade minimum, whichever is higher. Board approval is required for grades 3&ndash;5; CEO for grades 6&ndash;8.</li>
        <li>Succession planning applies to section/unit managers and above, and to critical roles; successors are usually identified internally with a time-bound development plan.</li>
      </EdBullets>

      <h3>Learning &amp; development</h3>
      <EdBullets>
        <li>Nebras provides learning mapped to identified development needs. The company may budget annually for training.</li>
        <li>Modes include in-house and external programmes, on-the-job training, structured knowledge-transfer sessions, a new-joiner orientation programme (compliance, AML, health &amp; safety, security), job rotations, coaching and counselling, conferences and seminars, and overseas or blended learning.</li>
      </EdBullets>
    </EdSectionBand>

    <!-- 07 -->
    <EdSectionBand
      id="conduct"
      num="07"
      color="var(--at-teal)"
      eyebrow="Conduct & ethics"
      title="Professional ethics and code of conduct"
      lede="How results are achieved matters as much as the results themselves. The code applies to all employees and Board members, reflecting the trust customers place in Nebras with their confidential information and transactions."
      tone="cream"
    >
      <h3>Integrity obligations</h3>
      <EdBullets>
        <li><strong>Conflicts of interest</strong> MUST be disclosed and approved in writing by the Board/CEO. Staff disclose annually; Board members on joining or renewal. Accepted disclosures are stored confidentially by HR for 5 years.</li>
        <li><strong>Gifts &amp; bribes</strong> &mdash; commissions, kickbacks, and undesirable gifts MUST NOT be accepted. A gift worth more than <strong>AED 250</strong> must be disclosed in writing to the CEO for permission; the Anti-Bribery &amp; Corruption policy further limits gifts/hospitality to <strong>AED 500</strong>, all declared and logged in an official register.</li>
        <li><strong>Outside activities</strong> &mdash; employees MUST NOT be gainfully engaged with another employer during or outside office hours (volunteering and charity are exempt). No preferential treatment or personal borrowing/lending between employees.</li>
        <li><strong>Anti-money laundering</strong> &mdash; employees familiarise themselves with relevant federal laws and report suspicious activity to the concerned authorities.</li>
        <li><strong>Confidentiality</strong> &mdash; customer and proprietary information MUST NOT be shared with unauthorised third parties; individual salaries and bonuses are not discussed; documents are stored securely and shredded when unwanted.</li>
      </EdBullets>

      <h3>Anti-Bribery &amp; Corruption</h3>
      <EdBullets>
        <li>Nebras maintains a zero-tolerance stance aligned with Federal Law No. 7/2016 and CBUAE AML/CFT Guidelines. Third-party vendors are screened for AB&amp;C risk at onboarding; annual risk evaluations are run by the Risk team.</li>
        <li>All transactions and gift declarations are retained for <strong>5 years</strong>; the Head of Risk monitors compliance bi-annually and Internal Audit verifies gift logs at least annually.</li>
        <li>Suspected issues are reported to the Whistle Blowing Committee; investigations are confidential and concluded within <strong>30 days</strong>.</li>
      </EdBullets>

      <h3>Workplace conduct</h3>
      <EdBullets>
        <li>Working languages are English and Arabic. Company computers, email, and internet are for business use only and are monitored; only licensed, company-owned software may be installed.</li>
        <li>Smoking (including e-cigarettes) is prohibited anywhere on the premises. ID cards MUST be carried and presented on request; access is limited to areas required for duties.</li>
        <li>Employees follow all health &amp; safety laws and training, report unsafe incidents immediately, and disclose health conditions affecting duties.</li>
        <li><strong>Dress code</strong> &mdash; professional and conservative, in line with UAE customs: men wear Kandoora (UAEN) or suit/blazer with collared shirt; women wear Abaya (UAEN) or suit/dress with upper arms covered and skirts below the knee. Denim, shorts, and form-fitting, transparent, or revealing garments are not permitted.</li>
      </EdBullets>

      <h3>Misconduct &amp; commitments</h3>
      <EdBullets>
        <li>Beyond the acts listed under Labour Law No. 33 of 2021, misconduct includes unauthorised absence, insubordination, failure to follow instructions, disregarding safety, fighting, illegal activity, indecent or coercive conduct, discourtesy, and divulging confidential information.</li>
        <li>Being under the influence of alcohol or controlled substances on the premises is prohibited; possession or dealing in illegal substances results in <strong>instant dismissal</strong> and referral to the authorities.</li>
        <li>Nebras adopts a <strong>zero-tolerance</strong> approach to modern slavery, human trafficking, and forced labour: employment is freely chosen, original documents are not retained, and concerns are reported via the Whistle Blowing Policy.</li>
        <li>Confidentiality obligations continue after severance; company assets and funds are used only for company business and returned on termination.</li>
      </EdBullets>
    </EdSectionBand>

    <!-- 08 -->
    <EdSectionBand
      id="grievance"
      num="08"
      color="var(--at-gold)"
      eyebrow="Grievance & disciplinary"
      title="Raising concerns and corrective action"
      lede="People management is treated as a positive process. Grievances are resolved informally and confidentially where possible; disciplinary procedure is a last resort after efforts to improve conduct or performance."
      tone="surface"
    >
      <h3>Grievance procedure</h3>
      <EdBullets>
        <li>Covers perceived unfair treatment, working conditions, interpersonal conflicts, and matters under Article 111 of the Labour Law &mdash; but cannot be used to appeal a disciplinary action already initiated (a separate appeals process applies).</li>
        <li>The employee raises the concern in writing to the immediate supervisor/manager or HR, who aim to resolve it within <strong>3 days</strong>; unresolved matters escalate to the Department Head, then HR.</li>
        <li>If still unresolved, HR (or the CEO, for Manager-and-above) constitutes an ad-hoc committee of up to <strong>3 members</strong>. The whole process is completed within <strong>15 days</strong>, with the final decision communicated in writing by HR.</li>
      </EdBullets>

      <h3>Disciplinary process</h3>
      <EdStages>
        <EdStage num="01" title="Investigation" num-color="var(--at-gold)">
          <p>On becoming aware of misconduct, the immediate supervisor investigates, discusses the incident with the employee, gives them the opportunity to explain, and records the discussion and any commitment to improve.</p>
        </EdStage>
        <EdStage num="02" title="Escalation" num-color="var(--at-gold)">
          <p>More serious matters are reported to the Department Head in writing (findings, employee responses, recommendation). The Department Head meets the employee and supervisor within 3 days and may involve HR.</p>
        </EdStage>
        <EdStage num="03" title="Committee" num-color="var(--at-gold)">
          <p>For employees below Manager, HR constitutes a 3-member investigation committee; for Manager and above, the committee is constituted by the CEO and works under the CEO&rsquo;s guidance.</p>
        </EdStage>
        <EdStage num="04" title="Decision" num-color="var(--at-gold)">
          <p>Actions escalate through verbal warning, first written warning, final written warning, to termination. Discontinuation of a Manager&rsquo;s service requires approval from the relevant Board committee; other terminations require CEO approval.</p>
        </EdStage>
        <EdStage num="05" title="Closure" num-color="var(--at-gold)">
          <p>Disciplinary letters are signed by the Department Head/CEO and documented in the employee record. The procedure is concluded within <strong>30 days</strong> of occurrence or reporting to HR.</p>
        </EdStage>
      </EdStages>

      <EdNote>
        <p>No disciplinary action is taken without a proper enquiry recorded in writing, and employees MUST be given a fair chance to defend themselves. The committee may recommend suspension pending inquiry (without pay where a crime is alleged). No employee under inquiry may resign until it concludes. An employee proved innocent is reinstated with salary for the suspension period.</p>
      </EdNote>
    </EdSectionBand>

    <!-- 09 -->
    <EdSectionBand
      id="end-of-service"
      num="09"
      color="var(--at-blue)"
      eyebrow="End of service"
      title="Resignation, termination, and benefits"
      lede="Employment ends through resignation, termination, retirement, or death. The company will not terminate without careful consideration and full compliance with the UAE Labour Law."
      tone="cream"
    >
      <h3>Notice periods</h3>
      <EdBullets>
        <li>Employer termination during probation &mdash; <strong>14 days</strong>.</li>
        <li>Resignation during probation to leave the UAE &mdash; <strong>14 days</strong>; to join another UAE employer &mdash; <strong>30 days</strong>.</li>
        <li>Termination or resignation outside probation &mdash; <strong>30&ndash;90 days</strong> (minimum 30), as specified in the appointment letter.</li>
      </EdBullets>

      <h3>Resignation, retirement &amp; death</h3>
      <EdBullets>
        <li>A confirmed employee resigns by letter to the Department Head/manager with the agreed notice; HR issues an acceptance letter and completes full and final settlement after handover. Visa/sponsorship is cancelled or transferred within two months of the last working day.</li>
        <li>Retirement age is <strong>65</strong> for Nationals and <strong>60</strong> for expatriates, with 3 months&rsquo; advance notice; the Board may extend service by up to 1 year.</li>
        <li>On death, the contract ends from the death-certificate date; legal heirs receive applicable EOSB, and the company repatriates the remains and eligible dependants.</li>
      </EdBullets>

      <h3>End-of-service payments</h3>
      <EdBullets>
        <li>Settlement includes salary to the last working day, payment in lieu of accrued annual leave, pro-rata annual air passage (if 6+ months completed since the last entitlement), and notice-period salary where applicable.</li>
        <li>Repatriation: a one-way ticket home for self and dependants once the visa is cancelled; grades 1&ndash;3 receive a repatriation allowance up to <strong>AED 5,000</strong>. Not payable if transferring to another UAE role.</li>
        <li><strong>Gratuity</strong> &mdash; non-national employees are entitled to <strong>one month&rsquo;s basic salary for each year</strong> of continuous service (based on last basic salary); employees with less than one year receive none. UAE Nationals&rsquo; EOSB is calculated under Federal Pension &amp; Social Security Law No. 7 of 1999, as amended.</li>
      </EdBullets>

      <EdNote>
        <p>The manual also references the Labour Law gratuity scale (Art. 51): <strong>21 days</strong>&rsquo; basic wage per year for 1&ndash;5 years&rsquo; service and <strong>30 days</strong>&rsquo; basic wage per year beyond 5 years, capped at a maximum of two years&rsquo; wage, with pro-rata treatment for part-time or temporary contracts where stated.</p>
      </EdNote>

      <h3>Off-boarding</h3>
      <EdBullets>
        <li><strong>System access</strong> is revoked immediately across all systems.</li>
        <li><strong>Final settlement</strong> is paid within <strong>14 days</strong>, per Federal Law No. 33/2021.</li>
        <li><strong>Assets</strong> &mdash; access cards, devices, and ID are collected and their return logged by HR; unreturned property is recovered from final dues. Exit interviews may be conducted after dues are paid.</li>
      </EdBullets>
    </EdSectionBand>

    <!-- 10 -->
    <EdSectionBand
      id="whistleblowing"
      num="10"
      color="var(--at-blue-deep)"
      eyebrow="Whistleblowing & disclosure"
      title="Speaking up, disclosures, and behaviours"
      lede="The Whistle Blowing Policy provides a safe, confidential channel to raise evidenced concerns without fear of victimisation, complementing &mdash; not replacing &mdash; other channels and the code of conduct."
      tone="surface"
    >
      <h3>Whistleblowing</h3>
      <EdBullets>
        <li>Reportable concerns include unethical conduct, fraud, conflicts of interest, confidentiality breaches, theft, bribery, money laundering, misrepresentation of financials, discrimination or harassment, health &amp; safety hazards, and suspected modern slavery or human trafficking.</li>
        <li>Concerns are submitted in writing, signed, in a sealed envelope marked &ldquo;Highly Confidential &ndash; WB&rdquo; to the designated Board member/CEO. The sender MUST NOT write their name on the outside; <strong>anonymous letters are not actioned</strong>.</li>
        <li>An ad-hoc Whistle Blowing Committee (WBC) of no more than 3 members &mdash; typically the Head of Internal Audit, Head of Risk, and Board members &mdash; commences investigation no later than <strong>3 working days</strong>, preserving confidentiality throughout.</li>
        <li>Whistleblowers are protected from retaliation and their anonymity preserved where possible; false or malicious whistleblowing attracts disciplinary action. A whistleblower may be rewarded where the company avoids reputational or financial loss.</li>
      </EdBullets>

      <h3>Disclosure policy</h3>
      <EdBullets>
        <li><strong>Outward disclosures</strong> of customer or proprietary information require the CEO&rsquo;s written consent, a demonstrated need-to-know, and documents marked &ldquo;Confidential&rdquo;.</li>
        <li><strong>Inward disclosures</strong> are mandatory (at joining) &mdash; business interests with Nebras or CBUAE, relations/investments with LFIs, and relatives in the Central Bank, banks, or regulatory bodies &mdash; or event-based (vendor interests, conflicts arising in employment). Disclosures are updated yearly.</li>
        <li>Non-compliance &mdash; false, incomplete, or late disclosures &mdash; attracts disciplinary action. HR conducts a preliminary investigation and proposes action to the CEO; grievous cases may go to an investigation committee and the Board.</li>
      </EdBullets>

      <h3>Nebras behaviours</h3>
      <EdProse>
        <p>The company&rsquo;s culture is anchored in eight core behaviours: ownership, proactivity &amp; accountability; setting a high bar with the grit to evolve an industry; a bias toward pertinent action grounded in nuance; being built for compliance &amp; trust; transparent engagement and aligned execution; staying humble and curious; customer obsession while inventing the future; and being lean, collaborative &amp; supportive across entity boundaries.</p>
      </EdProse>
    </EdSectionBand>

    <EdRelatedCards eyebrow="Read alongside" title="Related policies">
      <EdRelatedCard
        href="/internal/policies/corporate-governance"
        category="Governance & Oversight"
        title="Corporate Governance Policy"
        desc="The Board, committee, and Delegation of Authority framework that approves HR structure, remuneration, and senior appointments."
      />
      <EdRelatedCard
        href="/internal/policies/information-security"
        category="Risk, Security & Compliance"
        title="Information Security Policy"
        desc="The access, monitoring, and data-protection controls underpinning acceptable use, confidentiality, and off-boarding revocation."
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

.table-wrap {
  overflow-x: auto;
  margin: 1.5rem 0;
}

.leave-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
}

.leave-table th,
.leave-table td {
  text-align: left;
  vertical-align: top;
  padding: 0.6rem 0.85rem;
  border-bottom: 1px solid var(--at-hairline, rgba(0, 0, 0, 0.12));
}

.leave-table thead th {
  font-weight: 600;
  color: var(--at-navy);
  border-bottom: 2px solid var(--at-navy);
}

.leave-table tbody th {
  font-weight: 600;
  white-space: nowrap;
}
</style>
