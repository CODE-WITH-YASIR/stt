import React from "react";
import Link from "next/link";
import { db } from "@/lib/db";
import { Clock, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Engineering Insights & Blog",
  description:
    "Articles, architectural deep dives, and tutorials on AI models, RAG pipelines, mobile architectures, and academic engineering.",
};

export default function BlogPage() {
  const posts = db.getBlogPosts();

  return (
    <div className="pt-28 pb-24 bg-white min-h-screen text-[#300C41]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#300C41]/5 border border-[#300C41]/10 px-3 py-1 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#DEE948]" />
            <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#300C41]">
              RESEARCH & ENGINEERING INSIGHTS
            </p>
          </div>

          <h1 className="font-sans font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#300C41] tracking-tight leading-[1.15]">
            Technical Articles & <span className="underline decoration-[#DEE948] decoration-4 underline-offset-8">Architectural Guides</span>
          </h1>

          <p className="font-sans text-base sm:text-lg text-[#300C41]/75 leading-relaxed">
            Written by our practicing engineers and academic researchers. Deep
            dives into production AI pipelines, distributed web systems, and
            IEEE-standard capstone execution.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl p-7 border border-[#300C41]/10 shadow-violet hover:border-[#300C41] flex flex-col justify-between group transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#300C41] font-bold uppercase bg-[#DEE948] px-2 py-0.5 rounded text-[11px]">{post.category}</span>
                  <span className="flex items-center gap-1 text-[#300C41]/60">
                    <Clock className="w-3 h-3 text-[#300C41]" /> {post.readTime}
                  </span>
                </div>

                <h2 className="font-sans text-lg font-bold text-[#300C41] leading-snug">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>

                <p className="font-sans text-xs sm:text-sm text-[#300C41]/75 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-6 border-t border-[#300C41]/10 mt-6 flex items-center justify-between">
                <span className="text-xs text-[#300C41]/60">
                  {post.author} &bull; {post.publishedAt}
                </span>

                <Link
                  href={`/blog/${post.slug}`}
                  className="text-xs font-bold text-[#300C41] hover:underline flex items-center gap-1 transition-colors"
                >
                  <span>Read</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#300C41]" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
