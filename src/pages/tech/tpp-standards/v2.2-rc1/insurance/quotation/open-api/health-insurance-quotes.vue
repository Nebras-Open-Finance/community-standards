<route lang="yaml">
meta:
  title: Create a Health Insurance Quote
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="TPP · Insurance · Quotation"
    title="Create a Health Insurance Quote"
    version="v2.2-rc1"
    method="POST"
    path="/health-insurance-quotes"
  >
    <RedocWrapper
      spec="/openapi/v2.2-rc1/standards/uae-insurance-openapi.yaml"
      filterPath="/health-insurance-quotes"
      filterMethod="post"
    />
  </EndpointPage>
</template>
