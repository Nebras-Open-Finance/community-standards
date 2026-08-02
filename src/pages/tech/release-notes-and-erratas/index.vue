<route lang="yaml">
meta:
  title: Release Notes & Erratas
  isIndex: true
</route>

<script setup lang="ts">
import { CURRENT_VERSION } from '@/data/versions'
import { ERRATA_SECTIONS } from '@/data/erratas-registry'
import { VERSION_CHANGES, changelogVersions } from '@/data/version-changes-registry'
import {
  latestApiHubYear,
  latestTrustFrameworkYear,
} from '@/data/release-notes-years'

interface RegisterSub {
  title: string
  hint: string
  url: string
}

interface Register {
  tone: 'teal' | 'gold'
  category: string
  title: string
  url: string | null
  desc: string
  scope: string
  subsLabel?: string
  subs: RegisterSub[]
  items?: string[]
  itemsLabel?: string
}

interface Policy {
  title: string
  url: string
  desc: string
}

const errataIds: string[] = [
  ...new Set(
    ERRATA_SECTIONS
      .filter((s) => s.version === CURRENT_VERSION)
      .map((s) => s.errataId),
  ),
].sort()

// Newest transition wins the card link; the chips list every pair on record.
const latestChangelogVersion: string | undefined =
  changelogVersions[changelogVersions.length - 1]

const changelogPairs: string[] = [
  ...new Set(VERSION_CHANGES.map((c) => `${c.fromVersion} → ${c.toVersion}`)),
].sort()

const registers: Register[] = [
  {
    tone: 'teal',
    category: 'Operational systems',
    title: 'Release Notes',
    url: null,
    desc: 'Changes deployed to the <strong>operational systems</strong> participants integrate with &mdash; the API Hub platform, the Trust Framework, and any supporting infrastructure. Each entry describes what was deployed, when it became effective, and the impact on TPPs and LFIs.',
    scope: 'Deployments, platform behaviour changes, Trust Framework directory releases.',
    subsLabel: 'Organised by component &mdash; then by calendar year',
    subs: [
      {
        title: 'API Hub',
        hint: 'OIDC authorization server, Consent Manager, gateway',
        url: `/tech/release-notes-and-erratas/release-notes/api-hub/${latestApiHubYear}`,
      },
      {
        title: 'Trust Framework',
        hint: 'Directory, certificate authority, roles & scopes (Raidiam)',
        url: `/tech/release-notes-and-erratas/release-notes/trust-framework/${latestTrustFrameworkYear}`,
      },
    ],
  },
  {
    tone: 'gold',
    category: 'Published documentation',
    title: 'Erratas',
    url: `/tech/release-notes-and-erratas/erratas/${CURRENT_VERSION}/`,
    desc: 'Corrections to <strong>published documentation</strong> &mdash; the TPP Standards, LFI Integration Guide, and OpenAPI specifications. Each entry records what was corrected, why the change was required, and the effective date.',
    scope: 'Documentation corrections against a published standard version.',
    subs: [],
    items: errataIds,
    itemsLabel: `Erratas in ${CURRENT_VERSION}`,
  },
  {
    tone: 'teal',
    category: 'Between versions',
    title: 'Version Changelog',
    url: latestChangelogVersion
      ? `/tech/release-notes-and-erratas/changelog/${latestChangelogVersion}/`
      : null,
    desc: 'Every change made <strong>between one Standards version and the next</strong> &mdash; consent identifiers, API paths, new capabilities, and areas explicitly left unchanged. Each entry records what changed, why, and who it affects.',
    scope: 'Differences between published Standards versions.',
    subs: [],
    items: changelogPairs,
    itemsLabel: 'Version transitions',
  },
]

const policies: Policy[] = [
  {
    title: 'Changes to Published Documentation',
    url: '/policy/changes-to-published-content',
    desc: 'How published content may change after release &mdash; what requires an Errata, what does not, and how corrections are communicated.',
  },
  {
    title: 'Version Management',
    url: '/policy/version-management',
    desc: 'How versions are numbered, when errata releases are cut, and how the relationship between Standards, API Hub, and Ozone Connect versions is maintained.',
  },
]
</script>

