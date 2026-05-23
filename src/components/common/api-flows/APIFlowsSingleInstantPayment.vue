<script setup>
import { useMermaidDiagram } from '@/composables/useMermaidDiagram'


const mermaidDefinition = `
sequenceDiagram
    participant TPP as TPP
    participant Hub as API Hub
    participant LFI as LFI

    Note over TPP: Encrypt PII (Initiation.Creditor[], Initiation.DebtorAccount{}, Risk{})
    Note over TPP: Construct Authorization Details
    Note over TPP: Construct Request JWT (payments openid)
    Note over TPP: Create Client Assertion
    TPP->>+Hub: POST /par (urn:openfinanceuae:service-initiation-consent:v2.1)
    opt Config-dependent
        Hub->>+LFI: POST /consents/action/validate
        Hub->>+LFI: POST /consents/event/post
    end
    Hub-->>-TPP: 200 {request_uri + expires_in}

    TPP-->>LFI: Redirect customer to LFI Auth URL

    LFI->>+Hub: GET /auth
    LFI->>Hub: GET /consents/{consentId}
    Note left of LFI: User authenticates & authorizes payment
    LFI->>Hub: PATCH /consent/{consentId}
    LFI->>Hub: POST /auth/{interactionId}/doConfirm

    LFI-->>TPP: Redirect to TPP callback with code + state + iss

    TPP->>+Hub: POST /token (authorization_code + code_verifier)
    Hub-->>-TPP: {access_token + refresh_token}
    
    Note over TPP: Encrypt PII (Initiation.CreditorAccount{}, Initiation.Creditor{}, <br/> Initiation.CreditorAgent{}, Initiation.ConfirmationOfPayeeResponse, Risk{})
    TPP->>+Hub: POST /payments
    Hub->>LFI: POST /payments
    LFI-->>Hub: 201 {PaymentId}
    Hub-->>-TPP: 201 {PaymentId, Status: Pending}

    LFI-->>+Hub: PATCH /payment-log/{paymentId} {Status: AcceptedWithoutPosting}
    Hub-->>-TPP: POST (Event - Payment Initiation Request) {Status: AcceptedWithoutPosting}


    TPP->>+Hub: GET /payments/{paymentId}
    Hub->>LFI: GET /payments/{paymentId}
    LFI-->>Hub: 200 {Status: AcceptedWithoutPosting}
    Hub-->>-TPP: 200 {Status: AcceptedWithoutPosting}
`

const { containerRef: mermaidContainer } = useMermaidDiagram(mermaidDefinition, 'sip-diagram')
</script>

<template>
  <div class="diagram-wrapper">
    <div ref="mermaidContainer" class="mermaid-container"></div>
  </div>
</template>
