---
next: false
prev: false
aside: false
---

# Single Instant Payment — Requirements

The [Consent requirements](/tech/tpp-standards/v2.1/consent/requirements) and the [User Journeys](./user-journeys) for this payment type also apply and must be adhered to.

The tables below list the validation rules that apply to Single Instant Payment.

## Consent & Processing —

| # | Condition | Rule |
|---|-----------|------|
| 1 | User initiates SIP consent authorization | Enable the User to authenticate using **Multi-Factor Authentication (MFA)** before reviewing and authorizing the **Single Instant Payment (SIP) Consent**. |
| 2 | SIP consent is staged by the TPP | Retrieve the `SingleInstantPayment (SIP) Consent` details from **API Hub** and present relevant details to the User. |
| 3 | `PaymentPurpose` violates BAU rules | Reject the **SIP Consent** if the purpose of payment violates existing **BAU rules** for blocking or rejecting the payment. The **Hub** must be notified with an appropriate error message. |
| 4 | Payment account not provided in consent | Allow the User to select a payment account for SIP initiation, as per `Payment Account Selection at LFI`. |
| 5 | User selects a payment account with insufficient funds | Do not allow the User to select a payment account with **insufficient funds** for SIP initiation. This applies only when the payment account is not pre-provided by the TPP. |
| 6 | Payment account provided in consent has insufficient funds | Reject the **SIP Consent** if the provided payment account has **insufficient funds**. The **Hub** must be notified with an appropriate error message. |
| 7 | Payment account selected for SIP | Verify that the authorization status of the selected payment account aligns with the `IsSingleAuthorization` flag specified by the **TPP**. |
| 8 | SIP consent details displayed to User | Display the `TPP Trading Name` of the **TPP** that initiated the **SIP Consent**. |
| 9 | Customer-facing service provider exists (non-TPP) | Display the `Service Provider Name` along with the `TPP Trading Name` when a customer-facing provider (for example, a merchant) has a commercial relationship with the TPP. |
| 10 | SIP consent review screen presented | Present the following minimum required information to the User before authorization: <br><br>• `User Payment Account` <br>• `Payment Amount & Currency` <br><br>• **Creditor Identification Details**, including: <br><br>&nbsp;&nbsp;&nbsp;– `Creditor Name` <br>&nbsp;&nbsp;&nbsp;– `Creditor Account` <br>&nbsp;&nbsp;&nbsp;– `Creditor Account Holding LFI` *(optional)* <br><br>• `Debtor Note` *(conditional)* <br>• `Creditor Reference` <br>• `Purpose of Payment` |
| 11 | User proceeds with SIP consent | Request the User to authorize the **SIP Consent** so that the payment can be initiated. |
| 12 | User cancels the payment journey | Allow the User to cancel the journey. The **LFI** must hand off the User back to the **TPP**, notify **Hub** with an appropriate error message, and reject the **SIP Consent**. |
| 13 | All required authorizers have approved the consent | Update the `SIP Consent Status` from `AwaitingAuthorization` to `Authorized`. |
| 14 | SIP consent status or details change | Update the `SIP Consent` details stored in **Hub**. |

## Payment Initiation —

| # | Condition | Rule |
|---|-----------|------|
| 1 | Payment initiation request received from Hub | Trigger the payment initiation process immediately when receiving the request for the **SIP Consent**. |
| 2 | Payment initiation process started | Retrieve the **Creditor Identification Details** from the **encrypted PII block** included in the original `Payment Consent`. |
| 3 | Creditor identification validation fails (BAU checks) | If **Creditor Identification Details** fail existing **BAU validation checks**, reject the payment initiation request and notify **Hub** with an appropriate error message. |
| 4 | Payment processing validation stage | Apply all existing **BAU payment controls and limits**, including: <br><br>• `Single Transaction Value Limit` <br>• `Total Transaction Value Limit` <br>• `AML Checks` *(if applicable)* <br>• Other standard LFI controls <br><br>If any validation fails, reject the payment and send an error response to **Hub**. |
| 5 | Payment account has insufficient funds | Reject the payment initiation if the selected payment account has **insufficient funds**. The **Hub** must be notified with an appropriate error message. |
| 6 | All validations and checks are successful | Proceed with payment execution by either: <br><br>• submitting to **external payment rails**; or <br>• executing as an **intra-bank payment**. |
| 7 | Payment successfully initiated | Provide **Hub** with all available payment details, including the `Payment Transaction ID` *(unique identifier)*. |
| 8 | Intra-bank payment scenario | Ensure that the `Creditor Reference` is available in the creditor’s account information for payments within the same **LFI**. |

## Payment Status Update —

| # | Condition | Rule |
|---|-----------|------|
| 1 | Payment initiated via Hub | Update the `Payment Status` throughout the payment lifecycle with the appropriate status value based on its progress through initiation processing and execution. |
| 2 | Payment status changes during lifecycle | Notify the **Hub** asynchronously about any changes in the `Payment Status`. The **LFI** must send the appropriate status codes as defined in [Payment Status](/tech/lfi-api-hub/v2.1/banking/service-initiation/domestic-payments/overview/payment-status.md). |
| 3 | Responding to Hub with payment status | Return the `Payment Status` along with payment system-specific status codes and `Payment Rejection Reason Codes` as specified in the UAE Open Finance Standard. |