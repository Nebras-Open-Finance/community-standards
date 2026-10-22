// Block- and word-level diffing for the "What's changed" view on release
// candidate pages (see <VersionDiff>). A page is reduced to an ordered list of
// text blocks — headings, paragraphs, list items, table rows — and the two
// versions' lists are compared with Myers' algorithm. Blocks that were removed
// and added at the same point are paired as edits when their wording is close
// enough, and edited blocks are diffed again word by word.

export type DiffOp =
  | { type: 'equal'; a: number; b: number }
  | { type: 'delete'; a: number }
  | { type: 'insert'; b: number }

/**
 * Myers' O((N+M)D) shortest edit script between two sequences, compared by
 * strict equality. A common prefix and suffix are stripped first, since most
 * pages differ in only a few places.
 */
export function diffSequences<T>(a: readonly T[], b: readonly T[]): DiffOp[] {
  let start = 0
  while (start < a.length && start < b.length && a[start] === b[start]) start++
  let endA = a.length
  let endB = b.length
  while (endA > start && endB > start && a[endA - 1] === b[endB - 1]) {
    endA--
    endB--
  }

  const ops: DiffOp[] = []
  for (let i = 0; i < start; i++) ops.push({ type: 'equal', a: i, b: i })
  ops.push(...myers(a.slice(start, endA), b.slice(start, endB), start))
  for (let i = 0; i < a.length - endA; i++) {
    ops.push({ type: 'equal', a: endA + i, b: endB + i })
  }
  return ops
}

function myers<T>(a: readonly T[], b: readonly T[], base: number): DiffOp[] {
  const n = a.length
  const m = b.length
  if (n === 0) return b.map((_, i) => ({ type: 'insert', b: base + i }))
  if (m === 0) return a.map((_, i) => ({ type: 'delete', a: base + i }))

  const max = n + m
  const off = max + 1
  const v = new Int32Array(2 * max + 3)
  const trace: Int32Array[] = []

  outer: for (let d = 0; d <= max; d++) {
    trace.push(v.slice())
    for (let k = -d; k <= d; k += 2) {
      let x = k === -d || (k !== d && v[off + k - 1]! < v[off + k + 1]!)
        ? v[off + k + 1]!
        : v[off + k - 1]! + 1
      let y = x - k
      while (x < n && y < m && a[x] === b[y]) {
        x++
        y++
      }
      v[off + k] = x
      if (x >= n && y >= m) break outer
    }
  }

  const out: DiffOp[] = []
  let x = n
  let y = m
  for (let d = trace.length - 1; d >= 0; d--) {
    const tv = trace[d]!
    const k = x - y
    const prevK = k === -d || (k !== d && tv[off + k - 1]! < tv[off + k + 1]!) ? k + 1 : k - 1
    const prevX = tv[off + prevK]!
    const prevY = prevX - prevK
    while (x > prevX && y > prevY) {
      out.push({ type: 'equal', a: base + x - 1, b: base + y - 1 })
      x--
      y--
    }
    if (d > 0) {
      if (x === prevX) out.push({ type: 'insert', b: base + y - 1 })
      else out.push({ type: 'delete', a: base + x - 1 })
    }
    x = prevX
    y = prevY
  }
  return out.reverse()
}

// ─── Words ────────────────────────────────────────────────────────────────

/**
 * Splits text into whitespace runs, word-like runs and single punctuation
 * marks. Dots and hyphens stay inside words so that identifiers such as
 * `v2.1` or `account-access-consent` change as a unit.
 */
export function tokenize(text: string): string[] {
  return text.match(/\s+|[\p{L}\p{N}_.-]+|[^\s\p{L}\p{N}_.-]/gu) ?? []
}

export interface WordChange {
  /** Offset into the new text. */
  offset: number
  /** Removed text to show at `offset`, if any. */
  removed: string
  /** Length of new text starting at `offset` that was added. */
  addedLength: number
}

/**
 * Word-level differences between two blocks, expressed against the new text:
 * each change is a position in it, the old wording removed there and how much
 * new wording was added. Adjacent token edits are merged into one change.
 *
 * Each side is passed as its text nodes, which are tokenised separately: the
 * text of neighbouring elements (two table cells, a badge beside a heading)
 * runs together with no space between, and must not merge into one word.
 */
export function diffWords(oldParts: readonly string[], newParts: readonly string[]): WordChange[] {
  const a = oldParts.flatMap(tokenize)
  const b = newParts.flatMap(tokenize)
  // Any run of whitespace matches any other: the new text is raw DOM text,
  // with template indentation, while the old text may be normalised.
  const key = (t: string): string => (/^\s/.test(t) ? ' ' : t)
  const ops = diffSequences(a.map(key), b.map(key))

  const changes: WordChange[] = []
  let offset = 0
  let current: WordChange | null = null
  for (const op of ops) {
    if (op.type === 'equal') {
      current = null
      offset += b[op.b]!.length
      continue
    }
    if (!current) {
      current = { offset, removed: '', addedLength: 0 }
      changes.push(current)
    }
    if (op.type === 'delete') {
      current.removed += a[op.a]!
    } else {
      current.addedLength += b[op.b]!.length
      offset += b[op.b]!.length
    }
  }
  return changes
}

