<route lang="yaml">
meta:
  title: Get Motor Insurance Policies
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="LFI · Insurance · Data Sharing"
    title="Get Motor Insurance Policies"
    version="v2.2-rc1"
    method="GET"
    path="/motor-insurance-policies"
  >
    <RedocWrapper
      spec="/openapi/v2.2-rc1/ozone-connect/uae-ozone-connect-insurance-openapi.yaml"
      filterPath="/motor-insurance-policies"
      :overrideServers="[{ url: 'https://[Ozone_Connect_API]' }]" />
  </EndpointPage>
</template>
