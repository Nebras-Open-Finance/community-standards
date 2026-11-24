<route lang="yaml">
meta:
  title: Get a Payment within a Bulk/Batch Payment
</route>

<template>
  <EndpointPage
    eyebrow="LFI · Banking · Service Initiation · Bulk/Batch"
    title="Get a Payment within a Bulk/Batch Payment"
    version="v2.2-rc2"
    method="GET"
    path="/bulk-payments/{bulkPaymentId}/payments/{paymentId}"
  >
    <RedocWrapper
      spec="/openapi/v2.2-rc2/ozone-connect/uae-ozone-connect-bank-service-initiation-openapi.yaml"
      filterPath="/bulk-payments/{bulkPaymentId}/payments/{paymentId}"
      filterMethod="get"
      :overrideServers="[{ url: 'https://[Ozone_Connect_API]'}]" />
  </EndpointPage>
</template>
