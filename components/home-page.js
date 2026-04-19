import {
  Activity,
  ArrowDownLeft,
  ArrowUpRight,
  Bot,
  CircleAlert,
  CircleCheck,
  Clock3,
  Database,
  Eye,
  ExternalLink,
  HardDrive,
  LoaderCircle,
  Lock,
  Plus,
  Shield,
  Trash2,
  TrendingDown,
  Wallet,
} from "lucide-react";
import { DashboardHeader, DashboardSidebar, MobileQuickNav } from "@/components/dashboard-shell";
import { TaskPaymentTrigger } from "@/components/task-payment-provider";
import { getDashboardHomeData } from "@/lib/services/dashboard";

const { activityLog, ledgerItems, memoryItems, networkNodes, overviewStats, proofStream, workflows } =
  getDashboardHomeData();

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}


function StatCard({ stat }) {
  const toneMap = {
    accent: "text-accent",
    success: "text-success",
    "chart-4": "text-chart-4",
    "chart-5": "text-chart-5",
  };

  return (
    <div className="dashboard-card rounded-xl border border-border bg-card p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">{stat.title}</p>
          <div className="mt-4">
            <p className="text-2xl font-semibold text-foreground">{stat.value}</p>
            <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
          </div>
        </div>
        <div className={cn("flex items-center gap-1 text-xs font-medium", toneMap[stat.tone])}>
          <TrendingDown className="h-3 w-3" />
          {stat.trend}
        </div>
      </div>
    </div>
  );
}

