<script setup lang="ts">
import { useMermaidDiagram } from '@/composables/useMermaidDiagram'

// One BioPay payment, end to end. The BPIP is the merchant's acquirer;
// ICP resolves the customer. Identity resolution is called by the BPIP directly
// on ICP through the ICP SDK — it does not route through the API Hub. On every
// payment the BPIP then looks up the customer's payment instrument at the LFI
// through the API Hub, and routes on the result: an account payment goes
// through the Hub to the LFI; a card payment goes to the card scheme, with the
// BPIP as acquirer, and does not return to the Hub. The card credential in the
// lookup response is a JWE encrypted by the LFI to the BPIP's Directory
// encryption key, so the Hub never sees card data in the clear. Calls to the Hub run under
// client_credentials and mTLS; nothing reaches the LFI except by the Hub
// proxying it.
// Draft — endpoint names and scopes are proposed.
const mermaidDefinition = `
sequenceDiagram
    participant PSU as Customer
    participant BPIP as BPIP (acquirer)
    participant ICP as ICP
    participant Hub as API Hub
    participant LFI as LFI (Ozone Connect)
    participant Scheme as Card Scheme (e.g. Jaywan)

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
        BPIP->>Hub: POST /instrument-lookup at the LFI's ResourceServerUrl<br/>{uaeKycId, amount, card acceptance details}
        Hub->>Hub: Entitlement, schema
        Hub->>LFI: Proxied instrument lookup
        LFI->>LFI: Look up uaeKycId → instrument<br/>Fraud, risk checks

        alt Account (AANI/IPP)
            LFI-->>Hub: 200 {PaymentInstrument, IBAN}
            Hub-->>BPIP: 200 {PaymentInstrument, IBAN}
            BPIP->>Hub: POST /biometric-payments<br/>{uaeKycId, PaymentInstrument, Instruction, Creditor}
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
        else Card (card scheme, e.g. Jaywan)
            LFI->>LFI: Generate one-time token + cryptogram
            LFI->>LFI: Encrypt {CardSchemeToken, Cryptogram, Expiry} as JWE<br/>with the BPIP's public key from the Directory
            LFI-->>Hub: 200 {PaymentInstrument, EncryptedCardCredential (JWE)}
            Note over Hub: Proxies the JWE unread —<br/>no card data in the clear, out of PCI DSS scope
            Hub-->>BPIP: 200 {PaymentInstrument, EncryptedCardCredential (JWE)}
            BPIP->>BPIP: Decrypt JWE with its private key
            Note over BPIP,Scheme: From here the payment runs between the BPIP, as acquirer,<br/>and the card scheme — not through the API Hub
            BPIP->>Scheme: Authorisation request {token, cryptogram, amount}<br/>CVM: biometric, verified by ICP
            Scheme->>Scheme: Detokenise
            Scheme->>LFI: Authorisation request
            LFI->>LFI: Validate cryptogram, fraud, balance
            LFI-->>Scheme: Approved
            Scheme-->>BPIP: Approved
            BPIP-->>PSU: Payment approved
            Note over LFI,Scheme: Clearing and settlement through the card scheme, as for any card payment
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
