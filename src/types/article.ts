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

export type ArticleCategory =
  | 'Consents'
  | 'Payments'
  | 'Security'
  | 'Integration'
  | string
