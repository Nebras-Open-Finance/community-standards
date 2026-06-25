<route lang="yaml">
meta:
  title: 'Proposal votes'
</route>

<script setup lang="ts">
// Admin-only votes breakdown for a single proposal — who voted For / Against /
// Abstain, with every comment and question answer.
//
// This page is deliberately UNLINKED (no nav entry, no sitemap — it returns []
// from ssg-paths.ts so it is never prerendered) and reached by URL only:
//   /proposals/<id>/votes
//
// The real boundary is server-side: the proposals Worker's GET /proposals/:id/votes
// only returns data to a Trust Framework session that is Nebras staff / a super
// admin (see requireAdmin / loadProposalVotes). The page renders sign-in (401) /
// not-allowed (403) states accordingly; nothing sensitive ships in the bundle.
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@unhead/vue'
import { STANCE, STANCE_ORDER, type Stance } from '@/data/proposals'
import { useProposals, type ProposalVotes, type ApiVote } from '@/composables/useProposals'

// Hidden admin page — keep it out of search indexes entirely.
useHead({ meta: [{ name: 'robots', content: 'noindex, nofollow' }] })

const route = useRoute()
// URLs are lowercase (/proposals/ofp-003/votes); the API keys proposals by their
// uppercase id (OFP-003).
const id = computed(() => String(route.params.id || '').toUpperCase())

const { auth, loadMe, loadProposalVotes, signInToVote } = useProposals()

const loading = ref(true)
const data = ref<ProposalVotes | null>(null)
const errorStatus = ref(0)
const errorMsg = ref('')

async function load(): Promise<void> {
  loading.value = true
  errorStatus.value = 0
  errorMsg.value = ''
  await loadMe()
  const res = await loadProposalVotes(id.value)
  if (res.ok && res.data) {
    data.value = res.data
  } else {
    errorStatus.value = res.status
    errorMsg.value = res.message || ''
  }
  loading.value = false
}

onMounted(() => {
  void load()
  if (typeof window !== 'undefined') window.scrollTo(0, 0)
})

// Votes grouped by stance, in For / Against / Abstain order. Each list keeps the
// API's order (most recent first).
const votesByStance = computed<Record<Stance, ApiVote[]>>(() => {
  const groups: Record<Stance, ApiVote[]> = { for: [], against: [], abstain: [] }
  for (const v of data.value?.votes ?? []) {
    if (groups[v.stance]) groups[v.stance].push(v)
  }
  return groups
})

const tally = computed(() => data.value?.tally ?? { for: 0, against: 0, abstain: 0, total: 0 })

