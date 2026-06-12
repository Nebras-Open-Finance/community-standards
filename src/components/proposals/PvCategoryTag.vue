<script setup lang="ts">
import { computed } from 'vue'
import { categoryColor } from '@/data/proposals'

const props = defineProps<{ category: string }>()
const color = computed(() => categoryColor(props.category))
</script>

<template>
  <span class="pv-category" :style="{ color }">{{ category }}</span>
</template>

<style scoped>
.pv-category {
  font-family: var(--at-mono);
  font-size: 9px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 600;
}
</style>
