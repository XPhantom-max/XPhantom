export const mvpLoop = [
  "Discover XPhantom",
  "Verify CA",
  "Connect Phantom",
  "Purchase USDC task",
  "Join the community",
];

export const mvpModules = [
  {
    id: "identity",
    icon: "sparkles",
    title: "Project Identity",
    principle: "A token project must be recognizable before it can be trusted.",
    outcome: "XPhantom brand, logo, social links, and project narrative are visible from the first screen.",
    status: "Live",
  },
  {
    id: "ca",
    icon: "key",
    title: "Live CA Publishing",
    principle: "The contract address is the source of truth users need most.",
    outcome: "Hidden developer admin updates the CA without rebuilding; users can view and copy it instantly.",
    status: "Live",
  },
  {
    id: "wallet",
    icon: "wallet",
    title: "Wallet And Payment",
    principle: "A user should be able to verify funds and act without leaving the flow.",
    outcome: "Phantom connection, real Solana USDC balance read, and preset USDC payment requests.",
    status: "Live",
  },
  {
    id: "conversion",
    icon: "rocket",
    title: "Conversion Layer",
    principle: "Every page should have one clear next action.",
    outcome: "Copy CA, open X, connect wallet, purchase task credits, and navigate GitHub from key surfaces.",
    status: "Live",
  },
  {
    id: "trust",
    icon: "shield",
    title: "Trust Narrative",
    principle: "Users need a reason to believe the token has a product direction.",
    outcome: "Dashboard modules show privacy agents, proof streams, sealed memory, and settlement activity.",
    status: "MVP",
  },
  {
    id: "ops",
    icon: "check",
    title: "Launch Operations",
    principle: "A project is not ready if the team cannot safely ship and update it.",
    outcome: "README, env example, launch checklist, git history, and ignored local secrets are prepared.",
    status: "Ready",
  },
];
