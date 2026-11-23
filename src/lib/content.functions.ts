import { createClient } from "@supabase/supabase-js";
import type { Database, Tables } from "@/integrations/supabase/types";

function publicDb() {
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.SUPABASE_URL ||
    "https://c--7f04dc18-09c9-4875-a30e-016a1fe387f3-prod.lovable.cloud";
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.SUPABASE_PUBLISHABLE_KEY ||
    "sb_publishable_jD96pWELHKCfdmXOPdbQvQ_sJH7saPd";

  return createClient<Database>(url, key, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const headers = new Headers(init?.headers);
        if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) {
          headers.delete("Authorization");
        }
        headers.set("apikey", key);
        return fetch(input, { ...init, headers });
      },
    },
  });
}

function unwrap<T>(res: { data: T | null; error: { message: string } | null }, fallback: T): T {
  if (res.error || !res.data) return fallback;
  return res.data;
}

export async function getServices() {
  return unwrap(
    await publicDb().from("services").select("*").eq("published", true).order("sort_order"),
    [] as Tables<"services">[],
  );
}

export async function getProjects() {
  return unwrap(
    await publicDb().from("projects").select("*").eq("published", true).order("sort_order"),
    [] as Tables<"projects">[],
  );
}

export async function getProject(slug: string): Promise<Tables<"projects"> | null> {
  const res = await publicDb().from("projects").select("*").eq("slug", slug).eq("published", true).maybeSingle();
  if (res.error) return null;
  return res.data;
}

export async function getPosts() {
  return unwrap(
    await publicDb().from("blog_posts").select("*").eq("published", true).order("published_at", { ascending: false }),
    [] as Tables<"blog_posts">[],
  );
}

export async function getPost(slug: string): Promise<Tables<"blog_posts"> | null> {
  const res = await publicDb().from("blog_posts").select("*").eq("slug", slug).eq("published", true).maybeSingle();
  if (res.error) return null;
  return res.data;
}

export async function getPricing() {
  return unwrap(
    await publicDb().from("pricing_plans").select("*").eq("published", true).order("sort_order"),
    [] as Tables<"pricing_plans">[],
  );
}

export async function getFaqs() {
  return unwrap(
    await publicDb().from("faqs").select("*").eq("published", true).order("sort_order"),
    [] as Tables<"faqs">[],
  );
}

export async function getTestimonials() {
  return unwrap(
    await publicDb().from("testimonials").select("*").eq("published", true).order("sort_order"),
    [] as Tables<"testimonials">[],
  );
}

export async function getJobs() {
  return unwrap(
    await publicDb().from("job_openings").select("*").eq("published", true).order("sort_order"),
    [] as Tables<"job_openings">[],
  );
}

export async function getTeam() {
  return unwrap(
    await publicDb().from("team_members").select("*").eq("published", true).order("sort_order"),
    [] as Tables<"team_members">[],
  );
}

export async function getClientLogos() {
  return unwrap(
    await publicDb().from("client_logos").select("*").eq("published", true).order("sort_order"),
    [] as Tables<"client_logos">[],
  );
}

export async function getSettings(): Promise<Tables<"site_settings"> | null> {
  const { data, error } = await publicDb().from("site_settings").select("*").eq("id", 1).maybeSingle();
  if (error) return null;
  return data;
}