<template>
  <div class="ed-rn">

    <!-- ═══════════════════════════════════════════════════════════════════
         HERO
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ed-rn-hero">
      <div class="ed-rn-hero__inner">
        <div class="ed-rn-hero__label">
          <span class="ed-rn-hero__label-dash" />
          Post-publication register
        </div>
        <h1 class="ed-rn-hero__title">Release Notes &amp; Erratas</h1>
        <p class="ed-rn-hero__sub">
          The authoritative record of changes made after publication. The register is
          split in two &mdash; one side tracks changes to the <strong>operational systems</strong>
          participants integrate with, the other tracks corrections to
          <strong>published documentation</strong>.
        </p>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         TWO FEATURED REGISTERS
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ed-rn-registers">
      <div class="ed-rn-registers__inner">
        <div class="ed-rn-registers__head">
          <div class="ed-rn-registers__eyebrow">
            <span class="ed-rn-registers__eyebrow-dash" />
            Two registers
          </div>
          <h2 class="ed-rn-registers__title">What has changed since publication</h2>
          <p class="ed-rn-registers__lede">
            Release Notes describe <strong>what was deployed</strong> to the platform.
            Erratas describe <strong>what was corrected</strong> in the published
            documentation. Use them together to understand where the ecosystem stands.
          </p>
        </div>

        <div class="ed-rn-registers__grid">
          <component
            :is="reg.url ? 'a' : 'div'"
            v-for="reg in registers"
            :key="reg.title"
            :href="reg.url || undefined"
            class="ed-rn-reg"
            :class="`ed-rn-reg--${reg.tone}`"
          >
            <span class="ed-rn-reg__top" />

            <div class="ed-rn-reg__head">
              <div class="ed-rn-reg__meta">
                <span class="ed-rn-reg__meta-dot" />
                {{ reg.category }}
              </div>

              <h3 class="ed-rn-reg__title">{{ reg.title }}</h3>

              <p class="ed-rn-reg__desc" v-html="reg.desc" />

              <div class="ed-rn-reg__scope">
                <span class="ed-rn-reg__scope-label">Covers</span>
                <span class="ed-rn-reg__scope-body" v-html="reg.scope" />
              </div>

              <div v-if="reg.items && reg.items.length" class="ed-rn-reg__items">
                <span class="ed-rn-reg__items-label">{{ reg.itemsLabel }}</span>
                <ul class="ed-rn-reg__items-list">
                  <li v-for="id in reg.items" :key="id">{{ id }}</li>
                </ul>
              </div>
            </div>

            <ul v-if="reg.subs.length" class="ed-rn-reg__subs">
              <li class="ed-rn-reg__subs-label">{{ reg.subsLabel }}</li>
              <li v-for="sub in reg.subs" :key="sub.title">
                <a :href="sub.url" class="ed-rn-reg__sub">
                  <span class="ed-rn-reg__sub-marker" />
                  <span class="ed-rn-reg__sub-main">
                    <span class="ed-rn-reg__sub-title">{{ sub.title }}</span>
                    <span class="ed-rn-reg__sub-hint">{{ sub.hint }}</span>
                  </span>
                  <span class="ed-rn-reg__sub-arrow" aria-hidden="true">&rarr;</span>
                </a>
              </li>
            </ul>

          </component>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         POLICY REFERENCE
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="ed-rn-ref">
      <div class="ed-rn-ref__inner">
        <div class="ed-rn-ref__head">
          <div class="ed-rn-ref__eyebrow">
            <span class="ed-rn-ref__eyebrow-dash" />
            Policy controls
          </div>
          <h2 class="ed-rn-ref__title">How these registers are governed</h2>
          <p class="ed-rn-ref__lede">
            Both registers are bound by the policies that control how published content
            evolves and how versions are promoted.
          </p>
        </div>

        <div class="ed-rn-ref__grid">
          <a
            v-for="policy in policies"
            :key="policy.url"
            :href="policy.url"
            class="ed-rn-ref__tile"
          >
            <div class="ed-rn-ref__tile-meta">
              <span class="ed-rn-ref__tile-meta-dash" />
              Policy
            </div>
            <h3 class="ed-rn-ref__tile-title">{{ policy.title }}</h3>
            <p class="ed-rn-ref__tile-body" v-html="policy.desc" />
            <div class="ed-rn-ref__tile-foot">
              <span class="ed-rn-ref__tile-cta">Read policy</span>
              <span class="ed-rn-ref__tile-arrow">&rarr;</span>
            </div>
          </a>
        </div>

        <div class="ed-rn-ref__tip">
          <span class="ed-rn-ref__tip-label">Rule of thumb</span>
          <span class="ed-rn-ref__tip-body">
            Once a version is published, its existing content <strong>MUST NOT</strong> be
            changed without an associated Errata record. Platform deployments that affect
            behaviour participants depend on are captured in Release Notes.
          </span>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.ed-rn {
  background: var(--at-bg-cream);
  color: var(--at-navy-deep);
  font-family: var(--at-sans);
  padding-top: 4.25rem;
}

