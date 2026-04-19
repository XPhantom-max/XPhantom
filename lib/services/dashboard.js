import { getAgentsPageData } from "@/lib/data/agents";
import { getHomePageData } from "@/lib/data/home";
import { getMemoryPageData } from "@/lib/data/memory";
import { getProofsPageData } from "@/lib/data/proofs";
import { getTasksPageData } from "@/lib/data/tasks";

export function getDashboardHomeData() {
  return getHomePageData();
}

export function getDashboardAgentsData() {
  return getAgentsPageData();
}

export function getDashboardTasksData() {
  return getTasksPageData();
}

export function getDashboardProofsData() {
  return getProofsPageData();
}

export function getDashboardMemoryData() {
  return getMemoryPageData();
}
