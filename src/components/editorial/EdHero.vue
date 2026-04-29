<script setup lang="ts">
import EdMeta from './EdMeta.vue'
import EdKeyNums from './EdKeyNums.vue'
import type { EdMetaItem } from './EdMeta.vue'
import type { EdKeyNumItem } from './EdKeyNums.vue'

withDefaults(defineProps<{
  eyebrow?: string
  eyebrowColor?: string
  title: string
  meta?: EdMetaItem[]
  lede?: string
  keyNums?: EdKeyNumItem[]
}>(), {
  eyebrow: '',
  eyebrowColor: 'var(--at-teal)',
  meta: () => [],
  lede: '',
  keyNums: () => [],
})
</script>

<template>
  <section class="ed-hero">
    <div class="ed-hero__inner">
      <div v-if="eyebrow" class="ed-hero__eyebrow" :style="{ color: eyebrowColor }">
        <span class="ed-hero__eyebrow-dash" />
        {{ eyebrow }}
      </div>

      <h1 class="ed-hero__title">{{ title }}</h1>

      <EdMeta v-if="meta && meta.length" :items="meta" class="ed-hero__meta" />

      <p v-if="lede" class="ed-hero__lede" v-html="lede" />

      <slot name="lede" />

      <EdKeyNums v-if="keyNums && keyNums.length" :items="keyNums" class="ed-hero__keynums" />

      <slot />
    </div>
  </section>
</template>

<style scoped>
.ed-hero {
  background: var(--at-bg-cream);
  border-bottom: 1px solid var(--at-grid-line);
}
.ed-hero__inner {
  max-width: var(--at-page-max);
  margin: 0 auto;
  padding: 3.5rem 2rem 3rem;
}

.ed-hero__eyebrow {
  font-family: var(--at-mono);
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  margin-bottom: 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 600;
}
.ed-hero__eyebrow-dash {
  width: 24px;
  height: 1px;
  background: currentColor;
}

.ed-hero__title {
  font-family: var(--at-serif);
  font-size: clamp(2.5rem, 5.5vw, 3.75rem);
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.035em;
  margin: 0;
  color: var(--at-navy-deep);
}

.ed-hero__meta { margin-top: 1.75rem; }

.ed-hero__lede {
  font-family: var(--at-serif);
  font-size: 1.25rem;
  line-height: 1.55;
  color: var(--at-navy-deep);
  margin: 1.75rem 0 0;
  max-width: 50rem;
  letter-spacing: -0.005em;
}
.ed-hero__lede :deep(strong) { font-weight: 600; }
.ed-hero__lede :deep(a) {
  color: var(--at-teal-deep);
  text-decoration: underline;
  text-underline-offset: 4px;
}

.ed-hero__keynums { margin-top: 2.5rem; }

@media (max-width: 720px) {
  .ed-hero__inner { padding: 2.5rem 1.25rem 2rem; }
}
</style>
