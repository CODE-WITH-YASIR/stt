"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import {
  Lightbulb,
  ShieldCheck,
  CheckCircle2,
  Users,
  Target,
  ArrowRight,
} from "lucide-react";

export default function CompanyIntro() {
  const pillars = [
    {
      icon: <Lightbulb className="w-5 h-5" />,
      title: "Pioneering AI & Digital Innovation",
      description:
        "We design custom AI models, modern web applications, and intelligent systems engineered for long-term scalability and stability.",
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Partnering Across Every Stage",
      description:
        "From students seeking academic project mentoring to high-growth startups and established organizations modernizing digital operations.",
    },
    {
      icon: <ShieldCheck className="w-5 h-5" />,
      title: "100% IP & Source Code Handover",
      description:
        "Every line of source code, model weight, and architectural asset belongs completely to you with zero proprietary vendor lock-in.",
    },
    {
      icon: <Target className="w-5 h-5" />,
      title: "Production-Grade Engineering",
      description:
        "We adhere to strict CI/CD pipelines, clean code standards, comprehensive documentation, and guaranteed post-launch stability.",
    },
  ];

  return (
    <section className="border-b border-[#300C41]/10 bg-white py-16 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Mission & Core Outcomes */}
          <div className="lg:col-span-5 flex flex-col items-start space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#300C41]/5 border border-[#300C41]/10 px-3 py-1">
              <span className="w-2 h-2 rounded-full bg-[#DEE948]" />
              <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#300C41]">
                ABOUT {siteConfig.name.toUpperCase()}
              </span>
            </div>

            <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-[#300C41] tracking-tight leading-[1.15]">
              Ideas shaped into <br />
              <span className="relative inline-block mt-1">
                <span className="relative z-10 text-[#300C41]">practical digital solutions.</span>
                <span className="absolute bottom-1 left-0 right-0 h-2.5 bg-[#DEE948]/60 -z-0 rounded-xs" />
              </span>
            </h2>

            <p className="font-sans text-base text-[#300C41]/75 leading-relaxed">
              We turn ideas into practical digital solutions through thoughtful
              design, modern technology, and business-focused development.
            </p>

            {/* 3 Outcome Badges */}
            <div className="flex flex-wrap gap-2.5 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#DEE948] text-[#300C41] font-sans text-xs font-bold shadow-2xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#300C41]" />
                Clear direction
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#300C41]/5 border border-[#300C41]/15 text-[#300C41] font-sans text-xs font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#300C41]" />
                Modern technology
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#300C41]/5 border border-[#300C41]/15 text-[#300C41] font-sans text-xs font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#300C41]" />
                Useful outcomes
              </span>
            </div>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#300C41] hover:bg-[#230830] px-5 py-3 font-sans text-xs sm:text-sm font-bold text-white hover:text-[#DEE948] shadow-xs hover:shadow-violet transition-colors group"
              >
                <span>Discover {siteConfig.name}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 text-[#DEE948]" />
              </Link>
            </div>
          </div>

          {/* Right Column: 4-Pillar Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map((p, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-[#300C41]/10 hover:border-[#300C41] hover:shadow-violet hover:-translate-y-1 transition-all duration-200 p-6 flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#300C41]/5 border border-[#300C41]/10 text-[#300C41] group-hover:bg-[#300C41] group-hover:text-[#DEE948] transition-all flex items-center justify-center shrink-0 mb-4 group-hover:scale-105">
                    {p.icon}
                  </div>
                  <h3 className="font-sans font-bold text-base text-[#300C41] transition-colors mb-2">
                    {p.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[#300C41]/70 leading-relaxed">
                    {p.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
