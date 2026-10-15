<route lang="yaml">
meta:
  layout: biopay
  title: Payment status event
  next: false
  prev: false
  aside: false
</route>

<script setup lang="ts">
// The payment status event. Direction is API Hub -> BPIP: the Hub POSTs it to
// the webhook URL the BPIP gave on POST /biometric-payments, so no server is
// shown.
import { BIOPAY_SPEC } from '@/data/biopay-spec'
</script>

<template>
  <EndpointPage
    eyebrow="BioPay · Payment · Draft"
    title="Payment status event"
    version="Draft · 0.1"
    method="POST"
    path="/biometric-payment-status-events"
    description="The event the API Hub delivers to the BPIP each time the LFI patches the status of a biometric payment, as a signed and encrypted JWT."
  >
    <RedocWrapper
      :spec-text="BIOPAY_SPEC"
      filter-path="/biometric-payment-status-events"
      filter-method="post"
      display-path="/biometric-payment-status-events"
      :override-servers="[]"
      container-id="redoc-biopay-payment-status-event"
    />
  </EndpointPage>
</template>
