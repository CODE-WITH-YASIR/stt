"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Compass,
  Layers,
  Cpu,
  Rocket,
  CheckCircle2,
  ArrowRight,
  Code2,
  Check,
} from "lucide-react";

export default function WorkingProcess() {
  const [activeStage, setActiveStage] = useState<number>(0);

  const stages = [
    {
      id: "01",
      name: "DISCOVER",
      stageTitle: "DISCOVERY & STRATEGY",
      icon: <Compass className="w-4 h-4" />,
      description:
        "Understand your business goals, users, technical requirements, and success metrics.",
      outcome: "Technical Specification & Architecture Blueprint",
      preview: (
        <div className="relative h-28 w-full bg-[#300C41]/5 rounded-xl p-3 border border-[#300C41]/10 flex flex-col justify-between mb-4 overflow-hidden group-hover:border-[#300C41]/30 transition-all duration-200">
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#300C41 1px, transparent 1px)",
              backgroundSize: "10px 10px",
            }}
          />
          <div className="relative flex items-center justify-between z-10">
            <span className="text-[10px] font-mono font-semibold text-[#300C41]/60 uppercase tracking-wider">
              System Scope
            </span>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold text-[#300C41] bg-white px-2 py-0.5 rounded border border-[#300C41]/15 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DEE948]" />
              Blueprint v1.0
            </span>
          </div>

          <div className="relative flex items-center justify-between px-1 z-10">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-lg bg-white border border-[#300C41]/15 flex items-center justify-center text-[10px] font-mono font-bold text-[#300C41] shadow-2xs">
                API
              </div>
              <span className="text-[9px] text-[#300C41]/60 font-sans font-medium mt-1">
                Schema
              </span>
            </div>
            <div className="flex-1 mx-1.5 h-px bg-[#300C41]/20 relative">
              <div className="absolute right-0 -top-[3px] w-1.5 h-1.5 border-t border-r border-[#300C41]/40 rotate-45" />
            </div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-lg bg-white border border-[#300C41]/15 flex items-center justify-center text-[10px] font-mono font-bold text-[#300C41] shadow-2xs">
                DB
              </div>
              <span className="text-[9px] text-[#300C41]/60 font-sans font-medium mt-1">
                Model
              </span>
            </div>
            <div className="flex-1 mx-1.5 h-px bg-[#300C41]/20 relative">
              <div className="absolute right-0 -top-[3px] w-1.5 h-1.5 border-t border-r border-[#300C41]/40 rotate-45" />
            </div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-lg bg-white border border-[#300C41]/15 flex items-center justify-center text-[10px] font-mono font-bold text-[#300C41] shadow-2xs">
                UI
              </div>
              <span className="text-[9px] text-[#300C41]/60 font-sans font-medium mt-1">
                Flows
              </span>
            </div>
          </div>

          <div className="relative flex items-center justify-between text-[10px] text-[#300C41]/70 z-10 pt-1.5 border-t border-[#300C41]/10">
            <span className="font-sans">Feasibility & Architecture</span>
            <span className="text-[#300C41] font-bold font-mono">
              100% Aligned
            </span>
          </div>
        </div>
      ),
    },
    {
      id: "02",
      name: "DESIGN",
      stageTitle: "DESIGN & PROTOTYPING",
      icon: <Layers className="w-4 h-4" />,
      description:
        "Turn concepts into high-fidelity experiences, prototypes, and refined design systems.",
      outcome: "Interactive Prototype & Design System",
      preview: (
        <div className="relative h-28 w-full bg-[#300C41]/5 rounded-xl p-3 border border-[#300C41]/10 flex flex-col justify-between mb-4 overflow-hidden group-hover:border-[#300C41]/30 transition-all duration-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#300C41]/20" />
              <span className="w-2 h-2 rounded-full bg-[#300C41]/20" />
              <span className="w-2 h-2 rounded-full bg-[#300C41]/20" />
              <span className="text-[10px] font-mono text-[#300C41]/50 ml-1">
                canvas.figma
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#300C41]" />
              <span className="w-2 h-2 rounded-full bg-[#DEE948]" />
              <span className="w-2 h-2 rounded-full bg-white border border-[#300C41]/20" />
            </div>
          </div>

          <div className="relative h-11 bg-white rounded-lg border border-[#300C41]/15 p-2 flex items-center justify-between shadow-2xs">
            <div className="flex flex-col gap-1 w-3/5">
              <div className="h-1.5 w-16 bg-[#300C41]/30 rounded" />
              <div className="h-1 w-24 bg-[#300C41]/15 rounded" />
            </div>
            <div className="px-2 py-0.5 bg-[#300C41] rounded text-[9px] font-bold text-[#DEE948] shadow-2xs">
              Action
            </div>
            <div className="absolute right-9 bottom-1.5 pointer-events-none">
              <svg
                className="w-3.5 h-3.5 text-[#300C41] drop-shadow-xs fill-[#300C41]"
                viewBox="0 0 24 24"
              >
                <path d="M3 3l7 18 3-7 7-3L3 3z" />
              </svg>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] text-[#300C41]/70 pt-1.5 border-t border-[#300C41]/10">
            <span className="font-sans">Ergonomic UX System</span>
            <span className="text-[#300C41] font-bold font-mono">
              60 FPS Ready
            </span>
          </div>
        </div>
      ),
    },
    {
      id: "03",
      name: "BUILD",
      stageTitle: "ENGINEERING & QUALITY",
      icon: <Cpu className="w-4 h-4" />,
      description:
        "Build, test, integrate, and continuously improve with production-ready engineering practices.",
      outcome: "Tested, Production-Ready Codebase",
      preview: (
        <div className="relative h-28 w-full bg-[#300C41]/5 rounded-xl p-3 border border-[#300C41]/10 flex flex-col justify-between mb-4 overflow-hidden group-hover:border-[#300C41]/30 transition-all duration-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#300C41]">
              <Code2 className="w-3.5 h-3.5 text-[#300C41]" />
              <span className="font-semibold">test:suite</span>
            </div>
            <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-[#300C41] bg-[#DEE948] px-2 py-0.5 rounded border border-[#300C41]/20">
              <Check className="w-2.5 h-2.5 stroke-[3]" />
              PASS
            </span>
          </div>

          <div className="space-y-1.5 bg-white p-1.5 rounded-lg border border-[#300C41]/15 shadow-2xs">
            <div className="flex items-center justify-between text-[10px] font-mono">
              <span className="text-[#300C41]/70">Lint • Build • Security</span>
              <span className="text-[#300C41] font-bold">100%</span>
            </div>
            <div className="w-full h-1.5 bg-[#300C41]/10 rounded-full overflow-hidden">
              <div className="h-full bg-[#300C41] rounded-full w-full" />
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] text-[#300C41]/70 pt-1.5 border-t border-[#300C41]/10">
            <span className="font-sans">Continuous Integration</span>
            <span className="text-[#300C41] font-bold font-mono">
              Zero Regressions
            </span>
          </div>
        </div>
      ),
    },
    {
      id: "04",
      name: "LAUNCH",
      stageTitle: "LAUNCH & SCALE",
      icon: <Rocket className="w-4 h-4" />,
      description:
        "Deploy securely, optimize performance, monitor production, and continuously evolve the platform.",
      outcome: "Live Production Platform & Handover",
      preview: (
        <div className="relative h-28 w-full bg-[#300C41]/5 rounded-xl p-3 border border-[#300C41]/10 flex flex-col justify-between mb-4 overflow-hidden group-hover:border-[#300C41]/30 transition-all duration-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#300C41]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#DEE948] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#DEE948]" />
              </span>
              <span className="font-bold text-[#300C41]">Production Live</span>
            </div>
            <span className="text-[10px] font-mono font-bold text-[#300C41] bg-white px-2 py-0.5 rounded border border-[#300C41]/20">
              v1.0.0
            </span>
          </div>

          <div className="bg-white p-2 rounded-lg border border-[#300C41]/15 flex items-center justify-between shadow-2xs">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-[#300C41]/5 border border-[#300C41]/10 flex items-center justify-center text-[#300C41]">
                <Rocket className="w-3.5 h-3.5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-sans font-bold text-[#300C41] leading-tight">
                  Global Edge
                </span>
                <span className="text-[9px] font-mono text-[#300C41]/50">
                  DNS & SSL Ready
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[11px] font-mono font-bold text-[#300C41]">
                99.99%
              </div>
              <div className="text-[9px] font-sans text-[#300C41]/60">SLA Uptime</div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] text-[#300C41]/70 pt-1.5 border-t border-[#300C41]/10">
            <span className="font-sans">24/7 Telemetry Active</span>
            <span className="text-[#300C41] font-bold font-mono">
              Healthy
            </span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="process" className="py-20 lg:py-28 bg-white border-b border-[#300C41]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#300C41]/5 border border-[#300C41]/10 px-3 py-1 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#DEE948]" />
            <p className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#300C41]">
              DELIVERY LIFECYCLE
            </p>
          </div>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#300C41] tracking-tight leading-[1.15] mb-4">
            From Idea to <span className="underline decoration-[#DEE948] decoration-4 underline-offset-8">Production.</span>
          </h2>
          <p className="font-sans text-lg sm:text-xl font-medium text-[#300C41]/85 leading-snug mb-3">
            A proven process built for clarity, speed, and scale.
          </p>
          <p className="font-sans text-sm sm:text-base text-[#300C41]/70 max-w-2xl mx-auto leading-relaxed">
            From discovery and strategy to engineering, launch, and continuous
            improvement, every stage is designed to move your business forward.
          </p>
        </div>

        {/* Stepper Pills */}
        <div className="max-w-4xl mx-auto mb-12 lg:mb-16">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-4 py-2.5 px-4 rounded-xl bg-[#300C41]/5 border border-[#300C41]/10">
            {stages.map((stage, idx) => (
              <React.Fragment key={stage.id}>
                <button
                  type="button"
                  onClick={() => setActiveStage(idx)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-mono text-xs font-bold tracking-wider transition-all cursor-pointer select-none ${
                    activeStage === idx
                      ? "bg-[#300C41] text-[#DEE948] shadow-xs"
                      : "text-[#300C41]/70 hover:text-[#300C41] hover:bg-white"
                  }`}
                >
                  <span>{stage.id}</span>
                  <span>{stage.name}</span>
                </button>
                {idx < stages.length - 1 && (
                  <span className="text-[#300C41]/30 font-mono text-xs select-none">
                    →
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stages.map((stage, idx) => {
            const isHighlighted = activeStage === idx;
            return (
              <div
                key={stage.id}
                id={`process-stage-${idx}`}
                onClick={() => setActiveStage(idx)}
                className={`group bg-white rounded-xl border p-6 flex flex-col justify-between transition-all duration-200 cursor-pointer relative ${
                  isHighlighted
                    ? "border-[#300C41] shadow-violet ring-2 ring-[#DEE948]/50 -translate-y-1"
                    : "border-[#300C41]/10 shadow-2xs hover:border-[#300C41] hover:shadow-violet hover:-translate-y-0.5"
                }`}
              >
                {/* Top border colored line */}
                <div
                  className={`absolute top-0 left-6 right-6 h-1 rounded-t transition-colors ${
                    isHighlighted ? "bg-[#DEE948]" : "bg-transparent group-hover:bg-[#300C41]/20"
                  }`}
                />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`font-mono text-xl font-extrabold tracking-tight transition-colors ${
                          isHighlighted ? "text-[#300C41]" : "text-[#300C41]/40 group-hover:text-[#300C41]"
                        }`}
                      >
                        {stage.id}
                      </span>
                      <span className="text-[#300C41]/20">/</span>
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#300C41]/60">
                        STAGE
                      </span>
                    </div>

                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                        isHighlighted
                          ? "bg-[#300C41] text-[#DEE948]"
                          : "bg-[#300C41]/5 text-[#300C41] group-hover:text-[#DEE948] group-hover:bg-[#300C41]"
                      }`}
                    >
                      {stage.icon}
                    </div>
                  </div>

                  {/* Architecture Mockup Preview */}
                  {stage.preview}

                  <h3
                    className={`font-sans font-bold text-base text-[#300C41] mb-2 leading-snug transition-colors`}
                  >
                    {stage.stageTitle}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-[#300C41]/70 leading-relaxed mb-5">
                    {stage.description}
                  </p>
                </div>

                <div className="pt-3.5 border-t border-[#300C41]/10 mt-auto">
                  <span className="block text-[10px] font-mono font-bold uppercase tracking-wider text-[#300C41]/60 mb-1">
                    Key Outcome:
                  </span>
                  <div className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#300C41] shrink-0 mt-0.5" />
                    <span className="font-sans text-xs font-bold text-[#300C41] leading-snug">
                      {stage.outcome}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA block */}
        <div className="mt-16 lg:mt-20 pt-12 border-t border-[#300C41]/10">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-sans font-bold text-2xl sm:text-3xl text-[#300C41] tracking-tight mb-2.5">
              Ready to build what&apos;s next?
            </h3>
            <p className="font-sans text-sm sm:text-base text-[#300C41]/75 mb-6">
              Let&apos;s turn your idea into a scalable digital solution.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <Link
                href="/enquire"
                className="w-full sm:w-auto px-6 py-3 font-sans text-sm font-bold text-white bg-[#300C41] hover:bg-[#230830] hover:text-[#DEE948] rounded-lg shadow-violet transition-all inline-flex items-center justify-center gap-2 group"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 text-[#DEE948]" />
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto px-5 py-3 font-sans text-sm font-bold text-[#300C41] bg-white hover:bg-[#300C41]/5 border border-[#300C41]/20 rounded-lg transition-colors inline-flex items-center justify-center gap-2"
              >
                <span>Talk to Our Team</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
