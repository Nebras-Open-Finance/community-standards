<route lang="yaml">
meta:
  title: Get an Employment Insurance Policy
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="TPP · Insurance · Data Sharing"
    title="Get an Employment Insurance Policy"
    version="v2.2-rc1"
    method="GET"
    path="/employment-insurance-policies/{InsurancePolicyId}"
  >
    <RedocWrapper
      spec="/openapi/v2.2-rc1/standards/uae-insurance-openapi.yaml"
      filterPath="/employment-insurance-policies/{InsurancePolicyId}"
    />
  </EndpointPage>
</template>
