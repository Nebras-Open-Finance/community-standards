<script setup>
import { useMermaidDiagram } from '@/composables/useMermaidDiagram'


const mermaidDefinition = `
sequenceDiagram
    participant TPP as TPP
    participant Hub as API Hub
    participant LFI as LFI

    Note over TPP: Payment Consent already created and<br/> authorised with ReadRefundAccount permission

    Note over TPP: Create Client Assertion
    TPP->>+Hub: POST /token (client_credentials, scope=confirmation-of-payee)
    Hub-->>-TPP: {access_token}

    TPP->>+Hub: GET /payment-consents/{ConsentId}/refund
    Hub->>+LFI: GET /payment-consents/{consentId}/refund 
    LFI-->>-Hub: { refundAccount }
    Hub-->>-TPP: 200 { refundAccount } (application/jwt)

    Note over TPP: Decode JWS, extract<br/>RefundAccount IBAN and name

    Note over TPP: Initiate refund payment using<br/>RefundAccount as creditor
`

const { containerRef: mermaidContainer } = useMermaidDiagram(mermaidDefinition, 'refunds-diagram')
</script>

<template>
  <div class="diagram-wrapper">
    <div ref="mermaidContainer" class="mermaid-container"></div>
  </div>
</template>
