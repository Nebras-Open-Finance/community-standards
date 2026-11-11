<route lang="yaml">
meta:
  layout: biopay
  title: Payment — Payment Token
  next: false
  prev: false
  aside: false
</route>

<script setup lang="ts">
import { useHead } from '@unhead/vue'

useHead({ title: 'Payment — Payment Token · BioPay' })

interface Section { id: string; label: string }
interface MetaItem { label: string; value: string }

const sections: Section[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'requirements', label: 'Requirements' },
  { id: 'issue', label: 'LFI issues' },
  { id: 'present', label: 'BPIP presents' },
  { id: 'check', label: 'LFI checks' },
  { id: 'open-items', label: 'Open items' },
]

const meta: MetaItem[] = [
  { label: 'Status', value: 'Draft' },
  { label: 'Audience', value: 'LFI · BPIP' },
  { label: 'Version', value: '0.1' },
]

const lifecycle = `Instrument query           LFI validates the ICP token with ICP
                           LFI issues the payment token  ── t = 0
                           returned to the BPIP inside the encrypted response
        │
        │  ≤ 30 seconds
        ▼
Point of payment           IBAN: Data.PaymentToken on POST /biometric-payments
                           PAN:  the card authorisation, through the card scheme
                           LFI checks it, then approves or declines
                           LFI marks it used with the payment  ── single use`

// ── Issue ───────────────────────────────────────────────────────────────────
const issueTabs = [
  {
    label: 'Node.js',
    lang: 'typescript',
    code: `import { randomUUID } from 'node:crypto'

const PAYMENT_TOKEN_LIFETIME = 30 // seconds

type Amount = { Amount: string; Currency: string }
type InstrumentQueryData = {
  UaeKycId: string
  IcpToken: string
  InstructedAmount: Amount
  MerchantId: string
  TerminalId: string
  AcquirerId: string
  MerchantName: string
}
type Instrument =
  | { SchemeName: 'IBAN'; Identification: string }
  | { SchemeName: 'PAN'; Identification: string; ExpiryDate: string }

async function issuePaymentToken(
  data: InstrumentQueryData, // message.Data of the decrypted, verified request
  callerOrgId: string,       // o3-caller-org-id on the proxied instrument query
  instrument: Instrument,    // the customer's default instrument for ICP Pay
  icpValidatedAt: Date,      // when ICP's token validation endpoint confirmed data.IcpToken
): Promise<{ paymentToken: string; exp: number }> {
  const now = Math.floor(Date.now() / 1000)
  const exp = now + PAYMENT_TOKEN_LIFETIME

  // Version 4 UUID from a CSPRNG: 36 characters, lower case.
  const paymentToken = randomUUID()

  // The register is shared by every payment system that issues or accepts
  // payment tokens. Unique keys on paymentToken and IcpToken reject a repeated
  // UUID, and stop an ICP token from ever yielding a second payment token.
  // On a paymentToken collision, generate a new UUID and insert again.
  await paymentTokenRegister.insert({
    paymentToken,
    azp: callerOrgId,
    exp,
    icpValidatedAt,
    ...data,          // UaeKycId, IcpToken, InstructedAmount, MerchantId, TerminalId, AcquirerId, MerchantName
    instrument,
    usedAt: null,
  })

  return { paymentToken, exp }
}`,
  },
  {
    label: 'Python',
    lang: 'python',
    code: `import time, uuid
from datetime import datetime

PAYMENT_TOKEN_LIFETIME = 30  # seconds

def issue_payment_token(
    data: dict,                 # message.Data of the decrypted, verified request
    caller_org_id: str,         # o3-caller-org-id on the proxied instrument query
    instrument: dict,           # the customer's default instrument for ICP Pay
    icp_validated_at: datetime, # when ICP's token validation endpoint confirmed data["IcpToken"]
) -> tuple[str, int]:
    now = int(time.time())
    exp = now + PAYMENT_TOKEN_LIFETIME

    # Version 4 UUID from a CSPRNG: 36 characters, lower case.
    payment_token = str(uuid.uuid4())

    # The register is shared by every payment system that issues or accepts
    # payment tokens. Unique keys on payment_token and IcpToken reject a repeated
    # UUID, and stop an ICP token from ever yielding a second payment token.
    # On a payment_token collision, generate a new UUID and insert again.
    payment_token_register.insert({
        "payment_token": payment_token,
        "azp": caller_org_id,
        "exp": exp,
        "icp_validated_at": icp_validated_at,
        **data,  # UaeKycId, IcpToken, InstructedAmount, MerchantId, TerminalId, AcquirerId, MerchantName
        "instrument": instrument,
        "used_at": None,
    })

    return payment_token, exp`,
  },
] as const

