<route lang="yaml">
meta:
  title: Get Employment Insurance Policies
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="TPP · Insurance · Data Sharing"
    title="Get Employment Insurance Policies"
    version="v2.2-rc1"
    method="GET"
    path="/employment-insurance-policies"
  >
    <RedocWrapper
      spec="/openapi/v2.2-rc1/standards/uae-insurance-openapi.yaml"
      filterPath="/employment-insurance-policies"
    />
  </EndpointPage>
</template>
