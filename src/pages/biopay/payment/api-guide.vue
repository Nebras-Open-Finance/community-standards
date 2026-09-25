<route lang="yaml">
meta:
  layout: biopay
  title: Payment — API Guide
  next: false
  prev: false
  aside: false
</route>

<script setup lang="ts">
import { useHead } from '@unhead/vue'
import BpPaymentFlow from '@/components/biopay/BpPaymentFlow.vue'

useHead({ title: 'Payment — API Guide · BioPay' })

interface Section { id: string; label: string }
interface MetaItem { label: string; value: string }

const sections: Section[] = [
  { id: 'sequence', label: 'Sequence Diagram' },
  { id: 'token', label: 'Access token' },
  { id: 'create', label: 'Create payment' },
  { id: 'execution', label: 'The LFI makes the payment' },
  { id: 'patch', label: 'Patching the Payment Status' },
  { id: 'status', label: 'Event and polling' },
]

const meta: MetaItem[] = [
  { label: 'Status', value: 'Draft' },
  { label: 'Grant type', value: 'client_credentials' },
  { label: 'Version', value: '0.1' },
]

interface Rail { instrument: string; creditor: string; addressed: string; note: string }

// One initiation endpoint, one creditor schema per payment rail. Which applies is
// decided by the rail the customer registered, which discovery returns. The set is
// open (AANI, CBDC, Jaywan, ...) - further rails get their own creditor schema.
const rails: Rail[] = [
  {
    instrument: 'AANI',
    creditor: 'AEAaniCreditor',
    addressed: 'IBAN, AANI alias, mobile number or Emirates ID',
    note: 'Account-to-account. Creditor agent identified by BIC where the alias does not resolve it.',
  },
  {
    instrument: 'CBDC',
    creditor: 'AECbdcCreditor',
    addressed: 'Wallet identifier',
    note: 'Digital Dirham. Wallet addressing is a placeholder pending the scheme definition.',
  },
  {
    instrument: 'JAYWAN',
    creditor: 'AEJaywanCreditor',
    addressed: 'Acquirer, merchant and terminal identifiers',
    note: 'Domestic card scheme. Field set is a first cut and needs validating against the scheme’s own message definition.',
  },
]

interface PaymentStatus { value: string; meaning: string; terminal: string }

// Deliberately the published payments vocabulary, not a BioPay-specific one.
const statuses: PaymentStatus[] = [
  {
    value: 'Pending',
    meaning: 'Set by the Hub on creation. The LFI has accepted the instruction but the rail has not responded.',
    terminal: 'No',
  },
  {
    value: 'AcceptedWithoutPosting',
    meaning: 'The rail has accepted the payment; the debtor account has not yet been posted.',
    terminal: 'Yes',
  },
  {
    value: 'Accepted',
    meaning: 'The payment has settled on the rail.',
    terminal: 'Yes',
  },
  {
    value: 'Rejected',
    meaning: 'The LFI or the rail refused the payment. StatusReason carries why.',
    terminal: 'Yes',
  },
]
</script>

