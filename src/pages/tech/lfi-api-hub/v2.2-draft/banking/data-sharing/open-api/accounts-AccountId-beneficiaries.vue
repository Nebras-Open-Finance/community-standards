<route lang="yaml">
meta:
  title: Get Beneficiaries for an Account
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="LFI · Banking · Data Sharing"
    title="Get Beneficiaries for an Account"
    version="v2.2-draft"
    method="GET"
    path="/accounts/{AccountId}/beneficiaries"
  >
    <RedocWrapper
      spec="/openapi-drafts/v2.2-draft/uae-ozone-connect-bank-data-sharing-openapi.yaml"
      filterPath="/accounts/{accountId}/beneficiaries"
      :overrideServers="[{ url: 'https://[Ozone_Connect_API]' }]" />
  </EndpointPage>
</template>
