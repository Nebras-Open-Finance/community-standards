<template>
  <section class="org-strip" v-if="orgs.length">
    <div class="org-strip__inner">
      <div class="org-strip__label">
        Onboarded &middot; {{ totalCount }} organisations
      </div>
    </div>
    <div class="org-scroller" :style="scrollerStyle">
      <div class="org-scroller__track" aria-hidden="false">
        <div
          v-for="org in orgs"
          :key="org.id"
          class="org-card"
          :title="org.name"
        >
          <div class="org-card__logo">
            <img
              v-if="org.logoUri"
              :src="org.logoUri"
              :alt="org.name"
              loading="lazy"
              @error="onLogoError(org)"
            />
            <span v-else class="org-card__fallback">{{ org.initials }}</span>
          </div>
          <div class="org-card__name">{{ org.name }}</div>
        </div>
      </div>
      <div class="org-scroller__track" aria-hidden="true">
        <div
          v-for="org in orgs"
          :key="`dup-${org.id}`"
          class="org-card"
          :title="org.name"
        >
          <div class="org-card__logo">
            <img
              v-if="org.logoUri"
              :src="org.logoUri"
              alt=""
              loading="lazy"
              @error="onLogoError(org)"
            />
            <span v-else class="org-card__fallback">{{ org.initials }}</span>
          </div>
          <div class="org-card__name">{{ org.name }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

// Seconds per organisation — loop duration scales with the count.
const SECONDS_PER_ORG = 1.6

const orgs = ref([])
const totalCount = ref(0)

const scrollerStyle = computed(() => ({
  '--org-scroll-duration': `${Math.max(orgs.value.length, 1) * SECONDS_PER_ORG}s`,
}))

function initialsFor(name) {
  return (name || '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0])
    .join('')
    .toUpperCase()
}

function onLogoError(org) {
  org.logoUri = null
}

onMounted(async () => {
  try {
    const { data } = await axios.get('/api/trust-framework.json')
    const active = (data.organisations || []).filter(o =>
      o.Status === 'Active' && (o.Size === 'LFI' || o.Size === 'TPP')
    )
    const seen = new Set()
    const unique = active
      .slice()
      .sort((a, b) => Number(b.isProduction === true) - Number(a.isProduction === true))
      .map(o => {
        const name = (o.OrganisationName || o.LegalEntityName || '').trim()
        if (!name) return null
        return {
          id: o.OrganisationId,
          name,
          initials: initialsFor(name),
          logoUri: o.LogoUri || null,
        }
      })
      .filter(o => {
        if (!o) return false
        const key = o.name.toLowerCase()
        if (seen.has(key)) return false
        seen.add(key)
        return true
      })
    totalCount.value = unique.length
    orgs.value = unique
  } catch { /* silent — strip is decorative */ }
})
</script>

<style scoped>
.org-strip {
  width: 100%;
  background: var(--at-bg-paper);
  border-top: 1px solid var(--at-grid-line);
  border-bottom: 1px solid var(--at-grid-line);
  padding: 1.75rem 0 1.5rem;
}

.org-strip__inner {
  max-width: var(--at-page-max);
  margin: 0 auto;
  padding: 0 2rem;
}

.org-strip__label {
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--at-mute);
  margin-bottom: 1rem;
}

.org-scroller {
  width: 100%;
  display: flex;
  gap: 16px;
  overflow: hidden;
  mask-image: linear-gradient(
    to right,
    transparent 0,
    #000 72px,
    #000 calc(100% - 72px),
    transparent 100%
  );
  -webkit-mask-image: linear-gradient(
    to right,
    transparent 0,
    #000 72px,
    #000 calc(100% - 72px),
    transparent 100%
  );
}

.org-scroller__track {
  display: flex;
  gap: 16px;
  flex-shrink: 0;
  animation: org-scroll var(--org-scroll-duration, 60s) linear infinite;
  will-change: transform;
}

.org-scroller:hover .org-scroller__track {
  animation-play-state: paused;
}

@keyframes org-scroll {
  from { transform: translateX(0); }
  to   { transform: translateX(calc(-100% - 16px)); }
}

.org-card {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 0 16px;
  min-width: 120px;
  flex-shrink: 0;
}

.org-card__logo {
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.org-card__logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: grayscale(100%);
  opacity: 0.7;
  transition: opacity 0.2s ease, filter 0.2s ease;
}

.org-card:hover .org-card__logo img {
  filter: grayscale(0%);
  opacity: 1;
}

.org-card__fallback {
  font-family: var(--at-mono);
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: var(--at-navy-deep);
  opacity: 0.55;
}

.org-card__name {
  font-family: var(--at-sans);
  font-size: 12px;
  font-weight: 500;
  color: var(--at-navy-deep);
  opacity: 0.65;
  text-align: center;
  line-height: 1.3;
  max-width: 150px;
}

@media (prefers-reduced-motion: reduce) {
  .org-scroller__track { animation: none; }
}

@media (max-width: 900px) {
  .org-strip__inner { padding: 0 1rem; }
  .org-card { min-width: 96px; padding: 0 12px; }
  .org-card__logo { width: 52px; height: 52px; }
  .org-card__name { font-size: 11px; }
}
</style>
