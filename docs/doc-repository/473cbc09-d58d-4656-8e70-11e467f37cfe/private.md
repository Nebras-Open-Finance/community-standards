---
next: false
prev: false
aside: false
---

<script setup>
import files from './index.json'
</script>

<ProtectedPageWrapper
  :gateLogo="'https://data.directory.openfinance.ae/logos/473cbc09-d58d-4656-8e70-11e467f37cfe/473cbc09-d58d-4656-8e70-11e467f37cfe.jpg'"
  gateHeader="AWNIC — Private Documents"
  gateSubheader="Private documentation for Al Wathba National Insurance Co"
  gateWarningText="This section contains private documents that are only accessible to authorised members of AWNIC."
>

<div class="org-header">
<img class="org-logo" src="https://data.directory.openfinance.ae/logos/473cbc09-d58d-4656-8e70-11e467f37cfe/473cbc09-d58d-4656-8e70-11e467f37cfe.jpg" alt="logo" />

# AWNIC — Private Documents
</div>

Private documentation for **Al Wathba National Insurance Co**.

<DoumentRepoDisplay :files="files" :public="false" />

</ProtectedPageWrapper>
