---
next: false
prev: false
aside: false
---

🕒 **7 minute read**

# Sandbox | Model Bank

To support onboarding and early development, a Model Bank has been deployed within the sandbox environment. This simulated Licensed Financial Institution mirrors the structure and behavior of a real LFI, providing TPPs with a safe, compliant space to test their end-to-end integration flows.

The Model Bank is registered in the Trust Framework and exposes Authorization Servers, discovery endpoints, and Open Finance APIs — just like any production LFI. TPPs can use it to:

- Explore API discovery via the `.well-known` endpoint
- Test registration with real (sandbox) software statements
- Validate certificate-based authentication and mutual TLS setups
- Simulate consent flows, account access, and payment initiation

## Model Bank Discovery

The `.well-known` endpoint for the Model Bank is:

`https://auth1.altareq1.sandbox.apihub.openfinance.ae/.well-known/openid-configuration`


The `.well-known` endpoint exposes the following critical information values:

| Field | Value |
|-------|-------|
| `issuer` | `https://auth1.altareq1.sandbox.apihub.openfinance.ae` |
| `authorization_endpoint` | `https://auth1.altareq1.sandbox.apihub.openfinance.ae/auth` |
| `par_endpoint` | `https://as1.altareq1.sandbox.apihub.openfinance.ae/par` |
| `token_endpoint` | `https://as1.altareq1.sandbox.apihub.openfinance.ae/token` |
| `registration_endpoint` | `https://rs1.altareq1.sandbox.apihub.openfinance.ae/tpp-registration` |
| `jwks_uri` | `https://keystore.sandbox.directory.openfinance.ae/233bcd1d-4216-4b3c-a362-9e4a9282bba7/application.jwks` |
| Resource Server (`rs`) | `https://rs1.altareq1.sandbox.apihub.openfinance.ae` |

## Model Bank Credentials

The Model Bank includes two pre-configured users, each with varied accounts. You can log in as either user to explore the various Open Finance capabilities.

**Model Bank Users**

| **User** | **Password** |
|----------|--------------|
| `mits`   | `mits`       |
| `rora`   | `rora`       |

**Mits Accounts:**

| AccountId                | SchemeName    | Identification | AccountType | Name                |
|--------------------------|---------------|----------------|-------------|---------------------|
| 100004000000000000000002 | AccountNumber | 10000109010102 | Corporate   | Luigi International |
| 100004000000000000000003 | AccountNumber | 10000109010103 | Retail      | Mario International |
| 100004000000000000000005 | IBAN          | 10000109010105 | Retail      | Spectrum            |

**Rora Accounts:**

| AccountId                | SchemeName    | Identification | AccountType | Name               |
|--------------------------|---------------|----------------|-------------|--------------------|
| 100004000000000000000001 | IBAN          | 10000109010101 | Retail      | Mario Current      |
| 100004000000000000000004 | AccountNumber | 10000109010104 | Corporate   | Luigi PrePaid Card |
| 100004000000000000000006 | AccountNumber | 10000109010106 | Corporate   | Peach Charge Card  |
| 100004000000000000000007 | IBAN          | 10000109010107 | Retail      | Bowser Other       |
| 100004000000000000000008 | IBAN          | 10000109010108 | Corporate   | Toadstool Current  |
| 100004000000000000000009 | AccountNumber | 10000109010109 | Retail      | Yoshi Savings      |
| 100004000000000000000010 | IBAN          | 10000109010110 | Corporate   | Koopa Credit Card  |
| 100004000000000000000011 | IBAN          | 10000109010111 | Retail      | Daisy PrePaid Card |

