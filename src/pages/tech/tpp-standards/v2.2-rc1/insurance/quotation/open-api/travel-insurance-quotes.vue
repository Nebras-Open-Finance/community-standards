<route lang="yaml">
meta:
  title: Create a Travel Insurance Quote
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="TPP · Insurance · Quotation"
    title="Create a Travel Insurance Quote"
    version="v2.2-rc1"
    method="POST"
    path="/travel-insurance-quotes"
  >
    <RedocWrapper
      spec="/openapi/v2.2-rc1/standards/uae-insurance-openapi.yaml"
      filterPath="/travel-insurance-quotes"
      filterMethod="post"
    />
  </EndpointPage>
</template>
