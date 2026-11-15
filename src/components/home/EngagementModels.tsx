"use client";

import React from "react";
import Link from "next/link";
import { Layers, CalendarCheck2, Cpu, ArrowRight } from "lucide-react";

export default function EngagementModels() {
  const models = [
    {
      title: "Project-Based Work",
      badge: "Defined Scope & Deliverables",
      icon: <Layers className="w-5 h-5 text-[#300C41]" />,
      popular: false,
      description:
        "Perfect for clearly defined initiatives: build a flagship website, mobile app, AI system, or standalone digital deliverable with deterministic timeline and deliverables.",
      idealScenario:
        "Startups launching an MVP, companies executing a discrete redesign, or scholars needing complete academic project mentorship.",
      inclusions: [
        "Detailed scope breakdown & milestone delivery schedule",
        "Dedicated project manager and lead engineer",
        "Transparent sprint demos and weekly progress reporting",
        "Comprehensive QA testing, documentation & 30-day warranty",
      ],
      ctaText: "Request a Quote",
      href: "/enquire",
    },
    {
      title: "Monthly Services & Dedicated Pods",
      badge: "Most Popular for Growth",
      icon: <CalendarCheck2 className="w-5 h-5 text-[#300C41]" />,
      popular: true,
      description:
        "Ongoing technical maintenance, continuous SEO, digital marketing campaigns, cloud DevOps hosting management, and rapid on-demand engineering support.",
      idealScenario:
        "Growing businesses requiring a reliable, ongoing technology & growth partner without the massive overhead of hiring full-time internal teams.",
      inclusions: [
        "Pre-allocated monthly engineering & marketing hours",
        "Priority response SLA (under 4 hours)",
        "Proactive security updates, server monitoring & daily backups",
        "Bi-weekly strategy reviews and iterative optimization",
      ],
      ctaText: "Discuss Your Project",
      href: "/contact",
    },
    {
      title: "Custom Enterprise Solutions",
      badge: "Enterprise Modernization",
      icon: <Cpu className="w-5 h-5 text-[#300C41]" />,
      popular: false,
      description:
        "Bespoke technology architecture designed from the ground up to solve complex enterprise business challenges, digital transformation, and legacy modernization.",
      idealScenario:
        "Established organizations modernizing legacy operations, building proprietary AI algorithms, or connecting complex distributed architectures.",
      inclusions: [
        "In-depth strategic discovery & architectural assessment",
        "Custom software, API middleware & specialized AI integrations",
        "Enterprise security, SOC2/GDPR compliance auditing",
        "Executive governance, dedicated steering committee & staff training",
      ],
      ctaText: "Get a Custom Proposal",
      href: "/contact",
    },
  ];

  return (
    <section id="engagement-models" className="py-20 bg-white border-b border-[#300C41]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#300C41]/5 border border-[#300C41]/10 px-3 py-1 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#DEE948]" />
            <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#300C41]">
              COMMERCIAL FRAMEWORKS
            </p>
          </div>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#300C41] tracking-tight leading-[1.15] mb-4">
            How We Partner With <span className="underline decoration-[#DEE948] decoration-4 underline-offset-8">Your Organization</span>
          </h2>
          <p className="font-sans font-normal text-base sm:text-lg text-[#300C41]/75 max-w-2xl mx-auto leading-relaxed">
            Every business has distinct operational rhythms. Whether you require
            deterministic milestone delivery, dedicated monthly capacity, or
            co-engineered custom enterprise architecture, we adapt to your
            commercial model.
          </p>
        </div>

        {/* 3 Model Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {models.map((m, idx) => (
            <div
              key={idx}
              className={`bg-white rounded-2xl border p-8 flex flex-col justify-between transition-all duration-200 relative ${
                m.popular
                  ? "border-[#300C41] shadow-violet ring-2 ring-[#DEE948]/50 -translate-y-1"
                  : "border-[#300C41]/10 shadow-2xs hover:border-[#300C41] hover:shadow-violet hover:-translate-y-0.5"
              }`}
            >
              {m.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#DEE948] text-[#300C41] shadow-sm">
                  {m.badge}
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-[#300C41]/5 border border-[#300C41]/10 flex items-center justify-center">
                    {m.icon}
                  </div>
                  {!m.popular && (
                    <span className="text-[11px] font-mono font-bold px-2.5 py-1 bg-[#300C41]/5 text-[#300C41] rounded uppercase tracking-wider">
                      {m.badge}
                    </span>
                  )}
                </div>

                <h3 className="font-sans font-bold text-xl text-[#300C41] mb-3">
                  {m.title}
                </h3>

                <p className="font-sans text-xs sm:text-sm text-[#300C41]/70 leading-relaxed mb-5">
                  {m.description}
                </p>

                <div className="p-3.5 bg-[#300C41]/5 rounded-xl border border-[#300C41]/10 mb-6">
                  <span className="block text-[10px] font-mono font-bold uppercase tracking-wider text-[#300C41]/60 mb-1">
                    Ideal Scenario:
                  </span>
                  <p className="font-sans text-xs text-[#300C41] leading-relaxed">
                    {m.idealScenario}
                  </p>
                </div>

                <div className="space-y-2.5 mb-8">
                  <span className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#300C41]">
                    Key Inclusions:
                  </span>
                  {m.inclusions.map((item, iIdx) => (
                    <div
                      key={iIdx}
                      className="flex items-start gap-2 text-xs text-[#300C41]/75 leading-relaxed"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#DEE948] shrink-0 mt-1.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-5 border-t border-[#300C41]/10 mt-auto">
                <Link
                  href={m.href}
                  className={`w-full py-3 px-4 rounded-xl font-sans text-xs sm:text-sm font-bold tracking-normal inline-flex items-center justify-center gap-2 transition-all ${
                    m.popular
                      ? "bg-[#300C41] hover:bg-[#230830] text-white hover:text-[#DEE948] shadow-violet"
                      : "bg-white hover:bg-[#300C41] text-[#300C41] hover:text-[#DEE948] border border-[#300C41]/20"
                  }`}
                >
                  <span>{m.ctaText}</span>
                  <ArrowRight className="w-4 h-4 text-[#DEE948]" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
