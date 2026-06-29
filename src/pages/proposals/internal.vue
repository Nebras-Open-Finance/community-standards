<route lang="yaml">
meta:
  title: Internal proposals
</route>

<script setup lang="ts">
// Internal proposals listing — the counterpart to the public /proposals index.
// It shows ONLY proposals flagged `internal` by the API (see the proposals
// Worker / proposals.seed.json). Reached by URL only: it is deliberately not in
// any nav or sitemap, and is marked noindex. The list is loaded client-side from
// the API (like the public index), so the prerendered HTML carries no proposal
// data. Access is not hard-gated — anyone with the URL can view it.
import { computed, onMounted } from 'vue'
import { useHead } from '@unhead/vue'
import { useProposals } from '@/composables/useProposals'
import PvProposalRow from '@/components/proposals/PvProposalRow.vue'
import PvStatusPill from '@/components/proposals/PvStatusPill.vue'

useHead({
  title: 'Internal proposals',
  // Unlinked, internal-only page — keep it out of search indexes.
  meta: [{ name: 'robots', content: 'noindex, nofollow' }],
})

const { proposalList, myVotes, hydrate, loadAll } = useProposals()
onMounted(() => {
  hydrate()
  void loadAll()
})

// Only internal proposals appear here; everything else lives on /proposals/.
const shown = computed(() => proposalList.value.filter((p) => p.internal))
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
          Community &middot; Internal review
        </div>
        <h1 class="pv-hero__title">
          Internal proposals
          <PvStatusPill status="internal" />
        </h1>
        <p class="pv-hero__sub">
          Proposals still under <strong>internal review</strong> &mdash; not yet on the public
          <RouterLink to="/proposals/" class="pv-hero__inline-link">Proposals &amp; Voting</RouterLink>
          page. This page is reachable by direct link only.
        </p>
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
            Internal only
          </div>
          <h2 class="pv-band__title">Proposals</h2>
          <p class="pv-band__lede">
            Internal-only proposals. Open any one to read the idea; the layout mirrors the public
            proposal pages.
          </p>
        </div>

        <!-- Column header -->
        <div class="pv__colhead">
          <div>ID</div><div>Proposal</div><div>Target version</div>
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
          <div v-if="shown.length === 0" class="pv__empty">No internal proposals.</div>
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

.pv-hero__sub {
  font-family: var(--at-sans);
  font-size: 1.12rem;
  line-height: 1.6;
  margin: 1.75rem 0 0;
  max-width: 48rem;
  color: var(--at-mute-2);
}

.pv-hero__sub strong { color: var(--at-navy-deep); font-weight: 600; }

.pv-hero__inline-link { color: var(--at-teal); text-decoration: underline; }

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
  border-top: 2px solid var(--at-navy-deep);
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
  .pv__colhead { display: none; }
}
</style>
