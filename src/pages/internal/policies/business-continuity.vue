<route lang="yaml">
meta:
  layout: internal
  title: Business Continuity & Disaster Recovery Policy
  next: false
  prev: false
  aside: false
</route>

<script setup lang="ts">
import { useHead } from '@unhead/vue'

useHead({ title: 'Business Continuity & Disaster Recovery Policy · Internal Policies' })

interface Section { id: string; label: string }
interface MetaItem { label: string; value: string }
interface KeyNum { value: string; unit?: string; label: string }

const sections: Section[] = [
  { id: 'context',        label: 'Context & role' },
  { id: 'scope',          label: 'Scope & dependencies' },
  { id: 'infrastructure', label: 'Infrastructure DR' },
  { id: 'operational',    label: 'Operational support' },
  { id: 'metrics',        label: 'Policy & recovery metrics' },
  { id: 'testing',        label: 'Testing & maintenance' },
  { id: 'crisis',         label: 'Crisis management' },
  { id: 'communication',  label: 'Communication plan' },
  { id: 'glossary',       label: 'Glossary' },
]

const meta: MetaItem[] = [
  { label: 'Applies to', value: 'Nebras' },
  { label: 'Classification', value: 'Restricted' },
  { label: 'Version', value: '1.0 · Sep 2024' },
]

const keyNums: KeyNum[] = [
  { value: '1', unit: 'hr', label: 'Recovery Time Objective (Tier 1 systems)' },
  { value: '1', unit: 'hr', label: 'Recovery Point Objective (Tier 1 systems)' },
  { value: '<30', unit: 'min', label: 'CBUAE notification of a Level 1 incident' },
]
</script>

