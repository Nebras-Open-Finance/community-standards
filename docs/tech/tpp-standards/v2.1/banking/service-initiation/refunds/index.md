---
next: false
prev: false
aside: false
---

# Payment Refunds

The Payment Refunds API lets a TPP retrieve the debtor's payment account details from the LFI after a payment has been made. Those details can then be used to initiate a refund payment back to the original payer.

::: info Required role: BSIP
Access to the Refunds API requires the **BSIP** (Bank Service Initiation Provider) role. This role must be assigned to your application in the Trust Framework before calling the endpoint. See [Roles](/tech/tpp-standards/trust-framework/roles) for the full list of scopes and grant types this role permits.
:::


## ReadRefundAccount permission

To retrieve refund account details, the original payment consent must have been created with the `ReadRefundAccount` permission included in the consent's `Permissions` array. This signals to the LFI that the debtor has consented to share their account details for refund purposes.

See the [Payment Consent API Guide](/tech/tpp-standards/v2.1/consent/api-guide) for how to include this permission when creating a payment consent.


## How it works

After a payment has been authorised, the TPP uses a **client credentials** token (no user redirect required) to call the refund endpoint on the LFI's resource server. The LFI returns the debtor's account details — IBAN and name — which the TPP uses as the creditor when initiating a refund payment.

| Step | Endpoint | Called against |
|------|----------|----------------|
| Retrieve refund account | `GET /payment-consents/{ConsentId}/refund` | LFI |

The response is a signed JWT containing the debtor's `RefundAccount` under `message.Data`.

## Fulfilling the refund

Once the refund account details have been retrieved, the can initate a payment to the returned IBAN via Open Finance or by other means. 

