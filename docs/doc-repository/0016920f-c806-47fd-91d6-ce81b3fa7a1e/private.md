---
next: false
prev: false
aside: false
---

<script setup>
import files from './index.json'
</script>

<ProtectedPageWrapper
  :gateLogo="'https://data.directory.openfinance.ae/logos/0016920f-c806-47fd-91d6-ce81b3fa7a1e/0016920f-c806-47fd-91d6-ce81b3fa7a1e.png'"
  gateHeader="PAY TEN - Private Documents"
  gateSubheader="Private documentation for PAY TEN PAYMENT SERVICES PROVIDER LLC"
  gateWarningText="This section contains private documents that are only accessible to authorized members of PAY TEN."
>

<div class="org-header">
<img class="org-logo" src="https://data.directory.openfinance.ae/logos/0016920f-c806-47fd-91d6-ce81b3fa7a1e/0016920f-c806-47fd-91d6-ce81b3fa7a1e.png" alt="logo" />

# PAY TEN - Private Documents
</div>

Private documentation for **PAY TEN PAYMENT SERVICES PROVIDER LLC**.

<DoumentRepoDisplay :files="files" :public="false" />

</ProtectedPageWrapper>
