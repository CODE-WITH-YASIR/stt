"use client";

import React, { useState } from "react";
import Link from "next/link";
import { servicesData } from "@/config/services";
import {
  Cpu,
  Bot,
  Globe,
  Smartphone,
  GraduationCap,
  Briefcase,
  BarChart3,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const getIcon = (iconName: string) => {
  const props = { className: "w-6 h-6 transition-colors" };
  switch (iconName) {
    case "Cpu":
      return <Cpu {...props} />;
    case "Bot":
      return <Bot {...props} />;
    case "Globe":
      return <Globe {...props} />;
    case "Smartphone":
      return <Smartphone {...props} />;
    case "GraduationCap":
      return <GraduationCap {...props} />;
    case "Briefcase":
      return <Briefcase {...props} />;
    case "BarChart3":
      return <BarChart3 {...props} />;
    case "TrendingUp":
      return <TrendingUp {...props} />;
    default:
      return <Cpu {...props} />;
  }
};

export default function ServicesGrid() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Services (8)" },
    { id: "ai", label: "AI & Intelligence" },
    { id: "software", label: "Software & Web" },
    { id: "academic", label: "Academic & Careers" },
    { id: "growth", label: "Growth & Analytics" },
  ];

  const filteredServices = servicesData.filter((service) => {
    if (activeCategory === "all") return true;
    if (activeCategory === "ai")
      return (
        service.slug === "ai-machine-learning" ||
        service.slug === "ai-chatbot-development"
      );
    if (activeCategory === "software")
      return (
        service.slug === "web-development" ||
        service.slug === "app-development"
      );
    if (activeCategory === "academic")
      return (
        service.slug === "final-year-project-solutions" ||
        service.slug === "portfolio-development"
      );
    if (activeCategory === "growth")
      return (
        service.slug === "data-science-analytics" ||
        service.slug === "digital-marketing-seo"
      );
    return true;
  });

  return (
    <section id="services" className="py-20 bg-white border-b border-[#300C41]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#300C41]/5 border border-[#300C41]/10 px-3 py-1 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#DEE948]" />
            <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#300C41]">
              PRACTICAL EXECUTION
            </p>
          </div>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#300C41] tracking-tight leading-[1.15] mb-4">
            Our 8 Core <span className="underline decoration-[#DEE948] decoration-4 underline-offset-8">Capabilities</span>
          </h2>
          <p className="font-sans font-normal text-base sm:text-lg text-[#300C41]/75 max-w-2xl mx-auto leading-relaxed">
            Practical services for building, improving, and growing digital
            products, intelligent systems, and business platforms.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl font-sans text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-[#300C41] text-[#DEE948] shadow-xs"
                  : "bg-white text-[#300C41] border border-[#300C41]/15 hover:bg-[#300C41]/5"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services Grid (All 8 in exact required order) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              id={`service-card-${service.slug}`}
              className="bg-white rounded-2xl border border-[#300C41]/10 hover:border-[#300C41] hover:shadow-violet hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between p-6 group cursor-pointer"
            >
              <div>
                {/* Top Row: Icon + Category Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#300C41]/5 border border-[#300C41]/10 text-[#300C41] group-hover:bg-[#300C41] group-hover:text-[#DEE948] transition-all flex items-center justify-center shrink-0 group-hover:scale-105">
                    {getIcon(service.iconName)}
                  </div>
                  <span className="text-[11px] font-mono font-bold px-2.5 py-1 bg-[#DEE948] text-[#300C41] rounded uppercase tracking-wider">
                    {service.badge}
                  </span>
                </div>

                {/* Service Title */}
                <h3 className="font-sans font-bold text-lg text-[#300C41] mb-2">
                  <span className="font-mono text-sm text-[#300C41]/60 mr-1.5 font-bold">
                    {service.orderNumber}.
                  </span>
                  {service.title}
                </h3>

                {/* Short Description */}
                <p className="font-sans font-normal text-xs sm:text-sm text-[#300C41]/70 leading-relaxed mb-4 line-clamp-3">
                  {service.shortDescription}
                </p>

                {/* Key Sub-offerings */}
                <div className="space-y-1.5 mb-6 pt-3 border-t border-[#300C41]/10">
                  {service.subOfferings.slice(0, 3).map((feat: string, idx: number) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-xs text-[#300C41]/75"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#DEE948] shrink-0" />
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Action Row */}
              <div className="pt-4 border-t border-[#300C41]/10 flex items-center justify-between gap-2 mt-auto">
                <Link
                  href={`/services/${service.slug}`}
                  className="font-sans text-xs sm:text-sm font-bold tracking-normal text-[#300C41] hover:underline flex items-center gap-1.5 transition-colors"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#300C41]" />
                </Link>

                <Link
                  href={`/enquire?service=${service.slug}`}
                  className="font-sans text-xs font-bold tracking-normal text-[#300C41] bg-[#DEE948] hover:bg-[#300C41] hover:text-[#DEE948] px-3 py-1.5 rounded-lg transition-all cursor-pointer shadow-2xs"
                >
                  Quick Inquire
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
