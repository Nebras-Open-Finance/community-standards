<route lang="yaml">
meta:
  title: Get Life Insurance Policies
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="TPP · Insurance · Data Sharing"
    title="Get Life Insurance Policies"
    version="v2.2-draft"
    method="GET"
    path="/life-insurance-policies"
  >
    <RedocWrapper
      spec="/openapi/v2.2-draft/standards/uae-insurance-openapi.yaml"
      filterPath="/life-insurance-policies"
    />
  </EndpointPage>
</template>
