<script setup lang="ts">
// Phase 4 — pure presentational notice used inline by the
// "Changes to Published Documentation" policy page (and reusable later).
// No registry coupling: the calling page passes an explicit errata id and url.
//
// Auto-registered as <ErrataNotice> via unplugin-vue-components scanning
// `src/components/`, so no import is needed at the call site.

interface Props {
  affected?: boolean
  errataId?: string
  errataUrl?: string
}

withDefaults(defineProps<Props>(), {
  affected: false,
  errataId: '',
  errataUrl: '',
})
</script>

<template>
  <section
    class="errata-block"
    :class="{ 'errata-affected': affected }"
    role="note"
    aria-live="polite"
  >
    <div v-if="affected && errataId && errataUrl" class="errata-banner">
      <strong>This section has been modified by Errata {{ errataId }}.</strong>
      <a
        :href="errataUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="errata-link"
      >
        View Errata
      </a>
    </div>

    <div class="errata-content">
      <slot />
    </div>
  </section>
</template>

<style scoped>
.errata-block {
  border-left: 4px solid transparent;
  padding: 0.75rem 1rem;
  margin: 1rem 0;
  border-radius: 6px;
}

.errata-affected {
  background: #fff8e1; /* subtle amber shading */
  border-left-color: #f59e0b;
}

.errata-banner {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 0.5rem;
  color: #7c2d12;
}

.errata-link {
  color: #92400e;
  text-decoration: underline;
}

.errata-content {
  color: #1f2937;
}
</style>
