<template>
  <div class="dirham-amount-container">
    <span class="dirham-sign" :style="{ color: iconColor }" aria-hidden="true">⃃</span>
    <div class="dirham-amount">{{ amount }}</div>
  </div>
</template>

<script setup>
// Renders U+20C3 UAE DIRHAM SIGN, stretched to 160% width. The glyph depends on
// the viewer's fonts; devices without one show a missing-glyph box. The
// previous SVG rendering is kept in DirhamAmountSvg.vue.
defineProps({
  amount: {
    type: [String, Number],
    default: ''
  },
  iconColor: {
    type: String,
    default: 'currentColor'
  }
})
</script>

<style scoped>
.dirham-amount-container {
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0;
  gap: 4px;
  margin-left: auto;
  height: 1em;
}

/* scaleX does not change layout width, so side margin (for a glyph roughly
   0.6em wide) keeps the gap to the amount even. */
.dirham-sign {
  display: inline-block;
  line-height: 1;
  transform: scaleX(1.6);
  margin-inline: 0.18em;
}

.dirham-amount {
  font: inherit;
  color: inherit;
}
</style>
