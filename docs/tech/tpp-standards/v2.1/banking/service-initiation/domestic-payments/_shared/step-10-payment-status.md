### Step 10 - GET /payments/{PaymentId}

Poll the payment status using the `PaymentId` returned in Step 9:

::: code-group

```typescript [Node.js]
const statusResponse = await fetch(
  `${LFI_API_BASE}/open-finance/v2.1/payments/${paymentId}`,
  {
    headers: { Authorization: `Bearer ${access_token}` },
    // agent: new https.Agent({ cert: transportCert, key: transportKey }),
  }
)

const { Data: { Status, StatusUpdateDateTime } } = await statusResponse.json()
```

```python [Python]
status_response = httpx.get(
    f"{LFI_API_BASE}/open-finance/v2.1/payments/{payment_id}",
    headers={"Authorization": f"Bearer {access_token}"},
    # cert=("transport.crt", "transport.key"),
)

data                   = status_response.json()["Data"]
status                 = data["Status"]
status_update_datetime = data["StatusUpdateDateTime"]
```

:::

| Status | Description |
|--------|-------------|
| `Pending` | Payment received by LFI, awaiting processing |
| `AcceptedSettlementInProcess` | Payment accepted and settlement is in progress |
| `AcceptedSettlementCompleted` | Payment settled successfully |
| `Rejected` | Payment rejected by the LFI or payment rail |

See [GET /payments/{PaymentId}](/tech/tpp-standards/v2.1/banking/service-initiation/open-api/payments-PaymentId) for the full response schema.
