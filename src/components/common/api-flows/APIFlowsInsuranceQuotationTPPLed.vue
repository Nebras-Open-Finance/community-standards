<script setup>
import { useMermaidDiagram } from '@/composables/useMermaidDiagram'

const mermaidDefinition = `
sequenceDiagram
    participant Cust as Customer
    participant TPP as TPP
    participant Hub as API Hub
    participant LFI as LFI

    Note over TPP: Collect quote inputs from customer
    Note over TPP: Construct Client Assertion

    TPP->>+Hub: POST /token (client_credentials, scope=insurance)
    Hub-->>-TPP: 200 {access_token}

    TPP->>+Hub: POST /{type}-insurance-quotes
    Hub->>+LFI: POST /{type}-insurance-quotes
    LFI-->>-Hub: 201 {data: [{QuoteId, ...}]}
    Hub-->>-TPP: 201 {data: [{QuoteId, ...}]}

    Note over TPP: Customer selects a quote

    TPP->>+Hub: PATCH /{type}-insurance-quotes/{QuoteId} (Accept Quote + Subscription)
    Hub->>+LFI: PATCH /{type}-insurance-quotes/{QuoteId}
    LFI-->>-Hub: 200 {PolicyIssuanceAllowed: {Cust.Verif, Payment, Docs}}
    Hub-->>-TPP: 200 {PolicyIssuanceAllowed}

    LFI->>Hub: PATCH /insurance-quote-log/{logId} (ApplicationPending)
    Hub-->>TPP: Webhook event (ApplicationPending)

    Note over TPP: TPP collects KYC from customer in TPP UI

    TPP->>+Hub: PATCH /{type}-insurance-quotes/{QuoteId} (Submit KYC)
    Hub->>+LFI: PATCH /{type}-insurance-quotes/{QuoteId}
    LFI-->>-Hub: 200 OK
    Hub-->>-TPP: 200 OK

    LFI->>Hub: PATCH /insurance-quote-log/{logId} (ApplicationApproved + BrokerInstructions.Url)
    Hub-->>TPP: Webhook event (ApplicationApproved + PaymentUrl)

    TPP-->>Cust: Redirect to LFI-hosted PaymentUrl
    Cust->>LFI: Pays premium on LFI-hosted page
    LFI-->>Cust: Redirect back to TPP

    TPP->>+Hub: POST /{type}-insurance-policies (QuoteId + KYC payload)
    Hub->>+LFI: POST /{type}-insurance-policies
    LFI-->>-Hub: 201 Created
    Hub-->>-TPP: 201 Created

    LFI->>Hub: PATCH /insurance-quote-log/{logId} (PolicyIssued + Documents)
    Hub-->>TPP: Webhook event (PolicyIssued + Documents)
    LFI->>Hub: PATCH /insurance-quote-log/{logId} (Completed)
    Hub-->>TPP: Webhook event (Completed)

    Note over TPP: TPP verifies document hashes and surfaces them to the customer
`

const { containerRef: mermaidContainer } = useMermaidDiagram(mermaidDefinition, 'insurance-quotation-tpp-led-diagram')
</script>

<template>
  <div class="diagram-wrapper">
    <div ref="mermaidContainer" class="mermaid-container"></div>
  </div>
</template>
