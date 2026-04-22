import Link from "next/link";
import { Activity, Bell, Bot, CircleQuestionMark, Database, FileCheck, Github, Globe2, KeyRound, LayoutDashboard, Plus, Search, Settings, Shield, TriangleAlert, Twitter, Wallet } from "lucide-react";
import { ContractAddressChip } from "@/components/contract-address-chip";
import { DevAdminAvatar } from "@/components/dev-admin-avatar";
import { RuntimeLogo } from "@/components/runtime-logo";
import { TaskPaymentTrigger, WalletStatusCard } from "@/components/task-payment-provider";

const socialLinks = [
  { href: "https://www.xphm.fun/", label: "Website", icon: Globe2 },
  { href: "https://x.com/XPhantom_s", label: "X", icon: Twitter },
  { href: "https://github.com/XPhantom-max/XPhantom.git", label: "GitHub", icon: Github },
];

export const navGroups = [
  [
    { href: "/", icon: LayoutDashboard, label: "Overview" },
    { href: "/agents", icon: Bot, label: "Agents", trailingIcon: TriangleAlert, trailingClass: "text-warning" },
    { href: "/tasks", icon: Activity, label: "Tasks", trailing: "2" },
    { href: "/proofs", icon: Shield, label: "ZK Proofs" },
    { href: "/memory", icon: Database, label: "Memory" },
    { href: "/payments", icon: Wallet, label: "Payments" },
    { href: "/compliance", icon: FileCheck, label: "Compliance" },
  ],
  [
    { href: "/api-keys", icon: KeyRound, label: "API Keys" },
    { href: "/settings", icon: Settings, label: "Settings" },
    { href: "/help", icon: CircleQuestionMark, label: "Help" },
  ],
];

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function NavItem({ item, activePath }) {
  const Icon = item.icon;
  const TrailingIcon = item.trailingIcon;
  const isActive = item.href === activePath;

  return (
    <Link
      href={item.href}
      className={cn(
        "dashboard-nav-item flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition-colors",
        isActive
          ? "bg-accent/12 text-accent shadow-[inset_0_0_0_1px_rgba(119,224,206,0.15)]"
          : "text-muted-foreground hover:bg-secondary/80 hover:text-foreground",
      )}
    >
      <Icon className="h-4 w-4" />
      <span className="flex-1">{item.label}</span>
      {item.trailing ? (
        <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[11px] text-accent">{item.trailing}</span>
      ) : null}
      {TrailingIcon ? <TrailingIcon className={cn("h-3.5 w-3.5", item.trailingClass)} /> : null}
    </Link>
  );
}

function SocialLinks({ compact = false }) {
  return (
    <div className={compact ? "dashboard-social-links is-compact" : "dashboard-social-links"}>
      {socialLinks.map((item) => {
        const Icon = item.icon;
        return (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            aria-label={item.label}
            title={item.label}
          >
            <Icon className="h-4 w-4" />
            {compact ? null : <span>{item.label}</span>}
          </a>
        );
      })}
    </div>
  );
}

