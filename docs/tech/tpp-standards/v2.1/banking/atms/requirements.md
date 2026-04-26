---
next: false
prev: false
aside: false
pageClass: requirements-page
---

🕒 **2 minute read**

# ATMs - Requirements

The tables below list the validation rules that apply to the ATM API. The **Validated by** column indicates where each rule is enforced.

All requests require an active [Trust Framework application](/tech/tpp-standards/trust-framework/application) with the **BDSP** role, a valid [transport certificate](/tech/tpp-standards/trust-framework/certificates) presented on every request via mTLS, and an active [signing key](/tech/tpp-standards/security/fapi/message-signing) for JWT signing.

## GET [`/atms`](/tech/tpp-standards/v2.1/banking/atms/open-api/atms)

| # | Field | Rule | Validated by |
|---|-------|------|-------------|
| 1 | `Authorization` | Must contain a valid Bearer access token obtained via a `client_credentials` grant with the `atm` scope. | API Hub |
| 2 | `x-fapi-interaction-id` | Should be included. Should be a valid UUID (RFC 4122). An invalid value will not cause a failure but tracing will not be possible. | N/A |
