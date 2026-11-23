
-- Roles
create type public.app_role as enum ('admin', 'moderator', 'user');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create policy "Users read own roles" on public.user_roles for select to authenticated
  using (user_id = auth.uid() or public.has_role(auth.uid(), 'admin'));

create or replace function public.handle_first_admin()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if not exists (select 1 from public.user_roles where role = 'admin') then
    insert into public.user_roles (user_id, role) values (new.id, 'admin');
  end if;
  return new;
end;
$$;
create trigger on_auth_user_created_first_admin after insert on auth.users
  for each row execute function public.handle_first_admin();

create or replace function public.touch_updated_at()
returns trigger language plpgsql set search_path = public as $$
begin new.updated_at = now(); return new; end; $$;

-- ===== CMS tables =====
create table public.services (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  number text not null,
  category text not null,
  title text not null,
  description text not null,
  sub_items text[] not null default '{}',
  image_url text,
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  client text not null,
  category text not null,
  services text[] not null default '{}',
  summary text not null,
  cover_url text,
  year text,
  objective text,
  challenge text,
  approach text,
  deliverables text[] not null default '{}',
  gallery text[] not null default '{}',
  results text,
  is_demo boolean not null default false,
  featured boolean not null default true,
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  category text not null,
  excerpt text not null,
  cover_url text,
  author text not null default 'MSM Editorial Team',
  published_at date not null default current_date,
  read_minutes int not null default 5,
  content text not null default '',
  featured boolean not null default false,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text,
  quote text not null,
  highlight text,
  avatar_url text,
  rating int not null default 5,
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.pricing_plans (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  tagline text not null,
  monthly_price numeric,
  yearly_price numeric,
  currency text not null default 'PKR',
  features text[] not null default '{}',
  popular boolean not null default false,
  is_placeholder boolean not null default true,
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.faqs (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  question text not null,
  answer text not null,
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.job_openings (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  department text not null,
  employment_type text not null default 'Full-time',
  location text not null default 'Remote',
  description text not null,
  requirements text[] not null default '{}',
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.team_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null,
  bio text,
  photo_url text,
  is_founder boolean not null default false,
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.client_logos (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  logo_url text,
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.site_settings (
  id int primary key default 1 check (id = 1),
  contact_email text not null default 'dummy@gmail.com',
  phone text,
  location text,
  instagram_url text,
  facebook_url text,
  linkedin_url text,
  tiktok_url text,
  whatsapp_url text,
  seo_title text,
  seo_description text,
  updated_at timestamptz not null default now()
);

-- grants + RLS for CMS tables
do $$
declare t text;
begin
  foreach t in array array['services','projects','blog_posts','testimonials','pricing_plans','faqs','job_openings','team_members','client_logos'] loop
    execute format('grant select on public.%I to anon', t);
    execute format('grant select, insert, update, delete on public.%I to authenticated', t);
    execute format('grant all on public.%I to service_role', t);
    execute format('alter table public.%I enable row level security', t);
    execute format('create policy "Public reads published" on public.%I for select to anon, authenticated using (published = true or public.has_role(auth.uid(), ''admin''))', t);
    execute format('create policy "Admins insert" on public.%I for insert to authenticated with check (public.has_role(auth.uid(), ''admin''))', t);
    execute format('create policy "Admins update" on public.%I for update to authenticated using (public.has_role(auth.uid(), ''admin'')) with check (public.has_role(auth.uid(), ''admin''))', t);
    execute format('create policy "Admins delete" on public.%I for delete to authenticated using (public.has_role(auth.uid(), ''admin''))', t);
    execute format('create trigger touch_%I before update on public.%I for each row execute function public.touch_updated_at()', t, t);
  end loop;
end $$;

grant select on public.site_settings to anon;
grant select, insert, update on public.site_settings to authenticated;
grant all on public.site_settings to service_role;
alter table public.site_settings enable row level security;
create policy "Anyone reads settings" on public.site_settings for select to anon, authenticated using (true);
create policy "Admins insert settings" on public.site_settings for insert to authenticated with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins update settings" on public.site_settings for update to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));
create trigger touch_site_settings before update on public.site_settings for each row execute function public.touch_updated_at();

-- ===== Submissions =====
create table public.contact_inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 120),
  email text not null check (char_length(email) between 3 and 255),
  phone text check (phone is null or char_length(phone) <= 40),
  country text check (country is null or char_length(country) <= 80),
  company text check (company is null or char_length(company) <= 120),
  service text check (service is null or char_length(service) <= 80),
  budget text check (budget is null or char_length(budget) <= 80),
  message text not null check (char_length(message) between 1 and 3000),
  status text not null default 'new',
  created_at timestamptz not null default now()
);

create table public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique check (char_length(email) between 3 and 255),
  source text check (source is null or char_length(source) <= 60),
  created_at timestamptz not null default now()
);

create table public.job_applications (
  id uuid primary key default gen_random_uuid(),
  job_id uuid references public.job_openings(id) on delete set null,
  position text not null check (char_length(position) between 1 and 120),
  name text not null check (char_length(name) between 1 and 120),
  email text not null check (char_length(email) between 3 and 255),
  phone text check (phone is null or char_length(phone) <= 40),
  portfolio_url text check (portfolio_url is null or char_length(portfolio_url) <= 500),
  cover_letter text not null check (char_length(cover_letter) between 1 and 4000),
  status text not null default 'new',
  created_at timestamptz not null default now()
);

do $$
declare t text;
begin
  foreach t in array array['contact_inquiries','newsletter_subscribers','job_applications'] loop
    execute format('grant insert on public.%I to anon', t);
    execute format('grant select, insert, update, delete on public.%I to authenticated', t);
    execute format('grant all on public.%I to service_role', t);
    execute format('alter table public.%I enable row level security', t);
    execute format('create policy "Anyone can submit" on public.%I for insert to anon, authenticated with check (true)', t);
    execute format('create policy "Admins read" on public.%I for select to authenticated using (public.has_role(auth.uid(), ''admin''))', t);
    execute format('create policy "Admins update" on public.%I for update to authenticated using (public.has_role(auth.uid(), ''admin'')) with check (public.has_role(auth.uid(), ''admin''))', t);
    execute format('create policy "Admins delete" on public.%I for delete to authenticated using (public.has_role(auth.uid(), ''admin''))', t);
  end loop;
end $$;

-- ===== Seed content =====
insert into public.site_settings (id, contact_email, phone, location, seo_title, seo_description)
values (1, 'dummy@gmail.com', '+92 300 0000000', 'Pakistan · Serving clients worldwide',
  'MSM Marketing Agency — Ideas Into Impact. Businesses Into Brands.',
  'Women-led creative and business growth agency for marketing, design, SEO, business consulting and health advocacy.');

insert into public.services (slug, number, category, title, description, sub_items, image_url, sort_order) values
('marketing','01','Marketing Service','Marketing','Digital marketing, social media management, paid advertising, content strategy and campaign management that keep your brand visible and growing.', array['Social Media Management','Paid Advertising','Content Strategy','Campaign Management'], '/__l5e/assets-v1/565d013c-f2c5-4a9b-a92a-2a9338ab5dc4/service-marketing.jpg', 1),
('creative-design','02','Design Service','Creative Design','Brand identity, graphic design, creative campaigns and marketing collateral crafted to make every touchpoint feel unmistakably yours.', array['Brand Identity','Graphic Design','Creative Campaigns','Marketing Collateral'], '/__l5e/assets-v1/f9bd5908-68f2-49cb-a012-3c45a3d6b390/service-design.jpg', 2),
('seo','03','Growth Service','SEO','Technical SEO, keyword research, on-page optimization and organic growth strategies that help the right people find you.', array['Technical SEO','Keyword Research','On-Page Optimization','Organic Growth'], '/__l5e/assets-v1/c7c3f543-4f85-4806-a563-4ce08079612b/service-seo.jpg', 3),
('business-consulting','04','Strategy Service','Business Consulting','Business strategy, brand positioning and growth planning to give your next chapter a clear direction.', array['Business Strategy','Brand Positioning','Growth Planning','Market Research'], '/__l5e/assets-v1/8383c73d-77c1-4fc6-9d5d-737bcdd5ab43/service-consulting.jpg', 4),
('health-advocacy','05','Impact Service','Health Advocacy','Health awareness, educational communication and advocacy campaigns that inform communities and inspire positive change.', array['Health Awareness','Educational Communication','Advocacy Campaigns','Community Outreach'], '/__l5e/assets-v1/81b3b65e-66a9-49ae-a9c9-667a7fb1a592/service-health.jpg', 5);

insert into public.projects (slug, title, client, category, services, summary, cover_url, year, objective, challenge, approach, deliverables, gallery, results, is_demo, sort_order) values
('lumera-skincare-identity','Lumera Skincare Identity','Demo Client — Skincare Brand','Creative Design', array['Brand Identity','Packaging'],
 'Sample case study: a complete visual identity for a skincare label, including logo, typography, colour palette and packaging direction.',
 '/__l5e/assets-v1/3c281d98-8155-439c-b33f-7d725d215d97/work-1.jpg','2026',
 'Create a calm, premium identity that feels clinical yet warm.',
 'The category is crowded with similar-looking brands, so the identity needed a distinct visual voice.',
 'We built a restrained system around deep blue accents, soft neutrals and generous white space.',
 array['Logo & wordmark','Colour & type system','Packaging direction','Brand guidelines'],
 array['/__l5e/assets-v1/f9bd5908-68f2-49cb-a012-3c45a3d6b390/service-design.jpg','/__l5e/assets-v1/53aa6bf4-b500-446a-a840-728504a92a6e/blog-2.jpg'],
 null, true, 1),
('bluewave-social-campaign','Bluewave Social Campaign','Demo Client — Lifestyle Brand','Marketing', array['Social Media','Paid Ads'],
 'Sample case study: a multi-channel social campaign with paid social, content calendars and weekly creative refreshes.',
 '/__l5e/assets-v1/6f2ef069-a0d6-4ced-85a8-772605750531/work-2.jpg','2026',
 'Grow awareness and engagement across Instagram and Facebook.',
 'Content felt inconsistent and posting had no clear rhythm.',
 'We introduced content pillars, a monthly calendar and test-and-learn paid campaigns.',
 array['Content pillars','Monthly content calendar','Paid social campaigns','Performance reports'],
 array['/__l5e/assets-v1/565d013c-f2c5-4a9b-a92a-2a9338ab5dc4/service-marketing.jpg','/__l5e/assets-v1/a01161e5-7e24-4a45-bf34-2bfb80a1d750/blog-3.jpg'],
 null, true, 2),
('northline-seo-growth','Northline SEO Growth','Demo Client — Service Business','SEO', array['Technical SEO','Content'],
 'Sample case study: a technical SEO clean-up and content plan to build steady organic visibility.',
 '/__l5e/assets-v1/921c7f58-5775-46f8-85f1-636d78bf1c28/work-3.jpg','2026',
 'Improve search visibility for high-intent service keywords.',
 'The website had slow pages, thin content and no keyword strategy.',
 'We fixed technical issues, mapped keywords to pages and created a content roadmap.',
 array['Technical audit','Keyword map','On-page optimization','Content roadmap'],
 array['/__l5e/assets-v1/c7c3f543-4f85-4806-a563-4ce08079612b/service-seo.jpg'],
 null, true, 3),
('care-matters-awareness','Care Matters Awareness','Demo Client — Health Initiative','Health Advocacy', array['Advocacy','Campaign Design'],
 'Sample case study: a public health awareness campaign across outdoor, social and community channels.',
 '/__l5e/assets-v1/4e0ec8c9-deb0-483a-9b0e-54b1474a69c7/work-4.jpg','2026',
 'Raise awareness about preventive health check-ups.',
 'The message needed to be clear, culturally sensitive and accessible to every age group.',
 'We created simple, caring visuals and plain-language messaging for community outreach.',
 array['Campaign concept','Outdoor posters','Social content','Community toolkit'],
 array['/__l5e/assets-v1/81b3b65e-66a9-49ae-a9c9-667a7fb1a592/service-health.jpg'],
 null, true, 4);

insert into public.blog_posts (slug, title, category, excerpt, cover_url, published_at, read_minutes, featured, content) values
('why-strategy-comes-before-marketing','Why Strategy Comes Before Marketing','Marketing Strategy','Great campaigns start long before the first post. Here is why a clear strategy is the foundation of real growth.','/__l5e/assets-v1/52158326-6327-45a4-bd08-a472dfbeb4db/blog-1.jpg','2026-11-02',5,true,
$$Many brands jump straight into posting, boosting and advertising. It feels productive — but without a clear strategy, effort rarely turns into growth.

## Start with the goal
Before choosing channels, define what success looks like. Is it awareness, enquiries, sales or loyalty? Each goal calls for a different approach.

## Know who you are talking to
A strategy maps your audience: what they care about, where they spend time and what makes them trust a brand.

## Choose fewer, better channels
It is better to be excellent in two places than average in six. Strategy helps you focus your budget and energy.

## Measure, learn, improve
A plan is a starting point. Review results regularly and refine what works. That is how marketing becomes impact.$$),
('design-that-builds-trust','Design That Builds Trust','Brand Strategy','Good design is more than looking beautiful. It shapes how people feel about your business in seconds.','/__l5e/assets-v1/53aa6bf4-b500-446a-a840-728504a92a6e/blog-2.jpg','2026-10-18',4,false,
$$People judge a brand within seconds. Consistent, thoughtful design is one of the fastest ways to earn their trust.

## Consistency is credibility
When your colours, type and tone stay the same everywhere, your brand feels reliable.

## Clarity over decoration
Every design choice should help people understand what you offer and why it matters.

## Design for your audience
A brand for young professionals in Karachi will look different from one for families in Toronto. Great design respects context.$$),
('seo-basics-for-growing-brands','SEO Basics for Growing Brands','SEO','You do not need a huge budget to be found online. These SEO fundamentals help small brands grow organically.','/__l5e/assets-v1/a01161e5-7e24-4a45-bf34-2bfb80a1d750/blog-3.jpg','2026-10-04',6,false,
$$Search engine optimization can feel technical, but the fundamentals are simple and powerful.

## Fix the foundations
Fast pages, mobile-friendly layouts and clear page titles make a big difference.

## Answer real questions
Write content that answers what your customers are actually searching for.

## Be patient and consistent
SEO is a long-term investment. Steady improvements compound over time.$$);

insert into public.pricing_plans (name, tagline, monthly_price, yearly_price, currency, features, popular, is_placeholder, sort_order) values
('Starter','Essential Brand Presence', null, null, 'PKR', array['Brand presence audit','Social media setup & optimization','Monthly content plan','Basic graphic design support','Monthly performance summary'], false, true, 1),
('Growth','Strategic Brand Growth', null, null, 'PKR', array['Everything in Starter','Full social media management','Paid advertising management','On-page SEO optimization','Creative campaign design','Bi-weekly strategy calls'], true, true, 2),
('Complete','Full-Service Growth Partnership', null, null, 'PKR', array['Everything in Growth','Brand strategy & positioning','Technical SEO & content roadmap','Business growth consulting','Health advocacy campaigns (if relevant)','Dedicated account lead'], false, true, 3);

insert into public.faqs (category, question, answer, sort_order) values
('General','What services does MSM Marketing Agency offer?','We offer marketing, creative design, SEO, business consulting and health advocacy — individually or as one connected growth plan.',1),
('General','Does MSM work with international clients?','Yes. We work with businesses in Pakistan and international markets, and collaborate remotely across time zones.',2),
('General','What makes MSM different?','We are a women-led team that brings strategy, creativity and business thinking together, so every project is built around your real goals.',3),
('Services','Can we combine multiple services?','Absolutely. Many clients combine marketing, design and SEO so everything works together under one strategy.',4),
('Services','Do you offer health advocacy for organisations?','Yes. We create health awareness, educational communication and advocacy campaigns for organisations and initiatives.',5),
('Services','Can you work with our in-house team?','Yes. We can lead the work or collaborate closely with your existing team.',6),
('Pricing','Do you offer customized packages?','Yes. Our packages are a starting point — we tailor scope and pricing to your goals and budget.',7),
('Pricing','How are payments handled?','Payment terms are agreed in your proposal. Monthly retainers and project-based pricing are both available.',8),
('Pricing','Is there a long-term contract?','Not necessarily. We offer flexible terms and will recommend what makes sense for your project.',9),
('Process','How do we start a project?','Send us a message through the contact page. We will set up a discovery call to understand your goals and share a proposal.',10),
('Process','How long does a marketing project take?','It depends on scope. Brand identity projects often take a few weeks, while marketing and SEO are ongoing partnerships.',11),
('Process','How do you report progress?','You receive regular updates and clear reports, plus check-in calls to review results and next steps.',12);

insert into public.team_members (name, role, bio, is_founder, sort_order) values
('Founder name to be added','Co-Founder & Creative Director','Founder profile placeholder — add the real name, photo and story from the admin area.', true, 1),
('Founder name to be added','Co-Founder & Strategy Lead','Founder profile placeholder — add the real name, photo and story from the admin area.', true, 2);
