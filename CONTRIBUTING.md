# Contributing

Thank you for helping improve the UAE Open Finance community standards documentation.

This repository hosts the documentation site for the UAE Open Finance ecosystem — a Vite + Vue 3 + vue-router app, prerendered to static HTML by [vite-ssg](https://github.com/antfu/vite-ssg). It includes policy documents, LFI integration guides, TPP standards, and the Vue components used across the site. OpenAPI specifications are **not** maintained here — they are fetched at build time from [Nebras-Open-Finance/api-specs](https://github.com/Nebras-Open-Finance/api-specs).

## Ways to contribute

- **Corrections** — Typos, broken links, inaccurate statements, or outdated references
- **Clarifications** — Improvements to wording, examples, or structure that make a page easier to follow
- **New documentation** — Additional pages or reference material that fits the existing site structure under [`src/pages/`](src/pages/)
- **Components and tooling** — Improvements to the Vue components under [`src/components/`](src/components/), the data registries under [`src/data/`](src/data/), or the build scripts under [`scripts/`](scripts/)
- **Errata** — Corrections to published content (see the Changes to Published Documentation Policy under [`src/pages/policy/`](src/pages/policy/))

Changes to OpenAPI specifications should be raised against the [api-specs](https://github.com/Nebras-Open-Finance/api-specs) repository, not here.

## Before you start

- Check existing [issues](../../issues) and [pull requests](../../pulls) to avoid duplicating work
- For significant changes — new policies, structural refactors, or new site sections — open an issue first to discuss the approach
- Review [CLAUDE.md](CLAUDE.md) for the architectural invariants that content in this repo must respect (strict mediation, centralised consent, API Hub as the only token issuer, and so on)

## How to submit a change

1. Fork this repository
2. Create a branch with a descriptive name: `git checkout -b docs/version-management-policy`
3. Make your changes locally
4. Run the site locally to verify your changes render correctly: `npm install && npm run dev`
5. Open a Pull Request with a clear description of what changed and why

## Local development

- Prerequisites: Node.js 18+ and npm
- Install dependencies: `npm install`
- Run the site with hot reload: `npm run dev`
- Build the static site: `npm run build` (outputs to [`dist/`](dist/))
- Preview the built site: `npm run preview`
- Type-check: `npm run typecheck`

OpenAPI specs are fetched on build via [`scripts/fetch-openapi-specs.mjs`](scripts/fetch-openapi-specs.mjs) into [`public/openapi/`](public/openapi/). They are gitignored and MUST NOT be committed.

## Writing style

- Use the precise terminology defined in [CLAUDE.md](CLAUDE.md): **API Hub**, **LFI**, **TPP**, **PSU**
- Keep TPP and LFI responsibilities clearly separated
- Use normative language (MUST, SHOULD, MAY) in policy and standards content where appropriate
- Align API descriptions with the published OpenAPI specifications — do not invent fields, endpoints, or schemas
- Prefer formal, RFC-style language in policy and standards pages; prefer step-by-step, implementation-focused language in integration guides
- Avoid marketing language, vague phrasing, and unsupported assumptions

## Keeping the repo clean

- Do not commit secrets, credentials, or personal identifiers — use placeholders in examples
- Do not commit OpenAPI YAML files (they are fetched at build time and gitignored)
- Keep illustrative references to banks, TPPs, or products clearly marked as illustrative

## Reporting issues

Open a GitHub issue with:

- The page or component affected (link or path)
- What you expected to see
- What you actually saw
- Any relevant screenshots or browser/OS details for rendering issues

## Code of conduct

Be respectful and constructive. This is a community resource for the UAE Open Finance ecosystem.
