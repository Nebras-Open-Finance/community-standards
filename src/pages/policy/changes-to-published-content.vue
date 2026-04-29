<route lang="yaml">
meta:
  title: Changes to Published Documentation Policy
  appliesTo:
    - Nebras
  purpose: Defines how published documentation may be changed — Errata-only for published versions, free updates for non-published release-candidate baselines, with traceability and surfacing requirements.
  readTime: "2 min"
  updated: "2026-04-21"
</route>

<script setup lang="ts">
// Phase 4 — Changes to Published Documentation Policy.
// Ported from `docs/components/WebPages/ChangesToPublishedContentPolicyPage.vue`.
//
// Uses <ErrataNotice> from `src/components/common/`, auto-registered by
// unplugin-vue-components — no explicit import.

interface Section { id: string; label: string }
interface MetaItem { label: string; value: string }

const sections: Section[] = [
  { id: 'purpose',     label: 'Purpose' },
  { id: 'published',   label: 'Published' },
  { id: 'unpublished', label: 'Unpublished' },
  { id: 'governance',  label: 'Governance' },
]

const meta: MetaItem[] = [
  { label: 'Applies to', value: 'Nebras' },
  { label: 'Read',       value: '2 min' },
  { label: 'Updated',    value: '21 Apr 2026' },
]
</script>

<template>
  <div class="ed-page">
    <EdBackStrip href="/policy/" text="All policies" />

    <EdHero
      eyebrow="Govern · Operate · Evolve"
      title="Changes to Published Documentation Policy"
      :meta="meta"
      lede="Defines how published documentation may be changed. Applies to <strong>TPP &mdash; Open Finance Standards</strong> and <strong>LFI &mdash; Integration Guide</strong>. Read alongside the <a href='/policy/version-management'>Version Management Policy</a>."
    />

    <EdInPageNav :sections="sections" />

    <EdSectionBand
      id="purpose"
      num="01"
      color="var(--at-teal)"
      eyebrow="Purpose"
      title="Why this policy exists"
      tone="cream"
      narrow
    >
      <EdProse>This policy defines how published documentation may be changed for <strong>TPP &mdash; Open Finance Standards</strong> and <strong>LFI &mdash; Integration Guide</strong>, ensuring that every post-publication change is traceable, auditable, and surfaced to readers.</EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="published"
      num="02"
      color="var(--at-gold)"
      eyebrow="Published versions"
      title="Errata-only after publication"
      tone="surface"
    >
      <EdCallout color="var(--at-gold)">
        <p>For any <strong>published</strong> documentation version, content may only be changed through a formally published <strong>Errata</strong>.</p>
      </EdCallout>

      <EdBullets>
        <li>This applies to all normative and implementation-impacting content in published versions</li>
        <li>Any correction or clarification made after publication must be traceable to a specific Errata identifier</li>
        <li>The affected page or section should clearly display that it has been modified by Errata</li>
      </EdBullets>

      <h3>Errata example</h3>
      <ErrataNotice
        :affected="true"
        errata-id="v2.1-001"
        errata-url="/tech/release-notes-and-erratas/erratas/v2.1"
      >
        <h3>Consent State Transitions</h3>

        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

        <p>Original content that now no longer applies as the Errata clearly says their is new content that supersedes this.</p>

        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      </ErrataNotice>
    </EdSectionBand>

    <EdSectionBand
      id="unpublished"
      num="03"
      color="var(--at-blue)"
      eyebrow="Non-published versions"
      title="Updated freely until published"
      tone="cream"
    >
      <EdProse>For <strong>non-published</strong> versions (for example <code>v3.1-rc</code> or <code>v3.1-rc-final</code>), content may be updated without issuing an Errata.</EdProse>
      <EdBullets>
        <li>These versions remain draft / pre-publication artifacts</li>
        <li>Normal review and approval controls still apply</li>
        <li>Once the version is published, post-publication changes <strong>must</strong> follow the Errata process</li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="governance"
      num="04"
      color="var(--at-teal-deep)"
      eyebrow="Governance"
      title="Who enforces this policy"
      tone="surface"
      narrow
    >
      <EdProse>Nebras is responsible for enforcing this policy across published documentation baselines for both TPP and LFI documentation sets.</EdProse>
    </EdSectionBand>

    <EdRelatedCards eyebrow="Read alongside" title="Related policies">
      <EdRelatedCard
        href="/policy/version-management"
        category="Nebras"
        title="Version Management Policy"
        desc="The version cadence within which Errata operate."
      />
      <EdRelatedCard
        href="/policy/lfi-deprecation"
        category="Nebras"
        title="Major Version Deprecation Policy"
        desc="How major versions are retired after publication."
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
