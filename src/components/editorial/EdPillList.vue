<script setup lang="ts">
withDefaults(defineProps<{
  items?: string[]
}>(), {
  items: () => [],
})
</script>

<template>
  <ul class="ed-pill-list">
    <li v-for="item in items" :key="item" class="ed-pill"><span>{{ item }}</span></li>
  </ul>
</template>

<style scoped>
.ed-pill-list {
  list-style: none;
  margin: 1.25rem 0 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.ed-pill { display: inline-flex; }
.ed-pill span {
  display: inline-block;
  padding: 0.5rem 0.95rem;
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line);
  font-family: var(--at-mono);
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--at-navy-deep);
}
</style>
