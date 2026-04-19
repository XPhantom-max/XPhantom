import {
  Activity,
  Bot,
  Clock3,
  Cpu,
  Database,
  Gauge,
  Pause,
  RotateCcw,
  Search,
  Shield,
  TriangleAlert,
  Zap,
  ChevronDown,
} from "lucide-react";
import { DashboardHeader, DashboardSidebar, MobileQuickNav } from "@/components/dashboard-shell";
import { getDashboardAgentsData } from "@/lib/services/dashboard";

const { agents, routingSnapshot, selectedAgent, summaryCards } = getDashboardAgentsData();

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function statusTone(status) {
  if (status === "active") return "bg-success/10 text-success";
  if (status === "idle") return "bg-warning/10 text-warning";
  if (status === "degraded") return "bg-destructive/10 text-destructive";
  return "bg-secondary text-muted-foreground";
}

function statusDot(status) {
  if (status === "active") return "bg-success";
  if (status === "idle") return "bg-warning";
  if (status === "degraded") return "bg-destructive";
  return "bg-muted";
}

function SummaryCard({ card }) {
  const Icon = card.icon;
  const toneMap = {
    accent: "text-accent bg-accent/10",
    success: "text-success bg-success/10",
    "chart-3": "text-chart-3 bg-chart-3/10",
    warning: "text-warning bg-warning/10",
  };

  return (
    <div className="dashboard-card rounded-xl border border-border bg-card p-4">
      <div className="flex items-center gap-3">
        <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg", toneMap[card.tone])}>
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-2xl font-bold text-foreground">{card.value}</p>
          <p className="text-sm text-muted-foreground">{card.title}</p>
          <p className="text-xs text-muted-foreground">{card.detail}</p>
        </div>
      </div>
    </div>
  );
}

