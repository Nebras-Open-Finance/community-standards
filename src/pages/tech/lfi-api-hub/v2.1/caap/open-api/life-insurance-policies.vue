<route lang="yaml">
meta:
  title: Retrieve Life Insurance Policies (CAAP)
</route>

<template>
  <EndpointPage
    eyebrow="LFI · CAAP · Insurance Policies"
    title="Retrieve Life Insurance Policies (CAAP)"
    version="v2.1"
    method="GET"
    path="/life-insurance-policies"
  >
    <RedocWrapper
      spec="/openapi/v2.1/ozone-connect/uae-ozone-connect-caap-operations-openapi.yaml"
      filterPath="/life-insurance-policies"
      :overrideServers="[{ url: 'https://[Ozone_Connect_API]' }]" />
  </EndpointPage>
</template>
