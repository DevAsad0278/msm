'use client';

import { useQuery } from '@tanstack/react-query';
import {
  faqsQuery,
  postsQuery,
  pricingQuery,
  projectsQuery,
  servicesQuery,
  testimonialsQuery,
} from '@/lib/queries';
import { Hero } from '@/components/sections/hero';
import { Ticker } from '@/components/sections/ticker';
import { Statement } from '@/components/sections/statement';
import { Clients } from '@/components/sections/clients';
import { Process } from '@/components/sections/process';
import { Values } from '@/components/sections/values';
import { TeamShowcase } from '@/components/sections/team-showcase';
import { ServicesShowcase } from '@/components/sections/services-showcase';
import { FeaturedWork } from '@/components/sections/featured-work';
import { Testimonials } from '@/components/sections/testimonials';
import { TrustedBy } from '@/components/sections/trusted-by';
import { PricingSection } from '@/components/sections/pricing-section';
import { FaqSection } from '@/components/sections/faq-section';
import { BlogPreview } from '@/components/sections/blog-preview';
import { FinalCta } from '@/components/sections/final-cta';
import { GridHoverBg } from '@/components/site/grid-hover-bg';

export default function HomePage() {
  const { data: services = [] } = useQuery(servicesQuery);
  const { data: projects = [] } = useQuery(projectsQuery);
  const { data: testimonials = [] } = useQuery(testimonialsQuery);
  const { data: pricing = [] } = useQuery(pricingQuery);
  const { data: faqs = [] } = useQuery(faqsQuery);
  const { data: posts = [] } = useQuery(postsQuery);

  return (
    <div className="relative">
      <GridHoverBg />
      <div className="relative z-10">
        <Hero />
        <Ticker />
        <Statement />
        {/* <Clients /> */}
        <Process />
        <Values />
        <TeamShowcase />
        <ServicesShowcase services={services} />
        <FeaturedWork projects={projects} />
        <Testimonials items={testimonials} />
        {/* <TrustedBy /> */}
        <PricingSection plans={pricing} />
        <FaqSection faqs={faqs} />
        <BlogPreview posts={posts} />
        <FinalCta />
      </div>
    </div>
  );
}
