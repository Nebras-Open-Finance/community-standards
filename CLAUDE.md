# CLAUDE.md

## 🧭 Purpose

This repository defines **technical standards and documentation for UAE Open Finance**, including:

- TPP (Third-Party Provider) standards
- LFI (Licensed Financial Institution) integration via API Hub
- OpenAPI specifications (source of truth)
- Consent, authentication, and authorization flows

Claude is used to **generate, refine, and validate documentation**. It must strictly adhere to the architecture and invariants defined below.


## 🏗️ Core Architecture (NON-NEGOTIABLE)

### System Actors

- **TPP (Third-Party Provider)**  
  Consumes Open Finance APIs via API Hub

- **LFI (Licensed Financial Institution)**  
  Provides financial data and payment execution capabilities

- **API Hub (Nebras platform, operated by Nebras with vendor support from Ozone API)**  
  Central platform that:
  - Acts as **OIDC Authorization Server**
  - Acts as **Resource Server**
  - Acts as **Open Finance Gateway**
  - Stores and manages **consents (source of truth)**
  - Enforces schemas and standards
  - Proxies all requests to LFIs


## 🔒 Architectural Invariants (CRITICAL)

Claude MUST NOT violate these:

### 1. Strict Mediation
- ❌ TPPs NEVER call LFIs directly  
- ✅ ALL traffic flows through API Hub

---

### 2. Centralized Consent
- ✅ Consents are **created, stored, and managed ONLY in API Hub**
- ✅ API Hub is the **single source of truth**
- ❌ LFIs MUST NOT maintain independent consent state

---

### 3. Token Issuance
- ✅ ONLY API Hub issues access tokens
- ❌ LFIs NEVER issue tokens

---

### 4. Authentication Flow
- ✅ PSU (customer) authenticates **at the LFI**
- ✅ Flow:
  1. TPP initiates consent (PAR)
  2. API Hub handles authorization request
  3. User is redirected to LFI application
  4. LFI authenticates and authorizes PSU
  5. Result is returned to API Hub

---

### 5. Request Flow

**Canonical flow:**

TPP → API Hub → LFI → API Hub → TPP

- API Hub:
  - Validates token and consent
  - Enforces OpenAPI schemas
  - Enriches request (customerId, accountIds, TPP information)
  - Proxies request to LFI

- LFI:
  - Executes business logic
  - Returns response

---

### 6. Trust Model
- ✅ LFIs trust API Hub for:
  - Token validation
  - Consent validation
- ❌ LFIs do NOT re-validate consent independently

---

### 7. API Responsibilities

#### API Hub
- Consent management
- Token issuance (OIDC / FAPI aligned)
- Request validation
- Response normalization
- Error mapping

#### LFI
- Exposes APIs (via Ozone Connect), e.g.:
  - `GET /accounts`
  - `POST /payments`
- Retrieves data and executes actions
- Performs fraud and risk checks
- Supports consent authorization journeys
- Integrates with API Hub consent services where required

---

### 8. Error Handling
- LFI returns errors per LFI OpenAPI specification
- API Hub:
  - Maps errors to TPP standard
  - Normalizes responses

---

### 9. OpenAPI is the Source of Truth
- ✅ ALL API behavior MUST align with OpenAPI specs in:
  `docs/public/openapi/`
- ❌ Claude MUST NOT invent fields, endpoints, or schemas
- ✅ When unsure, infer from spec structure — never from assumptions


## 🔐 Standards Alignment

System is aligned with:
- OpenID Connect (OIDC)
- Financial-grade API (FAPI)
- UK Open Banking (adapted for UAE context)

Adaptations include:
- UAE-specific identity (e.g. Emirates ID)
- Islamic finance product support


## 🧠 Claude Behaviour Rules

### DO

- Use precise terminology:
  - “API Hub”
  - “LFI”
  - “TPP”
- Follow actual request flows strictly
- Reference OpenAPI specifications frequently
- Use normative language where appropriate:
  - MUST, SHOULD, MAY
- Keep TPP and LFI responsibilities clearly separated

---

### DO NOT

- ❌ Invent alternative architectures
- ❌ Suggest direct TPP → LFI communication
- ❌ Move consent storage to LFI
- ❌ Allow LFI token issuance
- ❌ Merge API Hub and LFI responsibilities
- ❌ Create endpoints not defined in OpenAPI
- ❌ Confuse authentication (LFI) with authorization server (API Hub)


## ✍️ Writing Style Guidelines

### Technical Standards
- Formal, RFC-style language
- Explicit responsibilities
- Clear sequencing
- No ambiguity

### Integration Guides (LFI / TPP)
- Step-by-step instructions
- Implementation-focused
- Practical and concrete

### Avoid
- Marketing language
- Vague phrasing
- Unsupported assumptions


## 🔁 Consent Lifecycle (Canonical)

1. TPP creates consent (via PAR)
2. Consent is stored in API Hub
3. PSU authenticates at LFI
4. Consent is authorized
5. TPP uses access token to call APIs
6. API Hub validates consent on every request
7. Consent may be revoked:
   - via TPP
   - via LFI
   - MUST be synchronized to API Hub immediately



## ⚠️ Critical Reminder

When generating content:

- API descriptions → MUST align with OpenAPI specs  
- Flows → MUST follow architectural invariants  
- Roles → MUST remain strictly separated  

**Guiding principle:**
- API Hub = control plane  
- LFI = execution layer  
