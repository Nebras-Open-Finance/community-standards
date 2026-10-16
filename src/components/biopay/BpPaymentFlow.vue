<script setup lang="ts">
import { useMermaidDiagram } from '@/composables/useMermaidDiagram'

// One BioPay payment, end to end. The BPIP is the merchant's acquirer;
// ICP resolves the customer. Identity resolution is called by the BPIP directly
// on ICP through the ICP SDK — it does not route through the API Hub. ICP
// returns a signed ICP authorisation bound to the transaction (amount and
// merchant) and to the BPIP's transport certificate; its jti is single-use.
// On every payment the BPIP then looks up the customer's payment instrument at
// the LFI through the API Hub, presenting that authorisation. The Hub exchanges
// it for a payment token: a short-lived, single-use JWS signed by the Hub that
// embeds the ICP authorisation and states whether this is an account or a card
// payment. The payment token replaces the ICP authorisation at the point of
// payment: an account payment goes through the Hub to the LFI carrying it, and
// the Hub verifies it; a card payment goes to the card scheme carrying it, with
// the BPIP as acquirer, and the card scheme verifies it. The card credential in the lookup
// response is a JWS signed by the LFI inside a JWE encrypted to the BPIP's
// Directory encryption key, so the Hub never sees card data in the clear.
// Calls to the Hub run under client_credentials and mTLS; nothing reaches the
// LFI except by the Hub proxying it.
// Draft — endpoint names, claims and scopes are proposed.
const mermaidDefinition = `
sequenceDiagram
    participant PSU as Customer
    participant BPIP as BPIP (acquirer)
    participant ICP as ICP
    participant Hub as API Hub
    participant LFI as LFI (Ozone Connect)
    participant Scheme as Card Scheme (e.g. Jaywan)

    PSU->>BPIP: Presents thumbprint / face / palm
    BPIP->>BPIP: Capture + amount + merchant details<br/>txn = hash(amount, merchant)

    Note over ICP,BPIP: ICP SDK
    BPIP->>ICP: Resolve customer<br/>{biometric capture, txn, transport cert thumbprint}
    ICP->>ICP: Match, liveness, look up uaeKycId → default LFI
    ICP-->>BPIP: {uaeKycId, default LFI, IcpAuthorisation}<br/>JWS: sub, azp, aud, txn, cnf, jti, exp

    alt Not resolved or not registered
        BPIP-->>PSU: BioPay unavailable — fall back
    else Resolved
        Note over BPIP,Hub: client_credentials · mTLS · scope: biometric-payments
        BPIP->>Hub: POST /instrument-lookup<br/>{uaeKycId, InstructedAmount, CardAcceptor, IcpAuthorisation}
        Hub->>Hub: Entitlement, schema<br/>Verify IcpAuthorisation: signature, exp,<br/>cnf = mTLS cert, azp = BPIP, sub, txn<br/>ICP jti unused → mark used
        Hub->>LFI: Proxied instrument lookup (with IcpAuthorisation)
        LFI->>LFI: Verify IcpAuthorisation<br/>Look up uaeKycId → instrument<br/>Fraud, risk checks

        alt Account (AANI/IPP)
            LFI-->>Hub: 200 {PaymentInstrument, DebtorAccount}
            Hub->>Hub: Mint PaymentToken (JWS, single-use, ~120s)<br/>{PaymentType: Account, AANI, amount, merchant,<br/>DebtorAccount, cnf, azp, IcpAuthorisation}
            Hub-->>BPIP: 200 {PaymentInstrument, DebtorAccount, PaymentToken}
            BPIP->>Hub: POST /biometric-payments<br/>{uaeKycId, DebtorAccount, Instruction, Creditor, PaymentToken, Subscription}
            Hub->>Hub: Entitlement, schema, idempotency<br/>Verify PaymentToken: Hub signature, exp, Account,<br/>cnf = mTLS cert, azp, uaeKycId, IBAN, amount<br/>Derive BiometricAssurance
            Hub->>LFI: Proxied payment request
            LFI->>LFI: DebtorAccount is the registered account<br/>Account state checks
            alt Account blocked or closed
                LFI-->>Hub: 403 {Account.*}
                Hub-->>BPIP: 403 {Account.*} — no payment, token still usable
            else Account usable
                LFI-->>Hub: 201 {PaymentId}
                Hub->>Hub: Mark PaymentToken used
                Hub-->>BPIP: 201 {PaymentId, Status: Pending}
                BPIP-->>PSU: Accepted — payment pending

                LFI->>LFI: Fraud, sanctions, AML screening<br/>Balance check
                Note over LFI: Executes the account-to-account payment<br/>via AANI/IPP
                LFI->>Hub: PATCH /biometrics-payment-log/{id}<br/>{Status: AcceptedWithoutPosting or Rejected,<br/>StatusReason e.g. LFI.ScreeningRejected, AANI.AM04}
                Hub-->>LFI: 204 No Content
                Hub->>BPIP: Payment status event {PaymentId, Status}
                BPIP-->>Hub: 202 Accepted

                opt Polling, or recovery from a lost 201
                    BPIP->>Hub: GET /biometric-payments/{PaymentId}
                    BPIP->>Hub: GET /biometric-payments?IdempotencyKey
                    Hub-->>BPIP: 200 {Status}
                end
            end
        else Card (card scheme, e.g. Jaywan)
            LFI->>LFI: Generate one-time token + cryptogram<br/>bound to amount, merchant and ICP jti
            LFI->>LFI: Sign {CardSchemeToken, Cryptogram, Expiry, IcpTransactionId} as JWS<br/>Encrypt as JWE with the BPIP's public key from the Directory
            LFI-->>Hub: 200 {PaymentInstrument, EncryptedCardCredential (JWE)}
            Note over Hub: Proxies the JWE unread —<br/>no card data in the clear, out of PCI DSS scope
            Hub->>Hub: Mint PaymentToken (JWS, single-use, ~120s)<br/>{PaymentType: Card, JAYWAN, amount, merchant,<br/>cnf, azp, IcpAuthorisation}
            Hub-->>BPIP: 200 {PaymentInstrument, EncryptedCardCredential (JWE), PaymentToken}
            BPIP->>BPIP: Decrypt JWE with its private key<br/>Verify LFI's JWS · IcpTransactionId = ICP jti
            Note over BPIP,Scheme: From here the payment runs between the BPIP, as acquirer,<br/>and the card scheme — not through the API Hub
            BPIP->>Scheme: Authorisation request {card token, cryptogram, amount,<br/>merchant, PaymentToken}<br/>CVM: biometric, verified by ICP
            Scheme->>Scheme: Verify PaymentToken against the API Hub's keys:<br/>Card, scheme, amount, merchant, exp<br/>jti unused → mark used
            Scheme->>Scheme: Detokenise
            Scheme->>LFI: Authorisation request
            LFI->>LFI: Validate cryptogram<br/>Fraud, balance
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
