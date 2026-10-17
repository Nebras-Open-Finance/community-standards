<script setup lang="ts">
// One configured field (see fields.ts): text, email, Emirates ID, phone or select.

import SoField from './SoField.vue'
import SoPhoneInput from './SoPhoneInput.vue'
import type { FieldDef } from './fields'
import { formatEid } from './validators'

const props = defineProps<{
  fieldKey: string
  def: FieldDef
  modelValue: string
  /** Country code, phone fields only. */
  cc?: string | undefined
  error: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'update:cc': [value: string]
  blur: []
}>()

function onInput(e: Event): void {
  const el = e.target as HTMLInputElement
  if (props.def.kind !== 'eid') {
    emit('update:modelValue', el.value)
    return
  }
  // See SoPhoneInput: write the formatted value back so rejected characters vanish.
  const formatted = formatEid(el.value)
  if (el.value !== formatted) el.value = formatted
  emit('update:modelValue', formatted)
}
</script>

<template>
  <SoField
    :id="fieldKey"
    :label="def.label"
    :hint="def.hint"
    :hint-below="def.hintBelow"
    :spacer="def.spacer"
    :error="error"
    :full="def.full"
  >
    <template #default="{ describedBy, invalid }">
      <div v-if="def.kind === 'select'" class="so-select-wrap">
        <select
          :id="`f-${fieldKey}`"
          class="so-input so-select"
          :class="{ 'is-invalid': invalid, 'is-empty': !modelValue }"
          :value="modelValue"
          :autocomplete="def.autocomplete"
          aria-required="true"
          :aria-invalid="invalid"
          :aria-describedby="describedBy"
          @change="emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
          @blur="emit('blur')"
        >
          <option value="">{{ def.placeholder }}</option>
          <option v-for="o in def.options" :key="o" :value="o">{{ o }}</option>
        </select>
        <span class="so-chevron" aria-hidden="true" />
      </div>

      <SoPhoneInput
        v-else-if="def.kind === 'phone'"
        :id="`f-${fieldKey}`"
        :model-value="modelValue"
        :cc="cc || '+971'"
        :label="def.label"
        :placeholder="def.placeholder"
        :autocomplete="def.autocomplete"
        :invalid="invalid"
        :described-by="describedBy"
        @update:model-value="emit('update:modelValue', $event)"
        @update:cc="emit('update:cc', $event)"
        @blur="emit('blur')"
      />

      <input
        v-else
        :id="`f-${fieldKey}`"
        class="so-input"
        :class="{ 'is-invalid': invalid, 'so-input--mono': def.kind === 'eid' }"
        :type="def.kind === 'email' ? 'email' : 'text'"
        :inputmode="def.kind === 'eid' ? 'numeric' : def.kind === 'email' ? 'email' : 'text'"
        :value="modelValue"
        :placeholder="def.placeholder"
        :autocomplete="def.autocomplete || 'off'"
        aria-required="true"
        :aria-invalid="invalid"
        :aria-describedby="describedBy"
        @input="onInput"
        @blur="emit('blur')"
      >
    </template>
  </SoField>
</template>
