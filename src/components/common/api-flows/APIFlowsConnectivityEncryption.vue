<script setup>
import { useMermaidDiagram } from '@/composables/useMermaidDiagram'

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

const { containerRef: mermaidContainer } = useMermaidDiagram(
  mermaidDefinition,
  'connectivity-encryption-diagram',
  {
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
      useMaxWidth: true,
    },
  },
)
</script>

<template>
  <div class="diagram-wrapper">
    <div ref="mermaidContainer" class="mermaid-container"></div>
  </div>
</template>
