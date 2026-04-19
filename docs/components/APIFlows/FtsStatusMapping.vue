<script setup>
import { onMounted, ref } from 'vue'
import mermaid from 'mermaid'

const mermaidContainer = ref(null)

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

onMounted(async () => {
  mermaid.initialize({
    startOnLoad: false,
    theme: 'light',
    sequence: {
      diagramMarginX: 50,
      diagramMarginY: 30,
      actorMargin: 80,
      width: 200,
      height: 65,
      boxMargin: 20,
      messageMargin: 45,
      mirrorActors: false,
      useMaxWidth: true
    },
    securityLevel: 'loose'
  })

  if (mermaidContainer.value) {
    try {
      const { svg } = await mermaid.render('fts-status-mapping-diagram', mermaidDefinition)
      mermaidContainer.value.innerHTML = svg
    } catch (err) {
      console.error(err)
      mermaidContainer.value.innerHTML = `
        <div style="color:#f87171; padding:60px; text-align:center; font-family:monospace; font-size:15px;">
          Failed to render Mermaid diagram — check console
        </div>`
    }
  }
})
</script>

<template>
  <div class="diagram-wrapper">
    <div ref="mermaidContainer" class="mermaid-container"></div>
  </div>
</template>
