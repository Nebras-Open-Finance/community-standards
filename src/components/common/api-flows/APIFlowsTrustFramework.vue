<script setup>
import { useMermaidDiagram } from '@/composables/useMermaidDiagram'

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

const { containerRef: mermaidContainer } = useMermaidDiagram(
  mermaidDefinition,
  'trust-framework-diagram',
  {
    sequence: {
      diagramMarginX: 50,
      diagramMarginY: 30,
      actorMargin: 200,
      width: 200,
      height: 65,
      boxMargin: 20,
      messageMargin: 45,
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
