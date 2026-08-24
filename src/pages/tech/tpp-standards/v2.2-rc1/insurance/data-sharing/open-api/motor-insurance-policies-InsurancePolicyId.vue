<route lang="yaml">
meta:
  title: Get a Motor Insurance Policy
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="TPP · Insurance · Data Sharing"
    title="Get a Motor Insurance Policy"
    version="v2.2-rc1"
    method="GET"
    path="/motor-insurance-policies/{InsurancePolicyId}"
  >
    <RedocWrapper
      spec="/openapi/v2.2-rc1/standards/uae-insurance-openapi.yaml"
      filterPath="/motor-insurance-policies/{InsurancePolicyId}"
    />
  </EndpointPage>
</template>
