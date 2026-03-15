<template>
  <aside class="db-sidebar" :class="{ 'is-collapsed': collapsed }">

    <!-- Brand row -->
    <div class="db-sidebar__brand">
      <span class="db-sidebar__brand-icon">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="#36BFD4" stroke-width="2"/>
          <path d="M8 12h8M12 8v8" stroke="#36BFD4" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </span>
      <span class="db-sidebar__brand-text">Open Finance</span>
    </div>

    <!-- Navigation -->
    <nav class="db-sidebar__nav">
      <div v-for="group in sections" :key="group.id" class="db-sidebar__group">

        <p class="db-sidebar__group-label">
          <span class="db-sidebar__group-icon">
            <!-- API icon -->
            <svg v-if="group.icon === 'api'" width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
            </svg>
            <!-- Payments icon -->
            <svg v-else-if="group.icon === 'payments'" width="14" height="14" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" stroke-width="2"/>
              <path d="M2 10h20" stroke="currentColor" stroke-width="2"/>
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
const props = defineProps({
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
  padding-top: 6rem;
  width: 240px;
  flex-shrink: 0;
  background: #1e293b;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  height: 100vh;
  overflow-y: auto;
  transition: width 0.2s ease;
  z-index: 10;
}

/* ── Brand ─────────────────────────────────────────────────────────────── */
.db-sidebar__brand {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 1.1rem 1.25rem;
  border-bottom: 1px solid #273549;
}

.db-sidebar__brand-icon {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.db-sidebar__brand-text {
  font-family: 'Poppins', sans-serif;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #f1f5f9;
}

/* ── Nav ───────────────────────────────────────────────────────────────── */
.db-sidebar__nav {
  padding: 0.75rem 0;
  flex: 1;
}

.db-sidebar__group {
  padding: 0 0 0.25rem;
}

.db-sidebar__group + .db-sidebar__group {
  border-top: 1px solid #273549;
  margin-top: 0.25rem;
  padding-top: 0.75rem;
}

.db-sidebar__group-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 0 0.35rem;
  padding: 0 1.25rem;
  font-family: 'Poppins', sans-serif;
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #64748b;
}

.db-sidebar__group-icon {
  display: flex;
  align-items: center;
  color: #64748b;
}

.db-sidebar__group-text {
  flex: 1;
}

/* ── Items ─────────────────────────────────────────────────────────────── */
.db-sidebar__items {
  list-style: none;
  margin: 0;
  padding: 0;
}

.db-sidebar__item {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  width: 100%;
  padding: 0.45rem 1.25rem;
  font-family: 'Poppins', sans-serif;
  font-size: 0.82rem;
  font-weight: 400;
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
  color: #94a3b8;
  border-radius: 0;
  transition: color 0.15s, background 0.15s;
  position: relative;
}

.db-sidebar__item:hover {
  color: #e2e8f0;
  background: rgba(255, 255, 255, 0.04);
}

.db-sidebar__item-dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #475569;
  flex-shrink: 0;
  transition: background 0.15s, transform 0.15s;
}

.db-sidebar__item.is-active {
  color: #36BFD4;
  background: rgba(54, 191, 212, 0.08);
  font-weight: 600;
}

.db-sidebar__item.is-active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 4px;
  bottom: 4px;
  width: 3px;
  border-radius: 0 2px 2px 0;
  background: #36BFD4;
}

.db-sidebar__item.is-active .db-sidebar__item-dot {
  background: #36BFD4;
  transform: scale(1.4);
}

/* ── Responsive ────────────────────────────────────────────────────────── */
@media (max-width: 768px) {
  .db-sidebar {
    display: none;
  }
}
</style>
