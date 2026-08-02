<route lang="yaml">
meta:
  title: Get Renters Insurance Policies
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="TPP · Insurance · Data Sharing"
    title="Get Renters Insurance Policies"
    version="v2.2-draft"
    method="GET"
    path="/renters-insurance-policies"
  >
    <RedocWrapper
      spec="/openapi/v2.2-draft/standards/uae-insurance-openapi.yaml"
      filterPath="/renters-insurance-policies"
    />
  </EndpointPage>
</template>
