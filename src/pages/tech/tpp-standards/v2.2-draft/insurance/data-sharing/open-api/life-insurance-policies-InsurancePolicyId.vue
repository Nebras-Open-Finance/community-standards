<route lang="yaml">
meta:
  title: Get a Life Insurance Policy
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="TPP · Insurance · Data Sharing"
    title="Get a Life Insurance Policy"
    version="v2.2-draft"
    method="GET"
    path="/life-insurance-policies/{InsurancePolicyId}"
  >
    <RedocWrapper
      spec="/openapi/v2.2-draft/standards/uae-insurance-openapi.yaml"
      filterPath="/life-insurance-policies/{InsurancePolicyId}"
    />
  </EndpointPage>
</template>
