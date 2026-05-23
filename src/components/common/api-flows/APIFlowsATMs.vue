<script setup>
import { useMermaidDiagram } from '@/composables/useMermaidDiagram'


const mermaidDefinition = `
sequenceDiagram
    participant TPP as TPP
    participant Hub as API Hub
    participant LFI as LFI

    Note over TPP: Create Client Assertion
    TPP->>+Hub: POST /token (client_credentials, scope=confirmation-of-payee)
    Hub-->>-TPP: {access_token}

    TPP->>+Hub: GET /atms
    Hub->>+LFI: GET /atm
    LFI-->>-Hub: { ATM Data }
    Hub-->>-TPP: 200 { ATM Data }
`

const { containerRef: mermaidContainer } = useMermaidDiagram(mermaidDefinition, 'atm-diagram')
</script>

<template>
  <div class="diagram-wrapper">
    <div ref="mermaidContainer" class="mermaid-container"></div>
  </div>
</template>
