"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

/**
 * SanityLive refreshes the route on every content change — including draft
 * autosaves. That is what we want on the public site, but inside the embedded
 * Studio it reloads the editor on every keystroke. So we never mount live
 * updates (or visual editing) under /studio.
 */
export function SanityLiveGate({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  if (pathname?.startsWith("/studio")) {
    return null;
  }

  return <>{children}</>;
}
