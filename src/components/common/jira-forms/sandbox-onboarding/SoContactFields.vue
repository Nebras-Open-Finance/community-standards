<script setup lang="ts">
// An Organisation Admin's fields: names, Emirates ID, mobile and email.
// Used for the Organisation Admin (§03) and the additional one (§04).

import SoTextField from './SoTextField.vue'
import { CONTACT_INPUTS, fieldDef, type ContactPrefix, type Values } from './fields'

defineProps<{
  prefix: ContactPrefix
  values: Values
  /** The shown error for a key, or ''. */
  err: (key: string) => string
}>()

const emit = defineEmits<{
  set: [key: string, value: string]
  touch: [key: string]
}>()
</script>

<template>
  <div class="so-grid">
    <SoTextField
      v-for="s in CONTACT_INPUTS"
      :key="prefix + s"
      :field-key="prefix + s"
      :def="fieldDef(prefix + s)"
      :model-value="values[prefix + s] || ''"
      :cc="values[`${prefix + s}Cc`]"
      :error="err(prefix + s)"
      @update:model-value="emit('set', prefix + s, $event)"
      @update:cc="emit('set', `${prefix + s}Cc`, $event)"
      @blur="emit('touch', prefix + s)"
    />
  </div>
</template>
