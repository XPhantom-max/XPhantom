# XPhantom

<p align="center">
  <picture>
    <source srcset="./public/xphantom-logo.svg" type="image/svg+xml">
    <img src="./public/xphantom-logo.jpg" width="132" height="132" alt="XPhantom logo">
  </picture>
</p>

<p align="center">
  <strong>Solana token project site with Phantom wallet connection, USDC balance checks, and payment actions.</strong>
</p>

<p align="center">
  <a href="https://x.com/XPhantom_s">X / Twitter</a>
  |
  <a href="https://www.xphm.fun/">Official Website</a>
  |
  <a href="https://github.com/XPhantom-max/XPhantom.git">GitHub Repository</a>
  |
  <a href="./docs/MVP_MODULES.md">MVP Modules</a>
  |
  <a href="./docs/LAUNCH_CHECKLIST.md">Launch Checklist</a>
</p>

The README logo uses an SVG source with a JPG fallback so renderers that block SVG previews can still display the brand mark.

## Overview

XPhantom is a Solana-facing token project website and launch dashboard. The project combines a polished public landing experience, Phantom wallet connection, Solana USDC balance checks, payment request links, and a privacy-first AI/runtime narrative.

The MVP is built around one first-principles user loop:

`Discover XPhantom -> Connect Phantom -> Purchase USDC task -> Join the community`

The interface gives the token project a clear product direction beyond a static token landing page.

## Project Status

| Area | Status | Notes |
| --- | --- | --- |
| Brand shell | Ready | XPhantom name, logo, responsive shell, and social links are live. |
| Wallet connection | Ready | Phantom provider detection and wallet connection flow are implemented. |
| USDC balance | Ready | Connected wallet USDC balance is read through Solana JSON-RPC. |
| Payment flow | Ready | Preset USDC purchase tiers open a Solana payment deep link. |
| Static fallback pages | Ready | Legacy snapshot pages remain available and route key actions to live features. |
| GitHub readiness | Ready | README, launch checklist, MVP docs, and git history are prepared. |
| Token deployment | Out of scope | This repository does not deploy or mint a token. |

## Core Features

- Project landing and dashboard experience for XPhantom.
- SVG README logo with JPG fallback.
- Mobile and desktop responsive interface.
- Phantom wallet detection and connection.
- Real Solana mainnet USDC balance lookup.
- Task payment modal with `30`, `50`, `100`, and `200` USDC presets.
- Solana payment deep link for user-approved payment requests.
- Official website, X/Twitter, and GitHub link placement.
- Global interaction bridge for static snapshot buttons.
- English-only repository content for public GitHub upload.

## Project Links

| Name | Value |
| --- | --- |
| X / Twitter | https://x.com/XPhantom_s |
| Official website | https://www.xphm.fun/ |
| GitHub repository | https://github.com/XPhantom-max/XPhantom.git |
| Default Solana RPC | `https://api.mainnet-beta.solana.com` |

## Technical Architecture

```mermaid
flowchart LR
  Visitor["Visitor"] --> UI["Next.js App Router UI"]
  UI --> Shell["Dashboard shell and landing modules"]
  UI --> Wallet["Phantom wallet provider"]
  Wallet --> RPC["Solana JSON-RPC"]
  Wallet --> Pay["Solana payment deep link"]
  RPC --> Balance["USDC balance"]
  Pay --> WalletConfirm["User wallet confirmation"]
```

## MVP User Flow

```mermaid
sequenceDiagram
  participant User
  participant Site as XPhantom Site
  participant Phantom
  participant Solana as Solana RPC

  User->>Site: Open landing page
  User->>Site: Review product modules
  User->>Site: Open payment modal
  User->>Phantom: Connect wallet
  Phantom-->>Site: Return public key
  Site->>Solana: Read USDC token accounts
  Solana-->>Site: Return USDC balance
  User->>Phantom: Confirm payment request
```

## Functional Modules

| Module | Purpose | Main Files |
| --- | --- | --- |
| Project shell | Navigation, social links, layout, and responsive dashboard frame. | `components/dashboard-shell.js`, `components/runtime-logo.js` |
| Landing page | Public project narrative, MVP section, metrics, and dashboard preview. | `components/home-page.js`, `components/mvp-modules-section.js` |
| MVP data | First-principles MVP loop and module definitions. | `lib/data/mvp.js`, `docs/MVP_MODULES.md` |
| Wallet payments | Phantom connection, balance read, payment tiers, and Solana payment link. | `components/task-payment-provider.js` |
| Static snapshots | Legacy routes and captured pages kept available during the rebuild. | `components/snapshot-page.js`, `lib/snapshots.js`, `srcdump/` |
| Interaction bridge | Makes static snapshot buttons route to live wallet, payment, copy, and navigation actions. | `components/site-interactions-provider.js` |

## Repository Structure

