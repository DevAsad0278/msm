'use client';

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { HERO_STATEMENTS, HERO_TAGS } from "@/lib/site";
import { IMG } from "@/lib/images";
import { PillLink } from "@/components/site/pill-button";
import { EASE } from "@/components/site/motion";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.04, 1.18]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);

  return (
    <section aria-label="Introduction" className="relative bg-[#F7F6F3]/80">
      <div className="container-x pt-24 md:pt-28 pb-6 md:pb-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center justify-between gap-4 font-display text-sm font-bold tracking-tight text-[#101116] md:text-lg"
        >
          <span>©{new Date().getFullYear()}</span>
          <span className="uppercase tracking-[0.08em]">AGENCY</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: EASE, delay: 0.15 }}
          className="mt-2 w-full select-none text-center font-display text-[clamp(3.4rem,15.4vw,13.5rem)] font-bold uppercase leading-[0.86] tracking-[-0.045em]"
        >
          <span
            className="block bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(108deg, #101116 0%, #153E9F 18%, #4169E1 34%, #101116 48%, #153E9F 64%, #4169E1 80%, #101116 100%)",
            }}
          >
            MARKETING
          </span>
        </motion.h1>
      </div>

      <div
        ref={ref}
        className="relative h-[58vh] min-h-[440px] overflow-hidden md:h-[66vh]"
      >
        <motion.img
          src={IMG.hero}
          alt="MSM Marketing Agency creative studio portrait"
          style={{ scale, y }}
          initial={{ clipPath: "inset(25% 0 0 0)" }}
          animate={{ clipPath: "inset(0% 0 0 0)" }}
          transition={{ duration: 1.15, ease: EASE, delay: 0.25 }}
          className="absolute inset-0 size-full object-cover object-[50%_25%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#153E9F]/75 via-[#101116]/35 to-[#153E9F]/85" />

        <div className="container-x relative flex h-full flex-col justify-between py-8 text-white md:py-12">
          {/* Top 3-column statements matching screenshot */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {HERO_STATEMENTS.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: EASE, delay: 0.45 + i * 0.1 }}
                className={i === 1 ? "sm:text-center" : i === 2 ? "sm:text-right" : ""}
              >
                <p className="font-display text-xl font-bold tracking-tight md:text-2xl">
                  {s.title}
                </p>
                <p className="mt-1 text-xs text-white/85 md:text-sm">{s.text}</p>
              </motion.div>
            ))}
          </div>

          {/* Bottom row: Left MSM tagline + copy + dual pill CTAs, Right floating tags */}
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <p className="font-display text-xl font-bold tracking-tight text-white md:text-2xl">
                Ideas Into Impact. Businesses Into Brands.
              </p>
              <p className="mt-2 text-sm leading-relaxed text-white/90 md:text-base">
                We transform ambitious ideas into meaningful brand experiences through strategic marketing, creative design and intelligent business growth solutions.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <PillLink to="/contact" variant="light">
                  Start Your Project
                </PillLink>
                <PillLink to="/work" variant="outline-light">
                  Explore Our Work
                </PillLink>
              </div>
            </div>

            <ul className="flex flex-wrap gap-2 lg:max-w-md lg:justify-end">
              {HERO_TAGS.map((t, i) => (
                <motion.li
                  key={t}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.7 + i * 0.08 }}
                  className="rounded-full border border-white/50 bg-white/10 px-4 py-2 text-xs font-medium text-white backdrop-blur-md transition-colors hover:bg-white hover:text-[#153E9F]"
                >
                  {t}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
