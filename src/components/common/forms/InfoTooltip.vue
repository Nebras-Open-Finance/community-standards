<script setup lang="ts">
import { computed, useId } from 'vue'

const props = withDefaults(defineProps<{
  iconColor?: string
  iconSize?: number | string
}>(), {
  iconColor: 'var(--at-navy-deep)',
  iconSize: 18,
})

const tooltipId = `info-tip-${useId()}`

const iconSizePx = computed(() =>
  typeof props.iconSize === 'number' ? `${props.iconSize}px` : String(props.iconSize)
)

const iconStyle = computed(() => ({
  width: iconSizePx.value,
  height: iconSizePx.value,
}))

const strokeWidth = computed(() => {
  const n = Number(props.iconSize) || 16
  if (n <= 16) return 1.25
  if (n <= 24) return 1.5
  if (n <= 32) return 1.65
  return 1.8
})
</script>

<template>
  <span class="it" :aria-describedby="tooltipId">
    <span class="it__icon" role="img" aria-hidden="true" :style="iconStyle">
      <svg :width="iconSizePx" :height="iconSizePx" viewBox="0 0 16 16" fill="none">
        <circle :stroke="iconColor" cx="8" cy="8" r="6.75" :stroke-width="strokeWidth" vector-effect="non-scaling-stroke" />
        <path d="M8 4.5V4.7" :stroke="iconColor" :stroke-width="strokeWidth" stroke-linecap="round" vector-effect="non-scaling-stroke" />
        <path d="M8 7V11"   :stroke="iconColor" :stroke-width="strokeWidth" stroke-linecap="round" vector-effect="non-scaling-stroke" />
      </svg>
    </span>

    <span :id="tooltipId" class="it__panel" role="tooltip">
      <slot />
    </span>
  </span>
</template>

<style scoped>
.it {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: help;
}

.it__icon { display: inline-flex; }

.it__panel {
  position: absolute;
  /* Anchor to the right edge of the icon so the panel grows leftward into
     the form area instead of pushing into the gutter. */
  right: 0;
  top: calc(100% + 6px);
  transform: translateY(-4px);
  min-width: 260px;
  max-width: 360px;
  padding: 0.85rem 1rem;
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line-2);
  box-shadow: 0 8px 24px rgba(0, 23, 56, 0.16);
  font-family: var(--at-sans);
  font-size: 0.82rem;
  line-height: 1.55;
  color: var(--at-mute-2);
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.16s ease, transform 0.16s ease, visibility 0.16s ease;
  /* High enough to clear sibling fields' inputs / labels. */
  z-index: 100;
  text-align: left;
}

.it__panel :deep(strong) {
  color: var(--at-navy-deep);
  font-weight: 600;
}
.it__panel :deep(a) {
  color: var(--at-teal-deep);
  text-decoration: underline;
  text-underline-offset: 3px;
}
.it__panel :deep(a:hover) { color: var(--at-navy-deep); }
.it__panel :deep(code) {
  font-family: var(--at-mono);
  font-size: 0.86em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  color: var(--at-navy-deep);
  padding: 0.08em 0.4em;
}

.it:hover .it__panel,
.it:focus-within .it__panel,
.it__panel:hover {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}
</style>
