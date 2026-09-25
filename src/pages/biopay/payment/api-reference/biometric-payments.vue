<route lang="yaml">
meta:
  layout: biopay
  title: POST /biometric-payments
  next: false
  prev: false
  aside: false
</route>

<script setup lang="ts">
// Payment initiation. /biometric-payments carries both a POST and a GET in the
// draft document, so filter-method is what keeps this page to the POST.
import { BIOPAY_SPEC } from '@/data/biopay-spec'

const servers = [
  { url: 'https://rs1.[LFICODE].apihub.openfinance.ae/open-finance/biometric-payments/v1' },
]
</script>

<template>
  <EndpointPage
    eyebrow="BioPay · Payment · Draft"
    title="Initiate a biometric payment"
    version="Draft · 0.1"
    method="POST"
    path="/biometric-payments"
  >
    <RedocWrapper
      :spec-text="BIOPAY_SPEC"
      filter-path="/biometric-payments"
      filter-method="post"
      display-path="/biometric-payments"
      :override-servers="servers"
      container-id="redoc-biopay-payment-create"
    />
  </EndpointPage>
</template>
