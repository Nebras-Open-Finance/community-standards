<route lang="yaml">
meta:
  title: Get Balances for an Account
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="TPP · Banking · Data Sharing"
    title="Get Balances for an Account"
    version="v2.2-rc1"
    method="GET"
    path="/accounts/{AccountId}/balances"
  >
    <RedocWrapper
      spec="/openapi/v2.2-rc1/standards/uae-account-information-openapi.yaml"
      filterPath="/accounts/{AccountId}/balances"
    />
  </EndpointPage>
</template>
