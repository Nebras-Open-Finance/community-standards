<route lang="yaml">
meta:
  title: Create a Employment Insurance Policy
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="TPP · Insurance · Quotation"
    title="Create a Employment Insurance Policy"
    version="v2.1"
    method="POST"
    path="/employment-insurance-policies"
  >
    <RedocWrapper
      spec="/openapi/v2.1/standards/uae-insurance-openapi.yaml"
      filterPath="/employment-insurance-policies"
      filterMethod="post"
    />
  </EndpointPage>
</template>
