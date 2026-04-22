"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { CheckCircle2, Copy, ExternalLink, RefreshCw, Shield, Wallet, X } from "lucide-react";

const PAYMENT_WALLET = process.env.NEXT_PUBLIC_PAYMENT_WALLET || "";
const SOLANA_USDC_MINT = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";
const SOLANA_RPC_URL = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || "https://api.mainnet-beta.solana.com";

const TASK_PLANS = [
  {
    id: "starter-task",
    name: "Starter Task",
    description: "Single secure workflow with proof generation.",
    price: 30,
  },
  {
    id: "standard-task",
    name: "Standard Task",
    description: "Confidential workflow with enclave memory.",
    price: 50,
  },
  {
    id: "priority-cluster",
    name: "Priority Cluster",
    description: "Priority routing across the secure worker cluster.",
    price: 100,
  },
  {
    id: "enterprise-cluster",
    name: "Enterprise Cluster",
    description: "Expanded capacity for larger private task batches.",
    price: 200,
  },
];

const TaskPaymentContext = createContext(null);

function getPhantomProvider() {
  if (typeof window === "undefined") {
    return null;
  }

  const provider = window.phantom?.solana || window.solana;
  return provider?.isPhantom ? provider : null;
}

function shortenAddress(address) {
  if (!address) {
    return "";
  }

  return `${address.slice(0, 4)}...${address.slice(-4)}`;
}

function formatBalance(value) {
  if (value == null) {
    return "--";
  }

  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 6,
  }).format(value);
}

