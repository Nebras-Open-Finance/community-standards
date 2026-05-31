<route lang="yaml">
meta:
  title: Create a Life Insurance Policy
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="TPP · Insurance · Quotation"
    title="Create a Life Insurance Policy"
    version="v2.1"
    method="POST"
    path="/life-insurance-policies"
  >
    <RedocWrapper
      spec="/openapi/v2.1/standards/uae-insurance-openapi.yaml"
      filterPath="/life-insurance-policies"
      filterMethod="post"
    />
  </EndpointPage>
</template>
