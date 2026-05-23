<script setup>
import { useMermaidDiagram } from '@/composables/useMermaidDiagram'


const mermaidDefinition = `
sequenceDiagram
    participant Hub as API Hub
    participant LFI as LFI
    participant FTS as UAEFTS

    Note over LFI: POST /payments returned 201 {Status: Pending}
    LFI->>FTS: Submit pacs.008

    alt ACK then CB900
        FTS-->>LFI: ACK (technical acceptance, Status remains Pending, no PATCH)
        FTS-->>LFI: CB900 Debit Confirmation
        LFI->>Hub: PATCH /payment-log/{paymentId} {Status: AcceptedCreditSettlementCompleted}
        Hub-->>LFI: 200
    else NAK received
        FTS-->>LFI: NAK (reason code)
        LFI->>Hub: PATCH /payment-log/{paymentId} {Status: Rejected, Code: FTS.AC06}
        Hub-->>LFI: 200
    end
`

const { containerRef: mermaidContainer } = useMermaidDiagram(mermaidDefinition, 'fts-status-mapping-diagram')
</script>

<template>
  <div class="diagram-wrapper">
    <div ref="mermaidContainer" class="mermaid-container"></div>
  </div>
</template>
