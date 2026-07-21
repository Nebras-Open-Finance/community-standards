// Page registry for the /internal section.
//
// Two kinds of page live here:
//
//  1. Committed pages — real Markdown files under src/pages/internal/*.md that
//     have been pushed to the repo. Discovered at build time via import.meta.glob.
//  2. Drafts — pages a user is authoring in the browser. They are NOT shared:
//     they live in this browser's localStorage until the author copies the
//     generated file into the repo and commits it (see the editor's "Publish"
//     panel). Once committed and deployed, the page becomes a committed page
//     and the draft can be deleted.

import { ref, type Ref } from 'vue'

export interface InternalDraft {
  slug: string
  title: string
  body: string
  updatedAt: number
}

const STORAGE_KEY = 'internal-drafts'

// Module-level singleton so the sidebar, index and editor all see one list.
const drafts: Ref<InternalDraft[]> = ref([])
let hydrated = false

function persist(): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(drafts.value))
  } catch {
    // Storage full / disabled — the in-memory list still works for this load.
  }
}

function hydrate(): void {
  if (hydrated) return
  hydrated = true
  if (typeof window === 'undefined') return
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    if (Array.isArray(parsed)) drafts.value = parsed
  } catch {
    drafts.value = []
  }
}

// ── Committed pages (build-time discovery) ───────────────────────────────────
// Keys look like "/src/pages/internal/some-page.md". index.vue / draft/[slug].vue
// are .vue files and are deliberately excluded by the .md-only glob.
const committedModules = import.meta.glob('/src/pages/internal/**/*.md')

/** Slugs of committed internal pages, e.g. "some-page" → route /internal/some-page. */
export const committedSlugs: string[] = Object.keys(committedModules)
  .map((p) => p.replace('/src/pages/internal/', '').replace(/\.md$/, '').replace(/\/index$/, ''))
  .sort()

// ── App pages (build-time discovery) ─────────────────────────────────────────
// Hand-written Vue pages under src/pages/internal/pages/**. They live behind the
// same password gate and share the internal sidebar, but they are applications
// rather than documents — so the layout renders them directly instead of wrapping
// them in the Markdown source/preview shell.
const appPageModules = import.meta.glob('/src/pages/internal/pages/**/*.vue')

/** Slugs of internal app pages, e.g. "redirect-testing" → /internal/pages/redirect-testing. */
export const appPageSlugs: string[] = Object.keys(appPageModules)
  .map((p) => p.replace('/src/pages/internal/pages/', '').replace(/\.vue$/, '').replace(/\/index$/, ''))
  .sort()

// Raw Markdown source for each committed internal page — lets the duplicate
// widget seed a draft with the exact text the example page is written in.
const committedSources = import.meta.glob('/src/pages/internal/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

/** Raw Markdown source (frontmatter stripped) for a committed internal page. */
export function getCommittedSource(slug: string): string | undefined {
  const raw = committedSources[`/src/pages/internal/${slug}.md`]
  if (raw === undefined) return undefined
  return stripFrontmatter(raw).replace(/^\s*\n+/, '')
}

function stripFrontmatter(raw: string): string {
  if (!raw.startsWith('---')) return raw
  const end = raw.indexOf('\n---', 3)
  if (end === -1) return raw
  return raw.slice(end + 4).replace(/^\r?\n/, '')
}

// ── Slug helpers ─────────────────────────────────────────────────────────────

/** Turn free text into a kebab-case slug (a–z, 0–9, single hyphens). */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/** A slug is valid when it is non-empty kebab-case. */
export function isValidSlug(slug: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)
}

/** Human-readable title derived from a slug ("some-page" → "Some Page"). */
export function prettifySlug(slug: string): string {
  return slug
    .split(/[-/]/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

export interface UseInternalPages {
  drafts: Ref<InternalDraft[]>
  committedSlugs: string[]
  /** True when a committed page OR a draft already uses this slug. */
  slugExists: (slug: string) => boolean
  getDraft: (slug: string) => InternalDraft | undefined
  /** Creates an empty draft. Returns false when the slug is taken. */
  createDraft: (slug: string, title: string) => boolean
  /** Creates a draft pre-seeded with the given Markdown body. */
  createDraftWithBody: (slug: string, title: string, body: string) => boolean
  saveDraft: (slug: string, patch: Partial<Pick<InternalDraft, 'title' | 'body'>>) => void
  deleteDraft: (slug: string) => void
}

export function useInternalPages(): UseInternalPages {
  hydrate()

  function slugExists(slug: string): boolean {
    return committedSlugs.includes(slug) || drafts.value.some((d) => d.slug === slug)
  }

  function getDraft(slug: string): InternalDraft | undefined {
    return drafts.value.find((d) => d.slug === slug)
  }

  function createDraft(slug: string, title: string): boolean {
    return createDraftWithBody(
      slug,
      title,
      `# ${title || prettifySlug(slug)}\n\nStart writing in Markdown…\n`,
    )
  }

  function createDraftWithBody(slug: string, title: string, body: string): boolean {
    if (slugExists(slug)) return false
    drafts.value.push({
      slug,
      title: title || prettifySlug(slug),
      body,
      updatedAt: Date.now(),
    })
    persist()
    return true
  }

  function saveDraft(slug: string, patch: Partial<Pick<InternalDraft, 'title' | 'body'>>): void {
    const draft = drafts.value.find((d) => d.slug === slug)
    if (!draft) return
    if (patch.title !== undefined) draft.title = patch.title
    if (patch.body !== undefined) draft.body = patch.body
    draft.updatedAt = Date.now()
    persist()
  }

  function deleteDraft(slug: string): void {
    drafts.value = drafts.value.filter((d) => d.slug !== slug)
    persist()
  }

  return {
    drafts,
    committedSlugs,
    slugExists,
    getDraft,
    createDraft,
    createDraftWithBody,
    saveDraft,
    deleteDraft,
  }
}
