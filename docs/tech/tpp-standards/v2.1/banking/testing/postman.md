---
prev: false
next: false
aside: false
---

# Postman

This Postman collection supports operations covering the key functionality of Nebras Open Finance banking APIs, including Bank Data Sharing, Payment Initiation, and Confirmation of Payee.

## Download Postman Collection

The collection is hosted in the [Nebras Open Finance Postman repository](https://github.com/Nebras-Open-Finance/postman) on GitHub.

Download the collection file directly:

<a href="https://raw.githubusercontent.com/Nebras-Open-Finance/postman/main/banking-v1.2-v2.0.postman_collection.json" download="banking-v1.2-v2.0.postman_collection.json" class="button">Download Postman Collection</a>

## Prerequisites

Before using this collection, ensure the following requirements are met:

- **Registered [Application](../trust-framework/application)**
  The application must be created within the Trust Framework and assigned the appropriate role (**BDSP**, **PISP**, or **CoP**) as defined in [Roles](../trust-framework/roles).

- **Valid [Transport Certificate](../trust-framework/certificates)**
  An active transport certificate must be issued and registered in the Trust Framework to establish secure **mTLS communication** with participating LFIs.

- **Valid [Signing Certificate](../trust-framework/certificates)**
  An active signing certificate must be issued and registered in the Trust Framework. This certificate is used to sign request objects and client assertions.

- **Registration with the relevant [Authorisation Server](../../registration/api-guide)**
  The application must be registered with the Authorisation Server of the LFI for which you intend to create a consent.

- **Understanding of the [FAPI Security Profile](../../security/fapi)** and **[Tokens & Assertions](../../security/tokens)**
  You should understand how request object signing, client authentication, and access token validation underpin secure API interactions.

- **Understanding of [Model Bank](./model-bank)**
  You should understand the role of the Model Bank and how to authenticate using the test profile provided.

## How to Use

1. Download the Postman collection using the link above.
2. Open **Postman** and click **Import**.
3. Select the downloaded `banking-v1.2-v2.0.postman_collection.json` file.
4. Configure the collection variables (base URL, client credentials, certificate paths) to match your registered application and target LFI environment.

## Included API Functionality

### TPP Onboarding
- <Post /> `/tpp-registration`

### Bank Data Sharing
- <Post /> `/par`
- <Post /> `/token`
- <Get /> `/accounts`, `/balances`, `/transactions`, `/parties`
- <Get /> `/account-access-consents`

### Single Instant Payment
- <Post /> `/par`
- <Post /> `/token`
- <Post /> `/payments`
- <Get /> `/payments`

### Multi Payments
- <Post /> `/par`
- <Post /> `/token`
- <Post /> `/payments`
- <Get /> `/payments`

### Confirmation of Payee
- <Post /> `/token`
- <Post /> `/discovery`
- <Post /> `/confirmation`
