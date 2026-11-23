export interface ServiceRow {
  id: string;
  number: string;
  slug: string;
  category: string;
  title: string;
  description: string;
  sub_items: string[];
  image_url: string | null;
  published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface ProjectRow {
  id: string;
  slug: string;
  title: string;
  client: string;
  category: string;
  summary: string;
  services: string[];
  cover_url: string | null;
  gallery: string[];
  objective: string | null;
  challenge: string | null;
  approach: string | null;
  deliverables: string[];
  results: string | null;
  year: string | null;
  is_demo: boolean;
  featured: boolean;
  published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface BlogPostRow {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  cover_url: string | null;
  author: string;
  published_at: string;
  read_minutes: number;
  featured: boolean;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface PricingPlanRow {
  id: string;
  name: string;
  tagline: string;
  currency: string;
  monthly_price: number | null;
  yearly_price: number | null;
  popular: boolean;
  is_placeholder: boolean;
  features: string[];
  published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface FaqRow {
  id: string;
  category: string;
  question: string;
  answer: string;
  published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface TestimonialRow {
  id: string;
  name: string;
  role: string | null;
  quote: string;
  highlight: string | null;
  rating: number;
  avatar_url: string | null;
  published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface JobOpeningRow {
  id: string;
  title: string;
  department: string;
  location: string;
  employment_type: string;
  description: string;
  published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface TeamMemberRow {
  id: string;
  name: string;
  role: string;
  bio: string | null;
  photo_url: string | null;
  published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface ClientLogoRow {
  id: string;
  name: string;
  logo_url: string | null;
  published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface SiteSettingsRow {
  id: number;
  contact_email: string;
  phone: string | null;
  location: string | null;
  instagram_url: string | null;
  facebook_url: string | null;
  linkedin_url: string | null;
  whatsapp_url: string | null;
}

export type TableMap = {
  services: ServiceRow;
  projects: ProjectRow;
  blog_posts: BlogPostRow;
  pricing_plans: PricingPlanRow;
  faqs: FaqRow;
  testimonials: TestimonialRow;
  job_openings: JobOpeningRow;
  team_members: TeamMemberRow;
  client_logos: ClientLogoRow;
  site_settings: SiteSettingsRow;
};

export type Tables<T extends keyof TableMap> = TableMap[T];
