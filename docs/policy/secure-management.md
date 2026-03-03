---
next: false
prev: false
---

# Secure Management of Keys and Credentials in UAE Open Finance

## Aplies to

- **Licensed Financial Institutions (LFIs)**
- **Third-Party Providers (TPPs)**
- **Ozone API Hub** 

## Purpose
This document establishes **mandatory and recommended practices** for the secure management of cryptographic keys and credentials within the **UAE Open Finance ecosystem**.  


The goal is to:
- Ensure compliance with UAE regulations
- Protect organizational and user data
- Maintain trust across the Open Finance ecosystem
- Enable secure, consented data sharing


## Scope
This policy covers:

- Generation, storage, use, rotation, revocation, and destruction of cryptographic keys and credentials  
- Authentication, authorization, and token handling in Open Finance APIs and consent flows  
- Integration with **Key Management Systems (KMS)**, **Hardware Security Modules (HSMs)**, and other cryptographic infrastructure  
- Roles and responsibilities for LFIs, TPPs, and ecosystem participants


## Regulatory Foundation
While the UAE does not mandate a single “key management statute,” organizations are required to implement robust security controls under:

- **Information Assurance Regulation**
- **CBUAE Open Finance guidelines**

**Key Requirements:**

- **Key lifecycle management:** secure generation, storage, distribution, rotation, revocation, and destruction  
- **Protection of sensitive material:** secret and private keys must be protected against unauthorized access, loss, or disclosure  
- **Auditing and logging:** all key usage and lifecycle activities must be logged and auditable  
- **Certification and revocation:** procedures to maintain trust across ecosystem participants  

LFIs and TPPs must implement these controls to ensure **confidentiality, integrity, and availability** of Open Finance systems.

## Statement
All ecosystem participants should:

### 1. Adopt Secure Cryptographic Infrastructure
- Use **FIPS 140-3 certified HSMs** for key generation, signing, encryption, and storage  
- Ensure centralized key management using modern **KMS** (on-premises or cloud) that supports UAE data governance and local control principles, such as data residency and access controls  

### 2. Implement Key Lifecycle Controls
- Rotate transport and signing keys at least **every 13 months** or more frequently if mandated  
- Define clear policies for key **expiration, recovery, and destruction**  
- Maintain **audit logs** of all key usage  

### 3. Enforce Strong Authentication
- Use phishing-resistant, modern authentication methods:
  - **FIDO2 / Passkeys** for customer authentication  
  - **OAuth 2.0 + FAPI 2.0** for secure API access  
  - **Mutual TLS (mTLS)** for client-server authentication  
- Ensure secure handling of **credentials and tokens** throughout consent and API flows  

### 4. Apply Access Management Best Practices
- Implement **role-based access control (RBAC)** and **separation of duties** for key access  
- Limit key access to **authorized personnel and system components only**  

### 5. Retain Cryptographic Control with BYOK/MYOK
- LFIs may use **Bring Your Own Key (BYOK)** or **Manage Your Own Key (MYOK)** strategies to maintain control over sensitive key material while leveraging cloud infrastructure  



## Conclusion
Secure key and credential management is a **regulatory requirement, operational imperative, and trust enabler** in the UAE Open Finance ecosystem.  

By implementing:
- Hardware-backed cryptography  
- Modern authentication standards  
- Robust key lifecycle management  
- Strong access controls  

LFIs and TPPs can:

- Protect user and organizational data  
- Maintain regulatory compliance  
- Enable secure, consented financial data sharing  
- Foster trust and resilience across the Open Finance ecosystem  


## References
1. [UAE Information Assurance Regulation – TDRA (PDF)](https://tdra.gov.ae/-/media/About/regulations-and-ruling/EN/UAE-Information-Assurance-Regulation-v1-1-pdf.ashx) – Official TDRA regulation document on information assurance requirements in the UAE. 

2. [CBUAE Rulebook – Open Finance Regulation](https://rulebook.centralbank.ae/en/rulebook/open-finance-regulation-0) – Central Bank of the UAE’s Open Finance Regulation page (includes security and operational requirements).

3. [FIPS 140‑3 Cryptographic Module Validation Program – NIST](https://csrc.nist.gov/projects/cryptographic-module-validation-program) – U.S. National Institute of Standards and Technology’s (NIST) standard for validated cryptographic modules. 

4. [UAE National Cybersecurity Strategy (TRA PDF)](https://www.tra.gov.ae/userfiles/assets/Lw3seRUaIMd.pdf) – National cybersecurity strategy framework guiding UAE cybersecurity and digital resilience.