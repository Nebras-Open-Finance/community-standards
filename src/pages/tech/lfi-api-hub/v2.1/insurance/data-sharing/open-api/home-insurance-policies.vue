<route lang="yaml">
meta:
  title: Get Home Insurance Policies
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="LFI · Insurance · Data Sharing"
    title="Get Home Insurance Policies"
    version="v2.1"
    method="GET"
    path="/home-insurance-policies"
  >
    <RedocWrapper
      spec="/openapi/v2.1/ozone-connect/uae-ozone-connect-insurance-openapi.yaml"
      filterPath="/home-insurance-policies"
      :overrideServers="[{ url: 'https://[Ozone_Connect_API]' }]" />
  </EndpointPage>
</template>
