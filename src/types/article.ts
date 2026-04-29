// Phase 5 — shared types for the Knowledge Base section.
//
// `ArticleMeta` is the shape declared inside each article page's
// <route lang="yaml"> block. The data loader (`@/data/articles`) reads it
// off the route record, derives the slug + URL, and returns `Article[]`
// for the index page card grid.

export interface ArticleMeta {
  title: string
  description: string
  category: string
  readTime: string
  updated: string
  tags: string[]
}

export interface Article {
  slug: string
  url: string
  title: string
  description: string
  category: string
  readTime: string
  updated: string
  tags: string[]
}

// Known categories in the KB index — used for chip ordering and colour
// mapping. The string fallback keeps the type open for future additions
// without a breaking change here.
export type ArticleCategory =
  | 'Consents'
  | 'Payments'
  | 'Security'
  | 'Integration'
  | string
