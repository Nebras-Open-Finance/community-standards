<route lang="yaml">
meta:
  title: Get a Home Insurance Policy
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="LFI · Insurance · Data Sharing"
    title="Get a Home Insurance Policy"
    version="v2.1"
    method="GET"
    path="/home-insurance-policies/{InsurancePolicyId}"
  >
    <RedocWrapper
      spec="/openapi/v2.1/ozone-connect/uae-ozone-connect-insurance-openapi.yaml"
      filterPath="/home-insurance-policies/{InsurancePolicyId}"
      :overrideServers="[{ url: 'https://[Ozone_Connect_API]' }]" />
  </EndpointPage>
</template>
