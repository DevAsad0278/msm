'use client';

import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const pillVariants = cva(
  "group/pill relative inline-flex items-center gap-2 overflow-hidden rounded-full font-medium transition-[background-color,color,border-color,transform,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-electric hover:shadow-card",
        electric: "bg-electric text-accent-foreground hover:bg-primary",
        light: "bg-surface text-foreground hover:bg-ink hover:text-ink-foreground",
        "outline-light": "border border-ink-foreground/60 text-ink-foreground hover:bg-ink-foreground hover:text-ink",
        dark: "bg-ink text-ink-foreground hover:bg-primary",
        outline: "border border-foreground/20 text-foreground hover:border-primary hover:bg-primary hover:text-primary-foreground",
      },
      size: {
        sm: "h-9 px-4 text-xs",
        md: "h-11 px-5 text-sm",
        lg: "h-14 px-7 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type PillVariantProps = VariantProps<typeof pillVariants>;

function RollText({ children }: { children: ReactNode }) {
  return (
    <span className="relative block overflow-hidden">
      <span className="block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/pill:-translate-y-full">
        {children}
      </span>
      <span
        aria-hidden
        className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/pill:translate-y-0"
      >
        {children}
      </span>
    </span>
  );
}

function ArrowIcon() {
  return (
    <span className="relative block size-4 overflow-hidden">
      <ArrowUpRight className="absolute inset-0 size-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/pill:-translate-y-full group-hover/pill:translate-x-full" />
      <ArrowUpRight className="absolute inset-0 size-4 -translate-x-full translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/pill:translate-x-0 group-hover/pill:translate-y-0" />
    </span>
  );
}

type PillLinkProps = PillVariantProps & {
  className?: string;
  children: ReactNode;
  arrow?: boolean;
  to: string;
  hash?: string;
  params?: Record<string, string>;
};

export function PillLink({ variant, size, className, children, arrow = true, to, hash, params }: PillLinkProps) {
  let href = to;
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      href = href.replace(`$${k}`, v);
    }
  }
  if (hash) {
    href = `${href}#${hash}`;
  }
  return (
    <Link href={href} className={cn(pillVariants({ variant, size }), className)}>
      <RollText>{children}</RollText>
      {arrow && <ArrowIcon />}
    </Link>
  );
}

type PillButtonProps = PillVariantProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { arrow?: boolean; children: ReactNode };

export function PillButton({ variant, size, className, children, arrow = true, ...props }: PillButtonProps) {
  return (
    <button className={cn(pillVariants({ variant, size }), className)} {...props}>
      <RollText>{children}</RollText>
      {arrow && <ArrowIcon />}
    </button>
  );
}
