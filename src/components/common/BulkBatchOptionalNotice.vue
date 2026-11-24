<script setup lang="ts">
// "Optional for LFIs in v2.2" — shown under the title of every LFI Bulk and
// Batch Payments page (OFP-001). One copy, so the wording stays the same on
// each page. Styled as the requirements pages' warning callout.
</script>

<template>
  <div class="bb-optional" role="note">
    <div class="bb-optional__title">Optional for LFIs in v2.2</div>
    <p class="bb-optional__body">
      In v2.2, delivering Bulk and Batch Payments is <strong>optional</strong> for LFIs. An LFI that offers
      them implements the requirements in this section.
    </p>
  </div>
</template>

<style scoped>
.bb-optional {
  --callout-accent: #b08800;
  margin: 1.75rem 0 0;
  max-width: 50rem;
  padding: 1rem 1.15rem;
  border-left: 3px solid var(--callout-accent);
  background: color-mix(in srgb, var(--callout-accent) 8%, var(--at-bg-cream));
}
.bb-optional__title {
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--callout-accent);
  margin-bottom: 0.5rem;
}
.bb-optional__body {
  font-family: var(--at-sans);
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--at-navy-deep);
  margin: 0;
}
.bb-optional__body strong { font-weight: 600; }
</style>
