<script setup lang="ts">
import { useMermaidDiagram } from '@/composables/useMermaidDiagram'

// BioPay instrument lookup, where the customer's registered instrument may be a
// card (card scheme, e.g. Jaywan) rather than an account (AANI/IPP). Only the LFI
// holds uaeKycId → instrument, so the BPIP asks it before choosing a rail.
// The BPIP first resolves the customer directly with ICP through the ICP SDK —
// not through the API Hub — and receives the uaeKycId, the customer's default
// LFI and a token. It then asks the LFI through the Hub, which returns the IBAN
// for an account or a one-time card credential for a card, and branches. A card
// payment runs on the card rails, submitted by the BPIP as acquirer, and does
// not return to the Hub.
// Draft — operations, scopes and fields are proposals.

const participants = `
sequenceDiagram
    participant PSU as Customer
    participant BPIP as BPIP (acquirer)
    participant ICP as ICP
    participant Hub as API Hub
    participant LFI as LFI (issuer / Ozone Connect)
    participant Scheme as Card Scheme (e.g. Jaywan)

    PSU->>BPIP: Presents thumbprint / face / palm
    BPIP->>BPIP: Capture + amount + merchant details`

const resolve = (returned: string, lookup: string) => `
    Note over ICP,BPIP: ICP SDK
    BPIP->>ICP: Resolve customer (biometric capture)
    ICP->>ICP: Match, liveness, look up ${lookup}
    ICP-->>BPIP: ${returned}`

// The card authorisation leg, once the BPIP holds a one-time credential.
const cardAuthorisation = `
        BPIP->>Scheme: Authorisation request {token, cryptogram, amount}<br/>CVM: biometric, verified by ICP
        Scheme->>Scheme: Detokenise
        Scheme->>LFI: Authorisation request
        LFI->>LFI: Validate cryptogram, fraud, balance
        LFI-->>Scheme: Approved
        Scheme-->>BPIP: Approved
        BPIP-->>PSU: Payment approved
        Note over LFI,Scheme: Clearing and settlement through the card scheme, as for any card payment<br/>The BPIP, as acquirer, settles with the merchant`

const accountPayment = `
        Note over BPIP,Hub: client_credentials · mTLS · scope: biometric-payments
        BPIP->>Hub: POST /biometric-payments<br/>{uaeKycId, Instruction, Creditor account}
        Hub->>LFI: Proxied payment request
        LFI->>LFI: Fraud, risk, balance checks<br/>Execute on AANI/IPP
        LFI-->>Hub: 201 {PaymentId}
        Hub-->>BPIP: 201 {PaymentId, Status: Pending}
        BPIP-->>PSU: Accepted — payment pending
        Note over BPIP,LFI: Status patch and event, as in the account payment flow`

const lookup = `${participants}
${resolve('{uaeKycId, default LFI, token}', 'uaeKycId → default LFI')}

    Note over BPIP,Hub: client_credentials · mTLS · scope: biometric-payments
    BPIP->>Hub: POST /instrument-lookup<br/>{uaeKycId, amount, card acceptance details}
    Hub->>LFI: Proxied instrument lookup
    LFI->>LFI: Look up uaeKycId → instrument<br/>Fraud, risk checks

    alt Account (AANI/IPP)
        LFI-->>Hub: 200 {PaymentInstrument, IBAN}
        Hub-->>BPIP: 200 {PaymentInstrument, IBAN}
${accountPayment}
    else Card (card scheme, e.g. Jaywan)
        LFI->>LFI: Generate one-time token + cryptogram
        LFI-->>Hub: 200 {PaymentInstrument, CardSchemeToken, Cryptogram, Expiry}
        Hub-->>BPIP: 200 {PaymentInstrument, CardSchemeToken, Cryptogram, Expiry}
        Note over BPIP,Scheme: From here the payment runs between the BPIP, as acquirer,<br/>and the card scheme — not through the API Hub
${cardAuthorisation}
    end
`

const { containerRef: mermaidContainer } = useMermaidDiagram(lookup, 'biopay-card-flow-lookup')
</script>

<template>
  <div class="diagram-wrapper">
    <div ref="mermaidContainer" class="mermaid-container"></div>
  </div>
</template>
