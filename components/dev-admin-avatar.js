"use client";

import { useRef } from "react";
import { useDeveloperAdmin } from "@/components/developer-admin-provider";

export function DevAdminAvatar() {
  const { openAdmin } = useDeveloperAdmin();
  const clicksRef = useRef([]);

  function handleClick() {
    const now = Date.now();
    clicksRef.current = [...clicksRef.current.filter((stamp) => now - stamp < 2000), now];

    if (clicksRef.current.length >= 5) {
      clicksRef.current = [];
      openAdmin();
    }
  }

  return (
    <button
      onClick={handleClick}
      className="developer-avatar flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[linear-gradient(135deg,rgba(119,224,206,0.2),rgba(156,214,110,0.16))] text-sm font-semibold text-foreground shadow-[0_10px_24px_rgba(0,0,0,0.18)] transition-transform hover:scale-[1.02]"
      aria-label="User avatar"
      data-dev-admin-trigger="true"
      title="Operator avatar"
    >
      <img
        src="/xphantom-logo.jpg"
        alt="XPhantom avatar"
        className="h-full w-full rounded-full object-cover"
      />
    </button>
  );
}
