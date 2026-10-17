<script setup lang="ts">
// The sticky bar at the foot of a Jira form: a progress line and bar on the
// left, the submit button on the right. Shared so every form's bar looks the
// same. The default slot is the progress text (e.g. "<strong>3 of 5</strong>
// sections complete"); `progress` (0–1) drives the bar. Either place it as the
// last child of the <form>, or render it elsewhere (e.g. teleported below
// JiraFormShell's card) and pass the form's id as `form`. Callers set the
// horizontal bleed with a class, to match their container's padding.

import { computed } from 'vue'

const props = withDefaults(defineProps<{
  progress: number
  submitting?: boolean | undefined
  /** Id of the <form> to submit, when the bar is rendered outside it. */
  form?: string | undefined
}>(), { submitting: false, form: undefined })

const width = computed(() => `${Math.round(Math.min(1, Math.max(0, props.progress)) * 100)}%`)
</script>

<template>
  <div class="jfsb">
    <div class="jfsb__progress">
      <span class="jfsb__text" aria-live="polite"><slot /></span>
      <div class="jfsb__track" aria-hidden="true">
        <div class="jfsb__fill" :style="{ width }" />
      </div>
    </div>
    <button type="submit" class="jfsb__submit" :form="form" :disabled="submitting">
      <template v-if="submitting">Submitting…</template>
      <template v-else>Submit <span aria-hidden="true">→</span></template>
    </button>
  </div>
</template>

<style scoped>
.jfsb {
  position: sticky;
  bottom: 0;
  z-index: 10;
  padding: 14px 24px 18px;
  background: color-mix(in srgb, var(--at-bg-cream) 95%, transparent);
  backdrop-filter: blur(8px);
  border-top: 1px solid rgba(0, 39, 127, 0.1);
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  font-family: var(--at-sans);
}
.jfsb__progress { flex: 1 1 200px; display: flex; flex-direction: column; gap: 7px; min-width: 0; }
.jfsb__text { font-size: 13px; color: var(--at-mute-2); }
.jfsb__text :slotted(strong) { font-weight: 600; color: var(--at-navy-deep); }
.jfsb__track {
  height: 4px;
  max-width: 280px;
  border-radius: 2px;
  background: rgba(0, 39, 127, 0.1);
  overflow: hidden;
}
.jfsb__fill { height: 100%; background: var(--at-gradient); transition: width 0.3s; }

.jfsb__submit {
  margin-left: auto;
  height: 48px;
  padding: 0 26px;
  border-radius: 8px;
  border: none;
  background: var(--at-inverse-bg);
  color: var(--at-inverse-fg);
  font-family: var(--at-sans);
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 10px;
}
.jfsb__submit:hover:not(:disabled) { background: var(--at-navy); }
html.dark .jfsb__submit:hover:not(:disabled) { background: #00277F; }
.jfsb__submit:disabled { opacity: 0.6; cursor: not-allowed; }
.jfsb__submit:focus-visible { outline: 2px solid var(--at-teal); outline-offset: 2px; }
</style>
