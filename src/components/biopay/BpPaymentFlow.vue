<script setup lang="ts">
import { useMermaidDiagram } from '@/composables/useMermaidDiagram'

// One BioPay payment, end to end. The BPIP is the merchant's acquirer;
// ICP resolves the customer. Identity resolution is called by the BPIP directly
// on ICP through the ICP SDK — it does not route through the API Hub. ICP
// returns an ICP token: an opaque, single-use identifier for the
// identification, issued to the BPIP for the uaeKycId.
// On every payment the BPIP then looks up the customer's payment instrument at
// the LFI through the API Hub, sending the uaeKycId, the ICP token, the
// amount and the merchant, terminal and acquirer identifiers. The Hub proxies
// the lookup; the LFI, as issuer, validates the ICP token by calling ICP's
// token validation endpoint — an online call, not through the ICP SDK. The LFI
// always answers with a payment token: a short-lived, single-use, opaque
// reference against which it stores the amount, the merchant, terminal and
// acquirer identifiers, the ICP token and — by instrument type — the IBAN
// (ACCOUNT) or the card details (CARD). It returns the same as the instrument
// details: a JWS it signs, encrypted as a JWE to the BPIP's Directory
// encryption key — so the Hub never sees card data in the clear. The Hub
// records the payment token against the ICP token. The BPIP decrypts the
// instrument details and passes only the payment token back to the LFI at the
// point of payment: through the Hub for an account, with only the creditor
// IBAN alongside it; through the card scheme for a card. The LFI looks it up
// and pays from what it stored, in both cases.
// Calls to the Hub run under client_credentials and mTLS; nothing reaches the
// LFI except by the Hub or the card scheme carrying it.
// Draft — endpoint names, claims and scopes are proposed.
const mermaidDefinition = `
sequenceDiagram
    participant PSU as Customer
    participant BPIP as Acquirer (BPIP)
    participant ICP as ICP
    participant Hub as Nebras (API Hub)
    participant LFI as Issuer (Ozone Connect)
    participant Scheme as Card Scheme (e.g. Jaywan)

    PSU->>BPIP: Presents thumbprint / face / palm
    BPIP->>BPIP: Capture biometric + amount

    Note over ICP,BPIP: ICP SDK
    BPIP->>ICP: Resolve customer<br/>{biometric capture}
    ICP->>ICP: Match, liveness, look up uaeKycId → default LFI
    ICP-->>BPIP: {uaeKycId, default LFI, IcpToken}<br/>IcpToken: opaque, single-use, short-lived

    alt Not resolved or not registered
        BPIP-->>PSU: BioPay unavailable — fall back
    else Resolved
        Note over BPIP,Hub: client_credentials · mTLS · scope: biometric-payments
        BPIP->>Hub: POST /instrument-lookup<br/>{uaeKycId, IcpToken, TransactionAmount,<br/>MerchantId, TerminalId, AcquirerId, MerchantName}
        Hub->>Hub: Entitlement, schema
        Hub->>LFI: Proxied instrument lookup
        LFI->>ICP: Token validation endpoint {IcpToken}
        ICP->>ICP: Issued to this BPIP for this uaeKycId,<br/>not expired, unused → mark used
        ICP-->>LFI: Valid
        LFI->>LFI: Look up uaeKycId → instrument<br/>Fraud, risk checks

        LFI->>LFI: Issue PaymentToken (opaque, single-use, ~120s)<br/>Store against it: BPIP, uaeKycId, IcpToken, InstructedAmount,<br/>MerchantId, TerminalId, AcquirerId, MerchantName,<br/>InstrumentType: ACCOUNT + DebtorAccount | CARD + CardDetails<br/>Sign the same as InstrumentDetails (JWS), encrypt as JWE to the BPIP
        LFI-->>Hub: 200 {PaymentToken, InstrumentDetails: JWE}
        Note over Hub: Records PaymentToken with IcpToken and auth date<br/>Proxies the JWE unread — no card data in the clear,<br/>out of PCI DSS scope
        Hub-->>BPIP: 200 {PaymentToken, InstrumentDetails: JWE}
        BPIP->>BPIP: Decrypt JWE with its private key<br/>Verify Issuer's JWS · PaymentToken and IcpToken match

        alt InstrumentType: ACCOUNT
            BPIP->>Hub: POST /biometric-payments<br/>{PaymentToken, CreditorAccount (IBAN), Subscription}
            Hub->>Hub: Entitlement, schema, idempotency
            Hub->>LFI: Proxied payment request
            LFI->>LFI: Look up PaymentToken: issued, exp, ACCOUNT,<br/>BPIP, unused<br/>DebtorAccount still registered, account state checks
            alt Payment token rejected, or account blocked or closed
                LFI-->>Hub: 403 {PaymentToken.* or Account.*}
                Hub-->>BPIP: 403 — no payment created
            else Payment token valid, account usable
                LFI->>LFI: Mark PaymentToken used
                LFI-->>Hub: 201 {PaymentId}
                Hub->>Hub: Attach the biometric assurance<br/>recorded for the PaymentToken on the lookup
                Hub-->>BPIP: 201 {PaymentId, Status: Pending}
                BPIP-->>PSU: Accepted — payment pending

                LFI->>LFI: Fraud, sanctions, AML screening<br/>Balance check
                Note over LFI: Debits the stored DebtorAccount for InstructedAmount,<br/>credits CreditorAccount via AANI/IPP
                LFI->>Hub: PATCH /biometrics-payment-log/{id}<br/>{paymentResponse.paymentRail: AANI | LFI, status,<br/>paymentTransactionId, rejectReasonCode e.g. AANI.AM04}
                Hub-->>LFI: 204 No Content
                Hub->>BPIP: Payment status event {PaymentId, Status}
                BPIP-->>Hub: 202 Accepted

                opt Polling
                    BPIP->>Hub: GET /biometric-payments/{PaymentId}
                    Hub-->>BPIP: 200 {Status, PaymentTransactionId, RejectReasonCode}
                end
            end
        else InstrumentType: CARD
            Note over BPIP,Scheme: From here the payment runs between the BPIP, as acquirer,<br/>and the card scheme — not through the API Hub
            BPIP->>Scheme: Authorisation request {CardNumber, ExpiryDate, amount,<br/>MerchantId, TerminalId, AcquirerId, PaymentToken}<br/>CVM: biometric, verified by ICP
            Scheme->>LFI: Authorisation request {…, PaymentToken}
            LFI->>LFI: Look up PaymentToken: issued, exp, CARD,<br/>card, amount, MerchantId, TerminalId, AcquirerId match,<br/>unused → mark used<br/>Fraud, balance
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
