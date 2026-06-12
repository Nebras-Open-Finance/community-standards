<route lang="yaml">
meta:
  title: Proposals & Voting
  isIndex: true
</route>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useHead } from '@unhead/vue'
import { deriveStatus } from '@/data/proposals'
import { useProposals } from '@/composables/useProposals'
import PvProposalRow from '@/components/proposals/PvProposalRow.vue'

useHead({ title: 'Proposals & Voting' })

const { proposalList, myVotes, hydrate, loadAll } = useProposals()
onMounted(() => {
  hydrate()
  void loadAll()
})

// Status is derived from each proposal's open/close dates (not returned by the API).
const statusOf = (p: { opened: string; closes: string }) => deriveStatus(p.opened, p.closes)

type FilterKey = 'open' | 'draft' | 'closed'
const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'open', label: 'Open' },
  { key: 'draft', label: 'Draft' },
  { key: 'closed', label: 'Closed' },
]
const filter = ref<FilterKey>('open')

const stats = computed(() => ({
  open: proposalList.value.filter((p) => statusOf(p) === 'open').length,
  draft: proposalList.value.filter((p) => statusOf(p) === 'draft').length,
  closed: proposalList.value.filter((p) => statusOf(p) === 'closed').length,
}))

const shown = computed(() => proposalList.value.filter((p) => statusOf(p) === filter.value))
</script>

<template>
  <div class="pv">

    <!-- ═══════════════════════════════════════════════════════════════════
         HERO
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="pv-hero">
      <div class="pv-hero__inner">
        <div class="pv-hero__label">
          <span class="pv-hero__label-dash" />
          Community &middot; Decided together
        </div>
        <h1 class="pv-hero__title">
          Proposals &amp; Voting
          <span class="pv-hero__badge">{{ stats.open }} open</span>
        </h1>
        <p class="pv-hero__sub">
          Nebras puts changes to the standards up for a vote. Cast a single vote &mdash;
          <strong>For</strong>, <strong>Against</strong>, or <strong>Abstain</strong> &mdash; and add
          your reasoning, recorded in the open so every decision can be understood later.
        </p>

        <div class="pv-hero__links">
          <RouterLink to="/support-service-desk/" class="pv-hero__link">
            <span class="pv-hero__link-label">Idea?</span>
            <span class="pv-hero__link-text">Raise a proposal via the Service Desk</span>
            <span class="pv-hero__link-arrow">&rarr;</span>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         PROPOSALS BAND
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="pv-band">
      <div class="pv-band__inner">
        <div class="pv-band__head">
          <div class="pv-band__eyebrow">
            <span class="pv-band__eyebrow-dash" />
            Open votes
          </div>
          <h2 class="pv-band__title">Proposals</h2>
          <p class="pv-band__lede">
            Scan every proposal and see how its vote is trending, then open any one to read the
            idea and cast your vote.
          </p>
        </div>

        <!-- Aggregate stats -->
        <div class="pv__stats">
        <div class="pv__stat">
          <span class="pv__stat-bar" style="background: var(--at-blue)" />
          <div class="pv__stat-num">{{ stats.open }}</div>
          <div class="pv__stat-label">Open for voting</div>
        </div>
        <div class="pv__stat">
          <span class="pv__stat-bar" style="background: var(--at-gold)" />
          <div class="pv__stat-num">{{ stats.draft }}</div>
          <div class="pv__stat-label">Draft</div>
        </div>
        <div class="pv__stat">
          <span class="pv__stat-bar" style="background: var(--at-teal)" />
          <div class="pv__stat-num">{{ stats.closed }}</div>
          <div class="pv__stat-label">Closed</div>
        </div>
      </div>

      <!-- Filter tabs -->
      <div class="pv__tabs">
        <button
          v-for="f in FILTERS"
          :key="f.key"
          type="button"
          class="pv__tab"
          :class="{ 'pv__tab--active': filter === f.key }"
          @click="filter = f.key"
        >{{ f.label }}</button>
      </div>

      <!-- Column header -->
      <div class="pv__colhead">
        <div>ID</div><div>Proposal</div><div>Priority</div>
        <div>How it's going</div><div class="pv__colhead-right">Closes</div>
      </div>

      <!-- Rows -->
      <div class="pv__rows">
        <PvProposalRow
          v-for="p in shown"
          :key="p.id"
          :proposal="p"
          :my-vote="myVotes[p.id]"
        />
        <div v-if="shown.length === 0" class="pv__empty">No proposals in this view.</div>
      </div>

      </div>
    </section>
  </div>
</template>

<style scoped>
.pv {
  background: var(--at-bg-cream);
  color: var(--at-navy-deep);
  font-family: var(--at-sans);
}

/* ─── Hero ──────────────────────────────────────────────────────────────── */
.pv-hero {
  background: var(--at-bg-cream);
  border-bottom: 1px solid var(--at-grid-line);
}

.pv-hero__inner {
  max-width: var(--at-page-max);
  margin: 0 auto;
  padding: 4.5rem 2rem 3.5rem;
}

.pv-hero__label {
  font-family: var(--at-mono);
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--at-teal);
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 600;
}

.pv-hero__label-dash { width: 24px; height: 1px; background: currentColor; }

