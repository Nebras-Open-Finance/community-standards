<route lang="yaml">
meta:
  title: Get a Health Insurance Policy
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="TPP · Insurance · Data Sharing"
    title="Get a Health Insurance Policy"
    version="v2.1"
    method="GET"
    path="/health-insurance-policies/{InsurancePolicyId}"
  >
    <RedocWrapper
      spec="/openapi/v2.1/standards/uae-insurance-openapi.yaml"
      filterPath="/health-insurance-policies/{InsurancePolicyId}"
    />
  </EndpointPage>
</template>
