---
prev: false
next: false
aside: false
---

# Payment Rails

When a domestic payment is initiated through UAE Open Finance, the LFI routes it to the appropriate underlying payment rail. The rail used depends on whether the debtor and creditor accounts are held at the same institution or different ones. The TPP does not select or control which rail is used.

There are three rails in scope:



## InterBank

Used when the debtor and creditor accounts are held at the **same LFI** — for example, a FAB account paying to another FAB account.

InterBank payments are processed entirely within the LFI's own systems. Settlement is typically near-instant as no external network is involved.



## AANI (Instant Payment)

Used for **inter-bank transfers** — for example, FAB to Emirates NBD.

**AANI** (Abu Dhabi National Network for Instant Payments) is the UAE Central Bank's domestic instant payment infrastructure. It operates 24/7/365, processes in seconds, and is the primary rail for inter-bank Open Finance payments.

The UAE Open Finance specification is aligned as closely as possible to the AANI scheme rules — including its amount limits, data requirements, and status model. When building against these APIs, developers should treat AANI behaviour as the primary reference.

::: info Amount limits
AANI enforces a per-transaction amount limit. Payments that exceed this limit cannot be processed over AANI and will be rejected. Check the current CBUAE-published AANI scheme rules for the active limit.
:::



## FTS (Funds Transfer System)

**FTS** is the UAE Central Bank's legacy inter-bank funds transfer system. In the context of Open Finance payments, FTS serves as a **fallback** — it is used for inter-bank transfers only when AANI is unavailable.

FTS does not operate 24/7 and has different settlement timing characteristics to AANI. Payments processed via FTS will follow FTS settlement windows rather than instant settlement.

