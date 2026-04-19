import {
  Activity,
  ChevronDown,
  ChevronRight,
  CircleCheck,
  CircleX,
  Clock3,
  Funnel,
  Search,
} from "lucide-react";
import { DashboardHeader, DashboardSidebar, MobileQuickNav } from "@/components/dashboard-shell";
import { getDashboardTasksData } from "@/lib/services/dashboard";

const { executionStages, filters, summaryCards, workflows } = getDashboardTasksData();

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function toneClasses(tone) {
  if (tone === "accent") return "bg-accent/10 text-accent";
  if (tone === "warning") return "bg-warning/10 text-warning";
  if (tone === "success") return "bg-success/10 text-success";
  if (tone === "destructive") return "bg-destructive/10 text-destructive";
  if (tone === "chart-3") return "bg-chart-3/10 text-chart-3";
  return "bg-secondary text-foreground";
}

function progressTone(tone) {
  if (tone === "accent") return "bg-accent";
  if (tone === "warning") return "bg-warning";
  if (tone === "success") return "bg-success";
  if (tone === "destructive") return "bg-destructive";
  if (tone === "chart-3") return "bg-chart-3";
  return "bg-muted";
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

function WorkflowList() {
  return (
    <div className="dashboard-card rounded-xl border border-border bg-card">
      <div className="flex flex-col gap-4 border-b border-border p-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <h2 className="font-semibold text-foreground">Workflow queue</h2>
          <p className="text-sm text-muted-foreground">Monitor execution progress, replay failures, and promote queued jobs.</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Search workflows..."
              className="h-9 w-full rounded-lg border border-border bg-secondary pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none sm:w-52"
            />
          </div>
          <button className="flex h-9 items-center gap-2 rounded-lg border border-border bg-secondary px-3 text-sm text-muted-foreground">
            <Funnel className="h-4 w-4" />
            Regional
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 border-b border-border p-4">
        {filters.map(([label, count], index) => (
          <button
            key={label}
            className={cn(
              "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              index === 0 ? "bg-accent text-accent-foreground" : "bg-secondary text-muted-foreground hover:text-foreground",
            )}
          >
            {label}
            <span className="ml-2 text-xs opacity-70">{count}</span>
          </button>
        ))}
      </div>

      <div className="divide-y divide-border">
        {workflows.map((workflow) => {
          const Icon = workflow.icon;
          return (
            <div key={workflow.name} className={cn("transition-colors", workflow.expanded && "bg-accent/5")}>
              <button className="w-full p-4 text-left hover:bg-secondary/40">
                <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                  <div className="flex items-center gap-4">
                    <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg", toneClasses(workflow.tone))}>
                      <Icon className={cn("h-5 w-5", workflow.status === "running" && "animate-pulse")} />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{workflow.name}</h3>
                      <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                        <span>{workflow.kind}</span>
                        <span>•</span>
                        <span>{workflow.privacy}</span>
                        <span>•</span>
                        <span>{workflow.region}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 sm:gap-6">
                    <div className="text-right text-sm">
                      <p className="font-medium text-foreground">{workflow.cu}</p>
                      <p className="text-xs text-muted-foreground">{workflow.proofs} proofs</p>
                    </div>
                    <div className="text-right text-sm">
                      <p className="font-medium text-foreground">{workflow.agents} agents</p>
                      <p className="text-xs text-muted-foreground">{workflow.queueText || `${workflow.progress}%`}</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-secondary">
                  <div className={cn("h-full rounded-full transition-all", progressTone(workflow.tone))} style={{ width: `${workflow.progress}%` }} />
                </div>
              </button>

              {workflow.expanded ? (
                <div className="border-t border-border p-4">
                  <div className="grid grid-cols-1 gap-5 2xl:grid-cols-[1.3fr_0.8fr]">
                    <div>
                      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
                        {[
                          ["Start time", "2026-04-08 18:32:00"],
                          ["ETA / end", "~8 min"],
                          ["Risk score", "18/100"],
                          ["Privacy", "Maximum"],
                        ].map(([label, value]) => (
                          <div key={label} className="rounded-lg border border-border bg-card p-3">
                            <p className="text-xs text-muted-foreground">{label}</p>
                            <p className="mt-1 text-sm font-medium text-foreground">{value}</p>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 rounded-xl border border-border bg-background/60 p-4">
                        <p className="text-sm font-medium text-foreground">Execution stages</p>
                        <div className="mt-3 space-y-3">
                          {executionStages.map((stage) => (
                            <div key={stage.name}>
                              <div className="mb-1 flex items-center justify-between text-sm">
                                <span className="text-foreground">{stage.name}</span>
                                <span className="text-muted-foreground">{stage.value}</span>
                              </div>
                              <div className="h-2 overflow-hidden rounded-full bg-secondary">
                                <div className={cn("h-full rounded-full", stage.color)} style={{ width: `${stage.progress}%` }} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="rounded-xl border border-border bg-background/60 p-4">
                      <p className="text-sm font-medium text-foreground">Operator actions</p>
                      <div className="mt-4 space-y-3">
                        <div className="rounded-lg border border-border p-3">
                          <p className="text-xs text-muted-foreground">Runtime note</p>
                          <p className="mt-1 text-sm text-foreground">Workflow is inside the secure execution window.</p>
                        </div>
                        <button className="w-full rounded-lg bg-accent px-3 py-2 text-sm font-medium text-accent-foreground">
                          Promote proof generation
                        </button>
                        <button className="w-full rounded-lg border border-border bg-secondary px-3 py-2 text-sm font-medium text-foreground">
                          Export attestation bundle
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function TasksPage() {
  return (
    <div className="dashboard-root min-h-screen bg-background">
      <DashboardSidebar activePath="/tasks" />
      <main className="dashboard-main ml-0 lg:ml-72">
        <DashboardHeader title="Workflow Runtime" />
        <div className="dashboard-content px-4 py-4 sm:px-6 sm:py-6">
          <MobileQuickNav activePath="/tasks" />

          <div className="dashboard-summary-grid mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4">
            {summaryCards.map((card) => (
              <SummaryCard key={card.label} card={card} />
            ))}
          </div>

          <WorkflowList />
        </div>
      </main>
    </div>
  );
}
