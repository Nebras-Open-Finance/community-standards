<script setup>
import { useMermaidDiagram } from '@/composables/useMermaidDiagram'


const mermaidDefinition = `
sequenceDiagram
    participant TPP as TPP
    participant Hub as API Hub
    participant LFI as LFI

    Note over TPP: Consent created with Webhook.IsActive: true<br/>and a registered Webhook.Url
    TPP->>Hub: POST /payments
    Hub->>LFI: POST /payments
    LFI-->>Hub: 201 {PaymentId}
    Hub-->>TPP: 201 {PaymentId, Status: Pending}

    Note over LFI: LFI executes via intra-bank, AANI, or UAEFTS
    LFI->>Hub: PATCH /payment-log/{paymentId} {Status: AcceptedWithoutPosting}

    Note over TPP,Hub: Option 1 — Event notification (push)
    Hub-->>TPP: POST Webhook.Url {Status: AcceptedWithoutPosting}
    TPP-->>Hub: 202 Accepted

    Note over TPP,Hub: Option 2 — Polling (pull)
    TPP->>Hub: GET /payments/{paymentId}
    Hub->>LFI: GET /payments/{paymentId}
    LFI-->>Hub: 200 {Status: AcceptedWithoutPosting}
    Hub-->>TPP: 200 {Status: AcceptedWithoutPosting}
`

const { containerRef: mermaidContainer } = useMermaidDiagram(mermaidDefinition, 'tpp-payment-status-diagram')
</script>

<template>
  <div class="diagram-wrapper">
    <div ref="mermaidContainer" class="mermaid-container"></div>
  </div>
</template>
