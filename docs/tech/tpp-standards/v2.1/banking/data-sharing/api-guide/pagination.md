---
next: false
prev: false
aside: false
---

# Pagination

List endpoints on the Bank Data Sharing API return pagination information in the response body. The TPP walks through a paginated result set by following the URLs in the `Links` object — there are no `page` or `page-size` query parameters to set on the request.

For the end-to-end picture — including how the API Hub converts LFI `meta` into the TPP `Links` envelope — see [Pagination — LFI `meta` to TPP `Links`](/knowledge-base/articles/pagination).

## Two response shapes to handle

Pagination is ultimately driven by the LFI. The UAE Open Finance standard **requires** LFIs to paginate `/accounts/{AccountId}/transactions` and `/accounts/{AccountId}/statements`, but during rollout not every LFI will have implemented it on day one. A TPP SHOULD therefore be ready for either of the following:

- **Paginated** — the LFI returned a page of the filtered result set. `Meta.TotalPages > 1` and `Links.Next` is populated while more pages remain.
- **Unpaginated** — the LFI returned the full result set in a single response. `Meta.TotalPages` is `1` (or `0` for an empty result) and `Links` contains only `Self`.

The loop pattern below — follow `Links.Next` until it is absent — handles both cases without branching. A TPP that only supports the paginated shape will appear to work correctly while the LFI is unpaginated (it fetches page 1 and stops), but will silently truncate to the first page once the LFI enables pagination. Using `Links.Next` as the stop condition avoids that regression.

## Which endpoints paginate

| Endpoint | Pagination |
| -------- | ---------- |
| `GET /accounts/{AccountId}/transactions` | **Required** |
| `GET /accounts/{AccountId}/statements` | **Required** |
| `GET /accounts` | Optional |
| `GET /accounts/{AccountId}/balances` | Optional |
| `GET /accounts/{AccountId}/beneficiaries` | Optional |
| `GET /accounts/{AccountId}/direct-debits` | Optional |
| `GET /accounts/{AccountId}/scheduled-payments` | Optional |
| `GET /accounts/{AccountId}/standing-orders` | Optional |
| `GET /accounts/{AccountId}/products` | Optional |
| `GET /accounts/{AccountId}/parties` | Optional |

Transactions and statements span long history (at least two years) and routinely produce large result sets. For other list endpoints the full result set is usually returned in one response, but TPPs SHOULD still follow `Links.Next` defensively in case an LFI chooses to paginate them.

## The `Links` envelope

Every paginated response includes a `Links` object alongside `Data`:

| Field | Required | Meaning |
| ----- | -------- | ------- |
| `Self` | Yes | The URL that produced this response |
| `First` | No | Link to the first page. Omitted when the response is unpaginated |
| `Prev` | No | Link to the previous page. Omitted on the first page |
| `Next` | No | Link to the next page. **Omitted on the last page and when the response is unpaginated** |
| `Last` | No | Link to the last page. Omitted when the response is unpaginated |

The URLs in `Links` are opaque — treat them as strings to fetch, not as templates to parse or rebuild. The API Hub may evolve the pagination parameters it embeds in these URLs without breaking your client.

## The `Meta` object

| Field | Applies to | Meaning |
| ----- | ---------- | ------- |
| `TotalPages` | All list endpoints | Total number of pages in the filtered result set. `1` when the response is unpaginated, `0` for an empty result set |
| `FirstAvailableDateTime` | Transactions, statements | ISO 8601 timestamp of the earliest record the LFI holds for this account |
| `LastAvailableDateTime` | Transactions, statements | ISO 8601 timestamp of the most recent record the LFI holds for this account |

`FirstAvailableDateTime` and `LastAvailableDateTime` reflect the full history the LFI holds, not the slice returned by the current query. They are useful for narrowing follow-up requests with `fromBookingDateTime` / `toBookingDateTime`.

## Following `Links.Next`

The canonical pattern is a loop that fetches `Links.Next` until the field is absent. The same logic terminates correctly whether the LFI paginated the result or returned it in a single response.

::: code-group

```typescript [Node.js]
import crypto from 'node:crypto'

async function fetchAllTransactions(accountId: string, fromBookingDateTime: string) {
  const transactions: unknown[] = []

  // Initial request — no page parameters, the Hub paginates via Links
  let nextUrl: string | undefined =
    `${LFI_API_BASE}/open-finance/v2.1/accounts/${accountId}/transactions` +
    `?fromBookingDateTime=${encodeURIComponent(fromBookingDateTime)}`

  while (nextUrl) {
    const response = await fetch(nextUrl, {
      headers: {
        Authorization:                `Bearer ${access_token}`,
        'x-fapi-interaction-id':      crypto.randomUUID(),
        'x-fapi-auth-date':           lastCustomerAuthDate,
        'x-fapi-customer-ip-address': customerIpAddress,
      },
      // agent: new https.Agent({ cert: transportCert, key: transportKey }),
    })

    const body = await response.json()
    transactions.push(...body.Data.Transaction)

    // Stop when the server does not return a Next link — works for both
    // paginated (last page reached) and unpaginated (single response) cases
    nextUrl = body.Links.Next
  }

  return transactions
}
```

