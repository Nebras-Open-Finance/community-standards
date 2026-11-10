<route lang="yaml">
meta:
  layout: biopay
  title: Payment — API Sequence Flow
  next: false
  prev: false
  aside: false
</route>

<script setup lang="ts">
import { useHead } from '@unhead/vue'
import BpPaymentFlow from '@/components/biopay/BpPaymentFlow.vue'
import BpActorTable, { type BpActor } from '@/components/biopay/BpActorTable.vue'

useHead({ title: 'Payment — API Sequence Flow · BioPay' })

interface Section { id: string; label: string }
interface MetaItem { label: string; value: string }

const sections: Section[] = [
  { id: 'diagram', label: 'Architecture diagram' },
  { id: 'query', label: 'Instrument query' },
  { id: 'binding', label: 'Binding to ICP' },
  { id: 'who', label: 'Who does what' },
]

const meta: MetaItem[] = [
  { label: 'Status', value: 'Draft' },
  { label: 'Actors', value: '5' },
  { label: 'Version', value: '0.1' },
]

// Responsibilities are kept as data so each actor's list can be argued with on
// its own terms. Multiple rows per actor; the Actor cell spans them.
const actors: BpActor[] = [
  {
    key: 'bpip',
    name: 'Acquirer (BPIP)',
    sub: 'Biometric Payment Initiation Provider',
    color: 'var(--at-teal)',
    responsibilities: [
      'Operate the acceptance point, and capture the biometric together with the amount and creditor details.',
      'Resolve the customer directly with ICP through the ICP SDK, and receive a uaeKycId, the customer’s default LFI and the ICP token. This call does not route through the API Hub.',
      'Query the customer’s payment instrument through the API Hub on every payment with POST /instrument-query, sending the UaeKycId, the ICP token, the amount and the merchant, terminal and acquirer identifiers. Sign the request with its signing key, then encrypt the signed request as a JWE to the LFI’s public encryption key from the Directory. Sending it signed but unencrypted is prohibited.',
      'Register an encryption certificate in the Directory. Decrypt every instrument query response with its private key, verify the LFI’s signature inside it, and route the payment on the instrument’s SchemeName.',
      'For an IBAN, send the payment token through the API Hub to the default LFI ICP returned, with the IBAN to credit. Nothing the LFI stored against the payment token is repeated in the request. The BPIP is accountable for the creditor account, as an acquirer is for settling with its merchant.',
      'For a PAN, submit the authorisation to the card scheme as acquirer, with the card number and expiry date from the instrument query response, the same amount and merchant, terminal and acquirer identifiers sent on the query, and the payment token. No further call goes through the API Hub.',
      'Generate and retain an idempotency key for every account payment, and recover from a lost response by retrying with it rather than initiating again.',
      'Implement a webhook endpoint, give its URL on each payment request, and acknowledge payment status events.',
      'Report the outcome back to the customer.',
    ],
  },
  {
    key: 'icp',
    name: 'ICP',
    sub: 'The government identity service',
    color: 'var(--at-gold)',
    responsibilities: [
      'Match the biometric and run liveness detection against the verified identity it holds.',
      'Return the uaeKycId and the customer’s default LFI, from the binding it has held since registration.',
      'Issue the ICP token: a short-lived, single-use, opaque identifier for the identification, issued to the BPIP for the uaeKycId.',
      'Return no template and no match score — only the resolved identifier, default LFI and ICP token.',
      'Expose a token validation endpoint to LFIs. On each call, confirm ICP issued the ICP token to the calling BPIP for the uaeKycId, that it has not expired and that it has not been used, and mark it used.',
    ],
  },
  {
    key: 'hub',
    name: 'Nebras (API Hub)',
    sub: 'The control plane',
    color: 'var(--at-blue-deep)',
    responsibilities: [
      'Enforce mutual TLS and application-layer authentication on every request, so each call is bound to a participant the Trust Framework has identified by certificate.',
      'Issue access tokens under client_credentials. There is no authorisation journey in this flow. Grant the biometric-payments scope only to a client whose organisation holds the BPIP role.',
      'Enforce role and scope entitlement before any request is proxied.',
      'Validate every request it can read against its schema. The instrument query body is encrypted to the LFI, so the Hub forwards it without reading it.',
      'Act as the gateway between the BPIP and the LFI. The BPIP never communicates with the LFI directly — the Hub forwards the instrument query to the Ozone Connect POST /customers/action/instrument-query of the default LFI ICP returned, and proxies the payment, identifying the BPIP to the LFI in o3-caller-org-id. Identity resolution with ICP does not pass through the Hub.',
      'Forward the payment token to the LFI without checking it. The LFI validates the ICP token with ICP, and looks up the payment token it issued.',
      'Enforce idempotency, and serve retrieval by payment identifier.',
      'Record every transaction that passes through, for reconciliation, dispute handling and supervision.',
      'Normalise status, map LFI errors to the standard, and deliver payment status events to the BPIP.',
      'Forward the instrument query request and response unread. The Hub never sees the instrument or card data in the clear, keeping it out of PCI DSS scope.',
      'Store no biometric, no template, no account number and no card credential.',
    ],
  },
  {
    key: 'lfi',
    name: 'Issuer (Ozone Connect)',
    sub: 'Licensed Financial Institution — the execution layer',
    color: 'var(--at-navy)',
    responsibilities: [
      'Implement POST /customers/action/instrument-query and the biometric payment endpoint on Ozone Connect.',
      'Decrypt every instrument query with its private encryption key, and verify the BPIP’s signature on the request inside it.',
      'Validate the ICP token on every instrument query by calling ICP’s token validation endpoint, which confirms it was issued to the calling BPIP for this UaeKycId.',
      'Resolve the UaeKycId to the instrument the customer designated with the LFI as their default for ICP Pay. Return 400 with Query.UnmatchedInstrument if no instrument can be matched from the request.',
      'Answer every matched query with a payment token: a single-use, 36-character UUID, valid for 30 seconds, against which it stores the BPIP, the UaeKycId, the ICP token, the amount, the merchant, terminal and acquirer identifiers and the instrument. Return it with the request values and the customer’s instruments — each an IBAN or a PAN — as a response it signs, with azp set to the o3-caller-org-id of the request, and encrypts as a JWE.',
      'Look up the payment token it issued when it comes back — on the AANI payment through the API Hub, or in the card authorisation through the card scheme — check it against what it stored, and mark it used when it accepts the payment.',
      'Execute the account-to-account payment via AANI/IPP — debiting the IBAN stored against the payment token for its amount, and crediting the IBAN the BPIP sent — or book it on its own ledger where it also holds the creditor account. Patch the payment rail (AANI or LFI) and status to the API Hub, as on the v2.2 payment log, until it reaches a terminal state.',
      'As issuer, when the card authorisation arrives from the card scheme, approve or decline.',
    ],
  },
  {
    key: 'scheme',
    name: 'Card Scheme',
    sub: 'e.g. Jaywan — card payments only',
    color: 'var(--at-mute)',
    responsibilities: [
      'Provision card scheme tokens for BioPay, and code transactions for biometric cardholder verification.',
      'Carry the payment token in the BPIP’s authorisation through to the issuing LFI.',
      'Route the BPIP’s authorisation to the issuing LFI, and return the response.',
      'Clear and settle the card payment, as for any card payment.',
    ],
  },
]
</script>

