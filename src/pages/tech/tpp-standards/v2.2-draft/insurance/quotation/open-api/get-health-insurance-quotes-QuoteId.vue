<route lang="yaml">
meta:
  title: Retrieve a Health Insurance Quote
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="TPP · Insurance · Quotation"
    title="Retrieve a Health Insurance Quote"
    version="v2.2-draft"
    method="GET"
    path="/health-insurance-quotes/{QuoteId}"
  >
    <RedocWrapper
      spec="/openapi/v2.2-draft/standards/uae-insurance-openapi.yaml"
      filterPath="/health-insurance-quotes/{QuoteId}"
      filterMethod="get"
    />
  </EndpointPage>
</template>
