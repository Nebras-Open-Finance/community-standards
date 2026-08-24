<route lang="yaml">
meta:
  title: Postman Guide
  isIndex: false
  next: false
  prev: false
  aside: false
</route>

<script setup lang="ts">
// Postman Guide — Vue port of the original .md.
//
// The hero + GitHub repo card chrome that lived in `<GitHubRepoCard>` now
// renders inline here as editorial HTML; the version "Badge" pills are a
// small `.pg-version` chip styled below. No reusable component needed for
// either — both surfaces are page-specific.

interface PostmanPath { name: string; desc: string }
interface PostmanBranch { tag: string; draft?: boolean; desc: string }

const postmanPaths: PostmanPath[] = [
  { name: 'banking.postman_collection.json',   desc: 'Banking collection — consent, account &amp; transaction data, payment initiation, Confirmation of Payee, products &amp; leads, ATMs, and webhooks.' },
  { name: 'insurance.postman_collection.json', desc: 'Insurance collection — consent, policy data sharing, quotation, revocation, and webhooks.' },
]

const postmanBranches: PostmanBranch[] = [
  { tag: 'main',           desc: 'Live source of truth — published, authoritative, externally consumable. New implementers should work from the latest version on <code>main</code>.' },
  { tag: 'other branches', draft: true, desc: 'Drafts of future content (for example a forthcoming <code>v2.2</code>). The Nebras Open Finance team will announce when draft content is ready for ecosystem review.' },
]

const REPO = 'Nebras-Open-Finance/postman'
const REPO_URL = `https://github.com/${REPO}`

interface BankingRow { folder: string; href?: string; role: 'BDSP' | 'BSIP' | '—'; desc: string }
const bankingRows: BankingRow[] = [
  { folder: 'Data Sharing',                       href: '/tech/tpp-standards/v2.2-rc1/banking/data-sharing/',          role: 'BDSP', desc: 'Consent lifecycle plus account, balance, transaction, beneficiary, standing order, and party data. Available in <code>application/json</code> and <code>application/jwt</code> formats.' },
  { folder: 'Service Initiation — Domestic',      href: '/tech/tpp-standards/v2.2-rc1/banking/service-initiation/',    role: 'BSIP', desc: 'All <a href="/tech/tpp-standards/v2.2-rc1/banking/service-initiation/#multi-payment-consents">payment consent types</a>: single instant (including CoP and multi-auth variants), all six multi-payment schedule types, delegated SCA, and refunds.' },
  { folder: 'Service Initiation — International', href: '/tech/tpp-standards/v2.2-rc1/banking/service-initiation/',    role: 'BSIP', desc: 'Single instant and fixed periodic schedule for cross-border transfers.' },
  { folder: 'Confirmation of Payee',              href: '/tech/tpp-standards/v2.2-rc1/banking/confirmation-of-payee/', role: 'BSIP', desc: 'Two-step name verification: discovery (API Hub) then confirmation (resolved LFI). Client credentials flow, <code>application/jwt</code> throughout.' },
  { folder: 'Products, Leads',                    href: '/tech/tpp-standards/v2.2-rc1/banking/products-leads/',        role: 'BDSP', desc: 'Open data endpoints — no user consent required.' },
  { folder: 'ATMs',                               href: '/tech/tpp-standards/v2.2-rc1/banking/atms/',                  role: 'BDSP', desc: 'ATM location and service data published by LFIs. No user consent required.' },
  { folder: 'Webhooks',                           href: '/tech/tpp-standards/v2.2-rc1/webhooks/',                       role: '—',    desc: 'Simulate JWE-encrypted event receipt and <code>202 Accepted</code> response.' },
]

interface InsuranceRow { folder: string; desc: string }
const insuranceRows: InsuranceRow[] = [
  { folder: 'Data Sharing',         desc: 'Consent and access to insurance policy information.' },
  { folder: 'Quotation',            desc: 'Insurance quote retrieval following consent.' },
  { folder: 'Revoke',               desc: 'Consent revocation by ID or group ID.' },
  { folder: 'Webhooks / Do Fail',   desc: 'Webhook receipt testing and failure simulation.' },
]
</script>

