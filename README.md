# XPhantom

XPhantom is a Solana-facing token project website and control dashboard. It combines a polished project landing page, Phantom wallet connection, Solana USDC payment flow, live contract address publishing, and a hidden developer admin panel for updating the CA without rebuilding the site.

The current product experience is designed around a privacy-first AI/runtime narrative for the XPhantom community, with social links, GitHub placement, wallet actions, purchase tiers, and mobile/desktop responsive layouts already built in.

## Features

- Solana wallet connection through Phantom.
- Real USDC balance lookup on Solana mainnet.
- Task purchase modal with `30`, `50`, `100`, and `200` USDC presets.
- Payment deep link to the project treasury wallet.
- Hidden developer admin opened by clicking the avatar/logo 5 times.
- Password protected CA update flow.
- Runtime CA sync through `data/runtime-config.json`, so the CA can update without redeploying.
- X/Twitter and GitHub link placement.
- Mobile and desktop responsive dashboard layout.
- Static snapshot fallback pages for legacy sections such as API Keys, Payments, Settings, and Help.

## MVP Modules

The first MVP is the shortest complete user loop:

`Discover XPhantom -> Verify CA -> Connect Phantom -> Purchase USDC task -> Join the community`

Core modules:

- Project identity and social links.
- Live CA publishing through the hidden developer admin.
- Phantom wallet connection and Solana USDC balance read.
- USDC payment request flow.
- Conversion layer for CA copy, wallet action, X, and GitHub.
- Launch operations with README, env example, and checklist.

See `docs/MVP_MODULES.md` for the full first-principles breakdown.

## Project Links

- X/Twitter: https://x.com/XPhantom_s
- Treasury wallet: `FA9se1UMmzuuUSKvEDqaBKPqCL4vexsKU6cQ1QGgSRJr`
- Default admin password: `123456789`

## Tech Stack

- Next.js App Router
- React
- CSS/Tailwind-style utility classes
- Solana Phantom wallet provider
- Solana JSON-RPC balance reads

## Getting Started

```bash
npm install
npm run dev -- --hostname 127.0.0.1 --port 4177
```

Open `http://127.0.0.1:4177`.

## Environment

Create a local `.env.local` if you want to override defaults:

```bash
DEV_ADMIN_PASSWORD=123456789
DEV_ADMIN_SECRET=replace-with-a-long-random-secret
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
```

## Developer Admin

The hidden admin is intentionally not shown in the normal navigation.

1. Open the site.
2. Click the XPhantom avatar/logo 5 times quickly.
3. Enter the developer password.
4. Paste the token CA.
5. Save, then the CA chip updates across the site.

The CA accepts either an EVM-style `0x` address or a 32-44 character base58 address.

## Important Files

- `components/task-payment-provider.js`: wallet connection, USDC balance, and payment modal.
- `components/developer-admin-provider.js`: hidden admin, password auth, and CA state.
- `components/dashboard-shell.js`: main dashboard navigation and social links.
- `lib/server/dev-admin.js`: runtime config storage and session validation.
- `app/api/dev-admin/route.js`: admin API for auth and CA updates.
- `public/xphantom-logo.jpg`: current XPhantom logo asset.

## Build

```bash
npm run build
npm run start
```

## Safety Notes

This repository contains frontend code for a token project website and payment experience. It is not a smart contract repository and does not mint, deploy, custody, or transfer tokens by itself. All wallet transfers are confirmed by the user's wallet. Always verify treasury addresses, token addresses, RPC settings, and production secrets before launch.
