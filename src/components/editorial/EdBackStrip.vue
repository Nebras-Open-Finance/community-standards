<script setup lang="ts">
defineProps<{
  href: string
  text: string
}>()
</script>

<template>
  <section class="ed-backstrip">
    <div class="ed-backstrip__inner">
      <a :href="href" class="ed-backstrip__link">
        <span class="ed-backstrip__arrow">&larr;</span>
        <span class="ed-backstrip__text">{{ text }}</span>
      </a>
    </div>
  </section>
</template>

<style scoped>
.ed-backstrip {
  background: var(--at-surface);
  border-bottom: 1px solid var(--at-grid-line);
}
.ed-backstrip__inner {
  max-width: var(--at-page-max);
  margin: 0 auto;
  padding: 1.85rem 2rem 1.1rem;
}
.ed-backstrip__link {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  text-decoration: none;
  color: var(--at-mute-2);
  font-family: var(--at-mono);
  font-size: 0.68rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 600;
  transition: color 0.15s;
}
.ed-backstrip__link:hover { color: var(--at-navy-deep); }
.ed-backstrip__arrow {
  font-family: var(--at-mono);
  font-size: 0.95rem;
  font-weight: 400;
  transform: translateY(-2px);
  transition: transform 0.15s;
}
.ed-backstrip__link:hover .ed-backstrip__arrow {
  transform: translate(-3px, -2px);
}

@media (max-width: 720px) {
  .ed-backstrip__inner { padding: 1.35rem 1.25rem 0.9rem; }
}
</style>
