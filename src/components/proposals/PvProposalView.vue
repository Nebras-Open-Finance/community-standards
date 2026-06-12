<script setup lang="ts">
// Shared layout for a single proposal's authored page. The page supplies the
// proposal's metadata (title, status, dates, …) as `proposal` and authors the
// body in the default slot (typically <PvProposalBody :blocks="…" />). This
// component renders the hero + the live "Cast your vote" panel (wired to the
// proposals API by id) + the body band.
import { computed, onMounted, ref } from 'vue'
import { useHead } from '@unhead/vue'
import { isDecided, type Proposal, type Stance } from '@/data/proposals'
import { useProposals } from '@/composables/useProposals'
import PvCategoryTag from './PvCategoryTag.vue'
import PvStatusPill from './PvStatusPill.vue'
import PvPriorityTag from './PvPriorityTag.vue'
import PvVotePanel from './PvVotePanel.vue'

const props = defineProps<{ proposal: Proposal }>()

const { myVotes, setVote, submitVote, hydrate, loadOne } = useProposals()

const id = computed(() => props.proposal.id)
const myVote = computed(() => myVotes.value[id.value])
const decided = computed(() => isDecided(props.proposal.status))
const submitError = ref('')

const metaPairs = computed(() => {
  const p = props.proposal
  return [
    ['Proposed by', p.author.org],
    ['Author', p.author.person],
    ['Opened', p.opened],
    ['Closes', p.closes],
  ] as const
})

useHead({ title: () => props.proposal.title })

onMounted(() => {
  hydrate()
  void loadOne(id.value)
  if (typeof window !== 'undefined') window.scrollTo(0, 0)
})

function onVote(stance: Stance | null): void {
  submitError.value = ''
  setVote(id.value, stance)
}

async function onSubmit(detail: { org: string; person: string; comment: string }): Promise<void> {
  if (!myVote.value) return
  submitError.value = ''
  const result = await submitVote(id.value, { stance: myVote.value.stance, ...detail })
  if (!result.ok) submitError.value = result.message ?? 'Could not record your vote.'
}
</script>

