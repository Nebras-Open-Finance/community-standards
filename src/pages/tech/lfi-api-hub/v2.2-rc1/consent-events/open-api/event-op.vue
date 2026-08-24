<route lang="yaml">
meta:
  title: Event When a Consent Is Updated or Created
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="LFI · Consent Events"
    title="Event When a Consent Is Updated or Created"
    version="v2.2-rc1"
    method="POST"
    path="/consent/event/{operation}"
  >
    <RedocWrapper
      spec="/openapi/v2.2-rc1/ozone-connect/uae-ozone-connect-consent-events-actions-openapi.yaml"
      filterPath="/consent/event/{operation}"
      :overrideServers="[{ url: 'https://[Ozone_Connect_API]' }]" />
  </EndpointPage>
</template>