```text
.
├── app/
│   ├── [[...slug]]/page.js
│   ├── globals.css
│   ├── layout.js
│   └── providers.js
├── components/
│   ├── dashboard-shell.js
│   ├── home-page.js
│   ├── mvp-modules-section.js
│   ├── site-interactions-provider.js
│   └── task-payment-provider.js
├── docs/
│   ├── LAUNCH_CHECKLIST.md
│   └── MVP_MODULES.md
├── lib/
│   ├── data/
│   ├── services/dashboard.js
│   └── snapshots.js
├── public/
│   ├── xphantom-logo.jpg
│   ├── xphantom-logo.png
│   └── xphantom-logo.svg
├── srcdump/
├── .env.example
├── package.json
└── README.md
```

## Tech Stack

- Next.js App Router
- React
- CSS with utility-class compatible styling
- Lucide React icons
- Phantom wallet provider
- Solana JSON-RPC

## Requirements

- Node.js 20 or newer
- npm
- Phantom wallet for wallet connection testing
- A Solana RPC endpoint for production usage

## Installation

```bash
npm install
```

## Local Development

```bash
npm run dev -- --hostname 127.0.0.1 --port 4177
```

Open:

```text
http://127.0.0.1:4177
```

## Configuration

Copy the example environment file:

```bash
cp .env.example .env.local
```

Available variables:

| Variable | Required | Default | Description |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_SOLANA_RPC_URL` | No | `https://api.mainnet-beta.solana.com` | Solana RPC endpoint used for USDC balance reads. |
| `NEXT_PUBLIC_PAYMENT_WALLET` | Yes for payments | None | Solana wallet used by generated payment links. |

Example:

```bash
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
NEXT_PUBLIC_PAYMENT_WALLET=replace-with-payment-wallet
```

## Usage

### Connect Wallet

1. Install Phantom.
2. Open the XPhantom site.
3. Click `Connect` or open the payment modal.
4. Approve the Phantom connection request.
5. Confirm the USDC balance appears in the payment modal.

### Start Payment

1. Open the payment modal.
2. Select a preset amount.
3. Click the primary payment button.
4. Confirm the request inside Phantom.

The website creates a wallet payment request. It does not transfer funds without user approval inside the wallet.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local development server. |
| `npm run build` | Create a production build. |
| `npm run start` | Start the production server after build. |

## Build

```bash
npm run build
```

## Production Deployment

1. Set production environment variables.
2. Run `npm run build`.
3. Deploy to a Next.js compatible host.
4. Verify the site on desktop.
5. Verify the site on mobile.
6. Test `/`, `/payments`, `/api-keys`, `/settings`, and `/help`.

See `docs/LAUNCH_CHECKLIST.md` before public launch.

## Quality Checks

Before uploading to GitHub or deploying:

```bash
npm run build
git status --short
```

Optional repository language scan:

```bash
rg -n -P "[\\p{Han}\\p{Hiragana}\\p{Katakana}\\p{Hangul}]" --glob '!node_modules/**' --glob '!.next/**' --glob '!site/**' --glob '!.git/**'
```

The repository is intended to remain English-only. Communication outside the repository can be in any language.

## Project Highlights

- Wallet and payment functionality connected to the core landing page.
- Static snapshot routes are bridged into live React actions.
- README-ready SVG logo with JPG fallback.
- Clear MVP scope based on a real user loop.
- Public GitHub documentation is included.

## Roadmap

| Timeline | Stage | Scope | Status |
| --- | --- | --- | --- |
| April 2026 | MVP | Brand, wallet connection, payment flow, docs, and launch checklist. | Complete |
| May 2026 | V1 | Public tokenomics page, roadmap page, and announcement banner. | Planned |
| June 2026 | V2 | Community task system and richer payment status guidance. | Planned |
| July 2026 | V3 | Transaction status page, analytics, and optional backend persistence. | Planned |
| August 2026 | V4 | Production monitoring, richer QA checks, and release automation. | Planned |

## Security Notes

- This repository is not a token deployment repository.
- The website does not mint tokens.
- The website does not custody user funds.
- The website does not transfer funds without wallet confirmation.
- Do not commit `.env.local`.

## FAQ

### Is this a token deployment repository?

No. This is the public website and launch dashboard for the XPhantom Solana token project. Token minting or deployment must be handled separately.

### Does the payment button move funds automatically?

No. The payment flow opens a Solana wallet payment request. The user must confirm the transaction inside Phantom.

### Why does the README use both SVG and JPG logos?

Some renderers block or fail to preview SVG files. The README uses a `<picture>` block so SVG-capable renderers use the vector logo and other renderers fall back to the JPG asset.

### Can the GitHub link be changed?

Yes. The current social links live in `components/dashboard-shell.js`.

## License

No license has been selected yet. Add a license before public open-source distribution if external reuse should be allowed.
