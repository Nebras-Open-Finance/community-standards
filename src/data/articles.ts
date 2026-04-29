// Phase 5 — runtime KB articles registry, replaces
// `docs/knowledge-base/articles.data.ts`.
//
// The original VitePress loader scanned `docs/knowledge-base/articles/*.md`
// via `createContentLoader`. Here, every article page lives at
// `src/pages/knowledge-base/articles/<slug>.vue` and declares its meta
// in a `<route lang="yaml">` block; vite-plugin-pages lifts that into the
// generated route record's `meta` field. We filter the route table for
// article detail routes and build `Article[]` from each one.
//
// `articles` is evaluated once at module load. SSG embeds the result in the
// rendered HTML for `/knowledge-base/`, and client hydration uses the same
// constant — no fs reads, no async, no build hooks. Mirrors the pattern in
// `@/data/policies`.

import generatedRoutes from '~pages'
import type { RouteRecordRaw } from 'vue-router'
import type { Article, ArticleMeta } from '@/types/article'

// Narrow the loose `RouteMeta` from vue-router into the typed shape we need
// for an article detail page. Index routes (and anything malformed) return
// null so they can be filtered out cleanly.
function readArticleMeta(meta: unknown): ArticleMeta | null {
  if (!meta || typeof meta !== 'object') return null
  const m = meta as Record<string, unknown>
  if (m['isIndex'] === true) return null

  const title = typeof m['title'] === 'string' ? m['title'] : ''
  const description = typeof m['description'] === 'string' ? m['description'] : ''
  const category = typeof m['category'] === 'string' ? m['category'] : ''
  const readTime = typeof m['readTime'] === 'string' ? m['readTime'] : ''
  const updated = typeof m['updated'] === 'string' ? m['updated'] : ''
  const tagsRaw = m['tags']
  const tags = Array.isArray(tagsRaw)
    ? tagsRaw.filter((x): x is string => typeof x === 'string')
    : []

  if (!title) return null
  return { title, description, category, readTime, updated, tags }
}

function slugFromPath(path: string): string {
  // Routes look like `/knowledge-base/articles/jwt-claims` (cleanUrls) or
  // with a trailing slash. Strip the slash and take the last segment.
  const trimmed = path.replace(/\/+$/, '')
  const idx = trimmed.lastIndexOf('/')
  return idx >= 0 ? trimmed.slice(idx + 1) : trimmed
}

function buildArticle(route: RouteRecordRaw, meta: ArticleMeta): Article {
  const slug = slugFromPath(route.path)
  return {
    slug,
    url: `/knowledge-base/articles/${slug}`,
    title: meta.title,
    description: meta.description,
    category: meta.category,
    readTime: meta.readTime,
    updated: meta.updated,
    tags: meta.tags,
  }
}

// Walk the generated route tree (vite-plugin-pages emits a nested shape for
// directories like `/knowledge-base`). Flatten before filtering — children
// with their own `<route>` blocks otherwise stay buried under the index.
function flatten(routes: readonly RouteRecordRaw[]): RouteRecordRaw[] {
  const out: RouteRecordRaw[] = []
  for (const r of routes) {
    out.push(r)
    if (r.children && r.children.length > 0) out.push(...flatten(r.children))
  }
  return out
}

const ARTICLE_DETAIL_PATH = /^\/knowledge-base\/articles\/[^/]+\/?$/

export const articles: Article[] = flatten(generatedRoutes)
  .filter(r => ARTICLE_DETAIL_PATH.test(r.path))
  .map(r => {
    const meta = readArticleMeta(r.meta)
    return meta ? buildArticle(r, meta) : null
  })
  .filter((a): a is Article => a !== null)
  .sort((a, b) => a.title.localeCompare(b.title))
