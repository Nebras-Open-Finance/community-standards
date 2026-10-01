<route lang="yaml">
meta:
  layout: internal
  title: Dirham symbol
  next: false
  prev: false
  aside: false
</route>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useHead } from '@unhead/vue'
import DirhamAmount from '@/components/common/consent-ui/DirhamAmount.vue'

useHead({ title: 'Dirham symbol' })

// U+20C3 UAE DIRHAM SIGN. Until operating systems ship a font with this glyph,
// browsers fall back to a missing-glyph box (tofu). This page watches for the
// point at which it renders natively.
const SIGN = '⃃'
// U+20CF is unassigned, so it always renders as the missing-glyph fallback —
// a reference to compare U+20C3 against.
const UNASSIGNED = '⃏'

const fontStacks = [
  { label: 'Site font (inherited)', family: 'inherit' },
  { label: 'System UI', family: 'system-ui, sans-serif' },
  { label: 'Serif', family: 'serif' },
  { label: 'Monospace', family: 'monospace' },
]

type Verdict = 'pending' | 'renders' | 'missing' | 'unknown'
const verdict = ref<Verdict>('pending')
const userAgent = ref('')

// Draw a glyph to a canvas and return its pixel data, so two glyphs can be
// compared. If U+20C3 draws identically to an unassigned code point, the
// browser has no font for it.
function glyphPixels(ch: string): Uint8ClampedArray | null {
  const canvas = document.createElement('canvas')
  canvas.width = 64
  canvas.height = 64
  const ctx = canvas.getContext('2d')
  if (!ctx) return null
  ctx.font = '48px system-ui, sans-serif'
  ctx.textBaseline = 'top'
  ctx.fillText(ch, 4, 4)
  return ctx.getImageData(0, 0, 64, 64).data
}

onMounted(() => {
  userAgent.value = navigator.userAgent
  const sign = glyphPixels(SIGN)
  const ref_ = glyphPixels(UNASSIGNED)
  if (!sign || !ref_) {
    verdict.value = 'unknown'
    return
  }
  const same = sign.length === ref_.length && sign.every((v, i) => v === ref_[i])
  const blank = sign.every((v) => v === 0)
  verdict.value = same || blank ? 'missing' : 'renders'
})
</script>

<template>
  <div class="ds">
    <h1 class="ds__title">Dirham symbol</h1>
    <p class="ds__lede">
      Monitors native rendering of <code>U+20C3</code> UAE DIRHAM SIGN. Until the
      viewer's operating system ships a font containing the glyph, the amount below
      shows a missing-glyph box.
    </p>

    <div class="ds__hero">{{ SIGN }} 100.00</div>

    <p class="ds__verdict" :class="`ds__verdict--${verdict}`" role="status">
      <template v-if="verdict === 'pending'">Checking this browser…</template>
      <template v-else-if="verdict === 'renders'">This browser renders <code>U+20C3</code> natively.</template>
      <template v-else-if="verdict === 'missing'">This browser has no font for <code>U+20C3</code> — it falls back to a missing glyph.</template>
      <template v-else>Could not detect rendering support in this browser.</template>
    </p>

    <h2 class="ds__h2">By font stack</h2>
    <table class="ds__table">
      <thead>
        <tr><th>Font stack</th><th>Rendered</th></tr>
      </thead>
      <tbody>
        <tr v-for="f in fontStacks" :key="f.label">
          <td>{{ f.label }}</td>
          <td class="ds__sample" :style="{ fontFamily: f.family }">{{ SIGN }} 100.00</td>
        </tr>
        <tr>
          <td>Missing-glyph reference (<code>U+20CF</code>, unassigned)</td>
          <td class="ds__sample">{{ UNASSIGNED }} 100.00</td>
        </tr>
        <tr>
          <td>Site SVG (<code>DirhamAmount</code>), for comparison</td>
          <td class="ds__sample"><DirhamAmount amount="100.00" /></td>
        </tr>
      </tbody>
    </table>

    <p v-if="userAgent" class="ds__ua"><strong>User agent:</strong> {{ userAgent }}</p>
  </div>
</template>

<style scoped>
.ds {
  max-width: 760px;
  margin: 0 auto;
  padding: 32px 16px 64px;
}
.ds__title {
  font-size: 28px;
  margin: 0 0 8px;
}
.ds__lede {
  margin: 0 0 24px;
  color: var(--vp-c-text-2, inherit);
}
.ds__hero {
  font-size: 64px;
  line-height: 1.2;
  padding: 24px;
  border: 1px solid var(--vp-c-divider, #ddd);
  border-radius: 8px;
  text-align: center;
  font-variant-numeric: tabular-nums;
}
.ds__verdict {
  margin: 16px 0 32px;
  padding: 10px 14px;
  border-radius: 6px;
  border-left: 4px solid currentColor;
}
.ds__verdict--renders { color: #1a7f37; }
.ds__verdict--missing { color: #b35900; }
.ds__h2 {
  font-size: 18px;
  margin: 0 0 12px;
}
.ds__table {
  width: 100%;
  border-collapse: collapse;
}
.ds__table th,
.ds__table td {
  text-align: left;
  padding: 10px 8px;
  border-bottom: 1px solid var(--vp-c-divider, #ddd);
  vertical-align: middle;
}
.ds__sample {
  font-size: 24px;
}
.ds__ua {
  margin-top: 24px;
  font-size: 13px;
  word-break: break-all;
  color: var(--vp-c-text-2, inherit);
}
</style>
