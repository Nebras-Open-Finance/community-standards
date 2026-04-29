<route lang="yaml">
meta:
  title: Version Management Policy
  appliesTo:
    - Nebras
  purpose: Defines how API specifications, UI components, and related standards are versioned for the UAE Open Finance ecosystem — major and minor cadence, errata constraints, and the stability guarantees that apply once a capability is declared Live.
  readTime: "5 min"
  updated: "2026-04-21"
</route>

<script setup lang="ts">
// Phase 4 — Version Management Policy.
// Ported from `docs/components/WebPages/VersionManagementPolicyPage.vue`.
// Chrome (PageHeader/PageFooter) is owned by the default layout.

interface Section { id: string; label: string }
interface MetaItem { label: string; value: string }
interface KeyNum { value: string; unit?: string; label: string }

const sections: Section[] = [
  { id: 'scope',           label: 'Scope' },
  { id: 'effective-scope', label: 'Effective scope' },
  { id: 'versioning',      label: 'Versioning' },
  { id: 'system-ui',       label: 'System & UI' },
  { id: 'release',         label: 'Release' },
  { id: 'governance',      label: 'Governance' },
]

const meta: MetaItem[] = [
  { label: 'Applies to',     value: 'Nebras' },
  { label: 'Read',           value: '5 min' },
  { label: 'Updated',        value: '21 Apr 2026' },
  { label: 'Effective from', value: 'V2.1' },
]

const keyNums: KeyNum[] = [
  { value: '18', unit: 'mo', label: 'Min. major-version cadence' },
  { value: '6',  unit: 'mo', label: 'Min. minor-version cadence' },
]

const scopeItems: string[] = [
  'API specifications',
  'UI components',
  'Downstream systems',
  'Consent objects',
  'Supporting documentation',
]
</script>

