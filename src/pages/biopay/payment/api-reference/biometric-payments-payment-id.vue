<route lang="yaml">
meta:
  layout: biopay
  title: GET /biometric-payments/{PaymentId}
  next: false
  prev: false
  aside: false
</route>

<script setup lang="ts">
import { BIOPAY_SPEC } from '@/data/biopay-spec'

const servers = [
  { url: 'https://rs1.[LFICODE].apihub.openfinance.ae/open-finance/biometric-payments/v1' },
]
</script>

<template>
  <EndpointPage
    eyebrow="BioPay · Payment · Draft"
    title="Retrieve a payment by PaymentId"
    version="Draft · 0.1"
    method="GET"
    path="/biometric-payments/{PaymentId}"
  >
    <RedocWrapper
      :spec-text="BIOPAY_SPEC"
      filter-path="/biometric-payments/{PaymentId}"
      filter-method="get"
      display-path="/biometric-payments/{PaymentId}"
      :override-servers="servers"
      container-id="redoc-biopay-payment-by-id"
    />
  </EndpointPage>
</template>
