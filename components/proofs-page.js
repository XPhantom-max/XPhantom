import {
  CircleCheck,
  Clock3,
  Copy,
  RefreshCw,
  Search,
  Shield,
  ChevronDown,
  Activity,
  Zap,
} from "lucide-react";
import { DashboardHeader, DashboardSidebar, MobileQuickNav } from "@/components/dashboard-shell";
import { getDashboardProofsData } from "@/lib/services/dashboard";

const { circuits, proofs, streamFilters, summaryCards, verifierQueue } = getDashboardProofsData();

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function toneClasses(tone) {
  if (tone === "accent") return "bg-accent/10 text-accent";
  if (tone === "success") return "bg-success/10 text-success";
  if (tone === "warning") return "bg-warning/10 text-warning";
  if (tone === "chart-2") return "bg-chart-2/10 text-chart-2";
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
          <Icon className={cn("h-5 w-5", card.spin && "animate-spin")} />
        </div>
      </div>
    </div>
  );
}

function ProofStream() {
  return (
    <div className="dashboard-card rounded-xl border border-border bg-card overflow-hidden">
      <div className="flex flex-col gap-4 border-b border-border p-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <h2 className="font-semibold text-foreground">Live proof stream</h2>
          <p className="text-sm text-muted-foreground">
            New attestations flow in as agents finish secured computation steps.
          </p>
        </div>
        <div className="flex gap-2">
          {streamFilters.map((filter, index) => (
            <button
              key={filter}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium",
                index === 0 ? "bg-accent text-accent-foreground" : "bg-secondary text-muted-foreground",
              )}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="divide-y divide-border">
        {proofs.map((proof) => (
          <div key={proof.name} className={cn("cursor-pointer p-4 hover:bg-secondary/40", proof.expanded && "bg-accent/5")}>
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div className="flex items-center gap-4">
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-lg",
                    proof.status === "verified" ? "bg-success/10" : "bg-accent/10",
                  )}
                >
                  {proof.status === "verified" ? (
                    <CircleCheck className="h-5 w-5 text-success" />
                  ) : (
                    <RefreshCw className="h-5 w-5 animate-spin text-accent" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-foreground">{proof.name}</p>
                    <span className="rounded bg-secondary px-2 py-0.5 text-xs text-muted-foreground">{proof.circuit}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {proof.source} • {proof.workflow} • batch {proof.batch}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-mono text-foreground">{proof.hashShort}</p>
                <p className="text-xs text-muted-foreground">{proof.time}</p>
              </div>
            </div>

            {proof.expanded ? (
              <div className="mt-4 rounded-lg border border-border bg-background/60 p-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <InfoCard label="Circuit" value={proof.circuit} />
                  <InfoCard label="Verification" value={proof.verification} />
                  <InfoCard label="Batch" value={proof.batch} />
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <code className="overflow-x-auto rounded bg-card px-3 py-2 text-xs font-mono text-foreground">
                    {proof.hashFull}
                  </code>
                  <button className="rounded-lg p-2 text-muted-foreground hover:bg-secondary">
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

function InfoCard({ label, value }) {
  return (
    <div className="rounded-lg border border-border bg-card p-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm font-medium text-foreground">{value}</p>
    </div>
  );
}

function VerifierPanel() {
  return (
    <div className="dashboard-card rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Verifier queue</p>
          <h3 className="mt-2 text-lg font-semibold text-foreground">Mainnet attestation lane</h3>
        </div>
        <button className="flex items-center gap-2 rounded-2xl border border-white/8 bg-secondary/80 px-3 py-2 text-sm text-foreground hover:bg-secondary">
          <span className="h-2 w-2 rounded-full bg-success" />
          Mainnet
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>
      <div className="mt-4 space-y-3">
        {verifierQueue.map((row) => (
          <div key={row.label} className="flex items-center justify-between rounded-lg border border-border bg-background/60 px-3 py-2">
            <span className="text-sm text-muted-foreground">{row.label}</span>
            <span className={cn("text-sm font-medium", row.tone === "success" ? "text-success" : "text-warning")}>{row.value}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-xl border border-border bg-background/50 p-4">
        <div className="flex items-start gap-3">
          <Activity className="mt-0.5 h-4 w-4 text-accent" />
          <div>
            <p className="text-sm font-medium text-foreground">Proof generation remains within SLA</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Verifiers are keeping up with the current batch load, with one ComputeV1 proof still in witness assembly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CircuitPanel() {
  return (
    <div className="dashboard-card rounded-xl border border-border bg-card p-5">
      <h3 className="text-sm font-semibold text-foreground">Circuit health</h3>
      <div className="mt-4 space-y-4">
        {circuits.map((circuit) => (
          <div key={circuit.name}>
            <div className="mb-1 flex items-center justify-between text-sm">
              <span className="text-foreground">{circuit.name}</span>
              <span className="text-muted-foreground">{circuit.usage}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-secondary">
              <div className={cn("h-full rounded-full", circuit.tone)} style={{ width: circuit.usage }} />
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{circuit.proofs} proofs generated</p>
          </div>
        ))}
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-border bg-background/60 p-3">
          <p className="text-xs text-muted-foreground">Average witness</p>
          <p className="mt-1 font-medium text-foreground">1.8 MB</p>
        </div>
        <div className="rounded-lg border border-border bg-background/60 p-3">
          <p className="text-xs text-muted-foreground">Gas parity</p>
          <p className="mt-1 font-medium text-foreground">stable</p>
        </div>
      </div>
    </div>
  );
}

function LedgerPanel() {
  return (
    <div className="dashboard-card rounded-xl border border-border bg-card p-5">
      <h3 className="text-sm font-semibold text-foreground">Proof ledger</h3>
      <div className="mt-4 space-y-3">
        {[
          ["Latest verified batch", "B-2044"],
          ["Witness integrity", "attested"],
          ["Verifier uptime", "99.98%"],
        ].map(([label, value]) => (
          <div key={label} className="flex items-center justify-between rounded-lg border border-border bg-background/60 px-3 py-2">
            <span className="text-sm text-muted-foreground">{label}</span>
            <span className="text-sm font-medium text-foreground">{value}</span>
          </div>
        ))}
      </div>
      <button className="mt-4 inline-flex items-center gap-2 rounded-lg bg-secondary px-3 py-2 text-sm font-medium text-foreground">
        <Zap className="h-4 w-4" />
        Export proof manifest
      </button>
    </div>
  );
}

export function ProofsPage() {
  return (
    <div className="dashboard-root min-h-screen bg-background">
      <DashboardSidebar activePath="/proofs" />
      <main className="dashboard-main ml-0 lg:ml-72">
        <DashboardHeader title="Proof Stream" />
        <div className="dashboard-content px-4 py-4 sm:px-6 sm:py-6">
          <MobileQuickNav activePath="/proofs" />

          <div className="dashboard-summary-grid mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4">
            {summaryCards.map((card) => (
              <SummaryCard key={card.label} card={card} />
            ))}
          </div>

          <div className="dashboard-split-grid grid grid-cols-1 gap-6 2xl:grid-cols-[1.4fr_0.9fr]">
            <ProofStream />
            <section className="space-y-6">
              <VerifierPanel />
              <CircuitPanel />
              <LedgerPanel />
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
