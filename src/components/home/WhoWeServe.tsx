"use client";

import React from "react";
import Link from "next/link";
import {
  GraduationCap,
  Briefcase,
  Rocket,
  Store,
  Building2,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

export default function WhoWeServe() {
  const audiences = [
    {
      title: "Students",
      icon: <GraduationCap className="w-5 h-5 text-[#300C41] group-hover:text-[#DEE948] transition-colors" />,
      tag: "Academic Mentoring",
      description:
        "Undergraduate and postgraduate engineering scholars seeking 1-on-1 capstone mentoring, IEEE-standard documentation, and viva defense preparation.",
      ctaText: "Explore Mentorship",
      href: "/services/final-year-project-solutions",
    },
    {
      title: "Job Seekers",
      icon: <Briefcase className="w-5 h-5 text-[#300C41] group-hover:text-[#DEE948] transition-colors" />,
      tag: "Career Portfolios",
      description:
        "Developers, AI researchers, and designers needing standout personal portfolio websites, interactive resumes, and recruiter-impressing GitHub showcases.",
      ctaText: "Build Portfolio",
      href: "/services/portfolio-development",
    },
    {
      title: "Startups",
      icon: <Rocket className="w-5 h-5 text-[#300C41] group-hover:text-[#DEE948] transition-colors" />,
      tag: "MVP & SaaS Launch",
      description:
        "Founders seeking an agile engineering partner to transform sketches into production-ready MVPs, investor demos, and scalable platforms fast.",
      ctaText: "Launch Your MVP",
      href: "/enquire",
    },
    {
      title: "Small Businesses",
      icon: <Store className="w-5 h-5 text-[#300C41] group-hover:text-[#DEE948] transition-colors" />,
      tag: "Digital Transformation",
      description:
        "Local and regional businesses looking to modernize operations with high-converting websites, WhatsApp automation bots, and local SEO dominance.",
      ctaText: "Automate Business",
      href: "/services/web-development",
    },
    {
      title: "Educational Institutions",
      icon: <Building2 className="w-5 h-5 text-[#300C41] group-hover:text-[#DEE948] transition-colors" />,
      tag: "Labs & Bootcamps",
      description:
        "Colleges, universities, and training institutes needing specialized faculty development workshops, AI curriculum labs, and student skill bootcamps.",
      ctaText: "Institutional Solutions",
      href: "/contact",
    },
    {
      title: "Growing Organizations",
      icon: <TrendingUp className="w-5 h-5 text-[#300C41] group-hover:text-[#DEE948] transition-colors" />,
      tag: "Enterprise Modernization",
      description:
        "Established enterprises needing automated Power BI intelligence control rooms, custom internal RAG bots, and legacy systems refactored to cloud.",
      ctaText: "Scale Operations",
      href: "/services/ai-machine-learning",
    },
  ];

  return (
    <section className="py-20 bg-white border-b border-[#300C41]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#300C41]/5 border border-[#300C41]/10 px-3 py-1 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#DEE948]" />
            <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#300C41]">
              TAILORED IMPACT
            </p>
          </div>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#300C41] tracking-tight leading-[1.15] mb-4">
            Who We <span className="underline decoration-[#DEE948] decoration-4 underline-offset-8">Serve & Support</span>
          </h2>
          <p className="font-sans font-normal text-base sm:text-lg text-[#300C41]/75 max-w-2xl mx-auto leading-relaxed">
            From university classrooms to fast-growing corporate boardrooms, we
            adapt our technical delivery models to your specific goals and
            stage.
          </p>
        </div>

        {/* 6 Audience Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {audiences.map((aud, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-[#300C41]/10 hover:border-[#300C41] hover:shadow-violet hover:-translate-y-1 transition-all duration-200 p-7 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#300C41]/5 border border-[#300C41]/10 flex items-center justify-center shrink-0 group-hover:bg-[#300C41] group-hover:scale-105 transition-all">
                    {aud.icon}
                  </div>
                  <span className="text-[11px] font-mono font-bold px-2.5 py-1 bg-[#DEE948] text-[#300C41] rounded uppercase tracking-wider">
                    {aud.tag}
                  </span>
                </div>

                <h3 className="font-sans font-bold text-lg text-[#300C41] transition-colors mb-2.5">
                  {aud.title}
                </h3>

                <p className="font-sans text-xs sm:text-sm text-[#300C41]/70 leading-relaxed mb-5">
                  {aud.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#300C41]/10 mt-auto">
                <Link
                  href={aud.href}
                  className="font-sans text-xs sm:text-sm font-bold tracking-normal text-[#300C41] hover:underline flex items-center gap-1.5 transition-colors"
                >
                  <span>{aud.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#300C41]" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