async function readUsdcBalance(ownerAddress) {
  const response = await fetch(SOLANA_RPC_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: "xphantom-usdc-balance",
      method: "getTokenAccountsByOwner",
      params: [
        ownerAddress,
        { mint: SOLANA_USDC_MINT },
        { encoding: "jsonParsed" },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error("Unable to reach Solana RPC.");
  }

  const payload = await response.json();

  if (payload.error) {
    throw new Error(payload.error.message || "Unable to read USDC balance.");
  }

  return (payload.result?.value || []).reduce((total, account) => {
    const amount = account.account?.data?.parsed?.info?.tokenAmount;
    return total + Number(amount?.uiAmountString || amount?.uiAmount || 0);
  }, 0);
}

function buildPaymentUrl(plan) {
  const params = new URLSearchParams({
    amount: plan.price.toFixed(2),
    "spl-token": SOLANA_USDC_MINT,
    label: "XPhantom",
    message: `${plan.name} payment`,
    memo: `XPHANTOM-${plan.id}-${Date.now()}`,
  });

  return `solana:${PAYMENT_WALLET}?${params.toString()}`;
}

export function TaskPaymentProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [usdcBalance, setUsdcBalance] = useState(null);
  const [selectedPlanId, setSelectedPlanId] = useState(TASK_PLANS[1].id);
  const [status, setStatus] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastPaymentUrl, setLastPaymentUrl] = useState("");

  const selectedPlan = TASK_PLANS.find((plan) => plan.id === selectedPlanId) || TASK_PLANS[0];
  const hasWallet = Boolean(walletAddress);
  const hasEnoughUsdc = usdcBalance == null ? true : usdcBalance >= selectedPlan.price;

  async function refreshBalance(address = walletAddress) {
    if (!address) {
      return;
    }

    setIsRefreshing(true);
    setStatus("Reading USDC balance on Solana mainnet...");

    try {
      const balance = await readUsdcBalance(address);
      setUsdcBalance(balance);
      setStatus("USDC balance updated.");
    } catch (error) {
      setStatus(error.message || "Unable to refresh USDC balance.");
    } finally {
      setIsRefreshing(false);
    }
  }

  async function connectWallet() {
    const provider = getPhantomProvider();

    if (!provider) {
      setStatus("Phantom wallet was not detected. Install Phantom, then refresh this page.");
      window.open("https://phantom.app/", "_blank", "noopener,noreferrer");
      return;
    }

    setIsConnecting(true);
    setStatus("Waiting for Phantom approval...");

    try {
      const result = await provider.connect();
      const address = result.publicKey?.toString();

      if (!address) {
        throw new Error("Wallet connection did not return an address.");
      }

      setWalletAddress(address);
      setStatus("Wallet connected. Reading USDC balance...");
      await refreshBalance(address);
    } catch (error) {
      setStatus(error.message || "Wallet connection was cancelled.");
    } finally {
      setIsConnecting(false);
    }
  }

  async function launchPayment() {
    if (!hasWallet) {
      await connectWallet();
      return;
    }

    if (!PAYMENT_WALLET) {
      setStatus("Payment wallet is not configured.");
      return;
    }

    const paymentUrl = buildPaymentUrl(selectedPlan);
    setLastPaymentUrl(paymentUrl);
    setStatus("Opening wallet payment request. Confirm inside your wallet to send USDC.");
    window.location.href = paymentUrl;
  }

  async function copyPaymentLink() {
    if (!lastPaymentUrl) {
      return;
    }

    await navigator.clipboard.writeText(lastPaymentUrl);
    setStatus("Payment link copied.");
  }

  const value = useMemo(
    () => ({
      connectWallet,
      hasWallet,
      isConnecting,
      isOpen,
      isRefreshing,
      openPayment() {
        setIsOpen(true);
      },
      refreshBalance,
      setIsOpen,
      shortWalletAddress: shortenAddress(walletAddress),
      usdcBalance,
      walletAddress,
    }),
    [hasWallet, isConnecting, isOpen, isRefreshing, usdcBalance, walletAddress],
  );

  return (
    <TaskPaymentContext.Provider value={value}>
      {children}
      {isOpen ? (
        <div className="payment-modal-shell">
          <div className="payment-modal-panel">
            <div className="payment-modal-header">
              <div>
                <p className="payment-kicker">Task payment</p>
                <h2>Purchase secure runtime credits</h2>
                <p>Connect Phantom to read your real Solana USDC balance, then confirm the payment inside your wallet.</p>
              </div>
              <button className="payment-icon-button" onClick={() => setIsOpen(false)} aria-label="Close payment modal">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="payment-wallet-card">
              <div>
                <span className="payment-label">Wallet</span>
                <strong>{hasWallet ? shortenAddress(walletAddress) : "Not connected"}</strong>
                <p>USDC balance: {formatBalance(usdcBalance)} USDC</p>
              </div>
              <div className="payment-wallet-actions">
                <button onClick={connectWallet} disabled={isConnecting}>
                  <Wallet className="h-4 w-4" />
                  {hasWallet ? "Reconnect" : "Connect"}
                </button>
                <button onClick={() => refreshBalance()} disabled={!hasWallet || isRefreshing}>
                  <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
                  Refresh
                </button>
              </div>
            </div>

            <div className="payment-plan-grid">
              {TASK_PLANS.map((plan) => {
                const isSelected = plan.id === selectedPlanId;
                return (
                  <button
                    key={plan.id}
                    className={isSelected ? "payment-plan-card is-selected" : "payment-plan-card"}
                    onClick={() => setSelectedPlanId(plan.id)}
                  >
                    <span>{plan.name}</span>
                    <strong>{plan.price} USDC</strong>
                    <p>{plan.description}</p>
                    {isSelected ? <CheckCircle2 className="h-4 w-4" /> : null}
                  </button>
                );
              })}
            </div>

            {!hasEnoughUsdc ? (
              <p className="payment-warning">
                Connected balance is lower than the selected price. Your wallet will still make the final decision.
              </p>
            ) : null}

            {PAYMENT_WALLET ? (
              <div className="payment-recipient">
                <Shield className="h-4 w-4" />
                <span>Recipient</span>
                <code>{shortenAddress(PAYMENT_WALLET)}</code>
              </div>
            ) : null}

            {status ? <p className="payment-status">{status}</p> : null}

            <div className="payment-footer">
              <button className="payment-primary" onClick={launchPayment}>
                <ExternalLink className="h-4 w-4" />
                {hasWallet ? `Pay ${selectedPlan.price} USDC` : "Connect wallet first"}
              </button>
              <button className="payment-secondary" onClick={copyPaymentLink} disabled={!lastPaymentUrl}>
                <Copy className="h-4 w-4" />
                Copy payment link
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </TaskPaymentContext.Provider>
  );
}

export function useTaskPayment() {
  const context = useContext(TaskPaymentContext);

  if (!context) {
    throw new Error("useTaskPayment must be used inside TaskPaymentProvider");
  }

  return context;
}

export function TaskPaymentTrigger({ children, className }) {
  const { openPayment } = useTaskPayment();

  return (
    <button type="button" className={className} onClick={openPayment} data-global-action="skip">
      {children}
    </button>
  );
}

export function WalletStatusCard() {
  const {
    connectWallet,
    hasWallet,
    isConnecting,
    isRefreshing,
    openPayment,
    refreshBalance,
    shortWalletAddress,
    usdcBalance,
  } = useTaskPayment();

  return (
    <div className="wallet-status-card">
      <div className="wallet-status-icon">
        <Wallet className="h-4 w-4" />
      </div>
      <div className="wallet-status-copy">
        <p>{hasWallet ? shortWalletAddress : "Phantom wallet"}</p>
        <span>{hasWallet ? `${formatBalance(usdcBalance)} USDC` : "Connect for real USDC balance"}</span>
      </div>
      <button
        onClick={hasWallet ? () => refreshBalance() : connectWallet}
        disabled={isConnecting || isRefreshing}
        className="wallet-status-action"
      >
        {hasWallet ? "Sync" : "Connect"}
      </button>
      <button onClick={openPayment} className="wallet-status-action is-primary">
        Pay
      </button>
    </div>
  );
}
