<route lang="yaml">
meta:
  layout: internal
  title: Supported currency pairs
  next: false
  prev: false
  aside: false
</route>

<script setup lang="ts">
// A Jira form: see JiraFormShell for the shared sign-in and ticket check, and
// src/data/jiraForms.ts for how forms are added.

import { useHead } from '@unhead/vue'
import JiraFormShell from '@/components/common/jira-forms/JiraFormShell.vue'
import SupportedCurrencyPairsForm from '@/components/common/jira-forms/SupportedCurrencyPairsForm.vue'

useHead({ title: 'Supported currency pairs' })
</script>

<template>
  <JiraFormShell
    form-id="supported-currency-pairs"
    title="Supported Currency Pairs"
    description="Submit your supported currency pairs against a Service Desk ticket."
  >
    <template #default="{ submit, submitting }">
      <SupportedCurrencyPairsForm :submitting="submitting" @submit="submit" />
    </template>
  </JiraFormShell>
</template>
