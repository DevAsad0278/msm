'use client';

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { PROCESS_STEPS } from "@/lib/site";
import { IMG } from "@/lib/images";
import { SectionHeading } from "@/components/site/section-heading";
import { cn } from "@/lib/utils";

const SPRING = { type: "spring" as const, duration: 0.65, bounce: 0.12 };

export function Process() {
  const [open, setOpen] = useState<number>(0);
  const [offsetTop, setOffsetTop] = useState<number>(0);
  const sectionScrollRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);

  const { scrollYProgress } = useScroll({
    target: sectionScrollRef,
    offset: ["start start", "end end"],
  });

  // Automatically advance step 0 -> 1 -> 2 -> 3 while section stays frozen on scroll
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const count = PROCESS_STEPS.length;
    const idx = Math.min(count - 1, Math.max(0, Math.floor(v * count)));
    setOpen((prev) => (prev === idx ? prev : idx));
  });

  useEffect(() => {
    const updateOffset = () => {
      const listEl = listRef.current;
      const activeEl = itemRefs.current[open];
      if (!listEl || !activeEl) return;
      const listRect = listEl.getBoundingClientRect();
      const itemRect = activeEl.getBoundingClientRect();
      const maxOffset = Math.max(0, listEl.offsetHeight - 320);
      setOffsetTop(Math.min(maxOffset, Math.max(0, itemRect.top - listRect.top)));
    };

    const raf = requestAnimationFrame(updateOffset);
    window.addEventListener("resize", updateOffset);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", updateOffset);
    };
  }, [open]);

  const activeStep = PROCESS_STEPS[open] ?? PROCESS_STEPS[0]!;
  const activeImg = IMG.process[open] ?? IMG.process[0]!;

  const content = (
    <div className="container-x">
      <SectionHeading
        title={["Our", "Process"]}
        text="A clear four-step framework that turns ambitious ideas into measurable, meaningful growth."
      />

      <div className="mt-10 grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
        <div ref={listRef} className="space-y-2 lg:col-span-6">
          {PROCESS_STEPS.map((step, i) => {
            const isOpen = open === i;
            const img = IMG.process[i] ?? IMG.process[0]!;

            return (
              <div
                key={step.n}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                className={cn(
                  "overflow-hidden rounded-[20px] transition-colors duration-300",
                  isOpen ? "bg-[#F7F6F3]/95 shadow-sm" : "bg-transparent hover:bg-black/[0.03]",
                )}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(i)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left md:p-6"
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={cn(
                        "grid size-9 shrink-0 place-items-center rounded-full font-display text-xs font-bold transition-colors duration-300",
                        isOpen
                          ? "bg-[#153E9F] text-white"
                          : "bg-black/[0.06] text-[#101116]",
                      )}
                    >
                      {step.n}
                    </span>
                    <h3 className="font-display text-xl font-bold tracking-tight text-[#101116] md:text-2xl">
                      {step.title}
                    </h3>
                  </div>

                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={SPRING}
                    className="text-[#101116]"
                  >
                    <ChevronDown className="size-5" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={SPRING}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-6 pt-0 md:px-6 md:pl-[4.5rem]">
                        <p className="text-sm leading-relaxed text-[#777D89] md:text-base">
                          {step.text}
                        </p>

                        <div className="mt-4 overflow-hidden rounded-2xl lg:hidden">
                          <img
                            src={img}
                            alt={step.title}
                            className="aspect-[16/10] w-full object-cover"
                          />
                        </div>

                        <div className="mt-4">
                          <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 rounded-full bg-[#153E9F] px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#4169E1]"
                          >
                            <span>Start {step.title}</span>
                            <ArrowUpRight className="size-3.5" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <div className="relative hidden lg:block lg:col-span-6">
          <motion.div
            animate={{ y: offsetTop }}
            transition={SPRING}
            className="relative aspect-[1.4/1] overflow-hidden rounded-[24px] bg-[#153E9F] shadow-card"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={activeStep.n}
                src={activeImg}
                alt={activeStep.title}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="absolute inset-0 size-full object-cover"
              />
            </AnimatePresence>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#101116]/75 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4 text-white">
              <div>
                <span className="inline-block rounded-full bg-[#153E9F] px-3 py-1 text-xs font-semibold">
                  Step {activeStep.n}
                </span>
                <p className="mt-2 font-display text-2xl font-bold">
                  {activeStep.title}
                </p>
              </div>
              <span className="font-display text-4xl font-bold text-white/75">
                {activeStep.n}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );

  return (
    <section aria-label="Our process" className="bg-white/80 text-[#101116]">
      <div ref={sectionScrollRef} className="relative hidden h-[240vh] lg:block">
        <div className="sticky top-0 flex h-screen flex-col justify-center pt-16 pb-8">
          {content}
        </div>
      </div>

      <div className="py-20 lg:hidden">{content}</div>
    </section>
  );
}
