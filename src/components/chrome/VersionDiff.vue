<script setup lang="ts">
// The "What's changed" view on release-candidate pages. When the URL carries
// `?compare=<version>` (set by the button in <DraftVersionBanner>), the same
// page in that earlier version is rendered off-screen, both pages are reduced
// to text blocks, and the differences are marked on the live page:
//
//   added    block highlighted green
//   edited   block outlined amber; added words highlighted, removed words
//            shown struck through where they were
//   removed  the old block re-inserted, struck through, where it used to be
//
// Every DOM change is recorded and undone on exit, so the page is left exactly
// as Vue rendered it. Content that is not in the DOM when the comparison runs
// (an unselected tab, a collapsed panel) is not compared.
//
// Auto-registered as <VersionDiff> via unplugin-vue-components.
import { h, render, type Component } from 'vue'
import { DRAFT_VERSIONS, VERSIONS, type Version } from '@/data/versions'
import { diffBlocks, diffWords, extractBlocks, textParts, type BlockChange } from '@/utils/blockDiff'

const route = useRoute()
const router = useRouter()
const instance = getCurrentInstance()

type State = 'idle' | 'loading' | 'ready' | 'missing' | 'error'
const state = ref<State>('idle')
const errorMessage = ref('')
const counts = reactive({ added: 0, edited: 0, removed: 0 })
const targets = shallowRef<Element[]>([])
const cursor = ref(-1)

const fromVersion = computed<Version | null>(() => {
  const raw = route.query.compare
  const v = typeof raw === 'string' ? raw : null
  return v && (VERSIONS as readonly string[]).includes(v) ? (v as Version) : null
})

const toVersion = computed<Version | null>(() => {
  const segments = route.path.split('/').filter(Boolean)
  return DRAFT_VERSIONS.find((v) => segments.includes(v)) ?? null
})

const total = computed(() => counts.added + counts.edited + counts.removed)

// ─── Undo log ─────────────────────────────────────────────────────────────
let insertedNodes: Node[] = []
let originalText = new Map<Text, string>()
let markedElements: Element[] = []
const HIGHLIGHT = 'vd-ins'

function undo(): void {
  for (const n of insertedNodes) n.parentNode?.removeChild(n)
  for (const [node, text] of originalText) node.nodeValue = text
  for (const el of markedElements) el.classList.remove('vd-added', 'vd-edited', 'vd-cont', 'vd-current')
  insertedNodes = []
  originalText = new Map()
  markedElements = []
  if (typeof CSS !== 'undefined' && 'highlights' in CSS) CSS.highlights.delete(HIGHLIGHT)
  counts.added = counts.edited = counts.removed = 0
  targets.value = []
  cursor.value = -1
}

// ─── Rendering the earlier version ────────────────────────────────────────
function isLazy(c: unknown): c is () => Promise<{ default: Component }> {
  return typeof c === 'function'
    && !('displayName' in c) && !('props' in c) && !('__vccOpts' in c)
}

function frame(): Promise<void> {
  return new Promise((resolve) => requestAnimationFrame(() => setTimeout(resolve, 50)))
}

function pageRoot(): Element | null {
  const el = route.matched[route.matched.length - 1]?.instances.default?.$el as Node | undefined
  if (!el) return null
  return el.nodeType === Node.ELEMENT_NODE ? (el as Element) : el.parentElement
}

/** Renders `path` into a detached, invisible container and returns it. */
async function renderPage(path: string, width: number): Promise<HTMLElement | null> {
  const resolved = router.resolve(path)
  const record = resolved.matched[resolved.matched.length - 1]
  if (!record || record.path.includes('(.*)')) return null
  const raw = record.components?.default
  if (!raw) return null
  const component = isLazy(raw) ? (await raw()).default : (raw as Component)

  const container = document.createElement('div')
  // Not aria-hidden: extractBlocks skips aria-hidden subtrees. `visibility:
  // hidden` already keeps it out of the accessibility tree.
  container.inert = true
  Object.assign(container.style, {
    position: 'absolute', left: '-100000px', top: '0',
    width: `${width}px`, visibility: 'hidden', pointerEvents: 'none',
  })
  document.body.appendChild(container)
  const vnode = h(component)
  vnode.appContext = instance?.appContext ?? null
  render(vnode, container)
  await nextTick()
  await frame()
  return container
}

