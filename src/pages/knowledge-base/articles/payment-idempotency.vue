<route lang="yaml">
meta:
  title: "Payment Idempotency — Retrying POST /payments Safely"
  description: "What the API Hub does with x-idempotency-key, when a repeated key still reaches the LFI, and how TPPs retry and LFIs de-duplicate payment initiation requests so that each payment is executed once."
  category: Payments
  readTime: "8 min"
  updated: "2026-11-18"
  tags:
    - Payments
    - Idempotency
    - Retries
</route>

<script setup lang="ts">
interface Section { id: string; label: string }
interface MetaItem { label: string; value: string }

const sections: Section[] = [
  { id: 'key',         label: 'The key' },
  { id: 'outcomes',    label: 'Outcomes' },
  { id: 'reaches-lfi', label: 'Reaching the LFI' },
  { id: 'tpp',         label: 'TPP retries' },
  { id: 'lfi',         label: 'LFI de-duplication' },
]

const meta: MetaItem[] = [
  { label: 'Category', value: 'Payments' },
  { label: 'Read',     value: '8 min' },
  { label: 'Updated',  value: '18 Nov 2026' },
]

const tags: readonly string[] = ['Payments', 'Idempotency', 'Retries']

const retryNode = `// attempt.key was generated once for this payment instruction (crypto.randomUUID())
// and stored with the instruction before the first send.
async function initiatePayment(attempt: { key: string; instruction: PaymentInstruction }) {
  const first = await postPayment(attempt.instruction, attempt.key).catch(() => null) // null: no response
  if (first?.status === 201) return first.body.message.Data   // PaymentId and current Status

  // No response, or an error: find out whether the payment exists before resending.
  const self = await lookupPaymentByKey(attempt.key)
  if (self) return { self }                                   // it exists: read it via Links.Self

  // Nothing recorded under the key: resend the same instruction under the same key.
  return postPayment(attempt.instruction, attempt.key)
}

// GET /payments with the key. Needs a client-credentials token, not the consent's token.
async function lookupPaymentByKey(key: string): Promise<string | null> {
  const res = await fetch(\`\${RESOURCE_SERVER}/open-finance/payment/v2.1/payments\`, {
    headers: {
      'Authorization':         \`Bearer \${await clientCredentialsToken('openid payments')}\`,
      'Accept':                'application/jwt',
      'x-idempotency-key':     key,
      'x-fapi-interaction-id': crypto.randomUUID(),
    },
    // agent: new https.Agent({ cert: transportCert, key: transportKey }),
  })
  if (res.status !== 200) return null                         // an error: no payment recorded
  const { message } = await verifySignedResponse(await res.text())  // AEIdempotencyKeyQuerySigned
  return message.Links.Self
}
`

const retryPython = `# attempt["key"] was generated once for this payment instruction (str(uuid.uuid4()))
# and stored with the instruction before the first send.
def initiate_payment(attempt: dict):
    try:
        first = post_payment(attempt["instruction"], attempt["key"])
    except httpx.TransportError:
        first = None                                            # no response
    if first is not None and first.status_code == 201:
        return verify_signed_response(first.text)["message"]["Data"]  # PaymentId and current Status

    # No response, or an error: find out whether the payment exists before resending.
    self_link = lookup_payment_by_key(attempt["key"])
    if self_link:
        return {"self": self_link}                              # it exists: read it via Links.Self

    # Nothing recorded under the key: resend the same instruction under the same key.
    return post_payment(attempt["instruction"], attempt["key"])


def lookup_payment_by_key(key: str) -> str | None:
    """GET /payments with the key. Needs a client-credentials token, not the consent's token."""
    res = httpx.get(
        f"{RESOURCE_SERVER}/open-finance/payment/v2.1/payments",
        headers={
            "Authorization": f"Bearer {client_credentials_token('openid payments')}",
            "Accept": "application/jwt",
            "x-idempotency-key": key,
            "x-fapi-interaction-id": str(uuid.uuid4()),
        },
        # cert=(TRANSPORT_CERT, TRANSPORT_KEY),
    )
    if res.status_code != 200:
        return None                                             # an error: no payment recorded
    return verify_signed_response(res.text)["message"]["Links"]["Self"]  # AEIdempotencyKeyQuerySigned
`

