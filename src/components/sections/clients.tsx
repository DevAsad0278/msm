'use client';

import { useQuery } from "@tanstack/react-query";
import { Sparkles } from "lucide-react";
import { clientLogosQuery } from "@/lib/queries";
import { SectionHeading } from "@/components/site/section-heading";

export function useClientLogos() {
  const { data } = useQuery(clientLogosQuery);
  const real = (data ?? []).filter((l) => l.logo_url || l.name);
  if (real.length) return real.map((l) => ({ id: l.id, name: l.name, logo: l.logo_url, placeholder: false }));
  return Array.from({ length: 6 }, (_, i) => ({ id: `p${i}`, name: "Client logo", logo: null as string | null, placeholder: true }));
}

export function LogoCard({ name, logo, placeholder, tone = "light" }: { name: string; logo: string | null; placeholder: boolean; tone?: "light" | "dark" }) {
  return (
    <div
      className={
        tone === "dark"
          ? "flex h-20 w-52 shrink-0 items-center justify-center gap-2 rounded-2xl border border-line-dark bg-ink-foreground/5 px-6 text-ink-foreground/70 backdrop-blur"
          : "flex h-20 w-52 shrink-0 items-center justify-center gap-2 rounded-2xl border border-line bg-white px-6 text-foreground/70 shadow-sm transition-all hover:border-electric hover:text-primary hover:shadow-soft"
      }
    >
      {logo ? (
        <img src={logo} alt={name} loading="lazy" className="max-h-9 w-auto object-contain" />
      ) : (
        <>
          <Sparkles className="size-4" />
          <span className="font-display text-sm font-semibold">{placeholder ? "Your logo here" : name}</span>
        </>
      )}
    </div>
  );
}

export function Clients() {
  const logos = useClientLogos();
  const row = [...logos, ...logos, ...logos];
  return (
    <section aria-label="Our clients" className="pb-24 md:pb-32">
      <div className="container-x">
        <SectionHeading
          title={["Our Clients"]}
          text="Brands, founders and organisations across Pakistan and international markets trust MSM to grow."
        />
      </div>
      <div className="mt-12 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
        <div className="marquee-track pause-on-hover gap-4 [--marquee-duration:45s]">
          {[0, 1].map((dup) => (
            <div key={dup} aria-hidden={dup === 1} className="flex shrink-0 gap-4 pr-4">
              {row.map((l, i) => (
                <LogoCard key={`${dup}-${l.id}-${i}`} {...l} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
