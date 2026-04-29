<route lang="yaml">
meta:
  title: Data-sharing overage rates by LFI
  isIndex: true
</route>

<script setup lang="ts">
interface LfiOverageFee {
  name: string
  logo: string
  fils: number
  label: string
}

// Shape of the `/participants` JSON we read at runtime. Only the fields we
// touch are typed — everything else stays `unknown` and is narrowed inline.
interface ApiResource {
  ApiFamilyType?: string
  ApiMetadata?: { OverLimitFees?: string | number | null }
}
interface AuthorisationServer {
  CustomerFriendlyName?: string
  CustomerFriendlyLogoUri?: string
  ApiResources?: ApiResource[]
}
interface Organisation {
  OrganisationName?: string
  AuthorisationServers?: AuthorisationServer[]
}

const lfiOverageFees = ref<LfiOverageFee[]>([])
const activeLang = ref<'node' | 'python'>('node')

onMounted(async () => {
  try {
    const res = await fetch('https://data.directory.openfinance.ae/participants')
    if (!res.ok) return
    const data = (await res.json()) as Organisation[]
    lfiOverageFees.value = extractOverageFees(data)
  } catch {
    // Page still renders; empty state stays visible if the directory is unreachable
  }
})

function extractOverageFees(data: Organisation[] | null | undefined): LfiOverageFee[] {
  const seen = new Map<string, LfiOverageFee>()
  for (const org of data || []) {
    for (const server of org.AuthorisationServers || []) {
      const ds = (server.ApiResources || []).find(
        (r) => r.ApiFamilyType === 'account-information',
      )
      if (!ds) continue

      const name = server.CustomerFriendlyName || org.OrganisationName
      if (!name || seen.has(name)) continue

      const raw = ds.ApiMetadata?.OverLimitFees
      const aed = raw !== undefined && raw !== null && String(raw).trim() !== '' ? Number(raw) : 0
      const fils = Number.isFinite(aed) ? Math.round(aed * 100) : 0

      seen.set(name, {
        name,
        logo: server.CustomerFriendlyLogoUri || '',
        fils,
        label: formatOverageRate(fils),
      })
    }
  }
  return [...seen.values()].sort((a, b) => a.name.localeCompare(b.name))
}

function formatOverageRate(fils: number): string {
  if (fils === 0) return 'Free above threshold'
  if (fils < 100) return `${fils} fils per call`
  const aed = (fils / 100).toFixed(2).replace(/\.?0+$/, '')
  return `${aed} AED per call`
}
</script>

