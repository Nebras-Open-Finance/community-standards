<script setup lang="ts">
// A single-file picker styled to match the Document Repository upload control:
// a titled block with a dashed file input, and — once a file is chosen — its
// name + size with a remove control. Emits the File (or null) via v-model.
import { computed } from 'vue'

const props = defineProps<{
  modelValue: File | null
  label: string
  accept?: string
  hint?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', file: File | null): void
}>()

const inputId = `fc-file-${Math.random().toString(36).slice(2, 9)}`

const sizeLabel = computed(() => {
  const f = props.modelValue
  if (!f) return ''
  const mb = f.size / (1024 * 1024)
  if (mb >= 1) return `${mb.toFixed(1)} MB`
  return `${Math.max(1, Math.round(f.size / 1024))} KB`
})

function onChange(e: Event): void {
  const input = e.target as HTMLInputElement
  emit('update:modelValue', input.files?.[0] ?? null)
}

function clear(): void {
  emit('update:modelValue', null)
}
</script>

<template>
  <div class="fc-file">
    <div class="fc-file__head">
      <label class="fc-file__title" :for="inputId">{{ label }}</label>
      <span v-if="hint" class="fc-file__hint">{{ hint }}</span>
    </div>

    <div class="fc-file__row">
      <input
        :id="inputId"
        type="file"
        class="fc-file__input"
        :accept="accept"
        @change="onChange"
      />
      <div v-if="modelValue" class="fc-file__chosen">
        <span class="fc-file__tick">✓</span>
        <span class="fc-file__name">{{ modelValue.name }}</span>
        <span class="fc-file__size">{{ sizeLabel }}</span>
        <button type="button" class="fc-file__remove" @click="clear">Remove</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fc-file {
  margin-bottom: 1rem;
  padding: 1rem 1.1rem;
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line);
  border-left: 3px solid var(--at-teal);
}

.fc-file__head {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.5rem 0.75rem;
  margin-bottom: 0.7rem;
}

.fc-file__title {
  font-family: var(--at-mono);
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-navy-deep);
}

.fc-file__hint {
  font-family: var(--at-sans);
  font-size: 0.82rem;
  color: var(--at-mute);
  line-height: 1.45;
  flex: 1 1 16rem;
}

.fc-file__row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.6rem 0.9rem;
}

.fc-file__input {
  flex: 1;
  min-width: 200px;
  padding: 0.55rem;
  background: var(--at-bg-cream);
  border: 1px dashed var(--at-grid-line-2);
  font-family: var(--at-sans);
  font-size: 0.88rem;
  color: var(--at-navy-deep);
}

.fc-file__chosen {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-wrap: wrap;
}

.fc-file__tick { color: var(--at-teal-deep); font-weight: 700; }

.fc-file__name {
  font-family: var(--at-mono);
  font-size: 0.8rem;
  color: var(--at-navy-deep);
  word-break: break-all;
}

.fc-file__size {
  font-family: var(--at-mono);
  font-size: 0.72rem;
  color: var(--at-mute);
}

.fc-file__remove {
  background: none;
  border: none;
  font-family: var(--at-sans);
  font-size: 0.8rem;
  color: var(--at-navy-deep);
  text-decoration: underline;
  text-underline-offset: 2px;
  cursor: pointer;
}
.fc-file__remove:hover { color: #a6391f; }
</style>
