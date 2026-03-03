# Contributing

Thank you for helping improve these Open Finance Postman collections.

## Ways to contribute

- **Bug fixes** — A request that no longer works, a broken test script, or an incorrect endpoint path
- **New API versions** — When CBUAE publishes a new spec version, add a parallel folder following the existing pattern
- **New endpoints** — Endpoints from the published spec that are missing from a collection
- **Documentation** — Improvements to README or inline request descriptions
- **Environment variables** — New variables needed for updated flows

## Before you start

- Check existing [issues](../../issues) to avoid duplicate work
- For significant changes (new version, structural refactor) open an issue first to discuss the approach

## How to submit a change

1. Fork this repository
2. Create a branch: `git checkout -b feat/banking-v2.1` (use a descriptive name)
3. Make your changes in Postman, then export the collection as **Collection v2.1** format
4. Replace the relevant `.json` file with the exported file
5. Update [README.md](README.md) if you have added new folders, endpoints, or variables
6. Open a Pull Request with a clear description of what changed and why

## Collection export format

Always export as **Postman Collection v2.1** (the default in current Postman versions). Do not commit v2.0 format files.

## Keeping collections clean

- Remove any personal `client_id`, keys, or credentials before committing — use `{{variable}}` placeholders
- Do not hard-code sandbox URLs that may change; use environment variables
- Keep request names consistent with the existing numbering scheme (e.g. `4000: TPP-API Hub: POST to PAR end-point`)
- Preserve existing folder structure when adding endpoints to an existing version

## Reporting issues

Open a GitHub issue with:
- Which collection and folder the problem is in
- What you expected to happen
- What actually happened (response body / status code)
- The Postman version and OS you are using

## Code of conduct

Be respectful and constructive. This is a community resource for the Open Finance ecosystem.
