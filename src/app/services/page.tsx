'use client';

import { useQuery } from '@tanstack/react-query';
import { faqsQuery, pricingQuery, servicesQuery } from '@/lib/queries';
import { IMG } from '@/lib/images';
import { HERO_STATEMENTS } from '@/lib/site';
import { PageHero } from '@/components/site/page-hero';
import { PillLink } from '@/components/site/pill-button';
import { Reveal } from '@/components/site/motion';
import { Ticker } from '@/components/sections/ticker';
import { Statement } from '@/components/sections/statement';
import { ServicesShowcase } from '@/components/sections/services-showcase';
import { PricingSection } from '@/components/sections/pricing-section';
import { FaqSection } from '@/components/sections/faq-section';
import { FinalCta } from '@/components/sections/final-cta';

export default function ServicesPage() {
  const { data: services = [] } = useQuery(servicesQuery);
  const { data: faqs = [] } = useQuery(faqsQuery);
  const { data: pricing = [] } = useQuery(pricingQuery);

  return (
    <>
      <PageHero
        eyebrow="Our services"
        title={['Everything your brand', 'needs to grow.']}
        text="Marketing, creative design, SEO, business consulting and health advocacy — delivered by one women-led team with one clear strategy."
        image={IMG.marketing}
      >
        <PillLink to="/contact" size="lg">
          Start Your Project
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
      <Statement
        text="Growth is never one thing. That's why our services connect — strategy informs design, design powers marketing, and SEO and consulting keep everything moving in the right direction."
        tags={['Connected services', 'One strategy', 'Measurable progress']}
      />
      <Ticker tone="dark" />
      <ServicesShowcase services={services} showHeading={false} />
      <FaqSection faqs={faqs.filter((f) => f.category === 'Services' || f.category === 'General')} />
      <PricingSection plans={pricing} />
      <FinalCta />
    </>
  );
}
