import React from "react";
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
} from "lucide-react";

const getIcon = (iconName: string) => {
  const props = { className: "w-6 h-6 text-[#300C41] group-hover:text-[#DEE948] transition-colors" };
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

export const metadata = {
  title: "Core Technology Services",
  description:
    "Explore our 8 specialized engineering practices: Custom AI, RAG Chatbots, Web Development, Mobile Apps, Final Year Academic Mentoring, Portfolios, Data Science, and Technical SEO.",
};

export default function ServicesPage() {
  return (
    <div className="pt-28 pb-24 bg-white min-h-screen text-[#300C41]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#300C41]/5 border border-[#300C41]/10 px-3 py-1 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#DEE948]" />
            <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#300C41]">
              ENGINEERING DIRECTORY
            </p>
          </div>

          <h1 className="font-sans font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#300C41] tracking-tight leading-[1.15]">
            Our 8 Core <span className="underline decoration-[#DEE948] decoration-4 underline-offset-8">Capabilities</span>
          </h1>

          <p className="font-sans text-base sm:text-lg text-[#300C41]/75 leading-relaxed">
            Every practice is executed by senior engineers, adhering to
            production-ready engineering standards, verifiable benchmarks, and
            transparent delivery milestones.
          </p>
        </div>

        {/* 8 Services Comprehensive Grid */}
        <div className="space-y-6">
          {servicesData.map((svc) => (
            <div
              key={svc.id}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-[#300C41]/10 shadow-2xs hover:border-[#300C41] hover:shadow-violet transition-all flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 group"
            >
              {/* Left Column: Number, Title, Intro, Sub-offerings */}
              <div className="space-y-4 max-w-3xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#300C41]/5 border border-[#300C41]/10 flex items-center justify-center shrink-0 group-hover:bg-[#300C41] transition-all">
                    {getIcon(svc.iconName)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 font-mono text-xs text-[#300C41]/60">
                      <span>CAPABILITY {svc.orderNumber}</span>
                      <span>&bull;</span>
                      <span className="text-[#300C41] font-bold bg-[#DEE948] px-2 py-0.5 rounded text-[11px]">{svc.badge}</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-[#300C41] transition-colors mt-0.5">
                      {svc.title}
                    </h2>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#300C41]/75 leading-relaxed">
                  {svc.shortDescription}
                </p>

                {/* Sub offerings pills */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {svc.subOfferings.map((sub, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-[#300C41]/5 border border-[#300C41]/10 text-[#300C41]"
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Column: Actions */}
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-48 shrink-0">
                <Link
                  href={`/services/${svc.slug}`}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold rounded-xl bg-[#300C41] hover:bg-[#230830] text-white hover:text-[#DEE948] shadow-violet transition-colors"
                >
                  <span>Explore Service</span>
                  <ArrowRight className="w-4 h-4 text-[#DEE948]" />
                </Link>

                <Link
                  href={`/enquire?service=${svc.slug}`}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold rounded-xl bg-white hover:bg-[#300C41]/5 text-[#300C41] border border-[#300C41]/20 transition-colors"
                >
                  <span>Request a Quote</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
