<template>
  <p class="ed-prose"><slot /></p>
</template>

<style scoped>
.ed-prose {
  font-family: var(--at-sans);
  font-size: 0.98rem;
  line-height: 1.7;
  color: var(--at-mute-2);
  margin: 0 0 1rem;
  max-width: 50rem;
}
.ed-prose:last-child { margin-bottom: 0; }
.ed-prose :deep(strong) { color: var(--at-navy-deep); font-weight: 600; }
.ed-prose :deep(em) { color: var(--at-navy-deep); }
.ed-prose :deep(a) {
  color: var(--at-navy-deep);
  text-decoration: underline;
  text-underline-offset: 3px;
  text-decoration-thickness: 1px;
  font-weight: 500;
  transition: color 0.15s;
}
.ed-prose :deep(a:hover) { color: var(--at-teal-deep); }
.ed-prose :deep(code) {
  font-family: var(--at-mono);
  font-size: 0.86em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  color: var(--at-navy-deep);
  padding: 0.08em 0.4em;
}
</style>
