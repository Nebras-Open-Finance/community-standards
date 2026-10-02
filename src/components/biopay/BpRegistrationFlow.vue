<script setup lang="ts">
import { useMermaidDiagram } from '@/composables/useMermaidDiagram'

// BioPay registration, end to end.
//   direct (adopted) — the LFI channel calls ICP directly, through the ICP SDK,
//          for identity verification and the completed registration; the API
//          Hub is not involved.
//   hub    (rejected Option A) — the API Hub sits between the LFI channel and
//          ICP under C3, and offers an optional discovery call that it answers by
//          asking the LFI. Kept only as the record of the option considered.
// In both, nothing is stored at the Hub: ICP holds uaeKycId → LFI, the LFI holds
// uaeKycId → payment instrument. Draft — endpoint names are proposed, not published.
const props = withDefaults(defineProps<{ variant?: 'hub' | 'direct' }>(), {
  variant: 'direct',
})

const lfiChannel = `
    Note over PSU,LFI: LFI channel
    PSU->>LFI: Requests BioPay registration`

const instrumentSelection = `
    LFI->>PSU: Select payment rail (AANI, CBDC, Jaywan, ...)
    PSU-->>LFI: Selects payment instrument + default
    LFI->>LFI: Store uaeKycId → customer record + payment instrument(s)`

const viaHub = `
sequenceDiagram
    participant PSU as Customer
    participant LFI as LFI (channel)
    participant Hub as API Hub
    participant ICP as ICP
${lfiChannel}

    Note over LFI,Hub: C3 (mTLS and application_auth)
    LFI->>Hub: Identity verification
    Hub->>ICP: Identity verification
    ICP-->>Hub: Verified identity + uaeKycId
    Hub-->>LFI: Verified identity + uaeKycId
${instrumentSelection}

    Note over LFI,Hub: C3 (mTLS and application_auth)
    LFI->>Hub: Post completed registration
    Hub->>Hub: Validate — no registration binding stored
    Hub-->>LFI: 201 {RegistrationId}

    Hub->>ICP: POST registration event (signed + encrypted JWT)<br/>Meta {EventType, RegistrationId} · Data as discovery
    ICP->>ICP: Store uaeKycId → LFI
    ICP-->>Hub: 202 Accepted
    Note over ICP: Retains DiscoveryEndpointUrl and ResourceServerUrl —<br/>needed to address token, discovery and payment calls

    opt Discovery — is the uaeKycId registered for BioPay at the LFI?
    ICP->>Hub: POST /biometric-payments-discovery (signed JWT: uaeKycId)
    Hub->>LFI: Is uaeKycId registered for BioPay?
    LFI-->>Hub: Registration status
    Hub-->>ICP: 200 signed JWT {RegistrationStatus}
    end
`

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
  props.variant === 'direct' ? direct : viaHub,
  `biopay-registration-flow-${props.variant}`,
)
</script>

<template>
  <div class="diagram-wrapper">
    <div ref="mermaidContainer" class="mermaid-container"></div>
  </div>
</template>
