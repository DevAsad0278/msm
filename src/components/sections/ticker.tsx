'use client';

import { TICKER_ITEMS } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Ticker({ tone = "light", reverse = false }: { tone?: "light" | "dark"; reverse?: boolean }) {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
  const dark = tone === "dark";
  return (
    <div
      aria-label="Our specialties"
      className={cn(
        "overflow-hidden border-y py-4",
        dark ? "border-line-dark bg-ink text-ink-foreground" : "border-line bg-white text-ink",
      )}
    >
      <div className={cn("marquee-track pause-on-hover [--marquee-duration:36s]", reverse && "marquee-reverse")}>
        {[0, 1].map((dup) => (
          <ul key={dup} aria-hidden={dup === 1} className="flex shrink-0 items-center">
            {items.map((t, i) => (
              <li
                key={`${dup}-${i}`}
                className={cn(
                  "flex items-center gap-2.5 border-r px-7 font-display text-xs font-semibold uppercase tracking-[0.14em] md:text-sm",
                  dark ? "border-white/15" : "border-line",
                )}
              >
                <span className="text-electric">/</span>
                {t}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
