<route lang="yaml">
meta:
  layout: biopay
  title: Directory
  next: false
  prev: false
  aside: false
</route>

<script setup lang="ts">
import { useHead } from '@unhead/vue'
import BpEcosystemDiagram from '@/components/biopay/BpEcosystemDiagram.vue'

useHead({ title: 'Directory · BioPay' })

interface Section { id: string; label: string }
interface MetaItem { label: string; value: string }

const sections: Section[] = [
  { id: 'roles', label: 'One new role' },
  { id: 'bpip', label: 'The BPIP role' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'ecosystem', label: 'How the roles connect' },
  { id: 'boundary', label: 'No other access' },
]

const meta: MetaItem[] = [
  { label: 'Status', value: 'Draft' },
  { label: 'New roles', value: '1' },
  { label: 'Version', value: '0.1' },
]

interface Role { name: string; heldBy: string; does: string; scopes: string }

const roles: Role[] = [
  {
    name: 'BPIP',
    heldBy: 'A licensed acquirer, or an entity acting under one',
    does: 'Takes the payment at the acceptance point: resolves the customer with ICP through the ICP SDK, then initiates the payment through the API Hub.',
    scopes: 'biometric-payments',
  },
]

interface Endpoint { method?: string; path: string; link?: string; note: string }

// The complete BPIP surface. Anything not on this list is closed to the role.
const bpipCalls: Endpoint[] = [
  {
    method: 'POST',
    path: '/biometric-payments',
    link: '/biopay/payment/api-reference/biometric-payments',
    note: 'Initiate a biometric payment.',
  },
  {
    method: 'GET',
    path: '/biometric-payments/{PaymentId}',
    link: '/biopay/payment/api-reference/biometric-payments-payment-id',
    note: 'Retrieve a payment by PaymentId.',
  },
  {
    method: 'GET',
    path: '/biometric-payments',
    link: '/biopay/payment/api-reference/biometric-payments-by-idempotency-key',
    note: 'Retrieve a payment by idempotency key.',
  },
  {
    method: 'POST',
    path: '/instrument-lookup',
    link: '/biopay/payment/api-reference/instrument-lookup',
    note: 'Look up the payment instrument the LFI holds for a uaeKycId. Card flow, Option 1 only.',
  },
]
</script>

