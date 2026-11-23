'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NAV_LINKS, UTILITY_LINKS } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { PillLink } from "./pill-button";
import { EASE } from "./motion";

export function Header() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [pagesOpen, setPagesOpen] = useState(false);
  const pathname = usePathname() ?? "/";

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 20);
    setHidden(y > 300 && y > prev && !open);
  });

  useEffect(() => {
    setOpen(false);
    setPagesOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -90 }}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500",
          scrolled ? "bg-background/85 shadow-soft backdrop-blur-xl" : "bg-transparent",
        )}
      >
        <div className="container-x flex h-[76px] items-center justify-between gap-6">
          <Logo />
          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((l, i) => (
              <motion.div
                key={l.to}
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.15 + i * 0.05 }}
              >
                <Link
                  href={l.to}

                  className="group relative px-3 py-2 text-sm text-foreground/75 transition-colors hover:text-foreground data-[status=active]:text-foreground"
                >
                  {l.label}
                  <span className="absolute inset-x-3 bottom-1 h-px origin-left scale-x-0 bg-electric transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 group-data-[status=active]:scale-x-100" />
                </Link>
              </motion.div>
            ))}
            <div className="relative" onMouseEnter={() => setPagesOpen(true)} onMouseLeave={() => setPagesOpen(false)}>
              <button
                type="button"
                aria-expanded={pagesOpen}
                onClick={() => setPagesOpen((v) => !v)}
                className="flex items-center gap-1 px-3 py-2 text-sm text-foreground/75 transition-colors hover:text-foreground"
              >
                All Pages <ChevronDown className={cn("size-3.5 transition-transform", pagesOpen && "rotate-180")} />
              </button>
              <AnimatePresence>
                {pagesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.25, ease: EASE }}
                    className="absolute right-0 top-full w-56 pt-2"
                  >
                    <div className="rounded-2xl border border-line bg-surface p-2 shadow-card">
                      {[...NAV_LINKS, ...UTILITY_LINKS].map((l) => (
                        <Link
                          key={l.to}
                          href={l.to}
                          className="block rounded-xl px-3 py-2 text-sm text-foreground/75 transition-colors hover:bg-muted hover:text-foreground"
                        >
                          {l.label}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>
          <div className="flex items-center gap-3">
            <PillLink to="/contact" size="md" className="hidden sm:inline-flex">
              Contact Us
            </PillLink>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="grid size-11 place-items-center rounded-full bg-ink text-ink-foreground lg:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="fixed inset-0 z-40 flex flex-col bg-ink pt-[96px] text-ink-foreground lg:hidden"
          >
            <nav aria-label="Mobile" className="container-x flex flex-1 flex-col gap-1 overflow-y-auto pb-10">
              {[...NAV_LINKS, { to: "/contact", label: "Contact" } as const].map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.2 + i * 0.05 }}
                >
                  <Link href={l.to} className="flex items-baseline gap-4 border-b border-line-dark py-4 font-display text-3xl font-semibold tracking-tight">
                    <span className="text-xs font-sans text-ink-foreground/40">0{i + 1}</span>
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-foreground/60">
                {UTILITY_LINKS.filter((l) => l.to !== "/contact").map((l) => (
                  <Link key={l.to} href={l.to} className="hover:text-ink-foreground">
                    {l.label}
                  </Link>
                ))}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
