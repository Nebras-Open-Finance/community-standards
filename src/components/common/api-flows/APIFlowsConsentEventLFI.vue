<script setup>
import { useMermaidDiagram } from '@/composables/useMermaidDiagram'


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

const { containerRef: mermaidContainer } = useMermaidDiagram(mermaidDefinition, 'consent-event-lfi-diagram')
</script>

<template>
  <div class="diagram-wrapper">
    <div ref="mermaidContainer" class="mermaid-container"></div>
  </div>
</template>
