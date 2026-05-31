<route lang="yaml">
meta:
  title: Retrieve Employment Insurance Policies (CAAP)
</route>

<template>
  <EndpointPage
    eyebrow="LFI · CAAP · Insurance Policies"
    title="Retrieve Employment Insurance Policies (CAAP)"
    version="v2.1"
    method="GET"
    path="/employment-insurance-policies"
  >
    <RedocWrapper
      spec="/openapi/v2.1/ozone-connect/uae-ozone-connect-caap-operations-openapi.yaml"
      filterPath="/employment-insurance-policies"
      :overrideServers="[{ url: 'https://[Ozone_Connect_API]' }]" />
  </EndpointPage>
</template>
