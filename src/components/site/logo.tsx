'use client';

import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <Link
      href="/"
      aria-label="MSM Marketing Agency — home"
      className={cn(
        "inline-flex items-center shrink-0 transition-opacity hover:opacity-90",
        tone === "light" && "rounded-xl bg-white/95 px-3 py-1.5 shadow-sm",
        className,
      )}
    >
      <img
        src="/logomsm.png"
        alt="MSM Marketing Agency"
        className="h-9 md:h-10 w-auto object-contain select-none"
      />
    </Link>
  );
}
