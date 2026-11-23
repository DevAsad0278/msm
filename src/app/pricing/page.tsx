'use client';

import { useQuery } from '@tanstack/react-query';
import { faqsQuery, pricingQuery } from '@/lib/queries';
import { PageHero } from '@/components/site/page-hero';
import { PricingSection } from '@/components/sections/pricing-section';
import { FaqSection } from '@/components/sections/faq-section';
import { FinalCta } from '@/components/sections/final-cta';
import { IMG } from '@/lib/images';

export default function PricingPage() {
  const { data: pricing = [] } = useQuery(pricingQuery);
  const { data: faqs = [] } = useQuery(faqsQuery);

  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title={['Simple, transparent', 'growth packages.']}
        text="Choose a package that matches your stage, or talk to us for a custom scope tailored to your business."
        image={IMG.consulting}
      />
      <PricingSection plans={pricing} />
      <FaqSection faqs={faqs.filter((f) => f.category === 'Pricing' || f.category === 'General')} />
      <FinalCta />
    </>
  );
}
