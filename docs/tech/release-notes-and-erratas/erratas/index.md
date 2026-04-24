---
layout: false
---

<script setup>
import { onMounted } from 'vue'
import { CURRENT_VERSION } from '../../../.vitepress/version'

const target = `/tech/release-notes-and-erratas/erratas/${CURRENT_VERSION}/`

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.location.replace(target)
  }
})
</script>

<div style="padding: 6rem 2rem; text-align: center; font-family: system-ui, sans-serif;">
  <p>Redirecting to the latest Erratas register&hellip;</p>
  <p><a :href="target">Continue to {{ target }}</a></p>
</div>
