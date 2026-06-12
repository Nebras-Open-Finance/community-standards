<script setup lang="ts">
import { computed } from 'vue'
import { STATUS, type Status } from '@/data/proposals'

const props = withDefaults(
  defineProps<{ status: Status; size?: 'sm' | 'md' }>(),
  { size: 'md' },
)

const meta = computed(() => STATUS[props.status] ?? STATUS.open)
</script>

<template>
  <span
    class="pv-status"
    :class="`pv-status--${size}`"
    :style="{ color: meta.fg, background: meta.bg }"
  >
    <span class="pv-status__dot" :style="{ background: meta.fg }" />
    {{ meta.label }}
  </span>
</template>

<style scoped>
.pv-status {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--at-mono);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 600;
  white-space: nowrap;
}

.pv-status--md { font-size: 10px; padding: 5px 12px; }
.pv-status--sm { font-size: 9px; padding: 3px 9px; }

.pv-status__dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  flex-shrink: 0;
}
</style>
