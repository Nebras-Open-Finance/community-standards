---
next: false
prev: false
aside: false
---

# Consent Management Interface — Requirements

The tables below define the display, labelling, and behavioural requirements for the TPP Consent Management Interface (CMI). See the [User Experience](./user-experience) page for interactive wireframes of the dashboard and detail pages.

## Dashboard — tabs

The dashboard must present consents across two tabs.

| # | Rule |
|---|------|
| 1 | The **Current** tab must display all consents whose status is `AwaitingAuthorization`, `Authorized`, `Suspended`, or `Paused`. |
| 2 | The **History** tab must display all consents whose status is `Rejected`, `Consumed`, `Expired`, or `Revoked`. |

## Dashboard — filters

A filter panel must be available on the dashboard. The following three filters are required:

| Filter | Options |
|---|---|
| **LFI Name** | Dynamically populated from the LFIs present in the user's connections |
| **Consent Type** | Dynamically populated from the types present in the current tab |
| **Consent State** | Dynamically populated from the statuses present in the current tab |

## Status labels

Consent statuses must be translated from their API values into user-friendly labels before display.

| API status | Displayed label |
|---|---|
| `Authorized` | **Active** |
| `AwaitingAuthorization` | **Pending** |
| `Revoked` | **Cancelled** |
| `Suspended` | **Suspended** |
| `Paused` | **Paused** |
| `Expired` | **Expired** |
| `Rejected` | **Rejected** |
| `Consumed` | See below |

### `Consumed` — Single Instant Payment

For Single Instant Payments in the `Consumed` state, the displayed label is derived from the payment's `paymentStatus` field rather than the consent status.

| `paymentStatus` | Displayed label |
|---|---|
| `AcceptedSettlementCompleted` | **Successful** |
| `AcceptedCreditSettlementCompleted` | **Successful** |
| `AcceptedWithoutPosting` | **Successful** |
| `Rejected` | **Failed** |

For all other consent types, `Consumed` is displayed verbatim as **Consumed**.

## Consent type labels

| Internal type | Displayed label |
|---|---|
| `Data Sharing` | **Data Sharing** |
| `Single Instant Payment` | **Single Payment** |
| Any `Multi Payment (…)` subtype | **Flexi Pay** |

## Dashboard — card content

Each consent card on the dashboard must show a consistent set of fields depending on the consent type.

### Data Sharing

| Field | Content |
|---|---|
| LFI name | Name of the LFI the consent is held with |
| Status badge | Mapped label from [Status labels](#status-labels) |
| Account count | Number of connected accounts, e.g. `1 Account Connected` or `2 Accounts Connected` |
| Consent Type | `Data Sharing` |
| Last data received | Date the most recent data was retrieved under this consent |
| Connection expires | Date the consent expires |

### Single Instant Payment

| Field | Content |
|---|---|
| LFI name | Name of the LFI the consent is held with |
| Status badge | Mapped label from [Status labels](#status-labels) |
| Masked IBAN | Masked payer IBAN (not shown when status is `AwaitingAuthorization`) |
| Consent Type | `Single Payment` |
| Payment Date | Date the payment was or is to be made |
| Payment Amount | Amount of the payment in AED. Shown as `0.00` when status is `AwaitingAuthorization`; must be a positive value once the consent is `Authorized` or later |

### Multi Payment (all subtypes)

| Field | Content |
|---|---|
| LFI name | Name of the LFI the consent is held with |
| Status badge | Mapped label from [Status labels](#status-labels) |
| Masked IBAN | Masked payer IBAN (not shown when status is `AwaitingAuthorization`) |
| Consent Type | `Flexi Pay` |
| Total paid to date | Cumulative sum of all successful payments under this consent in AED |
| Connection expires | Date the consent expires |

## Detail page

Selecting a consent on the dashboard opens its detail page. The detail page presents the same information the customer saw on the Consent Page at the time they gave consent — the permissions, limits, accounts, and conditions that defined what they agreed to. This gives the customer a clear reference point for what they originally authorised, without requiring them to recall it from memory.

In addition to all fields shown on the dashboard card, the detail page must show a truncated Consent ID with a copy button (format: `f47ac10b...d479`).

### Data Sharing — additional sections

| Section | Content |
|---|---|
| **Accounts** | List of all accounts the user has connected under this consent, each showing account type name and full IBAN |
| **Data permissions** | Expandable list of data categories the consent covers, derived from the consent's `Permissions` field |

### Single Instant Payment — additional sections

| Section | Content |
|---|---|
| **Payment details** | Amount, Reference, and Payment Purpose. If status is `Authorized`, a Status badge of `Authorized` must also be shown. |
| **From account** | Bank name, Payer Name, and full IBAN of the payer account |
| **To account** | Payee Name and IBAN of the destination account |

### Multi Payment — additional sections

| Section | Content |
|---|---|
| **From account** | Bank name, Payer Name, and full IBAN of the payer account |
| **To account** | Payee Name and IBAN of the destination account |
| **Payment Rules / Payment History** | Tabbed section: Payment Rules shows consent parameters (schedule, limits, frequency); Payment History shows a log of all payments with date, amount, purpose, reference, and status |

## Detail page — action buttons

| Button | Label | Shown when |
|---|---|---|
| Pause | `Pause` | Status is `Authorized` and consent type is **not** Single Instant Payment |
| Reactivate | `Reactivate` | Status is `Paused` |
| Revoke (Data Sharing) | `Stop Sharing` | Status is `AwaitingAuthorization`, `Authorized`, `Suspended`, or `Paused` |
| Revoke (Payment) | `Cancel Permission` | Status is `AwaitingAuthorization`, `Authorized`, `Suspended`, or `Paused` |

No action buttons are shown when status is `Consumed`, `Expired`, `Rejected`, or `Revoked`.



## Confirmation screen

When the user selects Pause, Reactivate, or Revoke, replace the detail view with a **single confirmation screen** that includes: a title, a description of the impact of the action on the service (varying by use case), a Confirm button, and a Go back button.

| | Pause | Reactivate | Revoke — Data Sharing | Revoke — Payment |
|---|---|---|---|---|
| **Title** | `Pause data sharing` / `Pause payment permission` | `Resume data sharing` / `Resume payment permission` | `Stop sharing` | `Cancel payment permission` |
| **Confirm button** | `Confirm pause` | `Confirm reactivation` | `Confirm stop sharing` | `Confirm cancellation` |


Once a user confirms the action, the change must take effect immediately — there must be no delay between confirmation and the consent reflecting its new state. For revocation an update to the API Hub, via a PATCH request must be made at the point of confirmation.

- **Revoke (Data Sharing)** Immediate PATCH to [/account-access-consents/{ConsentId}](/tech/tpp-standards/v2.1/consent/open-api/patch-account-access-consents-ConsentId) 
- **Revoke (Payment)** Immediate PATCH to [/payment-consents/{ConsentId}](/tech/tpp-standards/v2.1/consent/open-api/patch-payment-consents-ConsentId) 
- **Pause**  No API Hub update — record paused state in the TPP's own system only
- **Reactivate** No API Hub update — clear the paused state in the TPP's own system only