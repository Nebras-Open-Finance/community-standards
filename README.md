# UAE Open Finance Community Standards (experimental)

Community-driven documentation, reference material, and tooling experiments for the UAE Open Finance ecosystem (**AlTareq**). The site collects the TPP Standards, the LFI Integration Guide, the OpenAPI specifications, and ecosystem metrics in one place so developers, implementers, and operators can find what they need without jumping between repos.

> This repository is **not** the official source of truth. It is used to prototype content, trial modern documentation tooling, and gather feedback before material moves upstream.

---

## What's in this repo

The site is organised around four content areas that matter to the ecosystem. Policies, processes, and the document repository are also present but are out of scope for this README.

### 1. TPP Standards — `docs/tech/tpp-standards/`

The developer-facing specification for Third-Party Providers consuming UAE Open Finance APIs via the API Hub.

Covers, per version (currently **v2.1**):

- **Getting started** — onboarding, client registration, and environment access
- **Security** — FAPI-aligned authentication, mTLS, DPoP, PAR, and token handling
- **Consent** — creating, authorising, exercising, and revoking consents; the consent lifecycle; consent management interface requirements
- **Banking APIs** — account information, confirmation of payee, service initiation (payments), products & leads, and ATM locator
- **Webhooks** — event delivery and subscription
- **Registration, sandbox, and production** — how to get from zero to live

### 2. LFI Integration Guide — `docs/tech/lfi-api-hub/`

The implementation guide for Licensed Financial Institutions integrating their tenant of the API Hub.

Covers, per version (currently **v2.1**):

- **Getting started** — onboarding into the API Hub, trust framework registration, and environment setup
- **API Hub integration** — the APIs the Hub exposes **to** the LFI (consent events, token introspection, and supporting services)
- **Ozone Connect** — the APIs the LFI **must implement** for the Hub to call (banking data sharing, service initiation, CoP, products & leads, ATMs, and PII handling)
- **Consent journey** — how the PSU is authenticated and authorises consent at the LFI, including the consent management interface LFIs must expose to customers
- **CAAP** — Customer Authentication and Authorisation Protocol
- **Operational requirements** — monitoring, incident management, SLAs
- **Production readiness** — certification and go-live

### 3. API Specifications — `docs/tech/api-specs/`

The canonical OpenAPI specifications for the ecosystem, grouped by audience:

- **Standards** — APIs the API Hub exposes to TPPs
- **API Hub** — APIs the API Hub exposes to LFIs
- **Ozone Connect** — APIs that LFIs implement for the API Hub to consume

Specs are **not** stored in this repo. They are fetched at build time by `scripts/fetch-openapi-specs.mjs` from the canonical source — [Nebras-Open-Finance/api-specs](https://github.com/Nebras-Open-Finance/api-specs) — and gitignored. Versions available to the site are declared in [`docs/.vitepress/version.ts`](docs/.vitepress/version.ts); adding a new version there causes the fetch script to pick it up automatically, including the highest matching errata release.

Errata releases (e.g. `v2.1-errata1`) contain targeted corrections to a published version. Where an errata folder exists, the files inside it supersede the corresponding base version file-by-file.

### 4. Metrics & Monitoring — `docs/metrics/`

A live dashboard view of ecosystem-wide metrics (API Hub availability, request volumes, consent activity, and participant health) rendered via the `OpenFinanceDashboard` component. This is the single operational view of the ecosystem intended for LFIs, TPPs, and Nebras.

---

## Who should read what

| If you are… | Start here |
|---|---|
| A **TPP developer** building an integration | [TPP Standards → Getting started](docs/tech/tpp-standards/v2.1/getting-started/) |
| An **LFI implementer** integrating the API Hub | [LFI Integration Guide → Getting started](docs/tech/lfi-api-hub/getting-started/) |
| A **vendor** or **system integrator** writing client or server code against the APIs | [API Specifications](docs/tech/api-specs/v2.1/) |
| An **ops** or **risk** stakeholder tracking ecosystem health | [Metrics & Monitoring](docs/metrics/) |
| A **reviewer** looking for the architectural ground rules | [Architecture overview](docs/tech/index.md) and [CLAUDE.md](CLAUDE.md) |

---

## Local development

Prerequisites: Node.js 18+ and npm.

```bash
npm install           # install dependencies
npm run dev:docs      # fetch specs + run VitePress with hot reload
npm run docs:build    # force-refresh specs + build the static site
npm run docs:serve    # preview the built site
```

`dev:docs` and `docs:build` both run the OpenAPI fetch script automatically — you do not need to run `npm run fetch:specs` separately unless you want to refresh specs without starting the dev server.

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for how to report issues, propose changes, and open pull requests. OpenAPI spec changes belong in [Nebras-Open-Finance/api-specs](https://github.com/Nebras-Open-Finance/api-specs), not here.

---

## Disclaimer

Content, wording, and components in this repository are experimental and may change frequently. References to specific banks, TPPs, or products are illustrative; always confirm details against the official UAE Open Finance documentation and the published OpenAPI specifications before building against them in production.
