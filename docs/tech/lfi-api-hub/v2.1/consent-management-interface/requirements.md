---
next: false
prev: false
aside: false
---

# Consent Management Interface — Requirements

The tables below define the display, labelling, and behavioural requirements for the LFI Consent Management Interface (CMI). See the [User Experience](./user-experience) page for interactive wireframes of the dashboard and detail pages.

The LFI CMI shares the same structure and consent-type logic as the [TPP CMI](/tech/tpp-standards/v2.1/consent/consent-management-interface/requirements), with the differences noted below.

Adjustments to the requirements below are permitted provided the customer can always clearly understand what consents they have granted. Any adjustments must be documented in your CX certification submission.



## Dashboard — tabs

The dashboard must present consents across two tabs.

| # | Rule |
|---|------|
| 1 | The **Current** tab must display all consents whose status is `AwaitingAuthorization`, `Authorized`, or `Suspended`. |
| 2 | The **History** tab must display all consents whose status is `Rejected`, `Consumed`, `Expired`, or `Revoked`. |

::: info
`Paused` is not a valid status in the LFI CMI. It is a TPP-local concept that is not reflected in the API Hub.
:::

## Dashboard — filters

A filter panel must be available on the dashboard. The following three filters are required:

| Filter | Options |
|---|---|
| **TPP Name** | Dynamically populated from the TPPs present in the customer's connections |
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
| TPP name | Name of the TPP the consent was granted to |
| Status badge | Mapped label from [Status labels](#status-labels) |
| Account count | Number of connected accounts, e.g. `1 Account Connected` or `2 Accounts Connected` |
| Consent Type | `Data Sharing` |
| Last data received | Date the most recent data was retrieved under this consent |
| Connection expires | Date the consent expires |

### Single Instant Payment

| Field | Content |
|---|---|
| TPP name | Name of the TPP the consent was granted to |
| Status badge | Mapped label from [Status labels](#status-labels) |
| Masked IBAN | Masked payer IBAN (not shown when status is `AwaitingAuthorization`) |
| Consent Type | `Single Payment` |
| Payment Date | Date the payment was or is to be made |
| Payment Amount | Amount of the payment in AED. Shown as `0.00` when status is `AwaitingAuthorization`; must be a positive value once the consent is `Authorized` or later |

### Multi Payment (all subtypes)

| Field | Content |
|---|---|
| TPP name | Name of the TPP the consent was granted to |
| Status badge | Mapped label from [Status labels](#status-labels) |
| Masked IBAN | Masked payer IBAN (not shown when status is `AwaitingAuthorization`) |
| Consent Type | `Flexi Pay` |
| Total paid to date | Cumulative sum of all successful payments under this consent in AED |
| Connection expires | Date the consent expires |

## Detail page

Selecting a consent on the dashboard opens its detail page. The detail page presents the same information the customer saw at the time they gave consent — the permissions, limits, accounts, and conditions that defined what they agreed to.

In addition to all fields shown on the dashboard card, the detail page must show a truncated Consent ID with a copy button (format: `f47ac10b...d479`).

### Data Sharing — additional sections

| Section | Content |
|---|---|
| **Accounts** | List of all accounts the customer has connected under this consent, each showing account type name and full IBAN |
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

### Detail page — status-dependent content

The detail page must adapt its content based on the consent's current status.

#### Data Sharing — "How we are using your data" card

A card titled **How we are using your data** must appear below the Data permissions section for all Data Sharing consents, except when status is `Rejected`.

| Status | Behaviour |
|---|---|
| `Rejected` | Card is **not shown** |
| `Revoked` | Title changes to **You cancelled this connection** |
| `Expired` | "Connection Expires" label changes to **Connection Expired** |
| All other statuses | Default title and labels |

The card must display the following date rows, each prefixed with a calendar or refresh icon:

| Row | Label | Value |
|---|---|---|
| 1 | First Connected | Date the consent was first authorised |
| 2 | Connection Expires / Connection Expired | Consent expiration date |
| 3 | Last Updated | Date of the most recent data retrieval — **only shown when the consent has a `BaseConsentId`** |
| 4 | List of Updates | Clickable link to the [List of Updates](#detail-page--list-of-updates) view — **only shown when the consent has a `BaseConsentId`** |

#### Multi Payment — dates card

A dates card must appear below the Payment Rules / Payment History section for all Multi Payment consents, except when status is `Rejected`.

| Status | Behaviour |
|---|---|
| `Rejected` | Card is **not shown** |
| `Revoked` | Second row label changes to **You cancelled payments on** |
| `Expired` | Second row label changes to **Payments expired** |
| All other statuses | Default labels |

The card must display the following date rows:

| Row | Label | Value |
|---|---|---|
| 1 | You started this permission | Date the consent was first authorised |
| 2 | We will make these payments until | Consent expiration date |
| 3 | Last Updated | Date of the most recent data retrieval — **only shown when the consent has a `BaseConsentId`** |
| 4 | List of Updates | Clickable link to the [List of Updates](#detail-page--list-of-updates) view — **only shown when the consent has a `BaseConsentId`** |

### Detail page — List of Updates

::: danger PSU isolation risk
When a consent is created it contains no customer information — the PSU identity is only added later when the LFI patches in the PSU ID. This means there is no inherent guarantee that two consents sharing the same `BaseConsentId` belong to the same customer. Unless the LFI explicitly validates this, there is a risk that the List of Updates exposes one customer to consents belonging to a different customer. LFIs must ensure that only consents belonging to the same PSU are returned when resolving related consents by `BaseConsentId`.
:::

When a consent carries a `BaseConsentId`, a **List of Updates** link must be shown on the detail page. Clicking this link navigates to a dedicated view that displays all consents related to the current consent through the same `BaseConsentId`.

A consent is included in the list if:

- its `BaseConsentId` matches the current consent's `BaseConsentId`, **or**
- its `ConsentId` matches the current consent's `BaseConsentId`

The current consent must **not** appear in its own list of updates.

#### Each related consent card

Each related consent must be displayed in the same visual format as the dashboard connection list, with the following differences:

| Field | Content |
|---|---|
| Title (bold) | Date the consent was last updated |
| Subtitle (italic) | TPP name |
| Consent Type | Type label from [Consent type labels](#consent-type-labels) |
| Last data received | Date the most recent data was retrieved |
| Connection expires | Consent expiration date |

Each card must include a chevron and hover interaction matching the dashboard, and clicking a card must navigate to the detail page for that consent.

No status badge is shown on the update cards.

## Detail page — action buttons

| Button | Label | Shown when |
|---|---|---|
| Revoke (Data Sharing) | `Stop Sharing` | Status is `AwaitingAuthorization`, `Authorized`, or `Suspended` |
| Revoke (Payment) | `Cancel Permission` | Status is `AwaitingAuthorization`, `Authorized`, or `Suspended` |

No action buttons are shown when status is `Consumed`, `Expired`, `Rejected`, or `Revoked`.

::: info
The LFI CMI does not include Pause or Reactivate buttons. These are TPP-only concepts.
:::

## Confirmation screen

When the customer selects Revoke, replace the detail view with a **single confirmation screen** that includes: a title, a description of the impact of the action on the service (varying by use case), a Confirm button, and a Go back button.

| | Revoke — Data Sharing | Revoke — Payment |
|---|---|---|
| **Title** | `Stop sharing` | `Cancel payment permission` |
| **Confirm button** | `Confirm stop sharing` | `Confirm cancellation` |

Once a customer confirms the action, the change must take effect immediately — there must be no delay between confirmation and the consent reflecting its new state. The LFI must update the consent status via the Consent Manager API.
