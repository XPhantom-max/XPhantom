"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Eye, EyeOff, LockKeyhole, LogOut, Save, X } from "lucide-react";
import { validateContractAddress } from "@/lib/shared/contract-address";

const DeveloperAdminContext = createContext(null);

function shortenAddress(address) {
  if (!address) {
    return "No CA set";
  }

  if (address.length <= 14) {
    return address;
  }

  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function DeveloperAdminProvider({ children }) {
  const [contractAddress, setContractAddress] = useState("");
  const [isReady, setIsReady] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function bootstrap() {
      try {
        const response = await fetch("/api/dev-admin", { cache: "no-store" });
        const payload = await response.json();

        if (cancelled) {
          return;
        }

        setContractAddress(payload.contractAddress || "");
        setIsAuthed(Boolean(payload.authorized));
      } catch {
        if (!cancelled) {
          setContractAddress("");
          setIsAuthed(false);
        }
      } finally {
        if (!cancelled) {
          setIsReady(true);
        }
      }
    }

    bootstrap();

    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo(
    () => ({
      contractAddress,
      displayContractAddress: shortenAddress(contractAddress),
      isReady,
      isOpen,
      isAuthed,
      openAdmin() {
        setIsOpen(true);
      },
      closeAdmin() {
        setIsOpen(false);
      },
      async authenticate(password) {
        const response = await fetch("/api/dev-admin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "authenticate", password }),
        });

        if (!response.ok) {
          return false;
        }

        setIsAuthed(true);
        return true;
      },
      async saveSiteConfig(nextConfig) {
        const validation = validateContractAddress(nextConfig.contractAddress);

        if (!validation.ok) {
          return {
            ok: false,
            error: validation.message,
          };
        }

        const response = await fetch("/api/dev-admin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "update",
            contractAddress: validation.normalized,
          }),
        });

        if (!response.ok) {
          const payload = await response.json().catch(() => ({ error: "Unable to save CA." }));
          return {
            ok: false,
            error: payload.error || "Unable to save CA.",
          };
        }

        const payload = await response.json();
        setContractAddress(payload.contractAddress || "");
        return {
          ok: true,
          kind: payload.kind,
        };
      },
      async logout() {
        await fetch("/api/dev-admin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "logout" }),
        });
        setIsAuthed(false);
        setIsOpen(false);
      },
    }),
    [contractAddress, isAuthed, isOpen, isReady],
  );

  return (
    <DeveloperAdminContext.Provider value={value}>
      {children}
      <DeveloperAdminShortcut />
      <GlobalContractAddressDock />
      <DeveloperAdminModal />
    </DeveloperAdminContext.Provider>
  );
}

export function useDeveloperAdmin() {
  const context = useContext(DeveloperAdminContext);

  if (!context) {
    throw new Error("useDeveloperAdmin must be used inside DeveloperAdminProvider");
  }

  return context;
}

function DeveloperAdminShortcut() {
  const { openAdmin } = useDeveloperAdmin();
  const clicksRef = useRef([]);

  useEffect(() => {
    function handleDocumentClick(event) {
      const trigger = event.target.closest?.(
        "[data-dev-admin-trigger], .developer-avatar, img[alt='XPhantom logo'], img[alt='XPhantom avatar']",
      );

      if (!trigger) {
        return;
      }

      const now = Date.now();
      clicksRef.current = [...clicksRef.current.filter((stamp) => now - stamp < 2200), now];

      if (clicksRef.current.length >= 5) {
        clicksRef.current = [];
        openAdmin();
      }
    }

    document.addEventListener("click", handleDocumentClick, true);

    return () => {
      document.removeEventListener("click", handleDocumentClick, true);
    };
  }, [openAdmin]);

  return null;
}

