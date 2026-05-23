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

    Note over TPP: Sign /discovery request as JWT
    TPP->>+Hub: POST /discovery (application/jwt)
    Hub-->>-TPP: 200 { DiscoveryEndpointUrl, ResourceServerUrl  } (application/jwt)

    Note over TPP: Create Client Assertion
    TPP->>+Hub: POST /token (client_credentials, scope=confirmation-of-payee)
    Hub-->>-TPP: {access_token}

    Note over TPP: Sign /confirmation request as JWT
    TPP->>+Hub: POST /confirmation (application/jwt)
    Hub->>+LFI: POST /customers/action/cop-query (routed by IBAN prefix)
    LFI-->>-Hub: { verifiedClaims.claims.fullName }
    Hub-->>-TPP: 200 { NameMatchIndicator } (application/jwt)
`

const { containerRef: mermaidContainer } = useMermaidDiagram(mermaidDefinition, 'cop-diagram')
</script>

<template>
  <div class="diagram-wrapper">
    <div ref="mermaidContainer" class="mermaid-container"></div>
  </div>
</template>
