<script setup lang="ts">
import { ref } from 'vue'
import { SECTORS, type NavSection, type Sector } from '@/data/dashboard-charts'

interface Props {
  sections:      readonly NavSection[]
  activeSection: string
  sector:        Sector
  collapsed?:    boolean
}

withDefaults(defineProps<Props>(), {
  collapsed: false,
})

const emit = defineEmits<{
  (e: 'select', id: string): void
  (e: 'select-sector', id: Sector): void
}>()

const open = ref(false)
let leaveTimer: ReturnType<typeof setTimeout> | null = null

function onEnter(): void {
  if (leaveTimer) { clearTimeout(leaveTimer); leaveTimer = null }
  open.value = true
}
function onLeave(): void {
  if (leaveTimer) clearTimeout(leaveTimer)
  leaveTimer = setTimeout(() => { open.value = false; leaveTimer = null }, 220)
}

function select(id: string): void {
  emit('select', id)
}

function selectSector(id: Sector): void {
  emit('select-sector', id)
}
</script>

<template>
  <aside
    class="db-sidebar"
    :class="{ 'is-open': open, 'is-mobile-open': !collapsed }"
    aria-label="Metrics"
    @mouseenter="onEnter"
    @mouseleave="onLeave"
    @focusin="onEnter"
  >
    <div class="db-sidebar__hit">
      <div class="db-sidebar__rail" aria-hidden="true" />
      <button
        type="button"
        class="db-sidebar__tab"
        :aria-expanded="open"
        aria-controls="db-sidebar-nav"
        tabindex="0"
        @click="onEnter"
        @focus="onEnter"
      >
        <svg width="16" height="14" viewBox="0 0 16 14" aria-hidden="true">
          <path d="M1 1.5h14M1 7h10M1 12.5h14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
        </svg>
        <span class="db-sidebar__tab-text">Sidebar</span>
      </button>
    </div>

    <div id="db-sidebar-nav" class="db-sidebar__drawer">
      <header class="db-sidebar__head">
        <span class="db-sidebar__title">Metrics</span>
      </header>
      <div class="db-sidebar__sectors" role="tablist" aria-label="LFI sector">
        <button
          v-for="s in SECTORS"
          :key="s.id"
          type="button"
          role="tab"
          class="db-sidebar__sector"
          :class="{ 'is-active': sector === s.id }"
          :aria-selected="sector === s.id ? 'true' : 'false'"
          @click="selectSector(s.id)"
        >
          {{ s.label }}
        </button>
      </div>
      <nav class="db-sidebar__nav">
        <ul class="db-sidebar__list">
          <li v-for="group in sections" :key="group.id" class="db-sidebar__group">
            <span class="db-sidebar__group-label">{{ group.label }}</span>
            <ul class="db-sidebar__items">
              <li v-for="item in group.items" :key="item.id">
                <button
                  type="button"
                  class="db-sidebar__item"
                  :class="{ 'is-active': activeSection === item.id }"
                  @click="select(item.id)"
                >
                  {{ item.label }}
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  </aside>
</template>

<style scoped>
.db-sidebar {
  position: fixed;
  top: var(--at-header-height, 4.25rem);
  left: 0;
  bottom: 0;
  width: 36px;
  z-index: 50;
  display: flex;
  align-items: stretch;
  transition: width 0.55s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: auto;
}

.db-sidebar:hover,
.db-sidebar:focus-within,
.db-sidebar.is-open {
  width: 400px;
  transition: width 0.22s cubic-bezier(0.16, 1, 0.3, 1);
}

.db-sidebar__hit {
  flex: 0 0 36px;
  position: relative;
  cursor: pointer;
  transition: flex-basis 0.55s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease;
}
.db-sidebar:hover .db-sidebar__hit,
.db-sidebar:focus-within .db-sidebar__hit,
.db-sidebar.is-open .db-sidebar__hit {
  flex-basis: 0;
  opacity: 0;
  pointer-events: none;
  transition: flex-basis 0.22s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.16s ease;
}

.db-sidebar__rail {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 4px;
  background: var(--at-navy-deep);
}

.db-sidebar__tab {
  position: absolute;
  top: 50%;
  left: 4px;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.7rem 0.9rem 0.7rem 0.7rem;
  background: var(--at-navy-deep);
  color: var(--at-bg-cream);
  border: 0;
  border-radius: 0;
  cursor: pointer;
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 700;
  white-space: nowrap;
  box-shadow: 4px 0 12px color-mix(in srgb, var(--at-navy-deep) 18%, transparent);
  transition: background 0.18s, transform 0.22s cubic-bezier(0.16, 1, 0.3, 1);
}
.db-sidebar__tab:hover { background: var(--at-teal-deep); }
.db-sidebar__tab:focus-visible {
  outline: 2px solid var(--at-teal);
  outline-offset: 2px;
}
.db-sidebar__tab-text { display: inline-block; }

