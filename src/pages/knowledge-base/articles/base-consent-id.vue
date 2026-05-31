<route lang="yaml">
meta:
  title: "Base Consent ID (consentGroupId) – How to Link Consents"
  description: "How to use a Base Consent ID to link related consents within a TPP's service, and when it applies."
  category: Consents
  readTime: "7 min"
  updated: "2026-04-21"
  tags:
    - Consents
    - Consent Linking
    - consentGroupId
</route>

<script setup lang="ts">

interface Section { id: string; label: string }
interface MetaItem { label: string; value: string }

const sections: Section[] = [
  { id: 'when',    label: 'When' },
  { id: 'summary', label: 'Summary' },
]

const meta: MetaItem[] = [
  { label: 'Category', value: 'Consents' },
  { label: 'Read',     value: '7 min' },
  { label: 'Updated',  value: '21 Apr 2026' },
]

const tags: readonly string[] = ['Consents', 'Consent Linking', 'consentGroupId']
</script>

<template>
  <div class="ed-page">
    <EdBackStrip href="/knowledge-base/" text="All knowledge base articles" />

    <EdHero
      eyebrow="Learn · Understand · Build"
      title="How to Link Consents — Base Consent ID (consentGroupId)"
      :meta="meta"
      lede="The <strong>Base Consent ID</strong> (<code>consentGroupId</code>) is a persistent reference that links related consents within a TPP's service. It allows a common identifier to persist across multiple consents that belong to the same logical group &mdash; initiated by the same user, for the same service. Used to enable a coherent presentation of consent within Consent Management Interfaces (CMIs)."
    >
      <template #lede>
        <div class="ed-tags">
          <span v-for="t in tags" :key="t" class="ed-tag">{{ t }}</span>
        </div>
      </template>
    </EdHero>

    <EdInPageNav :sections="sections" />

    <EdSectionBand
      id="when"
      num="01"
      color="var(--at-teal)"
      eyebrow="When to use"
      title="The four scenarios for a Base Consent ID"
      tone="cream"
    >
      <h3>Consent continuation</h3>
      <EdProse>When a user's consent has <strong>expired</strong> (i.e. the <code>ExpirationDateTime</code> is in the past), but the user wishes to continue using the TPP's service, the TPP must create a new consent (with a new <code>consentId</code>) for the same permissions.</EdProse>
      <EdProse>To maintain continuity, the TPP should set the <strong>original <code>ConsentId</code></strong> as the <code>BaseConsentId</code> for the new consent.</EdProse>

      <EdNote type="warning" title="Important">
        <p>If the original consent already had a <code>BaseConsentId</code>, the TPP <strong>must reuse that same <code>BaseConsentId</code></strong>, not the immediate prior <code>ConsentId</code>. This ensures the entire chain of consents is consistently linked.</p>
      </EdNote>

      <h3>Consent re-establishment after revocation</h3>
      <EdProse>If a user <strong>revokes</strong> consent and later wants to re-establish access to the TPP's services, the TPP should create a new consent with the same permissions.</EdProse>
      <EdProse>As with consent continuation, the TPP should reference the original <code>ConsentId</code> as the <code>BaseConsentId</code> &mdash; or, if applicable, reuse the existing <code>BaseConsentId</code> &mdash; to maintain the logical association.</EdProse>

      <h3>Consent update (permission expansion)</h3>
      <EdProse>Suppose a user originally grants consent with specific permissions (e.g. <code>ReadAccountsBasic</code>, <code>ReadAccountsDetail</code>, <code>ReadBalances</code>), and the TPP later introduces new functionality (e.g. access to <code>ReadDirectDebits</code>). If the user opts in to this expanded scope, the TPP should:</EdProse>
      <EdBullets>
        <li>Create a new consent with the updated set of permissions</li>
        <li>Revoke the old consent</li>
        <li>Link the new consent to the original one by referencing the appropriate <code>BaseConsentId</code></li>
      </EdBullets>

      <h3>User identity consistency</h3>
      <EdProse>It is assumed that all consents linked via a <code>BaseConsentId</code> are associated with the <strong>same end user</strong>. Therefore, if during authentication the LFI determines that the <code>userId</code> associated with a newly submitted consent <strong>differs</strong> from the user who authorised the previous consent in the chain, the LFI <strong>should reject</strong> the new consent.</EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="summary"
      num="02"
      color="var(--at-gold)"
      eyebrow="Summary"
      title="At a glance"
      tone="surface"
    >
      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Scenario</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Consent expired, user continues service</td><td>Set original <code>ConsentId</code> as <code>BaseConsentId</code></td></tr>
            <tr><td>Consent revoked, user re-establishes access</td><td>Set original <code>ConsentId</code> (or existing <code>BaseConsentId</code>) as <code>BaseConsentId</code></td></tr>
            <tr><td>Permissions expanded</td><td>Create new consent, revoke old, link via <code>BaseConsentId</code></td></tr>
            <tr><td>User identity mismatch detected</td><td>LFI rejects the new consent</td></tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdNote type="tip" title="Chain integrity">
        <p>Always trace back to the <strong>root</strong> <code>ConsentId</code> when setting <code>BaseConsentId</code>. Never use the most recent consent in a chain as the <code>BaseConsentId</code> if it already has one &mdash; doing so would break the link back to the original consent.</p>
      </EdNote>
    </EdSectionBand>

    <EdRelatedCards eyebrow="Related articles" title="Read alongside">
      <EdRelatedCard
        href="/knowledge-base/articles/consent-identifiers"
        category="Consents"
        category-color="var(--at-teal)"
        title="Consent Identifiers"
        desc="Why end user and account IDs patched onto a consent must be opaque."
      />
      <EdRelatedCard
        href="/knowledge-base/articles/on-behalf-of"
        category="Consents"
        category-color="var(--at-teal)"
        title="OnBehalfOf"
        desc="When to declare another regulated entity on a data-sharing consent."
      />
    </EdRelatedCards>
  </div>
</template>

<style scoped>
.ed-page { background: var(--at-bg-cream); color: var(--at-navy-deep); font-family: var(--at-sans); padding-top: 4.25rem; }
.ed-tags { display: flex; flex-wrap: wrap; gap: 0.45rem; margin-top: 1.5rem; }
.ed-tag { padding: 0.35rem 0.7rem; background: color-mix(in srgb, var(--at-teal) 12%, transparent); color: var(--at-teal-deep); font-family: var(--at-mono); font-size: 0.62rem; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 700; }
</style>
