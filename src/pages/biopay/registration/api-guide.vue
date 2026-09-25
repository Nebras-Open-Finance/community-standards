<route lang="yaml">
meta:
  layout: biopay
  title: Registration — API Guide
  next: false
  prev: false
  aside: false
</route>

<script setup lang="ts">
import { useHead } from '@unhead/vue'
import BpRegistrationFlow from '@/components/biopay/BpRegistrationFlow.vue'

useHead({ title: 'Registration — API Guide · BioPay' })

interface Section { id: string; label: string }
interface MetaItem { label: string; value: string }

const sections: Section[] = [
  { id: 'sequence', label: 'Sequence Diagram' },
  { id: 'lfi-to-hub', label: 'Posting the registration' },
  { id: 'event', label: 'The registration event' },
  { id: 'discovery', label: 'Discovery' },
  { id: 'open', label: 'Open items' },
]

const meta: MetaItem[] = [
  { label: 'Status', value: 'Draft' },
  { label: 'Endpoints', value: '2 initiator-facing' },
  { label: 'Version', value: '0.1' },
]

</script>

<template>
  <div class="ed-page">
    <EdBackStrip href="/biopay/" text="BioPay overview" />

    <EdHero
      eyebrow="BioPay · Registration · Draft"
      eyebrow-color="var(--at-gold)"
      title="Registration API Guide"
      :meta="meta"
      lede="The API calls that follow a completed registration. Identity verification and instrument selection happen in the LFI&rsquo;s own channel with no API involved &mdash; this guide starts once that is done: the LFI posts the registration to the API Hub, the Hub notifies the BPIP, and the BPIP queries discovery from then on."
    />

    <EdInPageNav :sections="sections" />

    <!-- 01 ─────────────────────────────────────────────────────────────── -->
    <EdSectionBand
      id="sequence"
      num="01"
      color="var(--at-teal)"
      eyebrow="Sequence Diagram"
      title="The registration flow end to end"
      tone="surface"
      lede="Click the diagram to expand it."
    >
      <APIFlowViewer
        title="BioPay — registration"
        eyebrow="Registration flow"
      >
        <BpRegistrationFlow />
      </APIFlowViewer>

      <EdNote type="info" title="Where this guide starts">
        <p>
          The customer&rsquo;s journey in the LFI channel &mdash; identity verification and
          instrument selection &mdash; is covered on
          <RouterLink to="/biopay/registration/user-experience">User Experience</RouterLink>.
          Everything from the LFI&rsquo;s call to the API Hub onwards is described below.
        </p>
      </EdNote>
    </EdSectionBand>

    <!-- 02 ─────────────────────────────────────────────────────────────── -->
    <EdSectionBand
      id="lfi-to-hub"
      num="02"
      color="var(--at-blue-deep)"
      eyebrow="LFI → API Hub"
      title="Posting the completed registration"
    >
      <EdProse>
        The registration itself happens in the LFI&rsquo;s own channel. Once the customer&rsquo;s
        identity has been verified and they have chosen an instrument, the LFI posts the finished
        registration to the API Hub. That call is what brings the binding into Open Finance:
        before it, nothing outside the LFI knows the customer has a payment capability.
      </EdProse>

      <EdProse>
        The LFI calls with its own LFI-role client over mutual TLS with application-layer
        authentication, under <code>client_credentials</code>. It sends the ICP user identifier,
        the instrument or instruments the customer selected and which of them is the default. The
        Hub stores that against the LFI and returns a <code>RegistrationId</code>. It holds no
        biometric, no template, no account number and no card number &mdash; only the identifier,
        the LFI that holds the customer, and what may be spent from.
      </EdProse>

      <EdProse>
        The same call is how a registration changes later: a new default instrument, a suspension
        or a withdrawal is posted by the LFI, and each becomes a further event to the BPIP.
      </EdProse>

      <EdNote type="info" title="Not in the API Reference">
        <p>
          This call runs LFI &rarr; API Hub, so it sits outside the initiator-facing API
          Reference. It is documented here and on
          <RouterLink to="/biopay/technical-architecture">Technical Architecture</RouterLink>.
        </p>
      </EdNote>
    </EdSectionBand>

    <!-- 03 ─────────────────────────────────────────────────────────────── -->
    <EdSectionBand
      id="event"
      num="03"
      color="var(--at-gold)"
      eyebrow="API Hub → BPIP"
      title="The registration event"
      tone="surface"
    >
      <EdProse>
        Once the Hub has stored the registration it notifies the BPIP at the event endpoint the
        BPIP registered in the Directory. This is how the BPIP learns that an identity it can
        recognise now has a payment capability, and where to address that identity&rsquo;s later
        calls. The BPIP implements this endpoint; every other operation in this guide runs the
        other way.
      </EdProse>

      <EdProse>
        It is an ordinary Open Finance webhook rather than a BioPay-specific notification: the
        same signed envelope and the same <code>Data</code> / <code>Meta</code> split as the
        payment status and consent status events. <code>Meta</code> carries the
        <code>EventType</code> &mdash; <code>Resource.Created</code>,
        <code>Resource.Updated</code> or <code>Resource.Deleted</code> &mdash; with the
        <code>RegistrationId</code> and <code>EventDateTime</code>. <code>Data</code> is the
        registration as it now stands, in the same shape discovery returns it, so a suspension is
        an update carrying the new <code>RegistrationStatus</code> rather than an event type of
        its own.
      </EdProse>

      <EdNote type="info" title="Delivered as a JWE">
        <p>
          The event is signed by the API Hub and then encrypted to the BPIP&rsquo;s encryption
          certificate registered in the Trust Framework, and delivered as a JWE compact
          serialisation with the Content Type <code>application/jwe</code> &mdash; exactly as the
          published webhooks are. Respond <code>202</code> with an empty body first, then decode
          the JWE header to select the right private key by <code>kid</code>, decrypt, and verify
          the Hub&rsquo;s signature on the inner JWS before acting on the contents. The Hub
          retries on any non-2xx. See
          <RouterLink to="/tech/tpp-standards/security/fapi/receiving-events">Receiving Event
          Notifications</RouterLink> for the full FAPI-aligned handling; the
          <code>application/json</code> schema in the API Reference is the payload you get after
          decryption, not what arrives on the wire.
        </p>
      </EdNote>

      <EdCallout color="var(--at-gold)">
        <p>
          <strong>The event carries the routing.</strong> Token, discovery and payment endpoints
          are all addressed per LFI, and the event&rsquo;s <code>Data</code> is where the BPIP
          gets them &mdash; <code>DiscoveryEndpointUrl</code> and <code>ResourceServerUrl</code>,
          rather than an <code>lfiCode</code> to compose hosts from. A BPIP that loses this event
          loses the ability to transact for that customer until it reconciles, so event delivery
          is not a convenience here &mdash; it is part of the integration. Discovery returns the
          same <code>Data</code> again on every call, so the routing is re-confirmed rather than
          cached indefinitely.
        </p>
      </EdCallout>
    </EdSectionBand>

    <!-- 04 ─────────────────────────────────────────────────────────────── -->
    <EdSectionBand
      id="discovery"
      num="04"
      color="var(--at-navy)"
      eyebrow="BPIP → API Hub"
      title="Discovery"
    >
      <EdProse>
        Discovery resolves an ICP user identifier to the registration the Hub holds for it:
        whether it is live, which instruments the customer selected and which is the default, and
        the endpoints at which the BPIP obtains a token for &mdash; and then calls &mdash; the LFI
        holding it. The Hub answers from its own registration store; this call is not proxied to
        the LFI.
      </EdProse>

      <EdProse>
        The BPIP calls it before every payment, even though it already holds the same
        <code>Data</code> from the registration event, because a registration may have been
        suspended, revoked or had its default instrument changed since. The payment is then
        addressed at the <code>ResourceServerUrl</code> discovery returned, never at a URL the
        BPIP composed itself.
      </EdProse>

      <EdProse>
        It follows the published Confirmation of Payee <code>/discovery</code> pattern, so BioPay
        introduces no second discovery mechanism. Request and response are both signed JWTs sent
        as <code>application/jwt</code> &mdash; the signature <em>is</em> the body, so this
        operation carries no detached <code>x-jws-signature</code> header. The request&rsquo;s
        <code>message</code> holds the identifier to resolve; the response&rsquo;s holds the
        resolved registration. Signing the request is also what lets the identifier travel in a
        body rather than a query string, keeping it out of access and proxy logs &mdash; which is
        why this is a <code>POST</code>.
      </EdProse>

      <EdProse>
        An identifier with no registration is not an error: the Hub answers <code>200</code> with
        a <code>RegistrationStatus</code> of <code>NotRegistered</code> and the routing fields
        absent. A request whose JWT cannot be verified is rejected with the <code>JWS.*</code>
        error codes the Confirmation of Payee standard already defines.
      </EdProse>
    </EdSectionBand>

    <!-- 05 ────────────────────────────────────────────────────────────── -->
    <EdSectionBand
      id="open"
      num="05"
      color="var(--at-gold)"
      eyebrow="Open items"
      title="What this page does not yet answer"
      tone="surface"
    >
      <EdBullets accent="var(--at-gold)">
        <li>
          <strong>There is nowhere for a BPIP to subscribe to webhooks.</strong> Elsewhere in Open
          Finance a TPP opts in per consent &mdash; the payment status event is requested with
          <code>subscription.Webhook.IsActive</code> on the consent itself. BioPay has no consent,
          so the registration event has no subscription to hang off: the Hub delivers to the
          endpoint the BPIP registered in the Directory, or it delivers nowhere. That leaves the
          question of whether every BPIP must therefore be required to implement and correctly
          handle webhooks as a condition of holding the role, or whether some opt-in and a
          non-event way to learn of a registration are needed instead.
        </li>
      </EdBullets>
    </EdSectionBand>

    <EdRelatedCards
      eyebrow="Schemas"
      eyebrow-color="var(--at-gold)"
      title="API Reference"
    >
      <EdRelatedCard
        href="/biopay/registration/api-reference/biometric-payments-discovery"
        category="API Reference"
        category-color="var(--at-navy)"
        title="POST /biometric-payments-discovery"
        desc="Signed request, signed response and error schemas for the discovery endpoint."
      />
      <EdRelatedCard
        href="/biopay/registration/api-reference/event-notification"
        category="API Reference"
        category-color="var(--at-gold)"
        title="POST Event"
        desc="The registration event schema the BPIP implements."
      />
      <EdRelatedCard
        href="/tech/tpp-standards/v2.1/webhooks/payment-status/api-guide"
        category="Open Finance"
        category-color="var(--at-blue-deep)"
        title="Payment Status Webhook"
        desc="The published webhook whose envelope, Data and Meta structure this event follows."
      />
    </EdRelatedCards>
  </div>
</template>
