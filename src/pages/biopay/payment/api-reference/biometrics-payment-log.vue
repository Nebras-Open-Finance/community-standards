<route lang="yaml">
meta:
  layout: biopay
  title: PATCH /biometrics-payment-log
  next: false
  prev: false
  aside: false
</route>

<script setup lang="ts">
// The payment log patch. Direction is LFI -> API Hub, like the registration
// event's is Hub -> initiator, so the server shown is the Consent Manager host
// the LFI already calls rather than the rs1.* host the initiator-facing
// operations use.
import { BIOPAY_SPEC } from '@/data/biopay-spec'

const servers = [
  { url: 'https://cm.[LFICODE].apihub.openfinance.ae' },
  { url: 'https://cm.[LFICODE].preprod.apihub.openfinance.ae' },
]
</script>

<template>
  <EndpointPage
    eyebrow="BioPay · Payment · Draft"
    title="Report the outcome of a biometric payment"
    version="Draft · 0.1"
    method="PATCH"
    path="/biometrics-payment-log/{id}"
    description="The call an LFI makes to set the status the API Hub holds for a biometric payment. It is what moves a payment out of Pending, what triggers the payment status event, and what the initiator's polling reads."
  >
    <RedocWrapper
      :spec-text="BIOPAY_SPEC"
      filter-path="/biometrics-payment-log/{id}"
      filter-method="patch"
      display-path="/biometrics-payment-log/{id}"
      :override-servers="servers"
      container-id="redoc-biopay-payment-log-patch"
    />
  </EndpointPage>
</template>
