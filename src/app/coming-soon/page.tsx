'use client';

import { NewsletterForm } from '@/components/site/newsletter-form';
import { PillLink } from '@/components/site/pill-button';

export default function ComingSoonPage() {
  return (
    <section className="container-x flex min-h-[80vh] flex-col items-center justify-center py-32 text-center">
      <span className="eyebrow text-primary">Launching Soon</span>
      <h1 className="display-lg mt-4 max-w-2xl">We are coming soon!</h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        Something new is in the works at MSM Marketing Agency. Leave your email to be the first to know.
      </p>
      <div className="mt-8 w-full max-w-md">
        <NewsletterForm source="coming-soon" />
      </div>
      <div className="mt-10">
        <PillLink to="/" variant="outline">
          Back to Home
        </PillLink>
      </div>
    </section>
  );
}
