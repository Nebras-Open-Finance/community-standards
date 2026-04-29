<script setup lang="ts">
withDefaults(defineProps<{
  label?: string
  color?: string
}>(), {
  label: 'Example',
  color: 'var(--at-blue-deep)',
})
</script>

<template>
  <div class="ed-example" :style="{ '--ex-accent': color }">
    <div class="ed-example__label">{{ label }}</div>
    <div class="ed-example__body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.ed-example {
  background: color-mix(in srgb, var(--ex-accent) 6%, var(--at-bg-cream));
  border-left: 3px solid var(--ex-accent);
  padding: 1.1rem 1.4rem;
  margin: 1.5rem 0;
  max-width: 50rem;
}
.ed-example__label {
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ex-accent);
  font-weight: 700;
  margin-bottom: 0.5rem;
}
.ed-example__body :deep(p) {
  font-family: var(--at-sans);
  font-size: 0.96rem;
  line-height: 1.6;
  color: var(--at-mute-2);
  margin: 0 0 0.65rem;
}
.ed-example__body :deep(p:last-child) { margin-bottom: 0; }
.ed-example__body :deep(strong) { color: var(--at-navy-deep); font-weight: 600; }
.ed-example__body :deep(code) {
  font-family: var(--at-mono);
  font-size: 0.86em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  color: var(--at-navy-deep);
  padding: 0.08em 0.4em;
}
</style>
