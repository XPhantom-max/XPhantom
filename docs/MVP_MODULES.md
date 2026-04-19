# XPhantom MVP Modules

This document defines the first production-ready MVP scope for the XPhantom Solana token project.

## First Principles

A token project website has to solve five basic problems before adding complexity.

1. Users must recognize the project.
2. Users must find and verify the CA.
3. Users must be able to connect a wallet.
4. Users must have a clear action that creates commitment.
5. The team must be able to update launch-critical information safely.

The MVP is therefore the smallest complete loop:

`Discover XPhantom -> Verify CA -> Connect Phantom -> Purchase USDC task -> Join the community`

## Module 1: Project Identity

Goal: Make the project recognizable and easy to share.

Current implementation:

- XPhantom name and logo.
- X link: `https://x.com/XPhantom_s`.
- GitHub link placement.
- Responsive brand shell on desktop and mobile.

Acceptance criteria:

- The first screen shows the project name.
- The logo is visible.
- X and GitHub links are reachable.

## Module 2: Live CA Publishing

Goal: Let the team update the CA without rebuilding or redeploying the site.

Current implementation:

- Hidden developer admin opened by clicking the avatar or logo five times.
- Password protected admin modal.
- CA validation for EVM-style and base58 addresses.
- Runtime config saved to `data/runtime-config.json`.
- CA chip with copy support.

Acceptance criteria:

- Admin opens from modern pages and snapshot pages.
- Password gate works.
- Saved CA appears on the live page.
- CA can be copied.

## Module 3: Wallet And Payment

Goal: Let users connect Phantom and start a real payment flow.

Current implementation:

- Phantom wallet detection.
- Phantom connect flow.
- Solana mainnet USDC balance read.
- Payment presets: `30`, `50`, `100`, and `200` USDC.
- Payment deep link to the treasury wallet.

Acceptance criteria:

- Users can connect Phantom.
- The app reads the connected USDC balance.
- The payment modal opens from primary CTAs.
- The wallet confirmation screen receives the intended recipient and amount.

## Module 4: Conversion Layer

Goal: Give each visitor one clear next action.

Current implementation:

- Start payment CTA.
- Copy CA action.
- Open X action.
- GitHub link placement.
- Global interaction handling for legacy snapshot buttons.

Acceptance criteria:

- Buttons are clickable.
- Primary buttons do not dead-end.
- Static snapshot buttons route to the intended live features.

## Module 5: Trust Narrative

Goal: Give the token project a product direction beyond a static landing page.

Current implementation:

- Agent network display.
- Proof stream display.
- Sealed memory display.
- Settlement ledger display.
- MVP module section explaining the product loop.

Acceptance criteria:

- Visitors can understand the privacy AI/runtime theme.
- The dashboard communicates a credible future product direction.
- The MVP section explains what is live now.

## Module 6: Launch Operations

Goal: Make the repository safe and clear enough to upload to GitHub.

Current implementation:

- README.
- Environment example.
- Launch checklist.
- Git history.
- Ignored local runtime config and environment files.

Acceptance criteria:

- `npm run build` passes.
- No local secrets are committed.
- Documentation explains how to run, build, and launch.
- Source files do not contain Chinese text or Chinese comments.

## Out Of Scope For MVP

- Token mint deployment.
- Smart contract code.
- Automated on-chain transfer execution from the website.
- Custodial wallet logic.
- Full backend database.
- Analytics dashboard.
- User accounts.

## Next Expansion

- Tokenomics page.
- Roadmap page.
- Community task system.
- Admin-editable social links.
- Admin-editable payment tiers.
- Admin-editable treasury wallet.
- Public transaction status page.
