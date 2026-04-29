<script setup lang="ts">
withDefaults(defineProps<{
  num: string
  title: string
  numColor?: string
}>(), {
  numColor: 'var(--at-navy)',
})
</script>

<template>
  <div class="ed-stage">
    <span class="ed-stage__num" :style="{ color: numColor }">{{ num }}</span>
    <div class="ed-stage__body">
      <h3 class="ed-stage__title">{{ title }}</h3>
      <slot />
    </div>
  </div>
</template>

<style scoped>
.ed-stage {
  display: grid;
  grid-template-columns: 4rem 1fr;
  gap: 1.25rem;
  padding: 1.5rem;
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line);
}
.ed-stage__num {
  font-family: var(--at-serif);
  font-size: 2.25rem;
  font-weight: 600;
  letter-spacing: -0.04em;
  line-height: 1;
}
.ed-stage__title {
  font-family: var(--at-serif);
  font-size: 1.2rem;
  font-weight: 600;
  letter-spacing: -0.015em;
  color: var(--at-navy-deep);
  margin: 0 0 0.55rem;
}
.ed-stage__body :deep(p) {
  font-family: var(--at-sans);
  font-size: 0.96rem;
  line-height: 1.65;
  color: var(--at-mute-2);
  margin: 0 0 0.6rem;
}
.ed-stage__body :deep(p:last-child) { margin-bottom: 0; }
.ed-stage__body :deep(strong) { color: var(--at-navy-deep); font-weight: 600; }
.ed-stage__body :deep(a) {
  color: var(--at-navy-deep);
  text-decoration: underline;
  text-underline-offset: 3px;
}
.ed-stage__body :deep(a:hover) { color: var(--at-teal-deep); }
.ed-stage__body :deep(code) {
  font-family: var(--at-mono);
  font-size: 0.86em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  color: var(--at-navy-deep);
  padding: 0.08em 0.4em;
}

@media (max-width: 640px) {
  .ed-stage { grid-template-columns: 1fr; gap: 0.5rem; padding: 1.25rem; }
  .ed-stage__num { font-size: 1.75rem; }
}
</style>
