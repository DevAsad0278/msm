'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { projectQuery, projectsQuery } from '@/lib/queries';
import { MaskImage, Reveal, SplitReveal } from '@/components/site/motion';
import { DemoBadge, ProjectGridCard } from '@/components/sections/project-card';
import { FinalCta } from '@/components/sections/final-cta';

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Reveal className="grid gap-4 border-t border-line py-10 md:grid-cols-[16rem_1fr]">
      <h2 className="font-display text-xl font-semibold">{title}</h2>
      <div className="leading-relaxed text-muted-foreground">{children}</div>
    </Reveal>
  );
}

export default function CaseStudyPage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug ?? '';
  const { data: p = null } = useQuery(projectQuery(slug));
  const { data: all = [] } = useQuery(projectsQuery);

  if (!p) return null;
  const related = all.filter((x) => x.id !== p.id).slice(0, 2);

  return (
    <>
      <section className="container-x pt-32 md:pt-40">
        <div className="flex flex-wrap items-center gap-3">
          <span className="eyebrow text-electric">{p.category}</span>
          {p.is_demo && <DemoBadge />}
        </div>
        <h1 className="display-lg mt-5 max-w-4xl">
          <SplitReveal immediate lines={[p.title]} />
        </h1>
        <Reveal>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{p.summary}</p>
        </Reveal>
        <dl className="mt-10 grid gap-6 rounded-3xl bg-surface p-6 shadow-soft sm:grid-cols-3">
          <div>
            <dt className="text-xs text-muted-foreground">Client</dt>
            <dd className="mt-1 font-medium">{p.client}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">Services</dt>
            <dd className="mt-1 font-medium">{p.services.join(', ')}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">Year</dt>
            <dd className="mt-1 font-medium">{p.year ?? '—'}</dd>
          </div>
        </dl>
      </section>

      {p.cover_url && (
        <div className="container-x mt-12">
          <MaskImage
            src={p.cover_url}
            alt={p.title}
            className="aspect-[16/9] rounded-[2rem]"
          />
        </div>
      )}

      <section className="container-x py-16">
        <Block title="Client overview">
          {p.client} — {p.summary}
        </Block>
        {p.objective && <Block title="Objective">{p.objective}</Block>}
        {p.challenge && <Block title="Challenge">{p.challenge}</Block>}
        {p.approach && <Block title="Creative approach">{p.approach}</Block>}
        {p.deliverables && p.deliverables.length > 0 && (
          <Block title="Deliverables">
            <ul className="space-y-2">
              {p.deliverables.map((d) => (
                <li key={d}>• {d}</li>
              ))}
            </ul>
          </Block>
        )}
        {p.results && <Block title="Results">{p.results}</Block>}
      </section>

      {related.length > 0 && (
        <section className="container-x pb-24">
          <h2 className="display-md mb-10">Related projects</h2>
          <div className="grid gap-10 md:grid-cols-2">
            {related.map((r) => (
              <ProjectGridCard key={r.id} p={r} />
            ))}
          </div>
        </section>
      )}

      <FinalCta />
    </>
  );
}
