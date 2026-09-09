<script setup lang="ts">
// Full-width "Cast your vote" card: a top label bar, then a two-column body
// (stance controls | live results), with the attribution form revealed
// full-width underneath once a stance is chosen. The card computes its own
// tally from the proposal plus the participant's vote and emits intent up to
// the page (which owns the store mutations).
import { computed, ref } from 'vue'
import { STANCE, STANCE_ORDER, isDecided, type Proposal, type Stance } from '@/data/proposals'
import { tallyOf, PROPOSALS_CONFIG, type MyVote } from '@/composables/useProposals'
import PvVoteBar from './PvVoteBar.vue'
import PvVoteAttribForm from './PvVoteAttribForm.vue'

const props = defineProps<{
  proposal: Proposal
  myVote?: MyVote | undefined
}>()

const emit = defineEmits<{
  (e: 'vote', stance: Stance | null): void
  (e: 'submit', detail: { comment: string; answers: string[] }): void
}>()

const config = PROPOSALS_CONFIG

const tally = computed(() => tallyOf(props.proposal.id, props.myVote))
const decided = computed(() => isDecided(props.proposal.status))
const reveal = computed(
  () => config.resultsVisibility === 'always' || !!props.myVote || decided.value,
)
const leading = computed<Stance | null>(() => {
  const { for: f, against: a } = tally.value.counts
  if (f === a) return null
  return f > a ? 'for' : 'against'
})
const favourPct = computed(() => {
  const { for: f, total } = tally.value.counts
  return total ? Math.round((f / total) * 100) : 0
})
const favourColor = computed(() =>
  leading.value === 'for' ? STANCE.for.ink
    : leading.value === 'against' ? STANCE.against.ink
      : 'var(--at-navy-deep)',
)

const stanceGlyph: Record<Stance, string> = { for: '✓', against: '✕', abstain: '–' }
const stances = STANCE_ORDER

function onButton(stance: Stance): void {
  if (decided.value) return
  emit('vote', props.myVote?.stance === stance ? null : stance)
}

// ── Voting parties ───────────────────────────────────────────────────────────
// One row per ORGANISATION, not per vote. Two colleagues from the same org may
// each vote, so a row carries a ×N count per stance and lists every stance that
// org's people took when they disagreed. A vote cast on behalf of several orgs
// is stored with their names comma-joined, so it is split back out and credited
// to each — meaning the party count can exceed `votes cast`.
//
// Entries flagged `mine` are the viewer's own stance picked but NOT yet
// submitted; they carry a placeholder org rather than a real one, and a vote
// that has not been cast is not a voting party — so they are skipped. Once
// submitted, the server returns the vote under the voter's real org and it
// appears here like any other.
interface PartyStance { stance: Stance; count: number }
interface PartyRow { org: string; stances: PartyStance[] }

const partiesOpen = ref(false)

const parties = computed<PartyRow[]>(() => {
  const byOrg = new Map<string, { org: string; counts: Record<Stance, number> }>()

  for (const stance of STANCE_ORDER) {
    for (const entry of tally.value.lists[stance]) {
      if (entry.mine) continue
      for (const name of entry.org.split(',')) {
        const org = name.trim()
        if (!org) continue
        const key = org.toLowerCase()
        let row = byOrg.get(key)
        if (!row) {
          row = { org, counts: { for: 0, against: 0, abstain: 0 } }
          byOrg.set(key, row)
        }
        row.counts[stance] += 1
      }
    }
  }

  return [...byOrg.values()]
    .map((row) => ({
      org: row.org,
      stances: STANCE_ORDER
        .filter((s) => row.counts[s] > 0)
        .map((s) => ({ stance: s, count: row.counts[s] })),
    }))
    // For before Against before Abstain (on the org's leading stance), then A–Z.
    .sort((a, b) => {
      const rank = (r: PartyRow): number => STANCE_ORDER.indexOf(r.stances[0]?.stance ?? 'abstain')
      return rank(a) - rank(b) || a.org.localeCompare(b.org)
    })
})
</script>

