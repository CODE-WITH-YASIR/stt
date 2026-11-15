"use client";

import React from "react";
import {
  Layers,
  Users2,
  GitBranch,
  ShieldCheck,
  MessageSquareCheck,
  HeartHandshake,
} from "lucide-react";

export default function WhyChooseUs() {
  const standards = [
    {
      title: "Unified Multi-Disciplinary Delivery",
      icon: <Layers className="w-5 h-5" />,
      description:
        "AI, mobile, web, cloud infrastructure, and digital growth under one roof—no fragmented contractors or siloed communication.",
      highlights: [
        "Single engineering accountability",
        "Seamless full-stack integration",
        "Harmonized design & code systems",
      ],
    },
    {
      title: "Dedicated Senior Engineering Pods",
      icon: <Users2 className="w-5 h-5" />,
      description:
        "Direct access to principal architects and engineers who take personal ownership of clean code and delivery velocity.",
      highlights: [
        "No junior hand-offs or middlemen",
        "Transparent weekly sprint demos",
        "Direct Slack/WhatsApp sync",
      ],
    },
    {
      title: "Production-Grade Rigor & CI/CD",
      icon: <GitBranch className="w-5 h-5" />,
      description:
        "Zero-downtime automated pipelines, strict test coverage, and documentation designed to scale without technical debt.",
      highlights: [
        "Automated GitHub CI/CD actions",
        "Strict type-safety & unit tests",
        "Dockerized cloud deployments",
      ],
    },
    {
      title: "30-Day Post-Launch Warranty",
      icon: <ShieldCheck className="w-5 h-5" />,
      description:
        "Full post-deployment support, performance monitoring, and guaranteed bug-fixing with 99.9% uptime SLA commitments.",
      highlights: [
        "Zero-cost warranty bug resolution",
        "Live server telemetry & alerts",
        "100% intellectual property handover",
      ],
    },
    {
      title: "Transparent Communication",
      icon: <MessageSquareCheck className="w-5 h-5" />,
      description:
        "No technical obfuscation or surprise billing. You receive weekly milestone sprint demos and live access to git commits.",
      highlights: [
        "Clear weekly deliverables",
        "Realistic scoped timelines",
        "Honest technical feasibility advice",
      ],
    },
    {
      title: "Customer-Centric Approach",
      icon: <HeartHandshake className="w-5 h-5" />,
      description:
        "We prioritize features that create tangible commercial advantage or academic excellence rather than unnecessary complexity.",
      highlights: [
        "Tailored to your budget stage",
        "Iterative milestone approvals",
        "Long-term strategic guidance",
      ],
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
              ENTERPRISE STANDARDS
            </p>
          </div>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#300C41] tracking-tight leading-[1.15] mb-4">
            The NIYAN <span className="underline decoration-[#DEE948] decoration-4 underline-offset-8">Standard</span>
          </h2>
          <p className="font-sans font-normal text-base sm:text-lg text-[#300C41]/75 max-w-2xl mx-auto leading-relaxed">
            Why leading startups, ambitious scholars, and growing companies
            partner with NIYAN for end-to-end digital execution.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {standards.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-[#300C41]/10 hover:border-[#300C41] hover:shadow-violet hover:-translate-y-1 transition-all duration-200 p-7 flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#300C41]/5 border border-[#300C41]/10 text-[#300C41] group-hover:bg-[#300C41] group-hover:text-[#DEE948] transition-all flex items-center justify-center shrink-0 mb-5 group-hover:scale-105">
                  {item.icon}
                </div>

                <h3 className="font-sans font-bold text-lg text-[#300C41] transition-colors mb-2.5">
                  {item.title}
                </h3>

                <p className="font-sans text-xs sm:text-sm text-[#300C41]/70 leading-relaxed mb-5">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#300C41]/10 space-y-2 mt-auto">
                {item.highlights.map((pt, pIdx) => (
                  <div
                    key={pIdx}
                    className="flex items-center gap-2 text-xs text-[#300C41]/75"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#DEE948] shrink-0" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
