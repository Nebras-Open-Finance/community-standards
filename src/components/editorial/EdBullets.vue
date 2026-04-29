<script setup lang="ts">
withDefaults(defineProps<{
  tight?: boolean
  accent?: string
}>(), {
  tight: false,
  accent: 'var(--at-teal)',
})
</script>

<template>
  <ul class="ed-bullets" :class="{ 'ed-bullets--tight': tight }" :style="{ '--bullet-accent': accent }">
    <slot />
  </ul>
</template>

<style scoped>
.ed-bullets {
  list-style: none;
  margin: 0;
  padding: 0;
  max-width: 50rem;
}
.ed-bullets :deep(li) {
  position: relative;
  padding: 0.55rem 0 0.55rem 1.5rem;
  font-family: var(--at-sans);
  font-size: 0.98rem;
  line-height: 1.6;
  color: var(--at-mute-2);
  border-bottom: 1px solid var(--at-grid-line);
}
.ed-bullets :deep(li:last-child) { border-bottom: 0; }
.ed-bullets :deep(li::before) {
  content: '';
  position: absolute;
  left: 0;
  top: 1.05rem;
  width: 0.5rem;
  height: 0.5rem;
  background: var(--bullet-accent);
}
.ed-bullets :deep(strong) { color: var(--at-navy-deep); font-weight: 600; }
.ed-bullets :deep(em) { color: var(--at-navy-deep); font-style: italic; }
.ed-bullets :deep(a) {
  color: var(--at-navy-deep);
  text-decoration: underline;
  text-underline-offset: 3px;
}
.ed-bullets :deep(a:hover) { color: var(--at-teal-deep); }
.ed-bullets :deep(code) {
  font-family: var(--at-mono);
  font-size: 0.86em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  color: var(--at-navy-deep);
  padding: 0.08em 0.4em;
}
.ed-bullets--tight :deep(li) {
  padding: 0.4rem 0 0.4rem 1.5rem;
  font-size: 0.94rem;
}
</style>
