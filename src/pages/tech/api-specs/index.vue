<route lang="yaml">
meta:
  title: API Specifications
</route>

<script setup lang="ts">
const { selectedVersion } = useSelectedVersion()

const repoPaths: { name: string; desc: string }[] = [
  { name: 'dist/standards/',     desc: 'APIs the API Hub exposes <strong>to TPPs</strong>.' },
  { name: 'dist/api-hub/',       desc: 'APIs the API Hub exposes <strong>to LFIs</strong>.' },
  { name: 'dist/ozone-connect/', desc: 'APIs <strong>LFIs must implement</strong> for the API Hub to call.' },
]

interface SectionCard {
  category: string
  color: string
  title: string
  url: string
  desc: string
  flowFrom: string
  flowTo: string
  distPath: string
  audience: string
}

const sections = computed<SectionCard[]>(() => [
  {
    category: 'TPP-facing',
    color: 'var(--at-gold)',
    title: 'Open Finance Standards',
    url: `/tech/api-specs/${selectedVersion.value}/tpp/`,
    desc: 'The APIs the API Hub exposes to TPPs. TPPs use these endpoints to access financial data and initiate services on behalf of their customers &mdash; Trust Framework discovery, registration, token exchange, consent, bank data sharing, service initiation, Confirmation of Payee, ATMs, and event notifications.',
    flowFrom: 'TPP',
    flowTo: 'API Hub',
    distPath: 'dist/standards/',
    audience: 'TPP engineering',
  },
  {
    category: 'LFI-facing (Hub)',
    color: 'var(--at-teal)',
    title: 'API Hub',
    url: `/tech/api-specs/${selectedVersion.value}/api-hub/`,
    desc: 'The APIs the API Hub exposes to LFIs. An LFI calls these endpoints during the authorization journey &mdash; notably Headless Heimdall (for delegating PSU authentication) and the Consent Manager (for looking up and updating consents).',
    flowFrom: 'LFI',
    flowTo: 'API Hub',
    distPath: 'dist/api-hub/',
    audience: 'LFI engineering',
  },
  {
    category: 'LFI-implemented',
    color: 'var(--at-navy-deep)',
    title: 'Ozone Connect',
    url: `/tech/api-specs/${selectedVersion.value}/ozone-connect/`,
    desc: 'The APIs LFIs must implement for the API Hub to call. When a TPP makes a valid request to the API Hub, the Hub proxies that request to the relevant LFI using these endpoints &mdash; consent events, data sharing, service initiation, Confirmation of Payee, products &amp; leads, and ATMs.',
    flowFrom: 'API Hub',
    flowTo: 'LFI',
    distPath: 'dist/ozone-connect/',
    audience: 'LFI engineering',
  },
  {
    category: 'Directory',
    color: 'var(--at-blue)',
    title: 'Trust Framework',
    url: '/tech/api-specs/trust-framework/participants',
    desc: 'The Raidiam-operated directory APIs that underpin the Open Finance ecosystem &mdash; participant discovery, organisation and software statement registration, authorisation server metadata, and the OAuth token endpoint used for mTLS-authenticated calls. These specifications are not version-bound to the UAE Open Finance release cycle.',
    flowFrom: 'Application',
    flowTo: 'Directory',
    distPath: 'openapi/trust-framework.yaml',
    audience: 'TPP and LFI engineering',
  },
])

function withAlpha(cssVar: string, alpha: number): string {
  return `color-mix(in srgb, ${cssVar} ${Math.round(alpha * 100)}%, transparent)`
}
</script>

