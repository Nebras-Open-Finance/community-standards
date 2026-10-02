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
import BpRailCompare from '@/components/biopay/BpRailCompare.vue'

useHead({ title: 'Payment — Jaywan / Card Flow · BioPay' })

interface Section { id: string; label: string }
interface MetaItem { label: string; value: string }

const sections: Section[] = [
  { id: 'problem', label: 'Why cards differ' },
  { id: 'options', label: 'Architecture options' },
  { id: 'compare', label: 'Comparing the options' },
  { id: 'open', label: 'Open questions' },
  { id: 'rejected', label: 'Rejected option' },
]

const meta: MetaItem[] = [
  { label: 'Status', value: 'Draft' },
  { label: 'Options', value: '2' },
  { label: 'Version', value: '0.1' },
]

interface Need { party: string; items: string[] }
interface OptionChecklist { needed: Need[]; questions: string[] }

// What each option depends on, and what must be asked before it can be chosen.
// Kept as data so the options can be compared line by line.
const checklists: Record<'lookup' | 'lfi', OptionChecklist> = {
  lookup: {
    needed: [
      { party: 'API Hub', items: ['An instrument lookup operation, proxied to the LFI.', 'A card credential operation, proxied to the LFI.'] },
      { party: 'LFI', items: ['A registration store of uaeKycId → instrument(s).', 'Instrument lookup and card credential endpoints on Ozone Connect.', 'A network token for the card, provisioned at registration.', 'A one-time cryptogram for each card payment, in real time.'] },
      { party: 'BPIP', items: ['Support for both rails, branching on the lookup result.'] },
      { party: 'Jaywan', items: ['Token provisioning for BioPay, and transaction coding for biometric cardholder verification.'] },
    ],
    questions: [
      'Can a resolution call to ICP and two round trips through the API Hub, plus the card authorisation, complete within the time budget at the point of sale? What is that budget?',
      'Who creates the cryptogram: the LFI, Jaywan’s token service at the LFI’s request, or Jaywan’s token service at the BPIP’s request?',
      'Can Jaywan generate a one-time security code for each payment when the card details are held on a server rather than on a card or phone?',
    ],
  },
  lfi: {
    needed: [
      { party: 'API Hub', items: ['POST /biometric-payments extended to accept both a creditor account and card acceptance details, and to return either a PaymentId or a card credential.', 'One record per payment, under one PaymentId, on either rail.'] },
      { party: 'LFI', items: ['A registration store of uaeKycId → instrument(s).', 'Rail selection, based on the customer’s instruments and what the merchant accepts.', 'A card credential bound to the PaymentId and amount, with a short expiry.', 'A link between Ozone Connect and its card authorisation system, to match the authorisation to the PaymentId and patch the outcome.'] },
      { party: 'BPIP', items: ['Both creditor routes in every request.', 'Handling of two response shapes: a pending payment, or a credential to submit to Jaywan.', 'A report of the card authorisation outcome, if the LFI does not patch it.'] },
      { party: 'Jaywan', items: ['Token provisioning for BioPay, and transaction coding for biometric cardholder verification.'] },
    ],
    questions: [
      'Should the card branch return a cryptogram, or only a token reference, with the BPIP — as acquirer and token requestor — obtaining the cryptogram from Jaywan’s token service?',
      'Can Jaywan generate a one-time security code for each payment when the card details are held on a server rather than on a card or phone?',
    ],
  },
}
</script>

