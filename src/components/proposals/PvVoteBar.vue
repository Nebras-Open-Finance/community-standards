<script setup lang="ts">
// Stacked For/Against/Abstain bar. `compact` is the 8px table variant; the
// default is 14px with a legend and an optional dashed quorum marker.
import { computed } from 'vue'
import { STANCE, STANCE_ORDER } from '@/data/proposals'
import type { Tally } from '@/composables/useProposals'

const props = withDefaults(
  defineProps<{
    counts: Tally['counts']
    compact?: boolean
    // `bare` is a 16px track with no legend (the legend is replaced by the
    // standalone stance tiles in the Cast-your-vote results panel).
    bare?: boolean
    showQuorum?: boolean
    quorum?: number
  }>(),
  { compact: false, bare: false, showQuorum: false, quorum: 0 },
)

const total = computed(() => Math.max(props.counts.total, 1))

const segments = computed(() =>
  STANCE_ORDER.map((stance) => ({
    stance,
    value: props.counts[stance],
    label: STANCE[stance].label,
    bar: STANCE[stance].bar,
    pct: (props.counts[stance] / total.value) * 100,
  })),
)

// Quorum marker position, clamped to the bar width.
const quorumValue = computed(() => props.quorum ?? 0)
const showMarker = computed(() => props.showQuorum && quorumValue.value > 0)
const quorumLeft = computed(() => {
  const denom = Math.max(total.value, quorumValue.value)
  return Math.min((quorumValue.value / denom) * 100, 100)
})
</script>

<template>
  <div class="pv-votebar">
    <div
      class="pv-votebar__track"
      :class="{ 'pv-votebar__track--compact': compact, 'pv-votebar__track--bare': bare }"
    >
      <div
        v-for="seg in segments"
        :key="seg.stance"
        class="pv-votebar__seg"
        :style="{ width: seg.pct + '%', background: seg.bar }"
        :title="`${seg.label}: ${seg.value}`"
      />
      <div
        v-if="showMarker"
        class="pv-votebar__quorum"
        :style="{ left: quorumLeft + '%' }"
      />
    </div>

    <div v-if="!compact && !bare" class="pv-votebar__legend">
      <span v-for="seg in segments" :key="seg.stance" class="pv-votebar__legend-item">
        <span class="pv-votebar__swatch" :style="{ background: seg.bar }" />
        <span class="pv-votebar__count">{{ seg.value }}</span>
        <span class="pv-votebar__legend-label">{{ seg.label }}</span>
      </span>
    </div>
  </div>
</template>

<style scoped>
.pv-votebar { width: 100%; }

.pv-votebar__track {
  display: flex;
  width: 100%;
  height: 14px;
  background: var(--at-bg-paper);
  border: 1px solid var(--at-grid-line);
  position: relative;
  overflow: hidden;
}

.pv-votebar__track--compact { height: 8px; }
.pv-votebar__track--bare { height: 16px; }

.pv-votebar__seg {
  transition: width 0.45s cubic-bezier(0.2, 0.7, 0.2, 1);
}

.pv-votebar__quorum {
  position: absolute;
  top: -3px;
  bottom: -3px;
  width: 0;
  border-left: 2px dashed var(--at-navy-deep);
}

.pv-votebar__legend {
  display: flex;
  gap: 18px;
  margin-top: 10px;
  flex-wrap: wrap;
}

.pv-votebar__legend-item {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 12.5px;
  color: var(--at-navy);
}

.pv-votebar__swatch {
  width: 9px;
  height: 9px;
  flex-shrink: 0;
}

.pv-votebar__count {
  font-family: var(--at-mono);
  font-weight: 600;
  color: var(--at-navy-deep);
}

.pv-votebar__legend-label { opacity: 0.6; }
</style>
