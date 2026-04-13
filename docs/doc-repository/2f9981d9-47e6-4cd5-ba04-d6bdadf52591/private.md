---
next: false
prev: false
aside: false
---

<script setup>
import files from './index.json'
</script>

<ProtectedPageWrapper
  :gateLogo="'https://data.directory.openfinance.ae/logos/2f9981d9-47e6-4cd5-ba04-d6bdadf52591/2f9981d9-47e6-4cd5-ba04-d6bdadf52591.png'"
  gateHeader="CBD — Private Documents"
  gateSubheader="Private documentation for COMMERCIAL BANK OF DUBAI"
  gateWarningText="This section contains private documents that are only accessible to authorised members of CBD."
>

<div class="org-header">
<img class="org-logo" src="https://data.directory.openfinance.ae/logos/2f9981d9-47e6-4cd5-ba04-d6bdadf52591/2f9981d9-47e6-4cd5-ba04-d6bdadf52591.png" alt="logo" />

# CBD — Private Documents
</div>

Private documentation for **COMMERCIAL BANK OF DUBAI**.

<DoumentRepoDisplay :files="files" :public="false" />

</ProtectedPageWrapper>
