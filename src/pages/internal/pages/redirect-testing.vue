<route lang="yaml">
meta:
  layout: internal
  title: Redirect testing
  next: false
  prev: false
  aside: false
</route>

<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { authServerEndpoints, authEndpointsSource, type AuthServerEndpoint } from '@/data/auth-endpoints'

useHead({ title: 'Redirect testing' })

const query = ref('')
const sector = ref<'all' | 'bank' | 'insurer'>('all')

const filtered = computed<AuthServerEndpoint[]>(() => {
  const q = query.value.trim().toLowerCase()
  return authServerEndpoints.filter((s) => {
    if (sector.value !== 'all' && s.sector !== sector.value) return false
    if (!q) return true
    return (
      s.organisationName.toLowerCase().includes(q) ||
      s.customerFriendlyName.toLowerCase().includes(q) ||
      s.authorizationEndpoint.toLowerCase().includes(q) ||
      (s.lfiCode || '').toLowerCase().includes(q)
    )
  })
})

const orgCount = computed(() => new Set(filtered.value.map((s) => s.organisationId)).size)

// The redirect target's origin is what actually matters when testing — the path
// varies per LFI but the host is what must be reachable and correctly certificated.
function originOf(url: string): string {
  try {
    return new URL(url).origin
  } catch {
    return url
  }
}

const copied = ref<string | null>(null)
let copyTimer: ReturnType<typeof setTimeout> | undefined

async function copy(value: string, key: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(value)
    copied.value = key
    clearTimeout(copyTimer)
    copyTimer = setTimeout(() => { copied.value = null }, 1400)
  } catch {
    /* clipboard unavailable — the value is selectable in the page */
  }
}

onUnmounted(() => clearTimeout(copyTimer))

function onLogoError(e: Event): void {
  const el = e.target as HTMLImageElement
  el.style.visibility = 'hidden'
}
</script>

<template>
  <div class="rt">
    <section class="rt__hero">
      <div class="rt__eyebrow">
        <span class="rt__dash" />
        Internal
      </div>
      <h1 class="rt__title">Redirect testing</h1>
      <p class="rt__lede">
        Every Active authorisation server in the participants directory, with the
        <code>authorization_endpoint</code> resolved from its OpenID discovery document. This is
        the LFI-hosted URL the customer is redirected to for authentication — not an API Hub host.
      </p>
      <p class="rt__meta">
        {{ authServerEndpoints.length }} authorisation servers ·
        {{ new Set(authServerEndpoints.map(s => s.organisationId)).size }} organisations ·
        snapshot taken at build time from <a :href="authEndpointsSource" target="_blank" rel="noreferrer">{{ authEndpointsSource }}</a>
      </p>
    </section>

    <div class="rt__controls">
      <input
        v-model="query"
        type="search"
        class="rt__search"
        placeholder="Filter by LFI, server name, code or endpoint…"
      >
      <div class="rt__tabs">
        <button
          v-for="opt in (['all', 'bank', 'insurer'] as const)"
          :key="opt"
          type="button"
          class="rt__tab"
          :class="{ 'rt__tab--on': sector === opt }"
          @click="sector = opt"
        >
          {{ opt === 'all' ? 'All' : opt === 'bank' ? 'Banks' : 'Insurers' }}
        </button>
      </div>
    </div>

    <p v-if="query || sector !== 'all'" class="rt__count">
      {{ filtered.length }} server{{ filtered.length === 1 ? '' : 's' }} across {{ orgCount }} organisation{{ orgCount === 1 ? '' : 's' }}
    </p>

    <ul class="rt__grid">
      <li v-for="s in filtered" :key="s.authorisationServerId" class="rt__card">
        <div class="rt__card-head">
          <div class="rt__logo">
            <img
              v-if="s.logoUri"
              :src="s.logoUri"
              :alt="`${s.organisationName} logo`"
              loading="lazy"
              @error="onLogoError"
            >
          </div>
          <div class="rt__ident">
            <h2 class="rt__org">{{ s.organisationName }}</h2>
            <p class="rt__server">{{ s.customerFriendlyName }}</p>
          </div>
          <span v-if="s.sector" class="rt__badge" :class="`rt__badge--${s.sector}`">{{ s.sector }}</span>
        </div>

        <dl class="rt__fields">
          <dt>Authorization endpoint</dt>
          <dd>
            <a class="rt__endpoint" :href="s.authorizationEndpoint" target="_blank" rel="noreferrer">
              {{ s.authorizationEndpoint }}
            </a>
            <button
              type="button"
              class="rt__copy"
              :class="{ 'rt__copy--done': copied === s.authorisationServerId }"
              @click="copy(s.authorizationEndpoint, s.authorisationServerId)"
            >
              {{ copied === s.authorisationServerId ? 'Copied' : 'Copy' }}
            </button>
            <span class="rt__origin">origin: <code>{{ originOf(s.authorizationEndpoint) }}</code></span>
          </dd>

          <dt>Issuer</dt>
          <dd><code class="rt__mono">{{ s.issuer }}</code></dd>

          <dt>Discovery</dt>
          <dd>
            <a class="rt__mono rt__link" :href="s.discoveryUri" target="_blank" rel="noreferrer">
              {{ s.discoveryUri }}
            </a>
          </dd>
        </dl>

        <div v-if="s.apiFamilies.length || s.accountTypes.length" class="rt__tags">
          <span v-for="f in s.apiFamilies" :key="f" class="rt__tag">{{ f }}</span>
          <span v-for="a in s.accountTypes" :key="a" class="rt__tag rt__tag--alt">{{ a }}</span>
        </div>
      </li>
    </ul>

    <p v-if="!filtered.length" class="rt__empty">No authorisation servers match that filter.</p>
  </div>
