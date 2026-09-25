<route lang="yaml">
meta:
  layout: biopay
  title: Technical Architecture
  next: false
  prev: false
  aside: false
</route>

<script setup lang="ts">
import { useHead } from '@unhead/vue'
import BpRegistrationFlow from '@/components/biopay/BpRegistrationFlow.vue'
import BpPaymentFlow from '@/components/biopay/BpPaymentFlow.vue'

useHead({ title: 'Technical Architecture · BioPay' })

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

interface Actor {
  key: string
  name: string
  sub: string
  color: string
  responsibilities: string[]
}

// Responsibilities are kept as data so each actor's list can be argued with on
// its own terms. Multiple rows per actor; the Actor cell spans them.
const actors: Actor[] = [
  {
    key: 'bpip',
    name: 'BPIP',
    sub: 'Biometric Payment Initiation Provider — the payment initiator',
    color: 'var(--at-teal)',
    responsibilities: [
      'Capture the biometric, run liveness detection and match it to a verified identity — all of it outside the Open Finance boundary.',
      'Resolve the customer to an identifier, and assert with each payment that the identification took place.',
      'Retain the LFI identifier received in the registration event, and reconcile any events it did not receive.',
      'Build the payment request to the creditor schema for the instrument discovery returned.',
      'Generate and retain an idempotency key for every payment, and recover with it rather than initiating again.',
      'Implement the event endpoint, and acknowledge registration and payment status events.',
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
      'Run the registration journey in its own channel, and verify the customer’s identity.',
      'Bind the verified identity to its own customer record, and capture the instrument the customer selects.',
      'Post the completed registration to the API Hub, and update it when the customer changes or withdraws it.',
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
      eyebrow="BioPay · Draft"
      eyebrow-color="var(--at-teal)"
      title="Technical Architecture"
      :meta="meta"
      lede="How the journey is put together, and which party is accountable for each part of it. <strong>Everything here is draft</strong> &mdash; the flows and the split of responsibilities are proposals for review."
    />

    <EdInPageNav :sections="sections" />

    <!-- 01 ─────────────────────────────────────────────────────────────── -->
    <EdSectionBand
      id="diagram"
      num="01"
      color="var(--at-teal)"
      eyebrow="Architecture diagram"
      title="The journey in two halves"
      lede="Registration binds a customer to a payment instrument. Payment spends against that binding. They are separate flows with separate actors, and they are worth reading separately. Click either diagram to expand it."
    >
      <h3 class="bp-sub">Registration</h3>
      <EdProse>
        The customer registers with their bank, in the bank&rsquo;s own channel, and no Open
        Finance API is involved in that part. What brings it into Open Finance is the step that
        follows: the LFI posts the completed registration to the API Hub, the Hub stores the
        binding, and the Hub drives an event to the initiator.
      </EdProse>
      <APIFlowViewer
        title="BioPay — registration"
        eyebrow="Registration flow"
      >
        <BpRegistrationFlow />
      </APIFlowViewer>

      <h3 class="bp-sub">Payment</h3>
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
      lede="One new role and two existing ones. The split matters: the initiator answers <em>who is paying</em>, the API Hub decides <em>whether the request is allowed and where it goes</em>, and the LFI decides <em>whether the money moves</em>."
    >
      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Actor</th>
              <th>Responsibility</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="a in actors" :key="a.key">
              <tr v-for="(r, i) in a.responsibilities" :key="a.key + '-' + i">
                <td
                  v-if="i === 0"
                  :rowspan="a.responsibilities.length"
                  class="bp-actor"
                  :style="{ '--bp-actor-color': a.color }"
                >
                  <strong>{{ a.name }}</strong>
                  <span class="bp-actor__sub">{{ a.sub }}</span>
                </td>
                <td>{{ r }}</td>
              </tr>
            </template>
          </tbody>
        </table>
      </EdRefTable>
    </EdSectionBand>
  </div>
</template>

<style scoped>
/* Subsection heading inside a section band — used for Registration / Payment. */
.bp-sub {
  font-family: var(--at-sans);
  font-size: 1.05rem;
  font-weight: 700;
  letter-spacing: 0.01em;
  color: var(--at-navy-deep);
  margin: 2.25rem 0 0;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--at-grid-line);
}
.bp-sub:first-child { margin-top: 0; }

/* Actor cell spans its responsibility rows; the rule keys it to the actor. */
.bp-actor {
  min-width: 11rem;
  border-left: 3px solid var(--bp-actor-color, var(--at-teal));
  background: var(--at-bg-cream);
}
.bp-actor strong {
  display: block;
  font-family: var(--at-mono);
  font-size: 0.86rem;
  letter-spacing: 0.06em;
}
.bp-actor__sub {
  display: block;
  margin-top: 0.35rem;
  font-size: 0.8rem;
  line-height: 1.45;
  color: var(--at-mute);
}
</style>
