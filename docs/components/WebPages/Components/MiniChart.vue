<script setup>
import { computed } from 'vue'

const props = defineProps({
  data:   { type: Array,   required: true },
  color:  { type: String,  default: '#00277F' },
  height: { type: Number,  default: 60 },
  type:   { type: String,  default: 'area' },
})

const width = 280
const safeData = computed(() => (props.data?.length ? props.data : [0, 0]))
const max = computed(() => Math.max(...safeData.value, 1))
const step = computed(() => width / Math.max(safeData.value.length - 1, 1))

const points = computed(() =>
  safeData.value.map((v, i) => [
    i * step.value,
    props.height - (v / max.value) * props.height * 0.9 - 2,
  ])
)

const pathD = computed(() =>
  points.value.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0].toFixed(2)} ${p[1].toFixed(2)}`).join(' ')
)

const areaD = computed(() => `${pathD.value} L ${width} ${props.height} L 0 ${props.height} Z`)

const bars = computed(() => {
  if (props.type !== 'bars') return []
  const bw = step.value * 0.7
  return safeData.value.map((v, i) => ({
    x: i * step.value + (step.value - bw) / 2,
    y: props.height - (v / max.value) * props.height * 0.9,
    width: bw,
    height: (v / max.value) * props.height * 0.9,
  }))
})
</script>

<template>
  <svg
    :viewBox="`0 0 ${width} ${height}`"
    :style="{ width: '100%', height: `${height}px`, display: 'block' }"
    preserveAspectRatio="none"
    role="img"
    :aria-label="`${safeData.length} data points`"
  >
    <template v-if="type === 'bars'">
      <rect
        v-for="(bar, i) in bars"
        :key="i"
        :x="bar.x"
        :y="bar.y"
        :width="bar.width"
        :height="bar.height"
        :fill="color"
        opacity="0.85"
      />
    </template>
    <template v-else>
      <path :d="areaD" :fill="color" opacity="0.12" />
      <path :d="pathD" fill="none" :stroke="color" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
    </template>
  </svg>
</template>
