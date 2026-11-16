<script setup>
import { useMermaidDiagram } from '@/composables/useMermaidDiagram'


const mermaidDefinition = `
sequenceDiagram
    participant Hub as API Hub
    participant LFI as LFI
    participant FTS as UAEFTS

    Note over LFI: POST /payments returned 201 {status: Pending}<br/>Screening passed — within 3 s of the 201
    LFI->>FTS: Submit pacs.008
    LFI->>Hub: PATCH /payment-log/{id}<br/>{paymentRail: FTS, status: AcceptedSettlementCompleted, paymentTransactionId}
    Hub-->>LFI: 204

    alt ACK then CB900
        FTS-->>LFI: ACK (technical acceptance, no PATCH)
        FTS-->>LFI: CB900 Debit Confirmation
        LFI->>Hub: PATCH /payment-log/{id}<br/>{paymentRail: FTS, status: AcceptedCreditSettlementCompleted, paymentTransactionId}
        Hub-->>LFI: 204
    else NAK received
        FTS-->>LFI: NAK (reason code)
        LFI->>Hub: PATCH /payment-log/{id}<br/>{paymentRail: FTS, status: Rejected, paymentTransactionId, code: FTS.AC06}
        Hub-->>LFI: 204
    end
`

const { containerRef: mermaidContainer } = useMermaidDiagram(mermaidDefinition, 'fts-patch-sequence-diagram')
</script>

<template>
  <div class="diagram-wrapper">
    <div ref="mermaidContainer" class="mermaid-container"></div>
  </div>
</template>
