<script setup lang="ts">
import { ref } from 'vue'
import EdSidebarItem from './EdSidebarItem.vue'
import type { EdSidebarItemData } from './EdSidebarItem.vue'

withDefaults(defineProps<{
  items: EdSidebarItemData[]
  title?: string
  rootHref?: string
}>(), {
  title: 'Sections',
  rootHref: '',
})

// CSS handles :hover. We add a brief leave-delay so cursor wobble doesn't
// flicker the drawer, and a click handler on the tab so it explicitly opens.
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
</script>

<template>
  <aside
    class="ed-hsb"
    :class="{ 'is-open': open }"
    :aria-label="title"
    @mouseenter="onEnter"
    @mouseleave="onLeave"
    @focusin="onEnter"
  >
    <!-- Wide invisible hit zone catches cursor proximity. Inside it lives the
         visible thin rail and the centred "Sidebar" tab. -->
    <div class="ed-hsb__hit">
      <div class="ed-hsb__rail" aria-hidden="true" />
      <button
        type="button"
        class="ed-hsb__tab"
        :aria-expanded="open"
        :aria-controls="`ed-hsb-nav-${title}`"
        tabindex="0"
        @click="onEnter"
        @focus="onEnter"
      >
        <svg width="16" height="14" viewBox="0 0 16 14" aria-hidden="true">
          <path d="M1 1.5h14M1 7h10M1 12.5h14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
        </svg>
        <span class="ed-hsb__tab-text">Sidebar</span>
      </button>
    </div>

    <div class="ed-hsb__drawer" :id="`ed-hsb-nav-${title}`">
      <header class="ed-hsb__head">
        <a v-if="rootHref" :href="rootHref" class="ed-hsb__title">{{ title }}</a>
        <span v-else class="ed-hsb__title">{{ title }}</span>
      </header>
      <nav class="ed-hsb__nav">
        <ul class="ed-hsb__list">
          <EdSidebarItem
            v-for="(item, i) in items"
            :key="(item.link || item.text || '') + i"
            :item="item"
            :level="0"
          />
        </ul>
      </nav>
    </div>
  </aside>
</template>

<style scoped>
.ed-hsb {
  position: fixed;
  top: var(--at-header-height);
  left: 0;
  bottom: 0;
  width: 36px;            /* invisible hit zone width when collapsed */
  z-index: 50;
  display: flex;
  align-items: stretch;
  /* Default state = closing — slow */
  transition: width 0.55s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: auto;
}

.ed-hsb:hover,
.ed-hsb:focus-within,
.ed-hsb.is-open {
  width: 520px;
  /* Entering hover = opening — fast */
  transition: width 0.22s cubic-bezier(0.16, 1, 0.3, 1);
}

/* ── Hit zone (transparent, just catches the cursor early) ───────────── */
.ed-hsb__hit {
  flex: 0 0 36px;
  position: relative;
  cursor: pointer;
  /* Closing — slow */
  transition: flex-basis 0.55s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease;
}

.ed-hsb:hover .ed-hsb__hit,
.ed-hsb:focus-within .ed-hsb__hit,
.ed-hsb.is-open .ed-hsb__hit {
  flex-basis: 0;
  opacity: 0;
  pointer-events: none;
  /* Opening — fast */
  transition: flex-basis 0.22s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.16s ease;
}

/* Visible thin rail at the very left edge of the hit zone */
.ed-hsb__rail {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 4px;
  background: var(--at-navy-deep);
}

/* "Sidebar" tab centred vertically — primary affordance */
.ed-hsb__tab {
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

.ed-hsb__tab:hover {
  background: var(--at-teal-deep);
}

.ed-hsb__tab:focus-visible {
  outline: 2px solid var(--at-teal);
  outline-offset: 2px;
}

.ed-hsb__tab-text {
  display: inline-block;
}

/* ── Drawer (revealed on hover/focus) ────────────────────────────────── */
.ed-hsb__drawer {
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
  /* Closing — slow */
  transition: opacity 0.4s ease, transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
}

.ed-hsb:hover .ed-hsb__drawer,
.ed-hsb:focus-within .ed-hsb__drawer,
.ed-hsb.is-open .ed-hsb__drawer {
  opacity: 1;
  pointer-events: auto;
  transform: translateX(0);
  /* Opening — fast */
  transition: opacity 0.22s ease 0.04s, transform 0.26s cubic-bezier(0.16, 1, 0.3, 1);
}

.ed-hsb__head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 1.85rem 2.5rem 1.25rem;
  border-bottom: 1px solid var(--at-grid-line);
}

.ed-hsb__title {
  font-family: var(--at-serif);
  font-size: 1.3rem;
  font-weight: 600;
  letter-spacing: -0.015em;
  color: var(--at-navy-deep);
  text-decoration: none;
}
a.ed-hsb__title:hover { color: var(--at-teal-deep); }

.ed-hsb__nav {
  flex: 1;
  overflow-y: auto;
  overscroll-behavior: contain;
  padding: 1.25rem 2.5rem 2.5rem;
}

.ed-hsb__list {
  list-style: none;
  margin: 0;
  padding: 0;
}

/* ── Mobile: hide entirely (PageHeader covers nav) ───────────────────── */
@media (max-width: 959px) {
  .ed-hsb {
    display: none;
  }
}

/* Custom scrollbar (subtle) for the nav */
.ed-hsb__nav::-webkit-scrollbar { width: 6px; }
.ed-hsb__nav::-webkit-scrollbar-track { background: transparent; }
.ed-hsb__nav::-webkit-scrollbar-thumb {
  background: var(--at-grid-line-2);
  border-radius: 0;
}
.ed-hsb__nav::-webkit-scrollbar-thumb:hover { background: var(--at-mute); }
</style>
