'use client';

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { EASE, SplitReveal } from "./motion";

export function PageHero({
  eyebrow,
  title,
  text,
  image,
  children,
}: {
  eyebrow: string;
  title: ReactNode[];
  text?: string;
  image?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pt-32 md:pt-40">
      <div className="container-x">
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE, delay: 0.2 }} className="eyebrow text-electric">
          {eyebrow}
        </motion.p>
        <h1 className="display-lg mt-5 max-w-5xl">
          <SplitReveal immediate delay={0.3} lines={title} />
        </h1>
        {text && (
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE, delay: 0.6 }} className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {text}
          </motion.p>
        )}
        {children && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE, delay: 0.75 }} className="mt-8">
            {children}
          </motion.div>
        )}
      </div>
      {image && (
        <motion.div
          initial={{ clipPath: "inset(20% 6% 0 6% round 32px)" }}
          animate={{ clipPath: "inset(0% 0% 0 0% round 32px)" }}
          transition={{ duration: 1.4, ease: EASE, delay: 0.5 }}
          className="container-x mt-12 md:mt-16"
        >
          <img src={image} alt="" className="aspect-[21/9] w-full rounded-[2rem] object-cover" />
        </motion.div>
      )}
    </section>
  );
}
