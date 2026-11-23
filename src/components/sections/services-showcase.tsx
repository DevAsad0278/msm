'use client';

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { Tables } from "@/lib/types";
import { IMG } from "@/lib/images";
import { PillLink } from "@/components/site/pill-button";
import { SectionHeading } from "@/components/site/section-heading";
import { EASE, Reveal } from "@/components/site/motion";
import { cn } from "@/lib/utils";

const FALLBACK_SERVICES: Tables<"services">[] = [
  {
    id: "fallback-1",
    number: "01",
    slug: "marketing",
    category: "Growth",
    title: "Marketing",
    description:
      "Digital marketing, social media management, paid advertising, content strategy and campaign management.",
    sub_items: ["Social media management", "Paid advertising", "Content strategy", "Campaign management"],
    image_url: IMG.marketing,
    published: true,
    sort_order: 1,
    created_at: "",
    updated_at: "",
  },
  {
    id: "fallback-2",
    number: "02",
    slug: "creative-design",
    category: "Brand",
    title: "Creative Design",
    description: "Brand identity, graphic design, creative campaigns and marketing collateral.",
    sub_items: ["Brand identity", "Graphic design", "Creative campaigns", "Marketing collateral"],
    image_url: IMG.design,
    published: true,
    sort_order: 2,
    created_at: "",
    updated_at: "",
  },
  {
    id: "fallback-3",
    number: "03",
    slug: "seo",
    category: "Search",
    title: "SEO",
    description: "Technical SEO, keyword research, on-page optimization and organic growth.",
    sub_items: ["Technical SEO", "Keyword research", "On-page optimization", "Organic growth"],
    image_url: IMG.seo,
    published: true,
    sort_order: 3,
    created_at: "",
    updated_at: "",
  },
  {
    id: "fallback-4",
    number: "04",
    slug: "business-consulting",
    category: "Strategy",
    title: "Business Consulting",
    description: "Business strategy, brand positioning and growth planning.",
    sub_items: ["Business strategy", "Brand positioning", "Growth planning", "Market research"],
    image_url: IMG.consulting,
    published: true,
    sort_order: 4,
    created_at: "",
    updated_at: "",
  },
  {
    id: "fallback-5",
    number: "05",
    slug: "health-advocacy",
    category: "Impact",
    title: "Health Advocacy",
    description: "Health awareness, educational communication and advocacy campaigns.",
    sub_items: ["Health awareness", "Educational content", "Advocacy campaigns", "Community outreach"],
    image_url: IMG.health,
    published: true,
    sort_order: 5,
    created_at: "",
    updated_at: "",
  },
];

export function ServicesShowcase({
  services,
  showHeading = true,
}: {
  services: Tables<"services">[];
  showHeading?: boolean;
}) {
  const [active, setActive] = useState(0);
  const items = services.length > 0 ? services : FALLBACK_SERVICES;

  return (
    <section aria-label="What we offer" className="bg-[#F7F6F3] pt-24 pb-16 md:pt-32 md:pb-24">
      {showHeading && (
        <div className="container-x pb-14">
          <SectionHeading
            align="center"
            title={["What We Offer / Services"]}
            text="End-to-end solutions to build, grow and scale your brand."
          />
        </div>
      )}

      <div className="border-t border-black/10">
        {items.map((s, i) => {
          const open = active === i;
          return (
            <div
              key={s.id}
              onMouseEnter={() => setActive(i)}
              className={cn(
                "relative overflow-hidden border-b border-black/10 transition-colors duration-700",
                open ? "bg-[#101116] text-white" : "bg-[#F7F6F3] text-[#101116]",
              )}
            >
              {/* Atmospheric background image when row is active/open */}
              {open && s.image_url && (
                <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                  <img
                    src={s.image_url}
                    alt=""
                    className="size-full object-cover opacity-25 blur-sm scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#101116]/90 via-[#101116]/75 to-[#101116]/90" />
                </div>
              )}

              <div className="container-x relative z-10">
                {!open ? (
                  <button
                    type="button"
                    aria-expanded={false}
                    onClick={() => setActive(i)}
                    className="grid w-full grid-cols-[3rem_1fr] items-center gap-4 py-7 text-left md:grid-cols-[5rem_1fr_auto]"
                  >
                    <span className="font-display text-sm font-semibold text-[#777D89]">
                      {s.number}
                    </span>
                    <span>
                      <span className="block text-xs font-medium text-[#777D89]">
                        {s.category}
                      </span>
                      <span className="mt-1 block font-display text-[clamp(1.6rem,3.2vw,2.6rem)] font-bold leading-tight tracking-[-0.035em]">
                        {s.title}
                      </span>
                    </span>
                    <span className="hidden md:block">
                      <span className="inline-flex h-11 items-center rounded-full bg-[#153E9F] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#4169E1]">
                        Start your project ↗
                      </span>
                    </span>
                  </button>
                ) : (
                  <AnimatePresence initial={false}>
                    <motion.div
                      key="content"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.45, ease: EASE }}
                      className="py-10 md:py-12"
                    >
                      <div className="grid items-stretch gap-8 lg:grid-cols-[3rem_minmax(0,20rem)_1fr]">
                        {/* Number */}
                        <div className="font-display text-sm font-bold text-white/80">
                          {s.number}
                        </div>

                        {/* Left Framed Image */}
                        {s.image_url && (
                          <div className="overflow-hidden rounded-2xl border border-white/15 bg-[#161822] shadow-2xl">
                            <motion.img
                              initial={{ scale: 1.08, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ duration: 0.8, ease: EASE }}
                              src={s.image_url}
                              alt={s.title}
                              loading="lazy"
                              className="aspect-[4/4.3] size-full object-cover"
                            />
                          </div>
                        )}

                        {/* Right Content & Responsive Sub-Item Cards */}
                        <div className="flex flex-col justify-between gap-8">
                          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                            <div>
                              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#4169E1]">
                                {s.category}
                              </span>
                              <h3 className="mt-1 font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
                                {s.title}
                              </h3>
                            </div>
                            <PillLink to="/contact" variant="primary" size="md" className="shrink-0">
                              Start your project
                            </PillLink>
                          </div>

                          <div>
                            <p className="font-display text-xl font-semibold text-white md:text-2xl">
                              {s.title} — Strategic Execution
                            </p>
                            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/75 md:text-base">
                              {s.description}
                            </p>
                          </div>

                          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                            {s.sub_items.map((item, k) => (
                              <motion.li
                                key={item}
                                initial={{ opacity: 0, y: 14 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                  duration: 0.45,
                                  ease: EASE,
                                  delay: 0.08 + k * 0.05,
                                }}
                                className="flex min-h-24 items-end rounded-2xl bg-[#F7F6F3] p-4 font-display text-sm font-semibold leading-snug text-[#101116] shadow-sm md:text-base"
                              >
                                {item}
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {showHeading && (
        <Reveal className="container-x mt-10 text-center">
          <PillLink to="/services" variant="outline">
            View all services
          </PillLink>
        </Reveal>
      )}
    </section>
  );
}
