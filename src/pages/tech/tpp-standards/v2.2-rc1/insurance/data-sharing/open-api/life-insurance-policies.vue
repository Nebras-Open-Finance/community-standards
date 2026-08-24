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
    version="v2.2-rc1"
    method="GET"
    path="/life-insurance-policies"
  >
    <RedocWrapper
      spec="/openapi/v2.2-rc1/standards/uae-insurance-openapi.yaml"
      filterPath="/life-insurance-policies"
    />
  </EndpointPage>
</template>