<template>
  <div class="ed-page">
    <EdBackStrip href="/biopay/" text="BioPay overview" />

    <EdHero
      eyebrow="BioPay · Payment · Draft"
      eyebrow-color="var(--at-navy)"
      title="Payment API Sequence Flow"
      :meta="meta"
      lede="How a BioPay payment is put together &mdash; resolution with ICP, the instrument query that decides the route, and the account-to-account payment via AANI/IPP &mdash; and which party is accountable for each part of it. <strong>Everything here is draft</strong> &mdash; the flow and the split of responsibilities are proposals for review."
    />

    <EdInPageNav :sections="sections" />

    <!-- 01 ─────────────────────────────────────────────────────────────── -->
    <EdSectionBand
      id="diagram"
      num="01"
      color="var(--at-teal)"
      eyebrow="Architecture diagram"
      title="The payment flow end to end"
      lede="Click the diagram to expand it."
    >
      <EdProse>
        <p>
          The BPIP captures the biometric at the acceptance point and sends a resolution request
          directly to ICP through the ICP SDK &mdash; this call does not route through the API Hub.
          ICP matches the customer and returns their <code>uaeKycId</code>, their default LFI and an
          <strong>ICP token</strong> for this identification &mdash; see
          <a href="#binding">Binding to ICP</a>.
        </p>
        <p>
          The BPIP then asks that LFI, through the API Hub, which payment instrument the customer
          pays with, using
          <RouterLink to="/biopay/payment/api-reference/standards/instrument-query"><code>POST /instrument-query</code></RouterLink>.
          The BPIP signs the request, then encrypts the signed request as a JWE to the LFI&rsquo;s
          public encryption key, so only the LFI can read it. The API Hub forwards it unchanged to
          the LFI&rsquo;s Ozone Connect
          <RouterLink to="/biopay/payment/api-reference/ozone-connect/instrument-query"><code>POST /customers/action/instrument-query</code></RouterLink>.
          The LFI, as issuer, decrypts it, verifies the BPIP&rsquo;s signature, validates the ICP
          token with ICP&rsquo;s token validation endpoint, and answers with a signed, encrypted
          response carrying a <strong>payment token</strong> &mdash; a single-use, opaque reference
          to what it stored &mdash; and the customer&rsquo;s instruments. The BPIP routes the payment
          on the instrument&rsquo;s <code>SchemeName</code>:
        </p>
        <ul>
          <li>
            <strong>IBAN (via AANI/IPP).</strong> The BPIP sends the payment request,
            carrying the payment token and the IBAN to credit, through the API Hub, under
            <code>client_credentials</code> over mTLS. The Hub proxies the request to the LFI, which looks up the payment token it issued.
            The LFI executes on the rail and patches status back, which the Hub delivers to the BPIP.
          </li>
          <li>
            <strong>PAN (via the card scheme, e.g. Jaywan).</strong> The BPIP, as acquirer, submits the authorisation to the
            card scheme with the card number and expiry date from the response and the payment
            token, which the card scheme carries to the LFI to look up. The payment does not return
            to the API Hub.
          </li>
        </ul>
      </EdProse>
      <EdNote type="info" title="The Acquirer never communicates with the Issuer directly">
        <p>
          Every call from the Acquirer reaches the Issuer through an intermediary. Account payments,
          and the instrument query, go through the API Hub, operated by Nebras. Card payments go
          through the card scheme (e.g. Jaywan), as they do today. The Acquirer has no connection to
          the Issuer&rsquo;s systems.
        </p>
      </EdNote>
      <APIFlowViewer
        title="BioPay — payment"
        eyebrow="Payment flow"
      >
        <BpPaymentFlow />
      </APIFlowViewer>
    </EdSectionBand>

    <!-- 02 ─────────────────────────────────────────────────────────────── -->
    <EdSectionBand
      id="query"
      num="02"
      color="var(--at-gold)"
      eyebrow="Instrument query"
      title="Every payment starts with an instrument query"
      tone="surface"
      lede="Only the LFI knows whether a customer pays by account or by card, and the BPIP cannot route the payment until it knows."
    >
      <EdProse>
        <p>
          The BPIP MUST call
          <RouterLink to="/biopay/payment/api-reference/standards/instrument-query"><code>POST /instrument-query</code></RouterLink>
          on every payment, after resolution with ICP and before it builds the payment, with an
          access token obtained under <code>client_credentials</code> with the
          <code>biometric-payments</code> scope. The request carries the <code>UaeKycId</code> and
          ICP token, the <code>InstructedAmount</code>, and the <code>MerchantId</code>,
          <code>TerminalId</code>, <code>AcquirerId</code> and <code>MerchantName</code> of the
          acceptance point. It is not made under a consent.
        </p>
        <p>
          The API Hub forwards the request, unchanged, to the LFI&rsquo;s Ozone Connect
          <RouterLink to="/biopay/payment/api-reference/ozone-connect/instrument-query"><code>POST /customers/action/instrument-query</code></RouterLink>,
          identifying the BPIP in <code>o3-caller-org-id</code>. No <code>o3-consent-id</code> is
          sent. The LFI decrypts the request, verifies the BPIP&rsquo;s signature, validates the ICP
          token with ICP&rsquo;s token validation endpoint, and looks up the instrument the customer
          designated with it as their default for ICP Pay. If it cannot match an instrument from the
          values in the request, it returns <code>400</code> with
          <code>Query.UnmatchedInstrument</code>.
        </p>
        <p>
          Otherwise the response always carries a <strong>payment token</strong>: a single-use,
          36-character UUID, valid for 30 seconds &mdash; see
          <RouterLink to="/biopay/payment/api-guide/payment-token">Payment Token</RouterLink>. The
          LFI stores against it what it issued it for
          &mdash; the BPIP, the <code>UaeKycId</code>, the ICP token, the amount, and the
          <code>MerchantId</code>, <code>TerminalId</code>, <code>AcquirerId</code> and
          <code>MerchantName</code> from the request. The response repeats those request values, and
          lists in <code>Data.Instruments</code> the customer&rsquo;s instruments, each selected by
          <code>SchemeName</code>:
        </p>
        <ul>
          <li>
            <strong><code>SchemeName: IBAN</code></strong> &mdash; <code>Identification</code> is
            the IBAN of the customer&rsquo;s account registered for ICP Pay. The BPIP does not send
            it back: it sends the payment token in
            <code>POST /biometric-payments</code>
            with only the IBAN to credit alongside, and the LFI debits the account it stored
            against the payment token. The registered account can change between the query and the
            payment, so the payment can still fail (<code>Account.DebtorAccountMismatch</code>).
          </li>
          <li>
            <strong><code>SchemeName: PAN</code></strong> &mdash; <code>Identification</code>, the
            card number, and <code>ExpiryDate</code>.
          </li>
        </ul>
      </EdProse>
      <EdNote type="info" title="Signed by the sender, encrypted to the recipient">
        <p>
          The BPIP MUST sign the request with its signing key, then encrypt the signed request into
          a JWE using the LFI&rsquo;s public encryption key, taken from the
          <RouterLink to="/biopay/directory">Directory</RouterLink>. Sending the request signed but
          unencrypted is prohibited. The LFI decrypts it with its private key, and the BPIP&rsquo;s
          signature inside proves where it came from.
        </p>
        <p>
          The LFI MUST answer the same way: it signs the response, with <code>azp</code> set to the
          BPIP&rsquo;s Directory organisation identifier from <code>o3-caller-org-id</code>, and
          returns it encrypted as a JWE. Returning the response unencrypted is prohibited. The BPIP
          decrypts it with its private key, so every BPIP MUST register an encryption certificate.
        </p>
        <p>
          The API Hub forwards both the request and the response unread, so neither the
          <code>UaeKycId</code> nor card data passes through it in the clear &mdash; keeping the API
          Hub out of PCI DSS scope. The payment token is inside the encrypted response, and means
          nothing to anyone but the LFI that stored it.
        </p>
      </EdNote>
      <EdNote type="info" title="Who creates the card credential today">
        <p>
          An issuing LFI does not, today, create a payment credential and hand it to a third party.
          The cryptogram is generated by the card&rsquo;s chip, by the phone in a wallet payment, or
          &mdash; for card-on-file and online payments &mdash; by the scheme&rsquo;s token service
          at the token requestor&rsquo;s request. The issuer validates the cryptogram when the
          authorisation arrives. The <code>PAN</code> branch of the instrument query therefore
          depends on how the card credential is obtained.
        </p>
      </EdNote>
    </EdSectionBand>

    <!-- 03 ─────────────────────────────────────────────────────────────── -->
    <EdSectionBand
      id="binding"
      num="03"
      color="var(--at-teal)"
      eyebrow="Binding to ICP"
      title="One biometric identification, one payment"
      lede="The ICP token is validated once, by the LFI on the instrument query, which then issues a payment token against it. The payment token replaces it at the point of payment, and can be used once."
    >
      <EdProse>
        <p>
          When ICP identifies the customer, it returns the <strong>ICP token</strong>: an opaque,
          short-lived, single-use identifier for that identification, issued at the point of
          customer identity verification to the BPIP that called for the <code>uaeKycId</code> it
          resolved. ICP holds what it issued the token for, and confirms it to the LFI on
          validation.
        </p>
        <p>
          Unlike dynamic linking under PSD2 strong customer authentication, the payee is not bound
          to the gesture. The BPIP sends the amount and the merchant, terminal and acquirer
          identifiers on the instrument query, and the LFI stores them against the payment token.
          It supplies the account to credit at the point of payment, and is accountable for it, as
          an acquirer is for settling with its merchant in a card payment.
        </p>
        <p>
          On the instrument query, the ICP token travels inside the request the BPIP encrypted to
          the LFI, so the API Hub forwards it without reading it. The LFI validates it by calling
          ICP&rsquo;s token validation endpoint, and answers with a <strong>payment token</strong>:
          a single-use, opaque reference against which it stores the customer, the ICP token, the
          amount, the BPIP, the merchant, terminal and acquirer, and the instrument &mdash; an IBAN
          or a PAN. It returns the same to the BPIP, signed and encrypted. The BPIP passes the
          payment token back to the LFI to make the payment, and the LFI pays from what it stored.
          The payment token &mdash; not the ICP token &mdash; is what the BPIP presents at the point
          of payment.
        </p>
      </EdProse>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Step</th><th>Who checks</th><th>What is checked</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><RouterLink to="/biopay/payment/api-reference/standards/instrument-query"><code>POST /instrument-query</code></RouterLink></td>
              <td>LFI, with ICP&rsquo;s token validation endpoint</td>
              <td>The <strong>BPIP&rsquo;s signature</strong> on the decrypted request, then the <strong>ICP token</strong>: ICP confirms it issued the token to the calling BPIP, as the API Hub identifies it, for the <code>UaeKycId</code> in the request, that it has not expired and that it has not been used, and marks it used. The LFI then issues the payment token.</td>
            </tr>
            <tr>
              <td><code>POST /biometric-payments</code></td>
              <td>LFI</td>
              <td>The <strong>payment token</strong>, looked up in what the LFI stored: issued by this LFI and not expired; issued for an <code>IBAN</code>; issued to the calling BPIP; not used before; its IBAN is still the account registered for ICP Pay against its <code>UaeKycId</code>. The LFI marks it used when it creates the payment.</td>
            </tr>
            <tr>
              <td>Card authorisation through the card scheme</td>
              <td>LFI, as issuer</td>
              <td>The <strong>payment token</strong>, carried by the card scheme in the authorisation and looked up in what the LFI stored: issued by this LFI and not expired; issued for a <code>PAN</code>; the card, amount, <code>MerchantId</code>, <code>TerminalId</code> and <code>AcquirerId</code> in the authorisation match; not used before. The LFI marks it used when it approves.</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>
      <EdNote type="warning" title="Open items">
        <p>
          The ICP token&rsquo;s format, and the interface of ICP&rsquo;s token validation endpoint,
          are to be agreed with ICP &mdash; as is whether ICP binds the amount to the token, so that
          a change of amount after the gesture &mdash; a tip, a changed basket &mdash; needs a new
          gesture. Whether a <code>PAN</code> instrument&rsquo;s <code>Identification</code> is the
          card number or a card scheme token, and the <code>MM/YY</code> format of
          <code>ExpiryDate</code>, are open in the specification. Each card scheme must carry the
          36-character payment token in its authorisation message through to the issuing LFI
          &mdash; to be agreed with each scheme. The contents of <code>Risk</code> on
          <code>POST /biometric-payments</code>
          are to be defined.
        </p>
      </EdNote>
    </EdSectionBand>

    <!-- 04 ─────────────────────────────────────────────────────────────── -->
    <EdSectionBand
      id="who"
      num="04"
      color="var(--at-blue-deep)"
      eyebrow="Who does what"
      title="Five actors, and what each is accountable for"
      tone="surface"
      lede="The split matters: the BPIP takes the payment, ICP answers <em>who is paying</em>, the API Hub decides <em>whether the request is allowed and where it goes</em>, the LFI decides <em>how the customer pays and whether the money moves</em>, and the card scheme carries card payments."
    >
      <BpActorTable :actors="actors" />
    </EdSectionBand>
  </div>
</template>
