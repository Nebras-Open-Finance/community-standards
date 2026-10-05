<route lang="yaml">
meta:
  layout: biopay
  title: Payment — Card Scheme (e.g. Jaywan) / Card Flow
  next: false
  prev: false
  aside: false
</route>

<script setup lang="ts">
import { useHead } from '@unhead/vue'
import BpCardFlow from '@/components/biopay/BpCardFlow.vue'
import BpRailCompare from '@/components/biopay/BpRailCompare.vue'

useHead({ title: 'Payment — Card Scheme (e.g. Jaywan) / Card Flow · BioPay' })

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
      { party: 'API Hub', items: ['An instrument lookup operation, proxied to the LFI, returning either the account details or a one-time card credential.'] },
      { party: 'LFI', items: ['A registration store of uaeKycId → instrument(s).', 'An instrument lookup endpoint on Ozone Connect, returning the IBAN for an account, or a one-time token and cryptogram for a card.', 'A card scheme token for the card, provisioned at registration.', 'A one-time cryptogram for each card payment, in real time, within the lookup.'] },
      { party: 'BPIP', items: ['Support for both rails, branching on the lookup result.', 'For a card, submission of the authorisation to the card scheme, with no further call through the API Hub.'] },
      { party: 'Card Scheme (e.g. Jaywan)', items: ['Token provisioning for BioPay, and transaction coding for biometric cardholder verification.'] },
    ],
    questions: [
      'Can a resolution call to ICP, the lookup through the API Hub and then the payment request or card authorisation complete within the time budget at the point of sale? What is that budget?',
      'Should the lookup return the customer’s IBAN to the BPIP, and on what basis may the BPIP receive it?',
      'Who creates the cryptogram: the LFI, the card scheme’s token service at the LFI’s request, or the card scheme’s token service at the BPIP’s request?',
      'Can the card scheme generate a one-time security code for each payment when the card details are held on a server rather than on a card or phone?',
      'Does carrying card scheme tokens and cryptograms through the API Hub bring the API Hub into PCI DSS scope? To be confirmed with the card schemes and a QSA.',
      'For Visa and Mastercard tokens, who is the registered token requestor for each scheme? For a co-badged card, who chooses the scheme — the LFI, from the merchant’s acceptance details, or the customer?',
    ],
  },
  lfi: {
    needed: [
      { party: 'API Hub', items: ['POST /biometric-payments extended to accept both a creditor account and card acceptance details.', 'One record per payment, under one PaymentId, on either rail, with the status event to the BPIP on either rail.'] },
      { party: 'LFI', items: ['A registration store of uaeKycId → instrument(s).', 'Rail selection, based on the customer’s instruments and what the merchant accepts.', 'A one-time token and cryptogram bound to the PaymentId and amount.', 'A link between Ozone Connect and its card system, to submit the authorisation to the card scheme and patch the outcome to the API Hub.'] },
      { party: 'BPIP', items: ['Both creditor routes in every request.', 'Reliance on the status event (or polling) for the card authorisation outcome at the point of sale.'] },
      { party: 'Card Scheme (e.g. Jaywan)', items: ['Acceptance of an authorisation submitted by the issuing LFI on the acquirer’s behalf.', 'Token provisioning for BioPay, and transaction coding for biometric cardholder verification.'] },
    ],
    questions: [
      'Can the card scheme accept an authorisation submitted by the issuing LFI, carrying the BPIP’s acquirer and merchant details, rather than by the acquirer itself?',
      'Can the PATCH to the API Hub and the status event to the BPIP complete within the time budget at the point of sale?',
      'Can the card scheme generate a one-time security code for each payment when the card details are held on a server rather than on a card or phone?',
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
      title="Card Scheme (e.g. Jaywan) / Card Flow"
      :meta="meta"
      lede="How a BioPay payment works when the customer&rsquo;s registered instrument is a card, so that paying with a biometric feels like tapping a card or phone today. <strong>Everything here is draft</strong> &mdash; two options are set out for review."
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
          request through the card scheme (e.g. Jaywan), and the LFI, as issuer, approves or declines it.
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
      lede="In every option the BPIP first resolves the customer directly with ICP through the ICP SDK &mdash; not through the API Hub &mdash; receiving the uaeKycId, the customer&rsquo;s default LFI and a token. The card authorisation then runs on the card scheme (e.g. Jaywan), not through the API Hub. Click any diagram to expand it."
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
        <RouterLink to="/biopay/payment/api-reference/instrument-lookup"><code>POST /instrument-lookup</code></RouterLink>.
        The same response carries what the BPIP needs for that rail: for an account, the IBAN,
        after which the BPIP sends the payment request as in the
        account flow; for a card, a one-time token and cryptogram, which the BPIP submits to the
        card scheme. The card payment then runs between the BPIP, as acquirer, and the card
        scheme, and does not return to the API Hub.
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
        instrument and returns a <code>PaymentId</code> on either rail. For an account, it
        executes the payment over AANI/IPP. For a card, it generates a one-time token and
        cryptogram bound to that <code>PaymentId</code> and amount and submits the authorisation
        to the card scheme itself. On approval, the LFI patches the payment log at the API Hub,
        and the API Hub sends the status event to the BPIP &mdash; as in the account flow.
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
            <li>No central record of BioPay payments. Card payments never reach the API Hub after the lookup &mdash; no <code>PaymentId</code>, no payment log &mdash; so the API Hub cannot act as the single reporting source for BioPay, and card activity must be gathered from the card scheme or each LFI.</li>
            <li>For an account, three round trips before money moves &mdash; resolution with ICP, the lookup, and the payment request through the API Hub. Hard to fit within a tap-like one to two seconds.</li>
            <li>A new lookup operation on the API Hub and on every LFI&rsquo;s Ozone Connect, which must generate a card credential in real time.</li>
            <li>The lookup returns the customer&rsquo;s IBAN to the BPIP.</li>
            <li>Card scheme tokens and cryptograms pass through the API Hub, which may bring the API Hub into PCI DSS scope. In Option 2 they never leave the LFI.</li>
            <li>For an account, the instrument can change between the lookup and the payment, so the payment request can still fail on a mismatch.</li>
          </ul>
        </EdCompareCard>
        <EdCompareCard accent="var(--at-navy)" kicker="Option 2" example="One request, LFI decides">
          <h4 class="bp-pc bp-pc--pro">Pros</h4>
          <ul>
            <li>A central record of every BioPay payment. Each payment, on either rail, is recorded at the API Hub under one <code>PaymentId</code> with its outcome patched to the payment log, making the API Hub the single reporting source for BioPay.</li>
            <li>A path for card payments in Open Finance. Once LFIs can generate a card credential and submit the authorisation behind an Ozone Connect payment request, a future version of the Open Finance standards could add card payments with little further change.</li>
            <li>The LFI remains the only party that knows the instrument, matching the registration model.</li>
            <li>The same cost for both rails: one resolution call to ICP and one payment call through the API Hub.</li>
            <li>One response shape and one status mechanism on both rails: a pending <code>PaymentId</code>, then the status event.</li>
            <li>The card credential never leaves the LFI: it generates the token and cryptogram and submits them to the card scheme itself.</li>
            <li>Where the customer registered several instruments, the LFI can pick one the merchant accepts rather than fail on a default it cannot use.</li>          </ul>
          <h4 class="bp-pc bp-pc--con">Cons</h4>
          <ul>
            <li>Potentially a significant build at each LFI. In a card payment today the issuer only receives an authorisation through the scheme and verifies a cryptogram the card produced. Option 2 has the LFI generate the credential and submit the authorisation itself &mdash; across the LFI&rsquo;s Open Finance and card systems, and often its card processor.</li>
            <li>The LFI submits the authorisation in place of the acquirer, which card schemes do not support today.</li>
            <li>The BPIP learns the card outcome from the status event rather than directly from the card scheme, adding the PATCH and the event to the time at the point of sale.</li>
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
            <strong>Scheme rules.</strong> Each card scheme in scope &mdash; Jaywan, and Visa and
            Mastercard if included &mdash; must recognise cardholder verification by a third-party biometric: how the
            transaction is coded, whether it counts as card-present, who carries fraud liability,
            and the interchange that applies.
          </li>
          <li>
            <strong>Chargebacks, disputes and refunds.</strong> The customer&rsquo;s protection
            depends on the payment instrument selected at registration, though the biometric
            gesture is the same. A card scheme payment carries chargeback rights and is refunded
            by the BPIP, as acquirer, through the card scheme. An AANI/IPP payment has no
            chargeback, its disputes are handled by the LFI, and it has no reverse rail for
            refunds. How customers are told of the difference, and how an account payment is
            refunded, are to be defined.
          </li>
          <li>
            <strong>Token provisioning.</strong> Whether the LFI provisions a card scheme token for the
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
            <strong>Status.</strong> The card authorisation is answered at the point of sale. In
            Option 1 the card payment does not return to the API Hub, so there is no payment log
            patch. In Option 2 the patch and status event are how the BPIP learns the outcome,
            so they must arrive within the point-of-sale time budget.
          </li>
          <li>
            <strong>Specification.</strong> Each card scheme &mdash; <code>JAYWAN</code>,
            <code>VISA</code>, <code>MASTERCARD</code> &mdash; is listed as a payment instrument in
            its own right. Option 1 returns the card credential
            from <code>POST /instrument-lookup</code> instead; Option 2 keeps
            <code>POST /biometric-payments</code>, extended to carry card acceptance details.
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

/* Numbered questions inside each option's checklist card. */
.bp-questions {
  margin: 0;
  padding-left: 1.25rem;
}
.bp-questions li + li { margin-top: 0.5rem; }
</style>
