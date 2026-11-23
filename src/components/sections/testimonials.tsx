'use client';

import { motion } from "motion/react";
import { useState } from "react";
import type { Tables } from "@/lib/types";
import { IMG } from "@/lib/images";
import { SplitReveal } from "@/components/site/motion";

const FAN_CARDS_META = [
  { rotation: -6, bg: "#FFFFFF", dark: false },
  { rotation: -2, bg: "#EDF2FF", dark: false },
  { rotation: 2.5, bg: "#101116", dark: true },
  { rotation: 6, bg: "#FFFFFF", dark: false },
];

const FALLBACK_TESTIMONIALS: Tables<"testimonials">[] = [
  {
    id: "tst-1",
    quote:
      "Placeholder for verified MSM client feedback — add approved testimonials directly from the CMS.",
    name: "Verified Client Slot 01",
    role: "Partner Organization",
    highlight: null,
    rating: 5,
    avatar_url: IMG.hero,
    published: true,
    sort_order: 1,
    created_at: "",
    updated_at: "",
  },
  {
    id: "tst-2",
    quote:
      "Placeholder for verified MSM client feedback highlighting strategic clarity and creative execution.",
    name: "Verified Client Slot 02",
    role: "Growth Partner",
    highlight: null,
    rating: 5,
    avatar_url: IMG.valuesTeam,
    published: true,
    sort_order: 2,
    created_at: "",
    updated_at: "",
  },
  {
    id: "tst-3",
    quote:
      "Placeholder for verified MSM client feedback covering SEO, brand identity, and measurable reach.",
    name: "Verified Client Slot 03",
    role: "Brand Leadership",
    highlight: null,
    rating: 5,
    avatar_url: IMG.marketing,
    published: true,
    sort_order: 3,
    created_at: "",
    updated_at: "",
  },
  {
    id: "tst-4",
    quote:
      "Placeholder for verified MSM client feedback on health advocacy and community communication.",
    name: "Verified Client Slot 04",
    role: "Health & Impact Partner",
    highlight: null,
    rating: 5,
    avatar_url: IMG.health,
    published: true,
    sort_order: 4,
    created_at: "",
    updated_at: "",
  },
];

export function Testimonials({ items }: { items: Tables<"testimonials">[] }) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const source = items.length > 0 ? items : FALLBACK_TESTIMONIALS;
  const cards = source.slice(0, 4);

  return (
    <section aria-label="Testimonials" className="bg-white/80 py-24 md:py-32">
      <div className="container-x">
        <div className="mb-16 max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-[#F7F6F3] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#153E9F]">
            <span className="size-1.5 rounded-full bg-[#153E9F]" />
            Client Voices
          </span>
          <h2 className="display-md mt-4 text-[#101116]">
            <SplitReveal lines={["What Our Clients Say"]} />
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#777D89] md:text-base">
            Verified feedback from the brands and people we partner with.
          </p>
        </div>

        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-8 pt-6 lg:justify-center lg:gap-0 lg:overflow-visible">
          {cards.map((t, idx) => {
            const meta = FAN_CARDS_META[idx % FAN_CARDS_META.length]!;
            const isHovered = hoveredIdx === idx;
            const dark = meta.dark;

            return (
              <motion.article
                key={t.id}
                tabIndex={0}
                onHoverStart={() => setHoveredIdx(idx)}
                onHoverEnd={() => setHoveredIdx(null)}
                onFocus={() => setHoveredIdx(idx)}
                onBlur={() => setHoveredIdx(null)}
                initial={{ opacity: 0, y: 28, rotate: meta.rotation }}
                whileInView={{ opacity: 1, y: 0, rotate: meta.rotation }}
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{
                  rotate: 0,
                  y: -22,
                  scale: 1.04,
                  transition: { type: "spring", stiffness: 400, damping: 28 },
                }}
                whileFocus={{
                  rotate: 0,
                  y: -22,
                  scale: 1.04,
                  transition: { type: "spring", stiffness: 400, damping: 28 },
                }}
                transition={{
                  type: "spring",
                  stiffness: 280,
                  damping: 26,
                  delay: idx * 0.08,
                }}
                style={{
                  backgroundColor: meta.bg,
                  zIndex: isHovered ? 50 : idx + 1,
                }}
                className={`relative flex h-[340px] w-[285px] shrink-0 snap-center cursor-pointer flex-col justify-between rounded-[1.75rem] border p-7 shadow-card outline-none select-none sm:w-[300px] ${idx > 0 ? "lg:-ml-10" : ""
                  } ${dark
                    ? "border-white/10 text-white"
                    : "border-black/10 text-[#101116]"
                  }`}
              >
                <div>
                  <span
                    className={`inline-block font-display text-3xl leading-none ${dark ? "text-[#4169E1]" : "text-[#153E9F]"
                      }`}
                  >
                    “
                  </span>
                  <p
                    className={`mt-2 text-sm leading-relaxed sm:text-[15px] ${dark ? "text-white/90" : "text-[#101116]/90"
                      }`}
                  >
                    {t.quote}
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-3 border-t border-current/10 pt-4">
                  {t.avatar_url && (
                    <img
                      src={t.avatar_url}
                      alt={t.name}
                      className="size-10 rounded-full object-cover"
                    />
                  )}
                  <div className="min-w-0">
                    <p className="truncate font-display text-sm font-bold">
                      {t.name}
                    </p>
                    {t.role && (
                      <p
                        className={`truncate text-xs ${dark ? "text-white/60" : "text-[#777D89]"
                          }`}
                      >
                        {t.role}
                      </p>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
