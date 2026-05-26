<route lang="yaml">
meta:
  title: Get Health Insurance Policies
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="TPP · Insurance · Data Sharing"
    title="Get Health Insurance Policies"
    version="v2.1"
    method="GET"
    path="/health-insurance-policies"
  >
    <RedocWrapper
      spec="/openapi/v2.1/standards/uae-insurance-openapi.yaml"
      filterPath="/health-insurance-policies"
    />
  </EndpointPage>
</template>