// 'YYYY-MM-DD HH:MM:SS' (UTC, from D1 datetime()) → '25 Jun 2026, 13:45 UTC'.
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
function fmtWhen(raw?: string): string {
  if (!raw) return ''
  const d = new Date(raw.replace(' ', 'T') + 'Z')
  if (Number.isNaN(d.getTime())) return raw
  const hh = String(d.getUTCHours()).padStart(2, '0')
  const mm = String(d.getUTCMinutes()).padStart(2, '0')
  return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}, ${hh}:${mm} UTC`
}
</script>

<template>
  <div class="pv">
    <!-- ─── Hero ─────────────────────────────────────────────────────────── -->
    <section class="pv-hero">
      <div class="pv-hero__inner">
        <RouterLink :to="`/proposals/${id.toLowerCase()}`" class="pv__back">
          <span class="pv__back-arrow">&larr;</span> Back to {{ id }}
        </RouterLink>

        <div class="pv__eyebrow"><span class="pv__eyebrow-dash" /> Votes &middot; Nebras &amp; super admins only</div>
        <h1 class="pv__title">
          {{ data ? data.title : `${id} votes` }}
        </h1>
        <p class="pv__id">{{ id }}</p>

        <!-- Tally strip (only once data is in) -->
        <div v-if="data" class="pv__strip">
          <div v-for="s in STANCE_ORDER" :key="s" class="pv__strip-item">
            <div class="pv__strip-key" :style="{ color: STANCE[s].ink }">{{ STANCE[s].label }}</div>
            <div class="pv__strip-val">{{ tally[s] }}</div>
          </div>
          <div class="pv__strip-item">
            <div class="pv__strip-key">Total</div>
            <div class="pv__strip-val">{{ tally.total }}</div>
          </div>
        </div>
      </div>
    </section>

    <section class="pv-band">
      <div class="pv-band__inner">
        <!-- ─── Loading ──────────────────────────────────────────────────── -->
        <div v-if="loading" class="pv-note">Loading votes…</div>

        <!-- ─── Not signed in (401) ──────────────────────────────────────── -->
        <div v-else-if="errorStatus === 401" class="pv-gate">
          <div class="pv-gate__label">Sign in required</div>
          <h2 class="pv-gate__title">This page is for Nebras staff and super admins</h2>
          <p class="pv-gate__msg">
            Sign in with your Trust Framework account to view how each organisation voted.
          </p>
          <button type="button" class="pv-gate__btn" @click="signInToVote">
            Sign in with the Trust Framework
          </button>
        </div>

        <!-- ─── Signed in but not allowed (403) ──────────────────────────── -->
        <div v-else-if="errorStatus === 403" class="pv-gate pv-gate--deny">
          <div class="pv-gate__label">Access restricted</div>
          <h2 class="pv-gate__title">Your account can’t view this page</h2>
          <p class="pv-gate__msg">
            {{ errorMsg || 'This votes breakdown is restricted to Nebras staff and super admins.' }}
            <template v-if="auth.name"><br />Signed in as {{ auth.name }}.</template>
          </p>
        </div>

        <!-- ─── Not found (404) ──────────────────────────────────────────── -->
        <div v-else-if="errorStatus === 404" class="pv-note">
          No proposal with id <strong>{{ id }}</strong> was found.
        </div>

        <!-- ─── Other error ──────────────────────────────────────────────── -->
        <div v-else-if="!data" class="pv-note">
          {{ errorMsg || 'Could not load votes. Please try again.' }}
        </div>

        <!-- ─── Loaded ───────────────────────────────────────────────────── -->
        <template v-else>
          <p v-if="tally.total === 0" class="pv-note">No votes have been cast yet.</p>

          <div v-for="s in STANCE_ORDER" :key="s" class="pv-group" v-show="votesByStance[s].length">
            <div class="pv-group__head" :style="{ borderTopColor: STANCE[s].bar }">
              <span class="pv-group__pill" :style="{ color: STANCE[s].ink, background: `${STANCE[s].bar}22` }">
                {{ STANCE[s].label }}
              </span>
              <span class="pv-group__count">{{ votesByStance[s].length }}
                {{ votesByStance[s].length === 1 ? 'vote' : 'votes' }}</span>
            </div>

            <ul class="pv-votes">
              <li v-for="(v, i) in votesByStance[s]" :key="`${s}-${i}`" class="pv-vote">
                <div class="pv-vote__who">
                  <span class="pv-vote__person">{{ v.person || v.org || 'Unknown' }}</span>
                  <span v-if="v.person && v.org" class="pv-vote__org">{{ v.org }}</span>
                  <span v-if="v.created_at" class="pv-vote__when">{{ fmtWhen(v.created_at) }}</span>
                </div>

                <p v-if="v.comment" class="pv-vote__comment">{{ v.comment }}</p>
                <p v-else class="pv-vote__comment pv-vote__comment--empty">No comment</p>

                <div v-if="v.answers && v.answers.length" class="pv-answers">
                  <div v-for="(a, j) in v.answers" :key="j" class="pv-answer">
                    <div class="pv-answer__q">{{ a.q }}</div>
                    <div class="pv-answer__a">{{ a.a }}</div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </template>
      </div>
    </section>
  </div>
</template>

<style scoped>
.pv {
  background: var(--at-bg-cream);
  color: var(--at-navy-deep);
  font-family: var(--at-sans);
  min-height: 70vh;
}

/* ─── Hero ──────────────────────────────────────────────────────────────── */
.pv-hero { background: var(--at-bg-cream); border-bottom: 1px solid var(--at-grid-line); }
.pv-hero__inner { max-width: var(--at-page-max); margin: 0 auto; padding: 2.75rem 2rem 2.5rem; }

.pv__back {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--at-mute-2);
  font-weight: 600;
  text-decoration: none;
  margin-bottom: 1.75rem;
  transition: color 0.15s ease;
}
.pv__back:hover { color: var(--at-navy-deep); }
.pv__back-arrow { transition: transform 0.15s ease; }
.pv__back:hover .pv__back-arrow { transform: translateX(-3px); }

.pv__eyebrow {
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--at-teal);
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 600;
}
.pv__eyebrow-dash { width: 24px; height: 1px; background: currentColor; }

.pv__title {
  font-family: var(--at-serif);
  font-size: clamp(1.9rem, 4vw, 2.9rem);
  font-weight: 600;
  letter-spacing: -0.03em;
  line-height: 1.05;
  margin: 0;
  color: var(--at-navy-deep);
  max-width: 880px;
  text-wrap: balance;
}

.pv__id {
  font-family: var(--at-mono);
  font-size: 12px;
  color: var(--at-navy);
  font-weight: 600;
  letter-spacing: 0.06em;
  margin: 10px 0 0;
}

.pv__strip {
  display: flex;
  gap: 36px;
  flex-wrap: wrap;
  margin-top: 26px;
  padding-top: 20px;
  border-top: 1px solid var(--at-grid-line);
}
.pv__strip-key {
  font-family: var(--at-mono);
  font-size: 9px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  opacity: 0.85;
  margin-bottom: 5px;
}
.pv__strip-val {
  font-family: var(--at-serif);
  font-size: 28px;
  font-weight: 600;
  color: var(--at-navy-deep);
  line-height: 1;
}

/* ─── Band ──────────────────────────────────────────────────────────────── */
.pv-band { padding: 2.75rem 0 4rem; }
.pv-band__inner { max-width: var(--at-page-max); margin: 0 auto; padding: 0 2rem; }

.pv-note {
  max-width: 52rem;
  font-size: 15px;
  color: var(--at-mute-2);
  padding: 1rem 0;
}

/* ─── Gate (sign-in / denied) ───────────────────────────────────────────── */
.pv-gate {
  max-width: 34rem;
  border: 1px solid var(--at-grid-line);
  border-top: 3px solid var(--at-teal);
  background: var(--at-surface);
  padding: 28px 30px;
}
.pv-gate--deny { border-top-color: #a6391f; }

.pv-gate__label {
  font-family: var(--at-mono);
  font-size: 10px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-teal);
  margin-bottom: 10px;
}
.pv-gate--deny .pv-gate__label { color: #a6391f; }

.pv-gate__title {
  font-family: var(--at-serif);
  font-size: 1.4rem;
  font-weight: 600;
  margin: 0 0 10px;
  color: var(--at-navy-deep);
}
.pv-gate__msg { font-size: 15px; line-height: 1.6; color: var(--at-navy); margin: 0; }

.pv-gate__btn {
  margin-top: 18px;
  display: inline-flex;
  align-items: center;
  padding: 11px 22px;
  font-family: var(--at-sans);
  font-weight: 600;
  font-size: 14px;
  color: #fff;
  background: var(--at-teal-deep, #00695c);
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
}
.pv-gate__btn:hover { background: var(--at-teal, #00897b); }

/* ─── Stance groups ─────────────────────────────────────────────────────── */
.pv-group { margin-bottom: 2.25rem; max-width: 60rem; }

.pv-group__head {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0 10px;
  border-top: 2px solid var(--at-grid-line);
  margin-bottom: 14px;
}
.pv-group__pill {
  font-family: var(--at-mono);
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 700;
  padding: 4px 10px;
}
.pv-group__count {
  font-family: var(--at-mono);
  font-size: 11px;
  color: var(--at-mute-2);
  letter-spacing: 0.04em;
}

.pv-votes { list-style: none; margin: 0; padding: 0; display: grid; gap: 12px; }

.pv-vote {
  border: 1px solid var(--at-grid-line);
  background: var(--at-surface);
  padding: 16px 18px;
}

.pv-vote__who {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 4px 12px;
  margin-bottom: 8px;
}
.pv-vote__person { font-weight: 600; font-size: 15px; color: var(--at-navy-deep); }
.pv-vote__org { font-size: 13px; color: var(--at-navy); opacity: 0.8; }
.pv-vote__when {
  font-family: var(--at-mono);
  font-size: 10.5px;
  color: var(--at-mute-2);
  margin-left: auto;
  letter-spacing: 0.03em;
}

.pv-vote__comment {
  font-size: 14.5px;
  line-height: 1.6;
  color: var(--at-navy);
  margin: 0;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}
.pv-vote__comment--empty { color: var(--at-mute-2); font-style: italic; }

/* ─── Answers ───────────────────────────────────────────────────────────── */
.pv-answers {
  margin-top: 12px;
  border-top: 1px dashed var(--at-grid-line);
  padding-top: 12px;
  display: grid;
  gap: 10px;
}
.pv-answer {
  border-left: 3px solid var(--at-teal);
  padding-left: 12px;
}
.pv-answer__q {
  font-family: var(--at-mono);
  font-size: 11px;
  line-height: 1.45;
  color: var(--at-mute-2);
  margin-bottom: 4px;
}
.pv-answer__a {
  font-size: 14px;
  line-height: 1.55;
  color: var(--at-navy-deep);
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}

/* ─── Responsive ────────────────────────────────────────────────────────── */
@media (max-width: 920px) {
  .pv-hero__inner { padding: 2rem 1.25rem 1.75rem; }
  .pv-band__inner { padding: 0 1.25rem; }
  .pv__strip { gap: 24px; }
  .pv-vote__when { margin-left: 0; width: 100%; }
}
</style>
