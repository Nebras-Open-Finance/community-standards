<script setup lang="ts">
import { useMermaidDiagram } from '@/composables/useMermaidDiagram'

// BioPay registration, end to end. The LFI channel calls ICP directly, through
// the ICP SDK, for identity verification and the completed registration; the
// API Hub is not involved. Nothing is stored at the Hub: ICP holds
// uaeKycId → LFI, the LFI holds uaeKycId → payment instrument.
// Draft — endpoint names are proposed, not published.

const lfiChannel = `
    Note over PSU,LFI: LFI channel
    PSU->>LFI: Requests BioPay registration`

const instrumentSelection = `
    LFI->>PSU: Select payment rail (AANI, CBDC, Jaywan, ...)
    PSU-->>LFI: Selects payment instrument + default
    LFI->>LFI: Store uaeKycId → customer record + payment instrument(s)`

const direct = `
sequenceDiagram
    participant PSU as Customer
    participant LFI as LFI (channel)
    participant ICP as ICP
${lfiChannel}

    Note over LFI,ICP: ICP SDK
    LFI->>ICP: Identity verification
    ICP-->>LFI: Verified identity + uaeKycId
${instrumentSelection}

    Note over LFI,ICP: ICP SDK
    LFI->>ICP: Post completed registration
    ICP->>ICP: Store uaeKycId → LFI
    ICP-->>LFI: Accepted
`

const { containerRef: mermaidContainer } = useMermaidDiagram(
  direct,
  'biopay-registration-flow-direct',
)
</script>

<template>
  <div class="diagram-wrapper">
    <div ref="mermaidContainer" class="mermaid-container"></div>
  </div>
</template>