function GlobalContractAddressDock() {
  const { contractAddress, displayContractAddress, isReady } = useDeveloperAdmin();
  const pathname = usePathname();
  const [hasInlineChip, setHasInlineChip] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    function checkInlineChip() {
      setHasInlineChip(Boolean(document.querySelector(".contract-address-chip")));
    }

    const frame = window.requestAnimationFrame(checkInlineChip);
    const observer = new MutationObserver(checkInlineChip);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [pathname]);

  useEffect(() => {
    if (!copied) {
      return;
    }

    const timer = window.setTimeout(() => setCopied(false), 1400);
    return () => window.clearTimeout(timer);
  }, [copied]);

  if (hasInlineChip) {
    return null;
  }

  async function copyContractAddress() {
    if (!contractAddress || !navigator.clipboard) {
      return;
    }

    await navigator.clipboard.writeText(contractAddress);
    setCopied(true);
  }

  return (
    <div className="developer-global-ca" aria-live="polite">
      <span>CA</span>
      <button
        type="button"
        onClick={copyContractAddress}
        disabled={!contractAddress}
        data-global-action="skip"
        title={contractAddress || "No CA set"}
      >
        {copied ? "Copied" : isReady ? displayContractAddress : "Loading..."}
      </button>
    </div>
  );
}

function DeveloperAdminModal() {
  const {
    closeAdmin,
    contractAddress,
    isAuthed,
    isOpen,
    authenticate,
    saveSiteConfig,
    logout,
  } = useDeveloperAdmin();
  const [password, setPassword] = useState("");
  const [draftAddress, setDraftAddress] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setDraftAddress(contractAddress);
    setPassword("");
    setError("");
    setNotice("");
    setShowPassword(false);
  }, [contractAddress, isOpen]);

  if (!isOpen) {
    return null;
  }

  async function handleLogin(event) {
    event.preventDefault();
    if (await authenticate(password)) {
      setError("");
      setNotice("Developer mode unlocked.");
      return;
    }

    setError("Password incorrect.");
  }

  async function handleSave(event) {
    event.preventDefault();
    const result = await saveSiteConfig({
      contractAddress: draftAddress,
    });
    if (!result.ok) {
      setError(result.error || "Unable to save CA.");
      setNotice("");
      return;
    }
    setNotice(`CA updated. Saved as ${result.kind === "evm" ? "EVM" : "base58"} format.`);
    setError("");
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-[1.5rem] border border-white/10 bg-[#08121b] p-5 shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-accent">Hidden developer admin</p>
            <h2 className="mt-2 text-xl font-semibold text-foreground">Live CA control</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Update the contract address without rebuilding or redeploying.
            </p>
          </div>
          <button
            onClick={closeAdmin}
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label="Close developer admin"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {!isAuthed ? (
          <form className="mt-5 space-y-4" onSubmit={handleLogin}>
            <label className="block">
              <span className="mb-2 block text-sm text-muted-foreground">Password</span>
              <div className="flex items-center rounded-xl border border-white/10 bg-secondary/60 px-3">
                <LockKeyhole className="h-4 w-4 text-muted-foreground" />
                <input
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  type={showPassword ? "text" : "password"}
                  className="h-11 flex-1 bg-transparent px-3 text-sm text-foreground outline-none"
                  placeholder="Enter developer password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </label>
            {error ? <p className="text-sm text-destructive">{error}</p> : null}
            {notice ? <p className="text-sm text-success">{notice}</p> : null}
            <button className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2 text-sm font-medium text-accent-foreground">
              <LockKeyhole className="h-4 w-4" />
              Unlock admin
            </button>
          </form>
        ) : (
          <form className="mt-5 space-y-4" onSubmit={handleSave}>
            <label className="block">
              <span className="mb-2 block text-sm text-muted-foreground">Contract address (CA)</span>
              <textarea
                value={draftAddress}
                onChange={(event) => setDraftAddress(event.target.value)}
                rows={4}
                className="w-full rounded-xl border border-white/10 bg-secondary/60 px-3 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent"
                placeholder="Paste CA here"
              />
              <span className="mt-2 block text-xs text-muted-foreground">
                Accepted formats: `0x` EVM address or 32-44 character base58 address.
              </span>
            </label>
            {error ? <p className="text-sm text-destructive">{error}</p> : null}
            {notice ? <p className="text-sm text-success">{notice}</p> : null}
            <div className="flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2 text-sm font-medium text-accent-foreground">
                <Save className="h-4 w-4" />
                Save CA
              </button>
              <button
                type="button"
                onClick={logout}
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-secondary/60 px-4 py-2 text-sm font-medium text-foreground"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
              <button
                type="button"
                onClick={closeAdmin}
                className="rounded-xl border border-white/10 bg-secondary/60 px-4 py-2 text-sm font-medium text-foreground"
              >
                Close
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
