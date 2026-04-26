---
next: false
prev: false
aside: false
---

🕒 **3 minute read**

# Consent Events & Actions

The **Consent Events & Actions API** is implemented by your LFI. Unlike the other APIs in the Ozone Connect specification where the API Hub calls your endpoints to retrieve data or execute payments, these endpoints allow the API Hub to notify you of consent lifecycle changes and request your input during consent creation.

## Direction of communication

All other Ozone Connect APIs follow the pattern: **API Hub → LFI** (the Hub requests data or actions from you). The Consent Events & Actions API follows the same direction — **API Hub → LFI** — but the purpose is reversed: the Hub is _informing_ you or _asking_ you, rather than requesting business data.

## Endpoints

| Endpoint | Type | When the Hub calls it | Recommendation |
|----------|------|----------------------|----------------|
| `POST /consent/action/validate` | Action | During consent creation — before the consent is stored. The Hub sends the consent the TPP is requesting and asks your LFI to confirm it is supported. | **Highly recommended** for all LFIs |
| `POST /consent/event/post` | Event | After a consent is successfully created | Recommended for LFIs that store consents locally |
| `POST /consent/event/patch` | Event | Every time a consent changes — e.g. status transitions to `Authorized`, `Rejected`, `Expired`, or `Revoked` | Recommended for LFIs that store consents locally |

## `POST /consent/action/validate`

The validate endpoint is called when a TPP submits a `POST /par` request to the API Hub to create a new consent. **Before** the consent is stored, the Hub forwards the full consent payload to your LFI and waits for a response.

Your LFI inspects the consent and determines whether it can be supported — for example:

- Does the consent version match what your LFI supports?
- Are the requested permissions within the scope of what your LFI offers?

Each consent type defines its own specific validation rules in its **Requirements** page (e.g. [Bank Data Sharing — Requirements](/tech/lfi-api-hub/v2.1/banking/data-sharing/requirements)). Refer to the Requirements page for each consent type your LFI supports.

Your LFI responds with a `data.status` of either `valid` or `invalid`:

| Response | Effect |
|----------|--------|
| `valid` | The consent is created in the API Hub and the authorization journey proceeds |
| `invalid` | The consent is **not** created. The API Hub returns an error to the TPP |

::: tip Highly recommended
We **highly recommend** all LFIs implement the validate endpoint. It gives your institution early control over which consents enter the authorization journey, preventing unsupported consents from reaching your PSUs.
:::

::: info Not configured?
If your LFI has not configured the validate endpoint, the API Hub assumes all consents are valid and creates them immediately without LFI input.
:::

## `POST /consent/event/{operation}`

The consent event endpoint is called by the Hub to notify your LFI of consent lifecycle changes. The `{operation}` path parameter indicates the type of change:

### `POST /consent/event/post` — Consent created

Called immediately after a consent is successfully created (i.e. after validation passes, if configured). The request body contains the full consent object as stored in the API Hub's Consent Manager.

### `POST /consent/event/patch` — Consent updated

Called every time a consent's state changes. This includes transitions such as:

- `AwaitingAuthorisation` → `Authorized` (PSU approved the consent)
- `AwaitingAuthorisation` → `Rejected` (PSU declined the consent)
- `Authorized` → `Revoked` (consent revoked by TPP, LFI, or PSU)
- `Authorized` → `Expired` (consent reached its expiration date)

The request body contains the full, updated consent object.

### Response

For both operations, your LFI MUST return `204 No Content` to acknowledge receipt. The Hub does not retry failed notifications, and consent state changes are **not** rolled back if your endpoint returns an error.

::: tip Recommended for LFIs storing consents locally
If your LFI maintains a local copy of consents — for example, to power a Consent Management Interface or to support internal business logic — we **recommend** implementing the consent event endpoints. This ensures your local consent state stays aligned with the API Hub, which is the **single source of truth** for all consent data.

Without these events, your local consent records may drift out of sync with the Hub, requiring you to poll the Consent Manager API to detect changes.
:::

## API Reference

- [`POST /consent/action/validate`](/tech/lfi-api-hub/v2.1/consent-events/open-api/validate) — Full request and response schema
- [`POST /consent/event/{operation}`](/tech/lfi-api-hub/v2.1/consent-events/open-api/event-op) — Full request and response schema
