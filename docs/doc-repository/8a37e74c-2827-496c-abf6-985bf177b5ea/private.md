---
next: false
prev: false
aside: false
---

<script setup>
import files from './index.json'
</script>

<ProtectedPageWrapper
  :gateLogo="'https://data.directory.openfinance.ae/logos/8a37e74c-2827-496c-abf6-985bf177b5ea/8a37e74c-2827-496c-abf6-985bf177b5ea.jpg'"
  gateHeader="FAB — Private Documents"
  gateSubheader="Private documentation for First Abu Dhabi Islamic Finance PJSC"
  gateWarningText="This section contains private documents that are only accessible to authorised members of FAB."
>

<div class="org-header">
<img class="org-logo" src="https://data.directory.openfinance.ae/logos/8a37e74c-2827-496c-abf6-985bf177b5ea/8a37e74c-2827-496c-abf6-985bf177b5ea.jpg" alt="logo" />

# FAB — Private Documents
</div>

Private documentation for **First Abu Dhabi Islamic Finance PJSC**.

<DoumentRepoDisplay :files="files" :public="false" />

</ProtectedPageWrapper>
