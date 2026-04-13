<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  password: { type: String, required: true, default: 'NOF@1234' },
  gateHeader: { type: String, default: 'Private Documents' },
  gateSubheader: { type: String, default: '' },
  gateWarningText: { type: String, default: 'This section contains private documents that are only accessible to authorized members.' },
  gateLogo: { type: String, default: '' },
})

const input = ref('')
const unlocked = ref(false)     // starts locked → gate always renders first
const error = ref('')

function checkPassword() {
  error.value = ''
  if (input.value === props.password) {
    unlocked.value = true
    // localStorage.setItem(props.storageKey, 'true')
    input.value = ''
  } else {
    error.value = 'Wrong password'
    input.value = ''
  }
}

</script>

<template>
  <!-- LOCKED: Show ONLY the gate (no page content at all) -->
  <div v-if="!unlocked" class="password-gate">
    <div class="gate-header-row">
      <img v-if="gateLogo" :src="gateLogo" :alt="gateHeader" class="gate-logo" />
      <h1 class="gate-header">{{ gateHeader }}</h1>
    </div>
    <div v-if="gateSubheader" class="gate-subheader">{{ gateSubheader }}</div>
    <div class="gate-warning">
      <div class="gate-warning-header">Access required</div>
      <div class="gate-warning-text">{{ gateWarningText }}</div>
    </div>
    
    <div class="gate-card">
      <div class="gate-card-header">Protected Page</div>
      <input
        v-model="input"
        type="password"
        placeholder="Enter password"
        @keyup.enter="checkPassword"
        autocomplete="off"
      />
      <button @click="checkPassword">Unlock</button>
      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </div>

  <!-- UNLOCKED: Render the real page content (full layout + markdown) -->
  <div v-else>
    <slot />
  </div>
</template>

<style scoped>
.password-gate {
  position: fixed;
  inset: 0;
  background: #ffffff;           /* solid = no peek at layout */
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  padding-left: 100px;
  padding-right: 100px;
}

.gate-header-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-right: auto;
  margin-bottom: 1.5rem;
}

.gate-logo {
  height: 60px;
  object-fit: contain;
  border-radius: 8px;
  flex-shrink: 0;
}

.gate-header {
  text-align: left;
  margin: 0;
  font-size: 3rem;
  line-height: 4rem;
}

.gate-subheader {
  margin-right: auto;
  margin-bottom: 2rem;
}

.gate-warning {
  margin-right: auto;
  background-color: rgba(245, 197, 47, 0.2);
  border-radius: 1rem;
  padding: 20px;
  width: 100%;
  margin-bottom: 3rem;
}

.gate-warning-header {
  font-weight: bold;
  margin-bottom: 5px;
}

.gate-warning-text {

}

.gate-card {
  background: white;
  padding: 2.5rem 3rem;
  border-radius: 16px;
  box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  text-align: center;
  width: 100%;
  max-width: 360px;
}

.gate-card-header {
  margin-bottom: 1.5rem;
  font-size: 1.6rem;
  font-weight: bold;
}

.gate-card input {
  width: 100%;
  padding: 14px 16px;
  font-size: 1.1rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.gate-card button {
  width: 100%;
  padding: 14px;
  background: #1043b3;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
}

.error {
  color: #ef4444;
  margin-top: 1rem;
}

/* Dark mode */
html.dark .password-gate {
  background: #0f172a;
}
html.dark .gate-card {
  background: #1e2937;
  color: #e2e8f0;
}
html.dark .gate-card input {
  background: #334155;
  border-color: #475569;
  color: white;
}
</style>