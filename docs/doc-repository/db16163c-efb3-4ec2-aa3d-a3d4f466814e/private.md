---
next: false
prev: false
aside: false
---

<script setup>
import files from './index.json'
</script>

<ProtectedPageWrapper
  :gateLogo="'https://data.directory.openfinance.ae/logos/db16163c-efb3-4ec2-aa3d-a3d4f466814e/db16163c-efb3-4ec2-aa3d-a3d4f466814e.jpg'"
  gateHeader="HSBC — Private Documents"
  gateSubheader="Private documentation for HSBC Bank Middle East Limited"
  gateWarningText="This section contains private documents that are only accessible to authorised members of HSBC."
>

<div class="org-header">
<img class="org-logo" src="https://data.directory.openfinance.ae/logos/db16163c-efb3-4ec2-aa3d-a3d4f466814e/db16163c-efb3-4ec2-aa3d-a3d4f466814e.jpg" alt="logo" />

# HSBC — Private Documents
</div>

Private documentation for **HSBC Bank Middle East Limited**.

<DoumentRepoDisplay :files="files" :public="false" />

</ProtectedPageWrapper>
