"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#300C41] text-white/80 border-t border-white/10 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Column 1: Brand & Overview (Col 4) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-white/10 border border-[#DEE948]/40 shadow-md p-1.5 transition-transform group-hover:scale-105">
                <svg viewBox="0 0 80 90" className="w-full h-full" fill="none" aria-label="NIYAN logo">
                  {/* 3D N — depth layer */}
                  <path
                    d="M10 76 L10 16 L22 16 L46 50 L46 16 L58 16 L58 76 L46 76 L22 40 L22 76 Z"
                    fill="#DEE948"
                    transform="translate(3,3)"
                    opacity="0.4"
                  />
                  {/* 3D N — front face */}
                  <path
                    d="M10 76 L10 16 L22 16 L46 50 L46 16 L58 16 L58 76 L46 76 L22 40 L22 76 Z"
                    fill="#FFFFFF"
                  />
                  {/* Lime top highlights */}
                  <rect x="10" y="16" width="12" height="3.5" fill="#DEE948" opacity="0.9" />
                  <rect x="46" y="16" width="12" height="3.5" fill="#DEE948" opacity="0.9" />
                </svg>
              </div>
              <span className="font-sans font-extrabold text-lg tracking-tight text-white">
                {siteConfig.name}
              </span>
            </Link>

            <p className="font-sans text-white/70 text-xs sm:text-sm leading-relaxed max-w-sm">
              {siteConfig.name} is a technology and digital solutions company
              that helps students, startups, and businesses build, transform, and
              grow digitally. We provide end-to-end digital services under one roof.
            </p>

            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-[#DEE948]">
              IDEAS • TECHNOLOGY • IMPACT
            </p>

            <div className="pt-2 text-white/60 text-xs">
              <p>Bangalore, Karnataka, India • Serving Global Clients</p>
            </div>
          </div>

          {/* Column 2: Core Engineering (Col 3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-white">
              Core Engineering
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/services/ai-machine-learning" className="hover:text-[#DEE948] transition-colors">
                  AI & Machine Learning
                </Link>
              </li>
              <li>
                <Link href="/services/ai-chatbot-development" className="hover:text-[#DEE948] transition-colors">
                  AI Chatbot Development
                </Link>
              </li>
              <li>
                <Link href="/services/web-development" className="hover:text-[#DEE948] transition-colors">
                  Web Development
                </Link>
              </li>
              <li>
                <Link href="/services/app-development" className="hover:text-[#DEE948] transition-colors">
                  App Development
                </Link>
              </li>
              <li>
                <Link href="/services/final-year-project-solutions" className="hover:text-[#DEE948] transition-colors">
                  Final Year Project Solutions
                </Link>
              </li>
              <li>
                <Link href="/services/portfolio-development" className="hover:text-[#DEE948] transition-colors">
                  Portfolio Development
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Strategy & Solutions (Col 3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-white">
              Cloud & Strategy
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/services/data-science-analytics" className="hover:text-[#DEE948] transition-colors">
                  Data Science & Analytics
                </Link>
              </li>
              <li>
                <Link href="/services/digital-marketing-seo" className="hover:text-[#DEE948] transition-colors">
                  Digital Marketing & SEO
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-[#DEE948] transition-colors">
                  Engagement Models
                </Link>
              </li>
              <li>
                <Link href="/enquire" className="hover:text-[#DEE948] transition-colors">
                  Interactive Scope Estimator
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-[#DEE948] transition-colors">
                  Case Studies & Demos
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-[#DEE948] transition-colors">
                  Client Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal & Policies (Col 2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-white">
              Legal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/privacy" className="hover:text-[#DEE948] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#DEE948] transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#DEE948] transition-colors">
                  Refund & Cancellation Policy
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[#DEE948] transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-[#DEE948] transition-colors font-mono text-[11px] text-white/50">
                  Staff Login
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <p>
            © {currentYear} {siteConfig.name} Solution. All rights reserved. Build. Transform. Grow.
          </p>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-[#DEE948] hover:text-[#300C41] text-white border border-white/15 transition-colors cursor-pointer"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
