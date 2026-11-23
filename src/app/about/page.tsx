'use client';

import { useQuery } from '@tanstack/react-query';
import { faqsQuery, teamQuery } from '@/lib/queries';
import { IMG } from '@/lib/images';
import { HERO_STATEMENTS } from '@/lib/site';
import { PageHero } from '@/components/site/page-hero';
import { PillLink } from '@/components/site/pill-button';
import { Reveal } from '@/components/site/motion';
import { Clients } from '@/components/sections/clients';
import { Values } from '@/components/sections/values';
import { FaqSection } from '@/components/sections/faq-section';
import { FinalCta } from '@/components/sections/final-cta';

export default function AboutPage() {
  const { data: team = [] } = useQuery(teamQuery);
  const { data: faqs = [] } = useQuery(faqsQuery);

  return (
    <>
      <PageHero
        eyebrow="About MSM"
        title={['We are more than an agency.', 'We are a growth partner.']}
        text="MSM Marketing Agency is a women-led creative and business growth agency bringing together marketing, design, SEO, business consulting and health advocacy."
        image={IMG.valuesTeam}
      >
        <PillLink to="/contact" size="lg">
          Work With Us
        </PillLink>
      </PageHero>

      <section className="container-x mt-16 grid gap-4 sm:grid-cols-3">
        {HERO_STATEMENTS.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.1}>
            <div className="rounded-3xl bg-surface p-8 shadow-soft">
              <p className="font-display text-3xl font-semibold text-primary">{s.title}</p>
              <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
            </div>
          </Reveal>
        ))}
      </section>

      {/* <Clients /> */}
      <Values />

      {team.length > 0 && (
        <section className="container-x py-24">
          <h2 className="display-md mb-12">The people behind the work</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m) => (
              <Reveal key={m.id}>
                <div className="overflow-hidden rounded-3xl border border-line bg-surface">
                  {m.photo_url && (
                    <img
                      src={m.photo_url}
                      alt={m.name}
                      className="aspect-[4/4.5] w-full object-cover"
                    />
                  )}
                  <div className="p-6">
                    <h3 className="font-display text-xl font-semibold">{m.name}</h3>
                    <p className="mt-1 text-xs font-medium text-primary">{m.role}</p>
                    {m.bio && (
                      <p className="mt-3 text-sm text-muted-foreground">{m.bio}</p>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <FaqSection faqs={faqs} />
      <FinalCta />
    </>
  );
}
