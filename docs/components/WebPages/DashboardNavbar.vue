<template>
  <header class="db-navbar">

    <div class="db-navbar__left">
      <button class="db-navbar__menu-btn" @click="$emit('toggle-sidebar')" aria-label="Toggle sidebar">
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

  </header>
</template>

<script setup>
import DashboardFilters from './DashboardFilters.vue'
defineEmits(['toggle-sidebar'])
</script>

<style scoped>
.db-navbar {
  position: sticky;
  top: 4.25rem;
  margin-left: 240px;
  z-index: 30;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.8rem 1.5rem;
  background: var(--at-bg-cream);
  border-bottom: 1px solid var(--at-grid-line);
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

@media (max-width: 900px) {
  .db-navbar {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
    margin-left: 0;
  }
  .db-navbar__menu-btn { display: flex; }
  .db-navbar__right { width: 100%; justify-content: flex-start; }
}
</style>
