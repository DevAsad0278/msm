'use client';

import { AnimatePresence, motion } from "motion/react";
import { Check } from "lucide-react";
import { useState } from "react";
import type { Tables } from "@/integrations/supabase/types";
import { formatPrice } from "@/lib/site";
import { cn } from "@/lib/utils";
import { PillLink } from "@/components/site/pill-button";
import { EASE, Reveal, SplitReveal } from "@/components/site/motion";

export type Billing = "monthly" | "yearly";

const FALLBACK_PLANS: Tables<"pricing_plans">[] = [
  {
    id: "plan-starter",
    name: "Starter",
    tagline: "Essential Brand Presence",
    currency: "PKR",
    monthly_price: null,
    yearly_price: null,
    popular: false,
    is_placeholder: true,
    features: [
      "Brand & positioning discovery",
      "Core social media management",
      "Essential creative design collateral",
      "Foundational on-page SEO",
      "Monthly performance summary",
    ],
    published: true,
    sort_order: 1,
    created_at: "",
    updated_at: "",
  },
  {
    id: "plan-growth",
    name: "Growth",
    tagline: "Strategic Brand Growth",
    currency: "PKR",
    monthly_price: null,
    yearly_price: null,
    popular: true,
    is_placeholder: true,
    features: [
      "Full digital marketing & content strategy",
      "Paid advertising campaign management",
      "Technical & content SEO roadmap",
      "Campaign creative & design system",
      "Bi-weekly strategy & optimization reviews",
    ],
    published: true,
    sort_order: 2,
    created_at: "",
    updated_at: "",
  },
  {
    id: "plan-complete",
    name: "Complete",
    tagline: "Full-Service Growth Partnership",
    currency: "PKR",
    monthly_price: null,
    yearly_price: null,
    popular: false,
    is_placeholder: true,
    features: [
      "Dedicated women-led growth team",
      "End-to-end marketing & creative execution",
      "Executive business & brand consulting",
      "Advanced SEO & international reach",
      "Health advocacy & purpose campaigns",
    ],
    published: true,
    sort_order: 3,
    created_at: "",
    updated_at: "",
  },
];

export function priceFor(
  plan: Pick<Tables<"pricing_plans">, "monthly_price" | "yearly_price">,
  billing: Billing,
) {
  return billing === "monthly" ? plan.monthly_price : plan.yearly_price;
}

export function BillingToggle({
  billing,
  onChange,
}: {
  billing: Billing;
  onChange: (b: Billing) => void;
}) {
  const yearly = billing === "yearly";
  return (
    <div className="inline-flex items-center gap-3 rounded-full border border-black/10 bg-white p-1.5 shadow-sm text-sm">
      <button
        type="button"
        onClick={() => onChange("monthly")}
        className={cn(
          "rounded-full px-4 py-2 font-medium transition-colors",
          !yearly ? "bg-[#101116] text-white" : "text-[#777D89] hover:text-[#101116]",
        )}
      >
        Monthly
      </button>
      <button
        type="button"
        onClick={() => onChange("yearly")}
        className={cn(
          "inline-flex items-center gap-2 rounded-full px-4 py-2 font-medium transition-colors",
          yearly ? "bg-[#153E9F] text-white" : "text-[#777D89] hover:text-[#101116]",
        )}
      >
        <span>Yearly</span>
        <span
          className={cn(
            "rounded-full px-2 py-0.5 text-[11px] font-semibold",
            yearly ? "bg-white/20 text-white" : "bg-[#EDF2FF] text-[#153E9F]",
          )}
        >
          Retainer
        </span>
      </button>
    </div>
  );
}

