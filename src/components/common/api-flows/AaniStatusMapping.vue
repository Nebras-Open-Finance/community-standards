<script setup>
import { useMermaidDiagram } from '@/composables/useMermaidDiagram'


const mermaidDefinition = `
sequenceDiagram
    participant Hub as API Hub
    participant LFI as LFI
    participant AANI as AANI

    Note over LFI: POST /payments returned 201 {Status: Pending}
    LFI->>AANI: Submit pacs.008

    alt Positive Account Verification Response
        AANI-->>LFI: pacs.002 accepted + paymentTransactionId
        LFI->>Hub: PATCH /payment-log/{paymentId} {Status: AcceptedWithoutPosting}
        Hub-->>LFI: 200
    else pacs.002 rejection
        AANI-->>LFI: pacs.002 rejected
        LFI->>Hub: PATCH /payment-log/{paymentId} {Status: Rejected, Code: AANI.AM04}
        Hub-->>LFI: 200
    end
`

const { containerRef: mermaidContainer } = useMermaidDiagram(mermaidDefinition, 'aani-status-mapping-diagram')
</script>

<template>
  <div class="diagram-wrapper">
    <div ref="mermaidContainer" class="mermaid-container"></div>
  </div>
</template>
