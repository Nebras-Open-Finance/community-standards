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

useHead({ title: 'Directory · BioPay' })

interface Section { id: string; label: string }
interface MetaItem { label: string; value: string }

const sections: Section[] = [
  { id: 'role', label: 'The BPIP role' },
  { id: 'endpoints', label: 'Entitled endpoints' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'boundary', label: 'No other access' },
]

const meta: MetaItem[] = [
  { label: 'Status', value: 'Draft' },
  { label: 'New roles', value: '1' },
  { label: 'Version', value: '0.1' },
]

interface Endpoint { method: string; path: string; link: string; note: string }

// The complete BPIP surface. Anything not on this list is closed to the role.
const endpoints: Endpoint[] = [
  {
    method: 'POST',
    path: '/biometric-payments-discovery',
    link: '/biopay/registration/api-reference/biometric-payments-discovery',
    note: 'Discover a customer’s BioPay registration.',
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
</script>

<template>
  <div class="ed-page">
    <EdBackStrip href="/biopay/" text="BioPay overview" />

    <EdHero
      eyebrow="BioPay · Draft"
      eyebrow-color="var(--at-blue-deep)"
      title="Directory"
      :meta="meta"
      lede="BioPay introduces one new participant role: the <strong>Biometric Payment Initiation Provider (BPIP)</strong>. This page sets out what the role entitles its holder to, the certificates it requires, and the endpoints it can reach."
    />

    <EdInPageNav :sections="sections" />

    <!-- 01 ─────────────────────────────────────────────────────────────── -->
    <EdSectionBand
      id="role"
      num="01"
      color="var(--at-teal)"
      eyebrow="The BPIP role"
      title="A new organisation type, inherited downwards"
    >
      <EdProse>
        <p>
          <strong>BPIP</strong> &mdash; Biometric Payment Initiation Provider &mdash; is a proposed
          new organisation type in the Directory, held by an entity specifically authorised to
          initiate biometric payments. In the first instance that entity is ICP.
        </p>
        <p>
          Once the organisation type exists, the role is inherited downwards in the usual way: an
          organisation holding BPIP can create <strong>applications</strong> that carry the role,
          those applications issue <strong>software statements</strong> asserting it, and the
          <strong>clients</strong> registered from those software statements are entitled by it.
          Nothing further has to be assigned at the client level &mdash; a client created under a
          BPIP application is a BPIP client.
        </p>
      </EdProse>

      <EdNote type="info" title="One grant type">
        <p>
          A BPIP client uses <code>client_credentials</code> only. There is no redirect journey to
          run: no PSU at the authorisation endpoint, no consent to authorise, and no refresh token
          to hold.
        </p>
      </EdNote>
    </EdSectionBand>

    <!-- 02 ─────────────────────────────────────────────────────────────── -->
    <EdSectionBand
      id="endpoints"
      num="02"
      color="var(--at-blue-deep)"
      eyebrow="Entitled endpoints"
      title="The complete BPIP surface"
      tone="surface"
      lede="The BPIP role entitles its clients to the endpoints in this section, and to nothing else."
    >
      <EdBullets accent="var(--at-blue-deep)">
        <li v-for="e in endpoints" :key="e.method + e.path">
          <code>{{ e.method }} </code><RouterLink :to="e.link"><code>{{ e.path }}</code></RouterLink>
          &mdash; {{ e.note }}
        </li>
      </EdBullets>

      <EdProse>
        A BPIP client may also <strong>receive</strong> events from the API Hub &mdash; the
        <RouterLink to="/biopay/registration/api-reference/event-notification">registration
        event</RouterLink> and the payment status event &mdash; at an endpoint it registers in the
        Directory. Those are delivered to the BPIP; they are not endpoints the BPIP calls.
      </EdProse>
    </EdSectionBand>

    <!-- 03 ─────────────────────────────────────────────────────────────── -->
    <EdSectionBand
      id="certificates"
      num="03"
      color="var(--at-gold)"
      eyebrow="Certificates"
      title="Transport and signing, plus encryption for webhooks"
    >
      <EdProse>
        A BPIP application requires the same certificates as any other Directory participant,
        issued under the existing Trust Framework
        <RouterLink to="/tech/tpp-standards/trust-framework/certificates">certificate
        profiles</RouterLink>.
      </EdProse>

      <EdBullets accent="var(--at-gold)">
        <li>
          <strong>Transport certificate &mdash; required.</strong> Presented in the mTLS handshake
          on every call to the API Hub, and the certificate the access token is bound to.
        </li>
        <li>
          <strong>Signing certificate &mdash; required.</strong> Signs the client assertion used at
          the token endpoint, and the signed payloads the BioPay endpoints expect.
        </li>
        <li>
          <strong>Encryption certificate &mdash; required if the BPIP implements webhooks.</strong>
          Events are delivered as a JWE encrypted with the public encryption certificate registered
          in the Directory, so only the holder of the corresponding private key can read them.
          Without one the API Hub has no key to encrypt to and cannot deliver events &mdash; the
          BPIP would have to track payment status by polling instead.
        </li>
      </EdBullets>
    </EdSectionBand>

    <!-- 04 ─────────────────────────────────────────────────────────────── -->
    <EdSectionBand
      id="boundary"
      num="04"
      color="var(--at-navy)"
      eyebrow="No other access"
      title="BPIP reaches nothing else in Open Finance"
      tone="surface"
    >
      <EdNote type="warning" title="The role is closed">
        <p>
          A BPIP client has <strong>no access to any other Open Finance service</strong>. It cannot
          create or read consents, cannot call the Data Sharing, Service Initiation, Confirmation of
          Payee, Products and Leads or Insurance APIs, and cannot obtain a token bearing any scope
          beyond the BioPay one. The entitlement is enforced at the API Hub, which rejects a request
          whose client does not carry BPIP before anything is proxied to an LFI.
        </p>
      </EdNote>
    </EdSectionBand>
  </div>
</template>
