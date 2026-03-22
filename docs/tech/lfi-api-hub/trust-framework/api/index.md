---
next: false
prev: false
aside: false
---

# Trust Framework — API

Several things that you can do in the Trust Framework portal can also be done via API — managing organisations, software statements, authorisation servers, certificates, and contacts.

The API is uses **mTLS** for all authenticated requests. A valid transport certificate registered in the Trust Framework is required.

## Endpoints

| | Production | Sandbox |
|---|---|---|
| **Well Known** | [`auth.directory.openfinance.ae/.well-known/openid-configuration`](https://auth.directory.openfinance.ae/.well-known/openid-configuration) | [`auth.sandbox.directory.openfinance.ae/.well-known/openid-configuration`](https://auth.sandbox.directory.openfinance.ae/.well-known/openid-configuration) |
| **Auth** | `https://matls-auth.directory.openfinance.ae` | `https://matls-auth.sandbox.directory.openfinance.ae` |
| **API** | `https://matls-api.directory.openfinance.ae` | `https://matls-api.sandbox.directory.openfinance.ae` |


As per the Trust Framework the API is powered by **Raidiam** and the [official documenation can be found](https://www.raidiam.com/developers/docs/apis)