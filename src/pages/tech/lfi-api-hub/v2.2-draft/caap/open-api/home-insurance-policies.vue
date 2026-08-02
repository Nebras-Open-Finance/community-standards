<route lang="yaml">
meta:
  title: Retrieve Home Insurance Policies (CAAP)
</route>

<template>
  <EndpointPage
    eyebrow="LFI · CAAP · Insurance Policies"
    title="Retrieve Home Insurance Policies (CAAP)"
    version="v2.2-draft"
    method="GET"
    path="/home-insurance-policies"
  >
    <RedocWrapper
      spec="/openapi/v2.2-draft/ozone-connect/uae-ozone-connect-caap-operations-openapi.yaml"
      filterPath="/home-insurance-policies"
      :overrideServers="[{ url: 'https://[Ozone_Connect_API]' }]" />
  </EndpointPage>
</template>
