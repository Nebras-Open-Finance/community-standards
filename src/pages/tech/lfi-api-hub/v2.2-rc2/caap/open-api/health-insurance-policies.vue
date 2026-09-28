<route lang="yaml">
meta:
  title: Retrieve Health Insurance Policies (CAAP)
</route>

<template>
  <EndpointPage
    eyebrow="LFI · CAAP · Insurance Policies"
    title="Retrieve Health Insurance Policies (CAAP)"
    version="v2.2-rc2"
    method="GET"
    path="/health-insurance-policies"
  >
    <RedocWrapper
      spec="/openapi/v2.2-rc2/ozone-connect/uae-ozone-connect-caap-operations-openapi.yaml"
      filterPath="/health-insurance-policies"
      :overrideServers="[{ url: 'https://[Ozone_Connect_API]' }]" />
  </EndpointPage>
</template>
