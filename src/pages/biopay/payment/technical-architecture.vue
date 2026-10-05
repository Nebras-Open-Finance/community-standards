<route lang="yaml">
meta:
  layout: biopay
  title: Payment — Technical Architecture (Account-to-Account Payments)
  next: false
  prev: false
  aside: false
</route>

<script setup lang="ts">
import { useHead } from '@unhead/vue'
import BpPaymentFlow from '@/components/biopay/BpPaymentFlow.vue'
import BpActorTable, { type BpActor } from '@/components/biopay/BpActorTable.vue'

useHead({ title: 'Payment — Technical Architecture (Account-to-Account Payments) · BioPay' })

interface Section { id: string; label: string }
interface MetaItem { label: string; value: string }

const sections: Section[] = [
  { id: 'diagram', label: 'Architecture diagram' },
  { id: 'who', label: 'Who does what' },
]

const meta: MetaItem[] = [
  { label: 'Status', value: 'Draft' },
  { label: 'Actors', value: '4' },
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
      'Build the payment request carrying the uaeKycId, and send it through the API Hub to the default LFI ICP returned.',
      'Generate and retain an idempotency key for every payment, and recover with it rather than initiating again.',
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
      'Validate every request against the schema for the named payment instrument.',
      'Act as the gateway between the BPIP and the LFI. The BPIP never communicates with the LFI directly — the Hub proxies the payment to the Ozone Connect endpoints of the default LFI ICP returned. Identity resolution with ICP does not pass through the Hub.',
      'Enforce idempotency, and serve retrieval by payment identifier or by idempotency key.',
      'Record every transaction that passes through, for reconciliation, dispute handling and supervision.',
      'Normalise status, map LFI errors to the standard, and deliver events to the initiator.',
      'Store no biometric, no template, no account number and no card number.',
    ],
  },
  {
    key: 'lfi',
    name: 'LFI',
    sub: 'Licensed Financial Institution — the execution layer',
    color: 'var(--at-navy)',
    responsibilities: [
      'Implement the biometric payment endpoints on Ozone Connect.',
      'Resolve the uaeKycId to the customer record and the instrument selected at registration.',
      'Execute the account-to-account payment via AANI/IPP.',
      'Patch payment status to the API Hub once the payment reaches a terminal state.',
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
      title="Technical Architecture (Account-to-Account Payments)"
      :meta="meta"
      lede="How an account-to-account payment via AANI/IPP is put together, and which party is accountable for each part of it. <strong>Everything here is draft</strong> &mdash; the flow and the split of responsibilities are proposals for review."
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
      <EdNote type="info" title="Scope: account-to-account payments">
        <p>
          This page covers account-to-account payments via AANI/IPP. The extension of this flow
          to card payments (Jaywan) is covered on
          <RouterLink to="/biopay/payment/card-flow">Card Scheme (e.g. Jaywan) / Card Flow</RouterLink>.
        </p>
      </EdNote>
      <EdProse>
        The BPIP captures the biometric at the acceptance point and sends a resolution request
        directly to ICP through the ICP SDK &mdash; this call does not route through the API Hub.
        ICP matches the customer and returns their <code>uaeKycId</code>, their default LFI and a
        token. The BPIP then sends the payment request through the API Hub, under
        <code>client_credentials</code> over mTLS, and the Hub proxies it to that LFI. The LFI
        executes on the rail and patches status back, which the Hub delivers to the BPIP.
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
      id="who"
      num="02"
      color="var(--at-blue-deep)"
      eyebrow="Who does what"
      title="Four actors, and what each is accountable for"
      tone="surface"
      lede="The split matters: the BPIP takes the payment, ICP answers <em>who is paying</em>, the API Hub decides <em>whether the request is allowed and where it goes</em>, and the LFI decides <em>whether the money moves</em>."
    >
      <BpActorTable :actors="actors" />
    </EdSectionBand>
  </div>
</template>
