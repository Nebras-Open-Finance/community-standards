<script setup lang="ts">
// Shared by the v2.1 and v2.2-rc2 LFI payment API guides: how the LFI's Ozone
// Connect POST /payments endpoint recognises a repeated x-idempotency-key.
// `rule` is the number of the "Repeated x-idempotency-key" rule in the page's
// Payment Execution requirements table; `duplicateInFlight` is set on the
// on-demand types, whose guides carry a #duplicate-in-flight section.
defineProps<{ rule: number; duplicateInFlight?: boolean }>()

const { docsVersion } = useRouteVersion()

const repeatedKeyNode = `// Runs before every other check on the request.
async function handleRepeatedKey(body: MakePaymentRequest, consentId: string) {
  const scope = {
    key:      body.requestHeaders['x-idempotency-key'],
    clientId: body.tpp.clientId,
    consentId,                                   // the o3-consent-id header
  }
  const details = await paymentDetails(body.request.Data)  // PII compared after decryption

  // Atomic insert-if-absent, so two concurrent repeats cannot both go ahead.
  // Keep each record for at least 24 hours.
  const claim = await idempotencyStore.claim(scope, details)
  if (claim.isNew) return null                   // first time: validate and create the payment

  if (!sameDetails(claim.record.details, details)) {
    throw httpError(409, 'GenericRecoverableError',
      'Idempotency key mismatch: Request parameters differ from original.')
  }
  const payment = await claim.record.waitForPayment()  // earlier request still running? wait
  return { status: 201, body: toPaymentResponse(payment) }  // original PaymentId, current Status
}

// When you return an error for a request (the payment was not submitted),
// release its claim so that the TPP's retry is processed as a new request:
//   await idempotencyStore.release(scope)
`

const repeatedKeyPython = `# Runs before every other check on the request.
def handle_repeated_key(body: dict, consent_id: str):
    scope = {
        "key": body["requestHeaders"]["x-idempotency-key"],
        "client_id": body["tpp"]["clientId"],
        "consent_id": consent_id,                # the o3-consent-id header
    }
    details = payment_details(body["request"]["Data"])  # PII compared after decryption

    # Atomic insert-if-absent, so two concurrent repeats cannot both go ahead.
    # Keep each record for at least 24 hours.
    claim = idempotency_store.claim(scope, details)
    if claim.is_new:
        return None                              # first time: validate and create the payment

    if not same_details(claim.record.details, details):
        raise HttpError(409, "GenericRecoverableError",
            "Idempotency key mismatch: Request parameters differ from original.")
    payment = claim.record.wait_for_payment()    # earlier request still running? wait
    return 201, to_payment_response(payment)     # original PaymentId, current Status

# When you return an error for a request (the payment was not submitted),
# release its claim so that the TPP's retry is processed as a new request:
#   idempotency_store.release(scope)
`

const repeatedKeyTabs = [
  { label: 'Node.js', lang: 'typescript', code: repeatedKeyNode },
  { label: 'Python',  lang: 'python',     code: repeatedKeyPython },
] as const
</script>

<template>
  <div class="ag-step">
    <EdProse>
      The API Hub answers a repeated <code>x-idempotency-key</code> itself only when your endpoint
      returned <code>201</code> for the earlier request. A TPP retry after an error or a timeout is
      forwarded to you as a new request, and you may already have created, or even executed, that
      payment. Per
      <a href="./requirements#post-payments-payment-execution">POST <code>/payments</code> Requirements</a>
      rule {{ rule }}, recognise the retry before you run any other check:
    </EdProse>

    <EdBullets>
      <li>
        <strong>Record every payment you create</strong> against three values: the
        <code>x-idempotency-key</code> in <code>requestHeaders</code>, the <code>tpp.clientId</code>,
        and the <code>o3-consent-id</code> header. Keep the record for at least 24 hours. The client
        identifies the TPP, because two TPPs can choose the same key. The consent keeps a key that a
        TPP wrongly reuses on another consent from being matched to a payment on the wrong consent.
      </li>
      <li>
        <strong>Same key, same payment.</strong> Do not execute it again. Return <code>201</code>
        with the original <code>PaymentId</code> and the payment's current <code>Status</code>. If
        the earlier request is still being processed, do not start a second payment; return the
        outcome of the earlier one.
      </li>
      <li>
        <strong>Same key, different payment details.</strong> Do not execute it. Return
        <code>409</code> with <code>errorCode</code> <code>GenericRecoverableError</code> and
        <code>errorMessage</code>
        <code>Idempotency key mismatch: Request parameters differ from original.</code>, the same
        error the API Hub returns for this case. Compare <code>PersonalIdentifiableInformation</code>
        after decryption: the encrypted value changes each time the TPP re-signs a retry.
      </li>
      <li>
        <strong>Errors.</strong> Return an error only when the payment has definitely not been
        submitted for processing. Once it has been, return <code>201</code> and report the outcome
        through <code>Status</code> and
        <a :href="`/tech/lfi-api-hub/${docsVersion}/api-hub/consent-manager/open-api/payment-log-id`"><code>PATCH /payment-log/{id}</code></a>.
        An error tells the TPP to retry, so an error for a payment that is going ahead invites a
        repeat.
      </li>
      <li v-if="duplicateInFlight">
        Run this check before the <a href="#duplicate-in-flight">duplicate-in-flight check</a>,
        which applies only to requests whose key does not match.
      </li>
    </EdBullets>

    <EdCodeGroup :tabs="repeatedKeyTabs" />

    <EdProse>
      See <a href="/knowledge-base/articles/payment-idempotency">Payment Idempotency</a> for what the
      API Hub does with the key, and when a repeat reaches you.
    </EdProse>
  </div>
</template>
