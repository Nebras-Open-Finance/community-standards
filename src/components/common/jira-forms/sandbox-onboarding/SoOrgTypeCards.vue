<script setup lang="ts">
// LFI / TPP radio cards. Same radio semantics as SoRadioGroup; option ids are
// `r-orgType-<LFI|TPP>`.

import { nextTick } from 'vue'
import SoFieldError from './SoFieldError.vue'

const props = defineProps<{
  modelValue: string
  /** Documents required per type, shown in each card's footer. */
  docCounts: Record<'LFI' | 'TPP', number>
  error?: string | undefined
}>()

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const OPTIONS = [
  {
    value: 'LFI' as const,
    label: 'Licensed Financial Institution',
    sub: 'Banks and financial institutions that provide data and payment APIs through the API Hub.',
  },
  {
    value: 'TPP' as const,
    label: 'Third Party Provider',
    sub: 'Providers that consume Open Finance APIs to deliver services to customers.',
  },
]

async function onKey(e: KeyboardEvent, i: number): Promise<void> {
  const dir = ['ArrowRight', 'ArrowDown'].includes(e.key) ? 1 : ['ArrowLeft', 'ArrowUp'].includes(e.key) ? -1 : 0
  if (!dir) return
  e.preventDefault()
  const next = OPTIONS[(i + dir + OPTIONS.length) % OPTIONS.length]
  if (!next) return
  emit('update:modelValue', next.value)
  await nextTick()
  document.getElementById(`r-orgType-${next.value}`)?.focus()
}

function tabIndex(value: string, i: number): number {
  const anyChecked = OPTIONS.some((o) => o.value === props.modelValue)
  return value === props.modelValue || (!anyChecked && i === 0) ? 0 : -1
}
</script>

<template>
  <div role="group" aria-labelledby="lbl-orgType" class="so-group so-full">
    <span id="lbl-orgType" class="so-label">Organisation type <span class="so-req" aria-hidden="true">*</span></span>
    <div
      role="radiogroup"
      class="so-orgtype"
      aria-labelledby="lbl-orgType"
      :aria-describedby="error ? 'e-orgType' : undefined"
      aria-required="true"
    >
      <button
        v-for="(o, i) in OPTIONS"
        :id="`r-orgType-${o.value}`"
        :key="o.value"
        type="button"
        role="radio"
        class="so-orgcard"
        :class="{ 'is-checked': o.value === modelValue, 'is-invalid': !!error }"
        :aria-checked="o.value === modelValue"
        :tabindex="tabIndex(o.value, i)"
        @click="emit('update:modelValue', o.value)"
        @keydown="onKey($event, i)"
      >
        <span class="so-orgcard__top">
          <span class="so-orgcard__code">{{ o.value }}</span>
          <span class="so-orgcard__dot" aria-hidden="true"><span /></span>
        </span>
        <span class="so-orgcard__title">{{ o.label }}</span>
        <span class="so-orgcard__sub">{{ o.sub }}</span>
        <span class="so-orgcard__count">{{ docCounts[o.value] }} documents required</span>
      </button>
    </div>
    <SoFieldError v-if="error" id="e-orgType" :message="error" />
  </div>
</template>

<style scoped>
.so-orgtype {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 250px), 1fr));
  gap: 12px;
}
.so-orgcard {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 10px;
  padding: 18px 18px 16px;
  border-radius: 10px;
  border: 1px solid var(--so-input-line);
  background: var(--at-surface);
  text-align: left;
  font-family: var(--at-sans);
  color: var(--so-ink);
  cursor: pointer;
  outline: none;
  transition: background 0.15s, border-color 0.15s;
}
.so-orgcard.is-invalid { border-color: var(--so-error); }
/* 2px selected border without shifting the layout: 1px border + 1px inset ring. */
.so-orgcard.is-checked {
  border-color: var(--at-teal);
  box-shadow: inset 0 0 0 1px var(--at-teal);
  background: rgba(0, 194, 169, 0.06);
}
.so-orgcard:focus-visible { box-shadow: 0 0 0 3px rgba(0, 194, 169, 0.35); }
.so-orgcard.is-checked:focus-visible { box-shadow: inset 0 0 0 1px var(--at-teal), 0 0 0 3px rgba(0, 194, 169, 0.35); }

.so-orgcard__top { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
.so-orgcard__code {
  font-family: var(--at-mono);
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: var(--at-navy);
}
.so-orgcard__dot {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1.5px solid rgba(0, 39, 127, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--at-surface);
}
.so-orgcard__dot > span { width: 10px; height: 10px; border-radius: 50%; }
.so-orgcard.is-checked .so-orgcard__dot { border-color: var(--at-teal-deep); }
.so-orgcard.is-checked .so-orgcard__dot > span { background: var(--at-teal-deep); }

.so-orgcard__title { font-size: 15px; font-weight: 600; line-height: 1.3; }
.so-orgcard__sub { font-size: 13px; line-height: 1.5; color: var(--so-muted); }
.so-orgcard__count {
  margin-top: 2px;
  padding-top: 10px;
  border-top: 1px solid var(--so-line);
  font-family: var(--at-mono);
  font-size: 10.5px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--at-teal-deep);
}
</style>
