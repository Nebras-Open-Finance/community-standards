<route lang="yaml">
meta:
  title: Secure Management of Keys and Credentials in UAE Open Finance
  appliesTo:
    - Licensed Financial Institutions (LFIs)
    - Third-Party Providers (TPPs)
    - System Integrators and Technology Service Providers
    - Ozone (API Hub)
    - Raidiam (Trust Framework)
  purpose: Mandatory and recommended practices for the secure management of cryptographic keys and credentials across the UAE Open Finance ecosystem — HSMs, KMS, key lifecycle, strong authentication, access management, and BYOK / MYOK.
  readTime: "3 min"
  updated: "2026-04-21"
</route>

<script setup lang="ts">
interface Section { id: string; label: string }
interface MetaItem { label: string; value: string }
interface KeyNum { value: string; unit?: string; label: string }
interface Reference { title: string; desc: string; href: string }

const sections: Section[] = [
  { id: 'scope',         label: 'Scope' },
  { id: 'regulatory',    label: 'Regulatory' },
  { id: 'practices',     label: 'Practices' },
  { id: 'conclusion',    label: 'Conclusion' },
  { id: 'references',    label: 'References' },
]

const meta: MetaItem[] = [
  { label: 'Applies to', value: 'LFIs · TPPs · Integrators · Ozone · Raidiam' },
  { label: 'Read',       value: '3 min' },
  { label: 'Updated',    value: '21 Apr 2026' },
]

const keyNums: KeyNum[] = [
  { value: 'FIPS', unit: '140-3', label: 'Required HSM certification' },
  { value: '13',   unit: 'mo',    label: 'Maximum key rotation interval' },
  { value: 'mTLS',                label: 'Required client-server auth' },
]

const references: Reference[] = [
  {
    title: 'UAE Information Assurance Regulation – TDRA',
    desc: 'Official TDRA regulation on information assurance requirements in the UAE.',
    href: 'https://tdra.gov.ae/-/media/About/regulations-and-ruling/EN/UAE-Information-Assurance-Regulation-v1-1-pdf.ashx',
  },
  {
    title: 'CBUAE Rulebook – Open Finance Regulation',
    desc: "Central Bank of the UAE's Open Finance Regulation page (security and operational requirements).",
    href: 'https://rulebook.centralbank.ae/en/rulebook/open-finance-regulation-0',
  },
  {
    title: 'FIPS 140-3 Cryptographic Module Validation Program – NIST',
    desc: 'NIST standard for validated cryptographic modules.',
    href: 'https://csrc.nist.gov/projects/cryptographic-module-validation-program',
  },
  {
    title: 'UAE National Cybersecurity Strategy',
    desc: 'National cybersecurity strategy framework guiding UAE cybersecurity and digital resilience.',
    href: 'https://www.tra.gov.ae/userfiles/assets/Lw3seRUaIMd.pdf',
  },
]
</script>

