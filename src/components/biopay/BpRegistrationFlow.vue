<script setup lang="ts">
import { useMermaidDiagram } from '@/composables/useMermaidDiagram'

// BioPay registration, end to end. Steps 1–2 happen in the LFI's own channel
// and use no Open Finance API; steps 3–5 are what brings the registration into
// the API Hub and tells ICP where to address that customer's calls. Draft —
// endpoint names are proposed, not published.
const mermaidDefinition = `
sequenceDiagram
    participant PSU as Customer
    participant LFI as LFI (channel)
    participant ICP as BPIP
    participant Hub as API Hub

    Note over PSU,LFI: Out of band — LFI channel, no Open Finance API
    PSU->>LFI: Requests BioPay registration
    LFI->>ICP: Identity verification
    ICP-->>LFI: Verified identity + ICP user id
    LFI->>LFI: Bind ICP user id to customer record
    LFI->>PSU: Select payment rail (AANI, CBDC, Jaywan, ...)
    PSU-->>LFI: Selects instrument + default

    Note over LFI,Hub: Into Open Finance — C3 (mTLS and application_auth)
    LFI->>Hub: Post completed registration
    Hub->>Hub: Store ICP user id → LFI → instrument(s)
    Hub-->>LFI: 201 {RegistrationId}

    Hub->>ICP: POST registration event (signed + encrypted JWT)<br/>Meta {EventType, RegistrationId} · Data as discovery
    ICP-->>Hub: 202 Accepted
    Note over ICP: Retains DiscoveryEndpointUrl and ResourceServerUrl —<br/>needed to address token, discovery and payment calls
`

const { containerRef: mermaidContainer } = useMermaidDiagram(
  mermaidDefinition,
  'biopay-registration-flow',
)
</script>

<template>
  <div class="diagram-wrapper">
    <div ref="mermaidContainer" class="mermaid-container"></div>
  </div>
</template>