<template>
  <div class="ed-page">
    <EdBackStrip href="/biopay/" text="BioPay overview" />

    <EdHero
      eyebrow="BioPay · Payment · Draft"
      eyebrow-color="var(--at-navy)"
      title="Payment API Guide"
      :meta="meta"
      lede="How a biometric identification becomes a payment: the initiator takes a token, creates the payment, and the LFI executes it on the rail and patches the outcome back to the API Hub. That patch is what the initiator then learns by event or by polling. No consent, no redirect, no PSU at the authorisation endpoint."
    />

    <EdInPageNav :sections="sections" />

    <!-- 01 ─────────────────────────────────────────────────────────────── -->
    <EdSectionBand
      id="sequence"
      num="01"
      color="var(--at-teal)"
      eyebrow="Sequence Diagram"
      title="The payment flow end to end"
      tone="surface"
      lede="Click the diagram to expand it."
    >
      <APIFlowViewer
        title="BioPay — payment"
        eyebrow="Payment flow"
      >
        <BpPaymentFlow />
      </APIFlowViewer>

      <EdNote type="info" title="Where this guide starts">
        <p>
          The capture, the match and the resolution to an ICP user identifier all happen outside
          the Open Finance boundary and are not API operations. The registration that must
          already exist, and the discovery call that confirms it is still usable, are covered on
          the <RouterLink to="/biopay/registration/api-guide">Registration API Guide</RouterLink>.
          This guide picks up at the token endpoint.
        </p>
      </EdNote>
    </EdSectionBand>

    <!-- 02 ─────────────────────────────────────────────────────────────── -->
    <EdSectionBand
      id="token"
      num="02"
      color="var(--at-blue-deep)"
      eyebrow="Access token"
      title="A token with no PSU in the loop"
    >
      <EdProse>
        The initiator obtains an access token under <code>client_credentials</code>, using its
        BPIP client. There is no PAR, no authorisation request, no redirect and no refresh
        token: the customer&rsquo;s authority was established once, at registration, and is held
        by the API Hub. Nothing about the token is tied to a particular customer or a particular
        payment &mdash; it authenticates the initiator, and the authority to debit comes from the
        registration the Hub already holds.
      </EdProse>

      <EdProse>
        The request is made over mutual TLS with the transport certificate registered in the
        Directory, and authenticated with a client assertion signed by the signing certificate
        &mdash; the same
        <RouterLink to="/tech/tpp-standards/trust-framework/certificates">certificate
        profiles</RouterLink> every other participant uses. The token is bound to that transport
        certificate, so a token replayed from a different connection is rejected. The scope is
        the BioPay scope and nothing else; a BPIP client cannot obtain a token bearing any other.
        See <RouterLink to="/biopay/directory">Directory</RouterLink> for what the role entitles.
      </EdProse>

      <EdProse>
        Tokens are reused across payments for their lifetime rather than fetched per payment
        &mdash; at an acceptance point the round trip matters, and there is nothing
        customer-specific in the token to invalidate it between customers. The initiator SHOULD
        refresh ahead of expiry rather than on a <code>401</code>, and MUST NOT treat a cached
        token as evidence that a registration is still live: that is what discovery is for.
      </EdProse>

      <EdNote type="info" title="Addressed per LFI">
        <p>
          The token endpoint is the LFI-scoped authorisation server
          (<code>auth1.{lfiCode}</code>), but the initiator does not compose that host itself. It
          resolves the token endpoint from the <code>DiscoveryEndpointUrl</code> the registration
          event delivered &mdash; the same way a Confirmation of Payee TPP does &mdash; and
          discovery returns that URL again on every call. A token taken from one LFI&rsquo;s
          authorisation server is not valid at another&rsquo;s, so an initiator serving customers
          across several LFIs holds a token per LFI.
        </p>
      </EdNote>
    </EdSectionBand>

    <!-- 03 ─────────────────────────────────────────────────────────────── -->
    <EdSectionBand
      id="create"
      num="03"
      color="var(--at-teal)"
      eyebrow="Create payment"
      title="Create Payment"
      tone="surface"
    >
      <EdProse>
        The initiator <code>POST</code>s to <code>/biometric-payments</code>, addressed at the
        <code>ResourceServerUrl</code> the discovery response returned &mdash; never at a URL the
        initiator composed itself. Discovery MUST have been called first: it is what confirms the
        registration has not been suspended, revoked or had its default instrument changed since
        the registration event, and it is what names the <code>PaymentInstrument</code> this
        request must be shaped to.
      </EdProse>

      <EdProse>
        <code>Data</code> carries the <code>IcpUserId</code>, the <code>PaymentInstrument</code>,
        the <code>Instruction</code> (identifiers, amount and any remittance information), the
        <code>Creditor</code> shaped to that instrument, and the
        <code>BiometricAssurance</code>. <code>Risk</code> carries the
        <code>PaymentContextCode</code> and the merchant and terminal context. There is no debtor
        account in the request: the Hub resolves it from the registration, and the initiator
        never learns it.
      </EdProse>

      <EdProse>
        <code>BiometricAssurance</code> is ICP&rsquo;s assertion about the identification it
        performed &mdash; the match method, the time of the match, and ICP&rsquo;s own
        transaction reference. It is the evidence set for non-repudiation and dispute handling.
        It carries no biometric, no template and no match score, and the boundary holds here:
        nothing that could reconstruct the identification crosses into Open Finance.
      </EdProse>

      <EdProse>
        The request carries <code>x-idempotency-key</code>, a detached
        <code>x-jws-signature</code> over the body, and the usual
        <code>x-fapi-interaction-id</code> and <code>x-fapi-auth-date</code> &mdash;
        <code>x-fapi-auth-date</code> being the time of the biometric identification at ICP. The
        Hub validates entitlement, signature, schema and idempotency, resolves the LFI from the
        registration, and proxies to that LFI&rsquo;s Ozone Connect.
      </EdProse>

      <EdCallout color="var(--at-teal)">
        <p>
          <strong>The response is always <code>201</code> with <code>Status: Pending</code>.</strong>
          It confirms the payment was created, not that money moved. Execution on the rail is
          asynchronous and the outcome arrives later, by the LFI&rsquo;s patch. An acceptance
          point that treats <code>201</code> as settlement is reading it wrong; what it can
          safely tell the customer at that moment is that the payment has been accepted for
          execution.
        </p>
      </EdCallout>

      <EdProse>
        The idempotency key is what makes that <code>201</code> safe to lose. A replay of the
        same key with an identical body returns the original resource and the same
        <code>201</code>, not a second payment; the same key with a different body is rejected
        <code>409</code>. An initiator standing at a till with no response has two safe options
        &mdash; query by the key it generated, or retry with the same key. It MUST NOT retry with
        a fresh key, and MUST retain the key long enough to recover.
      </EdProse>

      <EdRelatedCards eyebrow="Read alongside" title="API Reference">
        <EdRelatedCard
          href="/biopay/payment/api-reference/biometric-payments"
          category="API Reference"
          category-color="var(--at-teal)"
          title="POST /biometric-payments"
          desc="Request, response and error schemas for payment initiation."
        />
      </EdRelatedCards>
    </EdSectionBand>

    <!-- 04 ─────────────────────────────────────────────────────────────── -->
    <EdSectionBand
      id="execution"
      num="04"
      color="var(--at-navy)"
      eyebrow="LFI"
      title="The LFI makes the payment"
    >
      <EdProse>
        The LFI receives the proxied request at its Ozone Connect
        <RouterLink to="/biopay/payment/api-reference/biometric-payments"><code>POST
        /biometric-payments</code></RouterLink> endpoint. It does not re-validate the
        registration or the initiator&rsquo;s entitlement &mdash; the Hub has already done both,
        and the LFI trusts it for that, exactly as it does for token and consent validation
        elsewhere in Open Finance. What the LFI owns is execution: resolving the registered
        instrument to the funding account, running its own fraud, risk and balance checks, and
        deciding whether to debit.
      </EdProse>

      <EdProse>
        The LFI is the final authority on the debit. A payment the Hub validated can still be
        refused here &mdash; insufficient funds, a risk decision, a limit &mdash; and that
        refusal is reported the same way a rail rejection is, by patching the payment to
        <code>Rejected</code> with a <code>StatusReason</code>.
      </EdProse>

      <EdProse>
        Execution runs on whichever rail the customer registered. The rail decides the shape of
        the creditor details the initiator sent, and it decides how long the outcome takes to
        arrive &mdash; which is why the payment is created <code>Pending</code> rather than the
        LFI holding the request open until the rail answers.
      </EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Creditor schema</th>
              <th>Creditor addressed by</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="r in rails" :key="r.instrument">
              <td><strong><code>{{ r.instrument }}</code></strong></td>
              <td><code>{{ r.creditor }}</code></td>
              <td>{{ r.addressed }}</td>
              <td>{{ r.note }}</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>
        The initiator integrates once against one initiation endpoint; each rail keeps its own
        message shape, and further rails are added by giving them a creditor schema rather than
        an endpoint of their own.
      </EdProse>
    </EdSectionBand>

    <!-- 05 ─────────────────────────────────────────────────────────────── -->
    <EdSectionBand
      id="patch"
      num="05"
      color="var(--at-gold)"
      eyebrow="LFI → API Hub"
      title="Patching the Payment Status"
      tone="surface"
    >
      <EdProse>
        Once the LFI knows how the rail responded it patches the outcome to the API Hub, at
        <code>PATCH /biometrics-payment-log/{id}</code>. This is the only way a payment
        moves out of <code>Pending</code>: the Hub is the source of truth for payment state, and
        nothing the initiator calls can change it. An LFI that executes a payment but never
        patches leaves the initiator polling a payment that stays <code>Pending</code> forever.
      </EdProse>

      <EdProse>
        The body is small &mdash; the <code>Status</code>, optionally the
        <code>StatusUpdateDateTime</code> at which the LFI observed it, the
        <code>RailReference</code> recording how the payment was represented on the rail that
        executed it, and a <code>StatusReason</code> where the payment was rejected. The
        instruction, the creditor and the biometric assurance were fixed at creation and cannot
        be patched. The Hub answers <code>204</code>.
      </EdProse>

      <EdProse>
        One patch is the normal case &mdash; straight from <code>Pending</code> to
        <code>Accepted</code>, <code>AcceptedWithoutPosting</code> or <code>Rejected</code>. An
        LFI MAY patch more than once where the rail reports progress in stages, but MUST NOT
        patch a payment that has already reached a terminal status; the Hub answers
        <code>409</code>.
      </EdProse>

      <EdNote type="info" title="The same place the LFI already patches">
        <p>
          The operation is modelled on the published Consent Manager operation
          <RouterLink to="/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/payment-log-id"><code>PATCH
          /payment-log/{id}</code></RouterLink>, and is served at the same Consent Manager host
          (<code>cm.{lfiCode}</code>) rather than the <code>rs1.*</code> host the
          initiator-facing operations use. An LFI already integrated with Open Finance is
          therefore patching biometric payments the same way, and from the same place, as every
          other payment it executes.
        </p>
      </EdNote>

      <EdCallout color="var(--at-gold)">
        <p>
          <strong>The patch is what the initiator eventually sees.</strong> It is not
          bookkeeping. Recording the status, delivering the payment status event, and answering
          the initiator&rsquo;s polling are all the same fact, written once here. The
          <code>204</code> means the Hub holds the new status &mdash; not that the initiator has
          received it; event delivery happens asynchronously and its outcome does not affect that
          response.
        </p>
      </EdCallout>

      <EdRelatedCards eyebrow="Read alongside" title="API Reference">
        <EdRelatedCard
          href="/biopay/payment/api-reference/biometrics-payment-log"
          category="API Reference"
          category-color="var(--at-gold)"
          title="PATCH /biometrics-payment-log"
          desc="Request body, status vocabulary and error responses for the LFI's payment log patch."
        />
      </EdRelatedCards>
    </EdSectionBand>

    <!-- 06 ─────────────────────────────────────────────────────────────── -->
    <EdSectionBand
      id="status"
      num="06"
      color="var(--at-blue-deep)"
      eyebrow="API Hub → BPIP"
      title="Event sent, and polling of payment status"
    >
      <EdProse>
        The status vocabulary is the published payments one, so BioPay does not introduce a
        second. Both routes below report the same four values, and both read the same record the
        LFI&rsquo;s patch wrote.
      </EdProse>

      <EdRefTable>
        <table>
          <thead>
            <tr>
              <th>Status</th>
              <th>Meaning</th>
              <th>Terminal</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="s in statuses" :key="s.value">
              <td><strong><code>{{ s.value }}</code></strong></td>
              <td>{{ s.meaning }}</td>
              <td>{{ s.terminal }}</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>

      <EdProse>
        <strong>The event.</strong> On recording the patch, the Hub delivers a payment status
        event to the endpoint the initiator registered in the Directory. It is an ordinary Open
        Finance webhook &mdash; the same signed envelope and the same <code>Data</code> /
        <code>Meta</code> split as the registration event, signed by the Hub and then encrypted
        to the initiator&rsquo;s encryption certificate, and delivered as a JWE. Respond
        <code>202</code> with an empty body first, then decrypt, verify the Hub&rsquo;s signature
        on the inner JWS, and process asynchronously. The Hub retries on any non-2xx. See
        <RouterLink to="/tech/tpp-standards/security/fapi/receiving-events">Receiving Event
        Notifications</RouterLink> for the full FAPI-aligned handling, and the
        <RouterLink to="/tech/tpp-standards/v2.1/webhooks/payment-status/api-guide">Payment
        Status Webhook</RouterLink> for the published event this one follows.
      </EdProse>

      <EdProse>
        <strong>The polling.</strong> <code>GET /biometric-payments/{PaymentId}</code> returns
        the current state of the payment, serving the status the LFI last patched. An initiator
        MAY use it alone, or alongside the event as a backstop. It is the route an initiator
        without an encryption certificate has to rely on, since without one the Hub has no key to
        encrypt an event to. The separate <code>GET /biometric-payments?IdempotencyKey</code>
        query is for recovery, not for tracking: it answers whether a payment was created at all
        when the <code>201</code> was lost.
      </EdProse>

      <EdCallout color="var(--at-blue-deep)">
        <p>
          <strong>What the till can say at each stage.</strong> On <code>201</code>: accepted,
          payment pending. On <code>AcceptedWithoutPosting</code> or <code>Accepted</code>:
          complete &mdash; the distinction is a settlement detail, not something the customer
          needs. On <code>Rejected</code>: not taken, fall back to another tender; the
          <code>StatusReason</code> is what tells the initiator whether another attempt is worth
          making. While <code>Pending</code>: nothing has failed, and the acceptance point
          decides from its own risk appetite whether to release goods before a terminal status
          arrives.
        </p>
      </EdCallout>

      <EdRelatedCards eyebrow="Read alongside" title="API Reference">
        <EdRelatedCard
          href="/biopay/payment/api-reference/biometric-payments-payment-id"
          category="API Reference"
          category-color="var(--at-blue-deep)"
          title="GET /biometric-payments/{PaymentId}"
          desc="Retrieving the current state of a payment."
        />
        <EdRelatedCard
          href="/biopay/registration/api-reference/event-notification"
          category="API Reference"
          category-color="var(--at-gold)"
          title="POST Event"
          desc="The registration event schema, whose envelope the payment status event shares."
        />
      </EdRelatedCards>
    </EdSectionBand>
  </div>
</template>