export function PricingCards({
  plans,
  billing,
}: {
  plans: Tables<"pricing_plans">[];
  billing: Billing;
}) {
  const list = plans.length > 0 ? plans : FALLBACK_PLANS;

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {list.map((p, i) => {
        const glow = p.popular;
        const value = priceFor(p, billing);
        return (
          <Reveal key={p.id} delay={i * 0.1}>
            <article
              className={cn(
                "group relative flex h-full flex-col overflow-hidden rounded-[2rem] p-8 transition-all duration-500 hover:-translate-y-1.5",
                glow
                  ? "border border-[#4169E1]/60 bg-[#101116] text-white shadow-[0_24px_60px_-15px_rgba(21,62,159,0.45)]"
                  : "border border-black/10 bg-white text-[#101116] shadow-soft hover:border-[#4169E1]/40",
              )}
            >
              {/* Subtle top ambient glow matching Glow Pricing */}
              {glow && (
                <div
                  aria-hidden
                  className="pointer-events-none absolute -top-24 left-1/2 h-48 w-72 -translate-x-1/2 rounded-full bg-[#4169E1]/35 blur-3xl"
                />
              )}

              <div className="relative z-10 flex items-start justify-between gap-3">
                <div>
                  <span
                    className={cn(
                      "text-xs font-semibold uppercase tracking-[0.16em]",
                      glow ? "text-[#4169E1]" : "text-[#153E9F]",
                    )}
                  >
                    {p.name}
                  </span>
                  <h3 className="mt-1 font-display text-2xl font-bold">{p.tagline}</h3>
                </div>
                {p.popular && (
                  <span className="rounded-full bg-[#153E9F] px-3 py-1 text-xs font-semibold text-white">
                    Popular
                  </span>
                )}
              </div>

              <div className="relative z-10 mt-8 flex h-12 items-end gap-2 overflow-hidden">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={`${billing}-${value}`}
                    initial={{ y: 32, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -32, opacity: 0 }}
                    transition={{ duration: 0.45, ease: EASE }}
                    className="font-display text-[2.25rem] font-bold leading-none tracking-[-0.04em]"
                  >
                    {formatPrice(value, p.currency)}
                  </motion.span>
                </AnimatePresence>
                <span
                  className={cn(
                    "pb-1 text-xs",
                    glow ? "text-white/60" : "text-[#777D89]",
                  )}
                >
                  /{billing === "monthly" ? "monthly" : "yearly"}
                </span>
              </div>

              {p.is_placeholder && (
                <p
                  className={cn(
                    "relative z-10 mt-2 text-[0.7rem] font-semibold uppercase tracking-wider",
                    glow ? "text-[#4169E1]" : "text-[#153E9F]",
                  )}
                >
                  Placeholder pricing — editable in CMS
                </p>
              )}

              <div
                className={cn(
                  "relative z-10 my-7 h-px w-full",
                  glow ? "bg-white/10" : "bg-black/10",
                )}
              />

              <ul className="relative z-10 mb-8 flex-1 space-y-3.5">
                {p.features.map((f) => (
                  <li
                    key={f}
                    className={cn(
                      "flex items-start gap-2.5 text-sm",
                      glow ? "text-white/85" : "text-[#101116]/85",
                    )}
                  >
                    <span
                      className={cn(
                        "mt-0.5 grid size-5 shrink-0 place-items-center rounded-full",
                        glow
                          ? "bg-[#4169E1]/20 text-[#4169E1]"
                          : "bg-[#EDF2FF] text-[#153E9F]",
                      )}
                    >
                      <Check className="size-3.5" />
                    </span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <PillLink
                to="/contact"
                variant={glow ? "primary" : "outline"}
                className="relative z-10 mt-auto w-full justify-center"
              >
                Select Plan
              </PillLink>
            </article>
          </Reveal>
        );
      })}
    </div>
  );
}

export function PricingSection({ plans }: { plans: Tables<"pricing_plans">[] }) {
  const [billing, setBilling] = useState<Billing>("monthly");

  return (
    <section aria-label="Pricing" className="bg-[#F7F6F3]/80 py-24 md:py-32">
      <div className="container-x">
        {/* Left-aligned header matching other sections + right billing toggle */}
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#153E9F]">
              <span className="size-1.5 rounded-full bg-[#153E9F]" />
              Pricing &amp; Packages
            </span>
            <h2 className="display-md mt-4 max-w-xl text-[#101116]">
              <SplitReveal lines={["Simple, Transparent", "Pricing."]} />
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-[#777D89] md:text-base">
              Choose the right plan tailored to your business needs. Flexible, strategic, and built to help your brand grow.
            </p>
          </div>
          <BillingToggle billing={billing} onChange={setBilling} />
        </div>

        <PricingCards plans={plans} billing={billing} />
      </div>
    </section>
  );
}
