<route lang="yaml">
meta:
  layout: internal
  title: Generate report
  next: false
  prev: false
  aside: false
</route>

<script setup lang="ts">
import { watch, onMounted } from 'vue'
import { useHead } from '@unhead/vue'
import ReportPanel from '@/components/common/ReportPanel.vue'
import { SHEET_LABEL, useTrustFrameworkReport, type ReportSheet } from '@/composables/useReports'

useHead({ title: 'Generate report' })

const {
  env, busy, error, done, loginUrl,
  sheet, summary, summaryBusy, loadSummary, downloadCsv, reset,
} = useTrustFrameworkReport()

const SHEETS: ReportSheet[] = ['organisations', 'authServers', 'apiResources']

// The report is three sheets and CSV is flat, so the sheet is chosen here. The
// summary tells you how many rows each will contain before you commit to a
// download that takes a while.
onMounted(loadSummary)
watch(env, () => { reset(); loadSummary() })

function countFor(name: ReportSheet): number | null {
  return summary.value ? summary.value[name] : null
}
</script>

<template>
  <ReportPanel
    title="Generate Report"
    description="Select an environment and download the trust-framework report as CSV."
    file-label="Report file"
    :file-hint="`CSV — ${SHEET_LABEL[sheet]}`"
    :env="env"
    :busy="busy"
    :error="error"
    :done="done"
    :login-url="loginUrl"
    @update:env="env = $event"
    @download="downloadCsv"
  >
    <template #options>
      <div>
        <div class="gr__label">Sheet</div>
        <div class="gr__sheets">
          <button
            v-for="name in SHEETS"
            :key="name"
            type="button"
            class="gr__sheet"
            :class="{ 'gr__sheet--on': sheet === name }"
            :aria-pressed="sheet === name"
            @click="sheet = name; reset()"
          >
            <span>{{ SHEET_LABEL[name] }}</span>
            <span v-if="countFor(name) !== null" class="gr__count">{{ countFor(name) }}</span>
            <span v-else-if="summaryBusy" class="gr__count gr__count--wait">…</span>
          </button>
        </div>
      </div>
    </template>
  </ReportPanel>
</template>

<style scoped>
.gr__label {
  font-family: var(--at-mono);
  font-size: 0.68rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--at-mute);
  font-weight: 700;
  margin-bottom: 0.65rem;
}

.gr__sheets { display: flex; flex-wrap: wrap; gap: 0.6rem; }

.gr__sheet {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.55rem 0.9rem;
  border-radius: 8px;
  border: 1px solid var(--at-grid-line);
  background: transparent;
  cursor: pointer;
  font-family: inherit;
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--at-mute);
}
.gr__sheet:hover { border-color: var(--at-teal); }
.gr__sheet--on {
  border-color: var(--at-navy-deep);
  color: var(--at-navy-deep);
  background: var(--at-bg-paper);
}

.gr__count {
  font-family: var(--at-mono);
  font-size: 0.72rem;
  color: var(--at-teal-deep);
}
.gr__count--wait { opacity: 0.5; }
</style>
