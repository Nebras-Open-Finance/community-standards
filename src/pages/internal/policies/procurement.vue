<route lang="yaml">
meta:
  layout: internal
  title: Procurement Policy
  next: false
  prev: false
  aside: false
</route>

<script setup lang="ts">
import { useHead } from '@unhead/vue'

useHead({ title: 'Procurement Policy · Internal Policies' })

interface Section { id: string; label: string }
interface MetaItem { label: string; value: string }
interface KeyNum { value: string; unit?: string; label: string }

const sections: Section[] = [
  { id: 'overview',    label: 'Overview' },
  { id: 'principles',  label: 'Principles & provisions' },
  { id: 'governance',  label: 'Governance & Committee' },
  { id: 'methods',     label: 'Methods & thresholds' },
  { id: 'tender',      label: 'Tender lifecycle' },
  { id: 'special',     label: 'Special arrangements' },
  { id: 'contracts',   label: 'Contract management' },
  { id: 'vendors',     label: 'Vendor management' },
  { id: 'records',     label: 'Records & maintenance' },
]

const meta: MetaItem[] = [
  { label: 'Applies to', value: 'All Nebras staff' },
  { label: 'Classification', value: 'Restricted' },
  { label: 'Version', value: '0.1 · Aug 2025' },
]

const keyNums: KeyNum[] = [
  { value: '500k', unit: 'AED', label: 'Procurement Committee oversight threshold' },
  { value: '20', unit: '%', label: 'Variation cap before Committee review' },
  { value: '7', unit: 'yr', label: 'Critical record retention' },
]
</script>

