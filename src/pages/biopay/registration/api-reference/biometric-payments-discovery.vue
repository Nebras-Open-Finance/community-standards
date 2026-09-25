<route lang="yaml">
meta:
  layout: biopay
  title: POST /biometric-payments-discovery
  next: false
  prev: false
  aside: false
</route>

<script setup lang="ts">
// Renders the discovery operation from the co-located BioPay draft document.
// The YAML is imported raw in src/data/biopay-spec.ts and handed to
// RedocWrapper via `specText` — the same pattern the OFP proposal schema pages
// use, and the reason nothing lands in public/openapi/.
import { BIOPAY_SPEC } from '@/data/biopay-spec'

const servers = [
  { url: 'https://rs1.[LFICODE].apihub.openfinance.ae/open-finance/biometric-payments/v1' },
]
</script>

<template>
  <EndpointPage
    eyebrow="BioPay · Registration · Draft"
    title="Discover a customer's BioPay registration"
    version="Draft · 0.1"
    method="POST"
    path="/biometric-payments-discovery"
  >
    <RedocWrapper
      :spec-text="BIOPAY_SPEC"
      filter-path="/biometric-payments-discovery"
      filter-method="post"
      display-path="/biometric-payments-discovery"
      :override-servers="servers"
      container-id="redoc-biopay-discovery"
    />
  </EndpointPage>
</template>
