---
next: false
prev: false
aside: false
---

# Consent Status Change Event
<RedocWrapper
    spec="/openapi/v2.1/standards/uae-webhook-template-openapi.yaml"
    :patchSchemas="{ AEWebhookEventTypes: { '$ref': '#/components/schemas/AEWebhookConsentedEventProperties' } }"
    :overrideServers="[
      { url: `https://[subscription.Webhook.Url]` }
    ]"
 />