<route lang="yaml">
meta:
  title: Consent Status Change Event
</route>

<script setup lang="ts">
const overrideServers = [
  { url: 'https://[subscription.Webhook.Url]' },
]

const patchSchemas = {
  AEWebhookEventTypes: { $ref: '#/components/schemas/AEWebhookConsentedEventProperties' },
}
</script>

<template>
  <EndpointPage
    eyebrow="TPP · Webhooks · Consent Status"
    title="Consent Status Change Event"
    version="v2.2-draft"
    method="POST"
    path="[subscription.Webhook.Url]"
  >
    <RedocWrapper
      spec="/openapi/v2.2-draft/standards/uae-webhook-template-openapi.yaml"
      :patchSchemas="patchSchemas"
      :overrideServers="overrideServers"
    />
  </EndpointPage>
</template>