// ─── Marking the live page ────────────────────────────────────────────────

/**
 * Adds a mark class to a block and returns the element to scroll to. Grid
 * tables render their rows as `display: contents`, which have no box of their
 * own — a background on the row never shows and scrolling to it does nothing
 * — so the mark goes on the cells instead, with only the first carrying the
 * edge marker.
 */
function paint(el: Element, cls: string): Element {
  el.classList.add(cls)
  markedElements.push(el)
  if (getComputedStyle(el).display !== 'contents' || !el.children.length) return el
  const cells = [...el.children]
  cells.forEach((cell, i) => {
    cell.classList.add(cls)
    if (i > 0) cell.classList.add('vd-cont')
    markedElements.push(cell)
  })
  return cells[0]!
}

function textNodes(root: Element, skipDel: boolean): Text[] {
  const out: Text[] = []
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    if (skipDel && n.parentElement?.closest('.vd-del')) continue
    out.push(n as Text)
  }
  return out
}

/** Locates a character offset within `root`'s text. */
function locate(nodes: Text[], offset: number, edge: 'start' | 'end'): [Text, number] | null {
  let pos = 0
  for (const n of nodes) {
    const len = n.nodeValue?.length ?? 0
    const inside = edge === 'start' ? offset < pos + len : offset <= pos + len
    if (offset >= pos && inside) return [n, offset - pos]
    pos += len
  }
  const last = nodes[nodes.length - 1]
  return last ? [last, last.nodeValue?.length ?? 0] : null
}

function insertRemovedWords(nodes: Text[], offset: number, text: string): void {
  const del = document.createElement('del')
  del.className = 'vd-del'
  del.textContent = text
  const at = locate(nodes, offset, 'start')
  if (!at) return
  const [node, local] = at
  if (local === 0) {
    node.parentNode?.insertBefore(del, node)
  } else if (local >= (node.nodeValue?.length ?? 0)) {
    node.parentNode?.insertBefore(del, node.nextSibling)
  } else {
    if (!originalText.has(node)) originalText.set(node, node.nodeValue ?? '')
    const rest = node.splitText(local)
    insertedNodes.push(rest)
    node.parentNode?.insertBefore(del, rest)
  }
  insertedNodes.push(del)
}

function markEdited(el: Element, oldEl: Element, ranges: Range[]): void {
  const newText = el.textContent ?? ''
  const changes = diffWords(textParts(oldEl), textParts(el))

  // Removed words first, back to front, so earlier offsets stay valid.
  for (const c of [...changes].reverse()) {
    if (c.removed.trim()) insertRemovedWords(textNodes(el, false), c.offset, c.removed)
  }

  // Then added words, mapped over the text with the removed words skipped.
  const nodes = textNodes(el, true)
  for (const c of changes) {
    if (!newText.slice(c.offset, c.offset + c.addedLength).trim()) continue
    const start = locate(nodes, c.offset, 'start')
    const end = locate(nodes, c.offset + c.addedLength, 'end')
    if (!start || !end) continue
    const range = document.createRange()
    range.setStart(start[0], start[1])
    range.setEnd(end[0], end[1])
    ranges.push(range)
  }
}

const ROW = 'tr,[role="row"]'

