import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import {
  CheckCircle2,
  ArrowRight,
  Terminal,
} from "lucide-react";

export const metadata = {
  title: "About Us & Engineering Mission",
  description:
    "Learn about NIYAN: our technology-first culture, engineering values, and mission to empower students, startups, and enterprises.",
};

export default function AboutPage() {
  const values = [
    {
      title: "Architectural Integrity Over Hype",
      description:
        "We don't chase short-lived marketing buzzwords. We select proven, reliable algorithms and battle-tested frameworks that survive high traffic in production.",
    },
    {
      title: "Transparent & Honest Engineering",
      description:
        "If a simpler SQL query or deterministic script solves your problem better than an expensive multi-billion parameter neural model, we will recommend the simpler, cheaper solution.",
    },
    {
      title: "Ethical Academic Mentorship",
      description:
        "We are deeply invested in nurturing future engineers. We teach the underlying mathematics, system architectures, and IEEE standards so students gain genuine mastery.",
    },
    {
      title: "Zero Vendor Lock-In",
      description:
        "Every git commit, model checkpoint, containerized Dockerfile, and architecture diagram is 100% owned by you from day one.",
    },
  ];

  return (
    <div className="pt-28 pb-24 bg-white min-h-screen text-[#300C41]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#300C41]/5 border border-[#300C41]/10 px-3 py-1 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#DEE948]" />
            <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#300C41]">
              OUR ORIGIN & PURPOSE
            </p>
          </div>

          <h1 className="font-sans font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#300C41] tracking-tight leading-[1.15]">
            Bridging Deep Research and <span className="underline decoration-[#DEE948] decoration-4 underline-offset-8">Production Code</span>
          </h1>

          <p className="font-sans text-base sm:text-lg text-[#300C41]/75 leading-relaxed">
            {siteConfig.name} was founded to solve a fundamental contradiction
            in the technology industry: cutting-edge AI research moves at lightning
            speed, but most organizations struggle to convert theoretical models
            into reliable, secure, and production-viable software.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-5">
            <h2 className="font-sans font-extrabold text-2xl sm:text-3xl text-[#300C41] tracking-tight">
              A Company Founded on Craftsmanship.
            </h2>
            <p className="text-sm text-[#300C41]/75 leading-relaxed">
              We started as a specialized group of machine learning researchers
              and distributed systems engineers. Having watched startups waste
              precious runway on fragile AI wrappers and university students
              struggle with obsolete academic syllabus materials, we created a
              unified engineering hub designed to serve both.
            </p>
            <p className="text-sm text-[#300C41]/75 leading-relaxed">
              Today, our cross-disciplinary team spans computer vision, natural
              language processing, distributed backend engineering, mobile app
              development, and business intelligence. We operate with the
              discipline of a research lab and the shipping velocity of a modern
              product collective.
            </p>

            <div className="pt-4 grid grid-cols-2 gap-4 border-t border-[#300C41]/10">
              <div className="p-4 bg-white rounded-xl border border-[#300C41]/10 shadow-violet">
                <div className="text-2xl font-bold font-mono text-[#300C41]">100%</div>
                <div className="text-xs text-[#300C41]/60 font-semibold">IP Transfer Guarantee</div>
              </div>
              <div className="p-4 bg-white rounded-xl border border-[#300C41]/10 shadow-violet">
                <div className="text-2xl font-bold font-mono text-[#300C41]">Zero</div>
                <div className="text-xs text-[#300C41]/60 font-semibold">Proprietary Lock-In</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#300C41]/15 shadow-violet space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-[#300C41]/60 border-b border-[#300C41]/10 pb-3">
                <Terminal className="w-4 h-4 text-[#300C41]" />
                <span>niyan.manifesto.md</span>
              </div>
              <blockquote className="text-xs sm:text-sm text-[#300C41]/85 italic leading-relaxed">
                &ldquo;We measure our success not by the volume of lines written
                or complexity generated, but by how cleanly a software system
                serves its human users, scales under real-world loads, and empowers
                our partners to own their technology independently.&rdquo;
              </blockquote>
              <div className="pt-2 text-xs font-mono text-[#300C41]/60 font-bold">
                — NIYAN Engineering Leadership
              </div>
            </div>
          </div>
        </div>

        {/* 4 Core Values */}
        <div className="pt-12 border-t border-[#300C41]/10 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="font-sans font-bold text-2xl text-[#300C41]">
              Our Core Principles
            </h3>
            <p className="text-xs sm:text-sm text-[#300C41]/75 leading-relaxed">
              The operational philosophies governing every client interaction and commit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((v, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border border-[#300C41]/10 shadow-2xs space-y-2.5"
              >
                <div className="flex items-center gap-2 text-sm font-bold text-[#300C41]">
                  <CheckCircle2 className="w-4 h-4 text-[#300C41]" />
                  <span>{v.title}</span>
                </div>
                <p className="text-xs text-[#300C41]/75 leading-relaxed pl-6">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Callout */}
        <div className="pt-8 text-center">
          <Link
            href="/enquire"
            className="inline-flex items-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-bold rounded-xl bg-[#300C41] hover:bg-[#230830] text-white hover:text-[#DEE948] shadow-violet transition-colors"
          >
            <span>Partner With Our Engineering Collective</span>
            <ArrowRight className="w-4 h-4 text-[#DEE948]" />
          </Link>
        </div>
      </div>
    </div>
  );
}
