<script setup lang="ts">
// Checkbox-dropdown filter control for the metrics dashboard. Native
// `<select multiple>` requires ctrl-click and renders as an always-open
// list box, so the filters use this popover instead: a summary button that
// opens a panel of checkboxes. Selection is multi-value — the parent owns
// the list and receives `toggle`/`clear` events.

import { ref, computed, watch, onBeforeUnmount } from 'vue'

const props = defineProps<{
  label:    string
  allLabel: string
  options:  readonly string[]
  selected: readonly string[]
}>()

const emit = defineEmits<{
  (e: 'toggle', value: string): void
  (e: 'clear'): void
}>()

const open = ref(false)
const root = ref<HTMLElement | null>(null)

const summary = computed<string>(() => {
  if (props.selected.length === 0) return props.allLabel
  if (props.selected.length === 1) return props.selected[0] ?? props.allLabel
  return `${props.selected.length} selected`
})

function isChecked(opt: string): boolean {
  return props.selected.includes(opt)
}

function onDocPointer(ev: MouseEvent): void {
  if (root.value && !root.value.contains(ev.target as Node)) open.value = false
}

function onDocKey(ev: KeyboardEvent): void {
  if (ev.key === 'Escape') open.value = false
}

// Listen only while the panel is open — closing on an outside click or Escape.
watch(open, (isOpen) => {
  if (typeof document === 'undefined') return
  if (isOpen) {
    document.addEventListener('mousedown', onDocPointer)
    document.addEventListener('keydown', onDocKey)
  } else {
    document.removeEventListener('mousedown', onDocPointer)
    document.removeEventListener('keydown', onDocKey)
  }
})

onBeforeUnmount(() => {
  if (typeof document === 'undefined') return
  document.removeEventListener('mousedown', onDocPointer)
  document.removeEventListener('keydown', onDocKey)
})
</script>

<template>
  <div ref="root" class="db-ms" :class="{ 'is-open': open }">
    <button
      type="button"
      class="db-ms__button"
      :class="{ 'is-active': selected.length > 0 }"
      :aria-expanded="open"
      @click="open = !open"
    >
      <span class="db-ms__summary">{{ summary }}</span>
      <svg class="db-ms__chevron" width="10" height="6" viewBox="0 0 10 6" fill="none">
        <path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
    </button>

    <div v-if="open" class="db-ms__panel">
      <button
        v-if="selected.length"
        type="button"
        class="db-ms__clear"
        @click="emit('clear')"
      >
        Clear {{ label }}
      </button>
      <ul class="db-ms__list">
        <li v-for="opt in options" :key="opt">
          <label class="db-ms__option">
            <input
              type="checkbox"
              class="db-ms__checkbox"
              :checked="isChecked(opt)"
              @change="emit('toggle', opt)"
            >
            <span class="db-ms__option-label">{{ opt }}</span>
          </label>
        </li>
        <li v-if="!options.length" class="db-ms__empty">No options</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.db-ms {
  position: relative;
}

.db-ms__button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  width: 100%;
  min-width: 130px;
  padding: 0.35rem 0.65rem;
  font-family: var(--at-sans);
  font-size: 0.78rem;
  text-align: left;
  border: 1px solid var(--at-grid-line-2);
  border-radius: 0;
  background: var(--at-surface);
  color: var(--at-navy-deep);
  cursor: pointer;
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;
}

.db-ms__button:focus-visible,
.db-ms.is-open .db-ms__button {
  border-color: var(--at-teal);
  box-shadow: 0 0 0 3px rgba(0, 194, 169, 0.15);
}

.db-ms__button.is-active {
  border-color: var(--at-teal);
}

.db-ms__summary {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.db-ms__chevron {
  flex-shrink: 0;
  color: var(--at-mute);
  transition: transform 0.15s;
}

.db-ms.is-open .db-ms__chevron {
  transform: rotate(180deg);
}

/* ── Panel ────────────────────────────────────────────────────────────── */
.db-ms__panel {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  z-index: 40;
  min-width: 100%;
  max-width: 240px;
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line-2);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
}

.db-ms__clear {
  display: block;
  width: 100%;
  padding: 0.4rem 0.65rem;
  font-family: var(--at-mono);
  font-size: 0.6rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  text-align: left;
  border: none;
  border-bottom: 1px solid var(--at-grid-line);
  background: transparent;
  color: var(--at-mute);
  cursor: pointer;
  transition: color 0.15s, background 0.15s;
}

.db-ms__clear:hover {
  color: var(--at-navy-deep);
  background: var(--at-bg-paper);
}

.db-ms__list {
  list-style: none;
  margin: 0;
  padding: 0.25rem 0;
  max-height: 260px;
  overflow-y: auto;
}

.db-ms__option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.3rem 0.65rem;
  font-family: var(--at-sans);
  font-size: 0.78rem;
  color: var(--at-navy-deep);
  cursor: pointer;
  transition: background 0.15s;
}

.db-ms__option:hover {
  background: var(--at-bg-paper);
}

.db-ms__checkbox {
  appearance: auto;
  margin: 0;
  flex-shrink: 0;
  cursor: pointer;
  accent-color: var(--at-teal);
}

.db-ms__option-label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.db-ms__empty {
  padding: 0.4rem 0.65rem;
  font-family: var(--at-sans);
  font-size: 0.75rem;
  color: var(--at-mute);
}
</style>
