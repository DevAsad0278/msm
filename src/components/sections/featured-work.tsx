'use client';

import type { Tables } from "@/integrations/supabase/types";
import { IMG } from "@/lib/images";
import { SectionHeading } from "@/components/site/section-heading";
import { PillLink } from "@/components/site/pill-button";
import { Reveal } from "@/components/site/motion";
import { ProjectFeatureCard } from "./project-card";

const FALLBACK_PROJECTS: Tables<"projects">[] = [
  {
    id: "demo-1",
    slug: "integrated-brand-growth-blueprint",
    title: "Integrated Brand & Growth Blueprint",
    client: "Demo Placeholder — Client A",
    category: "Marketing & Strategy",
    summary:
      "Editable demo case study showcasing MSM’s structured approach to brand positioning, multi-channel campaign rollout, and cohesive creative direction.",
    services: ["Marketing", "Brand Strategy"],
    cover_url: IMG.marketing,
    gallery: [IMG.marketing],
    objective: "Establish a clear market identity and repeatable campaign engine.",
    challenge: "Fragmented brand communication across digital touchpoints.",
    approach: "Strategic discovery paired with targeted campaign messaging.",
    deliverables: ["Brand Positioning", "Campaign Collateral", "Paid Strategy"],
    results: "Reserved for verified client metrics.",
    year: "2026",
    is_demo: true,
    featured: true,
    published: true,
    sort_order: 1,
    created_at: "",
    updated_at: "",
  },
  {
    id: "demo-2",
    slug: "visual-identity-collateral-system",
    title: "Visual Identity & Collateral System",
    client: "Demo Placeholder — Client B",
    category: "Creative Design",
    summary:
      "Editable demo case study illustrating a complete visual identity refresh, typography hierarchy, and campaign design toolkit.",
    services: ["Creative Design", "Brand Identity"],
    cover_url: IMG.design,
    gallery: [IMG.design],
    objective: "Craft a modern, trustworthy visual system across digital and print.",
    challenge: "Outdated visual assets lacked consistency.",
    approach: "Disciplined color, typography, and modular campaign templates.",
    deliverables: ["Brand Guidelines", "Social Templates", "Marketing Collateral"],
    results: "Reserved for verified client metrics.",
    year: "2026",
    is_demo: true,
    featured: true,
    published: true,
    sort_order: 2,
    created_at: "",
    updated_at: "",
  },
  {
    id: "demo-3",
    slug: "search-architecture-organic-visibility",
    title: "Search Architecture & Organic Visibility",
    client: "Demo Placeholder — Client C",
    category: "SEO",
    summary:
      "Editable demo case study demonstrating technical SEO restructuring, search intent mapping, and editorial content optimization.",
    services: ["Technical SEO", "Content SEO"],
    cover_url: IMG.seo,
    gallery: [IMG.seo],
    objective: "Improve organic discoverability across high-intent search queries.",
    challenge: "Crawl inefficiencies and unaligned page metadata.",
    approach: "Technical audit, restructured hierarchy, and intent-driven roadmap.",
    deliverables: ["Technical SEO Audit", "Keyword Map", "On-Page Optimization"],
    results: "Reserved for verified client metrics.",
    year: "2026",
    is_demo: true,
    featured: true,
    published: true,
    sort_order: 3,
    created_at: "",
    updated_at: "",
  },
  {
    id: "demo-4",
    slug: "community-health-advocacy-campaign",
    title: "Community Health Advocacy Campaign",
    client: "Demo Placeholder — Client D",
    category: "Health Advocacy",
    summary:
      "Editable demo case study showcasing accessible educational communication and awareness storytelling for public health outreach.",
    services: ["Health Advocacy", "Educational Design"],
    cover_url: IMG.health,
    gallery: [IMG.health],
    objective: "Translate complex health guidance into clear, resonant campaigns.",
    challenge: "Information overload required empathetic, plain-language storytelling.",
    approach: "Multi-format educational assets and community-first messaging.",
    deliverables: ["Advocacy Strategy", "Educational Visuals", "Outreach Plan"],
    results: "Reserved for verified client metrics.",
    year: "2026",
    is_demo: true,
    featured: true,
    published: true,
    sort_order: 4,
    created_at: "",
    updated_at: "",
  },
];

export function FeaturedWork({ projects }: { projects: Tables<"projects">[] }) {
  const source = projects.length > 0 ? projects : FALLBACK_PROJECTS;
  const list = source.filter((p) => p.featured).slice(0, 4);

  return (
    <section aria-label="Featured work" className="container-x py-24 md:py-32">
      <SectionHeading
        align="center"
        title={["Work That Delivers Results"]}
        text="A closer look at how we help brands solve problems, sharpen their presence and grow with purpose."
      />
      <div className="mt-14">
        {list.map((p, i) => (
          <div key={p.id} className="sticky mb-8 md:mb-12" style={{ top: `${96 + i * 22}px` }}>
            <ProjectFeatureCard p={p} />
          </div>
        ))}
      </div>
      <Reveal className="mt-6 text-center">
        <PillLink to="/work" variant="dark">
          View all work
        </PillLink>
      </Reveal>
    </section>
  );
}
