export const BRAND = {
  name: "MSM Marketing Agency",
  short: "MSM",
  tagline: "Ideas Into Impact. Businesses Into Brands.",
  positioning: "Your All-in-One Growth Partner.",
  description:
    "MSM Marketing Agency is a women-led creative and business growth agency bringing together marketing, design, SEO, business consulting and health advocacy.",
};

export const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/work", label: "Work" },
  { to: "/about", label: "About" },
  { to: "/pricing", label: "Pricing" },
  { to: "/blog", label: "Blog" },
  { to: "/career", label: "Career" },
] as const;

export const UTILITY_LINKS = [
  { to: "/contact", label: "Contact" },
  { to: "/privacy-policy", label: "Privacy Policy" },
  { to: "/terms-and-conditions", label: "Terms & Conditions" },
  { to: "/coming-soon", label: "Coming Soon" },
  { to: "/404", label: "404" },
] as const;

export const TICKER_ITEMS = [
  "Marketing",
  "Creative Design",
  "SEO",
  "Business Consulting",
  "Health Advocacy",
  "Brand Strategy",
  "Digital Growth",
];

export const HERO_TAGS = [
  "Clarity in positioning",
  "Creative with purpose",
  "SEO & organic growth",
  "Business strategy",
];

export const HERO_STATEMENTS = [
  { title: "Women-Led", text: "Creative & business growth agency" },
  { title: "Pakistan + Global", text: "Serving local and international brands" },
  { title: "All-in-One", text: "Marketing, design, SEO & consulting" },
];

export const BRAND_STATEMENT =
  "We don't believe in ordinary marketing. Every brand deserves a clear strategy, meaningful creativity and an approach designed around its goals. We bring ideas, people and possibilities together to create work that makes an impact.";

export const PROCESS_STEPS = [
  { n: "01", title: "Discover", text: "Understand the brand, business objectives, audience and challenges." },
  { n: "02", title: "Strategize", text: "Develop a clear strategy, creative direction and growth roadmap." },
  { n: "03", title: "Create", text: "Turn ideas into compelling marketing and brand experiences." },
  { n: "04", title: "Optimize", text: "Evaluate performance, improve execution and identify new growth opportunities." },
];

export const VALUES = [
  { n: "01", title: "Innovation", text: "We embrace new ideas and creative approaches to solve business challenges." },
  { n: "02", title: "Collaboration", text: "We believe meaningful work comes from different perspectives working together." },
  { n: "03", title: "Integrity", text: "We value honesty, transparency and responsibility in every relationship." },
];

export const SERVICE_OPTIONS = [
  "Marketing",
  "Creative Design",
  "SEO",
  "Business Consulting",
  "Health Advocacy",
  "Multiple services",
];

export const BUDGET_OPTIONS = [
  "Under PKR 100,000",
  "PKR 100,000 – 300,000",
  "PKR 300,000 – 700,000",
  "PKR 700,000+",
  "Not sure yet",
];

export function formatPrice(value: number | null, currency: string) {
  if (value == null) return "Custom";
  return `${currency} ${new Intl.NumberFormat("en-US").format(value)}`;
}
