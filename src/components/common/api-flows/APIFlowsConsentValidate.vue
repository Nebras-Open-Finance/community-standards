<script setup>
import { useMermaidDiagram } from '@/composables/useMermaidDiagram'


const mermaidDefinition = `
sequenceDiagram
    participant TPP as TPP
    participant Hub as API Hub
    participant LFI as LFI

    TPP->>+Hub: POST /par (authorization_details)
    Hub->>+LFI: POST /consent/action/validate
    alt status: valid
        LFI-->>-Hub: 200 { status: "valid" }
        Note over Hub: Consent created
        Hub-->>TPP: 200 { request_uri }
    else status: invalid
        LFI-->>Hub: 200 { status: "invalid" }
        Note over Hub: Consent NOT created
        Hub-->>-TPP: Error returned to TPP
    end
`

const { containerRef: mermaidContainer } = useMermaidDiagram(mermaidDefinition, 'consent-validate-diagram')
</script>

<template>
  <div class="diagram-wrapper">
    <div ref="mermaidContainer" class="mermaid-container"></div>
  </div>
</template>