function insertRemovedBlock(change: Extract<BlockChange, { type: 'removed' }>, root: Element, lastGhost: Map<Element, Element>): Element {
  let ghost = change.oldEl.cloneNode(true) as Element
  for (const withId of [ghost, ...ghost.querySelectorAll('[id]')]) withId.removeAttribute('id')

  let anchor = change.after ?? change.before
  const ghostIsRow = ghost.matches(ROW)
  // A paragraph removed after a table row belongs after the table, not in it.
  if (anchor && !ghostIsRow && anchor.matches(ROW)) {
    anchor = anchor.closest('table,[role="table"]') ?? anchor
  }
  // A <tr> only renders as a row inside a table.
  let inserted = ghost
  if (ghost.tagName === 'TR' && !anchor?.matches('tr')) {
    const table = document.createElement('table')
    table.className = 'vd-removed--table'
    table.createTBody().appendChild(ghost)
    inserted = table
  }

  if (change.after && anchor) {
    const prev = lastGhost.get(anchor) ?? anchor
    prev.parentNode?.insertBefore(inserted, prev.nextSibling)
    lastGhost.set(anchor, inserted)
  } else if (anchor) {
    anchor.parentNode?.insertBefore(inserted, anchor)
  } else {
    root.appendChild(inserted)
  }
  insertedNodes.push(inserted)
  // Painted once in the document, so that its computed display is known.
  return paint(ghost, 'vd-removed')
}

// ─── Running a comparison ─────────────────────────────────────────────────
let generation = 0

async function run(): Promise<void> {
  const gen = ++generation
  undo()
  const from = fromVersion.value
  const to = toVersion.value
  if (!from || !to) {
    state.value = 'idle'
    return
  }

  state.value = 'loading'
  await nextTick()
  await frame()
  if (gen !== generation) return

  const root = pageRoot()
  if (!root) {
    state.value = 'error'
    errorMessage.value = 'This page could not be read.'
    return
  }

  const fromPath = route.path
    .split('/')
    .map((s) => (s === to ? from : s))
    .join('/')

  let container: HTMLElement | null = null
  try {
    container = await renderPage(fromPath, root.getBoundingClientRect().width)
    if (gen !== generation) return
    if (!container) {
      state.value = 'missing'
      return
    }

    const changes = diffBlocks(extractBlocks(container), extractBlocks(root))
    const lastGhost = new Map<Element, Element>()
    const ranges: Range[] = []
    const marked: Element[] = []

    for (const c of changes) {
      if (c.type === 'removed') {
        marked.push(insertRemovedBlock(c, root, lastGhost))
        counts.removed++
      } else if (c.type === 'added') {
        marked.push(paint(c.el, 'vd-added'))
        counts.added++
      } else {
        markEdited(c.el, c.oldEl, ranges)
        marked.push(paint(c.el, 'vd-edited'))
        counts.edited++
      }
    }

    if (ranges.length && typeof CSS !== 'undefined' && 'highlights' in CSS) {
      CSS.highlights.set(HIGHLIGHT, new Highlight(...ranges))
    }

    targets.value = marked.sort((a, b) =>
      a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1,
    )
    state.value = 'ready'
    if (targets.value.length) go(0)
  } catch (err) {
    if (gen !== generation) return
    state.value = 'error'
    errorMessage.value = err instanceof Error ? err.message : String(err)
  } finally {
    if (container) {
      render(null, container)
      container.remove()
    }
  }
}

