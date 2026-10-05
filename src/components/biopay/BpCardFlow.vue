<script setup lang="ts">
import { useMermaidDiagram } from '@/composables/useMermaidDiagram'

// BioPay payment where the customer's registered instrument may be a card
// (card scheme, e.g. Jaywan) rather than an account (AANI/IPP). Only the LFI holds uaeKycId →
// instrument, so each option answers "how does the BPIP learn which rail to use":
// In every option the BPIP first resolves the customer directly with ICP through
// the ICP SDK — not through the API Hub — and receives the uaeKycId, the
// customer's default LFI and a token.
//   lookup  (Option 1) — the BPIP asks the LFI through the Hub, which returns the
//           IBAN for an account or a one-time card credential for a card; the
//           BPIP then branches. A card payment does not return to the Hub.
//   lfi     (Option 2) — one payment request carrying both creditor routes; the
//           LFI picks the rail and returns a PaymentId either way. For a card,
//           the LFI submits the authorisation to the card scheme itself, then
//           patches the outcome to the Hub, which sends the event to the BPIP.
// In both options the card authorisation itself runs on the card rails, not
// through the API Hub: submitted by the BPIP, as acquirer, in Option 1, and by
// the LFI on the BPIP's behalf in Option 2.
// Draft — operations, scopes and fields are proposals.
const props = withDefaults(defineProps<{ variant?: 'lookup' | 'lfi' }>(), {
  variant: 'lfi',
})

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

// Option 1's card authorisation leg, once the BPIP holds a one-time credential.
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

const lfi = `${participants}
${resolve('{uaeKycId, default LFI, token}', 'uaeKycId → default LFI')}

    Note over BPIP,Hub: client_credentials · mTLS · scope: biometric-payments
    BPIP->>Hub: POST /biometric-payments<br/>{uaeKycId, Instruction, Creditor account, card acceptance details}
    Hub->>Hub: Entitlement, schema, idempotency
    Hub->>LFI: Proxied payment request
    LFI->>LFI: Look up uaeKycId → instrument<br/>Fraud, risk checks

    alt Account (AANI/IPP)
        LFI->>LFI: Execute on AANI/IPP
        LFI-->>Hub: 201 {PaymentId}
        Hub-->>BPIP: 201 {PaymentId, Status: Pending}
        BPIP-->>PSU: Accepted — payment pending
        Note over BPIP,LFI: Status patch and event, as in the account payment flow
    else Card (card scheme, e.g. Jaywan)
        LFI-->>Hub: 201 {PaymentId}
        Hub-->>BPIP: 201 {PaymentId, Status: Pending}
        BPIP-->>PSU: Accepted — payment pending
        LFI->>LFI: Generate one-time token + cryptogram,<br/>bound to PaymentId and amount
        LFI->>Scheme: Authorisation request {token, cryptogram, amount,<br/>card acceptance details}<br/>CVM: biometric, verified by ICP
        Scheme->>Scheme: Detokenise, apply scheme rules
        Scheme-->>LFI: Approved
        LFI->>Hub: PATCH /biometrics-payment-log/{id}<br/>{Status, authorisation reference}
        Hub-->>LFI: 204 No Content
        Hub->>BPIP: Payment status event {PaymentId, Status}
        BPIP-->>Hub: 202 Accepted
        BPIP-->>PSU: Payment approved
        Note over LFI,Scheme: Clearing and settlement through the card scheme, as for any card payment<br/>The BPIP, as acquirer, settles with the merchant
    end
`

const definitions = { lookup, lfi }

const { containerRef: mermaidContainer } = useMermaidDiagram(
  definitions[props.variant],
  `biopay-card-flow-${props.variant}`,
)
</script>

<template>
  <div class="diagram-wrapper">
    <div ref="mermaidContainer" class="mermaid-container"></div>
  </div>
</template>
