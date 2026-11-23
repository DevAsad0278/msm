'use client';

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useMemo, useState } from "react";
import type { Tables } from "@/lib/types";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/site/section-heading";

const CATEGORIES = ["General", "Services", "Pricing", "Process"];

// MSM brand-matched band palette (high contrast, clean & cohesive)
const MSM_BANDS = [
  { bg: "#FFFFFF", ink: "#101116", btnBg: "#101116", btnInk: "#FFFFFF" },
  { bg: "#EDF2FF", ink: "#101116", btnBg: "#153E9F", btnInk: "#FFFFFF" },
  { bg: "#DCE6FF", ink: "#101116", btnBg: "#101116", btnInk: "#FFFFFF" },
  { bg: "#153E9F", ink: "#FFFFFF", btnBg: "#FFFFFF", btnInk: "#153E9F" },
  { bg: "#101116", ink: "#FFFFFF", btnBg: "#4169E1", btnInk: "#FFFFFF" },
];

const FALLBACK_FAQS: Tables<"faqs">[] = [
  {
    id: "faq-1",
    category: "General",
    question: "What services does MSM Marketing Agency offer?",
    answer:
      "We offer Marketing, Creative Design, SEO, Business Consulting, and Health Advocacy — individually or as an integrated all-in-one growth partnership.",
    published: true,
    sort_order: 1,
    created_at: "",
    updated_at: "",
  },
  {
    id: "faq-2",
    category: "General",
    question: "Does MSM work with international clients?",
    answer:
      "Yes. While rooted in Pakistan, MSM Marketing Agency collaborates seamlessly with founders, businesses, and organizations across international markets.",
    published: true,
    sort_order: 2,
    created_at: "",
    updated_at: "",
  },
  {
    id: "faq-3",
    category: "Services",
    question: "Can we combine multiple services into one engagement?",
    answer:
      "Absolutely. Most clients combine services — such as Creative Design with Marketing, or Business Consulting with SEO — so strategy and execution stay aligned.",
    published: true,
    sort_order: 3,
    created_at: "",
    updated_at: "",
  },
  {
    id: "faq-4",
    category: "Pricing",
    question: "Do you offer customized packages?",
    answer:
      "Yes. Our Starter, Growth, and Complete tiers can be tailored around your specific business objectives, markets, and deliverables.",
    published: true,
    sort_order: 4,
    created_at: "",
    updated_at: "",
  },
  {
    id: "faq-5",
    category: "Process",
    question: "How do we start a project with MSM?",
    answer:
      "Send us an inquiry through the Contact page. We begin with our Discover phase to understand your brand, audience, and goals before proposing a clear roadmap.",
    published: true,
    sort_order: 5,
    created_at: "",
    updated_at: "",
  },
];

export function FaqSection({
  faqs,
  title = "Frequently Asked Questions",
}: {
  faqs: Tables<"faqs">[];
  title?: string;
}) {
  const source = faqs.length > 0 ? faqs : FALLBACK_FAQS;

  const cats = useMemo(() => {
    const present = CATEGORIES.filter((c) => source.some((f) => f.category === c));
    const extra = [...new Set(source.map((f) => f.category))].filter(
      (c) => !CATEGORIES.includes(c),
    );
    return ["All", ...present, ...extra];
  }, [source]);

  const [cat, setCat] = useState("All");
  const [openId, setOpenId] = useState<string | null>(source[0]?.id ?? null);

  const list = cat === "All" ? source : source.filter((f) => f.category === cat);

  return (
    <section aria-label="FAQ" className="bg-[#F7F6F3]/80 py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          align="center"
          title={[title]}
          text="Frequently asked questions about MSM Marketing Agency services and process."
        />

        {/* Category Filter Tabs */}
        <div
          role="tablist"
          aria-label="FAQ categories"
          className="mt-10 flex flex-wrap justify-center gap-2"
        >
          {cats.map((c) => {
            const active = cat === c;
            return (
              <button
                key={c}
                role="tab"
                aria-selected={active}
                onClick={() => {
                  setCat(c);
                  const nextFirst =
                    c === "All"
                      ? source[0]?.id ?? null
                      : source.find((f) => f.category === c)?.id ?? null;
                  setOpenId(nextFirst);
                }}
                className={cn(
                  "relative rounded-full px-5 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "text-white"
                    : "bg-white text-[#777D89] shadow-sm hover:text-[#101116]",
                )}
              >
                {active && (
                  <motion.span
                    layoutId="faq-tab"
                    className="absolute inset-0 rounded-full bg-[#101116]"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
                <span className="relative z-10">{c}</span>
              </button>
            );
          })}
        </div>

        {/* FaqBandsAccordion: stacked color bands in one rounded block */}
        <div className="mx-auto mt-10 flex max-w-4xl flex-col overflow-hidden rounded-3xl shadow-card">
          {list.map((f, i) => {
            const isOpen = openId === f.id;
            const band = MSM_BANDS[i % MSM_BANDS.length]!;

            return (
              <div
                key={f.id}
                style={{ backgroundColor: band.bg, color: band.ink }}
              >
                <h3 className="m-0">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenId(isOpen ? null : f.id)}
                    className="group flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-display text-[clamp(1.15rem,2.4vw,1.85rem)] font-bold leading-[1.12] tracking-[-0.03em] md:px-8 md:py-6"
                  >
                    <span className="min-w-0 flex-1">{f.question}</span>
                    <span
                      aria-hidden="true"
                      style={{
                        backgroundColor: band.btnBg,
                        color: band.btnInk,
                        transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                        transition: "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
                      }}
                      className="inline-flex size-11 shrink-0 items-center justify-center rounded-full"
                    >
                      <ArrowRight className="size-5 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </span>
                  </button>
                </h3>

                <div
                  style={{
                    display: "grid",
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    visibility: isOpen ? "visible" : "hidden",
                    transition:
                      "grid-template-rows 0.45s cubic-bezier(0.22, 1, 0.36, 1), visibility 0s linear " +
                      (isOpen ? "0s" : "0.45s"),
                  }}
                >
                  <div className="min-h-0 overflow-hidden">
                    <p className="max-w-[62ch] px-6 pb-6 text-sm font-medium leading-relaxed opacity-80 md:px-8 md:pb-7 md:text-base">
                      {f.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