<template>
  <div class="ed-spec">
    <section class="ed-spec-hero">
      <div class="ed-spec-hero__inner">
        <div class="ed-spec-hero__label">
          <span class="ed-spec-hero__label-dash" />
          Source of truth &middot; OpenAPI 3.x
        </div>
        <h1 class="ed-spec-hero__title">API Specifications</h1>
        <p class="ed-spec-hero__sub">
          The official UAE Open Finance OpenAPI specifications are maintained in a single
          repository. The OpenAPI YAML files are the
          <strong>source of truth</strong> for every API in the ecosystem &mdash; where a guide
          or this site disagrees with a spec, the spec wins.
        </p>
      </div>
    </section>

    <section class="ed-spec-repo">
      <div class="ed-spec-repo__inner">
        <div class="ed-spec-repo__card">
          <div class="ed-spec-repo__meta">
            <span class="ed-spec-repo__meta-dot" />
            GitHub repository
          </div>

          <div class="ed-spec-repo__head">
            <svg class="ed-spec-repo__logo" xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16" width="42" height="42" aria-hidden="true">
              <path fill="currentColor" d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"/>
            </svg>
            <div class="ed-spec-repo__head-text">
              <h2 class="ed-spec-repo__title">Nebras-Open-Finance&thinsp;/&thinsp;api-specs</h2>
              <p class="ed-spec-repo__sub">
                The canonical OpenAPI repository. All specs on this site are fetched from its
                <code>dist/</code> directory at build time &mdash; no YAML is committed here.
              </p>
            </div>
          </div>

          <div class="ed-spec-repo__paths">
            <div v-for="p in repoPaths" :key="p.name" class="ed-spec-repo__path">
              <code class="ed-spec-repo__path-name">{{ p.name }}</code>
              <span class="ed-spec-repo__path-desc" v-html="p.desc" />
            </div>
          </div>

          <div class="ed-spec-repo__branches">
            <div class="ed-spec-repo__branch">
              <span class="ed-spec-repo__branch-tag">main</span>
              <span class="ed-spec-repo__branch-desc">
                Live source of truth &mdash; published, authoritative, externally consumable.
                New implementers should work from the latest version on <code>main</code>.
              </span>
            </div>
            <div class="ed-spec-repo__branch">
              <span class="ed-spec-repo__branch-tag ed-spec-repo__branch-tag--draft">other branches</span>
              <span class="ed-spec-repo__branch-desc">
                Drafts of future content (for example a forthcoming <code>v2.2</code>). The
                Nebras Open Finance team will announce when draft content is ready for ecosystem
                review.
              </span>
            </div>
          </div>

          <a
            class="ed-spec-repo__cta"
            href="https://github.com/Nebras-Open-Finance/api-specs"
            target="_blank"
            rel="noopener"
          >
            <span>Open on GitHub</span>
            <span class="ed-spec-repo__cta-arrow">&nearr;</span>
          </a>
        </div>
      </div>
    </section>

    <section class="ed-spec-sections">
      <div class="ed-spec-sections__inner">
        <div class="ed-spec-sections__head">
          <div class="ed-spec-sections__eyebrow">
            <span class="ed-spec-sections__eyebrow-dash" />
            Specifications by audience
          </div>
          <h2 class="ed-spec-sections__title">Sections</h2>
          <p class="ed-spec-sections__lede">
            Specifications are organised by the audience that consumes them. The current
            version across the TPP, API Hub, and Ozone Connect categories is
            <strong>{{ selectedVersion }}</strong>; the Trust Framework directory follows its
            own release cycle.
          </p>
        </div>

        <div class="ed-spec-grid">
          <a
            v-for="section in sections"
            :key="section.title"
            :href="section.url"
            class="ed-spec-card"
            :style="{ '--card-color': section.color }"
          >
            <span class="ed-spec-card__top" :style="{ background: section.color }" />

            <div class="ed-spec-card__meta">
              <span class="ed-spec-card__cat" :style="{ color: section.color }">
                {{ section.category }}
              </span>
            </div>

            <h3 class="ed-spec-card__title">{{ section.title }}</h3>

            <div class="ed-spec-card__flow">
              <span class="ed-spec-card__flow-node">{{ section.flowFrom }}</span>
              <span class="ed-spec-card__flow-arrow">&rarr;</span>
              <span class="ed-spec-card__flow-node">{{ section.flowTo }}</span>
            </div>

            <p class="ed-spec-card__desc" v-html="section.desc" />

            <div class="ed-spec-card__tags">
              <span
                class="ed-spec-card__tag"
                :style="{
                  background: withAlpha(section.color, 0.10),
                  color: section.color,
                }"
              >
                <code>{{ section.distPath }}</code>
              </span>
              <span class="ed-spec-card__audience">
                Audience: {{ section.audience }}
              </span>
            </div>

            <div class="ed-spec-card__foot">
              <span class="ed-spec-card__cta">Browse specs</span>
              <span class="ed-spec-card__arrow" :style="{ color: section.color }">&rarr;</span>
            </div>
          </a>
        </div>
      </div>
    </section>

    <section class="ed-spec-ref">
      <div class="ed-spec-ref__inner">
        <div class="ed-spec-ref__head">
          <div class="ed-spec-ref__eyebrow">
            <span class="ed-spec-ref__eyebrow-dash" />
            Reference
          </div>
          <h2 class="ed-spec-ref__title">How the repository works</h2>
        </div>

        <div class="ed-spec-ref__grid">
          <article class="ed-spec-ref__tile">
            <h3 class="ed-spec-ref__tile-title">Viewing the specifications</h3>
            <p class="ed-spec-ref__tile-body">
              The pages under each section render every spec inline. To view a spec directly
              from the repository,
              <a href="https://redocly.github.io/redoc/" target="_blank" rel="noopener">Redocly</a>
              gives a clean, navigable rendering of any YAML file &mdash; paste its raw GitHub
              URL into the Redocly viewer.
            </p>
          </article>

          <article class="ed-spec-ref__tile">
            <h3 class="ed-spec-ref__tile-title">Versioning &amp; errata</h3>
            <p class="ed-spec-ref__tile-body">
              Specifications follow a <code>vMAJOR.MINOR</code> scheme. The same logical release
              spans all three categories &mdash; <code>dist/api-hub/{{ selectedVersion }}.x/</code>,
              <code>dist/ozone-connect/{{ selectedVersion }}.x/</code>, and <code>dist/standards/{{ selectedVersion }}/</code>.
              Errata releases (for example <code>dist/standards/{{ selectedVersion }}-errata1/</code>) contain
              targeted corrections; <strong>where an errata folder exists, the files inside it
              supersede the corresponding base version</strong>.
            </p>
          </article>

          <article class="ed-spec-ref__tile">
            <h3 class="ed-spec-ref__tile-title">Governance folders</h3>
            <p class="ed-spec-ref__tile-body">
              The repository's <code>supporting/</code> directory holds material alongside the
              specs: <code>breaking-changes/</code> records breaking changes knowingly accepted
              within an errata (enforced by an oasdiff test), and <code>future-updates/</code>
              is a forward-looking design backlog for the next major version.
            </p>
          </article>
        </div>

        <div class="ed-spec-ref__tip">
          <span class="ed-spec-ref__tip-label">Watch for updates</span>
          <span class="ed-spec-ref__tip-body">
            Implementers are encouraged to <strong>watch</strong> the repository on GitHub to
            stay informed of new versions and changes as the specification evolves.
          </span>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.ed-spec {
  background: var(--at-bg-cream);
  color: var(--at-navy-deep);
  font-family: var(--at-sans);
  padding-top: 4.25rem;
}

