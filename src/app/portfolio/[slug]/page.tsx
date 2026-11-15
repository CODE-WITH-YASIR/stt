import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projectsData } from "@/config/projects";
import { siteConfig } from "@/config/site";
import {
  ChevronRight,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return projectsData.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const project = projectsData.find((p) => p.slug === params.slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} - Case Study | ${siteConfig.name}`,
    description: project.summary,
  };
}

export default function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = projectsData.find((p) => p.slug === params.slug);
  if (!project) notFound();

  return (
    <div className="pt-28 pb-24 bg-white min-h-screen text-[#300C41]">
      {/* Breadcrumb */}
      <div className="max-w-5xl mx-auto px-4 sm:px-8 mb-8">
        <nav className="flex items-center gap-2 text-xs text-[#300C41]/60 font-medium">
          <Link href="/" className="hover:text-[#300C41] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#300C41]/40" />
          <Link href="/portfolio" className="hover:text-[#300C41] transition-colors">
            Our Work
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#300C41]/40" />
          <span className="text-[#300C41] font-bold">{project.title}</span>
        </nav>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-[#DEE948] text-[#300C41] font-bold">
            <span>{project.category}</span>
            <span>&bull;</span>
            <span>{project.badge}</span>
          </div>

          <h1 className="font-sans font-extrabold text-3xl sm:text-5xl text-[#300C41] tracking-tight leading-[1.15]">
            {project.title}
          </h1>

          <p className="font-sans text-base sm:text-lg text-[#300C41]/75 leading-relaxed max-w-3xl">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {project.technologies.map((tech, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 text-xs font-mono rounded-lg bg-[#300C41]/5 border border-[#300C41]/10 text-[#300C41] shadow-2xs font-bold"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Outcomes & Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#300C41]/10 shadow-violet space-y-4">
            <h3 className="font-sans font-bold text-lg text-[#300C41]">
              Verified Deliverables & Benchmarks
            </h3>
            <div className="space-y-2.5">
              {project.results.map((out: string, idx: number) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#300C41]/85">
                  <CheckCircle2 className="w-4 h-4 text-[#300C41] shrink-0 mt-0.5" />
                  <span>{out}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#300C41]/10 shadow-violet space-y-4">
            <h3 className="font-sans font-bold text-lg text-[#300C41]">
              Project Parameters
            </h3>
            <div className="space-y-2 text-xs sm:text-sm text-[#300C41]/75">
              <div>
                <span className="font-bold text-[#300C41]">Category:</span> {project.category}
              </div>
              <div>
                <span className="font-bold text-[#300C41]">Badge:</span> {project.badge}
              </div>
              <div>
                <span className="font-bold text-[#300C41]">Code Transfer:</span> 100% Repository IP Handover
              </div>
            </div>
          </div>
        </div>

        {/* Action Row */}
        <div className="pt-6 border-t border-[#300C41]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/portfolio"
            className="text-xs font-bold text-[#300C41] hover:underline"
          >
            ← Back to All Case Studies
          </Link>

          <Link
            href="/enquire"
            className="inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-bold rounded-xl bg-[#300C41] hover:bg-[#230830] text-white hover:text-[#DEE948] shadow-violet transition-colors"
          >
            <span>Request a Solution Similar to This</span>
            <ArrowRight className="w-4 h-4 text-[#DEE948]" />
          </Link>
        </div>
      </div>
    </div>
  );
}
