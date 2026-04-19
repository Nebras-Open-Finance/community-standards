---
next: false
prev: false
aside: false
---

# UAE Open Finance Architecture

The **UAE Open Finance Platform** (AlTareq) is the national ecosystem that lets TPPs and LFIs securely share customer data and initiate payments with explicit consent.

It provides one unified API layer for the entire country, managed by the Central Bank of the UAE and operated by **Nebras**.


## What is the UAE Open Finance Platform?

A single, standardized gateway — the **API Hub** — sits between Third-Party Providers (TPPs) and all participating Licensed Financial Institutions (LFIs). Every LFI has its own tenant inside the Hub, and all TPP traffic flows through it rather than directly to an LFI.

This gives developers **one integration point** to reach the whole ecosystem, with **consent, tokens, schemas, and routing** handled centrally. The **AlTareq Trust Framework** underpins it all as the participant directory, certificate authority, and source of role and scope truth.

These developer docs are organised around the audiences and artefacts you will work with:


## TPP – Open Finance Standards

The normative specification for everything a TPP needs to integrate with the UAE Open Finance ecosystem: API surfaces, FAPI-aligned security, consent and authorisation flows, user experience requirements, and onboarding through the Trust Framework.

Start here if you are **building an application that consumes Open Finance APIs** — account information, payment initiation, or any other regulated service.

[Go to TPP – Open Finance Standards →](/tech/tpp-standards/)

## LFI – Integration Guide

The implementation guide for LFIs connecting to the API Hub. Covers the APIs each LFI must implement (via Ozone Connect), the authentication and consent touchpoints exposed by the Hub, admin-portal operations, and the onboarding steps required to become a live participant.

Start here if you are an **LFI preparing to provide Open Finance services**.

[Go to LFI – Integration Guide →](/tech/lfi-api-hub/)

## API Specs

The OpenAPI specifications are the **source of truth** for every API in the ecosystem. They are maintained in a dedicated repository and split by audience:

- **Standards** — what the API Hub exposes to TPPs
- **API Hub** — what the API Hub exposes to LFIs
- **Ozone Connect** — what LFIs must implement for the Hub to call

[Go to API Specs →](/tech/api-specs/v2.1)

## Knowledge Base

Practical, searchable articles that sit alongside the standards — deep dives, worked examples, and answers to common integration questions. Useful when you need context beyond what the specification alone provides.

[Go to Knowledge Base →](/knowledge-base/)

## Erratas

The authoritative register of post-publication corrections to published versions of the TPP Standards and LFI Integration Guide. Each entry records what changed, why, and when it became effective.

[Go to Erratas →](/tech/erratas/v2.1)
