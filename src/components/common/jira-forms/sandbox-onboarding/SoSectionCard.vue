<script setup lang="ts">
// A numbered form section (§ 01 … § 06). Its id is `sec-<id>`, the rail's scroll target.

defineProps<{ id: string; num: string; title: string; description: string }>()
</script>

<template>
  <section :id="`sec-${id}`" :aria-labelledby="`hd-${id}`" class="so-sec">
    <div class="so-sec__head">
      <span class="so-sec__num">§ {{ num }}</span>
      <div class="so-sec__titlerow">
        <h2 :id="`hd-${id}`" class="so-sec__title">{{ title }}</h2>
        <slot name="badge" />
      </div>
      <p class="so-sec__desc">{{ description }}</p>
    </div>
    <slot />
  </section>
</template>

<style scoped>
.so-sec {
  background: var(--at-surface);
  border: 1px solid var(--so-line);
  border-top: 3px solid var(--so-ink);
  border-radius: 10px;
  padding: clamp(20px, 3.5vw, 32px);
  display: flex;
  flex-direction: column;
  gap: 24px;
  scroll-margin-top: 96px;
}
.so-sec__head { display: flex; flex-direction: column; gap: 6px; }
.so-sec__num {
  font-family: var(--at-mono);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.16em;
  color: var(--at-teal-deep);
}
.so-sec__titlerow {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}
.so-sec__title {
  margin: 0;
  font-family: var(--at-serif);
  font-weight: 500;
  font-size: 26px;
  letter-spacing: -0.01em;
  color: var(--so-ink);
}
.so-sec__desc { margin: 0; font-size: 14px; color: var(--so-muted); }
</style>
