<route lang="yaml">
meta:
  layout: internal
  title: PII report
  next: false
  prev: false
  aside: false
</route>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useHead } from '@unhead/vue'
import ReportPanel from '@/components/common/ReportPanel.vue'
import { usePiiReport } from '@/composables/useReports'

useHead({ title: 'PII report' })

const {
  env, busy, error, done, loginUrl, redirecting, loopDetected,
  downloadCsv, reset, resume, retry,
} = usePiiReport()

watch(env, reset)

// The API requires a directory session, so an unauthenticated download bounces
// straight to Trust Framework SSO (see usePiiReport). We land back here with the
// session set — pick the download back up rather than making the user press the
// button a second time.
onMounted(resume)
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
    :redirecting="redirecting"
    :loop-detected="loopDetected"
    done-message="PII report generated."
    @update:env="env = $event"
    @download="downloadCsv"
    @retry="retry"
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
        This export lists directory users' email addresses. If you are not
        already signed in, you will be sent to the Trust Framework to do so, and
        the export is recorded against your account. Handle the file accordingly
        and delete it when you are done.
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
