---
next: false
prev: false
aside: false
---

<script setup>
import files from './index.json'
</script>

<ProtectedPageWrapper
  :gateLogo="'https://data.directory.openfinance.ae/logos/94884086-b7c2-43a0-b4e7-a928b9fed0ac/94884086-b7c2-43a0-b4e7-a928b9fed0ac.png'"
  gateHeader="Mercury — Private Documents"
  gateSubheader="Private documentation for Mercury Payments Services LLC"
  gateWarningText="This section contains private documents that are only accessible to authorised members of Mercury."
>

<div class="org-header">
<img class="org-logo" src="https://data.directory.openfinance.ae/logos/94884086-b7c2-43a0-b4e7-a928b9fed0ac/94884086-b7c2-43a0-b4e7-a928b9fed0ac.png" alt="logo" />

# Mercury — Private Documents
</div>

Private documentation for **Mercury Payments Services LLC**.

<DoumentRepoDisplay :files="files" :public="false" />

</ProtectedPageWrapper>
