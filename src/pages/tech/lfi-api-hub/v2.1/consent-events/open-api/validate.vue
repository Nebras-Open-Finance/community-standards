<route lang="yaml">
meta:
  title: Validate Consent Before Creation
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="LFI · Consent Events"
    title="Validate Consent Before Creation"
    version="v2.1"
    method="POST"
    path="/consent/action/validate"
  >
    <RedocWrapper
      spec="/openapi/v2.1/ozone-connect/uae-ozone-connect-consent-events-actions-openapi.yaml"
      filterPath="/consent/action/validate"
      :overrideServers="[{ url: 'https://[Ozone_Connect_API]' }]" />
  </EndpointPage>
</template>
