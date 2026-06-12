// State + logic for the community Proposals & Voting feature.
//
// The proposal LIST and every proposal's live tally / votes / comments come
// from the proposals API (Cloudflare Worker + D1); see cloudflare/proposals in
// the terraform-controller repo. Each proposal's CONTENT is authored as its own
// page under src/pages/proposals/<id>.vue.
//
// Votes are self-declared: the voter names their organisation (the API's vote
// identity — one vote per org) plus an optional name and comment. A second vote
// from the same org (or named person) is rejected, not overwritten. `myVotes`
// keeps THIS browser's own selection/attribution in localStorage so the UI
// remembers what you picked across reloads; the authoritative count is whatever
// the server returns.

import { ref, computed, watch, type Ref, type ComputedRef } from 'vue'
import { VOTERS, type Stance, type Comment, type Priority } from '@/data/proposals'

// Base URL of the proposals API. Override at build time with VITE_PROPOSALS_API;
// otherwise the deployed Worker.
const API_BASE = (
  (import.meta.env.VITE_PROPOSALS_API as string | undefined) ||
  'https://proposals-api.nebras-open-finance.com'
).replace(/\/$/, '')

// ── Configurable behaviours ──────────────────────────────────────────────────
export type ResultsVisibility = 'always' | 'after-vote'
export type CommentGrouping = 'stance' | 'chronological'

export const PROPOSALS_CONFIG = {
  // 'always' shows the tally to everyone; 'after-vote' hides it until you vote.
  resultsVisibility: 'always' as ResultsVisibility,
  // Dashed quorum marker on the bar + the quorum line under the tally.
  showQuorum: true,
  // 'stance' = three For/Against/Abstain columns; 'chronological' = one thread.
  commentGrouping: 'stance' as CommentGrouping,
}

// ── Types ────────────────────────────────────────────────────────────────────

// A voter's own vote on one proposal. `org`/`person` are filled once the
// attribution form is submitted; `submitted` gates the confirmation card.
export interface MyVote {
  stance: Stance
  org?: string
  person?: string
  submitted: boolean
}

export interface VoterEntry {
  org: string
  mine: boolean
}

export interface Counts {
  for: number
  against: number
  abstain: number
  total: number
}

export interface Tally {
  lists: Record<Stance, VoterEntry[]>
  counts: Counts
}

// One vote as returned by the API.
export interface ApiVote {
  org: string
  person?: string | null
  stance: Stance
  comment?: string | null
  created_at?: string
}

// Lightweight proposal metadata for the index, as returned by GET /proposals.
// Status is NOT returned — derive it from opened/closes via deriveStatus().
export interface ProposalMeta {
  id: string
  title: string
  opened: string
  closes: string
  priority?: Priority
  for_summary?: string | null
  against_summary?: string | null
  tally: Counts
}

interface LiveProposal {
  counts: Counts
  votes: ApiVote[]
}

export interface SubmitResult {
  ok: boolean
  message?: string
}

// ── State ────────────────────────────────────────────────────────────────────

const VOTES_KEY = 'altareq_proposal_votes'

const myVotes: Ref<Record<string, MyVote>> = ref({})

// The proposal list for the index, from GET /proposals.
const proposalList: Ref<ProposalMeta[]> = ref([])

// Per-proposal live tally + votes, keyed by id. From GET /proposals/:id (and the
// list endpoint, which fills counts only).
const liveById: Ref<Record<string, LiveProposal>> = ref({})

// Per-proposal metadata (dates, priority, …) as returned by the API, keyed by id.
// Lets a detail page source its dates/priority/status from the API rather than
// hardcoding them. Populated by both loadAll and loadOne.
const metaById: Ref<Record<string, ProposalMeta>> = ref({})

let hydrated = false

function loadJSON<T>(key: string, fallback: T): T {
  if (typeof localStorage === 'undefined') return fallback
  try {
    const v = localStorage.getItem(key)
    return v ? (JSON.parse(v) as T) : fallback
  } catch {
    return fallback
  }
}

// Read persisted state on the client. Called from onMounted so the server and
// the first client render agree (empty), avoiding a hydration mismatch.
function hydrate(): void {
  if (hydrated || typeof window === 'undefined') return
  hydrated = true
  myVotes.value = loadJSON<Record<string, MyVote>>(VOTES_KEY, {})
}

watch(
  myVotes,
  (v) => {
    if (typeof localStorage === 'undefined') return
    try { localStorage.setItem(VOTES_KEY, JSON.stringify(v)) } catch { /* private mode */ }
  },
  { deep: true },
)

// ── API calls ────────────────────────────────────────────────────────────────

const emptyCounts = (): Counts => ({ for: 0, against: 0, abstain: 0, total: 0 })

// Load the proposal list + tallies for the index page.
async function loadAll(): Promise<void> {
  if (typeof window === 'undefined') return
  try {
    const res = await fetch(`${API_BASE}/proposals`)
    if (!res.ok) return
    const data = (await res.json()) as { proposals: ProposalMeta[] }
    proposalList.value = data.proposals
    const next = { ...liveById.value }
    const nextMeta = { ...metaById.value }
    for (const p of data.proposals) {
      next[p.id] = { counts: p.tally, votes: next[p.id]?.votes ?? [] }
      nextMeta[p.id] = p
    }
    liveById.value = next
    metaById.value = nextMeta
  } catch { /* offline — keep whatever we have */ }
}

