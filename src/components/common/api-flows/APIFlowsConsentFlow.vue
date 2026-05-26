<script setup>
import { useMermaidDiagram } from '@/composables/useMermaidDiagram'


const mermaidDefinition = `
sequenceDiagram
    participant TPP as TPP
    participant Hub as API Hub
    participant LFI as LFI

    TPP->>+Hub: POST /par (authorization_details)
    opt Config-dependent
        Hub->>+LFI: POST /consents/action/validate
        Hub->>+LFI: POST /consents/event/post
    end
    Hub-->>-TPP: 200 {request_uri + expires_in}

    TPP-->>LFI: Redirect customer to LFI Auth URL

    LFI->>+Hub: GET /auth
    LFI->>Hub: GET /consents/{consentId}
    Note over LFI: User authenticates & authorizes consent
    LFI->>Hub: PATCH /consent/{consentId}
    LFI->>Hub: POST /auth/{interactionId}/doConfirm

    LFI-->>TPP: Redirect to TPP callback with code + state + iss

    TPP->>+Hub: POST /token (authorization_code + code_verifier)
    Hub-->>-TPP: {access_token + refresh_token}

    alt Bank Data Sharing
        TPP->>+Hub: GET /account-access-consents/{ConsentId}
        Hub-->>-TPP: 200 {Status: Authorized}
    else Bank Service Initiation
        TPP->>+Hub: GET /payment-consents/{ConsentId}
        Hub-->>-TPP: 200 {Status: Authorized}
    else Insurance Data Sharing
        TPP->>+Hub: GET /insurance-consents/{ConsentId}
        Hub-->>-TPP: 200 {Status: Authorized}
    end
`

const { containerRef: mermaidContainer } = useMermaidDiagram(mermaidDefinition, 'consent-diagram')
</script>

<template>
  <div class="diagram-wrapper">
    <div ref="mermaidContainer" class="mermaid-container"></div>
  </div>
</template>
