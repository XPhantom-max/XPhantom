# XPhantom Launch Checklist

Use this checklist before publishing the XPhantom Solana token project site.

## Brand

- Confirm project name is `XPhantom`.
- Confirm logo asset at `public/xphantom-logo.jpg`.
- Confirm X/Twitter link is `https://x.com/XPhantom_s`.
- Confirm GitHub link is correct before public launch.

## Token And CA

- Confirm final token CA before sharing publicly.
- Open hidden developer admin by clicking the avatar/logo 5 times.
- Login with the production admin password.
- Save the CA and verify it appears on desktop and mobile.
- Click the CA chip and confirm copy works.

## Wallet And Payments

- Confirm Phantom wallet connects correctly.
- Confirm USDC balance reads from Solana mainnet.
- Confirm payment presets are `30`, `50`, `100`, and `200` USDC.
- Confirm recipient wallet is `FA9se1UMmzuuUSKvEDqaBKPqCL4vexsKU6cQ1QGgSRJr`.
- Confirm the wallet confirmation screen shows the intended amount and token.

## Production Secrets

- Change `DEV_ADMIN_PASSWORD` before public deployment.
- Set a long random `DEV_ADMIN_SECRET`.
- Set `NEXT_PUBLIC_SOLANA_RPC_URL` to a reliable Solana RPC provider if needed.
- Do not commit `.env.local` or `data/runtime-config.json`.

## Deployment

- Run `npm run build`.
- Verify the site on desktop.
- Verify the site on mobile.
- Test `/`, `/payments`, `/api-keys`, `/settings`, and `/help`.
- Test hidden admin on both the modern dashboard pages and legacy snapshot pages.

## Notes

This website does not deploy or mint tokens. It displays project information, exposes a runtime CA field, connects Phantom, reads Solana USDC balance, and opens wallet payment requests that users must confirm manually.
