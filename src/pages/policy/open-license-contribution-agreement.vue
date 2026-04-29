<route lang="yaml">
meta:
  title: Open License and Contribution Agreement
  appliesTo:
    - Licensed Financial Institutions (LFIs)
    - Third-Party Providers (TPPs)
    - System Integrators and Technology Service Providers
  purpose: The legal terms, copyright license, attribution rules, warranty disclaimer, and contribution agreement applicable to anyone who accesses, implements, or contributes to the UAE Open Finance Standards.
  readTime: "3 min"
  updated: "2026-04-21"
</route>

<script setup lang="ts">
interface Section { id: string; label: string }
interface MetaItem { label: string; value: string }

const sections: Section[] = [
  { id: 'purpose',         label: 'Purpose' },
  { id: 'scope',           label: 'Scope' },
  { id: 'copyright',       label: 'Copyright' },
  { id: 'attribution',     label: 'Attribution' },
  { id: 'warranty',        label: 'Warranty' },
  { id: 'legal-status',    label: 'Legal status' },
  { id: 'contribution',    label: 'Contribution' },
]

const meta: MetaItem[] = [
  { label: 'Applies to', value: 'LFIs · TPPs · Integrators' },
  { label: 'Read',       value: '3 min' },
  { label: 'Updated',    value: '21 Apr 2026' },
]
</script>

