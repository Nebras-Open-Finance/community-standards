// State + logic for the community Proposals & Voting feature.
//
// The proposal LIST and every proposal's live tally / votes / comments come
// from the proposals API (Cloudflare Worker + D1); see cloudflare/proposals in
// the terraform-controller repo. Each proposal's CONTENT is authored as its own
// page under src/pages/proposals/<id>.vue.
//
// Voting requires a Trust Framework SSO session (sandbox directory). The voter's
// organisation and name are PULLED from the signed-in identity — never typed in —
// and the vote is keyed on that identity, so one vote per person (two colleagues
// from the same org may each vote). A second vote from the same person is
// rejected, not overwritten. `myVotes` keeps THIS browser's own selection in
// localStorage so the UI remembers what you picked across reloads; the
// authoritative count is whatever the server returns. `auth` mirrors the current
// session (from GET /me) so the vote form can show who you are or prompt sign-in.

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
  showQuorum: false,
  // 'stance' = three For/Against/Abstain columns; 'chronological' = one thread.
  commentGrouping: 'stance' as CommentGrouping,
}

// ── Types ────────────────────────────────────────────────────────────────────

// A voter's own vote on one proposal. `org`/`person` are filled once the
// attribution form is submitted; `submitted` gates the confirmation card.
export interface MyVote {
  stance: Stance
  org?: string | undefined
  person?: string | undefined
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

// One answer to a proposal question, as returned by the API (stored only — not
// displayed anywhere yet). `q` snapshots the question text at submit time.
export interface ApiAnswer {
  q: string
  a: string
}

// One vote as returned by the API.
export interface ApiVote {
  org: string
  person?: string | null
  stance: Stance
  comment?: string | null
  created_at?: string
  answers?: ApiAnswer[]
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
  // Up to 3 optional questions for this proposal; [] when there are none.
  questions?: string[]
  // Target standards version (when the change will be made), e.g. 'V2.2'; '' if unset.
  version?: string | null
  tally: Counts
}

interface LiveProposal {
  counts: Counts
  votes: ApiVote[]
}

export interface SubmitResult {
  ok: boolean
  message?: string
  // Set when the vote was rejected because there is no valid session — the UI
  // should prompt the user to sign in via the Trust Framework.
  needsAuth?: boolean
}

// One organisation the signed-in user is an active member of.
export interface AuthOrg {
  id: string
  name: string
}

// Current Trust Framework session, mirrored from GET /me. `loaded` flips true
// once the first /me call resolves (so the UI can avoid flashing "sign in" before
// we know). `canVote` is true for any authenticated user who is an active member
// of at least one organisation; a multi-org member votes on behalf of all their
// orgs at once. The server applies the same rule when a vote is cast.
export interface AuthState {
  loaded: boolean
  authenticated: boolean
  name?: string | undefined
  email?: string | undefined
  orgs: AuthOrg[]
  canVote: boolean
}

// ── State ────────────────────────────────────────────────────────────────────

const VOTES_KEY = 'altareq_proposal_votes'

const myVotes: Ref<Record<string, MyVote>> = ref({})

// The current Trust Framework session (from GET /me). Populated by loadMe().
const auth: Ref<AuthState> = ref({ loaded: false, authenticated: false, orgs: [], canVote: false })

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

// Load the current Trust Framework session. Sends the session cookie (credentials
// 'include'); on any failure we treat the user as signed out.
async function loadMe(): Promise<void> {
  if (typeof window === 'undefined') return
  try {
    const res = await fetch(`${API_BASE}/me`, { credentials: 'include' })
    if (!res.ok) {
      auth.value = { loaded: true, authenticated: false, orgs: [], canVote: false }
      return
    }
    const d = (await res.json()) as Partial<AuthState> & { authenticated?: boolean }
    auth.value = {
      loaded: true,
      authenticated: !!d.authenticated,
      name: d.name,
      email: d.email,
      orgs: Array.isArray(d.orgs) ? d.orgs : [],
      canVote: !!d.canVote,
    }
  } catch {
    auth.value = { loaded: true, authenticated: false, orgs: [], canVote: false }
  }
}

// Send the user through Trust Framework SSO, returning to the current page. This
// is a top-level navigation (not a fetch) so the directory can set its cookies
// and redirect back to /callback, which lands us back here signed in.
function signInToVote(): void {
  if (typeof window === 'undefined') return
  const redirect = encodeURIComponent(window.location.href)
  window.location.href = `${API_BASE}/login?redirect=${redirect}`
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

// Submit a vote: POST { stance, comment } to the API (with the session cookie)
// and adopt the server's updated tally. Identity and organisation are taken from
// the session server-side — they are NOT sent from here. The local record is set
// optimistically (its org/person filled from the signed-in identity for the
// confirmation card) and rolled back to "unsubmitted" if the request fails, so
// the form re-opens for a retry. Returns { ok, message, needsAuth } so the UI can
// surface auth (401) / not-eligible (403) / duplicate (409) / rate-limit (429).
async function submitVote(
  id: string,
  detail: { stance: Stance; comment: string; answers?: string[] },
): Promise<SubmitResult> {
  const comment = detail.comment.trim()
  // Answers are sent aligned by index to the proposal's questions; the server
  // drops blanks/extras and snapshots the question text. Identity and org are
  // never sent — they come from the session.
  const answers = (detail.answers ?? []).map((s) => (typeof s === 'string' ? s : ''))
  const a = auth.value

  // Attribute the optimistic record to all the voter's orgs (comma-joined),
  // matching how the server stores the vote.
  const orgLabel = a.orgs.map((o) => o.name).join(', ') || undefined

  myVotes.value = {
    ...myVotes.value,
    [id]: { stance: detail.stance, org: orgLabel, person: a.name, submitted: true },
  }

  const rollback = () => {
    const mv = myVotes.value[id]
    if (mv) myVotes.value = { ...myVotes.value, [id]: { ...mv, submitted: false } }
  }

  try {
    const res = await fetch(`${API_BASE}/proposals/${encodeURIComponent(id)}/vote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ stance: detail.stance, comment, answers }),
    })

    if (res.ok) {
      const p = (await res.json()) as { tally: Counts; votes: ApiVote[] }
      liveById.value = { ...liveById.value, [id]: { counts: p.tally, votes: p.votes ?? [] } }
      return { ok: true }
    }

    rollback()
    const serverMsg = await res.json().then((b) => (b as { error?: string }).error).catch(() => undefined)
    if (res.status === 401) {
      // Session missing/expired — refresh our view of it and ask the UI to prompt sign-in.
      void loadMe()
      return { ok: false, needsAuth: true, message: serverMsg || 'Please sign in with the Trust Framework to vote.' }
    }
    if (res.status === 403) {
      return { ok: false, message: serverMsg || 'Your account is not eligible to vote on this proposal.' }
    }
    if (res.status === 409) {
      return { ok: false, message: serverMsg || 'You have already voted on this proposal.' }
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
  auth: Ref<AuthState>
  votedCount: ComputedRef<number>
  config: typeof PROPOSALS_CONFIG
  hydrate: () => void
  loadAll: () => Promise<void>
  loadOne: (id: string) => Promise<void>
  loadMe: () => Promise<void>
  signInToVote: () => void
  tallyOf: (id: string, myVote?: MyVote) => Tally
  setVote: (id: string, stance: Stance | null) => void
  submitVote: (id: string, detail: { stance: Stance; comment: string; answers?: string[] }) => Promise<SubmitResult>
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
    auth,
    votedCount,
    config: PROPOSALS_CONFIG,
    hydrate,
    loadAll,
    loadOne,
    loadMe,
    signInToVote,
    tallyOf,
    setVote,
    submitVote,
    commentsFor,
  }
}
