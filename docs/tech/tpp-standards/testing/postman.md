---
next: false
prev: false
aside: false
---

🕒 **3 minute read**

# Postman

This Postman collection covers the key Open Finance API flows available in the AlTareq sandbox environment, including TPP onboarding, Bank Data Sharing, payments, and Confirmation of Payee.

## Download

Download and import the Postman collection to get started:

<a href="https://raw.githubusercontent.com/Nebras-Open-Finance/postman/main/banking-v1.2-v2.0.postman_collection.json" download="banking-v1.2-v2.0.postman_collection.json" class="button">Download Postman Collection</a>

## Prerequisites

Before using the collection, ensure the following are in place:

- **Registered [Application](../trust-framework/application)**
  The application must be created within the Trust Framework and assigned the **BDSP role** as defined in [Roles](../trust-framework/roles).

- **Valid [Transport Certificate](../trust-framework/certificates)**
  An active transport certificate must be issued and registered in the Trust Framework to establish secure **mTLS communication** with participating LFIs.

- **Valid [Signing Certificate](../trust-framework/certificates)**
  An active signing certificate must be issued and registered in the Trust Framework. This certificate is used to sign request objects and client assertions.

- **Understanding of [Consents](../../consent)**
  You should understand how to create, retrieve, and manage consents, including consent states and lifecycle transitions.

- **Understanding of [Model Bank](./index)**
  You should understand the Model Bank setup, how to configure environment variables, and how to authenticate using one of the pre-configured test users.

## How to Use

1. Download the Postman collection above.
2. Open **Postman** and click **Import**.
3. Select the downloaded `banking-v1.2-v2.0.postman_collection.json` file.
4. Configure the environment variables using the values from the [Model Bank](./index) page.

## Included API Functionality

### TPP Onboarding

- <Post /> `/tpp-registration`

### Bank Data Sharing

- <Post /> `/par`
- <Post /> `/token`
- <Get /> `/balances`, `/transactions`, `/parties`
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