export function DashboardSidebar({ activePath }) {
  return (
    <aside className="dashboard-sidebar surface-panel fixed left-0 top-0 z-40 hidden h-screen w-72 border-r border-sidebar-border bg-sidebar/90 lg:block">
      <div className="flex h-full flex-col">
        <Link href="/" className="flex h-16 items-center gap-3 border-b border-sidebar-border px-6 cursor-pointer select-none">
          <RuntimeLogo />
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-foreground">XPhantom</span>
            <span className="text-xs text-muted-foreground">Privacy Multi-Agent Runtime</span>
          </div>
        </Link>

        <div className="mesh-card mx-4 mt-4 rounded-3xl border border-accent/20 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Cluster status</p>
              <p className="mt-1 text-lg font-semibold text-foreground">Mainnet secure</p>
            </div>
            <span className="flex items-center gap-2 rounded-full border border-success/30 bg-success/10 px-2.5 py-1 text-xs font-medium text-success">
              <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
              live
            </span>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            {[
              ["4", "active", "text-foreground"],
              ["2", "running", "text-foreground"],
              ["1", "alerts", "text-warning"],
            ].map(([value, label, color]) => (
              <div key={label} className="rounded-2xl border border-white/5 bg-background/40 p-2">
                <p className={cn("text-lg font-semibold", color)}>{value}</p>
                <p className="text-[11px] text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {navGroups[0].map((item) => (
            <NavItem key={item.href} item={item} activePath={activePath} />
          ))}
        </nav>

        <div className="border-t border-sidebar-border px-3 py-4">
          {navGroups[1].map((item) => (
            <NavItem key={item.href} item={item} activePath={activePath} />
          ))}
        </div>

        <div className="border-t border-sidebar-border p-4">
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">Links</p>
          <SocialLinks />
        </div>

        <div className="border-t border-sidebar-border p-4">
          <WalletStatusCard />
        </div>
      </div>
    </aside>
  );
}

export function DashboardHeader({ title }) {
  return (
    <header className="dashboard-header sticky top-0 z-30 flex min-h-16 flex-col gap-3 border-b border-white/6 bg-background/55 px-4 py-3 backdrop-blur-xl sm:px-6 lg:h-16 lg:flex-row lg:items-center lg:justify-between lg:py-0">
      <div className="dashboard-title-row flex min-w-0 items-center justify-between gap-4 lg:justify-start lg:gap-5">
        <div className="dashboard-mobile-brand flex items-center gap-3 lg:hidden">
          <RuntimeLogo />
          <div className="dashboard-mobile-brand-copy min-w-0">
            <p className="truncate text-sm font-semibold text-foreground">XPhantom</p>
            <p className="truncate text-xs text-muted-foreground">Privacy Multi-Agent Runtime</p>
          </div>
        </div>
        <nav className="dashboard-breadcrumb hidden items-center gap-2 text-sm lg:flex">
          <Link className="text-muted-foreground transition-colors hover:text-foreground" href="/">
            Dashboard
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="font-medium text-foreground">{title}</span>
        </nav>
        <div className="dashboard-status-pill hidden items-center gap-2 rounded-full border border-white/8 bg-card/70 px-3 py-1.5 text-xs text-muted-foreground md:flex">
          <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
          4 active agents
          <span className="text-border">•</span>
          2 active workflows
        </div>
      </div>

      <div className="dashboard-actions flex items-center gap-2 sm:gap-3">
        <SocialLinks compact />
        <ContractAddressChip />
        <div className="dashboard-search relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search agents, tasks, proofs..."
            className="h-9 w-48 rounded-2xl border border-white/8 bg-secondary/85 pl-9 pr-16 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none lg:w-72"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 rounded border border-border bg-background px-1.5 text-xs text-muted-foreground">
            live
          </kbd>
        </div>

        <TaskPaymentTrigger className="dashboard-new-task inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-3 py-2 text-sm font-medium text-accent-foreground transition-colors hover:opacity-90 sm:px-4">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">New Task</span>
        </TaskPaymentTrigger>

        <button className="dashboard-icon-button relative rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-foreground" aria-label="Open notifications">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive" />
        </button>

        <DevAdminAvatar />
      </div>
    </header>
  );
}

export function MobileQuickNav({ activePath }) {
  return (
    <div className="dashboard-mobile-nav mb-6 lg:hidden">
      <div className="dashboard-mobile-social">
        <SocialLinks compact />
      </div>
      <div className="dashboard-mobile-nav-track flex gap-3 overflow-x-auto pb-2">
        {navGroups[0].map((item) => {
          const Icon = item.icon;
          const isActive = item.href === activePath;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "dashboard-mobile-nav-item flex min-w-max items-center gap-2 rounded-2xl border px-3 py-2 text-sm font-medium",
                isActive
                  ? "border-accent/20 bg-accent/12 text-accent"
                  : "border-white/8 bg-card/70 text-muted-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
