'use client';

import { LegalPage } from '@/components/site/legal-page';

const SECTIONS = [
  {
    h: '1. Information We Collect',
    p: 'We collect information you provide directly through our contact, career application and newsletter forms — including your name, email address, phone number, country, company details and project notes.',
  },
  {
    h: '2. How We Use Information',
    p: 'Your details are used solely to respond to your inquiries, evaluate job applications, deliver requested services and send consented MSM Insights updates.',
  },
  {
    h: '3. Data Sharing & Security',
    p: 'MSM Marketing Agency does not sell or rent your personal data. Submitted records are stored securely and accessed only by authorized team members.',
  },
  {
    h: '4. Your Rights & Contact',
    p: 'You may request access, correction or deletion of your information at any time by contacting us via our Contact page.',
  },
];

export default function PrivacyPolicyPage() {
  return <LegalPage title="Privacy Policy" updated="Effective 2026" sections={SECTIONS} />;
}
