<route lang="yaml">
meta:
  title: Get Motor Insurance Policies
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="TPP · Insurance · Data Sharing"
    title="Get Motor Insurance Policies"
    version="v2.1"
    method="GET"
    path="/motor-insurance-policies"
  >
    <RedocWrapper
      spec="/openapi/v2.1/standards/uae-insurance-openapi.yaml"
      filterPath="/motor-insurance-policies"
    />
  </EndpointPage>
</template>