/* ─── Hero ──────────────────────────────────────────────────────────────── */
.ed-rn-hero {
  background: var(--at-bg-cream);
  border-bottom: 1px solid var(--at-grid-line);
}

.ed-rn-hero__inner {
  max-width: var(--at-page-max);
  margin: 0 auto;
  padding: 4.5rem 2rem 3rem;
}

.ed-rn-hero__label {
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

.ed-rn-hero__label-dash {
  width: 24px;
  height: 1px;
  background: currentColor;
}

.ed-rn-hero__title {
  font-family: var(--at-serif);
  font-size: clamp(2.75rem, 6.5vw, 4.5rem);
  font-weight: 600;
  line-height: 0.98;
  letter-spacing: -0.035em;
  margin: 0;
  color: var(--at-navy-deep);
}

.ed-rn-hero__sub {
  font-family: var(--at-sans);
  font-size: 1.15rem;
  line-height: 1.6;
  margin: 1.75rem 0 0;
  max-width: 48rem;
  color: var(--at-mute-2);
}

.ed-rn-hero__sub strong { color: var(--at-navy-deep); font-weight: 600; }

/* ─── Registers ─────────────────────────────────────────────────────────── */
.ed-rn-registers {
  padding: 4rem 0 4.5rem;
  background: var(--at-surface);
  border-top: 1px solid var(--at-grid-line);
}

.ed-rn-registers__inner {
  max-width: var(--at-page-max);
  margin: 0 auto;
  padding: 0 2rem;
}

.ed-rn-registers__head { max-width: 48rem; margin-bottom: 2.5rem; }

.ed-rn-registers__eyebrow {
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

.ed-rn-registers__eyebrow-dash {
  width: 24px;
  height: 1px;
  background: currentColor;
}

.ed-rn-registers__title {
  font-family: var(--at-serif);
  font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 500;
  letter-spacing: -0.025em;
  line-height: 1.05;
  margin: 0;
  color: var(--at-navy-deep);
}

.ed-rn-registers__lede {
  font-family: var(--at-sans);
  font-size: 1rem;
  line-height: 1.65;
  color: var(--at-mute-2);
  margin: 1.1rem 0 0;
  max-width: 44rem;
}

.ed-rn-registers__lede strong { color: var(--at-navy-deep); font-weight: 600; }

.ed-rn-registers__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
}

/* ─── Register card ─────────────────────────────────────────────────────── */
.ed-rn-reg {
  position: relative;
  display: flex;
  flex-direction: column;
  background: var(--at-bg-cream);
  border: 1px solid var(--at-grid-line);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.ed-rn-reg:hover { border-color: var(--reg-color, var(--at-navy)); }

a.ed-rn-reg { text-decoration: none; color: inherit; }

a.ed-rn-reg:hover .ed-rn-reg__title { color: var(--reg-color); }

a.ed-rn-reg:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--reg-color) 45%, transparent);
}

.ed-rn-reg--teal { --reg-color: var(--at-teal); }
.ed-rn-reg--gold { --reg-color: var(--at-gold); }

.ed-rn-reg__top {
  position: absolute;
  top: 0;
  left: 0;
  width: 64px;
  height: 3px;
  background: var(--reg-color);
  z-index: 1;
}

/* Head link (meta + title + desc + scope) */
.ed-rn-reg__head {
  display: block;
  padding: 2.25rem 2rem 1.5rem;
  text-decoration: none;
  color: inherit;
  border-bottom: 1px solid var(--at-grid-line);
  transition: background 0.18s ease;
}

.ed-rn-reg__head:not(.ed-rn-reg__head--static):hover {
  background: color-mix(in srgb, var(--reg-color) 5%, var(--at-bg-cream));
}

.ed-rn-reg__head:not(.ed-rn-reg__head--static):focus-visible {
  outline: none;
  background: color-mix(in srgb, var(--reg-color) 8%, var(--at-bg-cream));
  box-shadow: inset 0 0 0 2px color-mix(in srgb, var(--reg-color) 50%, transparent);
}

.ed-rn-reg__head--static { cursor: default; }

.ed-rn-reg__meta {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--reg-color);
  margin-bottom: 1rem;
}

.ed-rn-reg__meta-dot {
  width: 8px;
  height: 8px;
  background: var(--reg-color);
  border-radius: 50%;
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--reg-color) 18%, transparent);
}