.ed-spec-hero {
  background: var(--at-bg-cream);
  border-bottom: 1px solid var(--at-grid-line);
}

.ed-spec-hero__inner {
  max-width: var(--at-page-max);
  margin: 0 auto;
  padding: 4.5rem 2rem 3rem;
}

.ed-spec-hero__label {
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

.ed-spec-hero__label-dash {
  width: 24px;
  height: 1px;
  background: currentColor;
}

.ed-spec-hero__title {
  font-family: var(--at-serif);
  font-size: clamp(2.75rem, 6.5vw, 4.5rem);
  font-weight: 600;
  line-height: 0.98;
  letter-spacing: -0.035em;
  margin: 0;
  color: var(--at-navy-deep);
}

.ed-spec-hero__sub {
  font-family: var(--at-sans);
  font-size: 1.15rem;
  line-height: 1.6;
  margin: 1.75rem 0 0;
  max-width: 48rem;
  color: var(--at-mute-2);
}

.ed-spec-hero__sub strong { color: var(--at-navy-deep); font-weight: 600; }

.ed-spec-repo {
  padding: 3rem 0;
  background: var(--at-bg-cream);
}

.ed-spec-repo__inner {
  max-width: var(--at-page-max);
  margin: 0 auto;
  padding: 0 2rem;
}

.ed-spec-repo__card {
  position: relative;
  background: var(--at-inverse-bg);
  color: var(--at-inverse-fg);
  padding: 2.75rem 2.5rem 2.25rem;
  overflow: hidden;
}

.ed-spec-repo__card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--at-teal) 0%, var(--at-blue) 50%, var(--at-gold) 100%);
}

