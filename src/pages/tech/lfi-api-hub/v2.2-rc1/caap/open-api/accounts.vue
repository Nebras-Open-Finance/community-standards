<route lang="yaml">
meta:
  title: Retrieve Accounts (CAAP)
</route>

<template>
  <EndpointPage
    eyebrow="LFI · CAAP · Accounts"
    title="Retrieve Accounts (CAAP)"
    version="v2.2-rc1"
    method="GET"
    path="/accounts"
  >
    <RedocWrapper
      spec="/openapi/v2.2-rc1/ozone-connect/uae-ozone-connect-caap-operations-openapi.yaml"
      filterPath="/accounts"
      filterMethod="get"
      :overrideServers="[{ url: 'https://[Ozone_Connect_API]' }]" />
  </EndpointPage>
</template>
