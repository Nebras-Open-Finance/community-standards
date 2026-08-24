<route lang="yaml">
meta:
  title: Get Standing Orders for an Account
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="TPP · Banking · Data Sharing"
    title="Get Standing Orders for an Account"
    version="v2.2-rc1"
    method="GET"
    path="/accounts/{AccountId}/standing-orders"
  >
    <RedocWrapper
      spec="/openapi/v2.2-rc1/standards/uae-account-information-openapi.yaml"
      filterPath="/accounts/{AccountId}/standing-orders"
    />
  </EndpointPage>
</template>