.ed-spec-repo__meta {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--at-teal);
  margin-bottom: 1.5rem;
}

.ed-spec-repo__meta-dot {
  width: 8px;
  height: 8px;
  background: var(--at-teal);
  border-radius: 50%;
  box-shadow: 0 0 0 4px rgba(0, 194, 169, 0.18);
}

.ed-spec-repo__head {
  display: flex;
  align-items: flex-start;
  gap: 1.25rem;
  margin-bottom: 2rem;
}

.ed-spec-repo__logo {
  color: var(--at-inverse-fg);
  flex-shrink: 0;
  margin-top: 0.35rem;
}

.ed-spec-repo__title {
  font-family: var(--at-serif);
  font-size: clamp(1.6rem, 3vw, 2.1rem);
  font-weight: 500;
  letter-spacing: -0.02em;
  line-height: 1.1;
  margin: 0 0 0.65rem;
  color: var(--at-inverse-fg);
}

.ed-spec-repo__sub {
  font-family: var(--at-sans);
  font-size: 1rem;
  line-height: 1.55;
  color: rgba(250, 250, 247, 0.78);
  margin: 0;
  max-width: 46rem;
}

.ed-spec-repo__sub :deep(code),
.ed-spec-repo__sub code,
.ed-spec-repo__path-name,
.ed-spec-repo__branch-desc code {
  font-family: var(--at-mono);
  font-size: 0.82em;
  background: rgba(250, 250, 247, 0.08);
  padding: 0.1em 0.4em;
  color: var(--at-inverse-fg);
  border-radius: 0;
}

.ed-spec-repo__paths {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0;
  margin-bottom: 2rem;
  border: 1px solid rgba(250, 250, 247, 0.12);
}

.ed-spec-repo__path {
  display: grid;
  grid-template-columns: 13rem 1fr;
  align-items: baseline;
  gap: 1.25rem;
  padding: 0.85rem 1.1rem;
  border-bottom: 1px solid rgba(250, 250, 247, 0.08);
}

.ed-spec-repo__path:last-child { border-bottom: none; }

.ed-spec-repo__path-name {
  font-weight: 600;
  color: var(--at-teal);
  background: rgba(0, 194, 169, 0.12);
}

.ed-spec-repo__path-desc {
  font-family: var(--at-sans);
  font-size: 0.92rem;
  color: rgba(250, 250, 247, 0.85);
  line-height: 1.5;
}

.ed-spec-repo__path-desc :deep(strong),
.ed-spec-repo__path-desc strong { color: var(--at-inverse-fg); font-weight: 600; }

.ed-spec-repo__branches {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 2rem;
}

.ed-spec-repo__branch {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding: 1rem 1.1rem;
  background: rgba(250, 250, 247, 0.04);
  border: 1px solid rgba(250, 250, 247, 0.1);
}

.ed-spec-repo__branch-tag {
  display: inline-flex;
  align-self: flex-start;
  padding: 0.3rem 0.6rem;
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-navy-deep);
  background: var(--at-teal);
}

.ed-spec-repo__branch-tag--draft {
  background: rgba(250, 250, 247, 0.14);
  color: var(--at-inverse-fg);
}

.ed-spec-repo__branch-desc {
  font-family: var(--at-sans);
  font-size: 0.88rem;
  line-height: 1.55;
  color: rgba(250, 250, 247, 0.8);
}

.ed-spec-repo__branch-desc strong { color: var(--at-inverse-fg); font-weight: 600; }

