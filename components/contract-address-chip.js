"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy, Fingerprint } from "lucide-react";
import { useDeveloperAdmin } from "@/components/developer-admin-provider";

export function ContractAddressChip() {
  const { contractAddress, displayContractAddress, isReady } = useDeveloperAdmin();
  const [copied, setCopied] = useState(false);
  const copiedTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (copiedTimeoutRef.current) {
        window.clearTimeout(copiedTimeoutRef.current);
      }
    };
  }, []);

  async function handleCopy() {
    if (!contractAddress) {
      return;
    }

    try {
      await navigator.clipboard.writeText(contractAddress);
      if (copiedTimeoutRef.current) {
        window.clearTimeout(copiedTimeoutRef.current);
      }
      setCopied(true);
      copiedTimeoutRef.current = window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="contract-address-chip flex min-w-0 max-w-[8.5rem] items-center gap-2 rounded-full border border-white/8 bg-card/70 px-3 py-1.5 text-xs text-muted-foreground sm:max-w-[12rem] md:max-w-none">
      <Fingerprint className="h-3.5 w-3.5 shrink-0 text-accent" />
      <span className="hidden text-muted-foreground sm:inline">CA</span>
      <span className="min-w-0 truncate font-mono text-foreground">
        {isReady ? displayContractAddress : "Loading..."}
      </span>
      <button
        onClick={handleCopy}
        className="shrink-0 text-muted-foreground transition-colors hover:text-foreground"
        aria-label={copied ? "Contract address copied" : "Copy contract address"}
      >
        {copied ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}
      </button>
    </div>
  );
}
