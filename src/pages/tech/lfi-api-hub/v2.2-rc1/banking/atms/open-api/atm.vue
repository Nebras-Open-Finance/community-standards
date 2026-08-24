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
    version="v2.2-rc1"
    method="GET"
    path="/atm"
  >
    <RedocWrapper
      spec="/openapi/v2.2-rc1/ozone-connect/uae-ozone-connect-bank-open-data-openapi.yaml"
      filterPath="/atm"
      :overrideServers="[{ url: 'https://[Ozone_Connect_API]' }]" />
  </EndpointPage>
</template>