```python [Python]
import uuid

def fetch_all_transactions(account_id: str, from_booking_date_time: str) -> list:
    transactions = []

    # Initial request — no page parameters, the Hub paginates via Links
    next_url = (
        f"{LFI_API_BASE}/open-finance/v2.1/accounts/{account_id}/transactions"
        f"?fromBookingDateTime={from_booking_date_time}"
    )

    while next_url:
        response = httpx.get(
            next_url,
            headers={
                "Authorization":                f"Bearer {access_token}",
                "x-fapi-interaction-id":        str(uuid.uuid4()),
                "x-fapi-auth-date":             last_customer_auth_date,
                "x-fapi-customer-ip-address":   customer_ip_address,
            },
            # cert=("transport.crt", "transport.key"),
        )

        body = response.json()
        transactions.extend(body["Data"]["Transaction"])

        # Stop when the server does not return a Next link — works for both
        # paginated (last page reached) and unpaginated (single response) cases
        next_url = body["Links"].get("Next")

    return transactions
```

:::

::: tip Reuse the access token across pages
The access token is valid for the same 10-minute window used elsewhere. For very large result sets, refresh proactively using the refresh token flow in [Step 10 — Refreshing the Access Token](/tech/tpp-standards/v2.1/banking/data-sharing/api-guide/#step-10-refreshing-the-access-token) rather than waiting for a `401` mid-loop.
:::

::: warning Rate limits and bounded retries
Each page is a separate HTTP request. Cap your loop with a sensible maximum page count and respect any `429 Too Many Requests` backoff the API Hub returns — do not retry `Links.Next` in a tight loop.
:::

## Worked example — transactions, 3-page result

Initial request:

```http
GET /accounts/acc-001/transactions?fromBookingDateTime=2026-01-01T00:00:00Z
```

Response — page 1 of 3:

```json
{
  "Data": {
    "AccountId": "acc-001",
    "Transaction": [ /* ... 100 items ... */ ]
  },
  "Links": {
    "Self":  "https://rs1.lfi.apihub.openfinance.ae/open-finance/v2.1/accounts/acc-001/transactions?fromBookingDateTime=2026-01-01T00%3A00%3A00Z&page=1",
    "First": "https://rs1.lfi.apihub.openfinance.ae/open-finance/v2.1/accounts/acc-001/transactions?fromBookingDateTime=2026-01-01T00%3A00%3A00Z&page=1",
    "Next":  "https://rs1.lfi.apihub.openfinance.ae/open-finance/v2.1/accounts/acc-001/transactions?fromBookingDateTime=2026-01-01T00%3A00%3A00Z&page=2",
    "Last":  "https://rs1.lfi.apihub.openfinance.ae/open-finance/v2.1/accounts/acc-001/transactions?fromBookingDateTime=2026-01-01T00%3A00%3A00Z&page=3"
  },
  "Meta": {
    "TotalPages":             3,
    "FirstAvailableDateTime": "2022-03-14T08:21:00+00:00",
    "LastAvailableDateTime":  "2026-04-18T11:47:00+00:00"
  }
}
```

The TPP follows `Links.Next`. On page 3, the response has no `Next` field:

```json
{
  "Data": { "AccountId": "acc-001", "Transaction": [ /* ... last slice ... */ ] },
  "Links": {
    "Self":  "https://rs1.lfi.apihub.openfinance.ae/open-finance/v2.1/accounts/acc-001/transactions?fromBookingDateTime=2026-01-01T00%3A00%3A00Z&page=3",
    "First": "https://rs1.lfi.apihub.openfinance.ae/open-finance/v2.1/accounts/acc-001/transactions?fromBookingDateTime=2026-01-01T00%3A00%3A00Z&page=1",
    "Prev":  "https://rs1.lfi.apihub.openfinance.ae/open-finance/v2.1/accounts/acc-001/transactions?fromBookingDateTime=2026-01-01T00%3A00%3A00Z&page=2",
    "Last":  "https://rs1.lfi.apihub.openfinance.ae/open-finance/v2.1/accounts/acc-001/transactions?fromBookingDateTime=2026-01-01T00%3A00%3A00Z&page=3"
  },
  "Meta": {
    "TotalPages":             3,
    "FirstAvailableDateTime": "2022-03-14T08:21:00+00:00",
    "LastAvailableDateTime":  "2026-04-18T11:47:00+00:00"
  }
}
```

The loop terminates on the absence of `Links.Next`.

## Worked example — LFI returns everything in one response

When the LFI has not enabled pagination, the same request returns the full result set in one response:

```json
{
  "Data": {
    "AccountId": "acc-001",
    "Transaction": [ /* ... every matching transaction ... */ ]
  },
  "Links": {
    "Self": "https://rs1.lfi.apihub.openfinance.ae/open-finance/v2.1/accounts/acc-001/transactions?fromBookingDateTime=2026-01-01T00%3A00%3A00Z"
  },
  "Meta": {
    "TotalPages":             1,
    "FirstAvailableDateTime": "2022-03-14T08:21:00+00:00",
    "LastAvailableDateTime":  "2026-04-18T11:47:00+00:00"
  }
}
```

`Links.Next` is absent, so the loop exits after the first iteration. No TPP-side branching is required.

## Empty result sets

A query that matches no records returns `200` with an empty `Data` array, `Meta.TotalPages: 0`, and `Links` containing only `Self`. Do not treat this as an error — `404` is not returned for empty filtered results.
