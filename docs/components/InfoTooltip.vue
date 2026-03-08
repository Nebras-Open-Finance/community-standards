<template>
  <span class="info-tooltip" :aria-describedby="tooltipId">
    <span class="info-icon" role="img" aria-hidden="true" :style="iconStyle">
      <svg :width="iconSizePx" :height="iconSizePx" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle :stroke="iconColor" cx="8" cy="8" r="6.75" :stroke-width="strokeWidth" vector-effect="non-scaling-stroke" />
        <path d="M8 4.5V4.7" :stroke="iconColor" :stroke-width="strokeWidth" stroke-linecap="round" vector-effect="non-scaling-stroke" />
        <path d="M8 7V11" :stroke="iconColor" :stroke-width="strokeWidth" stroke-linecap="round" vector-effect="non-scaling-stroke" />
      </svg>
    </span>
    <span
      :id="tooltipId"
      class="info-tooltip-content"
      role="tooltip"
      :style="contentStyle"
    >
      <slot />
    </span>
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  maxHeight: {
    type: [Number, String],
    default: 260
  },
  iconColor: {
    type: String,
    default: 'rgba(17, 85, 113, 1)'
  },
  iconSize: {
    type: [Number, String],
    default: 16
  }
})

const uid = Math.random().toString(36).slice(2, 8)
const tooltipId = computed(() => `info-tip-${uid}`)

const iconSizePx = computed(() =>
  typeof props.iconSize === 'number' ? `${props.iconSize}px` : props.iconSize
)

const iconStyle = computed(() => ({
  width: iconSizePx.value,
  height: iconSizePx.value
}))

const strokeWidth = computed(() => {
  const sizeNum = Number(props.iconSize) || 16
  if (sizeNum <= 16) return 1.25
  if (sizeNum <= 24) return 1.5
  if (sizeNum <= 32) return 1.65
  return 1.8
})
</script>

<style scoped>
.info-tooltip {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: help;
}

.info-icon {
  display: inline-flex;
}

.info-tooltip-content {
  position: absolute;
  left: 50%;
  top: calc(100% + 2px);
  transform: translateX(-50%) translateY(-4px);
  min-width: 220px;
  max-width: 360px;
  padding: 10px 12px;
  border: 1px solid rgba(54, 191, 212, 1);
  border-radius: 10px;
  background: rgba(54, 191, 212, 0.8);
  box-shadow: 0 6px 18px rgba(12, 20, 65, 0.12);
  font-family: 'Poppins', system-ui, -apple-system, sans-serif;
  font-size: 12px;
  line-height: 150%;
  color: #0c1441;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.16s ease, transform 0.16s ease, visibility 0.16s ease;
  z-index: 20;
  overflow-y: auto;
}

.info-tooltip:hover .info-tooltip-content,
.info-tooltip:focus-within .info-tooltip-content,
.info-tooltip-content:hover {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) translateY(0);
}
</style>
