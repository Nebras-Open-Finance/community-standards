<script setup>
import { useMermaidDiagram } from '@/composables/useMermaidDiagram'


const mermaidDefinition = `
sequenceDiagram
    participant TPP as TPP
    participant Hub as API Hub
    participant LFI as LFI

    Note over TPP: Consent with (subscription.Webhook.URL<br/> & subscription.Webhook.IsActive: true)
    TPP->>+Hub: POST /payments
    Hub->>LFI: POST /payments
    LFI-->>Hub: 201 {PaymentId}
    Hub-->>-TPP: 201 {PaymentId, Status: Pending}

    LFI-->>+Hub: PATCH /payment-log/{paymentId} {Status: AcceptedWithoutPosting}
    Hub-->>-TPP: POST (Event - Payment Initiation Request) {Status: AcceptedWithoutPosting}
`

const { containerRef: mermaidContainer } = useMermaidDiagram(mermaidDefinition, 'payment-status-event-diagram')
</script>

<template>
  <div class="diagram-wrapper">
    <div ref="mermaidContainer" class="mermaid-container"></div>
  </div>
</template>
