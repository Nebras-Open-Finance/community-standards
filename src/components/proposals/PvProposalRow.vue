<script setup lang="ts">
// One row of the proposals index table. The whole row links to the detail page.
// Driven by the lightweight metadata + tally returned by GET /proposals.
import { computed } from 'vue'
import { STANCE, isDecided, deriveStatus } from '@/data/proposals'
import { tallyOf, PROPOSALS_CONFIG, type MyVote, type ProposalMeta } from '@/composables/useProposals'
import PvPriorityTag from './PvPriorityTag.vue'
import PvVoteBar from './PvVoteBar.vue'

const props = defineProps<{ proposal: ProposalMeta; myVote?: MyVote | undefined }>()

const config = PROPOSALS_CONFIG
const status = computed(() => deriveStatus(props.proposal.opened, props.proposal.closes))
// Server tally only — no optimistic local addition. Passing myVote here would
// inflate the count with a vote you picked but haven't submitted; the list must
// reflect the authoritative API count. ("✓ You" below is separately local.)
const counts = computed(() => tallyOf(props.proposal.id).counts)
const decided = computed(() => isDecided(status.value))
const reveal = computed(
  () => config.resultsVisibility === 'always' || !!props.myVote || decided.value,
)
const myStance = computed(() => props.myVote?.stance)
const slug = computed(() => props.proposal.id.toLowerCase())

// "Closes" countdown, derived from the ISO close date. Decided proposals read
// "Closed".
const closesLabel = computed(() => {
  if (decided.value) return 'Closed'
  const closes = new Date(`${props.proposal.closes}T23:59:59Z`).getTime()
  if (Number.isNaN(closes)) return props.proposal.closes
  const days = Math.ceil((closes - Date.now()) / 86_400_000)
  if (days < 0) return 'Closed'
  if (days === 0) return 'Today'
  if (days === 1) return '1 day'
  return `${days} days`
})
</script>

<template>
  <RouterLink :to="`/proposals/${slug}`" class="pv-row">
    <div class="pv-row__id">{{ proposal.id }}</div>

    <div class="pv-row__main">
      <div class="pv-row__title">{{ proposal.title }}</div>
    </div>

    <div><PvPriorityTag :priority="proposal.priority ?? 'medium'" size="pill" /></div>

    <div class="pv-row__going">
      <template v-if="reveal">
        <PvVoteBar :counts="counts" compact />
        <div class="pv-row__counts">
          <span :style="{ color: STANCE.for.ink }">{{ counts.for }} for</span>
          <span :style="{ color: STANCE.against.ink }">{{ counts.against }} against</span>
          <span :style="{ color: STANCE.abstain.ink }">{{ counts.abstain }} abst</span>
        </div>
      </template>
      <div v-else class="pv-row__hidden">▢ Vote to reveal tally</div>
    </div>

    <div class="pv-row__closes">
      <div class="pv-row__closes-in" :class="{ 'pv-row__closes-in--decided': decided }">
        {{ closesLabel }}
      </div>
      <div v-if="myStance" class="pv-row__you" :style="{ color: STANCE[myStance].ink }">
        ✓ You · {{ STANCE[myStance].label }}
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>
.pv-row {
  display: grid;
  grid-template-columns: 70px minmax(200px, 1fr) 132px 168px 92px;
  align-items: center;
  gap: 16px;
  padding: 20px 24px;
  cursor: pointer;
  border-bottom: 1px solid var(--at-grid-line);
  text-decoration: none;
  transition: background 0.15s ease;
}

.pv-row:hover { background: rgba(0, 39, 127, 0.025); }
.pv-row:last-child { border-bottom: none; }

.pv-row__id {
  font-family: var(--at-mono);
  font-size: 12px;
  color: var(--at-navy);
  font-weight: 600;
  letter-spacing: 0.06em;
}

.pv-row__title {
  font-size: 16px;
  font-weight: 500;
  color: var(--at-navy-deep);
  line-height: 1.3;
  letter-spacing: -0.01em;
  text-wrap: pretty;
}

.pv-row__counts {
  display: flex;
  gap: 12px;
  margin-top: 7px;
  font-family: var(--at-mono);
  font-size: 10px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.pv-row__hidden {
  font-family: var(--at-mono);
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--at-navy);
  opacity: 0.45;
}

.pv-row__closes { text-align: right; }

.pv-row__closes-in {
  font-family: var(--at-mono);
  font-size: 12px;
  color: var(--at-navy-deep);
  font-weight: 600;
}

.pv-row__closes-in--decided { color: var(--at-navy); opacity: 0.5; font-weight: 400; }

.pv-row__you {
  font-family: var(--at-mono);
  font-size: 8.5px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  margin-top: 5px;
  font-weight: 600;
}

/* Stacked card layout on narrow viewports. */
@media (max-width: 820px) {
  .pv-row {
    grid-template-columns: 1fr auto;
    grid-template-areas:
      'id     closes'
      'main   main'
      'going  status';
    row-gap: 12px;
    padding: 18px 18px;
  }
  .pv-row__id { grid-area: id; }
  .pv-row__main { grid-area: main; }
  .pv-row > div:nth-child(3) { grid-area: status; justify-self: end; align-self: center; }
  .pv-row__going { grid-area: going; }
  .pv-row__closes { grid-area: closes; }
}
</style>
