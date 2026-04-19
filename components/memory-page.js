import {
  ChevronDown,
  Database,
  EyeOff,
  HardDrive,
  Lock,
  LockOpen,
  Search,
  Shield,
  Trash2,
  Clock3,
  Activity,
} from "lucide-react";
import { DashboardHeader, DashboardSidebar, MobileQuickNav } from "@/components/dashboard-shell";
import { getDashboardMemoryData } from "@/lib/services/dashboard";

const { selectedSlot, slots, summaryCards, vaultHealth } = getDashboardMemoryData();

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function toneClasses(tone) {
  if (tone === "accent") return "bg-accent/10 text-accent";
  if (tone === "chart-2") return "bg-chart-2/10 text-chart-2";
  if (tone === "success") return "bg-success/10 text-success";
  if (tone === "warning") return "bg-warning/10 text-warning";
  return "bg-secondary text-foreground";
}

function SummaryCard({ card }) {
  const Icon = card.icon;
  return (
    <div className="dashboard-card rounded-xl border border-border bg-card p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-2xl font-bold text-foreground">{card.value}</p>
          <p className="text-sm text-muted-foreground">{card.label}</p>
        </div>
        <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg", toneClasses(card.tone))}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}

function VaultIndex() {
  return (
    <section className="dashboard-card rounded-xl border border-border bg-card">
      <div className="border-b border-border p-4">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <h2 className="font-semibold text-foreground">Vault index</h2>
            <p className="text-sm text-muted-foreground">Slot-by-slot view of encrypted task context and runtime cache.</p>
          </div>
          <div className="relative w-full xl:w-72">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Search vault..."
              className="h-10 w-full rounded-lg border border-border bg-secondary pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none"
            />
          </div>
        </div>
      </div>
      <div className="divide-y divide-border">
        {slots.map((slot) => {
          const Icon = slot.secure ? Lock : LockOpen;
          return (
            <button
              key={slot.name}
              className={cn("w-full p-4 text-left hover:bg-secondary/40", slot.active && "bg-accent/5")}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "flex h-11 w-11 items-center justify-center rounded-xl",
                      slot.secure ? "bg-success/10" : "bg-secondary",
                    )}
                  >
                    <Icon className={cn("h-5 w-5", slot.secure ? "text-success" : "text-muted-foreground")} />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{slot.name}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {slot.type} • {slot.sensitivity}
                    </p>
                  </div>
                </div>
                <div className="text-right text-sm">
                  <p className="font-medium text-foreground">{slot.size}</p>
                  <p className="text-xs text-muted-foreground">{slot.replicas}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function SelectedSlotPanel() {
  return (
    <div className="dashboard-card rounded-xl border border-border bg-card p-5">
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Selected slot</p>
      <h2 className="mt-2 text-xl font-semibold text-foreground">{selectedSlot.name}</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        {selectedSlot.type} • sensitivity: {selectedSlot.sensitivity}
      </p>
      <div className="mt-5 grid grid-cols-2 gap-3">
        {selectedSlot.details.map(([label, value]) => (
          <div key={label} className="rounded-lg border border-border bg-background/60 p-3">
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className="mt-1 text-sm font-medium text-foreground">{value}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 space-y-3">
        <div className="flex items-center justify-between rounded-lg border border-border bg-background/60 p-3">
          <div className="flex items-center gap-3">
            <EyeOff className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium text-foreground">Encrypted preview only</p>
              <p className="text-xs text-muted-foreground">Sensitive slots remain sealed until enclave execution.</p>
            </div>
          </div>
          <button className="rounded-lg bg-secondary px-3 py-2 text-sm text-foreground">Sealed</button>
        </div>
        <div className="flex items-center justify-between rounded-lg border border-border bg-background/60 p-3">
          <div>
            <p className="text-sm font-medium text-foreground">Forget mode</p>
            <p className="text-xs text-muted-foreground">Automatically shred content after workflow completion.</p>
          </div>
          <button className="relative h-6 w-11 rounded-full bg-accent">
            <span className="absolute right-1 top-1 h-4 w-4 rounded-full bg-white" />
          </button>
        </div>
      </div>
      <button className="mt-5 flex items-center gap-2 rounded-lg bg-destructive/10 px-3 py-2 text-sm font-medium text-destructive">
        <Trash2 className="h-4 w-4" />
        Secure delete slot
      </button>
    </div>
  );
}

function VaultHealthPanel() {
  return (
    <div className="dashboard-card rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Vault health</p>
          <h3 className="mt-2 text-lg font-semibold text-foreground">Mainnet storage fabric</h3>
        </div>
        <button className="flex items-center gap-2 rounded-2xl border border-white/8 bg-secondary/80 px-3 py-2 text-sm text-foreground hover:bg-secondary">
          <span className="h-2 w-2 rounded-full bg-success" />
          Mainnet
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>
      <div className="mt-4 space-y-3">
        {vaultHealth.map(([label, value, tone]) => (
          <div key={label} className="flex items-center justify-between rounded-lg border border-border bg-background/60 px-3 py-2">
            <span className="text-sm text-muted-foreground">{label}</span>
            <span className={cn("text-sm font-medium", tone === "success" ? "text-success" : tone === "warning" ? "text-warning" : "text-foreground")}>
              {value}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-xl border border-border bg-background/50 p-4">
        <div className="flex items-start gap-3">
          <Activity className="mt-0.5 h-4 w-4 text-accent" />
          <div>
            <p className="text-sm font-medium text-foreground">TEE replication is within policy bounds</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Restricted slots are mirrored across two enclaves, with forget-mode armed on all volatile task contexts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MemoryPage() {
  return (
    <div className="dashboard-root min-h-screen bg-background">
      <DashboardSidebar activePath="/memory" />
      <main className="dashboard-main ml-0 lg:ml-72">
        <DashboardHeader title="Memory Vault" />
        <div className="dashboard-content px-4 py-4 sm:px-6 sm:py-6">
          <MobileQuickNav activePath="/memory" />

          <div className="dashboard-summary-grid mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4">
            {summaryCards.map((card) => (
              <SummaryCard key={card.label} card={card} />
            ))}
          </div>

          <div className="dashboard-split-grid grid grid-cols-1 gap-6 2xl:grid-cols-[1.25fr_0.9fr]">
            <VaultIndex />
            <section className="space-y-6">
              <SelectedSlotPanel />
              <VaultHealthPanel />
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
