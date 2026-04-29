<script setup lang="ts">
import { ref, onMounted } from 'vue'
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

const open = ref(false)
const supportsHover = ref(false)
let leaveTimer: ReturnType<typeof setTimeout> | null = null

onMounted(() => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    supportsHover.value = window.matchMedia('(hover: hover)').matches
  }
})

function onEnter(): void {
  if (leaveTimer) { clearTimeout(leaveTimer); leaveTimer = null }
  open.value = true
}
function onLeave(): void {
  if (leaveTimer) clearTimeout(leaveTimer)
  leaveTimer = setTimeout(() => { open.value = false; leaveTimer = null }, 220)
}
function onHoverEnter(): void {
  if (supportsHover.value) onEnter()
}
function onHoverLeave(): void {
  if (supportsHover.value) onLeave()
}
function onClose(): void {
  if (leaveTimer) { clearTimeout(leaveTimer); leaveTimer = null }
  open.value = false
}
</script>

<template>
  <aside
    class="ed-hsb"
    :class="{ 'is-open': open }"
    :aria-label="title"
    @mouseenter="onHoverEnter"
    @mouseleave="onHoverLeave"
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

    <button
      type="button"
      class="ed-hsb__mobile-toggle"
      :aria-expanded="open"
      :aria-controls="`ed-hsb-nav-${title}`"
      @click="onEnter"
    >
      <svg width="16" height="14" viewBox="0 0 16 14" aria-hidden="true">
        <path d="M1 1.5h14M1 7h10M1 12.5h14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
      </svg>
      <span>Sidebar</span>
    </button>

    <div class="ed-hsb__drawer" :id="`ed-hsb-nav-${title}`">
      <header class="ed-hsb__head">
        <a v-if="rootHref" :href="rootHref" class="ed-hsb__title">{{ title }}</a>
        <span v-else class="ed-hsb__title">{{ title }}</span>
        <button
          type="button"
          class="ed-hsb__close"
          aria-label="Close sidebar"
          @click="onClose"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
          </svg>
        </button>
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

.ed-hsb.is-open {
  width: 520px;
  /* Entering hover = opening — fast */
  transition: width 0.22s cubic-bezier(0.16, 1, 0.3, 1);
}

@media (hover: hover) {
  .ed-hsb:hover,
  .ed-hsb:focus-within {
    width: 520px;
    transition: width 0.22s cubic-bezier(0.16, 1, 0.3, 1);
  }
}

/* ── Hit zone (transparent, just catches the cursor early) ───────────── */
.ed-hsb__hit {
  flex: 0 0 36px;
  position: relative;
  cursor: pointer;
  /* Closing — slow */
  transition: flex-basis 0.55s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease;
}

.ed-hsb.is-open .ed-hsb__hit {
  flex-basis: 0;
  opacity: 0;
  pointer-events: none;
  /* Opening — fast */
  transition: flex-basis 0.22s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.16s ease;
}

@media (hover: hover) {
  .ed-hsb:hover .ed-hsb__hit,
  .ed-hsb:focus-within .ed-hsb__hit {
    flex-basis: 0;
    opacity: 0;
    pointer-events: none;
    transition: flex-basis 0.22s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.16s ease;
  }
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

.ed-hsb.is-open .ed-hsb__drawer {
  opacity: 1;
  pointer-events: auto;
  transform: translateX(0);
  /* Opening — fast */
  transition: opacity 0.22s ease 0.04s, transform 0.26s cubic-bezier(0.16, 1, 0.3, 1);
}

@media (hover: hover) {
  .ed-hsb:hover .ed-hsb__drawer,
  .ed-hsb:focus-within .ed-hsb__drawer {
    opacity: 1;
    pointer-events: auto;
    transform: translateX(0);
    transition: opacity 0.22s ease 0.04s, transform 0.26s cubic-bezier(0.16, 1, 0.3, 1);
  }
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

/* ── Mobile-only toggle + close (hidden on desktop) ──────────────────── */
.ed-hsb__mobile-toggle { display: none; }
.ed-hsb__close { display: none; }

/* ── Mobile: replace left rail with a button under the page header ───── */
@media (max-width: 959px) {
  .ed-hsb.is-open {
    width: min(420px, 88vw);
  }

  .ed-hsb__hit { display: none; }

  .ed-hsb__mobile-toggle {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    position: absolute;
    top: 0.75rem;
    left: 0.75rem;
    padding: 0.55rem 0.85rem;
    background: var(--at-navy-deep);
    color: var(--at-bg-cream);
    border: 0;
    cursor: pointer;
    touch-action: none;
    font-family: var(--at-mono);
    font-size: 0.66rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    font-weight: 700;
    white-space: nowrap;
    box-shadow: 0 4px 12px color-mix(in srgb, var(--at-navy-deep) 18%, transparent);
    transition: background 0.18s, opacity 0.18s;
  }

  .ed-hsb__mobile-toggle:hover { background: var(--at-teal-deep); }

  .ed-hsb__mobile-toggle:focus-visible {
    outline: 2px solid var(--at-teal);
    outline-offset: 2px;
  }

  .ed-hsb.is-open .ed-hsb__mobile-toggle {
    opacity: 0;
    pointer-events: none;
  }

  .ed-hsb__close {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    background: transparent;
    border: 1px solid var(--at-grid-line);
    color: var(--at-navy-deep);
    cursor: pointer;
    touch-action: manipulation;
    flex-shrink: 0;
    transition: background 0.15s, color 0.15s, border-color 0.15s;
  }

  .ed-hsb__close:hover {
    color: var(--at-teal-deep);
    border-color: var(--at-teal-deep);
  }

  .ed-hsb__close:focus-visible {
    outline: 2px solid var(--at-teal);
    outline-offset: 2px;
  }

  .ed-hsb__head {
    align-items: center;
    padding: 1.25rem 1.5rem 1rem;
  }

  .ed-hsb__nav {
    padding: 1rem 1.5rem 2rem;
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
