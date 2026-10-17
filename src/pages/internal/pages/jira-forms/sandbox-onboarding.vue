<route lang="yaml">
meta:
  layout: internal
  title: Sandbox onboarding
  next: false
  prev: false
  aside: false
</route>

<script setup lang="ts">
// The one Jira form without Trust Framework SSO: applicants have no account
// yet, so it does not use JiraFormShell. See src/data/jiraForms.ts.

import { useHead } from '@unhead/vue'
import SandboxOnboardingForm from '@/components/common/jira-forms/sandbox-onboarding/SandboxOnboardingForm.vue'

useHead({ title: 'Sandbox onboarding' })
</script>

<template>
  <SandboxOnboardingForm />
</template>
