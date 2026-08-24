<route lang="yaml">
meta:
  title: Get a Home Insurance Policy
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="TPP · Insurance · Data Sharing"
    title="Get a Home Insurance Policy"
    version="v2.2-rc1"
    method="GET"
    path="/home-insurance-policies/{InsurancePolicyId}"
  >
    <RedocWrapper
      spec="/openapi/v2.2-rc1/standards/uae-insurance-openapi.yaml"
      filterPath="/home-insurance-policies/{InsurancePolicyId}"
    />
  </EndpointPage>
</template>
