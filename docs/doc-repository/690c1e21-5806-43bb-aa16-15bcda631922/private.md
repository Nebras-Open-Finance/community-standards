---
next: false
prev: false
aside: false
---

<script setup>
import files from './index.json'
</script>

<ProtectedPageWrapper
  :gateLogo="'https://data.directory.openfinance.ae/logos/690c1e21-5806-43bb-aa16-15bcda631922/690c1e21-5806-43bb-aa16-15bcda631922.jpg'"
  gateHeader="DIB — Private Documents"
  gateSubheader="Private documentation for Dubai Islamic Bank P.J.S.C"
  gateWarningText="This section contains private documents that are only accessible to authorised members of DIB."
>

<div class="org-header">
<img class="org-logo" src="https://data.directory.openfinance.ae/logos/690c1e21-5806-43bb-aa16-15bcda631922/690c1e21-5806-43bb-aa16-15bcda631922.jpg" alt="logo" />

# DIB — Private Documents
</div>

Private documentation for **Dubai Islamic Bank P.J.S.C**.

<DoumentRepoDisplay :files="files" :public="false" />

</ProtectedPageWrapper>
