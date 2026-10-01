<route lang="yaml">
meta:
  layout: biopay
  title: Payment — Technical Architecture
  next: false
  prev: false
  aside: false
</route>

<script setup lang="ts">
import { useHead } from '@unhead/vue'
import BpPaymentFlow from '@/components/biopay/BpPaymentFlow.vue'
import BpActorTable, { type BpActor } from '@/components/biopay/BpActorTable.vue'

useHead({ title: 'Payment — Technical Architecture · BioPay' })

interface Section { id: string; label: string }
interface MetaItem { label: string; value: string }

const sections: Section[] = [
  { id: 'diagram', label: 'Architecture diagram' },
  { id: 'who', label: 'Who does what' },
]

const meta: MetaItem[] = [
  { label: 'Status', value: 'Draft' },
  { label: 'Actors', value: '3' },
  { label: 'Version', value: '0.1' },
]

// Responsibilities are kept as data so each actor's list can be argued with on
// its own terms. Multiple rows per actor; the Actor cell spans them.
const actors: BpActor[] = [
  {
    key: 'bpip',
    name: 'BPIP',
    sub: 'Biometric Payment Initiation Provider — the payment initiator',
    color: 'var(--at-teal)',
    responsibilities: [
      'Capture the biometric, run liveness detection and match it to a verified identity — all of it outside the Open Finance boundary.',
      'Resolve the customer to an identifier, and assert with each payment that the identification took place.',
      'Build the payment request to the creditor schema for the instrument discovery returned.',
      'Generate and retain an idempotency key for every payment, and recover with it rather than initiating again.',
      'Implement the event endpoint, and acknowledge payment status events.',
      'Report the outcome back to the acceptance point.',
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
      'Act as the gateway between the BPIP and the LFI. The two never communicate directly — the Hub resolves the LFI from the registration record and proxies every request to its Ozone Connect endpoints.',
      'Enforce idempotency, and serve retrieval by payment identifier or by idempotency key.',
      'Record every transaction that passes through, for reconciliation, dispute handling and supervision.',
      'Normalise status, map LFI errors to the standard, and deliver events to the initiator.',
      'Hold no biometric, no template, no account number and no card number.',
    ],
  },
  {
    key: 'lfi',
    name: 'LFI',
    sub: 'Licensed Financial Institution — the execution layer',
    color: 'var(--at-navy)',
    responsibilities: [
      'Implement the biometric payment endpoints on Ozone Connect.',
      'Execute the payment on the registered payment rail (AANI, CBDC, Jaywan, …).',
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
      title="Payment Technical Architecture"
      :meta="meta"
      lede="How payment is put together, and which party is accountable for each part of it. <strong>Everything here is draft</strong> &mdash; the flow and the split of responsibilities are proposals for review."
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
        The initiator identifies the customer, confirms the registration is still usable, and
        initiates a payment shaped to the registered instrument. The API Hub resolves the LFI
        from its registration store and proxies the request; the LFI executes on the rail and
        patches status back, which the Hub delivers to the initiator.
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
      title="Three actors, and what each is accountable for"
      tone="surface"
      lede="The split matters: the initiator answers <em>who is paying</em>, the API Hub decides <em>whether the request is allowed and where it goes</em>, and the LFI decides <em>whether the money moves</em>."
    >
      <BpActorTable :actors="actors" />
    </EdSectionBand>
  </div>
</template>
