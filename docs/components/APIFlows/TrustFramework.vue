<script setup>
import { onMounted, ref } from 'vue'
import mermaid from 'mermaid'

const mermaidContainer = ref(null)

const mermaidDefinition = `
sequenceDiagram
    participant App as Application
    participant Auth as Directory Auth
    participant API as Directory API

    App->>+Auth: POST /token (client_credentials, mTLS)
    Auth-->>-App: { access_token }

    App->>+API: GET /organisations (Bearer token, mTLS)
    API-->>-App: [ { OrganisationId, OrganisationName, Size, … } ]

    Note over App: Filter: Size == "TPP"

    loop For each TPP organisation
        App->>+API: GET /organisations/{OrganisationId}/softwarestatements
        API-->>-App: [ { SoftwareStatementId, SoftwareClientName, … } ]
    end
`

onMounted(async () => {
  mermaid.initialize({
    startOnLoad: false,
    theme: 'light',
    sequence: {
      diagramMarginX: 50,
      diagramMarginY: 30,
      actorMargin: 200,
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
      const { svg } = await mermaid.render('trust-framework-diagram', mermaidDefinition)
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