<template>
  <div class="ed-page">
    <EdBackStrip href="/policy/" text="All policies" />

    <EdHero
      eyebrow="Secure · Authenticate · Audit"
      title="Secure Management of Keys and Credentials"
      :meta="meta"
      lede="Establishes <strong>mandatory and recommended practices</strong> for the secure management of cryptographic keys and credentials within the UAE Open Finance ecosystem &mdash; ensuring regulatory compliance, protecting organizational and user data, and maintaining trust across participants."
      :key-nums="keyNums"
    />

    <EdInPageNav :sections="sections" />

    <EdSectionBand
      id="scope"
      num="01"
      color="var(--at-teal)"
      eyebrow="Scope"
      title="What this policy covers"
      tone="cream"
    >
      <EdBullets>
        <li>Generation, storage, use, rotation, revocation, and destruction of cryptographic keys and credentials</li>
        <li>Authentication, authorization, and token handling in Open Finance APIs and consent flows</li>
        <li>Integration with <strong>Key Management Systems (KMS)</strong>, <strong>Hardware Security Modules (HSMs)</strong>, and other cryptographic infrastructure</li>
        <li>Roles and responsibilities for LFIs, TPPs, and ecosystem participants</li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="regulatory"
      num="02"
      color="var(--at-gold)"
      eyebrow="Regulatory foundation"
      title="The controls organisations must implement"
      lede="While the UAE does not mandate a single key management statute, organisations are required to implement robust security controls under the <strong>Information Assurance Regulation</strong> and the <strong>CBUAE Open Finance guidelines</strong>."
      tone="surface"
    >
      <h3>Key requirements</h3>
      <EdBullets>
        <li><strong>Key lifecycle management</strong> &mdash; secure generation, storage, distribution, rotation, revocation, and destruction</li>
        <li><strong>Protection of sensitive material</strong> &mdash; secret and private keys must be protected against unauthorized access, loss, or disclosure</li>
        <li><strong>Auditing and logging</strong> &mdash; all key usage and lifecycle activities must be logged and auditable</li>
        <li><strong>Certification and revocation</strong> &mdash; procedures to maintain trust across ecosystem participants</li>
      </EdBullets>
      <EdProse>LFIs and TPPs must implement these controls to ensure <strong>confidentiality, integrity, and availability</strong> of Open Finance systems.</EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="practices"
      num="03"
      color="var(--at-blue)"
      eyebrow="Mandatory practices"
      title="The five practices every participant must adopt"
      tone="cream"
    >
      <EdStages>
        <EdStage num="01" title="Adopt secure cryptographic infrastructure" num-color="var(--at-blue)">
          <p>Use <strong>FIPS 140-3 certified HSMs</strong> for key generation, signing, encryption, and storage. Ensure centralized key management using modern <strong>KMS</strong> (on-premises or cloud) that supports UAE data governance and local control principles, such as data residency and access controls.</p>
        </EdStage>

        <EdStage num="02" title="Implement key lifecycle controls" num-color="var(--at-blue)">
          <p>Rotate transport and signing keys at least <strong>every 13 months</strong> or more frequently if mandated. Define clear policies for key <strong>expiration, recovery, and destruction</strong>. Maintain <strong>audit logs</strong> of all key usage.</p>
        </EdStage>

        <EdStage num="03" title="Enforce strong authentication" num-color="var(--at-blue)">
          <p>Use phishing-resistant, modern authentication methods:</p>
          <EdBullets tight>
            <li><strong>FIDO2 / Passkeys</strong> for customer authentication</li>
            <li><strong>OAuth 2.0 + FAPI 2.0</strong> for secure API access</li>
            <li><strong>Mutual TLS (mTLS)</strong> for client-server authentication</li>
          </EdBullets>
          <p>Ensure secure handling of <strong>credentials and tokens</strong> throughout consent and API flows.</p>
        </EdStage>

        <EdStage num="04" title="Apply access management best practices" num-color="var(--at-blue)">
          <p>Implement <strong>role-based access control (RBAC)</strong> and <strong>separation of duties</strong> for key access. Limit key access to <strong>authorized personnel and system components only</strong>.</p>
        </EdStage>

        <EdStage num="05" title="Retain cryptographic control with BYOK / MYOK" num-color="var(--at-blue)">
          <p>LFIs may use <strong>Bring Your Own Key (BYOK)</strong> or <strong>Manage Your Own Key (MYOK)</strong> strategies to maintain control over sensitive key material while leveraging cloud infrastructure.</p>
        </EdStage>
      </EdStages>
    </EdSectionBand>

    <EdSectionBand
      id="conclusion"
      num="04"
      color="var(--at-teal-deep)"
      eyebrow="Conclusion"
      title="Why this matters"
      tone="surface"
      narrow
    >
      <EdProse>Secure key and credential management is a <strong>regulatory requirement, operational imperative, and trust enabler</strong> in the UAE Open Finance ecosystem. By implementing hardware-backed cryptography, modern authentication standards, robust key lifecycle management, and strong access controls, LFIs and TPPs can:</EdProse>
      <EdBullets>
        <li>Protect user and organizational data</li>
        <li>Maintain regulatory compliance</li>
        <li>Enable secure, consented financial data sharing</li>
        <li>Foster trust and resilience across the Open Finance ecosystem</li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="references"
      num="05"
      color="var(--at-navy)"
      eyebrow="References"
      title="Source documents"
      tone="cream"
    >
      <div class="ed-refs">
        <a v-for="(r, i) in references" :key="i" :href="r.href" target="_blank" rel="noopener" class="ed-ref">
          <span class="ed-ref__num">{{ String(i + 1).padStart(2, '0') }}</span>
          <span class="ed-ref__body">
            <span class="ed-ref__title">{{ r.title }}</span>
            <span class="ed-ref__desc">{{ r.desc }}</span>
          </span>
          <span class="ed-ref__arrow">&nearr;</span>
        </a>
      </div>
    </EdSectionBand>

    <EdRelatedCards eyebrow="Read alongside" title="Related policies">
      <EdRelatedCard
        href="/policy/version-management"
        category="Nebras"
        title="Version Management Policy"
        desc="The major and minor version cadence within which key rotation operates."
      />
      <EdRelatedCard
        href="/policy/changes-to-published-content"
        category="Nebras"
        title="Changes to Published Documentation Policy"
        desc="How errata are issued for security-impacting documentation changes."
      />
    </EdRelatedCards>
  </div>
</template>

<style scoped>
.ed-page {
  background: var(--at-bg-cream);
  color: var(--at-navy-deep);
  font-family: var(--at-sans);
  padding-top: 4.25rem;
}

.ed-refs {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--at-grid-line);
  background: var(--at-surface);
}
.ed-ref {
  display: grid;
  grid-template-columns: 3rem 1fr 1.5rem;
  gap: 1rem;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid var(--at-grid-line);
  text-decoration: none;
  color: inherit;
  align-items: center;
  transition: background 0.15s, padding-left 0.15s;
}
.ed-ref:last-child { border-bottom: 0; }
.ed-ref:hover {
  background: var(--at-bg-paper);
  padding-left: 1.4rem;
}
.ed-ref__num {
  font-family: var(--at-mono);
  font-size: 0.8rem;
  letter-spacing: 0.08em;
  font-weight: 700;
  color: var(--at-navy);
}
.ed-ref__body { display: flex; flex-direction: column; gap: 0.2rem; }
.ed-ref__title {
  font-family: var(--at-serif);
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: var(--at-navy-deep);
  line-height: 1.3;
}
.ed-ref__desc {
  font-family: var(--at-sans);
  font-size: 0.85rem;
  line-height: 1.5;
  color: var(--at-mute-2);
}
.ed-ref__arrow {
  font-family: var(--at-mono);
  color: var(--at-mute);
  transition: transform 0.15s, color 0.15s;
}
.ed-ref:hover .ed-ref__arrow {
  transform: translate(2px, -2px);
  color: var(--at-navy-deep);
}
</style>
