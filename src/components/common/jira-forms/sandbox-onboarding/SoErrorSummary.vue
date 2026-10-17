<script setup lang="ts">
// Shown at the top of the form after a failed submit. The parent focuses it
// (id "error-summary"); each link moves focus to its field.

defineProps<{ items: { key: string; label: string; message: string }[] }>()
const emit = defineEmits<{ go: [key: string] }>()
</script>

<template>
  <div id="error-summary" class="so-summary" tabindex="-1" role="alert" aria-labelledby="error-summary-title">
    <h2 id="error-summary-title" class="so-summary__title">
      {{ items.length === 1 ? 'There is 1 problem with this request' : `There are ${items.length} problems with this request` }}
    </h2>
    <p class="so-summary__lede">Fix the items below, then submit again.</p>
    <ul class="so-summary__list">
      <li v-for="i in items" :key="i.key">
        <a href="#" class="so-summary__link" @click.prevent="emit('go', i.key)">{{ i.label }}</a><span class="so-summary__msg"> — {{ i.message }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.so-summary {
  padding: 20px 24px;
  border-radius: 10px;
  background: var(--at-surface);
  border: 1px solid rgba(179, 38, 30, 0.3);
  border-top: 3px solid var(--so-error);
  outline: none;
}
.so-summary__title { margin: 0 0 4px; font-family: var(--at-sans); font-size: 17px; font-weight: 600; color: var(--so-ink); }
.so-summary__lede { margin: 0 0 12px; font-size: 14px; color: var(--so-muted); }
.so-summary__list {
  margin: 0;
  padding: 0 0 0 18px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 14px;
  color: var(--so-error);
}
.so-summary__link { color: var(--so-error); font-weight: 500; text-underline-offset: 2px; }
.so-summary__msg { color: var(--so-muted); }
</style>
