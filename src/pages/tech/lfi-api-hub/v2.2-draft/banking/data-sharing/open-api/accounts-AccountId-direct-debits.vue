<route lang="yaml">
meta:
  title: Get Direct Debits for an Account
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="LFI · Banking · Data Sharing"
    title="Get Direct Debits for an Account"
    version="v2.2-draft"
    method="GET"
    path="/accounts/{AccountId}/direct-debits"
  >
    <RedocWrapper
      spec="/openapi-drafts/v2.2-draft/uae-ozone-connect-bank-data-sharing-openapi.yaml"
      filterPath="/accounts/{accountId}/direct-debits"
      :overrideServers="[{ url: 'https://[Ozone_Connect_API]' }]" />
  </EndpointPage>
</template>
