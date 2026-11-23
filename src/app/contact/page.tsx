'use client';

import { useQuery } from '@tanstack/react-query';
import { Mail, MapPin, Phone } from 'lucide-react';
import { faqsQuery, settingsQuery } from '@/lib/queries';
import { PageHero } from '@/components/site/page-hero';
import { ContactForm } from '@/components/site/contact-form';
import { FaqSection } from '@/components/sections/faq-section';
import { IMG } from '@/lib/images';

export default function ContactPage() {
  const { data: settings = null } = useQuery(settingsQuery);
  const { data: faqs = [] } = useQuery(faqsQuery);

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={['Let’s turn your next', 'big idea into impact.']}
        text="Tell us about your brand, goals and timeline. We partner with businesses across Pakistan and international markets."
        image={IMG.cta}
      />

      <section className="container-x py-20 grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl bg-ink p-8 text-ink-foreground">
            <h2 className="font-display text-2xl font-semibold">Direct contact</h2>
            <ul className="mt-6 space-y-4 text-sm text-ink-foreground/80">
              <li className="flex items-center gap-3">
                <Mail className="size-4 text-electric" />
                <span>{settings?.contact_email ?? 'hello@msmmarketingagency.com'}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="size-4 text-electric" />
                <span>{settings?.phone ?? '+92 300 0000000'}</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="size-4 text-electric" />
                <span>{settings?.location ?? 'Pakistan · Worldwide'}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="rounded-3xl border border-line bg-surface p-8 shadow-soft">
            <ContactForm />
          </div>
        </div>
      </section>

      <FaqSection faqs={faqs} />
    </>
  );
}
