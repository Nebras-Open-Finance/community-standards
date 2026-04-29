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
    version="v2.1"
    method="GET"
    path="/parties"
  >
    <RedocWrapper
      spec="/openapi/v2.1/standards/uae-account-information-openapi.yaml"
      filterPath="/parties"
    />
  </EndpointPage>
</template>
