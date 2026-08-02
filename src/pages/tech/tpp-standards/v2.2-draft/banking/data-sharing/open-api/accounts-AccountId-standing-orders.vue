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
    version="v2.2-draft"
    method="GET"
    path="/accounts/{AccountId}/standing-orders"
  >
    <RedocWrapper
      spec="/openapi-drafts/v2.2-draft/uae-account-information-openapi.yaml"
      filterPath="/accounts/{AccountId}/standing-orders"
    />
  </EndpointPage>
</template>
