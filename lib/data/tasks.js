import { Activity, CircleCheck, CircleX, Clock3 } from "lucide-react";

const tasksPageData = {
  summaryCards: [
    { value: "2", label: "Active workflows", icon: Activity, tone: "accent" },
    { value: "1", label: "Queued", icon: Clock3, tone: "warning" },
    { value: "1", label: "Completed", icon: CircleCheck, tone: "success" },
    { value: "1", label: "Failed", icon: CircleX, tone: "destructive" },
  ],
  filters: [
    ["all", 5],
    ["running", 1],
    ["verifying", 1],
    ["completed", 1],
    ["failed", 1],
    ["queued", 1],
  ],
  workflows: [
    { name: "RWA Property Valuation - Tokyo Office", kind: "RWA Valuation", privacy: "Maximum", region: "APAC", cu: "242 CU", proofs: 12, agents: 4, progress: 67, status: "running", icon: Activity, tone: "accent", expanded: true },
    { name: "On-chain Due Diligence - DeFi Protocol", kind: "Due Diligence", privacy: "Enhanced", region: "Global", cu: "418 CU", proofs: 28, agents: 6, progress: 88, status: "verifying", icon: Clock3, tone: "chart-3" },
    { name: "Competitor Analysis - Fintech Sector", kind: "Market Research", privacy: "Standard", region: "US", cu: "124 CU", proofs: 8, agents: 3, progress: 100, status: "completed", icon: CircleCheck, tone: "success" },
    { name: "Token Economics Audit", kind: "Due Diligence", privacy: "Enhanced", region: "EU", cu: "89 CU", proofs: 3, agents: 2, progress: 45, status: "failed", icon: CircleX, tone: "destructive" },
    { name: "Private Portfolio Analysis", kind: "Private Data", privacy: "Maximum", region: "Private enclave", cu: "0 CU", proofs: 0, agents: 0, progress: 0, status: "queued", icon: Clock3, tone: "warning", queueText: "queue #3" },
  ],
  executionStages: [
    { name: "Data Collection", value: "2m 14s", progress: 100, color: "bg-success" },
    { name: "Market Analysis", value: "3m 45s", progress: 100, color: "bg-success" },
    { name: "Valuation Model", value: "45%", progress: 45, color: "bg-accent" },
    { name: "Report Generation", value: "pending", progress: 12, color: "bg-muted" },
  ],
};

export function getTasksPageData() {
  return tasksPageData;
}
