<script setup lang="ts">
withDefaults(defineProps<{
  eyebrow?: string
  title?: string
  eyebrowColor?: string
}>(), {
  eyebrow: 'Read alongside',
  title: 'Related policies',
  eyebrowColor: 'var(--at-teal)',
})
</script>

<template>
  <section class="ed-related">
    <div class="ed-related__inner">
      <div class="ed-related__head">
        <div class="ed-related__eyebrow" :style="{ color: eyebrowColor }">
          <span class="ed-related__eyebrow-dash" />
          {{ eyebrow }}
        </div>
        <h2 class="ed-related__title">{{ title }}</h2>
      </div>
      <div class="ed-related__grid">
        <slot />
      </div>
    </div>
  </section>
</template>

<style scoped>
.ed-related {
  background: var(--at-bg-cream);
  border-top: 1px solid var(--at-grid-line);
  padding: 4rem 0 5rem;
}
.ed-related__inner {
  max-width: var(--at-page-max);
  margin: 0 auto;
  padding: 0 2rem;
}
.ed-related__head { margin-bottom: 2rem; }
.ed-related__eyebrow {
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.85rem;
}
.ed-related__eyebrow-dash {
  width: 24px;
  height: 1px;
  background: currentColor;
}
.ed-related__title {
  font-family: var(--at-serif);
  font-size: 1.75rem;
  font-weight: 500;
  letter-spacing: -0.02em;
  color: var(--at-navy-deep);
  margin: 0;
}
.ed-related__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(22.5rem, 1fr));
  gap: 1.25rem;
}

@media (max-width: 720px) {
  .ed-related__inner { padding: 0 1.25rem; }
}
</style>
