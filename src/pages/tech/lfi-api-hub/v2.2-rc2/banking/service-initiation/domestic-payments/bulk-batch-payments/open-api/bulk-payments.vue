<route lang="yaml">
meta:
  title: Create a Bulk/Batch Payment
</route>

<template>
  <EndpointPage
    eyebrow="LFI · Banking · Service Initiation · Bulk/Batch"
    title="Create a Bulk/Batch Payment"
    version="v2.2-rc2"
    method="POST"
    path="/bulk-payments"
  >
    <RedocWrapper
      spec="/openapi/v2.2-rc2/ozone-connect/uae-ozone-connect-bank-service-initiation-openapi.yaml"
      filterPath="/bulk-payments"
      filterMethod="post"
      :overrideServers="[{ url: 'https://[Ozone_Connect_API]'}]" />
  </EndpointPage>
</template>
