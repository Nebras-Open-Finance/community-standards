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
  { id: 'lookup', label: 'Instrument lookup' },
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
      'Resolve the customer directly with ICP through the ICP SDK, supplying a hash of the amount and its transport certificate thumbprint, and receive a uaeKycId, the customer’s default LFI and the ICP token. This call does not route through the API Hub.',
      'Look up the customer’s payment instrument through the API Hub on every payment, sending the uaeKycId, the ICP token and the amount, and receive a payment token. Route the payment on its instrument type.',
      'Register an encryption certificate in the Directory. Decrypt the payment token JWE in every lookup response with its private key, and verify the LFI’s signature on the JWS inside it.',
      'For an ACCOUNT, send the payment token through the API Hub to the default LFI ICP returned, with the IBAN to credit. Nothing in the payment token is repeated in the request. The BPIP is accountable for the creditor account, as an acquirer is for settling with its merchant.',
      'For a CARD, submit the authorisation to the card scheme as acquirer, with the card details from the payment token and the payment token itself. No further call goes through the API Hub.',
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
      'Sign the ICP token: a short-lived, single-use JWS binding the uaeKycId to this payment’s amount, to the BPIP and to the BPIP’s transport certificate.',
      'Return no template and no match score — only the resolved identifier, default LFI and ICP token.',
      'Expose a token validation endpoint to LFIs. On each call, confirm ICP issued the ICP token, that it has not expired and that it has not been used, and mark it used.',
    ],
  },
  {
    key: 'hub',
    name: 'Nebras (API Hub)',
    sub: 'The control plane',
    color: 'var(--at-blue-deep)',
    responsibilities: [
      'Enforce mutual TLS and application-layer authentication on every request, so each call is bound to a participant the Trust Framework has identified by certificate.',
      'Issue access tokens under client_credentials. There is no authorisation journey in this flow.',
      'Enforce role and scope entitlement before any request is proxied.',
      'Validate every request against its schema.',
      'Act as the gateway between the BPIP and the LFI. The BPIP never communicates with the LFI directly — the Hub proxies the instrument lookup and the payment to the Ozone Connect endpoints of the default LFI ICP returned, identifying the BPIP to the LFI. Identity resolution with ICP does not pass through the Hub.',
      'Proxy the ICP token and the payment token to the LFI without verifying them. The LFI verifies both.',
      'Enforce idempotency, and serve retrieval by payment identifier.',
      'Record every transaction that passes through, for reconciliation, dispute handling and supervision.',
      'Normalise status, map LFI errors to the standard, and deliver payment status events to the BPIP.',
      'Record the biometric assurance on each payment from the ICP token embedded in the payment token, once the LFI has accepted the payment — not from anything the BPIP asserts.',
      'Proxy the payment token JWE in the lookup response unread. The Hub never sees card data in the clear, keeping it out of PCI DSS scope.',
      'Store no biometric, no template, no account number and no card credential.',
    ],
  },
  {
    key: 'lfi',
    name: 'Issuer (Ozone Connect)',
    sub: 'Licensed Financial Institution — the execution layer',
    color: 'var(--at-navy)',
    responsibilities: [
      'Implement the instrument lookup and biometric payment endpoints on Ozone Connect.',
      'Validate the ICP token on every lookup by calling ICP’s token validation endpoint, and check it was issued to the calling BPIP for this uaeKycId and amount.',
      'Resolve the uaeKycId to the customer record and the payment instrument registered for BioPay.',
      'Answer every lookup with a payment token: a short-lived, single-use JWS it signs, carrying the uaeKycId, the ICP token, the amount and — by instrument type — the customer’s IBAN or card details, encrypted as a JWE to the BPIP’s public encryption key from the Directory.',
      'Verify the payment token it issued when it comes back — on the AANI payment through the API Hub, or in the card authorisation through the card scheme — and mark it used when it accepts the payment.',
      'Execute the account-to-account payment via AANI/IPP — debiting the account in the payment token for its amount, and crediting the IBAN the BPIP sent — or book it on its own ledger where it also holds the creditor account. Patch the payment rail (AANI or LFI) and status to the API Hub, as on the v2.2 payment log, until it reaches a terminal state.',
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
      lede="How a BioPay payment is put together &mdash; resolution with ICP, the instrument lookup that decides the route, and the account-to-account payment via AANI/IPP &mdash; and which party is accountable for each part of it. <strong>Everything here is draft</strong> &mdash; the flow and the split of responsibilities are proposals for review."
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
          <strong>ICP token</strong> bound to this transaction &mdash; see
          <a href="#binding">Binding to ICP</a>.
        </p>
        <p>
          The BPIP then asks that LFI, through the API Hub, which payment instrument the customer
          pays with, using
          <RouterLink to="/biopay/payment/api-reference/instrument-lookup"><code>POST /instrument-lookup</code></RouterLink>.
          The LFI, as issuer, validates the ICP token with ICP&rsquo;s token validation endpoint and answers with a
          <strong>payment token</strong>: a short-lived JWS it signs, encrypted to the BPIP. The
          BPIP routes the payment on the token&rsquo;s <code>InstrumentType</code>:
        </p>
        <ul>
          <li>
            <strong>ACCOUNT (via AANI/IPP).</strong> The BPIP sends the payment request,
            carrying the payment token and the IBAN to credit, through the API Hub, under
            <code>client_credentials</code> over mTLS. The Hub proxies the request to the LFI, which verifies the token it issued.
            The LFI executes on the rail and patches status back, which the Hub delivers to the BPIP.
          </li>
          <li>
            <strong>CARD (via the card scheme, e.g. Jaywan).</strong> The BPIP, as acquirer, submits the authorisation to the
            card scheme with the card details from the payment token and the payment token itself,
            which the card scheme carries to the LFI to verify. The payment does not return to the
            API Hub.
          </li>
        </ul>
      </EdProse>
      <EdNote type="info" title="The Acquirer never communicates with the Issuer directly">
        <p>
          Every call from the Acquirer reaches the Issuer through an intermediary. Account payments,
          and the instrument lookup, go through the API Hub, operated by Nebras. Card payments go
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
      id="lookup"
      num="02"
      color="var(--at-gold)"
      eyebrow="Instrument lookup"
      title="Every payment starts with a lookup"
      tone="surface"
      lede="Only the LFI knows whether a uaeKycId pays by account or by card, and the BPIP cannot route the payment until it knows."
    >
      <EdProse>
        <p>
          The BPIP MUST call
          <RouterLink to="/biopay/payment/api-reference/instrument-lookup"><code>POST /instrument-lookup</code></RouterLink>
          on every payment, after resolution with ICP and before it builds the payment. The API Hub
          proxies the lookup to the LFI&rsquo;s Ozone Connect without checking the ICP token. The LFI
          validates the ICP token with ICP&rsquo;s token validation endpoint, and answers from its own registration store of
          <code>uaeKycId</code> &rarr; payment instrument. The response is always a payment token
          carrying the <code>uaeKycId</code>, the ICP token and the amount, and what the
          payment instrument needs:
        </p>
        <ul>
          <li>
            <strong><code>InstrumentType: ACCOUNT</code></strong> &mdash; the customer&rsquo;s
            <code>DebtorAccount</code> (IBAN). The BPIP does not send it back: it sends the payment
            token in
            <RouterLink to="/biopay/payment/api-reference/biometric-payments"><code>POST /biometric-payments</code></RouterLink>
            with only the IBAN to credit alongside, and the LFI debits the account the token
            carries. The registered account can change between the lookup and the payment, so the
            payment can still fail (<code>Account.DebtorAccountMismatch</code>).
          </li>
          <li>
            <strong><code>InstrumentType: CARD</code></strong> &mdash; the customer&rsquo;s
            <code>CardDetails</code>: card number and expiry date.
          </li>
        </ul>
      </EdProse>
      <EdNote type="info" title="The payment token is encrypted to the BPIP">
        <p>
          The LFI MUST sign the payment token as a JWS, and encrypt that JWS into a JWE using the
          BPIP&rsquo;s public encryption key, taken from the
          <RouterLink to="/biopay/directory">Directory</RouterLink>. The API Hub proxies the JWE
          unread, so card data never passes through it in the clear &mdash; keeping the API Hub out
          of PCI DSS scope. Only the BPIP can decrypt it, with its private key, and the LFI&rsquo;s
          signature inside proves where it came from &mdash; which is what lets the LFI rely on the
          token when the BPIP passes it back at the point of payment. Every BPIP MUST therefore
          register an encryption certificate.
        </p>
      </EdNote>
      <EdNote type="info" title="Who creates the card credential today">
        <p>
          An issuing LFI does not, today, create a payment credential and hand it to a third party.
          The cryptogram is generated by the card&rsquo;s chip, by the phone in a wallet payment, or
          &mdash; for card-on-file and online payments &mdash; by the scheme&rsquo;s token service
          at the token requestor&rsquo;s request. The issuer validates the cryptogram when the
          authorisation arrives. The card branch of the lookup therefore depends on how the card
          credential is obtained.
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
      lede="The ICP token is validated once, by the LFI at the lookup, and embedded in a payment token the LFI signs. The payment token replaces it at the point of payment, and can be used once."
    >
      <EdProse>
        <p>
          Before the biometric is captured, the BPIP already knows the amount. It sends ICP a hash
          of it (<code>txn</code>) and the thumbprint of its transport certificate with the
          biometric capture. ICP returns a short-lived JWS &mdash; the
          <strong>ICP token</strong> &mdash; that binds the <code>uaeKycId</code>
          (<code>sub</code>) to that amount, to the BPIP (<code>azp</code>) and to the
          BPIP&rsquo;s mTLS key (<code>cnf</code>). Its <code>jti</code> is ICP&rsquo;s identifier
          for the identification and is single-use. The customer&rsquo;s gesture therefore
          authorises this amount, through this BPIP.
        </p>
        <p>
          Unlike dynamic linking under PSD2 strong customer authentication, the payee is not bound
          to the gesture. The BPIP supplies the account to credit at the point of payment, and is
          accountable for it, as an acquirer is for settling with its merchant in a card payment.
        </p>
        <p>
          On the lookup, the API Hub proxies the ICP token to the LFI without verifying it. The LFI
          validates it by calling ICP&rsquo;s token validation endpoint, and answers with a <strong>payment
          token</strong>: a short-lived, single-use JWS signed by the LFI and encrypted to the BPIP.
          It embeds the ICP token unchanged, carries the <code>InstrumentType</code> with the IBAN or
          card details, and binds the customer, the amount and the BPIP. The BPIP
          decrypts it and passes the JWS back to the LFI to make the payment, and the LFI relies on
          its own signature. The payment token &mdash; not the ICP token &mdash; is what the BPIP
          presents at the point of payment.
        </p>
      </EdProse>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>Step</th><th>Who checks</th><th>What is checked</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><RouterLink to="/biopay/payment/api-reference/instrument-lookup"><code>POST /instrument-lookup</code></RouterLink></td>
              <td>LFI, with ICP&rsquo;s token validation endpoint</td>
              <td>The <strong>ICP token</strong>: ICP confirms it issued the token, that it has not expired and that its <code>jti</code> has not been used, and marks it used. The LFI checks that <code>azp</code> is the calling BPIP, as the API Hub identifies it, and that <code>sub</code> and <code>txn</code> match the request. The LFI then returns the payment token.</td>
            </tr>
            <tr>
              <td><RouterLink to="/biopay/payment/api-reference/biometric-payments"><code>POST /biometric-payments</code></RouterLink></td>
              <td>LFI</td>
              <td>The <strong>payment token</strong>: the LFI&rsquo;s own signature and expiry; <code>InstrumentType: ACCOUNT</code>; <code>azp</code> is the calling BPIP; not used before; its <code>DebtorAccount</code> is still the account registered for its <code>uaeKycId</code>. The LFI marks it used when it creates the payment, and the API Hub records the biometric assurance from the embedded ICP token.</td>
            </tr>
            <tr>
              <td>Card authorisation through the card scheme</td>
              <td>LFI, as issuer</td>
              <td>The <strong>payment token</strong>, carried by the card scheme in the authorisation: the LFI&rsquo;s own signature and expiry; <code>InstrumentType: CARD</code>; the card and amount match the authorisation; not used before. The LFI marks it used when it approves.</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>
      <EdNote type="warning" title="Open items">
        <p>
          The ICP SDK must accept the amount hash and certificate thumbprint and return a
          signed ICP token. The ICP token&rsquo;s
          <code>cnf</code> binds it to the BPIP&rsquo;s transport certificate, but the API Hub
          terminates mTLS and no longer verifies the token, so how <code>cnf</code> is checked is to
          be agreed. Whether <code>CardNumber</code> is the card number (PAN) or a card scheme token
          is to be agreed. Each card scheme must carry the payment token in its authorisation
          message through to the issuing LFI &mdash; to be agreed with each scheme. A change of
          amount after the gesture &mdash; a tip, a changed basket &mdash; needs a new gesture. The
          contents of <code>Risk</code> on
          <RouterLink to="/biopay/payment/api-reference/biometric-payments"><code>POST /biometric-payments</code></RouterLink>
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