<template>
  <main class="pg">

    <!-- ── Hero ─────────────────────────────────────────────────────── -->
    <section class="pg__hero">
      <div class="pg__inner">
        <div class="pg__eyebrow">
          <span class="pg__eyebrow-dash" />
          Sandbox testing · Postman
        </div>
        <h1 class="pg__title">
          Postman Collection
          <span class="pg__read">2 min read</span>
        </h1>
        <p class="pg__lede">
          A Postman collection provided to the UAE Open Finance ecosystem to help
          <strong>LFIs</strong> and <strong>TPPs</strong> test their API
          implementations against the Open Finance Trust Framework. The collection
          covers the full sandbox flow — TPP registration, consent, authorization,
          and payments — and can be downloaded pre-configured for your application
          from the <a href="/tech/tpp-standards/v2.2-rc1/getting-started/">Getting Started</a> page.
        </p>
      </div>
    </section>

    <!-- ── Featured GitHub repo card (formerly <GitHubRepoCard />) ──── -->
    <section class="pg__repo-section">
      <div class="pg__inner">
        <div class="gh">
          <div class="gh__meta">
            <span class="gh__meta-dot" />
            GitHub repository
          </div>

          <div class="gh__head">
            <svg class="gh__logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="42" height="42" aria-hidden="true">
              <path fill="currentColor" d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" />
            </svg>
            <div class="gh__head-text">
              <div class="gh__title">Nebras-Open-Finance&thinsp;/&thinsp;postman</div>
              <p class="gh__sub">
                The two <code>.postman_collection.json</code> files at the root of the
                repository are the published surface — import either one into Postman
                to start using it.
              </p>
            </div>
          </div>

          <div class="gh__paths">
            <div v-for="p in postmanPaths" :key="p.name" class="gh__path">
              <code class="gh__path-name">{{ p.name }}</code>
              <span class="gh__path-desc" v-html="p.desc" />
            </div>
          </div>

          <div class="gh__branches">
            <div v-for="b in postmanBranches" :key="b.tag" class="gh__branch">
              <span
                class="gh__branch-tag"
                :class="{ 'gh__branch-tag--draft': b.draft }"
              >{{ b.tag }}</span>
              <span class="gh__branch-desc" v-html="b.desc" />
            </div>
          </div>

          <a class="gh__cta" :href="REPO_URL" target="_blank" rel="noopener">
            <span>Open on GitHub</span>
            <span class="gh__cta-arrow" aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>

    <!-- ── Collections ─────────────────────────────────────────────── -->
    <section class="pg__collections">
      <div class="pg__inner">
        <div class="pg__section-head">
          <div class="pg__section-eyebrow">
            <span class="pg__eyebrow-dash" />
            Collections
          </div>
          <h2 class="pg__section-title">What's inside</h2>
          <p class="pg__section-sub">
            Folders inside each <code>.postman_collection.json</code>, the role they
            require, and what they cover.
          </p>
        </div>

        <div class="pg__group">
          <div class="pg__group-head">
            <h3 class="pg__group-title">Banking</h3>
            <span class="pg-version">V1.2 · V2.0 · V2.1 (current)</span>
          </div>

          <div class="pg-table-wrap">
            <table class="pg-table">
              <thead>
                <tr>
                  <th>Folder</th>
                  <th>Role</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in bankingRows" :key="row.folder">
                  <td>
                    <a v-if="row.href" :href="row.href">{{ row.folder }}</a>
                    <template v-else>{{ row.folder }}</template>
                  </td>
                  <td>
                    <span
                      class="pg-role"
                      :class="`pg-role--${row.role.toLowerCase().replace('—', 'none')}`"
                    >{{ row.role }}</span>
                  </td>
                  <td><span v-html="row.desc" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="pg__group">
          <div class="pg__group-head">
            <h3 class="pg__group-title">Insurance</h3>
            <span class="pg-version">V2.1 (current)</span>
          </div>

          <div class="pg-table-wrap">
            <table class="pg-table">
              <thead>
                <tr>
                  <th>Folder</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in insuranceRows" :key="row.folder">
                  <td>{{ row.folder }}</td>
                  <td>{{ row.desc }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>

  </main>
</template>

<style scoped>
/* ── Page shell ──────────────────────────────────────────────────── */
.pg {
  background: var(--at-bg-cream);
  color: var(--at-navy-deep);
  font-family: var(--at-sans);
  padding-top: 4.25rem;
  min-height: 100vh;
}

.pg__inner {
  max-width: var(--at-page-max);
  margin: 0 auto;
  padding: 4rem 2rem 3rem;
}

/* ── Hero ─────────────────────────────────────────────────────────── */
.pg__hero {
  background: var(--at-bg-cream);
  border-bottom: 1px solid var(--at-grid-line);
}

.pg__eyebrow {
  font-family: var(--at-mono);
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--at-teal);
  margin-bottom: 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 600;
}
.pg__eyebrow-dash {
  width: 24px; height: 1px; background: currentColor;
}

.pg__title {
  font-family: var(--at-serif);
  font-size: clamp(2.25rem, 5vw, 3.6rem);
  font-weight: 600;
  line-height: 1.02;
  letter-spacing: -0.03em;
  margin: 0;
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.85rem;
}

