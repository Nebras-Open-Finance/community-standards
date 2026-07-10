<script setup lang="ts">
// Endpoint picker shared by the LFI and TPP portals: a bordered panel with a
// header (title · count · Select all / Clear) and a two-column grid of endpoints
// with a custom checkbox, friendly name, and method + path. Presentational —
// the parent owns selection state and handles the emitted events.
import { computed } from 'vue'

export interface FcEndpointItem {
  slug: string
  name: string
  method: string
  path: string
  selected: boolean
}

const props = defineProps<{
  title: string
  items: FcEndpointItem[]
  version: string
  versions: readonly string[]
  /** Currently-selected segments (multi-select). */
  segment?: readonly string[] | undefined
  /** Segment options — omit/empty to hide the segment control (e.g. insurance). */
  segments?: readonly string[] | undefined
}>()

const emit = defineEmits<{
  (e: 'toggle', slug: string): void
  (e: 'select-all'): void
  (e: 'clear'): void
  (e: 'update:version', v: string): void
  (e: 'toggle-segment', v: string): void
}>()

function segmentOn(s: string): boolean {
  return !!props.segment && props.segment.includes(s)
}

function onVersion(e: Event): void {
  emit('update:version', (e.target as HTMLSelectElement).value)
}

const selectedCount = computed(() => props.items.filter((i) => i.selected).length)
</script>

<template>
  <div class="ep-area">
    <div class="ep-area-head">
      <div>
        <span class="ep-area-name">{{ title }}</span>
        <div class="ep-area-meta">{{ selectedCount }} of {{ items.length }} selected</div>
      </div>
      <div class="ep-area-actions">
        <button type="button" class="mini-btn" @click="$emit('select-all')">Select all</button>
        <button type="button" class="mini-btn" @click="$emit('clear')">Clear</button>
      </div>
    </div>

    <div class="ep-controls">
      <div class="ep-ctrl">
        <label class="ep-ctrl-label">API version</label>
        <div class="ep-select">
          <select :value="version" @change="onVersion">
            <option v-for="v in versions" :key="v" :value="v">{{ v }}</option>
          </select>
        </div>
      </div>
      <div v-if="segments && segments.length" class="ep-ctrl">
        <label class="ep-ctrl-label">Segment <span class="ep-ctrl-hint">select all that apply</span></label>
        <div class="ep-seg">
          <button
            v-for="s in segments"
            :key="s"
            type="button"
            class="ep-seg-btn"
            :class="{ on: segmentOn(s) }"
            :aria-pressed="segmentOn(s)"
            @click="$emit('toggle-segment', s)"
          >
            {{ s }}
          </button>
        </div>
      </div>
    </div>

    <div class="ep-list">
      <div
        v-for="item in items"
        :key="item.slug"
        class="ep-item"
        :class="{ on: item.selected }"
        role="checkbox"
        :aria-checked="item.selected"
        tabindex="0"
        @click="$emit('toggle', item.slug)"
        @keydown.enter.prevent="$emit('toggle', item.slug)"
        @keydown.space.prevent="$emit('toggle', item.slug)"
      >
        <span class="ep-box">{{ item.selected ? '✓' : '' }}</span>
        <span class="ep-info">
          <span class="ep-name">{{ item.name }}</span>
          <span class="ep-path">{{ item.method }} {{ item.path }}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ep-area {
  border: 1px solid var(--at-grid-line-2);
  background: var(--at-surface);
  font-family: var(--at-sans);
}

.ep-area-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding: 14px 20px;
  background: var(--at-bg-paper);
  border-bottom: 1px solid var(--at-grid-line-2);
}
.ep-area-name { font-family: var(--at-serif); font-size: 19px; font-weight: 500; color: var(--at-navy-deep); }
.ep-area-meta {
  font-family: var(--at-mono);
  font-size: 10.5px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--at-mute);
  margin-top: 2px;
}
.ep-area-actions { display: flex; gap: 8px; }
.mini-btn {
  font-family: var(--at-mono);
  font-size: 10px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 5px 10px;
  border: 1px solid var(--at-grid-line-2);
  background: var(--at-surface);
  color: var(--at-navy);
  cursor: pointer;
  transition: border-color 0.15s, color 0.15s;
}
.mini-btn:hover { border-color: var(--at-navy); }

/* controls bar: version + segment */
.ep-controls {
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
  padding: 16px 20px;
  background: color-mix(in srgb, var(--at-navy) 2.5%, var(--at-surface));
  border-bottom: 1px solid var(--at-grid-line);
}
.ep-ctrl { display: flex; flex-direction: column; gap: 8px; }
.ep-ctrl-label {
  font-family: var(--at-mono);
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--at-navy);
  opacity: 0.7;
}
.ep-ctrl-hint { text-transform: none; letter-spacing: 0; opacity: 0.75; }
.ep-select { position: relative; display: inline-flex; }
.ep-select::after {
  content: '▾';
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 11px;
  color: var(--at-navy);
  pointer-events: none;
}
.ep-select select {
  font-family: var(--at-mono);
  font-size: 13px;
  color: var(--at-navy-deep);
  background: var(--at-bg-cream);
  border: 1px solid var(--at-grid-line-2);
  padding: 9px 34px 9px 14px;
  outline: none;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  min-width: 130px;
  transition: border-color 0.15s;
}
.ep-select select:focus { border-color: var(--at-teal); }
.ep-seg { display: inline-flex; border: 1px solid var(--at-grid-line-2); background: var(--at-bg-cream); }
.ep-seg-btn {
  font-family: var(--at-sans);
  font-size: 13px;
  font-weight: 500;
  color: var(--at-mute);
  background: none;
  border: none;
  border-right: 1px solid var(--at-grid-line-2);
  padding: 9px 18px;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}
.ep-seg-btn:last-child { border-right: none; }
.ep-seg-btn:hover { color: var(--at-navy); background: var(--at-surface); }
.ep-seg-btn.on { background: var(--at-teal); color: #fff; }
.ep-seg-btn.on:hover { background: var(--at-teal-deep); }

.ep-list { display: grid; grid-template-columns: repeat(2, 1fr); }
.ep-item {
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 13px 20px;
  border-bottom: 1px solid var(--at-grid-line);
  border-right: 1px solid var(--at-grid-line);
  cursor: pointer;
  transition: background 0.12s;
}
.ep-item:hover { background: var(--at-bg-cream); }
.ep-item:nth-child(2n) { border-right: none; }
.ep-item:focus-visible { outline: 2px solid var(--at-teal); outline-offset: -2px; }

.ep-box {
  flex-shrink: 0;
  width: 18px;
  height: 18px;
  border: 1.5px solid var(--at-grid-line-2);
  background: var(--at-bg-cream);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 11px;
  transition: background 0.15s, border-color 0.15s;
}
.ep-item.on .ep-box { background: var(--at-teal); border-color: var(--at-teal); }
.ep-item.on .ep-name { color: var(--at-navy-deep); }

.ep-info { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
.ep-name { font-size: 13.5px; font-weight: 500; color: var(--at-navy-deep); }
.ep-path { font-family: var(--at-mono); font-size: 10px; color: var(--at-mute); word-break: break-all; }

@media (max-width: 640px) {
  .ep-list { grid-template-columns: 1fr; }
  .ep-item { border-right: none; }
}
</style>
