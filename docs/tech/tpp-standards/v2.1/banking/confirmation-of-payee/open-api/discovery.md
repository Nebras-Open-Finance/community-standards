---
next: false
prev: false
aside: false
---

#  Discover the LFI that will confirm the payee
<RedocWrapper 
    spec="/openapi/v2.1/standards/uae-confirmation-of-payee-openapi.yaml" 
    filterPath="/discovery"
    :overrideServers="[
      { url: `https://rs1.[LFICODE].apihub.openfinance.ae/open-finance/confirmation-of-payee/${CURRENT_VERSION}` },
      { url: `https://rs1.[LFICODE].preprod.apihub.openfinance.ae/open-finance/confirmation-of-payee/${CURRENT_VERSION}` },
      { url: `https://rs1.altareq1.sandbox.apihub.openfinance.ae/open-finance/confirmation-of-payee/${CURRENT_VERSION}` },
    ]"
 />

<script setup>
import { useRoute } from 'vitepress'
const route = useRoute()
const CURRENT_VERSION = route.path.match(/v[\d.]+/)?.[0] ?? 'v2.1'
</script>