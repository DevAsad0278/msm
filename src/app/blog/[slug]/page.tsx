'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { postQuery, postsQuery } from '@/lib/queries';
import { MaskImage, Reveal, SplitReveal } from '@/components/site/motion';
import { RichText } from '@/components/site/rich-text';
import { NewsletterForm } from '@/components/site/newsletter-form';
import { CategoryChip, PostCard } from '@/components/sections/post-card';
import { FinalCta } from '@/components/sections/final-cta';

export default function ArticlePage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug ?? '';
  const { data: post = null } = useQuery(postQuery(slug));
  const { data: all = [] } = useQuery(postsQuery);

  if (!post) return null;
  const related = all.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <>
      <article>
        <header className="container-x pt-32 md:pt-40">
          <div className="mx-auto max-w-3xl">
            <CategoryChip>{post.category}</CategoryChip>
            <h1 className="display-md mt-6">
              <SplitReveal immediate lines={[post.title]} />
            </h1>
            <p className="mt-6 text-sm text-muted-foreground">
              By {post.author} · {format(new Date(post.published_at), 'MMMM d, yyyy')} ·{' '}
              {post.read_minutes} min read
            </p>
          </div>
        </header>
        {post.cover_url && (
          <div className="container-x mt-12">
            <MaskImage
              src={post.cover_url}
              alt={post.title}
              className="mx-auto aspect-[16/9] max-w-5xl rounded-[2rem]"
              imgClassName="object-[50%_30%]"
            />
          </div>
        )}
        <Reveal className="container-x py-16">
          <div className="mx-auto max-w-3xl">
            <p className="mb-8 text-xl leading-relaxed">{post.excerpt}</p>
            <RichText content={post.content} />
          </div>
        </Reveal>
      </article>

      {related.length > 0 && (
        <section className="container-x pb-20">
          <h2 className="display-md">Related articles</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
        </section>
      )}

      <section className="container-x pb-24">
        <div className="mx-auto max-w-2xl rounded-[2rem] bg-surface p-8 text-center shadow-soft">
          <h2 className="font-display text-2xl font-semibold">Enjoyed this article?</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Get more MSM insights delivered to your inbox.
          </p>
          <div className="mx-auto mt-6 max-w-md">
            <NewsletterForm source="blog-detail" />
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
