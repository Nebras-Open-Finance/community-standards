<script setup lang="ts">
// "Your details" identity block shared by both portals. Shows the signed-in
// Sandbox Trust Framework session. A user may belong to more than one
// organisation (as in Proposals voting); when they do, they pick which org(s)
// this certification is for. With a single org it is fixed, not pickable.
// `selected` (org ids) is owned by the parent via v-model.
import { computed } from 'vue'
import { useSandboxAuth } from '@/composables/useSandboxAuth'

const props = defineProps<{ selected: string[] }>()
const emit = defineEmits<{ (e: 'update:selected', ids: string[]): void }>()

const { auth, signIn } = useSandboxAuth()

const identityName = computed(() => auth.value.name ?? auth.value.email ?? '')
const orgs = computed(() => auth.value.orgs)
const multiOrg = computed(() => orgs.value.length > 1)

function toggleOrg(id: string): void {
  const set = new Set(props.selected)
  if (set.has(id)) set.delete(id)
  else set.add(id)
  emit('update:selected', [...set])
}
</script>

<template>
  <div v-if="!auth.loaded" class="fc-id fc-id--muted">Checking your session…</div>

  <div v-else-if="auth.authenticated" class="fc-id">
    <div class="fc-id__who">
      <span class="fc-id__label">Signed in as</span>
      <span class="fc-id__val">{{ identityName || '—' }}</span>
    </div>

    <!-- Single org: fixed -->
    <div v-if="!multiOrg" class="fc-id__who">
      <span class="fc-id__label">Organisation</span>
      <span class="fc-id__val"><strong>{{ orgs[0]?.name || '—' }}</strong></span>
    </div>

    <!-- Multiple orgs: pick which the certification is for -->
    <div v-else class="fc-id__orgs">
      <span class="fc-id__label">This certification is for</span>
      <label v-for="o in orgs" :key="o.id" class="fc-id__org">
        <input
          type="checkbox"
          :checked="selected.includes(o.id)"
          @change="toggleOrg(o.id)"
        />
        <span>{{ o.name }}</span>
      </label>
    </div>
  </div>

  <div v-else class="fc-id fc-id--signin">
    <p>You are not signed in.</p>
    <button type="button" class="fc-id__btn" @click="signIn">Sign in with the Sandbox Trust Framework</button>
  </div>
</template>

<style scoped>
.fc-id {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 1.1rem;
  background: color-mix(in srgb, var(--at-teal) 6%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  margin-bottom: 1rem;
  font-family: var(--at-sans);
  font-size: 0.9rem;
  color: var(--at-navy-deep);
}
.fc-id--muted { color: var(--at-mute); }
.fc-id--signin { align-items: flex-start; gap: 0.75rem; }

.fc-id__who { display: flex; flex-direction: column; gap: 0.15rem; }
.fc-id__label {
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--at-mute);
}
.fc-id__val { color: var(--at-navy-deep); }
.fc-id__val strong { font-weight: 600; }

.fc-id__orgs { display: flex; flex-direction: column; gap: 0.5rem; }
.fc-id__org {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  cursor: pointer;
  font-size: 0.92rem;
}

.fc-id__btn {
  font-family: var(--at-sans);
  font-size: 0.9rem;
  font-weight: 600;
  padding: 0.6rem 1.2rem;
  border: 1px solid var(--at-navy-deep);
  background: var(--at-bg-cream);
  color: var(--at-navy-deep);
  cursor: pointer;
}
.fc-id__btn:hover { background: var(--at-navy-deep); color: #fff; }
</style>
