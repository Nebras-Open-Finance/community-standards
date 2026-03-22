---
next: false
prev: false
aside: false
---

# Confirmation of Payee

Confirmation of Payee (CoP) lets a TPP verify that an IBAN belongs to the named account holder before a payment is initiated. The check happens outside the consent and authorisation flow — it requires no user interaction, runs against the LFI that holds the destination account, and returns a name-match result in real time.

::: info Required role: BSIP
Access to the Confirmation of Payee API requires the **BSIP** (Bank Service Initiation Provider) role. This role must be assigned to your application in the Trust Framework before calling either endpoint. See [Roles](/tech/tpp-standards/trust-framework/roles) for the full list of scopes and grant types this role permits.
:::

<LiveAPIs families="['confirmation-of-payee']" />

## How it works

CoP is a two-call flow: discovery, then confirmation.

**Discovery** is called against the API Hub. The TPP submits the destination IBAN; the Hub resolves which LFI holds the account and returns that LFI's discovery endpoint URL and resource server URL.

**Confirmation** is called directly against the resolved LFI. The TPP authenticates using a client credentials grant (no user redirect), sends a signed request containing the IBAN and account holder name, and receives a signed response with the match result.

| Step | Endpoint | Called against |
|------|----------|---------------|
| Discovery | `POST /open-finance/confirmation-of-payee/v2.1/discovery` | API Hub |
| Confirmation | `POST /open-finance/confirmation-of-payee/v1.2/confirmation` | Resolved LFI |

Both request and response bodies are compact JWS strings (`Content-Type: application/jwt`). The Hub discovery response carries `DiscoveryEndpointUrl` and `ResourceServerUrl`. The LFI confirmation response carries `NameMatchIndicator` and, on non-Yes results, a `MaskedName`.

## Match results

| `NameMatchIndicator` | Meaning | Required TPP action |
|----------------------|---------|---------------------|
| `ConfirmationOfPayee.Yes` | Name and account match | Proceed normally |
| `ConfirmationOfPayee.Partial` | Name partially matches | Surface `MaskedName` to the payer before proceeding |
| `ConfirmationOfPayee.No` | Name does not match | Surface `MaskedName` to the payer before proceeding |

A `Partial` or `No` result must be disclosed to the user — see [User Experience](./user-journeys) for the required consent and authorisation page behaviour across all match scenarios.