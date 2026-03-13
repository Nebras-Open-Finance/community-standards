---
next: false
prev: false
aside: false
---

# Getting Started as an LFI

This page outlines the end-to-end journey for a Licensed Financial Institution (LFI) integrating with the UAE Open Finance API Hub — from initial onboarding in the sandbox environment through to live operation with TPPs.

Follow the steps in order. Each stage builds on the previous one.


## 1. Onboard to the Sandbox Trust Framework

Register your organisation with the UAE Open Finance Trust Framework in the sandbox environment. This involves submitting your organisation details, uploading your transport and signing certificates, and creating your API Hub application with the appropriate roles. The Trust Framework acts as the central directory of participants — you must be registered before you can connect to anything else.


## 2. Set Up and Connect to the Pre-Production API Hub

The UAE Open Finance API Hub (powered by Ozone) is the central intermediary platform operated by Nebras. It sits between Licensed Financial Institutions (LFIs) and Third-Party Providers (TPPs), handling security enforcement, consent lifecycle management, API routing.

As an LFI, you connect to the Hub once and it manages the complexity of multi-TPP interoperability, FAPI 2.0 security, and regulatory compliance on your behalf.

Complete the prerequisits, application layer and mTLS authentication steps. Configure your own sandbox/uat resources against the pre-production Hub and verify that end-to-end connectivity is established.



## 3. Develop Your Open Finance APIs

Implement the Open Finance API endpoints that the Hub will route TPP requests to. This covers the consent management required on your, banking data sharing APIs (accounts, balances, transactions, and related endpoints), payment initiation endpoints, and Confirmation of Payee.


## 4. Test and Certify Your Open Finance Capabilities

< ADD LATER >


## 5. Onboard to the Production Trust Framework

Once certified, repeat the Trust Framework registration process in the production environment.


## 6. Set Up and Connect to the Production API Hub

Repeat the API Hub connectivity setup in production. Configure your production resources against the production Hub endpoints setup mTLS in production and verify that end-to-end connectivity is established.


## 7. Validate Your APIs in Production

Run a pre-live validation pass against the production environment using controlled test accounts. Confirm that the full consent, data sharing and payment flows function correctly in production. Ensure that your error handling and audit logging are operating as expected. No real customer traffic should be processed at this stage.

## 8. Publish Your Open Finance Resources to the Ecosystem

In the Trust Framework, add your certified production API resources with structured metadata that describes them. Publishing this information makes your resources discoverable to TPPs across the ecosystem, allowing them to identify and connect to your APIs. 

## 9. Live Proving with TPPs

Work with a couple of TPPs to run controlled testing of the production resources. These sessions validate the full end-to-end flows using real customers. Successful live proving confirms your integration is ready for go live, open production use.
