<route lang="yaml">
meta:
  title: Get Travel Insurance Policies
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="TPP · Insurance · Data Sharing"
    title="Get Travel Insurance Policies"
    version="v2.2-rc1"
    method="GET"
    path="/travel-insurance-policies"
  >
    <RedocWrapper
      spec="/openapi/v2.2-rc1/standards/uae-insurance-openapi.yaml"
      filterPath="/travel-insurance-policies"
    />
  </EndpointPage>
</template>
