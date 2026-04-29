<script lang="ts">
export type EdNoteType = 'tip' | 'info' | 'note' | 'warning' | 'danger' | 'caution' | 'important'
</script>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  type?: EdNoteType
  title?: string
}>(), {
  type: 'tip',
  title: '',
})

const palette: Record<EdNoteType, { color: string; label: string }> = {
  tip:       { color: 'var(--at-teal)',      label: 'Tip' },
  info:      { color: 'var(--at-blue-deep)', label: 'Note' },
  note:      { color: 'var(--at-blue-deep)', label: 'Note' },
  warning:   { color: 'var(--at-gold)',      label: 'Warning' },
  caution:   { color: 'var(--at-gold)',      label: 'Caution' },
  important: { color: 'var(--at-gold)',      label: 'Important' },
  danger:    { color: '#B33A3A',             label: 'Danger' },
}

const accent = computed(() => palette[props.type].color)
const defaultLabel = computed(() => palette[props.type].label)
const displayTitle = computed(() => props.title || defaultLabel.value)
</script>

<template>
  <div class="ed-note" :style="{ '--note-accent': accent }">
    <div class="ed-note__rail" />
    <div class="ed-note__body">
      <div class="ed-note__title">{{ displayTitle }}</div>
      <slot />
    </div>
  </div>
</template>

<style scoped>
.ed-note {
  display: grid;
  grid-template-columns: 4px 1fr;
  background: color-mix(in srgb, var(--note-accent) 6%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  margin: 1.5rem 0;
}
.ed-note__rail { background: var(--note-accent); }
.ed-note__body { padding: 1rem 1.25rem; }
.ed-note__title {
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--note-accent);
  margin-bottom: 0.55rem;
}
.ed-note__body :deep(p) {
  font-family: var(--at-sans);
  font-size: 0.96rem;
  line-height: 1.65;
  color: var(--at-mute-2);
  margin: 0 0 0.65rem;
}
.ed-note__body :deep(p:last-child) { margin-bottom: 0; }
.ed-note__body :deep(strong) { color: var(--at-navy-deep); font-weight: 600; }
.ed-note__body :deep(a) {
  color: var(--at-navy-deep);
  text-decoration: underline;
  text-underline-offset: 3px;
}
.ed-note__body :deep(a:hover) { color: var(--at-teal-deep); }
.ed-note__body :deep(code) {
  font-family: var(--at-mono);
  font-size: 0.86em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  color: var(--at-navy-deep);
  padding: 0.08em 0.4em;
}
</style>
