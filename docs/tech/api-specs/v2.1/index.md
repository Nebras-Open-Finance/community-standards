---
next: false
prev: false
aside: false
---

# API Specifications

The official UAE Open Finance OpenAPI specifications are maintained in a single repository. The OpenAPI YAML files are the **source of truth** for every API in the ecosystem.

<a href="https://github.com/Nebras-Open-Finance/api-specs" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:10px;padding:10px 20px;background:linear-gradient(84.64deg,#00C8AF 0%,#015AD7 41.05%,#000000 82.6%);border-radius:66px;color:#fff;text-decoration:none;font-weight:600;font-size:0.875rem;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" style="fill:currentColor;flex-shrink:0"><path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"/></svg>Nebras-Open-Finance/api-specs</a>


## Branches

- **`main`** — the live source of truth. Everything on `main` is **published, authoritative, and externally consumable**.
- **Other branches** — used for drafts of future content (for example a forthcoming `v2.2`). The Nebras Open Finance team will announce when draft content is ready for ecosystem review.

New implementers should work from the latest version on `main`.


## Viewing the Specifications

The pages under this section render every spec inline. To view a spec directly from the repository, [Redocly](https://redocly.github.io/redoc/) gives a clean, navigable rendering of any YAML file — paste its raw GitHub URL into the Redocly viewer.


## Repository Structure

Specifications are organised under `dist/` by the audience that consumes them:

| Path | Description |
|------|-------------|
| `dist/api-hub/` | APIs the API Hub exposes **to LFIs** |
| `dist/standards/` | APIs the API Hub exposes **to TPPs** |
| `dist/ozone-connect/` | APIs **LFIs must implement** for the API Hub to call |

Each category contains one folder per version, and each version folder holds the OpenAPI 3.x YAML files directly:

```
dist/standards/vX.Y/
├── uae-account-information-openapi.yaml
├── uae-atm-openapi.yaml
└── ...
```

The most up-to-date version across all categories is **v2.1**.


## API Categories

### API Hub (`dist/api-hub/`)

These specifications describe the APIs that the API Hub exposes to LFIs. LFIs integrate against these APIs to participate in the Open Finance ecosystem — for example to authenticate, manage consents, and receive event callbacks.

### Standards (`dist/standards/`)

These specifications describe the APIs that the API Hub exposes to TPPs. TPPs use these APIs to access financial data and initiate services on behalf of their customers.

### Ozone Connect (`dist/ozone-connect/`)

These specifications describe the APIs that LFIs must implement for the API Hub to call. When a TPP makes a valid request to the API Hub, the API Hub proxies that request to the relevant LFI using these Ozone Connect APIs.


## API Flow Overview

The API Hub acts as a gateway between TPPs and LFIs. There is a natural mapping between the Standards APIs (TPP → API Hub) and the Ozone Connect APIs (API Hub → LFI):

```
+======================================================================+
|                  AlTareq Trust Framework (Directory)                 |
|----------------------------------------------------------------------|
|                                                                      |
|                      +-------------------------+                     |
|                      |           TPP           |                     |
|                      +------------+------------+                     |
|                                   |                                  |
|                 +-----------------+-----------------+                |
|                 |                 |                 |                |
|             +---v---+         +---v---+         +---v---+            |
|             |API Hub|         |API Hub|   ...   |API Hub|            |
|             +-------+         +-------+         +-------+            |
|                 |                 |                 |                |
|             +---v---+         +---v---+         +---v---+            |
|             | LFI 1 |         | LFI 2 |   ...   | LFI N |            |
|             +-------+         +-------+         +-------+            |
|                                                                      |
+======================================================================+
```


## Versioning

Specifications follow a `vMAJOR.MINOR` scheme. When you see `v2.1` in the repository it refers to the same logical release across all three categories:

- `dist/api-hub/v2.1.x/` and `dist/ozone-connect/v2.1.x/` hold the v2.1 line for the Hub-to-LFI and LFI-to-Hub interfaces.
- `dist/standards/v2.1/` holds the v2.1 line for the TPP-facing interface.

Errata releases (for example `dist/standards/v2.1-errata1/`) contain targeted corrections to a published version without incrementing the version number. **Where an errata folder exists, the files inside it supersede the corresponding base version.**

::: tip Watch for updates
Implementers are encouraged to **watch** the repository on GitHub to stay informed of new versions and changes as the specification evolves.
:::


## Governance Folders

The repository's `supporting/` directory holds material that sits alongside the specs without being part of the published surface — tests, accepted breaking changes, and a forward-looking design backlog.

### `supporting/breaking-changes/`

Records breaking changes that have been **knowingly accepted** within an errata release. Each entry names the affected endpoints, a sign-off, and a rationale, and is enforced by an automated oasdiff test: any breaking change flagged by oasdiff MUST have a matching entry, or the test fails. This keeps the bar high without blocking corrections when the team genuinely decides a change is worth making.

### `supporting/future-updates/`

Records **recommended changes to defer to the next major version**. Entries are non-urgent design improvements that would be breaking inside a pre-vN.0 errata context but are sensible to apply when the next major is cut. Not enforced by tests — purely a forward-looking design backlog.
