---
next: false
prev: false
---

# Erratas

Erratas are the authoritative register of post-publication corrections to **published documentation** — the TPP Standards, LFI Integration Guide, and OpenAPI specifications. Each entry records what was corrected, why it was required, and the effective date.

Erratas are organised by standard version. Once a version is published, its existing content MUST NOT be changed without an associated Errata record.

## Operating Rules

- Each Errata entry MUST have a unique identifier in the form `<version>-errata<n>` (for example, `v2.1-errata1`).
- Each entry MUST state:
  - affected document(s) and section(s)
  - what changed
  - why the change was required
  - effective date
- Existing published content MUST NOT be changed without an associated Errata record.
- Pre-publication content (for example `-rc`, `-rc-final`) can be updated without an Errata.

---

For changes to **operational systems** (API Hub, Trust Framework) rather than documentation, see [Release Notes](../release-notes/). Refer to [Changes to Published Documentation](/policy/changes-to-published-content) and [Version Management](/policy/version-management) for the policy controls.