.pg__read {
  font-family: var(--at-mono);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 500;
  color: var(--at-mute);
  align-self: center;
  padding-left: 0.6rem;
  border-left: 1px solid var(--at-grid-line-2);
}

.pg__lede {
  font-family: var(--at-sans);
  font-size: 1.1rem;
  line-height: 1.65;
  margin: 1.75rem 0 0;
  max-width: 50rem;
  color: var(--at-mute-2);
}
.pg__lede strong { color: var(--at-navy-deep); font-weight: 600; }
.pg__lede a {
  color: var(--at-teal-deep);
  text-decoration: none;
  border-bottom: 1px solid currentColor;
}
.pg__lede a:hover { color: var(--at-navy-deep); }

/* ── GitHub repo card ────────────────────────────────────────────── */
.pg__repo-section {
  background: var(--at-surface);
  border-top: 1px solid var(--at-grid-line);
  padding: 3rem 0 3.5rem;
}
.pg__repo-section .pg__inner {
  padding-top: 0;
  padding-bottom: 0;
}

.gh {
  position: relative;
  background: var(--at-inverse-bg);
  color: var(--at-inverse-fg);
  padding: 2.25rem 2rem 1.85rem;
  overflow: hidden;
}
.gh::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--at-teal) 0%, var(--at-blue) 50%, var(--at-gold) 100%);
}

.gh__meta {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--at-teal);
  margin-bottom: 1.25rem;
}
.gh__meta-dot {
  width: 8px;
  height: 8px;
  background: var(--at-teal);
  border-radius: 50%;
  box-shadow: 0 0 0 4px rgba(0, 194, 169, 0.18);
}

.gh__head {
  display: flex;
  align-items: flex-start;
  gap: 1.15rem;
  margin-bottom: 1.6rem;
}
.gh__logo {
  color: var(--at-inverse-fg);
  flex-shrink: 0;
  margin-top: 0.3rem;
}
.gh__title {
  font-family: var(--at-serif);
  font-size: clamp(1.45rem, 2.6vw, 1.95rem);
  font-weight: 500;
  letter-spacing: -0.02em;
  line-height: 1.1;
  margin: 0 0 0.55rem;
  color: var(--at-inverse-fg);
}
.gh__sub {
  font-family: var(--at-sans);
  font-size: 0.98rem;
  line-height: 1.55;
  color: rgba(250, 250, 247, 0.82);
  margin: 0;
}
.gh__sub code,
.gh code {
  font-family: var(--at-mono);
  font-size: 0.82em;
  background: rgba(250, 250, 247, 0.08);
  padding: 0.1em 0.4em;
  color: var(--at-inverse-fg);
}

/* Paths */
.gh__paths {
  display: grid;
  grid-template-columns: 1fr;
  margin-bottom: 1.6rem;
  border: 1px solid rgba(250, 250, 247, 0.12);
}
.gh__path {
  display: grid;
  grid-template-columns: 17rem 1fr;
  align-items: baseline;
  gap: 1.15rem;
  padding: 0.8rem 1rem;
  border-bottom: 1px solid rgba(250, 250, 247, 0.08);
}
.gh__path:last-child { border-bottom: none; }

.gh__path-name {
  font-family: var(--at-mono);
  font-size: 0.82em;
  font-weight: 600;
  color: var(--at-teal);
  background: rgba(0, 194, 169, 0.12);
  padding: 0.1em 0.4em;
  justify-self: start;
}

.gh__path-desc {
  font-family: var(--at-sans);
  font-size: 0.9rem;
  color: rgba(250, 250, 247, 0.85);
  line-height: 1.5;
}
.gh__path-desc strong { color: var(--at-inverse-fg); font-weight: 600; }

/* Branches */
.gh__branches {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.85rem;
  margin-bottom: 1.6rem;
}
.gh__branch {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  padding: 0.95rem 1rem;
  background: rgba(250, 250, 247, 0.04);
  border: 1px solid rgba(250, 250, 247, 0.1);
}
.gh__branch-tag {
  display: inline-flex;
  align-self: flex-start;
  padding: 0.28rem 0.55rem;
  font-family: var(--at-mono);
  font-size: 0.64rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-navy-deep);
  background: var(--at-teal);
}
.gh__branch-tag--draft {
  background: rgba(250, 250, 247, 0.14);
  color: var(--at-inverse-fg);
}
.gh__branch-desc {
  font-family: var(--at-sans);
  font-size: 0.86rem;
  line-height: 1.55;
  color: rgba(250, 250, 247, 0.8);
}