<template>
  <div class="ed-page">
    <EdBackStrip href="/internal/policies/" text="All policies" />

    <EdHero
      eyebrow="Internal · Restricted"
      eyebrow-color="var(--at-navy)"
      title="Procurement Policy"
      :meta="meta"
      lede="This policy establishes the governing framework for all procurement and contracting activities within Nebras Open Finance, ensuring that procurement is conducted in a transparent, efficient, and controlled manner &mdash; consistently achieving <strong>value for money</strong> while supporting Nebras&rsquo;s role in enabling the UAE Open Finance ecosystem."
      :key-nums="keyNums"
    />

    <EdInPageNav :sections="sections" />

    <EdSectionBand
      id="overview"
      num="01"
      color="var(--at-teal)"
      eyebrow="Overview"
      title="Purpose and scope"
      lede="This policy applies to all internal stakeholders and external parties engaged in the supply of goods, works, and services to Nebras, promoting transparent, competitive, and standardized processes aligned with organizational objectives."
      tone="cream"
    >
      <EdProse>
        <p>This policy establishes the framework for procurement activities to ensure that the organization consistently achieves value for money. It promotes transparent, competitive, and standardized processes, while supporting efficient, ethical, and commercially sound procurement practices. It applies to all procurement of goods, works, and services undertaken by Nebras.</p>
      </EdProse>

      <h3>Excluded from scope</h3>
      <EdBullets>
        <li>Employment-related contracts.</li>
        <li>Low-value purchases below defined thresholds (e.g. petty cash or corporate card use).</li>
        <li>Utility services (e.g. electricity, water, telecommunications).</li>
        <li>Real estate transactions (e.g. office leases, land acquisition).</li>
        <li>Insurance policies (e.g. medical, asset, liability coverage).</li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="principles"
      num="02"
      color="var(--at-gold)"
      eyebrow="Principles &amp; provisions"
      title="Key principles and general provisions"
      lede="Procurement activities MUST adhere to a set of key principles, supported by general provisions that safeguard fairness, competition, and the interests of Nebras."
      tone="surface"
    >
      <h3>Key procurement principles</h3>
      <EdBullets>
        <li><strong>Value for money</strong> &mdash; the Procurement function MUST consider all options and develop strategies that achieve the most advantageous combination of total cost, quality, and sustainability on a case-by-case basis.</li>
        <li><strong>Fair and equal competition</strong> &mdash; all processes MUST be open, transparent, and competitive; bidders shall be treated equally and provided with the same information simultaneously.</li>
        <li><strong>Conflict of interest and ethical conduct</strong> &mdash; personnel MUST adhere to the HR Policy and Code of Conduct, avoid real or perceived conflicts of interest, reject gifts, bribery, corruption, or favouritism, and MUST NOT disclose bid or contract details to unauthorized parties.</li>
        <li><strong>Proportionality</strong> &mdash; the procurement process MUST be proportionate to the size and nature of the requirement, avoiding unnecessary burdens on Nebras and bidders.</li>
        <li><strong>Protecting the interests of Nebras</strong> &mdash; evaluate risks, maintain comprehensive records, operate within the Delegation of Authority (DoA), require bidders to sign NDAs before receiving tender documents, and comply with applicable UAE laws.</li>
      </EdBullets>

      <h3>General provisions</h3>
      <EdBullets>
        <li>Procurement shall be conducted in a fair, transparent, and competitive manner.</li>
        <li>Splitting procurement requirements to bypass approval thresholds is strictly prohibited.</li>
        <li>Procurement activities MUST comply with applicable UAE laws and local content requirements.</li>
        <li>All procurement MUST be supported by an approved budget and relevant approvals as per the DoA.</li>
        <li>A valid contract or purchase order MUST be issued before engaging any supplier.</li>
        <li>Nebras reserves the right to reject invoices submitted without a valid agreement.</li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="governance"
      num="03"
      color="var(--at-blue)"
      eyebrow="Governance &amp; Committee"
      title="Dual control and the Procurement Committee"
      lede="Nebras applies the concept of dual control where a procurement transaction involves an RFP, tender process, or other special procurement decision. A standing Procurement Committee of independent members submits its endorsement to the respective delegated authority, which reviews the report and takes the decision accordingly."
      tone="cream"
    >
      <EdProse>
        <p>The Procurement Committee shall be appointed upon the approval of the CEO and comprises a Chairperson, Secretary, Permanent Members, Advisory Members, and Invitee Members as required. Its detailed role, responsibilities, composition, and operating procedures are defined in the Procurement Committee Charter, which shall be reviewed and updated annually.</p>
      </EdProse>

      <h3>The Committee provides oversight of</h3>
      <EdBullets>
        <li>Procurement transactions exceeding <strong>AED 500,000</strong>.</li>
        <li>Contract variations greater than <strong>20%</strong> of an existing contract.</li>
        <li>Single or sole source procurement requests.</li>
        <li>Contract renewal and termination requests.</li>
      </EdBullets>

      <EdNote>
        <p>The Procurement Committee finalizes evaluation for RFP/RFQs under <strong>AED 3 million</strong>. Anything above AED 3 million in value &mdash; or other values as per the defined DoA &mdash; is referred to the CBUAE&rsquo;s Procurement Committee.</p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="methods"
      num="04"
      color="var(--at-blue-deep)"
      eyebrow="Methods &amp; thresholds"
      title="Procurement methods and value thresholds"
      lede="The procurement method is determined by the value and complexity of the requirement, from direct low-value purchases through to a full sealed-envelope tender."
      tone="surface"
    >
      <h3>Direct procurement</h3>
      <EdBullets>
        <li><strong>Petty cash</strong> &mdash; low-value purchases below AED 1,000 for immediate and incidental needs, administered by the Finance Department and supported by valid receipts.</li>
        <li><strong>Corporate card</strong> &mdash; low-value purchases from AED 1,000 to AED 5,000, issued and controlled by the Finance Department, with the Procurement Manager determining card versus purchase order.</li>
        <li><strong>Direct purchase order</strong> &mdash; low-risk, low-value purchases from AED 5,001 up to AED 50,000, supported by a valid Purchase Requisition and necessary technical approvals.</li>
      </EdBullets>

      <h3>Competitive procurement</h3>
      <EdBullets>
        <li><strong>RFQ</strong> &mdash; for standard, low-complexity goods with clearly defined specifications, valued above AED 50,000 to below AED 1,000,000.</li>
        <li><strong>RFP</strong> &mdash; for medium-complexity procurements above AED 50,000 to below AED 1,000,000, where both technical and commercial evaluations are necessary; a minimum of three proposals shall be sought from qualified vendors.</li>
        <li><strong>Tender</strong> &mdash; for high-value and complex procurements from AED 1,000,000, using a sealed-envelope process with a minimum of three sealed bids from qualified vendors.</li>
      </EdBullets>

      <EdProse>
        <p>For procurements valued at AED 500,000 and above, Procurement Committee approval shall be required prior to Delegation of Authority (DOA) approval.</p>
      </EdProse>

      <div class="thresholds">
        <table>
          <thead>
            <tr>
              <th>Value range (AED)</th>
              <th>Approach</th>
              <th>Method</th>
              <th>Governance</th>
              <th>Financial controls</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>&lt; 1,000</td>
              <td>Any</td>
              <td>Petty cash</td>
              <td>Finance controls</td>
              <td>Policy exclusion</td>
            </tr>
            <tr>
              <td>1,000 &ndash; 5,000</td>
              <td>Tactical</td>
              <td>Corporate card</td>
              <td>Finance approval</td>
              <td>Policy exclusion</td>
            </tr>
            <tr>
              <td>5,001 &ndash; 50,000</td>
              <td>Tactical</td>
              <td>Direct PO</td>
              <td>Standard approval (DOA)</td>
              <td>PR required</td>
            </tr>
            <tr>
              <td>50k &ndash; 500k</td>
              <td>Tactical</td>
              <td>RFQ</td>
              <td>3 bidders</td>
              <td>Standard lifecycle</td>
            </tr>
            <tr>
              <td>50k &ndash; 1M</td>
              <td>Normal</td>
              <td>RFP</td>
              <td>3 bidders</td>
              <td>Technical &amp; commercial eval</td>
            </tr>
            <tr>
              <td>50k &ndash; 1M (unclear scope)</td>
              <td>Normal</td>
              <td>RFI &rarr; RFQ/RFP</td>
              <td>3 bidders</td>
              <td>Market discovery required</td>
            </tr>
            <tr>
              <td>500k &ndash; 1M</td>
              <td>Normal</td>
              <td>RFQ / RFP</td>
              <td>Procurement Committee required</td>
              <td>Enhanced governance</td>
            </tr>
            <tr>
              <td>&ge; 1M</td>
              <td>Strategic</td>
              <td>Tender</td>
              <td>Procurement Committee required</td>
              <td>1% Tender Guarantee (case-by-case)</td>
            </tr>
            <tr>
              <td>&ge; 1M (award stage)</td>
              <td>Strategic</td>
              <td>Contract award</td>
              <td>Procurement Committee + DOA</td>
              <td>10% Performance Guarantee</td>
            </tr>
          </tbody>
        </table>
      </div>
    </EdSectionBand>

    <EdSectionBand
      id="tender"
      num="05"
      color="var(--at-navy)"
      eyebrow="Tender lifecycle"
      title="From requisition to award"
      lede="For competitive and tendered procurements, a structured lifecycle ensures transparency, fairness, and value for money. All submissions are received and managed through the Digital Procurement System."
      tone="cream"
    >
      <EdStages>
        <EdStage num="01" title="Purchase Requisition" num-color="var(--at-navy)">
          <p>The End-User raises a Purchase Requisition (PR) aligned to the approved budget, with clear scope of work, specifications, BOQ, quantities, and the correct asset, material, or service code. PRs that split values to bypass approval limits are strictly prohibited.</p>
        </EdStage>
        <EdStage num="02" title="Sourcing" num-color="var(--at-navy)">
          <p>The Bidders List is drawn from the Approved Vendor list, an End-User proposed bidders list, or the prequalification process. A minimum of three bids shall be sought from qualified vendors.</p>
        </EdStage>
        <EdStage num="03" title="Tender opening" num-color="var(--at-navy)">
          <p>Opening follows a structured, two-stage process: technical submissions are accessed first for evaluation, and commercial submissions remain restricted until the technical evaluation is formally completed and approved.</p>
        </EdStage>
        <EdStage num="04" title="Technical evaluation" num-color="var(--at-navy)">
          <p>Conducted against predefined, approved technical criteria by End-Users and assigned cross-department members, with all pricing information excluded. A structured Post-Tender Clarification (PTC) may be initiated prior to commercial opening.</p>
        </EdStage>
        <EdStage num="05" title="Commercial evaluation" num-color="var(--at-navy)">
          <p>Only the commercial submissions of technically qualified bidders are opened. The commercial evaluation is conducted exclusively by the Procurement Department, without involvement from the technical team or other departments.</p>
        </EdStage>
        <EdStage num="06" title="Negotiation &amp; award" num-color="var(--at-navy)">
          <p>Negotiation may be authorized with the lowest or multiple bidders. The best evaluated offer is submitted for Procurement Committee review and endorsement, followed by final approval in line with the DOA.</p>
        </EdStage>
        <EdStage num="07" title="Notification" num-color="var(--at-navy)">
          <p>The award is issued through a signed Letter of Award (LOA) in accordance with the DOA. All unsuccessful bidders receive a formal regret notification in writing.</p>
        </EdStage>
      </EdStages>

      <EdExample label="Guarantees">
        <EdBullets>
          <li><strong>Tender Guarantee</strong> &mdash; 1% of the total bid value, in the form of a bank guarantee or security cheque, determined case-by-case; returned to unsuccessful bidders following contract award.</li>
          <li><strong>Performance Guarantee</strong> &mdash; 10% of the total contract value from the successful supplier. A supplier may request to deduct an amount from payable invoices as an alternative, subject to Procurement Committee approval.</li>
        </EdBullets>
      </EdExample>
    </EdSectionBand>

    <EdSectionBand
      id="special"
      num="06"
      color="var(--at-teal-deep)"
      eyebrow="Special arrangements"
      title="Non-competitive and framework arrangements"
      lede="Beyond standard competitive procurement, defined arrangements cover situations where competition is not practical or where recurring needs are best served by longer-term agreements."
      tone="surface"
    >
      <EdBullets>
        <li><strong>Single / sole source</strong> &mdash; a supplier may be selected without competition where goods or services are available from only one source, an officially authorized distributor exists, or the End-User relies on proven performance with written justification. All such requests MUST be justified, submitted to the Procurement Committee for endorsement, documented, and subject to periodic audit review.</li>
        <li><strong>Purchase Order variation / Change Request</strong> &mdash; a variation of 20% or less is reviewed and endorsed by the Procurement Manager prior to final DOA approval; a variation above 20% MUST be submitted to the Procurement Committee.</li>
        <li><strong>Emergency procurement</strong> &mdash; used only where there is an immediate threat to health, safety, operations, or reputation; each request MUST be justified by the requesting Business Unit and approved per the DoA.</li>
        <li><strong>Blanket Agreement</strong> &mdash; established for recurring procurement of goods where exact quantities are uncertain but anticipated over a defined period, at fixed pricing.</li>
        <li><strong>Framework Agreement</strong> &mdash; used for recurring procurement of services with uncertain quantities or timing; it MUST define the contract period, scope, and pricing.</li>
        <li><strong>Special procurement</strong> &mdash; for Marketing Events, Brand Campaigns, and CSR Sponsorships, a tailored approach evaluates proposals on creativity, strategic alignment, execution capability, and value for money. A minimum of three proposals shall be solicited, except for CSR sponsorships, and all such procurements MUST have pre-approved budgets.</li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="contracts"
      num="07"
      color="var(--at-teal)"
      eyebrow="Contract management"
      title="Managing contracts through their lifecycle"
      lede="Contract Management is the responsibility of the End-User Department, ensuring contracted goods and services are delivered per specification and terms, that risks are managed, and that effective communication is maintained between stakeholders."
      tone="cream"
    >
      <h3>Variation and renewal</h3>
      <EdBullets>
        <li>Any modification to the scope, value, or terms of a contract is a variation, initiated by the End-User. A variation of 20% or less is endorsed by the Procurement Manager; a variation above 20% MUST be submitted to the Procurement Committee, both prior to final DOA approval.</li>
        <li>Renewals or extensions shall not be automatic and MUST be planned; End-Users submit a formal renewal request for Procurement Committee approval before any renewal process begins.</li>
      </EdBullets>

      <h3>Disputes and termination</h3>
      <EdBullets>
        <li><strong>Minor disputes</strong> &mdash; slight scope deviations, timeline delays, or minor performance issues, resolved by the Procurement Department with the supplier and End-User to avoid escalation.</li>
        <li><strong>Major disputes</strong> &mdash; unethical or fraudulent practices, significant scope or timeline deviations, or severe performance failures, managed by the Procurement Department with the Legal Department.</li>
        <li><strong>Resolution options</strong> &mdash; invoice deductions or retentions, forfeiture of performance guarantees, liquidated damages (major, where permitted), claims against insurance or guarantees, contract termination, and legal action.</li>
        <li><strong>Termination</strong> &mdash; supported by documented justification, coordinated with the Legal Department, approved by the Procurement Committee, and finalized per the DOA based on contract value.</li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="vendors"
      num="08"
      color="var(--at-gold)"
      eyebrow="Vendor management"
      title="Registering, evaluating, and classifying vendors"
      lede="Nebras maintains a robust Vendor Management framework to ensure the engagement of capable, reliable, and qualified vendors, managed with transparency, accountability, and a focus on long-term partnership development."
      tone="surface"
    >
      <h3>Registration and performance</h3>
      <EdBullets>
        <li>All vendors MUST register through Nebras&rsquo;s Vendor Registration Portal or Digital Procurement System; Procurement reviews company formation documents while Finance validates banking information.</li>
        <li>Nebras maintains a centralized vendor master file; vendor status is actively monitored and may be deactivated for expired licenses or prolonged inactivity.</li>
        <li>End-Users evaluate performance at Goods Receipt or Service Entry; the Procurement Department conducts quarterly reviews and initiates improvement plans where necessary.</li>
        <li>Suspension or blacklisting may apply for contract breaches, safety violations, unethical conduct, or repeated performance failures; reactivation requires formal approval and reassessment.</li>
      </EdBullets>

      <h3>Vendor classifications</h3>
      <EdBullets>
        <li><strong>Level 1 &mdash; Strategic</strong> &mdash; key partners and Critical Service Providers (CSPs) providing high-value, high-risk services or products critical to operations.</li>
        <li><strong>Level 2 &mdash; Operational</strong> &mdash; suppliers supporting core operations with medium-value, moderate-risk offerings where alternatives exist and disruption has limited impact.</li>
        <li><strong>Level 3 &mdash; Transactional</strong> &mdash; suppliers of low-value, low-risk goods or services that are easily replaceable.</li>
      </EdBullets>

      <EdNote>
        <p>For onboarding strategic vendors and CSPs delivering high-risk, high-value goods or services, Third Party Risk Management (TPRM) applies: Information Security, IT, Finance, Risk, and Operations each provide risk mitigation questionnaires as part of prequalification, and the Procurement Committee ensures all CSPs are thoroughly assessed and endorsed by the respective departments.</p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="records"
      num="09"
      color="var(--at-blue)"
      eyebrow="Records &amp; maintenance"
      title="Archiving, master data, and policy upkeep"
      tone="cream"
      narrow
    >
      <h3>Archiving and retention</h3>
      <EdBullets>
        <li>Procurement documents &mdash; contracts, purchase orders, tenders, and requisitions &mdash; shall be centrally archived with appropriate access controls.</li>
        <li>Critical records shall be retained for a minimum of <strong>seven years</strong>, and other documents for at least <strong>three years</strong>, after which they are securely disposed of per applicable regulations.</li>
      </EdBullets>

      <h3>Master data and receipt</h3>
      <EdBullets>
        <li>Requests to create, modify, or extend material or service master records MUST be submitted to the Procurement Department with complete and accurate End-User details; asset codes remain the responsibility of the Finance Department.</li>
        <li>End-Users MUST generate Goods Receipt Notes (GRNs) and Service Entry Sheets (SESs) in the Digital Procurement System promptly upon receipt, verifying deliveries and completing supplier performance evaluations to ensure timely vendor payments.</li>
      </EdBullets>

      <h3>Policy maintenance</h3>
      <EdBullets>
        <li>The Procurement Department is responsible for maintaining and updating this policy.</li>
        <li>Revisions are invalid unless authorized and formally approved per the authorities delegated by the Nebras Board of Managers, then communicated to all relevant departments.</li>
      </EdBullets>
    </EdSectionBand>

    <EdRelatedCards eyebrow="Read alongside" title="Related policies">
      <EdRelatedCard
        href="/internal/policies/outsourcing"
        category="Governance & Oversight"
        title="Outsourcing Policy"
        desc="How outsourcing arrangements are governed once a provider has been sourced and selected through procurement."
      />
      <EdRelatedCard
        href="/internal/policies/enterprise-risk-management"
        category="Risk, Security & Compliance"
        title="Enterprise Risk Management Policy"
        desc="The risk framework under which vendor, CSP, and third-party risks are assessed and managed."
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

.thresholds {
  margin: 1.6rem 0 0.4rem;
  max-width: 52rem;
  overflow-x: auto;
}
.thresholds table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}
.thresholds th,
.thresholds td {
  text-align: left;
  padding: 0.55rem 0.8rem;
  border-bottom: 1px solid var(--at-grid-line);
  vertical-align: top;
}
.thresholds thead th {
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--at-mute-2);
  font-weight: 700;
  border-bottom: 2px solid var(--at-grid-line);
}
.thresholds td:first-child {
  font-family: var(--at-mono);
  font-size: 0.82rem;
  color: var(--at-navy-deep);
  white-space: nowrap;
}
</style>
