---
title: "Pagination — LFI `meta` to TPP `Links`"
description: "How page-based pagination flows from the LFI's Ozone Connect response through the API Hub, converted into the Links envelope consumed by the TPP."
next: false
prev: false
---

# Pagination — LFI `meta` to TPP `Links`

Bank Data Sharing list endpoints use two different pagination models:

- **LFI → API Hub (Ozone Connect)** is **page-based**: the Hub sends `page` and `page-size` as query parameters, and the LFI returns a `meta` object describing the total size of the filtered result set.
- **API Hub → TPP (UAE standards)** uses a **Links envelope**: the TPP receives `Links.Self`, `Links.First`, `Links.Prev`, `Links.Next`, `Links.Last`, and `Meta.TotalPages` — no `page` / `page-size` query parameters.

The API Hub bridges the two. The LFI implements page-based responses; the Hub derives the links.

This article uses `GET /accounts/{accountId}/transactions` as the worked example. The same behaviour applies to `GET /accounts/{accountId}/statements` — and to any other endpoint where the LFI chooses to paginate.

## The LFI side

### Request from the Hub

The Hub issues one page-based request per TPP call:

```
GET /accounts/acc-001/transactions
  ?fromBookingDateTime=2026-01-01T00:00:00Z
  &page=2
  &page-size=100
```

`page` is 1-indexed; `page-size` defaults to `100`. Filtering parameters (`fromBookingDateTime`, `toBookingDateTime`) are applied **before** pagination — `totalRecords` and `totalPages` reflect the filtered result set, not the whole table.

### Response to the Hub

The LFI returns the slice for the requested page, plus a `meta` block describing the full filtered result set:

```json
{
  "data": [
    { "accountId": "acc-001", "transactionId": "txn-900234", "...": "..." }
  ],
  "meta": {
    "paginated": true,
    "totalPages": 12,
    "totalRecords": 1187
  }
}
```

| Field | Meaning |
|-------|---------|
| `meta.paginated` | `true` if the response is a page of a larger result set. `false` or omitted if the LFI returned the full result set in a single response |
| `meta.totalPages` | `ceil(totalRecords / page-size)` — the last page number the Hub may request |
| `meta.totalRecords` | The total number of records in the filtered result set across all pages |

The LFI MUST return records in a deterministic order so pagination is stable across successive page requests.

## The API Hub side

The Hub receives one TPP request, calls the LFI one or more times (often just once — it forwards the TPP's requested page through), and composes the TPP response. It uses the LFI's `meta` to generate the `Links` block.

### Request from the TPP

```
GET /accounts/acc-001/transactions?fromBookingDateTime=2026-01-01T00:00:00Z
```

The TPP does not send `page` or `page-size`. Pagination is expressed through the Hub's URL parameters on the `Links` returned in the previous response.

### Response to the TPP

The Hub converts the LFI's `meta` into `Meta` and `Links`:

```json
{
  "Data": {
    "Transaction": [
      { "AccountId": "acc-001", "TransactionId": "txn-900234", "...": "..." }
    ]
  },
  "Links": {
    "Self": "https://hub.example.ae/open-finance/v2.1/accounts/acc-001/transactions?fromBookingDateTime=2026-01-01T00:00:00Z&page=2",
    "First": "https://hub.example.ae/open-finance/v2.1/accounts/acc-001/transactions?fromBookingDateTime=2026-01-01T00:00:00Z&page=1",
    "Prev": "https://hub.example.ae/open-finance/v2.1/accounts/acc-001/transactions?fromBookingDateTime=2026-01-01T00:00:00Z&page=1",
    "Next": "https://hub.example.ae/open-finance/v2.1/accounts/acc-001/transactions?fromBookingDateTime=2026-01-01T00:00:00Z&page=3",
    "Last": "https://hub.example.ae/open-finance/v2.1/accounts/acc-001/transactions?fromBookingDateTime=2026-01-01T00:00:00Z&page=12"
  },
  "Meta": {
    "TotalPages": 12
  }
}
```

The Hub derives each link from the LFI's `meta.totalPages` and the current `page`:

| TPP field | Derived from |
|-----------|--------------|
| `Links.Self` | The URL that produced this response |
| `Links.First` | Current URL with `page=1` |
| `Links.Prev` | Current URL with `page = currentPage - 1`. Omitted on the first page |
| `Links.Next` | Current URL with `page = currentPage + 1`. Omitted on the last page |
| `Links.Last` | Current URL with `page = meta.totalPages` |
| `Meta.TotalPages` | `meta.totalPages` from the LFI |

### When the LFI returns an unpaginated response

If the LFI returns `meta.paginated: false` (or omits `paginated`), the full result set is in a single response. The Hub emits `Meta.TotalPages: 1`, a `Links.Self`, and no `First` / `Prev` / `Next` / `Last`.

## Empty filtered result

Filtering that yields nothing returns `200` with an empty `data` array and:

```json
{
  "data": [],
  "meta": {
    "paginated": true,
    "totalPages": 0,
    "totalRecords": 0
  }
}
```

The Hub propagates this as an empty `Data` array with `Meta.TotalPages: 0`. `404` MUST NOT be returned.

## Why two models

The TPP standards follow UK Open Banking conventions — opaque `Links` let the Hub evolve its pagination strategy (cursor-based, time-sliced, etc.) without breaking TPP clients. The LFI side is deliberately simpler: page/page-size is the lowest-common-denominator interface that every core banking system can serve cheaply. The Hub absorbs the translation.

## Applying the same pattern to other endpoints

`GET /accounts/{accountId}/statements` works identically: the LFI paginates by `page` / `page-size` and returns `meta.totalPages` / `meta.totalRecords`; the Hub emits `Links` and `Meta.TotalPages` on the TPP side.

Other list endpoints (`/beneficiaries`, `/direct-debits`, `/scheduled-payments`, `/standing-orders`, `/products`, `/accounts/{accountId}/customer`) may pursue the same model if the LFI chooses to paginate them, but the expectation is that the full result set is returned in a single response.
