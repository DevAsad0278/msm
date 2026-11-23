'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { jobsQuery } from '@/lib/queries';
import { PageHero } from '@/components/site/page-hero';
import { ApplicationForm } from '@/components/site/application-form';
import { FinalCta } from '@/components/sections/final-cta';
import { IMG } from '@/lib/images';

export default function CareerPage() {
  const { data: jobs = [] } = useQuery(jobsQuery);
  const [selectedJob, setSelectedJob] = useState<string>('General Application');

  return (
    <>
      <PageHero
        eyebrow="Careers"
        title={['Build work that', 'actually matters.']}
        text="Join a women-led creative and growth agency built on innovation, collaboration and integrity."
        image={IMG.valuesTeam}
      />

      <section className="container-x py-20 grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7 space-y-6">
          <h2 className="display-md">Open positions</h2>
          {jobs.length === 0 ? (
            <div className="rounded-3xl border border-line bg-surface p-8">
              <h3 className="font-display text-2xl font-semibold">No open roles right now</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                We are always happy to meet thoughtful strategists, designers, SEO specialists and communicators. Send us a general application.
              </p>
            </div>
          ) : (
            jobs.map((job) => (
              <div
                key={job.id}
                className="rounded-3xl border border-line bg-surface p-7 shadow-soft"
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="eyebrow text-primary">{job.department}</span>
                    <h3 className="mt-1 font-display text-2xl font-semibold">{job.title}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {job.location} · {job.employment_type}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedJob(job.title)}
                    className="rounded-full bg-primary px-5 py-2.5 text-xs font-medium text-primary-foreground hover:bg-electric"
                  >
                    Apply for role
                  </button>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {job.description}
                </p>
              </div>
            ))
          )}
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-3xl border border-line bg-surface p-8 shadow-soft">
            <h3 className="font-display text-2xl font-semibold">Apply to MSM</h3>
            <p className="mt-1 mb-6 text-sm text-muted-foreground">
              Applying for: <span className="font-medium text-primary">{selectedJob}</span>
            </p>
            <ApplicationForm jobs={jobs} />
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
