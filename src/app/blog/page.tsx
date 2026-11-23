'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { postsQuery } from '@/lib/queries';
import { PageHero } from '@/components/site/page-hero';
import { PostCard, PostCardWide } from '@/components/sections/post-card';
import { NewsletterForm } from '@/components/site/newsletter-form';
import { FinalCta } from '@/components/sections/final-cta';
import { IMG } from '@/lib/images';
import { cn } from '@/lib/utils';

export default function BlogPage() {
  const { data: posts = [] } = useQuery(postsQuery);
  const [category, setCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(posts.map((p) => p.category)))];
  const featured = posts[0];
  const rest = posts
    .filter((p) => p.id !== featured?.id)
    .filter((p) => category === 'All' || p.category === category);

  return (
    <>
      <PageHero
        eyebrow="MSM Insights"
        title={['Insights that', 'inspire growth.']}
        text="Perspectives on marketing, creative design, SEO, business strategy and health advocacy."
        image={IMG.blog1}
      />

      {featured && (
        <section className="container-x mt-16">
          <PostCardWide post={featured} />
        </section>
      )}

      <section className="container-x py-20">
        <div className="mb-10 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={cn(
                'rounded-full px-5 py-2.5 text-sm font-medium transition-colors',
                category === cat
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-muted-foreground hover:text-foreground',
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      <section className="container-x pb-20">
        <div className="mx-auto max-w-2xl rounded-[2rem] bg-surface p-8 text-center shadow-soft">
          <h2 className="font-display text-2xl font-semibold">Stay in the loop</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Get MSM insights delivered straight to your inbox.
          </p>
          <div className="mx-auto mt-6 max-w-md">
            <NewsletterForm source="blog" />
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
