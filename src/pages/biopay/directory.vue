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
  { id: 'roles', label: 'Two new roles' },
  { id: 'bpip', label: 'The BPIP role' },
  { id: 'icp', label: 'The ICP role' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'ecosystem', label: 'How the roles connect' },
  { id: 'boundary', label: 'No other access' },
]

const meta: MetaItem[] = [
  { label: 'Status', value: 'Draft' },
  { label: 'New roles', value: '2' },
  { label: 'Version', value: '0.1' },
]

interface Role { name: string; heldBy: string; does: string; scopes: string }

const roles: Role[] = [
  {
    name: 'BPIP',
    heldBy: 'A licensed acquirer, or an entity acting under one',
    does: 'Takes the payment at the acceptance point: asks ICP to resolve the customer, then initiates the payment through the API Hub.',
    scopes: 'biometric-resolution, biometric-payments',
  },
  {
    name: 'ICP',
    heldBy: 'ICP, the government identity service',
    does: 'Verifies and resolves the customer’s identity, holds uaeKycId → LFI, and receives registration events.',
    scopes: 'biometric-discovery',
  },
]

interface Endpoint { method?: string; path: string; link?: string; note: string }

// The complete BPIP surface. Anything not on this list is closed to the role.
const bpipCalls: Endpoint[] = [
  {
    path: 'Customer resolution',
    note: 'Resolve a biometric capture to a uaeKycId and LFI, proxied by the API Hub to ICP. Operation proposed, not yet specified.',
  },
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
]

// The complete ICP surface as a client of the API Hub.
const icpCalls: Endpoint[] = [
  {
    method: 'POST',
    path: '/biometric-payments-discovery',
    link: '/biopay/registration/api-reference/biometric-payments-discovery',
    note: 'Check whether a uaeKycId is registered for BioPay at an LFI.',
  },
]

