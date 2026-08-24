<route lang="yaml">
meta:
  title: Payment Status Change Event
</route>

<script setup lang="ts">
const overrideServers = [
  { url: 'https://[subscription.Webhook.Url]' },
]

const patchSchemas = {
  AEWebhookEventTypes: { $ref: '#/components/schemas/AEWebhookPaymentInitiationEventProperties' },
}
</script>

<template>
  <EndpointPage
    eyebrow="TPP · Webhooks · Payment Status"
    title="Payment Status Change Event"
    version="v2.2-rc1"
    method="POST"
    path="[subscription.Webhook.Url]"
  >
    <RedocWrapper
      spec="/openapi/v2.2-rc1/standards/uae-webhook-template-openapi.yaml"
      :patchSchemas="patchSchemas"
      :overrideServers="overrideServers"
    />
  </EndpointPage>
</template>
