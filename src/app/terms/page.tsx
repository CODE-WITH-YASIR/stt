import React from "react";
import { siteConfig } from "@/config/site";
import { FileText } from "lucide-react";

export const metadata = {
  title: "Terms & Conditions",
  description: "Terms of service and engineering collaboration terms at NIYAN.",
};

export default function TermsPage() {
  return (
    <div className="pt-28 pb-24 bg-white min-h-screen text-[#300C41]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="space-y-4 border-b border-[#300C41]/10 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#DEE948] text-[#300C41] uppercase tracking-wider font-mono">
            <FileText className="w-3.5 h-3.5" />
            <span>Legal Framework</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#300C41] tracking-tight">
            Terms & Conditions
          </h1>
          <p className="text-xs text-[#300C41]/60 font-mono">
            Governing Software Engineering, AI Deployments, and Academic Mentorship
          </p>
        </div>

        <div className="text-xs sm:text-sm text-[#300C41]/80 leading-relaxed space-y-6">
          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-[#300C41]">1. Scope of Services</h2>
            <p>
              {siteConfig.legalName} provides professional software development, artificial intelligence modeling,
              data engineering, and academic research mentoring. Specific deliverables, timelines, and acceptance
              criteria are defined in individual Statement of Work (SOW) documents or project agreements.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-[#300C41]">2. Intellectual Property Transfer</h2>
            <p>
              Unless otherwise agreed in writing, upon receipt of full milestone payments, all custom source code,
              neural network weights, documentation, and design assets authored specifically for the client are
              assigned exclusively to the client without ongoing licensing fees.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-[#300C41]">3. Academic Mentoring Ethics</h2>
            <p>
              Our Final Year Project Solutions practice operates strictly as legitimate academic mentorship,
              architectural consultation, and technical instruction. We do not support academic dishonesty or
              unauthorized submission. Students are expected to comprehend the methodologies, algorithms, and
              implementations for their academic defense.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-[#300C41]">4. Warranty and Post-Launch Support</h2>
            <p>
              Custom software engagements include a 30-day warranty following final delivery covering bug
              fixes and alignment with documented specifications. Changes outside the initial agreed scope
              are billed under standard hourly or sprint retainer rates.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-[#300C41]">5. Governing Law & Jurisdiction</h2>
            <p>
              These terms are governed by the laws of India, with legal jurisdiction vested in the courts of
              Chennai, Tamil Nadu.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
