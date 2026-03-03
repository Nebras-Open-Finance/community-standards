<script setup>
import { onMounted, ref } from 'vue'
import mermaid from 'mermaid'

const mermaidContainer = ref(null)

const mermaidDefinition = `
sequenceDiagram
    participant TPP as TPP
    participant Hub as API Hub
    participant LFI as LFI

    TPP->>+Hub: POST /token (client_credentials, scope=confirmation-of-payee)
    Hub-->>-TPP: {access_token}

    Note over TPP: Sign /discovery request as JWT
    TPP->>+Hub: POST /discovery (application/jwt)
    Hub-->>-TPP: 200 { DiscoveryEndpointUrl, ResourceServerUrl  } (application/jwt)

    Note over TPP: Sign /confirmation request as JWT
    TPP->>+Hub: POST /confirmation (application/jwt)
    Hub->>+LFI: POST /customers/action/cop-query (routed by IBAN prefix)
    LFI-->>-Hub: { verifiedClaims.claims.fullName }
    Hub-->>-TPP: 200 { NameMatchIndicator } (application/jwt)
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
      const { svg } = await mermaid.render('cop-diagram', mermaidDefinition)
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
