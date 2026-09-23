<route lang="yaml">
meta:
  layout: internal
  title: Generate report
  next: false
  prev: false
  aside: false
</route>

<script setup lang="ts">
import { computed, watch, onMounted } from 'vue'
import { useHead } from '@unhead/vue'
import ReportPanel from '@/components/common/ReportPanel.vue'
import { useTrustFrameworkReport } from '@/composables/useReports'

useHead({ title: 'Generate report' })

const {
  env, busy, error, done, loginUrl,
  summary, summaryBusy, loadSummary, downloadWorkbook, reset,
} = useTrustFrameworkReport()

// One download contains the whole report — organisations, authorisation servers
// and API resources, as a workbook with one sheet each. The summary says how
// many rows that will be before you start a download that takes a while.
onMounted(loadSummary)
watch(env, () => { reset(); loadSummary() })

const totalRows = computed(() =>
  summary.value
    ? summary.value.organisations + summary.value.authServers + summary.value.apiResources
    : null,
)

const hint = computed(() => {
  if (summaryBusy.value) return 'Counting rows…'
  if (totalRows.value === null) return 'Three sheets: Organisations, Auth Servers, API Resources'
  return `${totalRows.value} rows across three sheets — Organisations, Auth Servers, API Resources`
})
</script>

<template>
  <ReportPanel
    title="Generate Report"
    description="Select an environment and download the trust-framework report as an Excel workbook."
    file-label="Report file"
    format="XLSX"
    :file-hint="hint"
    :env="env"
    :busy="busy"
    :error="error"
    :done="done"
    :login-url="loginUrl"
    @update:env="env = $event"
    @download="downloadWorkbook"
  >
    <template v-if="summary" #options>
      <dl class="gr__counts">
        <div><dt>Organisations</dt><dd>{{ summary.organisations }}</dd></div>
        <div><dt>Authorisation servers</dt><dd>{{ summary.authServers }}</dd></div>
        <div><dt>API resources</dt><dd>{{ summary.apiResources }}</dd></div>
      </dl>
    </template>
  </ReportPanel>
</template>

<style scoped>
.gr__counts {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin: 0;
}

.gr__counts > div {
  flex: 1 1 8rem;
  padding: 0.6rem 0.8rem;
  border: 1px solid var(--at-grid-line);
  border-radius: 8px;
  background: var(--at-bg-paper);
}

.gr__counts dt {
  font-family: var(--at-mono);
  font-size: 0.64rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--at-mute);
  font-weight: 700;
}

.gr__counts dd {
  margin: 0.2rem 0 0;
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--at-navy-deep);
}
</style>
