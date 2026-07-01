<script setup lang="ts">
// Tabbed shell for a *closed* proposal that has an authored Outcome. It reframes
// the page into three tabs — Outcome of Proposal · Votes Received & Feedback ·
// Original Proposal — without the page having to duplicate any content: each
// region is passed in as a slot.
//
// When `tabbed` is false the shell is transparent: it renders the `votes` slot
// then the `proposal` slot in normal document flow, reproducing the site's
// current single-scroll proposal view exactly. Tabs are only turned on by the
// page once voting has closed AND an Outcome partial exists (see the pages'
// `showTabs`). All three panels stay mounted (v-show) so the vote panel keeps
// its state and the API tally is not refetched when switching tabs.
import { ref } from 'vue'

defineProps<{
  // Render the three-tab UI. False → passthrough (votes then proposal, in flow).
  tabbed: boolean
}>()

type TabKey = 'outcome' | 'votes' | 'proposal'
const TABS: { key: TabKey; label: string }[] = [
  { key: 'outcome', label: 'Outcome of Proposal' },
  { key: 'votes', label: 'Votes Received & Feedback' },
  { key: 'proposal', label: 'Original Proposal' },
]

// Lead with the decision — the default tab is the Outcome.
const active = ref<TabKey>('outcome')
const regionRef = ref<HTMLElement | null>(null)

function select(key: TabKey): void {
  active.value = key
  // Bring the tab strip back under the sticky site header so the newly revealed
  // panel starts from its top rather than from wherever the reader had scrolled.
  regionRef.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <!-- Tabbed layout — closed proposal with an Outcome. -->
  <div v-if="tabbed" ref="regionRef" class="pv-ptabs">
    <div class="pv-ptabs__bar" role="tablist" aria-label="Proposal sections">
      <div class="pv-ptabs__bar-inner">
        <button
          v-for="t in TABS"
          :key="t.key"
          type="button"
          role="tab"
          :aria-selected="active === t.key"
          class="pv-ptabs__tab"
          :class="{ 'pv-ptabs__tab--active': active === t.key }"
          @click="select(t.key)"
        >{{ t.label }}</button>
      </div>
    </div>

    <div class="pv-ptabs__panels">
      <div v-show="active === 'outcome'" role="tabpanel"><slot name="outcome" /></div>
      <div v-show="active === 'votes'" role="tabpanel"><slot name="votes" /></div>
      <div v-show="active === 'proposal'" role="tabpanel"><slot name="proposal" /></div>
    </div>
  </div>

  <!-- Passthrough — the current single-scroll view (no Outcome, or still open). -->
  <template v-else>
    <slot name="votes" />
    <slot name="proposal" />
  </template>
</template>

<style scoped>
.pv-ptabs { scroll-margin-top: var(--at-header-height, 0px); }

/* Sticky under the global header so tabs stay reachable through a long read. */
.pv-ptabs__bar {
  position: sticky;
  top: var(--at-header-height, 0px);
  z-index: 5;
  background: var(--at-bg-cream);
  border-top: 1px solid var(--at-grid-line);
  border-bottom: 1px solid var(--at-grid-line);
}

.pv-ptabs__bar-inner {
  max-width: var(--at-page-max);
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  gap: 0;
}

.pv-ptabs__tab {
  appearance: none;
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px; /* sit the active underline on the bar's bottom border */
  padding: 15px 20px;
  cursor: pointer;
  font-family: var(--at-mono);
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--at-navy);
  opacity: 0.5;
  white-space: nowrap;
  transition: color 0.15s ease, opacity 0.15s ease, border-color 0.15s ease;
}

.pv-ptabs__tab:hover { opacity: 0.8; }

.pv-ptabs__tab--active {
  color: var(--at-navy-deep);
  opacity: 1;
  border-bottom-color: var(--at-teal);
}

@media (max-width: 920px) {
  .pv-ptabs__bar-inner { padding: 0 1.25rem; overflow-x: auto; }
  .pv-ptabs__tab { padding: 13px 14px; font-size: 10px; letter-spacing: 0.08em; }
}
</style>
