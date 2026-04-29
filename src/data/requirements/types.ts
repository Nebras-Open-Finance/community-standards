export type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'

export interface Rule {
  field: string
  rule: string
  validatedBy: string
}

export interface GenericRow {
  cells: string[]
}

export interface GenericTable {
  headers: string[]
  rows: GenericRow[]
}

export type CalloutKind = 'warning' | 'info' | 'tip' | 'danger'

export interface Callout {
  kind: CalloutKind
  title?: string
  html: string
}

export type Block =
  | { kind: 'prose'; html: string }
  | { kind: 'table'; table: GenericTable }
  | { kind: 'callout'; callout: Callout }

export interface Subsection {
  heading: string
  intro?: string
  rules?: Rule[]
  table?: GenericTable
  aside?: string
  callouts?: Callout[]
  blocks?: Block[]
  subsections?: Subsection[]
}

export interface Section {
  id: string
  num: string
  title: string
  method?: HttpMethod
  path?: string
  intro?: string
  rules?: Rule[]
  table?: GenericTable
  aside?: string
  callouts?: Callout[]
  blocks?: Block[]
  subsections?: Subsection[]
}

export interface RequirementsPageData {
  title: string
  version?: string
  readTime?: string
  eyebrow?: string
  lede: string
  preconditions?: string
  callouts?: Callout[]
  sections: Section[]
}
