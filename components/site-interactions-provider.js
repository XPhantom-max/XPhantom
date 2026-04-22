"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useTaskPayment } from "@/components/task-payment-provider";

const BUTTON_ACTIONS = [
  {
    test: /review attestation/i,
    message: "Opening proof stream.",
    path: "/proofs",
  },
  {
    test: /proof|attestation|manifest/i,
    message: "Proof action queued.",
    path: "/proofs",
  },
  {
    test: /agent|worker|rebalance|pause/i,
    message: "Agent control updated.",
    path: "/agents",
  },
  {
    test: /workflow|promote|regional|filter|task/i,
    message: "Workflow action applied.",
    path: "/tasks",
  },
  {
    test: /memory|vault|sealed|forget|delete/i,
    message: "Memory vault action applied.",
    path: "/memory",
  },
  {
    test: /key|api|rotate|create/i,
    message: "API key action prepared.",
    path: "/api-keys",
  },
  {
    test: /save|theme|network|language|notification|changes/i,
    message: "Setting saved locally.",
    path: "/settings",
  },
  {
    test: /show|ledger|settlement/i,
    message: "Ledger view toggled.",
    path: "/payments",
  },
];

function getButtonLabel(button) {
  return (
    button.getAttribute("aria-label") ||
    button.getAttribute("title") ||
    button.textContent ||
    "Action"
  ).replace(/\s+/g, " ").trim();
}

function getButtonContext(button) {
  return (
    button.closest(".wallet-status-card, .mesh-card, section, article, aside, header")?.textContent || ""
  )
    .replace(/\s+/g, " ")
    .trim();
}

function isPaymentTrigger(label) {
  return /^(new task|launch secure task|pay|deposit|purchase|buy)$/i.test(label);
}

function isWalletConnectTrigger(label, context) {
  return (
    /^(install|connect wallet|connect|install phantom)$/i.test(label) &&
    /phantom|wallet|usdc/i.test(context)
  );
}

function isHandledButton(button) {
  return Boolean(
    button.closest(".payment-modal-shell") ||
      button.closest(".wallet-status-card") ||
      button.closest("[data-global-action='skip']") ||
      (button.type === "submit" && button.closest("form")),
  );
}

export function SiteInteractionsProvider({ children }) {
  const router = useRouter();
  const { connectWallet, openPayment } = useTaskPayment();
  const [toast, setToast] = useState("");
  const toastTimerRef = useRef(null);

  function showToast(message) {
    window.clearTimeout(toastTimerRef.current);
    setToast(message);
    toastTimerRef.current = window.setTimeout(() => setToast(""), 1800);
  }

  useEffect(() => {
    return () => window.clearTimeout(toastTimerRef.current);
  }, []);

  useEffect(() => {
    async function handleDocumentClick(event) {
      const button = event.target.closest("button,[role='button']");

      if (!button || button.disabled || isHandledButton(button)) {
        return;
      }

      const label = getButtonLabel(button);
      const context = getButtonContext(button);

      if (/copy/i.test(label)) {
        const text =
          button.closest("[data-copy-value]")?.getAttribute("data-copy-value") ||
          button.closest("section, article, div")?.querySelector("code")?.textContent ||
          "";

        if (text && navigator.clipboard) {
          await navigator.clipboard.writeText(text.trim());
          showToast("Copied to clipboard.");
          return;
        }
      }

      if (isWalletConnectTrigger(label, context)) {
        event.preventDefault();
        openPayment();
        showToast("Checking Phantom wallet.");
        await connectWallet();
        return;
      }

      if (isPaymentTrigger(label)) {
        event.preventDefault();
        openPayment();
        showToast("Opening wallet payment window.");
        return;
      }

      const action = BUTTON_ACTIONS.find((candidate) => candidate.test.test(label));

      if (action) {
        showToast(action.message);

        if (action.path && window.location.pathname !== action.path) {
          window.setTimeout(() => router.push(action.path), 180);
        }

        return;
      }

      button.classList.add("is-clicked");
      window.setTimeout(() => button.classList.remove("is-clicked"), 360);
      showToast(`${label} clicked.`);
    }

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [connectWallet, openPayment, router]);

  return (
    <>
      {children}
      <div className={toast ? "site-toast is-visible" : "site-toast"} role="status" aria-live="polite">
        {toast}
      </div>
    </>
  );
}
