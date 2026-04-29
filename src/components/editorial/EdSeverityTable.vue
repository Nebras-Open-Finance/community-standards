<script lang="ts">
export interface EdSeverityRow {
  severity: string
  color?: string
  description: string
}
</script>

<script setup lang="ts">
defineProps<{
  rows: EdSeverityRow[]
}>()
</script>

<template>
  <div class="ed-sev">
    <div class="ed-sev__head">
      <span>Severity</span>
      <span>Description</span>
    </div>
    <div v-for="row in rows" :key="row.severity" class="ed-sev__row" :style="{ '--sev-color': row.color || 'var(--at-navy)' }">
      <span class="ed-sev__sev">
        <span class="ed-sev__chip">{{ row.severity }}</span>
      </span>
      <span class="ed-sev__desc" v-html="row.description" />
    </div>
  </div>
</template>

<style scoped>
.ed-sev {
  border: 1px solid var(--at-grid-line);
  background: var(--at-surface);
  margin: 1.5rem 0;
}
.ed-sev__head {
  display: grid;
  grid-template-columns: 8rem 1fr;
  background: var(--at-bg-cream);
  border-bottom: 1px solid var(--at-grid-line);
  padding: 0.75rem 1.25rem;
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--at-mute);
  font-weight: 700;
  gap: 1rem;
}
.ed-sev__row {
  display: grid;
  grid-template-columns: 8rem 1fr;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid var(--at-grid-line);
  gap: 1rem;
  align-items: start;
}
.ed-sev__row:last-child { border-bottom: 0; }
.ed-sev__sev {
  display: flex;
  align-items: flex-start;
}
.ed-sev__chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.35rem 0.7rem;
  background: var(--sev-color);
  color: var(--at-bg-cream);
  font-family: var(--at-mono);
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  font-weight: 700;
  text-transform: uppercase;
}
.ed-sev__desc {
  font-family: var(--at-sans);
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--at-mute-2);
}
.ed-sev__desc :deep(strong) { color: var(--at-navy-deep); font-weight: 600; }
.ed-sev__desc :deep(code) {
  font-family: var(--at-mono);
  font-size: 0.86em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  color: var(--at-navy-deep);
  padding: 0.08em 0.4em;
}

@media (max-width: 640px) {
  .ed-sev__head, .ed-sev__row {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
}
</style>
