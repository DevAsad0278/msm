import { PageHero } from "./page-hero";
import { Reveal } from "./motion";

export function LegalPage({ title, updated, sections }: { title: string; updated: string; sections: { h: string; p: string }[] }) {
  return (
    <>
      <PageHero eyebrow={`Last updated · ${updated}`} title={[title]} text="Please read this page carefully. If you have any questions, contact us at dummy@gmail.com." />
      <section className="container-x py-20">
        <div className="mx-auto max-w-3xl space-y-10">
          {sections.map((s, i) => (
            <Reveal key={s.h} delay={i * 0.03}>
              <h2 className="font-display text-2xl font-semibold">{i + 1}. {s.h}</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">{s.p}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
