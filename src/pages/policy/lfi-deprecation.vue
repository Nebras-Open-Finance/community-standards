<route lang="yaml">
meta:
  title: Major Version Deprecation Policy
  appliesTo:
    - Licensed Financial Institutions (LFIs)
    - System Integrators and Technology Service Providers
    - Nebras
  purpose: Defines dual-running and deprecation requirements LFIs must follow when a new major version of the Open Finance standard is introduced — protecting TPPs and their customers from disruption while the ecosystem moves forward.
  readTime: "6 min"
  updated: "2026-04-21"
</route>

<script setup lang="ts">
// Phase 4 — LFI Deprecation Policy.
// Ported from `docs/components/WebPages/LfiDeprecationPolicyPage.vue`.

interface Section { id: string; label: string }
interface MetaItem { label: string; value: string }
interface KeyNum { value: string; unit?: string; label: string }
interface Milestone { stage: string; label: string }

const sections: Section[] = [
  { id: 'scope',         label: 'Scope' },
  { id: 'dual-running',  label: 'Dual-running' },
  { id: 'process',       label: 'Process' },
  { id: 'managed',       label: 'Nebras-managed' },
  { id: 'support',       label: 'Operational support' },
  { id: 'governance',    label: 'Governance' },
]

const meta: MetaItem[] = [
  { label: 'Applies to', value: 'LFIs · Integrators · Nebras' },
  { label: 'Read',       value: '6 min' },
  { label: 'Updated',    value: '21 Apr 2026' },
]

const keyNums: KeyNum[] = [
  { value: '5',  unit: 'phases',  label: 'Structured deprecation pipeline' },
  { value: '12', unit: 'mo',      label: 'Sunset window after restriction' },
  { value: '17', unit: 'mo+',     label: 'Total transition envelope' },
]

const milestones: Milestone[] = [
  { stage: 'Day 0',     label: 'New version goes live; formal communication issued' },
  { stage: 'Month 3',   label: 'First migration status report to Nebras' },
  { stage: 'Month 5',   label: 'Second migration status report to Nebras' },
  { stage: 'Month 5+',  label: 'Restriction of new consents on prior version (Nebras approval required)' },
  { stage: 'Month 17+', label: 'Prior version sunset (all prior version consents expired)' },
]
</script>

