<route lang="yaml">
meta:
  title: Get Customers
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="TPP · Banking · Data Sharing"
    title="Get Customers"
    version="v2.2-draft"
    method="GET"
    path="/parties"
  >
    <RedocWrapper
      spec="/openapi-drafts/v2.2-draft/uae-account-information-openapi.yaml"
      filterPath="/parties"
    />
  </EndpointPage>
</template>