<template>
  <div class="pv-cast">
    <!-- Top label bar -->
    <div class="pv-cast__bar">
      <span class="pv-cast__bar-label">§ {{ decided ? 'Result' : 'Ballot' }}</span>
      <span class="pv-cast__bar-div" />
      <span class="pv-cast__bar-note">{{ proposal.id }}</span>
      <span
        class="pv-cast__bar-closes"
        :class="{ 'pv-cast__bar-closes--decided': decided }"
      >{{ decided ? 'Voting closed' : `Closes ${proposal.closes} · ${proposal.closesIn}` }}</span>
    </div>

    <div class="pv-cast__grid">
      <!-- Controls -->
      <div class="pv-cast__controls">
        <div class="pv-cast__prompt">
          {{ decided ? 'Voting has closed for this proposal' : 'Where do you stand?' }}
        </div>
        <div class="pv-cast__buttons">
          <button
            v-for="stance in stances"
            :key="stance"
            type="button"
            class="pv-cast__btn"
            :disabled="decided"
            :style="{
              background: myVote?.stance === stance ? STANCE[stance].ink : 'var(--at-surface)',
              borderColor: myVote?.stance === stance ? STANCE[stance].ink : 'var(--at-grid-line)',
              color: myVote?.stance === stance ? '#fff' : STANCE[stance].ink,
              opacity: decided && myVote?.stance !== stance ? 0.4 : 1,
            }"
            @click="onButton(stance)"
          >
            <span class="pv-cast__btn-glyph">{{ stanceGlyph[stance] }}</span>
            {{ STANCE[stance].label }}
          </button>
        </div>
        <div v-if="!myVote && !decided" class="pv-cast__pick">
          Pick a stance to add your name &amp; a comment.
        </div>
      </div>

      <!-- Results -->
      <div class="pv-cast__results">
        <template v-if="reveal">
          <div class="pv-cast__results-head">
            <div>
              <span class="pv-cast__pct" :style="{ color: favourColor }">{{ favourPct }}%</span>
              <div class="pv-cast__pct-label">in favour</div>
            </div>
            <div class="pv-cast__orgs">
              <span class="pv-cast__orgs-num">{{ tally.counts.total }}</span>
              <div class="pv-cast__orgs-label">votes cast</div>
            </div>
          </div>

          <PvVoteBar :counts="tally.counts" bare />

          <div class="pv-cast__tiles">
            <div
              v-for="stance in stances"
              :key="stance"
              class="pv-cast__tile"
              :style="{ borderTopColor: STANCE[stance].bar }"
            >
              <div class="pv-cast__tile-num" :style="{ color: STANCE[stance].ink }">
                {{ tally.counts[stance] }}
              </div>
              <div class="pv-cast__tile-label">{{ STANCE[stance].label }}</div>
            </div>
          </div>
        </template>

        <div v-else class="pv-cast__hidden">
          <div class="pv-cast__hidden-glyph">▢</div>
          <div class="pv-cast__hidden-text">Results are hidden until you cast your vote.</div>
        </div>
      </div>
    </div>

    <!-- Attribution form (full width, once a stance is chosen). Identity comes
         from the Trust Framework session; the form handles sign-in itself. -->
    <PvVoteAttribForm
      v-if="myVote && !decided"
      :stance="myVote.stance"
      :submitted="myVote.submitted"
      :questions="proposal.questions ?? []"
      @submit="emit('submit', $event)"
    />

    <!-- Voting parties — who has voted, and which way. Collapsed by default;
         shown to everyone once at least one vote has been cast. -->
    <template v-if="reveal && parties.length">
      <button
        type="button"
        class="pv-cast__parties-toggle"
        :aria-expanded="partiesOpen"
        aria-controls="pv-cast-parties"
        @click="partiesOpen = !partiesOpen"
      >
        <span class="pv-cast__parties-chev" :class="{ 'pv-cast__parties-chev--open': partiesOpen }">▸</span>
        Voting parties
        <span class="pv-cast__parties-hint">{{ partiesOpen ? 'Hide' : 'Show' }}</span>
      </button>

      <div v-show="partiesOpen" id="pv-cast-parties" class="pv-cast__parties">
        <div v-for="party in parties" :key="party.org" class="pv-cast__party">
          <span class="pv-cast__party-org">{{ party.org }}</span>
          <span class="pv-cast__party-stances">
            <span
              v-for="s in party.stances"
              :key="s.stance"
              class="pv-cast__party-stance"
              :style="{ color: STANCE[s.stance].ink }"
            >
              <span class="pv-cast__party-glyph">{{ stanceGlyph[s.stance] }}</span>
              {{ STANCE[s.stance].label }}
              <span v-if="s.count > 1" class="pv-cast__party-count">&times;{{ s.count }}</span>
            </span>
          </span>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.pv-cast {
  border: 1px solid var(--at-grid-line);
  border-top: 3px solid var(--at-navy-deep);
  background: var(--at-surface);
}

/* Top bar */
.pv-cast__bar {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  padding: 16px 26px;
  border-bottom: 1px solid var(--at-grid-line);
  background: var(--at-bg-cream);
}

.pv-cast__bar-label {
  font-family: var(--at-mono);
  font-size: 12px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--at-navy-deep);
  font-weight: 700;
}

.pv-cast__bar-div { width: 1px; height: 14px; background: var(--at-grid-line); }

.pv-cast__bar-note {
  font-family: var(--at-mono);
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--at-navy);
  opacity: 0.65;
}

.pv-cast__bar-closes {
  margin-left: auto;
  font-family: var(--at-mono);
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--at-gold);
  font-weight: 600;
}

.pv-cast__bar-closes--decided { color: var(--at-navy); opacity: 0.5; }

