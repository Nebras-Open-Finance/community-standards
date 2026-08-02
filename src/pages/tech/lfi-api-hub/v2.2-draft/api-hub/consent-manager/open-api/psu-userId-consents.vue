<route lang="yaml">
meta:
  title: Get Consents by End User
</route>

<script setup lang="ts">
// v2.2 gives this operation a multi-valued `status` filter (changelog §2), which
// is not in the published api-specs release yet, so the spec is served from
// public/openapi-drafts/ — generated from the fetched v2.1 document by
// scripts/build-openapi-drafts.mjs. Drop SPEC back to the fetched path once the
// change lands upstream; see src/data/openapi-drafts.ts.
import { draftSpecUrl } from '@/data/openapi-drafts'

const SPEC = draftSpecUrl('v2.2-draft', 'uae-api-hub-consent-manager-openapi')
</script>

<template>
  <EndpointPage
    eyebrow="LFI · API Hub · Consent Manager"
    title="Get Consents by End User"
    version="v2.2-draft"
    method="GET"
    path="/psu/{UserId}/consents"
  >
    <RedocWrapper
      :spec="SPEC"
      filterPath="/psu/{userId}/consents"
      filterMethod="get"
      :overrideServers="[ { url: 'https://cm.[LFICODE].apihub.openfinance.ae' }, { url: 'https://cm.[LFICODE].preprod.apihub.openfinance.ae' }]" />
  </EndpointPage>
</template>