.pv-hero__title {
  font-family: var(--at-serif);
  font-size: clamp(2.75rem, 6.5vw, 4.5rem);
  font-weight: 600;
  line-height: 0.98;
  letter-spacing: -0.035em;
  margin: 0;
  color: var(--at-navy-deep);
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.85rem;
}

.pv-hero__badge {
  font-family: var(--at-mono);
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--at-teal);
  background: rgba(0, 194, 169, 0.12);
  padding: 0.35rem 0.7rem;
  align-self: center;
}

.pv-hero__sub {
  font-family: var(--at-sans);
  font-size: 1.12rem;
  line-height: 1.6;
  margin: 1.75rem 0 0;
  max-width: 48rem;
  color: var(--at-mute-2);
}

.pv-hero__sub strong { color: var(--at-navy-deep); font-weight: 600; }

.pv-hero__links {
  margin-top: 2.25rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  max-width: 48rem;
}

.pv-hero__link {
  flex: 1 1 20rem;
  display: flex;
  align-items: center;
  gap: 0.9rem;
  padding: 0.9rem 1.1rem;
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line);
  text-decoration: none;
  color: var(--at-navy-deep);
  transition: border-color 0.15s, transform 0.15s;
}

.pv-hero__link:hover { border-color: var(--at-navy-deep); transform: translateY(-1px); }

.pv-hero__link-label {
  font-family: var(--at-mono);
  font-size: 0.6rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-teal);
  white-space: nowrap;
}

.pv-hero__link-text { flex: 1; font-size: 0.92rem; font-weight: 500; }

.pv-hero__link-arrow {
  font-family: var(--at-mono);
  color: var(--at-mute);
  transition: transform 0.15s, color 0.15s;
}

.pv-hero__link:hover .pv-hero__link-arrow { transform: translateX(3px); color: var(--at-navy-deep); }

/* ─── Band ──────────────────────────────────────────────────────────────── */
.pv-band {
  padding: 4rem 0 5rem;
  background: var(--at-surface);
  border-top: 1px solid var(--at-grid-line);
}

.pv-band__inner {
  max-width: var(--at-page-max);
  margin: 0 auto;
  padding: 0 2rem;
}

.pv-band__head { max-width: 52rem; margin-bottom: 2.5rem; }

.pv-band__eyebrow {
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

.pv-band__eyebrow-dash { width: 24px; height: 1px; background: currentColor; }

.pv-band__title {
  font-family: var(--at-serif);
  font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 500;
  letter-spacing: -0.025em;
  line-height: 1.05;
  margin: 0;
  color: var(--at-navy-deep);
}

.pv-band__lede {
  font-family: var(--at-sans);
  font-size: 1rem;
  line-height: 1.65;
  color: var(--at-mute-2);
  margin: 1.1rem 0 0;
}

/* Stats */
.pv__stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border: 1px solid var(--at-grid-line);
  border-top: 2px solid var(--at-navy-deep);
  background: var(--at-bg-cream);
}

.pv__stat {
  padding: 22px 26px;
  border-right: 1px solid var(--at-grid-line);
  position: relative;
}

.pv__stat:last-child { border-right: none; }

.pv__stat-bar {
  position: absolute;
  top: 0;
  left: 0;
  height: 3px;
  width: 30px;
}

.pv__stat-num {
  font-family: var(--at-serif);
  font-size: 40px;
  font-weight: 500;
  letter-spacing: -0.03em;
  color: var(--at-navy-deep);
  line-height: 1;
}

.pv__stat-label {
  font-family: var(--at-mono);
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--at-navy);
  opacity: 0.6;
  margin-top: 10px;
}

/* Tabs */
.pv__tabs {
  display: flex;
  gap: 4px;
  margin-top: 48px;
  border-bottom: 1px solid var(--at-grid-line);
}

.pv__tab {
  font-family: var(--at-mono);
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  padding: 12px 18px;
  cursor: pointer;
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  color: var(--at-navy);
  opacity: 0.5;
  font-weight: 600;
  margin-bottom: -1px;
}

.pv__tab--active {
  border-bottom-color: var(--at-navy-deep);
  color: var(--at-navy-deep);
  opacity: 1;
}

/* Column header + rows */
.pv__colhead {
  display: grid;
  grid-template-columns: 70px minmax(200px, 1fr) 132px 168px 92px;
  gap: 16px;
  padding: 14px 24px;
  font-family: var(--at-mono);
  font-size: 9px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--at-navy);
  opacity: 0.45;
  border-bottom: 1px solid var(--at-grid-line);
}

.pv__colhead-right { text-align: right; }

.pv__rows {
  background: var(--at-bg-cream);
  border: 1px solid var(--at-grid-line);
  border-top: none;
}

.pv__empty {
  padding: 48px 24px;
  text-align: center;
  font-family: var(--at-mono);
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--at-navy);
  opacity: 0.4;
}

/* Responsive */
@media (max-width: 820px) {
  .pv-hero__inner { padding: 3rem 1.25rem 2.5rem; }
  .pv-band { padding: 3rem 0 4rem; }
  .pv-band__inner { padding: 0 1.25rem; }
  .pv__stats { grid-template-columns: 1fr; }
  .pv__stat { border-right: none; }
  .pv__stat:not(:last-child) { border-bottom: 1px solid var(--at-grid-line); }
  .pv__colhead { display: none; }
  .pv__tabs { overflow-x: auto; }
}
</style>