</template>

<style scoped>
.rt {
  max-width: 60rem;
  margin: 0 auto;
  padding: 3rem 2rem 5rem;
  font-family: var(--at-sans);
  color: var(--at-mute-2);
}

.rt__eyebrow {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  font-family: var(--at-mono);
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--at-teal-deep);
  margin-bottom: 1.1rem;
}
.rt__dash { width: 24px; height: 1px; background: currentColor; }

.rt__title {
  font-family: var(--at-serif);
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 600;
  line-height: 1.05;
  letter-spacing: -0.03em;
  color: var(--at-navy-deep);
  margin: 0 0 1rem;
}

.rt__lede {
  font-size: 1.02rem;
  line-height: 1.65;
  margin: 0 0 0.9rem;
  max-width: 46rem;
}
.rt__lede code {
  font-family: var(--at-mono);
  font-size: 0.9em;
}

.rt__meta {
  font-size: 0.8rem;
  color: var(--at-mute);
  margin: 0 0 2.25rem;
  word-break: break-word;
}
.rt__meta a { color: inherit; }

.rt__controls {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
  margin-bottom: 1.25rem;
}

.rt__search {
  flex: 1 1 20rem;
  padding: 0.6rem 0.8rem;
  font-family: var(--at-sans);
  font-size: 0.9rem;
  color: var(--at-navy-deep);
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line);
}
.rt__search:focus {
  outline: none;
  border-color: var(--at-teal-deep);
}

.rt__tabs { display: flex; }

.rt__tab {
  padding: 0.55rem 0.9rem;
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-mute);
  background: none;
  border: 1px solid var(--at-grid-line);
  margin-left: -1px;
  cursor: pointer;
  transition: color 0.14s, background 0.14s;
}
.rt__tab--on {
  color: var(--at-bg-cream);
  background: var(--at-navy-deep);
  border-color: var(--at-navy-deep);
}

.rt__count {
  font-size: 0.82rem;
  color: var(--at-mute);
  margin: 0 0 1rem;
}

