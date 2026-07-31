<route lang="yaml">
meta:
  layout: internal
  title: Information Security Policy
  next: false
  prev: false
  aside: false
</route>

<script setup lang="ts">
import { useHead } from '@unhead/vue'

useHead({ title: 'Information Security Policy · Internal Policies' })

interface Section { id: string; label: string }
interface MetaItem { label: string; value: string }
interface KeyNum { value: string; unit?: string; label: string }

const sections: Section[] = [
  { id: 'governance',      label: 'Governance & roles' },
  { id: 'strategy',        label: 'Strategy & standards' },
  { id: 'acceptable-use',  label: 'Acceptable use' },
  { id: 'email-internet',  label: 'Email & internet' },
  { id: 'access',          label: 'Access & passwords' },
  { id: 'project',         label: 'Secure delivery' },
  { id: 'classification',  label: 'Classification & handling' },
  { id: 'data-protection', label: 'Data protection' },
  { id: 'third-party',     label: 'Third-party security' },
  { id: 'risk-incident',   label: 'Risk, incident & awareness' },
]

const meta: MetaItem[] = [
  { label: 'Applies to', value: 'Nebras' },
  { label: 'Classification', value: 'Restricted' },
  { label: 'Version', value: 'Jun 2024' },
]

const keyNums: KeyNum[] = [
  { value: '72', unit: 'h', label: 'Regulatory breach notification window' },
  { value: '2', unit: '× / yr', label: 'Minimum Trust Framework PKI key rotation' },
  { value: '12', unit: 'char', label: 'Minimum domain password length' },
]
</script>