<template>
  <div class="ed-lfir">
    <section class="ed-lfir-hero">
      <div class="ed-lfir-hero__inner">
        <div class="ed-lfir-hero__label">
          <span class="ed-lfir-hero__label-dash" />
          AlTareq &middot; Per&#8209;LFI overage rates
        </div>
        <h1 class="ed-lfir-hero__title">Data&#8209;sharing overage rates by LFI</h1>
        <p class="ed-lfir-hero__sub">
          Above the free per&#8209;customer, per&#8209;day threshold each LFI
          sets its own per&#8209;call rate for continued data&#8209;sharing
          requests. The rates below are read live from the Open Finance
          directory (<code>ApiMetadata.OverLimitFees</code>). LFIs that have
          not published a rate charge nothing above the threshold.
        </p>
        <p class="ed-lfir-hero__back">
          <a href="/pricing/">&larr; Back to pricing</a>
        </p>
      </div>
    </section>

    <section class="ed-lfir-section">
      <div class="ed-lfir-section__inner">
        <div v-if="lfiOverageFees.length === 0" class="ed-lfir-empty">
          Loading rates from the directory&hellip;
        </div>

        <div v-else class="ed-lfir-table">
          <div class="ed-lfir-table__head">
            <span>Institution</span>
            <span>Rate per call above threshold</span>
          </div>
          <div
            class="ed-lfir-table__row"
            v-for="lfi in lfiOverageFees"
            :key="lfi.name"
          >
            <span class="ed-lfir-table__name">
              <img
                v-if="lfi.logo"
                :src="lfi.logo"
                alt=""
                class="ed-lfir-table__logo"
                loading="lazy"
              />
              {{ lfi.name }}
            </span>
            <span class="ed-lfir-table__rate" :class="{ 'is-free': lfi.fils === 0 }">
              {{ lfi.label }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <section class="ed-lfir-howto">
      <div class="ed-lfir-howto__inner">
        <div class="ed-lfir-howto__label">
          <span class="ed-lfir-hero__label-dash" />
          Pull this yourself
        </div>
        <h2 class="ed-lfir-howto__title">Reading overage rates from the directory</h2>
        <p class="ed-lfir-howto__lede">
          The rates above come from <code>ApiMetadata.OverLimitFees</code> on
          each LFI&rsquo;s <code>account-information</code> API resource,
          returned by the directory&rsquo;s <code>/participants</code>
          endpoint. One call gives you the rate for every LFI.
        </p>

        <h3 class="ed-lfir-howto__sub">Endpoint</h3>
        <ul class="ed-lfir-howto__list">
          <li>
            <span class="ed-lfir-howto__tag">Production</span>
            <code>GET https://data.directory.openfinance.ae/participants</code>
          </li>
          <li>
            <span class="ed-lfir-howto__tag">Sandbox</span>
            <code>GET https://data.sandbox.directory.openfinance.ae/participants</code>
          </li>
        </ul>

        <h3 class="ed-lfir-howto__sub">Where the value lives</h3>
<pre class="ed-lfir-howto__code"><code>participants[]
  .AuthorisationServers[]
    .ApiResources[]                        // ApiFamilyType === "account-information"
      .ApiMetadata.OverLimitFees           // string in AED, e.g. "0.50"
                                           // missing or empty &rarr; 0 (free above threshold)</code></pre>

        <h3 class="ed-lfir-howto__sub">Reading the rate</h3>
        <div class="ed-lfir-howto__tabs" role="tablist">
          <button
            type="button"
            role="tab"
            :class="['ed-lfir-howto__tab', { 'is-active': activeLang === 'node' }]"
            :aria-selected="activeLang === 'node'"
            @click="activeLang = 'node'"
          >Node.js</button>
          <button
            type="button"
            role="tab"
            :class="['ed-lfir-howto__tab', { 'is-active': activeLang === 'python' }]"
            :aria-selected="activeLang === 'python'"
            @click="activeLang = 'python'"
          >Python</button>
        </div>
<pre v-show="activeLang === 'node'" class="ed-lfir-howto__code ed-lfir-howto__code--tabbed"><code>const res = await fetch('https://data.directory.openfinance.ae/participants')
const participants = await res.json()

const rates = []
for (const org of participants) {
  for (const server of org.AuthorisationServers || []) {
    const ds = (server.ApiResources || [])
      .find(r => r.ApiFamilyType === 'account-information')
    if (!ds) continue

    const raw = ds.ApiMetadata?.OverLimitFees
    const aedPerCall = raw &amp;&amp; String(raw).trim() !== '' ? Number(raw) : 0

    rates.push({
      server: server.CustomerFriendlyName || org.OrganisationName,
      aedPerCall,
    })
  }
}</code></pre>
<pre v-show="activeLang === 'python'" class="ed-lfir-howto__code ed-lfir-howto__code--tabbed"><code>import requests

resp = requests.get('https://data.directory.openfinance.ae/participants')
participants = resp.json()

rates = []
for org in participants:
    for server in org.get('AuthorisationServers') or []:
        ds = next(
            (r for r in (server.get('ApiResources') or [])
             if r.get('ApiFamilyType') == 'account-information'),
            None,
        )
        if not ds:
            continue

        raw = (ds.get('ApiMetadata') or {}).get('OverLimitFees')
        aed_per_call = float(raw) if raw and str(raw).strip() != '' else 0

        rates.append({
            'server': server.get('CustomerFriendlyName') or org.get('OrganisationName'),
            'aed_per_call': aed_per_call,
        })</code></pre>

        <p class="ed-lfir-howto__note">
          Cache the response. The directory is the source of truth, but
          rates change rarely &mdash; refreshing daily is plenty.
        </p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.ed-lfir {
  background: var(--at-bg-cream);
  color: var(--at-navy-deep);
  font-family: var(--at-sans);
  padding-top: 4.25rem;
  min-height: 100vh;
}

.ed-lfir-hero {
  background: var(--at-bg-cream);
  border-bottom: 1px solid var(--at-grid-line);
}

.ed-lfir-hero__inner {
  max-width: var(--at-page-max);
  margin: 0 auto;
  padding: 4rem 2rem 2.5rem;
}

.ed-lfir-hero__label {
  font-family: var(--at-mono);
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--at-teal);
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.ed-lfir-hero__label-dash {
  width: 24px;
  height: 1px;
  background: currentColor;
}

.ed-lfir-hero__title {
  font-family: var(--at-serif);
  font-size: clamp(2rem, 4.5vw, 3rem);
  font-weight: 600;
  line-height: 1.05;
  letter-spacing: -0.02em;
  margin: 0;
  color: var(--at-navy-deep);
}

.ed-lfir-hero__sub {
  font-family: var(--at-sans);
  font-size: 1.05rem;
  line-height: 1.6;
  margin: 1.5rem 0 1.25rem;
  max-width: 52rem;
  color: var(--at-mute-2);
}

.ed-lfir-hero__sub code {
  font-family: var(--at-mono);
  font-size: 0.85rem;
  background: rgba(0, 39, 127, 0.06);
  padding: 0.05rem 0.35rem;
  color: var(--at-navy-deep);
}

.ed-lfir-hero__back {
  font-family: var(--at-mono);
  font-size: 0.78rem;
  letter-spacing: 0.05em;
  margin: 0;
}

.ed-lfir-hero__back a {
  color: var(--at-teal);
  text-decoration: none;
}

.ed-lfir-hero__back a:hover { text-decoration: underline; }

.ed-lfir-section {
  background: var(--at-surface);
  padding: 3rem 0 5rem;
}

.ed-lfir-section__inner {
  max-width: var(--at-page-max);
  margin: 0 auto;
  padding: 0 2rem;
}

.ed-lfir-empty {
  font-family: var(--at-mono);
  font-size: 0.78rem;
  letter-spacing: 0.06em;
  color: var(--at-mute);
  padding: 2rem;
  text-align: center;
  border: 1px dashed var(--at-grid-line);
}

.ed-lfir-table {
  border: 1px solid var(--at-grid-line);
  background: var(--at-surface);
}

.ed-lfir-table__head {
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  gap: 1.5rem;
  padding: 0.8rem 1.25rem;
  background: rgba(0, 39, 127, 0.04);
  border-bottom: 1px solid var(--at-grid-line);
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-navy-deep);
}

