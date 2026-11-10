<script setup lang="ts">
import { useMermaidDiagram } from '@/composables/useMermaidDiagram'

// One BioPay payment, end to end. The BPIP is the merchant's acquirer;
// ICP resolves the customer. Identity resolution is called by the BPIP directly
// on ICP through the ICP SDK — it does not route through the API Hub. ICP
// returns an ICP token: an opaque, single-use identifier for the
// identification, issued to the BPIP for the uaeKycId.
// On every payment the BPIP then queries the customer's payment instrument at
// the LFI with POST /instrument-query (api-specs PR #37): a signed request,
// encrypted as a JWE to the LFI, carrying the UaeKycId, the ICP token, the
// amount and the merchant, terminal and acquirer identifiers. The Hub checks
// the token scope and forwards the request unchanged to the LFI's Ozone Connect
// POST /customers/action/instrument-query. The LFI, as issuer, decrypts it,
// verifies the signature and validates the ICP token by calling ICP's token
// validation endpoint — an online call, not through the ICP SDK. It answers
// with 400 Query.UnmatchedInstrument if no instrument matches, otherwise with
// a payment token — a single-use, 36-character UUID, valid for 30 seconds — the request values it
// was issued for, and the customer's instruments, each an IBAN or a PAN. The
// response is signed (azp = the BPIP) and encrypted as a JWE, so the Hub reads
// neither the request nor the response. The BPIP passes only the payment token
// back to the LFI at the point of payment: through the Hub for an IBAN, with
// only the creditor IBAN alongside it; through the card scheme for a PAN. The
// LFI looks it up and pays from what it stored, in both cases.
// Calls to the Hub run under client_credentials and mTLS; nothing reaches the
// LFI except by the Hub or the card scheme carrying it.
// Draft — POST /biometric-payments, the payment log and the status event are
// still the site's own proposal, with no spec in PR #37.
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
        BPIP->>BPIP: Sign request (JWS), encrypt as JWE<br/>to the Issuer's public encryption key
        BPIP->>Hub: POST /instrument-query (application/jwt)<br/>JWE {UaeKycId, IcpToken, InstructedAmount,<br/>MerchantId, TerminalId, AcquirerId, MerchantName}
        Hub->>Hub: Token scope: biometric-payments
        Hub->>LFI: POST /customers/action/instrument-query<br/>JWE forwarded unchanged<br/>o3-caller-org-id: BPIP · no o3-consent-id
        LFI->>LFI: Decrypt JWE, verify BPIP's signature
        LFI->>ICP: Token validation endpoint {IcpToken}
        ICP->>ICP: Issued to this BPIP for this UaeKycId,<br/>not expired, unused → mark used
        ICP-->>LFI: Valid
        LFI->>LFI: Look up UaeKycId → default instrument for ICP Pay<br/>Fraud, risk checks

        alt No instrument matched
            LFI-->>Hub: 400 {errorCode: Query.UnmatchedInstrument}
            Hub-->>BPIP: 400 {Errors: [{Code: Query.UnmatchedInstrument}]}
            BPIP-->>PSU: BioPay unavailable — fall back
        else Instrument matched
            LFI->>LFI: Issue PaymentToken (UUID, 36 chars, single-use, 30s)<br/>Store against it: BPIP, UaeKycId, IcpToken, InstructedAmount,<br/>MerchantId, TerminalId, AcquirerId, MerchantName, instrument<br/>Sign response (azp = o3-caller-org-id), encrypt as JWE
            LFI-->>Hub: 200 (application/jwt) JWE
            Note over Hub: Forwards the JWE unread — no instrument<br/>or card data in the clear, out of PCI DSS scope
            Hub-->>BPIP: 200 (application/jwt) JWE<br/>{PaymentToken, request values,<br/>Instruments: [IBAN | PAN]}
            BPIP->>BPIP: Decrypt JWE with its private key<br/>Verify Issuer's signature · echoed values match the request<br/>Route on the instrument's SchemeName

            alt SchemeName: IBAN
                BPIP->>Hub: POST /biometric-payments<br/>{PaymentToken, CreditorAccount (IBAN), Subscription}
                Hub->>Hub: Entitlement, schema, idempotency
                Hub->>LFI: Proxied payment request
                LFI->>LFI: Look up PaymentToken: issued, exp, IBAN,<br/>BPIP, unused<br/>IBAN still registered for ICP Pay, account state checks
                alt Payment token rejected, or account blocked or closed
                    LFI-->>Hub: 403 {PaymentToken.* or Account.*}
                    Hub-->>BPIP: 403 — no payment created
                else Payment token valid, account usable
                    LFI->>LFI: Mark PaymentToken used
                    LFI-->>Hub: 201 {PaymentId}
                    Hub-->>BPIP: 201 {PaymentId, Status: Pending}
                    BPIP-->>PSU: Accepted — payment pending

                    LFI->>LFI: Fraud, sanctions, AML screening<br/>Balance check
                    Note over LFI: Debits the stored IBAN for InstructedAmount,<br/>credits CreditorAccount via AANI/IPP
                    LFI->>Hub: PATCH /biometrics-payment-log/{id}<br/>{paymentResponse.paymentRail: AANI | LFI, status,<br/>paymentTransactionId, rejectReasonCode e.g. AANI.AM04}
                    Hub-->>LFI: 204 No Content
                    Hub->>BPIP: Payment status event {PaymentId, Status}
                    BPIP-->>Hub: 202 Accepted

                    opt Polling
                        BPIP->>Hub: GET /biometric-payments/{PaymentId}
                        Hub-->>BPIP: 200 {Status, PaymentTransactionId, RejectReasonCode}
                    end
                end
            else SchemeName: PAN
                Note over BPIP,Scheme: From here the payment runs between the BPIP, as acquirer,<br/>and the card scheme — not through the API Hub
                BPIP->>Scheme: Authorisation request {PAN, ExpiryDate, amount,<br/>MerchantId, TerminalId, AcquirerId, PaymentToken}<br/>CVM: biometric, verified by ICP
                Scheme->>LFI: Authorisation request {…, PaymentToken}
                LFI->>LFI: Look up PaymentToken: issued, exp, PAN,<br/>card, amount, MerchantId, TerminalId, AcquirerId match,<br/>unused → mark used<br/>Fraud, balance
                LFI-->>Scheme: Approved
                Scheme-->>BPIP: Approved
                BPIP-->>PSU: Payment approved
                Note over LFI,Scheme: Clearing and settlement through the card scheme, as for any card payment
            end
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
