<script setup>
import { useMermaidDiagram } from '@/composables/useMermaidDiagram'


const mermaidDefinition = `
sequenceDiagram
    participant TPP as TPP
    participant Hub as API Hub
    participant LFI as LFI

    TPP->>Hub: POST /payments
    Note over Hub: Validate access token, consent status,<br/>control parameters and OpenAPI schema
    Hub->>LFI: POST /payments
    Note over LFI: Synchronous validation
    LFI-->>Hub: 201 {status: Pending}
    Hub-->>TPP: 201 {Status: Pending}

    rect rgba(0, 139, 120, 0.10)
    Note over LFI: Within 3 s of the 201 — screening, then submission to the rail
    LFI->>Hub: PATCH /payment-log/{id} {status: AcceptedSettlementCompleted}
    Hub-->>TPP: Payment status event {Status: AcceptedSettlementCompleted, PaymentRail, PaymentTransactionId}
    TPP-->>Hub: 202 Accepted
    end

    Note over LFI: Rail processing — duration set by the AANI / UAEFTS scheme rules
    LFI->>Hub: PATCH /payment-log/{id} {status: terminal status}
    Hub-->>TPP: Payment status event {Status: terminal status}
    TPP-->>Hub: 202 Accepted

    opt Polling (fallback or reconciliation)
        TPP->>Hub: GET /payments/{PaymentId}
        Hub->>LFI: GET /payments/{paymentId}
        LFI-->>Hub: 200 {status}
        Hub-->>TPP: 200 {Status}
    end
`

const { containerRef: mermaidContainer } = useMermaidDiagram(mermaidDefinition, 'payment-timing-tpp-diagram')
</script>

<template>
  <div class="diagram-wrapper">
    <div ref="mermaidContainer" class="mermaid-container"></div>
  </div>
</template>
