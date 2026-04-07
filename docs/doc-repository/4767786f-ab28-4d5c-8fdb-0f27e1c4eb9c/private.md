---
next: false
prev: false
aside: false
---

<script setup>
import files from './index.json'
</script>

<ProtectedPageWrapper
  :gateLogo="'https://data.directory.openfinance.ae/logos/4767786f-ab28-4d5c-8fdb-0f27e1c4eb9c/4767786f-ab28-4d5c-8fdb-0f27e1c4eb9c.jpg'"
  gateHeader="Mashreq — Private Documents"
  gateSubheader="Private documentation for MASHREQ BANK PSC"
  gateWarningText="This section contains private documents that are only accessible to authorised members of Mashreq."
>

<div class="org-header">
<img class="org-logo" src="https://data.directory.openfinance.ae/logos/4767786f-ab28-4d5c-8fdb-0f27e1c4eb9c/4767786f-ab28-4d5c-8fdb-0f27e1c4eb9c.jpg" alt="logo" />

# Mashreq — Private Documents
</div>

Private documentation for **MASHREQ BANK PSC**.

<DoumentRepoDisplay :files="files" :public="false" />

</ProtectedPageWrapper>
