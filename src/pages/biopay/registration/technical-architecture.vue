<route lang="yaml">
meta:
  layout: biopay
  title: Registration — Technical Architecture
  next: false
  prev: false
  aside: false
</route>

<script setup lang="ts">
import { useHead } from '@unhead/vue'
import BpRegistrationFlow from '@/components/biopay/BpRegistrationFlow.vue'
import BpActorTable, { type BpActor } from '@/components/biopay/BpActorTable.vue'

useHead({ title: 'Registration — Technical Architecture · BioPay' })

interface Section { id: string; label: string }
interface MetaItem { label: string; value: string }

const sections: Section[] = [
  { id: 'diagram', label: 'Registration flow' },
  { id: 'data', label: 'Where registration is held' },
  { id: 'who', label: 'Who does what' },
  { id: 'rejected', label: 'Rejected option' },
]

const meta: MetaItem[] = [
  { label: 'Status', value: 'Draft' },
  { label: 'Version', value: '0.1' },
]

interface Holding { party: string; holds: string; why: string }

// The API Hub row is kept to make explicit that it plays no part in
// registration and keeps no binding.
const holdings: Holding[] = [
  {
    party: 'ICP',
    holds: 'uaeKycId → LFI',
    why: 'Tells ICP which LFI to address when that customer pays.',
  },
  {
    party: 'LFI',
    holds: 'uaeKycId → payment instrument',
    why: 'Tells the LFI which customer record and which payment instrument a payment debits.',
  },
  {
    party: 'API Hub',
    holds: 'No registration binding',
    why: 'The API Hub is not involved in registration, and holds neither the uaeKycId against an LFI nor the payment instrument.',
  },
]

// Responsibilities are kept as data so each actor's list can be argued with on
// its own terms. Multiple rows per actor; the Actor cell spans them.
const actors: BpActor[] = [
  {
    key: 'icp',
    name: 'ICP',
    sub: 'The government identity service',
    color: 'var(--at-teal)',
    responsibilities: [
      'Provide the ICP SDK that the LFI channel uses for identity verification and to post the completed registration.',
      'Verify the customer’s identity when the LFI asks, and return the uaeKycId.',
      'Store the uaeKycId against the LFI that posted the completed registration, and acknowledge it.',
    ],
  },
  {
    key: 'lfi',
    name: 'LFI',
    sub: 'Licensed Financial Institution — the execution layer',
    color: 'var(--at-navy)',
    responsibilities: [
      'Run the registration journey in its own channel, integrating the ICP SDK.',
      'Request identity verification from ICP directly, through the ICP SDK.',
      'Store the uaeKycId against its own customer record, together with the payment instrument the customer selects.',
      'Post the completed registration to ICP through the ICP SDK, and update it when the customer changes or withdraws it.',
    ],
  },
]
</script>

<template>
  <div class="ed-page">
    <EdBackStrip href="/biopay/" text="BioPay overview" />

    <EdHero
      eyebrow="BioPay · Registration · Draft"
      eyebrow-color="var(--at-gold)"
      title="Registration Technical Architecture"
      :meta="meta"
      lede="How registration is put together, where the result is held, and which party is accountable for each part of it. <strong>Everything here is draft</strong> &mdash; the LFI integrates with ICP directly, and the split of responsibilities is a proposal."
    />

    <EdInPageNav :sections="sections" />

    <!-- 01 ─────────────────────────────────────────────────────────────── -->
    <EdSectionBand
      id="diagram"
      num="01"
      color="var(--at-teal)"
      eyebrow="Registration flow"
      title="The LFI integrates with ICP directly"
    >
      <EdProse>
        The LFI channel calls ICP directly to verify the customer and obtain their
        <code>uaeKycId</code>, and posts the completed registration directly to ICP. Both
        calls are made through the ICP SDK, marked by the yellow ICP SDK boxes in the diagram. There is
        no discovery call.
      </EdProse>
      <APIFlowViewer
        title="BioPay — registration"
        eyebrow="Registration flow"
      >
        <BpRegistrationFlow variant="direct" />
      </APIFlowViewer>
    </EdSectionBand>

    <!-- 03 ─────────────────────────────────────────────────────────────── -->
    <EdSectionBand
      id="data"
      num="02"
      color="var(--at-gold)"
      eyebrow="Where registration is held"
      title="Each side keeps its own half"
      tone="surface"
      lede="The registration is split between the two parties that need it, and the API Hub keeps no copy."
    >
      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Party</th>
              <th>Holds</th>
              <th>Why</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="h in holdings" :key="h.party">
              <td><strong>{{ h.party }}</strong></td>
              <td><code>{{ h.holds }}</code></td>
              <td>{{ h.why }}</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>
    </EdSectionBand>

    <!-- 04 ─────────────────────────────────────────────────────────────── -->
    <EdSectionBand
      id="who"
      num="03"
      color="var(--at-blue-deep)"
      eyebrow="Who does what"
      title="Two actors, and what each is accountable for"
      lede="The LFI owns the registration journey and the payment instrument. ICP owns the identity, provides the ICP SDK, and knows which LFI holds each customer. The API Hub plays no part in registration."
    >
      <BpActorTable :actors="actors" />
    </EdSectionBand>

    <!-- 04 ─────────────────────────────────────────────────────────────── -->
    <EdSectionBand
      id="rejected"
      num="04"
      color="var(--at-mute)"
      eyebrow="Rejected option"
      title="Option A — Via the API Hub"
      tone="surface"
      lede="This option was considered and rejected. It is kept here for reference only."
    >
      <EdProse>
        The LFI channel would have sent the identity verification request to the API Hub under
        C3 (mTLS and <code>application_auth</code>). The Hub would have proxied it to ICP and
        returned the verified identity and <code>uaeKycId</code> to the LFI. The completed
        registration would have followed the same route: the LFI posting it to the API Hub, and
        the Hub delivering it to ICP as a registration event. ICP could then optionally have
        called discovery to check whether a <code>uaeKycId</code> was registered for BioPay at
        the LFI.
      </EdProse>
      <APIFlowViewer
        title="BioPay — registration, Option A (rejected)"
        eyebrow="Registration flow · Option A · Rejected"
      >
        <BpRegistrationFlow variant="hub" />
      </APIFlowViewer>
    </EdSectionBand>
  </div>
</template>
