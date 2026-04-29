<script setup lang="ts">
withDefaults(defineProps<{
  color?: string
}>(), {
  color: 'var(--at-teal)',
})
</script>

<template>
  <div class="ed-callout" :style="{ '--co-accent': color }">
    <div class="ed-callout__rail" />
    <div class="ed-callout__body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.ed-callout {
  display: grid;
  grid-template-columns: 4px 1fr;
  background: var(--at-bg-cream);
  border: 1px solid var(--at-grid-line);
  margin-bottom: 1.5rem;
}
.ed-callout__rail { background: var(--co-accent, var(--at-teal)); }
.ed-callout__body { padding: 1.25rem 1.5rem; }
.ed-callout__body :deep(p) {
  font-family: var(--at-sans);
  font-size: 0.98rem;
  line-height: 1.65;
  color: var(--at-mute-2);
  margin: 0 0 0.85rem;
}
.ed-callout__body :deep(p:last-child) { margin-bottom: 0; }
.ed-callout__body :deep(strong) { color: var(--at-navy-deep); font-weight: 600; }
.ed-callout__body :deep(a) {
  color: var(--at-navy-deep);
  text-decoration: underline;
  text-underline-offset: 3px;
}
.ed-callout__body :deep(a:hover) { color: var(--at-teal-deep); }
.ed-callout__body :deep(code) {
  font-family: var(--at-mono);
  font-size: 0.86em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  color: var(--at-navy-deep);
  padding: 0.08em 0.4em;
}
</style>
