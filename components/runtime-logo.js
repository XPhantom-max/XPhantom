"use client";

import { Shield } from "lucide-react";

export function RuntimeLogo({ className = "h-9 w-9", iconClassName = "h-4 w-4" }) {
  const logoUrl = "/xphantom-logo.png";

  if (logoUrl) {
    return (
      <img
        src={logoUrl}
        alt="XPhantom logo"
        className={`${className} rounded-xl object-cover shadow-[0_8px_30px_rgba(119,224,206,0.18)]`}
      />
    );
  }

  return (
    <div className={`${className} flex items-center justify-center rounded-xl bg-[linear-gradient(135deg,rgba(119,224,206,1),rgba(156,214,110,1))] shadow-[0_8px_30px_rgba(119,224,206,0.35)]`}>
      <Shield className={`${iconClassName} text-accent-foreground`} />
    </div>
  );
}
