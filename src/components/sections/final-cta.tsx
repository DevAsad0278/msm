'use client';

import { motion } from "motion/react";
import { PillLink } from "@/components/site/pill-button";
import { Reveal, SplitReveal } from "@/components/site/motion";

export function FinalCta({
  title = ["Ready to Make an Impact?"],
  text = "Let's turn your next big idea into something meaningful.",
}: {
  title?: string[];
  text?: string;
}) {
  return (
    <section
      aria-label="Start your project"
      className="bg-[#F7F6F3]/80 py-24 md:py-36"
    >
      <div className="container-x flex flex-col items-center text-center">
        {/* Glossy 3D MSM Blue Metallic Emblem matching reference CTA */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          className="mb-10 relative flex size-28 items-center justify-center md:size-36"
          aria-hidden="true"
        >
          <svg viewBox="0 0 160 160" className="size-full drop-shadow-2xl">
            <defs>
              <linearGradient id="msmGlossyBlue" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#93C5FD" />
                <stop offset="35%" stopColor="#4169E1" />
                <stop offset="70%" stopColor="#153E9F" />
                <stop offset="100%" stopColor="#0A183D" />
              </linearGradient>
            </defs>
            {Array.from({ length: 8 }).map((_, i) => (
              <g key={i} transform={`rotate(${i * 45} 80 80)`}>
                <path
                  d="M80 14 C96 14 108 32 98 48 C90 60 72 54 70 40 C68 26 72 14 80 14 Z"
                  fill="url(#msmGlossyBlue)"
                  opacity={0.95}
                />
              </g>
            ))}
            <circle cx="80" cy="80" r="20" fill="#F7F6F3" />
          </svg>
        </motion.div>

        <h2 className="display-lg max-w-3xl text-[#101116]">
          <SplitReveal lines={title} />
        </h2>

        <Reveal delay={0.15}>
          <p className="mt-4 max-w-md text-base text-[#777D89] md:text-lg">
            {text}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <PillLink to="/contact" variant="primary" size="lg">
              Start Your Project
            </PillLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
