---
next: false
prev: false
aside: false
---

🕒 **2 minute read**

# Confirmation of Payee — Requirements

The [User Journeys](./user-journeys) for this service also apply and must be adhered to.

The tables below list the rules that apply to Confirmation of Payee. The Hub receives and validates the TPP's request, then calls your Ozone Connect [`POST /customers/action/cop-query`](/tech/lfi-api-hub/v2.1/banking/confirmation-of-payee/open-api/cop-query) endpoint. You are responsible for returning accurate customer data — the Hub performs name matching.


## POST `/customers/action/cop-query`

| # | Condition | Rule |
|---|-----------|------|
| 1 | Account found, holder not opted out | Return `200` with a `data` array containing the account holder's customer record(s). For personal accounts, `verifiedClaims[].claims.fullName` is mandatory; include `givenName` and `familyName` if held separately. For business accounts, populate `verifiedClaims[].organisationClaims.name` with the registered business name. Joint accounts may return multiple records. |
| 2 | IBAN not recognised at this LFI | Return `200` with an empty `data` array.  |
| 3 | Account is blocked from receiving payments — temporary | Return `403` with `errorCode`: `Consent.AccountTemporarilyBlocked` and `errorMessage`: `The account is blocked from receiving payments.` Applies when the block is temporary — e.g. account status is `Suspended`. |
| 4 | Account is blocked from receiving payments — permanent | Return `403` with `errorCode`: `Consent.PermanentAccountAccessFailure` and `errorMessage`: `The account is blocked from receiving payments.` Applies when the block is permanent — e.g. account status is `Closed`, `Deceased`, or `Unclaimed`. |
| 5 | Account holder has opted out of CoP | Return `200` with an empty `data` array.  |

## Opt-out

| # | Rule |
|---|------|
| 1 | LFIs **must not** provide users with a general opt-out option for the CoP service. Opt-out is only permitted in exceptional circumstances — for example, where the account holder is a national or Emirati leader or their immediate family. |
| 2 | The opt-out process is not defined by the Open Finance Framework. LFIs must implement opt-out as part of their own BAU processes. |
| 3 | When an account holder has opted out, the LFI must return no data in the response — i.e. `200` with an empty `data` array (see row 5 of the table above). |
