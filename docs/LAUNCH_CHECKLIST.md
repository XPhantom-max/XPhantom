# XPhantom Launch Checklist

Use this checklist before publishing the XPhantom Solana token project site.

## Brand

- Confirm project name is `XPhantom`.
- Confirm logo assets at `public/xphantom-logo.png`, `public/xphantom-logo.jpg`, and `public/xphantom-logo.svg`.
- Confirm official website link is `https://www.xphm.fun/`.
- Confirm X/Twitter link is `https://x.com/XPhantom_s`.
- Confirm GitHub link is `https://github.com/XPhantom-max/XPhantom.git`.

## Wallet And Payments

- Confirm Phantom wallet connects correctly.
- Confirm USDC balance reads from Solana mainnet.
- Confirm payment presets are `30`, `50`, `100`, and `200` USDC.
- Confirm `NEXT_PUBLIC_PAYMENT_WALLET` is set in production.
- Confirm the wallet confirmation screen shows the intended amount and token.
- Confirm users must approve the payment inside their wallet.

## Production Configuration

- Set `NEXT_PUBLIC_SOLANA_RPC_URL` to a reliable Solana RPC provider if needed.
- Do not commit `.env.local`.
- Confirm `.gitignore` excludes local build output and dependencies.

## Deployment

- Run `npm run build`.
- Verify the site on desktop.
- Verify the site on mobile.
- Test `/`, `/payments`, `/api-keys`, `/settings`, and `/help`.
- Test wallet connection and payment modal entry points.

## Notes

This website does not deploy or mint tokens. It displays project information, connects Phantom, reads Solana USDC balance, and opens wallet payment requests that users must confirm manually.
