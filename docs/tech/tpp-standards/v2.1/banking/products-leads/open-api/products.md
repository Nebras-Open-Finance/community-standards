---
next: false
prev: false
aside: false
---

#  Retrieve Banking products currently publicly available 
<RedocWrapper 
    spec="/openapi/v2.1/standards/uae-product-openapi.yaml" 
    filterPath="/products"
    :overrideServers="[
      { url: `https://rs1.[LFICODE].apihub.openfinance.ae/open-finance/product/${CURRENT_VERSION}` },
      { url: `https://rs1.[LFICODE].preprod.apihub.openfinance.ae/open-finance/product/${CURRENT_VERSION}` },
      { url: `https://rs1.altareq1.sandbox.apihub.openfinance.ae/open-finance/product/${CURRENT_VERSION}` },
    ]"
 />

<script setup>
import { useRoute } from 'vitepress'
const route = useRoute()
const CURRENT_VERSION = route.path.match(/v[\d.]+/)?.[0] ?? 'v2.1'
</script>