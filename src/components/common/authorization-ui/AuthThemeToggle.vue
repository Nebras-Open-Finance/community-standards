<script setup>
// Sun / moon button for the coloured top bar of the LFI authorisation and TPP
// consent wireframes. Same icons as the site header toggle, retoned white for
// the bar. Sits on the right of the bar, mirroring the back arrow on the left.
defineProps({
  dark: { type: Boolean, default: false },
})
defineEmits(['toggle'])
</script>

<template>
  <button type="button" class="auth-theme-toggle"
    :aria-pressed="dark ? 'true' : 'false'"
    :aria-label="dark ? 'Show light version' : 'Show dark version'"
    :title="dark ? 'Light mode' : 'Dark mode'"
    @click="$emit('toggle')">
    <!-- Sun (shown in light mode → click for dark) -->
    <svg v-if="!dark" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.5v2.2M12 19.3v2.2M4.5 12H2.3M21.7 12h-2.2M5.6 5.6L4 4M20 20l-1.6-1.6M5.6 18.4L4 20M20 4l-1.6 1.6" />
    </svg>
    <!-- Moon (shown in dark mode → click for light) -->
    <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M20.5 14.2A8.4 8.4 0 0 1 9.8 3.5a.6.6 0 0 0-.8-.7 9.6 9.6 0 1 0 12.2 12.2.6.6 0 0 0-.7-.8z" />
    </svg>
  </button>
</template>

<style scoped>
.auth-theme-toggle {
  position: absolute;
  right: 20px;
  top: calc(50% - 32px / 2);
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  background: none;
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 999px;
  color: #FFFFFF;
  cursor: pointer;
}

.auth-theme-toggle:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: #FFFFFF;
}

.auth-theme-toggle:active {
  transform: scale(0.92);
}

.auth-theme-toggle:focus-visible {
  outline: 2px solid #FFFFFF;
  outline-offset: 2px;
}

.auth-theme-toggle svg {
  display: block;
}
</style>
