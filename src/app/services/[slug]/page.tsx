import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { servicesData } from "@/config/services";
import { siteConfig } from "@/config/site";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
  FolderGit2,
} from "lucide-react";
import type { Metadata } from "next";

const aliasMap: Record<string, string> = {
  "software-development": "app-development",
  "cloud-solutions": "app-development",
  "digital-marketing": "digital-marketing-seo",
  "seo-optimization": "digital-marketing-seo",
  "ai-chatbots": "ai-chatbot-development",
  "ai-chatbots-automation": "ai-chatbot-development",
};

export async function generateStaticParams() {
  const base = servicesData.map((svc) => ({
    slug: svc.slug,
  }));
  const aliases = Object.keys(aliasMap).map((slug) => ({ slug }));
  return [...base, ...aliases];
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const resolvedSlug = aliasMap[params.slug] || params.slug;
  const service = servicesData.find((s) => s.slug === resolvedSlug);
  if (!service) return { title: "Service Not Found" };

  return {
    title: `${service.title} | ${siteConfig.name}`,
    description: service.shortDescription,
    keywords: [
      service.title,
      ...service.subOfferings,
      ...service.technologies.map((t) => t.name),
    ],
  };
}

export default function ServiceDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const resolvedSlug = aliasMap[params.slug] || params.slug;
  const service = servicesData.find((s) => s.slug === resolvedSlug);
  if (!service) notFound();

  return (
    <div className="pt-28 pb-24 bg-white min-h-screen text-[#300C41]">
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-8">
        <nav className="flex items-center gap-2 text-xs text-[#300C41]/60 font-medium">
          <Link href="/" className="hover:text-[#300C41] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#300C41]/40" />
          <Link href="/services" className="hover:text-[#300C41] transition-colors">
            Services
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#300C41]/40" />
          <span className="text-[#300C41] font-bold">{service.title}</span>
        </nav>
      </div>

      {/* Hero / Header Section */}
      <section className="relative overflow-hidden pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#DEE948] text-[#300C41] uppercase tracking-wider font-mono">
              <span>Capability {service.orderNumber}</span>
              <span>&bull;</span>
              <span>{service.badge}</span>
            </div>

            <h1 className="font-sans font-extrabold text-3xl sm:text-5xl text-[#300C41] tracking-tight leading-[1.15]">
              {service.title}
            </h1>

            <p className="font-sans text-base sm:text-lg text-[#300C41]/75 leading-relaxed">
              {service.introduction}
            </p>

            {/* Sub-Offerings Pills */}
            <div className="flex flex-wrap gap-2 pt-2">
              {service.subOfferings.map((sub, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 text-xs font-semibold rounded-lg bg-[#300C41]/5 border border-[#300C41]/10 text-[#300C41] shadow-2xs"
                >
                  {sub}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <Link
                href={`/enquire?service=${service.slug}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-bold rounded-xl bg-[#300C41] hover:bg-[#230830] text-white hover:text-[#DEE948] shadow-violet transition-colors"
              >
                <span>Request a Quote for {service.title}</span>
                <ArrowRight className="w-4 h-4 text-[#DEE948]" />
              </Link>

              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-bold text-[#300C41] bg-white hover:bg-[#300C41]/5 border border-[#300C41]/15 rounded-xl transition-colors shadow-2xs"
              >
                <span>Consult Our Engineers</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 1. Key Features Grid */}
      <section className="py-16 border-t border-[#300C41]/10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#300C41]">
              ARCHITECTURAL HIGHLIGHTS
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#300C41] tracking-tight">
              Key Features & Engineering Rigor
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.keyFeatures.map((feat, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-[#300C41]/10 shadow-violet space-y-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#300C41]/5 border border-[#300C41]/10 flex items-center justify-center text-[#300C41] font-mono text-xs font-bold">
                    0{idx + 1}
                  </div>
                  <h3 className="text-base font-bold text-[#300C41]">
                    {feat.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#300C41]/75 leading-relaxed">
                  {feat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Deliverables & 3. Benefits Grid */}
      <section className="py-16 border-t border-[#300C41]/10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Deliverables */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#300C41]">
                  WHAT YOU RECEIVE
                </span>
                <h2 className="text-2xl font-bold text-[#300C41] tracking-tight">
                  Contracted Deliverables
                </h2>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-[#300C41]/10 shadow-violet space-y-3">
                {service.deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#300C41]/85">
                    <CheckCircle2 className="w-4 h-4 text-[#300C41] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Strategic Benefits */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#300C41]">
                  VALUE ADDED
                </span>
                <h2 className="text-2xl font-bold text-[#300C41] tracking-tight">
                  Strategic Benefits
                </h2>
              </div>

              <div className="space-y-3">
                {service.benefits.map((ben, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-xl bg-white border border-[#300C41]/10 shadow-violet space-y-1.5"
                  >
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-[#300C41]" />
                      <h4 className="text-sm font-bold text-[#300C41]">{ben.title}</h4>
                    </div>
                    <p className="text-xs text-[#300C41]/75 leading-relaxed pl-6">
                      {ben.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Technologies Used */}
      <section className="py-16 border-t border-[#300C41]/10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#300C41]">
              MODERN TOOLING
            </span>
            <h2 className="text-2xl font-bold text-[#300C41] tracking-tight">
              Technologies & Frameworks Deployed
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {service.technologies.map((tech, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-white border border-[#300C41]/10 shadow-2xs space-y-1 text-center"
              >
                <div className="text-sm font-bold text-[#300C41] font-mono">{tech.name}</div>
                <div className="text-[10px] text-[#300C41]/60 uppercase tracking-wider">
                  {tech.category}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Relevant Project Examples */}
      <section className="py-16 border-t border-[#300C41]/10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#300C41]">
              REAL-WORLD PRECEDENTS
            </span>
            <h2 className="text-2xl font-bold text-[#300C41] tracking-tight">
              Related Project Case Studies
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {service.projectExamples.map((ex, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-[#300C41]/10 shadow-violet hover:border-[#300C41] transition-all space-y-3"
              >
                <div className="flex items-center gap-2 text-xs font-mono text-[#300C41] font-bold">
                  <FolderGit2 className="w-4 h-4 text-[#300C41]" />
                  <span>Case Study 0{idx + 1}</span>
                </div>
                <h4 className="text-base font-bold text-[#300C41]">{ex.title}</h4>
                <p className="text-xs text-[#300C41]/75 leading-relaxed">
                  {ex.description}
                </p>
                <div className="pt-2 text-xs font-mono font-bold text-[#300C41]">
                  Tags: {ex.tags.join(" • ")}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FAQ for this service */}
      <section className="py-16 border-t border-[#300C41]/10 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-8">
          <div className="space-y-1 text-center">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#300C41]">
              FAQ
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#300C41] tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {service.faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-[#300C41]/5 rounded-xl p-6 border border-[#300C41]/10 space-y-2"
              >
                <h4 className="text-sm sm:text-base font-bold text-[#300C41]">
                  {faq.question}
                </h4>
                <p className="text-xs sm:text-sm text-[#300C41]/75 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Final Quote CTA */}
      <section className="py-16 border-t border-[#300C41]/10 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center space-y-6">
          <div className="bg-white rounded-2xl p-8 sm:p-12 border border-[#300C41]/15 shadow-violet space-y-4">
            <h3 className="text-2xl sm:text-3xl font-bold text-[#300C41]">
              Ready to Scope Your {service.title} Initiative?
            </h3>
            <p className="text-sm text-[#300C41]/75 max-w-xl mx-auto leading-relaxed">
              Contact our engineering leads for a deterministic milestone
              proposal, technical architecture discussion, and timeline estimation.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={`/enquire?service=${service.slug}`}
                className="px-6 py-3.5 text-xs sm:text-sm font-bold rounded-xl bg-[#300C41] hover:bg-[#230830] text-white hover:text-[#DEE948] shadow-violet transition-colors"
              >
                Request a Custom Proposal
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3.5 text-xs sm:text-sm font-bold rounded-xl bg-white hover:bg-[#300C41]/5 text-[#300C41] border border-[#300C41]/20 transition-colors"
              >
                Discuss Specifications
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
