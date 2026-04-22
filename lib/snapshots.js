import { readFile } from "node:fs/promises";
import path from "node:path";

const snapshotsDir = path.join(process.cwd(), "srcdump");

export const routeEntries = [
  { file: "home.html", slug: [] },
  { file: "agents.html", slug: ["agents"] },
  { file: "tasks.html", slug: ["tasks"] },
  { file: "proofs.html", slug: ["proofs"] },
  { file: "memory.html", slug: ["memory"] },
  { file: "payments.html", slug: ["payments"] },
  { file: "compliance.html", slug: ["compliance"] },
  { file: "api-keys.html", slug: ["api-keys"] },
  { file: "settings.html", slug: ["settings"] },
  { file: "help.html", slug: ["help"] },
];

export function getRouteParams(slug = []) {
  const normalized = Array.isArray(slug) ? slug : [slug];
  return routeEntries.find(
    (entry) => entry.slug.join("/") === normalized.filter(Boolean).join("/"),
  );
}

function extractBody(html) {
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (!bodyMatch) {
    return "";
  }

  return bodyMatch[1]
    .replace(/<div hidden="">[\s\S]*?<\/div>/i, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .trim();
}

function applyBranding(markup) {
  return markup
    .replaceAll("Private Multi-Agent Coordinator", "XPhantom")
    .replaceAll("PMAC Control", "XPhantom")
    .replaceAll("PMAC", "XPhantom")
    .replaceAll("https://x.com/ZKAC_sol", "https://x.com/XPhantom_s")
    .replaceAll("https://x.com/zkacfun", "https://x.com/XPhantom_s")
    .replaceAll("https://github.com/zkacfun", "https://github.com/XPhantom-max/XPhantom.git")
    .replace(
      /<div class="flex h-9 w-9 items-center justify-center rounded-xl bg-\[linear-gradient\(135deg,rgba\(119,224,206,1\),rgba\(156,214,110,1\)\)\] shadow-\[0_8px_30px_rgba\(119,224,206,0\.35\)\]">[\s\S]*?<\/svg><\/div>/g,
      '<img src="/xphantom-logo.png" alt="XPhantom logo" class="h-9 w-9 rounded-xl object-cover shadow-[0_8px_30px_rgba(119,224,206,0.18)]"/>',
    );
}

export async function getSnapshotMarkup(fileName) {
  const fullPath = path.join(snapshotsDir, fileName);
  const html = await readFile(fullPath, "utf8");
  return applyBranding(extractBody(html));
}
