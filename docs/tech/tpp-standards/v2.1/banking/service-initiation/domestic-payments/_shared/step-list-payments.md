## Listing Payments Under a Consent

To retrieve all payments submitted under this consent:

::: code-group

```typescript [Node.js]
const listResponse = await fetch(
  `${LFI_API_BASE}/open-finance/v2.1/payments?consentId=${consentId}`,
  {
    headers: { Authorization: `Bearer ${access_token}` },
    // agent: new https.Agent({ cert: transportCert, key: transportKey }),
  }
)

const { Data: { Payment: payments } } = await listResponse.json()
```

```python [Python]
list_response = httpx.get(
    f"{LFI_API_BASE}/open-finance/v2.1/payments",
    params={"consentId": consent_id},
    headers={"Authorization": f"Bearer {access_token}"},
    # cert=("transport.crt", "transport.key"),
)

payments = list_response.json()["Data"]["Payment"]
```

:::

See [GET /payments](/tech/tpp-standards/v2.1/banking/service-initiation/open-api/payments-idempotency) for the full reference.
