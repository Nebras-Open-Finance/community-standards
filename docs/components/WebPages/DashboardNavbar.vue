<template>
  <header class="db-navbar">

    <!-- Left: mobile menu + title -->
    <div class="db-navbar__left">
      <button class="db-navbar__menu-btn" @click="$emit('toggle-sidebar')" aria-label="Toggle sidebar">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
    </div>

    <!-- Right: filters -->
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
  top: 5rem;
  left: 240px;
  z-index: 30;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.7rem 1.5rem;
  flex-wrap: wrap;
}

/* ── Left ──────────────────────────────────────────────────────────────── */
.db-navbar__left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
}

.db-navbar__menu-btn {
  display: none;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: none;
  border: none;
  cursor: pointer;
  color: #64748b;
  border-radius: 6px;
  transition: background 0.15s, color 0.15s;
}

.db-navbar__menu-btn:hover {
  background: #f1f5f9;
  color: #0C1441;
}

.db-navbar__title-wrap {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.db-navbar__eyebrow {
  font-family: 'Poppins', sans-serif;
  font-size: 0.6rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #36BFD4;
  line-height: 1.2;
}

.db-navbar__title {
  font-family: 'Poppins', sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
  color: #0C1441;
  margin: 0;
  line-height: 1.2;
}

/* ── Right ─────────────────────────────────────────────────────────────── */
.db-navbar__right {
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: flex-end;
}

/* ── Responsive ────────────────────────────────────────────────────────── */
@media (max-width: 768px) {
  .db-navbar {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }

  .db-navbar__menu-btn {
    display: flex;
  }

  .db-navbar__right {
    width: 100%;
    justify-content: flex-start;
  }
}
</style>
