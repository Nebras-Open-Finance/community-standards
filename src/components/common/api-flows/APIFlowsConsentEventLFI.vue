<script setup>
import { onMounted, ref } from 'vue'
import mermaid from 'mermaid'

const mermaidContainer = ref(null)
const diagramId = `consent-event-lfi-diagram-${Math.random().toString(36).slice(2, 10)}`

const mermaidDefinition = `
sequenceDiagram
    participant TPP as TPP
    participant Hub as API Hub
    participant LFI as LFI

    rect rgb(240, 249, 255)
    Note over TPP,LFI: Consent Created
    TPP->>+Hub: POST /par (authorization_details)
    Note over Hub: Consent created
    Hub->>+LFI: POST /consent/event/post
    Note over LFI: Store consent locally
    LFI-->>-Hub: 204 No Content
    Hub-->>-TPP: 200 { request_uri }
    end

    rect rgb(255, 245, 238)
    Note over TPP,LFI: Consent Updated
    TPP->>+Hub: PATCH /account-access-consents/{ConsentId} {Status: Revoked}
    Note over Hub: Consent status → Revoked
    Hub->>+LFI: POST /consent/event/patch
    Note over LFI: Update local consent record
    LFI-->>-Hub: 204 No Content
    Hub-->>-TPP: 204 No Content
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
