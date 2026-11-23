'use client';

import { motion } from "motion/react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { teamQuery } from "@/lib/queries";
import { IMG } from "@/lib/images";
import { SectionHeading } from "@/components/site/section-heading";
import { cn } from "@/lib/utils";

const PANEL_TONES = [
  "from-[#153E9F]/90 via-[#153E9F]/55 to-[#0B1F52]/95",
  "from-[#101116]/90 via-[#1E3A8A]/55 to-[#101116]/95",
  "from-[#1E3A8A]/90 via-[#4169E1]/50 to-[#0B1F52]/95",
  "from-[#161822]/90 via-[#153E9F]/55 to-[#101116]/95",
];

const FALLBACK_TEAM = [
  {
    id: "tm-1",
    name: "Founder 01",
    role: "Co-Founder & Strategy Lead",
    bio: "Leading strategic direction, business consulting, and cross-border brand partnerships at MSM Marketing Agency.",
    photo_url: IMG.hero,
  },
  {
    id: "tm-2",
    name: "Founder 02",
    role: "Co-Founder & Creative Director",
    bio: "Shaping visual identity systems, creative campaigns, and purpose-driven brand storytelling.",
    photo_url: IMG.valuesTeam,
  },
  {
    id: "tm-3",
    name: "Growth Lead",
    role: "Head of Digital & SEO",
    bio: "Driving technical SEO, search architecture, and performance marketing across Pakistan and international markets.",
    photo_url: IMG.marketing,
  },
  {
    id: "tm-4",
    name: "Advocacy Lead",
    role: "Health Communication Strategist",
    bio: "Designing educational health advocacy initiatives with clarity, empathy, and measurable community reach.",
    photo_url: IMG.health,
  },
];

export function TeamShowcase() {
  const { data: team = [] } = useQuery(teamQuery);
  const [active, setActive] = useState(0);

  const members =
    team.length > 0
      ? team.slice(0, 4).map((m) => ({
          id: m.id,
          name: m.name,
          role: m.role,
          bio: m.bio ?? "",
          photo_url: m.photo_url ?? IMG.valuesTeam,
        }))
      : FALLBACK_TEAM;

  return (
    <section aria-label="Our Team" className="bg-white/80 py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          title={["Team"]}
          text="A women-led collective of strategists, designers, SEO specialists and health advocates."
        />

        {/* Desktop & Mobile Expanding Accordion Showcase */}
        <div className="mt-12 flex flex-col gap-3 lg:h-[520px] lg:flex-row">
          {members.map((m, i) => {
            const isOpen = active === i;
            const tone = PANEL_TONES[i % PANEL_TONES.length]!;

            return (
              <motion.article
                key={m.id}
                layout
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                transition={{ duration: 0.5, ease: [0.44, 0, 0.56, 1] }}
                className={cn(
                  "group relative cursor-pointer overflow-hidden rounded-[24px] bg-[#101116] text-white shadow-card",
                  isOpen
                    ? "h-[400px] lg:h-full lg:flex-[3.4]"
                    : "h-20 lg:h-full lg:flex-[0.75]",
                )}
              >
                {/* Background portrait */}
                <img
                  src={m.photo_url}
                  alt={m.name}
                  loading="lazy"
                  className={cn(
                    "absolute inset-0 size-full object-cover object-top transition-all duration-700",
                    isOpen ? "scale-100 opacity-85" : "scale-105 opacity-45 grayscale",
                  )}
                />

                {/* MSM Blue / Dark gradient overlay */}
                <div
                  className={cn(
                    "pointer-events-none absolute inset-0 bg-gradient-to-t",
                    tone,
                  )}
                />

                {/* Number Pill */}
                <span className="absolute left-5 top-5 z-10 inline-flex size-9 items-center justify-center rounded-full border border-white/25 bg-black/30 font-display text-xs font-bold backdrop-blur-md">
                  0{i + 1}
                </span>

                {/* Collapsed State Label */}
                {!isOpen && (
                  <div className="relative z-10 flex h-full items-center justify-between px-6 pl-16 lg:flex-col lg:justify-end lg:px-4 lg:pb-7 lg:pl-4">
                    <p className="font-display text-lg font-bold tracking-tight text-white lg:[writing-mode:vertical-rl] lg:rotate-180 lg:text-xl">
                      {m.name}
                    </p>
                    <span className="text-xs text-white/65 lg:hidden">{m.role}</span>
                  </div>
                )}

                {/* Expanded State Content */}
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="relative z-10 flex h-full flex-col justify-end p-6 md:p-9"
                  >
                    <span className="inline-block w-fit rounded-full bg-[#153E9F] px-3.5 py-1 text-xs font-semibold text-white">
                      {m.role}
                    </span>
                    <h3 className="mt-3 font-display text-[clamp(2.2rem,5vw,4.2rem)] font-bold leading-[0.95] tracking-[-0.04em] text-white">
                      {m.name}
                    </h3>
                    {m.bio && (
                      <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/85 md:text-base">
                        {m.bio}
                      </p>
                    )}
                  </motion.div>
                )}
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
