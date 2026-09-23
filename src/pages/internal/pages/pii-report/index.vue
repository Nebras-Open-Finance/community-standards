<route lang="yaml">
meta:
  layout: internal
  title: PII report
  next: false
  prev: false
  aside: false
</route>

<script setup lang="ts">
import { watch } from 'vue'
import { useHead } from '@unhead/vue'
import ReportPanel from '@/components/common/ReportPanel.vue'
import { usePiiReport } from '@/composables/useReports'

useHead({ title: 'PII report' })

const { env, busy, error, done, loginUrl, downloadCsv, reset } = usePiiReport()

watch(env, reset)
</script>

<template>
  <ReportPanel
    title="PII Report"
    description="Select an environment and download the pooled directory emails as CSV."
    file-label="PII report file"
    :env="env"
    :busy="busy"
    :error="error"
    :done="done"
    :login-url="loginUrl"
    done-message="PII report generated."
    @update:env="env = $event"
    @download="downloadCsv"
  >
    <template #options>
      <!--
        This export contains personal data — the email addresses of people at
        member institutions. Unlike the trust-framework report, the API requires
        you to sign in at the directory first, so the export is attributed to you
        rather than to the service. Saying so here is the point: the warning
        belongs where someone is about to press the button.
      -->
      <p class="pii__warn">
        <strong>Contains personal data.</strong>
        This export lists directory users' email addresses. You will be asked to
        sign in at the directory, and the export is recorded against your account.
        Handle the file accordingly and delete it when you are done.
      </p>
    </template>
  </ReportPanel>
</template>

<style scoped>
.pii__warn {
  margin: 0;
  padding: 0.85rem 1rem;
  border-radius: 8px;
  border: 1px solid var(--at-grid-line);
  border-left: 3px solid var(--at-gold);
  background: var(--at-bg-paper);
  font-size: 0.88rem;
  line-height: 1.5;
  color: var(--at-mute-2);
}
.pii__warn strong { color: var(--at-navy-deep); }
</style>
