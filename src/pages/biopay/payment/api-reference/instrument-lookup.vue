<route lang="yaml">
meta:
  layout: biopay
  title: POST /instrument-lookup
  next: false
  prev: false
  aside: false
</route>

<script setup lang="ts">
// Card flow, Option 1 only: the BPIP asks the LFI, through the API Hub, which
// payment instrument it holds for a uaeKycId before choosing a rail.
import { BIOPAY_SPEC } from '@/data/biopay-spec'

const servers = [
  { url: 'https://rs1.[LFICODE].apihub.openfinance.ae/open-finance/biometric-payments/v1' },
]
</script>

<template>
  <EndpointPage
    eyebrow="BioPay · Card Flow · Option 1 · Draft"
    title="Look up a customer's payment instrument"
    version="Draft · 0.1"
    method="POST"
    path="/instrument-lookup"
  >
    <RedocWrapper
      :spec-text="BIOPAY_SPEC"
      filter-path="/instrument-lookup"
      filter-method="post"
      display-path="/instrument-lookup"
      :override-servers="servers"
      container-id="redoc-biopay-instrument-lookup"
    />
  </EndpointPage>
</template>
