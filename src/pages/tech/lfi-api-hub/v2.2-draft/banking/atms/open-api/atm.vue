<route lang="yaml">
meta:
  title: Retrieve ATMs
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="LFI · Banking · ATMs"
    title="Retrieve ATMs"
    version="v2.2-draft"
    method="GET"
    path="/atm"
  >
    <RedocWrapper
      spec="/openapi/v2.2-draft/ozone-connect/uae-ozone-connect-bank-open-data-openapi.yaml"
      filterPath="/atm"
      :overrideServers="[{ url: 'https://[Ozone_Connect_API]' }]" />
  </EndpointPage>
</template>
