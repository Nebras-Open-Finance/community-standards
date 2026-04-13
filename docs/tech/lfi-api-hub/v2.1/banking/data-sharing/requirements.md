---
next: false
prev: false
aside: false
---

# Bank Data Sharing — Requirements

The [Authentication requirements](/tech/lfi-api-hub/v2.1/consent-journey/authentication/requirements), [Authorization requirements](/tech/lfi-api-hub/v2.1/consent-journey/authorization/requirements), and [User Journeys](./user-journeys) must be adhered to.

The tables below list the rules that apply to Bank Data Sharing. All request validation of the TPP's credentials, access token, and consent is performed by the Hub before your resource server is called. The rules below cover what your resource server must validate and what it must return.


## Consent Validation

When a TPP creates a consent, the API Hub calls your [`POST /consent/action/validate`](/tech/lfi-api-hub/v2.1/consent-events/open-api/validate) endpoint before the consent is created. You MUST validate the consent and respond with `status: "valid"` or `status: "invalid"`. If you respond with `invalid`, the API Hub will not create the consent and the TPP will receive an error.

This validation runs before the PSU is involved — there is no authentication or authorization at this stage. The purpose is to reject consents early that your systems cannot fulfil.

| # | Rule | Detail |
|---|------|--------|
| 1 | Unsupported `AccountType` | If the consent's `AccountType` array contains a value that is not supported by the API Hub integration the consent was received on, respond with `invalid`. Each API Hub integration is scoped to a single segment (`Retail`, `SME`, or `Corporate`). If the LFI serves multiple segments, each segment MUST be configured as a separate API Hub integration because the API Hub has a single authorization endpoint. Validate that every requested `AccountType` is within scope of the integration that received the consent. |
| 2 | Unsupported `AccountSubType` | If the consent's `AccountSubType` array contains a value not supported by this LFI, respond with `invalid`. For example, if the LFI does not offer `Mortgage` products but the consent requests `Mortgage`, the consent MUST be rejected at validation. |
| 3 | Unsupported permissions | If the consent includes permissions that reference an endpoint the LFI has not yet delivered, respond with `invalid`. For example, if the consent includes `ReadStandingOrdersBasic` or `ReadStandingOrdersDetail` but `GET /accounts/{AccountId}/standing-orders` is not yet available, the consent MUST be rejected at validation. |
| 4 | Invalid permission and `AccountSubType` combination | Some endpoints are only valid for certain account subtypes. If the consent requests a combination of permissions and `AccountSubType` values that cannot be fulfilled, respond with `invalid`. For example, `ReadDirectDebitsBasic` is only valid for `CurrentAccount` and `Savings` — if the consent specifies only `CreditCard` in `AccountSubType` and includes `ReadDirectDebitsBasic`, the consent MUST be rejected. See the [endpoints by account subtype](/tech/lfi-api-hub/v2.1/banking/data-sharing/#endpoints-by-account-subtype) matrix in the overview. |


## Account Selection

During the consent authorization journey, the customer selects which of their accounts to share with the TPP. The LFI is responsible for presenting the eligible accounts and applying any filters the TPP has specified in the consent.

| # | Field | Rule |
|---|-------|------|
| 1 | `consent.AccountType` | If the consent specifies `AccountType`, only present accounts whose type matches one of the specified values (`Retail`, `SME`, `Corporate`). If not specified, present accounts of all types supported by this API Hub integration. |
| 2 | `consent.AccountSubType` | If the consent specifies `AccountSubType`, only present accounts whose subtype matches one of the specified values. If not specified, present accounts of all subtypes. If the authenticated PSU does not hold any accounts matching the requested `AccountSubType`, PATCH the consent to `Rejected` and call `doFail` with `error: access_denied` and `error_description: user_lacks_eligible_accounts`. See [Authorization requirements](/tech/lfi-api-hub/v2.1/consent-journey/authorization/requirements) for details. |
| 3 | Multiple selection | The account selection screen must allow the customer to select more than one account. A consent with no accounts selected must not be authorised. |


## GET `/accounts`

| # | Field | Rule |
|---|-------|------|
| 1 | `accountIds` | Return only accounts whose `id` matches one of the values in the `accountIds` query parameter. If no accounts match, return `200` with an empty `data` array. |
| 2 | Data completeness | All fields that exist or are derivable from your systems must be populated on each account. All fields marked as required in the OpenAPI spec must be present. This includes `accountHolderName`, `status`, `currency`, `accountType`, and `accountSubType` where held. |
| 3 | `accountNumbers` | Must contain at least one entry. `schemeName` and `identification` are required on each entry. |
| 4 | `accountNumbers.schemeName` | Must reflect the account identifier type: `IBAN` for `CurrentAccount` and `Savings`; `MaskedPAN` for `CreditCard`; `MortgageReference` for `Mortgage`; `FinanceReference` for `Finance`. |
| 5 | `customers` | For non-business accounts, `customers` must contain at least one entry. For business accounts, populate `businessCustomer` instead. |
| 6 | Empty result | Return `200` with an empty `data` array if no accounts match. Do not return `404`. |
| 7 | `AccountSubType` | Supported for all account subtypes: `CurrentAccount`, `Savings`, `CreditCard`, `Finance`, and `Mortgage`. |

## GET `/accounts/{accountId}`

| # | Field | Rule |
|---|-------|------|
| 1 | `account` | Return only account whose `id` matches the value in the `accountIds` path parameter. If no accounts match, return `200` with an empty `data` array. |
| 2 | Data completeness | All fields that exist or are derivable from your systems must be populated, consistent with what is returned by `GET /accounts` for the same account. All fields marked as required in the OpenAPI spec must be present. |
| 3 | `accountNumbers` | Must contain at least one entry. `schemeName` and `identification` are required on each entry. |
| 4 | `accountNumbers.schemeName` | Must reflect the account identifier type: `IBAN` for `CurrentAccount` and `Savings`; `MaskedPAN` for `CreditCard`; `MortgageReference` for `Mortgage`; `FinanceReference` for `Finance`. |
| 5 | `AccountSubType` | Supported for all account subtypes: `CurrentAccount`, `Savings`, `CreditCard`, `Finance`, and `Mortgage`. |


## GET `/accounts/{accountId}/balances`

| # | Field | Rule |
|---|-------|------|
| 1 | `account` | Return only account whose `accountId` matches the value in the `accountIds` path parameter. If no accounts match, return `200` with an empty `data` array. |
| 2 | Data completeness | All balance types that exist for the account must be returned. All fields marked as required in the OpenAPI spec must be present on each record, including `accountId`, `balanceType`, `amount` (with `amount` and `currency`), `creditDebitIndicator`, and `timestamp`. |
| 3 | Multiple balance types | Return one record per distinct balance type held for the account. More than one record per account is permitted and expected where multiple balance types exist. Include `creditLines` where applicable. |
| 4 | `InterimAvailable` | For `CurrentAccount` and `Savings` accounts, a record with `balanceType: InterimAvailable` must always be included. This is the real-time available balance on the account. |
| 5 | `AccountSubType` | Supported for all account subtypes: `CurrentAccount`, `Savings`, `CreditCard`, `Finance`, and `Mortgage`. |

## GET `/accounts/{accountId}/beneficiaries`

| # | Field | Rule |
|---|-------|------|
| 1 | `account` | Return only account whose `accountId` matches the value in the `accountId` path parameter. If no account matches, return `200` with an empty `data` array. |
| 2 | Required fields | Every beneficiary record must include `accountId`, `beneficiaryId`, `beneficiaryType`, and `addedViaOF`. |
| 3 | Data completeness | All fields that exist or are derivable must be populated, including `creditorAccount` (with `schemeName` and `identification`), `servicer`, and `reference` where held. |
| 4 | Empty result | Return `200` with an empty `data` array if no beneficiaries exist. Do not return `404`. |
| 5 | `AccountSubType` | Only supported for `CurrentAccount` and `Savings` accounts. Not available for `CreditCard`, `Finance`, or `Mortgage` accounts. |


## GET `/accounts/{accountId}/direct-debits`

| # | Field | Rule |
|---|-------|------|
| 1 | `account` | Return only account whose `accountId` matches the value in the `accountId` path parameter. If no account matches, return `200` with an empty `data` array. |
| 2 | Required fields | Every direct debit record must include `accountId`, `directDebitId`, `directDebitStatusCode`, `mandateIdentification`, `name`, and `frequency`. |
| 3 | Data completeness | Include `previousPaymentDateTime` and `previousPaymentAmount` where available. |
| 4 | Empty result | Return `200` with an empty `data` array if no direct debits exist. Do not return `404`. |
| 5 | `AccountSubType` | Only supported for `CurrentAccount` and `Savings` accounts. Not available for `CreditCard`, `Finance`, or `Mortgage` accounts. |

## GET `/accounts/{accountId}/scheduled-payments`

| # | Field | Rule |
|---|-------|------|
| 1 | `account` | Return only account whose `accountId` matches the value in the `accountId` path parameter. If no account matches, return `200` with an empty `data` array. |
| 2 | Required fields | Every scheduled payment record must include `accountId`, `scheduledPaymentId`, `scheduledType`, `scheduledPaymentDateTime`, and `instructedAmount` (with `amount` and `currency`). |
| 3 | Data completeness | Include `creditorAccount` (with `schemeName` and `identification`), `creditorAgent`, `creditorReference`, and `debtorReference` where held. |
| 4 | Empty result | Return `200` with an empty `data` array if no scheduled payments exist. Do not return `404`. |
| 5 | `AccountSubType` | Only supported for `CurrentAccount` and `Savings` accounts. Not available for `CreditCard`, `Finance`, or `Mortgage` accounts. |

## GET `/accounts/{accountId}/standing-orders`

| # | Field | Rule |
|---|-------|------|
| 1 | `account` | Return only account whose `accountId` matches the value in the `accountId` path parameter. If no account matches, return `200` with an empty `data` array. |
| 2 | Required fields | Every standing order record must include `accountId`, `standingOrderId`, `frequency`, `firstPaymentDateTime`, `standingOrderStatusCode`, and `firstPaymentAmount` (with `amount` and `currency`). |
| 3 | Data completeness | Include `nextPaymentDateTime`, `nextPaymentAmount`, `lastPaymentDateTime`, `lastPaymentAmount`, `finalPaymentDateTime`, `finalPaymentAmount`, `numberOfPayments`, `creditorAccount`, `creditorAgent`, and `standingOrderType` where held. |
| 4 | Empty result | Return `200` with an empty `data` array if no standing orders exist. Do not return `404`. |
| 5 | `AccountSubType` | Only supported for `CurrentAccount` and `Savings` accounts. Not available for `CreditCard`, `Finance`, or `Mortgage` accounts. |

## GET `/accounts/{accountId}/statements`

| # | Field | Rule |
|---|-------|------|
| 1 | `account` | Return only account whose `accountId` matches the value in the `accountId` path parameter. If no account matches, return `200` with an empty `data` array. |
| 2 | `fromStatementDate` | If provided, return only statements with a statement date on or after this date. Filtering is open-ended (from the earliest available statement) if not provided. |
| 3 | `toStatementDate` | If provided, return only statements with a statement date on or before this date. Filtering is open-ended (to the latest available statement) if not provided. |
| 4 | Required fields | Every statement record must include `accountId`, `accountSubType`, `statementId`, `statementDate`, `openingDate`, `closingDate`, `openingBalance` (with `creditDebitIndicator`, `amount`, and `currency`), `closingBalance` (with `creditDebitIndicator`, `amount`, and `currency`), and `summary` (with `creditDebitIndicator`, `subTransactionType`, `amount`, and `count` per entry). |
| 5 | Data completeness | All fields that exist or are derivable for each statement must be returned, including `creditLine` where applicable. |
| 6 | Data retention | The endpoint must support retrieval of at least the last two years of statements. |
| 7 | Empty result | Return `200` with an empty `data` array if no statements exist within the requested range. Do not return `404`. |
| 8 | Pagination | Pagination must be supported. `meta.paginated`, `meta.totalRecords`, and `meta.totalPages` must be accurate. |
| 9 | `AccountSubType` | Supported for all account subtypes: `CurrentAccount`, `Savings`, `CreditCard`, `Finance`, and `Mortgage`. |

## GET `/accounts/{accountId}/transactions`

| # | Field | Rule |
|---|-------|------|
| 1 | `account` | Return only account whose `accountId` matches the value in the `accountId` path parameter. If no account matches, return `200` with an empty `data` array. |
| 2 | `fromBookingDateTime` | If provided, return only transactions booked on or after this date-time. Filtering is open-ended if not provided. |
| 3 | `toBookingDateTime` | If provided, return only transactions booked on or before this date-time. Filtering is open-ended if not provided. |
| 4 | Timezone | Any timezone offset in `fromBookingDateTime` or `toBookingDateTime` must be ignored. Filter against local booking date-time only. |
| 5 | Required fields | Every transaction record must include `accountId`, `transactionId`, `transactionDateTime`, `transactionType`, `subTransactionType`, `creditDebitIndicator`, `status`, `bookingDateTime`, and `amount` (with `amount` and `currency`). |
| 6 | Data completeness | All fields that exist or are derivable must be populated, including `balance` (with `creditDebitIndicator`, `balanceType`, and `amount`) where available, `merchantDetails`, `creditorAccount`, `debtorAccount`, `cardInstrument`, `currencyExchange`, `flags`, and `paymentPurposeCode` where held. |
| 7 | Transaction context | `transactionInformation` and `transactionReference` must be provided where held to give the TPP meaningful context for the transaction. |
| 8 | Data retention | The endpoint must support retrieval of at least the last two years of transactions. |
| 9 | Empty result | Return `200` with an empty `data` array if no transactions exist within the requested range. Do not return `404`. |
| 10 | Pagination | Pagination must be supported. `meta.paginated`, `meta.totalRecords`, and `meta.totalPages` must be accurate. |
| 11 | `AccountSubType` | Supported for all account subtypes: `CurrentAccount`, `Savings`, `CreditCard`, `Finance`, and `Mortgage`. |

## GET `/accounts/{accountId}/products`

| # | Field | Rule |
|---|-------|------|
| 1 | `account` | Return only products associated with the account specified by the `accountId` path parameter. If no account matches, return `200` with an empty `data` array. |
| 2 | Data completeness | All product data that exists or is derivable from your systems must be returned, including fees, charges, rates, rewards, benefits, and eligibility criteria where held. |
| 3 | `FinanceRates` format | `FinanceRates` may be returned as either a cleartext `AEProductFinanceRates` JSON object or as a JWE compact serialisation string. Encryption is at the LFI's discretion.  |
| 4 | `FinanceRates` — JWE | If encrypting `FinanceRates`, generate an ephemeral symmetric encryption key per response (must not be reused). Encrypt the `AEProductFinanceRates` payload as a JWE using the content encryption algorithm required by the Security Profile. Set `exp` to 30 minutes from the time of the response and set `kid` to the value of `x-fapi-interaction-id`. Transmit the encryption key to the User via an existing LFI channel (e.g. SMS or push notification) — do not include it in the API response. |
| 5 | Empty result | Return `200` with an empty `data` array if no product data exists for the account. Do not return `404`. |
| 6 | Pagination | Pagination must be supported. `meta.paginated`, `meta.totalRecords`, and `meta.totalPages` must be accurate. |
| 7 | `AccountSubType` | Supported for all account subtypes: `CurrentAccount`, `Savings`, `CreditCard`, `Finance`, and `Mortgage`. |



## GET `/accounts/{accountId}/customer`

| # | Field | Rule |
|---|-------|------|
| 1 | `account` | Return only customers who are associated to the account specified by the value in the `accountId` path parameter. |
| 2 | Multiple customers | Return one record per customer associated with the account. Joint accounts must return a record for each joint holder. |
| 3 | Required fields | Every customer record must include `id`, `claims` `verifiedClaims`, `customerType`, `customerCategory`, and `accountRole`. |
| 4 | Person claims | For retail customers, `verifiedClaims[].claims` must include `identityType`, `fullName`, `givenName`, `familyName`, `emiratesId`, `emiratesIdExpiryDate`, and `residentialAddress`. Include all optional fields (`middleName`, `birthDate`, `mobileNumber`, `email`, `nationality`, etc.) where held. |
| 5 | Corporate claims | For SME/Corporate customers, `verifiedClaims[].claims` must include `identityType`, `businessName`, and `tradeLicenceNumber`. Include all optional fields (`taxIdentificationNumber`, `dateOfIncorporation`, `countryOfIncorporation`, `corporateAddress`, etc.) where held. |
| 6 | Data completeness | All fields that exist or are derivable from your systems must be populated on each customer record. |
| 7 | Empty result | Return `200` with an empty `data` array if no customer records are associated with the account. Do not return `404`. |
| 8 | Pagination | `meta.totalRecords` and `meta.totalPages` must be accurate. |

## GET `/customer`

| # | Field | Rule |
|---|-------|------|
| 1 | Customer identification | Identify the customer from the `o3-psu-identifier` header passed by the Hub. |
| 2 | Required fields | The customer record must include `id`, `verifiedClaims`, and `customerCategory`. |
| 3 | Person claims | For retail customers, `verifiedClaims[].claims` must include `identityType`, `fullName`, `givenName`, `familyName`, `emiratesId`, `emiratesIdExpiryDate`, and `residentialAddress`. Include all optional fields where held. |
| 4 | Corporate claims | For SME/Corporate customers, `verifiedClaims[].claims` must include `identityType`, `businessName`, and `tradeLicenceNumber`. Include all optional fields where held. |
| 5 | Data completeness | All fields that exist or are derivable from your systems must be populated. |
