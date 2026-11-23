'use client';

import Link from "next/link";
import type { Tables } from "@/integrations/supabase/types";
import { cn } from "@/lib/utils";

export function CategoryChip({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full bg-[#F7F6F3] px-3.5 py-1.5 text-xs font-medium text-[#101116]",
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-[#153E9F]" />
      {children}
    </span>
  );
}

export function PostCardWide({ post }: { post: Tables<"blog_posts"> }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group grid gap-6 rounded-[2rem] border border-black/5 bg-white p-4 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-card md:grid-cols-[1.08fr_1fr] md:p-5"
    >
      <div className="aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-muted md:aspect-auto md:min-h-[380px]">
        {post.cover_url && (
          <img
            src={post.cover_url}
            alt={post.title}
            loading="lazy"
            className="size-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
          />
        )}
      </div>
      <div className="flex flex-col justify-between gap-6 p-3 md:p-6">
        <div>
          <CategoryChip>{post.category}</CategoryChip>
          <h3 className="mt-5 font-display text-2xl font-bold leading-tight tracking-tight text-[#101116] transition-colors group-hover:text-[#153E9F] md:text-3xl">
            {post.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-[#777D89] md:text-base">
            {post.excerpt}
          </p>
        </div>

        <span className="inline-flex w-full items-center justify-center rounded-full border border-[#101116]/25 bg-white px-6 py-3.5 text-sm font-semibold text-[#101116] transition-colors group-hover:border-[#153E9F] group-hover:bg-[#153E9F] group-hover:text-white">
          View Blog
        </span>
      </div>
    </Link>
  );
}

export function PostCard({ post }: { post: Tables<"blog_posts"> }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col rounded-[2rem] border border-black/5 bg-white p-4 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-card md:p-5"
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-[1.5rem] bg-muted">
        {post.cover_url && (
          <img
            src={post.cover_url}
            alt={post.title}
            loading="lazy"
            className="size-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
          />
        )}
        <CategoryChip className="absolute bottom-3.5 left-3.5 bg-white/95 shadow-sm backdrop-blur-sm">
          {post.category}
        </CategoryChip>
      </div>
      <div className="px-2 pb-2 pt-5">
        <h3 className="font-display text-xl font-bold leading-snug tracking-tight text-[#101116] transition-colors group-hover:text-[#153E9F] md:text-2xl">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#777D89]">
          {post.excerpt}
        </p>
      </div>
    </Link>
  );
}
