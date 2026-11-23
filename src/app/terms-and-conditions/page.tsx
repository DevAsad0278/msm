'use client';

import { LegalPage } from '@/components/site/legal-page';

const SECTIONS = [
  {
    h: '1. Introduction',
    p: 'These Terms & Conditions govern your use of the MSM Marketing Agency website and informational resources.',
  },
  {
    h: '2. Services Overview',
    p: 'MSM Marketing Agency provides marketing, creative design, SEO, business consulting and health advocacy services. Specific project scopes and deliverables are governed by signed client agreements.',
  },
  {
    h: '3. Intellectual Property',
    p: 'All MSM branding, original logos, copy and visual materials on this website remain the intellectual property of MSM Marketing Agency unless otherwise licensed.',
  },
  {
    h: '4. Contact Information',
    p: 'For questions regarding these Terms & Conditions, please reach out through our Contact page.',
  },
];

export default function TermsPage() {
  return <LegalPage title="Terms & Conditions" updated="Effective 2026" sections={SECTIONS} />;
}
