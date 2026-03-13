---
next: false
prev: false
aside: false
---

# Postman Collection — Sandbox Testing


### TPP Onboarding

Contains the `POST /tpp-registration` dynamic client registration request. Run this once per LFI environment to register your application before starting any of the flows below.

See: [Registration — API Guide](../registration/api-guide)

---

### Data Sharing

Implements the Bank Data Sharing flow described in the [Data Sharing API Guide](../banking/data-sharing/api-guide).

**AuthFlow** — runs the full consent authorisation sequence:
1. Build the signed request object JWT for `/par`
2. Build the `private_key_jwt` client assertion
3. `POST /par` — stage the consent
4. Auth Code Grant — exchange the authorisation code for an access token

**Data Sharing APIs** — the account-information resource requests, available in both `application/json` and `application/jwt` response formats:
- `GET /accounts`
- `GET /accounts/{accountId}`
- `GET /accounts/{accountId}/balances`
- `GET /accounts/{accountId}/transactions`
- `GET /accounts/{accountId}/direct-debits`
- `GET /accounts/{accountId}/beneficiaries`
- `GET /accounts/{accountId}/standing-orders`
- `GET /accounts/{accountId}/scheduled-payments`
- `GET /accounts/{accountId}/statements`
- `GET /accounts/{accountId}/offers`
- `GET /accounts/{accountId}/parties`
- `GET /accounts/{accountId}/product`

**Consents** — retrieve and manage the consent resource directly.

---

### Service Initiation

Each sub-folder implements one payment type end-to-end. The AuthFlow pattern is the same in each case — build the request object (including encrypted PII), POST to `/par`, and exchange the authorisation code for a token — then the TPP folder runs the payment API calls. See the relevant API guide for the full field-level specification.

| Sub-folder | API Guide |
|---|---|
| Single Instant Payment | [Single Instant Payment](../banking/service-initiation/domestic-payments/single-instant-payment/api-guide) |
| Single Instant Payment with CoP | Confirmation of Payee checked before payment |
| Single Instant Payment (Multi-Authorization) | LFI co-authorisation flow |
| Multi Payment — Fixed Defined Schedule | [Fixed Defined Schedule](../banking/service-initiation/domestic-payments/multi-payments/fixed-defined-schedule/api-guide) |
| Multi Payment — Variable Defined Schedule | [Variable Defined Schedule](../banking/service-initiation/domestic-payments/multi-payments/variable-defined-schedule/api-guide) |
| Multi Payment — Fixed Periodic Schedule | [Fixed Periodic Schedule](../banking/service-initiation/domestic-payments/multi-payments/fixed-periodic-schedule/api-guide) |
| Multi Payment — Variable Periodic Schedule | [Variable Periodic Schedule](../banking/service-initiation/domestic-payments/multi-payments/variable-periodic-schedule/api-guide) |
| Multi Payment — Fixed On-Demand | [Fixed On-Demand](../banking/service-initiation/domestic-payments/multi-payments/fixed-on-demand/api-guide) |
| Multi Payment — Variable On-Demand | [Variable On-Demand](../banking/service-initiation/domestic-payments/multi-payments/variable-on-demand/api-guide) |
| Payment Consent Refund | Refund flow against an existing payment consent |

Each folder includes:
- **AuthFlow** — PAR staging + auth code grant
- **TPP > Payments** — `POST /payments` and `GET /payments/{paymentId}`
- **TPP > Consents** — consent retrieval and status checks


---

### Confirmation of Payee

Implements the CoP discovery and confirmation flow:
- `GET /confirmation-of-payee/discovery` — retrieve LFI CoP capabilities
- `POST /confirmation-of-payee/confirmation` — submit a payee name check


## Running the flows

Import the downloaded collection into Postman. The requests within each AuthFlow folder are numbered and should be run in sequence. The O3 utility requests (prefixed `O3 Util:`) use the O3 signing service to prepare signed JWTs — these must succeed before the downstream PAR and token requests will work.

Once the Auth Code Grant step completes successfully, the access token is stored automatically and the resource API requests in the TPP folder are ready to run.