<template>
  <div class="ed-page">
    <EdBackStrip href="/internal/policies/" text="All policies" />

    <EdHero
      eyebrow="Internal · Restricted"
      eyebrow-color="var(--at-blue)"
      title="Business Continuity & Disaster Recovery Policy"
      :meta="meta"
      lede="Nebras Open Finance is the central operational entity for the UAE Open Finance Framework and the <strong>single point of governance</strong> for the CBUAE Open Finance program. This policy establishes the Business Continuity Management and Disaster Recovery framework that ensures the timely recovery of critical services so that Nebras&rsquo;s central role never becomes a single point of failure for the ecosystem."
      :key-nums="keyNums"
    />

    <EdInPageNav :sections="sections" />

    <EdSectionBand
      id="context"
      num="01"
      color="var(--at-teal)"
      eyebrow="Introduction & context"
      title="Nebras as the single point of governance"
      lede="Nebras Open Finance is an essential component of the CBUAE&rsquo;s Financial Infrastructure Transformation (FIT) Program and acts as the central operational entity for the UAE Open Finance Framework &mdash; encompassing critical functions that ensure the framework&rsquo;s security, stability, and regulatory compliance."
      tone="cream"
    >
      <h3>Purpose of this document</h3>
      <EdBullets>
        <li><strong>Policy statement</strong> &mdash; formally establishes the Business Continuity Management (BCM) and Disaster Recovery (DR) policies, mandating a structured, proactive, and tested approach to operational risk and the rapid resumption of critical services following any disruption, regardless of cause (technical failure, cyber-attack, or physical disaster).</li>
        <li><strong>Regulatory compliance</strong> &mdash; defines Nebras&rsquo;s compliance with the CBUAE Open Finance Regulation (OFR) and Operational Risk Standards (Article 7), including documented BCP/DR plans, Business Impact Analysis (BIA), and defined Recovery Time Objectives (RTOs) and Recovery Point Objectives (RPOs).</li>
        <li><strong>Strategic resilience plan</strong> &mdash; provides the actionable BCP and DRP, with defined procedures, activation criteria, and system-specific redundancy, failover, and recovery strategies for core platforms.</li>
      </EdBullets>

      <h3>Core functions managed by Nebras</h3>
      <EdBullets>
        <li><strong>Operator of the Central API Hub (Ozone)</strong> &mdash; the centralized platform providing the single, standardised gateway for all Open Finance communication between LFIs and TPPs. Failure of the API Hub directly halts all data sharing and payment initiation services across the entire UAE Open Finance network.</li>
        <li><strong>Administrator of the Trust Framework (Raidiam)</strong> &mdash; governs the ecosystem&rsquo;s identity and security layer, managing the Participant Directory, issuance and revocation of digital certificates (PKI), and enforcement of security profiles and authentication standards (e.g. mTLS). Failure compromises the fundamental security and trust model.</li>
        <li><strong>Oversight of common infrastructural services</strong> &mdash; consent management (AlTareq), plus service assurance, reporting, and dispute resolution through tools such as Jira and PowerBI.</li>
      </EdBullets>

      <EdNote>
        A disruption to Nebras&rsquo;s services constitutes a systemic operational risk to the UAE&rsquo;s financial sector. The BCP/DR Plan therefore treats all Nebras-managed components as <strong>Tier 1 Critical Systems</strong>, requiring the most stringent RTOs and RPOs to safeguard the continuity of the national Open Finance platform.
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="scope"
      num="02"
      color="var(--at-gold)"
      eyebrow="Scope of the plan"
      title="Critical assets and dependencies"
      lede="The scope is defined by a comprehensive Business Impact Analysis (BIA), encompassing all systems, processes, and resources that, if disrupted, would critically impair Nebras&rsquo;s function as the Open Finance ecosystem manager. It is divided into three core areas."
      tone="surface"
    >
      <h3>Core Open Finance infrastructure (technology scope)</h3>
      <p>Mission-critical systems responsible for data flow, security, and connectivity. Disruption constitutes a Level 1 Critical Incident.</p>
      <EdBullets>
        <li><strong>Ozone API Hub environment</strong> &mdash; API gateway and traffic management (routing, throttling, and security policy enforcement); the consent management system (creation, storage, enforcement, and revocation of consumer consent records); and the API Hub databases (configurations, auditing logs, and performance metrics).</li>
        <li><strong>Raidiam Trust Framework environment</strong> &mdash; the Trust Registry / Participant Directory of licensed and certified LFIs and TPPs; the Public Key Infrastructure (PKI) components issuing, managing, and revoking transport, signing, and encryption certificates for secure mTLS communication; and the onboarding and certification platforms.</li>
      </EdBullets>

      <h3>Operational support processes (business process scope)</h3>
      <EdBullets>
        <li><strong>Service desk and incident management (via Jira)</strong> &mdash; major incident triage, ecosystem query management, and Knowledge Base access.</li>
        <li><strong>Dispute and case management (via Jira Portal)</strong> &mdash; the regulated workflow for logging, tracking, adjudicating, and reporting disputes, maintaining an immutable audit trail.</li>
        <li><strong>Reporting and analytics (via PowerBI)</strong> &mdash; critical regulatory reporting to the CBUAE and internal operational metrics for real-time risk monitoring.</li>
      </EdBullets>

      <h3>Personnel, facilities, and vendor management (resource &amp; third-party scope)</h3>
      <EdBullets>
        <li><strong>Key personnel</strong> &mdash; the Crisis Management Team (CMT), Technical Recovery Teams (TRTs), and Critical Business Function owners, with up-to-date contact information.</li>
        <li><strong>Alternative facilities</strong> &mdash; command and control centres (physical and virtual) should the primary Nebras office or data centre become inaccessible.</li>
        <li><strong>Critical third-party vendors</strong> &mdash; documented recovery plans for key providers, including the primary infrastructure providers (Ozone, Raidiam) and hosting providers, enforcing the outsourced BCP/DR requirements stipulated by the CBUAE.</li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="infrastructure"
      num="03"
      color="var(--at-blue)"
      eyebrow="Core infrastructure DR strategy"
      title="Immediate failover and geographical redundancy"
      lede="The strategy for core infrastructure is based on immediate failover and geographical redundancy to maintain continuous service for data sharing and transaction initiation, adhering to stringent CBUAE operational resilience requirements."
      tone="cream"
    >
      <h3>Ozone API Hub management (API gateway &amp; consent)</h3>
      <EdBullets>
        <li><strong>API gateway availability</strong> &mdash; active-active / active-passive architecture across a multi-zone / multi-region cloud deployment, using a Global Traffic Manager (GTM) or equivalent DNS failover to immediately redirect TPP traffic on detection of a primary site failure. <strong>RTO target: &lt;1 Hour</strong> (with seamless failover targeting seconds). <strong>RPO target: 1 Hour</strong>.</li>
        <li><strong>Consent management database</strong> &mdash; synchronous data replication for all consent records with automated database clustering and rapid leader election. Primary system failure triggers automated cutover to the read-replica database within minutes, updating API Hub configurations instantly.</li>
        <li><strong>API metrics &amp; auditing logs</strong> &mdash; stream processing or asynchronous replication to a separate, resilient data lake; recovery time is less critical, but the integrity and completeness of historical data are essential for post-incident analysis and regulatory reporting.</li>
      </EdBullets>

      <h3>Raidiam Trust Framework oversight (identity &amp; security)</h3>
      <EdBullets>
        <li><strong>Mirrored infrastructure</strong> &mdash; a fully functional, hot-standby copy of the Trust Framework, including the Certificate Authority (CA) and Directory, maintained in an alternate region. <strong>RTO target: &lt;1 Hour</strong>. <strong>RPO target: 1 Hour</strong>.</li>
        <li><strong>PKI resilience</strong> &mdash; private keys for the CA root and intermediate certificates stored in geographically separated, highly secured Hardware Security Modules (HSMs), with robust key recovery and backup procedures.</li>
        <li><strong>Manual fallback kit</strong> &mdash; a documented, pre-approved manual process and toolkit (offline certificate request forms, secure vault for manual credentials) to handle critical TPP or LFI onboarding and renewal tasks during an extended outage. The manual process is initiated only after a Level 1 Incident is declared and automated recovery has failed.</li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="operational"
      num="04"
      color="var(--at-blue-deep)"
      eyebrow="Operational support systems"
      title="Continuity for the service desk and reporting"
      lede="Continuity strategies for the operational tools that support communication, compliance, and resolution within the Nebras ecosystem."
      tone="surface"
    >
      <h3>Service Desk (Jira Service Management)</h3>
      <EdBullets>
        <li><strong>Incident logging (major incidents)</strong> &mdash; a dedicated Emergency Communications Channel (secure email, dedicated incident platform) bypasses the primary service desk tool. <strong>RTO: immediate fallback (within 30 minutes)</strong>; all Severity 1/2 incidents logged on the alternate system with timestamps and communicated immediately to the CBUAE and impacted parties. <strong>RPO: 1 Hour</strong>.</li>
        <li><strong>Dispute management</strong> &mdash; a regulated workflow backup using standardized physical/digital forms to capture all mandated dispute information. <strong>RPO: 1 Hour</strong>; on recovery, the Data Migration Team imports manual logs to restore the official regulatory audit trail.</li>
        <li><strong>Change management</strong> &mdash; an emergency change protocol with a restricted Outage Change Approval Board (CAB) and minimal quorum for Emergency Changes only. <strong>RTO: 30 Mins for approval</strong>; normal changes are halted and emergency changes logged manually.</li>
        <li><strong>Billing and settlement</strong> &mdash; scheduled offsite backups (e.g. daily) of the invoicing and fee-calculation database, accessed independently of the primary environment. <strong>RPO: max 48 Hours</strong>; billing cycles may be delayed but must not be cancelled, with a manual calculation spreadsheet prepared to bridge the outage.</li>
        <li><strong>Knowledge Base</strong> &mdash; a static, read-only copy of all critical documentation (API specifications, BCP contacts, operational guidelines) on a resilient web server separate from the corporate environment. <strong>RTO: 4 Hours</strong>.</li>
      </EdBullets>

      <h3>Reporting and Analytics (PowerBI)</h3>
      <EdBullets>
        <li><strong>Critical regulatory reports</strong> &mdash; all data sources (Ozone logs, Jira data) maintain direct, secure SQL access points for a small number of authorised Power BI analysts. <strong>RTO: 24 Hours</strong>; analysts use pre-written, tested SQL scripts to generate the core required metrics (API uptime, incident volume) directly from the replicated operational databases, bypassing the PowerBI service if necessary.</li>
        <li><strong>Data integrity</strong> &mdash; data integrity of the Ozone and Trust Framework logging tables is critical, and their RPO takes precedence over PowerBI dashboard availability. Recovery of the source databases is the top priority before restoring reporting services.</li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="metrics"
      num="05"
      color="var(--at-navy)"
      eyebrow="Policy statement & recovery metrics"
      title="RTO and RPO commitments"
      lede="Nebras Open Finance is committed to maintaining continuous operations and providing essential services to the CBUAE Open Finance ecosystem. This BCP/DR Policy ensures the timely and orderly recovery of critical technology and business functions within defined RTOs and RPOs, minimizing impact on ecosystem participants and maintaining compliance with CBUAE regulations."
      tone="cream"
    >
      <h3>Key recovery metrics (RTO / RPO)</h3>
      <div class="rto-table-wrap">
        <table class="rto-table">
          <thead>
            <tr>
              <th>Business function</th>
              <th>RTO (time to recover)</th>
              <th>RPO (max data loss)</th>
              <th>Justification</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Ozone API Hub access</td>
              <td>1 Hour</td>
              <td>1 Hour</td>
              <td>Direct impact on financial transaction flow and data sharing for the entire ecosystem. Systemic risk.</td>
            </tr>
            <tr>
              <td>Raidiam Trust Registry / PKI</td>
              <td>1 Hour</td>
              <td>1 Hour</td>
              <td>Absolute requirement for security validation (digital certificates, TPP credentials). Integrity is non-negotiable.</td>
            </tr>
            <tr>
              <td>Major incident tracking</td>
              <td>1 Hour</td>
              <td>1 Hour</td>
              <td>Rapid notification and tracking are regulatory mandates.</td>
            </tr>
            <tr>
              <td>Dispute management (logging)</td>
              <td>&lt;2 Hours</td>
              <td>2 Hour</td>
              <td>Requires preserving the legal audit trail of all consumer/participant disputes.</td>
            </tr>
            <tr>
              <td>Non-critical internal systems</td>
              <td>24&ndash;48 Hours</td>
              <td>Up to 24 Hours</td>
              <td>Internal administrative systems with no direct real-time external dependency.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <EdNote>
        As backup occurs every hour, the RPO for Tier 1 systems is a maximum of one hour, while the RTO target for the Ozone API Hub and Raidiam Trust Framework is under one hour with failover targeting seconds.
      </EdNote>

      <h3>Business Impact Analysis (BIA) and risk assessment</h3>
      <EdProse>
        <p>The BIA identifies and prioritises critical services based on the impact of non-availability over a predefined time frame. Beyond internal impact-based prioritisation, critical services are classified against national criticality considerations &mdash; financial system stability, national economic continuity, public confidence and customer protection, and interdependencies with financial sector participants and national critical infrastructure.</p>
        <p>Services with a systemic or sector-wide impact are designated <strong>Nationally Critical Services</strong> and are subject to enhanced recovery prioritisation, stricter recovery objectives, and more frequent testing, in alignment with the CBUAE and national resilience frameworks guided by the National Emergency Crisis and Disaster Management Authority (NCEMA). The determination of Maximum Tolerable Period of Disruption (MTPD), RTO, and RPO is based on impact thresholds derived from the Impact Rating Matrix and the national criticality classification, and values are reviewed and approved by the relevant Department Head and the CEO.</p>
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="testing"
      num="06"
      color="var(--at-teal-deep)"
      eyebrow="Testing & maintenance"
      title="Keeping the plan viable"
      lede="A structured programme of review, testing, and training ensures the BCP/DR Plan remains effective and up to date."
      tone="surface"
    >
      <EdBullets>
        <li><strong>Policy / plan review</strong> &mdash; conducted annually, reviewed and approved by the Nebras Board and submitted to the CBUAE&rsquo;s supervisory function for oversight.</li>
        <li><strong>Full BCP/DR test (scenario-based)</strong> &mdash; at least annually, including a simulated primary site failover for the Ozone API Hub and Raidiam Trust Framework, testing the full cycle from incident declaration to manual fallback (Jira/dispute) and system recovery.</li>
        <li><strong>Component / failover testing</strong> &mdash; quarterly; technical teams test the automated failover mechanisms (GTM/DNS, database replication) for key systems.</li>
        <li><strong>Staff training</strong> &mdash; bi-annually; mandatory training for the CMT and all relevant operational staff on activation protocols and manual procedures.</li>
      </EdBullets>

      <EdProse>
        <p>In addition to standard BCM exercises, Nebras conducts scenario-based integrated testing incorporating both Business Continuity and Cyber Incident Response capabilities. These exercises simulate realistic and evolving threat scenarios &mdash; including ransomware attacks, data breaches, system outages, and critical third-party service disruptions &mdash; and are conducted at least annually across cross-functional departments. Assurance over third-party and vendor BCM capabilities may include joint exercises, independent attestations, or periodic reviews. Outcomes are formally documented, with identified gaps tracked through to remediation. These scenario-based integrated exercises are mandatory and form a core component of the organization&rsquo;s cyber resilience and national-level risk preparedness.</p>
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="crisis"
      num="07"
      color="var(--at-teal)"
      eyebrow="Crisis management & governance"
      title="Activation, command, and recovery teams"
      lede="The command and control framework for declaring, escalating, managing, and resolving a crisis impacting the Nebras Open Finance infrastructure."
      tone="cream"
    >
      <h3>Activation criteria (triggers)</h3>
      <p>The BCP/DR Plan is formally activated by the CMT Lead upon confirmation of any event meeting the following criteria.</p>
      <EdBullets>
        <li><strong>Level 1 Incident</strong> &mdash; any disruption causing or projected to cause outage or degradation of the Ozone API Hub or Raidiam Trust Framework exceeding the target RTO (1 hour), or where initial failover procedures have failed.</li>
        <li><strong>Systemic security breach</strong> &mdash; confirmation of a successful cyber-attack, data breach, or compromise of any critical Open Finance component (API Hub, Trust Registry, or consent data).</li>
        <li><strong>Physical unavailability</strong> &mdash; primary facility or data centre inaccessible due to an external event (fire, flood, civil disruption).</li>
        <li><strong>CBUAE mandate</strong> &mdash; direct instruction from the Central Bank of the UAE to activate contingency measures.</li>
      </EdBullets>

      <h3>Crisis Management Team (CMT) structure</h3>
      <EdStages>
        <EdStage num="01" title="CMT Lead (CEO / COO)" num-color="var(--at-teal)">
          <p>Overall strategy and CBUAE relationship. Declares and de-declares the incident, authorises emergency funding and external resources, and manages strategic communications with the CBUAE and the Nebras Board.</p>
        </EdStage>
        <EdStage num="02" title="Incident Manager (Head of Operations / CTO)" num-color="var(--at-teal)">
          <p>Operational execution and recovery. Manages the incident lifecycle, chairs status calls, coordinates the Technical Recovery Teams, and reports to the CMT Lead.</p>
        </EdStage>
        <EdStage num="03" title="Communication Lead (Head of PR / Compliance)" num-color="var(--at-teal)">
          <p>Stakeholder messaging and integrity. Drafts, gains approval for, and issues all internal and external communication bulletins, ensuring regulatory notification is timely and compliant.</p>
        </EdStage>
        <EdStage num="04" title="Technical Recovery Lead (Head of IT / Infra)" num-color="var(--at-teal)">
          <p>Infrastructure remediation. Directs all technical recovery efforts (failover, system restoral, patch management) for the Ozone API Hub and Trust Framework.</p>
        </EdStage>
        <EdStage num="05" title="Compliance &amp; Risk Lead (CRO / Legal Counsel)" num-color="var(--at-teal)">
          <p>Legal and regulatory compliance. Ensures all recovery actions adhere to CBUAE regulations and manages the evidence trail, data privacy requirements, and dispute resolution continuity.</p>
        </EdStage>
      </EdStages>

      <h3>Technical Recovery Team (TRT) structure</h3>
      <p>The TRT executes the DR strategy and reports directly to the Incident Manager.</p>
      <EdBullets>
        <li><strong>TRT 1 &mdash; API &amp; Application Team</strong> &mdash; the Ozone API Hub, application-level data integrity, consent manager, and service restoration.</li>
        <li><strong>TRT 2 &mdash; Infrastructure &amp; Security Team</strong> &mdash; the Raidiam Trust Framework, PKI / certificate validation, cloud and hosting infrastructure, and network connectivity.</li>
        <li><strong>TRT 3 &mdash; Data &amp; Reporting Team</strong> &mdash; restoring database integrity, recovering audit logs, and preparing regulatory reports (RTO/RPO validation).</li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="communication"
      num="08"
      color="var(--at-gold)"
      eyebrow="Crisis communication plan"
      title="Notification protocols"
      lede="Given Nebras&rsquo;s central role, the communication plan is its most critical external-facing BCP component, designed to maintain market confidence and regulatory transparency. Nebras adheres to a zero-tolerance policy for delays in notifying the CBUAE of a Level 1 Critical Incident."
      tone="surface"
    >
      <h3>Regulatory notification protocol</h3>
      <EdBullets>
        <li><strong>Central Bank of the UAE (CBUAE)</strong> &mdash; immediate upon incident declaration, via dedicated secure line (primary) followed by secure email for formal documentation. <strong>RTO for initial notification: &lt;30 Minutes</strong>.</li>
        <li><strong>Nebras Board</strong> &mdash; immediate upon Level 1 declaration, via phone call and secure email from the CMT Lead. <strong>RTO for initial notification: &lt;60 Minutes</strong>.</li>
      </EdBullets>

      <h3>External communication (ecosystem participants)</h3>
      <p>Communication to LFIs and TPPs must be fact-based and provide actionable advice.</p>
      <EdBullets>
        <li><strong>LFIs (banks / insurers)</strong> &mdash; nature of the incident, estimated restoration time, confirmed impact on services (data sharing / payments), and specific manual workarounds. Delivered via the dedicated TPP/LFI Status Portal (primary) and automated alert email/SMS, every 30&ndash;60 minutes until stable, then hourly.</li>
        <li><strong>TPPs</strong> &mdash; as for LFIs, focusing on API Hub status and any changes to the Trust Framework environment (e.g. certificate validation issues), on the same channels and cadence.</li>
        <li><strong>Public / media</strong> &mdash; confirmation of an operational issue, commitment to recovery, reassurance that consent data is safe, and reference to the official status page, via the official Nebras website and designated media spokesperson, only when the incident escalates or public speculation requires a response.</li>
      </EdBullets>

      <h3>Internal communication</h3>
      <EdBullets>
        <li><strong>Staff safety</strong> &mdash; immediate notification of any physical threat (evacuation procedures).</li>
        <li><strong>All-staff updates</strong> &mdash; regular concise updates from the CMT confirming service status and providing guidance on handling external queries, under a &ldquo;single source of truth&rdquo; principle.</li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="glossary"
      num="09"
      color="var(--at-blue)"
      eyebrow="Glossary"
      title="Key terms"
      tone="cream"
      narrow
    >
      <EdBullets>
        <li><strong>BCP</strong> &mdash; Business Continuity Plan; the overall documented framework for maintaining critical business functions following a disruption.</li>
        <li><strong>DR</strong> &mdash; Disaster Recovery; the subset of BCP focused on restoring the technology infrastructure (IT systems, applications, data, and connectivity) after a disruption.</li>
        <li><strong>CMT</strong> &mdash; Crisis Management Team; the senior leadership group responsible for declaring the crisis, providing strategic direction, and overseeing response and communication.</li>
        <li><strong>TRT</strong> &mdash; Technical Recovery Team; the operational staff and technical experts responsible for executing the DR procedures and technical restoration of systems.</li>
        <li><strong>RTO</strong> &mdash; Recovery Time Objective; the maximum acceptable duration within which a critical business function or system must be restored after a disruption.</li>
        <li><strong>RPO</strong> &mdash; Recovery Point Objective; the maximum acceptable age of data lost during a disruption.</li>
        <li><strong>Ozone API Hub</strong> &mdash; the central API gateway and technical platform managed by Nebras that facilitates all API calls, consent management, and data flow between LFIs and TPPs.</li>
        <li><strong>Raidiam Trust Framework</strong> &mdash; the underlying security and identity component (Trust Registry, PKI, certificate validation) that authenticates and authorizes all participants and transactions.</li>
        <li><strong>Service degradation</strong> &mdash; a state where a critical system is operational but performing below its expected service level (e.g. high latency, partial failure, or reduced throughput).</li>
        <li><strong>LFI / TPP</strong> &mdash; Licensed Financial Institutions (Data Holders) and Third-Party Providers (Data Users) participating in the Open Finance ecosystem via Nebras&rsquo;s infrastructure.</li>
      </EdBullets>
    </EdSectionBand>

    <EdRelatedCards eyebrow="Read alongside" title="Related policies">
      <EdRelatedCard
        href="/internal/policies/enterprise-risk-management"
        category="Risk, Security & Compliance"
        title="Enterprise Risk Management Policy"
        desc="The risk framework under which systemic operational and continuity risks are assessed and escalated."
      />
      <EdRelatedCard
        href="/internal/policies/information-security"
        category="Risk, Security & Compliance"
        title="Information Security Policy"
        desc="The security controls protecting the API Hub, Trust Framework, and consent data referenced throughout this plan."
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

.rto-table-wrap {
  overflow-x: auto;
  margin: 1rem 0 1.5rem;
}

.rto-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.92rem;
}

.rto-table th,
.rto-table td {
  text-align: left;
  padding: 0.6rem 0.8rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  vertical-align: top;
}

.rto-table thead th {
  font-weight: 600;
  color: var(--at-navy);
  border-bottom: 2px solid rgba(0, 0, 0, 0.2);
  white-space: nowrap;
}
</style>