.db-sidebar__drawer {
  flex: 1;
  min-width: 0;
  background: var(--at-bg-cream);
  border-right: 1px solid var(--at-grid-line);
  box-shadow: 6px 0 28px color-mix(in srgb, var(--at-navy-deep) 14%, transparent);
  display: flex;
  flex-direction: column;
  opacity: 0;
  pointer-events: none;
  transform: translateX(-16px);
  transition: opacity 0.4s ease, transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
}
.db-sidebar:hover .db-sidebar__drawer,
.db-sidebar:focus-within .db-sidebar__drawer,
.db-sidebar.is-open .db-sidebar__drawer {
  opacity: 1;
  pointer-events: auto;
  transform: translateX(0);
  transition: opacity 0.22s ease 0.04s, transform 0.26s cubic-bezier(0.16, 1, 0.3, 1);
}

.db-sidebar__head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 1.85rem 2rem 1.25rem;
  border-bottom: 1px solid var(--at-grid-line);
}
.db-sidebar__title {
  font-family: var(--at-serif);
  font-size: 1.3rem;
  font-weight: 600;
  letter-spacing: -0.015em;
  color: var(--at-navy-deep);
}

.db-sidebar__sectors {
  display: flex;
  gap: 0;
  margin: 1.25rem 2rem 0;
  border: 1px solid var(--at-grid-line-2);
}
.db-sidebar__sector {
  flex: 1;
  padding: 0.5rem 0.75rem;
  background: transparent;
  border: 0;
  cursor: pointer;
  font-family: var(--at-mono);
  font-size: 0.66rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--at-mute-2);
  transition: background 0.15s, color 0.15s;
}
.db-sidebar__sector + .db-sidebar__sector {
  border-left: 1px solid var(--at-grid-line-2);
}
.db-sidebar__sector:hover { color: var(--at-navy-deep); }
.db-sidebar__sector.is-active {
  background: var(--at-navy-deep);
  color: var(--at-bg-cream);
}

.db-sidebar__nav {
  flex: 1;
  overflow-y: auto;
  overscroll-behavior: contain;
  padding: 1.25rem 2rem 2.5rem;
}
.db-sidebar__list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.db-sidebar__group {
  list-style: none;
  margin: 0;
}
.db-sidebar__group + .db-sidebar__group {
  margin-top: 0.6rem;
  padding-top: 0.6rem;
  border-top: 1px solid var(--at-grid-line);
}
.db-sidebar__group-label {
  display: block;
  font-family: var(--at-serif);
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: var(--at-navy-deep);
  padding: 0.3rem 0;
}

.db-sidebar__items {
  list-style: none;
  margin: 0 0 0.3rem 0.45rem;
  padding-left: 0.6rem;
  border-left: 1px solid var(--at-grid-line);
}
.db-sidebar__item {
  display: block;
  width: 100%;
  text-align: left;
  background: none;
  border: 0;
  cursor: pointer;
  padding: 0.3rem 0;
  font-family: var(--at-sans);
  font-size: 0.85rem;
  font-weight: 400;
  line-height: 1.4;
  color: var(--at-navy-deep);
  transition: color 0.12s;
}
.db-sidebar__item:hover { color: var(--at-teal-deep); }
.db-sidebar__item.is-active {
  color: var(--at-teal-deep);
  font-weight: 600;
}

.db-sidebar__nav::-webkit-scrollbar { width: 6px; }
.db-sidebar__nav::-webkit-scrollbar-track { background: transparent; }
.db-sidebar__nav::-webkit-scrollbar-thumb {
  background: var(--at-grid-line-2);
  border-radius: 0;
}
.db-sidebar__nav::-webkit-scrollbar-thumb:hover { background: var(--at-mute); }

/* Mobile: hover model is suppressed; the navbar hamburger drives the drawer
   via the `collapsed` prop, with the existing scrim providing dismissal. */
@media (max-width: 959px) {
  .db-sidebar {
    width: calc(100vw - 48px);
    max-width: 420px;
    transform: translateX(-100%);
    opacity: 0;
    pointer-events: none;
    transition: transform 0.25s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.25s;
  }
  .db-sidebar.is-mobile-open {
    transform: translateX(0);
    opacity: 1;
    pointer-events: auto;
    box-shadow: var(--vp-c-shadow-3, 0 12px 32px rgba(0, 0, 0, 0.1));
  }
  .db-sidebar__hit { display: none; }
  .db-sidebar__drawer {
    opacity: 1;
    transform: none;
    pointer-events: auto;
    box-shadow: none;
  }
}
</style>
