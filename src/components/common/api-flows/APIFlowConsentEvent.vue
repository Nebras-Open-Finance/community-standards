<script setup>
import { useMermaidDiagram } from '@/composables/useMermaidDiagram'


const mermaidDefinition = `
sequenceDiagram
    participant TPP as TPP
    participant Hub as API Hub
    participant LFI as LFI

    Note over TPP: Consent with (subscription.Webhook.URL<br/> & subscription.Webhook.IsActive: true)

    LFI->>Hub: POST /consents/{consentId}/action/revoke
    Hub->>+TPP: POST (Event - Consent Data Event) {Status: Revoked}
    TPP->>-Hub: 202 Accepted
`

const { containerRef: mermaidContainer } = useMermaidDiagram(mermaidDefinition, 'consent-event-diagram')
</script>

<template>
  <div class="diagram-wrapper">
    <div ref="mermaidContainer" class="mermaid-container"></div>
  </div>
</template>
