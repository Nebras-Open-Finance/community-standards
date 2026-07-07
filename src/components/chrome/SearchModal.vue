<script setup lang="ts">
// In-app search modal. The index is generated at build time by
// `scripts/build-search-index.mjs` (see search-data.ts). PageHeader.vue
// lazy-loads this component so the index is only fetched once a user
// opens search.
import { ref, computed, watch, nextTick, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { SEARCH_DATA, type SearchItem } from './search-data'

interface Props {
  open: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{ (e: 'close'): void }>()

const router = useRouter()

const query = ref('')
const selectedIndex = ref(0)
const inputRef = ref<HTMLInputElement | null>(null)
const resultsRef = ref<HTMLElement | null>(null)

const MAX_RESULTS = 40

interface Scored extends SearchItem {
  score: number
}

function tokenize(s: string): string[] {
  return s
    .toLowerCase()
    .split(/[^\p{L}\p{N}]+/u)
    .filter((t) => t.length >= 2)
}

// Relevance scoring. Every token must appear somewhere; the score
// weights matches in higher-signal fields more heavily.
function scoreItem(item: SearchItem, tokens: string[], raw: string): number {
  const title = item.title.toLowerCase()
  const section = item.section.toLowerCase()
  const category = item.category.toLowerCase()
  const description = item.description.toLowerCase()
  const headings = item.headings.map((h) => h.toLowerCase())
  const body = item.body.toLowerCase()

  let score = 0
  for (const tok of tokens) {
    let matched = false
    if (title.includes(tok)) {
      score += title.startsWith(tok) ? 14 : 10
      matched = true
    }
    if (headings.some((h) => h.includes(tok))) {
      score += 6
      matched = true
    }
    if (section.includes(tok) || category.includes(tok)) {
      score += 4
      matched = true
    }
    if (description.includes(tok)) {
      score += 2
      matched = true
    }
    if (body.includes(tok)) {
      score += 1
      matched = true
    }
    if (!matched) return 0
  }
  // Whole-phrase bonuses.
  if (raw.length >= 3) {
    if (title.includes(raw)) score += 20
    if (description.includes(raw)) score += 5
  }
  return score
}

const results = computed<Scored[]>(() => {
  const raw = query.value.trim().toLowerCase()
  if (!raw) return []
  const tokens = tokenize(raw)
  if (tokens.length === 0) return []
  const scored: Scored[] = []
  for (const item of SEARCH_DATA) {
    const s = scoreItem(item, tokens, raw)
    if (s > 0) scored.push({ ...item, score: s })
  }
  scored.sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
  return scored.slice(0, MAX_RESULTS)
})

// Results stay in pure relevance order. We emit a category label every time
// the category differs from the previous result, so a more relevant result
// can interrupt a category run with its own label. The `index` field is the
// flat index of the result for keyboard navigation.
interface RenderRow {
  kind: 'label' | 'result'
  category: string
  item?: Scored
  index?: number
}

const renderRows = computed<RenderRow[]>(() => {
  const rows: RenderRow[] = []
  let last = ''
  results.value.forEach((item, idx) => {
    if (item.category !== last) {
      rows.push({ kind: 'label', category: item.category })
      last = item.category
    }
    rows.push({ kind: 'result', category: item.category, item, index: idx })
  })
  return rows
})

const flatResults = computed<Scored[]>(() => results.value)

function categoryColor(category: string): string {
  switch (category) {
    case 'TPP Standards': return 'var(--at-teal-deep)'
    case 'LFI Integration': return 'var(--at-gold)'
    case 'Knowledge Base': return 'var(--at-blue-deep)'
    case 'API Specs': return 'var(--at-navy-mid)'
    case 'Policy':
    case 'Release Notes': return 'var(--at-navy-deep)'
    default: return 'var(--at-mute-2)'
  }
}

function close(): void {
  emit('close')
}

function clearQuery(): void {
  query.value = ''
  nextTick(() => inputRef.value?.focus())
}

function focusInput(): void {
  nextTick(() => inputRef.value?.focus())
}

function resetAndFocus(): void {
  query.value = ''
  selectedIndex.value = 0
  focusInput()
}

function navigate(path: string): void {
  emit('close')
  void router.push(path)
}

function scrollSelectedIntoView(): void {
  nextTick(() => {
    const el = resultsRef.value?.querySelector(
      `[data-result-index="${selectedIndex.value}"]`,
    ) as HTMLElement | null
    el?.scrollIntoView({ block: 'nearest' })
  })
}

function onKeyDown(e: KeyboardEvent): void {
  if (e.key === 'Escape') {
    close()
  } else if (e.key === 'ArrowDown') {
    e.preventDefault()
    selectedIndex.value = Math.min(selectedIndex.value + 1, flatResults.value.length - 1)
    scrollSelectedIntoView()
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    selectedIndex.value = Math.max(selectedIndex.value - 1, 0)
    scrollSelectedIntoView()
  } else if (e.key === 'Enter') {
    const item = flatResults.value[selectedIndex.value]
    if (item) {
      e.preventDefault()
      navigate(item.path)
    }
  }
}

onMounted(() => {
  if (props.open) resetAndFocus()
})

watch(
  () => props.open,
  (open) => {
    if (open) {
      resetAndFocus()
    }
  },
)

watch(query, () => {
  selectedIndex.value = 0
})
</script>

<template>
  <Teleport to="body">
    <Transition name="ed-search-fade">
      <div v-if="open" class="ed-search-overlay" @click.self="close">
        <div class="ed-search-card" role="dialog" aria-label="Search documentation">
          <div class="ed-search-header">
            <svg
              class="ed-search-header__icon"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              aria-hidden="true"
            >
              <circle cx="10" cy="10" r="7" />
              <path d="M21 21l-6-6" />
            </svg>
            <input
              ref="inputRef"
              v-model="query"
              type="text"
              class="ed-search-input"
              placeholder="Search documentation…"
              autocomplete="off"
              spellcheck="false"
              @keydown="onKeyDown"
            />
            <button
              v-if="query"
              type="button"
              class="ed-search-clear"
              aria-label="Clear search"
              @click="clearQuery"
            >×</button>
          </div>

          <div ref="resultsRef" class="ed-search-results">
            <div v-if="!query.trim()" class="ed-search-empty">
              <div class="ed-search-empty__title">Search the documentation</div>
              <div class="ed-search-empty__hint">
                Try "confirmation of payee", "consent", or "webhooks".
              </div>
            </div>

            <div v-else-if="flatResults.length === 0" class="ed-search-empty">
              <div class="ed-search-empty__title">No results found</div>
              <div class="ed-search-empty__hint">
                Try different keywords or check your spelling.
              </div>
            </div>

            <template v-else>
              <template v-for="(row, rowIdx) in renderRows" :key="rowIdx">
                <div
                  v-if="row.kind === 'label'"
                  class="ed-search-group__label"
                  :style="{ color: categoryColor(row.category) }"
                >{{ row.category }}</div>

                <a
                  v-else-if="row.item && typeof row.index === 'number'"
                  :href="row.item.path"
                  :data-result-index="row.index"
                  class="ed-search-result"
                  :class="{ 'is-selected': selectedIndex === row.index }"
                  :style="{ '--ed-search-accent': categoryColor(row.category) }"
                  @mouseenter="selectedIndex = row.index ?? 0"
                  @click.prevent="navigate(row.item.path)"
                >
                  <div class="ed-search-result__head">
                    <div class="ed-search-result__title">{{ row.item.title }}</div>
                    <div
                      class="ed-search-result__section"
                      :style="{ color: categoryColor(row.category) }"
                    >{{ row.item.section }}</div>
                  </div>
                  <div class="ed-search-result__desc">{{ row.item.description }}</div>
                  <div class="ed-search-result__path">{{ row.item.path }}</div>
                </a>
              </template>
            </template>
          </div>

          <div class="ed-search-footer">
            <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
            <span><kbd>↵</kbd> open</span>
            <span><kbd>esc</kbd> close</span>
            <span class="ed-search-footer__count" v-if="flatResults.length">
              {{ flatResults.length }} result{{ flatResults.length === 1 ? '' : 's' }}
            </span>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.ed-search-overlay {
  position: fixed;
  inset: 0;
  background: rgba(11, 15, 26, 0.55);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  z-index: 100000;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 7rem 1.25rem 2.5rem;
}

.ed-search-card {
  width: 100%;
  max-width: 680px;
  max-height: calc(100vh - 9.5rem);
  background: var(--at-surface, #fff);
  border: 1px solid var(--at-grid-line-2);
  box-shadow: 0 24px 60px rgba(0, 23, 56, 0.28);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-family: var(--at-sans);
  color: var(--at-navy-deep);
}

.ed-search-header {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid var(--at-grid-line);
}

.ed-search-header__icon {
  color: var(--at-mute);
  flex-shrink: 0;
}

.ed-search-input {
  flex: 1;
  min-width: 0;
  font: inherit;
  font-size: 1rem;
  border: 0;
  outline: none;
  background: transparent;
  color: var(--at-navy-deep);
  padding: 0.4rem 0;
}

.ed-search-input::placeholder { color: var(--at-mute); }

.ed-search-clear {
  background: none;
  border: 0;
  cursor: pointer;
  color: var(--at-mute);
  font-size: 1.4rem;
  line-height: 1;
  padding: 0.1rem 0.35rem;
}

.ed-search-clear:hover { color: var(--at-navy-deep); }

.ed-search-results {
  flex: 1;
  overflow-y: auto;
  padding: 0.3rem 0;
}

.ed-search-empty {
  padding: 3rem 2rem;
  text-align: center;
  color: var(--at-mute);
}

.ed-search-empty__title {
  font-family: var(--at-serif);
  font-size: 1.05rem;
  color: var(--at-navy-deep);
  margin-bottom: 0.35rem;
}

.ed-search-empty__hint { font-size: 0.85rem; }

.ed-search-group { padding: 0.25rem 0; }

.ed-search-group__label {
  position: sticky;
  top: 0;
  background: var(--at-surface, #fff);
  padding: 0.7rem 1.25rem 0.35rem;
  font-family: var(--at-mono);
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  z-index: 1;
  border-bottom: 1px solid var(--at-grid-line);
}

.ed-search-result {
  display: block;
  padding: 0.85rem 1.25rem;
  text-decoration: none;
  color: inherit;
  border-left: 3px solid transparent;
  cursor: pointer;
  transition: background 0.08s ease, border-color 0.08s ease;
}

.ed-search-result.is-selected {
  background: var(--at-bg-cream);
  border-left-color: var(--ed-search-accent, var(--at-navy));
}

.ed-search-result__head {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  margin-bottom: 0.3rem;
}

.ed-search-result__title {
  flex: 1;
  min-width: 0;
  font-family: var(--at-serif);
  font-size: 0.98rem;
  font-weight: 500;
  color: var(--at-navy-deep);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ed-search-result__section {
  flex-shrink: 0;
  font-family: var(--at-mono);
  font-size: 0.58rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0.18rem 0.5rem;
  background: rgba(0, 39, 127, 0.05);
}

.ed-search-result__desc {
  font-size: 0.82rem;
  color: var(--at-mute-2);
  line-height: 1.45;
  margin-bottom: 0.4rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.ed-search-result__path {
  font-family: var(--at-mono);
  font-size: 0.7rem;
  color: var(--at-mute);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ed-search-footer {
  display: flex;
  align-items: center;
  gap: 1.1rem;
  padding: 0.65rem 1.25rem;
  background: var(--at-bg-cream);
  border-top: 1px solid var(--at-grid-line);
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.05em;
  color: var(--at-mute);
}

.ed-search-footer__count { margin-left: auto; }

.ed-search-footer kbd {
  display: inline-block;
  padding: 0.05rem 0.32rem;
  margin-right: 0.18rem;
  border: 1px solid var(--at-grid-line-2);
  border-radius: 3px;
  background: #fff;
  color: var(--at-navy-deep);
  font-family: inherit;
  font-size: 0.62rem;
  line-height: 1.2;
}

.ed-search-fade-enter-active,
.ed-search-fade-leave-active {
  transition: opacity 0.16s ease;
}

.ed-search-fade-enter-from,
.ed-search-fade-leave-to {
  opacity: 0;
}

@media (max-width: 640px) {
  .ed-search-overlay { padding: 4.5rem 0.75rem 1rem; }
  .ed-search-card { max-height: calc(100vh - 6rem); }
  .ed-search-result__title { font-size: 0.92rem; }
  .ed-search-result__section { display: none; }
}
</style>
