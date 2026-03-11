---
next: false
prev: false
aside: false
---

🕒 **10 minute read**

# API Resources

The API resources hosted on an LFI's Authorisation Server represent the key resources that are exposed through various endpoints.

The format of these endpoints is:
- **Production:** `https://rs1.[LFICode].apihub.openfinance.ae/open-finance/[APIFamily]/[Version]/[Endpoint]`
- **Sandbox:** `https://rs1.[LFICode].sandbox.apihub.openfinance.ae/open-finance/[APIFamily]/[Version]/[Endpoint]`

These endpoints are organized into structured categories known as **API families**. Each API family groups together related functionality, making it easier for TPPs to understand the available services.

## API Family – `payment`

This family includes endpoints related to initiating and managing payments.
- These endpoints are part of the [Bank Service Initiation](../v2.1/banking/service-initiation/) functionality and associated with the **BSIP** role.
- Allowed API scopes: `openid payments`

**Consent Endpoints**

These endpoints are used to create and manage payment consents.

- Supported grant type: `client_credentials`

*Example endpoints:*

- `https://rs1.[LFICode].apihub.openfinance.ae/open-finance/payment/[Version]/payment-consents`
- `https://rs1.[LFICode].apihub.openfinance.ae/open-finance/payment/[Version]/payment-consents/{ConsentId}`

**Resource Endpoints**

These endpoints are used to initiate and retrieve payments, including file-based payments.

- Supported grant types: `authorization_code`, `refresh_token`

*Example endpoints:*

- `https://rs1.[LFICode].apihub.openfinance.ae/open-finance/payment/[Version]/payments`
- `https://rs1.[LFICode].apihub.openfinance.ae/open-finance/payment/[Version]/payments/{PaymentId}`
- `https://rs1.[LFICode].apihub.openfinance.ae/open-finance/payment/[Version]/file-payments`

<br>

## API Family – `account-information`

This family includes endpoints related to retrieving bank data e.g. accounts, balances, transactions, etc.
- These endpoints are part of the [Bank Data Sharing](../v2.1/banking/data-sharing/) functionality and are associated with the **BDSP** role.
- Allowed API scopes: `openid accounts`
- Supported grant types: `authorization_code`, `refresh_token`

**Consent Endpoints**

These endpoints are used to create and manage account information consents.

- Supported grant type: `client_credentials`

*Example endpoints:*

- `https://rs1.[LFICode].apihub.openfinance.ae/open-finance/account-information/[Version]/account-access-consents`
- `https://rs1.[LFICode].apihub.openfinance.ae/open-finance/account-information/[Version]/account-access-consents/{ConsentId}`

**Resource Endpoints**

These endpoints are used to retrieve account information.

- Supported grant types: `authorization_code`, `refresh_token`

*Example endpoints:*

- `https://rs1.[LFICode].apihub.openfinance.ae/open-finance/account-information/[Version]/accounts`
- `https://rs1.[LFICode].apihub.openfinance.ae/open-finance/account-information/[Version]/accounts/{AccountId}/balances`
- `https://rs1.[LFICode].apihub.openfinance.ae/open-finance/account-information/[Version]/accounts/{AccountId}/transactions`

<br>

## API Family – `confirmation`

This family includes endpoints related to the discovery and confirmation of bank account details, such as verifying account ownership before initiating payments.
- These endpoints are part of the [Confirmation of Payee](../v2.1/banking/confirmation-of-payee/) functionality and are associated with the **BSIP** role.
- Allowed API scopes: `openid payments`
- Supported grant types: `client_credentials`

*Resource Endpoint examples:*
- `https://rs1.[LFICode].apihub.openfinance.ae/open-finance/confirmation-of-payee/[Version]/confirmation`
- `https://rs1.[LFICode].apihub.openfinance.ae/open-finance/confirmation-of-payee/[Version]/discovery`

<br>

## API Family – `product`

This family includes endpoints related to the discovery of banking products and posting a user who is interested in applying for a banking product.
- Associated with the **BDSP** role.
- Allowed API scopes: `openid accounts`
- Supported grant types: `client_credentials`

*Resource Endpoint examples:*
- `https://rs1.[LFICode].apihub.openfinance.ae/open-finance/product/[Version]/products`
- `https://rs1.[LFICode].apihub.openfinance.ae/open-finance/product/[Version]/leads`
