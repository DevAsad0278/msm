import { IMG } from "@/lib/images";
import type { Tables } from "@/lib/types";

const SERVICES: Tables<"services">[] = [
  {
    id: "srv-1",
    number: "01",
    slug: "marketing",
    category: "Growth",
    title: "Marketing",
    description:
      "Digital marketing, social media management, paid advertising, content strategy and campaign management.",
    sub_items: [
      "Social media management",
      "Paid advertising",
      "Content strategy",
      "Campaign management",
    ],
    image_url: IMG.marketing,
    published: true,
    sort_order: 1,
    created_at: "",
    updated_at: "",
  },
  {
    id: "srv-2",
    number: "02",
    slug: "creative-design",
    category: "Brand",
    title: "Creative Design",
    description:
      "Brand identity, graphic design, creative campaigns and marketing collateral.",
    sub_items: [
      "Brand identity",
      "Graphic design",
      "Creative campaigns",
      "Marketing collateral",
    ],
    image_url: IMG.design,
    published: true,
    sort_order: 2,
    created_at: "",
    updated_at: "",
  },
  {
    id: "srv-3",
    number: "03",
    slug: "seo",
    category: "Search",
    title: "SEO",
    description:
      "Technical SEO, keyword research, on-page optimization and organic growth.",
    sub_items: [
      "Technical SEO",
      "Keyword research",
      "On-page optimization",
      "Organic growth",
    ],
    image_url: IMG.seo,
    published: true,
    sort_order: 3,
    created_at: "",
    updated_at: "",
  },
  {
    id: "srv-4",
    number: "04",
    slug: "business-consulting",
    category: "Strategy",
    title: "Business Consulting",
    description: "Business strategy, brand positioning and growth planning.",
    sub_items: [
      "Business strategy",
      "Brand positioning",
      "Growth planning",
      "Market research",
    ],
    image_url: IMG.consulting,
    published: true,
    sort_order: 4,
    created_at: "",
    updated_at: "",
  },
  {
    id: "srv-5",
    number: "05",
    slug: "health-advocacy",
    category: "Impact",
    title: "Health Advocacy",
    description:
      "Health awareness, educational communication and advocacy campaigns.",
    sub_items: [
      "Health awareness",
      "Educational content",
      "Advocacy campaigns",
      "Community outreach",
    ],
    image_url: IMG.health,
    published: true,
    sort_order: 5,
    created_at: "",
    updated_at: "",
  },
];

