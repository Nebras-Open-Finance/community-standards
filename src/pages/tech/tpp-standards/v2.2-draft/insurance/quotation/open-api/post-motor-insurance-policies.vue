<route lang="yaml">
meta:
  title: Create a Motor Insurance Policy
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="TPP · Insurance · Quotation"
    title="Create a Motor Insurance Policy"
    version="v2.2-draft"
    method="POST"
    path="/motor-insurance-policies"
  >
    <RedocWrapper
      spec="/openapi/v2.2-draft/standards/uae-insurance-openapi.yaml"
      filterPath="/motor-insurance-policies"
      filterMethod="post"
    />
  </EndpointPage>
</template>
