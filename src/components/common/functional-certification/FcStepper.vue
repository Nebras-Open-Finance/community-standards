<script setup lang="ts">
// Shared progress bar for the Functional Certification portals (LFI + TPP),
// styled after the standalone portal: full-width numbered steps with a "STEP N"
// kicker + label, square badges (navy = active, teal = done). Only steps already
// reached are clickable; forward movement is driven by the parent's gated Next
// button. Emits `go` with the 1-based step number.
defineProps<{
  steps: string[]
  current: number
}>()

defineEmits<{
  (e: 'go', step: number): void
}>()
</script>

<template>
  <nav class="fc-stepper">
    <button
      v-for="(label, i) in steps"
      :key="label"
      type="button"
      class="fc-step"
      :class="{ 'fc-step--active': current === i + 1, 'fc-step--done': current > i + 1 }"
      :disabled="i + 1 > current"
      @click="$emit('go', i + 1)"
    >
      <span class="fc-step__num">{{ i + 1 }}</span>
      <span class="fc-step__txt">
        <span class="fc-step__kicker">Step {{ i + 1 }}</span>
        <span class="fc-step__label">{{ label }}</span>
      </span>
    </button>
  </nav>
</template>

<style scoped>
.fc-stepper {
  display: flex;
  border-top: 1px solid var(--at-grid-line);
  border-bottom: 1px solid var(--at-grid-line);
  margin: 0 0 2rem;
  overflow-x: auto;
}
.fc-step {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 8px;
  border: none;
  background: none;
  cursor: pointer;
  text-align: left;
  transition: opacity 0.15s;
}
.fc-step:disabled { cursor: default; opacity: 0.55; }
.fc-step__num {
  flex-shrink: 0;
  width: 30px;
  height: 30px;
  border: 1.5px solid var(--at-grid-line-2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--at-mono);
  font-size: 12px;
  font-weight: 700;
  color: var(--at-mute);
  background: var(--at-bg-cream);
  transition: all 0.2s;
}
.fc-step__txt { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
.fc-step__kicker {
  font-family: var(--at-mono);
  font-size: 8.5px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--at-navy);
  opacity: 0.5;
}
.fc-step__label {
  font-size: 12.5px;
  font-weight: 500;
  color: var(--at-mute);
  line-height: 1.2;
  white-space: nowrap;
}
.fc-step--active .fc-step__num { background: var(--at-navy-deep); border-color: var(--at-navy-deep); color: #fff; }
.fc-step--active .fc-step__label { color: var(--at-navy-deep); font-weight: 600; }
.fc-step--done .fc-step__num { background: var(--at-teal); border-color: var(--at-teal); color: #fff; }
.fc-step--done .fc-step__label { color: var(--at-navy-deep); }

@media (max-width: 640px) {
  .fc-step__txt { display: none; }
  .fc-step { flex: 0 0 auto; padding: 14px 12px; }
}
</style>