<template>
  <div class="ed-page">
    <EdBackStrip href="/policy/" text="All policies" />

    <EdHero
      eyebrow="Govern · Operate · Evolve"
      title="Major Version Deprecation Policy"
      :meta="meta"
      lede="Defines the dual-running and deprecation requirements LFIs must follow when a new major version of the Open Finance standard is introduced &mdash; protecting TPPs and their customers from disruption while the ecosystem moves forward."
      :key-nums="keyNums"
    />

    <EdInPageNav :sections="sections" />

    <EdSectionBand
      id="scope"
      num="01"
      color="var(--at-teal)"
      eyebrow="Scope"
      title="What this policy covers"
      lede="Applies to all LFIs operating within the UAE Open Finance ecosystem, covering major version transitions of the LFI API Hub implementation, the dual-running period, and the formal deprecation process."
      tone="cream"
    >
      <h3>When dual-running does not apply</h3>
      <EdProse>Where an LFI implements the API for the first time, only a single version is required initially. There is no expectation to support dual-running before a prior version exists.</EdProse>
      <EdProse>There is also no expectation for LFIs to implement dual-running or formal deprecation processes for:</EdProse>
      <EdBullets>
        <li><strong>Minor (non-breaking) API version updates</strong></li>
        <li><strong>Errata or corrective changes</strong></li>
        <li><strong>UI components or presentation-layer changes</strong></li>
        <li><strong>Downstream system or internal implementation changes</strong></li>
      </EdBullets>
      <EdProse>These changes are expected to be backward compatible and managed without requiring concurrent version support.</EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="dual-running"
      num="02"
      color="var(--at-gold)"
      eyebrow="Dual-running"
      title="Operating two versions in parallel"
      lede="When an LFI is ready to go live with a new major version (e.g. Vx.y &rarr; Vz.0), it <strong>must</strong> operate both the prior and new version concurrently for the duration of the deprecation window."
      tone="surface"
    >
      <h3>How dual-running works</h3>
      <EdBullets>
        <li>Deploy two active versions of their API Hub implementation simultaneously (e.g. V1.x and V2.0)</li>
        <li>Route incoming API requests to the correct implementation based on the version the TPP requested &mdash; currently via the <code>o3-api-uri</code> header</li>
        <li>Ensure each implementation is independently maintained and supported, with no cross-version dependencies that could cause instability</li>
      </EdBullets>
      <EdProse>Both implementations must remain fully functional and compliant with their respective standards throughout the dual-running period.</EdProse>

      <EdExample>
        <p>An LFI running V1.2 and V2.1 simultaneously would route a request to <code>https://api.bank.ae/open-finance/v1.2/accounts</code> to the V1.2 implementation, and a request to <code>https://api.bank.ae/open-finance/v2.1/accounts</code> to the V2.1 implementation.</p>
      </EdExample>
    </EdSectionBand>

    <EdSectionBand
      id="process"
      num="03"
      color="var(--at-blue)"
      eyebrow="Deprecation process"
      title="The five-phase deprecation pipeline"
      lede="The deprecation of a prior version follows a structured timeline to protect TPPs and their customers from unplanned disruption."
      tone="cream"
    >
      <EdStages>
        <EdStage num="01" title="Launch and communication" num-color="var(--at-blue)">
          <p><strong>Stand up the new version</strong> &mdash; The LFI deploys and validates the new major version of their API Hub implementation in production.</p>
          <p><strong>Validate readiness</strong> &mdash; The LFI confirms the new version is functioning correctly, including end-to-end consent flows, data sharing, and service initiation (as applicable).</p>
          <p><strong>Formal communication via Nebras</strong> &mdash; Nebras issues a formal ecosystem-wide communication informing all TPPs that the new version is available, that they are expected to begin migrating, and that the prior version will be deprecated in accordance with this policy.</p>
        </EdStage>

        <EdStage num="02" title="Migration monitoring (Months 1–3)" num-color="var(--at-blue)">
          <p>From the date of the formal communication, LFIs must actively monitor the creation of new consents across both versions.</p>
          <p>At the <strong>3-month mark</strong>, LFIs must report to Nebras on the status of TPP migration, specifically identifying any TPPs that are still raising new consents on the prior version. Nebras will use this information to engage directly with non-migrated TPPs.</p>
        </EdStage>

        <EdStage num="03" title="Final migration window (Months 4–5)" num-color="var(--at-blue)">
          <p>A further 2-month window is provided for remaining TPPs to complete migration.</p>
          <p>At the <strong>5-month mark</strong>, LFIs must again report to Nebras identifying any TPPs still raising new consents on the prior version. If no new consents are being raised on the prior version at this point, the LFI may request Nebras approval to proceed to Phase 4.</p>
        </EdStage>

        <EdStage num="04" title="Restricting new consents on prior version" num-color="var(--at-blue)">
          <p>With Nebras approval, the LFI may <strong>restrict the creation of new consents</strong> on the prior version. This means:</p>
          <EdBullets tight>
            <li>Existing consents on the prior version remain valid and must continue to be honoured</li>
            <li>No new consent journeys can be initiated against the prior version</li>
            <li>TPPs with active consents on the prior version may continue to exercise those consents until they expire</li>
          </EdBullets>
        </EdStage>

        <EdStage num="05" title="Sunset of prior version" num-color="var(--at-blue)">
          <p>From the point at which new consent creation is restricted, the prior version must remain operational for a further <strong>12 months</strong>, providing sufficient time for all existing consents on the prior version to expire naturally.</p>
          <p>After this 12-month period, and once Nebras confirms that no active consents remain on the prior version, the LFI may decommission the prior version entirely.</p>
        </EdStage>
      </EdStages>

      <h3>Milestone summary</h3>
      <div class="ed-milestones">
        <div v-for="m in milestones" :key="m.stage" class="ed-milestone">
          <span class="ed-milestone__stage">{{ m.stage }}</span>
          <span class="ed-milestone__label">{{ m.label }}</span>
        </div>
      </div>
    </EdSectionBand>

    <EdSectionBand
      id="managed"
      num="04"
      color="var(--at-blue-deep)"
      eyebrow="Nebras-managed"
      title="Where TPPs do not migrate by the six-month mark"
      tone="surface"
    >
      <EdProse>Where TPPs have not completed migration to the new version by the <strong>6-month mark</strong> from the date of formal communication, Nebras will take an active role in managing the deprecation.</EdProse>
      <EdBullets>
        <li>Directly engaging with non-migrated TPPs to understand technical or operational blockers</li>
        <li>Setting individual migration deadlines for non-migrated TPPs, with formal written notice</li>
        <li>Escalating persistent non-compliance to the relevant regulatory authority where appropriate</li>
        <li>Coordinating with the LFI to ensure migration support is available to affected TPPs</li>
        <li>Retaining oversight of the LFI's deprecation timeline and adjusting it where necessary to protect TPPs and their customers</li>
      </EdBullets>
      <EdProse>LFIs must provide Nebras with any data or reporting required to support this process.</EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="support"
      num="05"
      color="var(--at-navy)"
      eyebrow="Operational support"
      title="Sustaining both versions during the transition"
      lede="LFIs are expected to maintain appropriate operational support for both versions throughout the dual-running period."
      tone="cream"
    >
      <EdBullets>
        <li><strong>Incident management</strong> &mdash; Both API versions must be covered by the LFI's standard incident management and response procedures, with equivalent SLAs applied to both</li>
        <li><strong>Monitoring and alerting</strong> &mdash; LFIs must maintain active monitoring across both API versions, including availability, error rates, and latency</li>
        <li><strong>Change management</strong> &mdash; Any changes to either version during the dual-running period must be assessed for impact on the other version and communicated to Nebras in accordance with standard change management procedures</li>
        <li><strong>TPP support</strong> &mdash; LFIs must be able to provide technical support to TPPs migrating between versions, including guidance on breaking changes and access to sandbox environments running both versions</li>
        <li><strong>Consent data integrity</strong> &mdash; LFIs must ensure that consent records associated with the prior version are preserved and remain accessible for the full duration of those consents' validity, regardless of the deprecation status of the API version</li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="governance"
      num="06"
      color="var(--at-teal-deep)"
      eyebrow="Compliance & governance"
      title="Adherence and Nebras discretion"
      tone="surface"
      narrow
    >
      <EdProse>LFIs are required to adhere to this policy for all major version transitions within the UAE Open Finance ecosystem. Failure to comply, including failure to dual-run versions during the transition period or failure to report migration status to Nebras, may result in regulatory escalation.</EdProse>
      <EdProse>Nebras reserves the right to adjust deprecation timelines in exceptional circumstances, including where ecosystem-wide migration issues are identified or where the interests of TPPs or their customers require additional protection.</EdProse>
    </EdSectionBand>

    <EdRelatedCards eyebrow="Read alongside" title="Related policies">
      <EdRelatedCard
        href="/policy/version-management"
        category="Nebras"
        title="Version Management Policy"
        desc="The major and minor version cadence that triggers this deprecation pipeline."
      />
      <EdRelatedCard
        href="/policy/changes-to-published-content"
        category="Nebras"
        title="Changes to Published Documentation Policy"
        desc="How errata are issued during and after the dual-running window."
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

.ed-milestones {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--at-grid-line);
  background: var(--at-surface);
  margin-top: 1rem;
}
.ed-milestone {
  display: grid;
  grid-template-columns: 10rem 1fr;
  gap: 1rem;
  padding: 0.85rem 1.25rem;
  border-bottom: 1px solid var(--at-grid-line);
  align-items: baseline;
}
.ed-milestone:last-child { border-bottom: 0; }
.ed-milestone__stage {
  font-family: var(--at-mono);
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-navy-deep);
}
.ed-milestone__label {
  font-family: var(--at-sans);
  font-size: 0.95rem;
  line-height: 1.55;
  color: var(--at-mute-2);
}
@media (max-width: 640px) {
  .ed-milestone { grid-template-columns: 1fr; gap: 0.25rem; }
}
</style>
