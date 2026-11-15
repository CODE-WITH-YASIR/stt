"use client";

import React, { useState } from "react";
import Link from "next/link";
import { projectsData, ProjectItem } from "@/config/projects";
import {
  ArrowRight,
  Eye,
  X,
} from "lucide-react";

export default function FeaturedProjects() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [previewProject, setPreviewProject] = useState<ProjectItem | null>(null);

  const categories = [
    "All",
    "AI & ML",
    "Chatbots",
    "Web Apps",
    "Mobile Apps",
    "Data & Analytics",
    "Academic",
  ];

  const filteredProjects =
    selectedCategory === "All"
      ? projectsData
      : projectsData.filter((p) => p.category === selectedCategory);

  return (
    <section className="py-20 bg-white border-b border-[#300C41]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#300C41]/5 border border-[#300C41]/10 px-3 py-1 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#DEE948]" />
              <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#300C41]">
                PROVEN EXECUTION
              </p>
            </div>
            <h2 className="font-sans font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#300C41] tracking-tight leading-[1.15]">
              Featured <span className="underline decoration-[#DEE948] decoration-4 underline-offset-8">Projects & Demos</span>
            </h2>
            <p className="font-sans text-base text-[#300C41]/75 max-w-xl mt-3 leading-relaxed">
              Engineered with clean code, modern architectures, and verifiable
              benchmarks. Explore our completed projects.
            </p>
          </div>

          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:text-[#DEE948] bg-[#300C41] hover:bg-[#230830] rounded-xl transition-all shadow-violet self-start md:self-auto"
          >
            <span>View Full Portfolio</span>
            <ArrowRight className="w-4 h-4 text-[#DEE948]" />
          </Link>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#300C41] text-[#DEE948] shadow-xs"
                  : "bg-white text-[#300C41] hover:bg-[#300C41]/5 border border-[#300C41]/15"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-2xl border border-[#300C41]/10 hover:border-[#300C41] hover:shadow-violet hover:-translate-y-1 transition-all duration-200 p-6 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Badge & Category */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded bg-[#DEE948] text-[#300C41] uppercase tracking-wider">
                    {project.badge}
                  </span>
                  <span className="text-xs text-[#300C41]/60 font-mono">
                    {project.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-sans font-bold text-lg text-[#300C41]">
                  {project.title}
                </h3>

                {/* Summary */}
                <p className="font-sans text-xs sm:text-sm text-[#300C41]/70 leading-relaxed">
                  {project.summary}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.technologies.slice(0, 4).map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 text-[10px] font-mono rounded bg-[#300C41]/5 border border-[#300C41]/10 text-[#300C41]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Key Outcomes */}
                <div className="pt-3 border-t border-[#300C41]/10 space-y-1.5">
                  {project.results.slice(0, 2).map((res: string, i: number) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-xs text-[#300C41]/75"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#DEE948] shrink-0" />
                      <span className="truncate">{res}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-5 border-t border-[#300C41]/10 flex items-center justify-between gap-3 mt-6">
                <Link
                  href={`/portfolio/${project.slug}`}
                  className="font-sans text-xs sm:text-sm font-bold tracking-normal text-[#300C41] hover:underline flex items-center gap-1.5 transition-colors"
                >
                  <span>Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#300C41]" />
                </Link>

                {project.demoUrl && (
                  <button
                    onClick={() => setPreviewProject(project)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-[#300C41] bg-[#DEE948] hover:bg-[#300C41] hover:text-[#DEE948] rounded-lg transition-colors cursor-pointer shadow-2xs"
                  >
                    <Eye className="w-3 h-3" />
                    <span>Live Demo</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Live Demo Modal */}
      {previewProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#300C41]/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-2xl w-full border border-[#300C41]/20 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#300C41]/10">
              <div>
                <span className="text-xs font-mono text-[#300C41] font-bold">
                  {previewProject.category}
                </span>
                <h4 className="text-lg font-bold text-[#300C41]">
                  {previewProject.title}
                </h4>
              </div>
              <button
                onClick={() => setPreviewProject(null)}
                className="p-1 rounded-lg text-[#300C41]/60 hover:text-[#300C41] hover:bg-[#300C41]/5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-[#300C41]/75 leading-relaxed">
              {previewProject.description}
            </p>

            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-[#300C41]/60 uppercase tracking-wider">
                Full Technology Stack:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {previewProject.technologies.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 text-xs font-mono rounded-lg bg-[#300C41]/5 text-[#300C41] border border-[#300C41]/10"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#300C41]/10 flex items-center justify-between gap-4">
              <Link
                href={`/portfolio/${previewProject.slug}`}
                className="text-xs font-bold text-[#300C41] hover:underline"
              >
                Read Comprehensive Architecture Documentation →
              </Link>
              <button
                onClick={() => setPreviewProject(null)}
                className="px-4 py-2 text-xs font-bold rounded-lg bg-[#300C41] text-white hover:text-[#DEE948] hover:bg-[#230830] transition-colors"
              >
                Close Demo
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
