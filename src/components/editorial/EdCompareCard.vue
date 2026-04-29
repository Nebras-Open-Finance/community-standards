<script setup lang="ts">
withDefaults(defineProps<{
  accent?: string
  kicker: string
  example?: string
  cadence?: string
  cadenceLabel?: string
}>(), {
  accent: 'var(--at-navy)',
  example: '',
  cadence: '',
  cadenceLabel: '',
})
</script>

<template>
  <article class="ed-cmpcard" :style="{ '--card-accent': accent }">
    <div class="ed-cmpcard__top" />
    <div class="ed-cmpcard__head">
      <span class="ed-cmpcard__kicker">{{ kicker }}</span>
      <span v-if="example" class="ed-cmpcard__example">{{ example }}</span>
    </div>
    <div v-if="cadence" class="ed-cmpcard__cadence">
      <span class="ed-cmpcard__cadence-num">{{ cadence }}</span>
      <span v-if="cadenceLabel" class="ed-cmpcard__cadence-label">{{ cadenceLabel }}</span>
    </div>
    <div class="ed-cmpcard__body">
      <slot />
    </div>
  </article>
</template>

<style scoped>
.ed-cmpcard {
  position: relative;
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line);
  padding: 2rem 1.75rem 1.75rem;
}
.ed-cmpcard__top {
  position: absolute;
  top: 0;
  left: 0;
  width: 64px;
  height: 3px;
  background: var(--card-accent);
}
.ed-cmpcard__head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.25rem;
}
.ed-cmpcard__kicker {
  font-family: var(--at-serif);
  font-size: 1.4rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--at-navy-deep);
}
.ed-cmpcard__example {
  font-family: var(--at-mono);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--card-accent);
  font-weight: 700;
}
.ed-cmpcard__cadence {
  display: flex;
  align-items: baseline;
  gap: 0.85rem;
  padding: 1rem 1.1rem;
  background: var(--at-bg-cream);
  border-left: 3px solid var(--card-accent);
  margin-bottom: 1.25rem;
}
.ed-cmpcard__cadence-num {
  font-family: var(--at-serif);
  font-size: 1.4rem;
  font-weight: 600;
  letter-spacing: -0.025em;
  color: var(--at-navy-deep);
}
.ed-cmpcard__cadence-label {
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--at-mute);
  font-weight: 600;
}
.ed-cmpcard__body :deep(ul) {
  list-style: none;
  margin: 0;
  padding: 0;
}
.ed-cmpcard__body :deep(li) {
  font-family: var(--at-sans);
  font-size: 0.94rem;
  line-height: 1.6;
  color: var(--at-mute-2);
  padding: 0.65rem 0;
  border-bottom: 1px solid var(--at-grid-line);
}
.ed-cmpcard__body :deep(li:last-child) { border-bottom: 0; }
.ed-cmpcard__body :deep(strong) { color: var(--at-navy-deep); font-weight: 600; }
.ed-cmpcard__body :deep(code) {
  font-family: var(--at-mono);
  font-size: 0.86em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  color: var(--at-navy-deep);
  padding: 0.08em 0.4em;
}
</style>
