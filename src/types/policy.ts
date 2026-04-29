// Phase 4 — shared types for the Policy section.
//
// `PolicyMeta` is the shape declared inside each policy page's
// <route lang="yaml"> block. The data loader (`@/data/policies`) reads it
// off the route record, derives the slug + URL + category, and returns
// `Policy[]` for the index page card grid.

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
