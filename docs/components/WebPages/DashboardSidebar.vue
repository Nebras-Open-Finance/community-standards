<template>
  <aside class="db-sidebar" :class="{ 'is-collapsed': collapsed }">

    <nav class="db-sidebar__nav">
      <p class="db-sidebar__title">Metrics</p>

      <div v-for="group in sections" :key="group.id" class="db-sidebar__group">

        <p class="db-sidebar__group-label">{{ group.label }}</p>

        <ul class="db-sidebar__items">
          <li v-for="item in group.items" :key="item.id">
            <button
              class="db-sidebar__item"
              :class="{ 'is-active': activeSection === item.id }"
              @click="select(item.id)"
            >
              {{ item.label }}
            </button>
          </li>
        </ul>

      </div>
    </nav>

  </aside>
</template>

<script setup>
defineProps({
  sections:      { type: Array,   required: true },
  activeSection: { type: String,  required: true },
  collapsed:     { type: Boolean, default: false },
})
const emit = defineEmits(['select'])

function select(id) {
  emit('select', id)
}
</script>

<style scoped>
/* ── Sidebar shell — matches html.editorial-doc .VPSidebar ──────────────
   Background, position, padding, width all mirror editorial-doc.css L382. */
.db-sidebar {
  width: 449px;
  flex-shrink: 0;
  background: var(--at-bg-cream);
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 4.25rem;
  left: 0;
  height: calc(100vh - 4.25rem);
  overflow-y: auto;
  z-index: 10;
  border-right: 1px solid var(--at-grid-line);
  transition: transform 0.25s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.25s;
}

/* ── Nav (typography, spacing, indent — mirrors editorial sidebar) ────── */
.db-sidebar__nav {
  padding: 1.75rem 1.25rem 2rem 3rem;
  flex: 1;
  font-family: var(--at-sans);
}

.db-sidebar__title {
  font-family: var(--at-serif);
  font-size: 1.55rem;
  font-weight: 600;
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: var(--at-navy-deep);
  margin: 0 0 1.25rem;
  padding-bottom: 0.9rem;
  border-bottom: 1px solid var(--at-grid-line);
}

.db-sidebar__group { padding: 0; }

.db-sidebar__group + .db-sidebar__group { margin-top: 0.9rem; }

.db-sidebar__group-label {
  font-family: var(--at-serif);
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: var(--at-navy-deep);
  line-height: 1.25;
  margin: 0;
  padding: 0.3rem 0 0.45rem;
}

/* ── Items ─────────────────────────────────────────────────────────────── */
.db-sidebar__items {
  list-style: none;
  margin: -0.15rem 0 0;
  padding: 0 0 0 1rem;
  border-left: 1px solid var(--at-grid-line);
}

.db-sidebar__item {
  display: block;
  width: 100%;
  padding: 0.3rem 0;
  font-family: var(--at-sans);
  font-size: 0.88rem;
  font-weight: 500;
  line-height: 1.45;
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--at-navy-deep);
  transition: color 0.15s;
}

.db-sidebar__item:hover { color: var(--at-teal-deep); }

.db-sidebar__item.is-active {
  color: var(--at-teal-deep);
  font-weight: 600;
}

/* ── Mobile drawer (matches editorial @media ≤ 959px) ────────────────── */
@media (max-width: 959px) {
  .db-sidebar {
    width: calc(100vw - 48px);
    max-width: 420px;
    box-shadow: var(--vp-c-shadow-3, 0 12px 32px rgba(0, 0, 0, 0.1));
    transform: translateX(0);
    opacity: 1;
  }
  .db-sidebar.is-collapsed {
    transform: translateX(-100%);
    opacity: 0;
    box-shadow: none;
    pointer-events: none;
  }
  .db-sidebar__nav {
    padding: 1.75rem 1.25rem 2rem 1.75rem;
  }
}
</style>
