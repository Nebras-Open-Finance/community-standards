<script setup lang="ts">
import { useMermaidDiagram } from '@/composables/useMermaidDiagram'

// One BioPay payment, end to end. The BPIP is the merchant's acquirer;
// ICP resolves the customer. Both BPIP calls — identity resolution to ICP and
// the payment to the LFI — go through the API Hub under client_credentials and
// mTLS; nothing reaches ICP or the LFI except by the Hub proxying it.
// Draft — endpoint names and scopes are proposed.
const mermaidDefinition = `
sequenceDiagram
    participant PSU as Customer
    participant BPIP as BPIP (acquirer)
    participant Hub as API Hub
    participant ICP as ICP
    participant LFI as LFI (Ozone Connect)

    PSU->>BPIP: Presents thumbprint / face / palm
    BPIP->>BPIP: Capture + amount + creditor details

    Note over BPIP,Hub: client_credentials · mTLS · scope: biometric-resolution
    BPIP->>Hub: Resolve customer (biometric capture)
    Hub->>ICP: Resolve customer
    ICP->>ICP: Match, liveness, look up uaeKycId → LFI
    ICP-->>Hub: {uaeKycId, LFI}
    Hub-->>BPIP: {uaeKycId, LFI}

    alt Not resolved or not registered
        BPIP-->>PSU: BioPay unavailable — fall back
    else Resolved
        Note over BPIP,Hub: client_credentials · mTLS · scope: biometric-payments
        BPIP->>Hub: POST /biometric-payments at the LFI's ResourceServerUrl<br/>{uaeKycId, Instruction, Creditor}
        Hub->>Hub: Entitlement, schema, idempotency
        Hub->>LFI: Proxied payment request
        LFI->>LFI: Resolve uaeKycId → instrument<br/>Fraud, risk, balance checks
        LFI-->>Hub: 201 {PaymentId}
        Hub-->>BPIP: 201 {PaymentId, Status: Pending}
        BPIP-->>PSU: Accepted — payment pending

        Note over LFI: Executes on the registered payment rail<br/>(AANI, CBDC, Jaywan, ...)
        LFI->>Hub: PATCH /biometrics-payment-log/{id}<br/>{Status, RailReference}
        Hub-->>LFI: 204 No Content
        Hub->>BPIP: Payment status event {PaymentId, Status}
        BPIP-->>Hub: 202 Accepted

        opt Polling, or recovery from a lost 201
            BPIP->>Hub: GET /biometric-payments/{PaymentId}
            BPIP->>Hub: GET /biometric-payments?IdempotencyKey
            Hub-->>BPIP: 200 {Status}
        end
    end
`

const { containerRef: mermaidContainer } = useMermaidDiagram(
  mermaidDefinition,
  'biopay-payment-flow',
)
</script>

<template>
  <div class="diagram-wrapper">
    <div ref="mermaidContainer" class="mermaid-container"></div>
  </div>
</template>