// ── Check ───────────────────────────────────────────────────────────────────
const checkTabs = [
  {
    label: 'Node.js',
    lang: 'typescript',
    code: `class PaymentTokenRejected extends Error {} // its message is the ErrorCode

const UUID = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/

// For an IBAN payment, before you create it. The API Hub proxies
// POST /biometric-payments without checking the payment token.
async function checkPaymentTokenForAccountPayment(
  paymentToken: string, // Data.PaymentToken, as proxied by the API Hub
  callerOrgId: string,  // o3-caller-org-id on the proxied payment
) {
  // 1. A 36-character UUID
  if (!UUID.test(paymentToken)) throw new PaymentTokenRejected('PaymentToken.Invalid')

  // 2. You issued it, after the ICP token was validated
  const record = await paymentTokenRegister.get(paymentToken)
  if (!record || !record.icpValidatedAt) throw new PaymentTokenRejected('PaymentToken.Invalid')

  // 3. Within its 30 seconds
  if (Date.now() / 1000 > record.exp) throw new PaymentTokenRejected('PaymentToken.Expired')

  // 4. Issued for an IBAN, and 5. to the BPIP presenting it
  if (record.instrument.SchemeName !== 'IBAN') {
    throw new PaymentTokenRejected('PaymentToken.WrongInstrumentType')
  }
  if (record.azp !== callerOrgId) throw new PaymentTokenRejected('PaymentToken.BindingMismatch')

  // 6. Not used. Marking it used with the payment is the final guard.
  if (record.usedAt) throw new PaymentTokenRejected('PaymentToken.AlreadyUsed')

  // 7. The IBAN is still the account registered for ICP Pay
  const registered = await registrations.defaultInstrument(record.UaeKycId)
  if (registered?.Identification !== record.instrument.Identification) {
    throw new PaymentTokenRejected('Account.DebtorAccountMismatch')
  }

  return record
}`,
  },
  {
    label: 'Python',
    lang: 'python',
    code: `import re, time

class PaymentTokenRejected(Exception):
    """Its message is the ErrorCode."""

UUID = re.compile(r"^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$")

# For an IBAN payment, before you create it. The API Hub proxies
# POST /biometric-payments without checking the payment token.
def check_payment_token_for_account_payment(payment_token: str, caller_org_id: str) -> dict:
    # payment_token: Data.PaymentToken, as proxied by the API Hub
    # caller_org_id: o3-caller-org-id on the proxied payment

    # 1. A 36-character UUID
    if not UUID.match(payment_token):
        raise PaymentTokenRejected("PaymentToken.Invalid")

    # 2. You issued it, after the ICP token was validated
    record = payment_token_register.get(payment_token)
    if record is None or record["icp_validated_at"] is None:
        raise PaymentTokenRejected("PaymentToken.Invalid")

    # 3. Within its 30 seconds
    if time.time() > record["exp"]:
        raise PaymentTokenRejected("PaymentToken.Expired")

    # 4. Issued for an IBAN, and 5. to the BPIP presenting it
    if record["instrument"]["SchemeName"] != "IBAN":
        raise PaymentTokenRejected("PaymentToken.WrongInstrumentType")
    if record["azp"] != caller_org_id:
        raise PaymentTokenRejected("PaymentToken.BindingMismatch")

    # 6. Not used. Marking it used with the payment is the final guard.
    if record["used_at"] is not None:
        raise PaymentTokenRejected("PaymentToken.AlreadyUsed")

    # 7. The IBAN is still the account registered for ICP Pay
    registered = registrations.default_instrument(record["UaeKycId"])
    if registered is None or registered["Identification"] != record["instrument"]["Identification"]:
        raise PaymentTokenRejected("Account.DebtorAccountMismatch")

    return record`,
  },
] as const
</script>

