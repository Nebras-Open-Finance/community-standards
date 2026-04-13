---
next: false
prev: false
aside: false
---

<script setup>
import files from './index.json'
</script>

<ProtectedPageWrapper
  :gateLogo="'https://data.directory.openfinance.ae/logos/36b067c3-8017-4144-bb7e-49cf794089c9/36b067c3-8017-4144-bb7e-49cf794089c9.jpg'"
  gateHeader="ADCB — Private Documents"
  gateSubheader="Private documentation for Abu Dhabi Commercial Bank PBJC"
  gateWarningText="This section contains private documents that are only accessible to authorised members of ADCB."
>

<div class="org-header">
<img class="org-logo" src="https://data.directory.openfinance.ae/logos/36b067c3-8017-4144-bb7e-49cf794089c9/36b067c3-8017-4144-bb7e-49cf794089c9.jpg" alt="logo" />

# ADCB — Private Documents
</div>

Private documentation for **Abu Dhabi Commercial Bank PBJC**.

<DoumentRepoDisplay :files="files" :public="false" />

</ProtectedPageWrapper>
