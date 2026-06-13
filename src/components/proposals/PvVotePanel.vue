<script setup lang="ts">
// Full-width "Cast your vote" card: a top label bar, then a two-column body
// (stance controls | live results), with the attribution form revealed
// full-width underneath once a stance is chosen. The card computes its own
// tally from the proposal plus the participant's vote and emits intent up to
// the page (which owns the store mutations).
import { computed } from 'vue'
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
  (e: 'submit', detail: { comment: string }): void
}>()

const config = PROPOSALS_CONFIG

const tally = computed(() => tallyOf(props.proposal.id, props.myVote))
const decided = computed(() => isDecided(props.proposal.status))
const reveal = computed(
  () => config.resultsVisibility === 'always' || !!props.myVote || decided.value,
)
const quorumMet = computed(() => tally.value.counts.total >= props.proposal.quorum)
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

          <PvVoteBar :counts="tally.counts" bare :show-quorum="config.showQuorum" :quorum="proposal.quorum" />

          <div
            v-if="config.showQuorum"
            class="pv-cast__quorum"
            :style="{ color: quorumMet ? STANCE.for.ink : '#B37819' }"
          >
            <span class="pv-cast__quorum-dot" :style="{ background: quorumMet ? STANCE.for.ink : '#B37819' }" />
            {{ quorumMet
              ? `Quorum met · ${proposal.quorum} required`
              : `${proposal.quorum - tally.counts.total} more to reach quorum (${proposal.quorum})` }}
          </div>

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
      @submit="emit('submit', $event)"
    />
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

.pv-cast__quorum {
  margin-top: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--at-mono);
  font-size: 9.5px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 600;
}

.pv-cast__quorum-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }

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

/* Responsive — stack controls over results, then collapse the bar grids. */
@media (max-width: 760px) {
  .pv-cast__grid { grid-template-columns: 1fr; }
  .pv-cast__controls { border-right: none; border-bottom: 1px solid var(--at-grid-line); }
}

@media (max-width: 460px) {
  .pv-cast__buttons { flex-direction: column; }
}
</style>
