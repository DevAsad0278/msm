drop policy if exists "Anyone can submit" on public.contact_inquiries;
create policy "Visitors submit valid inquiries" on public.contact_inquiries
  for insert to anon, authenticated
  with check (
    status = 'new'
    and email ~* '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$'
    and char_length(btrim(name)) > 0
    and char_length(btrim(message)) > 0
  );

drop policy if exists "Anyone can submit" on public.newsletter_subscribers;
create policy "Visitors subscribe with valid email" on public.newsletter_subscribers
  for insert to anon, authenticated
  with check (
    email ~* '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$'
    and (source is null or source in ('footer', 'blog', 'blog-detail', 'coming-soon', 'home'))
  );

drop policy if exists "Anyone can submit" on public.job_applications;
create policy "Visitors submit valid applications" on public.job_applications
  for insert to anon, authenticated
  with check (
    status = 'new'
    and email ~* '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$'
    and char_length(btrim(name)) > 0
    and char_length(btrim(cover_letter)) > 0
    and (
      job_id is null
      or exists (select 1 from public.job_openings j where j.id = job_id and j.published = true)
    )
  );

grant select (id, published) on public.job_openings to anon;

drop policy if exists "Anyone reads settings" on public.site_settings;
create policy "Public reads site settings record" on public.site_settings
  for select to anon, authenticated
  using (id = 1);