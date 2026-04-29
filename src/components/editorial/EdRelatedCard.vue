<script setup lang="ts">
withDefaults(defineProps<{
  href: string
  category?: string
  categoryColor?: string
  title: string
  desc?: string
}>(), {
  category: '',
  categoryColor: 'var(--at-navy)',
  desc: '',
})
</script>

<template>
  <a :href="href" class="ed-relcard" :style="{ '--cat-color': categoryColor }">
    <span class="ed-relcard__top" />
    <span v-if="category" class="ed-relcard__cat">{{ category }}</span>
    <h3 class="ed-relcard__title">{{ title }}</h3>
    <p v-if="desc" class="ed-relcard__desc">{{ desc }}</p>
    <span class="ed-relcard__arrow">&rarr;</span>
  </a>
</template>

<style scoped>
.ed-relcard {
  position: relative;
  display: block;
  padding: 2rem 1.75rem 1.75rem;
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line);
  text-decoration: none;
  color: inherit;
  transition: border-color 0.2s ease, transform 0.2s ease;
}
.ed-relcard:hover {
  border-color: var(--at-navy-deep);
  transform: translateY(-2px);
}
.ed-relcard__top {
  position: absolute;
  top: 0;
  left: 0;
  width: 48px;
  height: 3px;
  background: var(--cat-color);
}
.ed-relcard__cat {
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--cat-color);
  font-weight: 700;
}
.ed-relcard__title {
  font-family: var(--at-serif);
  font-size: 1.25rem;
  font-weight: 500;
  letter-spacing: -0.015em;
  color: var(--at-navy-deep);
  margin: 0.85rem 0 0.65rem;
  line-height: 1.2;
}
.ed-relcard__desc {
  font-family: var(--at-sans);
  font-size: 0.9rem;
  line-height: 1.55;
  color: var(--at-mute-2);
  margin: 0 0 1.25rem;
}
.ed-relcard__arrow {
  font-family: var(--at-mono);
  color: var(--at-mute);
  transition: transform 0.15s, color 0.15s;
}
.ed-relcard:hover .ed-relcard__arrow {
  transform: translateX(4px);
  color: var(--at-navy-deep);
}
</style>
