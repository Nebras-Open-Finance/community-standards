<route lang="yaml">
meta:
  layout: biopay
  title: POST /customers/action/instrument-query
  next: false
  prev: false
  aside: false
</route>

<script setup lang="ts">
// Ozone Connect: API Hub -> LFI. Rendered from api-specs PR #37 (see
// src/data/biopay-spec.ts). The server placeholder matches the other Ozone
// Connect endpoint pages.
import { BIOPAY_OZONE_CONNECT_SPEC } from '@/data/biopay-spec'

const servers = [{ url: 'https://[Ozone_Connect_API]' }]
</script>

<template>
  <EndpointPage
    eyebrow="BioPay · Ozone Connect · API Hub → LFI"
    title="Retrieve instruments based on an instrument query"
    version="v2.2.1 · Draft"
    method="POST"
    path="/customers/action/instrument-query"
    description="Called by the API Hub on the LFI's Ozone Connect. Carries the BPIP's encrypted POST /instrument-query request unchanged; the LFI validates the ICP token with ICP and returns the signed, encrypted response."
  >
    <RedocWrapper
      :spec-text="BIOPAY_OZONE_CONNECT_SPEC"
      filter-path="/customers/action/instrument-query"
      filter-method="post"
      display-path="/customers/action/instrument-query"
      :override-servers="servers"
      container-id="redoc-biopay-ozone-connect-instrument-query"
    />
  </EndpointPage>
</template>
