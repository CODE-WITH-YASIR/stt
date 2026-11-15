import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { siteConfig } from "@/config/site";
import {
  ChevronRight,
  Calendar,
  Clock,
  User,
  ArrowLeft,
} from "lucide-react";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const posts = db.getBlogPosts();
  return posts.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = db.getBlogPostBySlug(params.slug);
  if (!post) return { title: "Article Not Found" };

  return {
    title: `${post.title} | ${siteConfig.name} Insights`,
    description: post.excerpt,
  };
}

export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = db.getBlogPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <div className="pt-28 pb-24 bg-white min-h-screen text-[#300C41]">
      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-4 sm:px-8 mb-8">
        <nav className="flex items-center gap-2 text-xs text-[#300C41]/60 font-medium">
          <Link href="/" className="hover:text-[#300C41] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#300C41]/40" />
          <Link href="/blog" className="hover:text-[#300C41] transition-colors">
            Blog
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#300C41]/40" />
          <span className="text-[#300C41] truncate max-w-xs font-bold">{post.title}</span>
        </nav>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-8 space-y-10">
        {/* Post Header */}
        <div className="space-y-4 border-b border-[#300C41]/10 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-[#DEE948] text-[#300C41] font-bold">
            {post.category}
          </div>

          <h1 className="font-sans font-extrabold text-3xl sm:text-5xl text-[#300C41] tracking-tight leading-[1.15]">
            {post.title}
          </h1>

          <p className="font-sans text-base sm:text-lg text-[#300C41]/75 leading-relaxed font-normal">
            {post.excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-[#300C41]/60 pt-2 font-mono">
            <span className="flex items-center gap-1.5 font-bold text-[#300C41]">
              <User className="w-3.5 h-3.5 text-[#300C41]" /> {post.author}
            </span>
            <span>&bull;</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#300C41]/50" /> {post.publishedAt}
            </span>
            <span>&bull;</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#300C41]" /> {post.readTime}
            </span>
          </div>
        </div>

        {/* Post Content */}
        <div className="max-w-none text-sm sm:text-base text-[#300C41]/85 leading-relaxed space-y-6 bg-white p-6 sm:p-10 rounded-2xl border border-[#300C41]/10 shadow-violet">
          {post.content.split("\n\n").map((paragraph, idx) => {
            if (paragraph.startsWith("### ")) {
              return (
                <h3 key={idx} className="font-sans text-xl font-bold text-[#300C41] pt-4">
                  {paragraph.replace("### ", "")}
                </h3>
              );
            }
            if (paragraph.startsWith("- ")) {
              const items = paragraph.split("\n");
              return (
                <ul key={idx} className="space-y-2 list-disc pl-5 text-[#300C41]/80">
                  {items.map((it, iIdx) => (
                    <li key={iIdx}>{it.replace("- ", "")}</li>
                  ))}
                </ul>
              );
            }
            return <p key={idx}>{paragraph}</p>;
          })}
        </div>

        {/* Footer / Back link */}
        <div className="pt-8 border-t border-[#300C41]/10 flex items-center justify-between">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#300C41] hover:underline"
          >
            <ArrowLeft className="w-4 h-4 text-[#300C41]" />
            <span>Back to All Articles</span>
          </Link>

          <Link
            href="/enquire"
            className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#300C41] hover:bg-[#230830] hover:text-[#DEE948] rounded-xl shadow-violet transition-colors"
          >
            Discuss a Project
          </Link>
        </div>
      </article>
    </div>
  );
}
