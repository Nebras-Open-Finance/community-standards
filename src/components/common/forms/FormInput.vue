<script setup lang="ts">
import { ref, watch, useId } from 'vue'

const props = withDefaults(defineProps<{
  name?: string
  input?: string | number
  placeholder?: string
  error?: boolean
  type?: string
}>(), {
  name: '',
  input: '',
  placeholder: '',
  error: false,
  type: 'text',
})

const emit = defineEmits<{
  output: [{ data: string | number }]
}>()

const inputId = useId()
const inputEl = ref<HTMLInputElement | null>(null)
const data = ref<string | number>(props.input ?? '')

watch(() => props.input, (v) => { data.value = v ?? '' })
watch(data, (v) => emit('output', { data: v }))

function focusInput() {
  inputEl.value?.focus()
}
</script>

<template>
  <div
    class="fi"
    :class="{
      'fi--has-value': data !== '' && data !== undefined && data !== null,
      'fi--error': error,
    }"
  >
    <input
      :id="inputId"
      ref="inputEl"
      v-model="data"
      :name="name"
      :type="type"
      class="fi__input"
    />
    <label :for="inputId" class="fi__label" @click="focusInput">
      {{ placeholder }}
    </label>
  </div>
</template>

<style scoped>
.fi {
  position: relative;
  display: block;
  width: 100%;
}

.fi__input {
  width: 100%;
  padding: 1.05rem 1rem;
  border: 1px solid var(--at-grid-line-2);
  background: var(--at-surface);
  font-family: var(--at-sans);
  font-size: 1rem;
  line-height: 1.4;
  color: var(--at-navy-deep);
  outline: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.fi__input:focus {
  border-color: var(--at-teal);
  box-shadow: inset 0 -2px 0 var(--at-teal);
}

.fi--error .fi__input {
  border-color: #B33A3A;
}
.fi--error .fi__input:focus {
  box-shadow: inset 0 -2px 0 #B33A3A;
}

/* Chrome autofill paints a yellow / light-blue background on filled inputs.
   Mask it with a white inset shadow and force the text colour to stay navy. */
.fi__input:-webkit-autofill,
.fi__input:-webkit-autofill:hover,
.fi__input:-webkit-autofill:focus,
.fi__input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 1000px var(--at-surface) inset;
  -webkit-text-fill-color: var(--at-navy-deep);
  caret-color: var(--at-navy-deep);
  transition: background-color 9999s ease-out 0s;
}
.fi__input:-webkit-autofill:focus {
  -webkit-box-shadow: 0 0 0 1000px var(--at-surface) inset,
                      inset 0 -2px 0 var(--at-teal);
}
.fi--error .fi__input:-webkit-autofill:focus {
  -webkit-box-shadow: 0 0 0 1000px var(--at-surface) inset,
                      inset 0 -2px 0 #B33A3A;
}

.fi__label {
  position: absolute;
  top: 50%;
  left: 1rem;
  transform: translateY(-50%);
  padding: 0 0.35rem;
  background: transparent;
  font-family: var(--at-sans);
  font-size: 1rem;
  color: var(--at-mute);
  pointer-events: none;
  transition: top 0.15s ease, transform 0.15s ease, font-size 0.15s ease,
              font-family 0.15s ease, color 0.15s ease, letter-spacing 0.15s ease,
              background 0.15s ease;
  cursor: text;
}

.fi__input:focus ~ .fi__label,
.fi--has-value .fi__label {
  top: 0;
  transform: translateY(-50%);
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--at-teal-deep);
  background: var(--at-surface);
  pointer-events: auto;
}

.fi--error .fi__input:focus ~ .fi__label,
.fi--error.fi--has-value .fi__label {
  color: #B33A3A;
}
</style>
