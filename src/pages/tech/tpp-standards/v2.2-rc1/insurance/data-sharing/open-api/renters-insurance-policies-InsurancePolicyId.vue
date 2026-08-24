<route lang="yaml">
meta:
  title: Get a Renters Insurance Policy
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="TPP · Insurance · Data Sharing"
    title="Get a Renters Insurance Policy"
    version="v2.2-rc1"
    method="GET"
    path="/renters-insurance-policies/{InsurancePolicyId}"
  >
    <RedocWrapper
      spec="/openapi/v2.2-rc1/standards/uae-insurance-openapi.yaml"
      filterPath="/renters-insurance-policies/{InsurancePolicyId}"
    />
  </EndpointPage>
</template>
