import { Clock3, Database, HardDrive, Shield } from "lucide-react";

const memoryPageData = {
  summaryCards: [
    { value: "5", label: "Memory slots", icon: Database, tone: "accent" },
    { value: "20 MB", label: "Total size", icon: HardDrive, tone: "chart-2" },
    { value: "3", label: "TEE protected", icon: Shield, tone: "success" },
    { value: "3", label: "Forget mode", icon: Clock3, tone: "warning" },
  ],
  slots: [
    { name: "Task Context - RWA Valuation", type: "Task Memory", sensitivity: "Restricted", size: "2.4 MB", replicas: "2 replicas", secure: true, active: true },
    { name: "Agent State - Research Alpha", type: "Agent Memory", sensitivity: "Confidential", size: "877 KB", replicas: "3 replicas", secure: true },
    { name: "RAG Index - Protocol Data", type: "RAG Memory", sensitivity: "Confidential", size: "13 MB", replicas: "2 replicas", secure: true },
    { name: "Cache - Market Analysis", type: "Cache", sensitivity: "Public", size: "4.2 MB", replicas: "1 replica", secure: false },
    { name: "Policy Preferences", type: "System Memory", sensitivity: "Confidential", size: "25 KB", replicas: "2 replicas", secure: true, muted: true },
  ],
  selectedSlot: {
    name: "Task Context - RWA Valuation",
    type: "Task Memory",
    sensitivity: "Restricted",
    details: [
      ["Last access", "just now"],
      ["Expiry", "24h"],
      ["Replication", "2 copies"],
      ["Encryption", "AES-GCM sealed"],
    ],
  },
  vaultHealth: [
    ["Sealed replicas", "7 healthy", "success"],
    ["Runtime pressure", "20%", "foreground"],
    ["Forget-mode policy", "armed", "warning"],
  ],
};

export function getMemoryPageData() {
  return memoryPageData;
}
