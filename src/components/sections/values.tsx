'use client';

import Link from "next/link";
import { Lightbulb, ShieldCheck, Users } from "lucide-react";
import { VALUES } from "@/lib/site";
import { IMG } from "@/lib/images";
import { PillLink } from "@/components/site/pill-button";
import { Reveal, SplitReveal } from "@/components/site/motion";

const ICONS = [Lightbulb, Users, ShieldCheck];
const CARD_IMAGES = [IMG.valuesTeam, IMG.marketing, IMG.design];

export function Values() {
  const [first, ...rest] = VALUES;
  const FirstIcon = ICONS[0]!;

  return (
    <section aria-label="Our values" className="bg-[#F7F6F3]/80 py-20 md:py-28">
      <div className="container-x">
        {/* Top Header Row matching screenshot */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 className="display-md max-w-xl text-[#101116]">
            <SplitReveal lines={["Our Values"]} />
          </h2>
          <Reveal className="max-w-sm md:text-right">
            <p className="text-sm leading-relaxed text-[#777D89] md:text-base">
              The principles that shape every idea, partnership and project we take on.
            </p>
            <PillLink to="/about" className="mt-5">
              About MSM
            </PillLink>
          </Reveal>
        </div>

        {/* Featured Wide Card (01 Innovation) matching screenshot 1 & 2 */}
        {first && (
          <Reveal className="mt-12">
            <article className="group grid gap-6 rounded-[2rem] border border-black/5 bg-white p-4 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-card md:grid-cols-[1.08fr_1fr] md:p-5">
              <div className="aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-muted md:aspect-auto md:min-h-[360px]">
                <img
                  src={CARD_IMAGES[0]}
                  alt={first.title}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                />
              </div>

              <div className="flex flex-col justify-between gap-6 p-3 md:p-6">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#F5F7FB] px-3.5 py-1.5 text-xs font-semibold text-[#101116]">
                    <span className="size-1.5 rounded-full bg-[#153E9F]" />
                    <FirstIcon className="size-3.5 text-[#153E9F]" />
                    <span>
                      {first.n} · Value
                    </span>
                  </span>

                  <h3 className="mt-6 font-display text-2xl font-bold tracking-tight text-[#101116] transition-colors group-hover:text-[#153E9F] md:text-3xl">
                    {first.title}
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-[#777D89] md:text-base">
                    {first.text}
                  </p>
                </div>

                <Link
                  href="/about"
                  className="inline-flex w-full items-center justify-center rounded-full bg-[#153E9F] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#4169E1]"
                >
                  Explore Our Approach
                </Link>
              </div>
            </article>
          </Reveal>
        )}

        {/* Bottom 2 Equal Clean Cards (02 Collaboration & 03 Integrity) matching screenshot 2 */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {rest.map((v, idx) => {
            const Icon = ICONS[idx + 1]!;
            const img = CARD_IMAGES[idx + 1]!;
            return (
              <Reveal key={v.n} delay={idx * 0.1}>
                <article className="group flex h-full flex-col rounded-[2rem] border border-black/5 bg-white p-4 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-card md:p-5">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-[1.5rem] bg-muted">
                    <img
                      src={img}
                      alt={v.title}
                      loading="lazy"
                      className="size-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                    />
                    <span className="absolute bottom-3.5 left-3.5 inline-flex items-center gap-2 rounded-full bg-white/95 px-3.5 py-1.5 text-xs font-semibold text-[#101116] shadow-sm backdrop-blur-sm">
                      <span className="size-1.5 rounded-full bg-[#153E9F]" />
                      <Icon className="size-3.5 text-[#153E9F]" />
                      <span>{v.n} · Value</span>
                    </span>
                  </div>

                  <div className="px-2 pb-2 pt-5">
                    <h3 className="font-display text-xl font-bold tracking-tight text-[#101116] transition-colors group-hover:text-[#153E9F] md:text-2xl">
                      {v.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#777D89]">
                      {v.text}
                    </p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
