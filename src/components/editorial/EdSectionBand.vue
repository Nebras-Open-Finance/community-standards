<script lang="ts">
export type EdSectionBandTone = 'cream' | 'surface'
</script>

<script setup lang="ts">
withDefaults(defineProps<{
  id?: string
  num?: string
  color?: string
  eyebrow?: string
  title: string
  lede?: string
  tone?: EdSectionBandTone
  narrow?: boolean
}>(), {
  id: '',
  num: '',
  color: 'var(--at-teal)',
  eyebrow: '',
  lede: '',
  tone: 'cream',
  narrow: false,
})
</script>

<template>
  <section
    :id="id || undefined"
    class="ed-band"
    :class="[`ed-band--${tone}`]"
  >
    <div class="ed-band__inner" :class="{ 'ed-band__inner--narrow': narrow }">
      <header class="ed-band__head">
        <div v-if="eyebrow" class="ed-band__eyebrow" :style="{ color, '--eyebrow-tint': color }">
          <span v-if="num" class="ed-band__num">{{ num }}</span>
          {{ eyebrow }}
        </div>
        <h2 class="ed-band__title">{{ title }}</h2>
        <p v-if="lede" class="ed-band__lede" v-html="lede" />
      </header>
      <slot />
    </div>
  </section>
</template>

<style scoped>
.ed-band { padding: 4rem 0; }
.ed-band--cream   { background: var(--at-bg-cream); }
.ed-band--surface {
  background: var(--at-surface);
  border-top: 1px solid var(--at-grid-line);
  border-bottom: 1px solid var(--at-grid-line);
}

.ed-band__inner {
  max-width: var(--at-page-max);
  margin: 0 auto;
  padding: 0 2rem;
}
.ed-band__inner--narrow { max-width: 60rem; }

.ed-band__head { margin-bottom: 2rem; max-width: 52rem; }

.ed-band__eyebrow {
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}
.ed-band__num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 2.1rem;
  height: 1.6rem;
  background: var(--eyebrow-tint, currentColor);
  color: var(--at-bg-cream);
  font-size: 0.7rem;
  letter-spacing: 0.04em;
}

.ed-band__title {
  font-family: var(--at-serif);
  font-size: clamp(1.75rem, 3.5vw, 2.4rem);
  font-weight: 500;
  line-height: 1.1;
  letter-spacing: -0.025em;
  color: var(--at-navy-deep);
  margin: 0;
}

.ed-band__lede {
  font-family: var(--at-sans);
  font-size: 1.05rem;
  line-height: 1.65;
  color: var(--at-mute-2);
  margin: 1rem 0 0;
}
.ed-band__lede :deep(strong) { color: var(--at-navy-deep); font-weight: 600; }
.ed-band__lede :deep(code) {
  font-family: var(--at-mono);
  font-size: 0.86em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  color: var(--at-navy-deep);
  padding: 0.08em 0.4em;
}
.ed-band__lede :deep(a) {
  color: var(--at-navy-deep);
  text-decoration: underline;
  text-underline-offset: 3px;
}
.ed-band__lede :deep(a:hover) { color: var(--at-teal-deep); }

/* Defaults for slotted content */
.ed-band__inner :deep(h3) {
  font-family: var(--at-serif);
  font-size: 1.2rem;
  font-weight: 600;
  letter-spacing: -0.015em;
  color: var(--at-navy-deep);
  margin: 2.25rem 0 0.85rem;
}
.ed-band__inner :deep(h4) {
  font-family: var(--at-sans);
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: var(--at-navy-deep);
  margin: 1.75rem 0 0.55rem;
}
.ed-band__inner :deep(.ed-aside) {
  margin-top: 1.75rem;
  padding-top: 1rem;
  border-top: 1px solid var(--at-grid-line);
  font-family: var(--at-mono);
  font-size: 0.72rem;
  letter-spacing: 0.05em;
  color: var(--at-mute);
  font-style: italic;
  max-width: 50rem;
}

@media (max-width: 720px) {
  .ed-band { padding: 3rem 0; }
  .ed-band__inner { padding: 0 1.25rem; }
}
</style>
