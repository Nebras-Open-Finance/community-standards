<script lang="ts">
export interface EdMetaItem {
  label: string
  value: string
}
</script>

<script setup lang="ts">
withDefaults(defineProps<{
  items?: EdMetaItem[]
}>(), {
  items: () => [],
})
</script>

<template>
  <div class="ed-meta">
    <span v-for="item in items" :key="item.label" class="ed-meta__item">
      <span class="ed-meta__label">{{ item.label }}</span>
      <span class="ed-meta__value">{{ item.value }}</span>
    </span>
  </div>
</template>

<style scoped>
.ed-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1.75rem;
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
.ed-meta__item { display: flex; align-items: baseline; gap: 0.5rem; }
.ed-meta__label { color: var(--at-mute); font-weight: 500; }
.ed-meta__value { color: var(--at-navy-deep); font-weight: 700; }

@media (max-width: 640px) {
  .ed-meta { gap: 1rem 1.25rem; }
}
</style>
