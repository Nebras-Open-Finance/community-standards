<route lang="yaml">
meta:
  title: Create a Motor Insurance Quote
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="TPP · Insurance · Quotation"
    title="Create a Motor Insurance Quote"
    version="v2.1"
    method="POST"
    path="/motor-insurance-quotes"
  >
    <RedocWrapper
      spec="/openapi/v2.1/standards/uae-insurance-openapi.yaml"
      filterPath="/motor-insurance-quotes"
      filterMethod="post"
    />
  </EndpointPage>
</template>