/* Body grid */
.pv-cast__grid {
  display: grid;
  grid-template-columns: 1fr 420px;
  align-items: stretch;
}

.pv-cast__controls {
  padding: 24px 26px;
  border-right: 1px solid var(--at-grid-line);
}

.pv-cast__prompt {
  font-family: var(--at-mono);
  font-size: 9.5px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--at-navy);
  opacity: 0.55;
  margin-bottom: 12px;
}

.pv-cast__buttons { display: flex; gap: 10px; }

.pv-cast__btn {
  flex: 1;
  padding: 24px 12px;
  cursor: pointer;
  border: 1px solid;
  font-family: var(--at-sans);
  font-size: 17px;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 9px;
  transition: all 0.15s ease;
}

.pv-cast__btn:disabled { cursor: default; }

.pv-cast__btn-glyph { font-size: 26px; line-height: 1; }

.pv-cast__pick {
  margin-top: 14px;
  font-family: var(--at-mono);
  font-size: 9.5px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--at-navy);
  opacity: 0.45;
}

/* Results */
.pv-cast__results {
  padding: 24px 26px;
  background: var(--at-bg-cream);
  display: flex;
  flex-direction: column;
}

.pv-cast__results-head {
  display: flex;
  align-items: baseline;
  gap: 18px;
  margin-bottom: 18px;
}

.pv-cast__pct {
  font-family: var(--at-serif);
  font-size: 52px;
  font-weight: 500;
  line-height: 1;
}

.pv-cast__pct-label,
.pv-cast__orgs-label {
  font-family: var(--at-mono);
  font-size: 9px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--at-navy);
  opacity: 0.6;
  margin-top: 7px;
}

.pv-cast__orgs { margin-left: auto; text-align: right; }

.pv-cast__orgs-num {
  font-family: var(--at-serif);
  font-size: 28px;
  font-weight: 500;
  color: var(--at-navy-deep);
  line-height: 1;
}

.pv-cast__orgs-denom { font-size: 15px; opacity: 0.5; }
.pv-cast__orgs-label { font-size: 8.5px; }

.pv-cast__tiles {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-top: 20px;
}

.pv-cast__tile {
  padding: 12px 14px;
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line);
  border-top: 2px solid;
}

.pv-cast__tile-num {
  font-family: var(--at-serif);
  font-size: 28px;
  font-weight: 500;
  line-height: 1;
}

.pv-cast__tile-label {
  font-family: var(--at-mono);
  font-size: 8.5px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--at-navy);
  opacity: 0.6;
  margin-top: 7px;
}

.pv-cast__hidden { margin: auto; text-align: center; padding: 28px 8px; }
.pv-cast__hidden-glyph { font-size: 26px; margin-bottom: 10px; }

.pv-cast__hidden-text {
  font-size: 13.5px;
  color: var(--at-navy);
  opacity: 0.7;
  line-height: 1.5;
  max-width: 240px;
  margin: 0 auto;
}

/* Voting parties */
.pv-cast__parties-toggle {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 26px;
  border: none;
  border-top: 1px solid var(--at-grid-line);
  background: var(--at-surface);
  cursor: pointer;
  font-family: var(--at-mono);
  font-size: 10.5px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--at-navy);
  font-weight: 600;
  text-align: left;
}

.pv-cast__parties-toggle:hover { color: var(--at-navy-deep); }

.pv-cast__parties-chev {
  display: inline-block;
  transition: transform 0.15s ease;
}

.pv-cast__parties-chev--open { transform: rotate(90deg); }

.pv-cast__parties-hint { margin-left: auto; opacity: 0.55; font-weight: 500; }

.pv-cast__parties {
  border-top: 1px solid var(--at-grid-line);
  background: var(--at-bg-cream);
}

.pv-cast__party {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 26px;
  border-bottom: 1px solid var(--at-grid-line);
}

.pv-cast__party:last-child { border-bottom: none; }

.pv-cast__party-org {
  font-size: 14px;
  font-weight: 600;
  color: var(--at-navy-deep);
}

.pv-cast__party-stances {
  margin-left: auto;
  display: inline-flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.pv-cast__party-stance {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--at-mono);
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-weight: 700;
}

.pv-cast__party-glyph { font-size: 12px; line-height: 1; }
.pv-cast__party-count { opacity: 0.65; font-weight: 600; }

/* Responsive — stack controls over results, then collapse the bar grids. */
@media (max-width: 760px) {
  .pv-cast__grid { grid-template-columns: 1fr; }
  .pv-cast__controls { border-right: none; border-bottom: 1px solid var(--at-grid-line); }
}

@media (max-width: 460px) {
  .pv-cast__buttons { flex-direction: column; }
  .pv-cast__parties-toggle { padding: 14px 18px; }
  .pv-cast__party { padding: 12px 18px; flex-wrap: wrap; }
  .pv-cast__party-stances { gap: 12px; }
}
</style>
