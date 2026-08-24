<route lang="yaml">
meta:
  title: Confirm the IBAN matches the Name on the Account
</route>

<script setup lang="ts">
</script>

<template>
  <EndpointPage
    eyebrow="LFI · Banking · Confirmation of Payee"
    title="Confirm the IBAN matches the Name on the Account"
    version="v2.2-rc1"
    method="POST"
    path="/customers/action/cop-query"
  >
    <RedocWrapper
      spec="/openapi/v2.2-rc1/ozone-connect/uae-ozone-connect-bank-data-sharing-openapi.yaml"
      filterPath="/customers/action/cop-query"
      :overrideServers="[{ url: 'https://[Ozone_Connect_API]' }]" />
  </EndpointPage>
</template>
