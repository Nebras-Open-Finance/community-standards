---
next: false
prev: false
aside: false
---

<script setup>
import files from './index.json'
</script>

<ProtectedPageWrapper
  :gateLogo="'https://data.directory.openfinance.ae/logos/233bcd1d-4216-4b3c-a362-9e4a9282bba7/233bcd1d-4216-4b3c-a362-9e4a9282bba7.png'"
  gateHeader="Ozone API — Private Documents"
  gateSubheader="Private documentation for OZONE FINANCIAL TECHNOLOGY LIMITED"
  gateWarningText="This section contains private documents that are only accessible to authorised members of Ozone API."
>

<div class="org-header">
<img class="org-logo" src="https://data.directory.openfinance.ae/logos/233bcd1d-4216-4b3c-a362-9e4a9282bba7/233bcd1d-4216-4b3c-a362-9e4a9282bba7.png" alt="logo" />

# Ozone API — Private Documents
</div>

Private documentation for **OZONE FINANCIAL TECHNOLOGY LIMITED**.

<DoumentRepoDisplay :files="files" :public="false" />

</ProtectedPageWrapper>
