<script setup lang="ts">
import { useMermaidDiagram } from '@/composables/useMermaidDiagram'

// One BioPay payment, end to end. The BPIP is the merchant's acquirer;
// ICP resolves the customer. Identity resolution is called by the BPIP directly
// on ICP through the ICP SDK — it does not route through the API Hub. The
// payment goes through the API Hub under client_credentials and mTLS; nothing
// reaches the LFI except by the Hub proxying it.
// Draft — endpoint names and scopes are proposed.
const mermaidDefinition = `
sequenceDiagram
    participant PSU as Customer
    participant BPIP as BPIP (acquirer)
    participant ICP as ICP
    participant Hub as API Hub
    participant LFI as LFI (Ozone Connect)

    PSU->>BPIP: Presents thumbprint / face / palm
    BPIP->>BPIP: Capture + amount + creditor details

    Note over ICP,BPIP: ICP SDK
    BPIP->>ICP: Resolve customer (biometric capture)
    ICP->>ICP: Match, liveness, look up uaeKycId → default LFI
    ICP-->>BPIP: {uaeKycId, default LFI, token}

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

        Note over LFI: Executes the account-to-account payment<br/>via AANI/IPP
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
