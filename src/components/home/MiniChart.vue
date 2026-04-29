<script setup lang="ts">
// Phase 5b-i — pure-SVG sparkline / bar chart, ported from
// `docs/components/WebPages/Components/MiniChart.vue`.
//
// Lives in `components/home/` rather than a generic `charts/` folder because
// today the homepage is its only consumer. If a second top-level page (e.g.
// metrics, news) starts depending on it in a later phase, lift it into
// `components/charts/MiniChart.vue` then.
//
// No chart library — the original was already pure SVG. Both `area` and
// `bars` types are kept intact; HomePage uses `area` exclusively today.

import { computed } from 'vue'

type ChartType = 'area' | 'bars'

interface MiniChartProps {
  data: readonly number[]
  color?: string
  height?: number
  type?: ChartType
}

const props = withDefaults(defineProps<MiniChartProps>(), {
  color: '#00277F',
  height: 60,
  type: 'area',
})

const width = 280

const safeData = computed<readonly number[]>(() =>
  props.data.length ? props.data : [0, 0],
)

const max = computed<number>(() => Math.max(...safeData.value, 1))

const step = computed<number>(() =>
  width / Math.max(safeData.value.length - 1, 1),
)

interface Point {
  x: number
  y: number
}

const points = computed<readonly Point[]>(() =>
  safeData.value.map<Point>((v, i) => ({
    x: i * step.value,
    y: props.height - (v / max.value) * props.height * 0.9 - 2,
  })),
)

const pathD = computed<string>(() =>
  points.value
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
    .join(' '),
)

const areaD = computed<string>(
  () => `${pathD.value} L ${width} ${props.height} L 0 ${props.height} Z`,
)

interface Bar {
  x: number
  y: number
  width: number
  height: number
}

const bars = computed<readonly Bar[]>(() => {
  if (props.type !== 'bars') return []
  const bw = step.value * 0.7
  return safeData.value.map<Bar>((v, i) => ({
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
      <path
        :d="pathD"
        fill="none"
        :stroke="color"
        stroke-width="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </template>
  </svg>
</template>