<template>
  <div class="ed-page">
    <EdBackStrip href="/policy/" text="All policies" />

    <EdHero
      eyebrow="Govern · Operate · Evolve"
      title="Version Management Policy"
      :meta="meta"
      lede="Defines how API specifications, UI components, and related standards are versioned for the UAE Open Finance ecosystem &mdash; major and minor cadence, errata constraints, and the stability guarantees that apply once a capability is declared <strong>Live</strong>."
      :key-nums="keyNums"
    />

    <EdInPageNav :sections="sections" />

    <EdSectionBand
      id="scope"
      num="01"
      color="var(--at-teal)"
      eyebrow="Scope"
      title="What this policy governs"
      lede="This policy applies to all Open Finance standards published within the UAE Open Finance ecosystem."
      tone="cream"
    >
      <EdPillList :items="scopeItems" />
    </EdSectionBand>

    <EdSectionBand
      id="effective-scope"
      num="02"
      color="var(--at-gold)"
      eyebrow="Effective scope"
      title="When this policy takes effect"
      tone="surface"
    >
      <EdCallout color="var(--at-gold)">
        <p>
          This policy takes effect from <strong>V2.1</strong> of the UAE Open Finance
          Standard. Standards, specifications, and documentation published prior to V2.1
          &mdash; including V2.0 and any earlier errata &mdash; are not governed by this
          policy. Breaking changes introduced before V2.1 do not constitute non-compliance.
        </p>
        <p>
          The stability guarantees set out in this policy &mdash; in particular, the
          restriction of breaking changes to major version releases and the scope
          constraints on errata &mdash; apply only to <strong>Live capabilities</strong>.
          A capability is Live when Nebras has formally declared it in production use
          within the UAE Open Finance ecosystem.
        </p>
      </EdCallout>

      <h3>Capabilities not yet declared Live</h3>
      <EdBullets>
        <li>Breaking changes <strong>MAY</strong> be introduced in minor versions or errata without requiring a major version increment</li>
        <li>The release cadence defined below continues to apply</li>
        <li>Once a capability is declared Live, all subsequent changes <strong>MUST</strong> comply with this policy in full</li>
      </EdBullets>

      <p class="ed-aside">
        Nebras is responsible for maintaining and publishing the register of Live capabilities.
      </p>
    </EdSectionBand>

    <EdSectionBand
      id="versioning"
      num="03"
      color="var(--at-blue)"
      eyebrow="Versioning"
      title="Major and minor versions"
      lede="The UAE Open Finance standard uses a two-part version identifier of the form <code>Vx.y</code>, where <code>x</code> is the major version and <code>y</code> is the minor version."
      tone="cream"
    >
      <EdCompareCards>
        <EdCompareCard
          accent="var(--at-navy-deep)"
          kicker="Major versions"
          example="V1.1 → V2.0"
          cadence="18 months"
          cadence-label="Minimum interval"
        >
          <ul>
            <li><strong>MAY</strong> include breaking changes that are not backward compatible</li>
            <li><strong>MUST NOT</strong> be released more frequently than every 18 months from the last major release</li>
            <li><strong>MUST</strong> include a comprehensive record of all breaking changes, with migration guidance and a clear deprecation timeline for the prior major version</li>
          </ul>
        </EdCompareCard>

        <EdCompareCard
          accent="var(--at-teal)"
          kicker="Minor versions"
          example="V1.0 → V1.1"
          cadence="6 months"
          cadence-label="Minimum interval"
        >
          <ul>
            <li><strong>MUST NOT</strong> include breaking changes</li>
            <li><strong>MUST NOT</strong> be released more frequently than every 6 months from the previous release</li>
            <li><strong>MAY</strong> include non-breaking enhancements such as additional optional fields, additional GET response fields, additional endpoints, or non-breaking changes to field types</li>
          </ul>
        </EdCompareCard>
      </EdCompareCards>

      <h3>Version documentation</h3>
      <EdProse>Every major and minor version <strong>MUST</strong> be accompanied by:</EdProse>
      <EdBullets>
        <li>A complete change log covering all modifications since the previous version</li>
        <li>Implementer guidance describing how to adopt the new version</li>
        <li>For major versions, migration guidance for each breaking change</li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="system-ui"
      num="04"
      color="var(--at-blue-deep)"
      eyebrow="System & UI"
      title="Version-independent UI support"
      tone="surface"
    >
      <EdBullets>
        <li>UI elements <strong>MUST NOT</strong> rely on API versioning for core functionality</li>
        <li>Where UI behaviour depends on new data in a consent object, LFIs and TPPs <strong>MUST</strong> implement logic based on the presence of the data itself, not on the consent version</li>
      </EdBullets>

      <EdExample>
        <p>
          If a new consent permission <code>ReadStatements</code> is added in V2.1,
          the UI <strong>SHOULD</strong> check whether <code>ReadStatements</code>
          is present on the consent rather than checking whether the consent version equals V2.1.
        </p>
      </EdExample>

      <h3>UI adoption</h3>
      <EdBullets>
        <li>LFIs <strong>MAY</strong> adopt visual or branding changes from a future version before upgrading their API version. <em>Example:</em> new UI requirements published in V2.0 may be implemented while still serving API V1.2</li>
        <li>Adoption of new UI elements requires successful Customer Experience (CX) certification</li>
        <li>When an LFI upgrades its API to a given version, the UI <strong>MUST</strong> also align with that version. UI enhancements <strong>MAY</strong> precede API version upgrades but <strong>MUST NOT</strong> lag behind them</li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="release"
      num="05"
      color="var(--at-navy)"
      eyebrow="Release management"
      title="Publication, candidates, and post-publication change"
      tone="cream"
    >
      <EdStages>
        <EdStage num="01" title="Standards publication">
          <p>A standards version <strong>MAY</strong> only be declared published once it is fully available to TPPs via the API Hub.</p>
        </EdStage>

        <EdStage num="02" title="Release candidate">
          <p>
            A release candidate (e.g. <code>V1.2-rc</code>) <strong>MAY</strong> be issued ahead
            of official publication. Once a version is agreed but not yet delivered into the API Hub,
            it carries a <code>-rc-final</code> suffix to indicate fixed-but-not-yet-published state.
          </p>
        </EdStage>

        <EdStage num="03" title="Changes to published versions">
          <EdBullets tight>
            <li>Post-publication changes are limited to guidance clarifications or bug fixes, and <strong>MUST</strong> follow the <a href="/policy/changes-to-published-content">Changes to Published Documentation Policy</a></li>
            <li>No functional changes affecting LFI or TPP implementations may be introduced after publication; such changes require a new minor or major version</li>
            <li>Errata <strong>MUST NOT</strong> introduce breaking changes</li>
            <li>Errata <strong>MUST NOT</strong> introduce new functionality &mdash; additive enhancements <strong>MUST</strong> be delivered through a new minor version</li>
          </EdBullets>
        </EdStage>
      </EdStages>
    </EdSectionBand>

    <EdSectionBand
      id="governance"
      num="06"
      color="var(--at-teal-deep)"
      eyebrow="Compliance & review"
      title="Governance and policy lifecycle"
      tone="surface"
      narrow
    >
      <EdTwoCol>
        <div>
          <h3>Compliance</h3>
          <EdProse>
            Nebras, LFIs, and TPPs are required to adhere to this policy. Nebras is
            responsible for maintaining the versioning scheme, publishing version artefacts,
            and coordinating with ecosystem participants on upcoming releases.
          </EdProse>
        </div>
        <div>
          <h3>Review and updates</h3>
          <EdProse>
            This policy will be reviewed periodically by Nebras to ensure alignment with
            industry best practice and the evolving UAE Open Finance ecosystem. Material
            changes will be communicated to LFIs and TPPs in advance of taking effect.
          </EdProse>
        </div>
      </EdTwoCol>
    </EdSectionBand>

    <EdRelatedCards eyebrow="Read alongside" title="Related policies">
      <EdRelatedCard
        href="/policy/changes-to-published-content"
        category="Nebras"
        title="Changes to Published Documentation Policy"
        desc="How published versions may be amended post-release via Errata."
      />
      <EdRelatedCard
        href="/policy/lfi-deprecation"
        category="Nebras"
        title="Major Version Deprecation Policy"
        desc="How prior major versions are retired and the timelines that apply."
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
</style>
