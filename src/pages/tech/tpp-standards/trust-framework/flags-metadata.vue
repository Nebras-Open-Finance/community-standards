<route lang="yaml">
meta:
  title: Trust Framework — Flags & Meta Data
</route>

<script setup lang="ts">
const flagsExample = `"Flags": {
  "AccountType": [
    "Retail"
  ]
}`

const metadataExample = `"ApiMetadata": {
  "AccountSubType": [
    "CurrentAccount",
    "Savings",
    "CreditCard"
  ],
  "OverLimitFees": "0.01"
}`
</script>

<template>
  <div class="ed-doc">
    <section class="ed-doc__hero">
      <div class="ed-doc__inner">
        <div class="ed-doc__eyebrow">
          <span class="ed-doc__eyebrow-dash" />
          TPP · Trust Framework · LFI Discovery
        </div>
        <h1 class="ed-doc__title">
          Flags &amp; Meta Data
          <span class="ed-doc__read">2 min read</span>
        </h1>
        <p class="ed-doc__lede">
          Flags and API metadata returned alongside <code>/participants</code> let TPPs filter, select, and
          drive business logic on top of the LFIs and API families published in the Trust Framework
          Directory.
        </p>
      </div>
    </section>

    <EdSectionBand
      id="flags"
      num="01"
      color="var(--at-teal)"
      eyebrow="Flags"
      title="Additional attributes on Organisations and Authorisation Servers"
      tone="cream"
    >
      <EdProse>
        Flags provide additional attributes about an Organisation or Authorisation Server within the
        <code>/participants</code> response.
      </EdProse>

      <EdProse>Example:</EdProse>

      <EdCode :code="flagsExample" lang="json" filename="Flags excerpt" />

      <EdProse>
        This example indicates that the Authorisation Server supports Retail account types only.
        Integrators should interpret this as a restriction, meaning non-retail (e.g., corporate or SME)
        account types are not supported by this server.
      </EdProse>

      <EdProse>
        TPPs should use flags to apply filtering and implement business logic decisions during participant
        selection and integration.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="api-metadata"
      num="02"
      color="var(--at-gold)"
      eyebrow="API Meta Data"
      title="Per-API attributes for filtering, fees, and conditional logic"
      tone="surface"
    >
      <EdProse>
        Each <code>ApiResources</code> object may include an <code>ApiMetadata</code> section, which
        provides additional information about the API that TPPs can use for business logic, filtering, or
        display purposes.
      </EdProse>

      <EdProse>Example:</EdProse>

      <EdCode :code="metadataExample" lang="json" filename="ApiMetadata excerpt" />

      <EdProse>
        This example indicates that the account-information API family supports the account subtypes
        <code>CurrentAccount</code>, <code>Savings</code>, and <code>CreditCard</code>, and that data
        sharing fees exceeding the limits as defined in the commercial model will be set at 0.01 AED for
        this API family.
      </EdProse>

      <EdProse>TPPs can leverage <code>ApiMetadata</code> to:</EdProse>

      <EdBullets>
        <li>Filter available APIs by account types or product subtypes.</li>
        <li>Calculate or display applicable data sharing fees to end-users.</li>
        <li>Apply conditional business logic based on API capabilities.</li>
      </EdBullets>
    </EdSectionBand>
  </div>
</template>

<style scoped>
.ed-doc {
  background: var(--at-bg-cream);
  color: var(--at-navy-deep);
  font-family: var(--at-sans);
  padding-top: 4.25rem;
  min-height: 100vh;
}

.ed-doc__hero { background: var(--at-bg-cream); border-bottom: 1px solid var(--at-grid-line); }
.ed-doc__inner { max-width: var(--at-page-max); margin: 0 auto; padding: 4rem 2rem 3rem; }

.ed-doc__eyebrow {
  font-family: var(--at-mono);
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--at-teal);
  margin-bottom: 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.ed-doc__eyebrow-dash { width: 24px; height: 1px; background: currentColor; }

.ed-doc__title {
  font-family: var(--at-serif);
  font-size: clamp(2.25rem, 5vw, 3.6rem);
  font-weight: 600;
  line-height: 1.02;
  letter-spacing: -0.03em;
  margin: 0;
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.85rem;
}
.ed-doc__read {
  font-family: var(--at-mono);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 500;
  color: var(--at-mute);
  align-self: center;
  padding-left: 0.6rem;
  border-left: 1px solid var(--at-grid-line-2);
}

.ed-doc__lede {
  font-family: var(--at-sans);
  font-size: 1.1rem;
  line-height: 1.65;
  margin: 1.75rem 0 0;
  max-width: 50rem;
  color: var(--at-mute-2);
}
.ed-doc__lede :deep(code), .ed-doc__lede code {
  font-family: var(--at-mono);
  font-size: 0.86em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  padding: 0.08em 0.4em;
}

@media (max-width: 720px) {
  .ed-doc__inner { padding: 2.75rem 1.25rem 2rem; }
}
</style>
