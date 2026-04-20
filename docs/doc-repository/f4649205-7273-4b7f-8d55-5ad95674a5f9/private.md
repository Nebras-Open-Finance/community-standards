---
next: false
prev: false
aside: false
---

<script setup>
import files from './index.json'
</script>

<ProtectedPageWrapper
  :gateLogo="'https://data.directory.openfinance.ae/logos/f4649205-7273-4b7f-8d55-5ad95674a5f9/f4649205-7273-4b7f-8d55-5ad95674a5f9.png'"
  gateHeader="Orient Insurance PJSC - Private Documents"
  gateSubheader="Private documentation for Orient Insurance PJSC"
  gateWarningText="This section contains private documents that are only accessible to authorized members of Orient Insurance PJSC."
>

<div class="org-header">
<img class="org-logo" src="https://data.directory.openfinance.ae/logos/f4649205-7273-4b7f-8d55-5ad95674a5f9/f4649205-7273-4b7f-8d55-5ad95674a5f9.png" alt="logo" />

# Orient Insurance PJSC - Private Documents
</div>

Private documentation for **Orient Insurance PJSC**.

<DoumentRepoDisplay :files="files" :public="false" />

</ProtectedPageWrapper>
