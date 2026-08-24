<route lang="yaml">
meta:
  title: Get Scheduled Payments for an Account
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="LFI · Banking · Data Sharing"
    title="Get Scheduled Payments for an Account"
    version="v2.2-rc1"
    method="GET"
    path="/accounts/{AccountId}/scheduled-payments"
  >
    <RedocWrapper
      spec="/openapi/v2.2-rc1/ozone-connect/uae-ozone-connect-bank-data-sharing-openapi.yaml"
      filterPath="/accounts/{accountId}/scheduled-payments"
      :overrideServers="[{ url: 'https://[Ozone_Connect_API]' }]" />
  </EndpointPage>
</template>
