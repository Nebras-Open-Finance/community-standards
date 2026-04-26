---
next: false
prev: false
aside: false
---

🕒 **2 minute read**

# Pagination

Pagination for Bank Data Sharing endpoints is **page-based** on the LFI (Ozone Connect) side. The API Hub converts the LFI's page/meta response into the `Links` envelope returned to the TPP.

For the end-to-end picture — including how the Hub converts LFI `meta` into TPP `Links` — see [Pagination — LFI `meta` to TPP `Links`](/knowledge-base/articles/pagination).

## Which endpoints require pagination

| Endpoint | Pagination |
|----------|-----------|
| `GET /accounts/{accountId}/transactions` | **Required** |
| `GET /accounts/{accountId}/statements` | **Required** |
| `GET /accounts` | Optional |
| `GET /accounts/{accountId}/balances` | Optional |
| `GET /accounts/{accountId}/beneficiaries` | Optional |
| `GET /accounts/{accountId}/direct-debits` | Optional |
| `GET /accounts/{accountId}/scheduled-payments` | Optional |
| `GET /accounts/{accountId}/standing-orders` | Optional |
| `GET /accounts/{accountId}/products` | Optional |
| `GET /accounts/{accountId}/customer` | Optional |

Transactions and statements span long history (at least two years) and routinely produce large result sets — pagination is required so responses remain bounded. For other list endpoints, LFIs MAY paginate where result sets warrant it, or return all matching records in a single response.

## Request — page / page-size

The Hub sends `page` and `page-size` as query parameters on every paginated request:

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | `1` | 1-indexed page number |
| `page-size` | integer | `100` | Number of records per page |

The LFI MUST return the slice of the result set that corresponds to `page` and `page-size`. Filtering (e.g. `fromBookingDateTime` / `toBookingDateTime` for transactions) is applied **first**; pagination is applied to the filtered result set.

## Response — `meta`

The LFI indicates the pagination state in the response `meta` object:

| Field | Type | Description |
|-------|------|-------------|
| `paginated` | boolean | `true` if the response is paginated. `false` or omitted if the full result set is returned in a single response |
| `totalPages` | integer | The total number of pages in the full result set, given the current `page-size` |
| `totalRecords` | integer | The total number of records in the full result set across all pages |

`totalPages` and `totalRecords` MUST reflect the **filtered** result set — not the whole table. If a transaction query filters by date range, `totalRecords` is the count of transactions in that range, and `totalPages` is `ceil(totalRecords / page-size)`.

### Example — transactions, page 2 of 12

Request:

```
GET /accounts/acc-001/transactions?fromBookingDateTime=2026-01-01T00:00:00Z&page=2&page-size=100
```

Response:

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

The Hub uses `totalPages` to construct `Links.First`, `Links.Prev`, `Links.Next`, and `Links.Last` on the TPP-facing response, and surfaces `totalPages` in the TPP's `Meta`. See the [Pagination KB article](/knowledge-base/articles/pagination) for the full conversion.

## Empty result sets

If filtering yields no records, return `200` with an empty `data` array and:

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

Do not return `404` for an empty filtered result.

## Ordering and stability

The LFI MUST return records in a **deterministic order** so that pagination is stable across successive page requests. For transactions and statements, newest-first (descending `bookingDateTime` / `statementDate`) is recommended. If new records arrive between page requests, the LFI SHOULD ensure the same record is not returned on two different pages of the same logical query.
