<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  password: { type: String, required: true, default: 'NOF@1234' },
//   storageKey: { type: String, default: 'protected_access' }
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
    <div class="gate-card">
      <h2>Protected Page</h2>
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

.gate-card h2 {
  margin-bottom: 1.5rem;
  font-size: 1.6rem;
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
  background: #2563eb;
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