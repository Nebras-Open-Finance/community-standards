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
    name: 'BPIP',
    sub: 'Biometric Payment Initiation Provider — the merchant’s acquirer',
    color: 'var(--at-teal)',
    responsibilities: [
      'Operate the acceptance point, and capture the biometric together with the amount and creditor details.',
      'Resolve the customer directly with ICP through the ICP SDK, supplying the transaction hash and its transport certificate thumbprint, and receive a uaeKycId, the customer’s default LFI and the ICP authorisation. This call does not route through the API Hub.',
      'Look up the customer’s payment instrument through the API Hub on every payment, presenting the ICP authorisation, and receive a payment token. Route the payment on the result.',
      'For an account, build the payment request carrying the uaeKycId, the customer’s IBAN from the lookup and the payment token, and send it through the API Hub to the default LFI ICP returned.',
      'Register an encryption certificate in the Directory. Decrypt the card credential JWE in the lookup response with its private key, and verify the LFI’s signature inside it.',
      'For a card, submit the authorisation to the card scheme as acquirer, with the one-time credential and the payment token the lookup returned. No further call goes through the API Hub.',
      'Generate and retain an idempotency key for every account payment, and recover with it rather than initiating again.',
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
      'Sign the ICP authorisation: a short-lived, single-use JWS binding the uaeKycId to this transaction’s amount and merchant, to the BPIP and to the BPIP’s transport certificate.',
      'Return no template and no match score — only the resolved identifier, default LFI and ICP authorisation.',
    ],
  },
  {
    key: 'hub',
    name: 'API Hub',
    sub: 'Nebras — the control plane',
    color: 'var(--at-blue-deep)',
    responsibilities: [
      'Enforce mutual TLS and application-layer authentication on every request, so each call is bound to a participant the Trust Framework has identified by certificate.',
      'Issue access tokens under client_credentials. There is no authorisation journey in this flow, and no LFI issues anything.',
      'Enforce role and scope entitlement before any request is proxied.',
      'Verify the ICP authorisation on every lookup, and allow each one to be exchanged for one payment token only.',
      'Mint the payment token after the LFI answers the lookup: a short-lived, single-use JWS that embeds the ICP authorisation and states whether the payment is by account or card.',
      'Verify the payment token on every account payment, and mark it used once the LFI creates the payment.',
      'Validate every request against its schema.',
      'Act as the gateway between the BPIP and the LFI. The BPIP never communicates with the LFI directly — the Hub proxies the instrument lookup and the payment to the Ozone Connect endpoints of the default LFI ICP returned. Identity resolution with ICP does not pass through the Hub.',
      'Enforce idempotency, and serve retrieval by payment identifier or by idempotency key.',
      'Record every transaction that passes through, for reconciliation, dispute handling and supervision.',
      'Normalise status, map LFI errors to the standard, and deliver payment status events to the BPIP.',
      'Record the biometric assurance on each payment from the ICP authorisation embedded in the payment token, not from anything the BPIP asserts.',
      'Publish the signing keys the card scheme uses to verify payment tokens.',
      'Proxy the card credential JWE unread. The Hub never sees card data in the clear, keeping it out of PCI DSS scope.',
      'Store no biometric, no template, no account number and no card credential.',
    ],
  },
  {
    key: 'lfi',
    name: 'LFI',
    sub: 'Licensed Financial Institution — the execution layer',
    color: 'var(--at-navy)',
    responsibilities: [
      'Implement the instrument lookup and biometric payment endpoints on Ozone Connect.',
      'Resolve the uaeKycId to the customer record and the instrument selected at registration.',
      'Verify the ICP authorisation on the lookup.',
      'On lookup, return the IBAN for an account; for a card, generate a one-time card scheme token and cryptogram bound to the amount, merchant and ICP jti, sign them, and encrypt them as a JWE to the BPIP’s public encryption key from the Directory.',
      'Execute the account-to-account payment via AANI/IPP, and patch payment status to the API Hub once it reaches a terminal state.',
      'As issuer, when the card authorisation arrives from the card scheme, validate the cryptogram and approve or decline.',
    ],
  },
  {
    key: 'scheme',
    name: 'Card Scheme',
    sub: 'e.g. Jaywan — card payments only',
    color: 'var(--at-mute)',
    responsibilities: [
      'Provision card scheme tokens for BioPay, and code transactions for biometric cardholder verification.',
      'Verify the payment token in the BPIP’s authorisation against the API Hub’s signing keys — a Card token for this scheme, amount and merchant, not expired and not used — and mark it used.',
      'Detokenise and route the BPIP’s authorisation to the issuing LFI, and return the response.',
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
          <strong>ICP authorisation</strong> bound to this transaction &mdash; see
          <a href="#binding">Binding to ICP</a>.
        </p>
        <p>
          The BPIP then asks that LFI, through the API Hub, which payment instrument the customer
          pays with, using
          <RouterLink to="/biopay/payment/api-reference/instrument-lookup"><code>POST /instrument-lookup</code></RouterLink>.
          The API Hub exchanges the ICP authorisation for a <strong>payment token</strong>, and
          the BPIP routes the payment on the result:
        </p>
        <ul>
          <li>
            <strong>Account (AANI/IPP).</strong> The BPIP sends the payment request, carrying the
            payment token, through the API Hub, under <code>client_credentials</code> over mTLS. The
            Hub verifies the token and proxies the request to the LFI.
            The LFI executes on the rail and patches status back, which the Hub delivers to the BPIP.
          </li>
          <li>
            <strong>Card (card scheme, e.g. Jaywan).</strong> The BPIP, as acquirer, submits the
            authorisation to the card scheme with the one-time credential the lookup returned
            &mdash; a JWE encrypted to the BPIP, which the API Hub cannot read &mdash; and the
            payment token, which the card scheme verifies. The payment does not return to the API
            Hub.
          </li>
        </ul>
      </EdProse>
      <EdNote type="info" title="The BPIP never communicates with the LFI directly">
        <p>
          Every BPIP call reaches the LFI through an intermediary. Account payments, and the
          instrument lookup, go through the API Hub, operated by Nebras. Card payments go through the
          card scheme (e.g. Jaywan), as they do today. The BPIP has no connection to the LFI&rsquo;s
          systems.
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
          proxies the lookup to the LFI&rsquo;s Ozone Connect, and the LFI answers from its own
          registration store of <code>uaeKycId</code> &rarr; payment instrument. The API Hub adds a
          payment token to every successful response, and the response carries what the BPIP needs
          for that rail:
        </p>
        <ul>
          <li>
            <strong>Account (AANI)</strong> &mdash; <code>PaymentInstrument: AANI</code> and the
            customer&rsquo;s IBAN. The BPIP sends the IBAN back as <code>DebtorAccount</code> in
            <RouterLink to="/biopay/payment/api-reference/biometric-payments"><code>POST /biometric-payments</code></RouterLink>.
            The registered account can change between the lookup and the payment, so the payment
            request can still fail on a mismatch (<code>Account.DebtorAccountMismatch</code>).
          </li>
          <li>
            <strong>Card</strong> &mdash; the <code>PaymentInstrument</code> and a one-time card
            scheme token and cryptogram, generated by the LFI for the amount and card acceptor in
            the request. The response never carries a card number (PAN).
          </li>
        </ul>
      </EdProse>
      <EdNote type="info" title="The card credential is encrypted to the BPIP">
        <p>
          The LFI MUST sign the card scheme token, cryptogram and expiry as a JWS, and encrypt that
          JWS into a JWE using the BPIP&rsquo;s public encryption key, taken from the
          <RouterLink to="/biopay/directory">Directory</RouterLink>. The API Hub proxies the JWE
          unread, so card data never passes through it in the clear &mdash; keeping the API Hub out
          of PCI DSS scope. Only the BPIP can decrypt it, with its private key, and the LFI&rsquo;s
          signature inside proves where it came from. Every BPIP MUST therefore register an
          encryption certificate.
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
      lede="The ICP authorisation is exchanged once, at the lookup, for a payment token that embeds it. The payment token replaces it at the point of payment, and can be used once."
    >
      <EdProse>
        <p>
          Before the biometric is captured, the BPIP already knows the amount and the merchant. It
          sends ICP a hash of them (<code>txn</code>) and the thumbprint of its transport
          certificate with the biometric capture. ICP returns a short-lived JWS &mdash; the
          <strong>ICP authorisation</strong> &mdash; that binds the <code>uaeKycId</code>
          (<code>sub</code>) to that transaction, to the BPIP (<code>azp</code>) and to the
          BPIP&rsquo;s mTLS key (<code>cnf</code>). Its <code>jti</code> is ICP&rsquo;s identifier
          for the identification and is single-use. The customer&rsquo;s gesture therefore
          authorises this amount at this merchant, in the way dynamic linking does under PSD2 strong
          customer authentication.
        </p>
        <p>
          On the lookup, the API Hub verifies the ICP authorisation and, once the LFI has answered,
          returns a <strong>payment token</strong>: a short-lived, single-use JWS signed by the API
          Hub. It embeds the ICP authorisation unchanged, states the <code>PaymentType</code>
          (<code>Account</code> or <code>Card</code>) and the instrument, and binds the customer, the
          amount, the merchant, the BPIP&rsquo;s client and certificate and, for an account, the IBAN.
          The payment token &mdash; not the ICP authorisation &mdash; is what the BPIP presents to
          make the payment.
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
              <td>API Hub, then LFI</td>
              <td>The <strong>ICP authorisation</strong>: ICP signature and expiry; <code>cnf</code> matches the mTLS certificate; <code>azp</code> is the calling BPIP; <code>sub</code> and <code>txn</code> match the request; <code>jti</code> not used before. The Hub marks it used and returns the payment token.</td>
            </tr>
            <tr>
              <td><RouterLink to="/biopay/payment/api-reference/biometric-payments"><code>POST /biometric-payments</code></RouterLink></td>
              <td>API Hub</td>
              <td>The <strong>payment token</strong>: API Hub signature and expiry; <code>PaymentType: Account</code>; <code>cnf</code> and <code>azp</code>; the <code>uaeKycId</code>, IBAN and amount match the request; not used before. The Hub marks it used when the LFI creates the payment, and records the biometric assurance from the embedded ICP authorisation.</td>
            </tr>
            <tr>
              <td>Card authorisation through the card scheme</td>
              <td>Card scheme, then LFI</td>
              <td>The card scheme checks the <strong>payment token</strong> against the API Hub&rsquo;s published signing keys: <code>PaymentType: Card</code> for this scheme; the amount and merchant match the authorisation; not expired and not used. It marks it used. The LFI, as issuer, validates the cryptogram, which it bound to the amount, merchant and ICP <code>jti</code> at lookup.</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>
      <EdNote type="warning" title="Open items">
        <p>
          The ICP SDK must accept the transaction hash and certificate thumbprint and return a
          signed authorisation. ICP&rsquo;s signing keys must be distributed to the API Hub and the
          LFIs, although ICP is not a Directory participant. Each card scheme must carry the payment
          token in its authorisation message, and must trust and use the API Hub&rsquo;s signing keys
          to verify it &mdash; to be agreed with each scheme. A change of amount after the gesture
          &mdash; a tip, a changed basket &mdash; needs a new gesture.
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