.ed-spec-repo__cta {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.9rem 1.35rem;
  background: var(--at-teal);
  color: var(--at-navy-deep);
  text-decoration: none;
  font-family: var(--at-mono);
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 700;
  transition: transform 0.2s, background 0.2s;
}

.ed-spec-repo__cta:hover {
  background: var(--at-inverse-fg);
  transform: translateY(-1px);
}

.ed-spec-repo__cta-arrow {
  font-size: 0.95rem;
  transition: transform 0.2s;
}

.ed-spec-repo__cta:hover .ed-spec-repo__cta-arrow { transform: translate(2px, -2px); }

.ed-spec-sections {
  padding: 4rem 0 4.5rem;
  background: var(--at-surface);
  border-top: 1px solid var(--at-grid-line);
}

.ed-spec-sections__inner {
  max-width: var(--at-page-max);
  margin: 0 auto;
  padding: 0 2rem;
}

.ed-spec-sections__head { max-width: 48rem; margin-bottom: 2.5rem; }

.ed-spec-sections__eyebrow {
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--at-teal);
  margin-bottom: 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 600;
}

.ed-spec-sections__eyebrow-dash {
  width: 24px;
  height: 1px;
  background: currentColor;
}

.ed-spec-sections__title {
  font-family: var(--at-serif);
  font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 500;
  letter-spacing: -0.025em;
  line-height: 1.05;
  margin: 0;
  color: var(--at-navy-deep);
}

.ed-spec-sections__lede {
  font-family: var(--at-sans);
  font-size: 1rem;
  line-height: 1.65;
  color: var(--at-mute-2);
  margin: 1.1rem 0 0;
}

.ed-spec-sections__lede strong { color: var(--at-navy-deep); font-weight: 600; }

.ed-spec-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(22.5rem, 1fr));
  gap: 1.25rem;
}

.ed-spec-card {
  position: relative;
  display: flex;
  flex-direction: column;
  background: var(--at-bg-cream);
  border: 1px solid var(--at-grid-line);
  padding: 2rem 1.75rem 1.5rem;
  text-decoration: none;
  color: inherit;
  transition: border-color 0.2s ease, transform 0.2s ease;
}

.ed-spec-card:hover {
  border-color: var(--card-color, var(--at-navy));
  transform: translateY(-2px);
}

.ed-spec-card__top {
  position: absolute;
  top: 0;
  left: 0;
  width: 48px;
  height: 3px;
}

.ed-spec-card__meta {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  margin-bottom: 0.85rem;
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.ed-spec-card__cat { font-weight: 700; }

.ed-spec-card__title {
  font-family: var(--at-serif);
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: var(--at-navy-deep);
  margin: 0 0 0.85rem;
}

.ed-spec-card__flow {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.65rem;
  margin-bottom: 1rem;
  background: rgba(0, 39, 127, 0.04);
  border: 1px dashed var(--at-grid-line-2);
  font-family: var(--at-mono);
  font-size: 0.68rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--at-navy-deep);
  align-self: flex-start;
}

.ed-spec-card__flow-arrow { color: var(--card-color, var(--at-navy)); }

.ed-spec-card__desc {
  font-family: var(--at-sans);
  font-size: 0.92rem;
  line-height: 1.6;
  color: var(--at-mute-2);
  margin: 0 0 1.1rem;
  flex: 1;
}

.ed-spec-card__tags {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.ed-spec-card__tag {
  padding: 0.28rem 0.55rem;
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.04em;
  font-weight: 600;
}

.ed-spec-card__tag code {
  font-family: inherit;
  background: none;
  color: inherit;
  padding: 0;
}

.ed-spec-card__audience {
  font-family: var(--at-mono);
  font-size: 0.58rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--at-mute);
  font-weight: 500;
}

.ed-spec-card__foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1rem;
  border-top: 1px solid var(--at-grid-line);
}

.ed-spec-card__cta {
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--at-mute);
}

.ed-spec-card__arrow {
  font-family: var(--at-mono);
  font-size: 1rem;
  transition: transform 0.2s;
}

.ed-spec-card:hover .ed-spec-card__arrow { transform: translateX(4px); }
.ed-spec-card:hover .ed-spec-card__cta { color: var(--at-navy-deep); }

