---
next: false
prev: false
aside: false
---

# UAE Open Finance Architecture

The **UAE Open Finance Platform** (AlTareq) is the national ecosystem that lets TPPs and LFIs securely share customer data and initiate payments with explicit consent.

It provides one unified API layer for the entire country, managed by the Central Bank of the UAE and operated by **Nebras**.


## What is the UAE Open Finance Platform?

A single, standardized API gateway that connects Third-Party Providers (TPPs) to all participating Licensed Financial Institutions (LFIs) across banking, insurance, and FX.

**One integration point** for developers.  
**Full regulatory compliance** built-in.  
**Centralized consent and security** handled by the platform.


---

<pre style="margin-top: 5%; margin-left: 5%;">
+======================================================================+
|                  AlTareq Trust Framework (Directory)                 |
|----------------------------------------------------------------------|
|                                                                      |
|                      +-------------------------+                     |
|                      |           TPP           |                     |
|                      +------------+------------+                     |
|                                   |                                  |
|                 +-----------------+-----------------+                |
|                 |                 |                 |                |
|             +---v---+         +---v---+         +---v---+            |
|             |API Hub|         |API Hub|   ...   |API Hub|            |
|             +-------+         +-------+         +-------+            |
|                 |                 |                 |                |
|                 |                 |                 |                |
|             +---v---+         +---v---+         +---v---+            |
|             | LFI 1 |         | LFI 2 |   ...   | LFI N |            |
|             +-------+         +-------+         +-------+            |
|                                                                      |
+======================================================================+
</pre>

## Platform Architecture

### 1. AlTareq Trust Framework (Directory)
The single source of truth for the ecosystem:
- Participant registry
- Digital certificate management
- API discovery
- Role & scope validation

### 2. Centralized API Hub
The UAE’s unique differentiator.  
Every LFI has its own tenant inside the Hub.  
All TPP requests go through this Hub — never directly to an LFI.

This delivers consistent:
- Consent management
- Token lifecycle (access + refresh)
- Standardized API schemas
- Routing and auditing