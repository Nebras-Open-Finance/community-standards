---
next: false
prev: false
aside: false
---

<script setup>
import files from './index.json'
</script>

<ProtectedPageWrapper
  :gateLogo="'https://data.directory.openfinance.ae/logos/64e5061d-437f-43c8-9f17-1df9a4600705/64e5061d-437f-43c8-9f17-1df9a4600705.png'"
  gateHeader="EMIRATES NBD — Private Documents"
  gateSubheader="Private documentation for EMIRATES NBD BANK PJSC"
  gateWarningText="This section contains private documents that are only accessible to authorised members of EMIRATES NBD."
>

<div class="org-header">
<img class="org-logo" src="https://data.directory.openfinance.ae/logos/64e5061d-437f-43c8-9f17-1df9a4600705/64e5061d-437f-43c8-9f17-1df9a4600705.png" alt="logo" />

# EMIRATES NBD — Private Documents
</div>

Private documentation for **EMIRATES NBD BANK PJSC**.

<DoumentRepoDisplay :files="files" :public="false" />

</ProtectedPageWrapper>
