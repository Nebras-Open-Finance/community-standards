// Shared types + presentation maps for the community Proposals & Voting feature.
//
// The proposal LIST and its live tallies/votes come from the proposals API
// (Cloudflare Worker + D1) via `@/composables/useProposals`. Each proposal's
// CONTENT is authored as its own page under `src/pages/proposals/<id>.vue`,
// which constructs a `Proposal` (below) and hands it to `PvProposalView`.
//
// This module is plain TS — NO `@/` aliases or Vue imports — so it stays
// resolvable from Node (e.g. `src/data/ssg-paths.ts`).

export type Stance = 'for' | 'against' | 'abstain'
// Status is derived (the API does not store or return it) — see deriveStatus().
// For EXTERNAL proposals it comes from the open/close dates: 'draft' before it
// opens, 'open' while the voting window is live, 'closed' once it has passed.
// An INTERNAL proposal (the `internal` flag from the API) overrides all of this
// with the 'internal' status, regardless of its dates.
export type Status = 'draft' | 'open' | 'closed' | 'internal'
export type Priority = 'critical' | 'high' | 'medium' | 'low'

export interface ParagraphBlock { kind: 'p'; text: string }
export interface CalloutBlock { kind: 'callout'; tone: 'tip' | 'warning' | 'danger'; title: string; text: string }
export interface CodeBlock { kind: 'code'; label: string; text: string }
export interface OptionsBlock { kind: 'options'; items: { key: string; title: string; desc: string }[] }
export interface RefBlock { kind: 'ref'; text: string; link: string }
export type Block = ParagraphBlock | CalloutBlock | CodeBlock | OptionsBlock | RefBlock

export interface Comment {
  org: string
  person: string
  stance: Stance
  time: string
  text: string
  mine?: boolean
}

// The authored display metadata + body for one proposal. Votes/comments are NOT
// here — they come from the API at runtime, keyed by `id`.
export interface Proposal {
  id: string
  title: string
  summary: string
  category: string
  priority: Priority
  status: Status
  author: { org: string; person: string }
  opened: string
  closes: string
  closesIn: string
  body: Block[]
  // Optional questions (max 3) sourced from the API; each gets its own text box
  // in the vote form alongside the comment. Empty/absent → only the comment box.
  questions?: string[]
  // Target standards version (when the change will be made), e.g. 'V2.2'.
  version?: string
}

// The ecosystem organisations who hold a vote — used as suggestions in the
// attribution form. Nebras runs the site and presents proposals; it does not
// vote on them.
export const VOTERS: string[] = [
  'ADIB', 'Wio Bank', 'Emirates NBD', 'FAB', 'Mashreq', 'ENBD X', 'HSBC UAE',
  'DIB', 'CBD', 'RAKBANK', 'ADCB', 'Liv.', 'YAP', 'Zand', 'Ruya', 'Al Maryah',
  'Lean', 'Tarabut', 'TrueLayer', 'Nymcard', 'Mamo', 'Pyypl', 'Ziina', 'Baraka',
]

// ── Presentation maps (pure constants, bound via :style in the SFCs) ─────────

export interface StanceMeta { label: string; ink: string; bar: string }
export const STANCE: Record<Stance, StanceMeta> = {
  for: { label: 'For', ink: '#008B78', bar: '#00C2A9' },
  against: { label: 'Against', ink: '#A6391F', bar: '#C2502E' },
  abstain: { label: 'Abstain', ink: '#6B7280', bar: '#A8ABB2' },
}
export const STANCE_ORDER: Stance[] = ['for', 'against', 'abstain']

export interface StatusMeta { label: string; fg: string; bg: string }
export const STATUS: Record<Status, StatusMeta> = {
  draft: { label: 'Draft', fg: '#B37819', bg: 'rgba(179,120,25,0.12)' },
  open: { label: 'Open', fg: '#0043A6', bg: 'rgba(0,67,166,0.08)' },
  closed: { label: 'Closed', fg: '#6B7280', bg: 'rgba(107,114,128,0.12)' },
  internal: { label: 'Internal', fg: '#6D28D9', bg: 'rgba(109,40,217,0.12)' },
}

// Today as ISO 'YYYY-MM-DD' (UTC). Isolated so status derivation is testable.
export function todayISO(): string {
  return new Date().toISOString().slice(0, 10)
}

// Derive a proposal's status — the backend neither stores nor returns a status.
// An `internal` proposal is always 'internal', whatever its dates. Otherwise it
// comes from the open/close window: before the opening date → 'draft'; after the
// closing date → 'closed'; on or between the two (inclusive) → 'open'. Dates are
// ISO 'YYYY-MM-DD'.
export function deriveStatus(opened?: string, closes?: string, today: string = todayISO(), internal = false): Status {
  if (internal) return 'internal'
  if (opened && today < opened) return 'draft'
  if (closes && today > closes) return 'closed'
  return 'open'
}

export interface PriorityMeta { label: string; color: string; level: number }
export const PRIORITY: Record<Priority, PriorityMeta> = {
  critical: { label: 'Critical', color: '#A6391F', level: 3 },
  high: { label: 'High impact', color: '#B37819', level: 2 },
  medium: { label: 'Medium', color: '#008BE4', level: 1 },
  low: { label: 'Low', color: '#6B7280', level: 1 },
}

// Category → one of the brand accent colours.
export const CATEGORY_COLORS: Record<string, string> = {
  Payments: '#B37819',
  Security: '#008BE4',
  Consent: '#008B78',
  Infrastructure: '#00277F',
  'Data Sharing': '#008B78',
}
export function categoryColor(category: string): string {
  return CATEGORY_COLORS[category] ?? '#00277F'
}

// Avatar initials: drop dots, take the first letter of up to two words.
export function initials(org: string): string {
  return org
    .replace(/\./g, '')
    .split(' ')
    .map((w) => w[0] ?? '')
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export function isDecided(status: Status): boolean {
  return status === 'closed'
}