const PROJECTS: Tables<"projects">[] = [
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

const POSTS: Tables<"blog_posts">[] = [
  {
    id: "blog-1",
    slug: "why-strategy-first-marketing-wins",
    title: "Why Strategy-First Marketing Outperforms Tactical Noise",
    category: "Marketing Strategy",
    excerpt:
      "How aligning business objectives, audience insight, and creative execution eliminates wasted spend and builds lasting brand equity.",
    content:
      "## Moving Beyond Disconnected Tactics\n\nMany brands jump straight into campaigns without defining clear positioning. Strategy-first marketing anchors every channel decision in audience clarity.\n\n## Connecting Identity with Performance\n\nWhen design, messaging, and targeting reinforce one another, acquisition becomes more efficient and trust compounds.",
    cover_url: IMG.blog1,
    author: "MSM Editorial Team",
    published_at: "2026-10-18",
    read_minutes: 5,
    featured: true,
    published: true,
    created_at: "",
    updated_at: "",
  },
  {
    id: "blog-2",
    slug: "design-that-builds-instant-credibility",
    title: "Design That Sells: The Psychology Behind Branding",
    category: "Brand Strategy",
    excerpt:
      "Design isn’t just visual—it’s behavioral. Understand what actually builds instant trust and influences audience decisions.",
    content:
      "## First Impressions Are Strategic Assets\n\nYour visual identity signals your level of care, clarity, and professionalism within seconds.",
    cover_url: IMG.blog3,
    author: "MSM Editorial Team",
    published_at: "2026-10-05",
    read_minutes: 4,
    featured: false,
    published: true,
    created_at: "",
    updated_at: "",
  },
  {
    id: "blog-3",
    slug: "health-advocacy-communication-with-empathy",
    title: "Health Advocacy: Turning Awareness Into Action",
    category: "Health Advocacy",
    excerpt:
      "Principles for crafting clear, culturally grounded health campaigns that educate communities and inspire lasting impact.",
    content:
      "## Clarity Over Clinical Jargon\n\nEffective health advocacy translates complex public health concepts into accessible, human-centered stories.",
    cover_url: IMG.health,
    author: "MSM Editorial Team",
    published_at: "2026-09-22",
    read_minutes: 6,
    featured: false,
    published: true,
    created_at: "",
    updated_at: "",
  },
];

const PRICING: Tables<"pricing_plans">[] = [
  {
    id: "plan-starter",
    name: "Starter",
    tagline: "Essential Brand Presence",
    currency: "PKR",
    monthly_price: null,
    yearly_price: null,
    popular: false,
    is_placeholder: true,
    features: [
      "Brand & positioning discovery",
      "Core social media management",
      "Essential creative design collateral",
      "Foundational on-page SEO",
      "Monthly performance summary",
    ],
    published: true,
    sort_order: 1,
    created_at: "",
    updated_at: "",
  },
  {
    id: "plan-growth",
    name: "Growth",
    tagline: "Strategic Brand Growth",
    currency: "PKR",
    monthly_price: null,
    yearly_price: null,
    popular: true,
    is_placeholder: true,
    features: [
      "Full digital marketing & content strategy",
      "Paid advertising campaign management",
      "Technical & content SEO roadmap",
      "Campaign creative & design system",
      "Bi-weekly strategy & optimization reviews",
    ],
    published: true,
    sort_order: 2,
    created_at: "",
    updated_at: "",
  },
  {
    id: "plan-complete",
    name: "Complete",
    tagline: "Full-Service Growth Partnership",
    currency: "PKR",
    monthly_price: null,
    yearly_price: null,
    popular: false,
    is_placeholder: true,
    features: [
      "Dedicated women-led growth team",
      "End-to-end marketing & creative execution",
      "Executive business & brand consulting",
      "Advanced SEO & international reach",
      "Health advocacy & purpose campaigns",
    ],
    published: true,
    sort_order: 3,
    created_at: "",
    updated_at: "",
  },
];

const FAQS: Tables<"faqs">[] = [
  {
    id: "faq-1",
    category: "General",
    question: "What services does MSM Marketing Agency offer?",
    answer:
      "We offer Marketing, Creative Design, SEO, Business Consulting, and Health Advocacy — individually or as an integrated all-in-one growth partnership.",
    published: true,
    sort_order: 1,
    created_at: "",
    updated_at: "",
  },
  {
    id: "faq-2",
    category: "General",
    question: "Does MSM work with international clients?",
    answer:
      "Yes. While rooted in Pakistan, MSM Marketing Agency collaborates seamlessly with founders, businesses, and organizations across international markets.",
    published: true,
    sort_order: 2,
    created_at: "",
    updated_at: "",
  },
  {
    id: "faq-3",
    category: "Services",
    question: "Can we combine multiple services into one engagement?",
    answer:
      "Absolutely. Most clients combine services — such as Creative Design with Marketing, or Business Consulting with SEO — so strategy and execution stay aligned.",
    published: true,
    sort_order: 3,
    created_at: "",
    updated_at: "",
  },
  {
    id: "faq-4",
    category: "Pricing",
    question: "Do you offer customized packages?",
    answer:
      "Yes. Our Starter, Growth, and Complete tiers can be tailored around your specific business objectives, markets, and deliverables.",
    published: true,
    sort_order: 4,
    created_at: "",
    updated_at: "",
  },
  {
    id: "faq-5",
    category: "Process",
    question: "How do we start a project with MSM?",
    answer:
      "Send us an inquiry through the Contact page. We begin with our Discover phase to understand your brand, audience, and goals before proposing a clear roadmap.",
    published: true,
    sort_order: 5,
    created_at: "",
    updated_at: "",
  },
];

const TESTIMONIALS: Tables<"testimonials">[] = [
  {
    id: "tst-1",
    quote:
      "Placeholder for verified MSM client feedback — add approved testimonials anytime.",
    name: "Verified Client Slot 01",
    role: "Partner Organization",
    highlight: null,
    rating: 5,
    avatar_url: IMG.hero,
    published: true,
    sort_order: 1,
    created_at: "",
    updated_at: "",
  },
  {
    id: "tst-2",
    quote:
      "Placeholder for verified MSM client feedback highlighting strategic clarity and creative execution.",
    name: "Verified Client Slot 02",
    role: "Growth Partner",
    highlight: null,
    rating: 5,
    avatar_url: IMG.valuesTeam,
    published: true,
    sort_order: 2,
    created_at: "",
    updated_at: "",
  },
  {
    id: "tst-3",
    quote:
      "Placeholder for verified MSM client feedback covering SEO, brand identity, and measurable reach.",
    name: "Verified Client Slot 03",
    role: "Brand Leadership",
    highlight: null,
    rating: 5,
    avatar_url: IMG.marketing,
    published: true,
    sort_order: 3,
    created_at: "",
    updated_at: "",
  },
  {
    id: "tst-4",
    quote:
      "Placeholder for verified MSM client feedback on health advocacy and community communication.",
    name: "Verified Client Slot 04",
    role: "Health & Impact Partner",
    highlight: null,
    rating: 5,
    avatar_url: IMG.health,
    published: true,
    sort_order: 4,
    created_at: "",
    updated_at: "",
  },
];

const TEAM: Tables<"team_members">[] = [
  {
    id: "tm-1",
    name: "Founder 01",
    role: "Co-Founder & Strategy Lead",
    bio: "Leading strategic direction, business consulting, and cross-border brand partnerships at MSM Marketing Agency.",
    photo_url: IMG.hero,
    published: true,
    sort_order: 1,
    created_at: "",
    updated_at: "",
  },
  {
    id: "tm-2",
    name: "Founder 02",
    role: "Co-Founder & Creative Director",
    bio: "Shaping visual identity systems, creative campaigns, and purpose-driven brand storytelling.",
    photo_url: IMG.valuesTeam,
    published: true,
    sort_order: 2,
    created_at: "",
    updated_at: "",
  },
  {
    id: "tm-3",
    name: "Growth Lead",
    role: "Head of Digital & SEO",
    bio: "Driving technical SEO, search architecture, and performance marketing across Pakistan and international markets.",
    photo_url: IMG.marketing,
    published: true,
    sort_order: 3,
    created_at: "",
    updated_at: "",
  },
  {
    id: "tm-4",
    name: "Advocacy Lead",
    role: "Health Communication Strategist",
    bio: "Designing educational health advocacy initiatives with clarity, empathy, and measurable community reach.",
    photo_url: IMG.health,
    published: true,
    sort_order: 4,
    created_at: "",
    updated_at: "",
  },
];

const SETTINGS: Tables<"site_settings"> = {
  id: 1,
  contact_email: "hello@msmmarketingagency.com",
  phone: "+92 300 0000000",
  location: "Pakistan · Working worldwide",
  instagram_url: "https://instagram.com",
  facebook_url: "https://facebook.com",
  linkedin_url: "https://linkedin.com",
  whatsapp_url: "https://whatsapp.com",
};

export async function getServices() {
  return SERVICES;
}

export async function getProjects() {
  return PROJECTS;
}

export async function getProject(slug: string): Promise<Tables<"projects"> | null> {
  return PROJECTS.find((p) => p.slug === slug) ?? null;
}

export async function getPosts() {
  return POSTS;
}

export async function getPost(slug: string): Promise<Tables<"blog_posts"> | null> {
  return POSTS.find((p) => p.slug === slug) ?? null;
}

export async function getPricing() {
  return PRICING;
}

export async function getFaqs() {
  return FAQS;
}

export async function getTestimonials() {
  return TESTIMONIALS;
}

export async function getJobs(): Promise<Tables<"job_openings">[]> {
  return [];
}

export async function getTeam() {
  return TEAM;
}

export async function getClientLogos(): Promise<Tables<"client_logos">[]> {
  return [];
}

export async function getSettings(): Promise<Tables<"site_settings"> | null> {
  return SETTINGS;
}
