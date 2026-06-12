<script setup lang="ts">
// Renders a proposal's typed body blocks (p | callout | code | options | ref).
// Paragraphs support inline **bold**.
import type { Block } from '@/data/proposals'

defineProps<{ blocks: Block[] }>()

// Literal keys (matching CalloutBlock['tone']) so `CALLOUT_TONE[b.tone]` is a
// concrete value, not `… | undefined`, under noUncheckedIndexedAccess.
const CALLOUT_TONE: Record<'tip' | 'warning' | 'danger', { accent: string; bg: string }> = {
  tip: { accent: '#00C2A9', bg: 'rgba(0,194,169,0.06)' },
  warning: { accent: '#B37819', bg: 'rgba(179,120,25,0.07)' },
  danger: { accent: '#A6391F', bg: 'rgba(166,57,31,0.05)' },
}

// Split a paragraph into plain / bold segments for **bold** rendering.
function segments(text: string): { bold: boolean; text: string }[] {
  return text
    .split(/(\*\*[^*]+\*\*)/g)
    .filter((s) => s.length > 0)
    .map((seg) =>
      seg.startsWith('**') && seg.endsWith('**')
        ? { bold: true, text: seg.slice(2, -2) }
        : { bold: false, text: seg },
    )
}
</script>

<template>
  <div class="pv-body">
    <template v-for="(b, i) in blocks" :key="i">
      <!-- Paragraph -->
      <p v-if="b.kind === 'p'" class="pv-body__p">
        <template v-for="(seg, j) in segments(b.text)" :key="j">
          <strong v-if="seg.bold" class="pv-body__strong">{{ seg.text }}</strong>
          <template v-else>{{ seg.text }}</template>
        </template>
      </p>

      <!-- Callout -->
      <div
        v-else-if="b.kind === 'callout'"
        class="pv-body__callout"
        :style="{
          background: CALLOUT_TONE[b.tone].bg,
          borderLeftColor: CALLOUT_TONE[b.tone].accent,
        }"
      >
        <div
          class="pv-body__callout-title"
          :style="{ color: CALLOUT_TONE[b.tone].accent }"
        >{{ b.title }}</div>
        <div class="pv-body__callout-text">{{ b.text }}</div>
      </div>

      <!-- Code -->
      <div v-else-if="b.kind === 'code'" class="pv-body__code">
        <div class="pv-body__code-label">{{ b.label }}</div>
        <pre class="pv-body__code-pre">{{ b.text }}</pre>
      </div>

      <!-- Options (A / B columns) -->
      <div
        v-else-if="b.kind === 'options'"
        class="pv-body__options"
        :style="{ gridTemplateColumns: `repeat(${b.items.length}, 1fr)` }"
      >
        <div
          v-for="(o, k) in b.items"
          :key="o.key"
          class="pv-body__option"
          :class="{ 'pv-body__option--cream': k > 0 }"
        >
          <div class="pv-body__option-head">
            <span class="pv-body__option-chip">{{ o.key }}</span>
            <span class="pv-body__option-title">{{ o.title }}</span>
          </div>
          <div class="pv-body__option-desc">{{ o.desc }}</div>
        </div>
      </div>

      <!-- Reference chip -->
      <div v-else-if="b.kind === 'ref'" class="pv-body__ref">
        <span class="pv-body__ref-label">{{ b.text }}</span>
        <span class="pv-body__ref-chip">
          <span class="pv-body__ref-square" />
          {{ b.link }}
          <span class="pv-body__ref-arrow">↗</span>
        </span>
      </div>
    </template>
  </div>
</template>

<style scoped>
.pv-body__p {
  font-size: 16.5px;
  line-height: 1.72;
  color: var(--at-navy);
  margin: 0 0 22px;
  text-wrap: pretty;
}

.pv-body__strong { color: var(--at-navy-deep); font-weight: 600; }

/* Callout */
.pv-body__callout {
  border-left: 4px solid;
  padding: 20px 24px;
  margin: 0 0 26px;
}

.pv-body__callout-title {
  font-family: var(--at-mono);
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 700;
  margin-bottom: 9px;
}

.pv-body__callout-text {
  font-size: 15px;
  line-height: 1.6;
  color: var(--at-navy-deep);
  opacity: 0.92;
}

/* Code */
.pv-body__code {
  margin: 0 0 26px;
  border: 1px solid var(--at-grid-line);
}

.pv-body__code-label {
  font-family: var(--at-mono);
  font-size: 9.5px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--at-navy);
  opacity: 0.6;
  padding: 10px 16px;
  border-bottom: 1px solid var(--at-grid-line);
  background: var(--at-bg-cream);
}

.pv-body__code-pre {
  margin: 0;
  padding: 18px 20px;
  overflow-x: auto;
  background: var(--at-inverse-bg);
  font-family: var(--at-mono);
  font-size: 13px;
  line-height: 1.65;
  color: #d7e4f5;
  white-space: pre;
}

/* Options */
.pv-body__options {
  display: grid;
  gap: 0;
  margin: 0 0 26px;
  border: 1px solid var(--at-grid-line);
}

.pv-body__option {
  padding: 22px;
  background: var(--at-surface);
}

.pv-body__option + .pv-body__option { border-left: 1px solid var(--at-grid-line); }
.pv-body__option--cream { background: var(--at-bg-cream); }

.pv-body__option-head {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.pv-body__option-chip {
  width: 26px;
  height: 26px;
  flex-shrink: 0;
  background: var(--at-navy-deep);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--at-mono);
  font-size: 12px;
  font-weight: 600;
}

.pv-body__option-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--at-navy-deep);
  letter-spacing: -0.01em;
}

.pv-body__option-desc {
  font-size: 13.5px;
  line-height: 1.55;
  color: var(--at-navy);
  opacity: 0.78;
}

/* Reference */
.pv-body__ref {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0 0 26px;
  flex-wrap: wrap;
}

.pv-body__ref-label {
  font-family: var(--at-mono);
  font-size: 9.5px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--at-navy);
  opacity: 0.5;
}

.pv-body__ref-chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--at-navy-deep);
  padding: 8px 14px;
  border: 1px solid var(--at-grid-line);
  background: var(--at-surface);
  font-weight: 500;
}

.pv-body__ref-square {
  width: 6px;
  height: 6px;
  background: var(--at-teal);
  flex-shrink: 0;
}

.pv-body__ref-arrow { opacity: 0.5; }
</style>