/** Share of word tokens two strings have in common, 0–1. */
export function similarity(oldText: string, newText: string): number {
  const a = tokenize(oldText).filter((t) => t.trim())
  const b = tokenize(newText).filter((t) => t.trim())
  if (a.length + b.length === 0) return 1
  const common = diffSequences(a, b).filter((o) => o.type === 'equal').length
  return (2 * common) / (a.length + b.length)
}

// ─── Blocks ───────────────────────────────────────────────────────────────

export interface Block {
  el: Element
  /** Whitespace-normalised text, used for comparison. */
  text: string
  /** Element kind, so that only like blocks are paired as edits. */
  kind: string
}

// Blocks taken whole: their text is compared as one unit even if they contain
// other block-like elements (a table row with a list in one of its cells).
const ATOMIC = 'tr,[role="row"],pre,h1,h2,h3,h4,h5,h6,dt,dd,figcaption,summary'
// Blocks that are descended into when they contain other blocks.
const CONTAINER = 'p,li,blockquote'
const SKIP = 'script,style,noscript,template,svg,button,[aria-hidden="true"],.vd-ui,.vd-removed'

function normalise(text: string): string {
  return text.replace(/\s+/g, ' ').trim()
}

/** The text of each text node under `el`, in order; they join to `textContent`. */
export function textParts(el: Element): string[] {
  const parts: string[] = []
  const walker = el.ownerDocument.createTreeWalker(el, NodeFilter.SHOW_TEXT)
  for (let n = walker.nextNode(); n; n = walker.nextNode()) parts.push(n.nodeValue ?? '')
  return parts
}

function kindOf(el: Element): string {
  return el.getAttribute('role') === 'row' ? 'row' : el.tagName.toLowerCase()
}

function hasOwnText(el: Element): boolean {
  for (const n of el.childNodes) {
    if (n.nodeType === Node.TEXT_NODE && n.nodeValue?.trim()) return true
  }
  return false
}

/** The page's text blocks, in document order. */
export function extractBlocks(root: Element): Block[] {
  const blocks: Block[] = []

  const visit = (el: Element): void => {
    if (el.matches(SKIP)) return
    const isAtomic = el.matches(ATOMIC)
    const isBlock = isAtomic
      || (el.matches(CONTAINER) && !el.querySelector(`${ATOMIC},${CONTAINER}`))
      || (hasOwnText(el) && !el.querySelector(`${ATOMIC},${CONTAINER}`))
    if (isBlock) {
      const text = normalise(textParts(el).join(' '))
      if (text) blocks.push({ el, text, kind: kindOf(el) })
      return
    }
    for (const child of el.children) visit(child)
  }

  visit(root)
  return blocks
}

export type BlockChange =
  | { type: 'added'; el: Element }
  | { type: 'edited'; el: Element; oldEl: Element }
  | { type: 'removed'; oldEl: Element; after: Element | null; before: Element | null }

/** Below this word overlap, a removed and an added block are shown separately. */
const EDIT_THRESHOLD = 0.4

/**
 * Compares two pages' blocks. Within each run of removals and additions,
 * removed and added blocks of the same kind are paired as edits — in order,
 * each to its most similar counterpart above the threshold.
 */
export function diffBlocks(oldBlocks: Block[], newBlocks: Block[]): BlockChange[] {
  const ops = diffSequences(
    oldBlocks.map((b) => `${b.kind}\u0000${b.text}`),
    newBlocks.map((b) => `${b.kind}\u0000${b.text}`),
  )

  const changes: BlockChange[] = []
  let lastNew: Element | null = null
  let i = 0
  while (i < ops.length) {
    const op = ops[i]!
    if (op.type === 'equal') {
      lastNew = newBlocks[op.b]!.el
      i++
      continue
    }

    const removed: number[] = []
    const added: number[] = []
    while (i < ops.length && ops[i]!.type !== 'equal') {
      const o = ops[i]!
      if (o.type === 'delete') removed.push(o.a)
      else if (o.type === 'insert') added.push(o.b)
      i++
    }
    const nextOp = ops[i]
    const nextNew = nextOp?.type === 'equal' ? newBlocks[nextOp.b]!.el : null

    const pairedOld = new Map<number, number>()
    let minOld = 0
    for (const bi of added) {
      let best = -1
      let bestScore = EDIT_THRESHOLD
      for (let r = minOld; r < removed.length; r++) {
        const ai = removed[r]!
        if (oldBlocks[ai]!.kind !== newBlocks[bi]!.kind) continue
        const score = similarity(oldBlocks[ai]!.text, newBlocks[bi]!.text)
        if (score >= bestScore) {
          best = r
          bestScore = score
        }
      }
      if (best >= 0) {
        pairedOld.set(removed[best]!, bi)
        minOld = best + 1
      }
    }
    const pairedNew = new Set(pairedOld.values())

    for (const ai of removed) {
      if (pairedOld.has(ai)) continue
      changes.push({ type: 'removed', oldEl: oldBlocks[ai]!.el, after: lastNew, before: nextNew })
    }
    for (const bi of added) {
      const nb = newBlocks[bi]!
      if (pairedNew.has(bi)) {
        const ai = [...pairedOld].find(([, b]) => b === bi)![0]
        changes.push({ type: 'edited', el: nb.el, oldEl: oldBlocks[ai]!.el })
      } else {
        changes.push({ type: 'added', el: nb.el })
      }
    }
    if (added.length) lastNew = newBlocks[added[added.length - 1]!]!.el
  }
  return changes
}
