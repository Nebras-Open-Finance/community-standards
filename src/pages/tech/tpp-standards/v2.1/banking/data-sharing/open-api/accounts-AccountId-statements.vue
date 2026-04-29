<route lang="yaml">
meta:
  title: Get Statements for an Account
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="TPP · Banking · Data Sharing"
    title="Get Statements for an Account"
    version="v2.1"
    method="GET"
    path="/accounts/{AccountId}/statements"
  >
    <RedocWrapper
      spec="/openapi/v2.1/standards/uae-account-information-openapi.yaml"
      filterPath="/accounts/{AccountId}/statements"
    />
  </EndpointPage>
</template>
