export interface PolicyMeta {
  title: string
  appliesTo: string[]
  purpose: string
  readTime: string
  updated: string
}

export type PolicyCategory = 'Nebras' | 'Participants' | ''

export interface Policy {
  slug: string
  url: string
  title: string
  appliesTo: string[]
  appliesToShort: string[]
  category: PolicyCategory
  purpose: string
  readTime: string
  updated: string
}
