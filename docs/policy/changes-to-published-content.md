---
next: false
prev: false
---

# Changes to Published Documentation Policy

## Applies to:

- **Nebras**

## Purpose

This policy defines how published documentation may be changed for:

- **TPP - Open Finance Standards**
- **LFI - API Hub Integration**

This policy is read alongside the [Version Management Policy](/policy/version-management).

## Policy Statement

### Published versions

For any **published** documentation version, content may only be changed through a formally published **Errata**.

- This applies to all normative and implementation-impacting content in published versions.
- Any correction or clarification made after publication must be traceable to a specific Errata identifier.
- The affected page/section should clearly display that it has been modified by Errata.


#### Errata Example


<ErrataNotice
  :affected="true"
  errata-id="v2.1-001"
  errata-url="/erratas"
>
  <h3>Consent State Transitions</h3>

  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

  <p>Original content that now no longer applies as the Errata clearly says their is new content that supersedes this.</p>

  <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
</ErrataNotice>

### Non-published versions

For **non-published** versions (for example `v3.1-rc` or `v3.1-rc-final`), content may be updated without issuing an Errata.

- These versions remain draft/pre-publication artifacts.
- Normal review and approval controls still apply.
- Once the version is published, post-publication changes must follow the Errata process.


## Governance

Nebras is responsible for enforcing this policy across published documentation baselines for both TPP and LFI documentation sets.