<template>
  <div class="ed-page">
    <EdBackStrip href="/biopay/payment/technical-architecture" text="Payment technical architecture" />

    <EdHero
      eyebrow="BioPay · Payment · Draft"
      eyebrow-color="var(--at-navy)"
      title="Jaywan / Card Flow"
      :meta="meta"
      lede="How a BioPay payment works when the customer&rsquo;s registered instrument is a card, so that paying with a biometric feels like tapping a card or phone today. <strong>Everything here is draft</strong> &mdash; two options are set out for review, and a third has been rejected."
    />

    <EdInPageNav :sections="sections" />

    <!-- 01 ─────────────────────────────────────────────────────────────── -->
    <EdSectionBand
      id="problem"
      num="01"
      color="var(--at-navy)"
      eyebrow="Why cards differ"
      title="In a card payment, the LFI approves a request rather than pushing the payment"
    >
      <EdProse>
        <p>
          In an account-to-account payment, the LFI pushes the payment: on the BPIP&rsquo;s request,
          made through the API Hub, it instructs the payment over AANI/IPP. In a card payment, the
          LFI pushes nothing: the BPIP, as the merchant&rsquo;s acquirer, sends an authorisation
          request through Jaywan, and the LFI, as issuer, approves or declines it.
        </p>
      </EdProse>
      <BpRailCompare />
      <EdProse>
        <p>
          The card authorisation MUST therefore run on the card rails, not through the API Hub.
          BioPay supplies what a phone wallet supplies today: a one-time card credential (a network
          token and a cryptogram) and proof that the cardholder has been verified &mdash; here by
          ICP&rsquo;s biometric match.
        </p>
        <p>
          Only the LFI knows whether a <code>uaeKycId</code> pays by account or by card. Each option
          below answers how the BPIP finds out, and who generates the card credential.
        </p>
      </EdProse>
    </EdSectionBand>

    <!-- 02 ─────────────────────────────────────────────────────────────── -->
    <EdSectionBand
      id="options"
      num="02"
      color="var(--at-teal)"
      eyebrow="Architecture options"
      title="Two options for card payment"
      tone="surface"
      lede="In every option the BPIP first resolves the customer directly with ICP through the ICP SDK &mdash; not through the API Hub &mdash; receiving the uaeKycId, the customer&rsquo;s default LFI and a token. The card authorisation then runs from the BPIP, as acquirer, through Jaywan to the LFI. Click any diagram to expand it."
    >
      <EdNote type="info" title="Who creates the card credential today">
        <p>
          An issuing LFI does not, today, create a payment credential and hand it to a third party.
          The cryptogram is generated by the card&rsquo;s chip, by the phone in a wallet payment, or
          &mdash; for card-on-file and online payments &mdash; by the scheme&rsquo;s token service
          at the token requestor&rsquo;s request. The issuer validates the cryptogram when the
          authorisation arrives. Each option below therefore depends on how the card credential is
          obtained, and the questions under each option start there.
        </p>
      </EdNote>

      <h3 class="bp-sub">Option 1 — Look up the instrument, then branch</h3>
      <EdProse>
        After resolution, the BPIP asks the LFI through the API Hub which instrument it holds for
        the <code>uaeKycId</code>, using
        <RouterLink to="/biopay/payment/api-reference/instrument-lookup"><code>POST /instrument-lookup</code></RouterLink>. For an account, the BPIP sends the payment request as in the
        account flow. For a card, it requests a one-time card credential from the LFI through the
        Hub, and submits the card authorisation to Jaywan.
      </EdProse>
      <APIFlowViewer
        title="BioPay — card payment, Option 1"
        eyebrow="Card flow · Option 1"
      >
        <BpCardFlow variant="lookup" />
      </APIFlowViewer>

      <EdCompareCards>
        <EdCompareCard accent="var(--at-teal)" kicker="Option 1" example="What is needed">
          <template v-for="need in checklists.lookup.needed" :key="need.party">
            <h4 class="bp-pc">{{ need.party }}</h4>
            <ul>
              <li v-for="item in need.items" :key="item">{{ item }}</li>
            </ul>
          </template>
        </EdCompareCard>
        <EdCompareCard accent="var(--at-gold)" kicker="Option 1" example="Questions to ask">
          <ol class="bp-questions">
            <li v-for="q in checklists.lookup.questions" :key="q">{{ q }}</li>
          </ol>
        </EdCompareCard>
      </EdCompareCards>

      <h3 class="bp-sub">Option 2 — One request, the LFI decides</h3>
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
        title="BioPay — card payment, Option 2"
        eyebrow="Card flow · Option 2"
      >
        <BpCardFlow variant="lfi" />
      </APIFlowViewer>

      <EdCompareCards>
        <EdCompareCard accent="var(--at-teal)" kicker="Option 2" example="What is needed">
          <template v-for="need in checklists.lfi.needed" :key="need.party">
            <h4 class="bp-pc">{{ need.party }}</h4>
            <ul>
              <li v-for="item in need.items" :key="item">{{ item }}</li>
            </ul>
          </template>
        </EdCompareCard>
        <EdCompareCard accent="var(--at-gold)" kicker="Option 2" example="Questions to ask">
          <ol class="bp-questions">
            <li v-for="q in checklists.lfi.questions" :key="q">{{ q }}</li>
          </ol>
        </EdCompareCard>
      </EdCompareCards>
    </EdSectionBand>

    <!-- 03 ─────────────────────────────────────────────────────────────── -->
    <EdSectionBand
      id="compare"
      num="03"
      color="var(--at-blue-deep)"
      eyebrow="Comparing the options"
      title="Pros and cons of each option"
      lede="The trade-off is between round trips at the point of sale and how much each party must build."
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
            <li>Three round trips before money moves &mdash; resolution with ICP, then a lookup and a payment or credential request through the API Hub &mdash; plus the card authorisation. Hard to fit within a tap-like one to two seconds.</li>
            <li>A new lookup operation on the API Hub and on every LFI&rsquo;s Ozone Connect.</li>
            <li>The instrument can change between the lookup and the payment, so the payment or credential request can still fail on a mismatch.</li>
          </ul>
        </EdCompareCard>
        <EdCompareCard accent="var(--at-navy)" kicker="Option 2" example="One request, LFI decides">
          <h4 class="bp-pc bp-pc--pro">Pros</h4>
          <ul>
            <li>The LFI remains the only party that knows the instrument, matching the registration model.</li>
            <li>The same cost for both rails: one resolution call to ICP and one payment call through the API Hub.</li>
            <li>The LFI sees a card payment twice &mdash; as the request through the Hub and as the authorisation through Jaywan &mdash; and can match the cryptogram to the <code>PaymentId</code>, a strong fraud control and a consistent decision.</li>
            <li>Where the customer registered several instruments, the LFI can pick one the merchant accepts rather than fail on a default it cannot use.</li>
            <li>Every BioPay payment, on either rail, is recorded at the API Hub under one <code>PaymentId</code>.</li>
          </ul>
          <h4 class="bp-pc bp-pc--con">Cons</h4>
          <ul>
            <li>Potentially a significant build at each LFI. In a Jaywan payment today the issuer only receives an authorisation through the scheme and verifies a cryptogram the card produced. Option 2 adds a different journey before that: an API request through Ozone Connect, issuing a card credential, and linking the later authorisation back to it &mdash; across the LFI&rsquo;s Open Finance and card systems, and often its card processor.</li>
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
    <!-- 05 ─────────────────────────────────────────────────────────────── -->
    <EdSectionBand
      id="rejected"
      num="05"
      color="var(--at-mute)"
      eyebrow="Rejected option"
      title="Option 3 — ICP returns the instrument type"
      lede="This option was considered and rejected. It is kept here for reference only."
    >
      <EdProse>
        At registration, the LFI would also have given ICP the type of instrument the customer
        chose &mdash; account or card, never the account or card number. Resolution would then
        have returned the instrument type alongside the <code>uaeKycId</code>, default LFI and
        token, and the BPIP would have branched straight away without a lookup.
      </EdProse>
      <EdProse>
        It is rejected because ICP does not store the instrument type. ICP holds identity and
        the binding of <code>uaeKycId</code> to LFI; the payment instrument is held only by the
        LFI.
      </EdProse>
      <APIFlowViewer
        title="BioPay — card payment, Option 3 (rejected)"
        eyebrow="Card flow · Option 3 · Rejected"
      >
        <BpCardFlow variant="icp" />
      </APIFlowViewer>
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

/* Numbered questions inside each option's checklist card. */
.bp-questions {
  margin: 0;
  padding-left: 1.25rem;
}
.bp-questions li + li { margin-top: 0.5rem; }
</style>
