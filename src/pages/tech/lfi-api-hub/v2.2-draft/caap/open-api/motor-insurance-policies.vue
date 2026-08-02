<route lang="yaml">
meta:
  title: Retrieve Motor Insurance Policies (CAAP)
</route>

<template>
  <EndpointPage
    eyebrow="LFI · CAAP · Insurance Policies"
    title="Retrieve Motor Insurance Policies (CAAP)"
    version="v2.2-draft"
    method="GET"
    path="/motor-insurance-policies"
  >
    <RedocWrapper
      spec="/openapi/v2.2-draft/ozone-connect/uae-ozone-connect-caap-operations-openapi.yaml"
      filterPath="/motor-insurance-policies"
      :overrideServers="[{ url: 'https://[Ozone_Connect_API]' }]" />
  </EndpointPage>
</template>