.rt__grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 1rem;
}

.rt__card {
  background: var(--at-surface);
  border: 1px solid var(--at-grid-line);
  border-left: 3px solid var(--at-teal-deep);
  padding: 1.25rem 1.35rem 1.35rem;
}

.rt__card-head {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  margin-bottom: 1rem;
}

.rt__logo {
  flex: 0 0 auto;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  border: 1px solid var(--at-grid-line);
  overflow: hidden;
}
.rt__logo img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.rt__ident { flex: 1; min-width: 0; }

.rt__org {
  font-family: var(--at-serif);
  font-size: 1.15rem;
  font-weight: 600;
  letter-spacing: -0.015em;
  color: var(--at-navy-deep);
  margin: 0;
}

.rt__server {
  font-size: 0.82rem;
  color: var(--at-mute);
  margin: 0.15rem 0 0;
}

.rt__badge {
  flex: 0 0 auto;
  align-self: flex-start;
  padding: 0.2rem 0.5rem;
  font-family: var(--at-mono);
  font-size: 0.6rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 700;
  border: 1px solid currentColor;
}
.rt__badge--bank { color: var(--at-teal-deep); }
.rt__badge--insurer { color: #8a6d1f; }

.rt__fields {
  margin: 0;
  display: grid;
  grid-template-columns: minmax(0, 11rem) minmax(0, 1fr);
  gap: 0.5rem 1rem;
  align-items: baseline;
}

.rt__fields dt {
  font-family: var(--at-mono);
  font-size: 0.63rem;
  letter-spacing: 0.11em;
  text-transform: uppercase;
  color: var(--at-mute);
  padding-top: 0.15rem;
}

.rt__fields dd {
  margin: 0;
  min-width: 0;
}

.rt__endpoint {
  font-family: var(--at-mono);
  font-size: 0.83rem;
  font-weight: 600;
  color: var(--at-navy-deep);
  text-decoration: none;
  word-break: break-all;
  border-bottom: 1px solid var(--at-grid-line-2);
}
.rt__endpoint:hover { color: var(--at-teal-deep); border-color: currentColor; }

.rt__copy {
  margin-left: 0.5rem;
  padding: 0.15rem 0.45rem;
  font-family: var(--at-mono);
  font-size: 0.6rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-mute);
  background: none;
  border: 1px solid var(--at-grid-line-2);
  cursor: pointer;
  vertical-align: middle;
  transition: color 0.14s, border-color 0.14s;
}
.rt__copy:hover { color: var(--at-teal-deep); border-color: var(--at-teal-deep); }
.rt__copy--done { color: var(--at-teal-deep); border-color: var(--at-teal-deep); }

.rt__origin {
  display: block;
  margin-top: 0.3rem;
  font-size: 0.72rem;
  color: var(--at-mute);
}
.rt__origin code {
  font-family: var(--at-mono);
  font-size: 0.95em;
  word-break: break-all;
}

.rt__mono {
  font-family: var(--at-mono);
  font-size: 0.78rem;
  color: var(--at-mute-2);
  word-break: break-all;
}
.rt__link { text-decoration: none; }
.rt__link:hover { color: var(--at-teal-deep); }

.rt__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-top: 1rem;
  padding-top: 0.9rem;
  border-top: 1px solid var(--at-grid-line);
}

.rt__tag {
  padding: 0.18rem 0.45rem;
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.06em;
  color: var(--at-mute);
  background: var(--at-bg-cream, transparent);
  border: 1px solid var(--at-grid-line);
}
.rt__tag--alt { color: var(--at-teal-deep); }

.rt__empty {
  font-size: 0.9rem;
  color: var(--at-mute);
  padding: 1.5rem 0;
}

@media (max-width: 34rem) {
  .rt__fields { grid-template-columns: minmax(0, 1fr); gap: 0.2rem; }
  .rt__fields dt { margin-top: 0.6rem; }
}
</style>
