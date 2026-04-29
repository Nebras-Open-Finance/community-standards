<script lang="ts">
export interface EdSidebarItemData {
  text?: string
  link?: string
  collapsed?: boolean
  items?: EdSidebarItemData[]
}
</script>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'

const props = withDefaults(defineProps<{
  item: EdSidebarItemData
  level?: number
}>(), {
  level: 0,
})

// withDefaults wires the runtime fallback, but TS still infers the type as
// `number | undefined` because the prop is declared optional. Pull a narrowed
// const out so template + script can use it without `!` or `?? 0`.
const level = computed(() => props.level ?? 0)

// vue-router's useRoute() returns a reactive object — access route.path
// directly (no .value). Behaviour matches VitePress's useRoute() for our
// purposes: marking an item active when its link matches the current path.
const route = useRoute()

function normalize(p: string): string {
  return p.replace(/\/$/, '')
}

function linkMatches(link: string | undefined): boolean {
  if (!link) return false
  return normalize(route.path ?? '') === normalize(link)
}

function containsActive(item: EdSidebarItemData): boolean {
  if (linkMatches(item.link)) return true
  return Array.isArray(item.items) && item.items.some(containsActive)
}

const isActive = computed(() => linkMatches(props.item.link))
const hasActiveDescendant = computed(() => containsActive(props.item))
const hasChildren = computed(() => Array.isArray(props.item.items) && props.item.items.length > 0)

// Respect the source config's `collapsed` flag for initial state.
// When unset, default groups to open at level 0–1 and collapsed deeper.
const initialLevel = props.level ?? 0
const initialOpen = hasActiveDescendant.value
  ? true
  : props.item.collapsed === false
    ? true
    : props.item.collapsed === true
      ? false
      : initialLevel < 2

const open = ref(initialOpen)

// Re-open the active branch when the route changes — matches VitePress's
// behaviour. User-driven collapse on inactive branches is preserved.
watch(hasActiveDescendant, (active) => {
  if (active) open.value = true
})

// Pure groups (children, no link) toggle on row click. Linked items keep
// the link as the primary action; only the caret toggles for those.
function onRowClick(): void {
  if (hasChildren.value && !props.item.link) {
    open.value = !open.value
  }
}
</script>

<template>
  <li class="ed-sb-item" :class="[`ed-sb-item--level-${level}`, { 'is-active': isActive, 'has-children': hasChildren, 'is-open': open }]">
    <div
      class="ed-sb-item__row"
      :class="{ 'is-row-toggle': hasChildren && !item.link }"
      @click="onRowClick"
    >
      <component
        :is="item.link ? 'a' : 'span'"
        :href="item.link || undefined"
        class="ed-sb-item__label"
        v-html="item.text"
      />
      <button
        v-if="hasChildren"
        type="button"
        class="ed-sb-item__caret"
        :aria-expanded="open"
        :aria-label="open ? 'Collapse' : 'Expand'"
        @click.stop="open = !open"
      >
        <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
          <path :d="open ? 'M2 4 L5 7 L8 4' : 'M3.5 2 L6.5 5 L3.5 8'" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
    </div>
    <ul v-if="hasChildren && open" class="ed-sb-item__children">
      <EdSidebarItem v-for="(child, i) in item.items" :key="(child.link || child.text || '') + i" :item="child" :level="level + 1" />
    </ul>
  </li>
</template>

<style scoped>
.ed-sb-item {
  list-style: none;
  margin: 0;
}

.ed-sb-item__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.4rem;
  padding: 0.3rem 0;
}

.ed-sb-item__row.is-row-toggle {
  cursor: pointer;
}

.ed-sb-item__row.is-row-toggle .ed-sb-item__label {
  cursor: pointer;
}

.ed-sb-item__row.is-row-toggle:hover .ed-sb-item__label {
  color: var(--at-teal-deep);
}

.ed-sb-item__label {
  flex: 1;
  text-decoration: none;
  color: var(--at-navy-deep);
  line-height: 1.4;
  cursor: pointer;
  transition: color 0.12s;
}

.ed-sb-item__label[href]:hover {
  color: var(--at-teal-deep);
}

/* Doubled class boosts specificity so this wins against the per-level
   font/color rules below regardless of source order. */
.ed-sb-item.is-active.is-active > .ed-sb-item__row > .ed-sb-item__label {
  color: var(--at-teal-deep);
  font-weight: 600;
}

.ed-sb-item__caret {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.2rem;
  height: 1.2rem;
  background: transparent;
  border: 0;
  cursor: pointer;
  color: var(--at-mute);
  padding: 0;
}

.ed-sb-item__caret:hover { color: var(--at-navy-deep); }

.ed-sb-item__children {
  list-style: none;
  margin: 0 0 0.3rem 0.45rem;
  padding-left: 0.6rem;
  border-left: 1px solid var(--at-grid-line);
}

/* Type rhythm: titles (level-0 group headers) stand out in serif. Every
   other level — links and nested groups alike — share one regular-weight
   sans treatment. Indentation guides carry the depth signal, not weight. */

.ed-sb-item--level-0 > .ed-sb-item__row > .ed-sb-item__label {
  font-family: var(--at-serif);
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: -0.01em;
}

.ed-sb-item--level-0 + .ed-sb-item--level-0 {
  margin-top: 0.6rem;
  padding-top: 0.6rem;
  border-top: 1px solid var(--at-grid-line);
}

.ed-sb-item:not(.ed-sb-item--level-0) > .ed-sb-item__row > .ed-sb-item__label {
  font-family: var(--at-sans);
  font-size: 0.85rem;
  font-weight: 400;
  color: var(--at-navy-deep);
}
</style>