/* CTA */
.gh__cta {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.85rem 1.3rem;
  background: var(--at-teal);
  color: var(--at-navy-deep);
  text-decoration: none;
  font-family: var(--at-mono);
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 700;
  transition: background 0.2s ease;
}
.gh__cta:hover { background: var(--at-inverse-fg); }

.gh__cta-arrow { font-size: 0.95rem; }

/* ── Collections section ─────────────────────────────────────────── */
.pg__collections {
  background: var(--at-bg-cream);
  border-top: 1px solid var(--at-grid-line);
  padding: 3.5rem 0 5rem;
}
.pg__collections .pg__inner {
  padding-top: 0;
  padding-bottom: 0;
}

.pg__section-head { margin-bottom: 2.25rem; }

.pg__section-eyebrow {
  font-family: var(--at-mono);
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--at-teal);
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 600;
}

.pg__section-title {
  font-family: var(--at-serif);
  font-size: clamp(1.5rem, 2.6vw, 2rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.1;
  margin: 0 0 0.6rem;
  color: var(--at-navy-deep);
}

.pg__section-sub {
  font-family: var(--at-sans);
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--at-mute-2);
  margin: 0;
}
.pg__section-sub code {
  font-family: var(--at-mono);
  font-size: 0.86em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  color: var(--at-navy-deep);
  padding: 0.08em 0.4em;
}

.pg__group { margin-bottom: 2.5rem; }
.pg__group:last-child { margin-bottom: 0; }

.pg__group-head {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  flex-wrap: wrap;
  margin-bottom: 0.85rem;
}

.pg__group-title {
  font-family: var(--at-serif);
  font-size: 1.4rem;
  font-weight: 600;
  letter-spacing: -0.015em;
  color: var(--at-navy-deep);
  margin: 0;
}

/* Replacement for the original VitePress <Badge> tag — small inline chip
   matching the editorial pill aesthetic (mono caps, flat teal accent). */
.pg-version {
  display: inline-block;
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--at-teal-deep);
  background: var(--at-surface);
  border: 1px solid var(--at-teal-deep);
  padding: 0.18em 0.55em;
  white-space: nowrap;
  vertical-align: middle;
}

/* ── Editorial table (matches RequirementsPage header style) ─────── */
.pg-table-wrap {
  border: 1px solid var(--at-grid-line);
  background: var(--at-surface);
  overflow-x: auto;
}

.pg-table {
  width: 100%;
  border-collapse: collapse;
  font-family: var(--at-sans);
  font-size: 0.92rem;
  line-height: 1.55;
  color: var(--at-navy-deep);
}

.pg-table thead { background: var(--at-navy-deep); }

.pg-table th {
  text-align: left;
  padding: 0.75rem 0.95rem;
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-bg-cream);
  border-bottom: 0;
}
.pg-table th + th { border-left: 1px solid rgba(250, 250, 247, 0.18); }

.pg-table td {
  padding: 0.85rem 0.95rem;
  border-bottom: 1px solid var(--at-grid-line);
  vertical-align: top;
  color: var(--at-mute-2);
}
.pg-table tr:last-child td { border-bottom: 0; }

.pg-table td:first-child {
  font-weight: 600;
  color: var(--at-navy-deep);
  white-space: nowrap;
}
.pg-table td a {
  color: var(--at-navy-deep);
  text-decoration: none;
  border-bottom: 1px solid currentColor;
}
.pg-table td a:hover { color: var(--at-teal-deep); }

.pg-table code {
  font-family: var(--at-mono);
  font-size: 0.82em;
  background: color-mix(in srgb, var(--at-grid-line) 55%, var(--at-bg-cream));
  border: 1px solid var(--at-grid-line);
  color: var(--at-navy-deep);
  padding: 0.08em 0.4em;
}

/* Role chips inside the role column */
.pg-role {
  display: inline-block;
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 700;
  padding: 0.2em 0.55em;
  border: 1px solid currentColor;
  white-space: nowrap;
}
.pg-role--bdsp { color: var(--at-blue-deep); }
.pg-role--bsip { color: var(--at-teal-deep); }
.pg-role--none { color: var(--at-mute); }

/* ── Responsive ──────────────────────────────────────────────────── */
@media (max-width: 900px) {
  .gh__branches { grid-template-columns: 1fr; }
  .gh__path { grid-template-columns: 1fr; gap: 0.4rem; }
}

@media (max-width: 720px) {
  .pg__inner { padding: 2.75rem 1.25rem 2rem; }
  .pg__repo-section { padding: 2rem 0 2.5rem; }
  .pg__collections { padding: 2.5rem 0 3.5rem; }
  .gh { padding: 1.75rem 1.25rem 1.5rem; }
}
</style>
