---
next: false
prev: false
aside: false
---

🕒 **2 minute read**

# Webhooks — Event Notifications

Rather than requiring TPPs to poll for status changes, UAE Open Finance supports **push-based event notifications**. When a relevant event occurs — such as a consent being authorized or revoked, or a payment status changing — the API Hub can deliver a notification directly to your registered webhook endpoint.

## How Events Are Delivered

Events are delivered as an HTTP `POST` to the webhook URL you provide along with the consent. The request body is a **JWE compact serialisation** encrypted using the public **Encryption Certificate** registered in the Trust Framework and in the Application that created the Consent. Inside the JWE is a signed JWT (JWS) containing the event payload.

You must respond with `202 Accepted` and an empty body immediately upon receipt. Decrypt and process the payload asynchronously — the Hub may retry delivery if it does not receive a timely acknowledgement.

See [Receiving and Decrypting a JWE](/tech/tpp-standards/security/fapi/message-encryption#receiving-and-decrypting-a-jwe) for decryption guidance, including how to use the `kid` in the JWE header to select the correct private key.

## Requirements

- A webhook URL registered on your **Application** in the Trust Framework
- A valid **Encryption Certificate** on your Application — events cannot be delivered without one

## Available Events

| Event | Trigger | Guide |
|-------|---------|-------|
| Consent Status | Any consent status change (`Authorized`, `Revoked`, `Expired`, etc.) | [Consent Status Event](/tech/tpp-standards/v2.1/webhooks/consent-status/api-guide) |
| Payment Status | Payment status update on a consent with `subscription.Webhook.IsActive: true` | [Payment Status Event](/tech/tpp-standards/v2.1/webhooks/payment-status/api-guide) |
