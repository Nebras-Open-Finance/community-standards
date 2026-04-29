<script lang="ts">
export interface EdKeyNumItem {
  value: string | number
  unit?: string
  label: string
}
</script>

<script setup lang="ts">
withDefaults(defineProps<{
  items?: EdKeyNumItem[]
}>(), {
  items: () => [],
})
</script>

<template>
  <div v-if="items && items.length" class="ed-keynums">
    <div v-for="(k, i) in items" :key="i" class="ed-keynum">
      <span class="ed-keynum__value">
        {{ k.value }}<span v-if="k.unit" class="ed-keynum__unit">{{ k.unit }}</span>
      </span>
      <span class="ed-keynum__label">{{ k.label }}</span>
    </div>
  </div>
</template>

<style scoped>
.ed-keynums {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
  gap: 1px;
  background: var(--at-grid-line);
  border: 1px solid var(--at-grid-line);
}
.ed-keynum {
  background: var(--at-surface);
  padding: 1.25rem 1.5rem;
}
.ed-keynum__value {
  font-family: var(--at-serif);
  font-size: 2.25rem;
  font-weight: 600;
  line-height: 1;
  color: var(--at-navy-deep);
  letter-spacing: -0.03em;
  display: block;
  margin-bottom: 0.6rem;
}
.ed-keynum__unit {
  font-family: var(--at-mono);
  font-size: 0.85rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  color: var(--at-mute);
  margin-left: 0.25rem;
}
.ed-keynum__label {
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--at-mute-2);
  font-weight: 600;
}
</style>