.ed-spec-ref {
  padding: 4rem 0 5rem;
  background: var(--at-bg-cream);
  border-top: 1px solid var(--at-grid-line);
}

.ed-spec-ref__inner {
  max-width: var(--at-page-max);
  margin: 0 auto;
  padding: 0 2rem;
}

.ed-spec-ref__head { max-width: 44rem; margin-bottom: 2.5rem; }

.ed-spec-ref__eyebrow {
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--at-blue-deep);
  margin-bottom: 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 600;
}

.ed-spec-ref__eyebrow-dash {
  width: 24px;
  height: 1px;
  background: currentColor;
}

.ed-spec-ref__title {
  font-family: var(--at-serif);
  font-size: clamp(1.75rem, 3.5vw, 2.3rem);
  font-weight: 500;
  letter-spacing: -0.025em;
  line-height: 1.05;
  margin: 0;
  color: var(--at-navy-deep);
}

.ed-spec-ref__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  border: 1px solid var(--at-grid-line);
  background: var(--at-surface);
}

.ed-spec-ref__tile {
  padding: 1.75rem 1.5rem;
  border-right: 1px solid var(--at-grid-line);
}

.ed-spec-ref__tile:last-child { border-right: none; }

.ed-spec-ref__tile-title {
  font-family: var(--at-serif);
  font-size: 1.15rem;
  font-weight: 500;
  letter-spacing: -0.015em;
  margin: 0 0 0.65rem;
  color: var(--at-navy-deep);
}

.ed-spec-ref__tile-body {
  font-family: var(--at-sans);
  font-size: 0.88rem;
  line-height: 1.6;
  color: var(--at-mute-2);
  margin: 0;
}

.ed-spec-ref__tile-body :deep(code),
.ed-spec-ref__tile-body code {
  font-family: var(--at-mono);
  font-size: 0.82em;
  background: rgba(0, 39, 127, 0.06);
  padding: 0.08em 0.35em;
  color: var(--at-navy-deep);
}

.ed-spec-ref__tile-body a {
  color: var(--at-teal-deep);
  text-decoration: none;
  border-bottom: 1px solid currentColor;
}

.ed-spec-ref__tile-body a:hover { color: var(--at-navy-deep); }

.ed-spec-ref__tile-body strong { color: var(--at-navy-deep); font-weight: 600; }

.ed-spec-ref__tip {
  margin-top: 1.5rem;
  display: flex;
  align-items: baseline;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background: var(--at-surface);
  border-left: 3px solid var(--at-gold);
}

.ed-spec-ref__tip-label {
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-gold);
  flex-shrink: 0;
}

.ed-spec-ref__tip-body {
  font-family: var(--at-sans);
  font-size: 0.9rem;
  line-height: 1.55;
  color: var(--at-mute-2);
}

.ed-spec-ref__tip-body strong { color: var(--at-navy-deep); font-weight: 600; }

@media (max-width: 900px) {
  .ed-spec-repo__branches { grid-template-columns: 1fr; }
  .ed-spec-ref__grid { grid-template-columns: 1fr; }
  .ed-spec-ref__tile { border-right: none; border-bottom: 1px solid var(--at-grid-line); }
  .ed-spec-ref__tile:last-child { border-bottom: none; }
}

@media (max-width: 640px) {
  .ed-spec-hero__inner { padding: 3rem 1.25rem 2rem; }
  .ed-spec-repo { padding: 2rem 0; }
  .ed-spec-repo__inner { padding: 0 1.25rem; }
  .ed-spec-repo__card { padding: 2rem 1.5rem 1.75rem; }
  .ed-spec-repo__path { grid-template-columns: 1fr; gap: 0.35rem; }
  .ed-spec-sections { padding: 3rem 0 3.5rem; }
  .ed-spec-sections__inner { padding: 0 1.25rem; }
  .ed-spec-grid { grid-template-columns: 1fr; }
  .ed-spec-ref { padding: 3rem 0 4rem; }
  .ed-spec-ref__inner { padding: 0 1.25rem; }
  .ed-spec-ref__tip { flex-direction: column; gap: 0.5rem; }
}
</style>
