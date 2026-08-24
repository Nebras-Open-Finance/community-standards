<route lang="yaml">
meta:
  title: Get a Health Insurance Policy
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="LFI · Insurance · Data Sharing"
    title="Get a Health Insurance Policy"
    version="v2.2-rc1"
    method="GET"
    path="/health-insurance-policies/{InsurancePolicyId}"
  >
    <RedocWrapper
      spec="/openapi/v2.2-rc1/ozone-connect/uae-ozone-connect-insurance-openapi.yaml"
      filterPath="/health-insurance-policies/{InsurancePolicyId}"
      :overrideServers="[{ url: 'https://[Ozone_Connect_API]' }]" />
  </EndpointPage>
</template>
