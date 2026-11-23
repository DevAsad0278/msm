import Link from "next/link";
import type { Tables } from "@/integrations/supabase/types";
import { cn } from "@/lib/utils";
import { pillVariants } from "@/components/site/pill-button";

export function DemoBadge({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center rounded-full bg-secondary px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-primary", className)}>
      Demo placeholder
    </span>
  );
}

export function ProjectFeatureCard({ p }: { p: Tables<"projects"> }) {
  return (
    <Link
      href={`/work/${p.slug}`}
      className="group grid overflow-hidden rounded-[2rem] border border-line bg-surface shadow-soft md:grid-cols-2"
    >
      <div className="flex flex-col justify-between gap-8 p-7 md:p-10">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-display text-2xl font-semibold">{p.title}</h3>
            {p.is_demo && <DemoBadge />}
          </div>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">{p.summary}</p>
        </div>
        <div className="space-y-5">
          <div className="border-t border-line pt-4">
            <p className="text-xs text-muted-foreground">Client:</p>
            <p className="mt-1 flex items-center gap-2 text-sm font-medium"><span className="size-1.5 rounded-full bg-electric" />{p.client}</p>
          </div>
          <div className="border-t border-line pt-4">
            <p className="text-xs text-muted-foreground">Services:</p>
            <p className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm font-medium">
              {p.services.map((s) => (
                <span key={s} className="flex items-center gap-2"><span className="size-1.5 rounded-full bg-electric" />{s}</span>
              ))}
            </p>
          </div>
          <span className={pillVariants({ variant: "primary", size: "sm" })}>See the Work / Case Study ↗</span>
        </div>
      </div>
      <div className="relative min-h-[260px] overflow-hidden md:min-h-[420px]">
        {p.cover_url && (
          <img src={p.cover_url} alt={p.title} loading="lazy" className="absolute inset-0 size-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105" />
        )}
      </div>
    </Link>
  );
}

export function ProjectGridCard({ p }: { p: Tables<"projects"> }) {
  return (
    <Link href={`/work/${p.slug}`} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-muted">
        {p.cover_url && (
          <img src={p.cover_url} alt={p.title} loading="lazy" className="size-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105" />
        )}
        <div className="absolute inset-0 flex items-end bg-fade-ink p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <span className={pillVariants({ variant: "light", size: "sm" })}>View case study ↗</span>
        </div>
        {p.is_demo && <DemoBadge className="absolute left-4 top-4" />}
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-xl font-semibold transition-colors group-hover:text-primary">{p.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{p.client}</p>
        </div>
        <span className="shrink-0 rounded-full border border-line px-3 py-1 text-xs text-muted-foreground">{p.category}</span>
      </div>
    </Link>
  );
}
