<script lang="ts">
export interface EdInPageNavSection {
  id: string
  label: string
}
</script>

<script setup lang="ts">
withDefaults(defineProps<{
  sections: EdInPageNavSection[]
  label?: string
}>(), {
  label: 'On this page',
})
</script>

<template>
  <nav class="ed-inpage" :aria-label="label">
    <div class="ed-inpage__inner">
      <span class="ed-inpage__label">{{ label }}</span>
      <a v-for="s in sections" :key="s.id" :href="`#${s.id}`" class="ed-inpage__link">
        {{ s.label }}
      </a>
    </div>
  </nav>
</template>

<style scoped>
.ed-inpage {
  position: sticky;
  top: var(--at-header-height);
  z-index: 30;
  background: var(--at-bg-cream);
  border-bottom: 1px solid var(--at-grid-line);
}
.ed-inpage__inner {
  max-width: var(--at-page-max);
  margin: 0 auto;
  padding: 0.85rem 2rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.4rem 1.6rem;
}
.ed-inpage__label {
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--at-mute);
  font-weight: 600;
  margin-right: 0.5rem;
}
.ed-inpage__link {
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--at-navy-deep);
  text-decoration: none;
  transition: color 0.15s;
}
.ed-inpage__link:hover { color: var(--at-teal-deep); }

@media (max-width: 720px) {
  .ed-inpage__inner { padding: 0.7rem 1.25rem; gap: 0.4rem 1rem; }
}
</style>
