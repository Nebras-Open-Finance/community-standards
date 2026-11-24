<script setup>
import { useMermaidDiagram } from '@/composables/useMermaidDiagram'

// Bulk and Batch Payments (OFP-001) — v2.2 only. Shows the legs the v2.2-rc2
// specs define: the Hub validates Instructions[] against the consent before
// calling Ozone Connect POST /bulk-payments, and serves the TPP's reads from
// Ozone Connect GET /bulk-payments/{bulkPaymentId} and
// GET /bulk-payments/{bulkPaymentId}/payments/{paymentId}. (GET /payments/{paymentId}
// also serves a payment from a batch, in the single-payment shape; not drawn.)
// The payment-log PATCH and Event Notification sequence for each payment in a
// batch is not yet specified, so it is not drawn.
const mermaidDefinition = `
sequenceDiagram
    participant TPP as TPP
    participant Hub as API Hub
    participant LFI as LFI

    Note over TPP: Encrypt PII (Bulk and Batch Risk{})
    Note over TPP: Construct Authorization Details (ConsentSchedule.BulkBatchPayment)
    Note over TPP: Construct Request JWT (payments openid)
    Note over TPP: Create Client Assertion
    TPP->>+Hub: POST /par (urn:openfinanceuae:service-initiation-consent:v2.2)
    opt Config-dependent
        Hub->>LFI: POST /consents/action/validate
        Hub->>LFI: POST /consents/event/post
    end
    Hub-->>-TPP: 200 {request_uri + expires_in}

    TPP-->>LFI: Redirect customer to LFI Auth URL

    LFI->>Hub: GET /auth
    LFI->>Hub: GET /consents/{consentId}
    Note left of LFI: User authenticates & authorizes the batch <br/> (Description, NumberOfTransactions, TotalValueOfPayments)
    LFI->>Hub: PATCH /consent/{consentId}
    LFI->>Hub: POST /auth/{interactionId}/doConfirm

    LFI-->>TPP: Redirect to TPP callback with code + state + iss

    TPP->>+Hub: POST /token (authorization_code + code_verifier)
    Hub-->>-TPP: {access_token + refresh_token}

    Note over TPP: Encrypt batch PII (Risk{}) <br/> Encrypt PII per payment (Initiation.DebtorAccount{}, Initiation.CreditorAccount{}, <br/> Initiation.Creditor{}, Initiation.CreditorAgent{})
    TPP->>+Hub: POST /bulk-payments (Instructions[])
    Note over Hub: Validate Instructions[] against <br/> NumberOfTransactions and TotalValueOfPayments
    Hub->>LFI: POST /bulk-payments (Instructions[])
    Note left of LFI: Validate, screen and settle <br/> each payment on its own
    LFI-->>Hub: 201 {id, instructions[] paymentId + status}
    Hub-->>-TPP: 201 {BulkPaymentId, Instructions[] PaymentId + Status}

    TPP->>+Hub: GET /bulk-payments/{BulkPaymentId}
    Hub->>LFI: GET /bulk-payments/{bulkPaymentId}
    LFI-->>Hub: 200 {instructions[] paymentId + status}
    Hub-->>-TPP: 200 {Instructions[] PaymentId + Status}

    TPP->>+Hub: GET /bulk-payments/{BulkPaymentId}/payments/{PaymentId}
    Hub->>LFI: GET /bulk-payments/{bulkPaymentId}/payments/{paymentId}
    LFI-->>Hub: 200 {paymentId + status}
    Hub-->>-TPP: 200 {PaymentId + Status}
`

const { containerRef: mermaidContainer } = useMermaidDiagram(mermaidDefinition, 'bulk-batch-diagram')
</script>

<template>
  <div class="diagram-wrapper">
    <div ref="mermaidContainer" class="mermaid-container"></div>
  </div>
</template>
