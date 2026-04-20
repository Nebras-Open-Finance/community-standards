<template>
  <div class="homepage">
    <PageHeader />

    <section class="section">

      <div class="section-heading">Document Repository</div>
      <p class="dr-lead">
        Public documentation for organisations participating in UAE Open Finance.
      </p>

      <div class="dr-search-bar">
        <svg class="dr-search-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input v-model="query" class="dr-search-input" type="search" placeholder="Search organisations…"
          aria-label="Search organisations" />
        <button v-if="query" class="dr-search-clear" @click="query = ''" aria-label="Clear search">✕</button>
      </div>

      <div v-if="loading" class="dr-empty">Loading organisations…</div>

      <div v-else-if="error" class="dr-empty">
        Could not load organisations from the document service. <strong>{{ error }}</strong>
      </div>

      <template v-else-if="filteredOrgs.length > 0">
        <div class="card-grid">
          <a v-for="org in filteredOrgs" :key="org.id" :href="org.link" class="dr-card">
            <div class="dr-card-top">
              <img v-if="org.logo" :src="org.logo" :alt="org.name" class="dr-card-logo" />
              <div v-else class="dr-card-logo-placeholder">{{ org.name.charAt(0) }}</div>
              <h3 class="dr-card-title">{{ org.name }}</h3>
            </div>
            <span class="dr-card-arrow">View documents →</span>
          </a>
        </div>
      </template>

      <div v-else class="dr-empty">
        No organisations found for <strong>"{{ query }}"</strong>
      </div>

    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import PageHeader from './Components/PageHeader.vue'

const DOCS_API = 'https://docs.nebras-open-finance.com'

const organisations = ref([])
const loading = ref(true)
const error = ref('')

onMounted(async () => {
  try {
    const res = await fetch(`${DOCS_API}/`)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    organisations.value = data
      .filter(o => o.Status === 'Active')
      .map(o => ({
        id: o.OrganisationId,
        name: o.OrganisationName,
        logo: o.LogoUri || '',
        link: `/doc-repository/${o.OrganisationId}/public`,
      }))
      .sort((a, b) => a.name.localeCompare(b.name))
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
})

const query = ref('')

const filteredOrgs = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return organisations.value
  return organisations.value.filter(o => o.name.toLowerCase().includes(q))
})
</script>

<style scoped>
.dr-lead {
  font-size: 1.15rem;
  opacity: 0.7;
  margin-top: -1rem;
  margin-bottom: 2.5rem;
  max-width: 600px;
}

/* ── Search bar ── */
.dr-search-bar {
  position: relative;
  display: flex;
  align-items: center;
  max-width: 560px;
  margin-bottom: 3rem;
  background: #fff;
  border: 1.5px solid rgba(0, 39, 127, 0.2);
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(0, 39, 127, 0.07);
  transition: border-color 0.18s, box-shadow 0.18s;
}

.dr-search-bar:focus-within {
  border-color: rgba(0, 39, 127, 0.5);
  box-shadow: 0 2px 16px rgba(0, 39, 127, 0.12);
}

.dr-search-icon {
  flex-shrink: 0;
  margin-left: 0.9rem;
  color: rgba(0, 39, 127, 0.45);
  pointer-events: none;
}

.dr-search-input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  padding: 0.75rem 0.75rem;
  font-size: 1rem;
  color: rgba(0, 39, 127, 0.9);
}

.dr-search-input::placeholder {
  color: rgba(0, 39, 127, 0.35);
}

.dr-search-clear {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.4rem 0.75rem;
  font-size: 0.85rem;
  color: rgba(0, 39, 127, 0.4);
  border-radius: 6px;
  transition: color 0.15s, background 0.15s;
}

.dr-search-clear:hover {
  color: rgba(0, 39, 127, 0.8);
  background: rgba(0, 39, 127, 0.06);
}

/* ── Organisation cards ── */
.dr-card {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1.75rem;
  background: #fff;
  border-radius: 14px;
  text-decoration: none;
  color: inherit;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.07);
  border: 1px solid rgba(0, 39, 127, 0.07);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.dr-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.12);
}

.dr-card-top {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.dr-card-logo {
  width: 40px;
  height: 40px;
  object-fit: contain;
  border-radius: 8px;
  flex-shrink: 0;
}

.dr-card-logo-placeholder {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 39, 127, 0.08);
  color: rgba(0, 39, 127, 0.6);
  font-weight: 700;
  font-size: 1.1rem;
  border-radius: 8px;
  flex-shrink: 0;
}

.dr-card-title {
  font-size: 1.15rem;
  font-weight: 600;
  line-height: 1.35;
  color: rgba(0, 39, 127, 0.95);
  margin: 0;
}

.dr-card-arrow {
  font-size: 0.85rem;
  font-weight: 500;
  color: rgba(0, 39, 127, 0.6);
  margin-top: 0.5rem;
  transition: color 0.15s;
}

.dr-card:hover .dr-card-arrow {
  color: rgba(0, 39, 127, 1);
}

/* ── Empty state ── */
.dr-empty {
  padding: 3rem 0;
  font-size: 1rem;
  opacity: 0.6;
}
</style>
