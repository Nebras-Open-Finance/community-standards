---
next: false
prev: false
aside: false
---

<script setup>
import files from './index.json'
</script>

<ProtectedPageWrapper
  :gateLogo="'https://data.directory.openfinance.ae/logos/d86e6704-e92b-4368-a425-5a7ba230e986/d86e6704-e92b-4368-a425-5a7ba230e986.jpg'"
  gateHeader="WIO Bank — Private Documents"
  gateSubheader="Private documentation for WIO Bank"
  gateWarningText="This section contains private documents that are only accessible to authorised members of WIO Bank."
>

<div class="org-header">
<img class="org-logo" src="https://data.directory.openfinance.ae/logos/d86e6704-e92b-4368-a425-5a7ba230e986/d86e6704-e92b-4368-a425-5a7ba230e986.jpg" alt="logo" />

# WIO Bank — Private Documents
</div>

Private documentation for **WIO Bank**.

<DoumentRepoDisplay :files="files" :public="false" />

</ProtectedPageWrapper>
