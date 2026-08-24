<route lang="yaml">
meta:
  title: Retrieve Travel Insurance Policies (CAAP)
</route>

<template>
  <EndpointPage
    eyebrow="LFI · CAAP · Insurance Policies"
    title="Retrieve Travel Insurance Policies (CAAP)"
    version="v2.2-rc1"
    method="GET"
    path="/travel-insurance-policies"
  >
    <RedocWrapper
      spec="/openapi/v2.2-rc1/ozone-connect/uae-ozone-connect-caap-operations-openapi.yaml"
      filterPath="/travel-insurance-policies"
      :overrideServers="[{ url: 'https://[Ozone_Connect_API]' }]" />
  </EndpointPage>
</template>
