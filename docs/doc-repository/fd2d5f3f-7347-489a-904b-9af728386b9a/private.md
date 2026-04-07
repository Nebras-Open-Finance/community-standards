---
next: false
prev: false
aside: false
---

<script setup>
import files from './index.json'
</script>

<ProtectedPageWrapper
  :gateLogo="'https://data.directory.openfinance.ae/logos/fd2d5f3f-7347-489a-904b-9af728386b9a/fd2d5f3f-7347-489a-904b-9af728386b9a.jpg'"
  gateHeader="Raidiam — Private Documents"
  gateSubheader="Private documentation for Raidiam Services Limited"
  gateWarningText="This section contains private documents that are only accessible to authorised members of Raidiam."
>

<div class="org-header">
<img class="org-logo" src="https://data.directory.openfinance.ae/logos/fd2d5f3f-7347-489a-904b-9af728386b9a/fd2d5f3f-7347-489a-904b-9af728386b9a.jpg" alt="logo" />

# Raidiam — Private Documents
</div>

Private documentation for **Raidiam Services Limited**.

<DoumentRepoDisplay :files="files" :public="false" />

</ProtectedPageWrapper>