function NetworkMap() {
  return (
    <div className="dashboard-card rounded-xl border border-border bg-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-foreground">Agent network</h3>
          <p className="text-xs text-muted-foreground">Coordinator routing across live enclave workers.</p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          {[
            ["bg-success", "active"],
            ["bg-warning", "idle"],
            ["bg-destructive", "degraded"],
          ].map(([color, label]) => (
            <div key={label} className="flex items-center gap-1.5">
              <span className={cn("h-2 w-2 rounded-full", color)} />
              <span className="text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="network-map-scroll overflow-x-auto">
        <div className="network-map-canvas grid-faint relative h-[25rem] min-w-[720px] overflow-hidden rounded-[1.5rem] border border-white/6 bg-[radial-gradient(circle_at_top,rgba(119,224,206,0.06),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.025),rgba(255,255,255,0))]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02),transparent_52%)]" />
          <svg className="absolute inset-0 h-full w-full">
            <g>
              <line x1="50%" y1="16%" x2="19%" y2="42%" stroke="currentColor" strokeWidth="1.8" className="text-accent/70" strokeDasharray="6 4" />
              <circle cx="19%" cy="42%" r="3" className="fill-accent/80" />
            </g>
            {[
              ["50%", "16%", "81%", "49%"],
              ["50%", "16%", "17%", "79%"],
              ["50%", "16%", "50%", "79%"],
              ["50%", "16%", "83%", "79%"],
              ["19%", "42%", "17%", "79%"],
              ["81%", "49%", "50%", "79%"],
              ["83%", "79%", "17%", "79%"],
            ].map((line, index) => (
              <line
                key={index}
                x1={line[0]}
                y1={line[1]}
                x2={line[2]}
                y2={line[3]}
                stroke="currentColor"
                strokeWidth="1.25"
                className="text-border"
              />
            ))}
          </svg>

          {networkNodes.map((node) => (
            <div
              key={node.name}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: node.left, top: node.top }}
            >
              <div
                className={cn(
                  "network-node-card w-44 rounded-[1.4rem] border px-4 py-3 shadow-[0_18px_40px_rgba(0,0,0,0.22)] backdrop-blur-sm",
                  node.tone === "accent" && "border-accent/35 bg-[linear-gradient(180deg,rgba(119,224,206,0.14),rgba(119,224,206,0.05))]",
                  node.tone === "success" && "border-success/25 bg-[linear-gradient(180deg,rgba(121,216,156,0.12),rgba(121,216,156,0.04))]",
                  node.tone === "neutral" && "border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.01))]",
                  node.tone === "destructive" && "border-destructive/30 bg-[linear-gradient(180deg,rgba(255,102,92,0.14),rgba(255,102,92,0.05))]",
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="max-w-[8.5rem] text-[0.72rem] font-semibold leading-5 text-foreground">{node.name}</span>
                  <span
                    className={cn(
                      "h-2.5 w-2.5 rounded-full",
                      node.status === "success" && "bg-success",
                      node.status === "warning" && "bg-warning",
                      node.status === "destructive" && "bg-destructive",
                    )}
                  />
                </div>
                <p className="mt-1 min-h-[2.5rem] text-[0.72rem] leading-5 text-muted-foreground">{node.role}</p>
                <div className="mt-3 flex items-center justify-between border-t border-white/8 pt-2 text-[0.7rem] text-muted-foreground">
                  <span>CPU {node.cpu}%</span>
                  <span>Q {node.queue}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function WorkflowsCard() {
  return (
    <div className="dashboard-card rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div>
          <h3 className="text-sm font-medium text-foreground">Active workflows</h3>
          <p className="text-xs text-muted-foreground">Execution, verification, and recovery paths.</p>
        </div>
        <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">2 live</span>
      </div>
      <div className="divide-y divide-border">
        {workflows.map((workflow) => {
          const Icon = workflow.icon;
          return (
            <div key={workflow.name} className="px-5 py-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Icon className={cn("h-4 w-4", workflow.iconClass)} />
                    <span className="text-sm font-medium text-foreground">{workflow.name}</span>
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    <span className="rounded bg-secondary px-1.5 py-0.5">{workflow.kind}</span>
                    <span>{workflow.agents} agents</span>
                    <span className="flex items-center gap-1">
                      <Shield className="h-3 w-3" />
                      {workflow.proofs} proofs
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock3 className="h-3 w-3" />
                      {workflow.eta}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">{workflow.cu}</p>
                  <p className="text-xs text-muted-foreground">{workflow.tier}</p>
                </div>
              </div>
              <div className="mt-3">
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                  <div className={cn("h-full rounded-full transition-all duration-500", workflow.bar)} style={{ width: `${workflow.progress}%` }} />
                </div>
                <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                  <span>{workflow.region}</span>
                  <span>{workflow.progress}%</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ProofStreamCard() {
  return (
    <div className="dashboard-card rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-accent" />
          <h3 className="text-sm font-medium text-foreground">Proof stream</h3>
        </div>
        <span className="text-xs text-muted-foreground">2 verified</span>
      </div>
      <div className="max-h-80 divide-y divide-border overflow-y-auto">
        {proofStream.map((item) => (
          <div key={item.name} className={cn("flex items-center justify-between px-5 py-3 transition-colors", item.active && "bg-accent/5")}>
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-lg",
                  item.status === "success" && "bg-success/10 text-success",
                  item.status === "warning" && "bg-warning/10 text-warning",
                )}
              >
                {item.status === "success" ? (
                  <CircleCheck className="h-4 w-4" />
                ) : (
                  <LoaderCircle className={cn("h-4 w-4", item.spinning && "animate-spin")} />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">{item.name}</span>
                  <span className="text-xs text-muted-foreground">{item.schema}</span>
                </div>
                <span className="text-xs text-muted-foreground">{item.source} • {item.batch}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground">{item.duration}</span>
              <button className="text-muted-foreground hover:text-foreground">
                <ExternalLink className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ActivityLogCard() {
  return (
    <div className="dashboard-card rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-medium text-foreground">Activity log</h3>
        </div>
        <div className="flex items-center gap-1">
          <span className="h-2 w-2 animate-pulse rounded-full bg-success" />
          <span className="text-xs text-muted-foreground">Live</span>
        </div>
      </div>
      <div className="h-64 overflow-y-auto font-mono text-xs">
        {activityLog.map((entry) => {
          const Icon = entry.icon;
          const StatusIcon = entry.status;
          return (
            <div
              key={`${entry.time}-${entry.text}`}
              className={cn(
                "flex items-start gap-3 px-4 py-2",
                entry.highlighted && "bg-accent/5 bg-secondary/20",
                entry.striped && "bg-secondary/20",
              )}
            >
              <span className="shrink-0 text-muted-foreground">{entry.time}</span>
              <Icon className={cn("mt-0.5 h-3 w-3 shrink-0", entry.iconClass)} />
              <span className="flex-1 text-foreground">{entry.text}</span>
              {StatusIcon ? <StatusIcon className={cn("h-3 w-3", entry.statusClass)} /> : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function LedgerCard() {
  return (
    <div className="dashboard-card rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div className="flex items-center gap-2">
          <Wallet className="h-4 w-4 text-chart-2" />
          <h3 className="text-sm font-medium text-foreground">Settlement ledger</h3>
        </div>
        <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
          <Eye className="h-3.5 w-3.5" />
          Show
        </button>
      </div>
      <div className="border-b border-border bg-secondary/30 px-5 py-4">
        <p className="text-xs text-muted-foreground">Treasury balance</p>
        <p className="mt-1 font-mono text-xl font-semibold text-foreground">
          •••••• <span className="text-sm text-muted-foreground">USDC</span>
        </p>
        <p className="mt-1 text-xs text-muted-foreground">Route policy: x402 stealth relay + Base escrow</p>
      </div>
      <div className="divide-y divide-border">
        {ledgerItems.map((item) => {
          const Icon = item.incoming ? ArrowDownLeft : ArrowUpRight;
          return (
            <div key={item.name} className="flex items-center justify-between px-5 py-3">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-lg",
                    item.incoming ? "bg-success/10 text-success" : "bg-chart-4/10 text-chart-4",
                  )}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-sm font-medium text-foreground">{item.name}</span>
                  <p className="text-xs text-muted-foreground">{item.memo}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={cn("font-mono text-sm font-medium", item.incoming ? "text-success" : "text-chart-4")}>{item.amount}</p>
                <p className="text-xs text-muted-foreground">{item.state}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="border-t border-border px-5 py-3">
        <p className="text-center text-xs text-muted-foreground">
          Payouts and deposits remain visible without exposing correlated wallet identity.
        </p>
      </div>
    </div>
  );
}

function MemoryCard() {
  return (
    <div className="dashboard-card rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div className="flex items-center gap-2">
          <Database className="h-4 w-4 text-chart-5" />
          <h3 className="text-sm font-medium text-foreground">Vault memory</h3>
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-success/10 px-2.5 py-1 text-xs font-medium text-success">
          <Shield className="h-3 w-3" />
          3 TEE
        </div>
      </div>
      <div className="border-b border-border bg-secondary/30 px-5 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <HardDrive className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium text-foreground">20 MB / 100 MB</p>
              <p className="text-xs text-muted-foreground">Encrypted runtime storage</p>
            </div>
          </div>
          <div className="h-2 w-32 overflow-hidden rounded-full bg-secondary">
            <div className="h-full rounded-full bg-chart-5" style={{ width: "20.28%" }} />
          </div>
        </div>
      </div>
      <div className="divide-y divide-border">
        {memoryItems.map((item, index) => (
          <div key={item.name} className="flex items-center justify-between px-5 py-3">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-success/10 text-success">
                {index === 0 ? <Clock3 className="h-4 w-4" /> : <HardDrive className="h-4 w-4" />}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">{item.name}</span>
                  <Lock className="h-3 w-3 text-muted-foreground" />
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{item.size}</span>
                  <span className="flex items-center gap-1 text-warning">
                    <Trash2 className="h-3 w-3" />
                    {item.flag}
                  </span>
                </div>
              </div>
            </div>
            <span className="text-xs text-muted-foreground">{item.time}</span>
          </div>
        ))}
      </div>
      <div className="border-t border-border px-5 py-3">
        <p className="text-center text-xs text-muted-foreground">
          Sensitive context remains sealed until an attested workflow requests it.
        </p>
      </div>
    </div>
  );
}

export function HomePage() {
  return (
    <div className="dashboard-root min-h-screen bg-background">
      <DashboardSidebar activePath="/" />
      <main className="dashboard-main ml-0 lg:ml-72">
        <DashboardHeader title="Overview" />

        <div className="dashboard-content px-4 py-4 sm:px-6 sm:py-6">
          <MobileQuickNav activePath="/" />

          <section className="dashboard-hero rounded-[1.75rem] border border-white/6 bg-[radial-gradient(circle_at_top_left,rgba(119,224,206,0.08),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.025),rgba(255,255,255,0.008))] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.28)] sm:p-6">
            <div className="flex flex-col gap-8 xl:flex-row xl:items-start xl:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs uppercase tracking-[0.28em] text-accent">Confidential coordination layer</p>
                <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                  Private multi-agent orchestration for sensitive workflows
                </h1>
                <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground">
                  Zero-knowledge coordination, enclave-protected memory, and anonymous settlement rails for valuation,
                  due diligence, and sealed research workloads.
                </p>
                <div className="dashboard-hero-actions mt-6 flex flex-wrap items-center gap-3">
                  <TaskPaymentTrigger className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-colors hover:opacity-90">
                    <Plus className="h-4 w-4" />
                    Launch secure task
                  </TaskPaymentTrigger>
                  <button className="inline-flex items-center gap-2 rounded-xl border border-white/8 bg-card/60 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary/80">
                    <Shield className="h-4 w-4" />
                    Review attestation flow
                  </button>
                </div>
              </div>

              <div className="dashboard-hero-stats grid w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:max-w-xl">
                {overviewStats.map((stat) => (
                  <StatCard key={stat.title} stat={stat} />
                ))}
              </div>
            </div>
          </section>

          <div className="dashboard-home-main-grid mt-6 grid grid-cols-1 gap-6 xl:grid-cols-12">
            <div className="space-y-6 xl:col-span-8">
              <NetworkMap />
              <WorkflowsCard />
            </div>
            <div className="space-y-6 xl:col-span-4">
              <ProofStreamCard />
              <ActivityLogCard />
            </div>
          </div>

          <div className="dashboard-home-secondary-grid mt-6 grid grid-cols-1 gap-6 xl:grid-cols-12">
            <div className="xl:col-span-6">
              <LedgerCard />
            </div>
            <div className="xl:col-span-6">
              <MemoryCard />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
