import { BRAND_STATEMENT } from "@/lib/site";
import { Reveal, ScrollWords } from "@/components/site/motion";

export function Statement({ text = BRAND_STATEMENT, tags = ["Women-led", "Pakistan", "International", "Since day one: purpose-driven"] }: { text?: string; tags?: string[] }) {
  return (
    <section aria-label="Our belief" className="container-x grid gap-10 py-24 md:grid-cols-12 md:py-32">
      <Reveal className="md:col-span-4">
        <ul className="space-y-2 text-sm font-medium uppercase tracking-wide text-muted-foreground">
          {tags.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </Reveal>
      <div className="md:col-span-8">
        <ScrollWords text={text} className="font-display text-[clamp(1.6rem,3.2vw,2.75rem)] font-semibold leading-[1.15] tracking-[-0.03em]" />
      </div>
    </section>
  );
}
