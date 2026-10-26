<script setup>
import { useMermaidDiagram } from '@/composables/useMermaidDiagram'


const mermaidDefinition = `
sequenceDiagram
    participant Hub as API Hub
    participant LFI as LFI
    participant AANI as AANI

    Note over LFI: POST /payments returned 201 {status: Pending}<br/>Screening passed — within 3 s of the 201
    LFI->>AANI: Submit pacs.008 (TxId OFP...)
    LFI->>Hub: PATCH /payment-log/{id}<br/>{paymentRail: AANI, status: AcceptedSettlementCompleted, paymentTransactionId}
    Hub-->>LFI: 204

    alt Positive Account Verification Response
        AANI-->>LFI: pacs.002 accepted
        LFI->>Hub: PATCH /payment-log/{id}<br/>{paymentRail: AANI, status: AcceptedWithoutPosting, paymentTransactionId}
        Hub-->>LFI: 204
    else pacs.002 rejection
        AANI-->>LFI: pacs.002 rejected
        LFI->>Hub: PATCH /payment-log/{id}<br/>{paymentRail: AANI, status: Rejected, paymentTransactionId, code: AANI.AM04}
        Hub-->>LFI: 204
    end
`

const { containerRef: mermaidContainer } = useMermaidDiagram(mermaidDefinition, 'aani-patch-sequence-diagram')
</script>

<template>
  <div class="diagram-wrapper">
    <div ref="mermaidContainer" class="mermaid-container"></div>
  </div>
</template>
