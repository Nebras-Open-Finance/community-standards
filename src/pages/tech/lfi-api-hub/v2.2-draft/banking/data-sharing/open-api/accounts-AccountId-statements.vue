<route lang="yaml">
meta:
  title: Get Statements for an Account
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="LFI · Banking · Data Sharing"
    title="Get Statements for an Account"
    version="v2.2-draft"
    method="GET"
    path="/accounts/{AccountId}/statements"
  >
    <RedocWrapper
      spec="/openapi-drafts/v2.2-draft/uae-ozone-connect-bank-data-sharing-openapi.yaml"
      filterPath="/accounts/{accountId}/statements"
      :overrideServers="[{ url: 'https://[Ozone_Connect_API]' }]" />
  </EndpointPage>
</template>
