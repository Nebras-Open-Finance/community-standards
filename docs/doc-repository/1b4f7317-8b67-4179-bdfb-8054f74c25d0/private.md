---
next: false
prev: false
aside: false
---

<script setup>
import files from './index.json'
</script>

<ProtectedPageWrapper
  :gateLogo="'https://data.directory.openfinance.ae/logos/1b4f7317-8b67-4179-bdfb-8054f74c25d0/1b4f7317-8b67-4179-bdfb-8054f74c25d0.jpg'"
  gateHeader="ADIB — Private Documents"
  gateSubheader="Private documentation for Abu Dhabi Islamic Bank P.J.S.C"
  gateWarningText="This section contains private documents that are only accessible to authorised members of ADIB."
>

<div class="org-header">
<img class="org-logo" src="https://data.directory.openfinance.ae/logos/1b4f7317-8b67-4179-bdfb-8054f74c25d0/1b4f7317-8b67-4179-bdfb-8054f74c25d0.jpg" alt="logo" />

# ADIB — Private Documents
</div>

Private documentation for **Abu Dhabi Islamic Bank P.J.S.C**.

<DoumentRepoDisplay :files="files" :public="false" />

</ProtectedPageWrapper>
