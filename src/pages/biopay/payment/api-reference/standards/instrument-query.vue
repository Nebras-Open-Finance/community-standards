<route lang="yaml">
meta:
  layout: biopay
  title: POST /instrument-query
  next: false
  prev: false
  aside: false
</route>

<script setup lang="ts">
// Standards: BPIP -> API Hub. Rendered from api-specs PR #37 (see
// src/data/biopay-spec.ts). The servers follow the rs1.* hosts every other
// standards page shows, with the base path the spec declares.
import { BIOPAY_STANDARDS_SPEC } from '@/data/biopay-spec'

const servers = [
  { url: 'https://rs1.[LFICODE].apihub.openfinance.ae/open-finance/biometric-payments/v2.2' },
  { url: 'https://rs1.[LFICODE].preprod.apihub.openfinance.ae/open-finance/biometric-payments/v2.2' },
  { url: 'https://rs1.altareq1.sandbox.apihub.openfinance.ae/open-finance/biometric-payments/v2.2' },
]
</script>

<template>
  <EndpointPage
    eyebrow="BioPay · Standards · BPIP → API Hub"
    title="Query a customer's default instrument"
    version="v2.2-rc2 · Draft"
    method="POST"
    path="/instrument-query"
    description="Called by the BPIP on the API Hub. Returns the instrument the customer designated at the LFI for ICP Pay, with a single-use payment token. The API Hub forwards the request to the LFI's Ozone Connect POST /customers/action/instrument-query."
  >
    <RedocWrapper
      :spec-text="BIOPAY_STANDARDS_SPEC"
      filter-path="/instrument-query"
      filter-method="post"
      display-path="/instrument-query"
      :override-servers="servers"
      container-id="redoc-biopay-standards-instrument-query"
    />
  </EndpointPage>
</template>