.ed-rn-reg__title {
  font-family: var(--at-serif);
  font-size: clamp(1.6rem, 2.8vw, 2rem);
  font-weight: 500;
  letter-spacing: -0.02em;
  line-height: 1.1;
  color: var(--at-navy-deep);
  margin: 0 0 0.85rem;
  transition: color 0.15s ease;
}

.ed-rn-reg__head:not(.ed-rn-reg__head--static):hover .ed-rn-reg__title { color: var(--reg-color); }

.ed-rn-reg__desc {
  font-family: var(--at-sans);
  font-size: 0.98rem;
  line-height: 1.6;
  color: var(--at-mute-2);
  margin: 0 0 1.25rem;
}

.ed-rn-reg__desc :deep(strong),
.ed-rn-reg__desc strong { color: var(--at-navy-deep); font-weight: 600; }

.ed-rn-reg__scope {
  display: flex;
  align-items: baseline;
  gap: 0.85rem;
  padding: 0.7rem 0.9rem;
  background: color-mix(in srgb, var(--reg-color) 6%, transparent);
  border-left: 2px solid var(--reg-color);
}

.ed-rn-reg__scope-label {
  font-family: var(--at-mono);
  font-size: 0.6rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--reg-color);
  flex-shrink: 0;
}

.ed-rn-reg__scope-body {
  font-family: var(--at-sans);
  font-size: 0.85rem;
  line-height: 1.5;
  color: var(--at-mute-2);
}

.ed-rn-reg__items { margin-top: 0.9rem; }

.ed-rn-reg__items-label {
  display: block;
  font-family: var(--at-mono);
  font-size: 0.6rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--at-mute);
  margin-bottom: 0.4rem;
}

.ed-rn-reg__items-list {
  list-style: none;
  margin: 0;
  padding: 0;
  font-family: var(--at-mono);
  font-size: 0.85rem;
  color: var(--at-navy-deep);
}

.ed-rn-reg__items-list li { padding: 0.15rem 0; }

/* Sub-items (each its own link) */
.ed-rn-reg__subs {
  list-style: none;
  margin: 0;
  padding: 0.4rem 2rem 0.4rem;
  display: flex;
  flex-direction: column;
}

.ed-rn-reg__subs-label {
  font-family: var(--at-mono);
  font-size: 0.6rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--at-mute);
  padding: 0.85rem 0 0.55rem;
}

.ed-rn-reg__sub {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.75rem 0.65rem;
  margin: 0 -0.65rem;
  border-top: 1px solid var(--at-grid-line);
  text-decoration: none;
  color: inherit;
  transition: background 0.15s ease;
}

.ed-rn-reg__sub:hover {
  background: color-mix(in srgb, var(--reg-color) 7%, transparent);
}

.ed-rn-reg__sub:focus-visible {
  outline: none;
  background: color-mix(in srgb, var(--reg-color) 10%, transparent);
  box-shadow: inset 0 0 0 2px color-mix(in srgb, var(--reg-color) 45%, transparent);
}

.ed-rn-reg__sub-marker {
  width: 6px;
  height: 6px;
  background: var(--reg-color);
  border-radius: 50%;
  flex-shrink: 0;
  opacity: 0.5;
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.ed-rn-reg__sub:hover .ed-rn-reg__sub-marker { opacity: 1; transform: scale(1.2); }

.ed-rn-reg__sub-main {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  flex: 1;
  min-width: 0;
}

.ed-rn-reg__sub-title {
  font-family: var(--at-sans);
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--at-navy-deep);
}

.ed-rn-reg__sub-hint {
  font-family: var(--at-sans);
  font-size: 0.82rem;
  color: var(--at-mute);
  line-height: 1.4;
}

