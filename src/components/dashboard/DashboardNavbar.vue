<script setup lang="ts">
// Phase 5b-iii — sticky navbar (dashboard title + filters), ported from
// `docs/components/WebPages/DashboardNavbar.vue`. `DashboardFilters` is
// auto-imported by unplugin-vue-components.

defineEmits<{
  (e: 'toggle-sidebar'): void
}>()
</script>

<template>
  <header class="db-navbar">
    <div class="db-navbar__inner">

      <div class="db-navbar__left">
        <button
          class="db-navbar__menu-btn"
          aria-label="Toggle sidebar"
          @click="$emit('toggle-sidebar')"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
        <div class="db-navbar__title-wrap">
          <span class="db-navbar__eyebrow">§ Metrics</span>
          <h1 class="db-navbar__title">Open Finance Dashboard</h1>
        </div>
      </div>

      <div class="db-navbar__right">
        <DashboardFilters />
      </div>

    </div>
  </header>
</template>

<style scoped>
.db-navbar {
  position: sticky;
  top: 4.25rem;
  z-index: 30;
  background: var(--at-bg-cream);
  border-bottom: 1px solid var(--at-grid-line);
}

/* Inner wrapper aligns navbar content with .db-shell__main (same max-width
   and horizontal padding), while the outer keeps the bg/border full-width. */
.db-navbar__inner {
  max-width: var(--db-page-max, var(--at-page-max));
  margin: 0 auto;
  padding: 0.8rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}

.db-navbar__left {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  flex-shrink: 0;
}

.db-navbar__menu-btn {
  display: none;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: none;
  border: 1px solid var(--at-grid-line-2);
  cursor: pointer;
  color: var(--at-navy-deep);
  border-radius: 0;
  transition: background 0.15s, color 0.15s;
}

.db-navbar__menu-btn:hover {
  background: var(--at-bg-paper);
}

.db-navbar__title-wrap {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.db-navbar__eyebrow {
  font-family: var(--at-mono);
  font-size: 0.6rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: var(--at-teal);
  line-height: 1.2;
}

.db-navbar__title {
  font-family: var(--at-serif);
  font-size: 1.05rem;
  font-weight: 500;
  color: var(--at-navy-deep);
  margin: 0;
  line-height: 1.2;
  letter-spacing: -0.01em;
}

.db-navbar__right {
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: flex-end;
}

@media (max-width: 959px) {
  .db-navbar__inner {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
  .db-navbar__menu-btn { display: flex; }
  .db-navbar__right { width: 100%; justify-content: flex-start; }
}

@media (max-width: 640px) {
  .db-navbar__inner { padding: 0.8rem 1.25rem; }
}
</style>