function FleetList() {
  return (
    <section className="dashboard-card rounded-xl border border-border bg-card">
      <div className="border-b border-border p-4">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <h2 className="text-base font-semibold text-foreground">Agent fleet</h2>
            <p className="text-sm text-muted-foreground">Operational status, queue depth, and enclave telemetry.</p>
          </div>
          <div className="relative w-full xl:w-72">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Search by name, role, region..."
              className="h-10 w-full rounded-lg border border-border bg-secondary pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none"
            />
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {["all", "active", "idle", "paused", "degraded"].map((filter, index) => (
            <button
              key={filter}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                index === 0 ? "bg-accent text-accent-foreground" : "bg-secondary text-muted-foreground hover:text-foreground",
              )}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="divide-y divide-border">
        {agents.map((agent, index) => (
          <button
            key={agent.name}
            className={cn("w-full p-4 text-left transition-colors hover:bg-secondary/40", index === 0 && "bg-accent/5")}
          >
            <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-medium text-foreground">{agent.name}</p>
                  <span className={cn("inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium", statusTone(agent.status))}>
                    <span className={cn("h-1.5 w-1.5 rounded-full", statusDot(agent.status))} />
                    {agent.status}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {agent.role} • {agent.region} • {agent.tee}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{agent.description}</p>
              </div>
              <div className="grid min-w-0 grid-cols-3 gap-3 text-left sm:min-w-56 sm:text-right">
                <Metric label="CPU" value={`${agent.cpu}%`} warn={agent.cpu >= 90} />
                <Metric label="Queue" value={String(agent.queue)} warn={agent.queue >= 10} />
                <Metric label="Trust" value={String(agent.trust)} success />
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

function Metric({ label, value, warn, success }) {
  return (
    <div>
      <p className={cn("text-base font-semibold", warn ? "text-warning" : success ? "text-success" : "text-foreground")}>{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

function ProgressRow({ icon: Icon, label, value, barColor, amount }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="flex items-center gap-2 text-muted-foreground">
          <Icon className="h-4 w-4" />
          {label}
        </span>
        <span className="font-medium text-foreground">{amount}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-secondary">
        <div className={cn("h-full rounded-full", barColor)} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function SelectedAgentCard() {
  return (
    <div className="dashboard-card rounded-xl border border-border bg-card p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Selected agent</p>
          <h2 className="mt-2 text-xl font-semibold text-foreground">{selectedAgent.name}</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {selectedAgent.role} in {selectedAgent.region}
          </p>
        </div>
        <span className={cn("inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium", statusTone(selectedAgent.status))}>
          <span className={cn("h-1.5 w-1.5 rounded-full", statusDot(selectedAgent.status))} />
          {selectedAgent.status}
        </span>
      </div>
      <div className="mt-5 grid gap-3">
        <ProgressRow icon={Cpu} label="CPU utilization" value={selectedAgent.cpu} amount={selectedAgent.cpu} barColor="bg-accent" />
        <ProgressRow icon={Database} label="Memory pressure" value={selectedAgent.memory} amount={selectedAgent.memory} barColor="bg-accent" />
        <ProgressRow icon={Gauge} label="Trust score" value={selectedAgent.trust} amount={selectedAgent.trust} barColor="bg-success" />
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
        {selectedAgent.stats.map((stat) => (
          <div key={stat.label} className="rounded-lg border border-border bg-background/60 p-3">
            <p className="text-xs text-muted-foreground">{stat.label}</p>
            <p className="mt-1 font-medium text-foreground">{stat.value}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        <button className="flex items-center gap-2 rounded-lg bg-warning/10 px-3 py-2 text-sm font-medium text-warning">
          <Pause className="h-4 w-4" />
          Pause worker
        </button>
        <button className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-2 text-sm font-medium text-foreground">
          <RotateCcw className="h-4 w-4" />
          Rebalance queue
        </button>
      </div>
    </div>
  );
}

function RoutingSnapshotCard() {
  return (
    <div className="dashboard-card rounded-xl border border-border bg-card p-5">
      <h3 className="text-sm font-semibold text-foreground">Routing snapshot</h3>
      <div className="mt-4 space-y-3">
        {routingSnapshot.map((row) => (
          <div key={row.label} className="flex items-center justify-between rounded-lg border border-border bg-background/60 px-3 py-2">
            <span className="text-sm text-muted-foreground">{row.label}</span>
            <span className={cn("text-sm font-medium", row.tone === "success" ? "text-success" : "text-foreground")}>{row.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AgentsPage() {
  return (
    <div className="dashboard-root min-h-screen bg-background">
      <DashboardSidebar activePath="/agents" />
      <main className="dashboard-main ml-0 lg:ml-72">
        <DashboardHeader title="Agent Runtime" />
        <div className="dashboard-content px-4 py-4 sm:px-6 sm:py-6">
          <MobileQuickNav activePath="/agents" />

          <div className="dashboard-summary-grid mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4">
            {summaryCards.map((card) => (
              <SummaryCard key={card.title} card={card} />
            ))}
          </div>

          <div className="dashboard-split-grid grid grid-cols-1 gap-6 2xl:grid-cols-[1.4fr_0.9fr]">
            <FleetList />
            <section className="space-y-6">
              <div className="dashboard-card rounded-xl border border-border bg-card p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Network profile</p>
                    <h2 className="mt-2 text-lg font-semibold text-foreground">Mainnet runtime</h2>
                  </div>
                  <button className="flex items-center gap-2 rounded-2xl border border-white/8 bg-secondary/80 px-3 py-2 text-sm text-foreground hover:bg-secondary">
                    <span className="h-2 w-2 rounded-full bg-success" />
                    Mainnet
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </button>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-lg border border-border bg-background/60 p-3">
                    <p className="text-xs text-muted-foreground">Coordinator trust</p>
                    <p className="mt-1 text-lg font-semibold text-success">99%</p>
                  </div>
                  <div className="rounded-lg border border-border bg-background/60 p-3">
                    <p className="text-xs text-muted-foreground">Degraded workers</p>
                    <p className="mt-1 text-lg font-semibold text-warning">1</p>
                  </div>
                </div>
                <div className="mt-4 rounded-xl border border-border bg-background/50 p-4">
                  <div className="flex items-start gap-3">
                    <TriangleAlert className="mt-0.5 h-4 w-4 text-warning" />
                    <div>
                      <p className="text-sm font-medium text-foreground">External ingestion pressure detected</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Data Harvester is saturated and should be throttled or redistributed before onboarding new public feed jobs.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <SelectedAgentCard />
              <RoutingSnapshotCard />
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