<template>
  <div class="ed-page">
    <EdBackStrip href="/policy/" text="All policies" />

    <EdHero
      eyebrow="License · Contribute · Implement"
      title="Open License and Contribution Agreement"
      :meta="meta"
      lede="The legal terms, licensing conditions, and contribution requirements applicable to anyone who accesses, implements, or contributes to the UAE Open Finance Standards. <strong>Agreement to these terms is mandatory before submitting any Contribution.</strong>"
    />

    <EdInPageNav :sections="sections" />

    <EdSectionBand
      id="purpose"
      num="01"
      color="var(--at-teal)"
      eyebrow="Purpose"
      title="Who this Agreement is for"
      lede="This document defines the legal terms applicable to any natural person or legal entity (the &quot;Contributor&quot;) who:"
      tone="cream"
    >
      <EdBullets>
        <li>Accesses or implements the UAE Open Finance Standards</li>
        <li>Contributes to the development of the Standards</li>
        <li>Participates in consultations, working groups, or technical discussions</li>
      </EdBullets>

      <h3>It establishes</h3>
      <EdBullets>
        <li>The open copyright license granted by the Central Bank of the United Arab Emirates (CBUAE)</li>
        <li>The rights and obligations of Contributors</li>
        <li>The intellectual property framework governing Contributions</li>
        <li>Confidentiality and governing law provisions</li>
      </EdBullets>

      <EdCallout color="var(--at-gold)">
        <p><strong>Agreement to these terms is mandatory before submitting any Contribution.</strong></p>
      </EdCallout>
    </EdSectionBand>

    <EdSectionBand
      id="scope"
      num="02"
      color="var(--at-gold)"
      eyebrow="Scope"
      title="What this Agreement covers"
      tone="surface"
    >
      <EdBullets>
        <li>The UAE Open Finance Standards, specifications, documentation, and related materials (the "Standards")</li>
        <li>All Contributions submitted now or in the future</li>
        <li>All draft and final versions of the Standards</li>
        <li>Participation in working groups, consultations, and development activities</li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="copyright"
      num="03"
      color="var(--at-blue)"
      eyebrow="Copyright"
      title="The license granted by CBUAE"
      tone="cream"
    >
      <EdCallout color="var(--at-blue)">
        <p><strong>Copyright &copy; 2024 &mdash; Central Bank of the United Arab Emirates</strong></p>
      </EdCallout>

      <EdProse>CBUAE grants a non-exclusive, royalty-free, worldwide copyright license to any contributor, developer, implementer, or interested party to:</EdProse>
      <EdBullets>
        <li>Reproduce</li>
        <li>Prepare derivative works</li>
        <li>Distribute</li>
        <li>Perform</li>
        <li>Display</li>
      </EdBullets>
      <EdProse>the UAE Open Finance Standards solely for the purpose of developing and implementing the Standards.</EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="attribution"
      num="04"
      color="var(--at-blue-deep)"
      eyebrow="Attribution"
      title="Crediting CBUAE as source"
      tone="surface"
      narrow
    >
      <EdProse>Attribution must be made to CBUAE as the source of the material. Such attribution must <strong>not imply endorsement</strong> by CBUAE.</EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="warranty"
      num="05"
      color="var(--at-navy)"
      eyebrow="Disclaimer of warranty"
      title="The Standards are provided 'as is'"
      tone="cream"
    >
      <EdProse>The Standards are provided "as is", without warranty of any kind, express or implied, including but not limited to:</EdProse>
      <EdBullets>
        <li>Merchantability</li>
        <li>Fitness for a particular purpose</li>
        <li>Non-infringement</li>
      </EdBullets>
      <EdProse>CBUAE shall not be liable for any claim, damages, or other liability arising from:</EdProse>
      <EdBullets>
        <li>Use of the Standards</li>
        <li>Implementation of the Standards</li>
        <li>Contributions made by any party</li>
      </EdBullets>
    </EdSectionBand>

    <EdSectionBand
      id="legal-status"
      num="06"
      color="var(--at-navy-deep)"
      eyebrow="Legal status"
      title="Collective Work under UAE Federal Decree-Law"
      tone="surface"
      narrow
    >
      <EdProse>The Standards, amendments, and Contributions are considered a "Collective Work" under <strong>UAE Federal Decree-Law No. 38/2021</strong>, which governs copyright protection for innovative literary, artistic, and scientific creations in the United Arab Emirates.</EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="contribution"
      num="07"
      color="var(--at-teal-deep)"
      eyebrow="Contribution Agreement"
      title="What contributors agree to"
      tone="cream"
    >
      <h3>General principles</h3>
      <EdProse>CBUAE makes the Standards available for implementation without fee.</EdProse>
      <EdProse>Any feedback, submission, suggestion, upload, or other material related to the Standards (unless clearly marked "Not a Submission" or "Not a Contribution") constitutes a "Contribution."</EdProse>
      <EdProse>By submitting a Contribution, the Contributor agrees to the terms below.</EdProse>

      <h3>Contributor representations and warranties</h3>
      <EdProse>The Contributor represents and warrants that:</EdProse>

      <EdCompareCards>
        <EdCompareCard
          accent="var(--at-navy-deep)"
          kicker="1. Authority to Contribute"
          example="If a legal entity"
        >
          <ul>
            <li>Contributions are made by employees within the scope of employment, or</li>
            <li>Independent contractors under written IP assignment obligations</li>
          </ul>
        </EdCompareCard>

        <EdCompareCard
          accent="var(--at-teal)"
          kicker="1. Authority to Contribute"
          example="If an individual"
        >
          <ul>
            <li>The employer has authorized the Contribution, waived relevant rights, or</li>
            <li>Has entered into a separate agreement with CBUAE</li>
          </ul>
        </EdCompareCard>
      </EdCompareCards>

      <h3>2. No conflicting obligations</h3>
      <EdProse>Contributor has no third-party obligations that would prevent:</EdProse>
      <EdBullets>
        <li>Participating in working groups</li>
        <li>Making Contributions</li>
        <li>Granting rights in intellectual property</li>
      </EdBullets>
    </EdSectionBand>

    <EdRelatedCards eyebrow="Read alongside" title="Related policies">
      <EdRelatedCard
        href="/policy/version-management"
        category="Nebras"
        title="Version Management Policy"
        desc="How the Standards are versioned and what guarantees apply once Live."
      />
      <EdRelatedCard
        href="/policy/changes-to-published-content"
        category="Nebras"
        title="Changes to Published Documentation Policy"
        desc="How amendments are issued post-publication via Errata."
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
