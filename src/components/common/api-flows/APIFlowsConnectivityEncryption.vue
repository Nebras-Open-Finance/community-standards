<script setup>
import { onMounted, ref } from 'vue'
import mermaid from 'mermaid'

const mermaidContainer = ref(null)
const diagramId = `connectivity-encryption-diagram-${Math.random().toString(36).slice(2, 10)}`

const mermaidDefinition = `
sequenceDiagram
    participant TPP as TPP
    participant Hub as API Hub
    participant LFI as LFI

    rect rgb(240, 249, 255)
    Note over TPP,LFI: Enc1 — TPP encrypts PII for the LFI.<br/>Enc1 is the LFI's encryption key (LFI holds the private key).<br/>The API Hub passes the encrypted payload through unchanged.
    Note over TPP: Encrypt PII fields with Enc1 (LFI public key).
    TPP->>Hub: Request (PII encrypted with Enc1)
    Hub->>LFI: Request (PII encrypted with Enc1, passed through)
    Note over LFI: Decrypt PII with Enc1 private key.
    LFI-->>Hub: Response
    Hub-->>TPP: Response
    end

    rect rgb(240, 255, 240)
    Note over TPP,LFI: Enc2 — API Hub encrypts webhook events for the TPP.<br/>Enc2 is the TPP's encryption key (TPP holds the private key).<br/>Only applies to webhook event payloads.
    Note over Hub: Encrypt event payload with Enc2 (TPP public key).
    Hub->>TPP: Webhook event (encrypted with Enc2)
    Note over TPP: Decrypt event with Enc2 private key.
    TPP-->>Hub: 200/202 ack
    end
`

onMounted(async () => {
  mermaid.initialize({
    startOnLoad: false,
    theme: 'light',
    sequence: {
      diagramMarginX: 50,
      diagramMarginY: 30,
      actorMargin: 120,
      width: 220,
      height: 65,
      boxMargin: 20,
      messageMargin: 50,
      noteMargin: 15,
      mirrorActors: false,
      useMaxWidth: true
    },
    securityLevel: 'loose'
  })

  if (mermaidContainer.value) {
    try {
      const { svg } = await mermaid.render(diagramId, mermaidDefinition)
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
