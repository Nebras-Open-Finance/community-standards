<script setup>
import { useMermaidDiagram } from '@/composables/useMermaidDiagram'


const mermaidDefinition = `
sequenceDiagram
    participant Hub as API Hub
    participant LFI as LFI (Ozone Connect)
    participant Rail as AANI / UAEFTS

    Hub->>LFI: POST /payments
    Note over LFI: Synchronous validation<br/>PII decryption and schema · creditor matches consent<br/>x-fapi-customer-ip-address · sufficient funds · debtor account state
    LFI-->>Hub: 201 {id, status: Pending}

    rect rgba(0, 139, 120, 0.10)
    Note over LFI: T0 = 201 returned — the 3-second window starts
    Note over LFI: Route the payment: select the rail<br/>and assign paymentTransactionId
    Note over LFI: Fraud screening · transaction monitoring · AML
    LFI->>Rail: Submit payment (pacs.008)
    LFI->>Hub: PATCH /payment-log/{id}<br/>{paymentRail, status: AcceptedSettlementCompleted, paymentTransactionId}
    Hub-->>LFI: 204
    Note over LFI: Submitted and patched by T0 + 3 s
    end

    Note over Rail: Rail processing — duration set by the AANI / UAEFTS scheme rules
    Rail-->>LFI: Rail response
    LFI->>Hub: PATCH /payment-log/{id} — immediately<br/>{paymentRail, status: terminal status, paymentTransactionId}
    Hub-->>LFI: 204
`

const { containerRef: mermaidContainer } = useMermaidDiagram(mermaidDefinition, 'payment-timing-lfi-diagram')
</script>

<template>
  <div class="diagram-wrapper">
    <div ref="mermaidContainer" class="mermaid-container"></div>
  </div>
</template>
