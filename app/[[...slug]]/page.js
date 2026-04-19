import { notFound } from "next/navigation";
import { AgentsPage } from "@/components/agents-page";
import { HomePage } from "@/components/home-page";
import { MemoryPage } from "@/components/memory-page";
import { ProofsPage } from "@/components/proofs-page";
import { TasksPage } from "@/components/tasks-page";
import { SnapshotPage } from "@/components/snapshot-page";
import { getRouteParams, getSnapshotMarkup, routeEntries } from "@/lib/snapshots";

export function generateStaticParams() {
  return routeEntries.map((entry) => ({
    slug: entry.slug.length ? entry.slug : undefined,
  }));
}

export default async function CatchAllPage({ params }) {
  const { slug } = await params;
  const route = getRouteParams(slug);

  if (!route) {
    notFound();
  }

  if (route.file === "home.html") {
    return <HomePage />;
  }

  if (route.file === "agents.html") {
    return <AgentsPage />;
  }

  if (route.file === "tasks.html") {
    return <TasksPage />;
  }

  if (route.file === "proofs.html") {
    return <ProofsPage />;
  }

  if (route.file === "memory.html") {
    return <MemoryPage />;
  }

  const markup = await getSnapshotMarkup(route.file);

  return <SnapshotPage markup={markup} />;
}
