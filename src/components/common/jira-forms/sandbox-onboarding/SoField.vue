<script setup lang="ts">
// Label → hint → control → error, with the ids wired for aria-describedby. The
// control goes in the default slot, which receives `describedBy` and `invalid`.

import { computed } from 'vue'
import SoFieldError from './SoFieldError.vue'

const props = defineProps<{
  /** The field key; the control's id must be `f-<id>`. */
  id: string
  label: string
  hint?: string | undefined
  hintBelow?: boolean | undefined
  spacer?: string | undefined
  error?: string | undefined
  full?: boolean | undefined
}>()

const hintId = computed(() => `h-${props.id}`)
const errId = computed(() => `e-${props.id}`)
const describedBy = computed(
  () => [props.hint ? hintId.value : '', props.error ? errId.value : ''].filter(Boolean).join(' ') || undefined,
)
</script>

<template>
  <div class="so-field" :class="{ 'so-full': full }">
    <label :for="`f-${id}`" class="so-label">{{ label }} <span class="so-req" aria-hidden="true">*</span></label>
    <p v-if="hint && !hintBelow" :id="hintId" class="so-hint">{{ hint }}</p>
    <p v-else-if="spacer" class="so-hint so-hint--spacer" aria-hidden="true">{{ spacer }}</p>
    <div class="so-field__control">
      <slot :described-by="describedBy" :invalid="!!error" />
      <p v-if="hint && hintBelow" :id="hintId" class="so-hint">{{ hint }}</p>
      <SoFieldError v-if="error" :id="errId" :message="error" />
    </div>
  </div>
</template>

<style scoped>
.so-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
}
.so-field__control {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
}
</style>
