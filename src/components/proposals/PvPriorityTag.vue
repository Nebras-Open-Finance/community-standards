<script setup lang="ts">
// Priority / impact glyph: three rising signal bars (heights 6/9/12px), the
// first `level` of them filled in the priority colour. `pill` wraps the glyph
// and label in a tinted chip; the default renders glyph + label inline.
import { computed } from 'vue'
import { PRIORITY, type Priority } from '@/data/proposals'

const props = withDefaults(
  defineProps<{ priority: Priority; withLabel?: boolean; size?: 'inline' | 'pill' }>(),
  { withLabel: true, size: 'inline' },
)

const meta = computed(() => PRIORITY[props.priority] ?? PRIORITY.medium)
const bars = [6, 9, 12]
// color-mix tint for the pill background, matching the prototype.
const pillBg = computed(() => `color-mix(in srgb, ${meta.value.color} 12%, transparent)`)
</script>

<template>
  <span class="pv-priority" :class="`pv-priority--${size}`" :style="size === 'pill' ? { background: pillBg } : undefined">
    <span class="pv-priority__bars" aria-hidden="true">
      <span
        v-for="(h, i) in bars"
        :key="i"
        class="pv-priority__bar"
        :style="{ height: h + 'px', background: i < meta.level ? meta.color : 'var(--at-grid-line)' }"
      />
    </span>
    <span
      v-if="withLabel || size === 'pill'"
      class="pv-priority__label"
      :style="{ color: meta.color }"
    >{{ meta.label }}</span>
  </span>
</template>

<style scoped>
.pv-priority {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
}

.pv-priority--pill {
  gap: 7px;
  padding: 4px 10px;
}

.pv-priority__bars {
  display: inline-flex;
  align-items: flex-end;
  gap: 2px;
  height: 12px;
}

.pv-priority__bar {
  width: 3px;
  display: block;
}

.pv-priority__label {
  font-family: var(--at-mono);
  font-size: 9px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 600;
}

.pv-priority--pill .pv-priority__label { font-size: 9.5px; }
</style>
