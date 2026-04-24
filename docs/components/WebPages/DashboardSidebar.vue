<template>
  <aside class="db-sidebar" :class="{ 'is-collapsed': collapsed }">

    <nav class="db-sidebar__nav">
      <div v-for="group in sections" :key="group.id" class="db-sidebar__group">

        <p class="db-sidebar__group-label">
          <span class="db-sidebar__group-icon">
            <svg v-if="group.icon === 'api'" width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
            </svg>
            <svg v-else-if="group.icon === 'payments'" width="14" height="14" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" stroke-width="2"/>
              <path d="M2 10h20" stroke="currentColor" stroke-width="2"/>
            </svg>
            <svg v-else-if="group.icon === 'auth'" width="14" height="14" viewBox="0 0 24 24" fill="none">
              <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" stroke-width="2"/>
              <path d="M8 11V7a4 4 0 118 0v4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </span>
          <span class="db-sidebar__group-text">{{ group.label }}</span>
        </p>

        <ul class="db-sidebar__items">
          <li v-for="item in group.items" :key="item.id">
            <button
              class="db-sidebar__item"
              :class="{ 'is-active': activeSection === item.id }"
              @click="select(item.id)"
            >
              <span class="db-sidebar__item-dot"></span>
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
/* ── Sidebar shell ─────────────────────────────────────────────────────── */
.db-sidebar {
  padding-top: 4.6rem;
  width: 240px;
  flex-shrink: 0;
  background: var(--at-bg-paper);
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  height: 100vh;
  overflow-y: auto;
  transition: width 0.2s ease;
  z-index: 10;
  border-right: 1px solid var(--at-grid-line);
}

/* ── Nav ───────────────────────────────────────────────────────────────── */
.db-sidebar__nav { padding: 6rem 0 2.5rem; flex: 1; }

.db-sidebar__group { padding: 0 0 0.25rem; }

.db-sidebar__group + .db-sidebar__group {
  border-top: 1px solid var(--at-grid-line);
  margin-top: 0.25rem;
  padding-top: 0.75rem;
}

.db-sidebar__group-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 0 0.35rem;
  padding: 0 1.25rem;
  font-family: var(--at-mono);
  font-size: 0.6rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: var(--at-mute);
}

.db-sidebar__group-icon { display: flex; align-items: center; color: inherit; }

.db-sidebar__group-text { flex: 1; }

/* ── Items ─────────────────────────────────────────────────────────────── */
.db-sidebar__items { list-style: none; margin: 0; padding: 0; }

.db-sidebar__item {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  width: 100%;
  padding: 0.5rem 1.25rem;
  font-family: var(--at-sans);
  font-size: 0.83rem;
  font-weight: 400;
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--at-mute-2);
  border-radius: 0;
  transition: color 0.15s, background 0.15s;
  position: relative;
}

.db-sidebar__item:hover {
  color: var(--at-navy-deep);
  background: color-mix(in srgb, var(--at-teal) 8%, transparent);
}

.db-sidebar__item-dot {
  width: 4px;
  height: 4px;
  background: var(--at-grid-line-2);
  flex-shrink: 0;
  transition: background 0.15s, transform 0.15s;
}

.db-sidebar__item.is-active {
  background: rgba(0, 194, 169, 0.08);
  font-weight: 500;
}

.db-sidebar__item.is-active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 4px;
  bottom: 4px;
  width: 3px;
  background: var(--at-teal);
}

.db-sidebar__item.is-active .db-sidebar__item-dot {
  background: var(--at-teal);
  transform: scale(1.4);
}

@media (max-width: 900px) {
  .db-sidebar { display: none; }
}
</style>
