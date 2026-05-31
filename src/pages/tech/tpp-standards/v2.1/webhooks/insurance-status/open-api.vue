<route lang="yaml">
meta:
  title: Insurance Quote Status Change Event
</route>

<script setup lang="ts">
const overrideServers = [
  { url: 'https://[subscription.Webhook.Url]' },
]

const patchSchemas = {
  AEWebhookEventTypes: { $ref: '#/components/schemas/AEWebhookInsuranceEventProperties' },
}
</script>

<template>
  <EndpointPage
    eyebrow="TPP · Webhooks · Insurance Quote Status"
    title="Insurance Quote Status Change Event"
    version="v2.1"
    method="POST"
    path="[subscription.Webhook.Url]"
  >
    <RedocWrapper
      spec="/openapi/v2.1/standards/uae-webhook-template-openapi.yaml"
      :patchSchemas="patchSchemas"
      :overrideServers="overrideServers"
    />
  </EndpointPage>
</template>
