"use client";

import React, { useState } from "react";
import Link from "next/link";
import { projectsData } from "@/config/projects";
import { ArrowRight } from "lucide-react";

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "AI & ML",
    "Chatbots",
    "Web Apps",
    "Mobile Apps",
    "Data & Analytics",
    "Academic",
  ];

  const filtered =
    selectedCategory === "All"
      ? projectsData
      : projectsData.filter((p) => p.category === selectedCategory);

  return (
    <div className="pt-28 pb-24 bg-white min-h-screen text-[#300C41]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#300C41]/5 border border-[#300C41]/10 px-3 py-1 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#DEE948]" />
            <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#300C41]">
              COMPLETED ENGAGEMENTS & DEMOS
            </p>
          </div>

          <h1 className="font-sans font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#300C41] tracking-tight leading-[1.15]">
            Proof of <span className="underline decoration-[#DEE948] decoration-4 underline-offset-8">Engineering Rigor</span>
          </h1>

          <p className="font-sans text-base sm:text-lg text-[#300C41]/75 leading-relaxed">
            Real implementations built with verifiable accuracy, sub-second
            response speeds, clean git architecture, and production stability.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
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
          {filtered.map((proj) => (
            <div
              key={proj.id}
              className="bg-white rounded-2xl p-7 border border-[#300C41]/10 shadow-violet hover:border-[#300C41] transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded bg-[#DEE948] text-[#300C41] uppercase tracking-wider">
                    {proj.badge}
                  </span>
                  <span className="text-xs font-mono text-[#300C41]/60">
                    {proj.category}
                  </span>
                </div>

                <h3 className="font-sans font-bold text-lg text-[#300C41]">
                  {proj.title}
                </h3>

                <p className="font-sans text-xs sm:text-sm text-[#300C41]/70 leading-relaxed">
                  {proj.summary}
                </p>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {proj.technologies.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 text-[10px] font-mono bg-[#300C41]/5 border border-[#300C41]/10 text-[#300C41] rounded"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Key results */}
                <div className="pt-3 border-t border-[#300C41]/10 space-y-1.5">
                  {proj.results.map((res: string, idx: number) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-xs text-[#300C41]/75"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#DEE948] shrink-0" />
                      <span className="truncate">{res}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6 border-t border-[#300C41]/10 mt-6 flex items-center justify-between">
                <Link
                  href={`/portfolio/${proj.slug}`}
                  className="font-sans text-xs sm:text-sm font-bold tracking-normal text-[#300C41] hover:underline flex items-center gap-1.5 transition-colors"
                >
                  <span>View Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#300C41]" />
                </Link>

                {proj.demoUrl && (
                  <span className="text-[10px] font-mono px-2 py-1 rounded bg-[#300C41]/5 text-[#300C41] font-bold">
                    Live Demo Ready
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
