import { Clock3, RefreshCw, Shield } from "lucide-react";

const proofsPageData = {
  summaryCards: [
    { value: "2", label: "Verified proofs", icon: Shield, tone: "success" },
    { value: "1", label: "Generating", icon: RefreshCw, tone: "accent", spin: true },
    { value: "0.31s", label: "Avg verification", icon: Clock3, tone: "warning" },
    { value: "3", label: "Active circuits", icon: Shield, tone: "chart-2" },
  ],
  streamFilters: ["all", "verified", "generating"],
  proofs: [
    { name: "Contribution Proof", circuit: "ContributionV2", source: "Research Alpha", workflow: "RWA Property Valuation", batch: "B-2044", hashShort: "0x7f8a3b4c...7d8e9f0a", hashFull: "0x7f8a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a", time: "2026-04-08 18:35:22", verification: "0.34s", status: "verified", expanded: true },
    { name: "Data Integrity", circuit: "IntegrityV3", source: "Privacy Guard", workflow: "On-chain Due Diligence", batch: "B-2044", hashShort: "0x1a2b3c4d...7e8f9a0b", time: "2026-04-08 18:35:18", status: "verified" },
    { name: "Computation Proof", circuit: "ComputeV1", source: "Valuation Beta", workflow: "RWA Property Valuation", batch: "B-2045", hashShort: "0x......0x...", time: "2026-04-08 18:35:15", status: "generating" },
  ],
  verifierQueue: [
    { label: "Verifier workers", value: "3 online", tone: "success" },
    { label: "Queue depth", value: "1 pending", tone: "warning" },
    { label: "TEE witness sync", value: "healthy", tone: "success" },
  ],
  circuits: [
    { name: "ContributionV2", usage: "42%", proofs: 1284, tone: "bg-accent" },
    { name: "IntegrityV3", usage: "31%", proofs: 923, tone: "bg-success" },
    { name: "ComputeV1", usage: "27%", proofs: 466, tone: "bg-chart-2" },
  ],
};

export function getProofsPageData() {
  return proofsPageData;
}