.ed-rn-reg__sub-arrow {
  font-family: var(--at-mono);
  font-size: 1rem;
  color: var(--reg-color);
  flex-shrink: 0;
  opacity: 0;
  transform: translateX(-4px);
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.ed-rn-reg__sub:hover .ed-rn-reg__sub-arrow {
  opacity: 1;
  transform: translateX(0);
}

/* ─── Reference ─────────────────────────────────────────────────────────── */
.ed-rn-ref {
  padding: 4rem 0 5rem;
  background: var(--at-bg-cream);
  border-top: 1px solid var(--at-grid-line);
}

.ed-rn-ref__inner {
  max-width: var(--at-page-max);
  margin: 0 auto;
  padding: 0 2rem;
}

.ed-rn-ref__head { max-width: 44rem; margin-bottom: 2.5rem; }

.ed-rn-ref__eyebrow {
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

.ed-rn-ref__eyebrow-dash {
  width: 24px;
  height: 1px;
  background: currentColor;
}

.ed-rn-ref__title {
  font-family: var(--at-serif);
  font-size: clamp(1.75rem, 3.5vw, 2.3rem);
  font-weight: 500;
  letter-spacing: -0.025em;
  line-height: 1.05;
  margin: 0;
  color: var(--at-navy-deep);
}

.ed-rn-ref__lede {
  font-family: var(--at-sans);
  font-size: 1rem;
  line-height: 1.65;
  color: var(--at-mute-2);
  margin: 1.1rem 0 0;
  max-width: 40rem;
}

.ed-rn-ref__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0;
  border: 1px solid var(--at-grid-line);
  background: var(--at-surface);
}

.ed-rn-ref__tile {
  display: flex;
  flex-direction: column;
  padding: 1.85rem 1.6rem;
  border-right: 1px solid var(--at-grid-line);
  text-decoration: none;
  color: inherit;
  transition: background 0.2s ease;
}

.ed-rn-ref__tile:last-child { border-right: none; }

.ed-rn-ref__tile:hover {
  background: var(--at-bg-cream);
}

.ed-rn-ref__tile-meta {
  font-family: var(--at-mono);
  font-size: 0.6rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--at-blue-deep);
  margin-bottom: 0.85rem;
  display: flex;
  align-items: center;
  gap: 0.65rem;
  font-weight: 600;
}

.ed-rn-ref__tile-meta-dash {
  width: 18px;
  height: 1px;
  background: currentColor;
}

.ed-rn-ref__tile-title {
  font-family: var(--at-serif);
  font-size: 1.2rem;
  font-weight: 500;
  letter-spacing: -0.015em;
  margin: 0 0 0.65rem;
  color: var(--at-navy-deep);
}

.ed-rn-ref__tile-body {
  font-family: var(--at-sans);
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--at-mute-2);
  margin: 0 0 1.2rem;
  flex: 1;
}

.ed-rn-ref__tile-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 0.9rem;
  border-top: 1px solid var(--at-grid-line);
}

.ed-rn-ref__tile-cta {
  font-family: var(--at-mono);
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--at-mute);
}

.ed-rn-ref__tile-arrow {
  font-family: var(--at-mono);
  font-size: 1rem;
  color: var(--at-blue-deep);
  transition: transform 0.2s;
}

.ed-rn-ref__tile:hover .ed-rn-ref__tile-arrow { transform: translateX(4px); }
.ed-rn-ref__tile:hover .ed-rn-ref__tile-cta { color: var(--at-navy-deep); }

.ed-rn-ref__tip {
  margin-top: 1.5rem;
  display: flex;
  align-items: baseline;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background: var(--at-surface);
  border-left: 3px solid var(--at-gold);
}

.ed-rn-ref__tip-label {
  font-family: var(--at-mono);
  font-size: 0.66rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 700;
  color: var(--at-gold);
  flex-shrink: 0;
}

.ed-rn-ref__tip-body {
  font-family: var(--at-sans);
  font-size: 0.9rem;
  line-height: 1.55;
  color: var(--at-mute-2);
}

.ed-rn-ref__tip-body strong { color: var(--at-navy-deep); font-weight: 600; }

/* ─── Responsive ────────────────────────────────────────────────────────── */
@media (max-width: 900px) {
  .ed-rn-registers__grid { grid-template-columns: 1fr; }
  .ed-rn-ref__grid { grid-template-columns: 1fr; }
  .ed-rn-ref__tile { border-right: none; border-bottom: 1px solid var(--at-grid-line); }
  .ed-rn-ref__tile:last-child { border-bottom: none; }
}

@media (max-width: 640px) {
  .ed-rn-hero__inner { padding: 3rem 1.25rem 2rem; }
  .ed-rn-registers { padding: 3rem 0 3.5rem; }
  .ed-rn-registers__inner { padding: 0 1.25rem; }
  .ed-rn-reg__head { padding: 2rem 1.5rem 1.4rem; }
  .ed-rn-reg__subs { padding: 0.4rem 1.5rem; }
  .ed-rn-ref { padding: 3rem 0 4rem; }
  .ed-rn-ref__inner { padding: 0 1.25rem; }
  .ed-rn-ref__tip { flex-direction: column; gap: 0.5rem; }
}
</style>
