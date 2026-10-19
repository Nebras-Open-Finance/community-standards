import generatedRoutes from '~pages'
import type { RouteRecordRaw } from 'vue-router'
import type { Article, ArticleMeta } from '@/types/article'
import { VERSIONS } from '@/data/versions'

// Reads the optional `versions` list from an article's route meta. Unknown
// keys are dropped, so a typo makes the article apply to every version rather
// than to none.
export function readArticleVersions(meta: unknown): string[] {
  if (!meta || typeof meta !== 'object') return []
  const raw = (meta as Record<string, unknown>)['versions']
  if (!Array.isArray(raw)) return []
  return raw.filter((v): v is string => typeof v === 'string' && (VERSIONS as readonly string[]).includes(v))
}

// "v2.1 only", "v2.1 and v2.2-rc2". Empty string when the article applies to
// every version.
export function formatArticleVersions(versions: readonly string[]): string {
  if (versions.length === 0) return ''
  if (versions.length === 1) return `${versions[0]} only`
  return `${versions.slice(0, -1).join(', ')} and ${versions[versions.length - 1]}`
}

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
  return { title, description, category, readTime, updated, tags, versions: readArticleVersions(m) }
}

function slugFromPath(path: string): string {
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
    versions: meta.versions,
  }
}

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
