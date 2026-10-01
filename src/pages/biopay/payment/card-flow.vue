<route lang="yaml">
meta:
  layout: biopay
  title: Payment — Jaywan / Card Flow
  next: false
  prev: false
  aside: false
</route>

<script setup lang="ts">
import { useHead } from '@unhead/vue'
import BpCardFlow from '@/components/biopay/BpCardFlow.vue'

useHead({ title: 'Payment — Jaywan / Card Flow · BioPay' })

interface Section { id: string; label: string }
interface MetaItem { label: string; value: string }

const sections: Section[] = [
  { id: 'problem', label: 'Why cards differ' },
  { id: 'options', label: 'Architecture options' },
  { id: 'compare', label: 'Comparing the options' },
  { id: 'open', label: 'Open questions' },
]

const meta: MetaItem[] = [
  { label: 'Status', value: 'Draft' },
  { label: 'Options', value: '3' },
  { label: 'Version', value: '0.1' },
]
</script>

<template>
  <div class="ed-page">
    <EdBackStrip href="/biopay/payment/technical-architecture" text="Payment technical architecture" />

    <EdHero
      eyebrow="BioPay · Payment · Draft"
      eyebrow-color="var(--at-navy)"
      title="Jaywan / Card Flow"
      :meta="meta"
      lede="How a BioPay payment works when the customer&rsquo;s registered instrument is a card, so that paying with a biometric feels like tapping a card or phone today. <strong>Everything here is draft</strong> &mdash; three options are set out for review."
    />

    <EdInPageNav :sections="sections" />

    <!-- 01 ─────────────────────────────────────────────────────────────── -->
    <EdSectionBand
      id="problem"
      num="01"
      color="var(--at-navy)"
      eyebrow="Why cards differ"
      title="A card payment is pulled by the merchant, not pushed by the payer"
    >
      <EdProse>
        <p>
          An account-to-account payment (AANI/IPP) is pushed by the payer&rsquo;s side: the BPIP
          asks the LFI, through the API Hub, to pay the merchant, and the LFI sends the funds. A
          card payment works the other way round. The terminal sends an authorisation request to
          the merchant&rsquo;s acquirer, which routes it through Jaywan to the issuer &mdash; the
          LFI &mdash; and the issuer approves or declines. Clearing and settlement follow through
          the scheme, and the acquirer pays the merchant.
        </p>
        <p>
          In BioPay the BPIP is the merchant&rsquo;s acquirer, or acts under one. It operates the
          acceptance point, submits card authorisations to Jaywan itself, and settles with the
          merchant. The same BPIP names the merchant&rsquo;s creditor account for AANI/IPP, so it
          can take a payment on either rail.
        </p>
        <p>
          To behave like a contactless or wallet payment, the card authorisation MUST therefore
          run on the card rails, not through the API Hub. What BioPay supplies is what a phone
          wallet supplies today: a one-time card credential (a network token and a cryptogram)
          and proof that the cardholder has been verified &mdash; here by ICP&rsquo;s biometric
          match rather than the phone&rsquo;s.
        </p>
        <p>
          The complication is that only the LFI holds <code>uaeKycId</code> &rarr; instrument.
          When the customer presents their biometric, neither the BPIP nor the API Hub knows
          whether this customer pays by account or by card. Each option below answers how the
          BPIP finds out, and who generates the card credential.
        </p>
      </EdProse>
    </EdSectionBand>

    <!-- 02 ─────────────────────────────────────────────────────────────── -->
    <EdSectionBand
      id="options"
      num="02"
      color="var(--at-teal)"
      eyebrow="Architecture options"
      title="Three options for card payment"
      tone="surface"
      lede="In every option the customer is first resolved by ICP through the API Hub, and the card authorisation runs from the BPIP, as acquirer, through Jaywan to the LFI. Click any diagram to expand it."
    >
      <h3 class="bp-sub">Option 1 — Look up the instrument, then branch</h3>
      <EdProse>
        After resolution, the BPIP asks the LFI through the API Hub which instrument it holds for
        the <code>uaeKycId</code>. For an account, the BPIP sends the payment request as in the
        account flow. For a card, it requests a one-time card credential from the LFI through the
        Hub, and submits the card authorisation to Jaywan.
      </EdProse>
      <APIFlowViewer
        title="BioPay — card payment, Option 1"
        eyebrow="Card flow · Option 1"
      >
        <BpCardFlow variant="lookup" />
      </APIFlowViewer>

      <h3 class="bp-sub">Option 2 — ICP returns the instrument type</h3>
      <EdProse>
        At registration, the LFI also gives ICP the type of instrument the customer chose
        &mdash; account or card, never the account or card number. Resolution then returns the
        instrument type alongside the <code>uaeKycId</code> and LFI, and the BPIP branches straight
        away without a lookup.
      </EdProse>
      <APIFlowViewer
        title="BioPay — card payment, Option 2"
        eyebrow="Card flow · Option 2"
      >
        <BpCardFlow variant="icp" />
      </APIFlowViewer>

      <h3 class="bp-sub">Option 3 — One request, the LFI decides</h3>
      <EdProse>
        The BPIP sends a single <code>POST /biometric-payments</code> carrying both the
        merchant&rsquo;s creditor account and its card acceptance details. The LFI looks up the
        instrument and either executes the account payment and returns a
        <code>PaymentId</code>, or generates a one-time token and cryptogram bound to that
        <code>PaymentId</code> and amount and returns it as a credential. The BPIP submits the
        credential to Jaywan, and when the authorisation reaches the LFI through Jaywan, the
        LFI matches it to the request it has already seen.
      </EdProse>
      <APIFlowViewer
        title="BioPay — card payment, Option 3"
        eyebrow="Card flow · Option 3"
      >
        <BpCardFlow variant="lfi" />
      </APIFlowViewer>
    </EdSectionBand>

    <!-- 03 ─────────────────────────────────────────────────────────────── -->
    <EdSectionBand
      id="compare"
      num="03"
      color="var(--at-blue-deep)"
      eyebrow="Comparing the options"
      title="Pros and cons of each option"
      lede="The trade-off is between round trips at the point of sale, where the instrument type is held, and how much each party must build."
    >
      <EdCompareCards>
        <EdCompareCard accent="var(--at-teal)" kicker="Option 1" example="Look up, then branch">
          <h4 class="bp-pc bp-pc--pro">Pros</h4>
          <ul>
            <li>The LFI remains the only party that knows the customer&rsquo;s instrument.</li>
            <li>Each branch is simple, and the account branch is unchanged from the account payment flow.</li>
            <li>The BPIP knows the rail before it builds the request, so each request carries only the creditor details that rail needs.</li>
          </ul>
          <h4 class="bp-pc bp-pc--con">Cons</h4>
          <ul>
            <li>Three round trips through the API Hub before money moves &mdash; resolution, lookup, then payment or credential &mdash; plus the card authorisation. Hard to fit within a tap-like one to two seconds.</li>
            <li>A new lookup operation on the API Hub and on every LFI&rsquo;s Ozone Connect.</li>
            <li>The instrument can change between the lookup and the payment, so the payment or credential request can still fail on a mismatch.</li>
          </ul>
        </EdCompareCard>
        <EdCompareCard accent="var(--at-gold)" kicker="Option 2" example="ICP returns the type">
          <h4 class="bp-pc bp-pc--pro">Pros</h4>
          <ul>
            <li>No extra round trip: the BPIP learns the rail from the resolution it already makes.</li>
            <li>No lookup operation to build on the API Hub or at the LFI.</li>
            <li>The BPIP knows the rail before it builds the request.</li>
          </ul>
          <h4 class="bp-pc bp-pc--con">Cons</h4>
          <ul>
            <li>ICP holds payment information as well as identity, widening its role beyond identity.</li>
            <li>Two copies of the instrument type to keep in step: every change of default instrument must be sent to ICP as well, and a missed update sends the BPIP down the wrong rail.</li>
            <li>Registration must change so the LFI sends the instrument type to ICP.</li>
            <li>The card branch still needs a separate credential request through the Hub, so a card payment costs as many Hub calls as Option 3 without its single request.</li>
          </ul>
        </EdCompareCard>
        <EdCompareCard accent="var(--at-navy)" kicker="Option 3" example="One request, LFI decides">
          <h4 class="bp-pc bp-pc--pro">Pros</h4>
          <ul>
            <li>The LFI remains the only party that knows the instrument, matching the registration model.</li>
            <li>The same cost for both rails: one resolution call and one payment call through the API Hub.</li>
            <li>The LFI sees a card payment twice &mdash; as the request through the Hub and as the authorisation through Jaywan &mdash; and can match the cryptogram to the <code>PaymentId</code>, a strong fraud control and a consistent decision.</li>
            <li>Where the customer registered several instruments, the LFI can pick one the merchant accepts rather than fail on a default it cannot use.</li>
            <li>Every BioPay payment, on either rail, is recorded at the API Hub under one <code>PaymentId</code>.</li>
          </ul>
          <h4 class="bp-pc bp-pc--con">Cons</h4>
          <ul>
            <li>Two response shapes: the BPIP must handle either a pending payment or a credential it must still use.</li>
            <li>A card payment completes in two steps; the authorisation can still decline after the credential is issued, so the credential needs a short expiry and the outcome must be reported back.</li>
            <li>Every request carries creditor details for both rails, and the payment schema must accept both.</li>
          </ul>
        </EdCompareCard>
      </EdCompareCards>
    </EdSectionBand>

    <!-- 04 ─────────────────────────────────────────────────────────────── -->
    <EdSectionBand
      id="open"
      num="04"
      color="var(--at-gold)"
      eyebrow="Open questions"
      title="Common to every option"
      tone="surface"
    >
      <EdProse>
        <ul>
          <li>
            <strong>Scheme rules.</strong> Jaywan &mdash; and Visa and Mastercard, if in scope
            &mdash; must recognise cardholder verification by a third-party biometric: how the
            transaction is coded, whether it counts as card-present, who carries fraud liability,
            and the interchange that applies.
          </li>
          <li>
            <strong>Token provisioning.</strong> Whether the LFI provisions a network token for the
            card at registration, as when a card is added to a wallet, and with whom the token
            requestor role sits.
          </li>
          <li>
            <strong>Acquirer status.</strong> Whether only licensed acquirers can hold the BPIP
            role, or payment facilitators and terminal providers acting under an acquirer can too
            &mdash; and how acquirers, which are not Open Finance participants today, are onboarded
            through the Trust Framework.
          </li>
          <li>
            <strong>Status.</strong> The card authorisation is answered at the point of sale, so the
            payment log patch and status event serve reporting rather than telling the BPIP the
            outcome.
          </li>
          <li>
            <strong>Specification.</strong> <code>JAYWAN</code> is currently listed as a payment
            instrument on <code>POST /biometric-payments</code>. Each option changes that operation,
            or adds a new one, to return a card credential rather than execute a payment.
          </li>
        </ul>
      </EdProse>
    </EdSectionBand>
  </div>
</template>

<style scoped>
/* Subsection heading inside a section band — used for the options. */
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
