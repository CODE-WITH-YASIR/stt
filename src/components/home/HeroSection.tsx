"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  Cpu,
  Bot,
  Cloud,
  TrendingUp,
  Sparkles,
  Database,
  Zap,
  Smartphone,
} from "lucide-react";
import { siteConfig } from "@/config/site";

export default function HeroSection() {
  return (
    <section
      id="overview"
      className="relative overflow-hidden border-b border-[#300C41]/10 bg-white pb-12 pt-24 sm:py-16 lg:py-20"
    >
      {/* Background blueprint grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#300C41 1px, transparent 1px), linear-gradient(90deg, #300C41 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Ambient gradient orbs using Deep Violet and Lime */}
      <div className="pointer-events-none absolute -right-20 -top-24 h-96 w-96 rounded-full bg-[#DEE948]/15 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-[#300C41]/5 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-8 lg:grid-cols-12 lg:gap-8">
        {/* Left Column: Editorial Headline & CTAs (Strictly Preserved) */}
        <div className="flex flex-col items-start lg:col-span-6">
          <div className="max-w-xl">
            {/* Monospace Kicker */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#300C41]/5 border border-[#300C41]/10 px-3 py-1">
              <span className="h-2 w-2 rounded-full bg-[#DEE948] ring-2 ring-[#DEE948]/50 animate-pulse" />
              <p className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.25em] text-[#300C41] sm:text-xs">
                {siteConfig.name} SOLUTIONS
              </p>
            </div>

            {/* Main Headline */}
            <h1 className="mb-6 max-w-lg font-sans text-4xl font-extrabold leading-[1.08] tracking-tight text-[#300C41] sm:text-5xl lg:text-6xl">
              Building Intelligent Solutions
              <br />
              <span className="relative inline-block mt-1">
                <span className="relative z-10 text-[#300C41]">for a Digital Future.</span>
                <span className="absolute bottom-1 left-0 right-0 h-3 bg-[#DEE948]/60 -z-0 rounded-xs" />
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="mb-8 max-w-md font-sans text-base font-normal leading-relaxed text-[#300C41]/75 sm:text-lg">
              We combine AI, software engineering, and digital innovation to
              transform ideas into impactful solutions.
            </p>

            {/* CTA Buttons */}
            <div className="flex w-full flex-col items-stretch gap-3.5 sm:w-auto sm:flex-row sm:items-center">
              <Link
                href="/enquire"
                className="inline-flex items-center justify-center gap-2.5 rounded-lg bg-[#300C41] px-6 py-3.5 font-sans text-sm font-bold tracking-normal text-white shadow-sm hover:shadow-violet hover:bg-[#230830] hover:text-[#DEE948] transition-all duration-150 group"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 text-[#DEE948]" />
              </Link>

              <a
                href="#services"
                className="inline-flex items-center justify-center gap-1.5 px-5 py-3.5 font-sans text-sm font-semibold tracking-normal text-[#300C41] border border-[#300C41]/15 rounded-lg hover:bg-[#300C41]/5 transition-colors"
              >
                <span>Explore Services</span>
                <ArrowUpRight className="w-4 h-4 text-[#300C41]/60" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Decidr-Inspired Premium Orbital Interface Visual */}
        <div className="mt-6 flex w-full items-center justify-center lg:col-span-6 lg:mt-0">
          <div
            className="relative mx-auto aspect-square sm:aspect-[1.08/1] w-full max-w-[350px] select-none sm:max-w-[470px] md:max-w-[500px] lg:max-w-[535px] xl:max-w-[555px] rounded-3xl overflow-hidden bg-gradient-to-br from-[#FAF8FD] via-white to-[#F5F0FA] border border-[#300C41]/10 shadow-[0_16px_40px_rgba(48,12,65,0.06)]"
            aria-label="NIYAN Decidr-Inspired AI Orchestration Interface"
          >
            {/* Ambient Soft Violet & Lime Backdrop Glows */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8B5CF6]/5 blur-3xl" />
            <div className="pointer-events-none absolute right-0 bottom-0 h-44 w-44 rounded-full bg-[#DEE948]/10 blur-2xl" />
            <div className="pointer-events-none absolute left-0 top-0 h-44 w-44 rounded-full bg-[#300C41]/4 blur-2xl" />

            {/* 1. MATHEMATICAL SACRED WAVE LATTICE (SVG) */}
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full"
              viewBox="0 0 540 500"
              fill="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="orbitStrokeLavender" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#300C41" stopOpacity="0.14" />
                  <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#DEE948" stopOpacity="0.2" />
                </linearGradient>

                <linearGradient id="orbitStrokeViolet" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.22" />
                  <stop offset="50%" stopColor="#300C41" stopOpacity="0.12" />
                  <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.08" />
                </linearGradient>

                <radialGradient id="centerCoreAura" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.15" />
                  <stop offset="40%" stopColor="#DEE948" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Soft Center Radial Glow */}
              <circle cx="270" cy="250" r="170" fill="url(#centerCoreAura)" />

              {/* Vesica Piscis Bilateral Lenses (Overlapping Central Circles) */}
              <circle cx="215" cy="250" r="145" stroke="url(#orbitStrokeViolet)" strokeWidth="0.9" />
              <circle cx="325" cy="250" r="145" stroke="url(#orbitStrokeLavender)" strokeWidth="0.9" />

              {/* Expanding Concentric Wave Ripples */}
              <circle cx="165" cy="250" r="190" stroke="url(#orbitStrokeViolet)" strokeWidth="0.85" />
              <circle cx="375" cy="250" r="190" stroke="url(#orbitStrokeLavender)" strokeWidth="0.85" />
              <circle cx="115" cy="250" r="235" stroke="url(#orbitStrokeViolet)" strokeWidth="0.75" strokeOpacity="0.6" />
              <circle cx="425" cy="250" r="235" stroke="url(#orbitStrokeLavender)" strokeWidth="0.75" strokeOpacity="0.6" />

              {/* Concentric Central Caliper Rings */}
              <circle cx="270" cy="250" r="95" stroke="#300C41" strokeOpacity="0.12" strokeWidth="0.9" />
              <circle cx="270" cy="250" r="165" stroke="#8B5CF6" strokeOpacity="0.16" strokeWidth="0.85" strokeDasharray="3 6" />
              <circle cx="270" cy="250" r="230" stroke="#300C41" strokeOpacity="0.08" strokeWidth="0.75" />

              {/* Transverse Elliptical Belts */}
              <ellipse cx="270" cy="250" rx="245" ry="155" transform="rotate(-15 270 250)" stroke="url(#orbitStrokeLavender)" strokeWidth="0.9" />
              <ellipse cx="270" cy="250" rx="245" ry="155" transform="rotate(15 270 250)" stroke="url(#orbitStrokeViolet)" strokeWidth="0.9" />

              {/* Harmonic Nodal Planetary Dots */}
              <circle cx="270" cy="105" r="2.5" fill="#DEE948" stroke="#300C41" strokeWidth="0.75" />
              <circle cx="270" cy="395" r="2.5" fill="#DEE948" stroke="#300C41" strokeWidth="0.75" />
              <circle cx="180" cy="180" r="2" fill="#8B5CF6" opacity="0.8" />
              <circle cx="360" cy="180" r="2" fill="#8B5CF6" opacity="0.8" />
              <circle cx="170" cy="320" r="2" fill="#300C41" opacity="0.4" />
              <circle cx="370" cy="320" r="2" fill="#DEE948" stroke="#300C41" strokeWidth="0.75" />
            </svg>

            {/* 2. CENTRAL NIYAN BRAND SQUIRCLE ANCHOR */}
            <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
              <div className="pointer-events-none absolute -inset-4 rounded-3xl bg-[#8B5CF6]/20 blur-xl" />
              <div className="pointer-events-none absolute -inset-2 rounded-2xl bg-[#DEE948]/15 blur-md" />

              {/* Central Squircle */}
              <div className="relative flex flex-col items-center justify-center w-18 h-18 sm:w-20 sm:h-20 md:w-22 md:h-22 rounded-2xl bg-gradient-to-br from-[#300C41] via-[#240832] to-[#180322] border border-[#300C41] ring-1 ring-[#DEE948]/40 shadow-[0_12px_28px_rgba(48,12,65,0.24),0_2px_8px_rgba(48,12,65,0.14)] transition-transform duration-200 hover:scale-105">
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/8 to-white/18 rounded-2xl" />

                {/* NIYAN Official Vector Monogram */}
                <div className="relative z-10 w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 flex items-center justify-center">
                  <svg viewBox="0 0 80 90" className="w-full h-full drop-shadow-[0_2px_5px_rgba(0,0,0,0.4)]" fill="none" aria-label="NIYAN logo">
                    <path
                      d="M10 76 L10 16 L22 16 L46 50 L46 16 L58 16 L58 76 L46 76 L22 40 L22 76 Z"
                      fill="#DEE948"
                      transform="translate(2.5, 2.5)"
                      opacity="0.85"
                    />
                    <path
                      d="M10 76 L10 16 L22 16 L46 50 L46 16 L58 16 L58 76 L46 76 L22 40 L22 76 Z"
                      fill="#FFFFFF"
                    />
                    <rect x="10" y="16" width="12" height="3.5" fill="#DEE948" />
                    <rect x="46" y="16" width="12" height="3.5" fill="#DEE948" />
                  </svg>
                </div>

                {/* Micro Brand Label */}
                <div className="relative z-10 mt-0.5 flex items-center gap-1">
                  <span className="font-sans text-[8px] sm:text-[9px] font-extrabold tracking-widest text-white leading-none">
                    NIYAN
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-[#DEE948] ring-1.5 ring-[#DEE948]/50 animate-pulse" />
                </div>
              </div>
            </div>

            {/* 3. TIER 1: CORE SERVICE & CAPABILITY CARDS */}
            {/* CARD A: Web Engineering (Mid-Left, mimicking Competitor Manager in Decidr) */}
            <Link
              href="/services/web-development"
              className="group absolute left-[4%] sm:left-[5%] top-[42%] -translate-y-1/2 z-30 block w-[125px] sm:w-[150px] md:w-[162px] rounded-2xl border border-[#300C41]/10 bg-white/95 p-2 sm:p-2.5 shadow-[0_8px_24px_rgba(48,12,65,0.05)] backdrop-blur-sm transition-all duration-200 hover:-translate-y-[calc(50%+2px)] hover:border-[#300C41]/25 hover:shadow-[0_12px_28px_rgba(48,12,65,0.08)]"
              title="Web Engineering"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <div className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-xl bg-[#300C41]/5 text-[#300C41] border border-[#300C41]/10 group-hover:bg-[#300C41] group-hover:text-[#DEE948] transition-colors shrink-0">
                  <Code2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </div>
                <div className="min-w-0">
                  <h4 className="truncate font-sans text-[10px] sm:text-[11px] font-bold text-[#300C41] leading-tight">
                    Web Systems
                  </h4>
                  <p className="truncate font-sans text-[7px] sm:text-[8px] text-[#300C41]/60">
                    Next.js Engineering
                  </p>
                </div>
              </div>
              <div className="h-1 w-full rounded-full bg-[#300C41]/5 overflow-hidden">
                <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-[#300C41] to-[#DEE948]" />
              </div>
            </Link>

            {/* CARD B: AI & Automation (Bottom-Right, mimicking Brand System by Brandloop in Decidr) */}
            <Link
              href="/services/ai-machine-learning"
              className="group absolute right-[4%] sm:right-[6%] bottom-[12%] sm:bottom-[13%] z-30 block w-[130px] sm:w-[155px] md:w-[168px] rounded-2xl border border-[#300C41]/10 bg-white/95 p-2 sm:p-2.5 shadow-[0_8px_24px_rgba(48,12,65,0.05)] backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#300C41]/25 hover:shadow-[0_12px_28px_rgba(48,12,65,0.08)]"
              title="AI & Automation"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <div className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-xl bg-[#300C41] text-[#DEE948] shrink-0 shadow-sm">
                  <Cpu className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </div>
                <div className="min-w-0">
                  <h4 className="truncate font-sans text-[10px] sm:text-[11px] font-bold text-[#300C41] leading-tight">
                    AI Intelligence
                  </h4>
                  <p className="truncate font-sans text-[7px] sm:text-[8px] text-[#300C41]/60">
                    by NIYAN Core
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between text-[7px] sm:text-[8px] font-mono text-[#300C41]/70 pt-1 border-t border-[#300C41]/5">
                <span>Model Engine</span>
                <span className="text-[#300C41] font-bold">Active</span>
              </div>
            </Link>

            {/* CARD C: Cloud DevOps (Mid-Bottom, mimicking Campaign Manager in Decidr) */}
            <Link
              href="/services/cloud-solutions"
              className="group absolute left-[31%] sm:left-[33%] bottom-[6%] sm:bottom-[7%] z-30 block w-[115px] sm:w-[135px] md:w-[145px] rounded-xl border border-[#300C41]/10 bg-white/95 p-1.5 sm:p-2 shadow-[0_6px_20px_rgba(48,12,65,0.04)] backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#300C41]/25"
              title="Cloud Infrastructure"
            >
              <div className="flex items-center gap-1.5">
                <div className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-lg bg-[#300C41]/5 text-[#300C41] group-hover:bg-[#300C41] group-hover:text-[#DEE948] transition-colors shrink-0">
                  <Cloud className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                </div>
                <div className="min-w-0">
                  <h4 className="truncate font-sans text-[9px] sm:text-[10px] font-bold text-[#300C41] leading-tight">
                    Cloud Systems
                  </h4>
                  <p className="truncate font-sans text-[6.5px] sm:text-[7.5px] text-[#300C41]/60">
                    AWS & CI/CD
                  </p>
                </div>
              </div>
            </Link>

            {/* CARD D: App Development (Upper-Right, mimicking Qualify in Decidr) */}
            <Link
              href="/services/app-development"
              className="group absolute right-[22%] sm:right-[24%] top-[18%] sm:top-[20%] z-30 block w-[110px] sm:w-[130px] md:w-[140px] rounded-xl border border-[#300C41]/10 bg-white/95 p-1.5 sm:p-2 shadow-[0_6px_20px_rgba(48,12,65,0.04)] backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#300C41]/25"
              title="App Development"
            >
              <div className="flex items-center gap-1.5">
                <div className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-lg bg-[#300C41]/5 text-[#300C41] group-hover:bg-[#300C41] group-hover:text-[#DEE948] transition-colors shrink-0">
                  <Smartphone className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                </div>
                <div className="min-w-0">
                  <h4 className="truncate font-sans text-[9px] sm:text-[10px] font-bold text-[#300C41] leading-tight">
                    App Development
                  </h4>
                  <p className="truncate font-sans text-[6.5px] sm:text-[7.5px] text-[#300C41]/60">
                    iOS & Android
                  </p>
                </div>
              </div>
            </Link>

            {/* 4. TIER 2: REAL-TIME OPERATIONAL METRIC CHIPS */}
            {/* CHIP 1: Latency (Top-Left, mimicking 25.6K in Decidr) */}
            <div className="absolute left-[24%] sm:left-[26%] top-[14%] sm:top-[16%] z-30 w-[95px] sm:w-[115px] md:w-[124px] rounded-xl border border-[#300C41]/10 bg-white/95 p-1.5 sm:p-2 shadow-[0_6px_18px_rgba(48,12,65,0.04)]">
              <div className="flex items-center justify-between">
                <span className="font-sans text-[11px] sm:text-xs font-black text-[#300C41] tracking-tight">
                  &lt; 24ms
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-[#DEE948] ring-1 ring-[#DEE948]/60" />
              </div>
              <div className="mt-1 h-0.5 w-full rounded-full bg-[#300C41]/8 overflow-hidden">
                <div className="h-full w-3/4 rounded-full bg-[#DEE948]" />
              </div>
              <span className="mt-1 block font-mono text-[6.5px] sm:text-[7px] text-[#300C41]/60 truncate">
                Edge Inference
              </span>
            </div>

            {/* CHIP 2: SLA Uptime (Far-Right, mimicking $3,256 in Decidr) */}
            <div className="absolute right-[3%] sm:right-[4%] top-[34%] sm:top-[36%] z-30 w-[90px] sm:w-[110px] md:w-[118px] rounded-xl border border-[#300C41]/10 bg-white/95 p-1.5 sm:p-2 shadow-[0_6px_18px_rgba(48,12,65,0.04)]">
              <div className="flex items-center justify-between">
                <span className="font-sans text-[11px] sm:text-xs font-black text-[#300C41] tracking-tight">
                  99.9%
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <div className="mt-1 h-0.5 w-full rounded-full bg-[#300C41]/8 overflow-hidden">
                <div className="h-full w-full rounded-full bg-emerald-500" />
              </div>
              <span className="mt-1 block font-mono text-[6.5px] sm:text-[7px] text-[#300C41]/60 truncate">
                Uptime SLA
              </span>
            </div>

            {/* CHIP 3: Engineering Velocity (Bottom-Left, mimicking 118% in Decidr) */}
            <div className="absolute left-[9%] sm:left-[11%] bottom-[12%] sm:bottom-[13%] z-30 w-[85px] sm:w-[102px] md:w-[110px] rounded-xl border border-[#300C41]/10 bg-white/95 p-1.5 sm:p-2 shadow-[0_6px_18px_rgba(48,12,65,0.04)]">
              <div className="flex items-center justify-between">
                <span className="font-sans text-[11px] sm:text-xs font-black text-[#300C41] tracking-tight">
                  10x
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-[#8B5CF6]" />
              </div>
              <div className="mt-1 h-0.5 w-full rounded-full bg-[#300C41]/8 overflow-hidden">
                <div className="h-full w-4/5 rounded-full bg-[#300C41]" />
              </div>
              <span className="mt-1 block font-mono text-[6.5px] sm:text-[7px] text-[#300C41]/60 truncate">
                Dev Velocity
              </span>
            </div>

            {/* 5. TIER 3: CONNECTED ECOSYSTEM MICRO-PILLS */}
            {/* PILL 1: Next.js (Top-Left, mimicking Shopify in Decidr) */}
            <div className="absolute left-[12%] sm:left-[14%] top-[8%] sm:top-[9%] z-20 inline-flex items-center gap-1 rounded-full border border-[#300C41]/10 bg-white/90 px-1.5 py-0.5 sm:px-2 sm:py-0.5 shadow-sm backdrop-blur-sm">
              <div className="h-2 w-2 rounded-full bg-black flex items-center justify-center text-[5px] text-white font-bold">
                ▲
              </div>
              <span className="font-sans text-[7px] sm:text-[8px] font-semibold text-[#300C41]">
                Next.js
              </span>
            </div>

            {/* PILL 2: AWS (Top-Right, mimicking AWS in Decidr) */}
            <div className="absolute right-[10%] sm:right-[12%] top-[10%] sm:top-[12%] z-20 inline-flex items-center gap-1 rounded-full border border-[#300C41]/10 bg-white/90 px-1.5 py-0.5 sm:px-2 sm:py-0.5 shadow-sm backdrop-blur-sm">
              <div className="h-2 w-2 rounded-full bg-[#FF9900]/20 flex items-center justify-center">
                <div className="h-1 w-1 rounded-full bg-[#FF9900]" />
              </div>
              <span className="font-sans text-[7px] sm:text-[8px] font-semibold text-[#300C41]">
                AWS
              </span>
            </div>

            {/* PILL 3: PyTorch (Center-Bottom, mimicking Salesforce in Decidr) */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-[24%] sm:bottom-[25%] z-20 inline-flex items-center gap-1 rounded-full border border-[#300C41]/10 bg-white/90 px-1.5 py-0.5 sm:px-2 sm:py-0.5 shadow-sm backdrop-blur-sm">
              <div className="h-2 w-2 rounded-full bg-[#EE4C2C]/20 flex items-center justify-center">
                <div className="h-1 w-1 rounded-full bg-[#EE4C2C]" />
              </div>
              <span className="font-sans text-[7px] sm:text-[8px] font-semibold text-[#300C41]">
                PyTorch
              </span>
            </div>

            {/* PILL 4: TypeScript (Mid-Left Micro Interface) */}
            <div className="absolute left-[20%] top-[60%] z-20 inline-flex items-center gap-1 rounded-full border border-[#300C41]/10 bg-white/80 px-1.5 py-0.5 shadow-xs">
              <span className="font-mono text-[6.5px] sm:text-[7px] font-semibold text-[#300C41]/70">
                TypeScript
              </span>
            </div>

            {/* PILL 5: Supabase (Mid-Right Micro Interface) */}
            <div className="absolute right-[18%] bottom-[32%] z-20 inline-flex items-center gap-1 rounded-full border border-[#300C41]/10 bg-white/80 px-1.5 py-0.5 shadow-xs">
              <span className="font-mono text-[6.5px] sm:text-[7px] font-semibold text-[#300C41]/70">
                Supabase
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
