# UAE Open Finance Community Standards (experimental)

Community-driven documentation, reference material, and tooling experiments for the UAE Open Finance ecosystem (**AlTareq**). The site collects the TPP Standards, the LFI Integration Guide, the OpenAPI specifications, release notes, and ecosystem metrics in one place so developers, implementers, and operators can find what they need without jumping between repos.

> This repository is **not** the official source of truth. It is used to prototype content, trial modern documentation tooling, and gather feedback before material moves upstream.

---

## What's in this repo

The site is a Vite + Vue 3 + vue-router project, prerendered to static HTML by [vite-ssg](https://github.com/antfu/vite-ssg). Pages live under [`src/pages/`](src/pages/) (one route per file via [vite-plugin-pages](https://github.com/hannoeru/vite-plugin-pages)); shared components under [`src/components/`](src/components/); registries (versions, errata, releases, sidebars, endpoint metadata) under [`src/data/`](src/data/).

The site is organised around five technical content areas that matter to the ecosystem. Programme-level content (policies, processes, pricing, news, knowledge base, document repository, support desk) also lives under [`src/pages/`](src/pages/) but is out of scope for this README.

### 1. TPP Standards — [`src/pages/tech/tpp-standards/`](src/pages/tech/tpp-standards/)

The developer-facing specification for Third-Party Providers consuming UAE Open Finance APIs via the API Hub.

Version-agnostic sections (apply across all versions):

- **Trust framework** — directory of participants, certificates, and metadata
- **Security** — FAPI-aligned authentication, mTLS, DPoP, PAR, tokens, and request headers
- **Registration**, **Sandbox**, and **Production** — how to get from zero to live

Per-version sections (currently **v2.1**, under [`src/pages/tech/tpp-standards/v2.1/`](src/pages/tech/tpp-standards/v2.1/)):

- **Getting started** — onboarding and Postman collection
- **Consent** — creating, authorising, exercising, and revoking consents; the consent lifecycle; consent management interface requirements
- **Banking APIs** — data sharing (account information), confirmation of payee, service initiation (payments), products & leads, and ATMs
- **Webhooks** — event delivery and subscription

### 2. LFI Integration Guide — [`src/pages/tech/lfi-api-hub/`](src/pages/tech/lfi-api-hub/)

The implementation guide for Licensed Financial Institutions integrating their tenant of the API Hub.

Version-agnostic sections:

- **Getting started** — onboarding (organisation/admin sign-up, C3 application, certificates), the admin portal, connectivity, the consent manager, and the Headless Heimdall reference UI
- **Trust framework** — directory and metadata responsibilities
- **Production** — testing, certification, and live-proving

Per-version sections (currently **v2.1**, under [`src/pages/tech/lfi-api-hub/v2.1/`](src/pages/tech/lfi-api-hub/v2.1/)):

- **API Hub** — APIs the Hub exposes **to** the LFI (consent manager, Headless Heimdall)
- **Ozone Connect** — APIs the LFI **must implement** for the Hub to call: banking (data sharing, confirmation of payee, service initiation, products & leads, ATMs), consent events, and health check
- **Consent journey** — how the PSU is authenticated and authorises consent at the LFI
- **Consent management interface** — the UI LFIs must expose to customers to view and revoke consents

### 3. API Specifications — [`src/pages/tech/api-specs/`](src/pages/tech/api-specs/)

The canonical OpenAPI specifications for the ecosystem, grouped by audience under each version (currently **v2.1**, [`src/pages/tech/api-specs/v2.1/`](src/pages/tech/api-specs/v2.1/)):

- **TPP** — APIs the API Hub exposes to TPPs (data sharing, service initiation, confirmation of payee, products & leads, ATMs, consent, token, registration, trust framework, webhooks)
- **API Hub** — APIs the API Hub exposes to LFIs (consent manager, Headless Heimdall)
- **Ozone Connect** — APIs that LFIs implement for the API Hub to consume (banking endpoints, consent events, health check)

Specs are **not** stored in this repo. They are fetched at build time by [`scripts/fetch-openapi-specs.mjs`](scripts/fetch-openapi-specs.mjs) from the canonical source — [Nebras-Open-Finance/api-specs](https://github.com/Nebras-Open-Finance/api-specs) — into [`public/openapi/`](public/openapi/) and gitignored. Versions available to the site are declared in [`src/data/versions.ts`](src/data/versions.ts); adding a new version there causes the fetch script to pick it up automatically, including the highest matching errata release.

Errata releases (e.g. `v2.1-errata1`) contain targeted corrections to a published version. Where an errata folder exists, the files inside it supersede the corresponding base version file-by-file.

### 4. Release Notes & Errata — [`src/pages/tech/release-notes-and-erratas/`](src/pages/tech/release-notes-and-erratas/)

Per-version release notes and errata for the standards. Errata are the mechanism by which already-published versions are corrected without bumping the version number.

### 5. Metrics & Monitoring — [`src/pages/metrics.vue`](src/pages/metrics.vue)

A live dashboard view of ecosystem-wide metrics (API Hub availability, request volumes, consent activity, and participant health) rendered via the `OpenFinanceDashboard` component. This is the single operational view of the ecosystem intended for LFIs, TPPs, and Nebras.

---

## Who should read what

| If you are… | Start here |
|---|---|
| A **TPP developer** building an integration | [TPP Standards → Getting started](src/pages/tech/tpp-standards/v2.1/getting-started/) |
| An **LFI implementer** integrating the API Hub | [LFI Integration Guide → Getting started](src/pages/tech/lfi-api-hub/getting-started/) |
| A **vendor** or **system integrator** writing client or server code against the APIs | [API Specifications](src/pages/tech/api-specs/v2.1/) |
| An **ops** or **risk** stakeholder tracking ecosystem health | [Metrics & Monitoring](src/pages/metrics.vue) |
| A **reviewer** looking for the architectural ground rules | [Architecture overview](src/pages/tech/index.vue) and [CLAUDE.md](CLAUDE.md) |

---

## Local development

Prerequisites: Node.js 18+ and npm.

```bash
npm install              # install all dependencies
npm run dev              # fetch data + start vite dev server
npm run build            # fetch data + vite-ssg build → dist/
npm run preview          # preview the built site
npm run typecheck        # vue-tsc --noEmit
npm test                 # run the supporting test suite
```

`npm run dev` and `npm run build` automatically run the supporting fetch scripts before invoking Vite:

- [`fetch-organisations.mjs`](scripts/fetch-organisations.mjs) — participant directory used by the home page and trust framework views (writes to `public/api/trust-framework.json`)
- [`fetch-github-stats.mjs`](scripts/fetch-github-stats.mjs) — GitHub activity used by the metrics dashboard (writes to `public/api/github-stats.json`)
- [`fetch-openapi-specs.mjs`](scripts/fetch-openapi-specs.mjs) — OpenAPI specs with errata resolution (writes to `public/openapi/{version}/{category}/`)
- [`generate-openapi-xlsx.mjs`](scripts/generate-openapi-xlsx.mjs) — spreadsheet renderings of the specs for download (next to each `.yaml`)

You can run any of these on their own via `npm run fetch:specs`, `npm run fetch:orgs`, or `npm run fetch:github` if you only want to refresh one data source.

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for how to report issues, propose changes, and open pull requests. OpenAPI spec changes belong in [Nebras-Open-Finance/api-specs](https://github.com/Nebras-Open-Finance/api-specs), not here.

---

## Disclaimer

Content, wording, and components in this repository are experimental and may change frequently. References to specific banks, TPPs, or products are illustrative; always confirm details against the official UAE Open Finance documentation and the published OpenAPI specifications before building against them in production.
