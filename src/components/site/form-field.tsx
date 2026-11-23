import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const inputClass =
  "w-full rounded-2xl border border-line bg-surface px-4 py-3.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-electric focus:ring-2 focus:ring-electric/20";

export function Field({ label, error, children, className, htmlFor }: { label: string; error?: string | undefined; children: ReactNode; className?: string; htmlFor: string }) {
  return (
    <div className={cn("space-y-2", className)}>
      <label htmlFor={htmlFor} className="text-sm font-medium">{label}</label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
