<route lang="yaml">
meta:
  title: Create a Life Insurance Quote
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="TPP · Insurance · Quotation"
    title="Create a Life Insurance Quote"
    version="v2.2-rc1"
    method="POST"
    path="/life-insurance-quotes"
  >
    <RedocWrapper
      spec="/openapi/v2.2-rc1/standards/uae-insurance-openapi.yaml"
      filterPath="/life-insurance-quotes"
      filterMethod="post"
    />
  </EndpointPage>
</template>