const retryTabs = [
  { label: 'Node.js', lang: 'typescript', code: retryNode },
  { label: 'Python',  lang: 'python',     code: retryPython },
] as const
</script>

<template>
  <div class="ed-page">
    <EdBackStrip href="/knowledge-base/" text="All knowledge base articles" />

    <EdHero
      eyebrow="Learn · Understand · Build"
      title="Payment Idempotency — Retrying POST /payments Safely"
      :meta="meta"
      lede="Every payment initiation request carries an <code>x-idempotency-key</code>. Used correctly, it lets a TPP retry a request that timed out without paying twice. This article explains what the API Hub does with the key, where its protection ends, and what TPPs and LFIs MUST do so that each payment instruction is executed at most once."
    >
      <template #lede>
        <div class="ed-tags">
          <span v-for="t in tags" :key="t" class="ed-tag">{{ t }}</span>
        </div>
      </template>
    </EdHero>

    <EdInPageNav :sections="sections" />

    <EdSectionBand
      id="key"
      num="01"
      color="var(--at-gold)"
      eyebrow="The key"
      title="One key per payment instruction, checked by the API Hub"
      tone="cream"
    >
      <EdProse>
        Every <a href="/tech/tpp-standards/v2.1/banking/service-initiation/open-api/payments" class="endpoint"><span class="http-method http-method--post">POST</span><code>/payments</code></a>
        request carries an <code>x-idempotency-key</code> header: a string of up to 40 characters,
        with no whitespace, chosen by the TPP. It identifies one payment instruction.
      </EdProse>
      <EdProse>
        The API Hub checks the key before it forwards the request to the LFI. If the API Hub has
        already recorded a successful payment for that key from the same TPP, it answers with that
        payment and does not forward the request again. The specification sets the window at 24 hours
        from the first request. Two properties matter in practice:
      </EdProse>
      <EdBullets>
        <li><strong>Matching is per TPP, not per consent.</strong> The API Hub looks a key up across all of a TPP's payments, on every consent.</li>
        <li><strong>Only successful payments are recorded.</strong> The API Hub records a key once the LFI has created the payment. An attempt that ended in an error leaves nothing recorded.</li>
      </EdBullets>
      <EdNote type="warning" title="Never reuse a key">
        <p>
          A key MUST identify exactly one payment instruction. Do not reuse it for another
          instruction, on another consent, or after the 24-hour window. Generate a new key, such as a
          UUID v4, for every new payment.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdSectionBand
      id="outcomes"
      num="02"
      color="var(--at-teal)"
      eyebrow="Outcomes"
      title="What happens to a request, and whether it reaches the LFI"
      tone="surface"
    >
      <EdRefTable>
        <table>
          <thead><tr><th>Situation</th><th>What the TPP receives</th><th>Reaches the LFI?</th></tr></thead>
          <tbody>
            <tr><td>First request</td><td><code>201</code> with a new <code>PaymentId</code>; the key is echoed in the <code>x-idempotency-key</code> response header</td><td>Yes</td></tr>
            <tr><td>Same key, same instruction &mdash; resent as-is, or re-signed with a new <code>iat</code> and <code>jti</code></td><td><code>201</code> with the original <code>PaymentId</code> and the payment's <strong>current</strong> <code>Status</code></td><td>No</td></tr>
            <tr><td>Same key, changed instruction (for example a different amount)</td><td><code>409</code>, <code>GenericRecoverableError</code>, <code>Idempotency key mismatch: Request parameters differ from original.</code> Nothing is executed</td><td>No</td></tr>
            <tr><td>Same key, after the original payment used up the consent &mdash; for example a Single Instant Payment</td><td>An error: the consent is no longer authorised. The payment exists; look it up by key</td><td>No</td></tr>
            <tr><td>A second <code>POST /payments</code> on the same consent while an earlier one is still being processed, with the same key or not</td><td><code>403</code>, <code>Consent.BusinessRuleViolation</code>: the previous payment request is still being processed</td><td>No</td></tr>
            <tr><td><code>GET /payments</code> with the key and a client-credentials token</td><td><code>200</code> with <code>Data: {}</code> and <code>Links.Self</code> pointing to the payment; an error if no successful payment is recorded for the key</td><td>No</td></tr>
            <tr><td>The same lookup with the consent's access token</td><td><code>401</code></td><td>No</td></tr>
            <tr><td>Same key, after the earlier attempt ended in an error</td><td>The request is forwarded as a new request</td><td><strong>Yes</strong></td></tr>
          </tbody>
        </table>
      </EdRefTable>
      <EdProse>
        A retry is checked against the consent before its key. That is why a retry of a Single Instant
        Payment that succeeded is refused rather than answered with the payment: the consent allowed
        one payment, and it has been used.
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="reaches-lfi"
      num="03"
      color="var(--at-blue)"
      eyebrow="Reaching the LFI"
      title="When a repeated key still reaches the LFI"
      tone="cream"
    >
      <EdProse>
        The API Hub only protects payments that the LFI has already created. A request with a repeated
        key is forwarded to the LFI when the earlier attempt:
      </EdProse>
      <EdBullets>
        <li>ended in an error from the LFI;</li>
        <li>timed out before the LFI answered &mdash; for example by reaching the API Hub's 30-second request limit;</li>
        <li>was made more than 24 hours earlier.</li>
      </EdBullets>
      <EdProse>
        In the first two cases the LFI may already have created the payment, or even executed it,
        without the API Hub knowing. Only the LFI can tell, which is why LFIs de-duplicate on the key as
        well (<a href="#lfi">section 05</a>).
      </EdProse>
    </EdSectionBand>

    <EdSectionBand
      id="tpp"
      num="04"
      color="var(--at-navy)"
      eyebrow="TPP retries"
      title="Find out what happened before you resend"
      tone="surface"
    >
      <EdBullets>
        <li><strong>One key per instruction.</strong> Generate a new key for each new payment instruction and store it with the instruction before you send the request, so that a retry after a crash or restart uses the same key.</li>
        <li><strong>Look up before you resend.</strong> If you receive no response, the connection fails, or you receive an error, call <a href="/tech/tpp-standards/v2.1/banking/service-initiation/open-api/payments-idempotency" class="endpoint"><span class="http-method http-method--get">GET</span><code>/payments</code></a> with the same key and a client-credentials token (scope <code>openid payments</code>). A <code>200</code> points to the payment in <code>Links.Self</code>. The lookup still works after the consent's access token has expired, or the consent has been used up.</li>
        <li><strong>Resend unchanged.</strong> If the lookup returns an error, no successful payment is recorded under the key. Resend <strong>the same instruction under the same key</strong>. You may re-sign the request; do not change the instruction, and do not generate a new key.</li>
        <li><strong>Read the body.</strong> Treat a <code>201</code> received for a retry as the result of the original request. Read <code>PaymentId</code> and <code>Status</code> from the response body; do not depend on the <code>Location</code> header.</li>
        <li><strong>Payment already being processed.</strong> On the <code>403</code> that says a previous payment request is still being processed, wait for your earlier request to complete, then retry with the same key. Do not send parallel payment requests under one consent.</li>
        <li><strong>Key mismatch.</strong> On the <code>409</code> <code>Idempotency key mismatch</code>, the key already belongs to a different instruction and nothing was executed for this request. Any payment already made under the key stands. A genuinely new instruction needs a new key.</li>
        <li><strong>Errors on a retry.</strong> Do not treat an error on a retry as proof that the payment failed until you have looked the payment up by key.</li>
      </EdBullets>
      <EdCodeGroup :tabs="retryTabs" />
    </EdSectionBand>

    <EdSectionBand
      id="lfi"
      num="05"
      color="var(--at-teal-deep)"
      eyebrow="LFI de-duplication"
      title="Recognise a retry the API Hub could not answer"
      tone="cream"
    >
      <EdProse>
        The API Hub forwards the TPP's key to your Ozone Connect
        <a href="/tech/lfi-api-hub/v2.1/banking/service-initiation/open-api/payments" class="endpoint"><span class="http-method http-method--post">POST</span><code>/payments</code></a>
        endpoint in <code>requestHeaders["x-idempotency-key"]</code> of the request body. The TPP's
        client is in <code>tpp.clientId</code>, and the consent is in the <code>o3-consent-id</code>
        header. Each payment type's Payment Execution requirements carry the rule
        <em>Repeated <code>x-idempotency-key</code></em> &mdash; for example
        <a href="/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/single-instant-payment/requirements#post-payments-payment-execution">Single Instant Payment</a>.
        The LFI MUST:
      </EdProse>
      <EdBullets>
        <li>record each payment it creates against the key, the client and the consent, and keep the record for at least 24 hours;</li>
        <li>check for a matching record before every other check on the request;</li>
        <li>on a match, not execute the payment again, and return <code>201</code> with the original <code>PaymentId</code> and the payment's current <code>Status</code> &mdash; if the earlier request is still being processed, return its outcome rather than start a second payment;</li>
        <li>on a matching key with different payment details, not execute the request, and return <code>409</code> with <code>errorCode</code> <code>GenericRecoverableError</code> and <code>errorMessage</code> <code>Idempotency key mismatch: Request parameters differ from original.</code> &mdash; comparing <code>PersonalIdentifiableInformation</code> after decryption, because the encrypted value changes each time the TPP re-signs;</li>
        <li>return an error only when the payment has definitely not been submitted for processing &mdash; once it has, return <code>201</code> and report the outcome through <code>Status</code> and <a href="/tech/lfi-api-hub/v2.1/api-hub/consent-manager/open-api/payment-log-id"><code>PATCH /payment-log/{id}</code></a>.</li>
      </EdBullets>
      <EdProse>
        On the on-demand payment types, this check runs before the duplicate-in-flight check. That
        check applies only to requests whose key does not match, and it covers the period after the
        <code>201</code>, while an earlier payment is still <code>Pending</code>. The API Hub's own
        check covers the period before: it rejects a request that arrives while another request under
        the same consent is still being processed.
      </EdProse>
      <EdNote type="info" title="Why the consent is part of the LFI's key">
        <p>
          The API Hub matches keys per TPP. The LFI also matches on the consent: a request with a
          repeated key on a different consent reaches the LFI only if the API Hub recorded no payment
          for the key, and matching it to a payment on another consent would attach that payment to the
          wrong consent.
        </p>
      </EdNote>
    </EdSectionBand>

    <EdRelatedCards eyebrow="Related articles" title="Read alongside">
      <EdRelatedCard
        href="/knowledge-base/articles/request-headers"
        category="Security"
        category-color="var(--at-blue)"
        title="FAPI Request Headers"
        desc="What each request header is for, including x-fapi-interaction-id for tracing a payment end to end."
      />
      <EdRelatedCard
        href="/knowledge-base/articles/choosing-a-payment-type"
        category="Payments"
        category-color="var(--at-gold)"
        title="Choosing a Payment Type"
        desc="The seven payment shapes and how to pick the right one."
      />
    </EdRelatedCards>
  </div>
</template>

<style scoped>
.ed-page { background: var(--at-bg-cream); color: var(--at-navy-deep); font-family: var(--at-sans); padding-top: 4.25rem; }
.ed-tags { display: flex; flex-wrap: wrap; gap: 0.45rem; margin-top: 1.5rem; }
.ed-tag { padding: 0.35rem 0.7rem; background: color-mix(in srgb, var(--at-gold) 14%, transparent); color: var(--at-gold); font-family: var(--at-mono); font-size: 0.62rem; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 700; }
</style>
