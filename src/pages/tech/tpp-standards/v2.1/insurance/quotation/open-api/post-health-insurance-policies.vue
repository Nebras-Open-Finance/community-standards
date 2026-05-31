<route lang="yaml">
meta:
  title: Create a Health Insurance Policy
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="TPP · Insurance · Quotation"
    title="Create a Health Insurance Policy"
    version="v2.1"
    method="POST"
    path="/health-insurance-policies"
  >
    <RedocWrapper
      spec="/openapi/v2.1/standards/uae-insurance-openapi.yaml"
      filterPath="/health-insurance-policies"
      filterMethod="post"
    />
  </EndpointPage>
</template>