// Load one proposal's full tally + votes/comments for its detail page.
async function loadOne(id: string): Promise<void> {
  if (typeof window === 'undefined' || !id) return
  try {
    const res = await fetch(`${API_BASE}/proposals/${encodeURIComponent(id)}`)
    if (!res.ok) return
    const p = (await res.json()) as ProposalMeta & { tally: Counts; votes: ApiVote[] }
    liveById.value = { ...liveById.value, [id]: { counts: p.tally, votes: p.votes ?? [] } }
    const { tally: _t, votes: _v, ...meta } = p
    metaById.value = { ...metaById.value, [id]: { ...meta, tally: p.tally } }
  } catch { /* ignore */ }
}

const emptyLists = (): Record<Stance, VoterEntry[]> => ({ for: [], against: [], abstain: [] })

// Live tally for a proposal id: the server counts, plus the voter's own pick
// appended optimistically while it is still unsubmitted (once submitted, the
// server already counts it).
export function tallyOf(id: string, myVote?: MyVote): Tally {
  const live = liveById.value[id]
  const counts = live ? { ...live.counts } : emptyCounts()
  const lists = emptyLists()

  if (live) {
    for (const v of live.votes) lists[v.stance].push({ org: v.org, mine: false })
  }

  if (myVote && !myVote.submitted) {
    counts[myVote.stance] += 1
    counts.total += 1
    lists[myVote.stance].push({ org: myVote.org?.trim() || myVote.person?.trim() || 'You', mine: true })
  }

  return { lists, counts }
}

// Cast / toggle / clear a stance. Re-selecting the active stance clears the
// vote; switching stance keeps any attribution but drops the submitted flag so
// the form re-opens for the new stance.
function setVote(id: string, stance: Stance | null): void {
  const next = { ...myVotes.value }
  if (stance === null) {
    delete next[id]
  } else {
    const prev = next[id]
    next[id] = prev
      ? { ...prev, stance, submitted: prev.stance === stance ? prev.submitted : false }
      : { stance, submitted: false }
  }
  myVotes.value = next
}

// Submit the attribution form: POST the vote to the API and adopt the server's
// updated tally. The local record is set optimistically and rolled back to
// "unsubmitted" if the request fails, so the form re-opens for a retry.
// Returns { ok, message } so the UI can surface duplicate (409) / rate-limit
// (429) responses.
async function submitVote(
  id: string,
  detail: { stance: Stance; org: string; person: string; comment: string },
): Promise<SubmitResult> {
  const org = detail.org.trim()
  const person = detail.person.trim()
  const comment = detail.comment.trim()

  myVotes.value = {
    ...myVotes.value,
    [id]: { stance: detail.stance, org, person, submitted: true },
  }

  const rollback = () => {
    const mv = myVotes.value[id]
    if (mv) myVotes.value = { ...myVotes.value, [id]: { ...mv, submitted: false } }
  }

  try {
    const res = await fetch(`${API_BASE}/proposals/${encodeURIComponent(id)}/vote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ org, person, stance: detail.stance, comment }),
    })

    if (res.ok) {
      const p = (await res.json()) as { tally: Counts; votes: ApiVote[] }
      liveById.value = { ...liveById.value, [id]: { counts: p.tally, votes: p.votes ?? [] } }
      return { ok: true }
    }

    rollback()
    const serverMsg = await res.json().then((b) => (b as { error?: string }).error).catch(() => undefined)
    if (res.status === 409) {
      return { ok: false, message: serverMsg || 'That organisation has already voted on this proposal.' }
    }
    if (res.status === 429) {
      return { ok: false, message: serverMsg || 'Too many submissions — please wait a minute and try again.' }
    }
    return { ok: false, message: serverMsg || 'Could not record your vote. Please try again.' }
  } catch {
    rollback()
    return { ok: false, message: 'Network error — could not reach the voting service.' }
  }
}

// Comments for a proposal id, derived from the votes that carry one (server-side).
function commentsFor(id: string): Comment[] {
  const live = liveById.value[id]
  if (!live) return []
  return live.votes
    .filter((v) => v.comment && v.comment.trim())
    .map((v) => ({
      org: v.org,
      person: v.person || v.org,
      stance: v.stance,
      time: v.created_at || '',
      text: v.comment as string,
    }))
}

export interface UseProposals {
  proposalList: Ref<ProposalMeta[]>
  metaById: Ref<Record<string, ProposalMeta>>
  voters: string[]
  voterTotal: number
  myVotes: Ref<Record<string, MyVote>>
  votedCount: ComputedRef<number>
  config: typeof PROPOSALS_CONFIG
  hydrate: () => void
  loadAll: () => Promise<void>
  loadOne: (id: string) => Promise<void>
  tallyOf: (id: string, myVote?: MyVote) => Tally
  setVote: (id: string, stance: Stance | null) => void
  submitVote: (id: string, detail: { stance: Stance; org: string; person: string; comment: string }) => Promise<SubmitResult>
  commentsFor: (id: string) => Comment[]
}

const votedCount = computed<number>(() => Object.keys(myVotes.value).length)

export function useProposals(): UseProposals {
  return {
    proposalList,
    metaById,
    voters: VOTERS,
    voterTotal: VOTERS.length,
    myVotes,
    votedCount,
    config: PROPOSALS_CONFIG,
    hydrate,
    loadAll,
    loadOne,
    tallyOf,
    setVote,
    submitVote,
    commentsFor,
  }
}
