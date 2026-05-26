<route lang="yaml">
meta:
  title: Get Life Insurance Policies
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="LFI · Insurance · Data Sharing"
    title="Get Life Insurance Policies"
    version="v2.1"
    method="GET"
    path="/life-insurance-policies"
  >
    <RedocWrapper
      spec="/openapi/v2.1/ozone-connect/uae-ozone-connect-insurance-openapi.yaml"
      filterPath="/life-insurance-policies"
      :overrideServers="[{ url: 'https://[Ozone_Connect_API]' }]" />
  </EndpointPage>
</template>
