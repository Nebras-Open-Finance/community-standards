---
next: false
prev: false
aside: false
---

<script setup>
import files from './index.json'
</script>

<ProtectedPageWrapper
  :gateLogo="'https://data.directory.openfinance.ae/logos/daa9716b-d6c3-4211-9f87-53a630bdb9f6/daa9716b-d6c3-4211-9f87-53a630bdb9f6.png'"
  gateHeader="Spare Technologies — Private Documents"
  gateSubheader="Private documentation for Spare Digital Technologies LLC S.O.C"
  gateWarningText="This section contains private documents that are only accessible to authorised members of Spare Technologies."
>

<div class="org-header">
<img class="org-logo" src="https://data.directory.openfinance.ae/logos/daa9716b-d6c3-4211-9f87-53a630bdb9f6/daa9716b-d6c3-4211-9f87-53a630bdb9f6.png" alt="logo" />

# Spare Technologies — Private Documents
</div>

Private documentation for **Spare Digital Technologies LLC S.O.C**.

<DoumentRepoDisplay :files="files" :public="false" />

</ProtectedPageWrapper>
