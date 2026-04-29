<route lang="yaml">
meta:
  title: "Consent Identifiers — Why PSU and Account IDs Must Be Opaque"
  description: "Why any identifier patched onto a consent (psuIdentifiers, accountIds) must be an opaque, non-sensitive, stable LFI-defined value."
  category: Consents
  readTime: "6 min"
  updated: "2026-04-21"
  tags:
    - Consents
    - PSU Identifiers
    - Data Protection
</route>

<script setup lang="ts">
// Phase 5 — Consent Identifiers article. Ported from
// `docs/components/WebPages/KbConsentIdentifiersArticle.vue`.

interface Section { id: string; label: string }
interface MetaItem { label: string; value: string }

const sections: Section[] = [
  { id: 'rule',   label: 'The rule' },
  { id: 'why',    label: 'Why' },
  { id: 'format', label: 'Format rules' },
]

const meta: MetaItem[] = [
  { label: 'Category', value: 'Consents' },
  { label: 'Read',     value: '6 min' },
  { label: 'Updated',  value: '21 Apr 2026' },
]

const tags: readonly string[] = ['Consents', 'PSU Identifiers', 'Data Protection']
</script>

<template>
  <div class="ed-page">
    <EdBackStrip href="/knowledge-base/" text="All knowledge base articles" />

    <EdHero
      eyebrow="Learn · Understand · Build"
      title="Consent Identifiers — Why PSU and Account IDs Must Be Opaque"
      :meta="meta"
      lede="When an LFI authorises a consent, it patches identifiers onto it &mdash; the PSU who authenticated (<code>psuIdentifiers</code>) and the accounts the PSU selected (<code>accountIds</code>). These values are stored centrally in the API Hub and used to enrich every TPP request proxied to the LFI."
    >
      <template #lede>
        <div class="ed-tags">
          <span v-for="t in tags" :key="t" class="ed-tag">{{ t }}</span>
        </div>
      </template>
    </EdHero>

    <EdInPageNav :sections="sections" />

    <EdSectionBand
      id="rule"
      num="01"
      color="var(--at-teal)"
      eyebrow="The rule"
      title="What you MUST NOT use as an identifier"
      tone="cream"
    >
      <EdProse>
        Because these values live outside the LFI's own systems, they <strong>MUST</strong> be
        <strong>opaque internal references</strong> &mdash; never the underlying personal or account
        data they point to.
      </EdProse>

      <EdProse>
        Any value patched onto a consent <strong>MUST NOT</strong> be a sensitive or personally
        identifiable value. An LFI <strong>MUST NOT</strong> use any of the following as an
        identifier on the consent:
      </EdProse>

      <EdBullets>
        <li>Emirates ID, passport number, or any regulated national identifier</li>
        <li>Full name, date of birth, email, or mobile number</li>
        <li>IBAN, account number, card number, or PAN</li>
        <li>CIF number or any other internal identifier that maps 1:1 to regulated data</li>
      </EdBullets>

      <EdProse>
        The identifier <strong>MUST</strong> be an LFI-defined opaque reference that is meaningful only
        inside the LFI's own systems. The LFI resolves it back to the real customer or account
        internally when processing a request.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="why"
      num="02"
      color="var(--at-gold)"
      eyebrow="Why"
      title="The hub stores it; therefore it must be opaque"
      tone="surface"
    >
      <EdProse>
        The API Hub is the central consent store for UAE Open Finance. Consents &mdash; including the
        identifiers patched onto them &mdash; are persisted centrally, visible to operators of the
        API Hub, and surface in operational logs and reports. They are long-lived and outlive
        individual sessions.
      </EdProse>

      <EdCallout color="var(--at-gold)">
        <p>
          Storing sensitive values on the consent would <strong>leak PII outside the LFI's
          boundary</strong>, create a durable record of regulated data the LFI cannot unwind, and
          break the trust model where the API Hub receives only opaque handles from the LFI.
        </p>
      </EdCallout>

      <EdProse>
        The same principle governs payment PII, which is encrypted end-to-end to keep personal data
        opaque to the hub &mdash; see <a href="/knowledge-base/articles/pii-encryption">PII Encryption</a>.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="format"
      num="03"
      color="var(--at-blue)"
      eyebrow="Format rules"
      title="Per-identifier requirements"
      tone="cream"
    >
      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Identifier</th>
              <th>Requirement</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>psuIdentifiers.userId</code></td>
              <td>Opaque string. Stable per PSU (same value across all their consents). Unique within the LFI. UUID v4 recommended.</td>
            </tr>
            <tr>
              <td><code>accountIds[]</code></td>
              <td>Array of opaque strings, 1&ndash;40 chars each, <code>minItems: 1</code>. Each value <strong>MUST</strong> match the <code>AccountId</code> the LFI returns from its <code>/accounts</code> APIs. Immutable once issued. UUID v4 recommended.</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>
        For Bank Service Initiation consents, <code>accountIds</code> <strong>MUST</strong> contain
        exactly one element &mdash; the debtor account. For Bank Data Sharing, it
        <strong>MUST</strong> contain every account the PSU selected.
      </EdProse>

      <EdNote type="important" title="Guiding principle">
        <p>
          The consent is a central record, not a private LFI record. Anything the LFI puts on it
          <strong>MUST</strong> be meaningless to any party other than the LFI itself.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdRelatedCards eyebrow="Related articles" title="Read alongside">
      <EdRelatedCard
        href="/knowledge-base/articles/pii-encryption"
        category="Security"
        category-color="var(--at-blue)"
        title="PII Encryption"
        desc="How payment PII is encrypted end-to-end to keep personal data opaque to the hub."
      />
      <EdRelatedCard
        href="/knowledge-base/articles/base-consent-id"
        category="Consents"
        category-color="var(--at-teal)"
        title="Base Consent ID"
        desc="How to link related consents within a TPP's service via consentGroupId."
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

.ed-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-top: 1.5rem;
}
.ed-tag {
  padding: 0.35rem 0.7rem;
  background: color-mix(in srgb, var(--at-teal) 12%, transparent);
  color: var(--at-teal-deep);
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 700;
}
</style>
