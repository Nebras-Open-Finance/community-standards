<route lang="yaml">
meta:
  title: Get Home Insurance Policies
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="TPP · Insurance · Data Sharing"
    title="Get Home Insurance Policies"
    version="v2.2-draft"
    method="GET"
    path="/home-insurance-policies"
  >
    <RedocWrapper
      spec="/openapi/v2.2-draft/standards/uae-insurance-openapi.yaml"
      filterPath="/home-insurance-policies"
    />
  </EndpointPage>
</template>
