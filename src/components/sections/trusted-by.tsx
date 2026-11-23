'use client';

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { IMG } from "@/lib/images";
import { SplitReveal, Reveal } from "@/components/site/motion";
import { LogoCard, useClientLogos } from "./clients";

export function TrustedBy() {
  const ref = useRef<HTMLElement>(null);
  const logos = useClientLogos();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const upY = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const downY = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);
  const left = logos.filter((_, i) => i % 2 === 0);
  const right = logos.filter((_, i) => i % 2 === 1);

  return (
    <section ref={ref} aria-label="Trusted by" className="relative overflow-hidden bg-ink py-28 text-ink-foreground md:py-40">
      <motion.img src={IMG.testimonialsBg} alt="" aria-hidden style={{ scale: bgScale }} className="absolute inset-0 size-full object-cover opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/40 to-ink" />
      <div className="container-x relative grid items-center gap-12 lg:grid-cols-[1fr_1.2fr_1fr]">
        <motion.div style={{ y: upY }} className="hidden flex-col items-end gap-4 lg:flex">
          {left.slice(0, 3).map((l, i) => <LogoCard key={`${l.id}-${i}`} {...l} tone="dark" />)}
        </motion.div>
        <div className="text-center">
          <h2 className="display-lg">
            <SplitReveal lines={["Trusted by", "Happy Clients."]} />
          </h2>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-sm text-ink-foreground/70">
              From growing local businesses to international brands — partners who chose clarity, creativity and growth.
            </p>
          </Reveal>
        </div>
        <motion.div style={{ y: downY }} className="hidden flex-col items-start gap-4 lg:flex">
          {right.slice(0, 3).map((l, i) => <LogoCard key={`${l.id}-${i}`} {...l} tone="dark" />)}
        </motion.div>
        <div className="flex flex-wrap justify-center gap-3 lg:hidden">
          {logos.slice(0, 4).map((l, i) => <LogoCard key={`${l.id}-m${i}`} {...l} tone="dark" />)}
        </div>
      </div>
    </section>
  );
}
