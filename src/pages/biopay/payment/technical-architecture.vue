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
      'Resolve the customer directly with ICP through the ICP SDK, receiving a uaeKycId, the customer’s default LFI and a token. This call does not route through the API Hub.',
      'Look up the customer’s payment instrument through the API Hub on every payment, and route the payment on the result.',
      'For an account, build the payment request carrying the uaeKycId and the payment instrument, and send it through the API Hub to the default LFI ICP returned.',
      'Register an encryption certificate in the Directory, and decrypt the card credential JWE in the lookup response with its private key.',
      'For a card, submit the authorisation to the card scheme as acquirer, with the one-time credential the lookup returned. No further call goes through the API Hub.',
      'Generate and retain an idempotency key for every account payment, and recover with it rather than initiating again.',
      'Implement the event endpoint, and acknowledge payment status events.',
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
      'Return the uaeKycId, the customer’s default LFI and a token, from the binding it has held since registration.',
      'Return no template and no match score — only the resolved identifier, default LFI and token.',
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
      'Validate every request against its schema, and every payment request against the schema for the named payment instrument.',
      'Act as the gateway between the BPIP and the LFI. The BPIP never communicates with the LFI directly — the Hub proxies the instrument lookup and the payment to the Ozone Connect endpoints of the default LFI ICP returned. Identity resolution with ICP does not pass through the Hub.',
      'Enforce idempotency, and serve retrieval by payment identifier or by idempotency key.',
      'Record every transaction that passes through, for reconciliation, dispute handling and supervision.',
      'Normalise status, map LFI errors to the standard, and deliver events to the initiator.',
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
      'On lookup, return the IBAN for an account, or generate a one-time card scheme token and cryptogram for a card and encrypt them as a JWE to the BPIP’s public encryption key from the Directory.',
      'Execute the account-to-account payment via AANI/IPP, and patch payment status to the API Hub once it reaches a terminal state.',
      'As issuer, validate the cryptogram and approve or decline the card authorisation when it arrives from the card scheme.',
    ],
  },
  {
    key: 'scheme',
    name: 'Card Scheme',
    sub: 'e.g. Jaywan — card payments only',
    color: 'var(--at-mute)',
    responsibilities: [
      'Provision card scheme tokens for BioPay, and code transactions for biometric cardholder verification.',
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
          ICP matches the customer and returns their <code>uaeKycId</code>, their default LFI and a
          token.
        </p>
        <p>
          The BPIP then asks that LFI, through the API Hub, which payment instrument the customer
          pays with, using
          <RouterLink to="/biopay/payment/api-reference/instrument-lookup"><code>POST /instrument-lookup</code></RouterLink>.
          The BPIP routes the payment on the result:
        </p>
        <ul>
          <li>
            <strong>Account (AANI/IPP).</strong> The BPIP sends the payment request through the API
            Hub, under <code>client_credentials</code> over mTLS, and the Hub proxies it to the LFI.
            The LFI executes on the rail and patches status back, which the Hub delivers to the BPIP.
          </li>
          <li>
            <strong>Card (card scheme, e.g. Jaywan).</strong> The BPIP, as acquirer, submits the
            authorisation to the card scheme with the one-time credential the lookup returned
            &mdash; a JWE encrypted to the BPIP, which the API Hub cannot read. The payment does
            not return to the API Hub.
          </li>
        </ul>
      </EdProse>
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
          registration store of <code>uaeKycId</code> &rarr; payment instrument. The same response
          carries what the BPIP needs for that rail:
        </p>
        <ul>
          <li>
            <strong>Account</strong> &mdash; the <code>PaymentInstrument</code> and the IBAN. The BPIP
            names the instrument in
            <RouterLink to="/biopay/payment/api-reference/biometric-payments"><code>POST /biometric-payments</code></RouterLink>.
            The instrument can change between the lookup and the payment, so the payment request
            can still fail on a mismatch.
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
          The LFI MUST encrypt the card scheme token, cryptogram and expiry into a JWE using the
          BPIP&rsquo;s public encryption key, taken from the
          <RouterLink to="/biopay/directory">Directory</RouterLink>. The API Hub proxies the JWE
          unread, so card data never passes through it in the clear &mdash; keeping the API Hub out
          of PCI DSS scope. Only the BPIP can decrypt it, with its private key. Every BPIP MUST
          therefore register an encryption certificate.
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
      id="who"
      num="03"
      color="var(--at-blue-deep)"
      eyebrow="Who does what"
      title="Five actors, and what each is accountable for"
      lede="The split matters: the BPIP takes the payment, ICP answers <em>who is paying</em>, the API Hub decides <em>whether the request is allowed and where it goes</em>, the LFI decides <em>how the customer pays and whether the money moves</em>, and the card scheme carries card payments."
    >
      <BpActorTable :actors="actors" />
    </EdSectionBand>
  </div>
</template>