<template>
  <div class="ed-page">
    <EdBackStrip href="/biopay/" text="BioPay overview" />

    <EdHero
      eyebrow="BioPay · Draft"
      eyebrow-color="var(--at-blue-deep)"
      title="Directory"
      :meta="meta"
      lede="BioPay introduces one new participant role: the <strong>Biometric Payment Initiation Provider (BPIP)</strong>. This page sets out what the role entitles its holder to, the endpoints it can reach, and the certificates it requires. ICP is not a Directory participant &mdash; BPIPs and LFIs reach it through the ICP SDK, outside the API Hub."
    />

    <EdInPageNav :sections="sections" />

    <!-- 01 ─────────────────────────────────────────────────────────────── -->
    <EdSectionBand
      id="roles"
      num="01"
      color="var(--at-teal)"
      eyebrow="One new role"
      title="One new organisation type, inherited downwards"
    >
      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Role</th>
              <th>Held by</th>
              <th>What it does</th>
              <th>Scopes</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="r in roles" :key="r.name">
              <td><strong>{{ r.name }}</strong></td>
              <td>{{ r.heldBy }}</td>
              <td>{{ r.does }}</td>
              <td><code>{{ r.scopes }}</code></td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>
        <p>
          BPIP is a proposed new organisation type in the Directory. Once it exists, the role is
          inherited downwards in the usual way: an organisation holding the role can create
          <strong>applications</strong> that carry it, those applications issue
          <strong>software statements</strong> asserting it, and the <strong>clients</strong>
          registered from those software statements are entitled by it. Nothing further has to be
          assigned at the client level &mdash; a client created under a BPIP application is a BPIP
          client.
        </p>
        <p>
          ICP has no role in the Directory. It is not a client of the API Hub and the Hub does not
          call it: registration and customer resolution both run directly against ICP through the
          ICP SDK.
        </p>
      </EdProse>

      <EdNote type="info" title="One grant type">
        <p>
          BPIP clients use <code>client_credentials</code> only, over mTLS. There is no
          redirect journey to run: no PSU at the authorisation endpoint, no consent to authorise,
          and no refresh token to hold.
        </p>
      </EdNote>
    </EdSectionBand>

    <!-- 02 ─────────────────────────────────────────────────────────────── -->
    <EdSectionBand
      id="bpip"
      num="02"
      color="var(--at-blue-deep)"
      eyebrow="The BPIP role"
      title="The complete BPIP surface"
      tone="surface"
      lede="The BPIP role entitles its clients to the operations in this section, and to nothing else."
    >
      <EdProse>
        <strong>BPIP</strong> &mdash; Biometric Payment Initiation Provider &mdash; is held by the
        merchant&rsquo;s acquirer, or an entity acting under one. It operates the acceptance point,
        resolves the customer with ICP through the ICP SDK, submits card authorisations to Jaywan,
        and settles with the merchant. Resolution is not an API Hub operation, so it is not listed
        here.
      </EdProse>

      <EdBullets accent="var(--at-blue-deep)">
        <li v-for="e in bpipCalls" :key="(e.method ?? '') + e.path">
          <template v-if="e.method"><code>{{ e.method }} </code></template>
          <RouterLink v-if="e.link" :to="e.link"><code>{{ e.path }}</code></RouterLink>
          <strong v-else>{{ e.path }}</strong>
          &mdash; {{ e.note }}
        </li>
      </EdBullets>

      <EdProse>
        A BPIP client also <strong>receives</strong> the payment status event from the API Hub at an
        endpoint it registers in the Directory. The event is delivered to the BPIP; it is not an
        endpoint the BPIP calls.
      </EdProse>
    </EdSectionBand>

    <!-- 03 ─────────────────────────────────────────────────────────────── -->
    <EdSectionBand
      id="certificates"
      num="03"
      color="var(--at-gold)"
      eyebrow="Certificates"
      title="Transport and signing, plus encryption for events"
    >
      <EdProse>
        BPIP applications require the same certificates as any other Directory participant,
        issued under the existing Trust Framework
        <RouterLink to="/tech/tpp-standards/trust-framework/certificates">certificate
        profiles</RouterLink>.
      </EdProse>

      <EdBullets accent="var(--at-gold)">
        <li>
          <strong>Transport certificate &mdash; required.</strong> Presented in the mTLS
          handshake on every call to the API Hub, and the certificate the access token is bound to.
        </li>
        <li>
          <strong>Signing certificate &mdash; required.</strong> Signs the client assertion
          used at the token endpoint, and the signed payloads the BioPay operations expect.
        </li>
        <li>
          <strong>Encryption certificate &mdash; required only if the BPIP implements
          webhooks.</strong> Events are delivered as a JWE encrypted with the public encryption
          certificate registered in the Directory, so only the holder of the corresponding private
          key can read them. A BPIP without one cannot receive payment status events and must poll
          instead.
        </li>
      </EdBullets>
    </EdSectionBand>

    <!-- 04 ─────────────────────────────────────────────────────────────── -->
    <EdSectionBand
      id="ecosystem"
      num="04"
      color="var(--at-teal)"
      eyebrow="How the roles connect"
      title="The same hub-and-spoke model, with new participants"
      tone="surface"
    >
      <EdProse>
        <p>
          In Open Finance today, many TPPs connect to the API Hub, and the API Hub connects to
          every LFI. No TPP connects to an LFI directly: every request goes to the Hub, and every
          response comes back from it.
        </p>
        <p>
          BioPay keeps that model for payments. BPIPs join the TPPs on the left and the LFIs are
          unchanged on the right. Every TPP, every BPIP and every LFI connects only to the API Hub
          &mdash; a BPIP reaches an LFI only through it.
        </p>
        <p>
          ICP sits outside this picture. LFIs call it through the ICP SDK at registration, and BPIPs
          call it through the ICP SDK to resolve the customer at payment; neither call passes
          through the API Hub.
        </p>
      </EdProse>

      <div class="bp-eco-pair">
        <figure class="bp-eco-fig">
          <figcaption>Open Finance today</figcaption>
          <BpEcosystemDiagram variant="today" />
        </figure>
        <figure class="bp-eco-fig">
          <figcaption>With BioPay</figcaption>
          <BpEcosystemDiagram variant="biopay" />
        </figure>
      </div>
    </EdSectionBand>

    <!-- 05 ─────────────────────────────────────────────────────────────── -->
    <EdSectionBand
      id="boundary"
      num="05"
      color="var(--at-navy)"
      eyebrow="No other access"
      title="The BPIP reaches nothing else in Open Finance"
    >
      <EdNote type="warning" title="The role is closed">
        <p>
          BPIP clients have <strong>no access to any other Open Finance service</strong>.
          They cannot create or read consents, cannot call the Data Sharing, Service Initiation,
          Confirmation of Payee, Products and Leads or Insurance APIs, and cannot obtain a token
          bearing any scope beyond <code>biometric-payments</code>. The entitlement is enforced at the
          API Hub, which rejects a request whose client does not carry the right role before
          anything is proxied to an LFI.
        </p>
      </EdNote>
    </EdSectionBand>
  </div>
</template>

<style scoped>
/* Before/after ecosystem diagrams, side by side on wide screens. */
.bp-eco-pair {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}
.bp-eco-fig {
  margin: 0;
  padding: 1rem 1.25rem 1.25rem;
  background: var(--at-bg-cream);
  border: 1px solid var(--at-grid-line-2);
}
.bp-eco-fig figcaption {
  font-family: var(--at-mono);
  font-size: 0.66rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--at-teal-deep);
  margin-bottom: 0.75rem;
}
</style>
