<script setup lang="ts">
// Shown on every page under /biopay. The whole space documents a scheme that is
// still under design: no endpoint is published and no schema has an OpenAPI
// document behind it, so the banner is the standing signal that nothing here is
// ratified. Mirrors <DraftVersionBanner>, which plays the same role for release
// candidate versions of the Open Finance standards.
//
// Auto-registered as <BioPayDraftBanner> via unplugin-vue-components.
</script>

<template>
  <div class="bpb" role="note">
    <div class="bpb__inner">
      <span class="bpb__tag">Draft</span>
      <p class="bpb__text">
        Everything in this space is <strong>draft</strong>. Nothing here is ratified, no
        endpoint is published, and the schemas are proposals put here to be reviewed and
        argued with.
      </p>
    </div>
  </div>
</template>

<style scoped>
.bpb {
  border-bottom: 1px solid var(--at-grid-line-2);
  background: #fff8e1;
}

.bpb__inner {
  display: flex;
  /* Centre the tag against the full height of the text block, however many
     lines it wraps to. */
  align-items: center;
  gap: 0.75rem;
  max-width: var(--at-content-max, 1200px);
  margin: 0 auto;
  padding: 0.7rem 1.5rem;
}

.bpb__tag {
  flex-shrink: 0;
  font-family: var(--at-mono);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #7c2d12;
  background: #fde68a;
  padding: 0.2rem 0.5rem;
}

.bpb__text {
  margin: 0;
  font-size: 0.86rem;
  line-height: 1.5;
  color: #7c2d12;
}

@media (max-width: 700px) {
  .bpb__inner {
    padding: 0.6rem 1rem;
  }
}
</style>
