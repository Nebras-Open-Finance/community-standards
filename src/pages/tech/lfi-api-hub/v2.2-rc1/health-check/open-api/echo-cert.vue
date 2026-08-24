<route lang="yaml">
meta:
  title: Echo Cert
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="LFI · Health Check"
    title="Echo Cert"
    version="v2.2-rc1"
    method="GET"
    path="/echo-cert"
  >
    <RedocWrapper
      spec="/openapi/v2.2-rc1/ozone-connect/uae-ozone-connect-health-check-openapi.yaml"
      filterPath="/echo-cert"
      filterMethod="get"
      :overrideServers="[{ url: 'https://[Ozone_Connect_API]' }]" />
  </EndpointPage>
</template>
