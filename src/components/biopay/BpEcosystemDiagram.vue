<script setup lang="ts">
import { computed } from 'vue'

// Who connects to whom. Two variants drawn on the same grid so they read as a
// before/after pair:
//   today  — many TPPs ↔ API Hub ↔ many LFIs.
//   biopay — TPPs and BPIPs side by side ↔ API Hub ↔ many LFIs.
// Every arrow pair terminates at the Hub: no participant connects to another
// directly.
const props = withDefaults(defineProps<{ variant?: 'today' | 'biopay' }>(), {
  variant: 'today',
})

interface Box { x: number; y: number; w: number; h: number; label: string; sub?: string; accent: string }
interface Arrow { x1: number; y1: number; x2: number; y2: number }

const NODE_W = 104
const NODE_H = 36
const ROWS = [16, 76, 136, 196]
const LEFT_X = 16
const RIGHT_X = 360
const HUB: Box = { x: 188, y: 76, w: 104, h: 90, label: 'API Hub', sub: 'Nebras', accent: 'var(--at-blue-deep)' }

type Party = Pick<Box, 'label' | 'sub' | 'accent'>
const TPP: Party = { label: 'TPP', accent: 'var(--at-teal)' }
const BPIP: Party = { label: 'BPIP', sub: 'Acquirer', accent: 'var(--at-gold)' }

// Left column, top to bottom. With BioPay, BPIPs join the TPPs rather than
// replacing them.
const left = computed<Party[]>(() =>
  props.variant === 'biopay' ? [TPP, TPP, BPIP, BPIP] : [TPP, TPP, TPP, TPP],
)

const boxes = computed<Box[]>(() => {
  const out: Box[] = [HUB]
  ROWS.forEach((y, i) => {
    out.push({ x: LEFT_X, y, w: NODE_W, h: NODE_H, ...left.value[i]! })
    out.push({ x: RIGHT_X, y, w: NODE_W, h: NODE_H, label: 'LFI', accent: 'var(--at-navy)' })
  })
  return out
})

// Where row i meets the Hub's edge — spread down the Hub so lines fan in.
function hubY(i: number): number {
  return HUB.y + HUB.h / 2 + (i - (ROWS.length - 1) / 2) * 18
}

// Each connection is a pair: one arrow towards the Hub, one back.
const GAP = 3
function pair(fromX: number, fromY: number, hubX: number, hubYv: number): Arrow[] {
  const dx = hubX - fromX
  const dy = hubYv - fromY
  const len = Math.hypot(dx, dy)
  const nx = (-dy / len) * GAP
  const ny = (dx / len) * GAP
  return [
    { x1: fromX + nx, y1: fromY + ny, x2: hubX + nx, y2: hubYv + ny },
    { x1: hubX - nx, y1: hubYv - ny, x2: fromX - nx, y2: fromY - ny },
  ]
}

const arrows = computed<Arrow[]>(() => {
  const out: Arrow[] = []
  ROWS.forEach((y, i) => {
    const cy = y + NODE_H / 2
    out.push(...pair(LEFT_X + NODE_W, cy, HUB.x, hubY(i)))
    out.push(...pair(RIGHT_X, cy, HUB.x + HUB.w, hubY(i)))
  })
  return out
})

const markerId = computed(() => `bp-eco-arrow-${props.variant}`)
const caption = computed(() =>
  props.variant === 'biopay'
    ? 'With BioPay: TPPs, BPIPs and LFIs, every one connected only to the API Hub.'
    : 'Open Finance today: TPPs and LFIs, every one connected only to the API Hub.',
)
</script>

<template>
  <svg
    class="bp-eco"
    viewBox="0 0 480 272"
    role="img"
    :aria-label="caption"
  >
    <defs>
      <marker
        :id="markerId"
        viewBox="0 0 8 8"
        refX="7"
        refY="4"
        markerWidth="7"
        markerHeight="7"
        orient="auto"
      >
        <path class="bp-eco__head" d="M0,0 L8,4 L0,8 z" />
      </marker>
    </defs>

    <line
      v-for="(a, i) in arrows"
      :key="i"
      class="bp-eco__line"
      :x1="a.x1" :y1="a.y1" :x2="a.x2" :y2="a.y2"
      :marker-end="`url(#${markerId})`"
    />

    <g v-for="(b, i) in boxes" :key="`b${i}`">
      <rect
        class="bp-eco__box"
        :class="{ 'bp-eco__box--hub': b === HUB }"
        :x="b.x" :y="b.y" :width="b.w" :height="b.h"
        :style="{ stroke: b.accent, '--accent': b.accent }"
      />
      <text
        class="bp-eco__label"
        :x="b.x + b.w / 2"
        :y="b.y + b.h / 2 + (b.sub ? -3 : 4)"
      >{{ b.label }}</text>
      <text
        v-if="b.sub"
        class="bp-eco__sub"
        :x="b.x + b.w / 2"
        :y="b.y + b.h / 2 + 11"
      >{{ b.sub }}</text>
    </g>

    <text class="bp-eco__more" :x="LEFT_X + NODE_W / 2" y="256">⋮</text>
    <text class="bp-eco__more" :x="RIGHT_X + NODE_W / 2" y="256">⋮</text>
  </svg>
</template>

<style scoped>
.bp-eco {
  display: block;
  width: 100%;
  height: auto;
}
.bp-eco__line {
  stroke: var(--at-mute);
  stroke-width: 1.1;
}
.bp-eco__head {
  fill: var(--at-mute);
}
.bp-eco__box {
  fill: var(--at-surface);
  stroke-width: 1.5;
}
.bp-eco__box--hub {
  fill: color-mix(in srgb, var(--accent) 12%, var(--at-surface));
  stroke-width: 2.5;
}
.bp-eco__label {
  font-family: var(--at-sans);
  font-size: 13px;
  font-weight: 700;
  fill: var(--at-navy-deep);
  text-anchor: middle;
}
.bp-eco__sub {
  font-family: var(--at-mono);
  font-size: 9px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  fill: var(--at-mute);
  text-anchor: middle;
}
.bp-eco__more {
  font-size: 22px;
  fill: var(--at-mute);
  text-anchor: middle;
}
</style>