<template>
  <div class="pvd">
    <!-- ═══ HERO ═══ -->
    <section class="pvd-hero">
      <div class="pvd-hero__inner">
        <RouterLink to="/proposals/" class="pvd__back">
          <span class="pvd__back-arrow">&larr;</span> All proposals
        </RouterLink>

        <div class="pvd__meta-row">
          <span class="pvd__id">{{ proposal.id }}</span>
          <span class="pvd__divider" />
          <PvCategoryTag :category="proposal.category" />
          <PvStatusPill :status="proposal.status" />
          <PvPriorityTag :priority="proposal.priority" size="pill" />
        </div>
        <h1 class="pvd__title">{{ proposal.title }}</h1>
        <p class="pvd__summary">{{ proposal.summary }}</p>

        <div class="pvd__strip">
          <div v-for="[k, v] in metaPairs" :key="k" class="pvd__strip-item">
            <div class="pvd__strip-key">{{ k }}</div>
            <div class="pvd__strip-val">{{ v }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ CAST YOUR VOTE ═══ -->
    <section class="pvd-band pvd-band--white">
      <div class="pvd-band__inner">
        <div class="pvd-band__head">
          <div class="pvd-band__eyebrow">
            <span class="pvd-band__eyebrow-dash" />
            Decision
          </div>
          <h2 class="pvd-band__title">{{ decided ? 'Final result' : 'Cast your vote' }}</h2>
          <p class="pvd-band__lede">
            Cast a single vote &mdash; For, Against, or Abstain.
            {{ decided
              ? 'Voting has closed for this proposal.'
              : 'One vote per organisation; a second vote from the same organisation is rejected.' }}
          </p>
        </div>
        <PvVotePanel
          :proposal="proposal"
          :my-vote="myVote"
          @vote="onVote"
          @submit="onSubmit"
        />
        <div v-if="submitError" class="pvd__error" role="alert">{{ submitError }}</div>
      </div>
    </section>

    <!-- ═══ THE PROPOSAL ═══ -->
    <section class="pvd-band pvd-band--cream">
      <div class="pvd-band__inner">
        <div class="pvd-band__head">
          <div class="pvd-band__eyebrow">
            <span class="pvd-band__eyebrow-dash" />
            The proposal
          </div>
          <h2 class="pvd-band__title">What's being proposed</h2>
          <p class="pvd-band__lede">
            The full text of the change, with the rationale and any options under consideration.
          </p>
        </div>
        <div class="pvd__reading">
          <slot />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.pvd {
  background: var(--at-bg-cream);
  color: var(--at-navy-deep);
  font-family: var(--at-sans);
}

/* ─── Hero ──────────────────────────────────────────────────────────────── */
.pvd-hero {
  background: var(--at-bg-cream);
  border-bottom: 1px solid var(--at-grid-line);
}

.pvd-hero__inner {
  max-width: var(--at-page-max);
  margin: 0 auto;
  padding: 2.75rem 2rem 3rem;
}

.pvd__back {
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
  margin-bottom: 2rem;
  transition: color 0.15s ease;
}

.pvd__back:hover { color: var(--at-navy-deep); }
.pvd__back-arrow { transition: transform 0.15s ease; }
.pvd__back:hover .pvd__back-arrow { transform: translateX(-3px); }

.pvd__meta-row {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 18px;
  flex-wrap: wrap;
}

.pvd__id {
  font-family: var(--at-mono);
  font-size: 12px;
  color: var(--at-navy);
  font-weight: 600;
  letter-spacing: 0.06em;
}

.pvd__divider { width: 1px; height: 14px; background: var(--at-grid-line); }

.pvd__title {
  font-family: var(--at-serif);
  font-size: clamp(2.25rem, 4.5vw, 3.25rem);
  font-weight: 600;
  letter-spacing: -0.035em;
  line-height: 1.04;
  margin: 0;
  color: var(--at-navy-deep);
  max-width: 880px;
  text-wrap: balance;
}

.pvd__summary {
  font-size: 19px;
  line-height: 1.55;
  color: var(--at-navy);
  opacity: 0.8;
  max-width: 740px;
  margin: 22px 0 0;
}

.pvd__strip {
  display: flex;
  gap: 36px;
  flex-wrap: wrap;
  margin-top: 30px;
  padding-top: 22px;
  padding-bottom: 4px;
  border-top: 1px solid var(--at-grid-line);
}

.pvd__strip-key {
  font-family: var(--at-mono);
  font-size: 9px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--at-navy);
  opacity: 0.5;
  margin-bottom: 5px;
}

.pvd__strip-val { font-size: 14px; color: var(--at-navy-deep); font-weight: 500; }

/* ─── Section bands ─────────────────────────────────────────────────────── */
.pvd-band { padding: 4rem 0 5rem; border-top: 1px solid var(--at-grid-line); }
.pvd-band--white { background: var(--at-surface); }
.pvd-band--cream { background: var(--at-bg-cream); }

.pvd-band__inner {
  max-width: var(--at-page-max);
  margin: 0 auto;
  padding: 0 2rem;
}

.pvd-band__head { max-width: 52rem; margin-bottom: 2.5rem; }

.pvd-band__eyebrow {
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--at-teal);
  margin-bottom: 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 600;
}

.pvd-band__eyebrow-dash { width: 24px; height: 1px; background: currentColor; }

.pvd-band__title {
  font-family: var(--at-serif);
  font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 500;
  letter-spacing: -0.025em;
  line-height: 1.05;
  margin: 0;
  color: var(--at-navy-deep);
}

.pvd-band__lede {
  font-family: var(--at-sans);
  font-size: 1rem;
  line-height: 1.65;
  color: var(--at-mute-2);
  margin: 1.1rem 0 0;
}

.pvd__error {
  margin-top: 16px;
  padding: 12px 16px;
  background: rgba(166, 57, 31, 0.08);
  border-left: 3px solid #a6391f;
  color: #a6391f;
  font-size: 13.5px;
  font-weight: 500;
}

.pvd__reading { width: 100%; }

@media (max-width: 920px) {
  .pvd-hero__inner { padding: 2rem 1.25rem 2.25rem; }
  .pvd-band { padding: 2.5rem 0 3.5rem; }
  .pvd-band__inner { padding: 0 1.25rem; }
}
</style>
