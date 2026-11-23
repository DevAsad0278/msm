import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal, SplitReveal } from "./motion";

export function SectionHeading({
  title,
  text,
  align = "split",
  tone = "dark",
  className,
}: {
  title: ReactNode[];
  text?: ReactNode;
  align?: "split" | "center";
  tone?: "dark" | "light";
  className?: string;
}) {
  const light = tone === "light";
  if (align === "center") {
    return (
      <div className={cn("mx-auto max-w-3xl text-center", className)}>
        <h2 className={cn("display-md", light && "text-ink-foreground")}>
          <SplitReveal lines={title} />
        </h2>
        {text && (
          <Reveal delay={0.15}>
            <p className={cn("mx-auto mt-5 max-w-xl text-base", light ? "text-ink-foreground/65" : "text-muted-foreground")}>{text}</p>
          </Reveal>
        )}
      </div>
    );
  }
  return (
    <div className={cn("flex flex-col gap-6 md:flex-row md:items-end md:justify-between", className)}>
      <h2 className={cn("display-md max-w-2xl", light && "text-ink-foreground")}>
        <SplitReveal lines={title} />
      </h2>
      {text && (
        <Reveal delay={0.15} className="md:max-w-sm md:text-right">
          <p className={cn("text-base", light ? "text-ink-foreground/60" : "text-muted-foreground")}>{text}</p>
        </Reveal>
      )}
    </div>
  );
}
