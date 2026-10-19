export interface ArticleMeta {
  title: string
  description: string
  category: string
  readTime: string
  updated: string
  tags: string[]
  // Site versions the article applies to (keys from VERSIONS). Empty means it
  // applies to every version — the default for almost all articles.
  versions: string[]
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
  versions: string[]
}

export type ArticleCategory =
  | 'Consents'
  | 'Payments'
  | 'Security'
  | 'Integration'
  | string
