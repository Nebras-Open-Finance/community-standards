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
  { id: 'diagram', label: 'Architecture options' },
  { id: 'compare', label: 'Comparing the options' },
  { id: 'data', label: 'Where registration is held' },
  { id: 'who', label: 'Who does what' },
]

const meta: MetaItem[] = [
  { label: 'Status', value: 'Draft' },
  { label: 'Options', value: '2' },
  { label: 'Version', value: '0.1' },
]

interface Holding { party: string; holds: string; why: string }

// The API Hub is deliberately absent: it routes registration but keeps no
// binding of its own.
const holdings: Holding[] = [
  {
    party: 'ICP',
    holds: 'uaeKycId → LFI',
    why: 'Tells ICP which LFI to address when that customer pays.',
  },
  {
    party: 'LFI',
    holds: 'uaeKycId → payment instrument',
    why: 'Tells the LFI which customer record and which instrument a payment debits.',
  },
  {
    party: 'API Hub',
    holds: 'No registration binding',
    why: 'The Hub validates and routes the registration, and holds neither the uaeKycId against an LFI nor the instrument.',
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
      'Verify the customer’s identity when the LFI asks through the API Hub, and return the uaeKycId.',
      'Store the uaeKycId against the LFI identified in the registration event, and reconcile any events it did not receive.',
      'Implement the event endpoint, and acknowledge registration events.',
      'Query discovery to confirm a registration is still usable before relying on it.',
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
      'Enforce role and scope entitlement before any request is processed.',
      'Validate the shape of every request against its schema, and reject any request that does not conform.',
      'Hold no biometric, no template, no account number and no card number.',
    ],
  },
  {
    key: 'lfi',
    name: 'LFI',
    sub: 'Licensed Financial Institution — the execution layer',
    color: 'var(--at-navy)',
    responsibilities: [
      'Run the registration journey in its own channel.',
      'Request identity verification from ICP through the API Hub.',
      'Store the uaeKycId against its own customer record, together with the instrument the customer selects.',
      'Post the completed registration to the API Hub, and update it when the customer changes or withdraws it.',
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
      lede="How registration is put together, where the result is held, and which party is accountable for each part of it. <strong>Everything here is draft</strong> &mdash; two options are set out for review, and the split of responsibilities is a proposal."
    />

    <EdInPageNav :sections="sections" />

    <!-- 01 ─────────────────────────────────────────────────────────────── -->
    <EdSectionBand
      id="diagram"
      num="01"
      color="var(--at-teal)"
      eyebrow="Architecture options"
      title="Two options for registration"
      lede="Two options are set out for review. Click either diagram to expand it."
    >
      <h3 class="bp-sub">Option A — Via the API Hub</h3>
      <EdProse>
        The LFI channel sends the identity verification request to the API Hub under C3
        (mTLS and <code>application_auth</code>). The Hub proxies it to ICP and returns the
        verified identity and <code>uaeKycId</code> to the LFI. The completed registration
        follows the same route: the LFI posts it to the API Hub, and the Hub delivers it to
        ICP as a registration event. ICP may then optionally call discovery to check whether a
        <code>uaeKycId</code> is registered for BioPay at the LFI; the Hub answers by asking the
        LFI, and returns the registration status only.
      </EdProse>
      <APIFlowViewer
        title="BioPay — registration, Option A"
        eyebrow="Registration flow · Option A"
      >
        <BpRegistrationFlow variant="hub" />
      </APIFlowViewer>

      <h3 class="bp-sub">Option B — Direct between the LFI and ICP</h3>
      <EdProse>
        The API Hub is not involved. The LFI channel calls ICP directly to verify the customer
        and obtain their <code>uaeKycId</code>, and posts the completed registration directly to
        ICP. There is no discovery call.
      </EdProse>
      <APIFlowViewer
        title="BioPay — registration, Option B"
        eyebrow="Registration flow · Option B"
      >
        <BpRegistrationFlow variant="direct" />
      </APIFlowViewer>
    </EdSectionBand>

    <!-- 02 ─────────────────────────────────────────────────────────────── -->
    <EdSectionBand
      id="compare"
      num="02"
      color="var(--at-navy)"
      eyebrow="Comparing the options"
      title="Pros and cons of each journey"
      tone="surface"
      lede="The choice is between a single mediated integration and a set of bilateral ones. Option A adds a dependency on the API Hub in return for one connection, central validation and central reporting. Option B removes that dependency, but every LFI and ICP must integrate with each other."
    >
      <EdCompareCards>
        <EdCompareCard accent="var(--at-teal)" kicker="Option A" example="Via the API Hub">
          <h4 class="bp-pc bp-pc--pro">Pros</h4>
          <ul>
            <li>Every LFI in the UAE already has an mTLS connection with the API Hub, so ICP needs only one integration &mdash; with the API Hub &mdash; to have an mTLS-secured connection with every LFI.</li>
            <li>The API Hub can act as a central reporting layer: how many registration requests were made, how many succeeded, and how many identity verifications were performed, all held in one place.</li>
            <li>Every request is validated against one schema at the API Hub, so LFIs and ICP receive consistently shaped requests regardless of who sent them.</li>
            <li>Onboarding, certificates and role entitlement are governed through the existing Trust Framework rather than agreed bilaterally.</li>
            <li>Supports an optional discovery call, so ICP can check whether a <code>uaeKycId</code> is registered for BioPay at an LFI.</li>
          </ul>
          <h4 class="bp-pc bp-pc--con">Cons</h4>
          <ul>
            <li>An extra layer of technology that can fail: if the API Hub is unavailable, no customer can register.</li>
            <li>An extra network hop on identity verification, which adds latency while the customer is waiting in the LFI channel.</li>
            <li>Identity verification results and the <code>uaeKycId</code> pass through the API Hub, bringing it into scope for that data even though it stores none of it.</li>
            <li>Requires new endpoints, specification and build on the API Hub before registration can go live.</li>
          </ul>
        </EdCompareCard>
        <EdCompareCard accent="var(--at-navy)" kicker="Option B" example="Direct LFI ↔ ICP">
          <h4 class="bp-pc bp-pc--pro">Pros</h4>
          <ul>
            <li>Fewer moving parts: registration does not depend on the API Hub being available.</li>
            <li>Lower latency on identity verification, with one hop instead of two.</li>
            <li>Identity data travels only between the two parties that need it.</li>
            <li>No API Hub build is needed for registration.</li>
          </ul>
          <h4 class="bp-pc bp-pc--con">Cons</h4>
          <ul>
            <li>ICP must establish and maintain a separate mTLS-secured connection with every LFI, and every LFI must integrate with ICP &mdash; one bilateral integration per LFI.</li>
            <li>No central reporting: registration and identity verification volumes are spread across ICP and each LFI.</li>
            <li>No single point of request validation, so request shapes can drift between LFI implementations.</li>
            <li>Onboarding, certificates and entitlement sit outside the Trust Framework and must be managed bilaterally.</li>
            <li>No discovery call: ICP cannot check whether a <code>uaeKycId</code> is still registered at an LFI.</li>
          </ul>
        </EdCompareCard>
      </EdCompareCards>
    </EdSectionBand>

    <!-- 03 ─────────────────────────────────────────────────────────────── -->
    <EdSectionBand
      id="data"
      num="03"
      color="var(--at-gold)"
      eyebrow="Where registration is held"
      title="Each side keeps its own half"
      lede="This is the same in both options. The registration is split between the two parties that need it, and the API Hub keeps no copy."
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
      num="04"
      color="var(--at-blue-deep)"
      eyebrow="Who does what"
      title="Three actors, and what each is accountable for"
      tone="surface"
      lede="The LFI owns the registration journey and the instrument. ICP owns the identity and knows which LFI holds each customer. The API Hub routes between them and stores nothing about the registration."
    >
      <BpActorTable :actors="actors" />
    </EdSectionBand>
  </div>
</template>

<style scoped>
/* Subsection heading inside a section band — used for the two options. */
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

/* Pros / Cons labels inside each option's comparison card. */
.bp-pc {
  font-family: var(--at-mono);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin: 1.25rem 0 0.5rem;
}
.bp-pc:first-child { margin-top: 0; }
.bp-pc--pro { color: var(--at-teal); }
.bp-pc--con { color: var(--at-mute); }
</style>
