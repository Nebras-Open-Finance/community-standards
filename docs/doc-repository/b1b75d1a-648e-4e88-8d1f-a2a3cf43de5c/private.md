---
next: false
prev: false
aside: false
---

<script setup>
import files from './index.json'
</script>

<ProtectedPageWrapper
  :gateLogo="'https://data.directory.openfinance.ae/logos/b1b75d1a-648e-4e88-8d1f-a2a3cf43de5c/b1b75d1a-648e-4e88-8d1f-a2a3cf43de5c.jpg'"
  gateHeader="ADNIC — Private Documents"
  gateSubheader="Private documentation for ABU DHABI NATIONAL INSURANCE COMPANY PJSC"
  gateWarningText="This section contains private documents that are only accessible to authorised members of ADNIC."
>

<div class="org-header">
<img class="org-logo" src="https://data.directory.openfinance.ae/logos/b1b75d1a-648e-4e88-8d1f-a2a3cf43de5c/b1b75d1a-648e-4e88-8d1f-a2a3cf43de5c.jpg" alt="logo" />

# ADNIC — Private Documents
</div>

Private documentation for **ABU DHABI NATIONAL INSURANCE COMPANY PJSC**.

<DoumentRepoDisplay :files="files" :public="false" />

</ProtectedPageWrapper>
