<script setup>
import { onMounted, ref } from 'vue'
import mermaid from 'mermaid'

const mermaidContainer = ref(null)

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
      const { svg } = await mermaid.render('tpp-payment-status-diagram', mermaidDefinition)
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
