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
    version="v2.2-draft"
    method="GET"
    path="/accounts/{AccountId}/statements"
  >
    <RedocWrapper
      spec="/openapi-drafts/v2.2-draft/uae-account-information-openapi.yaml"
      filterPath="/accounts/{AccountId}/statements"
    />
  </EndpointPage>
</template>