.ed-lfir-table__row {
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  gap: 1.5rem;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid var(--at-grid-line);
  align-items: center;
}

.ed-lfir-table__row:last-child { border-bottom: none; }

.ed-lfir-table__name {
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  font-family: var(--at-sans);
  font-size: 0.98rem;
  color: var(--at-navy-deep);
  font-weight: 600;
}

.ed-lfir-table__logo {
  height: 24px;
  width: 24px;
  object-fit: contain;
  border-radius: 4px;
  flex-shrink: 0;
}

.ed-lfir-table__rate {
  font-family: var(--at-serif);
  font-size: 1.05rem;
  color: var(--at-navy-deep);
  font-weight: 500;
  letter-spacing: -0.01em;
}

.ed-lfir-table__rate.is-free {
  font-family: var(--at-mono);
  font-size: 0.82rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--at-mute);
  font-weight: 600;
}

/* "Pull this yourself" how-to section */
.ed-lfir-howto {
  background: var(--at-bg-cream);
  border-top: 1px solid var(--at-grid-line);
  padding: 3.5rem 0 5rem;
}

.ed-lfir-howto__inner {
  max-width: var(--at-page-max);
  margin: 0 auto;
  padding: 0 2rem;
}

.ed-lfir-howto__label {
  font-family: var(--at-mono);
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--at-teal);
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.ed-lfir-howto__title {
  font-family: var(--at-serif);
  font-size: clamp(1.6rem, 3vw, 2.1rem);
  font-weight: 600;
  line-height: 1.1;
  letter-spacing: -0.015em;
  margin: 0 0 1rem;
  color: var(--at-navy-deep);
}