// What the API Hub calls on ICP. ICP implements these; it does not call them.
const icpImplements: Endpoint[] = [
  {
    path: 'Identity verification',
    note: 'Verify the customer during registration and return their uaeKycId (registration Option A). Operation proposed, not yet specified.',
  },
  {
    path: 'Customer resolution',
    note: 'Match a biometric capture and return the uaeKycId and LFI. Operation proposed, not yet specified.',
  },
  {
    method: 'POST',
    path: 'Registration event',
    link: '/biopay/registration/api-reference/event-notification',
    note: 'Receive a completed, changed or withdrawn registration.',
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
      lede="BioPay introduces two new participant roles: the <strong>Biometric Payment Initiation Provider (BPIP)</strong> and <strong>ICP</strong>. This page sets out what each role entitles its holder to, the endpoints it can reach or must implement, and the certificates it requires."
    />

    <EdInPageNav :sections="sections" />

    <!-- 01 ─────────────────────────────────────────────────────────────── -->
    <EdSectionBand
      id="roles"
      num="01"
      color="var(--at-teal)"
      eyebrow="Two new roles"
      title="Two new organisation types, inherited downwards"
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
          BPIP and ICP are proposed new organisation types in the Directory. Once each exists, its
          role is inherited downwards in the usual way: an organisation holding the role can create
          <strong>applications</strong> that carry it, those applications issue
          <strong>software statements</strong> asserting it, and the <strong>clients</strong>
          registered from those software statements are entitled by it. Nothing further has to be
          assigned at the client level &mdash; a client created under a BPIP application is a BPIP
          client, and likewise for ICP.
        </p>
        <p>
          The two roles are distinct and MUST NOT be combined in one application. A BPIP cannot
          resolve an identity itself, and ICP cannot initiate a payment.
        </p>
      </EdProse>

      <EdNote type="info" title="One grant type">
        <p>
          Clients of both roles use <code>client_credentials</code> only, over mTLS. There is no
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
        submits card authorisations to Jaywan, and settles with the merchant.
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
      id="icp"
      num="03"
      color="var(--at-teal)"
      eyebrow="The ICP role"
      title="The complete ICP surface"
      lede="ICP is both a client of the API Hub and a party the Hub calls. The role entitles its clients to the operations it calls, and requires it to implement the operations the Hub calls on it."
    >
      <EdProse>
        <strong>ICP</strong> is held by the government identity service. It verifies the
        customer&rsquo;s identity at registration, holds <code>uaeKycId</code> &rarr; LFI, and
        resolves a biometric capture to a <code>uaeKycId</code> and LFI when a BPIP asks.
      </EdProse>

      <h3 class="bp-sub">Operations ICP calls</h3>
      <EdBullets accent="var(--at-teal)">
        <li v-for="e in icpCalls" :key="(e.method ?? '') + e.path">
          <template v-if="e.method"><code>{{ e.method }} </code></template>
          <RouterLink v-if="e.link" :to="e.link"><code>{{ e.path }}</code></RouterLink>
          <strong v-else>{{ e.path }}</strong>
          &mdash; {{ e.note }}
        </li>
      </EdBullets>

      <h3 class="bp-sub">Operations ICP implements</h3>
      <EdBullets accent="var(--at-teal)">
        <li v-for="e in icpImplements" :key="(e.method ?? '') + e.path">
          <template v-if="e.method"><code>{{ e.method }} </code></template>
          <RouterLink v-if="e.link" :to="e.link">{{ e.path }}</RouterLink>
          <strong v-else>{{ e.path }}</strong>
          &mdash; {{ e.note }}
        </li>
      </EdBullets>

      <EdProse>
        The API Hub calls these over mTLS at endpoints ICP registers in the Directory, and is the
        only party that calls them. ICP MUST NOT accept these requests from any other source.
      </EdProse>
    </EdSectionBand>

    <!-- 04 ─────────────────────────────────────────────────────────────── -->
    <EdSectionBand
      id="certificates"
      num="04"
      color="var(--at-gold)"
      eyebrow="Certificates"
      title="Transport and signing, plus encryption for events"
      tone="surface"
    >
      <EdProse>
        BPIP and ICP applications require the same certificates as any other Directory participant,
        issued under the existing Trust Framework
        <RouterLink to="/tech/tpp-standards/trust-framework/certificates">certificate
        profiles</RouterLink>.
      </EdProse>

      <EdBullets accent="var(--at-gold)">
        <li>
          <strong>Transport certificate &mdash; required for both.</strong> Presented in the mTLS
          handshake on every call to the API Hub, and the certificate the access token is bound to.
          ICP also relies on mTLS to authenticate the API Hub when the Hub calls it.
        </li>
        <li>
          <strong>Signing certificate &mdash; required for both.</strong> Signs the client assertion
          used at the token endpoint, and the signed payloads the BioPay operations expect.
        </li>
        <li>
          <strong>Encryption certificate &mdash; required for ICP; required for a BPIP only if it
          implements webhooks.</strong> Events are delivered as a JWE encrypted with the public
          encryption certificate registered in the Directory, so only the holder of the
          corresponding private key can read them. ICP cannot receive registration events without
          one. A BPIP without one cannot receive payment status events and must poll instead.
        </li>
      </EdBullets>
    </EdSectionBand>

    <!-- 05 ─────────────────────────────────────────────────────────────── -->
    <EdSectionBand
      id="ecosystem"
      num="05"
      color="var(--at-teal)"
      eyebrow="How the roles connect"
      title="The same hub-and-spoke model, with new participants"
    >
      <EdProse>
        <p>
          In Open Finance today, many TPPs connect to the API Hub, and the API Hub connects to
          every LFI. No TPP connects to an LFI directly: every request goes to the Hub, and every
          response comes back from it.
        </p>
        <p>
          BioPay keeps that model. BPIPs join the TPPs on the left, the LFIs are unchanged on the
          right, and ICP joins above the Hub. Every TPP, every BPIP, every LFI and ICP connects only
          to the API Hub &mdash; a BPIP reaches ICP and the LFIs only through it, and a TPP cannot
          reach ICP at all. The BioPay picture
          assumes registration runs through the API Hub (registration Option A).
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

    <!-- 06 ─────────────────────────────────────────────────────────────── -->
    <EdSectionBand
      id="boundary"
      num="06"
      color="var(--at-navy)"
      eyebrow="No other access"
      title="Neither role reaches anything else in Open Finance"
      tone="surface"
    >
      <EdNote type="warning" title="Both roles are closed">
        <p>
          BPIP and ICP clients have <strong>no access to any other Open Finance service</strong>.
          They cannot create or read consents, cannot call the Data Sharing, Service Initiation,
          Confirmation of Payee, Products and Leads or Insurance APIs, and cannot obtain a token
          bearing any scope beyond those listed for their role. The entitlement is enforced at the
          API Hub, which rejects a request whose client does not carry the right role before
          anything is proxied to ICP or an LFI.
        </p>
      </EdNote>
    </EdSectionBand>
  </div>
</template>

<style scoped>
/* Subsection heading inside a section band. */
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
