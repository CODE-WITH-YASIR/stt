"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function PricingPage() {
  const steps = [
    {
      step: "01",
      title: "Technical Discovery",
      description:
        "We review your functional goals, target platforms, architectural prerequisites, and data parameters in detail.",
    },
    {
      step: "02",
      title: "Architecture & Scope Breakdown",
      description:
        "Our solutions architect maps out system modules, dependencies, sprint milestones, and concrete acceptance criteria.",
    },
    {
      step: "03",
      title: "Personalized Custom Proposal",
      description:
        "You receive a formal proposal detailing timeline schedules, dedicated engineering resources, and milestone deliverables.",
    },
    {
      step: "04",
      title: "Execution & 100% IP Transfer",
      description:
        "Development commences in weekly sprints with staging access, continuous communication, and complete intellectual property ownership.",
    },
  ];

  return (
    <div className="pt-28 pb-24 bg-white min-h-screen text-[#300C41]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#300C41]/5 border border-[#300C41]/10 px-3 py-1 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#DEE948]" />
            <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#300C41]">
              COMMERCIAL FRAMEWORKS
            </p>
          </div>

          <h1 className="font-sans font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#300C41] tracking-tight leading-[1.15]">
            How We Partner With <span className="underline decoration-[#DEE948] decoration-4 underline-offset-8">Your Organization</span>
          </h1>

          <p className="font-sans text-base sm:text-lg text-[#300C41]/75 leading-relaxed">
            Every business has distinct operational rhythms. Whether you require
            deterministic milestone delivery, dedicated monthly capacity, or
            co-engineered custom enterprise architecture, we adapt to your
            commercial model.
          </p>
        </div>

        {/* 3 Main Engagement Models - STRICTLY NO fixed prices or public numbers */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {/* Model 1: Project-Based */}
          <div className="bg-white rounded-2xl border border-[#300C41]/10 shadow-violet hover:border-[#300C41] transition-all p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#300C41] px-2.5 py-1 bg-[#DEE948] rounded">
                Milestone Deliverables
              </span>
              <h2 className="text-2xl font-bold text-[#300C41]">Project-Based Work</h2>
              <p className="text-xs sm:text-sm text-[#300C41]/75 leading-relaxed">
                Perfect for clearly defined initiatives: build a flagship website, mobile app, AI system, or standalone digital deliverable with deterministic timeline and deliverables.
              </p>

              <div className="p-3 bg-[#300C41]/5 rounded-xl border border-[#300C41]/10 text-xs text-[#300C41]">
                <span className="font-mono font-bold uppercase tracking-wider text-[#300C41]/70 block mb-0.5">
                  Ideal Scenario:
                </span>
                Startups launching an MVP, companies executing a discrete redesign, or scholars completing academic capstones.
              </div>

              <div className="pt-4 border-t border-[#300C41]/10 space-y-2.5 text-xs text-[#300C41]/80">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#300C41] shrink-0 mt-0.5" />
                  <span>Personalized proposal tailored to your specifications</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#300C41] shrink-0 mt-0.5" />
                  <span>Clearly scoped milestone deliverables and deadlines</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#300C41] shrink-0 mt-0.5" />
                  <span>Dedicated project manager and lead engineer</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#300C41] shrink-0 mt-0.5" />
                  <span>30-day post-launch warranty and bug fix support</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#300C41] shrink-0 mt-0.5" />
                  <span>100% source code, weights, and IP ownership transferred</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#300C41]/10 mt-6">
              <Link
                href="/enquire"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 text-xs sm:text-sm font-bold rounded-xl bg-white hover:bg-[#300C41] text-[#300C41] hover:text-[#DEE948] border border-[#300C41]/20 transition-all shadow-xs"
              >
                <span>Request a Quote</span>
                <ArrowRight className="w-4 h-4 text-[#DEE948]" />
              </Link>
            </div>
          </div>

          {/* Model 2: Monthly Services & Dedicated Pods */}
          <div className="bg-white rounded-2xl border-2 border-[#300C41] shadow-violet ring-2 ring-[#DEE948]/50 p-8 flex flex-col justify-between relative -translate-y-1">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-[#DEE948] text-[#300C41] shadow-sm">
              Most Popular for Growth
            </div>

            <div className="space-y-4">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#300C41] px-2.5 py-1 bg-[#300C41]/5 rounded">
                Continuous Capacity
              </span>
              <h2 className="text-2xl font-bold text-[#300C41]">Monthly Services & Pods</h2>
              <p className="text-xs sm:text-sm text-[#300C41]/75 leading-relaxed">
                Ongoing technical maintenance, continuous SEO, digital marketing campaigns, cloud DevOps hosting management, and rapid on-demand engineering support.
              </p>

              <div className="p-3 bg-[#300C41]/5 rounded-xl border border-[#300C41]/10 text-xs text-[#300C41]">
                <span className="font-mono font-bold uppercase tracking-wider text-[#300C41] block mb-0.5">
                  Ideal Scenario:
                </span>
                Growing businesses requiring a reliable, ongoing technology & growth partner without the massive overhead of hiring full-time internal teams.
              </div>

              <div className="pt-4 border-t border-[#300C41]/10 space-y-2.5 text-xs text-[#300C41]/80">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#300C41] shrink-0 mt-0.5" />
                  <span>Pre-allocated monthly engineering & marketing hours</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#300C41] shrink-0 mt-0.5" />
                  <span>Priority response SLA (under 4 hours)</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#300C41] shrink-0 mt-0.5" />
                  <span>Proactive security updates, server monitoring & daily backups</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#300C41] shrink-0 mt-0.5" />
                  <span>Continuous model evaluation, dataset retraining, and tuning</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#300C41] shrink-0 mt-0.5" />
                  <span>Bi-weekly strategy reviews and iterative optimization</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#300C41]/10 mt-6">
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 text-xs sm:text-sm font-bold rounded-xl bg-[#300C41] hover:bg-[#230830] text-white hover:text-[#DEE948] transition-all shadow-violet"
              >
                <span>Discuss Your Project</span>
                <ArrowRight className="w-4 h-4 text-[#DEE948]" />
              </Link>
            </div>
          </div>

          {/* Model 3: Custom Solutions */}
          <div className="bg-white rounded-2xl border border-[#300C41]/10 shadow-violet hover:border-[#300C41] transition-all p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#300C41] px-2.5 py-1 bg-[#300C41]/5 rounded">
                Enterprise Modernization
              </span>
              <h2 className="text-2xl font-bold text-[#300C41]">Custom Enterprise Solutions</h2>
              <p className="text-xs sm:text-sm text-[#300C41]/75 leading-relaxed">
                Bespoke technology architecture designed from the ground up to solve complex enterprise business challenges, digital transformation, and legacy modernization.
              </p>

              <div className="p-3 bg-[#300C41]/5 rounded-xl border border-[#300C41]/10 text-xs text-[#300C41]">
                <span className="font-mono font-bold uppercase tracking-wider text-[#300C41]/70 block mb-0.5">
                  Ideal Scenario:
                </span>
                Established organizations modernizing legacy operations, building proprietary AI algorithms, or connecting complex distributed architectures.
              </div>

              <div className="pt-4 border-t border-[#300C41]/10 space-y-2.5 text-xs text-[#300C41]/80">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#300C41] shrink-0 mt-0.5" />
                  <span>In-depth strategic discovery & architectural assessment</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#300C41] shrink-0 mt-0.5" />
                  <span>Custom software, API middleware & specialized AI integrations</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#300C41] shrink-0 mt-0.5" />
                  <span>Enterprise security, SOC2/GDPR compliance auditing</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#300C41] shrink-0 mt-0.5" />
                  <span>Executive governance, steering committee & staff training</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#300C41] shrink-0 mt-0.5" />
                  <span>Dedicated principal solutions architect allocation</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#300C41]/10 mt-6">
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 text-xs sm:text-sm font-bold rounded-xl bg-white hover:bg-[#300C41] text-[#300C41] hover:text-[#DEE948] border border-[#300C41]/20 transition-all shadow-xs"
              >
                <span>Get a Custom Proposal</span>
                <ArrowRight className="w-4 h-4 text-[#DEE948]" />
              </Link>
            </div>
          </div>
        </div>

        {/* 4-Step Scoping Process */}
        <div className="pt-12 border-t border-[#300C41]/10 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="font-sans font-bold text-2xl text-[#300C41]">
              How Our Personalized Proposal Process Works
            </h3>
            <p className="text-xs sm:text-sm text-[#300C41]/75 leading-relaxed">
              Transparent, professional scoping with zero surprises.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((st, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 border border-[#300C41]/10 shadow-violet space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-2xl font-extrabold text-[#300C41]">
                    {st.step}
                  </span>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#DEE948]" />
                </div>
                <h4 className="font-sans font-bold text-base text-[#300C41]">
                  {st.title}
                </h4>
                <p className="text-xs text-[#300C41]/75 leading-relaxed">
                  {st.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
