<script setup>
import { useMermaidDiagram } from '@/composables/useMermaidDiagram'

const props = defineProps({
  /** Documentation version of the page rendering the diagram, e.g. 'v2.2-rc1'. */
  version: { type: String, default: 'v2.1' },
})

// Only the Hub → LFI leg differs between versions. From v2.2 the Hub sends the
// IBAN alone and the LFI answers with a flat name, where v2.1 sends the
// submitted name too and answers with the verifiedClaims envelope — see
// changelog v2.1-to-v2.2 §6. Every version after v2.1 inherits the newer shape,
// which is why this tests for v2.1 rather than for a specific later version.
const flattened = props.version !== 'v2.1'

const confirmationLegs = flattened
  ? `    TPP->>+Hub: POST /confirmation (application/jwt) { IBAN, submitted name }
    Hub->>+LFI: POST /customers/action/cop-query (IBAN only, routed by IBAN prefix)
    Note over LFI: No matching at the LFI:<br/>return every holder, unranked
    LFI-->>-Hub: 200 { data[].name }
    Note over Hub: Hub matches the submitted name<br/>against every entry in data`
  : `    TPP->>+Hub: POST /confirmation (application/jwt)
    Hub->>+LFI: POST /customers/action/cop-query (routed by IBAN prefix)
    LFI-->>-Hub: { verifiedClaims.claims.fullName }`

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
${confirmationLegs}
    Hub-->>-TPP: 200 { NameMatchIndicator } (application/jwt)
`

// Version in the id prefix so two versions rendered in one session cannot
// collide; dots are stripped because the prefix ends up in an SVG element id.
const idPrefix = `cop-diagram-${props.version.replace(/[^a-z0-9]+/gi, '-')}`

const { containerRef: mermaidContainer } = useMermaidDiagram(mermaidDefinition, idPrefix)
</script>

<template>
  <div class="diagram-wrapper">
    <div ref="mermaidContainer" class="mermaid-container"></div>
  </div>
</template>
