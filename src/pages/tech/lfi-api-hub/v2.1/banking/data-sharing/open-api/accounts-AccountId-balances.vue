<route lang="yaml">
meta:
  title: Get Balances for an Account
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="LFI · Banking · Data Sharing"
    title="Get Balances for an Account"
    version="v2.1"
    method="GET"
    path="/accounts/{AccountId}/balances"
  >
    <RedocWrapper
      spec="/openapi/v2.1/ozone-connect/uae-ozone-connect-bank-data-sharing-openapi.yaml"
      filterPath="/accounts/{accountId}/balances"
      :overrideServers="[{ url: 'https://[Ozone_Connect_API]' }]" />
  </EndpointPage>
</template>
