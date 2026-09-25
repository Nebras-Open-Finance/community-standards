<route lang="yaml">
meta:
  layout: biopay
  title: GET /biometric-payments (by idempotency key)
  next: false
  prev: false
  aside: false
</route>

<script setup lang="ts">
// The collection GET, filtered by the idempotency key the initiator generated.
// Shares its path with payment initiation, so filter-method keeps this page to
// the GET.
import { BIOPAY_SPEC } from '@/data/biopay-spec'

const servers = [
  { url: 'https://rs1.[LFICODE].apihub.openfinance.ae/open-finance/biometric-payments/v1' },
]
</script>

<template>
  <EndpointPage
    eyebrow="BioPay · Payment · Draft"
    title="Retrieve a payment by idempotency key"
    version="Draft · 0.1"
    method="GET"
    path="/biometric-payments"
    description="Retrieving a BioPay payment by the idempotency key used to create it: the recovery path when an initiator never received the 201, with request, response and error schemas."
  >
    <RedocWrapper
      :spec-text="BIOPAY_SPEC"
      filter-path="/biometric-payments"
      filter-method="get"
      display-path="/biometric-payments"
      :override-servers="servers"
      container-id="redoc-biopay-payment-by-key"
    />
  </EndpointPage>
</template>
