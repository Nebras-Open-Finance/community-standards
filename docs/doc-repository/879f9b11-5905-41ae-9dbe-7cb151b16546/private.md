---
next: false
prev: false
aside: false
---

<script setup>
import files from './index.json'
</script>

<ProtectedPageWrapper
  :gateLogo="'https://data.directory.openfinance.ae/logos/879f9b11-5905-41ae-9dbe-7cb151b16546/879f9b11-5905-41ae-9dbe-7cb151b16546.jpg'"
  gateHeader="LIVA - Private Documents"
  gateSubheader="Private documentation for LIVA"
  gateWarningText="This section contains private documents that are only accessible to authorized members of LIVA."
>

<div class="org-header">
<img class="org-logo" src="https://data.directory.openfinance.ae/logos/879f9b11-5905-41ae-9dbe-7cb151b16546/879f9b11-5905-41ae-9dbe-7cb151b16546.jpg" alt="logo" />

# LIVA - Private Documents
</div>

Private documentation for **LIVA**.

<DoumentRepoDisplay :files="files" :public="false" />

</ProtectedPageWrapper>