<template>
  <div class="ed-page">
    <EdBackStrip href="/internal/policies/" text="All policies" />

    <EdHero
      eyebrow="Internal · Restricted"
      eyebrow-color="var(--at-blue)"
      title="Information Security Policy"
      :meta="meta"
      lede="Nebras is committed to protecting the <strong>confidentiality, integrity, and availability</strong> of the information and system assets that underpin the UAE Open Finance common infrastructure. This policy sets the mandatory framework of principles, standards, and controls that governs information security across all Nebras functions, staff, contractors, vendors, and third parties."
      :key-nums="keyNums"
    />

    <EdInPageNav :sections="sections" />

    <EdSectionBand
      id="governance"
      num="01"
      color="var(--at-teal)"
      eyebrow="Governance & roles"
      title="Purpose, scope, and accountability"
      lede="The policy establishes Nebras&rsquo;s approach to protecting information and system assets &mdash; whether stored in software, hardware, transmitted over networks, or held in physical form &mdash; and communicates the organisation&rsquo;s commitment to safeguarding sensitive data across all of its operations."
      tone="cream"
    >
      <h3>Scope and audience</h3>
      <EdBullets>
        <li>Covers the entire IT environment owned or operated by Nebras &mdash; documentation, personnel, hardware (servers, virtual workloads, cloud, endpoints, network and wireless devices), software, and information &mdash; including assets operated by an outsourced provider on Nebras&rsquo;s behalf.</li>
        <li>Applies to all users of information assets: permanent and temporary staff, interns, consultants, contractors, vendors, business partners, and authorised third parties, regardless of geography.</li>
        <li>All users MUST read, understand, and comply; where anything is unclear they SHOULD consult the Operations and Risk Head or an authorised delegate.</li>
      </EdBullets>

      <h3>Objectives</h3>
      <EdBullets>
        <li>Identify all information assets and manage their risks per the Nebras Risk Appetite and Tolerance Policy.</li>
        <li>Protect operating systems, networks and communication protocols, and custom or off-the-shelf applications with appropriate solutions.</li>
        <li>Maintain backup, vulnerability, and patch-management processes for all critical information and known vulnerabilities.</li>
        <li>Achieve compliance through periodic audits, technical assessments, and business continuity tests, with periodic review of user privilege and activity.</li>
        <li>Identify, contain, eradicate, recover from, and report information security incidents through the incident management process.</li>
        <li>Dispose of assets per the Information Classification, Handling, Labelling and Exchange Standard, and deliver security training on joining and annually.</li>
        <li>Rotate PKI keys within the Trust Framework at least twice a year.</li>
      </EdBullets>

      <h3>Roles and responsibilities</h3>
      <EdBullets>
        <li><strong>Board of Managers</strong> &mdash; accepts overall accountability for information security and oversees a properly managed and implemented security programme and its risk reporting.</li>
        <li><strong>Chief Executive Officer</strong> &mdash; endorses overall responsibility, enforces organisation-wide implementation, and oversees compliance and accountability.</li>
        <li><strong>Risk and Compliance Committee</strong> &mdash; supervises implementation, conducts periodic reviews of regulations, risk assessments, audit and incident reports, approves policies, and promotes security culture.</li>
        <li><strong>Operations Head</strong> &mdash; ensures staff understand their responsibilities, determines asset criticality and business risk, oversees reporting to the CEO and Committee, and endorses policies. The (outsourced) Information Security Head is accountable to this role.</li>
        <li><strong>Information Security Head</strong> &mdash; plans, implements, and maintains the security management system; runs risk assessments aligned to Enterprise Risk Management; selects and implements controls; conducts validations and security testing; and delivers the awareness programme.</li>
        <li><strong>Employees</strong> &mdash; participate in awareness training, apply best practice, and report incidents, breaches, or suspicious activity.</li>
      </EdBullets>

      <h3>Compliance, exceptions, and review</h3>
      <EdBullets>
        <li>Violations are brought to the Operations Head; corrective and disciplinary action follows the severity of the incident, consistent with the HR Policy, and may involve external authorities for criminal offences.</li>
        <li>All exceptions MUST be explicitly approved by the Risk and Compliance Committee, are valid for a defined period, and are reassessed and re-approved when necessary.</li>
        <li>The policy is reviewed and amended at least annually &mdash; or earlier on major system change or regulatory direction &mdash; considering risk-assessment results, management review, and organisational change. The Information Security Head reports quarterly to the Committee, CEO, and Board.</li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="strategy"
      num="02"
      color="var(--at-gold)"
      eyebrow="Strategy & standards"
      title="Strategic pillars and the standards framework"
      lede="The strategy develops the people, process, and technology needed to achieve the security principles of confidentiality, integrity, availability, and non-repudiation, adopting concepts such as least privilege and segregation of duties."
      tone="surface"
    >
      <h3>Strategic pillars</h3>
      <EdBullets>
        <li><strong>People</strong> &mdash; understand the business and the threat landscape to inform holistic risk assessment.</li>
        <li><strong>Process</strong> &mdash; enforce least privilege across all access.</li>
        <li><strong>Technology</strong> &mdash; enforce segregation of duties, keeping residual risk at minimal, accepted levels.</li>
      </EdBullets>

      <h3>Supporting policies and standards</h3>
      <p>The following are established under this policy, drafted by the Information Security Head, reviewed by the Operations Head, endorsed by the Risk and Compliance Committee, and approved by the CEO:</p>
      <EdBullets>
        <li>Acceptable Usage; Email Security; Internet Security; Password Management; Information Security Project Management; and Information Classification, Handling and Labelling standards (developed).</li>
        <li>Asset Management &amp; Classification; Access Control; Physical Security; Cryptography Management; Third Party, Vendor Management &amp; Outsourcing; Configuration Management; Data Privacy; and Device &amp; Remote Access standards, plus the Risk Acceptance Form and Legal Compliance Policy.</li>
      </EdBullets>
      <p>The following are addressed within contractual agreements with suppliers: API Security, Network Security, Operating Systems Security, Database Security, Application Security, Cloud Security, Data Security, Vulnerability &amp; Patch Management, Incident Management, Data Backup &amp; Recovery, Change Management, and Capacity Management standards.</p>
    </EdSectionBand>

    <EdSectionBand
      id="acceptable-use"
      num="03"
      color="var(--at-blue)"
      eyebrow="Acceptable use"
      title="How Nebras assets may be used"
      lede="All information assets created or stored in any system are the property of Nebras, which reserves the right to audit stored data at any time. Assets are for authorised business use only and MUST comply with applicable laws, regulations, and contractual obligations."
      tone="cream"
    >
      <h3>Computing and mobile devices</h3>
      <EdBullets>
        <li>Personal devices MUST comply with the BYOD standard; unauthorised or unlicensed software MUST NOT be installed; endpoints MUST be locked when unattended.</li>
        <li>Work files MUST be stored on network shared folders, not local drives; lost or stolen devices MUST be reported to the IT Help Desk immediately.</li>
        <li>Data copied to external storage requires IT, Information Security, and Data Owner approval, MUST be encrypted, and remains the user&rsquo;s accountability. Nebras email or information MUST NOT be backed up to non-Nebras media or cloud.</li>
      </EdBullets>

      <h3>Internet and internal portals</h3>
      <EdBullets>
        <li>Internet access is via the Nebras network only, for business purposes, granted by role; connections MUST NOT bypass firewalls or proxy services, and all downloads are scanned at the web proxy and client.</li>
        <li>&ldquo;Restricted&rdquo; and above information MUST NOT be posted, shared, or uploaded to the internet or social media; only authorised personnel may publish approved content.</li>
        <li>Remote workers MUST NOT use public Wi-Fi for secret, confidential, or restricted information; internal portal activity may be monitored.</li>
      </EdBullets>

      <h3>Email and social media</h3>
      <EdBullets>
        <li>Personal and business email MUST be kept separate; auto-forwarding official mail to public accounts is prohibited; recipients MUST be verified before sending sensitive information.</li>
        <li>Restricted and above information sent by email MUST be encrypted, and confidential/restricted attachments password-protected or encrypted; accounts require multi-factor authentication.</li>
        <li>Employees and third parties MUST NOT share Nebras financial data, proprietary or classified information, or issue statements on behalf of Nebras over social media; official accounts have a single custodian and credentials are never shared.</li>
      </EdBullets>

      <h3>Clear desk, clear screen, and user responsibility</h3>
      <EdBullets>
        <li>Desks are cleared when unattended; classified media are locked away; documents of Restricted or above are removed from printers and whiteboards immediately; privacy filters are used on shared floors.</li>
        <li>Endpoints lock automatically after 10 minutes of inactivity; users lock screens when away (Windows Key + L).</li>
        <li>Users MUST NOT bypass controls, share credentials or active sessions, or tamper with audit logs or evidence, and MUST report incidents and weaknesses to the IT Help Desk or Information Security Team.</li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="email-internet"
      num="04"
      color="var(--at-blue-deep)"
      eyebrow="Email & internet security"
      title="Messaging and connectivity controls"
      lede="Email and internet standards define the technical countermeasures &mdash; account lifecycle, content filtering, authentication, and monitoring &mdash; that protect Nebras communications."
      tone="surface"
    >
      <h3>Email account lifecycle</h3>
      <EdBullets>
        <li>Accounts are created only after HR approval (and Department Head approval for third-party or generic IDs); every generic or group account has an assigned owner for accountability.</li>
        <li>Access is revoked immediately on termination; a terminated employee&rsquo;s mailbox may be kept enabled for no more than 30 days with Department Head approval and monitoring; deleted IDs are never re-allotted.</li>
        <li>Official correspondence is treated as Restricted unless otherwise specified; the IT department archives mail per the approved procedure.</li>
      </EdBullets>

      <h3>Email security controls</h3>
      <EdBullets>
        <li>Internet-facing mail servers are firewalled to required secure ports only; web-mail session time-out is set to 5 minutes or less; initial access is allowed only from Nebras offices, with conditional-access rules.</li>
        <li>Gateway content filtering quarantines malicious or sensitive content; executables are blocked on incoming mail; password-protected archives are quarantined; macros are stripped; the server is never an open relay; spoofed inbound mail using Nebras domains is blocked.</li>
        <li>Accounts use a user ID/password within offices and multi-factor authentication elsewhere; attachments are scanned for viruses, key loggers, malware, ransomware, and backdoors.</li>
      </EdBullets>

      <h3>Sender authentication</h3>
      <EdBullets>
        <li><strong>SPF</strong> &mdash; publishes the IP addresses authorised to send on behalf of Nebras domains; web-only domains declare no valid senders. DNSSEC is deployed on all DNS name servers.</li>
        <li><strong>DKIM</strong> &mdash; signs outbound mail with a private key; the public key in DNS lets recipients verify origin and integrity.</li>
        <li><strong>DMARC</strong> &mdash; sets authentication policy (failing messages quarantined) and receives aggregate reports to detect spoofing and misuse.</li>
      </EdBullets>

      <h3>Internet standard and monitoring</h3>
      <EdBullets>
        <li>Internet is used only on Nebras networks or controlled assets, authorised by the Department Head; exception lists are reviewed at least annually; unsecured inbound/outbound terminal-service connections are not permitted.</li>
        <li>Remote access uses strong authentication (two-factor, authenticator apps, tokens, or smart cards) and strong encryption &mdash; no deprecated protocols below TLS 1.2.</li>
        <li>Firewall, proxy, email, DNS, SPF, DKIM, and DMARC logs are consolidated into the centralised SIEM; the Information Security Team reviews internet connections at least every 3 months.</li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="access"
      num="05"
      color="var(--at-navy)"
      eyebrow="Access control & passwords"
      title="Identity, authentication, and password management"
      lede="Password requirements vary by account type; strong authentication, secure storage, vaulting, and authentication logging are mandatory across all systems."
      tone="cream"
    >
      <h3>Password policy by account type</h3>
      <EdBullets>
        <li><strong>Domain</strong> &mdash; history 10, maximum age 45 days, minimum age 1 day, minimum length 12 characters, complexity enabled; lockout after 3 attempts for 30 minutes; guest accounts disabled; privileged accounts avoid default names.</li>
        <li><strong>Service accounts</strong> &mdash; history 10, minimum length 14, complexity enforced, interactive logon disabled; vendor-shared credentials reset before go-live; interactive logon activity monitored and alerted.</li>
        <li><strong>Local administrators</strong> &mdash; minimum length 20, maximum age 1 year; passwords split between Information Security and IT Operations and vaulted under dual access control.</li>
        <li><strong>Applications</strong> &mdash; default passwords changed after install; passwords salted-hashed before transmission; public-facing apps enforce strong policy (length 12, history 5), 2nd-factor authentication, and CAPTCHA against brute force.</li>
        <li><strong>Databases</strong> &mdash; default credentials removed; credentials stored one-way hashed; Windows authentication preferred; where not possible, 3 failed attempts, 45-day lifetime, 30-minute lockout, minimum length 12.</li>
        <li><strong>Network and security devices</strong> &mdash; integrated with domain controller / RADIUS / TACACS; default accounts renamed or disabled; passwords stored encrypted; unused accounts removed.</li>
      </EdBullets>

      <h3>Lifecycle, storage, and vaulting</h3>
      <EdBullets>
        <li>Default passwords are reset on first initialisation before production; temporary passwords are delivered via the IT Service Desk and changed at first login; passwords are stored one-way hashed and salted.</li>
        <li>Passwords are treated as Restricted, never shared, emailed, spoken, or written down, and never stored unencrypted; suspected compromise is reported and all passwords changed.</li>
        <li>Vaulted passwords are held in tamper-evident envelopes in a fireproof safe under dual custody, released only with Information Security Head authorisation, reset after use, and rotated annually between November and December.</li>
      </EdBullets>

      <h3>Authentication logging and access</h3>
      <EdBullets>
        <li>Logs capture event type, timestamp with time zone, user identity, source (IP, device, location), and authentication method; access to logs is restricted with an audit trail.</li>
        <li>Failed authentication returns a generic message that does not reveal which credential was wrong; logs are correlated in the SIEM with real-time monitoring and alerts for repeated failures or anomalies.</li>
        <li>A login banner warns that the system is Nebras&rsquo;s, that usage may be monitored and audited, and that unauthorised use is prohibited.</li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="project"
      num="06"
      color="var(--at-teal-deep)"
      eyebrow="Secure delivery"
      title="Security across the project lifecycle"
      lede="Information Security is embedded at every phase of delivery so that controls, testing, and safeguards are designed in from initiation through closure."
      tone="surface"
    >
      <h3>Lifecycle phases</h3>
      <EdBullets>
        <li><strong>Initiation &amp; requirements</strong> &mdash; run a risk assessment; embed segregation of duties and least privilege; define authentication, authorisation, compliance, and third-party integration requirements.</li>
        <li><strong>Request for proposal</strong> &mdash; define security requirements, issue a security questionnaire, review vendor responses, set evaluation criteria (certifications, audit openness, SLAs, incident response), and verify compliance.</li>
        <li><strong>Contracting</strong> &mdash; finalise security clauses, SLAs, data-protection and breach-notification provisions, audit rights, and change management; onboard vendors with policies, access, and embedded incident-management requirements while data ownership stays with Nebras.</li>
        <li><strong>Execution</strong> &mdash; implement controls (firewalls, IDS/IPS, encryption, WAF, MFA, RBAC); manage risk-prioritised patching; and coordinate penetration testing, vulnerability scanning, and code review on a frozen system state.</li>
        <li><strong>Closure</strong> &mdash; dispose of or retain data securely, decommission systems, revoke accounts, conduct a final security audit, capture lessons learned, and transition ongoing responsibilities.</li>
      </EdBullets>

      <EdNote type="important" title="Production data in non-production">
        <p>All data released from production MUST be masked or scrambled. Where clean production data is required for testing, UAT, or migration, the Data Owner MUST give explicit approval and accept the associated risk, with the Information Security Team advising on protective controls.</p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="classification"
      num="07"
      color="var(--at-teal)"
      eyebrow="Classification & handling"
      title="Information classification, labelling, and handling"
      lede="Every information asset is classified by the impact of its unauthorised disclosure, and each level carries minimum handling controls for access, encryption, storage, transmission, and disposal."
      tone="cream"
    >
      <EdNote type="info" title="Classification levels">
        <p><strong>Public</strong> &mdash; approved for unrestricted release, no harm on disclosure.</p>
        <p><strong>Internal</strong> &mdash; for Nebras personnel only via role-based access; minor impact.</p>
        <p><strong>Confidential</strong> &mdash; sensitive business, personal, or financial data (customer records, PII, HR files, contracts): strict need-to-know access, audit logging, secure disposal.</p>
        <p><strong>Restricted</strong> &mdash; highly sensitive data (trade secrets, cryptographic keys, biometric data): ultra-restricted access with Data Owner and COO (as DPO) approval, mandatory MFA, end-to-end AES-256 encryption with HSM-held keys, real-time access alerts, and full audit trail.</p>
      </EdNote>

      <h3>Labelling</h3>
      <EdBullets>
        <li>The Data Owner assigns a classification label to production data; Confidential and Restricted data MUST be labelled, and combined data takes the most restrictive level present.</li>
        <li>Any data not explicitly labelled is treated by default as Confidential.</li>
      </EdBullets>

      <h3>Critical Information Infrastructure</h3>
      <EdBullets>
        <li>Nebras maintains an inventory of assets supporting national Open Finance infrastructure, designated Critical Information Assets in line with UAE Cyber Security Council (CSC) expectations.</li>
        <li>These include API Hub core platforms and Trust Framework components; cryptographic keys, certificates, and PKI; identity, consent, and access-management systems; and core connectivity, logging, and monitoring systems &mdash; all subject to enhanced protection, monitoring, resilience, and incident response.</li>
      </EdBullets>

      <h3>Handling and reclassification</h3>
      <EdBullets>
        <li>Access follows least privilege with regular access reviews signed off by the Information Security Team; Confidential data is encrypted in transit and at rest, and Restricted data is encrypted on portable devices and untrusted networks.</li>
        <li>Data is transmitted by secure methods (VPN or encrypted email) and disposed of beyond recovery by shredding, pulping, or approved sanitisation; sharing channels apply encryption and approval requirements that escalate with classification.</li>
        <li>Data Owners review classifications at least annually; reclassification is communicated to stakeholders and custodians, with labels updated on the original document.</li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="data-protection"
      num="08"
      color="var(--at-gold)"
      eyebrow="Data protection & privacy"
      title="Privacy, retention, and data protection techniques"
      lede="Nebras respects data subjects&rsquo; rights under applicable laws (including UAE PDPL and GDPR) and applies industry-tested techniques to protect, retain, and dispose of personal and business data."
      tone="surface"
    >
      <h3>Data protection techniques</h3>
      <EdBullets>
        <li><strong>Cryptography</strong> &mdash; industry-tested algorithms with strong key lengths and key management, covering reversible encryption and one-way hashing.</li>
        <li><strong>Encryption</strong> &mdash; e.g. AES (128 bits and higher), 3DES with minimum double-length keys (EMV only), and RSA (2048 bits and higher).</li>
        <li><strong>Degaussing, sanitisation, and secure wipe</strong> &mdash; permanent destruction or deletion of data so it cannot be recovered.</li>
      </EdBullets>

      <h3>Data subject rights</h3>
      <EdBullets>
        <li>Rights include access, rectification, erasure, restriction, portability, objection, and withdrawal of consent.</li>
        <li>The COO (as DPO) verifies identity within 72 hours and responds within 30 days (extendable to 60 for complex cases); requests are tracked centrally and metrics reported quarterly to the Board Risk and Compliance Committee.</li>
      </EdBullets>

      <h3>DPIA, retention, and RoPA</h3>
      <EdBullets>
        <li>A Data Protection Impact Assessment is mandatory for high-risk processing (large-scale sensitive PII or biometrics, automated decision-making with legal effect, new technology processing Restricted data, or cross-border transfer to non-adequate jurisdictions); reports are filed in the DPIA Register and retained 5 years.</li>
        <li>Retention follows a defined schedule &mdash; e.g. customer PII 7 years after account closure (CBUAE/AML), financial transaction logs 10 years (CBUAE Open Finance rules), API access logs 1 year, HR records 5 years &mdash; with secure deletion (NIST 800-88, DBAN, DIN 66399 P-5) verified by the DPO, and legal holds retained until proceedings end.</li>
        <li>A Record of Processing Activities is maintained (per UAE PDPL Article 14), owned by the COO as DPO, updated quarterly, read-only for auditors, and reviewed in the annual internal audit.</li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="third-party"
      num="09"
      color="var(--at-blue)"
      eyebrow="Third-party security"
      title="Vendor, outsourcing, and supply-chain assurance"
      lede="All third parties processing Nebras data &mdash; especially Restricted and Confidential &mdash; MUST provide equivalent protection through contractual and operational safeguards."
      tone="cream"
    >
      <h3>Vendor risk management</h3>
      <EdBullets>
        <li><strong>Due diligence</strong> &mdash; pre-engagement Information Security &amp; Privacy Questionnaire, review of certifications (ISO 27001, SOC 2 Type II), and breach-history assessment.</li>
        <li><strong>Data Processing Agreement</strong> &mdash; mandatory for Restricted/Confidential data, covering sub-processor list, 24-hour breach notification, audit rights, and data return or deletion on termination.</li>
        <li><strong>Risk tiering</strong> &mdash; High (Restricted data): full DPA plus annual audit; Medium (Confidential): DPA plus biennial review; Low (Internal/Public): standard contract clauses.</li>
        <li><strong>Governance</strong> &mdash; the Information Security Head reviews DPA drafts, the COO (as DPO) co-signs for Restricted data, and the Risk &amp; Compliance Committee approves high-risk vendors.</li>
      </EdBullets>

      <h3>Cyber resilience testing</h3>
      <EdBullets>
        <li>Providers supporting Critical Information Assets or processing Restricted/Confidential data undergo mandatory periodic cyber resilience testing &mdash; penetration testing, vulnerability assessments, resilience or recovery simulations, and review of incident response and disaster recovery capability.</li>
        <li>High-risk or critical providers are tested at least annually, or more frequently based on risk, regulatory expectations, or material service changes.</li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="risk-incident"
      num="10"
      color="var(--at-blue-deep)"
      eyebrow="Risk, incident & awareness"
      title="Risk management, incident response, and awareness"
      lede="Risks are analysed by impact and likelihood and treated to acceptable levels; incidents are managed through a defined lifecycle with mandatory regulatory reporting; and awareness is sustained across the organisation."
      tone="surface"
    >
      <h3>Risk management</h3>
      <EdBullets>
        <li>Identified risks are analysed as a compound of impact (minor / moderate / major) and likelihood (unlikely / likely / very likely), considering asset criticality and existing controls on common scales for comparability.</li>
        <li>Treatment strategies are avoidance, mitigation, transference, or acceptance; residual risks above baseline (high and medium) are tracked, and Risk Acceptance Forms are approved by the Risk and Compliance Committee.</li>
        <li>Risk assessments are reviewed at least annually and on triggers such as new systems, suppliers, incidents, regulatory change, or geographic expansion.</li>
      </EdBullets>

      <h3>Incident response lifecycle</h3>
      <EdStages>
        <EdStage num="01" title="Detect & contain" num-color="var(--at-blue-deep)">
          <p>Within 1 hour, IT Operations isolates the affected system and revokes access to limit the compromise.</p>
        </EdStage>
        <EdStage num="02" title="Assess & log" num-color="var(--at-blue-deep)">
          <p>The Information Security Head records the event in the Incident Register and assesses whether personal data is involved.</p>
        </EdStage>
        <EdStage num="03" title="Mobilise response team" num-color="var(--at-blue-deep)">
          <p>The COO (as DPO) forms the Breach Response Team &mdash; DPO, Legal, Communications, and Information Security.</p>
        </EdStage>
        <EdStage num="04" title="Notify" num-color="var(--at-blue-deep)">
          <p>Within 72 hours, the UAE Data Office is notified where there is high risk to rights and freedoms, and affected data subjects are informed by direct email and website notice.</p>
        </EdStage>
        <EdStage num="05" title="Remediate & report" num-color="var(--at-blue-deep)">
          <p>Root-cause analysis is completed, controls updated, and the breach report presented quarterly to the Risk &amp; Compliance Committee. High-risk triggers include 1,000+ records, sensitive PII, or risk of identity theft.</p>
        </EdStage>
      </EdStages>

      <h3>Cyber incident severity</h3>
      <EdBullets>
        <li><strong>Severity 1 (Critical)</strong> &mdash; affects critical assets or national Open Finance infrastructure, widespread disruption, or significant data compromise; escalated immediately to Senior Management and the Board, with national reporting and authority coordination.</li>
        <li><strong>Severity 2 (High)</strong> &mdash; major operational disruption, attempted compromise of critical systems, or confidential-data exposure without widespread impact.</li>
        <li><strong>Severity 3 (Medium)</strong> &mdash; localised issues, limited data exposure, or weaknesses requiring remediation.</li>
        <li><strong>Severity 4 (Low)</strong> &mdash; minor events with no operational or data impact.</li>
      </EdBullets>

      <h3>Awareness and communication</h3>
      <EdBullets>
        <li>General awareness training reaches all employees on joining and annually; role-based training addresses job-specific gaps, insider-threat recognition, and sector-specific threats, with records retained 5 years.</li>
        <li>An internal communication plan defines who communicates what and when &mdash; from policy on joining, to quarterly threat and incident-reporting updates, to event-based escalation of disruptions, breaches, and data leaks to the Risk and Compliance Committee.</li>
      </EdBullets>
    </EdSectionBand>

    <EdRelatedCards eyebrow="Read alongside" title="Related policies">
      <EdRelatedCard
        href="/internal/policies/business-continuity"
        category="Risk, Security & Compliance"
        title="Business Continuity Policy"
        desc="How Nebras sustains availability and recovers critical Open Finance services after disruption."
      />
      <EdRelatedCard
        href="/internal/policies/enterprise-risk-management"
        category="Risk, Security & Compliance"
        title="Enterprise Risk Management Policy"
        desc="The risk framework and appetite to which information security risk assessment is aligned."
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
