<script setup lang="ts">
// Segmented radio group (Yes/No). Buttons with role="radio",
// roving tabindex, arrow keys move and select. Option ids are
// `r-<name>-<value>`, which the error summary uses to focus the group.

import { computed, nextTick } from 'vue'
import SoFieldError from './SoFieldError.vue'

const props = defineProps<{
  name: string
  label: string
  options: { label: string; value: string }[]
  modelValue: string
  hint?: string | undefined
  error?: string | undefined
  required?: boolean | undefined
  controls?: string | undefined
}>()

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const anyChecked = computed(() => props.options.some((o) => o.value === props.modelValue))
const describedBy = computed(
  () => [props.hint ? `h-${props.name}` : '', props.error ? `e-${props.name}` : ''].filter(Boolean).join(' ') || undefined,
)

function optId(value: string): string {
  return `r-${props.name}-${value}`
}

async function onKey(e: KeyboardEvent, i: number): Promise<void> {
  const dir = ['ArrowRight', 'ArrowDown'].includes(e.key) ? 1 : ['ArrowLeft', 'ArrowUp'].includes(e.key) ? -1 : 0
  if (!dir) return
  e.preventDefault()
  const next = props.options[(i + dir + props.options.length) % props.options.length]
  if (!next) return
  emit('update:modelValue', next.value)
  await nextTick()
  document.getElementById(optId(next.value))?.focus()
}
</script>

<template>
  <div role="group" :aria-labelledby="`lbl-${name}`" class="so-group">
    <span :id="`lbl-${name}`" class="so-label">
      {{ label }} <span v-if="required" class="so-req" aria-hidden="true">*</span>
    </span>
    <p v-if="hint" :id="`h-${name}`" class="so-hint">{{ hint }}</p>
    <div
      role="radiogroup"
      class="so-radios"
      :aria-labelledby="`lbl-${name}`"
      :aria-describedby="describedBy"
      :aria-required="required || undefined"
    >
      <button
        v-for="(o, i) in options"
        :id="optId(o.value)"
        :key="o.value"
        type="button"
        role="radio"
        class="so-radio"
        :class="{ 'is-checked': o.value === modelValue, 'is-invalid': !!error }"
        :aria-checked="o.value === modelValue"
        :aria-controls="controls"
        :tabindex="o.value === modelValue || (!anyChecked && i === 0) ? 0 : -1"
        @click="emit('update:modelValue', o.value)"
        @keydown="onKey($event, i)"
      >
        <span class="so-radio__dot" aria-hidden="true"><span /></span>
        {{ o.label }}
      </button>
    </div>
    <SoFieldError v-if="error" :id="`e-${name}`" :message="error" />
  </div>
</template>

<style scoped>
.so-radios {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.so-radio {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 120px;
  min-height: 46px;
  padding: 0 18px;
  border-radius: 8px;
  border: 1px solid var(--so-input-line);
  background: var(--at-surface);
  font-family: var(--at-sans);
  font-size: 14px;
  font-weight: 500;
  color: var(--so-ink);
  cursor: pointer;
  outline: none;
}
.so-radio.is-invalid { border-color: var(--so-error); }
.so-radio.is-checked { border-color: var(--so-ink); background: var(--so-selected); }
.so-radio:focus-visible { box-shadow: 0 0 0 3px rgba(0, 194, 169, 0.35); }

.so-radio__dot {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 1.5px solid rgba(0, 39, 127, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
}
.so-radio__dot > span { width: 8px; height: 8px; border-radius: 50%; }
.so-radio.is-checked .so-radio__dot { border-color: var(--so-ink); }
.so-radio.is-checked .so-radio__dot > span { background: var(--so-ink); }
</style>
