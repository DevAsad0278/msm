'use client';

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Mail, MapPin, Phone } from "lucide-react";
import { BRAND, NAV_LINKS } from "@/lib/site";
import { settingsQuery } from "@/lib/queries";
import { Logo } from "./logo";
import { NewsletterForm } from "./newsletter-form";

export function Footer() {
  const { data: s = null } = useQuery(settingsQuery);
  const email = s?.contact_email ?? "hello@msmmarketingagency.com";
  const phone = s?.phone ?? "+92 300 0000000";
  const location = s?.location ?? "Pakistan · Working worldwide";

  const socials = [
    { label: "Facebook", href: s?.facebook_url || "https://facebook.com" },
    { label: "Instagram", href: s?.instagram_url || "https://instagram.com" },
    { label: "LinkedIn", href: s?.linkedin_url || "https://linkedin.com" },
    { label: "WhatsApp", href: s?.whatsapp_url || "https://whatsapp.com" },
  ];

  return (
    <footer className="relative overflow-hidden bg-[#101116] text-white">
      <div className="container-x pt-20 pb-8">
        {/* Top Row: Left Brand + Right Newsletter */}
        <div className="flex flex-col justify-between gap-10 pb-16 lg:flex-row lg:items-start">
          <div className="max-w-sm">
            <Logo tone="light" />
            <p className="mt-5 text-sm leading-relaxed text-white/65">
              {BRAND.description}
            </p>
          </div>

          <div className="w-full max-w-md">
            <p className="mb-3 font-display text-sm font-semibold text-white">
              Subscribe to Our Newsletter
            </p>
            <NewsletterForm source="footer" tone="dark" />
            <p className="mt-2.5 text-xs text-white/45">
              No spam. Just great content.
            </p>
          </div>
        </div>

        {/* Middle 6-Column Links Grid matching screenshot */}
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-6">
          <div>
            <p className="text-xs font-medium text-white/45">Main Pages</p>
            <ul className="mt-4 space-y-2.5 text-sm text-white/80">
              {NAV_LINKS.map((l) => (
                <li key={l.to}>
                  <Link href={l.to} className="transition-colors hover:text-[#4169E1]">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/contact" className="transition-colors hover:text-[#4169E1]">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-medium text-white/45">CMS Pages</p>
            <ul className="mt-4 space-y-2.5 text-sm text-white/80">
              <li>
                <Link
                  href="/work/integrated-brand-growth-blueprint"
                  className="transition-colors hover:text-[#4169E1]"
                >
                  Work Details
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/why-strategy-first-marketing-wins"
                  className="transition-colors hover:text-[#4169E1]"
                >
                  Blog Details
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-medium text-white/45">Utility Pages</p>
            <ul className="mt-4 space-y-2.5 text-sm text-white/80">
              <li>
                <Link href="/404" className="transition-colors hover:text-[#4169E1]">
                  404
                </Link>
              </li>
              <li>
                <Link
                  href="/coming-soon"
                  className="transition-colors hover:text-[#4169E1]"
                >
                  Coming Soon
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-medium text-white/45">Legal</p>
            <ul className="mt-4 space-y-2.5 text-sm text-white/80">
              <li>
                <Link
                  href="/privacy-policy"
                  className="transition-colors hover:text-[#4169E1]"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-and-conditions"
                  className="transition-colors hover:text-[#4169E1]"
                >
                  Terms &amp; Conditions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-medium text-white/45">Social Links</p>
            <ul className="mt-4 space-y-2.5 text-sm text-white/80">
              {socials.map((soc) => (
                <li key={soc.label}>
                  <a
                    href={soc.href}
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors hover:text-[#4169E1]"
                  >
                    {soc.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-medium text-white/45">Have a question?</p>
            <ul className="mt-4 space-y-4 text-sm text-white/85">
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 size-4 shrink-0 text-[#4169E1]" />
                <div>
                  <p className="font-medium">{phone}</p>
                  <p className="text-[11px] text-white/45">Monday to Friday, 9am to 5pm</p>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 size-4 shrink-0 text-[#4169E1]" />
                <div>
                  <a
                    href={`mailto:${email}`}
                    className="break-all font-medium transition-colors hover:text-[#4169E1]"
                  >
                    {email}
                  </a>
                  <p className="text-[11px] text-white/45">We aim to reply in 24 hours</p>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-[#4169E1]" />
                <div>
                  <p className="font-medium">{location}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Giant Glossy Gradient Wordmark: MSM Agency (single line, edge-to-edge, fading into dark base) */}
      <div className="container-x overflow-hidden pt-6 pb-2">
        <p
          aria-hidden="true"
          className="select-none whitespace-nowrap text-center font-display text-[clamp(2.5rem,12.2vw,11.5rem)] font-bold leading-[0.92] tracking-[-0.045em] pb-2 bg-clip-text text-transparent"
          style={{
            backgroundImage:
              "linear-gradient(180deg, #4169E1 0%, #153E9F 46%, rgba(16, 17, 22, 0.08) 98%)",
          }}
        >
          MSM Agency
        </p>
      </div>
    </footer>
  );
}