.ed-lfir-howto__lede {
  font-family: var(--at-sans);
  font-size: 1rem;
  line-height: 1.6;
  color: var(--at-mute-2);
  max-width: 52rem;
  margin: 0 0 2rem;
}

.ed-lfir-howto__lede code {
  font-family: var(--at-mono);
  font-size: 0.85rem;
  background: rgba(0, 39, 127, 0.06);
  padding: 0.05rem 0.35rem;
  color: var(--at-navy-deep);
}

.ed-lfir-howto__sub {
  font-family: var(--at-mono);
  font-size: 0.7rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-navy-deep);
  margin: 1.75rem 0 0.75rem;
}

.ed-lfir-howto__list {
  list-style: none;
  padding: 0;
  margin: 0 0 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.ed-lfir-howto__list li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.ed-lfir-howto__tag {
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-teal);
  min-width: 5rem;
}

.ed-lfir-howto__list code {
  font-family: var(--at-mono);
  font-size: 0.82rem;
  color: var(--at-navy-deep);
  background: rgba(0, 39, 127, 0.04);
  padding: 0.15rem 0.45rem;
  word-break: break-all;
}

.ed-lfir-howto__code {
  font-family: var(--at-mono);
  font-size: 0.86rem;
  line-height: 1.55;
  background: var(--at-bg-paper);
  color: var(--at-navy-deep);
  padding: 1rem 1.25rem;
  margin: 0 0 0.5rem;
  overflow-x: auto;
  border: 1px solid var(--at-grid-line);
  border-radius: 0;
}

.ed-lfir-howto__tabs {
  display: flex;
  margin: 0;
  border: 1px solid var(--at-grid-line);
  border-bottom: 0;
  background: var(--at-surface);
}

.ed-lfir-howto__tab {
  font-family: var(--at-mono);
  font-size: 0.7rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-mute);
  background: transparent;
  border: 0;
  border-right: 1px solid var(--at-grid-line);
  padding: 0.65rem 1.1rem;
  cursor: pointer;
  transition: color 0.15s ease, background-color 0.15s ease;
}

.ed-lfir-howto__tab:last-child { border-right: 0; }

.ed-lfir-howto__tab:hover { color: var(--at-navy-deep); }

.ed-lfir-howto__tab.is-active {
  color: var(--at-navy-deep);
  background: var(--at-bg-paper);
  box-shadow: inset 0 -2px 0 var(--at-teal);
}

.ed-lfir-howto__code--tabbed {
  margin-top: 0;
}

.ed-lfir-howto__code code {
  font-family: inherit;
  font-size: inherit;
  background: none;
  color: inherit;
  padding: 0;
  white-space: pre;
  border: 0;
}

.ed-lfir-howto__note {
  font-family: var(--at-sans);
  font-size: 0.88rem;
  line-height: 1.55;
  color: var(--at-mute-2);
  margin: 1.75rem 0 0;
  font-style: italic;
}
</style>
