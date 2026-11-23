'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { projectsQuery } from '@/lib/queries';
import { PageHero } from '@/components/site/page-hero';
import { ProjectGridCard } from '@/components/sections/project-card';
import { FinalCta } from '@/components/sections/final-cta';
import { IMG } from '@/lib/images';
import { cn } from '@/lib/utils';

export default function WorkPage() {
  const { data: projects = [] } = useQuery(projectsQuery);
  const [category, setCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))];
  const filtered =
    category === 'All' ? projects : projects.filter((p) => p.category === category);

  return (
    <>
      <PageHero
        eyebrow="Selected work"
        title={['Work that builds', 'lasting impact.']}
        text="Explore case studies across marketing, creative design, SEO, business consulting and health advocacy."
        image={IMG.design}
      />

      <section className="container-x py-20">
        <div className="mb-12 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={cn(
                'rounded-full px-5 py-2.5 text-sm font-medium transition-colors',
                category === cat
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-muted-foreground hover:text-foreground',
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid gap-10 md:grid-cols-2">
          {filtered.map((p) => (
            <ProjectGridCard key={p.id} p={p} />
          ))}
        </div>
      </section>

      <FinalCta />
    </>
  );
}
