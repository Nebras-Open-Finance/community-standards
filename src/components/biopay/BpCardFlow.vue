<script setup lang="ts">
import { useMermaidDiagram } from '@/composables/useMermaidDiagram'

// BioPay payment where the customer's registered instrument may be a card
// (Jaywan) rather than an account (AANI/IPP). Only the LFI holds uaeKycId →
// instrument, so each option answers "how does the BPIP learn which rail to use":
//   lookup  (Option 1) — the BPIP asks the LFI through the Hub, then branches.
//   icp     (Option 2) — ICP also holds the instrument type and returns it on
//           resolution, so the BPIP branches straight away.
//   lfi     (Option 3) — one payment request carrying both creditor routes; the
//           LFI picks the rail and returns either a PaymentId or a card credential.
// In every option the card authorisation itself runs on the card rails
// (BPIP as acquirer → Jaywan → issuer), not through the API Hub. The BPIP is
// the merchant's acquirer, so it submits the authorisation to Jaywan itself.
// Draft — operations, scopes and fields are proposals.
const props = withDefaults(defineProps<{ variant?: 'lookup' | 'icp' | 'lfi' }>(), {
  variant: 'lfi',
})

const participants = `
sequenceDiagram
    participant PSU as Customer
    participant BPIP as BPIP (acquirer)
    participant Hub as API Hub
    participant ICP as ICP
    participant LFI as LFI (issuer / Ozone Connect)
    participant Jaywan as Jaywan

    PSU->>BPIP: Presents thumbprint / face / palm
    BPIP->>BPIP: Capture + amount + merchant details`

const resolve = (returned: string, lookup: string) => `
    Note over BPIP,Hub: client_credentials · mTLS · scope: biometric-resolution
    BPIP->>Hub: Resolve customer (biometric capture)
    Hub->>ICP: Resolve customer
    ICP->>ICP: Match, liveness, look up ${lookup}
    ICP-->>Hub: ${returned}
    Hub-->>BPIP: ${returned}`

// The card authorisation leg, once the BPIP holds a one-time credential.
const cardAuthorisation = (lfiCheck: string) => `
        BPIP->>Jaywan: Authorisation request {token, cryptogram, amount}<br/>CVM: biometric, verified by ICP
        Jaywan->>Jaywan: Detokenise
        Jaywan->>LFI: Authorisation request
        LFI->>LFI: ${lfiCheck}
        LFI-->>Jaywan: Approved
        Jaywan-->>BPIP: Approved
        BPIP-->>PSU: Payment approved
        LFI->>Hub: PATCH /biometrics-payment-log/{id}<br/>{Status, authorisation reference}
        Hub-->>LFI: 204 No Content
        Note over LFI,Jaywan: Clearing and settlement through Jaywan, as for any card payment<br/>The BPIP, as acquirer, settles with the merchant`

const accountPayment = `
        Note over BPIP,Hub: client_credentials · mTLS · scope: biometric-payments
        BPIP->>Hub: POST /biometric-payments<br/>{uaeKycId, Instruction, Creditor account}
        Hub->>LFI: Proxied payment request
        LFI->>LFI: Fraud, risk, balance checks<br/>Execute on AANI/IPP
        LFI-->>Hub: 201 {PaymentId}
        Hub-->>BPIP: 201 {PaymentId, Status: Pending}
        BPIP-->>PSU: Accepted — payment pending
        Note over BPIP,LFI: Status patch and event, as in the account payment flow`

const cardCredential = `
        Note over BPIP,Hub: client_credentials · mTLS · scope: biometric-payments
        BPIP->>Hub: Request card credential {uaeKycId, amount, merchant}
        Hub->>LFI: Proxied credential request
        LFI->>LFI: Fraud, risk checks<br/>Generate one-time token + cryptogram
        LFI-->>Hub: 201 {CredentialId, token, cryptogram, expiry}
        Hub-->>BPIP: 201 {CredentialId, token, cryptogram, expiry}`

const branch = `
    alt Account (AANI/IPP)
${accountPayment}
    else Card (Jaywan)
${cardCredential}
${cardAuthorisation('Validate cryptogram, fraud, balance')}
    end`

const lookup = `${participants}
${resolve('{uaeKycId, LFI}', 'uaeKycId → LFI')}

    Note over BPIP,Hub: client_credentials · mTLS · scope: biometric-payments
    BPIP->>Hub: Instrument lookup {uaeKycId}
    Hub->>LFI: Proxied instrument lookup
    LFI->>LFI: Look up uaeKycId → instrument
    LFI-->>Hub: {InstrumentType}
    Hub-->>BPIP: {InstrumentType}
${branch}
`

const icp = `${participants}
    Note over ICP,LFI: At registration, the LFI also gave ICP the instrument type<br/>(account or card — never the account or card number)
${resolve('{uaeKycId, LFI, InstrumentType}', 'uaeKycId → LFI + instrument type')}
${branch}
`

const lfi = `${participants}
${resolve('{uaeKycId, LFI}', 'uaeKycId → LFI')}

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
    else Card (Jaywan)
        LFI->>LFI: Generate one-time token + cryptogram,<br/>bound to PaymentId and amount
        LFI-->>Hub: 201 {PaymentId, Credential: token, cryptogram, expiry}
        Hub-->>BPIP: 201 {PaymentId, Credential: token, cryptogram, expiry}
${cardAuthorisation('Match cryptogram to PaymentId, check balance')}
    end
`

const definitions = { lookup, icp, lfi }

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
