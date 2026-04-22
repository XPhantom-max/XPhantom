import { Activity, Bot, CircleAlert, CircleCheck, LoaderCircle, Shield } from "lucide-react";

const homePageData = {
  overviewStats: [
    { title: "Sealed tasks", value: "12", label: "Confidential pipelines", trend: "+3 this week", tone: "success" },
    { title: "Proofs generated", value: "148", label: "ZK attestations", trend: "+19 today", tone: "accent" },
    { title: "TEE memory", value: "20.28 MB", label: "Encrypted context usage", trend: "3 enclaves active", tone: "chart-5" },
    { title: "Response latency", value: "3.6s", label: "Avg. Response Time", trend: "-180ms QoQ", tone: "chart-4" },
  ],
  networkNodes: [
    { name: "Master Coordinator", role: "Global Orchestrator", cpu: 72, queue: 5, left: "50%", top: "16%", tone: "accent", status: "success" },
    { name: "Research Alpha", role: "Protocol Research", cpu: 61, queue: 7, left: "19%", top: "42%", tone: "success", status: "success" },
    { name: "Valuation Beta", role: "RWA Modeling", cpu: 84, queue: 4, left: "81%", top: "49%", tone: "success", status: "success" },
    { name: "Privacy Guard", role: "Sanitization Firewall", cpu: 48, queue: 2, left: "17%", top: "79%", tone: "success", status: "success" },
    { name: "Compliance Checker", role: "Policy Auditor", cpu: 19, queue: 0, left: "50%", top: "79%", tone: "neutral", status: "warning" },
    { name: "Data Harvester", role: "External Ingestion", cpu: 92, queue: 12, left: "83%", top: "79%", tone: "destructive", status: "destructive" },
  ],
  workflows: [
    { name: "RWA Property Valuation - Tokyo Office", kind: "RWA Valuation", agents: 4, proofs: 12, eta: "~8 min", cu: "242 CU", tier: "Maximum", region: "APAC", progress: 67, bar: "bg-accent", icon: LoaderCircle, iconClass: "animate-spin text-accent" },
    { name: "On-chain Due Diligence - DeFi Protocol", kind: "Due Diligence", agents: 6, proofs: 28, eta: "~3 min", cu: "418 CU", tier: "Enhanced", region: "Global", progress: 88, bar: "bg-chart-3", icon: Shield, iconClass: "animate-pulse text-chart-3" },
    { name: "Competitor Analysis - Fintech Sector", kind: "Market Research", agents: 3, proofs: 8, eta: "2026-04-08 17:42:00", cu: "124 CU", tier: "Standard", region: "US", progress: 100, bar: "bg-success", icon: CircleCheck, iconClass: "text-success" },
    { name: "Token Economics Audit", kind: "Due Diligence", agents: 2, proofs: 3, eta: "2026-04-08 16:18:00", cu: "89 CU", tier: "Enhanced", region: "EU", progress: 45, bar: "bg-destructive", icon: CircleAlert, iconClass: "text-destructive" },
  ],
  proofStream: [
    { name: "Contribution Proof", schema: "ContributionV2", source: "Research Alpha", batch: "B-2044", duration: "0.34s", status: "success", active: true },
    { name: "Data Integrity", schema: "IntegrityV3", source: "Privacy Guard", batch: "B-2044", duration: "0.28s", status: "success" },
    { name: "Computation Proof", schema: "ComputeV1", source: "Valuation Beta", batch: "B-2045", duration: "-", status: "warning", spinning: true },
  ],
  activityLog: [
    { time: "18:58:00", text: "Coordinator cluster synchronized with enclave attestation registry.", icon: Activity, iconClass: "text-muted-foreground", status: CircleCheck, statusClass: "text-success", highlighted: true },
    { time: "18:58:09", text: "Valuation Beta accepted RWA Property Valuation workload.", icon: Bot, iconClass: "text-muted-foreground" },
    { time: "18:58:15", text: "Contribution proof batch B-2044 finalized.", icon: Shield, iconClass: "text-muted-foreground", status: CircleCheck, statusClass: "text-success", striped: true },
  ],
  ledgerItems: [
    { name: "Research Alpha", memo: "RWA Property Valuation", amount: "-•••• USDC", state: "confirmed", incoming: false },
    { name: "Privacy Guard", memo: "On-chain Due Diligence", amount: "-•••• USDC", state: "confirmed", incoming: false },
    { name: "Valuation Beta", memo: "RWA Property Valuation", amount: "-•••• USDC", state: "pending", incoming: false },
    { name: "Settlement Deposit", memo: "Account Top-up", amount: "+•••• USDC", state: "confirmed", incoming: true },
  ],
  memoryItems: [
    { name: "Task Context - RWA Valuation", size: "2.4 MB", flag: "Auto-wipe", time: "just now" },
    { name: "Research Notes - Protocol Scan", size: "13 MB", flag: "Auto-wipe", time: "5m ago" },
    { name: "Cache - Market Analysis", size: "4.2 MB", flag: "Auto-wipe", time: "1h ago" },
  ],
};

export function getHomePageData() {
  return homePageData;
}
