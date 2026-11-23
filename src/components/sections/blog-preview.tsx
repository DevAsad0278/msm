'use client';

import type { Tables } from "@/integrations/supabase/types";
import { IMG } from "@/lib/images";
import { PillLink } from "@/components/site/pill-button";
import { Reveal, SplitReveal } from "@/components/site/motion";
import { PostCard, PostCardWide } from "./post-card";

const FALLBACK_POSTS: Tables<"blog_posts">[] = [
  {
    id: "blog-1",
    slug: "why-strategy-first-marketing-wins",
    title: "Why Strategy-First Marketing Outperforms Tactical Noise",
    category: "Marketing Strategy",
    excerpt:
      "How aligning business objectives, audience insight, and creative execution eliminates wasted spend and builds lasting brand equity.",
    content: "",
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
    content: "",
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
    content: "",
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

export function BlogPreview({ posts }: { posts: Tables<"blog_posts">[] }) {
  const source = posts.length > 0 ? posts : FALLBACK_POSTS;
  const [first, ...rest] = source;

  return (
    <section aria-label="Insights" className="bg-[#F7F6F3]/80 py-24 md:py-32">
      <div className="container-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 className="display-md max-w-xl text-[#101116]">
            <SplitReveal lines={["Insights That", "Inspire Growth."]} />
          </h2>
          <Reveal className="max-w-sm md:text-right">
            <p className="text-sm leading-relaxed text-[#777D89] md:text-base">
              Ideas, strategies and practical tips to help your brand grow smarter — in Pakistan and beyond.
            </p>
            <PillLink to="/blog" className="mt-5">
              See all Articles
            </PillLink>
          </Reveal>
        </div>

        {first && (
          <Reveal className="mt-12">
            <PostCardWide post={first} />
          </Reveal>
        )}

        {rest.length > 0 && (
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {rest.slice(0, 2).map((p, i) => (
              <Reveal key={p.id} delay={i * 0.1}>
                <PostCard post={p} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
