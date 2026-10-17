<script setup lang="ts">
// Country-code select + national number in one bordered box.

import { COUNTRY_CODES } from './fields'
import { sanitisePhone } from './validators'

defineProps<{
  id: string
  modelValue: string
  cc: string
  label: string
  placeholder?: string | undefined
  autocomplete?: string | undefined
  invalid: boolean
  describedBy?: string | undefined
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'update:cc': [value: string]
  blur: []
}>()

function onInput(e: Event): void {
  const el = e.target as HTMLInputElement
  const clean = sanitisePhone(el.value)
  // Write back directly: when the cleaned value equals the current model value
  // (a rejected keystroke), Vue has nothing to re-render and the DOM would keep it.
  if (el.value !== clean) el.value = clean
  emit('update:modelValue', clean)
}
</script>

<template>
  <div class="so-input so-phone" :class="{ 'is-invalid': invalid }">
    <div class="so-phone__cc">
      <select
        class="so-phone__select"
        :aria-label="`${label} country code`"
        :value="cc"
        @change="emit('update:cc', ($event.target as HTMLSelectElement).value)"
      >
        <option v-for="c in COUNTRY_CODES" :key="c" :value="c">{{ c }}</option>
      </select>
      <span class="so-phone__chevron" aria-hidden="true" />
    </div>
    <input
      :id="id"
      class="so-phone__num"
      type="tel"
      inputmode="tel"
      :value="modelValue"
      :placeholder="placeholder"
      :autocomplete="autocomplete || 'off'"
      aria-required="true"
      :aria-invalid="invalid"
      :aria-describedby="describedBy"
      @input="onInput"
      @blur="emit('blur')"
    >
  </div>
</template>

<style scoped>
.so-phone {
  display: flex;
  align-items: stretch;
  padding: 0;
  overflow: hidden;
  min-width: 0;
}
.so-phone__cc {
  position: relative;
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  border-right: 1px solid rgba(0, 39, 127, 0.14);
  background: var(--at-bg-cream);
}
.so-phone__select {
  height: 46px;
  margin: 0;
  padding: 0 32px 0 14px;
  border: none;
  border-radius: 0;
  background: transparent;
  font-family: var(--at-mono);
  font-size: 15px;
  color: var(--so-ink);
  outline: none;
  appearance: none;
  -webkit-appearance: none;
  cursor: pointer;
}
.so-phone__chevron {
  position: absolute;
  right: 14px;
  top: 50%;
  width: 7px;
  height: 7px;
  border-right: 1.5px solid var(--so-ink);
  border-bottom: 1.5px solid var(--so-ink);
  transform: translateY(-70%) rotate(45deg);
  pointer-events: none;
}
.so-phone__num {
  flex: 1 1 auto;
  width: 100%;
  min-width: 0;
  height: 46px;
  margin: 0;
  padding: 0 14px;
  border: none;
  background: transparent;
  font-family: var(--at-mono);
  font-size: 15px;
  color: var(--so-ink);
  outline: none;
}
</style>