<template>
  <div class="ed-page">
    <EdBackStrip href="/biopay/payment/api-guide/" text="Payment API Guide" />

    <EdHero
      eyebrow="BioPay · Payment · API Guide · Draft"
      eyebrow-color="var(--at-navy)"
      title="Payment Token"
      :meta="meta"
      lede="The requirements on the payment token: the single-use reference the LFI issues on the instrument query, and the only thing the BPIP passes back to make the payment. What the LFI must do to issue it, what the BPIP must do to present it, and what the LFI must check before it approves or declines. <strong>Everything here is draft</strong> &mdash; requirements are proposals for review."
    />

    <EdInPageNav :sections="sections" />

    <!-- 01 ─────────────────────────────────────────────────────────────── -->
    <EdSectionBand
      id="overview"
      num="01"
      color="var(--at-navy)"
      eyebrow="Overview"
      title="One identification, one token, one payment"
      tone="surface"
    >
      <EdProse>
        <p>
          The LFI issues the payment token in its response to
          <RouterLink to="/biopay/payment/api-reference/standards/instrument-query"><code>POST /instrument-query</code></RouterLink>,
          as <code>message.Data.PaymentToken</code>, once it has validated the ICP token with ICP.
          It stores against the payment token everything it issued it for. The payment token is
          also referred to as the <strong>correlation ID</strong>: it correlates the instrument
          query with the payment that follows.
        </p>
        <p>
          The BPIP passes the payment token back, unchanged, at the point of payment. For an
          <code>IBAN</code> instrument it travels in <code>Data.PaymentToken</code> on
          <code>POST /biometric-payments</code>, through the API Hub. For a <code>PAN</code>
          instrument it travels in the card authorisation, through the card scheme. Either way the
          LFI looks it up, checks it, and pays from what it stored &mdash; never from the request.
        </p>
      </EdProse>
      <EdCode :code="lifecycle" lang="text" filename="Lifecycle of a payment token" />
      <EdNote type="info" title="Proof of concept">
        <p>
          The proof of concept will be conducted in the lower environment.
        </p>
      </EdNote>
    </EdSectionBand>

    <!-- 02 ─────────────────────────────────────────────────────────────── -->
    <EdSectionBand
      id="requirements"
      num="02"
      color="var(--at-gold)"
      eyebrow="Requirements"
      title="Seven requirements"
      lede="Requirements 1 to 4 describe a valid payment token. Requirement 7 makes the LFI check them before every approve or decline decision."
    >
      <EdRefTable>
        <table>
          <thead>
            <tr><th>#</th><th>Requirement</th><th>Who</th><th>What it means</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td><strong>Time-bound validity</strong></td>
              <td>LFI</td>
              <td>The payment token MUST be valid for <strong>30 seconds</strong> from issue, and no longer. The LFI MUST reject it once 30 seconds have passed, measured on its own clock &mdash; it both issues and checks the token, so no clock skew applies.</td>
            </tr>
            <tr>
              <td>2</td>
              <td><strong>Unique across all payment systems</strong></td>
              <td>LFI</td>
              <td>The LFI MUST generate each payment token uniquely across all its payment systems. No payment token may repeat one the LFI has issued before, live or expired, on any rail or channel &mdash; account-to-account or card. The LFI MUST hold one register of payment tokens, shared by every system that issues or accepts them.</td>
            </tr>
            <tr>
              <td>3</td>
              <td><strong>36 characters</strong></td>
              <td>LFI</td>
              <td>The payment token MUST be a UUID in its canonical 36-character form: 32 hexadecimal digits in five groups separated by hyphens (8-4-4-4-12). The LFI SHOULD generate a version 4 (random) UUID from a cryptographically secure random source, and MUST NOT derive it from anything else &mdash; an account number, a card number, a counter or a timestamp.</td>
            </tr>
            <tr>
              <td>4</td>
              <td><strong>ICP token validated at the instrument query</strong></td>
              <td>LFI</td>
              <td>The LFI MUST validate the ICP token by calling ICP&rsquo;s token validation endpoint during the instrument query, and MUST issue a payment token only after ICP confirms it: that ICP issued it to the calling BPIP for the <code>UaeKycId</code>, that it has not expired, and that it has not been used.</td>
            </tr>
            <tr>
              <td>5</td>
              <td><strong>One-time use of the payment token and the ICP token</strong></td>
              <td>LFI</td>
              <td>A payment token MUST be accepted for one payment only. An ICP token MUST yield at most one payment token: ICP marks it used when it validates it, and the LFI MUST also refuse to issue a second payment token against an ICP token it has already accepted.</td>
            </tr>
            <tr>
              <td>6</td>
              <td><strong>Presented unchanged, once, in time</strong></td>
              <td>BPIP</td>
              <td>The BPIP MUST send the payment token exactly as it received it, once, for the payment it was issued for, within its 30 seconds. It MUST NOT send it to any LFI other than the one that issued it.</td>
            </tr>
            <tr>
              <td>7</td>
              <td><strong>Checked before approve or decline</strong></td>
              <td>LFI</td>
              <td>Before it approves or declines the payment &mdash; the account payment or the card authorisation &mdash; the LFI MUST check the payment token against requirements 1 to 5, and against what it stored. See <a href="#check">LFI checks</a>.</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>
      <EdNote type="warning" title="30 seconds covers the whole journey">
        <p>
          The clock starts when the LFI issues the payment token, and stops when the payment request
          or the card authorisation reaches the LFI. It covers the response travelling back through
          the API Hub, the BPIP decrypting and verifying it, and &mdash; for a card &mdash; the card
          scheme carrying the authorisation. The BPIP SHOULD present the payment token as soon as it
          has verified the response.
        </p>
      </EdNote>
    </EdSectionBand>

    <!-- 03 ─────────────────────────────────────────────────────────────── -->
    <EdSectionBand
      id="issue"
      num="03"
      color="var(--at-navy)"
      eyebrow="LFI"
      title="Issue the payment token"
      tone="surface"
    >
      <EdProse>
        <p>
          Issue a payment token only once you have decrypted the instrument query, verified the
          BPIP&rsquo;s signature (see
          <RouterLink to="/biopay/payment/api-guide/signing-and-encryption">Signing and Encryption</RouterLink>),
          and ICP&rsquo;s token validation endpoint has confirmed the ICP token (requirement 4). If
          ICP does not confirm it, issue nothing.
        </p>
      </EdProse>
      <EdBullets accent="var(--at-navy)">
        <li>
          <strong>Generate</strong> a version 4 UUID from a cryptographically secure random source
          (requirement 3). Put no meaning in it.
        </li>
        <li>
          <strong>Store</strong> against it, in your payment token register under a unique key,
          everything you issued it for: the calling BPIP (<code>azp</code>, from
          <code>o3-caller-org-id</code>), its expiry (<code>exp</code>, issue time + 30 seconds), the
          <code>UaeKycId</code>, the ICP token and when ICP validated it, the
          <code>InstructedAmount</code>, the <code>MerchantId</code>, <code>TerminalId</code>,
          <code>AcquirerId</code> and <code>MerchantName</code>, the instrument &mdash;
          <code>SchemeName</code> and <code>Identification</code>, and <code>ExpiryDate</code> for a
          <code>PAN</code> &mdash; and that it is unused.
        </li>
        <li>
          <strong>Enforce uniqueness</strong> in the register across every payment system
          (requirement 2), and put a unique key on the ICP token too, so that one ICP token can never
          yield two payment tokens (requirement 5). If the payment token collides, generate a new
          one.
        </li>
        <li>
          <strong>Write the record before you return the response.</strong> If the write fails,
          return an error and issue nothing: a payment token you cannot look up cannot be used.
        </li>
        <li>
          <strong>Return</strong> the payment token as <code>message.Data.PaymentToken</code> in the
          signed, encrypted response. Set the response&rsquo;s <code>exp</code> to the payment
          token&rsquo;s expiry, so the BPIP can see how long it has.
        </li>
        <li>
          <strong>Keep each record</strong>, used or not, for as long as you need to guarantee
          requirement 2 &mdash; and at least until its expiry.
        </li>
      </EdBullets>
      <EdCodeGroup :tabs="issueTabs" />
    </EdSectionBand>

    <!-- 04 ─────────────────────────────────────────────────────────────── -->
    <EdSectionBand
      id="present"
      num="04"
      color="var(--at-teal-deep)"
      eyebrow="BPIP"
      title="Present the payment token"
    >
      <EdProse>
        <p>
          The payment token replaces the ICP token at the point of payment. Take it from
          <code>message.Data.PaymentToken</code> of the decrypted, verified instrument query
          response, and route on the instrument&rsquo;s <code>SchemeName</code>:
        </p>
      </EdProse>
      <EdRefTable>
        <table>
          <thead>
            <tr><th><code>SchemeName</code></th><th>Send the payment token in</th><th>Who checks it</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><code>IBAN</code></td>
              <td><code>Data.PaymentToken</code> on <code>POST /biometric-payments</code> &mdash; see <RouterLink to="/biopay/payment/api-guide/#payment">Make the account payment</RouterLink></td>
              <td>The LFI, after the API Hub proxies the payment</td>
            </tr>
            <tr>
              <td><code>PAN</code></td>
              <td>The card authorisation &mdash; field mapping to be agreed with the scheme</td>
              <td>The LFI, as issuer, when the card scheme carries the authorisation to it</td>
            </tr>
          </tbody>
        </table>
      </EdRefTable>
      <EdBullets accent="var(--at-teal-deep)">
        <li>Send it <strong>unchanged</strong> &mdash; all 36 characters, hyphens included, in the case you received.</li>
        <li>Send it <strong>once</strong>, for this payment only. It is bound to your organisation and to the amount, merchant, terminal and acquirer you sent on the instrument query.</li>
        <li>Send it <strong>within 30 seconds</strong> of the LFI issuing it. If it expires, take a new biometric and query again.</li>
        <li>Send nothing else from the response with it. The LFI pays from what it stored, not from the request.</li>
        <li>Hold card details in memory only. Never log or persist them.</li>
      </EdBullets>
    </EdSectionBand>

    <!-- 05 ─────────────────────────────────────────────────────────────── -->
    <EdSectionBand
      id="check"
      num="05"
      color="var(--at-blue-deep)"
      eyebrow="LFI"
      title="Check it before you approve or decline"
      tone="surface"
      lede="Requirement 7. Run the checks in order, and reject with the first that fails."
    >
      <h3 class="bp-sub">Account payment &mdash; <code>POST /biometric-payments</code></h3>
      <EdProse>
        <p>
          The API Hub proxies the payment to your Ozone Connect without checking the payment token.
          Check it before you create the payment:
        </p>
      </EdProse>
      <EdRefTable>
        <table>
          <thead>
            <tr><th>#</th><th>Check</th><th>Requirement</th><th>On failure (<code>403</code>)</th></tr>
          </thead>
          <tbody>
            <tr><td>1</td><td>It is a 36-character UUID.</td><td>3</td><td><code>PaymentToken.Invalid</code></td></tr>
            <tr><td>2</td><td>You hold a record for it &mdash; you issued it &mdash; and the record shows the ICP token was validated.</td><td>2, 4</td><td><code>PaymentToken.Invalid</code></td></tr>
            <tr><td>3</td><td>Its 30 seconds have not passed.</td><td>1</td><td><code>PaymentToken.Expired</code></td></tr>
            <tr><td>4</td><td>It was issued for an <code>IBAN</code> instrument.</td><td>&mdash;</td><td><code>PaymentToken.WrongInstrumentType</code></td></tr>
            <tr><td>5</td><td>Its <code>azp</code> equals <code>o3-caller-org-id</code> on the proxied payment.</td><td>&mdash;</td><td><code>PaymentToken.BindingMismatch</code></td></tr>
            <tr><td>6</td><td>It has not been used.</td><td>5</td><td><code>PaymentToken.AlreadyUsed</code></td></tr>
            <tr><td>7</td><td>Its IBAN is still the account the customer registered for ICP Pay against its <code>UaeKycId</code>.</td><td>&mdash;</td><td><code>Account.DebtorAccountMismatch</code></td></tr>
          </tbody>
        </table>
      </EdRefTable>
      <EdCodeGroup :tabs="checkTabs" />

      <h3 class="bp-sub">Card authorisation &mdash; through the card scheme</h3>
      <EdNote type="info" title="Coming soon — Jaywan specification">
        <p>
          How the payment token is carried in the card authorisation, and the decline codes, will
          come from the Jaywan specification.
        </p>
      </EdNote>
      <EdProse>
        <p>
          As issuer, run checks 1, 2, 3 and 6. In place of checks 4, 5 and 7, check that the payment
          token was issued for a <code>PAN</code> instrument; that the card and amount in the
          authorisation match the stored <code>Identification</code>, <code>ExpiryDate</code> and
          <code>InstructedAmount</code>; and that the card acceptor identification code (DE42), card
          acceptor terminal identification (DE41) and acquiring institution identification code
          (DE32) match the stored <code>MerchantId</code>, <code>TerminalId</code> and
          <code>AcquirerId</code>. Decline the authorisation if any check fails.
        </p>
      </EdProse>

      <h3 class="bp-sub">Mark it used</h3>
      <EdBullets accent="var(--at-blue-deep)">
        <li>
          Mark the payment token used in the same transaction that creates the payment or approves
          the authorisation, with an update that succeeds only while it is still unused. Two
          requests carrying the same payment token then cannot both succeed, even if both pass
          check 6 at the same moment.
        </li>
        <li>
          If you reject the request, nothing is created and the payment token is not marked: it
          stays usable until its 30 seconds pass.
        </li>
        <li>
          A retry of <code>POST /biometric-payments</code> with the same
          <code>x-idempotency-key</code> and identical body is answered by the API Hub with the
          original payment, and does not reach you.
        </li>
      </EdBullets>
      <EdNote type="important" title="Look it up; never read it">
        <p>
          The payment token is only a key to your record. Match it exactly, and take nothing from its
          value. Everything you pay from &mdash; the account or card, the amount, the BPIP &mdash;
          comes from the record, never from the request.
        </p>
      </EdNote>
    </EdSectionBand>

    <!-- 06 ─────────────────────────────────────────────────────────────── -->
    <EdSectionBand
      id="open-items"
      num="06"
      color="var(--at-gold)"
      eyebrow="Open items"
      title="To be agreed"
    >
      <EdNote type="warning" title="Open items">
        <p>
          <strong>UUID in the specification.</strong> The specification defines
          <code>PaymentToken</code> as 36 characters from <code>A&ndash;Z</code>,
          <code>a&ndash;z</code>, <code>0&ndash;9</code>, <code>_</code> and <code>-</code>
          (<code>^[A-Za-z0-9_-]{36}$</code>). A UUID fits that pattern, but the specification does
          not require one. Whether to tighten it to the UUID form of requirement 3 is to be agreed.
        </p>
        <p>
          <strong>Card carriage.</strong> Each card scheme must carry the 36-character payment token
          in its authorisation message through to the issuing LFI. The field it travels in is to be
          agreed with each scheme.
        </p>
        <p>
          <strong>30 seconds for a card payment.</strong> Whether 30 seconds leaves enough time for
          the card authorisation to reach the issuing LFI through the card scheme is to be confirmed
          in the proof of concept.
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
  margin: 2.25rem 0 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--at-grid-line);
}
</style>