function go(index: number): void {
  const list = targets.value
  if (!list.length) return
  list[cursor.value]?.classList.remove('vd-current')
  cursor.value = (index + list.length) % list.length
  const el = list[cursor.value]!
  el.classList.add('vd-current')
  if (!markedElements.includes(el)) markedElements.push(el)
  el.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

function exit(): void {
  const { compare: _compare, ...rest } = route.query
  router.replace({ query: rest, hash: route.hash })
}

onMounted(() => {
  watch(
    () => [route.path, fromVersion.value] as const,
    () => {
      if (fromVersion.value && toVersion.value) void run()
      else {
        generation++
        undo()
        state.value = 'idle'
      }
    },
    { immediate: true },
  )
})

onBeforeUnmount(() => {
  generation++
  undo()
})
</script>

<template>
  <div v-if="state !== 'idle'" class="vd-ui vd-bar" role="status">
    <span class="vd-bar__title">
      Comparing <strong>{{ fromVersion }}</strong> &rarr; <strong>{{ toVersion }}</strong>
    </span>

    <template v-if="state === 'loading'">
      <span class="vd-bar__note">Comparing&hellip;</span>
    </template>
    <template v-else-if="state === 'missing'">
      <span class="vd-bar__note">This page has no {{ fromVersion }} equivalent. All of its content is new in {{ toVersion }}.</span>
    </template>
    <template v-else-if="state === 'error'">
      <span class="vd-bar__note">The comparison failed: {{ errorMessage }}</span>
    </template>
    <template v-else-if="total === 0">
      <span class="vd-bar__note">No differences found in the content shown on this page.</span>
    </template>
    <template v-else>
      <span class="vd-bar__stats">
        <span class="vd-stat vd-stat--added">+{{ counts.added }} added</span>
        <span class="vd-stat vd-stat--edited">~{{ counts.edited }} edited</span>
        <span class="vd-stat vd-stat--removed">&minus;{{ counts.removed }} removed</span>
      </span>
      <span class="vd-bar__nav">
        <button type="button" class="vd-bar__btn" aria-label="Previous change" @click="go(cursor - 1)">&lsaquo;</button>
        <span class="vd-bar__pos">{{ cursor + 1 }} / {{ targets.length }}</span>
        <button type="button" class="vd-bar__btn" aria-label="Next change" @click="go(cursor + 1)">&rsaquo;</button>
      </span>
    </template>

    <button type="button" class="vd-bar__exit" @click="exit">Exit comparison &times;</button>
  </div>
</template>

<style scoped>
.vd-bar {
  position: fixed;
  left: 50%;
  bottom: 1.25rem;
  transform: translateX(-50%);
  z-index: 60;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem 1rem;
  max-width: calc(100vw - 2rem);
  padding: 0.6rem 0.9rem;
  background: #1f2937;
  color: #f9fafb;
  font-size: 0.82rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
}

.vd-bar__note {
  color: #d1d5db;
}

.vd-bar__stats {
  display: inline-flex;
  gap: 0.4rem;
  font-family: var(--at-mono);
  font-size: 0.75rem;
}

.vd-stat {
  padding: 0.1rem 0.4rem;
}

.vd-stat--added { background: #14532d; color: #bbf7d0; }
.vd-stat--edited { background: #78350f; color: #fde68a; }
.vd-stat--removed { background: #7f1d1d; color: #fecaca; }

.vd-bar__nav {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}

.vd-bar__pos {
  font-family: var(--at-mono);
  font-size: 0.75rem;
  min-width: 3.5rem;
  text-align: center;
}

.vd-bar__btn,
.vd-bar__exit {
  font: inherit;
  color: inherit;
  background: #374151;
  border: 0;
  padding: 0.2rem 0.6rem;
  cursor: pointer;
}

.vd-bar__btn:hover,
.vd-bar__exit:hover {
  background: #4b5563;
}
</style>

<!-- Unscoped: these classes are applied to the page's own elements. -->
<style>
.vd-added {
  background: #dcfce7 !important;
  box-shadow: inset 4px 0 0 #16a34a;
}

.vd-edited {
  box-shadow: inset 4px 0 0 #f59e0b;
  background: #fffbeb !important;
}

.vd-removed {
  background: #fee2e2 !important;
  box-shadow: inset 4px 0 0 #dc2626;
  text-decoration: line-through;
  text-decoration-color: rgba(185, 28, 28, 0.6);
  opacity: 0.85;
}

.vd-removed--table {
  width: 100%;
  border-collapse: collapse;
}

/* Cells after the first in a marked grid row: tinted, without the edge marker. */
.vd-added.vd-cont,
.vd-edited.vd-cont,
.vd-removed.vd-cont {
  box-shadow: none;
}

.vd-del {
  background: #fecaca;
  color: #991b1b;
  text-decoration: line-through;
  margin: 0 0.15em;
}

::highlight(vd-ins) {
  background-color: #86efac;
  color: #14532d;
}

.vd-current {
  outline: 2px solid #2563eb;
  outline-offset: 2px;
}
</style>
